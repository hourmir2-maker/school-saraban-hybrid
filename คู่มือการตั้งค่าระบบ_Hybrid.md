# 📘 คู่มือการตั้งค่าระบบสารบรรณและบอทน้องชบา AI (เวอร์ชัน Hybrid) 🏫✨
**สำหรับคุณครูผู้ดูแลระบบไอทีของโรงเรียนสมาชิก (13 โรงเรียนในเครือข่าย)**

---

ยินดีต้อนรับเข้าสู่ระบบสารบรรณอิเล็กทรอนิกส์และน้องชบา AI เวอร์ชันใหม่! เนื่องจากระบบนี้ใช้โครงสร้างแบบ **Hybrid** คุณครูผู้ดูแลระบบของโรงเรียนสมาชิก **ไม่จำเป็นต้องยุ่งเกี่ยวกับฐานข้อมูลหรือโค้ดเซิร์ฟเวอร์หลังบ้านเลย** 

คุณครูมีหน้าที่เพียงเตรียมพื้นที่จัดเก็บไฟล์ (Google Drive) และสร้างบอทแจ้งเตือน (LINE/Telegram) ของโรงเรียนตนเอง ตาม 4 ขั้นตอนสั้นๆ แบบจับมือทำดังนี้ค่ะ:

---

## 💾 ตอนที่ 1: การตั้งค่าระบบเก็บเอกสาร (Google Drive Setup)
เนื่องจากเราจะเก็บไฟล์หนังสือราชการแยกบัญชีของแต่ละโรงเรียนเพื่อความจุฟรี 15 GB และความเป็นส่วนตัวของข้อมูล ให้ทำตามนี้ค่ะ:

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
4. ตั้งชื่อผู้ใช้บอท (Username) ต้องลงท้ายด้วยคำว่า `bot` เสมอ เช่น `ban_kuan_saraban_bot`
5. คุณครูจะได้รับรหัส **HTTP API Token** ทันที (ข้อความตัวหนังสือยาวๆ) ให้คัดลอกรหัสนี้เก็บไว้

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
   * **LINE Token** หรือ **Telegram Token:** วางรหัสโทเค็นบอทของโรงเรียนคุณครู (ที่ได้จากตอนที่ 2)
4. คลิกปุ่ม **"บันทึกข้อมูล"** ระบบจะผูกบริการแจ้งเตือนและระบบจัดเก็บไฟล์เข้ากับบัญชีของโรงเรียนคุณครูโดยอัตโนมัติทันทีค่ะ!

---

## 👥 ตอนที่ 4: การลงทะเบียนบัญชีสำหรับครูทุกคนในโรงเรียน
เพื่อความสะดวกรวดเร็ว ครูทุกคนในโรงเรียนของคุณครูสามารถลงทะเบียนบัญชีผู้ใช้ใหม่ได้ด้วยตัวเองดังนี้:

1. ในหน้าจอล็อกอินแอป Desktop คลิกปุ่ม **"ลงทะเบียนบัญชีใหม่"**
2. กรอกอีเมล, รหัสผ่าน, ชื่อจริง
3. ในช่อง **"รหัสโรงเรียน (School Code)"** ให้ครูทุกคนกรอกรหัสเดียวกันกับที่โรงเรียนใช้ (เช่น `SKW001`)
4. เมื่อกดลงทะเบียนเสร็จสิ้น ระบบหลังบ้านจะนำครูคนนั้นเข้าผูกกับบัญชีโรงเรียน และมอบสิทธิ์บทบาทเป็น **ครูทั่วไป (`'teacher'`)** ให้เข้าใช้งานระบบเพื่อส่งเสนอหนังสือราชการได้ทันทีโดยไม่ต้องรอให้แอดมินกดยืนยันตัวตนทีละคนค่ะ

---

> [!TIP]
> **การตั้งค่าสำหรับผู้อำนวยการ (ผอ.):**
> เมื่อ ผอ. ลงทะเบียนบัญชีในระบบเสร็จเรียบร้อยแล้ว ให้แอดมินไอทีเข้าไปที่เมนู **"จัดการสิทธิ์"** ในแอป Desktop จากนั้นค้นหารายชื่อของ ผอ. แล้วกดสลับบทบาท (Role) จาก `teacher` ให้เป็น **`director`** (ผู้อำนวยการ) เพื่อให้ ผอ. ได้รับสิทธิ์ในการเกษียณหนังสือราชการและรับข้อความปุ่มกดส่งอนุมัติผ่านแชทได้ค่ะ ✍️🌸

---

## 🛠️ ตอนที่ 5: การเตรียมโครงสร้างฐานข้อมูลและ RLS (Database & SQL Setup)
*สำหรับแอดมินระบบส่วนกลางที่ต้องการติดตั้งหรือล้างตารางข้อมูลใน Supabase ใหม่ เพื่อรองรับระบบ AI และความปลอดภัยระดับ Multi-Tenant*

### 1. คำสั่ง SQL สำหรับสร้างตารางระบบ AI (RAG & Students)
รันคำสั่งเหล่านี้ใน Supabase SQL Editor เพื่อสร้างตารางสำหรับเก็บข้อมูลของนักเรียนและคลังความรู้ AI:

```sql
-- 1. เปิดใช้งาน Vector Extension สำหรับระบบสืบค้น AI (RAG)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. สร้างตารางประวัตินักเรียน (students)
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  student_code TEXT,
  prefix TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  class_level TEXT,
  class_room TEXT,
  academic_year TEXT DEFAULT '2569',
  graduation_status TEXT DEFAULT 'ปกติ',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. สร้างตารางคลังสมองความรู้ส่วนกลาง (school_knowledge)
CREATE TABLE IF NOT EXISTS public.school_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  document_name TEXT NOT NULL,
  page_number INTEGER DEFAULT 1,
  chunk_text TEXT NOT NULL,
  embedding vector(768),
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS school_knowledge_embedding_idx ON school_knowledge USING ivfflat (embedding vector_cosine_ops);

-- 4. สร้างตารางคลังเก็บไฟล์ส่วนตัวของครู (ai_knowledge_base)
CREATE TABLE IF NOT EXISTS public.ai_knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  folder_id TEXT DEFAULT '08',
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. สร้างตารางชิ้นข้อมูลความรู้ส่วนตัวของครู (ai_private_knowledge_chunks)
CREATE TABLE IF NOT EXISTS public.ai_private_knowledge_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id UUID REFERENCES public.ai_knowledge_base(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  page_number INTEGER DEFAULT 1,
  chunk_text TEXT NOT NULL,
  embedding vector(768),
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS private_chunks_embedding_idx ON ai_private_knowledge_chunks USING ivfflat (embedding vector_cosine_ops);
```

### 2. คำสั่ง SQL สำหรับฟังก์ชันค้นหา Vector Search
รันคำสั่งเหล่านี้เพื่อสร้าง RPC Function สำหรับการค้นหาของน้องชบา AI:

```sql
-- ค้นหาจากคลังกลาง
CREATE OR REPLACE FUNCTION match_knowledge(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10
)
RETURNS TABLE(id UUID, document_name TEXT, page_number INT, chunk_text TEXT, similarity float)
LANGUAGE sql STABLE AS
$$
  SELECT id, document_name, page_number, chunk_text,
    1 - (embedding <=> query_embedding) AS similarity
  FROM school_knowledge
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;

-- ค้นหาจากคลังส่วนตัวของครู
CREATE OR REPLACE FUNCTION match_private_knowledge(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10,
  p_teacher_id UUID DEFAULT NULL
)
RETURNS TABLE(id UUID, file_id UUID, page_number INT, chunk_text TEXT, similarity float)
LANGUAGE sql STABLE AS
$$
  SELECT id, file_id, page_number, chunk_text,
    1 - (embedding <=> query_embedding) AS similarity
  FROM ai_private_knowledge_chunks
  WHERE 
    (p_teacher_id IS NULL OR teacher_id = p_teacher_id)
    AND 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
```

### 3. คำสั่ง SQL สำหรับเปิดใช้งาน Row Level Security (RLS) เพื่อป้องกันความปลอดภัยข้อมูล
คำสั่งตั้งค่าและเปิดความปลอดภัยระดับโรงเรียน (Multi-Tenant) เพื่อให้ผู้ใช้เห็นเฉพาะข้อมูลโรงเรียนตัวเองเท่านั้น:

```sql
-- เปิดการจำกัดสิทธิ์ความปลอดภัย RLS
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
