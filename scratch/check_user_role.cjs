const { createClient } = require('@supabase/supabase-js');

const url = 'https://bnqfttmkakdjbktsrsqt.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucWZ0dG1rYWtkamJrdHNyc3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MTgwOTAsImV4cCI6MjA5ODI5NDA5MH0.FioDD90K1W-SHOMttOf_-bvvimLP2YNjCveTSoQ2OPs';

const supabase = createClient(url, key);

async function run() {
  console.log('--- ดึงโปรไฟล์ทั้งหมดที่ผูก Telegram ---');
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, display_name, email, role, telegram_chat_id, school_id')
    .not('telegram_chat_id', 'is', null);
    
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  console.log('โปรไฟล์ที่ผูก Telegram:', profiles);
}
run();
