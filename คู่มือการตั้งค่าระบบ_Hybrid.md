# 📘 คู่มือการตั้งค่าระบบสารบรรณและบอทน้องชบา AI (เวอร์ชัน Hybrid) 🏫✨
**สำหรับคุณครูผู้ดูแลระบบไอทีของโรงเรียนสมาชิก (13 โรงเรียนในเครือข่าย)**

---

ยินดีต้อนรับเข้าสู่ระบบสารบรรณอิเล็กทรอนิกส์และน้องชบา AI เวอร์ชันใหม่! เนื่องจากระบบนี้ใช้โครงสร้างแบบ **Hybrid** คุณครูผู้ดูแลระบบของโรงเรียนสมาชิก **ไม่จำเป็นต้องยุ่งเกี่ยวกับฐานข้อมูลหรือโค้ดเซิร์ฟเวอร์หลังบ้านเลย** 

คุณครูมีหน้าที่เพียงเตรียมพื้นที่จัดเก็บไฟล์ (Google Drive) และสร้างบอทแจ้งเตือน (LINE/Telegram) ของโรงเรียนตนเอง ตาม 4 ขั้นตอนสั้นๆ แบบจับมือทำดังนี้ค่ะ:

---

## 💾 ตอนที่ 1: การตั้งค่าระบบเก็บเอกสาร (Google Drive Setup)
เนื่องจากเราจะเก็บไฟล์หนังสือราชการแยกบัญชีของแต่ละโรงเรียนเพื่อความจุฟรี 15 GB และความเป็นส่วนตัว of ข้อมูล ให้ทำตามนี้ค่ะ:

> 💡 **ระบบจะสร้างโฟลเดอร์ให้อัตโนมัติ** — เมื่ออัปโหลดไฟล์ครั้งแรก สคริปต์จะสร้างโฟลเดอร์หลักชื่อ **`ระบบบริหารจัดการข้อมูล`** ใน Google Drive ของโรงเรียน และสร้างโฟลเดอร์ย่อยแยกตามประเภทเอกสาร (หนังสือรับ, หนังสือส่ง, คำสั่ง ฯลฯ) ไว้ภายในอัตโนมัติ **ไม่ต้องสร้างโฟลเดอร์ด้วยตนเอง**

โครงสร้างโฟลเดอร์ที่จะถูกสร้างอัตโนมัติ:
```
📁 My Drive/
└── 📁 ระบบบริหารจัดการข้อมูล/    ← สร้างอัตโนมัติครั้งแรก
    ├── 📁 หนังสือรับ/
    ├── 📁 หนังสือส่ง/
    ├── 📁 คำสั่ง/
    └── 📁 บันทึก/
```

1. **สร้างระบบสคริปต์อัปโหลดไฟล์ (Google Apps Script):**
   * ลงชื่อเข้าใช้งาน [Google Drive](https://drive.google.com) ของบัญชีโรงเรียน
   * คลิกปุ่ม **New (ใหม่)** -> **More (เพิ่มเติม)** -> **Google Apps Script**
   * คัดลอกซอร์สโค้ดจากไฟล์ [google_drive_script.js](file:///C:/Users/bkky9/OneDrive/Desktop/school-saraban-hybrid/google_drive_script.js) ในเครื่องไปวางทับโค้ดเดิมทั้งหมด
   * ตั้งชื่อโครงการว่า `Saraban Drive Uploader`
2. **เปิดใช้งาน (Deploy):**
   * คลิกปุ่ม **Deploy (การทำงานใช้จริง)** ที่มุมขวาบน -> เลือก **New deployment (การใช้งานใช้จริงรายการใหม่)**
   * คลิกไอคอนเฟืองเลือกประเภทเป็น **Web app (เว็บแอป)**
   * **Execute as (เรียกใช้ในฐานะ):** เลือกเป็น `Me` (บัญชีอีเมลโรงเรียนนี้)
   * **Who has access (ผู้มีสิทธิ์เข้าถึง):** เลือกเป็น `Anyone (ทุกคน)` (จำเป็นต้องเลือกเพื่อให้ตัวแอปส่งเอกสารเข้าไดรฟ์ได้โดยตรง)
   * คลิกปุ่ม **Deploy** -> ระบบจะให้กดให้สิทธิ์ความปลอดภัย ให้กด **Authorize access** -> เลือกอีเมลโรงเรียน -> กด **Advanced** -> กด **Go to Saraban Drive Uploader (unsafe)** -> กด **Allow**
3. **คัดลอกลิงก์ใช้งาน:**
   * คัดลอกค่า **Web app URL** ที่ได้มา (ลิงก์จะลงท้ายด้วย `/exec`) บันทึกเก็บไว้เพื่อใช้กรอกในตัวแอปพลิเคชัน
4. **อัปเดตสคริปต์ในอนาคต:**
   * หากมีการแก้ไขโค้ด `google_drive_script.js` ให้นำโค้ดใหม่ไปวางใน Apps Script Editor แล้วกด **Deploy -> Manage deployments -> New version** (URL เดิมยังใช้ได้)

---

## 💬 ตอนที่ 2: การสร้างบอทแจ้งเตือนของโรงเรียน (เลือกบอทอย่างใดอย่างหนึ่ง)

คุณครูสามารถเลือกสร้างบอทเพื่อรับการแจ้งเตือนและการสืบค้นเอกสารผ่าน LINE หรือ Telegram ได้ตามความสะดวกของสถานศึกษาค่ะ:

### ✈️ ทางเลือกที่ A: สำหรับระบบ Telegram (แนะนำ 🌟 ง่ายและฟรี 100%)
1. เปิดแอป Telegram ค้นหาชื่อบัญชี `@BotFather`
2. พิมพ์ข้อความคุยพิมพ์ว่า `/newbot`
3. พิมพ์ตั้งชื่อบอท เช่น `น้องชบาสารบรรณ โรงเรียนบ้านควน`
4. ตั้งชื่อผู้ใช้บอท (Username) ต้องลงท้ายด้วยคำว่า `bot` เสมอ เช่น `ban_kuan_saraban_bot` (ไม่รวมเครื่องหมาย @)
5. คุณครูจะได้รับรหัส **HTTP API Token** ทันที (ข้อความตัวหนังสือยาวๆ) ให้คัดลอกรหัสนี้เก็บไว้
6. **ตั้งค่า Webhook บอท**: ส่งคำขอตั้งค่า Webhook เพื่อผูกเข้ากับเซิร์ฟเวอร์ด้วยการพิมพ์ URL นี้ลงในเว็บเบราว์เซอร์:
   `https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://[โดเมนเซิร์ฟเวอร์]/api/telegram-webhook?school_id=[รหัสโรงเรียน_uuid]`
   *(เปลี่ยน `<TOKEN>` เป็นโทเค็นบอท และ `[โดเมนเซิร์ฟเวอร์]` เป็น URL โฮสต์ของโรงเรียน)*

### 💬 ทางเลือกที่ B: สำหรับระบบ LINE OA
1. เข้าไปสร้างบัญชีบอทที่ [LINE Official Account Manager](https://manager.line.biz)
2. ไปที่ตั้งค่า -> **Messaging API** -> กดเปิดใช้งาน
3. ไปที่เว็บ [LINE Developers Console](https://developers.line.biz) ล็อกอินด้วย LINE ส่วนตัว -> เลือกบอทที่เพิ่งสร้าง
4. ไปที่แท็บ **Messaging API** เลื่อนลงไปล่างสุดตรงหัวข้อ **Channel access token** -> กดปุ่ม **Issue** และคัดลอกรหัสยาวๆ เก็บไว้
5. เลื่อนไปที่หัวข้อ **Webhook URL** -> นำลิงก์เว็บส่วนกลางที่คุณครูแอดมินส่งให้มากรอกลงไป เช่น:
   `https://[ชื่อเว็บส่วนกลางของคุณ].vercel.app/api/line-webhook`
   * กดเปิดปุ่ม **Use webhook** ให้เป็นสีเขียว

---

## 🖥️ ตอนที่ 3: การตั้งค่าเชื่อมต่อหน้าแอปคอมพิวเตอร์ (Desktop App)

เมื่อได้กุญแจครบแล้ว ให้ผู้ดูแลระบบของโรงเรียนกรอกข้อมูลลงโปรแกรมเพื่อตั้งค่าสถานศึกษาดังนี้ค่ะ:

1. เปิดโปรแกรมคอมพิวเตอร์ `.exe` ที่ได้รับแจกจ่ายไป
2. ไปที่เมนู **ตั้งค่าระบบ** (หรือกดปุ่มหน้าสลับโรงเรียน -> เลือกเพิ่มโรงเรียนใหม่)
3. กรอกข้อมูลสถานศึกษาของคุณครูดังนี้:
   * **ชื่อโรงเรียน:** กรอกชื่อเต็มสถานศึกษา
   * **รหัสโรงเรียน (School Code):** กรอกรหัสโรงเรียนที่คุณครูแอดมินส่วนกลางกำหนดให้ (เช่น `SKW001`) เพื่อผูกข้อมูลในฐานข้อมูลกลาง
   * **Google Drive GAS URL:** วางลิงก์ที่ลงท้ายด้วย `/exec` (ที่ได้จากตอนที่ 1)
   * **Telegram Bot Token & Username**: สำหรับโรงเรียนที่เปิดบริการแจ้งเตือนพรีเมียมผ่าน Telegram
   * **LINE Token & ลิงก์ LINE OA**: สำหรับโรงเรียนที่เชื่อมต่อทาง LINE
4. คลิกปุ่ม **"บันทึกข้อมูล"** ระบบจะผูกบริการแจ้งเตือนและระบบจัดเก็บไฟล์เข้ากับบัญชีของโรงเรียนคุณครูโดยอัตโนมัติทันทีค่ะ!

---

## 👥 ตอนที่ 4: การลงทะเบียนบัญชีสำหรับครูทุกคนในโรงเรียน
เพื่อความสะดวกรวดเร็ว ครูทุกคนในโรงเรียนของคุณครูสามารถลงทะเบียนบัญชีผู้ใช้ใหม่ได้ด้วยตัวเองดังนี้:

1. ในหน้าจอล็อกอินแอป Desktop คลิกปุ่ม **"ลงทะเบียนบัญชีใหม่"**
2. กรอกอีเมล, รหัสผ่าน, ชื่อจริง
3. ในช่อง **"รหัสโรงเรียน (School Code)"** ให้ครูทุกคนกรอกรหัสเดียวกันกับที่โรงเรียนใช้ (เช่น `SKW001`)
4. เมื่อกดลงทะเบียนเสร็จสิ้น ระบบหลังบ้านจะนำครูคนนั้นเข้าผูกกับบัญชีโรงเรียน และมอบสิทธิ์บทบาทเป็น **ครูทั่วไป (`'teacher'`)** ให้เข้าใช้งานระบบเพื่อส่งเสนอหนังสือราชการได้ทันทีโดยไม่ต้องรอให้แอดมินกดยืนยันตัวตนทีละคนค่ะ
5. **การผูกบัญชี Telegram ส่วนบุคคล**:
   * ไปที่หน้าเมนู **"ข้อมูลส่วนตัว"** (Profile)
   * คลิกปุ่ม **"เชื่อมต่อ Telegram Bot ตอนนี้"** แอปจะลิงก์ไปหน้าห้องแชทของบอทโดยอัตโนมัติ
   * กดปุ่ม **Start (เริ่ม)** เพื่อทำการผูกบัญชีและรหัสพนักงานให้เสร็จสมบูรณ์

---

## 👑 ตอนที่ 5: ระบบจัดการสิทธิ์พรีเมียม (Premium Tier / Paywall)
ระบบนี้แยกระดับโรงเรียนสมาชิกเป็น 2 สถานะคือ **Free** และ **Premium** ซึ่งจำกัดฟีเจอร์การเข้าถึงข้อมูลตามนโยบายระบบคีย์กลาง:

*   **ฟีเจอร์พรีเมียม (Premium Features)**:
    1.  **ทะเบียนหนังสือส่ง (Outgoing Docs)**
    2.  **คำสั่งแต่งตั้ง (Orders)**
    3.  **บันทึกข้อความ (Memos)**
    4.  **คลังสมองความรู้และระบบค้นหา RAG (Virtual Drive / Intelligence Hub)**
*   **การอัปเกรดระดับสถานศึกษา**:
    *   ควบคุมสิทธิ์โดยบัญชีอีเมลกลางของ **Super Admin** ที่ระบุใน `VITE_SUPER_ADMIN_EMAIL` ในไฟล์ตั้งค่า `.env`
    *   Super Admin จะมีแท็บเมนู **"อนุมัติโรงเรียน"** (School Approvals) ปรากฏในแถบด้านซ้าย
    *   แอดมินกลางสามารถกดสลับปุ่ม **"★ Premium / ☆ Free"** ให้กับโรงเรียนใดๆ ก็ได้ในระบบ เพื่อควบคุมการเข้าถึงฟีเจอร์ทันทีโดยไม่มีการหน่วงเวลา

---

## 🛠️ ตอนที่ 6: การเตรียมโครงสร้างฐานข้อมูลและ RLS (Database & SQL Setup)
*สำหรับแอดมินระบบส่วนกลางที่ต้องการติดตั้งหรือล้างตารางข้อมูลใน Supabase ใหม่ เพื่อรองรับระบบ AI และความปลอดภัยระดับ Multi-Tenant*

### 1. คำสั่ง SQL สำหรับระบบ Premium และ Telegram Bot (Patch Telegram)
รันเพื่อเพิ่มฟิลด์ควบคุมสิทธิ์พรีเมียมและ Chat ID เพื่อรองรับการแจ้งเตือนส่วนตัว:

```sql
-- 1. เพิ่มฟิลด์ Premium ในตาราง schools
ALTER TABLE public.schools 
  ADD COLUMN IF NOT EXISTS is_premium boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS premium_expires_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS telegram_bot_token text,
  ADD COLUMN IF NOT EXISTS telegram_bot_username text;

-- 2. เพิ่มฟิลด์ในตาราง settings
ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS telegram_bot_token text,
  ADD COLUMN IF NOT EXISTS telegram_bot_username text;

-- 3. เพิ่มฟิลด์ในตาราง profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS telegram_chat_id text;

-- 4. สร้างตาราง ar_usages สำหรับจำกัดโควตาบทเรียน AR
CREATE TABLE IF NOT EXISTS public.ar_usages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    school_id uuid REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
    ar_lesson_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ปิด RLS ตาราง AR เพื่อความสะดวกรวดเร็วในการอัปเดตสถิติ
ALTER TABLE public.ar_usages DISABLE ROW LEVEL SECURITY;

-- 5. สร้าง Index เพื่อเพิ่มประสิทธิภาพ
CREATE INDEX IF NOT EXISTS idx_ar_usages_user ON public.ar_usages(user_id);
CREATE INDEX IF NOT EXISTS idx_ar_usages_school ON public.ar_usages(school_id);
CREATE INDEX IF NOT EXISTS idx_profiles_telegram ON public.profiles(telegram_chat_id);
```

### 2. คำสั่ง SQL สำหรับระบบ RAG / Intelligence Hub (คลังสมองอัจฉริยะ)
รันคำสั่งเหล่านี้เพื่อสร้างตาราง วิว ฟังก์ชัน RPC สำหรับสืบค้น Vector ความละเอียดสูงผ่าน Gemini Embeddings:

```sql
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

CREATE POLICY "School-based select" ON public.school_knowledge 
    FOR SELECT USING (school_id = get_user_school_id());

CREATE POLICY "School-based all" ON public.school_knowledge 
    FOR ALL USING (school_id = get_user_school_id());


-- 4. สร้าง View สำหรับแสดงรายชื่อไฟล์คลังความรู้แบบไม่ซ้ำ
CREATE OR REPLACE VIEW public.unique_knowledge_docs AS
SELECT 
    document_name,
    max(created_at) as created_at
FROM public.school_knowledge
GROUP BY document_name;


-- 5. สร้างตารางสำหรับจัดเก็บไฟล์คลังความรู้ส่วนตัวของคุณครู
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


-- 6. สร้างตารางสำหรับจัดเก็บ Chunks ของคลังความรู้ส่วนตัว
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


-- 9. สร้าง Index สำหรับเร่งประสิทธิภาพการค้นหา Vector ด้วย HNSW
CREATE INDEX IF NOT EXISTS school_knowledge_embedding_idx 
ON public.school_knowledge 
USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS ai_private_knowledge_chunks_embedding_idx 
ON public.ai_private_knowledge_chunks 
USING hnsw (embedding vector_cosine_ops);
```

### 3. เปิดใช้งาน RLS (Row Level Security) สำหรับตารางพื้นฐานอื่นๆ
```sql
-- เปิดการจำกัดสิทธิ์ความปลอดภัย RLS ตารางทั่วไป
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

-- 1) Policy ตารางโรงเรียน (schools)
CREATE POLICY "schools_select_own" ON public.schools 
FOR SELECT TO authenticated 
USING (id IN (SELECT school_id FROM public.profiles WHERE id = auth.uid()));

-- 2) Policy ตารางตั้งค่าโรงเรียน (settings)
CREATE POLICY "settings_select_own" ON public.settings 
FOR SELECT TO authenticated 
USING (school_id IN (SELECT school_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "settings_update_own" ON public.settings 
FOR UPDATE TO authenticated 
USING (school_id IN (SELECT school_id FROM public.profiles WHERE id = auth.uid()));

-- 3) Policy ตารางโปรไฟล์ผู้ใช้งาน (profiles)
CREATE POLICY "profiles_select_same_school" ON public.profiles 
FOR SELECT TO authenticated 
USING (school_id IN (SELECT school_id FROM public.profiles p2 WHERE p2.id = auth.uid()));

CREATE POLICY "profiles_update_own" ON public.profiles 
FOR UPDATE TO authenticated 
USING (id = auth.uid());

-- 4) Policy ตารางข้อมูลครู (teachers)
CREATE POLICY "teachers_select_same_school" ON public.teachers 
FOR SELECT TO authenticated 
USING (school_id IN (SELECT school_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "teachers_insert_own_school" ON public.teachers 
FOR INSERT TO authenticated 
WITH CHECK (school_id IN (SELECT school_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "teachers_update_own_school" ON public.teachers 
FOR UPDATE TO authenticated 
USING (school_id IN (SELECT school_id FROM public.profiles WHERE id = auth.uid()));
```
