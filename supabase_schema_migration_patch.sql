-- ====================================================================
-- 🛠️ SQL MIGRATION PATCH: IMPORT MODULES FROM MULTISCHOOL TO HYBRID (V4)
-- Description: รันสคริปต์นี้ใน SQL Editor ของ Supabase (ฝั่ง school-saraban-hybrid)
-- ปรับปรุงตารางห้องสมุด (library_books, library_borrow, library_usage_logs)
-- ให้คอลัมน์ตรงกับโครงสร้างต้นฉบับ 100% เพื่อไม่ให้เกิด Error 400
-- ====================================================================

-- --------------------------------------------------------------------
-- ลบตารางกลุ่มห้องสมุดเดิมออกเพื่อเตรียมอัปเดตโครงสร้างใหม่
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS public.library_usage_logs CASCADE;
DROP TABLE IF EXISTS public.library_borrow CASCADE;
DROP TABLE IF EXISTS public.library_books CASCADE;

-- --------------------------------------------------------------------
-- 1. ตารางปีการศึกษา (School Years)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.school_years (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  year TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, year)
);

ALTER TABLE public.school_years ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on school_years" ON public.school_years;
CREATE POLICY "Allow school-specific access on school_years" ON public.school_years
  FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

-- --------------------------------------------------------------------
-- 2. ตารางข้อมูลนักเรียน (Students)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  academic_year TEXT,
  school_name TEXT,
  national_id TEXT,
  class_level TEXT,
  room TEXT,
  student_id TEXT,
  gender TEXT,
  prefix TEXT,
  first_name TEXT,
  last_name TEXT,
  birth_date DATE,
  weight NUMERIC,
  height NUMERIC,
  blood_group TEXT,
  religion TEXT,
  ethnicity TEXT,
  nationality TEXT,
  address_no TEXT,
  moo TEXT,
  soi_road TEXT,
  sub_district TEXT,
  district TEXT,
  province TEXT,
  parent_first_name TEXT,
  parent_last_name TEXT,
  parent_occupation TEXT,
  parent_relation TEXT,
  father_first_name TEXT,
  father_last_name TEXT,
  father_occupation TEXT,
  mother_first_name TEXT,
  mother_last_name TEXT,
  mother_occupation TEXT,
  disadvantage_status TEXT,
  graduation_status TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on students" ON public.students;
CREATE POLICY "Allow school-specific access on students" ON public.students
  FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

CREATE INDEX IF NOT EXISTS idx_students_school_id ON public.students(school_id);
CREATE INDEX IF NOT EXISTS idx_students_class_room ON public.students(class_level, room);

-- --------------------------------------------------------------------
-- 3. ตารางบันทึกเวลาเรียน (Attendance)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  check_date DATE NOT NULL,
  status TEXT NOT NULL, -- present, absent, late, sick, leave
  remark TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on attendance" ON public.attendance;
CREATE POLICY "Allow school-specific access on attendance" ON public.attendance
  FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

CREATE INDEX IF NOT EXISTS idx_attendance_school_id ON public.attendance(school_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_date ON public.attendance(student_id, check_date);

-- --------------------------------------------------------------------
-- 4. ตารางลงเวลาปฏิบัติงาน (WFH Logs)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wfh_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE CASCADE,
  work_date DATE NOT NULL,
  status TEXT DEFAULT 'wfh', -- wfh, onsite, leave
  details TEXT,
  image_url TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  check_in_time TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.wfh_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on wfh_logs" ON public.wfh_logs;
CREATE POLICY "Allow school-specific access on wfh_logs" ON public.wfh_logs
  FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

CREATE INDEX IF NOT EXISTS idx_wfh_logs_school_id ON public.wfh_logs(school_id);

-- --------------------------------------------------------------------
-- 5. ระบบห้องสมุด (Library Modules) - ปรับปรุงโครงสร้างคอลัมน์ให้ตรง 100%
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.library_books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  book_id TEXT,                              -- รหัสหนังสือ เช่น B001
  title TEXT,                                -- ชื่อหนังสือ
  category TEXT,                             -- หมวดหมู่
  author TEXT,                               -- ชื่อผู้แต่ง
  total_qty INTEGER DEFAULT 1,               -- จำนวนทั้งหมด
  available_qty INTEGER DEFAULT 1,           -- จำนวนคงเหลือ
  added_date DATE DEFAULT CURRENT_DATE,      -- วันที่เพิ่มหนังสือ
  status TEXT DEFAULT 'available',           -- สถานะ เช่น available, lost
  UNIQUE(school_id, book_id)                 -- ป้องกันรหัสหนังสือซ้ำซ้อนภายในโรงเรียนเดียวกัน
);

CREATE TABLE IF NOT EXISTS public.library_borrow (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  borrow_date DATE DEFAULT CURRENT_DATE,     -- วันยืม
  book_id UUID REFERENCES public.library_books(id) ON DELETE CASCADE, -- ลิงก์ตรงไอดีหนังสือ
  borrower_id TEXT,                          -- ไอดีผู้ยืม (ครู/นักเรียน - รองรับ Text รหัสนักเรียน หรือ UUID)
  borrower_name TEXT,                        -- ชื่อผู้ยืม
  return_date DATE,                          -- วันคืน
  status TEXT DEFAULT 'borrowing',           -- สถานะ เช่น borrowing, returned
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.library_usage_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  date DATE DEFAULT CURRENT_DATE,            -- วันเข้าใช้
  time_in TIME DEFAULT CURRENT_TIME,         -- เวลาเข้า
  time_out TIME,                             -- เวลาออก
  user_id UUID,                              -- ไอดีผู้ใช้ (ครู)
  student_id TEXT,                           -- รหัสนักเรียน (ถ้าเป็นนักเรียน)
  name TEXT,                                 -- ชื่อผู้เข้าใช้
  level TEXT,                                -- ระดับชั้น
  purpose TEXT,                              -- วัตถุประสงค์
  notes TEXT,                                -- บันทึกเพิ่มเติม
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.library_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_borrow ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_usage_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow school-specific access on library_books" ON public.library_books;
CREATE POLICY "Allow school-specific access on library_books" ON public.library_books FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

DROP POLICY IF EXISTS "Allow school-specific access on library_borrow" ON public.library_borrow;
CREATE POLICY "Allow school-specific access on library_borrow" ON public.library_borrow FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

DROP POLICY IF EXISTS "Allow school-specific access on library_usage_logs" ON public.library_usage_logs;
CREATE POLICY "Allow school-specific access on library_usage_logs" ON public.library_usage_logs FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

-- --------------------------------------------------------------------
-- 6. ระบบเบิกจ่ายค่าสาธารณูปโภค (Utilities)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.utilities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  type TEXT NOT NULL, -- electricity, water, telephone, internet
  academic_year TEXT,
  month TEXT,
  amount NUMERIC(10, 2),
  invoice_number TEXT,
  bill_date DATE,
  budget_source TEXT,
  status TEXT DEFAULT 'pending',
  remark TEXT,
  units_used NUMERIC(10, 2),
  requester_name TEXT,
  requester_position TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.utility_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  utility_id UUID REFERENCES public.utilities(id) ON DELETE CASCADE,
  meter_number TEXT,
  receipt_number TEXT,
  units_used NUMERIC(10, 2),
  amount NUMERIC(10, 2),
  book_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.utilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.utility_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow school-specific access on utilities" ON public.utilities;
CREATE POLICY "Allow school-specific access on utilities" ON public.utilities FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

DROP POLICY IF EXISTS "Allow school-specific access on utility_items" ON public.utility_items;
CREATE POLICY "Allow school-specific access on utility_items" ON public.utility_items FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

-- --------------------------------------------------------------------
-- 7. ระบบบริหารพัสดุและคู่ค้า (Procurements & Vendors)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.vendors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  vendor_name TEXT NOT NULL,
  tax_id TEXT,
  address TEXT,
  phone TEXT,
  contact_person TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.procurement_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  project_name TEXT NOT NULL,
  budget_source TEXT, -- e.g. 'งบดำเนินงาน', 'เงินอุดหนุนรายหัว'
  budget_amount NUMERIC NOT NULL,
  procurement_method TEXT, -- e.g. 'เฉพาะเจาะจง'
  status TEXT DEFAULT 'pending', -- pending, process, done
  director_name TEXT,
  finance_officer TEXT,
  procurement_officer TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.procurement_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  project_id UUID REFERENCES public.procurement_projects(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  quantity NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  price_per_unit NUMERIC NOT NULL,
  amount NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procurement_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procurement_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow school-specific access on vendors" ON public.vendors;
CREATE POLICY "Allow school-specific access on vendors" ON public.vendors FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

DROP POLICY IF EXISTS "Allow school-specific access on procurement_projects" ON public.procurement_projects;
CREATE POLICY "Allow school-specific access on procurement_projects" ON public.procurement_projects FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

DROP POLICY IF EXISTS "Allow school-specific access on procurement_items" ON public.procurement_items;
CREATE POLICY "Allow school-specific access on procurement_items" ON public.procurement_items FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

-- --------------------------------------------------------------------
-- 8. ระบบเขตพื้นที่บริการ (Service Area Students)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.service_area_students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  academic_year TEXT NOT NULL,
  national_id TEXT NOT NULL,
  prefix TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  gender TEXT,
  birth_date DATE,
  address_no TEXT,
  moo TEXT,
  soi_road TEXT,
  sub_district TEXT,
  district TEXT,
  province TEXT,
  status TEXT DEFAULT 'unregistered', -- unregistered, registered
  remark TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.service_area_students ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on service_area_students" ON public.service_area_students;
CREATE POLICY "Allow school-specific access on service_area_students" ON public.service_area_students
  FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

-- --------------------------------------------------------------------
-- 9. ระบบส่งแผนการสอน (Academic/Lesson Plans)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  code TEXT NOT NULL,                         -- รหัสวิชา เช่น ท11101
  name TEXT NOT NULL,                         -- ชื่อวิชา เช่น ภาษาไทย
  credits NUMERIC(3, 1) DEFAULT 0.5,           -- หน่วยกิต เช่น 0.5, 1.0
  type TEXT DEFAULT 'พื้นฐาน',                 -- ประเภทวิชา (พื้นฐาน / เพิ่มเติม)
  class_level TEXT NOT NULL,                  -- ระดับชั้น เช่น ป.1, ม.1
  academic_year TEXT DEFAULT '2569',          -- ปีการศึกษา
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.lesson_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL, -- ลิงก์ตรงกับ profiles ของระบบใหม่
  title TEXT NOT NULL,                                           -- หัวข้อ/ชื่อแผนการสอน
  subject_code VARCHAR(20) NOT NULL,                             -- รหัสวิชา (เช่น ท๑๑๑๐๑)
  subject_name VARCHAR(100) NOT NULL,                            -- ชื่อวิชา (เช่น ภาษาไทย)
  class_level VARCHAR(50) NOT NULL,                              -- ระดับชั้น (เช่น ประถมศึกษาปีที่ ๑)
  term VARCHAR(10) NOT NULL,                                     -- ภาคเรียน/ปีการศึกษา (เช่น ๑/๒๕๖๙)
  file_url TEXT NOT NULL,                                        -- ลิงก์ไฟล์ PDF แผนการสอน (Supabase Storage)
  
  -- ระบบตรวจสอบและอนุมัติ
  status VARCHAR(30) DEFAULT 'Draft' NOT NULL,                   -- Draft, Pending...
  academic_comments TEXT,                                        -- ความเห็นวิชาการ
  academic_reviewed_by UUID REFERENCES auth.users(id),            -- ผู้ตรวจสอบวิชาการ
  academic_reviewed_at TIMESTAMP WITH TIME ZONE,
  
  director_comments TEXT,                                        -- ความเห็น ผอ.
  director_approved_by UUID REFERENCES auth.users(id),           -- ผอ. ผู้อนุมัติ
  director_approved_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.lesson_plan_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
  lesson_plan_id UUID REFERENCES public.lesson_plans(id) ON DELETE CASCADE NOT NULL,
  actor_id UUID REFERENCES auth.users(id) NOT NULL,
  action VARCHAR(50) NOT NULL,                                   -- 'create', 'submit', 'approve'
  comments TEXT,                                                 -- รายละเอียด
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_plan_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow school-specific access on subjects" ON public.subjects;
CREATE POLICY "Allow school-specific access on subjects" ON public.subjects 
  FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

DROP POLICY IF EXISTS "Allow school-specific access on lesson_plans" ON public.lesson_plans;
CREATE POLICY "Allow school-specific access on lesson_plans" ON public.lesson_plans 
  FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

DROP POLICY IF EXISTS "Allow school-specific access on lesson_plan_logs" ON public.lesson_plan_logs;
CREATE POLICY "Allow school-specific access on lesson_plan_logs" ON public.lesson_plan_logs 
  FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

CREATE INDEX IF NOT EXISTS idx_lesson_plans_school_id ON public.lesson_plans(school_id);
CREATE INDEX IF NOT EXISTS idx_lesson_plans_teacher ON public.lesson_plans(teacher_id);
CREATE INDEX IF NOT EXISTS idx_lesson_plans_status ON public.lesson_plans(status);

-- --------------------------------------------------------------------
-- 10. ระบบลงทะเบียนนักกีฬา (Athletics Registrations)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.athletics_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE DEFAULT get_user_school_id(),
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
  sport_id TEXT,
  sport_type TEXT,
  age_group TEXT,
  shirt_size TEXT,
  status TEXT DEFAULT 'active',
  coach_name TEXT,
  coach_phone TEXT,
  competition_type TEXT DEFAULT 'local', -- local, provincial
  registered_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.athletics_registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow school-specific access on athletics_registrations" ON public.athletics_registrations;
CREATE POLICY "Allow school-specific access on athletics_registrations" ON public.athletics_registrations
  FOR ALL USING (school_id = get_user_school_id()) WITH CHECK (school_id = get_user_school_id());

CREATE INDEX IF NOT EXISTS idx_athletics_school_id ON public.athletics_registrations(school_id);
CREATE INDEX IF NOT EXISTS idx_athletics_student_id ON public.athletics_registrations(student_id);
CREATE INDEX IF NOT EXISTS idx_athletics_academic_year ON public.athletics_registrations(academic_year);
CREATE INDEX IF NOT EXISTS idx_athletics_sport_type ON public.athletics_registrations(sport_type);
CREATE INDEX IF NOT EXISTS idx_athletics_competition_type ON public.athletics_registrations(competition_type);
