-- ============================================================
-- Supabase Migration: RAG / Intelligence Hub / Virtual Drive
-- รันสคริปต์นี้ใน Supabase SQL Editor
-- (เพิ่มคำสั่ง DROP เพื่อล้างข้อมูลโครงสร้างเก่าที่ทับซ้อนและจัดระเบียบใหม่)
-- ============================================================

-- 1. เปิดใช้งาน Extension pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. ล้างตาราง/วิว/ฟังก์ชันเก่าที่อาจค้างอยู่ในระบบเพื่อป้องกันโครงสร้างซ้ำซ้อน
DROP VIEW IF EXISTS public.unique_knowledge_docs CASCADE;
DROP FUNCTION IF EXISTS public.match_knowledge CASCADE;
DROP FUNCTION IF EXISTS public.match_private_knowledge CASCADE;
DROP TABLE IF EXISTS public.school_knowledge CASCADE;
DROP TABLE IF EXISTS public.ai_private_knowledge_chunks CASCADE;
DROP TABLE IF EXISTS public.ai_knowledge_base CASCADE;

-- 3. สร้างตารางเก็บข้อมูลองค์ความรู้โรงเรียน (คลังส่วนกลาง)
CREATE TABLE public.school_knowledge (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    school_id uuid DEFAULT get_user_school_id() NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
    document_name text NOT NULL,
    page_number integer NOT NULL,
    chunk_text text NOT NULL,
    embedding public.vector(768),
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- เปิด RLS ของตาราง school_knowledge
ALTER TABLE public.school_knowledge ENABLE ROW LEVEL SECURITY;

-- สร้างนโยบายการเข้าถึงข้อมูลตามโรงเรียน
CREATE POLICY "School-based select" ON public.school_knowledge 
    FOR SELECT USING (school_id = get_user_school_id());

CREATE POLICY "School-based all" ON public.school_knowledge 
    FOR ALL USING (school_id = get_user_school_id());


-- 4. สร้าง View สำหรับแสดงรายชื่อไฟล์คลังความรู้แบบไม่ซ้ำ (unique_knowledge_docs)
CREATE OR REPLACE VIEW public.unique_knowledge_docs AS
SELECT 
    document_name,
    max(created_at) as created_at
FROM public.school_knowledge
GROUP BY document_name;


-- 5. สร้างตารางสำหรับจัดเก็บไฟล์คลังความรู้ส่วนตัวของคุณครู (ai_knowledge_base)
CREATE TABLE public.ai_knowledge_base (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    school_id uuid DEFAULT get_user_school_id() NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
    teacher_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    folder_id text NOT NULL,
    folder_name text NOT NULL,
    file_name text NOT NULL,
    file_url text NOT NULL,
    file_type text NOT NULL,
    content_text text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- เปิด RLS ของตาราง ai_knowledge_base
ALTER TABLE public.ai_knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "School-based select" ON public.ai_knowledge_base 
    FOR SELECT USING (school_id = get_user_school_id());

CREATE POLICY "School-based all" ON public.ai_knowledge_base 
    FOR ALL USING (school_id = get_user_school_id());


-- 6. สร้างตารางสำหรับจัดเก็บ Chunks ของคลังความรู้ส่วนตัว (ai_private_knowledge_chunks)
CREATE TABLE public.ai_private_knowledge_chunks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    school_id uuid DEFAULT get_user_school_id() NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
    file_id uuid REFERENCES public.ai_knowledge_base(id) ON DELETE CASCADE NOT NULL,
    teacher_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    page_number integer NOT NULL,
    chunk_text text NOT NULL,
    embedding public.vector(768),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- เปิด RLS ของตาราง ai_private_knowledge_chunks
ALTER TABLE public.ai_private_knowledge_chunks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "School-based select" ON public.ai_private_knowledge_chunks 
    FOR SELECT USING (school_id = get_user_school_id());

CREATE POLICY "School-based all" ON public.ai_private_knowledge_chunks 
    FOR ALL USING (school_id = get_user_school_id());


-- 7. ฟังก์ชันสำหรับทำ Semantic Search (match_knowledge) ค้นหาข้อมูลโรงเรียน
CREATE OR REPLACE FUNCTION public.match_knowledge (
  query_embedding public.vector(768),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id uuid,
  document_name text,
  page_number int,
  chunk_text text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    sk.id,
    sk.document_name,
    sk.page_number,
    sk.chunk_text,
    1 - (sk.embedding <=> query_embedding) AS similarity
  FROM public.school_knowledge sk
  WHERE sk.school_id = get_user_school_id()
    AND 1 - (sk.embedding <=> query_embedding) > match_threshold
  ORDER BY sk.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;


-- 8. ฟังก์ชันสำหรับทำ Semantic Search (match_private_knowledge) ค้นหาข้อมูลส่วนตัวของครู
CREATE OR REPLACE FUNCTION public.match_private_knowledge (
  query_embedding public.vector(768),
  match_threshold float,
  match_count int,
  p_teacher_id uuid
)
RETURNS TABLE (
  id uuid,
  file_id uuid,
  page_number int,
  chunk_text text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    apkc.id,
    apkc.file_id,
    apkc.page_number,
    apkc.chunk_text,
    1 - (apkc.embedding <=> query_embedding) AS similarity
  FROM public.ai_private_knowledge_chunks apkc
  WHERE apkc.teacher_id = p_teacher_id
    AND apkc.school_id = get_user_school_id()
    AND 1 - (apkc.embedding <=> query_embedding) > match_threshold
  ORDER BY apkc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;


-- 9. สร้าง Index สำหรับเร่งประสิทธิภาพการค้นหา Vector (Semantic Search) ด้วย HNSW
CREATE INDEX IF NOT EXISTS school_knowledge_embedding_idx 
ON public.school_knowledge 
USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS ai_private_knowledge_chunks_embedding_idx 
ON public.ai_private_knowledge_chunks 
USING hnsw (embedding vector_cosine_ops);
