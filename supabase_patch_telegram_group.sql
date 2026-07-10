-- ============================================================
-- Supabase Migration: Telegram Group Patch
-- รันสคริปต์นี้ใน Supabase SQL Editor
-- (เพื่อเพิ่มคอลัมน์เก็บข้อมูลกลุ่มของโรงเรียน)
-- ============================================================

-- 1. อัปเดตตาราง schools
ALTER TABLE public.schools 
  ADD COLUMN IF NOT EXISTS telegram_group_id text,
  ADD COLUMN IF NOT EXISTS telegram_group_link text;

-- 2. อัปเดตตาราง settings
ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS telegram_group_id text,
  ADD COLUMN IF NOT EXISTS telegram_group_link text;
