-- ====================================================================
-- 🏫 SUPABASE SQL MIGRATION PATCH: COMPLETE MODULES FOR HYBRID (V1.3.1)
-- แก้ไขปัญหา Column "date" does not exist โดยเพิ่มคำสั่ง ALTER TABLE 
-- ครบทุกคอลัมน์ก่อนสร้าง Index และฟังก์ชัน ปลอดภัย 100% รันได้ทันที
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. อัปเดตตาราง settings
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
-- 4. ตารางบันทึกเวลาเรียน (Attendance) - ป้องกัน Column "date" does not exist
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

-- เพิ่มคอลัมน์ date และ summary อย่างชัดเจนในกรณีที่ตารางเดิมเคยมีอยู่แล้ว
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE DEFAULT get_user_school_id();
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS date DATE DEFAULT CURRENT_DATE;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS class_level TEXT;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS room TEXT;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS attendance_data JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS summary JSONB DEFAULT '{"present": 0, "absent": 0, "leave": 0, "late": 0}'::jsonb;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS teacher_id UUID;
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS recorded_at TIMESTAMPTZ DEFAULT NOW();

-- เชื่อมโยงข้อมูล check_date เดิมเข้าสู่คอลัมน์ date (ถ้ามี)
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
  duty_day TEXT NOT NULL, -- Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
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

-- แหล่งงบประมาณ (Budget Allocations)
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

-- โครงการตามแผนปฏิบัติการ (School Projects)
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

-- การโอนเงิน/ถัวจ่ายงบประมาณ (Budget Transfers)
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

-- ข้อมูลร้านค้า / ผู้รับจ้าง (Vendors)
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

-- รายการจัดซื้อจัดจ้าง (Procurement Projects)
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

  -- 1. นับจำนวนนักเรียนปัจจุบัน
  SELECT COUNT(*) INTO v_total_students
  FROM public.students
  WHERE (academic_year = target_year OR target_year IS NULL)
    AND (v_school_id IS NULL OR school_id = v_school_id)
    AND (status = 'active' OR graduation_status ILIKE '%กำลังศึกษา%' OR graduation_status = 'ปกติ');

  -- 2. นับหนังสือรับวันนี้
  SELECT COUNT(*) INTO v_incoming_today
  FROM public.incoming_docs
  WHERE (doc_date = today_date OR created_at::date = today_date)
    AND (v_school_id IS NULL OR school_id = v_school_id);

  -- 3. รวมจำนวนนักเรียนที่มาเรียนวันนี้
  SELECT COALESCE(SUM((summary->>'present')::int), 0) INTO v_present_today
  FROM public.attendance
  WHERE date = today_date
    AND (v_school_id IS NULL OR school_id = v_school_id);

  -- 4. ส่งกลับเป็น JSON Object
  result := jsonb_build_object(
    'total_students', v_total_students,
    'incoming_today', v_incoming_today,
    'present_today', v_present_today
  );

  RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_dashboard_stats(TEXT, DATE, UUID) TO authenticated, anon;
