-- ============================================================
-- Patch: เพิ่ม Index และการตั้งค่า Multi-School (RLS Auto-Fill)
-- รันใน Supabase SQL Editor: https://supabase.com/dashboard
-- ============================================================

-- 1. Index สำหรับเร่งความเร็วการทำงานของระบบ LINE แยกตามโรงเรียน
CREATE INDEX IF NOT EXISTS idx_profiles_line_user_school 
  ON profiles(line_user_id, school_id);

CREATE INDEX IF NOT EXISTS idx_schools_line_destination_active
  ON schools(line_bot_destination) 
  WHERE line_bot_destination IS NOT NULL;

-- 2. ตั้งค่าให้ school_id ใส่ค่าปัจจุบันของผู้ใช้งานให้อัตโนมัติ (แก้ RLS Violate ตอนเซฟงาน)
-- เมื่อผู้ใช้อัปโหลดหรือบันทึกข้อมูล ระบบจะตรวจและดึงโรงเรียนของผู้ใช้คนนั้นมาเติมให้อัตโนมัติทันที
ALTER TABLE incoming_docs ALTER COLUMN school_id SET DEFAULT get_user_school_id();
ALTER TABLE outgoing_docs ALTER COLUMN school_id SET DEFAULT get_user_school_id();
ALTER TABLE orders ALTER COLUMN school_id SET DEFAULT get_user_school_id();
ALTER TABLE memos ALTER COLUMN school_id SET DEFAULT get_user_school_id();
ALTER TABLE teachers ALTER COLUMN school_id SET DEFAULT get_user_school_id();
ALTER TABLE settings ALTER COLUMN school_id SET DEFAULT get_user_school_id();
ALTER TABLE ar_lessons ALTER COLUMN school_id SET DEFAULT get_user_school_id();
