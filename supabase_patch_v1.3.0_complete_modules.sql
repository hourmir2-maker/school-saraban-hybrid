
-- เพิ่มคอลัมน์ Telegram / LINE ใน profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS telegram_chat_id TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS telegram_username TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS line_user_id TEXT;

-- เพิ่มคอลัมน์ Telegram / LINE ใน teachers
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS telegram_chat_id TEXT;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS telegram_username TEXT;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS line_user_id TEXT;

-- เพิ่มคอลัมน์ Telegram Bot / Group Link ใน settings
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS telegram_bot_username TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS telegram_group_link TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS line_oa_link TEXT;

-- ====================================================================
-- 🏫 SUPABASE SQL MIGRATION PATCH: COMPLETE MODULES FOR HYBRID (V1.3.2)
-- รวมการแก้ไข:
-- 1. สร้าง RPC get_attendance_summary และ get_dashboard_stats
-- 2. สร้างค่าเริ่มต้นในตาราง settings (ป้องกัน Error 406 Not Acceptable)
-- 3. ตรวจสอบและเพิ่มคอลัมน์ vendor_name, vendor_info, date ให้ครบถ้วน
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. อัปเดตตาราง settings และแทรกข้อมูลเริ่มต้น (ป้องกัน 406)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  school_name TEXT,
  school_address TEXT,
  director_name TEXT,
  current_academic_year TEXT DEFAULT '2569',
  current_term TEXT DEFAULT '1',
  school_doc_prefix TEXT DEFAULT 'ศธ ๐๔',
  start_incoming_seq INT DEFAULT 1,
  start_outgoing_seq INT DEFAULT 1,
  start_memo_seq INT DEFAULT 1,
  start_order_seq INT DEFAULT 1,
  school_logo_url TEXT,
  phone_number TEXT,
  local_gov_name TEXT,
  line_channel_access_token TEXT,
  line_group_id TEXT,
  line_bot_enabled BOOLEAN DEFAULT true,
  telegram_group_id TEXT,
  telegram_bot_enabled BOOLEAN DEFAULT true,
  gemini_api_key TEXT,
  ai_cowork_api_key TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS school_name TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS director_name TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS current_academic_year TEXT DEFAULT '2569';
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS current_term TEXT DEFAULT '1';
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS school_doc_prefix TEXT DEFAULT 'ศธ ๐๔';
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS start_incoming_seq INT DEFAULT 1;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS start_outgoing_seq INT DEFAULT 1;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS start_memo_seq INT DEFAULT 1;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS start_order_seq INT DEFAULT 1;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS telegram_group_id TEXT;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS line_bot_enabled BOOLEAN DEFAULT true;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS telegram_bot_enabled BOOLEAN DEFAULT true;
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS ai_cowork_api_key TEXT;

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all access on settings" ON public.settings;
CREATE POLICY "Allow all access on settings" ON public.settings
  FOR ALL USING (true) WITH CHECK (true);

-- แทรกข้อมูลเริ่มต้นใน settings หากยังไม่มีข้อมูล (ป้องกัน Error 406 เมื่อ frontend เรียกใช้ .single())
INSERT INTO public.settings (school_name, current_academic_year, current_term, school_doc_prefix)
SELECT 'โรงเรียนสังกัดเครือข่าย', '2569', '1', 'ศธ ๐๔'
WHERE NOT EXISTS (SELECT 1 FROM public.settings);

-- --------------------------------------------------------------------
-- 2. อัปเดตตารางสารบรรณ (incoming_docs, outgoing_docs, memos, orders)
-- --------------------------------------------------------------------
ALTER TABLE public.incoming_docs ADD COLUMN IF NOT EXISTS doc_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE public.incoming_docs ADD COLUMN IF NOT EXISTS is_reserved BOOLEAN DEFAULT false;
ALTER TABLE public.incoming_docs ADD COLUMN IF NOT EXISTS reserved_by_name TEXT;
ALTER TABLE public.incoming_docs ADD COLUMN IF NOT EXISTS action_deadline DATE;

ALTER TABLE public.outgoing_docs ADD COLUMN IF NOT EXISTS doc_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE public.outgoing_docs ADD COLUMN IF NOT EXISTS is_reserved BOOLEAN DEFAULT false;
ALTER TABLE public.outgoing_docs ADD COLUMN IF NOT EXISTS reserved_by_name TEXT;
ALTER TABLE public.outgoing_docs ADD COLUMN IF NOT EXISTS to_agency TEXT;

ALTER TABLE public.memos ADD COLUMN IF NOT EXISTS memo_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE public.memos ADD COLUMN IF NOT EXISTS doc_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE public.memos ADD COLUMN IF NOT EXISTS is_reserved BOOLEAN DEFAULT false;
ALTER TABLE public.memos ADD COLUMN IF NOT EXISTS reserved_by_name TEXT;

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS order_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS doc_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS is_reserved BOOLEAN DEFAULT false;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS reserved_by_name TEXT;

-- --------------------------------------------------------------------
-- 3. ตารางข้อมูลนักเรียน (Students)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  academic_year TEXT DEFAULT '2569',
  national_id TEXT,
  student_id TEXT,
  prefix TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  gender TEXT,
  class_level TEXT,
  room TEXT,
  birth_date DATE,
  weight NUMERIC,
  height NUMERIC,
  blood_group TEXT,
  religion TEXT,
  ethnicity TEXT,
  nationality TEXT,
  status TEXT DEFAULT 'active',
  graduation_status TEXT DEFAULT 'ปกติ',
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.students ADD COLUMN IF NOT EXISTS school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id();
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS academic_year TEXT DEFAULT '2569';
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS graduation_status TEXT DEFAULT 'ปกติ';
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS class_level TEXT;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS room TEXT;

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on students" ON public.students;
CREATE POLICY "Allow school-specific access on students" ON public.students
  FOR ALL USING (school_id = get_user_school_id() OR school_id IS NULL)
  WITH CHECK (school_id = get_user_school_id() OR school_id IS NULL);

CREATE INDEX IF NOT EXISTS idx_students_school_year ON public.students(school_id, academic_year);

-- --------------------------------------------------------------------
-- 4. ตารางบันทึกเวลาเรียน (Attendance)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  class_level TEXT,
  room TEXT,
  attendance_data JSONB DEFAULT '[]'::jsonb,
  summary JSONB DEFAULT '{"present": 0, "absent": 0, "leave": 0, "late": 0}'::jsonb,
  teacher_id UUID,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id();
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS date DATE DEFAULT CURRENT_DATE;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS class_level TEXT;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS room TEXT;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS attendance_data JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS summary JSONB DEFAULT '{"present": 0, "absent": 0, "leave": 0, "late": 0}'::jsonb;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS teacher_id UUID;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS recorded_at TIMESTAMPTZ DEFAULT NOW();

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'attendance' AND column_name = 'check_date') THEN
    UPDATE public.attendance SET date = check_date WHERE date IS NULL;
  END IF;
END $$;

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on attendance" ON public.attendance;
CREATE POLICY "Allow school-specific access on attendance" ON public.attendance
  FOR ALL USING (school_id = get_user_school_id() OR school_id IS NULL)
  WITH CHECK (school_id = get_user_school_id() OR school_id IS NULL);

CREATE INDEX IF NOT EXISTS idx_attendance_school_date ON public.attendance(school_id, date);

-- --------------------------------------------------------------------
-- 5. ตารางครูเวรประจำวัน (Teacher Duties)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.teacher_duties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  teacher_id UUID,
  duty_day TEXT NOT NULL,
  duty_type TEXT DEFAULT 'เวรประจำวัน',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.teacher_duties ADD COLUMN IF NOT EXISTS school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id();
ALTER TABLE public.teacher_duties ADD COLUMN IF NOT EXISTS teacher_id UUID;
ALTER TABLE public.teacher_duties ADD COLUMN IF NOT EXISTS duty_day TEXT DEFAULT 'Monday';
ALTER TABLE public.teacher_duties ADD COLUMN IF NOT EXISTS duty_type TEXT DEFAULT 'เวรประจำวัน';

ALTER TABLE public.teacher_duties ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on teacher_duties" ON public.teacher_duties;
CREATE POLICY "Allow school-specific access on teacher_duties" ON public.teacher_duties
  FOR ALL USING (school_id = get_user_school_id() OR school_id IS NULL)
  WITH CHECK (school_id = get_user_school_id() OR school_id IS NULL);

CREATE INDEX IF NOT EXISTS idx_teacher_duties_school_day ON public.teacher_duties(school_id, duty_day);

-- --------------------------------------------------------------------
-- 6. ตารางบันทึกการลงเวลาปฏิบัติงาน / WFH (wfh_logs)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wfh_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  user_id UUID,
  profile_id UUID,
  teacher_name TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  log_type TEXT DEFAULT 'in',
  location TEXT,
  details TEXT,
  gps TEXT,
  photo_url TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.wfh_logs ADD COLUMN IF NOT EXISTS school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id();
ALTER TABLE public.wfh_logs ADD COLUMN IF NOT EXISTS user_id UUID;
ALTER TABLE public.wfh_logs ADD COLUMN IF NOT EXISTS profile_id UUID;
ALTER TABLE public.wfh_logs ADD COLUMN IF NOT EXISTS timestamp TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.wfh_logs ADD COLUMN IF NOT EXISTS log_type TEXT DEFAULT 'in';
ALTER TABLE public.wfh_logs ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.wfh_logs ADD COLUMN IF NOT EXISTS details TEXT;
ALTER TABLE public.wfh_logs ADD COLUMN IF NOT EXISTS gps TEXT;
ALTER TABLE public.wfh_logs ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

ALTER TABLE public.wfh_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on wfh_logs" ON public.wfh_logs;
CREATE POLICY "Allow school-specific access on wfh_logs" ON public.wfh_logs
  FOR ALL USING (school_id = get_user_school_id() OR school_id IS NULL)
  WITH CHECK (school_id = get_user_school_id() OR school_id IS NULL);

CREATE INDEX IF NOT EXISTS idx_wfh_logs_school_time ON public.wfh_logs(school_id, timestamp);

-- --------------------------------------------------------------------
-- 7. ระบบงบประมาณและพัสดุ (Budget & Procurement)
-- --------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.budget_allocations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  academic_year TEXT NOT NULL DEFAULT '2569',
  budget_type TEXT NOT NULL,
  category_name TEXT NOT NULL,
  amount NUMERIC(15, 2) DEFAULT 0,
  spent_amount NUMERIC(15, 2) DEFAULT 0,
  remaining_amount NUMERIC(15, 2) DEFAULT 0,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.budget_allocations ADD COLUMN IF NOT EXISTS school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id();
ALTER TABLE public.budget_allocations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on budget_allocations" ON public.budget_allocations;
CREATE POLICY "Allow school-specific access on budget_allocations" ON public.budget_allocations
  FOR ALL USING (school_id = get_user_school_id() OR school_id IS NULL)
  WITH CHECK (school_id = get_user_school_id() OR school_id IS NULL);

CREATE TABLE IF NOT EXISTS public.school_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  project_name TEXT NOT NULL,
  academic_year TEXT NOT NULL DEFAULT '2569',
  budget_id UUID REFERENCES public.budget_allocations(id) ON DELETE SET NULL,
  planned_amount NUMERIC(15, 2) DEFAULT 0,
  current_amount NUMERIC(15, 2) DEFAULT 0,
  spent_amount NUMERIC(15, 2) DEFAULT 0,
  remaining_amount NUMERIC(15, 2) DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.school_projects ADD COLUMN IF NOT EXISTS school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id();
ALTER TABLE public.school_projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on school_projects" ON public.school_projects;
CREATE POLICY "Allow school-specific access on school_projects" ON public.school_projects
  FOR ALL USING (school_id = get_user_school_id() OR school_id IS NULL)
  WITH CHECK (school_id = get_user_school_id() OR school_id IS NULL);

CREATE TABLE IF NOT EXISTS public.budget_transfers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  from_project_id UUID REFERENCES public.school_projects(id) ON DELETE SET NULL,
  to_project_id UUID REFERENCES public.school_projects(id) ON DELETE SET NULL,
  amount NUMERIC(15, 2) NOT NULL,
  reason TEXT,
  transfer_date DATE DEFAULT CURRENT_DATE,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.budget_transfers ADD COLUMN IF NOT EXISTS school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id();
ALTER TABLE public.budget_transfers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on budget_transfers" ON public.budget_transfers;
CREATE POLICY "Allow school-specific access on budget_transfers" ON public.budget_transfers
  FOR ALL USING (school_id = get_user_school_id() OR school_id IS NULL)
  WITH CHECK (school_id = get_user_school_id() OR school_id IS NULL);

CREATE TABLE IF NOT EXISTS public.vendors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  vendor_name TEXT NOT NULL,
  address TEXT,
  tax_id TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id();
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on vendors" ON public.vendors;
CREATE POLICY "Allow school-specific access on vendors" ON public.vendors
  FOR ALL USING (school_id = get_user_school_id() OR school_id IS NULL)
  WITH CHECK (school_id = get_user_school_id() OR school_id IS NULL);

CREATE TABLE IF NOT EXISTS public.procurement_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  project_id UUID REFERENCES public.school_projects(id) ON DELETE SET NULL,
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE SET NULL,
  project_name TEXT NOT NULL,
  academic_year TEXT NOT NULL DEFAULT '2569',
  method TEXT DEFAULT 'เฉพาะเจาะจง',
  procurement_type TEXT DEFAULT 'ซื้อ',
  document_set_id TEXT DEFAULT 'material_egp',
  total_amount NUMERIC(15, 2) DEFAULT 0,
  necessity_reason TEXT,
  vendor_info JSONB DEFAULT '{"name": "", "address": "", "tax_id": ""}'::jsonb,
  vendor_name TEXT,
  vendor_address TEXT,
  vendor_tax_id TEXT,
  items JSONB DEFAULT '[]'::jsonb,
  committees JSONB DEFAULT '[]'::jsonb,
  ai_draft_content JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'draft',
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.procurement_projects ADD COLUMN IF NOT EXISTS school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id();
ALTER TABLE public.procurement_projects ADD COLUMN IF NOT EXISTS vendor_name TEXT;
ALTER TABLE public.procurement_projects ADD COLUMN IF NOT EXISTS vendor_address TEXT;
ALTER TABLE public.procurement_projects ADD COLUMN IF NOT EXISTS vendor_tax_id TEXT;
ALTER TABLE public.procurement_projects ADD COLUMN IF NOT EXISTS vendor_info JSONB DEFAULT '{"name": "", "address": "", "tax_id": ""}'::jsonb;
ALTER TABLE public.procurement_projects ADD COLUMN IF NOT EXISTS document_set_id TEXT DEFAULT 'material_egp';
ALTER TABLE public.procurement_projects ADD COLUMN IF NOT EXISTS ai_draft_content JSONB DEFAULT '{}'::jsonb;

ALTER TABLE public.procurement_projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on procurement_projects" ON public.procurement_projects;
CREATE POLICY "Allow school-specific access on procurement_projects" ON public.procurement_projects
  FOR ALL USING (school_id = get_user_school_id() OR school_id IS NULL)
  WITH CHECK (school_id = get_user_school_id() OR school_id IS NULL);

-- --------------------------------------------------------------------
-- 8. RPC ฟังก์ชันคำนวณสถิติหน้า Dashboard (get_dashboard_stats)
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_dashboard_stats(
  target_year TEXT DEFAULT '2569',
  today_date DATE DEFAULT CURRENT_DATE,
  target_school_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_school_id UUID;
  v_total_students INT := 0;
  v_incoming_today INT := 0;
  v_present_today INT := 0;
  result JSONB;
BEGIN
  v_school_id := COALESCE(target_school_id, get_user_school_id());

  SELECT COUNT(*) INTO v_total_students
  FROM public.students
  WHERE (academic_year = target_year OR target_year IS NULL)
    AND (v_school_id IS NULL OR school_id = v_school_id)
    AND (status = 'active' OR graduation_status ILIKE '%กำลังศึกษา%' OR graduation_status = 'ปกติ');

  SELECT COUNT(*) INTO v_incoming_today
  FROM public.incoming_docs
  WHERE (doc_date = today_date OR created_at::date = today_date)
    AND (v_school_id IS NULL OR school_id = v_school_id);

  SELECT COALESCE(SUM((summary->>'present')::int), 0) INTO v_present_today
  FROM public.attendance
  WHERE date = today_date
    AND (v_school_id IS NULL OR school_id = v_school_id);

  result := jsonb_build_object(
    'total_students', v_total_students,
    'incoming_today', v_incoming_today,
    'present_today', v_present_today
  );

  RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_dashboard_stats(TEXT, DATE, UUID) TO authenticated, anon;

-- --------------------------------------------------------------------
-- 9. RPC ฟังก์ชันคำนวณสรุปการเข้าเรียน (get_attendance_summary)
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_attendance_summary(
  start_date DATE,
  end_date DATE,
  target_school_id UUID DEFAULT NULL
)
RETURNS TABLE (
  total_present BIGINT,
  total_absent BIGINT,
  total_late BIGINT,
  total_leave BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_school_id UUID;
BEGIN
  v_school_id := COALESCE(target_school_id, get_user_school_id());

  RETURN QUERY
  SELECT 
    COALESCE(SUM((summary->>'present')::bigint), 0) AS total_present,
    COALESCE(SUM((summary->>'absent')::bigint), 0) AS total_absent,
    COALESCE(SUM((summary->>'late')::bigint), 0) AS total_late,
    COALESCE(SUM((summary->>'leave')::bigint), 0) AS total_leave
  FROM public.attendance
  WHERE date >= start_date AND date <= end_date
    AND (v_school_id IS NULL OR school_id = v_school_id);
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_attendance_summary(DATE, DATE, UUID) TO authenticated, anon;
