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

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabase() {
  try {
    // 1. ดึงข้อมูลโรงเรียนทั้งหมด
    const { data: schools, error: sErr } = await supabase.from('schools').select('*');
    if (sErr) throw sErr;
    console.log('\n🏫 --- ตาราง schools ---');
    console.log(schools);

    // 2. ดึงข้อมูล profiles ทั้งหมด
    const { data: profiles, error: pErr } = await supabase.from('profiles').select('*');
    if (pErr) throw pErr;
    console.log('\n👤 --- ตาราง profiles ---');
    console.log(profiles);

    // 3. ดึงข้อมูล teachers ทั้งหมด
    const { data: teachers, error: tErr } = await supabase.from('teachers').select('*');
    if (tErr) throw tErr;
    console.log('\n🧑‍🏫 --- ตาราง teachers ---');
    console.log(teachers);

  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาดในการตรวจสอบฐานข้อมูล:', err.message);
  }
}

checkDatabase();
