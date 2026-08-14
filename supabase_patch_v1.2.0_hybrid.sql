-- SUPABASE MIGRATION PATCH V1.2.0 FOR SCHOOL SARABAN HYBRID
-- Date 2026-08-14

-- 1 Settings Table
ALTER TABLE settings 
  ADD COLUMN IF NOT EXISTS custom_sop TEXT,
  ADD COLUMN IF NOT EXISTS is_line_enabled BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS vision_api_key TEXT;

-- 2 Incoming Docs Table
ALTER TABLE incoming_docs 
  ADD COLUMN IF NOT EXISTS extracted_text TEXT,
  ADD COLUMN IF NOT EXISTS action_deadline TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS suggested_assignee_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS auto_processed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS is_reserved BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS reserved_by_telegram_id TEXT,
  ADD COLUMN IF NOT EXISTS reserved_by_name TEXT,
  ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]'::jsonb;

-- 3 Outgoing Docs Table
ALTER TABLE outgoing_docs 
  ADD COLUMN IF NOT EXISTS is_reserved BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS reserved_by_telegram_id TEXT,
  ADD COLUMN IF NOT EXISTS reserved_by_name TEXT,
  ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]'::jsonb;

-- 4 Orders Table
ALTER TABLE orders 
  ADD COLUMN IF NOT EXISTS is_reserved BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS reserved_by_telegram_id TEXT,
  ADD COLUMN IF NOT EXISTS reserved_by_name TEXT,
  ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]'::jsonb;

-- 5 Memos Table
ALTER TABLE memos 
  ADD COLUMN IF NOT EXISTS is_reserved BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS reserved_by_telegram_id TEXT,
  ADD COLUMN IF NOT EXISTS reserved_by_name TEXT,
  ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]'::jsonb;

-- 6 Service Area Students Table
ALTER TABLE service_area_students
  ADD COLUMN IF NOT EXISTS school_enrolled TEXT,
  ADD COLUMN IF NOT EXISTS guardian_name TEXT,
  ADD COLUMN IF NOT EXISTS enroll_class TEXT;

-- 7 School Knowledge Table
CREATE TABLE IF NOT EXISTS school_knowledge (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'ทั่วไป',
  source_doc_id UUID REFERENCES incoming_docs(id) ON DELETE CASCADE,
  source_type TEXT DEFAULT 'manual',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE school_knowledge ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for authenticated users on school_knowledge" ON school_knowledge;
CREATE POLICY "Allow all for authenticated users on school_knowledge" ON school_knowledge
  FOR ALL USING (auth.uid() IS NOT NULL);

-- 8 Document Checklists Table
CREATE TABLE IF NOT EXISTS document_checklists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  required_items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE document_checklists ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for authenticated users on document_checklists" ON document_checklists;
CREATE POLICY "Allow all for authenticated users on document_checklists" ON document_checklists
  FOR ALL USING (auth.uid() IS NOT NULL);

-- 9 Athletics Registrations Table
CREATE TABLE IF NOT EXISTS athletics_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL,
  academic_year TEXT NOT NULL,
  prefix TEXT,
  first_name TEXT,
  last_name TEXT,
  gender TEXT,
  birth_date DATE,
  class_level TEXT,
  room TEXT,
  weight NUMERIC,
  height NUMERIC,
  photo_url TEXT,
  citizen_id TEXT,
  sport_item TEXT,
  category TEXT,
  is_substitute BOOLEAN DEFAULT false,
  competition_type TEXT DEFAULT 'local',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE athletics_registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for authenticated users on athletics_registrations" ON athletics_registrations;
CREATE POLICY "Allow all for authenticated users on athletics_registrations" ON athletics_registrations
  FOR ALL USING (auth.uid() IS NOT NULL);


-- เพิ่มคอลัมน์ตั้งค่าเลขเริ่มต้นและหมวดหนังสือส่งในตาราง settings
ALTER TABLE settings 
  ADD COLUMN IF NOT EXISTS school_doc_prefix TEXT DEFAULT 'ศธ 04225.016/',
  ADD COLUMN IF NOT EXISTS start_incoming_seq INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS start_outgoing_seq INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS start_memo_seq INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS start_order_seq INTEGER DEFAULT 1;
