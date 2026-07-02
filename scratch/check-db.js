import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// อ่านและ parse .env
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.trim().match(/^([\w.-]+)\s*=\s*(.*)?$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    env[key] = value.trim();
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseAnonKey = env['VITE_SUPABASE_ANON_KEY'];

console.log('=== Supabase Connection Test ===');
console.log('Supabase URL:', supabaseUrl);
console.log('Using Anon Key length:', supabaseAnonKey ? supabaseAnonKey.length : 0);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    // 1. ลองเช็คว่ามีตาราง schools อยู่หรือไม่
    console.log('Testing query from table "schools"...');
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .limit(10);
      
    if (error) {
      console.error('Failed to query "schools" table:', error);
      console.log('\n❌ [คำแนะนำ]: หากเกิดข้อผิดพลาดนี้ แปลว่าตารางยังไม่ได้ถูกสร้างขึ้นใน Supabase');
      console.log('กรุณาเปิดหน้าเว็บ Supabase Console -> เข้าไปที่เมนู SQL Editor -> นำโค้ดในไฟล์ "supabase_schema_hybrid.sql" ทั้งหมดไปวางแล้วกดรัน (Run) จากนั้นจึงรันสคริปต์นี้ใหม่อีกครั้งค่ะ');
      process.exit(1);
    }
    
    console.log('✅ Query ตาราง "schools" สำเร็จ!');
    console.log('ข้อมูลโรงเรียนที่มีในระบบขณะนี้:', data);
    
    // 2. ถ้าไม่มีข้อมูลโรงเรียนเลย ให้ลงทะเบียนโรงเรียนแรก
    if (data.length === 0) {
      const defaultSchoolName = env['VITE_SCHOOL_NAME'] || 'โรงเรียนบ้านควนโคกยา';
      console.log(`\nไม่มีข้อมูลโรงเรียนในตาราง. กำลังลงทะเบียนโรงเรียนแรก (SKW001 - ${defaultSchoolName})...`);
      
      const { data: insertData, error: insertError } = await supabase
        .from('schools')
        .insert([
          {
            school_code: 'SKW001',
            school_name: defaultSchoolName,
            gas_url: env['VITE_GAS_URL'] || ''
          }
        ])
        .select();
        
      if (insertError) {
        console.error('❌ ไม่สามารถลงทะเบียนโรงเรียนแรกได้:', insertError);
      } else {
        console.log('✅ ลงทะเบียนโรงเรียนแรกเรียบร้อยแล้ว!', insertData);
      }
    } else {
      console.log('\n✅ ฐานข้อมูลพร้อมใช้งานและมีข้อมูลโรงเรียนเรียบร้อยแล้วค่ะ');
    }
    
  } catch (err) {
    console.error('An unexpected error occurred:', err);
  }
}

testConnection();
