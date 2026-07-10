-- ============================================================
-- Supabase Migration: Telegram Columns Upgrade Patch
-- รันสคริปต์นี้ใน Supabase SQL Editor
-- (เพื่อเพิ่มคอลัมน์ Token และ Username ให้ตาราง schools และ settings ครบถ้วน)
-- ============================================================

-- 1. อัปเดตตาราง schools
ALTER TABLE public.schools 
  ADD COLUMN IF NOT EXISTS telegram_bot_token text,
  ADD COLUMN IF NOT EXISTS telegram_bot_username text;

-- 2. อัปเดตตาราง settings
ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS telegram_bot_token text,
  ADD COLUMN IF NOT EXISTS telegram_bot_username text;

-- 3. อัปเดตตาราง profiles (ยืนยันฟิลด์ Chat ID)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS telegram_chat_id text;

-- 4. อัปเดตดัชนี (Index) ค้นหาด่วน
CREATE INDEX IF NOT EXISTS idx_profiles_telegram ON public.profiles(telegram_chat_id);
