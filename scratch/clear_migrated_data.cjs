const { createClient } = require('@supabase/supabase-js');

const url = 'https://bnqfttmkakdjbktsrsqt.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucWZ0dG1rYWtkamJrdHNyc3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MTgwOTAsImV4cCI6MjA5ODI5NDA5MH0.FioDD90K1W-SHOMttOf_-bvvimLP2YNjCveTSoQ2OPs';
const TARGET_SCHOOL_ID = '907ece62-a06f-42a5-8692-6668824425ba';

const supabase = createClient(url, key);

async function clearData() {
  console.log('⏳ กำลังทำการเคลียร์ข้อมูลที่โอนย้ายมาจากตารางต่าง ๆ...');
  
  // 1. ลบข้อมูลในตารางที่มีความสัมพันธ์เป็นลูกก่อน (utility_items)
  const { data: d1, error: e1 } = await supabase
    .from('utility_items')
    .delete()
    .eq('school_id', TARGET_SCHOOL_ID);
  if (e1) console.error('❌ Error clearing utility_items:', e1.message);
  else console.log('✅ ล้างข้อมูลตาราง [utility_items] สำเร็จ');

  // 2. ลบข้อมูลในตาราง utilities
  const { data: d2, error: e2 } = await supabase
    .from('utilities')
    .delete()
    .eq('school_id', TARGET_SCHOOL_ID);
  if (e2) console.error('❌ Error clearing utilities:', e2.message);
  else console.log('✅ ล้างข้อมูลตาราง [utilities] สำเร็จ');

  // 3. ลบข้อมูลในตาราง students
  const { data: d3, error: e3 } = await supabase
    .from('students')
    .delete()
    .eq('school_id', TARGET_SCHOOL_ID);
  if (e3) console.error('❌ Error clearing students:', e3.message);
  else console.log('✅ ล้างข้อมูลตาราง [students] สำเร็จ');

  console.log('🎉 เคลียร์ข้อมูลโอนย้ายทั้งหมดเสร็จสิ้น! โครงสร้างโมดูลและตารางต่าง ๆ ยังคงใช้งานได้ปกติ');
}

clearData();
