-- ============================================================
-- Supabase Patch: LINE Bot isolation per school
-- ============================================================
-- วัตถุประสงค์: เร่งความเร็วการ query LINE user ตาม school_id
-- และค้นหา Bot token ตาม line_bot_destination
-- ============================================================

-- เพิ่ม index เพื่อเร่งความเร็วการ query LINE user ตาม school
CREATE INDEX IF NOT EXISTS idx_profiles_line_user_school 
  ON profiles(line_user_id, school_id);

-- เพิ่ม index สำหรับ line_bot_destination (ใช้ในการ identify โรงเรียน)
CREATE INDEX IF NOT EXISTS idx_schools_line_destination 
  ON schools(line_bot_destination) 
  WHERE line_bot_destination IS NOT NULL;

-- ============================================================
-- วิธีใช้:
-- 1. ไปที่ Supabase Dashboard > SQL Editor
-- 2. วาง SQL นี้แล้วกด Run
-- ============================================================
