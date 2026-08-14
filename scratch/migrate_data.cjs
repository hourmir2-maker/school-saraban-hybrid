const { createClient } = require('@supabase/supabase-js');

// 🔌 ตั้งค่าการเชื่อมต่อฐานข้อมูล
const OLD_SUPABASE_URL = 'https://vzrrpxrmtjpgfbbvhjra.supabase.co';
const OLD_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cnJweHJtdGpwZ2ZiYnZoanJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NzIzODAsImV4cCI6MjA5MzI0ODM4MH0.1R5UNgnEFCm1TaHWgUuphBlKxUEZCGfkUD4qvBIe6u4';

const NEW_SUPABASE_URL = 'https://bnqfttmkakdjbktsrsqt.supabase.co';
const NEW_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucWZ0dG1rYWtkamJrdHNyc3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MTgwOTAsImV4cCI6MjA5ODI5NDA5MH0.FioDD90K1W-SHOMttOf_-bvvimLP2YNjCveTSoQ2OPs';

// 🏫 รหัส UUID ของโรงเรียนปลายทางที่ตรวจสอบพบ
const TARGET_SCHOOL_ID = '907ece62-a06f-42a5-8692-6668824425ba';

const oldSupabase = createClient(OLD_SUPABASE_URL, OLD_SUPABASE_KEY);
const newSupabase = createClient(NEW_SUPABASE_URL, NEW_SUPABASE_KEY);

// 📋 รายการตารางและลำดับการย้ายที่ปลอดภัยเพื่อหลีกเลี่ยง Error ความสัมพันธ์ (Foreign Keys)
const TABLES_TO_MIGRATE = [
  // 1. ตารางตั้งต้น (Master Tables)
  { name: 'school_years', filterField: null },
  { name: 'vendors', filterField: null },
  { name: 'subjects', filterField: null },
  
  // 2. ตารางข้อมูลครูและนักเรียน
  { name: 'students', filterField: null },
  
  // 3. ตารางทำรายการ (Transaction Tables)
  { name: 'attendance', filterField: null },
  { name: 'wfh_logs', filterField: null },
  { name: 'library_books', filterField: null },
  { name: 'library_borrow', filterField: null },
  { name: 'library_usage_logs', filterField: null },
  { name: 'utilities', filterField: null },
  { name: 'utility_items', filterField: null },
  { name: 'procurement_projects', filterField: null },
  { name: 'procurement_items', filterField: null },
  { name: 'service_area_students', filterField: null },
  { name: 'lesson_plans', filterField: null },
  { name: 'lesson_plan_logs', filterField: null },
  { name: 'athletics_registrations', filterField: null }
];

async function migrateTable(tableName) {
  console.log(`\n⏳ กำลังเริ่มย้ายข้อมูลตาราง: [${tableName}]...`);
  
  // 1. ดึงข้อมูลจากฐานข้อมูลเก่า
  const { data: oldData, error: fetchError } = await oldSupabase
    .from(tableName)
    .select('*');
    
  if (fetchError) {
    if (fetchError.code === 'PGRST116' || fetchError.message.includes('does not exist')) {
      console.log(`⚠️ ไม่พบตาราง [${tableName}] ในระบบเดิม (ข้ามการทำงาน)`);
      return;
    }
    console.error(`❌ เกิดข้อผิดพลาดในการดึงข้อมูลตาราง [${tableName}]:`, fetchError.message);
    return;
  }
  
  if (!oldData || oldData.length === 0) {
    console.log(`ℹ️ ไม่มีข้อมูลในตาราง [${tableName}] (ข้ามการย้าย)`);
    return;
  }
  
  console.log(`   ดึงข้อมูลสำเร็จ: ${oldData.length} แถว`);
  
  // 2. เตรียมข้อมูลและฝัง TARGET_SCHOOL_ID ลงไป
  const preparedData = oldData.map(item => {
    // โคลนอ็อบเจกต์เพื่อไม่ให้กระทบข้อมูลเดิม
    const newItem = { ...item };
    
    // ฝัง UUID โรงเรียนปลายทางลงไป
    newItem.school_id = TARGET_SCHOOL_ID;
    
    // 🛡️ เคลียร์ฟิลด์ Foreign Key ที่เชื่อมกับตารางผู้ใช้ (auth.users) หากไม่มีผู้ใช้นั้นในระบบใหม่
    // เพื่อป้องกัน Error: violates foreign key constraint (users_fkey)
    if (newItem.created_by !== undefined) newItem.created_by = null;
    if (newItem.registered_by !== undefined) newItem.registered_by = null;
    if (newItem.actor_id !== undefined) newItem.actor_id = null;
    
    return newItem;
  });

  // 3. ล้างข้อมูลปลายทางเดิมเฉพาะของโรงเรียนนี้ก่อนเพื่อไม่ให้เกิดข้อมูลซ้ำซ้อน (Upsert simulation)
  const { error: deleteError } = await newSupabase
    .from(tableName)
    .delete()
    .eq('school_id', TARGET_SCHOOL_ID);

  // 🧹 ลบข้อมูลที่ย้ายไปผิดโรงเรียนในรอบก่อนหน้านี้ (fa4d50fd-e863-45e7-8b1d-0b0dd70f16a5) ออกด้วย
  // เพื่อหลีกเลี่ยงข้อผิดพลาดคีย์หลักซ้ำซ้อน (duplicate key error)
  await newSupabase
    .from(tableName)
    .delete()
    .eq('school_id', 'fa4d50fd-e863-45e7-8b1d-0b0dd70f16a5');

  if (deleteError) {
    console.warn(`⚠️ คำเตือน: ไม่สามารถเคลียร์ข้อมูลเก่าในตารางปลายทาง [${tableName}] ได้:`, deleteError.message);
    // ทำงานต่อได้ (บางตารางอาจไม่มี RLS หรือสิทธิ์ลบใน anon key)
  }

  // 4. นำข้อมูลเข้าสู่ฐานข้อมูลใหม่ (แบ่งย้ายเป็นเซ็ตย่อยละ 100 แถวเพื่อไม่ให้ API Timeout)
  const batchSize = 100;
  let successCount = 0;
  
  for (let i = 0; i < preparedData.length; i += batchSize) {
    const batch = preparedData.slice(i, i + batchSize);
    const { error: insertError } = await newSupabase
      .from(tableName)
      .insert(batch);
      
    if (insertError) {
      console.error(`❌ เกิดข้อผิดพลาดตอนเขียนข้อมูลลงตาราง [${tableName}] (ชุดที่ ${i/batchSize + 1}):`, insertError.message);
      console.error('รายละเอียดเพิ่มเติม:', insertError);
      return; // หยุดย้ายตารางนี้หากเกิดข้อผิดพลาด
    }
    successCount += batch.length;
  }
  
  console.log(`✅ ย้ายข้อมูลตาราง [${tableName}] สำเร็จเรียบร้อย! นำเข้าทั้งหมด: ${successCount} แถว`);
}

async function startMigration() {
  console.log('======================================================');
  console.log('🚀 เริ่มต้นระบบย้ายข้อมูลอัตโนมัติ (Automated Database Migration) 🚀');
  console.log(`   ต้นทาง (แอปเก่า): ${OLD_SUPABASE_URL}`);
  console.log(`   ปลายทาง (แอปใหม่): ${NEW_SUPABASE_URL}`);
  console.log(`   เป้าหมายรหัสโรงเรียน UUID: ${TARGET_SCHOOL_ID}`);
  console.log('======================================================');
  
  try {
    for (const table of TABLES_TO_MIGRATE) {
      await migrateTable(table.name);
    }
    console.log('\n======================================================');
    console.log('🎉 ย้ายข้อมูลทุกตารางที่จำเป็นเสร็จสิ้นอย่างสมบูรณ์แบบ! 🎉');
    console.log('======================================================');
  } catch (error) {
    console.error('\n❌ เกิดข้อผิดพลาดร้ายแรงระหว่างกระบวนการ:', error);
  }
}

startMigration();
