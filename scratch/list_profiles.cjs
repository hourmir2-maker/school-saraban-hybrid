const { createClient } = require('@supabase/supabase-js');

const url = 'https://bnqfttmkakdjbktsrsqt.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucWZ0dG1rYWtkamJrdHNyc3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MTgwOTAsImV4cCI6MjA5ODI5NDA5MH0.FioDD90K1W-SHOMttOf_-bvvimLP2YNjCveTSoQ2OPs';

const supabase = createClient(url, key);

async function run() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, email, display_name, role, school_id');
  if (error) {
    console.error('Error fetching profiles:', error);
  } else {
    console.log('Profiles in target database:');
    profiles.forEach(p => {
      console.log(`- Email: ${p.email} | Name: ${p.display_name} | Role: ${p.role} | School ID: ${p.school_id}`);
    });
  }
}
run();
