const { createClient } = require('@supabase/supabase-js');

const url = 'https://bnqfttmkakdjbktsrsqt.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucWZ0dG1rYWtkamJrdHNyc3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MTgwOTAsImV4cCI6MjA5ODI5NDA5MH0.FioDD90K1W-SHOMttOf_-bvvimLP2YNjCveTSoQ2OPs';

const supabase = createClient(url, key);

async function run() {
  const { data: settings, error } = await supabase
    .from('settings')
    .select('gemini_api_key, ai_cowork_api_key')
    .eq('school_id', 'fa4d50fd-e863-45e7-8b1d-0b0dd70f16a5')
    .maybeSingle();
  console.log('Settings:', settings);
  console.log('Error:', error);
}
run();
