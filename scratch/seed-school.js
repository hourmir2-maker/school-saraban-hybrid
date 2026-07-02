import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// 1. อ่านและแปลงข้อมูลไฟล์ .env
const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ ไม่พบไฟล์ .env กรุณาสร้างไฟล์ .env ก่อนรันสคริปต์นี้ค่ะ');
  process.exit(1);
}

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
const defaultSchoolName = env['VITE_SCHOOL_NAME'] || 'โรงเรียนบ้านควนโคกยา';
const adminEmail = env['VITE_SUPER_ADMIN_EMAIL'] || 'ncrows77@gmail.com';
const gasUrl = env['VITE_GAS_URL'] || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ ไม่พบ VITE_SUPABASE_URL หรือ VITE_SUPABASE_ANON_KEY ในไฟล์ .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedSchool() {
  console.log('=== 🏫 เริ่มต้นลงทะเบียนโรงเรียนแรกในระบบ (SKW001) ===');
  console.log('Supabase URL:', supabaseUrl);
  console.log('โรงเรียน:', defaultSchoolName);
  console.log('อีเมลแอดมินจำลอง:', adminEmail);
  
  try {
    // 1. ตรวจสอบว่ามีโรงเรียน SKW001 อยู่แล้วหรือไม่
    const { data: existingSchool, error: queryError } = await supabase
      .from('schools')
      .select('*')
      .eq('school_code', 'SKW001')
      .maybeSingle();

    if (queryError) {
      console.error('❌ เกิดข้อผิดพลาดในการตรวจสอบโรงเรียน:', queryError);
      process.exit(1);
    }

    let schoolId;

    if (existingSchool) {
      console.log(`✅ พบโรงเรียนรหัส SKW001 ในระบบอยู่แล้ว: ${existingSchool.school_name} (ID: ${existingSchool.id})`);
      schoolId = existingSchool.id;
    } else {
      // 2. ลงทะเบียนโรงเรียน SKW001 ใหม่
      console.log(`กำลังลงทะเบียนโรงเรียน SKW001 - ${defaultSchoolName}...`);
      const { data: newSchool, error: insertError } = await supabase
        .from('schools')
        .insert([
          {
            school_code: 'SKW001',
            school_name: defaultSchoolName,
            gas_url: gasUrl,
            admin_email: adminEmail,
            status: 'approved'
          }
        ])
        .select()
        .single();

      if (insertError) {
        console.error('❌ ไม่สามารถลงทะเบียนโรงเรียนใหม่ได้:', insertError);
        process.exit(1);
      }

      console.log('✅ ลงทะเบียนโรงเรียนสำเร็จ!', newSchool);
      schoolId = newSchool.id;
    }

    // 3. ตรวจสอบว่ามีการตั้งค่า (settings) สำหรับโรงเรียนนี้หรือยัง
    const { data: existingSettings, error: settingsQueryError } = await supabase
      .from('settings')
      .select('*')
      .eq('school_id', schoolId)
      .maybeSingle();

    if (settingsQueryError) {
      console.error('⚠️ เกิดข้อผิดพลาดในการตรวจสอบการตั้งค่า (Settings):', settingsQueryError);
    } else if (existingSettings) {
      console.log('✅ พบข้อมูลการตั้งค่าสำหรับโรงเรียนนี้อยู่แล้วในระบบ');
    } else {
      // 4. สร้างการตั้งค่าเริ่มต้น
      console.log('กำลังสร้างข้อมูลการตั้งค่าเริ่มต้น (settings)...');
      const { data: newSettings, error: settingsInsertError } = await supabase
        .from('settings')
        .insert([
          {
            school_id: schoolId,
            school_name: defaultSchoolName,
            school_address: 'ต.ควนโคกยา อ.เมือง จ.กระบี่',
            director_name: 'นายสมชาย รักดี',
            current_academic_year: '2569',
            current_term: '1',
            school_logo_url: 'logo.png',
            phone_number: '081-234-5678',
            local_gov_name: 'สำนักงานเขตพื้นที่การศึกษาประถมศึกษากระบี่'
          }
        ])
        .select()
        .single();

      if (settingsInsertError) {
        console.error('❌ ไม่สามารถสร้างการตั้งค่าเริ่มต้นได้:', settingsInsertError);
      } else {
        console.log('✅ สร้างข้อมูลการตั้งค่าเริ่มต้นสำเร็จ!', newSettings);
      }
    }

    console.log('\n======================================================');
    console.log('🎉 เสร็จสิ้นการเตรียมข้อมูลฐานข้อมูลสำหรับโรงเรียนแรก 🎉');
    console.log('👉 คุณสามารถเปิดโปรแกรมและสมัครสมาชิกใช้งานด้วยรหัสโรงเรียน: SKW001');
    console.log(`👉 หากใช้อีเมล: ${adminEmail} ระบบจะมอบสิทธิ์ "แอดมินสูงสุด (Super Admin)" ให้โดยอัตโนมัติ!`);
    console.log('======================================================');

  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาดที่คาดไม่ถึง:', err);
  }
}

seedSchool();
