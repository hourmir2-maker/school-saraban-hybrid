const { createClient } = require('@supabase/supabase-js');

const url = 'https://bnqfttmkakdjbktsrsqt.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucWZ0dG1rYWtkamJrdHNyc3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MTgwOTAsImV4cCI6MjA5ODI5NDA5MH0.FioDD90K1W-SHOMttOf_-bvvimLP2YNjCveTSoQ2OPs';

const supabase = createClient(url, key);

async function run() {
  const { data: schools, error } = await supabase
    .from('schools')
    .select('*');
  if (error) {
    console.error('Error fetching schools:', error);
  } else {
    console.log('Registered Schools:');
    schools.forEach(s => {
      console.log(`- Name: ${s.school_name} | Code: ${s.school_code} | UUID: ${s.id}`);
    });
  }
}
run();
