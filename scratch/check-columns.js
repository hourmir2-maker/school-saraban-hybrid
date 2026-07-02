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

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkColumns() {
  try {
    console.log('--- Testing insert into schools to catch detailed error ---');
    const { data, error } = await supabase
      .from('schools')
      .insert([
        {
          school_code: 'TEST_COL',
          school_name: 'Test Columns',
          admin_email: 'test@admin.com',
          status: 'pending'
        }
      ])
      .select();
      
    if (error) {
      console.log('❌ Error message from Supabase API:');
      console.log(JSON.stringify(error, null, 2));
    } else {
      console.log('✅ Insert successful! Columns exist and are correctly configured.', data);
      
      // ลบตัวทดสอบออก
      await supabase.from('schools').delete().eq('school_code', 'TEST_COL');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

checkColumns();
