-- ==========================================================
-- 🏫 ระบบสารบรรณและบอทน้องชบา AI เวอร์ชัน Hybrid (Multi-Tenant)
-- ฐานข้อมูลกลางสำหรับรองรับ 13 โรงเรียนในเครือข่าย
-- ==========================================================

-- เปิดใช้งาน Extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================================
-- 1. ตารางจัดการโรงเรียนและกุญแจเชื่อมต่อ (Schools Registry)
-- ==========================================================
CREATE TABLE schools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_code TEXT UNIQUE NOT NULL,      -- รหัสโรงเรียน เช่น 'SKW001'
  school_name TEXT NOT NULL,             -- ชื่อโรงเรียน
  gas_url TEXT,                          -- ลิงก์ Google Apps Script สำหรับอัปโหลดไฟล์ของโรงเรียน
  
  -- LINE Configuration
  line_channel_access_token TEXT,        -- คีย์ส่งไลน์บอทประจำโรงเรียน
  line_bot_destination TEXT,             -- รหัส Webhook Destination ของโรงเรียน
  
  -- Telegram Configuration
  telegram_bot_token TEXT,               -- Token บอท Telegram ประจำโรงเรียน
  
  -- AI Configuration (Optional: สำหรับใช้ API Key ของตนเอง)
  gemini_api_key TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- สร้างดัชนีสำหรับความเร็วในการค้นหาโรงเรียนจากบอทไอดี
CREATE INDEX idx_schools_line_destination ON schools(line_bot_destination);
CREATE INDEX idx_schools_code ON schools(school_code);

-- ==========================================================
-- 2. ฟังก์ชันความปลอดภัยสำหรับดึงรหัสโรงเรียนของผู้ใช้ปัจจุบัน (Helper Function)
-- ==========================================================
-- ใช้เพื่อดึงค่า school_id ของผู้ใช้ที่ล็อกอินอยู่ เพื่อใช้ทำระบบ RLS แยกโรงเรียนแบบอัตโนมัติ
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'guest',
  status TEXT DEFAULT 'active',
  extra_permissions JSONB DEFAULT '{}',
  signature_url TEXT,
  line_user_id TEXT,
  ai_global_instructions TEXT,
  ai_writing_style TEXT,
  ai_preferred_model TEXT DEFAULT 'gemini-1.5-flash',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION get_user_school_id()
RETURNS UUID AS $$
  SELECT school_id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- ==========================================================
-- 3. ตารางข้อมูลตั้งค่าสถานศึกษา (Settings)
-- ==========================================================
CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE UNIQUE, -- ลิงก์ตรงแบบ 1:1 กับตารางโรงเรียน
  school_name TEXT,
  school_address TEXT,
  director_name TEXT,
  current_academic_year TEXT DEFAULT '2569',
  current_term TEXT DEFAULT '1',
  school_logo_url TEXT,
  phone_number TEXT,
  local_gov_name TEXT,
  line_channel_access_token TEXT,
  line_group_id TEXT,
  gemini_api_key TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================
-- 4. ตารางทะเบียนครู (Teachers)
-- ==========================================================
CREATE TABLE teachers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  prefix TEXT,
  first_name TEXT,
  last_name TEXT,
  position TEXT,
  department TEXT,
  phone TEXT,
  email TEXT,
  photo_url TEXT,
  line_user_id TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================
-- 5. ตารางทะเบียนหนังสือรับ (Incoming Documents)
-- ==========================================================
CREATE TABLE incoming_docs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  doc_number TEXT,
  from_agency TEXT,
  to_agency TEXT,
  subject TEXT,
  doc_date DATE,
  urgency TEXT,
  secrecy TEXT,
  doc_type TEXT,
  action_required TEXT,
  remark TEXT,
  file_url TEXT,                        -- ลิงก์ชี้ไปยัง Google Drive ของโรงเรียนตนเอง
  attachment_urls JSONB DEFAULT '[]',   -- ลิงก์ไฟล์แนบเพิ่มเติมใน Google Drive
  status TEXT DEFAULT 'pending',         -- pending, approved, rejected
  ai_status TEXT,
  ai_suggestion TEXT,
  ai_score TEXT,
  doc_year INTEGER,
  doc_sequence INTEGER,
  extracted_text TEXT,                  -- คอลัมน์เก็บข้อความหนังสือดิบฉบับเต็มเพื่อใช้ Deep Search
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users
);

-- ==========================================================
-- 6. ตารางทะเบียนหนังสือส่ง (Outgoing Documents)
-- ==========================================================
CREATE TABLE outgoing_docs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  doc_number TEXT,
  from_agency TEXT,
  to_agency TEXT,
  subject TEXT,
  doc_date DATE,
  urgency TEXT,
  secrecy TEXT,
  sender_name TEXT,
  remark TEXT,
  file_url TEXT,                        -- ลิงก์ชี้ไปยัง Google Drive ของโรงเรียนตนเอง
  status TEXT DEFAULT 'pending',
  doc_year INTEGER,
  doc_sequence INTEGER,
  extracted_text TEXT,                  -- ข้อความตัวเต็มเพื่อค้นหาลึก
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users
);

-- ==========================================================
-- 7. ตารางคำสั่ง (Orders)
-- ==========================================================
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  order_number TEXT,
  subject TEXT,
  issuer TEXT,
  order_date DATE,
  secrecy TEXT,
  remark TEXT,
  file_url TEXT,
  status TEXT DEFAULT 'pending',
  doc_year INTEGER,
  doc_sequence INTEGER,
  extracted_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users
);

-- ==========================================================
-- 8. ตารางบันทึกข้อความ (Memos)
-- ==========================================================
CREATE TABLE memos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  memo_number TEXT,
  subject TEXT,
  requester TEXT,
  department TEXT,
  memo_date DATE,
  urgency TEXT,
  secrecy TEXT,
  remark TEXT,
  file_url TEXT,
  status TEXT DEFAULT 'pending',
  doc_year INTEGER,
  doc_sequence INTEGER,
  extracted_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users
);

-- ==========================================================
-- 9. ตารางติดตามงาน / มอบหมายงาน (Document Assignments)
-- ==========================================================
CREATE TABLE doc_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doc_id UUID REFERENCES incoming_docs ON DELETE CASCADE,
  assignee_id UUID REFERENCES teachers ON DELETE CASCADE,
  instruction TEXT,
  status TEXT DEFAULT 'pending', -- pending, acknowledged, completed, closed
  staff_report TEXT,
  report_file_urls JSONB DEFAULT '[]',
  reported_at TIMESTAMPTZ,
  director_feedback TEXT,
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================
-- 10. ตารางสื่อการเรียนรู้ AR (AR Lessons)
-- ==========================================================
CREATE TABLE ar_lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users,
  title TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================
-- 11. ตารางรายละเอียดขั้นตอนบทเรียน AR (AR Steps)
-- ==========================================================
CREATE TABLE ar_steps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES ar_lessons(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  step_text TEXT NOT NULL,
  emoji TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================
-- 🛠️ ตั้งค่าระบบรักษาความปลอดภัยแยกโรงเรียน (Row-Level Security)
-- ==========================================================

-- 1. เปิดสิทธิ์ RLS ในแต่ละตาราง
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE incoming_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE outgoing_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE memos ENABLE ROW LEVEL SECURITY;
ALTER TABLE doc_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ar_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE ar_steps ENABLE ROW LEVEL SECURITY;

-- 2. นโยบายสำหรับตารางโรงเรียน (Schools): อนุญาตให้เฉพาะผู้ลงทะเบียนแล้วมองเห็น
CREATE POLICY "Allow select for authenticated users" ON schools FOR SELECT USING (auth.uid() IS NOT NULL);

-- 3. นโยบายสิทธิ์การเข้าถึงข้อมูลตามโรงเรียนของตนเอง (Tenant Isolation Policies)
CREATE POLICY "School-based select" ON settings FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based update" ON settings FOR UPDATE USING (school_id = get_user_school_id());

CREATE POLICY "School-based select" ON profiles FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based update" ON profiles FOR UPDATE USING (school_id = get_user_school_id() AND auth.uid() = id);

CREATE POLICY "School-based select" ON teachers FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based all" ON teachers FOR ALL USING (school_id = get_user_school_id());

CREATE POLICY "School-based select" ON incoming_docs FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based all" ON incoming_docs FOR ALL USING (school_id = get_user_school_id());

CREATE POLICY "School-based select" ON outgoing_docs FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based all" ON outgoing_docs FOR ALL USING (school_id = get_user_school_id());

CREATE POLICY "School-based select" ON orders FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based all" ON orders FOR ALL USING (school_id = get_user_school_id());

CREATE POLICY "School-based select" ON memos FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based all" ON memos FOR ALL USING (school_id = get_user_school_id());

CREATE POLICY "School-based select" ON ar_lessons FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based all" ON ar_lessons FOR ALL USING (school_id = get_user_school_id());

-- 4. นโยบายสำหรับข้อมูลขั้นตอน AR และการมอบหมายงาน (เชื่อมสัมพันธ์จากตารางหลัก)
CREATE POLICY "Allow view assignments of own school" ON doc_assignments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM incoming_docs 
    WHERE incoming_docs.id = doc_assignments.doc_id 
    AND incoming_docs.school_id = get_user_school_id()
  )
);
CREATE POLICY "Allow manage assignments of own school" ON doc_assignments FOR ALL USING (
  EXISTS (
    SELECT 1 FROM incoming_docs 
    WHERE incoming_docs.id = doc_assignments.doc_id 
    AND incoming_docs.school_id = get_user_school_id()
  )
);

CREATE POLICY "Allow view ar steps of own school" ON ar_steps FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM ar_lessons 
    WHERE ar_lessons.id = ar_steps.lesson_id 
    AND ar_lessons.school_id = get_user_school_id()
  )
);
CREATE POLICY "Allow manage ar steps of own school" ON ar_steps FOR ALL USING (
  EXISTS (
    SELECT 1 FROM ar_lessons 
    WHERE ar_lessons.id = ar_steps.lesson_id 
    AND ar_lessons.school_id = get_user_school_id()
  )
);
