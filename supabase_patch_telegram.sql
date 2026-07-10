-- ============================================================
-- Supabase Migration: Telegram + Premium + AR Usages
-- Run this script in the Supabase SQL Editor
-- ============================================================

-- 1. Add premium fields to schools table
ALTER TABLE public.schools 
  ADD COLUMN IF NOT EXISTS is_premium boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS premium_expires_at timestamp with time zone;

-- 2. Add Telegram fields to settings and profiles
ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS telegram_bot_token text;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS telegram_chat_id text;

-- 3. Create ar_usages table for tracking AR lessons quota
CREATE TABLE IF NOT EXISTS public.ar_usages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    school_id uuid REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
    ar_lesson_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable RLS on ar_usages as planned for smooth client updates
ALTER TABLE public.ar_usages DISABLE ROW LEVEL SECURITY;

-- 4. Create indexes for optimization
CREATE INDEX IF NOT EXISTS idx_ar_usages_user ON public.ar_usages(user_id);
CREATE INDEX IF NOT EXISTS idx_ar_usages_school ON public.ar_usages(school_id);
CREATE INDEX IF NOT EXISTS idx_profiles_telegram ON public.profiles(telegram_chat_id);
