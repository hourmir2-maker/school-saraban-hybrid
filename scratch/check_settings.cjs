const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase Config in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('--- checking schools ---');
  const { data: schools } = await supabase.from('schools').select('id, school_code, school_name, status');
  console.table(schools);

  console.log('--- checking settings ---');
  const { data: settings } = await supabase.from('settings').select('id, school_id, school_name, school_address');
  console.table(settings);
  
  console.log('--- checking profiles (recent) ---');
  const { data: profiles } = await supabase.from('profiles').select('id, display_name, role, school_id').limit(10);
  console.table(profiles);
}

main();
