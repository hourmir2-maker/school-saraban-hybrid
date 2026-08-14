-- ============================================================
-- 🛠️ FIX: ผูก school_id ให้ทุก profile ที่ยังเป็น NULL
-- รันใน Supabase Dashboard → SQL Editor
-- ============================================================

-- Step 1: ดูสถานะก่อนว่า profile ใดที่ school_id ยังเป็น NULL
SELECT id, email, display_name, role, school_id
FROM public.profiles
WHERE school_id IS NULL;

-- Step 2: ดูโรงเรียนที่มีในระบบ (เพื่อเลือก school_id ที่ถูกต้อง)
SELECT id, school_code, school_name FROM public.schools;

-- ============================================================
-- Step 3: อัปเดต school_id ให้ทุก profile ที่เป็น NULL
-- โดยผูกกับโรงเรียนแรกที่มีในระบบ (ถ้าระบบมีโรงเรียนเดียว)
-- ============================================================
UPDATE public.profiles
SET school_id = (
  SELECT id FROM public.schools ORDER BY created_at ASC LIMIT 1
)
WHERE school_id IS NULL;

-- ============================================================
-- Step 4: ตรวจสอบผลลัพธ์หลังอัปเดต
-- ============================================================
SELECT id, email, display_name, role, school_id
FROM public.profiles;

-- ============================================================
-- Step 5: ตรวจสอบว่า get_user_school_id() ทำงานถูกต้อง
-- (รันด้วย User ที่ login อยู่ ผ่าน Supabase RPC หรือ SQL Editor)
-- ============================================================
-- SELECT get_user_school_id();
