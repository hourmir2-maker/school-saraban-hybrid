const { createClient } = require('@supabase/supabase-js');

const url = 'https://bnqfttmkakdjbktsrsqt.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucWZ0dG1rYWtkamJrdHNyc3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MTgwOTAsImV4cCI6MjA5ODI5NDA5MH0.FioDD90K1W-SHOMttOf_-bvvimLP2YNjCveTSoQ2OPs';

const supabase = createClient(url, key);

async function run() {
  console.log('=== ดึงข้อมูลจากตาราง schools ===');
  const { data: schools, error: sErr } = await supabase.from('schools').select('*');
  if (sErr) console.error('Error schools:', sErr);
  else console.log('Schools:', schools);

  console.log('\n=== ดึงข้อมูลจากตาราง settings ===');
  const { data: settings, error: setErr } = await supabase.from('settings').select('*');
  if (setErr) console.error('Error settings:', setErr);
  else console.log('Settings:', settings);
}
run();
