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
  console.log('--- checking incoming_docs ---');
  const { data: docs, error: docErr } = await supabase
    .from('incoming_docs')
    .select('id, subject, status, school_id, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  if (docErr) console.error(docErr);
  else console.table(docs);

  console.log('--- checking doc_assignments ---');
  const { data: assigns, error: assignErr } = await supabase
    .from('doc_assignments')
    .select('id, doc_id, assignee_id, status, instruction, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  if (assignErr) console.error(assignErr);
  else console.table(assigns);

  console.log('--- checking settings ---');
  const { data: settings, error: setErr } = await supabase
    .from('settings')
    .select('school_id, school_name, director_name, line_channel_access_token, line_group_id');
  if (setErr) console.error(setErr);
  else console.table(settings);
}

main();
