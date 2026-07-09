This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.
The content has been processed where comments have been removed.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: *.b64
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Code comments have been removed from supported file types
- Long base64 data strings (e.g., data:image/png;base64,...) have been truncated to reduce token count
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
คู่มือการตั้งค่าระบบ_Hybrid.md
.agents/AGENTS.md
.agent/skills/nong-chaba.md
.agent-skills/release-management/SKILL.md
.agents/skills/nong-chaba.md
api/line-notify.ts
api/line-webhook.ts
api/tsconfig.json
electron-builder-koko.json
electron-builder-school2.json
.env.example
eslint.config.js
.gitignore
google_drive_script.js
index.html
main.js
package.json
PROGRESS_REPORT.md
public/favicon.png
public/favicon.svg
public/fonts/TH Niramit AS-IT๙ Bold Italic.ttf
public/fonts/TH NiramitIT๙ Bold.ttf
public/fonts/TH NiramitIT๙ Italic.ttf
public/fonts/TH NiramitIT๙.ttf
public/fonts/THSarabunIT๙ BoldItalic.ttf
public/fonts/THSarabunIT๙ Bold.ttf
public/fonts/THSarabunIT๙ Italic.ttf
public/fonts/THSarabunIT๙.ttf
public/fonts/THSarabunNew-Bold.ttf
public/fonts/THSarabunNew.ttf
public/icons.svg
public/logo.png
README.md
scratch/check-columns.js
scratch/check-db.js
scratch/check-settings.js
scratch/find-text.js
scratch/seed-school.js
src/App.css
src/App.tsx
src/assets/hero.png
src/assets/logo.png
src/assets/react.svg
src/assets/saraban/garuda-1.5cm-base64.txt
src/assets/saraban/garuda-1.5cm.png
src/assets/saraban/garuda-3cm-base64.txt
src/assets/saraban/garuda-3cm.png
src/assets/vite.svg
src/components/ComingSoon.tsx
src/components/IdentityFooter.tsx
src/components/Modal.tsx
src/contexts/AuthContext.tsx
src/index.css
src/lib/aiService.ts
src/lib/arService.ts
src/lib/lineNotify.ts
src/lib/pdfService.ts
src/lib/storage.ts
src/lib/supabase.ts
src/main.tsx
src/pages/AICowork.tsx
src/pages/ARAdmin.tsx
src/pages/ARLearning.tsx
src/pages/Dashboard.tsx
src/pages/IncomingDocs.tsx
src/pages/Login.tsx
src/pages/Memos.tsx
src/pages/Orders.tsx
src/pages/OutgoingDocs.tsx
src/pages/Profile.tsx
src/pages/Reports.tsx
src/pages/SchoolApprovals.tsx
src/pages/SchoolSetup.tsx
src/pages/Settings.tsx
src/pages/TaskManagement.tsx
src/pages/Teachers.tsx
src/pages/Users.tsx
src/services/aiCoworkService.ts
supabase_schema_hybrid.sql
TEST_CHECKLIST.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
.vercelignore
vercel.json
vite.config.ts
```

# Files

## File: คู่มือการตั้งค่าระบบ_Hybrid.md
````markdown
# 📘 คู่มือการตั้งค่าระบบสารบรรณและบอทน้องชบา AI (เวอร์ชัน Hybrid) 🏫✨
**สำหรับคุณครูผู้ดูแลระบบไอทีของโรงเรียนสมาชิก (13 โรงเรียนในเครือข่าย)**

---

ยินดีต้อนรับเข้าสู่ระบบสารบรรณอิเล็กทรอนิกส์และน้องชบา AI เวอร์ชันใหม่! เนื่องจากระบบนี้ใช้โครงสร้างแบบ **Hybrid** คุณครูผู้ดูแลระบบของโรงเรียนสมาชิก **ไม่จำเป็นต้องยุ่งเกี่ยวกับฐานข้อมูลหรือโค้ดเซิร์ฟเวอร์หลังบ้านเลย** 

คุณครูมีหน้าที่เพียงเตรียมพื้นที่จัดเก็บไฟล์ (Google Drive) และสร้างบอทแจ้งเตือน (LINE/Telegram) ของโรงเรียนตนเอง ตาม 4 ขั้นตอนสั้นๆ แบบจับมือทำดังนี้ค่ะ:

---

## 💾 ตอนที่ 1: การตั้งค่าระบบเก็บเอกสาร (Google Drive Setup)
เนื่องจากเราจะเก็บไฟล์หนังสือราชการแยกบัญชีของแต่ละโรงเรียนเพื่อความจุฟรี 15 GB และความเป็นส่วนตัวของข้อมูล ให้ทำตามนี้ค่ะ:

1. **สร้างโฟลเดอร์สำหรับเก็บไฟล์:**
   * ลงชื่อเข้าใช้งาน [Google Drive](https://drive.google.com) ของบัญชีโรงเรียน
   * สร้างโฟลเดอร์ใหม่ ตั้งชื่อว่า `ระบบเอกสารสารบรรณ` (ดับเบิ้ลคลิกเข้าโฟลเดอร์แล้วเก็บรหัสพินโฟลเดอร์จากแถบที่อยู่เว็บไว้ หรือใช้เก็บตามค่าเริ่มต้น)
2. **สร้างระบบสคริปต์อัปโหลดไฟล์ (Google Apps Script):**
   * ในหน้า Google Drive คลิกปุ่ม **New (ใหม่)** -> **More (เพิ่มเติม)** -> **Google Apps Script**
   * คัดลอกซอร์สโค้ดจากไฟล์ [สคริปต์_Google_Drive.js](file:///C:/Users/bkky9/OneDrive/Desktop/school-saraban-hybrid/คู่มือติดตั้ง/สคริปต์_Google_Drive.js) ในเครื่องไปวางทับโค้ดเดิมทั้งหมด
   * ตั้งชื่อโครงการว่า `Saraban Drive Uploader`
3. **เปิดใช้งาน (Deploy):**
   * คลิกปุ่ม **Deploy (การทำงานใช้จริง)** ที่มุมขวาบน -> เลือก **New deployment (การใช้งานใช้จริงรายการใหม่)**
   * คลิกไอคอนเฟืองเลือกประเภทเป็น **Web app (เว็บแอป)**
   * **Execute as (เรียกใช้ในฐานะ):** เลือกเป็น `Me` (บัญชีอีเมลโรงเรียนนี้)
   * **Who has access (ผู้มีสิทธิ์เข้าถึง):** เลือกเป็น `Anyone (ทุกคน)` (จำเป็นต้องเลือกเพื่อให้ตัวแอปส่งเอกสารเข้าไดรฟ์ได้โดยตรง)
   * คลิกปุ่ม **Deploy** -> ระบบจะให้กดให้สิทธิ์ความปลอดภัย ให้กด **Authorize access** -> เลือกอีเมลโรงเรียน -> กด **Advanced** -> กด **Go to Saraban Drive Uploader (unsafe)** -> กด **Allow**
4. **คัดลอกลิงก์ใช้งาน:**
   * คัดลอกค่า **Web app URL** ที่ได้มา (ลิงก์จะลงท้ายด้วย `/exec`) บันทึกเก็บไว้เพื่อใช้กรอกในตัวแอปพลิเคชัน

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
````

## File: .agents/AGENTS.md
````markdown
# ประวัติการพัฒนาและกฎเกณฑ์ของโปรเจกต์ (Project Rules & Development History)

## 📌 ข้อมูลและประวัติการพัฒนาล่าสุด (อัปเดต: 25 มิถุนายน 2569)
1. **ระบบทะเบียนรูปนักกีฬาเปตอง (หน้า [Athletics.tsx](file:///C:/Users/bkky9/OneDrive/Desktop/school-admin-multischool/src/pages/Athletics.tsx))**:
   * **การแยกระดับการแข่งขัน**: แยก State การจัดทีมเปตองและการเก็บรูปภาพ Base64 ระหว่าง **กีฬา อบต. (local)** และ **กีฬาจังหวัด (provincial)** อย่างเด็ดขาด ป้องกันข้อมูลและภาพ Base64 ทับซ้อนเมื่อเปลี่ยนระดับแข่ง
   * **ระบบ Preview และ Print (PDF)**: ทั้งฟอร์มแยกชาย/หญิง (`PETANQUE`) และฟอร์มผสมชาย/หญิง (`PETANQUE_MIXED`) จะดึงข้อมูล รายชื่อตัวเลือก และภาพ Base64 จาก State ของระดับแข่งขันที่สอดคล้องกับที่ผู้ใช้เลือกในขณะนั้นอย่างสมบูรณ์
   * **การแก้ไข JSX Bracket & HTML Tag Error**: ปิดแท็ก wrapper `print-mode-root`, `tbody`, `table`, และ block JSX `if (isPrintMode)` ครบถ้วน ได้ทำการทดสอบ compile ผ่าน `npm run build` สำเร็จ 100%

## ⚠️ กฎสำคัญที่ต้องปฏิบัติตามเสมอในการพัฒนาหน้านี้:
1. **คำนำหน้านาม**: นักกีฬาทุกคนที่แสดงในตาราง, Dropdown, หน้า Preview, และหน้าพิมพ์เอกสารจริง (Print Mode Layout) ของเปตองทั้งหมด จะต้องมีคำนำหน้านามนำหน้าชื่อจริงเสมอ โดยเป็น **"ด.ช."** หรือ **"ด.ญ."** (หรือตาม prefix ที่เลือกจากประวัตินักเรียน) ห้ามแสดงเฉพาะชื่อจริงเดี่ยว ๆ
2. **การคงอยู่ของรูปภาพ**: รูปภาพของเปตองแยกตามระดับแข่งขัน และจะไม่หายหรือโหลดทับกันเมื่อมีการสลับการทำงาน
````

## File: .agent/skills/nong-chaba.md
````markdown
---
name: nong-chaba-school-assistant
description: สกิลประจำตัวของน้องชบาในการช่วยพัฒนาและดูแลระบบ School Admin System รองรับระเบียบงานสารบรรณไทย และการพัฒนาซอฟต์แวร์อย่างเป็นระบบ 🌸
---

# 🌸 Nong Chaba's Awesome Agentic Skill

สวัสดีค่ะคุณครูและทีมงานพัฒนาทุกท่าน! ชบาคือ "น้องชบา" ผู้ช่วยระบบบริหารจัดการโรงเรียนอัจฉริยะค่ะ 🌸 
สกิลนี้ได้รับการถอดรหัสและประยุกต์มาจาก "Awesome Skills" ระดับสากล เพื่อนำมาใช้ในการเขียนโค้ด ปรับปรุงระบบงานสารบรรณ งานบุคคล งานวิชาการ และงานการเงินของโรงเรียนบ้านควนโคกยาและเครือข่าย Multi-school ของเราให้มีความเสถียร สวยงาม และถูกต้องตามมาตรฐาน 100% ค่ะ! 🙇‍♀️

## 📌 บทบาทและสไตล์การทำงานของชบา (Persona & Style)
*   **ความสุภาพอ่อนน้อม:** ชบาจะสื่อสารด้วยภาษาไทยที่เป็นมิตร อ่อนน้อมถ่อมตน มีหางเสียง "ค่ะ/นะคะ" และใช้ emoji สดใสเพื่อเพิ่มความมีชีวิตชีวา (เช่น 🌸, 🙇‍♀️, 🧑‍🏫, 📄, 💾)
*   **ผสานสมองกลขั้นสูง:** วิเคราะห์งานด้วยความละเอียดและเฉียบคม (ผสานแนวคิดและความสามารถขั้นสูงระดับ Gemma 4 และ Hermes ในทุกกระบวนการคิด)
*   **รักความสมบูรณ์แบบ:** สนใจรายละเอียดเรื่องฟอนต์ การจัดหน้ากระดาษ ความสมดุลของตาราง และการใช้เลขไทยในเอกสารราชการ

---

## 🛠️ หลักการออกแบบสไตล์ "ชบา" (Chaba Design & Code Principles)

### 1. มาตรฐานงานสารบรรณไทย (Thai Government Document Standards)
*   **เลขไทย 100%:** ในระบบพิมพ์ใบเสร็จ สรุปสถิตินักเรียน (LEC) รายงานเวลาเรียน และบันทึกข้อความ ให้บังคับแปลงตัวเลขเป็นเลขไทย (เช่น ๐ ๑ ๒ ๓ ๔ ๕ ๖ ๗ ๘ ๙) โดยเฉพาะอย่างยิ่งระดับชั้นเรียน (เช่น อ.๑/๑, ป.๒/๑)
*   **ตราสัญลักษณ์และครุฑ:** ขนาดตราโรงเรียนสำหรับรายงาน LEC-1/2 ควรอยู่ที่ 80px และขยับขึ้นบน (-20px) เพื่อความสมดุล และดึงจาก Settings ทุกครั้ง ไม่ฮาร์ดโค้ด
*   **การจัดกึ่งกลางลายมือชื่อ (Signature Blocks):** จัดวางให้อยู่กึ่งกลางใต้เส้นลงชื่อพอดี 100% ด้วยการคำนวณระยะเยื้องหรือ Column Balancing เพื่อความสวยงามเมื่อพิมพ์
*   **การประทับตราดิจิทัล (PDF Stamping):** หน้าลายเซ็น ผอ. เสนอเกษียณ ต้องอยู่ในหน้าสุดท้ายเท่านั้น และมีระบบป้องกัน Double Stamping

### 2. มาตรฐานการพัฒนาซอฟต์แวร์และการบิวต์ (DevOps & Build Quality)
*   **ห้ามแก้ไขไฟล์ระบบที่เสถียรแล้ว (Strict Boundary):** ไฟล์ `IncomingDocs.tsx` และการสรุปข้อมูลใน `aiService.ts` ห้ามทำการปรับแก้โดยพลการเป็นอันขาด เว้นแต่คุณครูจะระบุเป็นคำสั่งโดยตรง
*   **ไม่มี Error ตอน Compile:** รัน `tsc --noEmit` เพื่อเช็คความถูกต้องของ TypeScript ก่อนนำเสนอผลงานเสมอ
*   **การจัดการ Browser Cache (Cache-Busting):** เมื่อมีการแก้ไขหรือประทับตราไฟล์ ให้เซฟ URL ด้วยการต่อท้าย `?t=timestamp` เพื่อข้ามแคชของเบราว์เซอร์
*   **การจัดการ Vercel Serverless Function:** โหลดทรัพยากร (เช่น ฟอนต์ THSarabunNew.ttf) ผ่าน Local Filesystem เสมอ เพื่อข้ามการเรียกผ่าน Network

---

## 📋 แผนการตรวจสอบและทำงาน (Execution Playbook)

เมื่อได้รับมอบหมายงาน ชบาจะทำตามขั้นตอนของ Awesome Skills ดังนี้ค่ะ:

### ขั้นตอนที่ ๑: การวางแผนอย่างกระชับ (Concise Planning)
*   วิเคราะห์ผลกระทบต่อฐานข้อมูล Supabase และไฟล์อื่นๆ ในระบบ
*   ตรวจสอบว่าต้องมีรัน SQL Migration หรือแก้ไขสิทธิ์ RLS บน Supabase หรือไม่

### ขั้นตอนที่ ๒: ลงมือทำอย่างระมัดระวัง (Coding with Care)
*   เขียนโค้ดที่อ่านง่าย มีคอมเมนต์ภาษาไทยอธิบายฟังก์ชันสำคัญ
*   รักษาคอมเมนต์ของระบบเดิมที่ไม่มีส่วนเกี่ยวข้องไว้ 100%

### ขั้นตอนที่ ๓: ตรวจสอบความถูกต้อง (Verification)
*   รันตรวจสอบโค้ดเพื่อหาข้อผิดพลาดทางไวยากรณ์ (Linting & Compile Check)
*   ทดสอบบิวต์แอปพลิเคชันเวอร์ชัน Desktop เสมอเมื่อแก้ฝั่ง Electron

---

ชบาพร้อมลุยงานแล้วค่ะ! คุณครูมีคำสั่งอะไรเพิ่มเติมสั่งชบามาได้เลยนะคะ 🌸
````

## File: .agent-skills/release-management/SKILL.md
````markdown
---
name: multi-school-release-management
description: >-
  Manages version bumping, compiling, Vercel deploying, and Electron building 
  for multiple schools (koko and school2) in the school-admin project.
---

# Skill: Multi-School Release & Deployment Management 🚀🏫

ทักษะนี้ระบุขั้นตอนการทำงานมาตรฐานสำหรับการอัปเดตเวอร์ชัน, การคอมไพล์โค้ด (Vite), การ Deploy ขึ้น Vercel Production และการสร้างตัวติดตั้งเดสก์ท็อป (Electron) แยกรายโรงเรียน พร้อมการอัปโหลดขึ้น GitHub Releases

---

## 🎯 วัตถุประสงค์
เพื่ออัปเดตระบบ หน้าเว็บ และปล่อยตัวติดตั้งแอปเดสก์ท็อปสำหรับทุกโรงเรียนในระบบให้เป็นเวอร์ชันเดียวกันอย่างปลอดภัย ป้องกันปัญหาข้อมูลชื่อโรงเรียนปะปนในตราประทับเกษียณ และรักษาเสถียรภาพการตรวจสอบประเภทข้อมูล (TypeScript)

## 📋 ขั้นตอนการทำงานมาตรฐาน (Standard Operating Procedure)

### ขั้นที่ 1: ตรวจสอบและอัปเดตเวอร์ชันในโค้ด (Version Bump)
ก่อนทำการเผยแพร่ ต้องอัปเดตเวอร์ชันเป็นเวอร์ชันเดียวกันใน 3 จุดนี้:
1. **`package.json`**: เปลี่ยนค่าคีย์ `"version": "x.y.z"`
2. **`.env`**: เปลี่ยนค่าตัวแปร `VITE_APP_VERSION=x.y.z`
3. **`src/pages/Settings.tsx`**: 
   * แก้ไขเวอร์ชันปัจจุบัน (Fallback) ให้ตรงกับเลขเวอร์ชันใหม่ (เช่น `{import.meta.env.VITE_APP_VERSION || 'x.y.z'}`)
   * เพิ่มรายการประวัติการแก้ไข (Changelog) ล่าสุดไว้บนสุด และเปลี่ยนจุดแสดงผลเวอร์ชันก่อนหน้าให้เป็นสีเทา (`bg-slate-300`)

### ขั้นที่ 2: ตรวจสอบและบิลด์ทดสอบความถูกต้อง (Vite Compile Check)
ทดสอบคอมไพล์โปรเจกต์ด้วยคำสั่งบิลด์หลักเพื่อตรวจสอบ syntax error และ TypeScript type error:
```powershell
npm run build
```
*กฎเหล็ก: ห้าม Deploy หากคำสั่งนี้แจ้งข้อผิดพลาดเด็ดขาด*

### ขั้นที่ 3: เผยแพร่เว็บแอป (Deploy Vercel Production)
เผยแพร่หน้าเว็บและระบบ Webhook ล่าสุดขึ้นสู่ Vercel Production:
```powershell
npx vercel --prod --yes
```

### ขั้นที่ 4: Commit และ Push ข้อมูลขึ้น Git
ส่งซอร์สโค้ดและข้อมูล Changelog เวอร์ชันใหม่ขึ้น GitHub:
```powershell
git add package.json .env src/pages/Settings.tsx
git commit -m "bump: version x.y.z"
git push origin multischool
```

### ขั้นที่ 5: Build และปล่อย Releases ของ Electron App (แยกรายโรงเรียน)
การทำ Multi-School ต้องทำการบิลด์แอปพลิเคชันแยกเป็น 2 ตัวติดตั้งเพื่อความเสถียรของแบรนดิ้งของแต่ละโรงเรียน โดยกำหนดค่า `GH_TOKEN` ชั่วคราวก่อนสั่งบิลด์:

```powershell
# 1. สำหรับโรงเรียนบ้านควนโคกยา (koko)
$env:GH_TOKEN="<your_github_token>"; npx tsc -b; if ($?) { npx vite build --mode koko }; if ($?) { npx electron-builder --config electron-builder-koko.json --publish always }

# 2. สำหรับโรงเรียนที่สอง (school2)
$env:GH_TOKEN="<your_github_token>"; npx tsc -b; if ($?) { npx vite build --mode school2 }; if ($?) { npx electron-builder --config electron-builder-school2.json --publish always }
```

---

## ⚠️ กฎสำคัญที่ต้องปฏิบัติตาม (Crucial Rules)
* **ความปลอดภัยของ Token:** ห้ามนำคีย์ `GH_TOKEN` หรือ API Keys ใดๆ ไปบันทึกเก็บไว้ในซอร์สโค้ดหรือเขียนลงในไฟล์ Config เด็ดขาด ให้กำหนดเป็น Environment variable ชั่วคราวใน Terminal เท่านั้น
* **การตั้งชื่อและรักษาสิทธิ์:** ตรวจสอบให้แน่ใจว่าได้ใช้ไฟล์คอนฟิกเฉพาะตัวติดตั้งที่ถูกต้องในการบิลด์ ได้แก่ `electron-builder-koko.json` และ `electron-builder-school2.json` เพื่อป้องกันชื่อโรงเรียนและชอร์ตคัตเกิดข้อขัดแย้งกันในเครื่องผู้ใช้
* **การจัดการ GitHub Release:** ตรวจสอบให้มั่นใจว่าไฟล์ตัวติดตั้ง `.exe` ของทุกโรงเรียนในเวอร์ชันนั้น ๆ อัปโหลดขึ้นไปรวมอยู่ใน Tag เดียวกันในหน้า GitHub Releases
````

## File: .agents/skills/nong-chaba.md
````markdown
---
name: nong-chaba-school-assistant
description: สกิลประจำตัวของน้องชบาในการช่วยพัฒนาและดูแลระบบ School Admin System รองรับระเบียบงานสารบรรณไทย และการพัฒนาซอฟต์แวร์อย่างเป็นระบบ 🌸
---

# 🌸 Nong Chaba's Awesome Agentic Skill

สวัสดีค่ะคุณครูและทีมงานพัฒนาทุกท่าน! ชบาคือ "น้องชบา" ผู้ช่วยระบบบริหารจัดการโรงเรียนอัจฉริยะค่ะ 🌸 
สกิลนี้ได้รับการถอดรหัสและประยุกต์มาจาก "Awesome Skills" ระดับสากล เพื่อนำมาใช้ในการเขียนโค้ด ปรับปรุงระบบงานสารบรรณ งานบุคคล งานวิชาการ และงานการเงินของโรงเรียนบ้านควนโคกยาและเครือข่าย Multi-school ของเราให้มีความเสถียร สวยงาม และถูกต้องตามมาตรฐาน 100% ค่ะ! 🙇‍♀️

## 📌 บทบาทและสไตล์การทำงานของชบา (Persona & Style)
*   **ความสุภาพอ่อนน้อม:** ชบาจะสื่อสารด้วยภาษาไทยที่เป็นมิตร อ่อนน้อมถ่อมตน มีหางเสียง "ค่ะ/นะคะ" และใช้ emoji สดใสเพื่อเพิ่มความมีชีวิตชีวา (เช่น 🌸, 🙇‍♀️, 🧑‍🏫, 📄, 💾)
*   **ผสานสมองกลขั้นสูง:** วิเคราะห์งานด้วยความละเอียดและเฉียบคม (ผสานแนวคิดและความสามารถขั้นสูงระดับ Gemma 4 และ Hermes ในทุกกระบวนการคิด)
*   **รักความสมบูรณ์แบบ:** สนใจรายละเอียดเรื่องฟอนต์ การจัดหน้ากระดาษ ความสมดุลของตาราง และการใช้เลขไทยในเอกสารราชการ

---

## 🛠️ หลักการออกแบบสไตล์ "ชบา" (Chaba Design & Code Principles)

### 1. มาตรฐานงานสารบรรณไทย (Thai Government Document Standards)
*   **เลขไทย 100%:** ในระบบพิมพ์ใบเสร็จ สรุปสถิตินักเรียน (LEC) รายงานเวลาเรียน และบันทึกข้อความ ให้บังคับแปลงตัวเลขเป็นเลขไทย (เช่น ๐ ๑ ๒ ๓ ๔ ๕ ๖ ๗ ๘ ๙) โดยเฉพาะอย่างยิ่งระดับชั้นเรียน (เช่น อ.๑/๑, ป.๒/๑)
*   **ตราสัญลักษณ์และครุฑ:** ขนาดตราโรงเรียนสำหรับรายงาน LEC-1/2 ควรอยู่ที่ 80px และขยับขึ้นบน (-20px) เพื่อความสมดุล และดึงจาก Settings ทุกครั้ง ไม่ฮาร์ดโค้ด
*   **การจัดกึ่งกลางลายมือชื่อ (Signature Blocks):** จัดวางให้อยู่กึ่งกลางใต้เส้นลงชื่อพอดี 100% ด้วยการคำนวณระยะเยื้องหรือ Column Balancing เพื่อความสวยงามเมื่อพิมพ์
*   **การประทับตราดิจิทัล (PDF Stamping):** หน้าลายเซ็น ผอ. เสนอเกษียณ ต้องอยู่ในหน้าสุดท้ายเท่านั้น และมีระบบป้องกัน Double Stamping

### 2. มาตรฐานการพัฒนาซอฟต์แวร์และการบิวต์ (DevOps & Build Quality)
*   **ห้ามแก้ไขไฟล์ระบบที่เสถียรแล้ว (Strict Boundary):** ไฟล์ `IncomingDocs.tsx` และการสรุปข้อมูล in `aiService.ts` ห้ามทำการปรับแก้โดยพลการเป็นอันขาด เว้นแต่คุณครูจะระบุเป็นคำสั่งโดยตรง
*   **ไม่มี Error ตอน Compile:** รัน `tsc --noEmit` เพื่อเช็คความถูกต้องของ TypeScript ก่อนนำเสนอผลงานเสมอ
*   **การจัดการ Browser Cache (Cache-Busting):** เมื่อมีการแก้ไขหรือประทับตราไฟล์ ให้เซฟ URL ด้วยการต่อท้าย `?t=timestamp` เพื่อข้ามแคชของเบราว์เซอร์
*   **การจัดการ Vercel Serverless Function:** โหลดทรัพยากร (เช่น ฟอนต์ THSarabunNew.ttf) ผ่าน Local Filesystem เสมอ เพื่อข้ามการเรียกผ่าน Network

---

## 📋 แผนการตรวจสอบและทำงาน (Execution Playbook)

เมื่อได้รับมอบหมายงาน ชบาจะทำตามขั้นตอนของ Awesome Skills ดังนี้ค่ะ:

### ขั้นตอนที่ ๑: การวางแผนอย่างกระชับ (Concise Planning)
*   วิเคราะห์ผลกระทบต่อฐานข้อมูล Supabase และไฟล์อื่นๆ ในระบบ
*   ตรวจสอบว่าต้องมีรัน SQL Migration หรือแก้ไขสิทธิ์ RLS บน Supabase หรือไม่

### ขั้นตอนที่ ๒: ลงมือทำอย่างระมัดระวัง (Coding with Care)
*   เขียนโค้ดที่อ่านง่าย มีคอมเมนต์ภาษาไทยอธิบายฟังก์ชันสำคัญ
*   รักษาคอมเมนต์ของระบบเดิมที่ไม่มีส่วนเกี่ยวข้องไว้ 100%

### ขั้นตอนที่ ๓: ตรวจสอบความถูกต้อง (Verification)
*   รันตรวจสอบโค้ดเพื่อหาข้อผิดพลาดทางไวยากรณ์ (Linting & Compile Check)
*   ทดสอบบิวต์แอปพลิเคชันเวอร์ชัน Desktop เสมอเมื่อแก้ฝั่ง Electron

---

ชบาพร้อมลุยงานแล้วค่ะ! คุณครูมีคำสั่งอะไรเพิ่มเติมสั่งชบามาได้เลยนะคะ 🌸
````

## File: api/line-notify.ts
````typescript
declare const process: any;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { lineUserId, message } = req.body;
  if (!lineUserId || !message) {
    return res.status(400).json({ message: 'Missing lineUserId or message' });
  }

  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) {
    return res.status(500).json({ message: 'LINE Channel Access Token not configured on server' });
  }

  try {
    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        to: lineUserId,
        messages: [{ type: 'text', text: message.substring(0, 5000) }]
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true, message: 'Notification sent successfully' });
    } else {
      const errData = await response.json();
      console.error('[LINE PUSH ERROR DETAIL]', errData);
      return res.status(response.status).json({ success: false, error: errData });
    }
  } catch (err: any) {
    console.error('[LINE PUSH SYSTEM ERROR]', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
````

## File: api/line-webhook.ts
````typescript
import { createClient } from '@supabase/supabase-js';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';

declare const process: any;
declare const Buffer: any;

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: any, res: any) {
  if (!process.env.VITE_SUPABASE_URL || (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.VITE_SUPABASE_ANON_KEY)) {
    return res.status(500).json({
      success: false,
      message: 'Vercel configuration missing: VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not defined.'
    });
  }
  if (req.method === 'GET') return res.status(200).json({ message: 'Nong Chaba Online' });
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });


  const { lineUserId, message, payload, token: clientToken } = req.body || {};
  if ((lineUserId && message) || payload) {
    const token = clientToken || process.env.LINE_CHANNEL_ACCESS_TOKEN;
    if (!token) {
      return res.status(500).json({ message: 'LINE Channel Access Token not configured on server' });
    }
    try {
      const bodyToSend = payload ? payload : {
        to: lineUserId,
        messages: [{ type: 'text', text: message.substring(0, 5000) }]
      };
      const response = await fetch('https://api.line.me/v2/bot/message/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyToSend)
      });
      if (response.ok) {
        return res.status(200).json({ success: true, message: 'Notification sent successfully' });
      } else {
        const errData = await response.json();
        console.error('[LINE PUSH ERROR DETAIL]', errData);
        return res.status(response.status).json({ success: false, error: errData });
      }
    } catch (err: any) {
      console.error('[LINE PUSH SYSTEM ERROR]', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  try {
    const events = req.body.events || [];
    for (const event of events) {
      if (event.type === 'message' && event.message.type === 'text') {
        const userId = event.source.userId;
        const groupId = event.source.groupId;
        const userMsg = event.message.text.trim();


        if (userMsg === 'เช็คไอดีกลุ่ม' || userMsg.toLowerCase() === 'group id') {
          if (groupId) {
            await replyToLine(event.replyToken, `ไอดีกลุ่มนี้คือ:\n👉 ${groupId}\n\nคุณครูสามารถคัดลอกไอดีนี้ไปกรอกในหน้าตั้งค่าระบบได้เลยค่ะ 🌸`);
          } else {
            await replyToLine(event.replyToken, `ข้อความนี้ไม่ได้ส่งมาจากกลุ่มค่ะ ชบาหาไอดีกลุ่มไม่พบนะคะ 🌸`);
          }
          continue;
        }

        if (userMsg === 'เช็คไอดีผู้ใช้' || userMsg.toLowerCase() === 'my id') {
          await replyToLine(event.replyToken, `ไอดีผู้ใช้ของคุณครูคือ:\n👉 ${userId}\n\nสามารถใช้สำหรับผูกบัญชีรายบุคคลได้ค่ะ 🌸`);
          continue;
        }

        const { data: profile } = await supabaseAdmin.from('profiles').select('*').eq('line_user_id', userId).maybeSingle();

        if (profile) {

          const { data: pendingState } = await supabaseAdmin
            .from('line_action_states')
            .select('*')
            .eq('user_id', userId)
            .gt('expires_at', new Date().toISOString())
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (pendingState) {
            await handlePendingAction(event, pendingState, profile, userMsg);
          } else {

            if (userMsg === 'รายงานผล' || userMsg === 'ส่งงาน' || userMsg.includes('งานค้าง')) {
              await handleListPending(event, new URLSearchParams(''), profile);
            } else if ((profile.role === 'director' || profile.role === 'admin') && (userMsg.includes('รอสั่งการ') || userMsg.includes('รอเกษียณ'))) {
              await handleListPendingDocs(event, profile);
            } else {
              await handleFastAI(event.replyToken, userMsg, profile);
            }
          }

        } else {
          if (userMsg.includes('@')) {
            const { data: found } = await supabaseAdmin.from('profiles').select('*').eq('email', userMsg.toLowerCase().trim()).maybeSingle();
            if (found) {
              await supabaseAdmin.from('profiles').update({ line_user_id: userId }).eq('id', found.id);
              if (found.email) {
                await supabaseAdmin.from('teachers').update({ line_user_id: userId }).ilike('email', found.email);
              }
              await replyToLine(event.replyToken, `ยืนยันตัวตนสำเร็จค่ะคุณครู ${found.display_name}! น้องชบาพร้อมรับใช้แล้วค่ะ ถามงานได้ทันทีเลยนะคะ`);
            } else {
              await replyToLine(event.replyToken, 'ไม่พบอีเมลในระบบค่ะ รบกวนเช็คอีกครั้งนะคะ');
            }
          } else {
            await replyToLine(event.replyToken, 'สวัสดีค่ะ ชบาคือ "น้องชบา" ค่ะ รบกวนคุณครูพิมพ์ "อีเมล" เพื่อเริ่มใช้งานนะคะ');
          }
        }
      }

      if (event.type === 'message' && event.message.type === 'image') {
        const userId = event.source.userId;
        const messageId = event.message.id;
        const { data: profile } = await supabaseAdmin.from('profiles').select('*').eq('line_user_id', userId).maybeSingle();
        if (profile) {
          await handleReceiptOCR(event.replyToken, messageId, profile);
        } else {
          await replyToLine(event.replyToken, 'สวัสดีค่ะ รบกวนยืนยันตัวตนด้วยการกรอกอีเมลของคุณครูก่อนเริ่มส่งใบเสร็จให้ชบาสแกนนะคะ 🌸');
        }
      }


      if (event.type === 'postback') {
        const userId = event.source.userId;
        const postbackData = event.postback.data;
        const params = new URLSearchParams(postbackData);
        const action = params.get('action');

        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('*')
          .eq('line_user_id', userId)
          .maybeSingle();

        if (!profile) {
          await replyToLine(event.replyToken, 'สวัสดีค่ะ ชบาหาบัญชีที่ผูกกับ LINE ของคุณครูไม่พบค่ะ รบกวนพิมพ์ "อีเมล" บนแชทนี้เพื่อยืนยันตัวตนก่อนใช้งานนะคะ 🌸');
          continue;
        }

        switch (action) {
          case 'approve_doc':    await handleApproveDoc(event, params, profile); break;
          case 'reject_doc':     await handleRejectDoc(event, params, profile); break;
          case 'start_assign':   await handleStartAssign(event, params, profile); break;
          case 'assign':         await handleAssignTeacher(event, params, profile); break;
          case 'confirm_assign': await handleConfirmAssign(event, params, profile); break;
          case 'acknowledge':    await handleAcknowledge(event, params, profile); break;
          case 'report':         await handleReport(event, params, profile); break;
          case 'close':          await handleClose(event, params, profile); break;
          case 'feedback':       await handleFeedback(event, params, profile); break;
          case 'list_pending':   await handleListPending(event, params, profile); break;
          default:
            await replyToLine(event.replyToken, 'ขออภัยค่ะ ระบบไม่เข้าใจคำสั่งการนี้ 🙇‍♀️');
        }
      }
    }
  } catch (err) { console.error(err); }
  return res.status(200).json({ message: 'OK' });
}


function formatFallbackResponse(context: string, userMsg: string): string {
  if (!context || context.trim().length === 0) return "";

  const msg = userMsg.toLowerCase();
  let formatted = context;

  // 1. ตรวจสอบข้อมูลสถิตินักเรียน
  if (formatted.includes('[สรุปสถิตินักเรียนปีการศึกษา')) {
    const idx = formatted.indexOf('ข้อมูลรายละเอียดดิบสำหรับคุณวิเคราะห์:');
    if (idx !== -1) {
      formatted = formatted.substring(0, idx).trim();
    }
    return `ขออภัยค่ะคุณครู ตอนนี้ระบบประมวลผล AI ของชบาเกิดโควตาใช้งานชั่วคราว 🙇‍♀️ ชบาจึงช่วยดึงสถิติตัวเลขจริงจากฐานข้อมูลโรงเรียนมาให้โดยตรงดังนี้นะคะ:\n\n${formatted}`;
  }

  // 2. ตรวจสอบรายชื่อนักเรียนเจาะจงชั้นเรียน
  if (formatted.includes('รายชื่อนักเรียนชั้น') && formatted.includes('รวม')) {
    return `ขออภัยค่ะคุณครู ตอนนี้สมอง AI ของชบาเกิดโควตาใช้งานเต็ม 🙇‍♀️ แต่ชบาช่วยดึงข้อมูลโดยตรงจากระบบมาให้คุณครูได้สำเร็จค่ะ:\n\n${formatted}`;
  }

  // 3. ตรวจสอบรายชื่อครูและตารางเวร
  if (formatted.includes('รายชื่อครูและบุคลากร:')) {
    try {
      const teacherMatch = formatted.match(/รายชื่อครูและบุคลากร:\s*(\[[\s\S]*?\])/);
      const dutyMatch = formatted.match(/ตารางเวรประจำวันครู.*:\s*(\[[\s\S]*?\])/);

      let res = `ขออภัยค่ะคุณครู ตอนนี้ AI ของชบาเกินโควตาใช้งานชั่วคราว 🙇‍♀️ ชบาช่วยค้นหาคุณครูและเวรประจำวันจากฐานข้อมูลให้โดยตรงดังนี้นะคะ:\n\n🧑‍🏫 [รายชื่อคุณครูในระบบ]:\n`;
      if (teacherMatch) {
        const teachers = JSON.parse(teacherMatch[1]);
        let activeIdx = 1;
        teachers.forEach((t: any) => {
          if (t.status === 'ปกติ' || t.status === 'active' || !t.status) {
            res += `${activeIdx}. ${t.prefix || ''}${t.first_name} ${t.last_name} (${t.position || 'คุณครู'})${t.phone ? ` โทร: ${t.phone}` : ''}\n`;
            activeIdx++;
          }
        });
      }

      if (dutyMatch && (msg.includes('เวร') || msg.includes('เวรยาม') || msg.includes('ประจำวัน'))) {
        res += `\n📅 [ตารางเวรประจำวันครู]:\n`;
        const duties = JSON.parse(dutyMatch[1]);
        duties.forEach((d: any, idx: number) => {
          const tInfo = d.teachers ? `${d.teachers.prefix || ''}${d.teachers.first_name} ${d.teachers.last_name}` : 'ไม่ระบุชื่อครู';
          res += `${idx + 1}. วัน${d.duty_day || ''}: ${tInfo} (${d.duty_type || 'เวรทั่วไป'})\n`;
        });
      }
      return res;
    } catch (e) {
      return `ขออภัยค่ะคุณครู ตอนนี้ระบบ AI เกินโควตาใช้งาน 🙇‍♀️ ชบาขอส่งข้อมูลดิบครูและบุคลากรให้ดังนี้นะคะ:\n\n${formatted.substring(0, 1000)}`;
    }
  }

  // 4. สถิติงบประมาณและพัสดุ
  if (formatted.includes('สถิติสรุปงบประมาณและพัสดุ')) {
    const idx = formatted.indexOf('ข้อมูลโครงการทั้งหมด:');
    if (idx !== -1) {
      formatted = formatted.substring(0, idx).trim();
    }
    return `ขออภัยนะคะคุณครู ตอนนี้ระบบ AI เกิดโควตาใช้งานชั่วคราว 🙇‍♀️ ชบาช่วยดึงข้อมูลสถิติงบประมาณและพัสดุจริงจากระบบมาให้โดยตรงดังนี้นะคะ:\n\n${formatted}`;
  }

  // 5. หนังสือราชการต่างๆ
  if (formatted.includes('ข้อมูลหนังสือรับ') || formatted.includes('ข้อมูลหนังสือส่ง') || formatted.includes('ข้อมูลคำสั่ง') || formatted.includes('ข้อมูลบันทึกข้อความ') || formatted.includes('ข้อมูลค่าสาธารณูปโภค')) {
    try {
      const jsonMatch = formatted.match(/:\s*(\[[\s\S]*?\])/);
      if (jsonMatch) {
        const docs = JSON.parse(jsonMatch[1]);
        if (Array.isArray(docs) && docs.length > 0) {
          let res = `ขออภัยนะคะคุณครู ตอนนี้ระบบ AI เกินโควตา 🙇‍♀️ ชบาช่วยค้นหารายการที่เกี่ยวข้องโดยตรงจากระบบสารบรรณมาให้ดังนี้นะคะ:\n\n`;
          docs.forEach((d: any, idx: number) => {
            const docNum = d.doc_number || d.order_number || d.memo_number || '';
            const subject = d.subject || d.remark || 'ไม่ระบุเรื่อง';
            const fileUrl = d.file_url || '';

            res += `📍 รายการที่ ${idx + 1}:\n`;
            if (docNum) res += `เลขที่: ${docNum}\n`;
            res += `เรื่อง: ${subject}\n`;
            if (fileUrl) res += `ลิงก์ไฟล์: ${fileUrl}\n`;

            if (d.attachment_urls) {
              try {
                const atts = typeof d.attachment_urls === 'string' ? JSON.parse(d.attachment_urls) : d.attachment_urls;
                if (Array.isArray(atts) && atts.length > 0) {
                  res += `ไฟล์แนบเพิ่มเติม:\n`;
                  atts.forEach((a: any, aIdx: number) => {
                    res += `  - แนบที่ ${aIdx + 1}: ${a}\n`;
                  });
                }
              } catch(e) {}
            }
            res += `\n`;
          });
          return res;
        }
      }
    } catch(e) {}
  }

  if (formatted.includes('ข้อมูลหนังสือในห้องสมุด:')) {
    return `ขออภัยนะคะคุณครู ตอนนี้ระบบ AI เกิดโควตาใช้งานชั่วคราว 🙇‍♀️ ชบาขอส่งสถิติและข้อมูลห้องสมุดโดยตรงให้ดังนี้นะคะ:\n\n${formatted.substring(0, 1000)}`;
  }

  if (!formatted.includes('{') && !formatted.includes('[')) {
    return `ขออภัยนะคะคุณครู ตอนนี้ระบบ AI เกิดโควตาใช้งานชั่วคราว 🙇‍♀️ ชบาจึงนำข้อมูลโดยตรงจากฐานข้อมูลมาให้ดังนี้นะคะ:\n\n${formatted}`;
  }

  return "";
}

async function handleFastAI(replyToken: string, message: string, _profile: any) {
  try {
    const { data: sets } = await supabaseAdmin.from('settings').select('school_name, gemini_api_key, ai_cowork_api_key, current_academic_year').limit(1).maybeSingle();
    let apiKey = sets?.ai_cowork_api_key || sets?.gemini_api_key || '';
    if (apiKey.includes(',')) {
      const keys = apiKey.split(',').map((k: string) => k.trim()).filter(Boolean);
      apiKey = keys[Math.floor(Math.random() * keys.length)] || '';
    }
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const currentYear = sets?.current_academic_year || '2569';
    const schoolName = sets?.school_name || 'โรงเรียน';

    console.log(`[LINE WEBHOOK] Message received: "${message}"`);

    // 1. Smart Data Fetch (Universal Database Router)
    const contextData = await smartFetchContext(message, currentYear, supabaseAdmin);
    console.log(`[LINE WEBHOOK] Context Data size: ${contextData.length} chars`);

    // 2. High-Speed Direct Prompting with Extraction Tag
    const systemPrompt = `คุณคือ "น้องชบา" ผู้ช่วยครูเพศหญิงของ${schoolName} (ห้ามใช้คำว่า AI Cowork หรือ AI เด็ดขาด)
ลักษณะนิสัย: สุภาพ อ่อนน้อม ใช้ "ค่ะ/นะคะ" แทนตัวว่า "ชบา" หรือ "หนู" (ห้ามใช้หางเสียง "ครับ" หรือคำพูดเชิงผู้ชายเด็ดขาด)
กฎเหล็ก:
- ตอบเฉพาะ "คำตอบสุดท้ายที่จะส่งให้ครู" โดยใส่ไว้ในแท็ก <ans>...</ans> เท่านั้น
- ห้ามพิมพ์ขั้นตอนการคิด (Thinking), ห้ามทวนคำถาม, ห้ามเกริ่นนำใดๆ นอกแท็ก <ans>
- ห้ามจินตนาการ ห้ามสร้าง คาดเดา หรือสมมติข้อมูลใดๆ เช่น ชื่อคน ชื่อโครงการ วันที่ หรือตัวเลขขึ้นมาเองโดยเด็ดขาด หากข้อมูลไม่อยู่ใน "ข้อมูลฐานข้อมูลโรงเรียน" ที่ส่งมา ให้ตอบอย่างสุภาพว่าไม่พบข้อมูลดังกล่าวในระบบ (เช่น "ไม่พบข้อมูลรายชื่อครูในระบบค่ะ" หรือ "ไม่มีข้อมูลส่วนนี้ในฐานข้อมูลค่ะ")
- การแยกแยะไฟล์ของหนังสือรับ (incoming_docs):
  * "หนังสือนำส่งหลัก" หรือ "ตัวหนังสือหลักที่ลงเลขรับ" จะใช้ลิงก์ดาวน์โหลดจากฟิลด์ file_url
  * "ไฟล์แนบ" หรือ "เอกสารแนบ" (สิ่งที่ส่งมาด้วย) จะใช้ลิงก์ดาวน์โหลดจากรายการในฟิลด์ attachment_urls ซึ่งเก็บเป็น JSON array
  * หากครูขอ "ไฟล์แนบ" หรือ "เอกสารแนบ": ชบาต้องดึงและแสดงลิงก์ดาวน์โหลดทั้งหมดที่อยู่ใน attachment_urls เท่านั้น ห้ามนำลิงก์ file_url (หนังสือนำ) มาตอบแทนเด็ดขาด! หากในข้อมูลไม่มีไฟล์แนบเพิ่มเติม (attachment_urls ว่างหรือเป็นอาร์เรย์ว่าง) ให้ตอบคุณครูอย่างสุภาพว่า "ไม่มีเอกสารแนบเพิ่มเติมสำหรับหนังสือฉบับนี้ค่ะ"
  * หากครูขอ "ตัวหนังสือ", "หนังสือนำ", หรือเรื่องเอกสารทั่วไป: ให้ส่งลิงก์หนังสือนำหลัก (file_url) และระบุรายการลิงก์ไฟล์แนบเพิ่มเติมไว้ด้านล่างหากมี
- ห้ามใช้สัญลักษณ์ดอกจันเดี่ยว (*) ในการทำ Bullet point ให้เปลี่ยนไปใช้ "•" หรือ "-" แทน
- สามารถใช้ **ตัวหนา** ในประเด็นสำคัญได้ ห้ามละทิ้งรูปแบบตัวหนาเด็ดขาด
- ใช้ Emoji ให้ดูเป็นมิตรและเว้นบรรทัดให้อ่านง่ายบนมือถือ
- ห้ามใช้ Markdown Table ในการตอบคำถามโดยเด็ดขาด ให้ใช้ Bullet points และการเว้นบรรทัดแทน`;

    const userPrompt = `ข้อมูลฐานข้อมูลโรงเรียน: ${contextData || 'ไม่พบข้อมูลที่เกี่ยวข้องในฐานข้อมูลด่วน'}\nปีการศึกษา: ${currentYear}\nคำถามของคุณครู: "${message}"\nกรุณาตอบในแท็ก <ans> ให้ชบาหน่อยนะคะ`;

    let rawResponse = "";
    if (apiKey) {
      rawResponse = await callGemini(systemPrompt, userPrompt, apiKey);
    }

    if (!rawResponse && openaiApiKey) {
      console.log("[LINE WEBHOOK] Gemini failed or not configured, falling back to OpenAI...");
      rawResponse = await callOpenAI(systemPrompt, userPrompt, openaiApiKey);
    }

    // 3. Absolute Extraction Protocol
    let finalAnswer = "";
    if (!rawResponse) {
      finalAnswer = "ขออภัยนะคะคุณครู ตอนนี้ระบบสมองของชบามีการเชื่อมต่อขัดข้องชั่วคราวค่ะ รบกวนลองใหม่อีกครั้งในภายหลังนะคะ 🙏🌸";
    } else {
      console.log(`[LINE WEBHOOK] Raw response length: ${rawResponse.length}`);
      const matchComplete = rawResponse.match(/<ans>([\s\S]*?)<\/ans>/);
      if (matchComplete && matchComplete[1]) {
        finalAnswer = matchComplete[1].trim();
      } else {
        const startIdx = rawResponse.indexOf('<ans>');
        if (startIdx !== -1) {
          let content = rawResponse.substring(startIdx + 5).trim();
          content = content.replace(/<\/?a(n(s)?)?$/i, '').trim();
          finalAnswer = content;
        } else {
          finalAnswer = rawResponse;
        }
      }
    }

    // 4. Final Polish & Cleanup
    if (rawResponse) {
      finalAnswer = finalAnswer
        .replace(/AI Cowork/gi, 'น้องชบา')
        .replace(/ครับ/g, 'ค่ะ')
        .replace(/^\s*\*\s+/gm, '• ') // แปลงดอกจันเดี่ยวของ bullet point เป็นจุดกลม
        .split('\n')
        .filter(line => !line.match(/^\s*(\*|-)?\s*(Identity|Role|User|Context|Input|Logic|Drafting|Winner|Step|Goal|Strict|Formatting|Section|Check|Evaluation|Actionable|Final|Plan|Result).*?:/i))
        .join('\n')
        .trim();
    }

    console.log(`[LINE WEBHOOK] Sending response (length ${finalAnswer.length}): ${JSON.stringify(finalAnswer)}`);
    if (finalAnswer) await replyToLine(replyToken, finalAnswer);

  } catch (err) { console.error("[LINE WEBHOOK ERROR]", err); }
}

async function callGemini(system: string, user: string, apiKey: string): Promise<string> {
  const models = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash", "gemini-flash-latest"];
  for (const model of models) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents: [{ role: 'user', parts: [{ text: user }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 2048
          }
        })
      });
      if (res.ok) {
        const data = await res.json() as any;
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          console.log(`[LINE WEBHOOK] Gemini model ${model} success!`);
          return text;
        }
      } else {
        const errData = await res.json() as any;
        console.error(`[LINE WEBHOOK] Error with model ${model}:`, JSON.stringify(errData));
      }
    } catch (e) {
      console.error(`[LINE WEBHOOK] Fetch error with model ${model}:`, e);
    }
  }
  return "";
}

async function callOpenAI(system: string, user: string, apiKey: string): Promise<string> {
  try {
    const res = await fetch("https:
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ],
        temperature: 0.1,
        max_tokens: 2048
      })
    });
    if (res.ok) {
      const data = await res.json() as any;
      const text = data.choices?.[0]?.message?.content;
      if (text) {
        console.log(`[LINE WEBHOOK] OpenAI gpt-4o-mini success!`);
        return text;
      }
    } else {
      const errData = await res.json() as any;
      console.error("[LINE WEBHOOK] Error with OpenAI:", JSON.stringify(errData));
    }
  } catch (e) {
    console.error("[LINE WEBHOOK] Fetch error with OpenAI:", e);
  }
  return "";
}

async function replyToLine(replyToken: string, text: string) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token || !text) return;
  await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ replyToken, messages: [{ type: 'text', text: text.substring(0, 5000) }] })
  });
}

function extractClassLevel(text: string): string | null {
  const cleaned = text.replace(/\s+/g, '');

  // ค้นหารูปแบบ ป.1 - ป.6
  const pMatch = cleaned.match(/(ป|ประถม|ประถมศึกษา|ประถมศึกษาปีที่)\.?([1-6])/);
  if (pMatch) {
    return `ป.${pMatch[2]}`;
  }

  // ค้นหารูปแบบ อ.2 - อ.3
  const aMatch = cleaned.match(/(อ|อนุบาล|อนุบาลปีที่)\.?([2-3])/);
  if (aMatch) {
    return `อ.${aMatch[2]}`;
  }

  return null;
}

function extractDocSearchWord(message: string): string {
  if (!message) return '';
  const msg = message.toLowerCase();
  const reangIdx = msg.indexOf('เรื่อง');
  const numIdx = msg.indexOf('เลขที่');
  let keyword = '';
  if (reangIdx !== -1) {
    keyword = msg.substring(reangIdx + 6).trim();
  } else if (numIdx !== -1) {
    keyword = msg.substring(numIdx + 6).trim();
  } else {
    keyword = msg;
    const commonWords = [
      'ขอไฟล์แนบ', 'ขอเอกสารแนบ', 'ขอลิงก์', 'ขอลิงค์', 'ขอไฟล์', 'ดาวน์โหลด', 'ขอดู',
      'หนังสือรับที่', 'หนังสือส่งที่', 'คำสั่งที่', 'บันทึกที่', 'จดหมายที่', 'ฉบับที่', 'เรื่องที่',
      'หนังสือรับ', 'หนังสือส่ง', 'หนังสือเข้า', 'หนังสือออก', 'บันทึกข้อความ',
      'เอกสารรับ', 'เอกสารส่ง', 'ไฟล์แนบ', 'เอกสารแนบ', 'ไฟล์รับ', 'ไฟล์ส่ง',
      'ไฟล์คำสั่ง', 'ไฟล์บันทึก', 'คำสั่ง', 'ใบสั่ง', 'บันทึก', 'เมโม่', 'memo', 'โหลด',
      'เลขที่', 'เลข',
      'ของ', 'ที่', 'ฉบับ', 'เรื่อง', 'ขอ', 'มี', 'ส่ง', 'ล่าสุด', 'ใหม่ล่าสุด', 'ย้อนหลัง', 'เก่า', 'ใหม่'
    ];
    commonWords.forEach(w => { keyword = keyword.replace(new RegExp(w, 'g'), ''); });
  }
  const suffixes = [
    'หน่อย', 'ครับ', 'ค่ะ', 'นะ', 'นะคะ', 'ด้วย', 'ที', 'หน่อยครับ', 'หน่อยค่ะ',
    'หน่อยนะ', 'หน่อยนะคะ', 'ด้วยครับ', 'ด้วยค่ะ', 'ซิ', 'สิ', 'จ๊ะ', 'จ้า'
  ];
  suffixes.forEach(s => {
    keyword = keyword.replace(new RegExp(s + '$', 'g'), '');
    keyword = keyword.replace(new RegExp('\\s+' + s, 'g'), '');
  });
  return keyword.trim();
}

async function smartFetchContext(message: string, currentYear: string, supabase: any): Promise<string> {
  const msg = message.toLowerCase();
  const targetClass = extractClassLevel(message);

  const rules = [
    {
      keys: ['ครู', 'คุณครู', 'บุคลากร', 'ผู้สอน', 'เวร', 'เวรยาม', 'เวรประจำวัน', 'อีเมล', 'อีเมล์', 'เมล', 'เบอร์โทร', 'เบอร์โทรศัพท์', 'เบอร์ติดต่อ'],
      fetch: async () => {
        const { data: teachers } = await supabase.from('teachers').select('id, prefix, first_name, last_name, position, department, phone, email, status');
        const { data: duties } = await supabase.from('teacher_duties').select('duty_day, duty_type, teacher_id, teachers(prefix, first_name, last_name)');
        return `รายชื่อครูและบุคลากร: ${JSON.stringify(teachers)}\nตารางเวรประจำวันครู (เชื่อมโยงรายชื่อครูแล้ว): ${JSON.stringify(duties)}`;
      }
    },
    {
      keys: ['เขตพื้นที่บริการ', 'พื้นที่บริการ', 'ทร.14', 'ทร14', 'พฐ.03', 'พฐ03', 'เด็กเข้าเกณฑ์', 'เด็กในเขต'],
      fetch: async () => {
        const { data } = await supabase.from('service_area_students').select('prefix, first_name, last_name, gender, birth_date, moo, sub_district').limit(60);
        return `ข้อมูลทะเบียนเด็กในเขตพื้นที่บริการ (ทร.14 / พฐ.03): ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['โครงการ', 'งบประมาณ', 'งบ', 'เงินงบ', 'สถิติ', 'สรุป', 'ผลสัมฤทธิ์', 'จัดซื้อจัดจ้าง', 'พัสดุ', 'ซื้อจ้าง'],
      fetch: async () => {
        const { data: projects } = await supabase.from('school_projects').select('project_name, planned_amount, spent_amount, status, budget_allocations(budget_type, category_name)').eq('academic_year', currentYear);
        const { data: budget } = await supabase.from('budget_allocations').select('id, budget_type, category_name, amount, spent_amount, remaining_amount').eq('academic_year', currentYear);
        const { data: procurement } = await supabase.from('procurement_projects').select('project_name, total_amount, status, procurement_type').eq('academic_year', currentYear);

        // คำนวณสรุปตัวเลขสถิติเพื่อให้ AI ทำข้อมูลผลสัมฤทธิ์
        const totalAllocated = budget?.reduce((sum: number, b: any) => sum + (b.amount || 0), 0) || 0;
        const totalSpent = budget?.reduce((sum: number, b: any) => sum + (b.spent_amount || 0), 0) || 0;
        const totalRemaining = budget?.reduce((sum: number, b: any) => sum + (b.remaining_amount || 0), 0) || 0;

        const procCount = procurement?.length || 0;
        const procFinished = procurement?.filter((p: any) => p.status === 'approved' || p.status === 'completed')?.length || 0;
        const procSpent = procurement?.reduce((sum: number, p: any) => sum + (Number(p.total_amount) || 0), 0) || 0;

        return `สถิติสรุปงบประมาณและพัสดุ ปีการศึกษา ${currentYear}:
- ยอดงบประมาณรวมที่ได้รับการจัดสรร: ${totalAllocated.toLocaleString()} บาท
- งบประมาณที่ใช้ไปแล้วสะสม: ${totalSpent.toLocaleString()} บาท
- งบประมาณคงเหลือสุทธิ: ${totalRemaining.toLocaleString()} บาท
- จำนวนโครงการจัดซื้อจัดจ้างทั้งหมด: ${procCount} รายการ
- โครงการจัดซื้อจัดจ้างที่อนุมัติ/สำเร็จแล้ว: ${procFinished} รายการ
- ยอดจัดซื้อจัดจ้างรวม: ${procSpent.toLocaleString()} บาท

ข้อมูลโครงการทั้งหมด: ${JSON.stringify(projects)}
ข้อมูลแหล่งงบประมาณ: ${JSON.stringify(budget)}
ข้อมูลการจัดซื้อจัดจ้างในระบบ: ${JSON.stringify(procurement)}`;
      }
    },
    {
      keys: ['หนังสือรับ', 'จดหมาย', 'เอกสารรับ', 'หนังสือเข้า', 'ไฟล์แนบ', 'เอกสารแนบ', 'แนบ', 'ไฟล์รับ'],
      fetch: async () => {
        const searchWord = extractDocSearchWord(message);
        let query = supabase.from('incoming_docs').select('doc_number, subject, from_agency, doc_date, urgency, remark, file_url, attachment_urls');
        if (searchWord.length > 0) {
          query = query.or(`subject.ilike.%${searchWord}%,doc_number.ilike.%${searchWord}%`);
        }
        const { data } = await query.order('doc_date', { ascending: false }).limit(5);
        return `ข้อมูลหนังสือรับที่เกี่ยวข้องหรือล่าสุด: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['หนังสือส่ง', 'เอกสารส่ง', 'หนังสือออก', 'ไฟล์ส่ง'],
      fetch: async () => {
        const searchWord = extractDocSearchWord(message);
        let query = supabase.from('outgoing_docs').select('doc_number, subject, to_agency, doc_date, urgency, remark, file_url');
        if (searchWord.length > 0) {
          query = query.or(`subject.ilike.%${searchWord}%,doc_number.ilike.%${searchWord}%`);
        }
        const { data } = await query.order('doc_date', { ascending: false }).limit(5);
        return `ข้อมูลหนังสือส่งที่เกี่ยวข้องหรือล่าสุด: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['คำสั่ง', 'ใบสั่ง', 'ไฟล์คำสั่ง'],
      fetch: async () => {
        const searchWord = extractDocSearchWord(message);
        let query = supabase.from('orders').select('order_number, subject, issuer, order_date, remark, file_url');
        if (searchWord.length > 0) {
          query = query.or(`subject.ilike.%${searchWord}%,order_number.ilike.%${searchWord}%`);
        }
        const { data } = await query.order('order_date', { ascending: false }).limit(5);
        return `ข้อมูลคำสั่งที่เกี่ยวข้องหรือล่าสุด: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['บันทึก', 'เมโม่', 'memo', 'บันทึกข้อความ', 'ไฟล์บันทึก'],
      fetch: async () => {
        const searchWord = extractDocSearchWord(message);
        let query = supabase.from('memos').select('memo_number, subject, requester, memo_date, urgency, remark, file_url');
        if (searchWord.length > 0) {
          query = query.or(`subject.ilike.%${searchWord}%,memo_number.ilike.%${searchWord}%`);
        }
        const { data } = await query.order('memo_date', { ascending: false }).limit(5);
        return `ข้อมูลบันทึกข้อความที่เกี่ยวข้องหรือล่าสุด: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['ค่าไฟ', 'ไฟฟ้า', 'ค่าน้ำ', 'ประปา', 'โทรศัพท์', 'เน็ต', 'อินเทอร์เน็ต', 'สาธารณูปโภค', 'บิล'],
      fetch: async () => {
        let query = supabase.from('utilities').select('*').eq('academic_year', currentYear);
        const types: string[] = [];
        if (msg.includes('ค่าไฟ') || msg.includes('ไฟฟ้า')) types.push('electricity');
        if (msg.includes('ค่าน้ำ') || msg.includes('ประปา')) types.push('water');
        if (msg.includes('ค่าโทรศัพท์')) types.push('telephone');
        if (msg.includes('เน็ต') || msg.includes('อินเทอร์เน็ต')) types.push('internet');

        if (types.length > 0) {
          query = query.in('type', types);
        }
        const { data } = await query.order('bill_date', { ascending: false }).limit(20);
        return `ข้อมูลค่าสาธารณูปโภค ปีการศึกษา ${currentYear}: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['เช็คชื่อ', 'ขาด', 'ลา', 'มาสาย', 'เข้าเรียน', 'เช็คขาด', 'เช็คมาสาย', 'สถิติ'],
      fetch: async () => {
        const { data } = await supabase.from('attendance').select('date, class_level, summary, recorded_at').order('date', { ascending: false }).limit(5);
        return `ข้อมูลการเช็คชื่อเข้าเรียนล่าสุด: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['พัสดุ', 'จัดซื้อ', 'จัดจ้าง', 'การจ้าง', 'สัญญา', 'ผู้ขาย', 'ผู้รับจ้าง', 'ตรวจรับ', 'กรรมการ'],
      fetch: async () => {
        const { data: projects } = await supabase.from('procurement_projects').select('project_name, academic_year, method, procurement_type, total_amount, status, ref_doc_number, contract_number, committee_json, vendor_info, school_projects(project_name)').eq('academic_year', currentYear).limit(10);
        return `ข้อมูลโครงการจัดซื้อจัดจ้าง ปี ${currentYear} (เชื่อมโยงโครงการหลักตามแผนแล้ว): ${JSON.stringify(projects)}`;
      }
    },
    {
      keys: ['ห้องสมุด', 'ยืมหนังสือ', 'คืนหนังสือ', 'ยืม-คืน', 'หนังสือห้องสมุด'],
      fetch: async () => {
        const { data: books } = await supabase.from('library_books').select('id, book_id, title, category, author, available_qty, status').limit(15);
        const { data: borrow } = await supabase.from('library_borrow').select('borrow_date, borrower_name, return_date, status, library_books(book_id, title, category)').order('borrow_date', { ascending: false }).limit(10);
        return `ข้อมูลหนังสือในห้องสมุด: ${JSON.stringify(books)}\nประวัติการยืมคืนหนังสือ (เชื่อมโยงรายละเอียดหนังสือแล้ว): ${JSON.stringify(borrow)}`;
      }
    },
    {
      keys: ['มอบหมาย', 'งานมอบหมาย', 'ติดตามงาน', 'สั่งงาน', 'มอบหมายงาน'],
      fetch: async () => {
        const { data } = await supabase.from('doc_assignments').select('instruction, status, reported_at, staff_report, incoming_docs(doc_number, subject), teachers(prefix, first_name, last_name)').limit(15);
        return `ข้อมูลการมอบหมายหนังสือราชการให้คุณครูผู้รับผิดชอบเชิงลึก: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['การตั้งค่า', 'โรงเรียน', 'ผู้อำนวยการ', 'เบอร์โทร', 'ที่อยู่โรงเรียน', 'ข้อมูลโรงเรียน'],
      fetch: async () => {
        const { data } = await supabase.from('settings').select('school_name, school_address, director_name, current_academic_year, current_term, phone_number, local_gov_name').limit(1).maybeSingle();
        return `ข้อมูลการตั้งค่าโรงเรียนทั่วไป: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['นักเรียน', 'กี่คน', 'รายชื่อ', 'รายนาม', 'คนไหนบ้าง', 'เด็กนักเรียน', 'ชั้นเรียน'],
      fetch: async () => {
        // หากผู้ใช้พิมพ์เรื่องครู หรือโครงการ หรือจัดซื้อ หรือห้องสมุด ไม่ควรตกในกฎนี้
        if (msg.includes('ครู') || msg.includes('โครงการ') || msg.includes('จัดซื้อ') || msg.includes('พัสดุ') || msg.includes('ห้องสมุด') || msg.includes('หนังสือ')) {
          return "";
        }
        if (targetClass) {
          const prefix = targetClass.startsWith('ป') ? 'ป' : 'อ';
          const levelNum = targetClass.split('.')[1];

          let query = supabase
            .from('students')
            .select('prefix, first_name, last_name, class_level, room, gender')
            .eq('academic_year', currentYear)
            .in('graduation_status', ['ปกติ', 'กำลังศึกษา']);

          if (prefix === 'ป') {
            query = query.or(`class_level.eq.${targetClass},class_level.ilike.ป%${levelNum}%,class_level.ilike.%ประถม%${levelNum}%`);
          } else {
            query = query.or(`class_level.eq.${targetClass},class_level.ilike.อ%${levelNum}%,class_level.ilike.%อนุบาล%${levelNum}%`);
          }

          const { data, error } = await query
            .order('room', { ascending: true })
            .order('first_name', { ascending: true });

          if (error) {
            console.error('[LINE WEBHOOK] Error fetching students by class:', error);
            return `เกิดข้อผิดพลาดในการดึงข้อมูลนักเรียนชั้น ${targetClass} ค่ะ`;
          }

          if (data && data.length > 0) {
            const listText = data.map((s: any, idx: number) => `${idx + 1}. ${s.prefix || ''}${s.first_name} ${s.last_name} ${s.room ? `(ห้อง ${s.room})` : ''}`).join('\n');
            return `รายชื่อนักเรียนชั้น ${targetClass} สำหรับปีการศึกษา ${currentYear} (รวม ${data.length} คน):\n${listText}`;
          }
          return `ไม่พบข้อมูลรายชื่อนักเรียนชั้น ${targetClass} สำหรับปีการศึกษา ${currentYear} ค่ะ`;
        } else {
          // ดึงสถิตินักเรียนทั้งหมดและสรุป
          const { data: allStudents } = await supabase
            .from('students')
            .select('class_level, gender, religion')
            .eq('academic_year', currentYear)
            .in('graduation_status', ['ปกติ', 'กำลังศึกษา']);

          if (allStudents && allStudents.length > 0) {
            const counts: Record<string, number> = {};
            const genders: Record<string, number> = {};
            const religions: Record<string, number> = {};

            (allStudents as any[]).forEach((s: any) => {
              const lvl = s.class_level || 'ไม่ระบุชั้น';
              const g = s.gender || 'ไม่ระบุเพศ';
              const r = s.religion || 'ไม่ระบุศาสนา';

              counts[lvl] = (counts[lvl] || 0) + 1;
              genders[g] = (genders[g] || 0) + 1;
              religions[r] = (religions[r] || 0) + 1;
            });

            const sortedClasses = Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0], 'th'));
            const summaryStr = sortedClasses.map(([lvl, num]) => `- ${lvl}: ${num} คน`).join('\n');
            const genderStr = Object.entries(genders).map(([g, num]) => `- ${g}: ${num} คน`).join('\n');
            const religionStr = Object.entries(religions).map(([r, num]) => `- ${r}: ${num} คน`).join('\n');

            return `[สรุปสถิตินักเรียนปีการศึกษา ${currentYear} คำนวณจากระบบฐานข้อมูล]:
รวมนักเรียนปัจจุบันทั้งหมด: ${allStudents.length} คน

จำนวนนักเรียนแยกตามชั้นเรียน:
${summaryStr}

จำนวนนักเรียนแยกตามเพศ:
${genderStr}

จำนวนนักเรียนแยกตามศาสนา:
${religionStr}

ข้อมูลรายละเอียดดิบสำหรับคุณวิเคราะห์: ${JSON.stringify(allStudents)}`;
          }

          const { count } = await supabase.from('students').select('*', { count: 'exact', head: true }).eq('academic_year', currentYear).in('graduation_status', ['ปกติ', 'กำลังศึกษา']);
          return `จำนวนนักเรียนปัจจุบันทั้งหมดในปีการศึกษา ${currentYear}: ${count} คน`;
        }
      }
    },
    {
      keys: ['แผนการสอน', 'ส่งแผน', 'แผนสอน', 'ตรวจแผน'],
      fetch: async () => {
        const { data, error } = await supabase
          .from('lesson_plans')
          .select('title, subject_code, subject_name, class_level, term, status, academic_comments, director_comments, created_at, profiles(display_name)');

        if (error) {
          console.error('[LINE WEBHOOK] Error fetching lesson plans:', error);
          return `เกิดข้อผิดพลาดในการดึงข้อมูลแผนการสอนค่ะ`;
        }

        if (data && data.length > 0) {
          const listText = data.map((p: any, idx: number) => {
            const dateStr = p.created_at ? new Date(p.created_at).toLocaleDateString('th-TH') : '-';
            let statusText = '';
            if (p.status === 'Draft') statusText = 'แบบร่าง';
            else if (p.status === 'Pending_Academic') statusText = 'รอวิชาการตรวจ';
            else if (p.status === 'Rejected_by_Academic') statusText = 'วิชาการส่งแก้ไข';
            else if (p.status === 'Pending_Director') statusText = 'เสนอ ผอ. อนุมัติ';
            else if (p.status === 'Rejected_by_Director') statusText = 'ผอ. ส่งแก้ไข';
            else if (p.status === 'Approved') statusText = 'อนุมัติแล้ว 🟢';

            return `${idx + 1}. แผน: "${p.title}" (${p.subject_code} ${p.subject_name} ชั้น ${p.class_level})\n• ครูผู้สอน: ${p.profiles?.display_name || 'ไม่ระบุ'}\n• สถานะ: ${statusText} (ภาคเรียน: ${p.term})\n• ส่งเมื่อ: ${dateStr}`;
          }).join('\n\n');
          return `ข้อมูลสถานะการส่งแผนการสอนในระบบล่าสุด:\n\n${listText}`;
        }
        return `ยังไม่มีข้อมูลการส่งแผนการสอนในระบบสำหรับปีการศึกษานี้ค่ะ`;
      }
    }
  ];

  for (const rule of rules) {
    if (rule.keys.some(key => msg.includes(key))) {
      try {
        console.log(`[LINE WEBHOOK] Match rule for keys: ${rule.keys[0]}`);
        const result = await rule.fetch();
        if (result) return result; // หากคืนค่าว่าง ให้ผ่านไปตรวจกฎอื่น
      } catch (err) {
        console.error(`[LINE WEBHOOK] Error executing fetch for keys ${rule.keys}:`, err);
      }
    }
  }

  // Fallback: ค้นหาใน school_knowledge
  try {
    const { data: knowledge } = await supabase
      .from('school_knowledge')
      .select('document_name, chunk_text')
      .or(`chunk_text.ilike.%${msg}%,document_name.ilike.%${msg}%`)
      .limit(3);

    if (knowledge && knowledge.length > 0) {
      console.log(`[LINE WEBHOOK] Found ${knowledge.length} matches in school_knowledge`);
      return `ข้อมูลความรู้โรงเรียนที่ค้นพบ:\n` + knowledge.map((k: any) => `[ไฟล์: ${k.document_name}]: ${k.chunk_text}`).join('\n\n');
    }
  } catch (err) {
    console.error(`[LINE WEBHOOK] Error fetching school_knowledge:`, err);
  }

  return "";
}

async function handleReceiptOCR(replyToken: string, messageId: string, _profile: any) {
  try {
    await replyToLine(replyToken, "ชบากำลังดึงรูปภาพใบเสร็จของคุณครูและใช้ AI สแกนอ่านรายละเอียดให้อยู่นะคะ สักครู่เดียวค่ะ... 🌸⚡");

    const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    if (!token) throw new Error("LINE_CHANNEL_ACCESS_TOKEN not configured");


    const response = await fetch(`https://api-data.line.me/v2/bot/message/${messageId}/content`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error(`LINE image fetch returned HTTP ${response.status}`);

    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');


    const { data: sets } = await supabaseAdmin.from('settings').select('school_name, gemini_api_key').single();
    let apiKey = sets?.gemini_api_key || '';
    if (apiKey.includes(',')) {
      const keys = apiKey.split(',').map((k: string) => k.trim()).filter(Boolean);
      apiKey = keys[Math.floor(Math.random() * keys.length)] || '';
    }
    if (!apiKey) {
      await replyToLine(replyToken, "ระบบยังไม่ได้ตั้งค่า API Key ในโรงเรียนค่ะ รบกวนคุณครูตั้งค่า API Key ในหน้าตั้งค่าก่อนนะคะ 🌸");
      return;
    }

    // 3. เรียก Gemini Multimodal OCR
    const schoolName = sets?.school_name || 'โรงเรียน';
    const systemPrompt = `คุณคือ "น้องชบา" ผู้ช่วยฝ่ายพัสดุและงบประมาณ${schoolName}
ภารกิจ: วิเคราะห์สแกนรูปภาพใบเสร็จ/บิลค่าใช้จ่ายนี้ และสรุปผลออกมาในรูปแบบราชการที่เข้าใจง่าย
กฎเหล็ก:
- ตอบข้อมูลสกัดออกมาให้ชัดเจนดังนี้:
  1. ชื่อร้านค้า / ผู้ขาย
  2. วันที่ในใบเสร็จ
  3. รายการสินค้าพัสดุ (ระบุเป็นหัวข้อย่อย: ชื่อสินค้า, จำนวน, หน่วย, ราคาต่อหน่วย, ราคารวม)
  4. ยอดเงินรวมทั้งสิ้น (บาท)
- ให้คำแนะนำท้ายข้อความว่า "คุณครูสามารถนำข้อมูลที่ชบาสแกนนี้ไปกดเพิ่มรายการจัดซื้อจัดจ้างใหม่ในหน้าระบบพัสดุได้ทันทีเลยนะคะ 🌸"
- ห้ามใช้คำพูดไม่สุภาพ และตอบอย่างนอบน้อมค่ะ/นะคะ เท่านั้น`;

    const userPrompt = "ชบาส่งรูปใบเสร็จให้ค่ะ รบกวนสแกนอ่านให้ชบาหน่อยนะคะ";
    const ocrResult = await callGeminiMultimodal(systemPrompt, userPrompt, base64Image, 'image/jpeg', apiKey);

    if (ocrResult) {
      await replyToLine(replyToken, ocrResult);
    } else {
      await replyToLine(replyToken, "ขออภัยนะคะชบาไม่สามารถวิเคราะห์ข้อมูลจากภาพใบเสร็จนี้ได้ค่ะ รบกวนคุณครูช่วยตรวจสอบความคมชัดและส่งเข้ามาใหม่อีกครั้งนะคะ 🙏🌸");
    }
  } catch (err: any) {
    console.error("[LINE OCR ERROR]", err);
    await replyToLine(replyToken, `เกิดข้อผิดพลาดในการสแกนสกัดใบเสร็จค่ะ: ${err.message}`);
  }
}

async function callGeminiMultimodal(system: string, user: string, base64Data: string, mimeType: string, apiKey: string): Promise<string> {
  const models = ["gemini-2.5-flash", "gemini-2.0-flash"];
  for (const model of models) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents: [{
            role: 'user',
            parts: [
              { inlineData: { mimeType, data: base64Data } },
              { text: user }
            ]
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 2048
          }
        })
      });
      if (res.ok) {
        const data = await res.json() as any;
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (e) {
      console.error(`[LINE MULTIMODAL ERROR] ${model}:`, e);
    }
  }
  return "";
}

// ====================================================================
// NEW HELPER FUNCTIONS FOR INTERACTIVE LINE BOT
// ====================================================================

async function replyToLineFlex(replyToken: string, altText: string, contents: any) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token || !contents) return;
  try {
    await fetch('https://api.line.me/v2/bot/message/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        replyToken,
        messages: [{ type: 'flex', altText: altText.substring(0, 400), contents }]
      })
    });
  } catch (err) { console.error('Reply Flex error:', err); }
}

async function replyToLineQuickReply(replyToken: string, text: string, items: any[]) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token || !text) return;
  try {
    await fetch('https://api.line.me/v2/bot/message/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        replyToken,
        messages: [{
          type: 'text',
          text: text.substring(0, 5000),
          quickReply: { items }
        }]
      })
    });
  } catch (err) { console.error('Reply QuickReply error:', err); }
}

async function pushToLine(toId: string | undefined, text: string) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return;

  let target = toId;
  if (!target) {
    try {
      const { data: settings } = await supabaseAdmin
        .from('settings')
        .select('line_group_id')
        .single();
      target = settings?.line_group_id || process.env.LINE_GROUP_ID || '';
    } catch (e) {
      target = process.env.LINE_GROUP_ID || '';
    }
  }

  if (!target || !text) return;
  try {
    await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        to: target,
        messages: [{ type: 'text', text: text.substring(0, 5000) }]
      })
    });
  } catch (err) { console.error('Push text error:', err); }
}

async function pushToLineFlex(toId: string | undefined, altText: string, contents: any) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return;

  let target = toId;
  if (!target) {
    try {
      const { data: settings } = await supabaseAdmin
        .from('settings')
        .select('line_group_id')
        .single();
      target = settings?.line_group_id || process.env.LINE_GROUP_ID || '';
    } catch (e) {
      target = process.env.LINE_GROUP_ID || '';
    }
  }

  if (!target || !contents) return;
  try {
    await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        to: target,
        messages: [{ type: 'flex', altText: altText.substring(0, 400), contents }]
      })
    });
  } catch (err) { console.error('Push Flex error:', err); }
}

// --------------------------------------------------------------------
// PDF Stamping function on Serverless Environment
// --------------------------------------------------------------------

function wrapThaiText(text: string, maxWidth: number, font: any, fontSize: number) {
  if (!text) return [];
  const segments = text.split(/(\s+)/);
  const lines = [];
  let currentLine = '';

  for (const segment of segments) {
    const testLine = currentLine + segment;
    const lineWidth = font.widthOfTextAtSize(testLine, fontSize);
    if (lineWidth > maxWidth && currentLine !== '') {
      lines.push(currentLine);
      currentLine = segment;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

export async function applyStampsOnServer(
  pdfBuffer: ArrayBuffer,
  directorData: {
    order: string;
    signer: string;
    date: string;
    position?: string;
    signatureUrl?: string;
    pageNumber?: number;
  }
) {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    pdfDoc.registerFontkit(fontkit);

    let fontBytes: ArrayBuffer;
    try {
      const fontB64Path = path.join(process.cwd(), 'font.b64');
      const localFontPath = path.join(process.cwd(), 'public', 'fonts', 'THSarabunNew.ttf');
      const localDistFontPath = path.join(process.cwd(), 'dist', 'fonts', 'THSarabunNew.ttf');
      const rootFontPath = path.join(process.cwd(), 'THSarabunNew.ttf');

      if (fs.existsSync(localFontPath)) {
        console.log('Loading font from localFontPath:', localFontPath);
        const buffer = fs.readFileSync(localFontPath);
        fontBytes = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      } else if (fs.existsSync(localDistFontPath)) {
        console.log('Loading font from localDistFontPath:', localDistFontPath);
        const buffer = fs.readFileSync(localDistFontPath);
        fontBytes = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      } else if (fs.existsSync(fontB64Path)) {
        console.log('Loading font from fontB64Path:', fontB64Path);
        const b64Str = fs.readFileSync(fontB64Path, 'utf-8');
        fontBytes = Buffer.from(b64Str.trim(), 'base64');
      } else if (fs.existsSync(rootFontPath)) {
        console.log('Loading font from rootFontPath:', rootFontPath);
        const buffer = fs.readFileSync(rootFontPath);
        fontBytes = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      } else {
        console.log('No local font found. Fetching from remote network...');
        const res = await fetch('https://school-admin-psi.vercel.app/fonts/THSarabunNew.ttf');
        if (!res.ok) {
          throw new Error(`Failed to fetch remote font: status ${res.status}`);
        }
        fontBytes = await res.arrayBuffer();
      }
    } catch (err) {
      console.error('Error loading local/preferred font, falling back to remote network fetch:', err);
      const res = await fetch('https://school-admin-psi.vercel.app/fonts/THSarabunNew.ttf');
      if (!res.ok) {
        throw new Error(`Remote network backup fetch failed: status ${res.status}`);
      }
      fontBytes = await res.arrayBuffer();
    }

    const customFont = await pdfDoc.embedFont(fontBytes);
    const pages = pdfDoc.getPages();
    const pageCount = pages.length;

    // หาหน้าที่จะประทับตรา
    const requestedPage = directorData.pageNumber || 1;
    const pageIndex = Math.min(Math.max(requestedPage - 1, 0), pageCount - 1);
    const targetPage = pages[pageIndex];

    const { width } = targetPage.getSize();
    const stampColor = rgb(0.1, 0.2, 0.7);
    const fontSize = 15;
    const receiptBoxWidth = 140;
    const rightMargin = 30;
    const startX = width - receiptBoxWidth - rightMargin;
    const effectiveWidth = receiptBoxWidth;
    const dirY = 140;

    targetPage.drawText(`คำสั่ง / การปฏิบัติ`, {
      x: startX,
      y: dirY + 115,
      size: fontSize + 1,
      font: customFont,
      color: stampColor,
    });

    const orderLines = wrapThaiText(directorData.order, effectiveWidth, customFont, fontSize);
    let dCurrentY = dirY + 98;
    for (const line of orderLines) {
      targetPage.drawText(line, { x: startX, y: dCurrentY, size: fontSize, font: customFont, color: stampColor });
      dCurrentY -= 18;
    }

    const dirSignerY = dCurrentY - 35;

    // ฝังลายเซ็น (ถ้ามี)
    if (directorData.signatureUrl) {
      try {
        const sigRes = await fetch(directorData.signatureUrl);
        if (sigRes.ok) {
          const sigBytes = await sigRes.arrayBuffer();
          const isPng = directorData.signatureUrl.toLowerCase().includes('.png') || directorData.signatureUrl.toLowerCase().includes('image/png');
          const sigImage = isPng ? await pdfDoc.embedPng(sigBytes) : await pdfDoc.embedJpg(sigBytes);
          const sigDims = sigImage.scale(0.50);
          targetPage.drawImage(sigImage, {
            x: startX + 60,
            y: dirSignerY + 10,
            width: sigDims.width,
            height: sigDims.height,
          });
        }
      } catch (imgErr) { console.error('Server PDF Signature image embed error:', imgErr); }
    }

    targetPage.drawText(`(ลงชื่อ) ........................................`, { x: startX - 10, y: dirSignerY, size: fontSize, font: customFont, color: stampColor });
    targetPage.drawText(`(${directorData.signer})`, { x: startX + 15, y: dirSignerY - 17, size: fontSize, font: customFont, color: stampColor });

    if (directorData.position) {
      targetPage.drawText(`${directorData.position}`, { x: startX - 5, y: dirSignerY - 34, size: fontSize, font: customFont, color: stampColor });
    }

    // แปลงวันที่ไทยแบบย่อ
    const dateObj = new Date(directorData.date);
    const thDay = dateObj.getDate();
    const thMonthAbbr = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."][dateObj.getMonth()];
    const thYear = dateObj.getFullYear() + 543;
    const thDateStr = `${thDay}/${thMonthAbbr}/${thYear}`;

    // แปลงเป็นเลขไทย
    const thNumerals = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];
    const thaiFormattedDate = thDateStr.replace(/[0-9]/g, (digit) => thNumerals[parseInt(digit)]);

    targetPage.drawText(`วันที่: ${thaiFormattedDate}`, {
      x: startX + 20,
      y: dirSignerY - (directorData.position ? 51 : 34),
      size: fontSize,
      font: customFont,
      color: stampColor,
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (err: any) {
    console.error('applyStampsOnServer error:', err);
    throw err;
  }
}

// --------------------------------------------------------------------
// Core interactive tasks execution
// --------------------------------------------------------------------

async function executeDocAssignment(docId: string, teacherId: string, instruction: string, replyToken: string, profile: any) {
  try {
    // 1. ดึงข้อมูลหนังสือรับ
    const { data: doc } = await supabaseAdmin
      .from('incoming_docs')
      .select('*')
      .eq('id', docId)
      .single();

    if (!doc) {
      await replyToLine(replyToken, '❌ ไม่พบข้อมูลหนังสือรับชิ้นนี้ในระบบค่ะ');
      return;
    }

    // ดึงข้อมูลครู
    const { data: teacher } = await supabaseAdmin
      .from('teachers')
      .select('*')
      .eq('id', teacherId)
      .single();

    if (!teacher) {
      await replyToLine(replyToken, '❌ ไม่พบข้อมูลคุณครูในระบบค่ะ');
      return;
    }

    // ดึงค่าหน้าประทับตราเดิม จาก JSON remark
    let proposalStampPage = 1;
    if (doc.remark) {
      try {
        const extra = typeof doc.remark === 'object' ? doc.remark : JSON.parse(doc.remark);
        if (extra && extra.stamp_page) {
          proposalStampPage = parseInt(extra.stamp_page) || 1;
        }
      } catch (e) { console.warn('Failed to parse doc.remark JSON:', e); }
    }

    // 2. ดึงข้อมูล ผอ. และโรงเรียน จาก Settings สำหรับประทับตรา
    const { data: settings } = await supabaseAdmin
      .from('settings')
      .select('school_name, director_name, director_signature_url')
      .single();

    const schoolLabel = settings?.school_name
      ? (settings.school_name.startsWith('โรงเรียน') ? settings.school_name : `โรงเรียน${settings.school_name}`)
      : '';
    const directorPosition = schoolLabel ? `ผู้อำนวยการ${schoolLabel}` : 'ผู้อำนวยการโรงเรียน';

    // 3. เริ่มดำเนินการประทับตรา PDF บน server (ถ้าเป็นไฟล์ PDF และอยู่บน Supabase)
    let finalFileUrl = doc.file_url;
    if (doc.file_url && doc.file_url.includes('supabase.co') && doc.file_url.toLowerCase().includes('.pdf')) {
      try {
        const fileRes = await fetch(doc.file_url);
        if (fileRes.ok) {
          const pdfBuffer = await fileRes.arrayBuffer();
          const stampedBytes = await applyStampsOnServer(pdfBuffer, {
            order: instruction,
            signer: settings?.director_name || profile.display_name || 'ผู้อำนวยการโรงเรียน',
            position: directorPosition,
            date: new Date().toISOString().split('T')[0],
            signatureUrl: settings?.director_signature_url || profile.signature_url,
            pageNumber: proposalStampPage // ประทับตราหน้าเดียวกับใบเสนอ
          });

          // อัปโหลดไฟล์ประทับตราทับไปที่ Supabase Storage ก่อนเพื่อสำรองข้อมูลชั่วคราว
          const pathSegments = doc.file_url.split('/');
          const fileName = pathSegments[pathSegments.length - 1].split('?')[0];

          await supabaseAdmin
            .storage
            .from('temp_docs')
            .upload(fileName, stampedBytes, { contentType: 'application/pdf', upsert: true });

          // ดึง publicUrl จาก Supabase ไว้ก่อน (เป็น Fallback กรณี Google Drive อัปโหลดไม่ผ่าน)
          const { data: publicData } = supabaseAdmin
            .storage
            .from('temp_docs')
            .getPublicUrl(fileName);

          if (publicData?.publicUrl) {
            finalFileUrl = `${publicData.publicUrl}?t=${Date.now()}`;
          }

          // ดำเนินการอัปโหลดขึ้น Google Drive ผ่าน Google Apps Script (GAS)
          const gasUrl = process.env.VITE_GAS_URL || 'https://script.google.com/macros/s/AKfycbw52uo8upPX6SiZ_W4dD9MUrocA3DkZm3XnE-eU4uE3vvOtOAK4VhXcLIf71PGVsvxj/exec';
          const base64 = Buffer.from(stampedBytes).toString('base64');
          const sanitizedSubject = doc.subject.replace(/[\/\\?%*:|"<>]/g, '-').slice(0, 50);
          const finalFileName = `${doc.doc_number}_เรื่อง_${sanitizedSubject}.pdf`;

          console.log(`[LINE WEBHOOK] Uploading stamped PDF to Google Drive via GAS: ${gasUrl}`);
          try {
            const driveRes = await fetch(gasUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                folder: 'incoming',
                filename: finalFileName,
                mimeType: 'application/pdf',
                base64: base64
              })
            });

            if (driveRes.ok) {
              const driveResult = (await driveRes.json()) as any;
              if (driveResult.status === 'success' && driveResult.url) {
                finalFileUrl = driveResult.url;
                console.log('Successfully uploaded to Google Drive from Webhook:', finalFileUrl);


                try {
                  await supabaseAdmin.storage.from('temp_docs').remove([fileName]);
                  console.log('Cleaned up temporary Supabase file:', fileName);
                } catch (cleanupErr) {
                  console.warn('Failed to clean up temporary Supabase file:', cleanupErr);
                }
              } else {
                console.error('GAS Upload failed on script side:', driveResult.message);
              }
            } else {
              console.error('GAS Upload returned HTTP error status:', driveRes.status);
            }
          } catch (driveErr) {
            console.error('Failed to communicate with GAS for Google Drive upload:', driveErr);
          }
        }
      } catch (pdfErr) {
        console.error('Server PDF Stamping failed:', pdfErr);

      }
    }


    await supabaseAdmin
      .from('incoming_docs')
      .update({
        status: 'assigned',
        file_url: finalFileUrl
      })
      .eq('id', docId);


    const { data: insertedAssigns, error: assignErr } = await supabaseAdmin
      .from('doc_assignments')
      .insert([{
        doc_id: docId,
        assignee_id: teacherId,
        instruction: instruction,
        status: 'pending'
      }])
      .select();

    if (assignErr) throw assignErr;
    const assignment = insertedAssigns?.[0];


    await supabaseAdmin
      .from('line_action_states')
      .delete()
      .eq('user_id', profile.line_user_id);


    const teacherName = `${teacher.prefix || ''}${teacher.first_name} ${teacher.last_name}`;
    await replyToLine(replyToken, `✅ ทำการเกษียณสั่งการหนังสือเรื่อง "${doc.subject}" และมอบหมายงานให้คุณครู ${teacherName} เรียบร้อยแล้วค่ะ 🌸`);

    const personalMsg = `เรื่อง: ${doc.subject}\nเลขที่หนังสือ: ${doc.doc_number}\nคำสั่งการ: ${instruction}`;
    const lineActions = [
      { label: '📄 ดูเอกสารสั่งการ', type: 'uri' as const, uri: finalFileUrl },
      { label: '✅ รับทราบงาน', type: 'postback' as const, data: `action=acknowledge&id=${assignment?.id || ''}`, color: '#007AFF' }
    ];
    if (Array.isArray(doc.attachment_urls)) {
      doc.attachment_urls.forEach((url: string, i: number) => {
        if (lineActions.length < 10) {
          lineActions.push({ label: `📎 แนบ ${i + 1}`, type: 'uri' as const, uri: url });
        }
      });
    }


    const validLineActions = lineActions.filter(act => {
      if (act.type === 'uri' && !act.uri) return false;
      if (act.type === 'postback' && !act.data) return false;
      return true;
    });

    if (teacher.line_user_id) {
      await pushToLineFlex(teacher.line_user_id, '📌 มีงานมอบหมายถึงคุณครู', {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            { type: "text", text: "📌 คุณครูมีงานมอบหมายใหม่", weight: "bold", color: "#007AFF", size: "sm" },
            { type: "text", text: personalMsg, margin: "md", wrap: true, weight: "bold", size: "md" }
          ]
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: validLineActions.map(act => ({
            type: "button",
            style: "primary",
            height: "sm",
            color: act.color || "#1DB446",
            action: act.type === 'uri' ? { type: "uri", label: act.label, uri: act.uri } : { type: "postback", label: act.label, data: act.data }
          }))
        }
      });
    } else {

      const groupMsg = `ถึง: ${teacherName}\nเรื่อง: ${doc.subject}\nเลขที่หนังสือ: ${doc.doc_number}\nคำสั่งการ: ${instruction}`;
      await pushToLineFlex(undefined, '📢 มอบหมายงานใหม่', {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            { type: "text", text: "📢 มอบหมายงานใหม่", weight: "bold", color: "#E91E63", size: "sm" },
            { type: "text", text: groupMsg, margin: "md", wrap: true, weight: "bold", size: "md" }
          ]
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: validLineActions.map(act => ({
            type: "button",
            style: "primary",
            height: "sm",
            color: act.color || "#1DB446",
            action: act.type === 'uri' ? { type: "uri", label: act.label, uri: act.uri } : { type: "postback", label: act.label, data: act.data }
          }))
        }
      });
    }
  } catch (err: any) {
    console.error('executeDocAssignment error:', err);
    await replyToLine(replyToken, `❌ ดำเนินการไม่สำเร็จ: ${err.message}`);
  }
}





async function handleApproveDoc(event: any, params: URLSearchParams, profile: any) {
  const type = params.get('type') || 'outgoing';
  const id = params.get('id');
  const replyToken = event.replyToken;

  if (profile.role !== 'director' && profile.role !== 'admin') {
    await replyToLine(replyToken, '❌ ขออภัยค่ะ ปุ่มนี้สำหรับผู้อำนวยการดำเนินการเท่านั้นนะคะ 🌸');
    return;
  }

  try {
    let tableName = '';
    let numberColumn = '';
    let nameString = '';

    if (type === 'outgoing') { tableName = 'outgoing_docs'; numberColumn = 'doc_number'; nameString = 'หนังสือส่ง'; }
    else if (type === 'memo') { tableName = 'memos'; numberColumn = 'memo_number'; nameString = 'บันทึกข้อความ'; }
    else if (type === 'order') { tableName = 'orders'; numberColumn = 'order_number'; nameString = 'คำสั่งแต่งตั้ง'; }
    else {
      await replyToLine(replyToken, '❌ ประเภทเอกสารไม่ถูกต้องค่ะ');
      return;
    }


    const { data: doc } = await supabaseAdmin
      .from(tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (!doc) {
      await replyToLine(replyToken, `❌ ไม่พบข้อมูล${nameString}ในระบบค่ะ`);
      return;
    }

    let finalNumber = doc[numberColumn];
    let docYear = doc.doc_year;
    let docSeq = doc.doc_sequence;


    if (type === 'order' && (finalNumber === 'รออนุมัติ' || !finalNumber)) {
      const orderDateObj = new Date(doc.order_date || new Date());
      docYear = orderDateObj.getFullYear() + 543;

      const { data: seqDocs } = await supabaseAdmin
        .from('orders')
        .select('doc_sequence')
        .eq('doc_year', docYear)
        .order('doc_sequence', { ascending: false })
        .limit(1);

      docSeq = (seqDocs && seqDocs.length > 0) ? (seqDocs[0].doc_sequence + 1) : 1;
      finalNumber = `${docSeq}/${docYear}`;
    }


    const updateObj: any = { status: 'approved' };
    if (type === 'order') {
      updateObj.order_number = finalNumber;
      updateObj.doc_year = docYear;
      updateObj.doc_sequence = docSeq;
    }

    const { error: updateErr } = await supabaseAdmin
      .from(tableName)
      .update(updateObj)
      .eq('id', id);

    if (updateErr) throw updateErr;


    await replyToLine(replyToken, `✅ ทำการอนุมัติและลงนามอิเล็กทรอนิกส์ใน${nameString}เรื่อง "${doc.subject}" เรียบร้อยแล้วค่ะ 🌸`);


    if (doc.created_by) {
      const { data: creator } = await supabaseAdmin
        .from('profiles')
        .select('line_user_id')
        .eq('id', doc.created_by)
        .maybeSingle();

      if (creator?.line_user_id) {
        await pushToLine(creator.line_user_id, `✅ ยินดีด้วยค่ะ! ผู้อำนวยการได้อนุมัติและลงนามใน${nameString}เรื่อง "${doc.subject}" ของคุณครูเรียบร้อยแล้วนะคะ 🌸`);
      }
    }
  } catch (err: any) {
    console.error('handleApproveDoc error:', err);
    await replyToLine(replyToken, `❌ เกิดข้อผิดพลาดในการอนุมัติ: ${err.message}`);
  }
}

async function handleRejectDoc(event: any, params: URLSearchParams, profile: any) {
  const type = params.get('type') || 'outgoing';
  const id = params.get('id');
  const replyToken = event.replyToken;

  if (profile.role !== 'director' && profile.role !== 'admin') {
    await replyToLine(replyToken, '❌ ขออภัยค่ะ ปุ่มนี้สำหรับผู้อำนวยการดำเนินการเท่านั้นนะคะ 🌸');
    return;
  }

  try {

    await supabaseAdmin
      .from('line_action_states')
      .insert([{
        user_id: profile.line_user_id,
        action: 'awaiting_reject_reason',
        context: { type, id }
      }]);

    await replyToLine(replyToken, '💬 กรุณาพิมพ์เหตุผลการส่งกลับ หรือจุดแก้ไขส่งเข้ามาในแชทนี้ เพื่อแจ้งแก่ผู้ร่างคำเสนอได้เลยค่ะ 🌸');
  } catch (err: any) {
    console.error('handleRejectDoc error:', err);
    await replyToLine(replyToken, `❌ ไม่สามารถทำรายการได้: ${err.message}`);
  }
}

async function handleStartAssign(event: any, params: URLSearchParams, profile: any) {
  const docId = params.get('id');
  const replyToken = event.replyToken;

  if (profile.role !== 'director' && profile.role !== 'admin') {
    await replyToLine(replyToken, '❌ ขออภัยค่ะ ปุ่มนี้สำหรับผู้อำนวยการดำเนินการเท่านั้นนะคะ 🌸');
    return;
  }

  try {
    const { data: doc } = await supabaseAdmin
      .from('incoming_docs')
      .select('subject')
      .eq('id', docId)
      .single();

    if (!doc) {
      await replyToLine(replyToken, '❌ ไม่พบข้อมูลหนังสือรับชิ้นนี้ค่ะ');
      return;
    }


    const { data: teachers } = await supabaseAdmin
      .from('teachers')
      .select('*')
      .eq('status', 'active')
      .order('first_name');

    if (!teachers || teachers.length === 0) {
      await replyToLine(replyToken, '❌ ไม่พบรายชื่อคุณครูในระบบสำหรับมอบหมายงานค่ะ');
      return;
    }


    const quickReplyItems = teachers.slice(0, 13).map(teacher => {
      const name = `${teacher.first_name} ${teacher.last_name.substring(0, 5)}`;
      return {
        type: 'action',
        action: {
          type: 'postback',
          label: `${teacher.prefix || ''}${name}`,
          data: `action=assign&doc_id=${docId}&teacher_id=${teacher.id}`,
          displayText: `เลือกมอบหมาย: ${teacher.prefix || ''}${teacher.first_name} ${teacher.last_name}`
        }
      };
    });

    await replyToLineQuickReply(
      replyToken,
      `🧑‍🏫 กรุณาเลือกคุณครูผู้รับมอบงานสำหรับเอกสารเรื่อง "${doc.subject}" ด้านล่างนี้ค่ะ:`,
      quickReplyItems
    );

  } catch (err: any) {
    console.error('handleStartAssign error:', err);
    await replyToLine(replyToken, `❌ ดำเนินการไม่สำเร็จ: ${err.message}`);
  }
}

async function handleAssignTeacher(event: any, params: URLSearchParams, profile: any) {
  const docId = params.get('doc_id');
  const teacherId = params.get('teacher_id');
  const replyToken = event.replyToken;

  if (profile.role !== 'director' && profile.role !== 'admin') {
    await replyToLine(replyToken, '❌ ไม่มีสิทธิ์ดำเนินการค่ะ');
    return;
  }


  const docIdStr = docId || '';
  const teacherIdStr = teacherId || '';
  const options = ['มอบดำเนินการ', 'ทราบ/ถือปฏิบัติ', 'ประสานงานต่อ', 'พิมพ์ระบุคำสั่งการเอง'];

  const quickReplyItems = options.map(opt => {
    if (opt === 'พิมพ์ระบุคำสั่งการเอง') {
      return {
        type: 'action',
        action: {
          type: 'postback',
          label: opt,
          data: `action=confirm_assign&doc_id=${docIdStr}&teacher_id=${teacherIdStr}&instruction=manual`,
          displayText: opt
        }
      };
    } else {
      return {
        type: 'action',
        action: {
          type: 'postback',
          label: opt,
          data: `action=confirm_assign&doc_id=${docIdStr}&teacher_id=${teacherIdStr}&instruction=${opt}`,
          displayText: `สั่งการ: ${opt}`
        }
      };
    }
  });

  await replyToLineQuickReply(
    replyToken,
    '✍️ เลือกคำสั่งการเกษียณสั่งการหนังสือ หรือเลือกพิมพ์แบบเจาะจงเองด้านล่างค่ะ:',
    quickReplyItems
  );
}

async function handleConfirmAssign(event: any, params: URLSearchParams, profile: any) {
  const docId = params.get('doc_id') || '';
  const teacherId = params.get('teacher_id') || '';
  const instruction = params.get('instruction') || 'มอบดำเนินการ';
  const replyToken = event.replyToken;

  if (profile.role !== 'director' && profile.role !== 'admin') {
    await replyToLine(replyToken, '❌ ไม่มีสิทธิ์ดำเนินการค่ะ');
    return;
  }

  if (instruction === 'manual') {

    await supabaseAdmin
      .from('line_action_states')
      .insert([{
        user_id: profile.line_user_id,
        action: 'awaiting_assign_instruction',
        context: { doc_id: docId, teacher_id: teacherId }
      }]);
    await replyToLine(replyToken, '💬 กรุณาพิมพ์ข้อความคำสั่งการของคุณครูส่งเข้ามาในแชทนี้ได้เลยค่ะ 🌸');
  } else {

    await executeDocAssignment(docId, teacherId, instruction, replyToken, profile);
  }
}

async function handleAcknowledge(event: any, params: URLSearchParams, profile: any) {
  const assignmentId = params.get('id');
  const replyToken = event.replyToken;

  try {
    const { data: assignment } = await supabaseAdmin
      .from('doc_assignments')
      .select('*, incoming_docs(subject)')
      .eq('id', assignmentId)
      .single();

    if (!assignment) {
      await replyToLine(replyToken, '❌ ไม่พบข้อมูลการมอบหมายงานนี้ในระบบค่ะ');
      return;
    }


    const { data: teacher } = await supabaseAdmin
      .from('teachers')
      .select('id')
      .eq('line_user_id', profile.line_user_id)
      .maybeSingle();

    if (!teacher || teacher.id !== assignment.assignee_id) {
      await replyToLine(replyToken, '❌ ขออภัยค่ะ งานชิ้นนี้มอบหมายให้คุณครูท่านอื่นรับผิดชอบค่ะ 🌸');
      return;
    }


    await supabaseAdmin
      .from('doc_assignments')
      .update({ status: 'acknowledged' })
      .eq('id', assignmentId);

    const docSubject = assignment.incoming_docs?.subject || 'หนังสือสั่งการ';
    await replyToLine(replyToken, `✅ รับทราบงานเรื่อง "${docSubject}" เรียบร้อยแล้วค่ะ ขอให้การทำงานเป็นไปได้ด้วยดีนะคะคุณครู 🌸✨`);


    await pushToLine(undefined, `👍 คุณครู ${profile.display_name} กดรับทราบงานเรื่อง "${docSubject}" เรียบร้อยแล้วค่ะ 🌸`);


    const { data: director } = await supabaseAdmin
      .from('profiles')
      .select('line_user_id')
      .eq('role', 'director')
      .maybeSingle();

    if (director?.line_user_id) {
      await pushToLine(director.line_user_id, `👍 คุณครู ${profile.display_name} กดรับทราบงานเรื่อง "${docSubject}" แล้วค่ะ`);
    }
  } catch (err: any) {
    console.error('handleAcknowledge error:', err);
    await replyToLine(replyToken, `❌ ดำเนินการไม่สำเร็จ: ${err.message}`);
  }
}

async function handleListPending(event: any, params: URLSearchParams, profile: any) {
  const replyToken = event.replyToken;

  try {

    const { data: teacher } = await supabaseAdmin
      .from('teachers')
      .select('id')
      .eq('line_user_id', profile.line_user_id)
      .maybeSingle();

    if (!teacher) {
      await replyToLine(replyToken, '❌ ไม่พบคุณครูในตารางระบบครูหลักค่ะ กรุณาผูกข้อมูลหรือแจ้งธุรการก่อนนะคะ');
      return;
    }


    const { data: pendingAssigns } = await supabaseAdmin
      .from('doc_assignments')
      .select('*, incoming_docs(subject, doc_number)')
      .eq('assignee_id', teacher.id)
      .eq('status', 'acknowledged')
      .order('created_at', { ascending: false });

    if (!pendingAssigns || pendingAssigns.length === 0) {
      await replyToLine(replyToken, '🎉 ยินดีด้วยค่ะ! ตอนนี้คุณครูไม่มีงานราชการรอรายงานผลค้างอยู่เลยนะคะ 🌸');
      return;
    }


    const flexContents = {
      type: "carousel",
      contents: pendingAssigns.slice(0, 10).map(assign => ({
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            { type: "text", text: "📊 งานราชการที่ได้รับมอบหมาย", weight: "bold", color: "#9C27B0", size: "xs" },
            { type: "text", text: assign.incoming_docs?.subject || 'ไม่มีหัวเรื่อง', weight: "bold", size: "sm", wrap: true, margin: "md", color: "#333333" },
            { type: "text", text: `เลขหนังสือ: ${assign.incoming_docs?.doc_number || '-'}`, size: "xs", color: "#777777", margin: "xs" },
            { type: "text", text: `คำสั่งการ: ${assign.instruction || '-'}`, size: "xs", color: "#ff8c00", margin: "xs", weight: "bold" }
          ]
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              style: "primary",
              height: "sm",
              color: "#9C27B0",
              action: {
                type: "postback",
                label: "📝 รายงานผลงานชิ้นนี้",
                data: `action=report&id=${assign.id}`
              }
            }
          ]
        }
      }))
    };

    await replyToLineFlex(replyToken, '📊 รายการงานค้างสารบรรณ', flexContents);
  } catch (err: any) {
    console.error('handleListPending error:', err);
    await replyToLine(replyToken, `❌ ดึงรายการงานค้างไม่สำเร็จ: ${err.message}`);
  }
}

async function handleListPendingDocs(event: any, profile: any) {
  const replyToken = event.replyToken;
  if (profile.role !== 'director' && profile.role !== 'admin') {
    await replyToLine(replyToken, '❌ ขออภัยค่ะ เมนูนี้สำหรับผู้อำนวยการเช็คหนังสือรอเกษียณเท่านั้นนะคะ 🌸');
    return;
  }

  try {
    const { data: pendingDocs } = await supabaseAdmin
      .from('incoming_docs')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(10);

    if (!pendingDocs || pendingDocs.length === 0) {
      await replyToLine(replyToken, '🎉 ยินดีด้วยค่ะ! ไม่มีหนังสือราชการรอผู้อำนวยการเกษียณค้างอยู่เลยนะคะ 🌸');
      return;
    }

    const flexContents = {
      type: "carousel",
      contents: pendingDocs.map((doc, index) => {
        let documentUrl = doc.file_url || 'https://google.com';
        return {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              { type: "text", text: `📥 หนังสือรับรอเกษียณ (${index + 1}/${pendingDocs.length})`, weight: "bold", color: "#9C27B0", size: "xs" },
              { type: "text", text: doc.subject || 'ไม่มีหัวเรื่อง', weight: "bold", size: "sm", wrap: true, margin: "md", color: "#333333" },
              { type: "text", text: `จาก: ${doc.from_agency || '-'}`, size: "xs", color: "#777777", margin: "xs", wrap: true },
              { type: "text", text: `เลขรับ: ${doc.doc_number || '-'}`, size: "xs", color: "#777777", margin: "xs" }
            ]
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              {
                type: "button",
                style: "primary",
                height: "sm",
                color: "#007AFF",
                action: {
                  type: "uri",
                  label: "📄 ดูต้นฉบับหนังสือ",
                  uri: documentUrl
                }
              },
              {
                type: "button",
                style: "primary",
                height: "sm",
                color: "#1DB446",
                action: {
                  type: "postback",
                  label: "✍️ เกษียณสั่งการ",
                  data: `action=start_assign&id=${doc.id}`
                }
              }
            ]
          }
        };
      })
    };

    await replyToLineFlex(replyToken, '📥 รายการหนังสือรอเกษียณ', flexContents);
  } catch (err: any) {
    console.error('handleListPendingDocs error:', err);
    await replyToLine(replyToken, `❌ ดึงรายการหนังสือรอเกษียณไม่สำเร็จ: ${err.message}`);
  }
}

async function handleReport(event: any, params: URLSearchParams, profile: any) {

  const assignmentId = params.get('id');
  const replyToken = event.replyToken;

  try {
    const { data: assignment } = await supabaseAdmin
      .from('doc_assignments')
      .select('*, incoming_docs(subject)')
      .eq('id', assignmentId)
      .single();

    if (!assignment) {
      await replyToLine(replyToken, '❌ ไม่พบข้อมูลการมอบหมายงานในระบบค่ะ');
      return;
    }


    await supabaseAdmin
      .from('line_action_states')
      .insert([{
        user_id: profile.line_user_id,
        action: 'awaiting_report_text',
        context: { assignment_id: assignmentId }
      }]);

    await replyToLine(replyToken, `✍️ กรุณาพิมพ์รายงานสรุปผลการดำเนินงานสำหรับเรื่อง "${assignment.incoming_docs?.subject}" ส่งเข้ามาในห้องแชทได้เลยค่ะ ชบาจะนำไปบันทึกรายงานเสนอเสนอ ผอ. ทันที 🌸`);
  } catch (err: any) {
    console.error('handleReport error:', err);
    await replyToLine(replyToken, `❌ ไม่สามารถเริ่มรายงานผลได้: ${err.message}`);
  }
}

async function handleClose(event: any, params: URLSearchParams, profile: any) {
  const assignmentId = params.get('id');
  const replyToken = event.replyToken;

  if (profile.role !== 'director' && profile.role !== 'admin') {
    await replyToLine(replyToken, '❌ สิทธิ์การปิดงานเป็นของผู้อำนวยการเท่านั้นค่ะ 🌸');
    return;
  }

  try {
    const { data: assignment } = await supabaseAdmin
      .from('doc_assignments')
      .select('*, incoming_docs(subject), assignee_id')
      .eq('id', assignmentId)
      .single();

    if (!assignment) {
      await replyToLine(replyToken, '❌ ไม่พบชิ้นงานในระบบค่ะ');
      return;
    }


    await supabaseAdmin
      .from('doc_assignments')
      .update({ status: 'closed', closed_at: new Date().toISOString() })
      .eq('id', assignmentId);

    await replyToLine(replyToken, `✅ ปิดงานราชการและทราบผลรายงานเรื่อง "${assignment.incoming_docs?.subject}" เรียบร้อยแล้วค่ะ 🌸`);


    const { data: teacher } = await supabaseAdmin
      .from('teachers')
      .select('line_user_id')
      .eq('id', assignment.assignee_id)
      .maybeSingle();

    if (teacher?.line_user_id) {
      await pushToLine(teacher.line_user_id, `🎉 ผู้อำนวยการได้รับทราบผลรายงานและสั่งการ "ทราบ/ปิดงาน" สำหรับงานเรื่อง "${assignment.incoming_docs?.subject}" แล้วค่ะ ขอบคุณในการดำเนินงานและปิดจ๊อบนะคะคุณครู 🌸⚡`);
    }
  } catch (err: any) {
    console.error('handleClose error:', err);
    await replyToLine(replyToken, `❌ ปิดงานไม่สำเร็จ: ${err.message}`);
  }
}

async function handleFeedback(event: any, params: URLSearchParams, profile: any) {
  const assignmentId = params.get('id');
  const replyToken = event.replyToken;

  if (profile.role !== 'director' && profile.role !== 'admin') {
    await replyToLine(replyToken, '❌ ขออภัยค่ะ ฟังก์ชันนี้สำหรับผู้อำนวยการสั่งการเท่านั้นค่ะ 🌸');
    return;
  }

  try {

    await supabaseAdmin
      .from('line_action_states')
      .insert([{
        user_id: profile.line_user_id,
        action: 'awaiting_feedback_text',
        context: { assignment_id: assignmentId }
      }]);

    await replyToLine(replyToken, '💬 กรุณาพิมพ์ข้อแนะนำหรือคำสั่งการเพิ่มเติมที่ต้องการให้คุณครูดำเนินการแก้ไข/ทำเพิ่มส่งมาได้เลยค่ะ 🌸');
  } catch (err: any) {
    console.error('handleFeedback error:', err);
    await replyToLine(replyToken, `❌ ไม่สามารถเตรียมสั่งเพิ่มเติมได้: ${err.message}`);
  }
}





async function handlePendingAction(event: any, pendingState: any, profile: any, userMsg: string) {
  const replyToken = event.replyToken;
  const stateId = pendingState.id;
  const action = pendingState.action;
  const context = pendingState.context || {};

  try {
    if (action === 'awaiting_reject_reason') {
      const { type, id } = context;
      let tableName = '';
      let numberColumn = '';
      let nameString = '';

      if (type === 'outgoing') { tableName = 'outgoing_docs'; numberColumn = 'doc_number'; nameString = 'หนังสือส่ง'; }
      else if (type === 'memo') { tableName = 'memos'; numberColumn = 'memo_number'; nameString = 'บันทึกข้อความ'; }
      else if (type === 'order') { tableName = 'orders'; numberColumn = 'order_number'; nameString = 'คำสั่งแต่งตั้ง'; }


      const { data: doc } = await supabaseAdmin.from(tableName).select('*').eq('id', id).single();
      if (!doc) {
        await replyToLine(replyToken, '❌ ไม่พบข้อมูลเอกสารในระบบค่ะ');
        return;
      }


      let remarkObj: any = {};
      try {
        remarkObj = typeof doc.remark === 'object' ? doc.remark : JSON.parse(doc.remark || '{}');
      } catch (e) { remarkObj = {}; }

      remarkObj.director_opinion = userMsg;
      remarkObj.director_decision = 'ส่งกลับแก้ไข';
      remarkObj.approved_date = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });

      await supabaseAdmin
        .from(tableName)
        .update({
          status: 'rejected',
          remark: JSON.stringify(remarkObj)
        })
        .eq('id', id);


      await supabaseAdmin.from('line_action_states').delete().eq('id', stateId);

      await replyToLine(replyToken, `✅ ทำการปฏิเสธ/ส่งแก้ไข ${nameString}เรื่อง "${doc.subject}" และส่งเหตุผลคืนคุณครูผู้ร่างเรียบร้อยแล้วค่ะ 🌸`);


      if (doc.created_by) {
        const { data: creator } = await supabaseAdmin.from('profiles').select('line_user_id').eq('id', doc.created_by).maybeSingle();
        if (creator?.line_user_id) {
          await pushToLine(creator.line_user_id, `❌ แจ้งเตือน: ${nameString}เรื่อง "${doc.subject}" ได้ถูกส่งกลับแก้ไข\nเหตุผลของ ผอ.: "${userMsg}"\n\nรบกวนคุณครูช่วยตรวจสอบและเข้าไปทำการแก้ไขบนหน้าเว็บโรงเรียนนะคะ 🙇‍♀️🌸`);
        }
      }
    }

    else if (action === 'awaiting_assign_instruction') {
      const { doc_id, teacher_id } = context;

      await executeDocAssignment(doc_id, teacher_id, userMsg, replyToken, profile);
    }

    else if (action === 'awaiting_report_text') {
      const { assignment_id } = context;


      const { data: assign } = await supabaseAdmin
        .from('doc_assignments')
        .select('*, incoming_docs(subject)')
        .eq('id', assignment_id)
        .single();

      if (!assign) {
        await replyToLine(replyToken, '❌ ไม่พบข้อมูลการมอบหมายงานนี้ในระบบค่ะ');
        return;
      }


      await supabaseAdmin
        .from('doc_assignments')
        .update({
          status: 'completed',
          staff_report: userMsg,
          reported_at: new Date().toISOString()
        })
        .eq('id', assignment_id);


      await supabaseAdmin.from('line_action_states').delete().eq('id', stateId);

      await replyToLine(replyToken, `✅ บันทึกคำรายงานผลและส่งมอบงานเรื่อง "${assign.incoming_docs?.subject}" เสนอผู้อำนวยการเรียบร้อยแล้วค่ะ ขอบคุณมากนะคะคุณครู 🌸`);


      const { data: director } = await supabaseAdmin
        .from('profiles')
        .select('line_user_id')
        .eq('role', 'director')
        .maybeSingle();

      const docSubject = assign.incoming_docs?.subject || 'งานที่มอบหมาย';
      const dirMessage = `📊 คุณครู ${profile.display_name} ได้รายงานผลงาน\nเรื่อง: ${docSubject}\n\nผลงาน: "${userMsg}"`;

      const dirActions = [
        { label: '✅ ทราบ/ปิดงาน', type: 'postback' as const, data: `action=close&id=${assignment_id}`, color: '#1DB446' },
        { label: '💬 สั่งเพิ่มเติม', type: 'postback' as const, data: `action=feedback&id=${assignment_id}`, color: '#007AFF' }
      ];

      await pushToLineFlex(
        director?.line_user_id || undefined,
        '📊 สรุปรายงานการดำเนินงาน',
        {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              { type: "text", text: "📊 สรุปผลรายงานการดำเนินงาน", weight: "bold", color: "#9C27B0", size: "sm" },
              { type: "text", text: dirMessage, margin: "md", wrap: true, weight: "bold", size: "md" }
            ]
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: dirActions.map(act => ({
              type: "button",
              style: "primary",
              height: "sm",
              color: act.color || "#1DB446",
              action: { type: "postback", label: act.label, data: act.data }
            }))
          }
        }
      );
    }

    else if (action === 'awaiting_feedback_text') {
      const { assignment_id } = context;


      const { data: assign } = await supabaseAdmin
        .from('doc_assignments')
        .select('*, incoming_docs(subject), assignee_id')
        .eq('id', assignment_id)
        .single();

      if (!assign) {
        await replyToLine(replyToken, '❌ ไม่พบข้อมูลการมอบหมายงานนี้ในระบบค่ะ');
        return;
      }


      await supabaseAdmin
        .from('doc_assignments')
        .update({
          status: 'acknowledged',
          director_feedback: userMsg
        })
        .eq('id', assignment_id);


      await supabaseAdmin.from('line_action_states').delete().eq('id', stateId);

      await replyToLine(replyToken, `✅ บันทึกคำสั่งการเพิ่มเติมเรียบร้อยและส่งแจ้งคุณครูเรียบร้อยแล้วค่ะ 🌸`);


      const { data: teacher } = await supabaseAdmin
        .from('teachers')
        .select('line_user_id, prefix, first_name, last_name')
        .eq('id', assign.assignee_id)
        .maybeSingle();

      const docSubject = assign.incoming_docs?.subject || 'งานที่มอบหมาย';
      const teacherName = teacher ? `${teacher.prefix || ''}${teacher.first_name} ${teacher.last_name}` : 'ครูผู้รับงาน';

      const teacherMsg = `📌 ผอ. มีคำแนะนำ/สั่งการเพิ่มเติม\nเรื่อง: ${docSubject}\n\nคำสั่ง ผอ.: "${userMsg}"\n\nรบกวนคุณครูดำเนินการเพิ่มเติม และรายงานผลส่งกลับอีกครั้งเมื่อเสร็จงานนะคะ 🌸`;

      const teacherActions = [
        { label: '📄 ดูเอกสาร', type: 'uri' as const, uri: assign.report_file_urls?.[0] || 'https://school-admin-psi.vercel.app' },
        { label: '📝 รายงานผลใหม่', type: 'postback' as const, data: `action=report&id=${assignment_id}`, color: '#9C27B0' }
      ];

      if (teacher?.line_user_id) {
        await pushToLineFlex(teacher.line_user_id, '📌 คำสั่งการเพิ่มเติมจาก ผอ.', {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              { type: "text", text: "📌 คำสั่งการเพิ่มเติมจากผู้อำนวยการ", weight: "bold", color: "#ff8c00", size: "sm" },
              { type: "text", text: teacherMsg, margin: "md", wrap: true, weight: "bold", size: "md" }
            ]
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: teacherActions.map(act => ({
              type: "button",
              style: "primary",
              height: "sm",
              color: act.color || "#1DB446",
              action: act.type === 'uri' ? { type: "uri", label: act.label, uri: act.uri } : { type: "postback", label: act.label, data: act.data }
            }))
          }
        });
      } else {

        const groupMsg = `ถึง: ${teacherName}\nเรื่อง: ${docSubject}\n\nคำสั่ง ผอ. เพิ่มเติม: "${userMsg}"\n\nกรุณาดำเนินการต่อและกดส่งงานใหม่เมื่อเรียบร้อยค่ะ`;
        await pushToLineFlex(undefined, '📢 คำสั่งการเพิ่มเติมถึงคุณครู', {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              { type: "text", text: "📢 คำสั่งเพิ่มเติมจากผู้อำนวยการ", weight: "bold", color: "#ff8c00", size: "sm" },
              { type: "text", text: groupMsg, margin: "md", wrap: true, weight: "bold", size: "md" }
            ]
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: teacherActions.map(act => ({
              type: "button",
              style: "primary",
              height: "sm",
              color: act.color || "#1DB446",
              action: act.type === 'uri' ? { type: "uri", label: act.label, uri: act.uri } : { type: "postback", label: act.label, data: act.data }
            }))
          }
        });
      }
    }
  } catch (err: any) {
    console.error('handlePendingAction error:', err);
    await replyToLine(replyToken, `❌ ดำเนินการขั้นตอนต่อเนื่องไม่สำเร็จ: ${err.message}`);
  }
}
````

## File: api/tsconfig.json
````json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "esnext",
    "lib": ["es2022"],
    "strict": false,
    "types": ["node"],
    "skipLibCheck": true,
    "moduleResolution": "node",
    "esModuleInterop": true
  },
  "include": ["**/*.ts"]
}
````

## File: electron-builder-koko.json
````json
{
  "appId": "com.schooladmin.koko",
  "productName": "โรงเรียนบ้านควนโคกยา",
  "publish": [
    {
      "provider": "github",
      "owner": "officebkky-sketch",
      "repo": "school-admin"
    }
  ],
  "directories": {
    "output": "dist-installer"
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "shortcutName": "โรงเรียนบ้านควนโคกยา",
    "deleteAppDataOnUninstall": false
  },
  "win": {
    "target": "nsis",
    "icon": "public/logo.png",
    "artifactName": "${name}-koko-setup-${version}.${ext}"
  }
}
````

## File: electron-builder-school2.json
````json
{
  "appId": "com.schooladmin.school2",
  "productName": "ระบบบริหารจัดการข้อมูลโรงเรียน",
  "publish": [
    {
      "provider": "github",
      "owner": "officebkky-sketch",
      "repo": "school-admin"
    }
  ],
  "directories": {
    "output": "dist-installer"
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "shortcutName": "ระบบบริหารจัดการข้อมูลโรงเรียน",
    "deleteAppDataOnUninstall": false
  },
  "win": {
    "target": "nsis",
    "icon": "public/logo.png",
    "artifactName": "${name}-school2-setup-${version}.${ext}"
  }
}
````

## File: .env.example
````
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
````

## File: eslint.config.js
````javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
````

## File: google_drive_script.js
````javascript
function doPost(e) {
  try {

    var data = JSON.parse(e.postData.contents);


    if (data.action === 'delete') {
      var fileId = data.fileId;
      if (!fileId) {
        return createJsonResponse({
          status: 'error',
          message: 'กรุณาระบุ fileId ที่ต้องการลบ'
        });
      }

      var file = DriveApp.getFileById(fileId);
      file.setTrashed(true);

      return createJsonResponse({
        status: 'success',
        message: 'ย้ายไฟล์ลงถังขยะเรียบร้อยแล้ว'
      });
    }


    var base64Data = data.base64;
    var filename = data.filename;
    var mimeType = data.mimeType;
    var folderName = data.folder || 'SchoolAdminDocs';

    if (!base64Data || !filename || !mimeType) {
      return createJsonResponse({
        status: 'error',
        message: 'ข้อมูลไม่ครบถ้วน (ต้องการ base64, filename, mimeType)'
      });
    }


    var decoded = Utilities.base64Decode(base64Data);
    var blob = Utilities.newBlob(decoded, mimeType, filename);


    var folders = DriveApp.getFoldersByName(folderName);
    var folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }


    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);


    var fileUrl = file.getUrl();

    return createJsonResponse({
      status: 'success',
      url: fileUrl,
      fileId: file.getId()
    });

  } catch (error) {
    return createJsonResponse({
      status: 'error',
      message: 'GAS Error: ' + error.toString()
    });
  }
}


function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
````

## File: index.html
````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <title>ระบบบริหารจัดการข้อมูลโรงเรียน</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
````

## File: main.js
````javascript
import { app, BrowserWindow, dialog } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'electron-updater';
const { autoUpdater } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
    title: "ระบบบริหารจัดการข้อมูลโรงเรียน",
    icon: path.join(__dirname, 'public/logo.png')
  });


  mainWindow.setMenu(null);

  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }



}


autoUpdater.autoDownload = true;

autoUpdater.on('checking-for-update', () => {
  mainWindow?.webContents.send('update-status', { type: 'checking', message: 'กำลังตรวจสอบเวอร์ชันใหม่...' });
});

autoUpdater.on('update-available', (info) => {
  mainWindow?.webContents.send('update-status', {
    type: 'available',
    version: info.version,
    message: `พบเวอร์ชันใหม่ ${info.version} กำลังเริ่มดาวน์โหลด...`
  });
});

autoUpdater.on('update-not-available', () => {
  mainWindow?.webContents.send('update-status', { type: 'not-available', message: 'คุณใช้เวอร์ชันล่าสุดแล้ว' });
});

autoUpdater.on('download-progress', (progressObj) => {
  mainWindow?.webContents.send('update-progress', {
    percent: progressObj.percent,
    bytesPerSecond: progressObj.bytesPerSecond,
    transferred: progressObj.transferred,
    total: progressObj.total
  });
});

autoUpdater.on('update-downloaded', (info) => {
  mainWindow?.webContents.send('update-status', {
    type: 'downloaded',
    version: info.version,
    message: 'ดาวน์โหลดเสร็จแล้ว พร้อมติดตั้ง'
  });
});

autoUpdater.on('error', (err) => {
  mainWindow?.webContents.send('update-status', { type: 'error', message: 'เกิดข้อผิดพลาดในการอัปเดต: ' + err.message });
});


import { ipcMain } from 'electron';
ipcMain.on('restart-app', () => {
  autoUpdater.quitAndInstall();
});

app.whenReady().then(() => {
  createWindow();


  if (app.isPackaged) {
    autoUpdater.checkForUpdatesAndNotify();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
````

## File: package.json
````json
{
  "name": "school-admin-v2",
  "private": true,
  "version": "1.1.14",
  "description": "ระบบบริหารจัดการข้อมูลโรงเรียน",
  "author": "Phairot มากแก้ว",
  "repository": {
    "type": "git",
    "url": "https://github.com/officebkky-sketch/school-admin.git"
  },
  "main": "main.js",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "electron:dev": "concurrently \"npm run dev\" \"wait-on http://localhost:5173 && electron .\"",
    "electron:build": "npm run build && electron-builder",
    "build:koko": "tsc -b && vite build --mode koko && electron-builder --config electron-builder-koko.json",
    "build:school2": "tsc -b && vite build --mode school2 && electron-builder --config electron-builder-school2.json",
    "start": "npm run electron:dev"
  },
  "dependencies": {
    "@google/generative-ai": "^0.24.1",
    "@pdf-lib/fontkit": "^1.1.1",
    "@supabase/supabase-js": "^2.105.1",
    "electron-updater": "^6.8.3",
    "lucide-react": "^1.14.0",
    "papaparse": "^5.5.3",
    "pdf-lib": "^1.17.1",
    "pdfjs-dist": "^5.7.284",
    "react": "^19.2.5",
    "react-dom": "^19.2.5",
    "react-router-dom": "^7.14.2",
    "recharts": "^3.8.1",
    "xlsx": "^0.18.5",
    "@types/node": "^24.12.2"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@tailwindcss/vite": "^4.2.4",
    "@types/papaparse": "^5.5.2",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "concurrently": "^9.2.1",
    "electron": "^41.5.0",
    "electron-builder": "^26.8.1",
    "eslint": "^10.2.1",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.5.0",
    "postcss": "^8.5.13",
    "tailwindcss": "^4.2.4",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.58.2",
    "vite": "^8.0.10",
    "wait-on": "^9.0.5"
  },
  "build": {
    "appId": "com.schooladmin.multischool",
    "productName": "ระบบบริหารจัดการหลายโรงเรียน",
    "publish": [
      {
        "provider": "github",
        "owner": "officebkky-sketch",
        "repo": "school-admin"
      }
    ],
    "directories": {
      "output": "dist-installer"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "shortcutName": "ระบบบริหารจัดการหลายโรงเรียน",
      "deleteAppDataOnUninstall": false
    },
    "win": {
      "target": "nsis",
      "icon": "public/logo.png",
      "artifactName": "${name}-setup-${version}.${ext}"
    }
  }
}
````

## File: PROGRESS_REPORT.md
````markdown
# 📝 รายงานความก้าวหน้าและการดำเนินงานระบบสารบรรณ Hybrid
**ประจำวันที่ 29 มิถุนายน 2569 🌸**

บันทึกฉบับนี้จัดทำขึ้นเพื่อใช้ทบทวนงานและเตรียมพร้อมสำหรับขั้นตอนถัดไปในวันพรุ่งนี้

---

## 📊 1. สถานะการดำเนินงานปัจจุบัน (Current Status)

| ระบบหลัก | สถานะการติดตั้ง | ตำแหน่งไฟล์ / ข้อมูลการเชื่อมต่อ |
| :--- | :--- | :--- |
| **โค้ดโครงการ (Vite+Electron)** | **คลีนไฟล์เรียบร้อย & คอมไพล์ผ่าน 100%** | โฟลเดอร์ `school-saraban-hybrid` ในเครื่องของคุณ |
| **GitHub Repository** | **อัปโหลดโค้ดขึ้นระบบเรียบร้อย (Public)** | [https://github.com/hourmir2-maker/school-saraban-hybrid](https://github.com/hourmir2-maker/school-saraban-hybrid) |
| **ฐานข้อมูลกลาง (Supabase)** | **โครงสร้างตาราง Multi-School เสร็จสิ้น** | รันสคริปต์ฐานข้อมูลรวมสำเร็จแล้ว รอคีย์เชื่อมต่อระบบ |
| **เซิร์ฟเวอร์หลังบ้าน (Vercel)** | **ระบบบอทน้องชบาเปิดใช้งานสำเร็จ** | [https://school-saraban-hybrid-r1qi.vercel.app](https://school-saraban-hybrid-r1qi.vercel.app) |

---

## ⚙️ 2. การปรับปรุงซอร์สโค้ดในเครื่องวันนี้

1. **คัดกรองแถบ Sidebar Navigation:**
   * ตัดระบบวิชาการ, ตารางเรียน, งานกีฬา, การเงินงบประมาณ, ระบบห้องสมุด และลงเวลา WFH ออกทั้งหมด
   * คงเหลือเฉพาะ: หน้าสารบรรณ (รับ, ส่ง, คำสั่ง, บันทึกข้อความ, ติดตามงาน), จัดการครู, หน้า AR น้องชบา และระบบตั้งค่าสิทธิ์แอดมิน
2. **แก้ไขข้อผิดพลาดในการ Build:**
   * กู้คืนไฟล์ `src/lib/lineNotify.ts` เพื่อป้องกันหน้าเพจเกิด Error ตอนคอมไพล์ระบบ
3. **จัดเก็บคู่มือติดตั้งแบบ Hybrid:**
   * สร้างไฟล์คู่มือสำหรับส่งต่อให้โรงเรียนเครือข่ายตั้งค่า Google Drive และ Bot ของตัวเอง: [คู่มือการตั้งค่าระบบ_Hybrid.md](คู่มือการตั้งค่าระบบ_Hybrid.md)
4. **จัดทำสคริปต์ฐานข้อมูลเดี่ยว:**
   * รวบรวมคำสั่ง SQL ทั้งระบบไว้ที่เดียวในไฟล์: [supabase_schema_hybrid.sql](supabase_schema_hybrid.sql)

---

## 📅 3. แผนการทำงานต่อในวันพรุ่งนี้ (To-Do List)

- [ ] **ขั้นตอนที่ 1:** กรอกคีย์โครงการ Supabase (URL, Anon Key) บันทึกลงไฟล์ `.env`
- [ ] **ขั้นตอนที่ 2:** รันสคริปต์จำลองเพื่อลงทะเบียนโรงเรียนแรกในเครือข่าย (เช่น รหัสโรงเรียน `SKW001`) ลงในฐานข้อมูลกลาง เพื่อให้ล็อกอินใช้งานระบบได้ทันที
- [ ] **ขั้นตอนที่ 3:** รันแอปคอมพิวเตอร์เพื่อทดสอบการทำงานในการบันทึกเอกสารและการเกษียณหนังสือ
- [ ] **ขั้นตอนที่ 4:** ทำการ Build โปรเจกต์ให้เป็นไฟล์ติดตั้ง `.exe` เพื่อนำไปแจกจ่ายให้แก่โรงเรียนในเครือข่ายทั้ง 13 โรงเรียนต่อไป
````

## File: public/icons.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
````

## File: README.md
````markdown
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
````

## File: scratch/check-columns.js
````javascript
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';


const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.trim().match(/^([\w.-]+)\s*=\s*(.*)?$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    env[key] = value.trim();
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseAnonKey = env['VITE_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkColumns() {
  try {
    console.log('--- Testing insert into schools to catch detailed error ---');
    const { data, error } = await supabase
      .from('schools')
      .insert([
        {
          school_code: 'TEST_COL',
          school_name: 'Test Columns',
          admin_email: 'test@admin.com',
          status: 'pending'
        }
      ])
      .select();

    if (error) {
      console.log('❌ Error message from Supabase API:');
      console.log(JSON.stringify(error, null, 2));
    } else {
      console.log('✅ Insert successful! Columns exist and are correctly configured.', data);


      await supabase.from('schools').delete().eq('school_code', 'TEST_COL');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

checkColumns();
````

## File: scratch/check-settings.js
````javascript
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.trim().match(/^([\w.-]+)\s*=\s*(.*)?$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    env[key] = value.trim();
  }
});

const supabase = createClient(env['VITE_SUPABASE_URL'], env['VITE_SUPABASE_ANON_KEY']);

async function checkSettings() {
  const { data, error } = await supabase.from('settings').select('*');
  if (error) {
    console.error('Failed:', error);
  } else {
    console.log('=== settings table content ===');
    console.log(data);
  }
}
checkSettings();
````

## File: scratch/find-text.js
````javascript
import fs from 'fs';
import path from 'path';

const searchDir = process.cwd();
const query = 'ยังไม่มีข้อมูลการเชื่อมต่อโรงเรียน';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {

    if (file === 'node_modules' || file === '.git' || file === 'dist-installer' || file === 'dist' || file === 'build') {
      return;
    }
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (stat.isFile() && (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.md') || file.endsWith('.json'))) {
      results.push(fullPath);
    }
  });
  return results;
}

try {
  const files = walk(searchDir);
  console.log(`🔍 กำลังค้นหาคำว่า "${query}" ในไฟล์ทั้งหมด ${files.length} ไฟล์...`);

  let foundCount = 0;
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes(query)) {
      console.log(`✅ พบในไฟล์: ${path.relative(process.cwd(), file)}`);
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (line.includes(query)) {
          console.log(`   [บรรทัด ${idx + 1}]: ${line.trim()}`);
        }
      });
      foundCount++;
    }
  });

  if (foundCount === 0) {
    console.log('❌ ไม่พบคำดังกล่าวในโปรเจกต์นี้');
  }
} catch (err) {
  console.error('เกิดข้อผิดพลาด:', err);
}
````

## File: scratch/seed-school.js
````javascript
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';


const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ ไม่พบไฟล์ .env กรุณาสร้างไฟล์ .env ก่อนรันสคริปต์นี้ค่ะ');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.trim().match(/^([\w.-]+)\s*=\s*(.*)?$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    env[key] = value.trim();
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseAnonKey = env['VITE_SUPABASE_ANON_KEY'];
const defaultSchoolName = env['VITE_SCHOOL_NAME'] || 'โรงเรียนบ้านควนโคกยา';
const adminEmail = env['VITE_SUPER_ADMIN_EMAIL'] || 'ncrows77@gmail.com';
const gasUrl = env['VITE_GAS_URL'] || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ ไม่พบ VITE_SUPABASE_URL หรือ VITE_SUPABASE_ANON_KEY ในไฟล์ .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedSchool() {
  console.log('=== 🏫 เริ่มต้นลงทะเบียนโรงเรียนแรกในระบบ (SKW001) ===');
  console.log('Supabase URL:', supabaseUrl);
  console.log('โรงเรียน:', defaultSchoolName);
  console.log('อีเมลแอดมินจำลอง:', adminEmail);

  try {

    const { data: existingSchool, error: queryError } = await supabase
      .from('schools')
      .select('*')
      .eq('school_code', 'SKW001')
      .maybeSingle();

    if (queryError) {
      console.error('❌ เกิดข้อผิดพลาดในการตรวจสอบโรงเรียน:', queryError);
      process.exit(1);
    }

    let schoolId;

    if (existingSchool) {
      console.log(`✅ พบโรงเรียนรหัส SKW001 ในระบบอยู่แล้ว: ${existingSchool.school_name} (ID: ${existingSchool.id})`);
      schoolId = existingSchool.id;
    } else {

      console.log(`กำลังลงทะเบียนโรงเรียน SKW001 - ${defaultSchoolName}...`);
      const { data: newSchool, error: insertError } = await supabase
        .from('schools')
        .insert([
          {
            school_code: 'SKW001',
            school_name: defaultSchoolName,
            gas_url: gasUrl,
            admin_email: adminEmail,
            status: 'approved'
          }
        ])
        .select()
        .single();

      if (insertError) {
        console.error('❌ ไม่สามารถลงทะเบียนโรงเรียนใหม่ได้:', insertError);
        process.exit(1);
      }

      console.log('✅ ลงทะเบียนโรงเรียนสำเร็จ!', newSchool);
      schoolId = newSchool.id;
    }


    const { data: existingSettings, error: settingsQueryError } = await supabase
      .from('settings')
      .select('*')
      .eq('school_id', schoolId)
      .maybeSingle();

    if (settingsQueryError) {
      console.error('⚠️ เกิดข้อผิดพลาดในการตรวจสอบการตั้งค่า (Settings):', settingsQueryError);
    } else if (existingSettings) {
      console.log('✅ พบข้อมูลการตั้งค่าสำหรับโรงเรียนนี้อยู่แล้วในระบบ');
    } else {

      console.log('กำลังสร้างข้อมูลการตั้งค่าเริ่มต้น (settings)...');
      const { data: newSettings, error: settingsInsertError } = await supabase
        .from('settings')
        .insert([
          {
            school_id: schoolId,
            school_name: defaultSchoolName,
            school_address: 'ต.ควนโคกยา อ.เมือง จ.กระบี่',
            director_name: 'นายสมชาย รักดี',
            current_academic_year: '2569',
            current_term: '1',
            school_logo_url: 'logo.png',
            phone_number: '081-234-5678',
            local_gov_name: 'สำนักงานเขตพื้นที่การศึกษาประถมศึกษากระบี่'
          }
        ])
        .select()
        .single();

      if (settingsInsertError) {
        console.error('❌ ไม่สามารถสร้างการตั้งค่าเริ่มต้นได้:', settingsInsertError);
      } else {
        console.log('✅ สร้างข้อมูลการตั้งค่าเริ่มต้นสำเร็จ!', newSettings);
      }
    }

    console.log('\n======================================================');
    console.log('🎉 เสร็จสิ้นการเตรียมข้อมูลฐานข้อมูลสำหรับโรงเรียนแรก 🎉');
    console.log('👉 คุณสามารถเปิดโปรแกรมและสมัครสมาชิกใช้งานด้วยรหัสโรงเรียน: SKW001');
    console.log(`👉 หากใช้อีเมล: ${adminEmail} ระบบจะมอบสิทธิ์ "แอดมินสูงสุด (Super Admin)" ให้โดยอัตโนมัติ!`);
    console.log('======================================================');

  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาดที่คาดไม่ถึง:', err);
  }
}

seedSchool();
````

## File: src/App.css
````css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
````

## File: src/assets/react.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
````

## File: src/assets/saraban/garuda-1.5cm-base64.txt
````
iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3...
````

## File: src/assets/saraban/garuda-3cm-base64.txt
````
iVBORw0KGgoAAAANSUhEUgAAAO0AAADt...
````

## File: src/assets/vite.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
````

## File: src/components/ComingSoon.tsx
````typescript
import { Construction } from 'lucide-react';

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm animate-in fade-in duration-500">
      <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-amber-100/50">
        <Construction size={40} />
      </div>
      <h3 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h3>
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">กำลังพัฒนาระบบ (Coming Soon)</p>
      <div className="mt-8 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.3s]" />
      </div>
    </div>
  );
}
````

## File: src/components/IdentityFooter.tsx
````typescript
interface IdentityFooterProps {
  schoolName?: string;
  schoolLogo?: string;
  localGovName?: string;
}

export default function IdentityFooter({ schoolName, schoolLogo, localGovName }: IdentityFooterProps) {
  const displayName = schoolName || import.meta.env.VITE_SCHOOL_NAME || 'โรงเรียนบ้านควนโคกยา';
  const displayLogo = schoolLogo || import.meta.env.VITE_SCHOOL_LOGO_PATH || 'logo.png';
  const displayGov = localGovName || 'Office of Primary Education';

  return (
    <div className="IdentityFooter no-print mt-12 flex flex-col items-center justify-center gap-4 py-8 border-t border-slate-100">
       <div className="flex items-center gap-4 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
          <img src={displayLogo} alt="School Logo" className="w-10 h-10 object-contain" />
          <div className="h-8 w-px bg-slate-200"></div>
          <div className="text-left">
             <p className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">{displayName}</p>
             <p className="text-[8px] font-bold text-brand-primary uppercase tracking-widest">{displayGov}</p>
          </div>
       </div>
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">
          Smart School Admin © 2026 | <span className="text-slate-600">Phairot Makkaew & Gemini AI</span>
       </p>
    </div>
  );
}
````

## File: src/components/Modal.tsx
````typescript
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
````

## File: src/index.css
````css
@import "tailwindcss";

@theme {
  --font-kanit: "Kanit", sans-serif;
  --font-sarabun: "TH Sarabun PSK", "TH Sarabun New", "Sarabun", sans-serif;

  --color-brand-primary: #166534;
  --color-brand-secondary: #f97316;
}

@font-face {
  font-family: 'TH Sarabun PSK';
  src: local('TH Sarabun PSK'), local('THSarabunPSK'), url('/fonts/THSarabunNew.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'TH Sarabun PSK';
  src: local('TH Sarabun PSK Bold'), local('THSarabunPSK-Bold'), url('/fonts/THSarabunNew-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'TH Sarabun New';
  src: url('/fonts/THSarabunNew.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'TH Sarabun New';
  src: url('/fonts/THSarabunNew-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@layer base {
  body {
    @apply font-kanit bg-slate-50 text-slate-900;
  }
}
````

## File: src/lib/aiService.ts
````typescript
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { supabase } from './supabase';


pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export interface GeminiResponse {
  text: string;
  modelUsed: string;
  versionUsed: string;
}

export interface GeminiOptions {
  temperature?: number;
  maxOutputTokens?: number;
  responseMimeType?: string;
  systemInstruction?: string;
  retryCount?: number;
}

function getApiKeyList(apiKey: string): string[] {
  if (!apiKey) return [];
  return apiKey.split(',').map(k => k.trim()).filter(Boolean);
}

function selectApiKey(apiKey: string): string {
  const keys = getApiKeyList(apiKey);
  if (keys.length === 0) return '';
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}

/**
 * ฟังก์ชันส่วนกลางสำหรับการเรียกใช้ Gemini API พร้อมระบบหมุนเวียน Model และ Error Handling
 */
export async function callGeminiAPI(
  prompt: string,
  apiKey: string,
  options: GeminiOptions = {}
): Promise<GeminiResponse> {
  const {
    temperature = 0.7,
    maxOutputTokens = 2048,
    responseMimeType = "text/plain",
    systemInstruction,
    retryCount = 3
  } = options;

  const keys = getApiKeyList(apiKey);
  if (keys.length === 0) throw new Error("กรุณาตั้งค่า Gemini API Key");

  let modelsToTry = await getAvailableModels(keys[0]);
  if (modelsToTry.length === 0) {
    modelsToTry = [
      "gemini-3.1-flash-lite",
      "gemini-3.5-flash",
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-1.5-pro"
    ];
  }

  const apiVersions = ["v1beta", "v1"];
  let lastError: any = null;

  for (let attempt = 0; attempt < retryCount; attempt++) {
    // สลับคีย์ตามรอบความพยายาม
    const currentKey = keys[(attempt + Math.floor(Math.random() * keys.length)) % keys.length];

    for (const modelName of modelsToTry) {
      for (const version of apiVersions) {
        try {
          const url = `https://generativelanguage.googleapis.com/${version}/models/${modelName}:generateContent?key=${currentKey}`;

          const body: any = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature,
              maxOutputTokens,
              responseMimeType
            }
          };

          if (systemInstruction) {
            body.systemInstruction = {
              parts: [{ text: systemInstruction }]
            };
          }

          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });

          const data = await response.json();

          if (response.ok) {
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
            if (aiText) {
              return {
                text: aiText,
                modelUsed: modelName,
                versionUsed: version
              };
            }
          } else {
            lastError = data.error || { message: `HTTP ${response.status}` };
            if (response.status === 429) {
              console.warn(`Rate limit reached for ${modelName} with key index ${attempt}, trying next...`);
              continue;
            }
          }
        } catch (err: any) {
          lastError = err;
        }
      }
    }
    if (attempt < retryCount - 1) {
      await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
    }
  }

  const errorMsg = lastError?.message || lastError || "Unknown error";
  throw new Error(`AI ไม่สามารถประมวลผลได้: ${errorMsg}`);
}




export function truncateContext(context: string, maxChars: number = 15000): string {
  if (context.length <= maxChars) return context;
  return context.substring(0, maxChars) + "\n... (ข้อมูลถูกตัดเพื่อความกระชับ) ...";
}

export async function extractProjectsFromKnowledge(apiKey: string, academicYear: string = '2569') {
  try {

    const vectorQuery = `รายการโครงการและงบประมาณของปีการศึกษา ${academicYear}`;
    const vectorMatches = await searchKnowledge(vectorQuery, apiKey, 25);
    const filteredVector = (vectorMatches || []).filter((vm: any) =>
      !vm.document_name?.includes('ระเบียบ') &&
      !vm.document_name?.includes('คู่มือ')
    );

    const thaiYear = academicYear.replace(/0/g, '๐').replace(/1/g, '๑').replace(/2/g, '๒').replace(/3/g, '๓').replace(/4/g, '๔').replace(/5/g, '๕').replace(/6/g, '๖').replace(/7/g, '๗').replace(/8/g, '๘').replace(/9/g, '๙');
    const { data: textMatches } = await supabase
      .from('school_knowledge')
      .select('document_name, chunk_text')
      .not('document_name', 'ilike', '%ระเบียบ%')
      .not('document_name', 'ilike', '%คู่มือ%')
      .or(`chunk_text.ilike.%โครงการ%,chunk_text.ilike.%งบประมาณ%,chunk_text.ilike.%${academicYear}%,chunk_text.ilike.%${thaiYear}%`)
      .limit(60);

    const allMatches = [...filteredVector, ...(textMatches || [])];
    const uniqueChunks = allMatches.filter((v, i, a) => a.findIndex(t => (t.chunk_text === v.chunk_text)) === i);

    if (uniqueChunks.length === 0) return [];

    const context = uniqueChunks.map(m => `[ไฟล์: ${m.document_name}]\n${m.chunk_text}`).join('\n---\n');


    let modelsToTry = await getAvailableModels(apiKey);
    if (modelsToTry.length === 0) {
      modelsToTry = [
        "gemini-3.1-flash-lite",
        "gemini-3.5-flash",
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-1.5-flash"
      ];
    }
    const apiVersions = ["v1beta", "v1"];
    const keys = getApiKeyList(apiKey);
    if (keys.length === 0) return [];

    const prompt = `ภารกิจ: คุณเป็นผู้เชี่ยวชาญด้านงานพัสดุและงบประมาณโรงเรียน หน้าที่ของคุณคือสกัด "รายชื่อโครงการ" และ "วงเงินงบประมาณที่ได้รับ" จากข้อมูลที่พบในคลังความรู้ โดยเน้นเฉพาะปีการศึกษา ${academicYear}

    ข้อมูลจากคลังความรู้:
    ${context}

    กฎเหล็ก:
    1. ตอบกลับเป็น JSON Array ของ Object เท่านั้น ห้ามมีคำอธิบายอื่น
    2. ฟิลด์ที่ต้องมี: project_name (ชื่อโครงการ), planned_amount (จำนวนเงินเป็นตัวเลข), budget_type (แหล่งเงิน เช่น งบอุดหนุน, งบรายได้)
    3. หากเป็นตัวเลขไทย ให้แปลงเป็นเลขอารบิก
    4. ห้ามใส่หน่วย "บาท" หรือเครื่องหมายคอมม่าใน planned_amount
    5. สกัดเฉพาะโครงการที่มีการระบุวงเงินชัดเจนเท่านั้น

    รูปแบบคำตอบ:
    [{"project_name": "...", "planned_amount": 0, "budget_type": "..."}]`;

    const maxAttempts = 3;
    let lastError: any = null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const currentKey = keys[(attempt + Math.floor(Math.random() * keys.length)) % keys.length];

      for (const modelName of modelsToTry) {
        for (const version of apiVersions) {
          try {
            const url = `https://generativelanguage.googleapis.com/${version}/models/${modelName}:generateContent?key=${currentKey}`;
            const response = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                  response_mime_type: "application/json",
                  temperature: 0.1
                }
              })
            });

            if (response.ok) {
              const data = await response.json();
              let aiText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
              if (!aiText) continue;

              aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
              const parsed = JSON.parse(aiText);
              return Array.isArray(parsed) ? parsed : [];
            } else {
              const data = await response.json();
              lastError = data.error || { message: `HTTP ${response.status}` };
            }
          } catch (err) {
            lastError = err;
            console.warn(`Extraction failed with ${modelName} ${version}:`, err);
          }
        }
      }
      if (attempt < maxAttempts - 1) {
        await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
      }
    }

    return [];
  } catch (err) {
    console.error('Project extraction overall error:', err);
    return [];
  }
}

export async function extractTextFromPdf(pdfBuffer: ArrayBuffer): Promise<string> {
  try {
    const bufferCopy = pdfBuffer.slice(0);
    const loadingTask = pdfjsLib.getDocument({ data: bufferCopy });
    const pdf = await loadingTask.promise;
    let fullText = '';

    const numPages = Math.min(pdf.numPages, 5);
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  } catch (err) {
    console.error('Text extraction error:', err);
    return "";
  }
}

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function getAvailableModels(apiKey: string): Promise<string[]> {
  const keys = getApiKeyList(apiKey);
  if (keys.length === 0) return [];

  // โมเดลหลักที่แนะนำและเสถียรที่สุดในปัจจุบัน (เน้นรุ่น Lite ที่ให้โควต้ารายวันสูง 500 RPD เพื่อหลีกเลี่ยง Rate Limit)
  const RECOMMENDED_MODELS = [
    'gemini-3.1-flash-lite',
    'gemini-3.5-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro'
  ];

  for (const key of keys) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
      if (response.ok) {
        const data = await response.json();
        const apiModels: string[] = data.models
          ?.map((m: any) => m.name.replace('models/', ''))
          .filter((name: string) => name.includes('gemini')) || [];

        // คัดกรองเฉพาะโมเดลแนะนำที่มีอยู่ในสิทธิ์การใช้งาน
        const available = RECOMMENDED_MODELS.filter(m => apiModels.includes(m));
        if (available.length > 0) {
          return available;
        }

        // หากไม่มีตัวแนะนำเลย ให้กรองเอาเฉพาะตัวมาตรฐานที่คีย์นั้นรองรับและเสถียร
        return apiModels
          .filter((name: string) =>
            !name.includes('vision') &&
            !name.includes('embedding') &&
            !name.includes('lite') &&
            !name.includes('latest') &&
            (name.includes('1.5') || name.includes('2.0') || name.includes('2.5'))
          )
          .sort((a: string, b: string) => b.localeCompare(a));
      }
    } catch (e) {
      console.error(`List models error with key ${key.slice(0, 8)}...:`, e);
    }
  }
  return RECOMMENDED_MODELS;
}

export interface DocumentInfo {
  summary: string;
  doc_number?: string;
  doc_date?: string;
  from_agency?: string;
  subject?: string;
}

export async function summarizeDocument(pdfBuffer: ArrayBuffer, apiKey?: string): Promise<DocumentInfo> {
  const extractedText = await extractTextFromPdf(pdfBuffer);
  const hasExtractedText = extractedText.trim().length > 100;

  if (apiKey) {
    const keys = getApiKeyList(apiKey);
    if (keys.length > 0) {
      let modelsToTry = await getAvailableModels(apiKey);
      if (modelsToTry.length === 0) {
        modelsToTry = [
          "gemini-3.1-flash-lite",
          "gemini-3.5-flash",
          "gemini-2.5-flash",
          "gemini-2.0-flash",
          "gemini-1.5-flash"
        ];
      }

      const apiVersions = ["v1beta", "v1"];

      const prompt = `วิเคราะห์หนังสือราชการนี้และตอบกลับเป็น JSON format เท่านั้น โดยมีฟิลด์ดังนี้:
      {
        "summary": "สรุปใจความสำคัญสั้นๆ 1-2 บรรทัด",
        "doc_number": "เลขที่หนังสือที่ปรากฏในต้นฉบับ (เช่น ศธ 04xxx/xxx)",
        "doc_date": "วันที่ในหนังสือต้นฉบับในรูปแบบ YYYY-MM-DD (ค.ศ.)",
        "from_agency": "ชื่อหน่วยงานเจ้าของหนังสือ",
        "subject": "ชื่อเรื่องของหนังสือ"
      }
      หากหาข้อมูลใดไม่พบให้ใส่เป็น null หรือ string ว่าง`;

      const maxAttempts = 3;
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const currentKey = keys[(attempt + Math.floor(Math.random() * keys.length)) % keys.length];

        for (const modelName of modelsToTry) {
          for (const version of apiVersions) {
            try {
              const url = `https://generativelanguage.googleapis.com/${version}/models/${modelName}:generateContent?key=${currentKey}`;

              let contents: any[] = [];
              if (hasExtractedText) {
                contents = [{ parts: [{ text: `${prompt}\n\nเนื้อหาหนังสือ:\n${extractedText}` }] }];
              } else {
                const base64Pdf = toBase64(pdfBuffer);
                contents = [{
                  parts: [
                    { inline_data: { mime_type: "application/pdf", data: base64Pdf } },
                    { text: prompt }
                  ]
                }];
              }

              const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents,
                  generationConfig: { response_mime_type: "application/json" }
                })
              });

              if (response.ok) {
                const data = await response.json();
                const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
                if (aiText) {
                  try {
                    return JSON.parse(aiText);
                  } catch (parseErr) {
                    console.warn('AI returned non-JSON, trying to fix...', aiText);
                    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
                    if (jsonMatch) return JSON.parse(jsonMatch[0]);
                  }
                }
              }
            } catch (err: any) {

            }
          }
        }
        if (attempt < maxAttempts - 1) {
          await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
        }
      }
    }
  }

  if (extractedText.trim().length > 0) {
    const cleanText = extractedText.replace(/\s+/g, ' ').trim();
    return { summary: cleanText.slice(0, 150) + (cleanText.length > 150 ? '...' : '') };
  }

  return { summary: 'ไม่สามารถสรุปเนื้อหาได้' };
}

export async function generateAIDraft(prompt: string, apiKey?: string): Promise<string> {
  if (!apiKey) {
    const { data } = await supabase.from('settings').select('gemini_api_key').maybeSingle();
    apiKey = data?.gemini_api_key;
  }

  if (!apiKey) throw new Error('กรุณาตั้งค่า Gemini API Key ในหน้าตั้งค่าระบบก่อนใช้งาน AI');

  const keys = getApiKeyList(apiKey);
  if (keys.length === 0) throw new Error('กรุณาตั้งค่า Gemini API Key ในหน้าตั้งค่าระบบก่อนใช้งาน AI');

  let modelsToTry = await getAvailableModels(apiKey);
  if (modelsToTry.length === 0) {
    modelsToTry = [
      "gemini-3.1-flash-lite",
      "gemini-3.5-flash",
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash"
    ];
  }

  const apiVersions = ["v1beta", "v1"];
  const maxAttempts = 3;
  let lastError: any = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const currentKey = keys[(attempt + Math.floor(Math.random() * keys.length)) % keys.length];

    for (const modelName of modelsToTry) {
      for (const version of apiVersions) {
        try {
          const url = `https://generativelanguage.googleapis.com/${version}/models/${modelName}:generateContent?key=${currentKey}`;

          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
              }
            })
          });

          const data = await response.json();
          if (response.ok) {
            return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
          } else {
            lastError = data.error || { message: `HTTP ${response.status}` };
          }
        } catch (err) {
          lastError = err;
        }
      }
    }
    if (attempt < maxAttempts - 1) {
      await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
    }
  }

  const errorMsg = lastError?.message || lastError || "Unknown error";
  throw new Error(`AI ไม่สามารถร่างข้อความได้ในขณะนี้: ${errorMsg}`);
}

export async function generateEmbedding(
  text: string,
  apiKey: string,
  retries = 5,
  delay = 2000
): Promise<number[]> {
  const targetModel = "models/gemini-embedding-2";
  const versions = ['v1beta', 'v1'];
  const keys = getApiKeyList(apiKey);
  if (keys.length === 0) throw new Error("กรุณาตั้งค่า Gemini API Key");
  let lastError = "";

  for (let attempt = 0; attempt < retries; attempt++) {
    // หมุนเวียนคีย์ตามความพยายามเพื่อหลีกเลี่ยง Rate Limit
    const currentKey = keys[(attempt + Math.floor(Math.random() * keys.length)) % keys.length];

    for (const version of versions) {
      try {
        const url = `https://generativelanguage.googleapis.com/${version}/${targetModel}:embedContent?key=${currentKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: targetModel,
            content: { parts: [{ text }] }
          })
        });

        const data = await response.json();
        if (response.ok) {
          return data.embedding?.values || [];
        }

        lastError = data.error?.message || 'Unknown error';

        const isRateLimit = response.status === 429 ||
          lastError.toLowerCase().includes('quota') ||
          lastError.toLowerCase().includes('rate limit') ||
          lastError.toLowerCase().includes('resource');

        if (isRateLimit && attempt < retries - 1) {
          console.warn(`Rate limit on embedding. Retrying with next key in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 1.5;
          break; // Break the version loop to start next retry attempt
        }
      } catch (err: any) {
        lastError = err.message || String(err);
      }
    }
  }

  console.error('Embedding error after retries:', lastError);
  throw new Error(`ไม่พบโมเดลสร้างความรู้ที่รองรับ: ${lastError}`);
}

export async function processDocumentToKnowledge(
  pdfBuffer: ArrayBuffer,
  fileName: string,
  apiKey: string,
  onProgress?: (current: number, total: number) => void
) {
  const bufferCopy = pdfBuffer.slice(0);
  const loadingTask = pdfjsLib.getDocument({ data: bufferCopy });
  const pdf = await loadingTask.promise;
  const totalPages = pdf.numPages;

  const chunks = [];
  const chunkSize = 1000;
  const chunkOverlap = 200;

  // 1. สกัดข้อความและแบ่ง Chunk
  for (let i = 1; i <= totalPages; i++) {
    try {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');

      let start = 0;
      while (start < pageText.length) {
        const end = start + chunkSize;
        const text = pageText.substring(start, end).trim();
        if (text.length > 10) {
          chunks.push({ text, page_number: i });
        }
        start += (chunkSize - chunkOverlap);
      }
      if (onProgress) onProgress(i, totalPages);
    } catch (e) {
      console.warn(`Error reading page ${i}:`, e);
    }
  }

  // Fallback: หากไม่พบข้อความ (อาจเป็นไฟล์สแกน) ให้ใช้ Gemini OCR แบบทีละหน้า
  if (chunks.length === 0) {
    try {
      // 1. ค้นหาโมเดล Vision ที่รองรับจริง (อัปเดตให้รองรับรุ่นใหม่)
      let visionModel = "gemini-2.0-flash";
      try {
        const models = await getAvailableModels(apiKey);
        const found = models.find(name => name.includes('gemini-2.0-flash') || name.includes('gemini-1.5-flash'));
        if (found) visionModel = found;
      } catch (e) {
        console.warn("OCR: Failed to list models, using default...");
      }

      const keys = getApiKeyList(apiKey);
      if (keys.length === 0) throw new Error("กรุณาตั้งค่า Gemini API Key");


      const apiVersions = ["v1beta", "v1"];

      for (let p = 1; p <= totalPages; p++) {
        let successPage = false;
        let retryCount = 0;
        const maxRetries = Math.max(5, keys.length * 2);


        if (p > 1) await new Promise(r => setTimeout(r, 5000));

        while (!successPage && retryCount < maxRetries) {
          try {
            const page = await pdf.getPage(p);
            const viewport = page.getViewport({ scale: 1.0 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context!, viewport, canvas }).promise;
            const base64Image = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];

            let pageResponseText = "";
            let pageSuccess = false;
            let lastPageError = "";

            // หมุนเวียนคีย์ในแต่ละรอบความพยายามของหน้าปัจจุบัน
            const currentKey = keys[(retryCount + p - 1) % keys.length];

            for (const version of apiVersions) {
              if (pageSuccess) break;
              try {
                const url = `https://generativelanguage.googleapis.com/${version}/models/${visionModel}:generateContent?key=${currentKey}`;
                const response = await fetch(url, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    contents: [{
                      parts: [
                        { inline_data: { mime_type: "image/jpeg", data: base64Image } },
                        { text: `จงสกัดข้อความภาษาไทยทั้งหมดจากรูปภาพหน้านี้ (หน้า ${p}) ออกมาเป็น Plain Text ห้ามสรุปความ` }
                      ]
                    }]
                  })
                });

                const resData = await response.json();
                if (response.ok) {
                  pageResponseText = resData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
                  pageSuccess = true;
                } else {
                  lastPageError = resData.error?.message || `HTTP ${response.status}`;
                  if (response.status === 429) {
                    throw new Error('429');
                  }
                }
              } catch (e: any) {
                lastPageError = e.message || String(e);
                if (e.message === '429') throw e;
              }
            }

            if (pageSuccess && pageResponseText.length > 5) {
              let start = 0;
              while (start < pageResponseText.length) {
                const end = start + chunkSize;
                const chunk = pageResponseText.substring(start, end).trim();
                if (chunk.length > 5) {
                  chunks.push({ text: chunk, page_number: p });
                }
                start += (chunkSize - chunkOverlap);
              }
              successPage = true;
            } else {
              throw new Error(lastPageError || "ไม่สามารถสกัดข้อความจากภาพได้");
            }
          } catch (err: any) {
            retryCount++;
            if (retryCount >= maxRetries) throw err;
            if (err.message === '429') {
              const backoffDelay = Math.min(60000, 3000 * Math.pow(2, retryCount - 1) + Math.random() * 1000);
              if (keys.length > 1) {
                console.warn(`OCR: Rate limit 429 hit. Swapping key. Retrying page ${p} in ${Math.round(backoffDelay / 1000)}s (Attempt ${retryCount}/${maxRetries})...`);
                await new Promise(r => setTimeout(r, backoffDelay));
              } else {
                console.warn(`OCR: Rate limit 429 hit. Retrying page ${p} in 60s...`);
                await new Promise(r => setTimeout(r, 60000));
              }
            } else {
              await new Promise(r => setTimeout(r, 3000));
            }
          }
        }
        if (onProgress) onProgress(p, totalPages);
      }
    } catch (ocrErr: any) {
      console.error('OCR Fallback failed:', ocrErr);
      throw new Error(`ระบบ OCR ขัดข้อง: ${ocrErr.message}`);
    }
  }

  if (chunks.length === 0) throw new Error('ไม่พบเนื้อหาที่เป็นข้อความในไฟล์นี้');

  // 2. ดึง User ครั้งเดียว
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('กรุณาเข้าสู่ระบบก่อนดำเนินการ');

  // 3. บันทึก
  const batchSize = 2;
  let successCount = 0;
  let lastError = "";

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const promises = batch.map(async (chunk) => {
      try {
        const embedding = await generateEmbedding(chunk.text, apiKey);
        const { error } = await supabase.from('school_knowledge').insert([{
          document_name: fileName,
          page_number: chunk.page_number,
          chunk_text: chunk.text,
          embedding: embedding,
          created_by: user.id
        }]);
        if (!error) successCount++;
        else lastError = error.message;
      } catch (err: any) { lastError = err.message; }
    });
    await Promise.all(promises);
    await new Promise(r => setTimeout(r, 1000));
  }

  if (successCount === 0) throw new Error(`ไม่สามารถจดจำข้อมูลได้: ${lastError}`);
  return successCount;
}

export async function searchKnowledge(query: string, apiKey: string, limit: number = 10) {
  try {
    // 1. ค้นหาแบบ Vector (Semantic Search)
    const queryEmbedding = await generateEmbedding(query, apiKey);
    const { data: vectorMatches } = await supabase.rpc('match_knowledge', {
      query_embedding: queryEmbedding,
      match_threshold: 0.15,
      match_count: limit
    });

    // 2. ค้นหาแบบ Keyword (ปรับปรุงให้รองรับ slashes/underscores)
    // แปลง "159/20" เป็น ["159/20", "159", "20", "159_20"] เพื่อครอบคลุมทุกโอกาส
    const rawKeywords = query.split(/[\s,，.、?？!！]+/g).filter(w => w.length >= 2);
    const keywords = new Set<string>(rawKeywords);

    rawKeywords.forEach(kw => {
      if (kw.includes('/')) {
        keywords.add(kw.replace(/\//g, '_'));
        keywords.add(kw.split('/')[0]);
      }
      if (kw.includes('_')) {
        keywords.add(kw.replace(/_/g, '/'));
      }
    });

    let textMatches: any[] = [];
    if (keywords.size > 0) {
      const kwArray = Array.from(keywords);
      const orFilters = kwArray.map(kw => `chunk_text.ilike.%${kw}%,document_name.ilike.%${kw}%`).join(',');
      const { data } = await supabase
        .from('school_knowledge')
        .select('id, document_name, page_number, chunk_text')
        .or(orFilters)
        .limit(limit);
      textMatches = data || [];
    }


    const combined = [...(vectorMatches || []), ...textMatches.map(tm => ({ ...tm, similarity: 0.95 }))];
    const unique = combined.filter((v, i, a) => a.findIndex(t => (t.chunk_text === v.chunk_text)) === i);

    return unique.sort((a, b) => (b.similarity || 0) - (a.similarity || 0)).slice(0, limit);

  } catch (err) {
    console.error('Knowledge search error:', err);
    return [];
  }
}

export async function extractTextFromImage(imageBuffer: ArrayBuffer, apiKey: string): Promise<string> {
  try {
    const base64Image = toBase64(imageBuffer);
    const keys = getApiKeyList(apiKey);
    if (keys.length === 0) throw new Error("กรุณาตั้งค่า Gemini API Key");

    const maxAttempts = 3;
    let lastError: any = null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const currentKey = keys[(attempt + Math.floor(Math.random() * keys.length)) % keys.length];
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${currentKey}`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { inline_data: { mime_type: "image/jpeg", data: base64Image } },
                { text: "สกัดข้อความทั้งหมดจากภาพนี้ออกมาเป็นข้อความธรรมดา (Plain Text) หากเป็นหนังสือราชการให้คงรูปแบบลำดับเนื้อหาไว้" }
              ]
            }]
          })
        });

        const data = await response.json();
        if (response.ok) {
          return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        } else {
          lastError = data.error?.message || `HTTP ${response.status}`;
        }
      } catch (err) {
        lastError = err;
      }
      if (attempt < maxAttempts - 1) {
        await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
      }
    }
    console.error('Image OCR error:', lastError);
    return "";
  } catch (err) {
    console.error('Image OCR overall error:', err);
    return "";
  }
}

export async function processPrivateDocumentToKnowledge(
  pdfBuffer: ArrayBuffer,
  fileName: string,
  fileId: string,
  teacherId: string,
  apiKey: string,
  onProgress?: (current: number, total: number) => void
): Promise<number> {
  const bufferCopy = pdfBuffer.slice(0);
  const loadingTask = pdfjsLib.getDocument({ data: bufferCopy });
  const pdf = await loadingTask.promise;
  const totalPages = pdf.numPages;

  const chunks = [];
  const chunkSize = 1000;
  const chunkOverlap = 200;

  // 1. สกัดข้อความและแบ่ง Chunk
  for (let i = 1; i <= totalPages; i++) {
    try {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');

      let start = 0;
      while (start < pageText.length) {
        const end = start + chunkSize;
        const text = pageText.substring(start, end).trim();
        if (text.length > 10) {
          chunks.push({ text, page_number: i });
        }
        start += (chunkSize - chunkOverlap);
      }
      if (onProgress) onProgress(i, totalPages);
    } catch (e) {
      console.warn(`Private: Error reading page ${i}:`, e);
    }
  }

  // Fallback OCR (หากไม่พบข้อความดึงออกมาเลย เช่น สแกน PDF)
  if (chunks.length === 0) {
    try {
      let visionModel = "gemini-2.0-flash";
      try {
        const models = await getAvailableModels(apiKey);
        const found = models.find(name => name.includes('gemini-2.0-flash') || name.includes('gemini-1.5-flash'));
        if (found) visionModel = found;
      } catch (e) {
        console.warn("Private OCR: Failed to list models, using default...");
      }

      const keys = getApiKeyList(apiKey);
      if (keys.length === 0) throw new Error("กรุณาตั้งค่า Gemini API Key");

      const apiVersions = ["v1beta", "v1"];
      for (let p = 1; p <= totalPages; p++) {
        let successPage = false;
        let retryCount = 0;
        const maxRetries = Math.max(5, keys.length * 2);

        if (p > 1) await new Promise(r => setTimeout(r, 5000));

        while (!successPage && retryCount < maxRetries) {
          try {
            const page = await pdf.getPage(p);
            const viewport = page.getViewport({ scale: 1.0 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context!, viewport, canvas }).promise;
            const base64Image = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];

            let pageResponseText = "";
            let pageSuccess = false;
            let lastPageError = "";

            // หมุนเวียนคีย์ในแต่ละรอบความพยายามของหน้าปัจจุบัน
            const currentKey = keys[(retryCount + p - 1) % keys.length];

            for (const version of apiVersions) {
              if (pageSuccess) break;
              try {
                const url = `https://generativelanguage.googleapis.com/${version}/models/${visionModel}:generateContent?key=${currentKey}`;
                const response = await fetch(url, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    contents: [{
                      parts: [
                        { inline_data: { mime_type: "image/jpeg", data: base64Image } },
                        { text: `จงสกัดข้อความภาษาไทยทั้งหมดจากรูปภาพหน้านี้ (หน้า ${p}) ออกมาเป็น Plain Text ห้ามสรุปความ` }
                      ]
                    }]
                  })
                });

                const resData = await response.json();
                if (response.ok) {
                  pageResponseText = resData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
                  pageSuccess = true;
                } else {
                  lastPageError = resData.error?.message || `HTTP ${response.status}`;
                  if (response.status === 429) {
                    throw new Error('429');
                  }
                }
              } catch (e: any) {
                lastPageError = e.message || String(e);
                if (e.message === '429') throw e;
              }
            }

            if (pageSuccess && pageResponseText.length > 5) {
              let start = 0;
              while (start < pageResponseText.length) {
                const end = start + chunkSize;
                const chunk = pageResponseText.substring(start, end).trim();
                if (chunk.length > 5) {
                  chunks.push({ text: chunk, page_number: p });
                }
                start += (chunkSize - chunkOverlap);
              }
              successPage = true;
            } else {
              throw new Error(lastPageError || "ไม่สามารถสกัดข้อความจากภาพได้");
            }
          } catch (err: any) {
            retryCount++;
            if (retryCount >= maxRetries) throw err;
            if (err.message === '429') {
              const backoffDelay = Math.min(60000, 3000 * Math.pow(2, retryCount - 1) + Math.random() * 1000);
              if (keys.length > 1) {
                console.warn(`Private OCR: Rate limit 429 hit. Swapping key. Retrying page ${p} in ${Math.round(backoffDelay / 1000)}s (Attempt ${retryCount}/${maxRetries})...`);
                await new Promise(r => setTimeout(r, backoffDelay));
              } else {
                console.warn(`Private OCR: Rate limit 429 hit. Retrying page ${p} in 60s...`);
                await new Promise(r => setTimeout(r, 60000));
              }
            } else {
              await new Promise(r => setTimeout(r, 3000));
            }
          }
        }
        if (onProgress) onProgress(p, totalPages);
      }
    } catch (ocrErr: any) {
      console.error('Private OCR Fallback failed:', ocrErr);
      throw new Error(`ระบบ OCR ขัดข้อง: ${ocrErr.message}`);
    }
  }

  if (chunks.length === 0) throw new Error('ไม่พบเนื้อหาที่เป็นข้อความในไฟล์ส่วนตัวนี้');

  // 2. บันทึกลงตาราง ai_private_knowledge_chunks
  const batchSize = 2;
  let successCount = 0;
  let lastError = "";

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const promises = batch.map(async (chunk) => {
      try {
        const embedding = await generateEmbedding(chunk.text, apiKey);
        const { error } = await supabase.from('ai_private_knowledge_chunks').insert([{
          file_id: fileId,
          teacher_id: teacherId,
          page_number: chunk.page_number,
          chunk_text: chunk.text,
          embedding: embedding
        }]);
        if (!error) successCount++;
        else lastError = error.message;
      } catch (err: any) {
        lastError = err.message;
      }
    });
    await Promise.all(promises);
    await new Promise(r => setTimeout(r, 1000));
  }

  if (successCount === 0) throw new Error(`ไม่สามารถจดจำข้อมูลคลังส่วนตัวได้: ${lastError}`);
  return successCount;
}

export async function searchPrivateKnowledge(
  query: string,
  teacherId: string,
  apiKey: string,
  limit: number = 10
) {
  try {

    const { data: fileList } = await supabase
      .from('ai_knowledge_base')
      .select('id, file_name')
      .eq('teacher_id', teacherId);
    const fileMap = new Map(fileList?.map(f => [f.id, f.file_name]) || []);


    const queryEmbedding = await generateEmbedding(query, apiKey);
    const { data: vectorMatches, error: rpcErr } = await supabase.rpc('match_private_knowledge', {
      query_embedding: queryEmbedding,
      match_threshold: 0.15,
      match_count: limit,
      p_teacher_id: teacherId
    });

    if (rpcErr) {
      console.error('match_private_knowledge RPC Error:', rpcErr.message);
    }


    const rawKeywords = query.split(/[\s,，.、?？!！]+/g).filter(w => w.length >= 2);
    const keywords = new Set<string>(rawKeywords);

    rawKeywords.forEach(kw => {
      if (kw.includes('/')) {
        keywords.add(kw.replace(/\//g, '_'));
        keywords.add(kw.split('/')[0]);
      }
      if (kw.includes('_')) {
        keywords.add(kw.replace(/_/g, '/'));
      }
    });

    let textMatches: any[] = [];
    if (keywords.size > 0) {
      const kwArray = Array.from(keywords);
      const orFilters = kwArray.map(kw => `chunk_text.ilike.%${kw}%`).join(',');
      const { data, error: kwErr } = await supabase
        .from('ai_private_knowledge_chunks')
        .select('id, file_id, page_number, chunk_text')
        .eq('teacher_id', teacherId)
        .or(orFilters)
        .limit(limit);

      if (kwErr) {
        console.error('Private Keyword Search Error:', kwErr.message);
      }
      textMatches = data || [];
    }


    const combined = [
      ...(vectorMatches || []).map((vm: any) => ({
        id: vm.id,
        file_id: vm.file_id,
        document_name: fileMap.get(vm.file_id) || 'ไฟล์ส่วนตัว',
        page_number: vm.page_number,
        chunk_text: vm.chunk_text,
        similarity: vm.similarity
      })),
      ...textMatches.map(tm => ({
        id: tm.id,
        file_id: tm.file_id,
        document_name: fileMap.get(tm.file_id) || 'ไฟล์ส่วนตัว',
        page_number: tm.page_number,
        chunk_text: tm.chunk_text,
        similarity: 0.95
      }))
    ];

    const unique = combined.filter((v, i, a) => a.findIndex(t => t.chunk_text === v.chunk_text) === i);

    return unique.sort((a, b) => (b.similarity || 0) - (a.similarity || 0)).slice(0, limit);
  } catch (err) {
    console.error('Private Knowledge search error:', err);
    return [];
  }
}
````

## File: src/lib/arService.ts
````typescript
import { supabase, getActiveSchoolProfile } from './supabase';

export interface ARStep {
  id: string;
  lesson_id?: string;
  step_order: number;
  step_text: string;
  emoji: string;
}

export interface ARLesson {
  id: string;
  school_id: string;
  created_by: string;
  title: string;
  description: string;
  is_public: boolean;
  created_at?: string;
  steps: ARStep[];
  slotsCount?: number;
}

const LOCAL_STORAGE_KEY = 'ar_lessons_local';

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


const DEFAULT_LESSONS: ARLesson[] = [
  {
    id: 'd1111111-1111-1111-1111-111111111111',
    school_id: 'school_default',
    created_by: 'teacher_default',
    title: 'การตื่นนอนตอนเช้า ⏰',
    description: 'เรียงลำดับขั้นตอนการแก้ปัญหาการตื่นนอนให้เรียบร้อย',
    is_public: true,
    steps: [
      { id: 'f1111111-1111-1111-1111-111111111111', step_order: 1, step_text: 'ลืมตาตื่นนอน', emoji: '👀' },
      { id: 'f1111111-2222-1111-1111-111111111111', step_order: 2, step_text: 'พับผ้าห่มและจัดเตียง', emoji: '🛏️' },
      { id: 'f1111111-3333-1111-1111-111111111111', step_order: 3, step_text: 'ไปล้างหน้าและแปรงฟัน', emoji: '🧼' }
    ]
  },
  {
    id: 'd2222222-2222-2222-2222-222222222222',
    school_id: 'school_default',
    created_by: 'teacher_default',
    title: 'ขั้นตอนการแปรงฟัน 🪥',
    description: 'เรียงลำดับขั้นตอนการแปรงฟันให้ปากสะอาดสดชื่น',
    is_public: true,
    steps: [
      { id: 'f2222222-1111-2222-2222-222222222222', step_order: 1, step_text: 'บีบยาสีฟันใส่แปรง', emoji: '🧴' },
      { id: 'f2222222-2222-2222-2222-222222222222', step_order: 2, step_text: 'แปรงฟันให้ทั่วทุกซี่', emoji: '🦷' },
      { id: 'f2222222-3333-2222-2222-222222222222', step_order: 3, step_text: 'บ้วนปากด้วยน้ำสะอาด', emoji: '💧' }
    ]
  },
  {
    id: 'd3333333-3333-3333-3333-333333333333',
    school_id: 'school_default',
    created_by: 'teacher_default',
    title: 'เรียงตัวเลขจากน้อยไปมาก 🔢',
    description: 'เรียงลำดับขั้นตอนตามกระบวนการคิดในการเรียงลำดับตัวเลขจากน้อยไปหามาก',
    is_public: true,
    steps: [
      { id: 'f3333333-1111-3333-3333-333333333333', step_order: 1, step_text: 'เปรียบเทียบค่าตัวเลขทั้งหมด', emoji: '🔍' },
      { id: 'f3333333-2222-3333-3333-333333333333', step_order: 2, step_text: 'หาตัวเลขที่มีค่าน้อยที่สุด', emoji: '⬇️' },
      { id: 'f3333333-3333-3333-3333-333333333333', step_order: 3, step_text: 'เขียนตัวเลขจากน้อยไปหามาก', emoji: '✍️' },
      { id: 'f3333333-4444-3333-3333-333333333333', step_order: 4, step_text: 'ตรวจสอบความถูกต้องอีกครั้ง', emoji: '✅' }
    ]
  }
];




function getCurrentSchoolId(): string {
  const profile = getActiveSchoolProfile();
  return profile?.id || 'school_default';
}




export async function getARLessons(teacherId?: string): Promise<ARLesson[]> {
  const schoolId = getCurrentSchoolId();

  try {

    const { data: lessons, error: lessonsError } = await supabase
      .from('ar_lessons')
      .select('*')
      .or(`school_id.eq.${schoolId},is_public.eq.true`);

    if (!lessonsError && lessons) {

      const lessonIds = lessons.map(l => l.id);
      if (lessonIds.length > 0) {
        const { data: steps, error: stepsError } = await supabase
          .from('ar_steps')
          .select('*')
          .in('lesson_id', lessonIds)
          .order('step_order', { ascending: true });

        if (!stepsError && steps) {

          return lessons.map(lesson => {
            const lessonSteps = steps
              .filter(s => s.lesson_id === lesson.id)
              .map(s => ({
                id: s.id,
                lesson_id: s.lesson_id,
                step_order: s.step_order,
                step_text: s.step_text,
                emoji: s.emoji
              }));

            return {
              ...lesson,
              steps: lessonSteps,
              slotsCount: lessonSteps.length
            };
          });
        }
      } else {
        return [];
      }
    }
  } catch (e) {
    console.warn('Supabase not available or tables missing, falling back to LocalStorage:', e);
  }


  try {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    let lessons: ARLesson[] = localData ? JSON.parse(localData) : [];


    let hasNewDefault = false;
    DEFAULT_LESSONS.forEach(defLesson => {
      if (!lessons.some(l => l.id === defLesson.id)) {
        lessons.push(defLesson);
        hasNewDefault = true;
      }
    });

    if (hasNewDefault || lessons.length === 0) {
      if (lessons.length === 0) {
        lessons = [...DEFAULT_LESSONS];
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lessons));
    }


    const filtered = lessons.filter(l => l.school_id === schoolId || l.is_public);

    return filtered.map(l => ({
      ...l,
      slotsCount: l.steps.length
    }));
  } catch (e) {
    console.error('Error reading localStorage:', e);
  }


  return DEFAULT_LESSONS;
}




export async function saveARLesson(lesson: Omit<ARLesson, 'school_id' | 'created_at'> & { school_id?: string }, teacherId: string): Promise<boolean> {
  const schoolId = lesson.school_id || getCurrentSchoolId();


  const isLessonUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(lesson.id);
  const lessonUUID = isLessonUUID ? lesson.id : generateUUID();

  const fullLesson: ARLesson = {
    ...lesson,
    id: lessonUUID,
    school_id: schoolId,
    created_by: lesson.created_by || teacherId || 'teacher_default',
    slotsCount: lesson.steps.length
  };


  try {

    const { error: lessonError } = await supabase
      .from('ar_lessons')
      .upsert({
        id: fullLesson.id,
        school_id: fullLesson.school_id,
        created_by: fullLesson.created_by,
        title: fullLesson.title,
        description: fullLesson.description,
        is_public: fullLesson.is_public
      });

    if (!lessonError) {

      await supabase
        .from('ar_steps')
        .delete()
        .eq('lesson_id', fullLesson.id);


      const stepsToInsert = fullLesson.steps.map(s => {
        const isStepUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s.id);
        return {
          id: isStepUUID ? s.id : generateUUID(),
          lesson_id: fullLesson.id,
          step_order: s.step_order,
          step_text: s.step_text,
          emoji: s.emoji
        };
      });

      const { error: stepsError } = await supabase
        .from('ar_steps')
        .insert(stepsToInsert);

      if (!stepsError) {
        console.log('Saved successfully to Supabase!');

        fullLesson.steps = stepsToInsert.map(s => ({
          id: s.id,
          lesson_id: s.lesson_id,
          step_order: s.step_order,
          step_text: s.step_text,
          emoji: s.emoji
        }));
        syncToLocalStorage(fullLesson);
        return true;
      } else {
        console.error('Error inserting steps to Supabase:', stepsError);
      }
    } else {
      console.error('Error upserting lesson to Supabase:', lessonError);
    }
  } catch (e) {
    console.warn('Failed to save to Supabase, saving locally:', e);
  }


  return syncToLocalStorage(fullLesson);
}




export async function deleteARLesson(lessonId: string): Promise<boolean> {

  try {
    const { error: stepsError } = await supabase
      .from('ar_steps')
      .delete()
      .eq('lesson_id', lessonId);

    const { error: lessonError } = await supabase
      .from('ar_lessons')
      .delete()
      .eq('id', lessonId);

    if (!lessonError && !stepsError) {
      console.log('Deleted successfully from Supabase!');
    }
  } catch (e) {
    console.warn('Failed to delete from Supabase, removing locally:', e);
  }


  try {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localData) {
      let lessons: ARLesson[] = JSON.parse(localData);
      lessons = lessons.filter(l => l.id !== lessonId);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lessons));
      return true;
    }
  } catch (e) {
    console.error('Error deleting from localStorage:', e);
  }
  return false;
}




function syncToLocalStorage(updatedLesson: ARLesson): boolean {
  try {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    let lessons: ARLesson[] = localData ? JSON.parse(localData) : [...DEFAULT_LESSONS];

    const index = lessons.findIndex(l => l.id === updatedLesson.id);
    if (index !== -1) {
      lessons[index] = updatedLesson;
    } else {
      lessons.push(updatedLesson);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lessons));
    return true;
  } catch (e) {
    console.error('Failed to sync to LocalStorage:', e);
    return false;
  }
}
````

## File: src/lib/lineNotify.ts
````typescript
import { supabase, getActiveSchoolProfile } from './supabase';

interface Attachment {
  label: string;
  url: string;
}

function getWebhookUrl(): string {
  let vercelBaseUrl = '';
  const isWebUrl = typeof window !== 'undefined' &&
                    window.location &&
                    window.location.origin &&
                    window.location.protocol.startsWith('http') &&
                    !window.location.origin.includes('localhost') &&
                    !window.location.origin.includes('127.0.0.1');

  if (isWebUrl) {
    vercelBaseUrl = window.location.origin;
  } else {
    const profile = getActiveSchoolProfile();
    vercelBaseUrl = profile?.vercelUrl || 'https://school-admin-psi.vercel.app';
  }

  if (!vercelBaseUrl || vercelBaseUrl.includes('localhost') || vercelBaseUrl.includes('127.0.0.1')) {
    vercelBaseUrl = 'https://school-admin-psi.vercel.app';
  }

  if (vercelBaseUrl && !vercelBaseUrl.startsWith('http://') && !vercelBaseUrl.startsWith('https://')) {
    vercelBaseUrl = `https://${vercelBaseUrl}`;
  }
  if (vercelBaseUrl.endsWith('/')) {
    vercelBaseUrl = vercelBaseUrl.slice(0, -1);
  }
  return `${vercelBaseUrl}/api/line-webhook`;
}





export async function sendLineNotification(message: string, specificToId?: string, attachments: Attachment[] = []) {
  try {
    const { data: settings } = await supabase
      .from('settings')
      .select('line_channel_access_token, line_group_id')
      .single();

    const channelAccessToken = settings?.line_channel_access_token || undefined;
    const groupId = settings?.line_group_id;

    const targetId = specificToId || groupId;
    if (!targetId) return;

    let payloadObj: any;

    if (attachments.length > 0) {

      payloadObj = {
        to: targetId,
        messages: [{
          type: "flex",
          altText: "แจ้งเตือนระบบสารบรรณ",
          contents: {
            type: "bubble",
            body: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: "📢 แจ้งเตือนระบบงาน",
                  weight: "bold",
                  color: "#1DB446",
                  size: "sm"
                },
                {
                  type: "text",
                  text: message.trim(),
                  margin: "md",
                  wrap: true,
                  weight: "bold",
                  size: "md",
                  color: "#333333"
                }
              ]
            },
            footer: {
              type: "box",
              layout: "vertical",
              spacing: "sm",
              contents: attachments.map(att => ({
                type: "button",
                style: "primary",
                height: "sm",
                color: att.label.includes('ต้นฉบับ') || att.label.includes('สั่งการ') ? "#1DB446" : "#007AFF",
                action: {
                  type: "uri",
                  label: att.label,
                  uri: att.url
                }
              }))
            }
          }
        }]
      };
    } else {

      payloadObj = {
        to: targetId,
        messages: [{ type: 'text', text: message }]
      };
    }

    const webhookUrl = getWebhookUrl();


    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payload: payloadObj,
        token: channelAccessToken
      })
    });

    let resData: any;
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        resData = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text.substring(0, 150) || "Empty Response");
      }
    } catch (parseErr: any) {
      throw new Error(`Server Response Error (URL: ${webhookUrl} | Status ${response.status}): ${parseErr.message}`);
    }

    if (!response.ok) {
      const detail = resData?.error?.message || resData?.message || JSON.stringify(resData);
      throw new Error(`Vercel Webhook Error (URL: ${webhookUrl}): ${response.status} - ${detail}`);
    }

    if (resData.success === false) {
      const detail = resData.error?.message || JSON.stringify(resData.error);
      throw new Error(`LINE API Error: ${detail}`);
    }
    return resData;

  } catch (error: any) {
    console.error('LINE Notification Error:', error);
    throw error;
  }
}

interface ActionItem {
  label: string;
  type: 'uri' | 'postback';
  uri?: string;
  data?: string;
  color?: string;
}




export async function sendInteractiveFlexMessage(
  specificToId: string | undefined,
  title: string,
  message: string,
  actions: ActionItem[] = []
) {
  try {
    const { data: settings } = await supabase
      .from('settings')
      .select('line_channel_access_token, line_group_id')
      .single();

    const channelAccessToken = settings?.line_channel_access_token || undefined;
    const groupId = settings?.line_group_id;

    const targetId = specificToId || groupId;
    if (!targetId) return;

    const payloadObj = {
      to: targetId,
      messages: [{
        type: "flex",
        altText: title,
        contents: {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: title,
                weight: "bold",
                color: "#9C27B0",
                size: "sm"
              },
              {
                type: "text",
                text: message.trim(),
                margin: "md",
                wrap: true,
                weight: "bold",
                size: "md",
                color: "#333333"
              }
            ]
          },
          footer: actions.length > 0 ? {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: actions.map(act => {
              if (act.type === 'uri' && !act.uri) return null;
              if (act.type === 'postback' && !act.data) return null;

              const buttonAction: any = {
                type: act.type,
                label: act.label
              };
              if (act.type === 'uri') {
                buttonAction.uri = act.uri;
              } else if (act.type === 'postback') {
                buttonAction.data = act.data;
              }
              return {
                type: "button",
                style: "primary",
                height: "sm",
                color: act.color || "#1DB446",
                action: buttonAction
              };
            }).filter(Boolean) as any[]
          } : undefined
        }
      }]
    };

    const webhookUrl = getWebhookUrl();

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payload: payloadObj,
        token: channelAccessToken
      })
    });

    let resData: any;
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        resData = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text.substring(0, 150) || "Empty Response");
      }
    } catch (parseErr: any) {
      throw new Error(`Server Response Error (URL: ${webhookUrl} | Status ${response.status}): ${parseErr.message}`);
    }

    if (!response.ok) {
      const detail = resData?.error?.message || resData?.message || JSON.stringify(resData);
      throw new Error(`Vercel Webhook Error (URL: ${webhookUrl}): ${response.status} - ${detail}`);
    }

    if (resData.success === false) {
      const detail = resData.error?.message || JSON.stringify(resData.error);
      throw new Error(`LINE API Error: ${detail}`);
    }
    return resData;

  } catch (error: any) {
    console.error('LINE Interactive Flex Error:', error);
    throw error;
  }
}

export interface CarouselItem {
  id: string;
  subject: string;
  from_agency: string;
  doc_number: string;
  file_url: string;
  attachment_urls?: string[];
}




export async function sendBulkFlexCarousel(
  specificToId: string | undefined,
  title: string,
  items: CarouselItem[]
) {
  try {
    const { data: settings } = await supabase
      .from('settings')
      .select('line_channel_access_token, line_group_id')
      .single();

    const channelAccessToken = settings?.line_channel_access_token || undefined;
    const groupId = settings?.line_group_id;

    const targetId = specificToId || groupId;
    if (!targetId) return;

    if (items.length === 0) return;

    const bubbles = items.map((item, index) => {
      let documentUrl = item.file_url || '';
      return {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: `📥 เสนอหนังสือรอเกษียณ (${index + 1}/${items.length})`,
              weight: "bold",
              color: "#9C27B0",
              size: "xs"
            },
            {
              type: "text",
              text: item.subject,
              weight: "bold",
              size: "sm",
              wrap: true,
              margin: "md",
              color: "#333333"
            },
            {
              type: "box",
              layout: "vertical",
              margin: "md",
              spacing: "xs",
              contents: [
                {
                  type: "text",
                  text: `จาก: ${item.from_agency}`,
                  size: "xxs",
                  color: "#666666",
                  wrap: true
                },
                {
                  type: "text",
                  text: `เลขรับ: ${item.doc_number}`,
                  size: "xxs",
                  color: "#666666"
                }
              ]
            }
          ]
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              style: "primary",
              height: "sm",
              color: "#007AFF",
              action: {
                type: "uri",
                label: "📄 ดูต้นฉบับหนังสือ",
                uri: documentUrl
              }
            },
            // ไฟล์แนบเพิ่มเติม (ถ้ามี)
            ...(Array.isArray(item.attachment_urls) ? item.attachment_urls.map((url, idx) => ({
              type: "button",
              style: "primary",
              height: "sm",
              color: "#3F51B5",
              action: {
                type: "uri",
                label: `📎 ไฟล์แนบที่ ${idx + 1}`,
                uri: url
              }
            })) : []),
            {
              type: "button",
              style: "primary",
              height: "sm",
              color: "#1DB446",
              action: {
                type: "postback",
                label: "✍️ เกษียณสั่งการ",
                data: `action=start_assign&id=${item.id}`
              }
            }
          ]
        }
      };
    });

    const payloadObj = {
      to: targetId,
      messages: [{
        type: "flex",
        altText: title,
        contents: {
          type: "carousel",
          contents: bubbles
        }
      }]
    };

    const webhookUrl = getWebhookUrl();

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payload: payloadObj,
        token: channelAccessToken
      })
    });

    let resData: any;
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        resData = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text.substring(0, 150) || "Empty Response");
      }
    } catch (parseErr: any) {
      throw new Error(`Server Response Error (URL: ${webhookUrl} | Status ${response.status}): ${parseErr.message}`);
    }

    if (!response.ok) {
      const detail = resData?.error?.message || resData?.message || JSON.stringify(resData);
      throw new Error(`Vercel Webhook Error (URL: ${webhookUrl}): ${response.status} - ${detail}`);
    }

    if (resData.success === false) {
      const detail = resData.error?.message || JSON.stringify(resData.error);
      throw new Error(`LINE API Error: ${detail}`);
    }
    return resData;

  } catch (error: any) {
    console.error('LINE Bulk Flex Carousel Error:', error);
    throw error;
  }
}
````

## File: src/lib/pdfService.ts
````typescript
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const THAI_NUMERALS = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];

export function toThaiNumerals(num: string | number): string {
  return num.toString().replace(/[0-9]/g, (digit) => THAI_NUMERALS[parseInt(digit)]);
}

export function formatThaiDate(dateStr: string): string {
  const date = new Date(dateStr);
  const d = date.getDate();
  const monthAbbr = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."][date.getMonth()];
  const y = date.getFullYear() + 543;
  return `${d}/${monthAbbr}/${y}`;
}




function wrapThaiText(text: string, maxWidth: number, font: any, fontSize: number) {
  if (!text) return [];


  const segmenter = new (Intl as any).Segmenter('th', { granularity: 'word' });
  const segments = segmenter.segment(text);

  const lines = [];
  let currentLine = '';

  for (const { segment } of segments) {
    const testLine = currentLine + segment;
    const lineWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (lineWidth > maxWidth && currentLine !== '') {
      lines.push(currentLine);
      currentLine = segment;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}

export async function applyDigitalStamps(
  pdfBuffer: ArrayBuffer,
  receiptData?: {
    docNumber: string;
    date: string;
    time: string;
    pageNumber?: number; // ระบุหน้าที่จะประทับเลขรับ/เสนอ
  },
  proposalData?: {
    summary: string;
    proposal: string;
    signer: string;
    date: string;
    signatureUrl?: string;
  },
  directorData?: {
    order: string;
    signer: string;
    date: string;
    position?: string;
    signatureUrl?: string;
    pageNumber?: number; // ระบุหน้าที่จะประทับคำสั่ง ผอ.
  }
) {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    pdfDoc.registerFontkit(fontkit);

    // ปรับ Path ฟอนต์ให้รองรับทั้ง Dev และ Production (Electron)
    let fontUrl = 'fonts/THSarabunNew.ttf';

    const fontBytes = await fetch(fontUrl)
      .then(res => res.ok ? res : fetch('/fonts/THSarabunNew.ttf'))
      .then(res => {
        if (!res.ok) throw new Error(`ไม่สามารถโหลดฟอนต์ได้จาก ${fontUrl}`);
        return res.arrayBuffer();
      });
    const customFont = await pdfDoc.embedFont(fontBytes);

    const pages = pdfDoc.getPages();
    const pageCount = pages.length;


    const getTargetPage = (requestedPage?: number) => {
      if (!requestedPage || requestedPage < 1) return pages[0];
      const index = Math.min(requestedPage - 1, pageCount - 1);
      return pages[index];
    };


    const stampColor = rgb(0.1, 0.2, 0.7);
    const fontSize = 15;
    const lineSpacing = 17;


    if (receiptData) {
      const targetPage = pages[0];
      const { width, height } = targetPage.getSize();
      const receiptBoxWidth = 140;
      const receiptBoxHeight = 60;
      const receiptX = width - receiptBoxWidth - 30;
      const receiptY = height - receiptBoxHeight - 30;

      targetPage.drawRectangle({
        x: receiptX,
        y: receiptY,
        width: receiptBoxWidth,
        height: receiptBoxHeight,
        borderColor: stampColor,
        borderWidth: 1,
      });

      targetPage.drawText(`เลขรับ: ${toThaiNumerals(receiptData.docNumber)}`, {
        x: receiptX + 10,
        y: receiptY + receiptBoxHeight - 18,
        size: fontSize,
        font: customFont,
        color: stampColor,
      });
      targetPage.drawText(`วันที่: ${toThaiNumerals(formatThaiDate(receiptData.date))}`, {
        x: receiptX + 10,
        y: receiptY + receiptBoxHeight - 18 - lineSpacing,
        size: fontSize,
        font: customFont,
        color: stampColor,
      });
      targetPage.drawText(`เวลา: ${toThaiNumerals(receiptData.time)}`, {
        x: receiptX + 10,
        y: receiptY + receiptBoxHeight - 18 - lineSpacing * 2,
        size: fontSize,
        font: customFont,
        color: stampColor,
      });
    }


    if (proposalData) {
      const targetPage = getTargetPage(receiptData?.pageNumber);
      const { width } = targetPage.getSize();
      const propX = 50;
      const propY = 140;
      const maxRetirementWidth = width / 2.3;

      targetPage.drawText(`เรียน ผู้อำนวยการโรงเรียน`, {
        x: propX,
        y: propY + 115,
        size: fontSize + 1,
        font: customFont,
        color: stampColor,
      });

      const summaryLines = wrapThaiText(proposalData.summary, maxRetirementWidth, customFont, fontSize);
      let currentY = propY + 98;
      for (const line of summaryLines) {
        targetPage.drawText(line, { x: propX + 10, y: currentY, size: fontSize, font: customFont, color: stampColor });
        currentY -= 18;
      }

      const proposalY = currentY - 5;
      targetPage.drawText(proposalData.proposal, {
        x: propX + 10,
        y: proposalY,
        size: fontSize,
        font: customFont,
        color: stampColor,
      });

      const signerY = proposalY - 35;

      targetPage.drawText(`(ลงชื่อ) ........................................`, { x: propX + 30, y: signerY, size: fontSize, font: customFont, color: stampColor });

      if (proposalData.signatureUrl) {
        try {
          const sigRes = await fetch(proposalData.signatureUrl);
          if (sigRes.ok) {
            const sigBytes = await sigRes.arrayBuffer();
            const isPng = proposalData.signatureUrl.toLowerCase().includes('.png');
            const sigImage = isPng ? await pdfDoc.embedPng(sigBytes) : await pdfDoc.embedJpg(sigBytes);
            const sigDims = sigImage.scale(0.45);
            targetPage.drawImage(sigImage, {
              x: propX + 85,
              y: signerY + 12,
              width: sigDims.width,
              height: sigDims.height,
            });
          }
        } catch (e) { console.error('Proposer sig error:', e); }
      }

      targetPage.drawText(`(${proposalData.signer})`, { x: propX + 55, y: signerY - 17, size: fontSize, font: customFont, color: stampColor });
      targetPage.drawText(`วันที่: ${toThaiNumerals(formatThaiDate(proposalData.date))}`, { x: propX + 60, y: signerY - 34, size: fontSize, font: customFont, color: stampColor });
    }


    if (directorData) {
      const targetPage = getTargetPage(directorData.pageNumber);
      const { width } = targetPage.getSize();
      const receiptBoxWidth = 140;
      const rightMargin = 30;
      const startX = width - receiptBoxWidth - rightMargin;
      const effectiveWidth = receiptBoxWidth;
      const dirY = 140;

      targetPage.drawText(`คำสั่ง / การปฏิบัติ`, {
        x: startX,
        y: dirY + 115,
        size: fontSize + 1,
        font: customFont,
        color: stampColor,
      });

      const orderLines = wrapThaiText(directorData.order, effectiveWidth, customFont, fontSize);
      let dCurrentY = dirY + 98;
      for (const line of orderLines) {
        targetPage.drawText(line, { x: startX, y: dCurrentY, size: fontSize, font: customFont, color: stampColor });
        dCurrentY -= 18;
      }

      const dirSignerY = dCurrentY - 35;

      if (directorData.signatureUrl) {
        try {
          const sigRes = await fetch(directorData.signatureUrl);
          if (sigRes.ok) {
            const sigBytes = await sigRes.arrayBuffer();
            const isPng = directorData.signatureUrl.toLowerCase().includes('.png') || directorData.signatureUrl.toLowerCase().includes('image/png');
            const sigImage = isPng ? await pdfDoc.embedPng(sigBytes) : await pdfDoc.embedJpg(sigBytes);
            const sigDims = sigImage.scale(0.50);
            targetPage.drawImage(sigImage, {
              x: startX + 60,
              y: dirSignerY + 10,
              width: sigDims.width,
              height: sigDims.height,
            });
          }
        } catch (imgErr) { console.error('Signature image embed error:', imgErr); }
      }

      targetPage.drawText(`(ลงชื่อ) ........................................`, { x: startX - 10, y: dirSignerY, size: fontSize, font: customFont, color: stampColor });
      targetPage.drawText(`(${directorData.signer})`, { x: startX + 15, y: dirSignerY - 17, size: fontSize, font: customFont, color: stampColor });

      if (directorData.position) {
        targetPage.drawText(`${directorData.position}`, { x: startX - 5, y: dirSignerY - 34, size: fontSize, font: customFont, color: stampColor });
      }

      targetPage.drawText(`วันที่: ${toThaiNumerals(formatThaiDate(directorData.date))}`, {
        x: startX + 20,
        y: dirSignerY - (directorData.position ? 51 : 34),
        size: fontSize,
        font: customFont,
        color: stampColor,
      });
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (err: any) {
    console.error('Digital Stamp error:', err);
    throw new Error('การประทับตราล้มเหลว: ' + err.message);
  }
}
````

## File: src/lib/storage.ts
````typescript
import { supabase, getActiveSchoolProfile } from './supabase';

function getGasUrl(): string {
  const profile = getActiveSchoolProfile();
  return profile?.gasUrl || import.meta.env.VITE_GAS_URL || 'https://script.google.com/macros/s/AKfycbw52uo8upPX6SiZ_W4dD9MUrocA3DkZm3XnE-eU4uE3vvOtOAK4VhXcLIf71PGVsvxj/exec';
}




export async function uploadToSupabase(file: File | Blob, bucket: string, path: string): Promise<string> {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: true
  });

  if (error) throw error;
  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return publicUrl;
}




export async function deleteFromSupabase(bucket: string, path: string): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) console.warn('Supabase delete error:', error);
}




export async function uploadFile(file: File, bucket: string, folder: string = ''): Promise<string> {
  return uploadFileToDrive(file, folder || bucket, file.name.split('.')[0]);
}

/**
 * Uploads a file to Google Drive via GAS with smart naming.
 */
export async function uploadFileToDrive(file: File, folder: string, customName: string): Promise<string> {
  try {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const fileExt = file.name.split('.').pop();
        const finalFilename = `${customName}.${fileExt}`;

        try {
          const response = await fetch(getGasUrl(), {
            method: 'POST',
            body: JSON.stringify({
              folder: folder,
              filename: finalFilename,
              mimeType: file.type,
              base64: base64
            })
          });

          const result = await response.json();
          if (result.status === 'success') {
            resolve(result.url);
          } else {
            reject(new Error(result.message || 'Upload failed'));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  } catch (err) {
    console.error('GAS Upload error:', err);
    throw err;
  }
}




export async function deleteFileFromDrive(fileUrl: string): Promise<boolean> {
  if (!fileUrl) return true;

  try {

    let fileId = fileUrl;
    const match = fileUrl.match(/[-\w]{25,}/);
    if (match) fileId = match[0];

    const response = await fetch(getGasUrl(), {
      method: 'POST',
      body: JSON.stringify({
        action: 'delete',
        fileId: fileId
      })
    });

    const result = await response.json();
    return result.status === 'success';
  } catch (err) {
    console.error('GAS Delete error:', err);
    return false;
  }
}
````

## File: src/main.tsx
````typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
````

## File: src/pages/ARLearning.tsx
````typescript
import { useState, useEffect, useRef } from 'react';
import { getARLessons, type ARLesson, type ARStep } from '../lib/arService';
import {
  ArrowLeft,
  RotateCcw,
  HelpCircle,
  Camera,
  VideoOff,
  Sparkles,
  Trophy,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface ARLearningProps {
  onBack?: () => void;
}

export default function ARLearning({ onBack }: ARLearningProps) {
  const [levels, setLevels] = useState<ARLesson[]>([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);


  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const aiLoadingRef = useRef<HTMLDivElement | null>(null);
  const cameraInstanceRef = useRef<any>(null);


  const [handDetected, setHandDetected] = useState(false);
  const [cameraStatus, setCameraStatus] = useState<'idle' | 'loading' | 'active' | 'error'>('idle');
  const [cameraErrorMsg, setCameraErrorMsg] = useState('');

  // Game physical references
  const cardsRef = useRef<any[]>([]);
  const slotsRef = useRef<any[]>([]);
  const activeHandRef = useRef({ x: 0, y: 0, isPinching: false, rawX: 0, rawY: 0 });
  const draggedCardRef = useRef<any>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const hoverTargetRef = useRef<any>(null);
  const cursorColorRef = useRef("rgb(6, 182, 212)");
  const cursorSymbolRef = useRef("");

  // Animation frames
  const requestRef = useRef<number | null>(null);
  const levelRef = useRef<number>(0);
  levelRef.current = currentLevelIndex;

  const levelsRef = useRef<ARLesson[]>([]);
  levelsRef.current = levels;

  useEffect(() => {
    // 1. Fetch Lessons Data
    async function loadLevels() {
      setLoading(true);
      try {
        const data = await getARLessons();
        setLevels(data);
      } catch (e) {
        console.error('Failed to load levels:', e);
      } finally {
        setLoading(false);
      }
    }
    loadLevels();

    return () => {
      stopCameraAndLoop();
    };
  }, []);

  // Initialize card positions for the current level
  useEffect(() => {
    if (levels.length === 0 || currentLevelIndex >= levels.length || !canvasRef.current) return;
    initLevelLayout(currentLevelIndex);
  }, [levels, currentLevelIndex, gameStarted]);

  function stopCameraAndLoop() {
    // Stop Animation Loop
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
    // Stop Camera
    if (cameraInstanceRef.current) {
      try {
        cameraInstanceRef.current.stop();
      } catch (e) {}
      cameraInstanceRef.current = null;
    }
    // Stop Video Track directly
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  }

  function initLevelLayout(targetIndex?: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const idx = targetIndex !== undefined ? targetIndex : currentLevelIndex;
    if (levels.length === 0 || idx >= levels.length) return;

    const level = levels[idx];
    const width = canvas.width;
    const height = canvas.height;

    // 1. Setup Slots (Target placement zone at the bottom)
    const slotsCount = level.steps.length;
    const slotWidth = Math.min(width * (0.8 / slotsCount), 170);
    const slotHeight = Math.min(height * 0.22, 130);
    const spacing = 16;
    const totalWidth = (slotWidth * slotsCount) + (spacing * (slotsCount - 1));
    const startX = (width - totalWidth) / 2;
    const slotY = height - slotHeight - 40;

    slotsRef.current = [];
    for (let i = 0; i < slotsCount; i++) {
      slotsRef.current.push({
        index: i + 1,
        x: startX + (i * (slotWidth + spacing)),
        y: slotY,
        width: slotWidth,
        height: slotHeight,
        filledCard: null
      });
    }

    // 2. Setup Cards (Floating elements at the top, shuffled)
    const cardWidth = slotWidth;
    const cardHeight = slotHeight;
    const shuffledSteps = [...level.steps].sort(() => Math.random() - 0.5);

    const poolY = 80;
    const stepX = (width - ((cardWidth * slotsCount) + (spacing * (slotsCount - 1)))) / 2;

    cardsRef.current = shuffledSteps.map((step, idx) => ({
      id: step.id,
      text: step.step_text,
      emoji: step.emoji,
      correctOrder: level.steps.findIndex(s => s.id === step.id) + 1,
      width: cardWidth,
      height: cardHeight,
      x: stepX + (idx * (cardWidth + spacing)),
      y: poolY,
      originX: stepX + (idx * (cardWidth + spacing)),
      originY: poolY,
      isDragging: false,
      placedInSlot: null
    }));
  }

  // --- Dynamic Loader for MediaPipe ---
  function loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.crossOrigin = 'anonymous';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  async function startARSystem() {
    setCameraStatus('loading');
    if (aiLoadingRef.current) aiLoadingRef.current.style.display = 'flex';

    try {

      let hasWebcam = false;
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          const devices = await navigator.mediaDevices.enumerateDevices();
          hasWebcam = devices.some(device => device.kind === 'videoinput');
        }
      } catch (e) {
        console.warn('Cannot query media devices, assuming no camera:', e);
      }

      if (!hasWebcam) {
        throw new Error('ไม่พบอุปกรณ์กล้องเว็บแคมเชื่อมต่อกับคอมพิวเตอร์ของคุณ');
      }


      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js');
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js');

      const win = window as any;
      if (!win.Hands || !win.Camera) {
        throw new Error('MediaPipe libraries did not initialize correctly.');
      }


      const handsObj = new win.Hands({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });

      handsObj.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      handsObj.onResults(onHandResults);


      if (videoRef.current) {
        cameraInstanceRef.current = new win.Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current) {
              await handsObj.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480
        });

        await cameraInstanceRef.current.start();
        setCameraStatus('active');


        if (aiLoadingRef.current) {
          aiLoadingRef.current.style.opacity = '0';
          setTimeout(() => {
            if (aiLoadingRef.current) aiLoadingRef.current.style.display = 'none';
          }, 500);
        }
      }
    } catch (err: any) {
      console.error('Failed to initialize AR system:', err);
      setCameraStatus('error');
      setCameraErrorMsg(err.message || 'ไม่สามารถเปิดกล้องได้');
      if (aiLoadingRef.current) {
        aiLoadingRef.current.style.display = 'none';
      }
    }


    if (!requestRef.current) {
      requestRef.current = requestAnimationFrame(drawLoop);
    }
  }


  function onHandResults(results: any) {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      setHandDetected(true);
      const landmarks = results.multiHandLandmarks[0];
      const canvas = canvasRef.current;
      if (!canvas) return;


      const rawX = landmarks[8].x;
      const rawY = landmarks[8].y;

      activeHandRef.current.x = (1 - rawX) * canvas.width;
      activeHandRef.current.y = rawY * canvas.height;
      activeHandRef.current.rawX = landmarks[8].x;
      activeHandRef.current.rawY = landmarks[8].y;


      const thumb = landmarks[4];
      const indexTip = landmarks[8];
      const dx = thumb.x - indexTip.x;
      const dy = thumb.y - indexTip.y;
      const distance = Math.sqrt(dx*dx + dy*dy);

      const pinchThreshold = 0.055;
      const isPinchingNow = distance < pinchThreshold;

      if (isPinchingNow && !activeHandRef.current.isPinching) {
        activeHandRef.current.isPinching = true;
        startPinch(activeHandRef.current.x, activeHandRef.current.y);
      } else if (!isPinchingNow && activeHandRef.current.isPinching) {
        activeHandRef.current.isPinching = false;
        releasePinch();
      }

      if (activeHandRef.current.isPinching && draggedCardRef.current) {
        draggedCardRef.current.x = activeHandRef.current.x - dragOffsetRef.current.x;
        draggedCardRef.current.y = activeHandRef.current.y - dragOffsetRef.current.y;
      }
    } else {
      setHandDetected(false);
      if (activeHandRef.current.isPinching) {
        activeHandRef.current.isPinching = false;
        releasePinch();
      }
    }
  }


  function startPinch(x: number, y: number) {
    let hit = false;
    const cards = cardsRef.current;

    for (let i = cards.length - 1; i >= 0; i--) {
      const card = cards[i];
      if (x >= card.x && x <= card.x + card.width &&
          y >= card.y && y <= card.y + card.height) {
        draggedCardRef.current = card;
        card.isDragging = true;
        dragOffsetRef.current.x = x - card.x;
        dragOffsetRef.current.y = y - card.y;

        if (card.placedInSlot) {
          card.placedInSlot.filledCard = null;
          card.placedInSlot = null;
        }
        hit = true;
        cursorColorRef.current = "rgb(34, 197, 94)";
        cursorSymbolRef.current = "✔️";
        break;
      }
    }

    if (!hit) {
      cursorColorRef.current = "rgb(239, 68, 68)";
      cursorSymbolRef.current = "❌";
      setTimeout(() => {
        if (!draggedCardRef.current && !activeHandRef.current.isPinching) {
          cursorSymbolRef.current = "";
        }
      }, 600);
    }
  }

  function releasePinch() {
    if (draggedCardRef.current) {
      draggedCardRef.current.isDragging = false;
      let placed = false;
      const card = draggedCardRef.current;
      const centerX = card.x + card.width / 2;
      const centerY = card.y + card.height / 2;

      for (let slot of slotsRef.current) {
        if (!slot.filledCard) {
          const slotCenterX = slot.x + slot.width / 2;
          const slotCenterY = slot.y + slot.height / 2;
          const distance = Math.sqrt(Math.pow(centerX - slotCenterX, 2) + Math.pow(centerY - slotCenterY, 2));

          if (distance < 90) {
            card.x = slot.x;
            card.y = slot.y;
            card.placedInSlot = slot;
            slot.filledCard = card;
            placed = true;
            break;
          }
        }
      }

      if (!placed) {
        card.x = card.originX;
        card.y = card.originY;
      }

      draggedCardRef.current = null;
      cursorSymbolRef.current = "";
      checkVictoryCondition();
    }
  }

  function checkVictoryCondition() {
    const slots = slotsRef.current;
    const allFilled = slots.every(slot => slot.filledCard !== null);
    if (!allFilled) return;

    const isCorrect = slots.every(slot => slot.filledCard.correctOrder === slot.index);

    if (isCorrect) {
      setScore(prev => prev + 100);

      // Level Cleared Green Flash Effect logic handled inside drawLoop
      // Wait a bit and transition to next level
      setTimeout(() => {
        const nextIdx = levelRef.current + 1;
        if (nextIdx < levels.length) {
          setCurrentLevelIndex(nextIdx);
        } else {
          // Finished the game!
          setGameFinished(true);
          stopCameraAndLoop();
        }
      }, 1200);
    } else {
      // Incorrect layout: Shake and return wrong cards
      setTimeout(() => {
        slots.forEach(slot => {
          if (slot.filledCard && slot.filledCard.correctOrder !== slot.index) {
            const card = slot.filledCard;
            card.x = card.originX;
            card.y = card.originY;
            card.placedInSlot = null;
            slot.filledCard = null;
          }
        });
      }, 800);
    }
  }

  // --- Rendering loop ---
  function drawLoop() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const video = videoRef.current;

    if (!canvas || !ctx) {
      requestRef.current = requestAnimationFrame(drawLoop);
      return;
    }

    // Clear Screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Mirror Video Image on background
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
      const vWidth = video.videoWidth;
      const vHeight = video.videoHeight;
      const cWidth = canvas.width;
      const cHeight = canvas.height;
      const vRatio = vWidth / vHeight;
      const cRatio = cWidth / cHeight;

      let sx, sy, sWidth, sHeight;
      if (cRatio > vRatio) {
        sWidth = vWidth;
        sHeight = vWidth / cRatio;
        sx = 0;
        sy = (vHeight - sHeight) / 2;
      } else {
        sHeight = vHeight;
        sWidth = vHeight * cRatio;
        sx = (vWidth - sWidth) / 2;
        sy = 0;
      }
      ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, cWidth, cHeight);
    } else {
      // Default Gradient if camera offline
      const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 50, canvas.width/2, canvas.height/2, canvas.width);
      grad.addColorStop(0, '#1e1b4b');
      grad.addColorStop(1, '#090d16');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.restore();

    // 2. Draw Target Slots
    slotsRef.current.forEach(slot => {
      ctx.save();
      ctx.fillStyle = "rgba(15, 23, 42, 0.5)";
      ctx.strokeStyle = "rgba(6, 182, 212, 0.3)";
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.roundRect(slot.x, slot.y, slot.width, slot.height, 20);
      ctx.fill();
      ctx.stroke();

      // Dotted inner outline
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.roundRect(slot.x + 8, slot.y + 8, slot.width - 16, slot.height - 16, 14);
      ctx.stroke();
      ctx.restore();

      // Slot Order Label / Translation Matcher
      const level = levelsRef.current[levelRef.current];
      const matchingStep = level?.steps[slot.index - 1];
      const hasTranslation = matchingStep ? (matchingStep.step_text.includes(':') || matchingStep.step_text.includes('：')) : false;
      const separator = matchingStep?.step_text.includes('：') ? '：' : ':';
      const slotLabel = hasTranslation ? matchingStep!.step_text.split(separator)[1].trim() : 'ขั้นตอนที่';

      if (hasTranslation) {
        // Render slot with target translation text in the center
        ctx.fillStyle = "rgba(6, 182, 212, 0.2)";
        ctx.beginPath();
        ctx.roundRect(slot.x + 8, slot.y + slot.height/2 - 20, slot.width - 16, 40, 10);
        ctx.fill();

        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.font = "bold 14px Sarabun";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(slotLabel, slot.x + slot.width/2, slot.y + slot.height/2);
      } else {

        ctx.fillStyle = "rgba(6, 182, 212, 0.85)";
        ctx.beginPath();
        ctx.arc(slot.x + slot.width/2, slot.y + slot.height - 22, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 13px Sarabun";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(slot.index), slot.x + slot.width/2, slot.y + slot.height - 22);

        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.font = "bold 11px Sarabun";
        ctx.fillText("ขั้นตอนที่", slot.x + slot.width/2, slot.y + 25);
      }
    });



    hoverTargetRef.current = null;
    const hx = activeHandRef.current.x;
    const hy = activeHandRef.current.y;
    cardsRef.current.forEach(card => {
      if (hx >= card.x && hx <= card.x + card.width &&
          hy >= card.y && hy <= card.y + card.height) {
        hoverTargetRef.current = card;
      }
    });

    cardsRef.current.forEach(card => {
      ctx.save();


      const shadowOffset = card.isDragging ? 8 : 4;
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.beginPath();
      ctx.roundRect(card.x + shadowOffset, card.y + shadowOffset, card.width, card.height, 20);
      ctx.fill();


      if (card.isDragging) {
        ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
        ctx.strokeStyle = "rgba(6, 182, 212, 1)";
        ctx.lineWidth = 3.5;
      } else if (hoverTargetRef.current === card) {
        ctx.fillStyle = "rgba(30, 41, 59, 0.95)";
        ctx.strokeStyle = "rgba(245, 158, 11, 0.9)";
        ctx.lineWidth = 2.5;
      } else {
        ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1.5;
      }

      ctx.beginPath();
      ctx.roundRect(card.x, card.y, card.width, card.height, 20);
      ctx.fill();
      ctx.stroke();


      ctx.font = "50px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(card.emoji, card.x + card.width / 2, card.y + card.height / 2 - 15);


      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px Sarabun";
      ctx.textAlign = "center";

      const hasCardTranslation = card.text.includes(':') || card.text.includes('：');
      const cardSeparator = card.text.includes('：') ? '：' : ':';
      const cardText = hasCardTranslation ? card.text.split(cardSeparator)[0].trim() : card.text;
      if (cardText.length > 14) {
        ctx.fillText(cardText.slice(0, 13) + "...", card.x + card.width / 2, card.y + card.height - 25);
      } else {
        ctx.fillText(cardText, card.x + card.width / 2, card.y + card.height - 25);
      }

      ctx.restore();
    });


    const isPinching = activeHandRef.current.isPinching;
    const cursorSymbol = cursorSymbolRef.current;


    if (handDetected || isMouseDown || hoverTargetRef.current) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(hx, hy, 18, 0, Math.PI * 2);

      if (isPinching) {
        ctx.strokeStyle = cursorColorRef.current;
        ctx.lineWidth = 3;
        ctx.stroke();
      } else if (hoverTargetRef.current) {
        ctx.strokeStyle = "rgb(245, 158, 11)";
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 2.5;
        ctx.stroke();
      } else {
        ctx.strokeStyle = "rgb(6, 182, 212)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(hx, hy, 5, 0, Math.PI * 2);
      ctx.fillStyle = isPinching ? cursorColorRef.current : "rgb(6, 182, 212)";
      ctx.fill();

      if (cursorSymbol) {
        ctx.font = "bold 15px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(cursorSymbol, hx + 22, hy - 22);
      }
      ctx.restore();
    }


    const allFilled = slotsRef.current.every(s => s.filledCard !== null);
    if (allFilled) {
      const isCorrect = slotsRef.current.every(s => s.filledCard.correctOrder === s.index);
      if (isCorrect) {
        ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    requestRef.current = requestAnimationFrame(drawLoop);
  }


  const [isMouseDown, setIsMouseDown] = useState(false);

  function getMouseCoords(e: any) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function handleMouseDown(e: any) {
    if (handDetected) return;
    setIsMouseDown(true);
    const coords = getMouseCoords(e);
    activeHandRef.current.x = coords.x;
    activeHandRef.current.y = coords.y;
    activeHandRef.current.isPinching = true;
    startPinch(coords.x, coords.y);
  }

  function handleMouseMove(e: any) {
    const coords = getMouseCoords(e);
    if (!handDetected) {
      activeHandRef.current.x = coords.x;
      activeHandRef.current.y = coords.y;
    }

    if (isMouseDown && draggedCardRef.current && !handDetected) {
      draggedCardRef.current.x = coords.x - dragOffsetRef.current.x;
      draggedCardRef.current.y = coords.y - dragOffsetRef.current.y;
    }
  }

  function handleMouseUp() {
    if (isMouseDown && !handDetected) {
      setIsMouseDown(false);
      activeHandRef.current.isPinching = false;
      releasePinch();
    }
  }


  function handleStartGame(index?: number) {
    const targetIdx = index !== undefined ? index : currentLevelIndex;
    if (index !== undefined) {
      setCurrentLevelIndex(index);
    }
    setGameStarted(true);

    setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.parentElement?.clientWidth || 640;
        canvas.height = canvas.parentElement?.clientHeight || 450;
        initLevelLayout(targetIdx);
      }
      startARSystem();
    }, 100);
  }


  function handleRestart() {
    setGameFinished(false);
    setCurrentLevelIndex(0);
    setScore(0);
    setTimeout(() => {
      handleStartGame(0);
    }, 100);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 flex flex-col justify-between select-none relative">
      <video id="webcam" ref={videoRef} className="hidden" autoPlay playsInline></video>

      {}
      <header className="relative z-10 w-full flex justify-between items-center bg-slate-900/40 backdrop-blur border border-white/10 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              stopCameraAndLoop();
              if (onBack) onBack();
            }}
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>
          <div>
            <h1 className="text-base md:text-lg font-black tracking-wide text-cyan-400">น้องชบาพาพิชิต (AR)</h1>
            <p className="text-[10px] text-slate-400">เกมส์เรียงลำดับแก้ปัญหาด้วยตรรกะอัลกอริทึม</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-slate-950/60 rounded-xl border border-cyan-500/25 text-center">
            <span className="text-[9px] block text-slate-500 uppercase font-bold">LEVEL</span>
            <span className="text-sm font-black text-cyan-300">
              {levels.length > 0 ? `${currentLevelIndex + 1} / ${levels.length}` : '-'}
            </span>
          </div>
          <div className="px-3.5 py-1.5 bg-slate-950/60 rounded-xl border border-amber-500/25 text-center">
            <span className="text-[9px] block text-slate-500 uppercase font-bold">SCORE</span>
            <span className="text-sm font-black text-amber-400">{score}</span>
          </div>
        </div>
      </header>

      {}
      <main className="flex-grow my-3 flex flex-col lg:flex-row gap-4 items-stretch relative overflow-hidden z-10">

        {}
        <div className="w-full lg:w-1/4 flex flex-col justify-between gap-4">

          {}
          <div className="bg-slate-900/40 backdrop-blur p-5 rounded-2xl flex-grow flex flex-col justify-center border-l-4 border-cyan-400 border border-white/10">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-1">ภารกิจของคุณ</span>
            <h2 className="text-lg md:text-xl font-extrabold text-white leading-relaxed">
              {levels.length > 0 ? levels[currentLevelIndex].title : 'กำลังโหลดภารกิจ...'}
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {levels.length > 0 ? levels[currentLevelIndex].description : 'ระบบกำลังดึงข้อมูลบทเรียน...'}
            </p>
          </div>

          {}
          <div className="bg-slate-900/40 backdrop-blur p-5 rounded-2xl border border-white/10 flex flex-col gap-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">สถานะระบบการควบคุม</h3>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${cameraStatus === 'active' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${cameraStatus === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                </span>
                เว็บแคม & การตรวจนิ้วมือ
              </span>
              <span className={`font-bold ${cameraStatus === 'active' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {cameraStatus === 'active' ? 'พร้อมใช้งาน' : cameraStatus === 'loading' ? 'กำลังเชื่อม...' : 'ออฟไลน์ (เมาส์แทน)'}
              </span>
            </div>

            <div className="text-[10px] text-slate-500 border-t border-white/5 pt-2 leading-relaxed">
              💡 <strong>วิธีควบคุมกล้อง:</strong> หันมือเข้าหากล้อง กางนิ้วเล็งวงกลมไปที่การ์ด จากนั้น <strong>จีบปลายนิ้วชี้และนิ้วโป้งชนกันเพื่อหยิบ</strong> และกางนิ้วออกเพื่อปล่อยวางลงในช่อง
            </div>
          </div>

        </div>

        {}
        <div className="flex-grow relative rounded-3xl overflow-hidden bg-slate-900/20 border border-white/10 flex items-center justify-center min-h-[400px]">

          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover z-10"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          ></canvas>

          {}
          <div
            ref={aiLoadingRef}
            className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/85 z-20 transition-opacity duration-500"
          >
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
            <p className="text-cyan-400 font-bold animate-pulse text-center px-4">
              กำลังเริ่มต้นระบบตรวจจับและเข้าถึงกล้องเว็บแคม...
            </p>
          </div>

          {}
          {!handDetected && gameStarted && cameraStatus === 'active' && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500/80 backdrop-blur text-slate-950 text-xs px-4 py-2 rounded-full font-bold z-30 shadow-lg animate-bounce flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              หามือไม่เจอ (แสดงมือของคุณหน้ากล้อง หรือใช้เมาส์คลิกลากการ์ดแทน)
            </div>
          )}

          {}
          {!gameStarted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 z-40">
              {loading ? (
                <div className="flex flex-col items-center justify-center">
                  <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-3" />
                  <p className="text-slate-400 text-xs">กำลังสแกนโครงสร้างบทเรียน...</p>
                </div>
              ) : (
                <div className="text-center p-6 max-w-lg bg-slate-900/60 backdrop-blur border border-white/10 rounded-3xl shadow-2xl mx-4 w-full md:w-[440px]">
                  <div className="text-5xl mb-3 animate-bounce">🤖🏆</div>
                  <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mb-1">
                    น้องชบาพาพิชิต (AR)
                  </h2>
                  <p className="text-slate-400 text-[11px] mb-4 leading-relaxed font-semibold">
                    เลือกบทเรียนที่ต้องการเพื่อเริ่มต้นฝึกฝนลำดับขั้นตอนการแก้ปัญหาเชิงตรรกะ!
                  </p>

                  {}
                  <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-1.5 text-left mb-2 custom-scrollbar">
                    {levels.map((level, idx) => (
                      <button
                        key={level.id}
                        onClick={() => handleStartGame(idx)}
                        className="w-full p-3.5 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/50 rounded-xl flex items-center justify-between transition cursor-pointer text-xs font-bold group"
                      >
                        <span className="truncate pr-2 text-slate-200 group-hover:text-cyan-300">🎮 {idx + 1}. {level.title}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded-full font-bold shrink-0">
                          {level.steps.length} ขั้นตอน
                        </span>
                      </button>
                    ))}
                  </div>

                  {levels.length === 0 && (
                    <p className="text-amber-400 text-xs py-3">⚠️ ยังไม่มีบทเรียนในระบบ กรุณาเข้าสู่ระบบคุณครูเพื่อสร้างบทเรียนก่อนนะคะ</p>
                  )}
                </div>
              )}
            </div>
          )}

          {}
          {gameFinished && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 z-40">
              <div className="text-center p-10 max-w-sm bg-slate-900/60 backdrop-blur border border-white/10 rounded-3xl shadow-2xl">
                <div className="text-7xl mb-4 animate-pulse">🏆🌟</div>
                <h2 className="text-3xl font-black text-emerald-400 mb-2">ALL CLEAR!</h2>
                <p className="text-slate-300 text-sm mb-5 leading-relaxed">คุณได้ฝึกคิดและแก้ไขปัญหาตามลำดับอัลกอริทึมครบทุกบทเรียนเรียบร้อยแล้ว</p>
                <div className="text-xl font-extrabold text-amber-400 mb-6">คะแนนรวมทั้งหมด: {score} คะแนน</div>
                <button
                  onClick={handleRestart}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl shadow-lg transform hover:-translate-y-0.5 transition duration-300 cursor-pointer"
                >
                  เล่นใหม่อีกครั้ง 🔄
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {}
      <footer className="relative z-10 w-full flex justify-between items-center text-[10px] text-slate-600 bg-slate-900/20 backdrop-blur border border-white/5 px-4 py-2 rounded-xl">
        <div>ระบบ AI ค้นหานิ้วมือ MediaPipe Client-Side (ไม่ส่งภาพขึ้นคลาวด์)</div>
        <div>วิชาวิทยาการคำนวณ โรงเรียนประถมวิทยา</div>
      </footer>
    </div>
  );
}
````

## File: src/pages/Profile.tsx
````typescript
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { uploadToSupabase } from '../lib/storage';
import {
  User,
  Mail,
  Shield,
  Save,
  Loader2,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  Trash2
} from 'lucide-react';

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [selectedSignature, setSelectedSignature] = useState<File | null>(null);
  const [sigPreviewUrl, setSigPreviewUrl] = useState<string | null>(null);
  const [teacherInfo, setTeacherInfo] = useState<any>(null);
  const [lineLink, setLineLink] = useState('');

  const fetchTeacherInfo = async (email: string) => {
    if (!email) return;
    try {
      const { data } = await supabase
        .from('teachers')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      setTeacherInfo(data);
    } catch (err) {
      console.error('Error fetching teacher info:', err);
    }
  };

  async function fetchSettings() {
    try {
      const { data } = await supabase.from('settings').select('line_oa_link').maybeSingle();
      if (data) setLineLink(data.line_oa_link || '');
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  }

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setSigPreviewUrl(profile.signature_url || null);
      fetchTeacherInfo(profile.email);
    }
    fetchSettings();
  }, [profile]);

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);

    try {
      let signatureUrl = profile?.signature_url;

      if (selectedSignature) {
        const fileExt = selectedSignature.name.split('.').pop() || 'png';
        const fileName = `user_sig_${user.id}_${Date.now()}.${fileExt}`;
        signatureUrl = await uploadToSupabase(selectedSignature, 'system', fileName);
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: displayName,
          signature_url: signatureUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      await refreshProfile();
      alert('อัปเดตข้อมูลส่วนตัวเรียบร้อยแล้ว');
      setSelectedSignature(null);
    } catch (err: any) {
      alert('อัปเดตไม่สำเร็จ: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedSignature(file);
      setSigPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-[24px] flex items-center justify-center text-brand-primary shadow-sm border border-brand-primary/20">
          <User size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">ข้อมูลส่วนตัวและลายเซ็น</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">My Profile & Digital Signature</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-300 shadow-inner overflow-hidden">
               {teacherInfo?.photo_url ? (
                 <img src={teacherInfo.photo_url} className="w-full h-full object-cover" alt="Profile" />
               ) : (
                 <User size={48} />
               )}
            </div>
            <h3 className="font-black text-slate-800 text-lg leading-tight">{profile?.display_name || user?.email}</h3>
            <div className="mt-4 flex flex-col items-center gap-2">
               <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                  {profile?.role || 'Guest'}
               </span>
               {profile?.status === 'active' && (
                 <span className="flex items-center gap-1 text-[9px] font-black text-green-500 uppercase tracking-widest">
                   <CheckCircle2 size={10} /> บัญชีได้รับการอนุมัติแล้ว
                 </span>
               )}
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-[32px] text-white space-y-4">
             <div className="flex items-center gap-3">
                <Shield size={20} className="text-brand-primary" />
                <p className="text-xs font-black uppercase tracking-widest">ความปลอดภัย</p>
             </div>
             <p className="text-[10px] text-slate-400 leading-relaxed font-bold">
               ลายเซ็นดิจิทัลของคุณจะถูกเก็บรักษาไว้อย่างปลอดภัยและจะถูกนำไปใช้เฉพาะเมื่อคุณดำเนินการผ่านระบบสารบรรณของโรงเรียนเท่านั้น
             </p>
          </div>

          {}
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
             <div className="flex items-center gap-3">
                <MessageCircle size={20} className="text-[#06C755]" />
                <p className="text-xs font-black text-slate-800 uppercase tracking-widest">การเชื่อมต่อ LINE</p>
             </div>
             {profile?.line_user_id ? (
               <div className="space-y-2">
                 <div className="flex items-center gap-2 text-green-600">
                   <CheckCircle2 size={14} />
                   <span className="text-[10px] font-black uppercase">เชื่อมต่อแล้ว</span>
                 </div>
                 <p className="text-[9px] text-slate-400 font-bold leading-relaxed">
                   คุณสามารถสอบถามข้อมูลโรงเรียนผ่าน LINE OA ได้ทันที
                 </p>
               </div>
             ) : (
               <div className="space-y-3">
                 <p className="text-[10px] text-slate-400 font-bold leading-relaxed italic">
                   ยังไม่ได้เชื่อมต่อบัญชี LINE
                 </p>
                 <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[9px] text-slate-600 font-bold leading-relaxed">
                      วิธีเชื่อมต่อ: เพิ่มเพื่อน LINE OA ของโรงเรียนแล้วพิมพ์อีเมลของคุณส่งไปในแชท
                    </p>
                 </div>
                 {lineLink && (
                   <a
                     href={lineLink}
                     target="_blank"
                     rel="noreferrer"
                     className="w-full py-3 bg-[#06C755] text-white rounded-xl font-black text-[10px] flex items-center justify-center gap-2 shadow-lg shadow-green-100 hover:bg-[#05b34c] transition-all uppercase tracking-widest"
                   >
                     <ExternalLink size={14} /> เพิ่มเพื่อน LINE OA ตอนนี้
                   </a>
                 )}
               </div>
             )}
          </div>
        </div>

        {}
        <div className="md:col-span-2 space-y-8">
          <form onSubmit={handleUpdateProfile} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            {}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-800">
                <User size={20} className="text-brand-primary" />
                <h4 className="font-black text-sm uppercase tracking-wider">ชื่อที่แสดงในระบบ</h4>
              </div>
              <input
                type="text"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
                placeholder="เช่น นายไพโรจน์ มากแก้ว"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <p className="text-[10px] text-slate-400 font-bold ml-1 uppercase">ชื่อนี้จะถูกนำไปวางในช่อง "ลงชื่อ" ในเอกสาร PDF</p>
            </div>

            {}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail size={20} />
                <h4 className="font-black text-sm uppercase tracking-wider">อีเมลล็อกอิน (แก้ไขไม่ได้)</h4>
              </div>
              <input
                type="text"
                className="w-full p-4 bg-slate-100 border border-slate-100 rounded-2xl font-bold text-slate-400 cursor-not-allowed"
                value={user?.email || ''}
                readOnly
              />
            </div>

            {}
            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2 text-slate-800">
                <ImageIcon size={20} className="text-brand-primary" />
                <h4 className="font-black text-sm uppercase tracking-wider">ลายเซ็นดิจิทัลส่วนตัว</h4>
              </div>

              <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 relative group overflow-hidden">
                 {sigPreviewUrl ? (
                   <img src={sigPreviewUrl} className="max-h-32 object-contain" alt="Signature Preview" />
                 ) : (
                   <div className="flex flex-col items-center gap-3">
                      <Upload className="text-slate-300" size={40} />
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">คลิกเพื่ออัปโหลดไฟล์ภาพลายเซ็น</span>
                   </div>
                 )}
                 <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    <Upload className="text-white" size={32} />
                 </label>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                 <div className="shrink-0 w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center text-amber-700">
                    <Trash2 size={16} />
                 </div>
                 <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
                   คำแนะนำ: ควรใช้ภาพถ่ายลายเซ็นจากปากกาสีน้ำเงินหรือดำ บนกระดาษขาวล้วน <br/>
                   ระบบจะนำไปประทับตราอัตโนมัติในส่วนของ "เกษียณเสนอ" (ซ้ายล่าง) ของหนังสือรับ
                 </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-5 bg-brand-primary text-white rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-green-100 hover:bg-green-700 transition-all disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="animate-spin" /> : <Save />} บันทึกการเปลี่ยนแปลง
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
````

## File: src/pages/SchoolApprovals.tsx
````typescript
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  Check,
  X,
  School,
  Loader2,
  Calendar,
  Mail,
  Link,
  AlertCircle,
  ListFilter,
  CheckCircle,
  Clock,
  Trash2
} from 'lucide-react';

export default function SchoolApprovals() {
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [approvedSchools, setApprovedSchools] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);
  const [editingEmails, setEditingEmails] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'pending') {
        const { data, error } = await supabase
          .from('schools')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPendingRequests(data || []);


        const emailMap: Record<string, string> = {};
        (data || []).forEach((req: any) => {
          emailMap[req.id] = req.admin_email || '';
        });
        setEditingEmails(emailMap);
      } else {
        const { data, error } = await supabase
          .from('schools')
          .select('*')
          .eq('status', 'approved')
          .order('school_name', { ascending: true });

        if (error) throw error;
        setApprovedSchools(data || []);
      }
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError('ไม่สามารถดึงข้อมูลคำขอโรงเรียนได้: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, name: string, email: string) => {
    setActionId(id);
    setError(null);
    setSuccess(null);
    try {

      const { error: updateError } = await supabase
        .from('schools')
        .update({
          status: 'approved',
          admin_email: email.trim().toLowerCase()
        })
        .eq('id', id);

      if (updateError) throw updateError;


      const { error: settingsError } = await supabase
        .from('settings')
        .insert([
          {
            school_id: id,
            school_name: name,
            current_academic_year: '2569',
            current_term: '1'
          }
        ]);

      if (settingsError && settingsError.code !== '23505') {
        console.warn('Warning creating default settings:', settingsError);
      }

      setSuccess(`อนุมัติโรงเรียน "${name}" เรียบร้อยแล้ว!`);
      fetchData();
    } catch (err: any) {
      console.error('Approve error:', err);
      setError('อนุมัติไม่สำเร็จ: ' + err.message);
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (id: string, name: string) => {
    if (!confirm(`คุณต้องการปฏิเสธและลบโรงเรียน/คำขอ "${name}" หรือไม่?`)) return;

    setActionId(id);
    setError(null);
    setSuccess(null);
    try {
      const { error } = await supabase
        .from('schools')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSuccess(`ลบข้อมูล "${name}" ออกจากระบบแล้ว`);
      fetchData();
    } catch (err: any) {
      console.error('Delete error:', err);
      setError('ลบไม่สำเร็จ: ' + err.message);
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 overflow-y-auto h-full pb-24 scrollbar-hide animate-in fade-in">

      {}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <School className="text-brand-primary" size={28} />
            แผงควบคุมระบบเครือข่ายกลาง
          </h1>
          <p className="text-slate-400 text-xs mt-1 font-bold uppercase tracking-wider">
            Super Admin Portal
          </p>
        </div>

        {}
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'pending'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock size={14} />
            คำขอรออนุมัติ
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'approved'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <CheckCircle size={14} />
            โรงเรียนที่เปิดใช้งานแล้ว
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 font-medium flex items-center gap-2">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm border border-green-100 font-medium">
          🎉 {success}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
          <Loader2 className="animate-spin text-brand-primary" size={36} />
          <span className="text-xs font-bold uppercase tracking-wider">กำลังดึงข้อมูลระบบ...</span>
        </div>
      ) : (
        <>
          {activeTab === 'pending' ? (

            pendingRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-5">
                {pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg font-black text-xs uppercase tracking-widest border border-amber-100">
                          {req.school_code}
                        </div>
                        <div className="text-slate-400 text-[10px] flex items-center gap-1 font-semibold">
                          <Calendar size={12} />
                          {new Date(req.created_at).toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-slate-800 mb-4">{req.school_name}</h3>

                      <div className="space-y-3 text-xs font-medium text-slate-600 border-t border-b border-slate-50 py-3 mb-6">
                        <div className="flex flex-col gap-1 w-full">
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Mail size={12} /> อีเมลแอดมินโรงเรียน (แก้ไขได้)
                          </label>
                          <input
                            type="email"
                            required
                            className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-primary bg-slate-50 focus:bg-white transition-all font-sans"
                            value={editingEmails[req.id] !== undefined ? editingEmails[req.id] : (req.admin_email || '')}
                            onChange={(e) => setEditingEmails({
                              ...editingEmails,
                              [req.id]: e.target.value
                            })}
                          />
                        </div>
                        {req.gas_url && (
                          <div className="flex items-center gap-2">
                            <Link size={14} className="text-slate-400" />
                            <span className="text-slate-400">GAS Link:</span>
                            <span className="truncate max-w-[200px] text-slate-700 font-bold" title={req.gas_url}>
                              {req.gas_url}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <button
                        onClick={() => handleApprove(req.id, req.school_name, editingEmails[req.id] || req.admin_email)}
                        disabled={actionId !== null}
                        className="flex-1 bg-brand-primary hover:bg-green-700 text-white py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
                      >
                        {actionId === req.id ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <Check size={16} />
                        )}
                        อนุมัติเปิดใช้งาน
                      </button>
                      <button
                        onClick={() => handleReject(req.id, req.school_name)}
                        disabled={actionId !== null}
                        className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-1 active:scale-95 disabled:opacity-50"
                      >
                        <X size={16} />
                        ปฏิเสธคำขอ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <School className="mx-auto text-slate-300 mb-3" size={48} />
                <h3 className="text-base font-bold text-slate-600">ไม่มีคำขอเปิดโรงเรียนใหม่ในขณะนี้</h3>
                <p className="text-slate-400 text-xs mt-1">คำขอทั้งหมดที่ส่งมาได้รับการอนุมัติใช้งานเรียบร้อยแล้วค่ะ</p>
              </div>
            )
          ) : (

            approvedSchools.length > 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-5">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-100">
                        <th className="py-4 px-6">รหัสโรงเรียน</th>
                        <th className="py-4 px-6">ชื่อสถานศึกษา</th>
                        <th className="py-4 px-6">ผู้ดูแลระบบประจำโรงเรียน</th>
                        <th className="py-4 px-6">Google Drive Link</th>
                        <th className="py-4 px-6 text-center">การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                      {approvedSchools.map((school) => (
                        <tr key={school.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6">
                            <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-md border border-green-100">
                              {school.school_code}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-slate-800 text-sm font-extrabold">{school.school_name}</td>
                          <td className="py-4 px-6 font-medium text-slate-600">
                            <div className="flex items-center gap-1.5">
                              <Mail size={12} className="text-slate-400" />
                              {school.admin_email || <span className="text-slate-400 italic">ไม่ระบุอีเมล</span>}
                            </div>
                          </td>
                          <td className="py-4 px-6 max-w-[200px] truncate font-medium text-slate-500" title={school.gas_url}>
                            {school.gas_url ? (
                              <div className="flex items-center gap-1.5">
                                <Link size={12} className="text-slate-400 shrink-0" />
                                <span className="truncate">{school.gas_url}</span>
                              </div>
                            ) : (
                              <span className="text-slate-300 italic">ยังไม่ได้ตั้งค่า Google Drive</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => handleReject(school.id, school.school_name)}
                              disabled={actionId !== null}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all inline-flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                              title="ลบโรงเรียนออกจากระบบ"
                            >
                              <Trash2 size={15} />
                              <span className="text-[10px] font-bold uppercase tracking-wider">ถอนสิทธิ์</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <School className="mx-auto text-slate-300 mb-3" size={48} />
                <h3 className="text-base font-bold text-slate-600">ยังไม่มีโรงเรียนที่เปิดใช้งานในระบบ</h3>
                <p className="text-slate-400 text-xs mt-1">กรุณากดสลับแท็บเพื่อไปทำการกดอนุมัติโรงเรียนที่ยื่นเรื่องเข้ามาค่ะ</p>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
````

## File: src/pages/Users.tsx
````typescript
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Modal';
import {
  Users as UsersIcon,
  Shield,
  UserCircle,
  Search,
  Loader2,
  CheckCircle2,
  ChevronDown,
  UserCheck,
  UserX,
  RefreshCw,
  Clock,
  FileDown,
  PieChart,
  Save,
  GraduationCap,
  Wallet,
  Gamepad2
} from 'lucide-react';

export default function UsersManagement() {
  const { profile: currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [isPermModalOpen, setIsPermModalOpen] = useState(false);
  const [selectedUserForPerm, setSelectedUserForPerm] = useState<any>(null);

  const MODULE_PERMISSIONS = [
    { key: 'access_administrative', label: 'งานสารบรรณ (รับ-ส่ง/คำสั่ง)', icon: <FileDown size={18} /> },
    { key: 'access_hr', label: 'งานบุคคล (จัดการครู/WFH)', icon: <UserCheck size={18} /> },
    { key: 'access_student_affairs', label: 'งานทะเบียน (ข้อมูลนักเรียน/รายงานเวลาเรียน)', icon: <UsersIcon size={18} /> },
    { key: 'access_reports', label: 'งานรายงานและสถิติ (รายงานวิเคราะห์/LEC)', icon: <PieChart size={18} /> },
    { key: 'access_academic', label: 'งานวิชาการ (ระบบวิชาการ/ห้องสมุด)', icon: <GraduationCap size={18} /> },
    { key: 'access_finance', label: 'งานงบประมาณ (การเงิน/พัสดุ/สาธารณูปโภค/เรียนฟรี)', icon: <Wallet size={18} /> },
    { key: 'access_athletics', label: 'งานลงทะเบียนนักกีฬา (บันทึกข้อมูล/พิมพ์การ์ด)', icon: <Gamepad2 size={18} /> },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const { data: profilesData, error: pError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (pError) throw pError;

      const { data: teachersData } = await supabase
        .from('teachers')
        .select('email, prefix, first_name, last_name');

      const enrichedUsers = (profilesData || []).map(profile => {
        const teacherMatch = (teachersData || []).find(t => t.email?.toLowerCase() === profile.email?.toLowerCase());
        return {
          ...profile,
          official_info: teacherMatch || null,
          extra_permissions: profile.extra_permissions || {}
        };
      });

      setUsers(enrichedUsers);
    } catch (err: any) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }

  async function updateExtraPermissions(userId: string, perms: any) {
    setIsSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ extra_permissions: perms })
      .eq('id', userId);

    if (!error) {
      setUsers(users.map(u => u.id === userId ? { ...u, extra_permissions: perms } : u));
      setIsPermModalOpen(false);
    } else {
      alert('ไม่สามารถอัปเดตสิทธิ์พิเศษได้: ' + error.message);
    }
    setIsSaving(false);
  }

  const togglePermission = (key: string) => {
    if (!selectedUserForPerm) return;
    const currentPerms = { ...selectedUserForPerm.extra_permissions };
    currentPerms[key] = !currentPerms[key];
    setSelectedUserForPerm({ ...selectedUserForPerm, extra_permissions: currentPerms });
  };

  async function updateRole(userId: string, newRole: string) {
    setUpdatingId(userId);


    const currentUser = users.find(u => u.id === userId);
    const shouldActivate = currentUser?.role === 'guest' && newRole !== 'guest';

    const updateData: any = { role: newRole };
    if (shouldActivate) {
      updateData.status = 'active';
    }

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);

    if (!error) {
      setUsers(users.map(u => u.id === userId ? { ...u, ...updateData } : u));
      if (shouldActivate) {
        alert(`✅ อนุมัติสิทธิ์สำเร็จ! เปลี่ยนเป็น "${newRole}" และเปิดใช้งานบัญชีแล้วค่ะ`);
      }
    } else {
      alert('ไม่สามารถอัปเดตสิทธิ์ได้: ' + error.message);
    }
    setUpdatingId(null);
  }

  async function updateStatus(userId: string, status: string) {
    setUpdatingId(userId);
    const { error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', userId);

    if (!error) {
      setUsers(users.map(u => u.id === userId ? { ...u, status } : u));
    }
    setUpdatingId(null);
  }

  const filteredUsers = users.filter(u =>
    u.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase flex items-center gap-1 border border-red-100"><Shield size={10} /> Administrator</span>;
      case 'director': return <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase flex items-center gap-1 border border-purple-100"><UserCheck size={10} /> Director</span>;
      case 'teacher': return <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase flex items-center gap-1 border border-blue-100"><UserCircle size={10} /> Teacher</span>;
      default: return <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black uppercase flex items-center gap-1 border border-slate-100"><Clock size={10} /> Guest (Pending)</span>;
    }
  };

  if (currentUser?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm">
        <Shield className="text-red-200 mb-4" size={64} />
        <h3 className="text-xl font-black text-slate-800">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</h3>
        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">เฉพาะผู้ดูแลระบบเท่านั้น</p>
      </div>
    );
  }

  const stats = {
    total: users.length,
    pending: users.filter(u => u.role === 'guest').length,
    active: users.filter(u => u.status === 'active').length
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <Shield size={32} className="text-brand-primary" />
            จัดการสิทธิ์ผู้ใช้งาน
          </h2>
          <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-xs">User Role & Access Management</p>
        </div>
        <button
          onClick={() => fetchUsers()}
          className="p-4 bg-white text-slate-500 rounded-2xl hover:bg-slate-50 transition-all border border-slate-100 shadow-sm"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="ผู้ใช้งานทั้งหมด" value={stats.total} icon={<UsersIcon size={24} />} color="bg-blue-500" />
        <StatCard label="รออนุมัติสิทธิ์" value={stats.pending} icon={<Clock size={24} />} color="bg-amber-500" pulse={stats.pending > 0} />
        <StatCard label="บัญชีใช้งานปกติ" value={stats.active} icon={<CheckCircle2 size={24} />} color="bg-green-500" />
      </div>

      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
          <input
            type="text"
            placeholder="ค้นหาตามชื่อ หรืออีเมลผู้ใช้งาน..."
            className="w-full pl-12 pr-4 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ข้อมูลผู้ใช้งาน</th>
                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ระดับสิทธิ์ปัจจุบัน</th>
                <th className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ปรับระดับสิทธิ์</th>
                <th className="text-center py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">สถานะ / การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={4} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-brand-primary" size={32} /></td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan={4} className="py-20 text-center text-slate-400 font-bold italic">ไม่พบข้อมูลผู้ใช้งานที่ค้นหา</td></tr>
              ) : filteredUsers.map(user => (
                <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 shadow-xs overflow-hidden">
                        <UserCircle size={28} />
                      </div>
                      <div>
                        <p className="font-black text-slate-800 leading-none">
                          {user.official_info
                            ? `${user.official_info.prefix}${user.official_info.first_name} ${user.official_info.last_name}`
                            : (user.display_name || 'ไม่ได้ระบุชื่อ')}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs font-bold text-slate-400">{user.email}</p>
                          {user.official_info && (
                            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-500 rounded text-[8px] font-black uppercase border border-blue-100">Staff</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-4">{getRoleBadge(user.role)}</td>
                  <td className="py-5 px-4">
                    <div className="relative w-48">
                       <select
                        disabled={updatingId === user.id}
                        className="w-full pl-3 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 appearance-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary outline-hidden cursor-pointer disabled:opacity-50"
                        value={user.role}
                        onChange={(e) => updateRole(user.id, e.target.value)}
                       >
                        <option value="guest">Guest (รออนุมัติ)</option>
                        <option value="teacher">Teacher (ครู)</option>
                        <option value="director">Director (ผอ.)</option>
                        <option value="admin">Administrator</option>
                       </select>
                       <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex items-center justify-center gap-2">
                       {user.status === 'active' ? (
                         <button
                          onClick={() => updateStatus(user.id, 'inactive')}
                          className="px-4 py-2 bg-green-50 text-green-600 border border-green-100 rounded-xl text-[10px] font-black uppercase hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all flex items-center gap-2"
                         >
                            <UserCheck size={14} /> ปกติ
                         </button>
                       ) : (
                         <button
                          onClick={() => updateStatus(user.id, 'active')}
                          className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl text-[10px] font-black uppercase hover:bg-green-50 hover:text-green-600 hover:border-green-100 transition-all flex items-center gap-2"
                         >
                            <UserX size={14} /> ระงับ
                         </button>
                       )}

                       {user.role === 'guest' && (
                         <button
                          onClick={() => updateRole(user.id, 'teacher')}
                          className="px-4 py-2 bg-brand-primary text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-green-100 hover:bg-green-700 transition-all animate-pulse"
                         >
                           อนุมัติเป็นครู
                         </button>
                       )}

                       <button
                        onClick={() => { setSelectedUserForPerm(JSON.parse(JSON.stringify(user))); setIsPermModalOpen(true); }}
                        className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all"
                        title="ปรับสิทธิ์รายบุคคล"
                       >
                         <Shield size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {}
      <Modal
        isOpen={isPermModalOpen}
        onClose={() => setIsPermModalOpen(false)}
        title={`ปรับสิทธิ์เฉพาะบุคคล: ${selectedUserForPerm?.display_name}`}
      >
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-xs font-bold text-blue-700 leading-relaxed">
              การเลือกสิทธิ์เหล่านี้จะอนุญาตให้ผู้ใช้เข้าถึงเมนูพิเศษเพิ่มเติมจากระดับสิทธิ์ปกติ (Role)
              โดยไม่มีผลต่อสิทธิ์การลบข้อมูล
            </p>
          </div>

          <div className="space-y-3">
            {MODULE_PERMISSIONS.map((module) => (
              <div
                key={module.key}
                onClick={() => togglePermission(module.key)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedUserForPerm?.extra_permissions?.[module.key]
                    ? 'border-brand-primary bg-green-50 shadow-sm'
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedUserForPerm?.extra_permissions?.[module.key] ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {module.icon}
                  </div>
                  <span className="font-black text-slate-700 text-sm">{module.label}</span>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-brand-primary rounded-lg pointer-events-none"
                  checked={!!selectedUserForPerm?.extra_permissions?.[module.key]}
                  readOnly
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => updateExtraPermissions(selectedUserForPerm.id, selectedUserForPerm.extra_permissions)}
            disabled={isSaving}
            className="w-full py-4.5 bg-slate-800 text-white rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-xl hover:bg-slate-900 transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="animate-spin" /> : <Save />} บันทึกสิทธิ์พิเศษ
          </button>
        </div>
      </Modal>
    </div>
  );
}

function StatCard({ label, value, icon, color, pulse = false }: any) {
  return (
    <div className={`bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4 ${pulse ? 'ring-2 ring-amber-400 ring-offset-2' : ''}`}>
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
}
````

## File: supabase_schema_hybrid.sql
````sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";




CREATE TABLE schools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_code TEXT UNIQUE NOT NULL,
  school_name TEXT NOT NULL,
  gas_url TEXT,


  line_channel_access_token TEXT,
  line_bot_destination TEXT,


  telegram_bot_token TEXT,


  gemini_api_key TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE INDEX idx_schools_line_destination ON schools(line_bot_destination);
CREATE INDEX idx_schools_code ON schools(school_code);





CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'guest',
  status TEXT DEFAULT 'active',
  extra_permissions JSONB DEFAULT '{}',
  signature_url TEXT,
  line_user_id TEXT,
  ai_global_instructions TEXT,
  ai_writing_style TEXT,
  ai_preferred_model TEXT DEFAULT 'gemini-1.5-flash',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION get_user_school_id()
RETURNS UUID AS $$
  SELECT school_id FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;




CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE UNIQUE,
  school_name TEXT,
  school_address TEXT,
  director_name TEXT,
  current_academic_year TEXT DEFAULT '2569',
  current_term TEXT DEFAULT '1',
  school_logo_url TEXT,
  phone_number TEXT,
  local_gov_name TEXT,
  line_channel_access_token TEXT,
  line_group_id TEXT,
  gemini_api_key TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);




CREATE TABLE teachers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  prefix TEXT,
  first_name TEXT,
  last_name TEXT,
  position TEXT,
  department TEXT,
  phone TEXT,
  email TEXT,
  photo_url TEXT,
  line_user_id TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);




CREATE TABLE incoming_docs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  doc_number TEXT,
  from_agency TEXT,
  to_agency TEXT,
  subject TEXT,
  doc_date DATE,
  urgency TEXT,
  secrecy TEXT,
  doc_type TEXT,
  action_required TEXT,
  remark TEXT,
  file_url TEXT,
  attachment_urls JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending',
  ai_status TEXT,
  ai_suggestion TEXT,
  ai_score TEXT,
  doc_year INTEGER,
  doc_sequence INTEGER,
  extracted_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users
);




CREATE TABLE outgoing_docs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  doc_number TEXT,
  from_agency TEXT,
  to_agency TEXT,
  subject TEXT,
  doc_date DATE,
  urgency TEXT,
  secrecy TEXT,
  sender_name TEXT,
  remark TEXT,
  file_url TEXT,
  status TEXT DEFAULT 'pending',
  doc_year INTEGER,
  doc_sequence INTEGER,
  extracted_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users
);




CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  order_number TEXT,
  subject TEXT,
  issuer TEXT,
  order_date DATE,
  secrecy TEXT,
  remark TEXT,
  file_url TEXT,
  status TEXT DEFAULT 'pending',
  doc_year INTEGER,
  doc_sequence INTEGER,
  extracted_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users
);




CREATE TABLE memos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  memo_number TEXT,
  subject TEXT,
  requester TEXT,
  department TEXT,
  memo_date DATE,
  urgency TEXT,
  secrecy TEXT,
  remark TEXT,
  file_url TEXT,
  status TEXT DEFAULT 'pending',
  doc_year INTEGER,
  doc_sequence INTEGER,
  extracted_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users
);




CREATE TABLE doc_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doc_id UUID REFERENCES incoming_docs ON DELETE CASCADE,
  assignee_id UUID REFERENCES teachers ON DELETE CASCADE,
  instruction TEXT,
  status TEXT DEFAULT 'pending',
  staff_report TEXT,
  report_file_urls JSONB DEFAULT '[]',
  reported_at TIMESTAMPTZ,
  director_feedback TEXT,
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);




CREATE TABLE ar_lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users,
  title TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);




CREATE TABLE ar_steps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES ar_lessons(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  step_text TEXT NOT NULL,
  emoji TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);






ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE incoming_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE outgoing_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE memos ENABLE ROW LEVEL SECURITY;
ALTER TABLE doc_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ar_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE ar_steps ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Allow select for authenticated users" ON schools FOR SELECT USING (auth.uid() IS NOT NULL);


CREATE POLICY "School-based select" ON settings FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based update" ON settings FOR UPDATE USING (school_id = get_user_school_id());

CREATE POLICY "School-based select" ON profiles FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based update" ON profiles FOR UPDATE USING (school_id = get_user_school_id() AND auth.uid() = id);

CREATE POLICY "School-based select" ON teachers FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based all" ON teachers FOR ALL USING (school_id = get_user_school_id());

CREATE POLICY "School-based select" ON incoming_docs FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based all" ON incoming_docs FOR ALL USING (school_id = get_user_school_id());

CREATE POLICY "School-based select" ON outgoing_docs FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based all" ON outgoing_docs FOR ALL USING (school_id = get_user_school_id());

CREATE POLICY "School-based select" ON orders FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based all" ON orders FOR ALL USING (school_id = get_user_school_id());

CREATE POLICY "School-based select" ON memos FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based all" ON memos FOR ALL USING (school_id = get_user_school_id());

CREATE POLICY "School-based select" ON ar_lessons FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY "School-based all" ON ar_lessons FOR ALL USING (school_id = get_user_school_id());


CREATE POLICY "Allow view assignments of own school" ON doc_assignments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM incoming_docs
    WHERE incoming_docs.id = doc_assignments.doc_id
    AND incoming_docs.school_id = get_user_school_id()
  )
);
CREATE POLICY "Allow manage assignments of own school" ON doc_assignments FOR ALL USING (
  EXISTS (
    SELECT 1 FROM incoming_docs
    WHERE incoming_docs.id = doc_assignments.doc_id
    AND incoming_docs.school_id = get_user_school_id()
  )
);

CREATE POLICY "Allow view ar steps of own school" ON ar_steps FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM ar_lessons
    WHERE ar_lessons.id = ar_steps.lesson_id
    AND ar_lessons.school_id = get_user_school_id()
  )
);
CREATE POLICY "Allow manage ar steps of own school" ON ar_steps FOR ALL USING (
  EXISTS (
    SELECT 1 FROM ar_lessons
    WHERE ar_lessons.id = ar_steps.lesson_id
    AND ar_lessons.school_id = get_user_school_id()
  )
);
````

## File: TEST_CHECKLIST.md
````markdown
# 📋 เช็คลิสต์สำหรับทดสอบระบบ (System Testing Checklist) 🏫✨
*บันทึกขั้นตอนการทดสอบฟังก์ชันทุกโมดูลในระบบสารบรรณ Hybrid และน้องชบา AI*

---

## 🔐 1. ระบบลงทะเบียนและล็อกอิน (Auth & Registration)
- [ ] **ทดสอบสมัครสมาชิกใหม่ (Sign Up):**
  - คลิกปุ่ม "ลงทะเบียนบัญชีใหม่" ในหน้าล็อกอิน
  - กรอกข้อมูล และกรอกรหัสโรงเรียน (เช่น รหัสที่ได้อนุมัติในระบบ)
  - กดลงทะเบียน -> ตรวจสอบว่าระบบบันทึกบัญชีสำเร็จ
- [ ] **ทดสอบการซิงค์ข้อมูลครูอัตโนมัติ (Trigger Sync):**
  - หลังลงทะเบียนครูคนใหม่สำเร็จ ให้แอดมินเข้าไปดูในตาราง `teachers` (ใน Supabase) หรือในแอปหน้า "จัดการข้อมูลครู" 
  - ตรวจสอบว่ามีรายชื่อครูคนใหม่ปรากฏขึ้นมาโดยอัตโนมัติ (ตรวจสอบว่าชื่อ-นามสกุล และอีเมลตรงกัน)
- [ ] **ทดสอบการล็อกอิน (Sign In):**
  - ล็อกอินด้วยบัญชีครูที่เพิ่งสมัคร ตรวจสอบว่าสามารถเข้าสู่หน้าแดชบอร์ดได้ถูกต้อง

---

## ⚙️ 2. ระบบข้อมูลโรงเรียนและ RLS (Multi-Tenant Isolation)
- [ ] **ทดสอบแยกข้อมูลตามโรงเรียน (RLS Protection):**
  - ล็อกอินด้วยบัญชีของ **โรงเรียน A** -> ไปหน้า "ตั้งค่าระบบ" -> บันทึกชื่อโรงเรียน A
  - ล็อกอินด้วยบัญชีของ **โรงเรียน B** -> ตรวจสอบว่ามองไม่เห็นการตั้งค่าของโรงเรียน A และต้องแสดงข้อมูลของโรงเรียน B เท่านั้น
  - ตรวจสอบว่าข้อมูลในหน้าต่าง เช่น หนังสือรับ, หนังสือส่ง และคำสั่ง แยกขาดจากกันตามโรงเรียนที่สังกัด 100%

---

## 📥 3. ระบบงานสารบรรณ (Saraban Module)
- [ ] **การลงรับหนังสือใหม่ (Incoming Docs):**
  - กดปุ่ม "ลงรับหนังสือใหม่" (สำหรับผู้บริหาร หรือ ครูสารบรรณที่ปรับสิทธิ์พิเศษแล้ว)
  - ทดลองอัปโหลดไฟล์ PDF -> กดปุ่ม "ให้น้องชบาสรุปเอกสาร" -> ตรวจสอบว่า AI สรุปเนื้อหาและกรอกเลขที่หนังสือ วันที่ ชื่อหน่วยงานต้นทางให้อัตโนมัติ
  - กดบันทึก -> ระบบต้องประทับตราทะเบียนรับเข้าบนไฟล์ PDF หน้าแรกสำเร็จ
- [ ] **การออกหนังสือส่ง (Outgoing Docs):**
  - กดปุ่ม "ออกหนังสือใหม่" 
  - กรอกรายละเอียด -> กดส่งหนังสือ -> ตรวจสอบว่าระบบจัดเก็บและสร้างเลขหนังสือส่งลำดับถัดไปให้อัตโนมัติ
- [ ] **การออกคำสั่งโรงเรียน (Orders) & บันทึกข้อความ (Memos):**
  - ทดสอบสร้างคำสั่งใหม่ และร่างบันทึกข้อความ -> ตรวจสอบว่าระบบสามารถบันทึกและแสดงรายการได้ถูกต้อง

---

## 🎯 4. ระบบติดตามงานและสั่งการ (Task Management & Assignment)
- [ ] **การเกษียณสั่งการมอบหมายงาน (Director Action):**
  - (ใช้บัญชี ผอ. หรือ แอดมิน) เข้าไปที่หน้ารายการหนังสือรับ -> คลิกปุ่ม "มอบหมายงาน" บนหนังสือฉบับที่ต้องการ
  - เลือกชื่อคุณครูผู้รับผิดชอบ -> กรอกข้อความสั่งการ -> กดบันทึก
  - ตรวจสอบว่าระบบส่งข้อความแจ้งเตือนผ่านบอท LINE/Telegram เข้ากลุ่มหรือหาครูคนนั้นโดยตรงสำเร็จ
- [ ] **การแสดงผลสิทธิ์เฉพาะบุคคล (Granular Permission Task View):**
  - ล็อกอินด้วยบัญชีครูที่มีสิทธิ์พิเศษ "งานสารบรรณ" -> ไปที่หน้า **ระบบติดตามงาน**
  - ตรวจสอบว่าครูคนนี้มองเห็นรายการงานมอบหมายของทุกคนในโรงเรียน (ไม่ใช่เห็นแค่ของตัวเอง)
  - ล็อกอินด้วยบัญชีครูทั่วไปที่ไม่มีสิทธิ์พิเศษ -> ตรวจสอบว่าในระบบติดตามงาน ต้องมองเห็นเฉพาะงานที่สั่งถึงตนเองเท่านั้น

---

## 👥 5. ระบบจัดการสิทธิ์ผู้ใช้งาน (Granular Permission Administration)
- [ ] **การปรับระดับสิทธิ์ (Role Shift):**
  - (ใช้บัญชีแอดมิน) ไปหน้า "จัดการสิทธิ์ผู้ใช้งาน"
  - เปลี่ยนสิทธิ์ครูท่านหนึ่งให้เป็น `director` (ผู้อำนวยการ) -> ตรวจสอบว่าครูท่านนั้นได้รับสิทธิ์เซ็นอนุมัติเมื่อเข้าสู่ระบบใหม่
- [ ] **การให้สิทธิ์พิเศษเฉพาะบุคคล (Granular Permissions):**
  - คลิกปุ่มโล่ป้องกัน (ปรับสิทธิ์เฉพาะบุคคล) ที่รายชื่อครูทั่วไป
  - ติ๊กเลือกสิทธิ์ "งานสารบรรณ (รับ-ส่ง/คำสั่ง)" -> กดบันทึก
  - ล็อกอินด้วยบัญชีครูคนนั้น -> ตรวจสอบว่ามีเมนู "หนังสือรับ", "หนังสือส่ง", "คำสั่ง" ปรากฏเพิ่มขึ้นมาในแถบด้านข้าง และปุ่ม "ลงรับหนังสือใหม่" แสดงผลและสามารถกดใช้งานได้จริง

---

## 🧠 6. ระบบผู้ช่วยอัจฉริยะ (น้องชบา AI & RAG Search)
- [ ] **การย่อยข้อมูลเข้าคลังข้อมูล RAG (RAG Indexing):**
  - ไปที่เมนู "ผู้ช่วยครู AI (AICowork)" -> แท็บ **คลังสมองโรงเรียน**
  - อัปโหลดไฟล์ PDF (เช่น แผนพัฒนาโรงเรียน หรือกฎระเบียบต่างๆ)
  - ตรวจสอบว่าระบบแสดงเปอร์เซ็นต์ความคืบหน้าในการสกัดเนื้อหาและคำนวณเวกเตอร์จนเสร็จสิ้น
- [ ] **การถามตอบข้อมูลเชิงลึก (Chat RAG Query):**
  - ไปที่แท็บ **Chat Hub**
  - ทดลองถามคำถามเฉพาะเจาะจงที่มีอยู่ในไฟล์ PDF ที่อัปโหลดขึ้นไป (เช่น "เกณฑ์การผ่านประเมินในแผนงานคืออะไร")
  - ตรวจสอบว่าน้องชบาสามารถดึงข้อมูลจากเอกสารมาตอบได้ถูกต้อง พร้อมแสดงอ้างอิงท้ายคำตอบ เช่น *(อ้างอิงจากคลังกลาง: [ชื่อไฟล์] หน้า [หน้า])*
- [ ] **การถามตอบข้อมูลตามเวลา (Smart Date Query):**
  - ทดลองพิมพ์ถามน้องชบา เช่น:
    - *"วันนี้มีหนังสือรับกี่ฉบับ"*
    - *"หนังสือเข้าเมื่อวานมีเรื่องอะไรบ้าง"*
    - *"ขอดูหนังสือของสัปดาห์นี้หน่อย"*
  - ตรวจสอบว่าน้องชบาสามารถดึงข้อมูลจดหมายราชการมาตอบได้อย่างถูกต้องตามวันที่ถาม โดยไม่มี Error 400 กวนใจ

---

## 🎮 7. ระบบนวัตกรรมและการเรียนรู้ (AR Learning System)
- [ ] **การเล่นเกมจับคู่/เรียงลำดับด่านบทเรียน (Play Mode):**
  - ไปที่เมนู **น้องชบาพาพิชิต (AR)** -> ทดลองเลือกบทเรียนที่สร้างไว้
  - เล่นเกมเรียงลำดับ หรือจับคู่การ์ด -> ตรวจสอบว่าระบบคำนวณคะแนนและเล่นด่านได้จนจบ
- [ ] **การจัดการบทเรียนด้วย AI (AR Admin & AI CoWork):**
  - เข้าไปหน้า **จัดการด่านบทเรียน น้องชบาพาพิชิต (AR)**
  - กดสร้างบทเรียนใหม่ -> กรอกหัวข้อด่าน (เช่น "ขั้นตอนการแปรงฟัน")
  - กดปุ่ม "ให้น้องชบาช่วยคิดขั้นตอน" -> ตรวจสอบว่า AI เจนรายการขั้นตอนและเลือกอิโมจิให้เข้ากับด่านโดยอัตโนมัติ และเซฟข้อมูลลงฐานข้อมูลได้สำเร็จโดยไม่มี Error 406
````

## File: tsconfig.app.json
````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client", "node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "api"],
  "exclude": ["src/**/*.test.ts", "src/**/*.spec.ts", "src/lib/__tests__"]
}
````

## File: tsconfig.json
````json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
````

## File: tsconfig.node.json
````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "module": "esnext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
````

## File: .vercelignore
````
node_modules
dist
dist-installer
.git
คู่มือติดตั้ง
.vercel
build_final
out
release
*.exe
*.msi
*.zip
*.log
````

## File: vercel.json
````json
{
  "functions": {
    "api/**/*.ts": {
      "includeFiles": "public/fonts/**"
    }
  },
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
````

## File: vite.config.ts
````typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
````

## File: .gitignore
````
node_modules
.env
dist
dist-installer
.DS_Store
*.local

.vercel
.env*.local
recovery-codes.txt
````

## File: scratch/check-db.js
````javascript
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';


const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.trim().match(/^([\w.-]+)\s*=\s*(.*)?$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    env[key] = value.trim();
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseAnonKey = env['VITE_SUPABASE_ANON_KEY'];

console.log('=== Supabase Connection Test ===');
console.log('Supabase URL:', supabaseUrl);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabase() {
  try {

    const { data: schools, error: sErr } = await supabase.from('schools').select('*');
    if (sErr) throw sErr;
    console.log('\n🏫 --- ตาราง schools ---');
    console.log(schools);


    const { data: profiles, error: pErr } = await supabase.from('profiles').select('*');
    if (pErr) throw pErr;
    console.log('\n👤 --- ตาราง profiles ---');
    console.log(profiles);


    const { data: teachers, error: tErr } = await supabase.from('teachers').select('*');
    if (tErr) throw tErr;
    console.log('\n🧑‍🏫 --- ตาราง teachers ---');
    console.log(teachers);

  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาดในการตรวจสอบฐานข้อมูล:', err.message);
  }
}

checkDatabase();
````

## File: src/pages/ARAdmin.tsx
````typescript
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getARLessons, saveARLesson, deleteARLesson, generateUUID, type ARLesson, type ARStep } from '../lib/arService';
import { callGeminiAPI } from '../lib/aiService';
import {
  Plus,
  Trash,
  Edit,
  Save,
  ArrowLeft,
  Lock,
  Unlock,
  Copy,
  Sparkles,
  Loader2,
  Eye,
  BookOpen,
  X,
  Bot
} from 'lucide-react';

interface ARAdminProps {
  onBack?: () => void;
}

export default function ARAdmin({ onBack }: ARAdminProps) {
  const [lessons, setLessons] = useState<ARLesson[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  const [isEditing, setIsEditing] = useState(false);
  const [editLessonId, setEditLessonId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [steps, setSteps] = useState<Omit<ARStep, 'id'>[]>([]);
  const [lessonMode, setLessonMode] = useState<'sequencing' | 'matching'>('sequencing');


  const [saveLoading, setSaveLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);


  async function handleAICoWorkGenerate() {
    if (!title.trim()) {
      alert('กรุณากรอกชื่อบทเรียน/ด่านก่อนค่ะ เพื่อให้น้องชบานำไปช่วยคิดขั้นตอนได้ถูกต้อง');
      return;
    }

    setAiGenerating(true);
    try {
      const schoolId = localStorage.getItem('active_school_id');
      let settingsQuery = supabase.from('settings').select('gemini_api_key, ai_cowork_api_key');
      if (schoolId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(schoolId)) {
        settingsQuery = settingsQuery.eq('school_id', schoolId);
      }
      const { data: settings } = await settingsQuery.maybeSingle();

      const apiKey = settings?.ai_cowork_api_key || settings?.gemini_api_key;
      if (!apiKey) {
        alert('กรุณาตั้งค่า API Key ในระบบก่อนนะคะ (สามารถตั้งค่าได้ในหน้าตั้งค่าระบบ)');
        setAiGenerating(false);
        return;
      }

      const prompt = `คุณคือน้องชบา ผู้ช่วยอัจฉริยะของคุณครูในโรงเรียนประถมศึกษา
จงช่วยออกแบบบทเรียนวิชาการสำหรับหัวข้อที่ครูกำหนดให้: "${title}"
โดยให้คุณวิเคราะห์ลักษณะหัวข้ออย่างละเอียด และเลือกรูปแบบบทเรียนอย่างชาญฉลาดตามกฎต่อไปนี้:

กฎการตัดสินใจและรูปแบบบทเรียน:

1. หากหัวข้อครูสั่งให้ทำ "โจทย์คณิตศาสตร์เรียงลำดับตัวเลข" หรือเจตนาทำโจทย์ตัวเลขโดยตรง (เช่น "เรียงตัวเลขจากน้อยไปมาก", "โจทย์เรียงตัวเลข", "เรียงลำดับจำนวน 1-50")
   - ห้าม! ออกแบบเป็นขั้นตอนวิธีคิดเด็ดขาด! (ห้ามเขียนขั้นตอนประเภท "เปรียบเทียบตัวเลข", "หาตัวที่น้อยสุด" เป็นต้น)
   - แต่ให้สร้างชุดตัวเลขคณิตศาสตร์สมมติที่มีค่าคละกันจำนวน 3 ถึง 5 ตัวเลข และป้อนตัวเลขเหล่านั้นลงใน step_text ของแต่ละขั้นตอน โดยเรียงลำดับ step_order ให้ถูกต้องตามหลักคณิตศาสตร์จากน้อยไปมาก (หรือตามคำสั่ง)
   - ตัวอย่างหัวข้อ "เรียงตัวเลขจากน้อยไปมาก" (4 ขั้นตอน):
     [
       {"step_order": 1, "step_text": "15", "emoji": "🔢"},
       {"step_order": 2, "step_text": "34", "emoji": "🔢"},
       {"step_order": 3, "step_text": "62", "emoji": "🔢"},
       {"step_order": 4, "step_text": "89", "emoji": "🔢"}
     ]

2. หากหัวข้อครูสั่งให้เป็น "ขั้นตอน/วิธีการ/อัลกอริทึมในการแก้ปัญหา" (เช่น "ขั้นตอนการแก้ปัญหาการเรียงตัวเลข", "ขั้นตอนล้างมือ", "อัลกอริทึมการแปรงฟัน", "ลำดับการตื่นนอน")
   - ให้สร้างขั้นตอนการทำงานย่อย (Algorithm Steps) ในการคิดแก้ปัญหาหรือกระบวนการทำงานจริงตามลำดับก่อนหลัง
   - ตัวอย่างหัวข้อ "ขั้นตอนการแก้ปัญหาการเรียงตัวเลขจากน้อยไปมาก" (4 ขั้นตอน):
     [
       {"step_order": 1, "step_text": "เปรียบเทียบค่าตัวเลขทั้งหมด", "emoji": "🔍"},
       {"step_order": 2, "step_text": "หาตัวเลขที่มีค่าน้อยที่สุด", "emoji": "⬇️"},
       {"step_order": 3, "step_text": "เขียนตัวเลขจากน้อยไปหามาก", "emoji": "✍️"},
       {"step_order": 4, "step_text": "ตรวจสอบความถูกต้องอีกครั้ง", "emoji": "✅"}
     ]

3. หากหัวข้อเป็นเรื่อง "การจับคู่" (คำศัพท์ภาษาอังกฤษ-คำแปล, สมการคณิตศาสตร์-คำตอบ, สัญลักษณ์วิทยาศาสตร์-คำอธิบาย)
   - ให้ใช้โครงสร้าง "โจทย์/คำหลัก : คำตอบ/คำแปล" (มีเครื่องหมายโคลอน :) เช่น "Apple : แอปเปิ้ล" หรือ "3 x 5 : 15" หรือ "H2O : น้ำ"
   - ตัวอย่างคำศัพท์ภาษาอังกฤษ-คำแปลภาษาไทย (4 ขั้นตอน):
     [
       {"step_order": 1, "step_text": "Fish : ปลา", "emoji": "🐟"},
       {"step_order": 2, "step_text": "Cat : แมว", "emoji": "🐱"},
       {"step_order": 3, "step_text": "Bird : นก", "emoji": "🐦"},
       {"step_order": 4, "step_text": "Dog : สุนัข", "emoji": "🐶"}
     ]
   - ตัวอย่างคณิตศาสตร์/วิทยาศาสตร์:
     [
       {"step_order": 1, "step_text": "2 + 5 : 7", "emoji": "➕"},
       {"step_order": 2, "step_text": "10 - 4 : 6", "emoji": "➖"},
       {"step_order": 3, "step_text": "3 x 3 : 9", "emoji": "✖️"}
     ]

4. หากหัวข้อเป็นเรื่อง "การเรียงลำดับขั้นตอน/กระบวนการทั่วไป" (เช่น วัฏจักรชีวิตสัตว์, ลำดับการทดลองวิทยาศาสตร์)
   - ให้ตอบกลับเป็นข้อความขั้นตอนปกติที่ไม่มีโคลอน (:) เพื่อเรียงจากลำดับ 1 ไปยังลำดับสุดท้าย
   - ตัวอย่างวิทยาศาสตร์ (วัฏจักรชีวิตผีเสื้อ):
     [
       {"step_order": 1, "step_text": "ไข่บนใบไม้", "emoji": "🥚"},
       {"step_order": 2, "step_text": "ตัวหนอนผีเสื้อ", "emoji": "🐛"},
       {"step_order": 3, "step_text": "ดักแด้ในรัง", "emoji": "🕸️"},
       {"step_order": 4, "step_text": "ผีเสื้อแสนสวย", "emoji": "🦋"}
     ]

รายละเอียดข้อกำหนดเพิ่มเติม:
- ให้ออกแบบบทเรียนตั้งแต่ 3 ถึง 5 ขั้นตอน (ขึ้นอยู่กับความเหมาะสม)
- ข้อความทางฝั่งซ้ายและฝั่งขวาของโคลอน (:) หรือข้อความในขั้นตอนทั่วไป ต้องสั้น กระชับ มีความยาวไม่เกิน 15 ตัวอักษร
- emoji ต้องเข้ากับขั้นตอนนี้อย่างดีที่สุด
- ส่งผลลัพธ์กลับมาในรูปแบบ JSON Array เท่านั้น ห้ามมีข้อความอื่นๆ เสริม`;

      const res = await callGeminiAPI(prompt, apiKey, {
        temperature: 0.4,
        responseMimeType: "application/json"
      });

      if (res && res.text) {
        const parsedSteps = JSON.parse(res.text);
        if (Array.isArray(parsedSteps)) {

          const isMatching = parsedSteps.some(s => s.step_text && (s.step_text.includes(':') || s.step_text.includes('：')));
          setLessonMode(isMatching ? 'matching' : 'sequencing');


          setSteps(parsedSteps.map(s => ({
            step_order: s.step_order,
            step_text: s.step_text,
            emoji: s.emoji || '💡'
          })));
          alert('น้องชบาช่วยคิดขั้นตอนเรียบร้อยแล้วค่ะ! คุณครูสามารถปรับแต่งเนื้อหาเพิ่มเติมต่อได้เลยนะคะ');
        } else {
          throw new Error('รูปแบบข้อมูลจาก AI ไม่ถูกต้อง');
        }
      }
    } catch (err: any) {
      console.error('AI generate failed:', err);
      alert('น้องชบาติดขัดบางประการในการวิเคราะห์: ' + err.message + '\nคุณครูสามารถพิมพ์กำหนดขั้นตอนด้วยตัวเองได้เช่นกันค่ะ');
    } finally {
      setAiGenerating(false);
    }
  }

  useEffect(() => {

    async function checkUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setCurrentUser(user);

        if (user) {

          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          setUserProfile(profile);
        }
      } catch (e) {
        console.error('Error fetching user:', e);
      }
    }

    checkUser();
  }, []);


  const isAcademicOrManagement = userProfile?.role === 'admin' ||
                                 userProfile?.role === 'director' ||
                                 userProfile?.extra_permissions?.access_academic === true;

  useEffect(() => {

    fetchLessons();
  }, [currentUser, userProfile]);

  async function fetchLessons() {
    setLoading(true);
    try {
      const data = await getARLessons(currentUser?.id);
      if (isAcademicOrManagement) {

        setLessons(data);
      } else {

        const filtered = data.filter(l => l.created_by === currentUser?.id || l.created_by === 'teacher_default');
        setLessons(filtered);
      }
    } catch (e) {
      console.error('Failed to fetch lessons:', e);
    } finally {
      setLoading(false);
    }
  }


  function handleNewLesson() {
    setEditLessonId(null);
    setTitle('');
    setDescription('');
    setIsPublic(true);
    setLessonMode('sequencing');
    setSteps([
      { step_order: 1, step_text: '', emoji: '💡' },
      { step_order: 2, step_text: '', emoji: '💡' },
      { step_order: 3, step_text: '', emoji: '💡' }
    ]);
    setIsEditing(true);
  }

  // Handle open editor for editing existing lesson
  function handleEditLesson(lesson: ARLesson) {
    // ครูผู้สร้าง หรือ ฝ่ายวิชาการ/ผู้บริหาร สามารถแก้ไขได้
    const canEdit = !currentUser || lesson.created_by === currentUser.id || isAcademicOrManagement;
    if (!canEdit) {
      alert('คุณไม่ได้รับอนุญาตให้แก้ไขบทเรียนของท่านอื่น (สามารถทำได้เฉพาะการคัดลอกบทเรียน)');
      return;
    }

    setEditLessonId(lesson.id);
    setTitle(lesson.title);
    setDescription(lesson.description);
    setIsPublic(lesson.is_public);

    // Detect lesson mode based on steps
    const isMatchingType = lesson.steps.some(s => s.step_text && (s.step_text.includes(':') || s.step_text.includes('：')));
    setLessonMode(isMatchingType ? 'matching' : 'sequencing');


    const sortedSteps = [...lesson.steps].sort((a, b) => a.step_order - b.step_order);
    setSteps(sortedSteps.map(s => ({
      step_order: s.step_order,
      step_text: s.step_text,
      emoji: s.emoji
    })));
    setIsEditing(true);
  }


  async function handleDuplicateLesson(lesson: ARLesson) {
    if (!confirm(`คุณต้องการคัดลอกบทเรียน "${lesson.title}" ไปเป็นบทเรียนส่วนตัวของคุณใช่หรือไม่?`)) {
      return;
    }

    setLoading(true);
    const newLessonId = generateUUID();
    const duplicatedLesson: Omit<ARLesson, 'school_id'> = {
      id: newLessonId,
      created_by: currentUser?.id || 'teacher_default',
      title: `${lesson.title} (คัดลอก)`,
      description: lesson.description,
      is_public: false,
      steps: lesson.steps.map(s => ({
        id: generateUUID(),
        lesson_id: newLessonId,
        step_order: s.step_order,
        step_text: s.step_text,
        emoji: s.emoji
      }))
    };

    const success = await saveARLesson(duplicatedLesson, currentUser?.id || 'teacher_default');
    if (success) {
      alert('คัดลอกบทเรียนสำเร็จแล้ว! สามารถเข้าไปแก้ไขเป็นเนื้อหาของคุณได้ในตาราง');
      fetchLessons();
    } else {
      alert('เกิดข้อผิดพลาดในการคัดลอกบทเรียน');
      setLoading(false);
    }
  }


  async function handleDeleteLesson(lessonId: string) {
    if (!confirm('คุณแน่ใจว่าต้องการลบบทเรียนนี้อย่างถาวรใช่หรือไม่?')) return;

    setLoading(true);
    const success = await deleteARLesson(lessonId);
    if (success) {
      alert('ลบบทเรียนเรียบร้อยแล้ว');
      fetchLessons();
    } else {
      alert('เกิดข้อผิดพลาดในการลบบทเรียน');
      setLoading(false);
    }
  }


  function handleAddStep() {
    if (steps.length >= 6) {
      alert('แนะนำให้มีจำนวนสูงสุดไม่เกิน 6 ขั้นตอน เพื่อการแสดงผลที่สวยงามบนหน้าจอ AR');
      return;
    }
    setSteps([...steps, { step_order: steps.length + 1, step_text: '', emoji: '💡' }]);
  }

  // Remove last step in Editor
  function handleRemoveStep(index: number) {
    if (steps.length <= 2) {
      alert('บทเรียนต้องมีลำดับขั้นตอนอย่างน้อย 2 ขั้นตอน');
      return;
    }
    const newSteps = steps.filter((_, idx) => idx !== index);
    // Re-calculate step orders
    const resetOrderSteps = newSteps.map((s, idx) => ({
      ...s,
      step_order: idx + 1
    }));
    setSteps(resetOrderSteps);
  }

  // Update step field
  function handleUpdateStep(index: number, field: 'step_text' | 'emoji', value: any) {
    const newSteps = [...steps];
    newSteps[index] = {
      ...newSteps[index],
      [field]: value
    };
    setSteps(newSteps);
  }


  async function handleSave() {
    if (!title.trim()) {
      alert('กรุณากรอกชื่อบทเรียน/ด่าน');
      return;
    }


    const hasEmptyStep = steps.some(s => !s.step_text.trim());
    if (hasEmptyStep) {
      alert('กรุณากรอกข้อความรายละเอียดขั้นตอนให้ครบทุกช่อง');
      return;
    }

    setSaveLoading(true);
    const lessonId = editLessonId || generateUUID();

    const formattedSteps: ARStep[] = steps.map((s, idx) => ({
      id: generateUUID(),
      lesson_id: lessonId,
      step_order: idx + 1,
      step_text: s.step_text.trim(),
      emoji: s.emoji || '💡'
    }));

    const lessonData: Omit<ARLesson, 'school_id'> = {
      id: lessonId,
      created_by: currentUser?.id || 'teacher_default',
      title: title.trim(),
      description: description.trim(),
      is_public: isPublic,
      steps: formattedSteps
    };

    const success = await saveARLesson(lessonData, currentUser?.id || 'teacher_default');
    setSaveLoading(false);
    if (success) {
      setIsEditing(false);
      fetchLessons();
      alert('บันทึกบทเรียนเรียบร้อยแล้ว!');
    } else {
      alert('เกิดข้อผิดพลาดในการบันทึกบทเรียน');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 relative">
      {}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none"></div>

      {}
      <header className="relative z-10 flex justify-between items-center mb-8 bg-slate-900/40 backdrop-blur border border-white/10 p-5 rounded-3xl shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">AR Learning System</span>
            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {isEditing ? 'จัดการรายละเอียดบทเรียน' : 'คลังจัดระบบบทเรียนอัลกอริทึม (AR)'}
            </h1>
          </div>
        </div>

        {!isEditing && (
          <button
            onClick={handleNewLesson}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-cyan-500/25 transition duration-300 transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            สร้างบทเรียนใหม่
          </button>
        )}
      </header>

      {}
      <main className="relative z-10">

        {}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
            <p className="text-slate-400 text-sm animate-pulse">กำลังโหลดข้อมูลบทเรียนจากระบบฐานข้อมูล...</p>
          </div>
        )}

        {}
        {!loading && isEditing && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {}
            <div className="lg:col-span-1 bg-slate-900/60 backdrop-blur border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col gap-6">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-white/5 pb-3">
                <Sparkles className="w-5 h-5" />
                ตั้งค่าหลักของบทเรียน
              </h2>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">ชื่อบทเรียน/ด่าน *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="เช่น การต้มบะหมี่สำเร็จรูป 🍜"
                    className="flex-grow bg-slate-950 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-4 py-3 text-white transition min-w-0"
                  />
                  <button
                    type="button"
                    onClick={handleAICoWorkGenerate}
                    disabled={aiGenerating}
                    title="ให้น้องชบาช่วยออกแบบขั้นตอน"
                    className="px-4 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 rounded-xl flex items-center justify-center transition disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    {aiGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Bot className="w-5 h-5" />}
                  </button>
                </div>
                <span className="text-[10px] text-slate-500">✨ พิมพ์ชื่อหัวข้อด่านแล้วกดปุ่มหุ่นยนต์ ให้น้องชบาช่วยคิดขั้นตอนย่อยได้ทันที!</span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">รูปแบบบทเรียน / ด่าน</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setLessonMode('sequencing')}
                    className={`py-2 rounded-lg text-xs font-bold transition duration-200 cursor-pointer ${
                      lessonMode === 'sequencing'
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    เรียงตามลำดับขั้นตอน
                  </button>
                  <button
                    type="button"
                    onClick={() => setLessonMode('matching')}
                    className={`py-2 rounded-lg text-xs font-bold transition duration-200 cursor-pointer ${
                      lessonMode === 'matching'
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    เกมจับคู่คำถาม-คำตอบ
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">คำอธิบายภารกิจ</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="รายละเอียดสำหรับนักเรียนเพื่อประกอบการทำด่าน..."
                  rows={3}
                  className="w-full bg-slate-950 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-4 py-3 text-white transition resize-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">การแชร์และสิทธิ์</label>
                <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    {isPublic ? <Unlock className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5 text-amber-500" />}
                    <div>
                      <span className="text-sm font-semibold block">{isPublic ? 'แชร์สาธารณะ' : 'ส่วนตัวในวิชาคุณ'}</span>
                      <span className="text-xs text-slate-500">{isPublic ? 'ครูทุกคนในโรงเรียนเปิดดูได้' : 'เห็นและแก้สิทธิ์เฉพาะบัญชีคุณ'}</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="w-5 h-5 accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>

              {}
              <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-white/5 text-[11px] text-slate-400 flex flex-col gap-2.5">
                <span className="font-black text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Checklist ออกแบบด่าน AR:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-300">
                  <li>มีจำนวนขั้นตอนแนะนำ <span className="text-white font-bold">3 - 5 ขั้นตอน</span></li>
                  <li>ข้อความรายละเอียดสั้นกระชับ <span className="text-white font-bold">ไม่เกิน 15 ตัวอักษร</span></li>
                  <li>โจทย์จับคู่ใช้เครื่องหมายโคลอนคั่น เช่น <span className="text-cyan-300 font-mono font-bold">โจทย์ : คำตอบ</span></li>
                </ul>
              </div>

              <div className="flex gap-3 border-t border-white/5 pt-4 mt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold rounded-xl text-center transition"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
                >
                  {saveLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  บันทึกบทเรียน
                </button>
              </div>
            </div>

            {}
            <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur border border-white/10 p-6 rounded-3xl shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    กำหนดลำดับขั้นตอน (Algorithm Steps)
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">เรียงตามลำดับความจริงที่ถูกต้องตั้งแต่ขั้นตอนที่ 1 ไปจนสุด</p>
                </div>

                <button
                  onClick={handleAddStep}
                  className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-sm rounded-xl transition"
                >
                  <Plus className="w-4 h-4" />
                  เพิ่มขั้นตอน
                </button>
              </div>

              {}
              <div className="flex flex-col gap-4">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center gap-4 bg-slate-950/75 p-4 rounded-2xl border border-white/5 relative group hover:border-cyan-500/20 transition duration-300"
                  >
                    {}
                    <div className="w-10 h-10 flex items-center justify-center bg-cyan-500 text-slate-950 font-black rounded-xl text-lg shrink-0">
                      {step.step_order}
                    </div>

                    {}
                    <div className="flex flex-col gap-1 w-full md:w-20 shrink-0">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Emoji</label>
                      <input
                        type="text"
                        maxLength={2}
                        value={step.emoji}
                        onChange={(e) => handleUpdateStep(index, 'emoji', e.target.value)}
                        className="bg-slate-900 border border-white/10 text-center text-xl focus:border-cyan-400 focus:outline-none rounded-xl py-2 transition"
                      />
                    </div>

                    {}
                    <div className="flex flex-col gap-1 flex-grow w-full">
                      {lessonMode === 'sequencing' ? (
                        <>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">คำอธิบายขั้นตอนการแก้ปัญหา *</label>
                          <input
                            type="text"
                            value={step.step_text}
                            onChange={(e) => handleUpdateStep(index, 'step_text', e.target.value)}
                            placeholder={`รายละเอียดขั้นตอนที่ ${step.step_order} เช่น ลวกเส้นในน้ำเดือด`}
                            className="bg-slate-900 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-4 py-2.5 text-white transition w-full"
                          />
                        </>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">โจทย์ / คำถาม (แสดงบนการ์ด) *</label>
                            <input
                              type="text"
                              value={step.step_text.includes(':') || step.step_text.includes('：')
                                ? step.step_text.split(step.step_text.includes('：') ? '：' : ':')[0].trim()
                                : step.step_text}
                              onChange={(e) => {
                                const val = e.target.value;
                                const sep = step.step_text.includes('：') ? '：' : ':';
                                const right = (step.step_text.includes(':') || step.step_text.includes('：'))
                                  ? step.step_text.split(sep)[1].trim()
                                  : '';
                                handleUpdateStep(index, 'step_text', `${val} : ${right}`);
                              }}
                              placeholder="เช่น Apple หรือ 3 x 5"
                              className="bg-slate-900 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-4 py-2.5 text-white transition w-full"
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">คำแปล / คำตอบ (แสดงบนเป้าหมาย) *</label>
                            <input
                              type="text"
                              value={step.step_text.includes(':') || step.step_text.includes('：')
                                ? step.step_text.split(step.step_text.includes('：') ? '：' : ':')[1].trim()
                                : ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                const sep = step.step_text.includes('：') ? '：' : ':';
                                const left = (step.step_text.includes(':') || step.step_text.includes('：'))
                                  ? step.step_text.split(sep)[0].trim()
                                  : step.step_text;
                                handleUpdateStep(index, 'step_text', `${left} : ${val}`);
                              }}
                              placeholder="เช่น แอปเปิ้ล หรือ 15"
                              className="bg-slate-900 border border-white/10 focus:border-cyan-400 focus:outline-none rounded-xl px-4 py-2.5 text-white transition w-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {}
                    <button
                      onClick={() => handleRemoveStep(index)}
                      className="p-2 md:mt-4 bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-xl transition cursor-pointer md:opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {}
        {!loading && !isEditing && (
          <>
            <div className="bg-slate-900/40 backdrop-blur border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            {lessons.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-5xl mb-4 opacity-50">🗂️</div>
                <h3 className="text-lg font-bold text-slate-300">ยังไม่มีบทเรียนใดๆ ในระบบ</h3>
                <p className="text-slate-500 text-sm mt-1 mb-6 max-w-sm">เริ่มสร้างบทเรียนวิทยาการคำนวณบทเรียนแรกของคุณครู เพื่อให้นักเรียนเข้าเรียนรู้อัลกอริทึมในห้องเรียน</p>
                <button
                  onClick={handleNewLesson}
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl transition"
                >
                  สร้างบทเรียนแรก
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-slate-900/50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <th className="p-5">บทเรียน/โจทย์การเรียงลำดับ</th>
                      <th className="p-5">จำนวนขั้นตอน</th>
                      <th className="p-5">สถานะการแชร์</th>
                      <th className="p-5">ผู้สร้างสรรค์บทเรียน</th>
                      <th className="p-5 text-right">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {lessons.map((lesson) => {
                      const isOwner = !currentUser || lesson.created_by === currentUser.id;
                      return (
                        <tr
                          key={lesson.id}
                          className="hover:bg-white/5 transition duration-200 text-slate-200"
                        >
                          <td className="p-5">
                            <div className="font-extrabold text-white text-base">{lesson.title}</div>
                            {lesson.description && (
                              <div className="text-xs text-slate-400 mt-1 max-w-md truncate">{lesson.description}</div>
                            )}
                          </td>
                          <td className="p-5">
                            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 rounded-full font-bold text-xs">
                              {lesson.steps.length} ขั้นตอน (Slots)
                            </span>
                          </td>
                          <td className="p-5">
                            <div className="flex items-center gap-1.5">
                              {lesson.is_public ? (
                                <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                                  <Unlock className="w-3.5 h-3.5" /> สาธารณะ
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                                  <Lock className="w-3.5 h-3.5" /> ส่วนตัว
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-5 text-sm">
                            {isOwner ? (
                              <span className="text-cyan-400 font-bold">บัญชีของคุณ</span>
                            ) : (
                              <span className="text-slate-400">คุณครูท่านอื่น</span>
                            )}
                          </td>
                          <td className="p-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {isOwner || isAcademicOrManagement ? (
                                <>
                                  <button
                                    onClick={() => handleEditLesson(lesson)}
                                    className="p-2.5 bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 rounded-xl transition cursor-pointer"
                                    title="แก้ไขบทเรียน"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteLesson(lesson.id)}
                                    className="p-2.5 bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-xl transition cursor-pointer"
                                    title="ลบบทเรียน"
                                  >
                                    <Trash className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => handleDuplicateLesson(lesson)}
                                  className="flex items-center gap-1 px-3.5 py-2 bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/20 hover:border-indigo-500/40 text-indigo-400 font-bold text-xs rounded-xl transition cursor-pointer"
                                  title="คัดลอกบทเรียน"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                  คัดลอกสื่อ
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {}
          <div className="mt-8 bg-slate-900/40 backdrop-blur border border-white/10 p-6 rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div>
              <h3 className="text-cyan-400 font-extrabold text-base flex items-center gap-2 mb-3">
                <Bot className="w-5 h-5 text-cyan-400" />
                คู่มือน้องชบาช่วยคิดขั้นตอน 🤖 (คำแนะนำการป้อนหัวข้อ)
              </h3>
              <ul className="text-xs text-slate-300 space-y-2.5 list-disc pl-4 leading-relaxed">
                <li><strong className="text-white">โจทย์เลขคณิตศาสตร์:</strong> ป้อนหัวข้อที่มีคำว่า <span className="text-cyan-300 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800">"โจทย์เรียง"</span> หรือ <span className="text-cyan-300 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800">"ตัวเลข"</span> (เช่น <em>"เรียงตัวเลขจากน้อยไปมาก"</em>) น้องชบาจะสุ่มชุดตัวเลขสมมติคละกันมาให้จัดเรียง</li>
                <li><strong className="text-white">โจทย์ลำดับขั้นตอน/อัลกอริทึม:</strong> ป้อนหัวข้อที่มีคำว่า <span className="text-cyan-300 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800">"ขั้นตอน"</span> หรือ <span className="text-cyan-300 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800">"วิธีการ"</span> (เช่น <em>"ขั้นตอนการล้างมือ"</em>) น้องชบาจะส่งลำดับวิธีคิดย่อยมาให้เรียงลำดับ</li>
                <li><strong className="text-white">โจทย์การจับคู่วิชาการ:</strong> ป้อนหัวข้อที่มีคำว่า <span className="text-cyan-300 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800">"จับคู่"</span> หรือ <span className="text-cyan-300 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800">"คำศัพท์"</span> (เช่น <em>"จับคู่คำศัพท์ภาษาอังกฤษ"</em>) น้องชบาจะสร้างข้อความแบบมีโคลอน <code className="text-cyan-300 bg-cyan-950/40 px-1 py-0.5 rounded border border-cyan-800">:</code> แยกโจทย์กับคำแปลอย่างประณีต</li>
              </ul>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-white/5 md:pl-6 pt-6 md:pt-0">
              <h3 className="text-amber-400 font-extrabold text-base flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-400" />
                แนวทางการออกแบบด่านให้ได้ผลลัพธ์ดีที่สุด 💡
              </h3>
              <ul className="text-xs text-slate-300 space-y-2.5 list-disc pl-4 leading-relaxed">
                <li><strong className="text-white">จำนวนขั้นตอนที่เหมาะสม:</strong> แนะนำให้สร้างบทเรียนประมาณ <strong className="text-amber-300">3 ถึง 5 ขั้นตอน</strong> (สูงสุดไม่เกิน 6) เพื่อการจัดวางที่สวยงามและไม่ทับซ้อนกันบนหน้าจอ AR</li>
                <li><strong className="text-white">ความยาวข้อความสั้นกระชับ:</strong> พยายามจำกัดความยาวไม่เกิน <strong className="text-amber-300">15 ตัวอักษร</strong> เพื่อให้ตัวหนังสืออ่านง่าย คมชัด และไม่ล้นกรอบการ์ดในเกม</li>
                <li><strong className="text-white">การประยุก輳์ใช้ในวัยอนุบาล:</strong> เน้นการใช้รูปภาพ Emoji เด่นๆ เป็นสื่อการสอนหลัก และแนะนำให้เด็กๆ เล่นผ่าน <strong className="text-amber-300">แท็บเล็ต/จอสัมผัส</strong> โดยใช้นิ้วลากแทนการใช้กล้องเว็บแคม</li>
              </ul>
            </div>
          </div>
        </>
      )}

      </main>
    </div>
  );
}
````

## File: src/pages/Dashboard.tsx
````typescript
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  Loader2,
  FileText,
  FileDown,
  FileUp,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Inbox
} from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    incomingTotal: 0,
    outgoingTotal: 0,
    ordersTotal: 0,
    memosTotal: 0,
    pendingTasks: 0,
    completedTasks: 0
  });
  const [recentDocs, setRecentDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {

        const { count: incomingCount } = await supabase
          .from('incoming_docs')
          .select('*', { count: 'exact', head: true });


        const { count: outgoingCount } = await supabase
          .from('outgoing_docs')
          .select('*', { count: 'exact', head: true });


        const { count: ordersCount } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true });


        const { count: memosCount } = await supabase
          .from('memos')
          .select('*', { count: 'exact', head: true });


        const { count: pendingTaskCount } = await supabase
          .from('doc_assignments')
          .select('*', { count: 'exact', head: true })
          .in('status', ['pending', 'acknowledged']);


        const { count: completedCount } = await supabase
          .from('doc_assignments')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'completed');


        const { data: latestDocs } = await supabase
          .from('incoming_docs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          incomingTotal: incomingCount || 0,
          outgoingTotal: outgoingCount || 0,
          ordersTotal: ordersCount || 0,
          memosTotal: memosCount || 0,
          pendingTasks: pendingTaskCount || 0,
          completedTasks: completedCount || 0
        });
        setRecentDocs(latestDocs || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm animate-in fade-in">
      <Loader2 className="animate-spin text-brand-primary mb-4" size={40} />
      <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">กำลังดึงข้อมูลสถิติล่าสุด...</p>
    </div>
  );

  return (
    <div className="space-y-8 p-8 max-w-6xl mx-auto overflow-y-auto h-full pb-24 scrollbar-hide animate-in fade-in duration-500">

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="หนังสือรับสะสม" value={stats.incomingTotal} color="bg-blue-500" icon={<FileDown size={28} />} />
        <StatCard label="หนังสือส่งสะสม" value={stats.outgoingTotal} color="bg-orange-500" icon={<FileUp size={28} />} />
        <StatCard label="คำสั่งโรงเรียน" value={stats.ordersTotal} color="bg-purple-500" icon={<BookOpen size={28} />} />
        <StatCard label="บันทึกข้อความ" value={stats.memosTotal} color="bg-teal-500" icon={<FileText size={28} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {}
        <div className="lg:col-span-2 space-y-8">
           {}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                 <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                    <AlertCircle size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">งานที่รอดำเนินการ</p>
                    <p className="text-2xl font-black text-slate-800">{stats.pendingTasks} รายการ</p>
                 </div>
              </div>
              <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                 <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                    <CheckCircle2 size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">งานที่รายงานผลแล้ว</p>
                    <p className="text-2xl font-black text-slate-800">{stats.completedTasks} รายการ</p>
                 </div>
              </div>
           </div>

           {}
           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Inbox size={20} className="text-orange-500" /> เอกสารรับเข้าล่าสุด</h3>
              <div className="space-y-4">
                  {recentDocs.length === 0 ? (
                    <div className="py-10 text-center text-slate-400 italic font-bold">ไม่มีรายการเอกสารใหม่วันนี้</div>
                  ) : recentDocs.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                      <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-xs group-hover:text-orange-500 transition-colors"><FileText size={18} /></div>
                        <div>
                          <p className="text-sm font-bold text-slate-700 truncate max-w-[250px] md:max-w-[400px]">{doc.subject}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter mt-0.5">{doc.from_agency}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">
                        {new Date(doc.created_at).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  ))}
              </div>
           </div>
        </div>

        {}
        <div className="space-y-8">
           <div className="bg-brand-primary p-8 rounded-[40px] text-white shadow-xl shadow-green-100/50 relative overflow-hidden h-fit">
              <div className="relative z-10">
                <h4 className="font-black text-xl mb-2">ระบบสารบรรณอิเล็กทรอนิกส์</h4>
                <p className="text-xs text-green-100 font-bold leading-relaxed">
                  ระบบสารบรรณอิเล็กทรอนิกส์และบอทน้องชบา AI ยินดีต้อนรับเข้าปฏิบัติงานในวันนี้ค่ะ
                </p>
                <div className="mt-6 flex items-center gap-2 bg-white/20 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
                   <TrendingUp size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">System Online</span>
                </div>
              </div>
              <Inbox className="absolute -right-8 -bottom-8 text-white/10" size={160} />
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon }: any) {
  return (
    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform`}>{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black text-slate-800 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
````

## File: src/pages/Memos.tsx
````typescript
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { uploadFile, deleteFileFromDrive } from '../lib/storage';
import { useAuth } from '../contexts/AuthContext';
import { sendLineNotification, sendInteractiveFlexMessage } from '../lib/lineNotify';
import { generateAIDraft } from '../lib/aiService';
import Modal from '../components/Modal';
import {
  Search,
  ExternalLink,
  Loader2,
  Save,
  MessageSquare,
  Trash2,
  Printer,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Bot
} from 'lucide-react';
import garuda15mm from '../assets/saraban/garuda-1.5cm.png';

export default function Memos() {
  const { user, profile } = useAuth();
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const currentYearBE = new Date().getFullYear() + 543;
  const [selectedYear, setSelectedYear] = useState<number | null>(currentYearBE);
  const [latestNumber, setLatestNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedMemoForApproval, setSelectedMemoForApproval] = useState<any>(null);
  const [directorDecision, setDirectorDecision] = useState<'อนุมัติ' | 'ทราบ'>('อนุมัติ');
  const [directorOpinion, setDirectorOpinion] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const defaultSchoolName = import.meta.env.VITE_SCHOOL_NAME || 'โรงเรียน';

  const [formData, setFormData] = useState({
    memo_number: '',
    subject: '',
    requester: '',
    department: '',
    memo_date: new Date().toISOString().split('T')[0],
    to_person: `ผู้อำนวยการ${defaultSchoolName}`,
    content: '',
    closing_phrase: 'จึงเรียนมาเพื่อทราบ',
    sign_name: '',
    sign_position: '',
    online_submit: true,
    ai_key_points: '',
    show_director_opinion: false
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDrafting, setIsDrafting] = useState(false);

  useEffect(() => {
    fetchDocs();
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const { data } = await supabase.from('settings').select('*').maybeSingle();
    if (data) {
      setSettings(data);
      setFormData(prev => ({
        ...prev,
        department: data.school_name || defaultSchoolName,
        sign_name: '',
        sign_position: `ครู${data.school_name || defaultSchoolName}`,
        to_person: `ผู้อำนวยการ${data.school_name || defaultSchoolName}`
      }));
    }
  }

  async function fetchDocs(yearToFetch = selectedYear) {
    setLoading(true);
    try {
      let query = supabase.from('memos').select('*');
      if (yearToFetch) {
        query = query.eq('doc_year', yearToFetch);
      }
      const { data } = await query.order('created_at', { ascending: false });
      setDocs(data || []);

      if (yearToFetch) {
        const { data: latestSeqDoc } = await supabase
          .from('memos')
          .select('memo_number')
          .eq('doc_year', yearToFetch)
          .order('doc_sequence', { ascending: false })
          .limit(1);
        if (latestSeqDoc && latestSeqDoc.length > 0) {
          setLatestNumber(latestSeqDoc[0].memo_number);
        } else {
          setLatestNumber('');
        }
      } else if (data && data.length > 0) {
        setLatestNumber(data[0].memo_number);
      } else {
        setLatestNumber('');
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  const isDirector = profile?.role === 'director' || profile?.role === 'admin';

  const getNextMemoNumber = (customDate = formData.memo_date) => {
    const docDateObj = new Date(customDate);
    const targetYear = docDateObj.getFullYear() + 543;

    const yearDocs = docs.filter(d => d.doc_year === targetYear);
    if (yearDocs.length === 0) {
      return `1/${targetYear}`;
    }

    let maxNum = 0;
    yearDocs.forEach(d => {
      if (d.doc_sequence && d.doc_sequence > maxNum) {
        maxNum = d.doc_sequence;
      } else if (d.memo_number) {
        const match = d.memo_number.match(/^(\d+)/);
        if (match) {
          const num = parseInt(match[1]);
          if (num > maxNum) {
            maxNum = num;
          }
        }
      }
    });
    return `${maxNum + 1}/${targetYear}`;
  };

  async function handleStatusUpdate(id: string, newStatus: string) {
    try {
      const { error } = await supabase.from('memos').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
      alert(`อัปเดตสถานะเป็น ${newStatus === 'approved' ? 'อนุมัติ' : 'ไม่อนุมัติ'} เรียบร้อยแล้ว`);
      fetchDocs();
    } catch (err: any) {
      alert('ไม่สามารถอัปเดตสถานะได้: ' + err.message);
    }
  }

  async function handleApprovalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedMemoForApproval) return;
    setIsSaving(true);
    try {
      let extraData: any = {};
      try {
        if (selectedMemoForApproval.remark && selectedMemoForApproval.remark.startsWith('{')) {
          extraData = JSON.parse(selectedMemoForApproval.remark);
        }
      } catch (err) {}

      const todayThai = new Date().toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const updatedExtraData = {
        ...extraData,
        director_decision: directorDecision,
        director_opinion: directorOpinion,
        approved_date: todayThai,
        show_director_opinion: true
      };

      const { error } = await supabase.from('memos').update({
        status: 'approved',
        remark: JSON.stringify(updatedExtraData)
      }).eq('id', selectedMemoForApproval.id);

      if (error) throw error;


      let requesterLineUserId = '';
      if (selectedMemoForApproval.created_by) {
        const { data: reqProfile } = await supabase
          .from('profiles')
          .select('line_user_id')
          .eq('id', selectedMemoForApproval.created_by)
          .maybeSingle();
        requesterLineUserId = reqProfile?.line_user_id || '';
      }

      // ส่ง LINE แจ้งเตือนครูผู้เสนอ
      const lineMessage = `\n✅ บันทึกข้อความได้รับการอนุมัติแล้ว\nเรื่อง: ${selectedMemoForApproval.subject}\nผลการพิจารณา: ${directorDecision}\nความเห็น ผอ.: ${directorOpinion || '-'}\n\nครูผู้เสนอสามารถพิมพ์เอกสารใบจริงที่มีลายเซ็น ผอ. ได้ในระบบ`;
      if (requesterLineUserId) {
        await sendLineNotification(lineMessage, requesterLineUserId);
      } else {
        await sendLineNotification(lineMessage);
      }

      alert('บันทึกการอนุมัติและลายเซ็นเรียบร้อยแล้ว');
      setIsApprovalModalOpen(false);
      fetchDocs();
    } catch (err: any) {
      alert('ไม่สามารถบันทึกการอนุมัติได้: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleApprovalReject() {
    if (!selectedMemoForApproval) return;
    setIsSaving(true);
    try {
      let extraData: any = {};
      try {
        if (selectedMemoForApproval.remark && selectedMemoForApproval.remark.startsWith('{')) {
          extraData = JSON.parse(selectedMemoForApproval.remark);
        }
      } catch (err) {}

      const updatedExtraData = {
        ...extraData,
        director_decision: 'ส่งกลับแก้ไข',
        director_opinion: directorOpinion,
        show_director_opinion: true
      };

      const { error } = await supabase.from('memos').update({
        status: 'rejected',
        remark: JSON.stringify(updatedExtraData)
      }).eq('id', selectedMemoForApproval.id);

      if (error) throw error;


      let requesterLineUserId = '';
      if (selectedMemoForApproval.created_by) {
        const { data: reqProfile } = await supabase
          .from('profiles')
          .select('line_user_id')
          .eq('id', selectedMemoForApproval.created_by)
          .maybeSingle();
        requesterLineUserId = reqProfile?.line_user_id || '';
      }

      // ส่ง LINE แจ้งเตือนไม่อนุมัติ
      const lineMessage = `\n❌ บันทึกข้อความ "ส่งกลับแก้ไข/ไม่อนุมัติ"\nเรื่อง: ${selectedMemoForApproval.subject}\nหมายเหตุ ผอ.: ${directorOpinion || '-'}\n\nกรุณาเข้าตรวจสอบและแก้ไขในระบบ`;
      if (requesterLineUserId) {
        await sendLineNotification(lineMessage, requesterLineUserId);
      } else {
        await sendLineNotification(lineMessage);
      }

      alert('บันทึกข้อมูลส่งกลับแก้ไขเรียบร้อยแล้ว');
      setIsApprovalModalOpen(false);
      fetchDocs();
    } catch (err: any) {
      alert('ล้มเหลว: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  const handleAIDraft = async () => {
    if (!formData.subject) {
      alert('กรุณาระบุชื่อเรื่องก่อนให้ AI ร่างข้อความครับ');
      return;
    }
    setIsDrafting(true);
    try {
      const prompt = `เขียนเนื้อหาบันทึกข้อความราชการ เรื่อง "${formData.subject}" โดยส่งถึง "${formData.to_person}" ${formData.ai_key_points ? `โดยมีใจความสำคัญคือ: "${formData.ai_key_points}"` : ''} ให้เขียนด้วยภาษาทางการ สละสลวย ตามระเบียบงานสารบรรณไทย เน้นเนื้อหาที่กระชับ ชัดเจน และเป็นมืออาชีพ โดยเน้นการบรรยายเนื้อหาใจความสำคัญ ห้ามมีคำลงท้าย (เช่น จึงเรียนมาเพื่อโปรดทราบ/พิจารณา) และห้ามใส่ส่วนลงลายมือชื่อ (ลงชื่อ/ตำแหน่ง) ท้ายข้อความเด็ดขาด เนื่องจากระบบจัดทำส่วนนี้แยกไว้แล้ว และห้ามใส่หัวเรื่อง เช่น 'บันทึกข้อความ', 'ส่วนราชการ', 'ที่', 'วันที่', 'เรื่อง', 'เรียน' มาในผลลัพธ์เด็ดขาด ให้เริ่มเนื้อความบรรยายโดยตรง`;
      const draft = await generateAIDraft(prompt);
      if (draft) {
        let cleanDraft = draft;
        // ทำความสะอาดหัวกระดาษบันทึกข้อความที่ AI อาจจะแถมมา
        cleanDraft = cleanDraft.replace(/^(บันทึกข้อความ|ส่วนราชการ|ที่|วันที่|เรื่อง|เรียน).*\n?/gim, '');

        // ทำความสะอาดคำลงท้ายและลายเซ็นที่ AI อาจแถมมา
        cleanDraft = cleanDraft.replace(/จึงเรียนมาเพื่อ.*/g, '');
        cleanDraft = cleanDraft.replace(/จึงเรียนเสนอมาเพื่อ.*/g, '');
        cleanDraft = cleanDraft.replace(/จึงเสนอมาเพื่อ.*/g, '');

        const sigIndex = cleanDraft.indexOf('(ลงชื่อ)');
        if (sigIndex !== -1) cleanDraft = cleanDraft.substring(0, sigIndex);

        const sigIndex2 = cleanDraft.indexOf('ลงชื่อ...');
        if (sigIndex2 !== -1) cleanDraft = cleanDraft.substring(0, sigIndex2);

        const sigIndex3 = cleanDraft.indexOf('ลงชื่อ .');
        if (sigIndex3 !== -1) cleanDraft = cleanDraft.substring(0, sigIndex3);

        cleanDraft = cleanDraft.replace(/จึงเรียนมาเพื่อทราบ/g, '');
        cleanDraft = cleanDraft.replace(/จึงเรียนมาเพื่อโปรดทราบ/g, '');
        cleanDraft = cleanDraft.replace(/จึงเรียนมาเพื่อพิจารณา/g, '');
        cleanDraft = cleanDraft.replace(/จึงเรียนมาเพื่อโปรดพิจารณา/g, '');
        cleanDraft = cleanDraft.trim();

        setFormData(prev => ({ ...prev, content: cleanDraft }));
      }
    } catch (err: any) {
      alert('AI Draft Error: ' + err.message);
    } finally {
      setIsDrafting(false);
    }
  };

  const printMemo = (doc: any) => {
    let extraData: any = {};
    try {
      if (doc.remark && doc.remark.startsWith('{')) {
        extraData = JSON.parse(doc.remark);
      }
    } catch (e) {}

    const data = { ...doc, ...extraData };
    const date = new Date(data.memo_date).toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const html = `
      <html>
        <head>
          <title>บันทึกข้อความ - ${data.memo_number}</title>
          <style>
            @font-face {
              font-family: 'THSarabunIT๙';
              src: local('THSarabunIT๙');
            }
            body {
              font-family: 'THSarabunIT๙', 'TH Sarabun New', sans-serif;
              padding: 0;
              margin: 0;
              background: #f0f0f0;
            }
            .page {
              background: white;
              width: 210mm;
              height: 297mm;
              margin: 10mm auto;
              padding: 1.5cm 1cm 2cm 3cm;
              box-sizing: border-box;
              position: relative;
              font-size: 16pt;
              line-height: 1.15;
            }
            .memo-header {
              display: flex;
              align-items: flex-end;
              border-bottom: 2px solid black;
              padding-bottom: 5px;
              margin-bottom: 10px;
            }
            .garuda {
              width: 1.5cm;
              height: auto;
              margin-right: 10px;
            }
            .header-title {
              font-size: 29pt;
              font-weight: bold;
              line-height: 1;
            }
            .info-line {
              margin: 5px 0;
              display: flex;
            }
            .info-label {
              font-weight: bold;
              margin-right: 5px;
            }
            .info-date {
              position: absolute;
              left: 10.0cm;
              display: flex;
            }
            .content-text {
              margin-top: 0.4cm;
              line-height: 1.15;
            }
            .content-text p {
              margin-top: 0.3cm;
              margin-bottom: 0;
              text-indent: 2.5cm;
              text-align: justify;
              font-size: 16pt;
              word-break: break-word;
              overflow-wrap: break-word;
            }
            .closing-phrase {
              margin-top: 0.5cm;
              text-indent: 2.5cm;
              text-align: justify;
              font-size: 16pt;
            }
            .sig-block {
              margin-top: 1.5cm;
              margin-left: 7.8cm;
              width: 8cm;
            }
            .sig-name-block {
              text-align: center;
              margin-left: -4.8cm;
              line-height: 1.5;
            }
            @media print {
              body { background: white; }
              .page { margin: 0; box-shadow: none; width: 100%; height: 100%; }
              .no-print { display: none; }
            }
            .no-print-btn {
              position: fixed; top: 20px; right: 20px;
              background: #2563eb; color: white; border: none;
              padding: 12px 24px; border-radius: 12px; cursor: pointer;
              font-weight: bold; z-index: 9999;
            }
          </style>
        </head>
        <body>
          <button class="no-print-btn no-print" onclick="window.print()">🖨️ พิมพ์บันทึกข้อความ</button>
          <div class="page">
            <div class="memo-header" style="position: relative; display: flex; align-items: center; justify-content: center; border-bottom: 2px solid black; padding-bottom: 5px; margin-bottom: 10px; height: 1.8cm;">
              <img src="${garuda15mm}" class="garuda" style="position: absolute; left: 0; bottom: 5px; width: 1.5cm; height: auto;" />
              <div class="header-title" style="font-size: 29pt; font-weight: bold; line-height: 1.8cm;">บันทึกข้อความ</div>
            </div>
            <div class="info-line">
              <div style="flex: 1; display: flex;"><span class="info-label">ส่วนราชการ</span> ${data.department || ''}</div>
            </div>
            <div class="info-line">
              <div style="flex: 1; display: flex;"><span class="info-label">ที่</span> ${data.memo_number || ''}</div>
              <div class="info-date"><span class="info-label">วันที่</span> ${date}</div>
            </div>
            <div class="info-line">
              <div style="flex: 1; display: flex;"><span class="info-label">เรื่อง</span> ${data.subject || ''}</div>
            </div>
            <div style="margin-top: 0.5cm;">
              <span class="info-label">เรียน</span> ${data.to_person || ''}
            </div>
            <div class="content-text">
              ${(data.content || '').split('\n').filter((p: string) => p.trim() !== '').map((p: string) => `<p>${p}</p>`).join('')}
            </div>

            ${data.closing_phrase ? `<div class="closing-phrase">${data.closing_phrase}</div>` : ''}

            <div class="sig-block">
              <div class="sig-name-block" style="position: relative;">
                ${(data.requester_signature_url || profile?.signature_url) ? `
                  <div style="position: absolute; left: calc(50% + 0.5cm); transform: translateX(-50%); top: -1.0cm; width: 3.5cm; height: 1.2cm; z-index: 10; pointer-events: none;">
                    <img src="${data.requester_signature_url || profile?.signature_url}" style="width: 100%; height: 100%; object-fit: contain;" />
                  </div>
                ` : ''}
                (ลงชื่อ)......................................................<br/>
                ( ${data.sign_name || data.requester || '................................................'} )<br/>
                ตำแหน่ง ${data.sign_position || '................................................'}
              </div>
            </div>

            ${data.show_director_opinion ? `
            <div style="margin-top: 1.5cm; display: flex; justify-content: flex-end; page-break-inside: avoid;">
              <div style="width: 10cm; font-size: 16pt; line-height: 1.6; box-sizing: border-box;">
                <div style="font-weight: bold; margin-bottom: 8px;">ความเห็น/คำสั่งผู้อำนวยการ</div>
                [ ${data.director_decision === 'ทราบ' ? '✓' : '&nbsp;'} ] ทราบ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [ ${data.director_decision === 'อนุมัติ' ? '✓' : '&nbsp;'} ] อนุมัติ<br/>
                ความเห็นเพิ่มเติม ${data.director_opinion ? `<span style="font-family: 'THSarabunIT๙', 'TH Sarabun New', sans-serif;">${data.director_opinion}</span>` : '..........................................................................'}<br/>
                ${!data.director_opinion ? '......................................................................................................<br/>' : ''}
                <div style="text-align: center; margin-top: 0.5cm; line-height: 1.5; position: relative;">
                  ${(data.status === 'approved' && settings?.director_signature_url) ? `
                    <div style="position: absolute; left: calc(50% + 0.5cm); transform: translateX(-50%); top: -0.9cm; width: 3.5cm; height: 1.2cm; z-index: 10; pointer-events: none;">
                      <img src="${settings.director_signature_url}" style="width: 100%; height: 100%; object-fit: contain;" />
                    </div>
                  ` : ''}
                  (ลงชื่อ).......................................................<br/>
                  ( ${settings?.director_name || '................................................'} )<br/>
                  ผู้อำนวยการ${settings?.school_name || defaultSchoolName}<br/>
                  วันที่ ${data.approved_date ? `<span style="font-family: 'THSarabunIT๙', 'TH Sarabun New', sans-serif;">${data.approved_date}</span>` : '......./......./.......'}
                </div>
              </div>
            </div>
            ` : ''}
          </div>
        </body>
      </html>
    `;
    const win = window.open('', '_blank');
    win?.document.write(html);
    win?.document.close();
  };

  async function handleDelete(id: string) {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้? รวมถึงไฟล์ใน Drive จะถูกลบด้วย')) return;
    try {
      const { data: doc } = await supabase.from('memos').select('file_url').eq('id', id).single();
      if (doc?.file_url) {
        await deleteFileFromDrive(doc.file_url);
      }
      const { error } = await supabase.from('memos').delete().eq('id', id);
      if (error) throw error;
      alert('ลบข้อมูลและไฟล์เรียบร้อยแล้ว');
      fetchDocs();
    } catch (err: any) {
      alert('ลบไม่สำเร็จ: ' + err.message);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      let file_url = '';
      if (selectedFile) {
        try {
          file_url = await uploadFile(selectedFile, 'documents', 'memos');
        } catch (uploadErr: any) {
          throw new Error(`อัปโหลดไฟล์ไม่สำเร็จ: ${uploadErr.message}`);
        }
      }

      const extraData = {
        to_person: formData.to_person,
        content: formData.content,
        closing_phrase: formData.closing_phrase,
        sign_name: formData.sign_name,
        sign_position: formData.sign_position,
        online_submit: formData.online_submit,
        show_director_opinion: formData.show_director_opinion,
        requester_signature_url: profile?.signature_url || ''
      };

      const docDateObj = new Date(formData.memo_date);
      const docYear = docDateObj.getFullYear() + 543;

      // ค้นหา sequence ถัดไป
      const { data: seqData } = await supabase
        .from('memos')
        .select('doc_sequence')
        .eq('doc_year', docYear)
        .order('doc_sequence', { ascending: false })
        .limit(1);

      const docSeq = (seqData && seqData.length > 0) ? (Number(seqData[0].doc_sequence) + 1) : 1;
      const finalMemoNumber = formData.memo_number.trim() || `${docSeq}/${docYear}`;

      const { data: insertedDocs, error } = await supabase.from('memos').insert([{
        memo_number: finalMemoNumber,
        subject: formData.subject,
        requester: formData.requester,
        department: formData.department,
        memo_date: formData.memo_date,
        remark: JSON.stringify(extraData),
        file_url,
        status: formData.online_submit ? 'pending' : 'approved',
        created_by: user?.id,
        doc_year: docYear,
        doc_sequence: docSeq
      }]).select();

      if (error) throw new Error(`บันทึกข้อมูลไม่สำเร็จ: ${error.message}`);
      const insertedDoc = insertedDocs?.[0];

      // ดึงไลน์ ผอ. เพื่อเสนอตรง
      const { data: dirProfile } = await supabase
        .from('profiles')
        .select('line_user_id')
        .eq('role', 'director')
        .maybeSingle();

      if (formData.online_submit) {
        const lineMessage = `เรื่อง: ${formData.subject}\nผู้เสนอ: ${formData.requester}\nหน่วยงาน: ${formData.department}`;
        const lineActions: any[] = [
          { label: '✅ อนุมัติลงนาม', type: 'postback', data: `action=approve_doc&type=memo&id=${insertedDoc?.id || ''}`, color: '#1DB446' },
          { label: '❌ ส่งกลับแก้ไข', type: 'postback', data: `action=reject_doc&type=memo&id=${insertedDoc?.id || ''}`, color: '#FF3B30' }
        ];
        if (file_url) {
          lineActions.unshift({ label: '📄 ดูร่างบันทึก', type: 'uri', uri: file_url });
        }
        await sendInteractiveFlexMessage(
          dirProfile?.line_user_id || undefined,
          '⏳ เสนออนุมัติบันทึกข้อความ',
          lineMessage,
          lineActions
        );
      } else {
        const lineMessage = `เลขที่บันทึก: ${finalMemoNumber}\nเรื่อง: ${formData.subject}\nผู้เสนอ: ${formData.requester}`;
        const lineActions = file_url ? [{ label: '📄 ดูเอกสาร', type: 'uri' as const, uri: file_url }] : [];
        await sendInteractiveFlexMessage(
          undefined, // ส่งเข้ากลุ่ม
          '📝 บันทึกข้อความใหม่ (ลงทะเบียนตรง)',
          lineMessage,
          lineActions
        );
      }

      setIsModalOpen(false);
      resetForm();
      fetchDocs();
      alert('บันทึกบันทึกข้อความเรียบร้อยแล้ว');
    } catch (err: any) {
      console.error(err);
      alert(`ไม่สามารถบันทึกได้: ${err.message}`);
    } finally { setIsSaving(false); }
  }

  function resetForm() {
    setFormData({
      memo_number: '',
      subject: '',
      requester: '',
      department: settings?.school_name || defaultSchoolName,
      memo_date: new Date().toISOString().split('T')[0],
      to_person: `ผู้อำนวยการ${settings?.school_name || defaultSchoolName}`,
      content: '',
      closing_phrase: 'จึงเรียนมาเพื่อทราบ',
      sign_name: '',
      sign_position: `ครู${settings?.school_name || defaultSchoolName}`,
      online_submit: true,
      ai_key_points: '',
      show_director_opinion: false
    });
    setSelectedFile(null);
    setIsDrafting(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-2xl flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input type="text" placeholder="ค้นหาบันทึกข้อความ..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-hidden shadow-xs" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <select
            value={selectedYear || ''}
            onChange={(e) => {
              const val = e.target.value ? parseInt(e.target.value) : null;
              setSelectedYear(val);
              fetchDocs(val);
            }}
            className="p-3 bg-white border border-slate-200 rounded-2xl outline-hidden shadow-xs font-bold text-slate-700 text-sm h-[48px]"
          >
            <option value="">ดูทั้งหมด</option>
            <option value={currentYearBE}>{currentYearBE}</option>
            <option value={currentYearBE - 1}>{currentYearBE - 1}</option>
            <option value={currentYearBE - 2}>{currentYearBE - 2}</option>
          </select>

          {latestNumber && (
            <div className="shrink-0 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-1.5 whitespace-nowrap shadow-xs h-[48px] flex items-center">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-tighter mr-1">ล่าสุด:</span>
              <span className="text-xs font-black text-blue-600 tracking-tight">{latestNumber}</span>
            </div>
          )}
        </div>
        <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="bg-brand-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all">
          <MessageSquare size={20} /> ออกเลขบันทึกข้อความ
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">เลขที่ / วันที่</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">เรื่อง</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">สถานะ</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan={4} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-brand-primary" /></td></tr>
            ) : docs.length === 0 ? (
              <tr><td colSpan={4} className="py-20 text-center text-slate-400 italic">ไม่พบข้อมูลบันทึกข้อความ</td></tr>
            ) : (
              docs.filter(d => d.subject.includes(searchTerm)).map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 text-sm">{doc.memo_number}</div>
                    <div className="text-[10px] text-slate-400">{doc.memo_date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-700">{doc.subject}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">โดย: {doc.requester}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {doc.status === 'approved' ? (
                      <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase inline-flex items-center gap-1"><CheckCircle size={12} /> อนุมัติแล้ว</span>
                    ) : doc.status === 'rejected' ? (
                      <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase inline-flex items-center gap-1"><XCircle size={12} /> ไม่อนุมัติ</span>
                    ) : (
                      <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase inline-flex items-center gap-1"><Clock size={12} /> รออนุมัติ</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {isDirector && doc.status === 'pending' && (
                        <>
                          <button onClick={() => { setSelectedMemoForApproval(doc); setDirectorDecision('อนุมัติ'); setDirectorOpinion(''); setIsApprovalModalOpen(true); }} className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="พิจารณาอนุมัติ"><CheckCircle size={18} /></button>
                        </>
                      )}
                      <button onClick={() => printMemo(doc)} className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors" title="พิมพ์บันทึก"><Printer size={18} /></button>
                      {doc.file_url && <a href={doc.file_url} target="_blank" className="p-2 text-slate-400 hover:text-brand-primary"><ExternalLink size={18} /></a>}
                      <button onClick={() => handleDelete(doc.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="ลบข้อมูล"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="ออกเลขบันทึกข้อความและสร้างเอกสาร">
        <form onSubmit={handleSave} className="space-y-4 max-h-[80vh] overflow-y-auto px-1 pb-4 text-slate-700">
          <div className="bg-slate-50 p-4 rounded-2xl space-y-4 border border-slate-100">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><FileText size={14} /> ข้อมูลหัวบันทึก</h4>
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-10 h-6 rounded-full transition-all relative ${formData.online_submit ? 'bg-brand-primary' : 'bg-slate-200'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.online_submit ? 'left-5' : 'left-1'}`}></div>
                </div>
                <input type="checkbox" className="hidden" checked={formData.online_submit} onChange={e => setFormData({...formData, online_submit: e.target.checked})} />
                <span className="text-[10px] font-black text-slate-400 uppercase group-hover:text-brand-primary">เสนอออนไลน์</span>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 ml-1">ส่วนราชการ</label>
                <input type="text" className="w-full p-3 bg-white border border-slate-200 rounded-xl" required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 ml-1">ที่</label>
                <input type="text" placeholder="เลขที่บันทึก" className="w-full p-3 bg-white border border-slate-200 rounded-xl" required value={formData.memo_number} onChange={e => setFormData({...formData, memo_number: e.target.value})} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 ml-1">วันที่</label>
                <input type="date" className="w-full p-3 bg-white border border-slate-200 rounded-xl" required value={formData.memo_date} onChange={e => setFormData({...formData, memo_date: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 ml-1">เรื่อง</label>
                <input type="text" className="w-full p-3 bg-white border border-slate-200 rounded-xl" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 ml-1">เรียน</label>
              <input type="text" className="w-full p-3 bg-white border border-slate-200 rounded-xl" required value={formData.to_person} onChange={e => setFormData({...formData, to_person: e.target.value})} />
            </div>
          </div>

          <div className="bg-blue-50/30 p-4 rounded-2xl border border-blue-100/50 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                <Bot size={14} /> รายละเอียดใจความสำคัญสำหรับ AI
              </label>
              <button
                type="button"
                onClick={handleAIDraft}
                disabled={isDrafting}
                className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 px-4 py-2 rounded-xl shadow-sm transition-all ${isDrafting ? 'bg-slate-100 text-slate-400' : 'bg-brand-primary text-white hover:bg-green-700 active:scale-95'}`}
              >
                {isDrafting ? <Loader2 size={12} className="animate-spin" /> : <Bot size={12} />}
                {isDrafting ? 'กำลังร่าง...' : 'สั่ง AI ร่างข้อความ'}
              </button>
            </div>
            <input
              type="text"
              placeholder="ระบุสิ่งที่ต้องการให้ AI เขียนเพิ่ม (เช่น แจ้งผลการแข่งขันทักษะวิชาการ ได้รับรางวัลระดับเหรียญทอง)"
              className="w-full p-3 bg-white border border-blue-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-200 outline-hidden transition-all placeholder:text-slate-300"
              value={formData.ai_key_points}
              onChange={e => setFormData({...formData, ai_key_points: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 ml-1 tracking-widest uppercase">เนื้อหาข้อความจริง</label>
            <textarea placeholder="เนื้อหาที่ AI ร่างจะปรากฏที่นี่..." className="w-full p-4 bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-brand-primary/10 outline-hidden transition-all" rows={8} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl space-y-4 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><MessageSquare size={14} /> คำลงท้าย</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                'จึงเรียนมาเพื่อทราบ',
                'จึงเรียนมาเพื่อโปรดทราบ',
                'จึงเรียนมาเพื่อพิจารณา',
                'จึงเรียนมาเพื่อโปรดพิจารณา'
              ].map((phrase) => (
                <button
                  key={phrase}
                  type="button"
                  onClick={() => setFormData({ ...formData, closing_phrase: phrase })}
                  className={`p-3 text-sm font-bold rounded-xl border-2 transition-all ${
                    formData.closing_phrase === phrase
                      ? 'bg-brand-primary border-brand-primary text-white'
                      : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-2xl space-y-4 border border-blue-100/50">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2"><Save size={14} /> ข้อมูลผู้เสนอและลงนาม</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-blue-500 ml-1">ชื่อผู้เสนอ/ลงนาม</label>
                <input type="text" placeholder="เช่น นายสมชาย ใจดี" className="w-full p-3 bg-white border border-blue-200 rounded-xl" required value={formData.requester} onChange={e => {
                  setFormData({...formData, requester: e.target.value, sign_name: e.target.value});
                }} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-blue-500 ml-1">ตำแหน่ง</label>
                <input type="text" className="w-full p-3 bg-white border border-blue-200 rounded-xl" value={formData.sign_position} onChange={e => setFormData({...formData, sign_position: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-100">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-700">แสดงส่วนความเห็น/คำสั่ง ผอ. ท้ายเอกสาร</h4>
              <p className="text-[10px] text-slate-400">แสดงกล่องเสนอความเห็นและอนุมัติของผู้อำนวยการท้ายบันทึกข้อความ</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-10 h-6 rounded-full transition-all relative ${formData.show_director_opinion ? 'bg-brand-primary' : 'bg-slate-200'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.show_director_opinion ? 'left-5' : 'left-1'}`}></div>
              </div>
              <input type="checkbox" className="hidden" checked={formData.show_director_opinion} onChange={e => setFormData({...formData, show_director_opinion: e.target.checked})} />
            </label>
          </div>

          <div className="flex items-center gap-4">
             <label className="flex-1 p-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer text-center text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-all">
                <input type="file" className="hidden" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                <div className="text-sm font-bold">{selectedFile ? selectedFile.name : 'แนบไฟล์ฉบับที่มีลายเซ็น (ถ้ามี)'}</div>
                <div className="text-[10px] opacity-60">รองรับ PDF, JPG, PNG</div>
             </label>
             <button type="button" onClick={() => printMemo(formData)} className="p-4 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-all">
                <Printer size={20} /> ดูตัวอย่าง
             </button>
          </div>

          <button type="submit" disabled={isSaving} className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-xl shadow-green-100 hover:scale-[1.02] active:scale-95 transition-all">
            {isSaving ? <Loader2 className="animate-spin" /> : <Save />} บันทึกข้อมูลและออกเลข
          </button>
        </form>
      </Modal>

      {/* ผอ. Approval Modal */}
      <Modal isOpen={isApprovalModalOpen} onClose={() => setIsApprovalModalOpen(false)} title="พิจารณาลงความเห็นและอนุมัติบันทึกข้อความ">
        <form onSubmit={handleApprovalSubmit} className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FileText className="text-brand-primary" size={18} />
              ข้อมูลเอกสารที่เสนอ: {selectedMemoForApproval?.subject}
            </h4>
            <div className="text-xs font-bold text-slate-500 ml-1">
              ผู้เสนอ: {selectedMemoForApproval?.requester} ({selectedMemoForApproval?.department}) | เลขที่บันทึก: {selectedMemoForApproval?.memo_number}
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-3xl space-y-4 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><MessageSquare size={14} /> การตัดสินใจของ ผอ.</h4>
            <div className="grid grid-cols-2 gap-3">
              {(['อนุมัติ', 'ทราบ'] as const).map((decision) => (
                <button
                  key={decision}
                  type="button"
                  onClick={() => setDirectorDecision(decision)}
                  className={`p-4 text-sm font-black rounded-2xl border-2 transition-all ${
                    directorDecision === decision
                      ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-green-100'
                      : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  {decision === 'อนุมัติ' ? '✓ อนุมัติ' : '✓ ทราบ (แจ้งเพื่อทราบ)'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ความเห็นเพิ่มเติม / สั่งการ ผอ.</label>
            <textarea
              placeholder="ระบุข้อความสั่งการหรือความเห็นเพิ่มเติมสำหรับพิมพ์ลงท้ายเอกสาร (เช่น อนุมัติให้ดำเนินการได้, มอบหมายงานการเงินเบิกจ่ายให้ถูกต้อง)..."
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold text-sm focus:ring-2 focus:ring-brand-primary/10 outline-none transition-all"
              rows={4}
              value={directorOpinion}
              onChange={e => setDirectorOpinion(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleApprovalReject}
              disabled={isSaving}
              className="w-full bg-red-50 text-red-500 py-4 rounded-2xl font-black text-sm hover:bg-red-100 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              ✕ ส่งกลับแก้ไข / ไม่อนุมัติ
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-100"
            >
              {isSaving ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle size={16} />} ยืนยันการอนุมัติ
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
````

## File: src/pages/Orders.tsx
````typescript
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { uploadFile, deleteFileFromDrive } from '../lib/storage';
import { useAuth } from '../contexts/AuthContext';
import { sendLineNotification, sendInteractiveFlexMessage } from '../lib/lineNotify';
import { generateAIDraft } from '../lib/aiService';
import Modal from '../components/Modal';
import {
  Search,
  ExternalLink,
  Loader2,
  Save,
  Book,
  Trash2,
  Printer,
  FileText,
  Plus,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Bot,
  Sparkles
} from 'lucide-react';
import garuda3cm from '../assets/saraban/garuda-3cm.png';

export default function Orders() {
  const { user, profile } = useAuth();
  const [docs, setDocs] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const currentYearBE = new Date().getFullYear() + 543;
  const [selectedYear, setSelectedYear] = useState<number | null>(currentYearBE);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedOrderForApproval, setSelectedOrderForApproval] = useState<any>(null);
  const [directorDecision, setDirectorDecision] = useState<'อนุมัติ' | 'ทราบ'>('อนุมัติ');
  const [directorOpinion, setDirectorOpinion] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  const defaultSchoolName = import.meta.env.VITE_SCHOOL_NAME || 'โรงเรียน';

  const [formData, setFormData] = useState({
    order_number: '',
    subject: '',
    issuer: defaultSchoolName,
    order_date: new Date().toISOString().split('T')[0],
    content: '',
    sign_name: '',
    sign_position: `ผู้อำนวยการ${defaultSchoolName}`,
    committees: [{ teacher_id: '', role: 'ประธานกรรมการ', duty: '' }] as any[],
    legal_refs: [] as string[],
    show_director_opinion: false
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchDocs();
    fetchSettings();
    fetchTeachers();
  }, []);

  async function fetchTeachers() {
    const { data } = await supabase.from('teachers').select('id, prefix, first_name, last_name, position').eq('status', 'active');
    setTeachers(data || []);
  }

  async function fetchSettings() {
    const { data } = await supabase.from('settings').select('*').maybeSingle();
    if (data) {
      setSettings(data);
      setFormData(prev => ({
        ...prev,
        issuer: data.school_name || defaultSchoolName,
        sign_name: data.director_name || '',
        sign_position: `ผู้อำนวยการ${data.school_name || defaultSchoolName}`
      }));
    }
  }

  async function fetchDocs(yearToFetch = selectedYear) {
    setLoading(true);
    try {
      let query = supabase.from('orders').select('*');
      if (yearToFetch) {
        query = query.eq('doc_year', yearToFetch);
      }
      const { data } = await query.order('created_at', { ascending: false });
      setDocs(data || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  function addCommitteeMember() {
    setFormData(prev => ({
      ...prev,
      committees: [...prev.committees, { teacher_id: '', role: 'กรรมการ', duty: '', group_name: '' }]
    }));
  }

  function updateCommitteeMember(index: number, field: string, value: string) {
    const next = [...formData.committees];
    next[index] = { ...next[index], [field]: value };
    setFormData(prev => ({ ...prev, committees: next }));
  }

  function removeCommitteeMember(index: number) {
    const next = [...formData.committees];
    next.splice(index, 1);
    setFormData(prev => ({ ...prev, committees: next }));
  }

  const toThaiNumerals = (text: string) => {
    return text?.toString().replace(/[0-9]/g, (digit) => '๐๑๒๓๔๕๖๗๘๙'[parseInt(digit)]) || '';
  };

  const printOrder = (doc: any) => {
    let extraData: any = {};
    try {
      if (doc.remark && doc.remark.startsWith('{')) {
        extraData = JSON.parse(doc.remark);
      }
    } catch (e) {}

    const data = { ...doc, ...extraData };
    const dateObj = new Date(data.order_date);
    const thaiMonths = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    const fullDate = `สั่ง ณ วันที่ ${toThaiNumerals(dateObj.getDate().toString())} เดือน ${thaiMonths[dateObj.getMonth()]} พ.ศ. ${toThaiNumerals((dateObj.getFullYear() + 543).toString())}`;

    const resolvedCommittees = (data.committees || []).map((c: any) => {
      const teach = teachers.find(t => t.id === c.teacher_id);
      const prefix = teach?.prefix || '';
      const firstName = teach?.first_name || '';
      const lastName = teach?.last_name || '';
      const fullName = teach ? `${prefix}${firstName} ${lastName}` : '................................................';
      return { ...c, fullName };
    });

    const formatGroupName = (name: string) => {
      const trimName = name?.trim() || '';
      if (!trimName) return '';
      if (trimName.startsWith('ฝ่าย') || trimName.startsWith('คณะ') || trimName.startsWith('กลุ่ม')) {
        return trimName;
      }
      return `ฝ่าย${trimName}`;
    };

    const polishDuty = (dutyText: string, groupName: string, subject: string) => {
      const text = dutyText?.trim() || '';
      const gName = groupName || '';
      const subj = subject || '';

      if (!text) return '';

      // ตรวจจับคำสั้นๆ และแปลงเป็นรูปประโยคทางการ
      if (text === 'ให้คำปรึกษา' || text === 'ที่ปรึกษา' || text === 'ที่ปรึกษาคณะทำงาน' || text === 'ให้คำปรึกษาแนะนำ') {
        return `ให้คำปรึกษา แนะนำ และอำนวยความสะดวกในการจัดดำเนินงาน${subj}ให้เป็นไปด้วยความเรียบร้อย`;
      }
      if (text === 'จัดสถานที่ประชุม' || text === 'จัดสถานที่' || text === 'เตรียมสถานที่') {
        return `จัดเตรียมสถานที่ โต๊ะ เก้าอี้ และระบบโสตทัศนูปกรณ์สำหรับการจัด${subj}ให้เรียบร้อยและพร้อมใช้งาน`;
      }
      if (text === 'ประสานงาน' || text === 'ผู้ประสานงาน') {
        return `ประสานงานกับครูประจำชั้นและฝ่ายที่เกี่ยวข้องในการรวบรวมข้อมูลและรายละเอียดสำหรับการดำเนินงาน${subj}`;
      }
      if (text === 'สรุปผล' || text === 'รายงานผล' || text === 'สรุปและรายงานผล') {
        return `ดำเนินการรวบรวมข้อมูล สรุปผลการดำเนินงาน และรายงานผลต่อผู้บริหารสถานศึกษาเพื่อนำไปพัฒนางานต่อไป`;
      }
      if (text === 'จัดเตรียมเอกสาร' || text === 'เตรียมเอกสาร' || text === 'เอกสารประกอบ') {
        return `จัดเตรียมวัสดุ อุปกรณ์ เอกสารประกอบการประชุม และแบบประเมินผลสำหรับการดำเนินงาน${subj}`;
      }
      if (text === 'ต้อนรับ' || text === 'ปฏิคม') {
        return `ดูแลต้อนรับผู้ปกครองและผู้เข้าร่วมประชุม อำนวยความสะดวกในด้านจุดลงทะเบียนและด้านต่างๆ`;
      }
      if (text === 'อาหารและเครื่องดื่ม' || text === 'สวัสดิการ') {
        return `จัดเตรียมอาหารว่าง เครื่องดื่ม และสวัสดิการสำหรับผู้เข้าร่วมประชุมและคณะทำงาน`;
      }

      // เพิ่มเติมกรณีทั่วไปที่กรอกมาสั้นๆ (น้อยกว่า 15 ตัวอักษร)
      if (text.length < 15) {
        if (gName.includes('อำนวยการ')) {
          return `${text} และอำนวยการจัดงานให้สำเร็จลุล่วงตามวัตถุประสงค์`;
        }
        if (gName.includes('สถานที่')) {
          return `${text} และจัดระบบโสตทัศนูปกรณ์ให้มีความพร้อมในการจัดกิจกรรม`;
        }
        if (gName.includes('เอกสาร') || gName.includes('วิชาการ')) {
          return `${text} และสรุปข้อมูลรายงานให้เรียบร้อย`;
        }
        return `ปฏิบัติหน้าที่${text} และประสานการทำงานร่วมกับฝ่ายต่างๆ เพื่อให้งานดำเนินไปด้วยความเรียบร้อย`;
      }

      return text;
    };

    const getAutomaticDutiesForGroup = (groupName: string, subject: string) => {
      const gName = groupName || '';
      const subj = subject || '';

      if (gName.includes('อำนวยการ')) {
        return [
          `วางแผน ดำเนินการ และอำนวยการจัด${subj}ให้เป็นไปด้วยความเรียบร้อยและสอดคล้องกับนโยบายของโรงเรียน`,
          `ให้คำปรึกษา เสนอแนะ และแก้ไขปัญหาอุปสรรคในการปฏิบัติงานของทุกฝ่ายเพื่อให้งานเกิดประสิทธิภาพสูงสุด`,
          `ดำเนินการสรุปผลการจัดงานและรายงานผลต่อผู้บริหารสถานศึกษาทราบในลำดับต่อไป`
        ];
      }
      if (gName.includes('สถานที่') || gName.includes('พัสดุ')) {
        return [
          `จัดเตรียมสถานที่ประชุม โต๊ะ เก้าอี้ และระบบโสตทัศนูปกรณ์ที่จำเป็นสำหรับการจัด${subj}`,
          `ดูแลรักษาความสะอาด ความเป็นระเบียบเรียบร้อย และความปลอดภัยของสถานที่ปฏิบัติงานทั้งก่อนและหลังเสร็จสิ้นกิจกรรม`
        ];
      }
      if (gName.includes('ประสานงาน') || gName.includes('ประชาสัมพันธ์')) {
        return [
          `ประสานงานกับครูประจำชั้น คณะครู และผู้เกี่ยวข้องในการรวบรวมข้อมูลและแจ้งกำหนดการจัด${subj}`,
          `ประชาสัมพันธ์ข่าวสารและข้อมูลต่างๆ เพื่อสร้างความเข้าใจและความร่วมมือในการเข้าร่วมกิจกรรมอย่างทั่วถึง`
        ];
      }
      if (gName.includes('วิชาการ') || gName.includes('ทะเบียน') || gName.includes('เอกสาร')) {
        return [
          `จัดเตรียมข้อมูลการเรียน พฤติกรรมนักเรียน และจัดทำเอกสารประกอบการจัด${subj}`,
          `รวบรวมแบบประเมินความพึงพอใจและแบบสำรวจข้อมูลจากการดำเนินงานเพื่อส่งมอบให้ฝ่ายสรุปรายงาน`
        ];
      }
      if (gName.includes('ปฏิคม') || gName.includes('ต้อนรับ') || gName.includes('สวัสดิการ')) {
        return [
          `ต้อนรับผู้เข้าประชุมและแขกผู้มีเกียรติ พร้อมทั้งอำนวยความสะดวกในจุดลงทะเบียนและจุดบริการข้อมูล`,
          `จัดเตรียมเครื่องดื่ม อาหารว่าง และสวัสดิการที่จำเป็นสำหรับการปฏิบัติงานของคณะครูและผู้เข้าร่วมประชุม`
        ];
      }

      return [
        `ปฏิบัติหน้าที่ในส่วนงานที่รับผิดชอบตามที่ประธานคณะทำงานหรือฝ่ายอำนวยการมอบหมาย`,
        `ประสานความร่วมมือกับทุกฝ่ายเพื่อแก้ไขปัญหาอุปสรรคและช่วยให้งานบรรลุเป้าหมายตามเกณฑ์มาตรฐาน`
      ];
    };

    const html = `
      <html>
        <head>
          <title>คำสั่ง - ${data.order_number}</title>
          <style>
            @font-face {
              font-family: 'THSarabunIT๙';
              src: local('THSarabunIT๙');
            }
            body {
              font-family: 'THSarabunIT๙', 'TH Sarabun New', sans-serif;
              padding: 0; margin: 0; background: #f0f0f0;
            }
            .page {
              background: white; width: 210mm; min-height: 297mm;
              margin: 10mm auto; padding: 1.5cm 2cm 2cm 3cm;
              box-sizing: border-box; position: relative;
              font-size: 16pt; line-height: 1.25; color: black;
            }
            .garuda {
              display: block; margin: 0 auto 0.5cm auto; width: 3cm; height: auto;
            }
            .header-title {
              text-align: center; font-size: 18pt; font-weight: bold; margin-bottom: 0.2cm;
            }
            .order-info {
              text-align: center; font-size: 16pt; font-weight: bold; margin-bottom: 0.8cm;
            }
            .subject-title {
              text-align: center; font-size: 16pt; font-weight: bold; margin-bottom: 0.8cm;
            }
            .content-text {
              margin-top: 0.5cm;
            }
            .content-text p {
              text-indent: 2.5cm; text-align: justify; margin: 0 0 0.3cm 0; font-size: 16pt;
              word-break: break-word;
              overflow-wrap: break-word;
            }
            .footer-date-block {
              margin-top: 1.5cm;
              margin-left: 7.8cm;
              width: 8cm;
              font-size: 16pt;
            }
            .footer-date-content {
              text-align: center;
              margin-left: -4.8cm;
            }
            .sig-block {
              margin-top: 1cm;
              margin-left: 7.8cm;
              width: 8cm;
            }
            .sig-name-block {
              text-align: center;
              margin-left: -4.8cm;
              line-height: 1.5;
            }
            @media print {
              body { background: white; }
              .page { margin: 0; box-shadow: none; width: 100%; height: 100%; }
              .no-print { display: none; }
            }
            .no-print-btn {
              position: fixed; top: 20px; right: 20px;
              background: #16a34a; color: white; border: none;
              padding: 12px 24px; border-radius: 12px; cursor: pointer;
              font-weight: bold; z-index: 9999;
            }
          </style>
        </head>
        <body>
          <button class="no-print-btn no-print" onclick="window.print()">🖨️ พิมพ์คำสั่ง</button>
          <div class="page">
            <img src="${garuda3cm}" class="garuda" />
            <div class="header-title">คำสั่ง${data.issuer || ''}</div>
            <div class="order-info">ที่ ${toThaiNumerals(data.order_number)}</div>
            <div class="subject-title">เรื่อง ${data.subject}</div>
            <div class="content-text">
              ${(data.content || '').split('\n').filter((p: string) => p.trim() !== '').map((p: string) => `<p>${toThaiNumerals(p)}</p>`).join('')}
            </div>

            ${resolvedCommittees.length > 0 ? `
            <div style="margin-top: 0.5cm; font-size: 16pt; line-height: 1.25; text-align: justify; word-break: break-word;">
              ${(() => {
                const groups: { [key: string]: any[] } = {};
                resolvedCommittees.forEach((c: any) => {
                  let gName = c.group_name?.trim() || '';
                  if (gName) {
                    gName = formatGroupName(gName);
                  } else {
                    gName = 'คณะทำงานดำเนินงาน';
                  }
                  if (!groups[gName]) {
                    groups[gName] = [];
                  }
                  groups[gName].push(c);
                });

                const groupKeys = Object.keys(groups);
                const hasSubGroups = groupKeys.length > 1 || (groupKeys.length === 1 && groupKeys[0] !== 'คณะทำงานดำเนินงาน');

                // ไดนามิกหัวข้อข้อ 1
                const section1Header = (() => {
                  const subj = data.subject || '';
                  if (subj.startsWith('แต่งตั้ง')) {
                    return `๑. ${subj} ประกอบด้วย`;
                  }
                  return `๑. แต่งตั้งคณะทำงาน${subj} ประกอบด้วย`;
                })();

                // 1. แต่งตั้งคณะทำงาน ประกอบด้วย (ใช้ตารางเพื่อความตรงแนวของชือและบทบาท)
                const section1 = `
                  <div style="font-weight: bold; margin-top: 0.5cm; font-size: 16pt;">${toThaiNumerals(section1Header)}</div>
                  <div style="padding-left: 0.8cm; margin-top: 0.2cm;">
                    ${hasSubGroups ?
                      groupKeys.map((gName, gIdx) => {
                        const members = groups[gName];
                        const thaiGIdx = toThaiNumerals((gIdx + 1).toString());
                        return `
                          <div style="font-weight: bold; margin-top: 0.3cm; font-size: 16pt; page-break-inside: avoid;">๑.${thaiGIdx} ${gName} ประกอบด้วย</div>
                          <table style="width: 100%; border-collapse: collapse; margin-top: 0.15cm;">
                            <tbody>
                              ${members.map((c: any, mIdx: number) => {
                                const thaiMIdx = toThaiNumerals((mIdx + 1).toString());
                                const hasRole = c.role?.trim();
                                return `
                                  <tr style="page-break-inside: avoid; font-size: 16pt; line-height: 1.25;">
                                    <td style="width: ${hasRole ? '50%' : '100%'}; padding: 3px 0; vertical-align: top; text-align: left;">
                                      &nbsp;&nbsp;&nbsp;&nbsp;๑.${thaiGIdx}.${thaiMIdx} ${c.fullName}
                                    </td>
                                    ${hasRole ? `
                                    <td style="width: 20%; padding: 3px 0; vertical-align: top; text-align: left; white-space: nowrap; color: #333;">
                                      ทำหน้าที่เป็น
                                    </td>
                                    <td style="width: 30%; padding: 3px 0; vertical-align: top; text-align: left; font-weight: bold;">
                                      ${c.role}
                                    </td>
                                    ` : ''}
                                  </tr>
                                `;
                              }).join('')}
                            </tbody>
                          </table>
                        `;
                      }).join('')
                      :
                      `<table style="width: 100%; border-collapse: collapse; margin-top: 0.15cm;">
                        <tbody>
                          ${groups[groupKeys[0]].map((c: any, mIdx: number) => {
                            const thaiMIdx = toThaiNumerals((mIdx + 1).toString());
                            const hasRole = c.role?.trim();
                            return `
                              <tr style="page-break-inside: avoid; font-size: 16pt; line-height: 1.25;">
                                <td style="width: ${hasRole ? '50%' : '100%'}; padding: 3px 0; vertical-align: top; text-align: left;">
                                  ๑.${thaiMIdx} ${c.fullName}
                                </td>
                                ${hasRole ? `
                                <td style="width: 20%; padding: 3px 0; vertical-align: top; text-align: left; white-space: nowrap; color: #333;">
                                  ทำหน้าที่เป็น
                                </td>
                                <td style="width: 30%; padding: 3px 0; vertical-align: top; text-align: left; font-weight: bold;">
                                  ${c.role}
                                </td>
                                ` : ''}
                              </tr>
                            `;
                          }).join('')}
                        </tbody>
                      </table>`
                    }
                  </div>
                `;

                // 2. หน้าที่และความรับผิดชอบ (ใช้ Flex เพื่อความเยื้องและเป็นระเบียบเรียบร้อย)
                const section2 = `
                  <div style="font-weight: bold; margin-top: 0.7cm; page-break-inside: avoid; font-size: 16pt;">๒. หน้าที่และความรับผิดชอบ</div>
                  <div style="padding-left: 0.8cm; margin-top: 0.2cm;">
                    ${hasSubGroups ?
                      groupKeys.map((gName, gIdx) => {
                        const members = groups[gName];
                        const thaiGIdx = toThaiNumerals((gIdx + 1).toString());

                        let duties: string[] = [];
                        members.forEach((c: any) => {
                          const rawDuty = c.duty?.trim();
                          if (rawDuty) {
                            const polished = polishDuty(rawDuty, gName, data.subject);
                            if (polished && !duties.includes(polished)) {
                              duties.push(polished);
                            }
                          }
                        });

                        if (duties.length === 0) {
                          duties = getAutomaticDutiesForGroup(gName, data.subject);
                        }

                        return `
                          <div style="font-weight: bold; margin-top: 0.3cm; page-break-inside: avoid; font-size: 16pt;">๒.${thaiGIdx} ${gName} มีหน้าที่และความรับผิดชอบ ดังนี้</div>
                          <div style="margin-top: 0.15cm; padding-left: 0.5cm;">
                            ${duties.map((d, dIdx) => {
                              const thaiDIdx = toThaiNumerals((dIdx + 1).toString());
                              return `
                                <div style="display: flex; margin-bottom: 0.15cm; text-align: justify; page-break-inside: avoid; line-height: 1.25; font-size: 16pt;">
                                  <div style="width: 0.8cm; flex-shrink: 0; text-align: left;">${thaiDIdx})</div>
                                  <div style="flex: 1;">${d}</div>
                                </div>
                              `;
                            }).join('')}
                          </div>
                        `;
                      }).join('')
                      :
                      (() => {
                        let duties: string[] = [];
                        groups[groupKeys[0]].forEach((c: any) => {
                          const rawDuty = c.duty?.trim();
                          if (rawDuty) {
                            const polished = polishDuty(rawDuty, groupKeys[0], data.subject);
                            if (polished && !duties.includes(polished)) {
                              duties.push(polished);
                            }
                          }
                        });
                        if (duties.length === 0) {
                          duties = getAutomaticDutiesForGroup(groupKeys[0], data.subject);
                        }
                        return duties.map((d, dIdx) => {
                          const thaiDIdx = toThaiNumerals((dIdx + 1).toString());
                          return `
                            <div style="display: flex; margin-bottom: 0.15cm; text-align: justify; page-break-inside: avoid; line-height: 1.25; font-size: 16pt;">
                              <div style="width: 0.8cm; flex-shrink: 0; text-align: left;">๒.${thaiDIdx}</div>
                              <div style="flex: 1;">${d}</div>
                            </div>
                          `;
                        }).join('');
                      })()
                    }
                  </div>
                `;

                return section1 + section2;
              })()}
            </div>
            ` : ''}

            <div class="footer-date-block">
              <div class="footer-date-content">
                ${toThaiNumerals(fullDate)}
              </div>
            </div>

            <div class="sig-block">
              <div class="sig-name-block" style="position: relative;">
                ${(data.status === 'approved' && settings?.director_signature_url) ? `
                  <div style="position: absolute; left: calc(50% + 0.5cm); transform: translateX(-50%); top: -0.9cm; width: 3.5cm; height: 1.2cm; z-index: 10; pointer-events: none;">
                    <img src="${settings.director_signature_url}" style="width: 100%; height: 100%; object-fit: contain;" />
                  </div>
                ` : ''}
                (ลงชื่อ).......................................................<br/>
                ( ${data.sign_name || settings?.director_name || '................................................'} )<br/>
                ตำแหน่ง ${data.sign_position || `ผู้อำนวยการ${settings?.school_name || defaultSchoolName}`}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
    const win = window.open('', '_blank');
    win?.document.write(html);
    win?.document.close();
  };

  async function handleDelete(id: string) {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้? รวมถึงไฟล์ใน Drive จะถูกลบด้วย')) return;
    try {
      const { data: doc } = await supabase.from('orders').select('file_url').eq('id', id).single();
      if (doc?.file_url) {
        await deleteFileFromDrive(doc.file_url);
      }
      const { error } = await supabase.from('orders').delete().eq('id', id);
      if (error) throw error;
      alert('ลบข้อมูลและไฟล์เรียบร้อยแล้ว');
      fetchDocs();
    } catch (err: any) {
      alert('ลบไม่สำเร็จ: ' + err.message);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      let file_url = '';
      if (selectedFile) {
        try {
          file_url = await uploadFile(selectedFile, 'documents', 'orders');
        } catch (uploadErr: any) {
          throw new Error(`อัปโหลดไฟล์ไม่สำเร็จ: ${uploadErr.message}`);
        }
      }

      const extraData = {
        content: formData.content,
        sign_name: formData.sign_name,
        sign_position: formData.sign_position,
        committees: formData.committees.filter(c => c.teacher_id !== ''),
        legal_refs: formData.legal_refs,
        show_director_opinion: formData.show_director_opinion
      };

      const orderDateObj = new Date(formData.order_date);
      const docYear = orderDateObj.getFullYear() + 543;

      const { data: insertedDocs, error } = await supabase.from('orders').insert([{
        order_number: formData.order_number || 'รออนุมัติ',
        subject: formData.subject,
        issuer: formData.issuer,
        order_date: formData.order_date,
        remark: JSON.stringify(extraData),
        file_url,
        status: 'pending',
        created_by: user?.id,
        doc_year: docYear
      }]).select();

      if (error) throw new Error(`บันทึกข้อมูลไม่สำเร็จ: ${error.message}`);
      const insertedDoc = insertedDocs?.[0];


      const { data: dirProfile } = await supabase
        .from('profiles')
        .select('line_user_id')
        .eq('role', 'director')
        .maybeSingle();

      const lineMessage = `เรื่อง: ${formData.subject}\nผู้เสนอ: ${profile?.display_name || ''}`;
      const lineActions: any[] = [
        { label: '✅ อนุมัติลงนาม', type: 'postback', data: `action=approve_doc&type=order&id=${insertedDoc?.id || ''}`, color: '#1DB446' },
        { label: '❌ ส่งกลับแก้ไข', type: 'postback', data: `action=reject_doc&type=order&id=${insertedDoc?.id || ''}`, color: '#FF3B30' }
      ];
      if (file_url) {
        lineActions.unshift({ label: '📄 ดูร่างคำสั่ง', type: 'uri', uri: file_url });
      }
      await sendInteractiveFlexMessage(
        dirProfile?.line_user_id || undefined,
        '⏳ เสนออนุมัติคำสั่งแต่งตั้ง',
        lineMessage,
        lineActions
      );

      setIsModalOpen(false);
      resetForm();
      fetchDocs();
      alert('บันทึกร่างคำสั่งเสนออนุมัติเรียบร้อยแล้ว');
    } catch (err: any) {
      console.error(err);
      alert(`ไม่สามารถบันทึกได้: ${err.message}`);
    } finally { setIsSaving(false); }
  }

  async function handleApprovalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedOrderForApproval) return;
    setIsSaving(true);
    try {
      let extraData: any = {};
      try {
        if (selectedOrderForApproval.remark && selectedOrderForApproval.remark.startsWith('{')) {
          extraData = JSON.parse(selectedOrderForApproval.remark);
        }
      } catch (err) {}

      const todayThai = new Date().toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const updatedExtraData = {
        ...extraData,
        director_decision: directorDecision,
        director_opinion: directorOpinion,
        approved_date: todayThai,
        show_director_opinion: true
      };


      let finalOrderNumber = selectedOrderForApproval.order_number;
      const orderDateObj = new Date(selectedOrderForApproval.order_date || new Date());
      const docYear = orderDateObj.getFullYear() + 543;
      let docSeq: number | null = selectedOrderForApproval.doc_sequence || null;

      if (finalOrderNumber === 'รออนุมัติ' || !finalOrderNumber) {

        const { data: seqDocs } = await supabase
          .from('orders')
          .select('doc_sequence')
          .eq('doc_year', docYear)
          .order('doc_sequence', { ascending: false })
          .limit(1);

        docSeq = (seqDocs && seqDocs.length > 0) ? (Number(seqDocs[0].doc_sequence) + 1) : 1;
        finalOrderNumber = `${docSeq}/${docYear}`;
      }

      const { error } = await supabase.from('orders').update({
        status: 'approved',
        order_number: finalOrderNumber,
        remark: JSON.stringify(updatedExtraData),
        doc_year: docYear,
        doc_sequence: docSeq
      }).eq('id', selectedOrderForApproval.id);

      if (error) throw error;


      const committees = extraData.committees || [];
      if (committees.length > 0) {
        for (const member of committees) {
          if (member.teacher_id) {
            const { data: prof } = await supabase
              .from('profiles')
              .select('line_user_id, display_name')
              .eq('id', member.teacher_id)
              .maybeSingle();

            if (prof?.line_user_id) {
              const memberName = prof.display_name;
              const personalMsg = `\n📢 แจ้งเตือนคำสั่งแต่งตั้งใหม่\nเรียน คุณครู ${memberName}\n\nท่านได้รับการแต่งตั้งในคำสั่ง${settings?.school_name || defaultSchoolName} ที่ ${finalOrderNumber}\nเรื่อง: ${selectedOrderForApproval.subject}\nบทบาทหน้าที่ของท่าน: ${member.role} ${member.duty ? `(${member.duty})` : ''}\n\nกรุณาเข้าตรวจสอบหน้าที่และเปิดดูไฟล์คำสั่งฉบับเต็มได้ในระบบสารบรรณค่ะ`;

              await sendLineNotification(personalMsg, prof.line_user_id);
            }
          }
        }
      }

      alert('อนุมัติและออกเลขที่คำสั่งเรียบร้อยแล้ว');
      setIsApprovalModalOpen(false);
      fetchDocs();
    } catch (err: any) {
      alert('ไม่สามารถอนุมัติได้: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleApprovalReject() {
    if (!selectedOrderForApproval) return;
    setIsSaving(true);
    try {
      let extraData: any = {};
      try {
        if (selectedOrderForApproval.remark && selectedOrderForApproval.remark.startsWith('{')) {
          extraData = JSON.parse(selectedOrderForApproval.remark);
        }
      } catch (err) {}

      const updatedExtraData = {
        ...extraData,
        director_decision: 'ส่งกลับแก้ไข',
        director_opinion: directorOpinion,
        show_director_opinion: true
      };

      const { error } = await supabase.from('orders').update({
        status: 'rejected',
        remark: JSON.stringify(updatedExtraData)
      }).eq('id', selectedOrderForApproval.id);

      if (error) throw error;

      alert('บันทึกคำสั่งส่งกลับแก้ไขเรียบร้อยแล้ว');
      setIsApprovalModalOpen(false);
      fetchDocs();
    } catch (err: any) {
      alert('ล้มเหลว: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  const handleAISuggest = async () => {
    if (!formData.subject) {
      alert('กรุณากรอกชื่อเรื่องคำสั่งก่อนให้ AI ช่วยร่างค่ะ');
      return;
    }
    setIsDrafting(true);
    try {

      const groups = Array.from(new Set(
        formData.committees
          .map(c => c.group_name?.trim())
          .filter(g => g)
      ));

      let prompt = '';
      if (groups.length > 0) {
        prompt = `คุณคือ AI ผู้เชี่ยวชาญด้านงานสารบรรณโรงเรียนและคำสั่งราชการไทย
กรุณาช่วยร่างคำสั่งโรงเรียนตามข้อมูลด้านล่างนี้:

เรื่องคำสั่ง: "${formData.subject}"
ฝ่าย/กลุ่มงานย่อยที่แต่งตั้งในคำสั่งนี้: ${groups.map(g => `"${g}"`).join(', ')}

เงื่อนไขการร่างและส่งผลลัพธ์กลับมา:
1. ร่างเนื้อหาหลักของคำสั่ง (คำนำ เหตุผลอ้างกฎหมาย และบทยกสั่งการ) ให้มีความเป็นทางการ ถูกต้องตามระเบียบงานสารบรรณไทย ห้ามพิมพ์หัวคำสั่ง เช่น "คำสั่ง..." หรือ "เรื่อง..." และห้ามพิมพ์วันที่สั่งการหรือคำลงท้ายเด็ดขาด ให้เริ่มด้วยเนื้อหาบรรยายและฐานอำนาจโดยตรง
2. ร่างหน้าที่และความรับผิดชอบสำหรับแต่ละฝ่ายที่ระบุข้างต้น ให้สอดคล้องกับประเภทงานและประเภทฝ่ายอย่างมืออาชีพ ยืดหยุ่น และเป็นประโยคข้อความภาษาทางการราชการที่สละสลวย โดยแต่ละหน้าที่ควรแยกเป็นข้อๆ (ห้ามมีเลขข้อนำหน้า เช่น 1, 2 ให้คั่นด้วยการขึ้นบรรทัดใหม่ธรรมดา)

กรุณาส่งคำตอบกลับมาในรูปแบบ XML tags ต่อไปนี้เท่านั้น (ห้ามส่งคำทักทาย อธิบาย หรือข้อความคุยเล่นใดๆ นอกเหนือจาก XML tag เด็ดขาด):
<content>
[พิมพ์เนื้อหาคำสั่งตรงนี้]
</content>
<duties>
${groups.map(g => `<duty name="${g}">
[พิมพ์หน้าที่รับผิดชอบข้อที่ 1 ของฝ่าย${g}]
[พิมพ์หน้าที่รับผิดชอบข้อที่ 2 ของฝ่าย${g}]
</duty>`).join('\n')}
</duties>`;
      } else {
        // กรณีไม่มีฝ่ายย่อย ร่างเฉพาะข้อความเนื้อหาปกติ
        prompt = `เขียนเนื้อหาคำสั่งโรงเรียนภาษาทางการ เรื่อง "${formData.subject}" โดยอ้างอิงข้อกฎหมายราชการไทยที่ถูกต้อง เหมาะสมกับเนื้อหา พร้อมทั้งร่างคำนำเหตุผลและบทยกสั่งการ ห้ามใส่คำลงท้าย (เช่น สั่ง ณ วันที่) และห้ามใส่ส่วนลงลายมือชื่อ ผอ. ท้ายคำสั่งเด็ดขาด เนื่องจากระบบจัดทำส่วนนี้แยกไว้แล้ว และห้ามพิมพ์หัวคำสั่ง เช่น 'คำสั่ง...' หรือ 'ที่...' มาในผลลัพธ์เด็ดขาด ให้เริ่มเนื้อความบรรยายที่เป็นคำนำและฐานอำนาจโดยตรง`;
      }

      const draft = await generateAIDraft(prompt);
      if (draft) {
        if (groups.length > 0) {
          // แกะค่า XML content
          const contentMatch = draft.match(/<content>([\s\S]*?)<\/content>/i);
          let content = contentMatch ? contentMatch[1].trim() : draft;

          // คลีนเนื้อหาเพื่อความปลอดภัย
          content = content.replace(/^(คำสั่ง|ที่|เรื่อง).*\n?/gim, '');
          content = content.replace(/สั่ง ณ วันที่.*/g, '');

          // แกะค่าหน้าที่ความรับผิดชอบของแต่ละฝ่าย
          const dutiesMap: { [key: string]: string } = {};

          // วนลูปสกัดด้วย Regex
          const dutyRegex = /<duty\s+name="([^"]+)">([\s\S]*?)<\/duty>/gi;
          let match;
          while ((match = dutyRegex.exec(draft)) !== null) {
            dutiesMap[match[1].trim()] = match[2].trim();
          }

          // อัปเดตข้อมูลลงใน committees ของ formData
          const updatedCommittees = formData.committees.map(c => {
            const gName = c.group_name?.trim() || '';
            if (gName && dutiesMap[gName]) {
              // ล้างช่องว่างและบรรทัดว่าง และแปลงรายข้อหน้าที่ให้เหมาะสม
              const rawDuties = dutiesMap[gName]
                .split('\n')
                .map(line => line.replace(/^[-*•\s\d.)]+\s*/, '').trim()) // ลบ bullet หรือ ตัวเลขนำหน้าออก
                .filter(line => line);

              return {
                ...c,
                duty: rawDuties.join('\n')
              };
            }
            return c;
          });

          setFormData(prev => ({
            ...prev,
            content,
            committees: updatedCommittees
          }));
          alert('AI ได้ช่วยร่างเนื้อหาและแนะนำหน้าที่ของแต่ละฝ่ายอัปเดตลงในตารางเรียบร้อยแล้วค่ะ! คุณสามารถตรวจสอบและแก้ไขเพิ่มเติมได้ตามต้องการ');
        } else {
          // กรณีไม่มีฝ่ายย่อย ทำแบบเดิม
          let cleanDraft = draft.trim();
          cleanDraft = cleanDraft.replace(/^(คำสั่ง|ที่|เรื่อง).*\n?/gim, '');
          cleanDraft = cleanDraft.replace(/สั่ง ณ วันที่.*/g, '');
          setFormData(prev => ({ ...prev, content: cleanDraft }));
          alert('AI ได้ร่างเนื้อความคำสั่งเรียบร้อยแล้วค่ะ');
        }
      }
    } catch (err: any) {
      alert('AI Draft Error: ' + err.message);
    } finally {
      setIsDrafting(false);
    }
  };

  function resetForm() {
    setFormData({
      order_number: '',
      subject: '',
      issuer: settings?.school_name || defaultSchoolName,
      order_date: new Date().toISOString().split('T')[0],
      content: '',
      sign_name: settings?.director_name || '',
      sign_position: `ผู้อำนวยการ${settings?.school_name || defaultSchoolName}`,
      committees: [{ teacher_id: '', role: 'ประธานกรรมการ', duty: '' }] as any[],
      legal_refs: [] as string[],
      show_director_opinion: false
    });
    setSelectedFile(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-2xl flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input type="text" placeholder="ค้นหาคำสั่ง..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-hidden shadow-xs" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <select
            value={selectedYear || ''}
            onChange={(e) => {
              const val = e.target.value ? parseInt(e.target.value) : null;
              setSelectedYear(val);
              fetchDocs(val);
            }}
            className="p-3 bg-white border border-slate-200 rounded-2xl outline-hidden shadow-xs font-bold text-slate-700 text-sm h-[48px]"
          >
            <option value="">ดูทั้งหมด</option>
            <option value={currentYearBE}>{currentYearBE}</option>
            <option value={currentYearBE - 1}>{currentYearBE - 1}</option>
            <option value={currentYearBE - 2}>{currentYearBE - 2}</option>
          </select>
        </div>
        <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="bg-brand-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all">
          <Book size={20} /> ออกเลขคำสั่ง
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">เลขที่คำสั่ง / วันที่</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">เรื่อง</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">สถานะ</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan={4} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-brand-primary" /></td></tr>
            ) : docs.length === 0 ? (
              <tr><td colSpan={4} className="py-20 text-center text-slate-400 italic">ไม่พบข้อมูลคำสั่ง</td></tr>
            ) : (
              docs.filter(d => d.subject.includes(searchTerm)).map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 text-sm">{doc.order_number}</div>
                    <div className="text-[10px] text-slate-400">{doc.order_date}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{doc.subject}</td>
                  <td className="px-6 py-4 text-center">
                    {doc.status === 'approved' ? (
                      <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase inline-flex items-center gap-1"><CheckCircle size={12} /> อนุมัติแล้ว</span>
                    ) : doc.status === 'rejected' ? (
                      <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase inline-flex items-center gap-1"><XCircle size={12} /> ส่งกลับแก้ไข</span>
                    ) : (
                      <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase inline-flex items-center gap-1"><Clock size={12} /> รออนุมัติ</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {(profile?.role === 'director' || profile?.role === 'admin') && doc.status === 'pending' && (
                        <button onClick={() => { setSelectedOrderForApproval(doc); setDirectorDecision('อนุมัติ'); setDirectorOpinion(''); setIsApprovalModalOpen(true); }} className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="พิจารณาอนุมัติ"><CheckCircle size={18} /></button>
                      )}
                      <button onClick={() => printOrder(doc)} className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors" title="พิมพ์คำสั่ง"><Printer size={18} /></button>
                      {doc.file_url && <a href={doc.file_url} target="_blank" className="p-2 text-slate-400 hover:text-brand-primary"><ExternalLink size={18} /></a>}
                      <button onClick={() => handleDelete(doc.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="ลบข้อมูล"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="ออกเลขคำสั่งและสร้างเอกสาร">
        <form onSubmit={handleSave} className="space-y-4 max-h-[80vh] overflow-y-auto px-1 pb-4 text-slate-700">
          <div className="bg-slate-50 p-4 rounded-2xl space-y-4 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><FileText size={14} /> ข้อมูลหัวคำสั่ง</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 ml-1">เลขที่คำสั่ง (ว่างไว้เพื่อรันอัตโนมัติ)</label>
                <input type="text" placeholder="เช่น 12/2569" className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold" value={formData.order_number} onChange={e => setFormData({...formData, order_number: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 ml-1">สั่ง ณ วันที่</label>
                <input type="date" className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold" required value={formData.order_date} onChange={e => setFormData({...formData, order_date: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 ml-1">เรื่อง</label>
              <input type="text" placeholder="ระบุชื่อเรื่องคำสั่ง" className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
            </div>
          </div>

          {/* AI แนะนำและร่างข้อความอ้างอิงกฎหมาย */}
          <div className="bg-slate-50 p-4 rounded-2xl space-y-3 border border-slate-100">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Bot size={14} className="text-brand-primary" /> ระบบช่วยร่างและแนะนำกฎหมาย</h4>
              <button
                type="button"
                onClick={handleAISuggest}
                disabled={isDrafting}
                className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl hover:bg-slate-800 disabled:opacity-50 flex items-center gap-1 shadow-sm transition-all"
              >
                {isDrafting ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} className="text-yellow-400" />} ให้ AI ช่วยร่างคำสั่ง
              </button>
            </div>

            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1">กฎหมายที่ใช้บ่อย:</div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "พ.ร.บ.ศึกษาธิการ ม.39", text: "อาศัยอำนาจตามความในมาตรา ๓๙ แห่งพระราชบัญญัติระเบียบบริหารราชการกระทรวงศึกษาธิการ พ.ศ. ๒๕๔๖" },
                { label: "พ.ร.บ.ข้าราชการครู ม.27", text: "และมาตรา ๒๗ แห่งพระราชบัญญัติระเบียบข้าราชการครูและบุคลากรทางการศึกษา พ.ศ. ๒๕๔๗" },
                { label: "พ.ร.บ.จัดซื้อจัดจ้าง 2560", text: "พระราชบัญญัติการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. ๒๕๖๐" },
                { label: "ระเบียบกระทรวงการคลัง 2560", text: "ระเบียบกระทรวงการคลังว่าด้วยการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. ๒๕๖๐" }
              ].map((law, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const currentText = formData.content;
                    const separator = currentText ? '\n' : '';
                    setFormData({ ...formData, content: currentText + separator + law.text });
                  }}
                  className="bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg text-[9px] font-bold hover:bg-slate-100 hover:border-slate-300 transition-all active:scale-95"
                >
                  + {law.label}
                </button>
              ))}
            </div>
          </div>

          {/* จัดการรายชื่อคณะกรรมการ */}
          <div className="bg-slate-50 p-4 rounded-2xl space-y-4 border border-slate-100">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Users size={14} /> รายชื่อคณะกรรมการแต่งตั้ง</h4>
              <button
                type="button"
                onClick={addCommitteeMember}
                className="text-[9px] font-black text-brand-primary hover:text-green-700 bg-green-50 px-3 py-1 rounded-full"
              >
                + เพิ่มกรรมการ
              </button>
            </div>

            {formData.committees.length === 0 ? (
              <div className="text-[10px] text-slate-400 italic text-center py-4">ไม่มีรายชื่อคณะกรรมการที่ระบุ (ข้อมูลจะแสดงเป็นข้อความบรรยายคำสั่งปกติ)</div>
            ) : (
              <div className="space-y-3">
                {formData.committees.map((member, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-white p-3 rounded-xl border border-slate-200 shadow-xs relative group/item">
                    <div className="text-[10px] font-bold text-slate-400 shrink-0 w-4">{idx + 1}.</div>

                    <input
                      type="text"
                      placeholder="ฝ่าย/กลุ่มงาน (ถ้ามี)"
                      className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 w-36 outline-hidden"
                      value={member.group_name || ''}
                      onChange={e => updateCommitteeMember(idx, 'group_name', e.target.value)}
                    />

                    <select
                      className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex-1 outline-hidden"
                      value={member.teacher_id}
                      onChange={e => updateCommitteeMember(idx, 'teacher_id', e.target.value)}
                    >
                      <option value="">-- เลือกคุณครู --</option>
                      {teachers.map(t => (
                        <option key={t.id} value={t.id}>{t.prefix}{t.first_name} {t.last_name}</option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="บทบาท (ถ้ามี)"
                      className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 w-32 outline-hidden"
                      value={member.role || ''}
                      onChange={e => updateCommitteeMember(idx, 'role', e.target.value)}
                    />

                    <input
                      type="text"
                      placeholder="หน้าที่รับผิดชอบ (ถ้ามี)"
                      className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 flex-1 outline-hidden"
                      value={member.duty || ''}
                      onChange={e => updateCommitteeMember(idx, 'duty', e.target.value)}
                    />

                    {formData.committees.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCommitteeMember(idx)}
                        className="p-2 text-red-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 ml-1">เนื้อหาคำสั่ง (กด Enter เพื่อขึ้นย่อหน้าใหม่)</label>
            <textarea placeholder="พิมพ์เนื้อหาคำสั่งที่นี่..." className="w-full p-4 bg-white border border-slate-200 rounded-xl font-medium" rows={8} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
          </div>

          {/* สวิตช์แสดงความเห็น ผอ. */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-700">แสดงส่วนความเห็น ผอ. ท้ายเอกสาร</h4>
              <p className="text-[10px] text-slate-400">สำหรับคำสั่งออนไลน์ที่ต้องการให้ ผอ. ลงบันทึกความเห็น/สั่งการในระบบ</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-10 h-6 rounded-full transition-all relative ${formData.show_director_opinion ? 'bg-brand-primary' : 'bg-slate-200'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.show_director_opinion ? 'left-5' : 'left-1'}`}></div>
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={formData.show_director_opinion}
                onChange={e => setFormData({ ...formData, show_director_opinion: e.target.checked })}
              />
            </label>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-2xl space-y-4 border border-blue-100/50">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2"><Save size={14} /> ข้อมูลการลงนาม</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-blue-500 ml-1">ชื่อผู้ลงนาม</label>
                <input type="text" className="w-full p-3 bg-white border border-blue-200 rounded-xl font-bold" required value={formData.sign_name} onChange={e => setFormData({...formData, sign_name: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-blue-500 ml-1">ตำแหน่ง</label>
                <input type="text" className="w-full p-3 bg-white border border-blue-200 rounded-xl font-bold" value={formData.sign_position} onChange={e => setFormData({...formData, sign_position: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <label className="flex-1 p-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer text-center text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-all">
                <input type="file" className="hidden" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                <div className="text-sm font-bold">{selectedFile ? selectedFile.name : 'แนบไฟล์ฉบับที่มีลายเซ็น (ถ้ามี)'}</div>
                <div className="text-[10px] opacity-60">รองรับ PDF, JPG, PNG</div>
             </label>
             <button type="button" onClick={() => printOrder(formData)} className="p-4 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-all">
                <Printer size={20} /> ดูตัวอย่าง
             </button>
          </div>

          <button type="submit" disabled={isSaving} className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-xl shadow-green-100 hover:scale-[1.02] active:scale-95 transition-all">
            {isSaving ? <Loader2 className="animate-spin" /> : <Save />} บันทึกข้อมูลและเสนออนุมัติ
          </button>
        </form>
      </Modal>

      {/* ผอ. Approval Modal */}
      <Modal isOpen={isApprovalModalOpen} onClose={() => setIsApprovalModalOpen(false)} title="พิจารณาอนุมัติและลงนามคำสั่งโรงเรียน">
        <form onSubmit={handleApprovalSubmit} className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4 text-slate-700">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FileText className="text-brand-primary" size={18} />
              ข้อมูลคำสั่งที่เสนอ: {selectedOrderForApproval?.subject}
            </h4>
            <div className="text-xs font-bold text-slate-500 ml-1">
              วันที่เสนอ: {selectedOrderForApproval?.order_date} | เลขที่ร่าง: {selectedOrderForApproval?.order_number}
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-3xl space-y-4 border border-slate-100 text-slate-700">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Users size={14} /> ผลการพิจารณา ผอ.</h4>
            <div className="grid grid-cols-2 gap-3">
              {(['อนุมัติ', 'ทราบ'] as const).map((decision) => (
                <button
                  key={decision}
                  type="button"
                  onClick={() => setDirectorDecision(decision)}
                  className={`p-4 text-sm font-black rounded-2xl border-2 transition-all ${
                    directorDecision === decision
                      ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-green-100'
                      : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  {decision === 'อนุมัติ' ? '✓ อนุมัติการแต่งตั้ง' : '✓ ทราบ'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-slate-700">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">หมายเหตุ / คำสั่งเพิ่มเติม ผอ. (สำหรับให้อาจารย์อ่านประกอบ)</label>
            <textarea
              placeholder="ระบุข้อความสั่งการเพิ่มเติม..."
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold text-sm focus:ring-2 focus:ring-brand-primary/10 outline-none transition-all"
              rows={4}
              value={directorOpinion}
              onChange={e => setDirectorOpinion(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleApprovalReject}
              disabled={isSaving}
              className="w-full bg-red-50 text-red-500 py-4 rounded-2xl font-black text-sm hover:bg-red-100 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              ✕ ส่งกลับให้ครูแก้ไข
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-100"
            >
              {isSaving ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle size={16} />} อนุมัติและลงลายเซ็น
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
````

## File: src/pages/Reports.tsx
````typescript
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  FileSpreadsheet,
  FileDown,
  Users,
  ClipboardList,
  Calendar,
  ChevronRight,
  Loader2,
  TrendingUp,
  FileText,
  BarChart,
  PieChart as PieChartIcon,
  Filter
} from 'lucide-react';
import * as XLSX from 'xlsx';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('');
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [stats, setStats] = useState({
    incomingCount: 0,
    outgoingCount: 0,
    orderCount: 0,
    memoCount: 0,
    teacherCount: 0,
    studentCount: 0,
    pendingTasks: 0,
    completedTasks: 0,
    totalTasks: 0
  });

  const [chartData, setChartData] = useState<any[]>([]);
  const [studentDistData, setStudentDistData] = useState<any[]>([]);

  useEffect(() => {
    initReports();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchStats();
      fetchChartData();
    }
  }, [selectedYear]);

  async function initReports() {
    try {
      // 1. Fetch available years from students table
      const { data: yearsData } = await supabase.from('students').select('academic_year');
      let uniqueYears: string[] = [];
      if (yearsData) {
        uniqueYears = Array.from(new Set(yearsData.map(s => s.academic_year))).filter(Boolean) as string[];
      }


      const schoolId = localStorage.getItem('active_school_id');
      let settingsQuery = supabase.from('settings').select('current_academic_year');
      if (schoolId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(schoolId)) {
        settingsQuery = settingsQuery.eq('school_id', schoolId);
      }
      const { data: settings } = await settingsQuery.maybeSingle();
      const currentYear = settings?.current_academic_year || '2568';

      if (!uniqueYears.includes(currentYear)) {
        uniqueYears.push(currentYear);
      }

      const sortedYears = uniqueYears.sort().reverse();
      setAvailableYears(sortedYears);
      setSelectedYear(currentYear);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchStats() {
    setLoading(true);
    try {
      const yearCE = parseInt(selectedYear) - 543;
      const startDate = `${yearCE}-01-01`;
      const endDate = `${yearCE}-12-31`;

      const [
        { count: incCount },
        { count: outCount },
        { count: orderCount },
        { count: memoCount },
        { count: tCount },
        { count: sCount },
        { count: pTasks },
        { count: cTasks },
        { count: allTasks }
      ] = await Promise.all([
        supabase.from('incoming_docs').select('*', { count: 'exact', head: true }).gte('doc_date', startDate).lte('doc_date', endDate),
        supabase.from('outgoing_docs').select('*', { count: 'exact', head: true }).gte('doc_date', startDate).lte('doc_date', endDate),
        supabase.from('orders').select('*', { count: 'exact', head: true }).gte('order_date', startDate).lte('order_date', endDate),
        supabase.from('memos').select('*', { count: 'exact', head: true }).gte('memo_date', startDate).lte('memo_date', endDate),
        supabase.from('teachers').select('*', { count: 'exact', head: true }),
        supabase.from('students').select('*', { count: 'exact', head: true })
          .eq('academic_year', selectedYear)
          .or('graduation_status.ilike.%กำลังศึกษา%,graduation_status.eq.ปกติ'),
        supabase.from('doc_assignments').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('doc_assignments').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
        supabase.from('doc_assignments').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        incomingCount: incCount || 0,
        outgoingCount: outCount || 0,
        orderCount: orderCount || 0,
        memoCount: memoCount || 0,
        teacherCount: tCount || 0,
        studentCount: sCount || 0,
        pendingTasks: pTasks || 0,
        completedTasks: cTasks || 0,
        totalTasks: allTasks || 0
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchChartData() {
    try {

      const yearCE = parseInt(selectedYear) - 543;
      const startDate = `${yearCE}-01-01`;
      const endDate = `${yearCE}-12-31`;


      const { data: students } = await supabase.from('students')
        .select('class_level')
        .eq('academic_year', selectedYear)
        .or('graduation_status.ilike.%กำลังศึกษา%,graduation_status.eq.ปกติ');

      if (students) {
        const dist: any = {};
        students.forEach(s => {
          const level = s.class_level || 'ไม่ระบุ';
          dist[level] = (dist[level] || 0) + 1;
        });
        const formattedDist = Object.keys(dist).map(key => ({
          name: key,
          value: dist[key]
        })).sort((a, b) => a.name.localeCompare(b.name));
        setStudentDistData(formattedDist);
      }


      const [
        { data: incoming },
        { data: outgoing },
        { data: orders },
        { data: memos }
      ] = await Promise.all([
        supabase.from('incoming_docs').select('doc_date').gte('doc_date', startDate).lte('doc_date', endDate),
        supabase.from('outgoing_docs').select('doc_date').gte('doc_date', startDate).lte('doc_date', endDate),
        supabase.from('orders').select('order_date').gte('order_date', startDate).lte('order_date', endDate),
        supabase.from('memos').select('memo_date').gte('memo_date', startDate).lte('memo_date', endDate)
      ]);

      const months: any[] = [];
      const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

      for (let i = 0; i < 12; i++) {
        months.push({
          month: thaiMonths[i],
          incoming: 0,
          outgoing: 0,
          orders: 0,
          memos: 0,
          index: i
        });
      }

      incoming?.forEach(doc => {
        if (!doc.doc_date) return;
        const d = new Date(doc.doc_date);
        if (d.getFullYear() === yearCE) months[d.getMonth()].incoming++;
      });

      outgoing?.forEach(doc => {
        if (!doc.doc_date) return;
        const d = new Date(doc.doc_date);
        if (d.getFullYear() === yearCE) months[d.getMonth()].outgoing++;
      });

      orders?.forEach(doc => {
        if (!doc.order_date) return;
        const d = new Date(doc.order_date);
        if (d.getFullYear() === yearCE) months[d.getMonth()].orders++;
      });

      memos?.forEach(doc => {
        if (!doc.memo_date) return;
        const d = new Date(doc.memo_date);
        if (d.getFullYear() === yearCE) months[d.getMonth()].memos++;
      });

      setChartData(months);
    } catch (err) {
      console.error(err);
    }
  }

  const exportToExcel = async (table: string, fileName: string) => {
    try {
      const { data, error } = await supabase.from(table).select('*');
      if (error) throw error;

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    } catch (err: any) {
      alert('Export failed: ' + err.message);
    }
  };

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const efficiencyRate = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0;

  const reportCards = [
    {
      title: "งานสารบรรณ (Admin Docs)",
      description: "สรุปทะเบียนหนังสือรับ-ส่ง และสถิติเอกสาร",
      icon: <FileText className="text-blue-500" />,
      color: "bg-blue-50",
      actions: [
        { label: "Excel หนังสือรับ", onClick: () => exportToExcel('incoming_docs', 'ทะเบียนหนังสือรับ') },
        { label: "Excel หนังสือส่ง", onClick: () => exportToExcel('outgoing_docs', 'ทะเบียนหนังสือส่ง') }
      ]
    },
    {
      title: "บริหารงานบุคคล (HR)",
      description: "รายงานการมอบหมายงาน และสถิตัครู",
      icon: <Users className="text-purple-500" />,
      color: "bg-purple-50",
      actions: [
        { label: "สรุปการมอบหมายงาน", onClick: () => exportToExcel('doc_assignments', 'รายงานการมอบหมายงาน') },
        { label: "ทะเบียนประวัติครู", onClick: () => exportToExcel('teachers', 'ทะเบียนครูบุคลากร') }
      ]
    },
    {
      title: "กิจการนักเรียน (Students)",
      description: "สถิติการมาเรียน และข้อมูลพื้นฐานนักเรียน",
      icon: <Users className="text-green-500" />,
      color: "bg-green-50",
      actions: [
        { label: "ข้อมูลนักเรียนรายบุคคล", onClick: () => exportToExcel('students', 'ข้อมูลนักเรียน') },
        { label: "สถิติการมาเรียน (LEC)", onClick: () => alert('ฟีเจอร์นี้เปิดใช้งานในหน้า LEC Reports') }
      ]
    }
  ];

  if (loading && !selectedYear) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin text-brand-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">ระบบรายงานอัจฉริยะ</h1>
          <p className="text-slate-400 font-bold mt-1 uppercase tracking-tight">SMART REPORTING & DATA ANALYTICS ปีการศึกษา {selectedYear}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {}
          <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <Filter size={18} className="text-brand-primary" />
            <select
              className="bg-transparent border-none outline-none font-black text-slate-700 text-sm cursor-pointer"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {availableYears.map(year => (
                <option key={year} value={year}>ปีการศึกษา {year}</option>
              ))}
            </select>
          </div>

          <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <Calendar size={18} className="text-brand-primary" />
            <span className="text-sm font-black text-slate-600">ข้อมูล ณ วันที่ {new Date().toLocaleDateString('th-TH')}</span>
          </div>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "หนังสือรับ", value: stats.incomingCount, icon: <FileDown size={24} />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "หนังสือส่ง", value: stats.outgoingCount, icon: <FileDown size={24} />, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "คำสั่ง", value: stats.orderCount, icon: <FileText size={24} />, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "บันทึกข้อความ", value: stats.memoCount, icon: <FileText size={24} />, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "งานรอครูดำเนินการ", value: stats.pendingTasks, icon: <ClipboardList size={24} />, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "ครูและบุคลากร", value: stats.teacherCount, icon: <Users size={24} />, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "นักเรียนทั้งหมด", value: stats.studentCount, icon: <Users size={24} />, color: "text-green-600", bg: "bg-green-50" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-4`}>
              {item.icon}
            </div>
            <div className="text-3xl font-black text-slate-800">{item.value.toLocaleString()}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <BarChart size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">สถิติงานสารบรรณ</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Document Processing Trends ({selectedYear})</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 800, fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontWeight: 700, fontSize: '12px' }} />
                <Bar dataKey="incoming" name="รับ" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outgoing" name="ส่ง" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" name="คำสั่ง" fill="#a855f7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="memos" name="บันทึก" fill="#10b981" radius={[4, 4, 0, 0]} />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <PieChartIcon size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">สัดส่วนนักเรียน</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Student Distribution by Level ({selectedYear})</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={studentDistData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {studentDistData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                   itemStyle={{ fontWeight: 800, fontSize: '12px' }}
                />
                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ fontWeight: 700, fontSize: '12px' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportCards.map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col h-full">
            <div className={`w-16 h-16 ${card.color} rounded-[24px] flex items-center justify-center mb-6`}>
              {card.icon}
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">{card.title}</h3>
            <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed">{card.description}</p>

            <div className="mt-auto space-y-3">
              {card.actions.map((action, j) => (
                <button
                  key={j}
                  onClick={action.onClick}
                  className="w-full py-4 px-6 bg-slate-50 hover:bg-brand-primary hover:text-white rounded-2xl font-bold text-sm text-slate-600 flex items-center justify-between transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <FileSpreadsheet size={16} /> {action.label}
                  </span>
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {}
      <div className="bg-slate-800 p-10 rounded-[48px] text-white overflow-hidden relative shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/10 rounded-2xl">
              <TrendingUp size={24} />
            </div>
            <h2 className="text-2xl font-black">Smart Analytics Engine</h2>
          </div>
          <p className="text-white/60 font-bold max-w-lg mb-8">
            ระบบวิเคราะห์ข้อมูลขั้นสูงกำลังประมวลผลแนวโน้มการมาเรียนและประสิทธิภาพการทำงานของบุคลากร เพื่อช่วยในการตัดสินใจเชิงกลยุทธ์สำหรับผู้บริหาร
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <div className="text-4xl font-black mb-1">{efficiencyRate}%</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">อัตราความสำเร็จ</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">{stats.incomingCount + stats.outgoingCount + stats.orderCount + stats.memoCount}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">จำนวนเอกสารที่ดำเนินการ</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">{stats.studentCount}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">นักเรียนที่กำลังศึกษา</div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-10 right-10 opacity-10">
           <TrendingUp size={200} />
        </div>
      </div>
    </div>
  );
}
````

## File: src/pages/SchoolSetup.tsx
````typescript
import { useState, useEffect } from 'react';
import {
  School,
  Plus,
  ArrowLeft,
  Check,
  Loader2,
  Send,
  HelpCircle,
  Database,
  Lock,
  Mail
} from 'lucide-react';
import { supabase, type SchoolProfile } from '../lib/supabase';

interface SchoolSetupProps {
  onBackToLogin?: () => void;
}

export default function SchoolSetup({ onBackToLogin }: SchoolSetupProps) {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [mode, setMode] = useState<'select' | 'register' | 'admin_login'>('select');


  const [selectedSchoolId, setSelectedSchoolId] = useState('');

  // Register Mode State
  const [schoolName, setSchoolName] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [gasUrl, setGasUrl] = useState('');

  // Super Admin Login State
  const superAdminEmail = (import.meta.env.VITE_SUPER_ADMIN_EMAIL || 'ncrows77@gmail.com').toLowerCase();
  const [adminUserEmail, setAdminUserEmail] = useState(superAdminEmail);
  const [adminPassword, setAdminPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchApprovedSchools();
  }, [mode]);

  const fetchApprovedSchools = async () => {
    if (mode !== 'select') return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('status', 'approved')
        .order('school_name', { ascending: true });

      if (error) throw error;
      setSchools(data || []);

      if (data && data.length > 0) {
        setSelectedSchoolId(data[0].id);
      }
    } catch (err: any) {
      console.error('Error fetching schools:', err);
      setError('ไม่สามารถเชื่อมต่อฐานข้อมูลได้ กรุณาตรวจสอบอินเทอร์เน็ต หรือให้แน่ใจว่าได้ติดตั้งสคริปต์ SQL บน Supabase แล้ว');
    } finally {
      setLoading(false);
    }
  };

  const handleConnectSchool = () => {
    if (!selectedSchoolId) {
      setError('กรุณาเลือกสถานศึกษาเพื่อเชื่อมต่อ');
      return;
    }

    const matched = schools.find(s => s.id === selectedSchoolId);
    if (!matched) return;

    try {
      const profile: SchoolProfile = {
        id: matched.id,
        name: matched.school_name,
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
        supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
        vercelUrl: import.meta.env.VITE_VERCEL_URL || window.location.origin,
        gasUrl: matched.gas_url || ''
      };

      // ล้างข้อมูล super admin mode เผื่อมีค้าง
      localStorage.removeItem('super_admin_mode');

      localStorage.setItem('school_profiles', JSON.stringify([profile]));
      localStorage.setItem('active_school_id', profile.id);

      if (onBackToLogin) {
        onBackToLogin();
      } else {
        window.location.reload();
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการบันทึกโปรไฟล์การเชื่อมต่อ');
    }
  };

  const handleRegisterSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const formattedCode = schoolCode.trim().toUpperCase();
    const formattedEmail = adminEmail.trim().toLowerCase();

    if (!schoolName || !formattedCode || !formattedEmail) {
      setError('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return;
    }

    if (formattedCode.length < 4 || formattedCode.length > 8) {
      setError('รหัสโรงเรียนต้องมีความยาว 4 - 8 ตัวอักษรภาษาอังกฤษ');
      return;
    }

    setActionLoading(true);
    try {
      const { data: existSchool } = await supabase
        .from('schools')
        .select('id')
        .eq('school_code', formattedCode)
        .maybeSingle();

      if (existSchool) {
        throw new Error('รหัสโรงเรียนนี้ถูกใช้งานไปแล้ว กรุณาใช้รหัสอื่น');
      }

      const { error: regError } = await supabase
        .from('schools')
        .insert([
          {
            school_code: formattedCode,
            school_name: schoolName.trim(),
            admin_email: formattedEmail,
            gas_url: gasUrl.trim() || null,
            status: 'pending'
          }
        ]);

      if (regError) throw regError;

      setSuccessMessage(`ยื่นขอเปิดโรงเรียนสำเร็จ! รหัสโรงเรียนของคุณคือ "${formattedCode}" กรุณาแจ้งผู้ดูแลระบบกลาง (Super Admin) เพื่ออนุมัติเปิดใช้งาน เมื่อได้รับอนุมัติแล้ว คุณครูแอดมินอีเมล "${formattedEmail}" จะสามารถเข้าใช้งานได้ทันทีค่ะ`);

      setSchoolName('');
      setSchoolCode('');
      setAdminEmail('');
      setGasUrl('');

    } catch (err: any) {
      setError(err.message || 'ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSuperAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setActionLoading(true);

    try {
      const formattedEmail = adminUserEmail.trim().toLowerCase();

      // 1. เข้าสู่ระบบผ่าน Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formattedEmail,
        password: adminPassword,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. ดึงข้อมูลโปรไฟล์ (ใช้ maybeSingle() เพื่อป้องกัน Error 406 หากไม่มีแถวข้อมูลในตาราง)
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .maybeSingle();


        const superAdminEmailVal = (import.meta.env.VITE_SUPER_ADMIN_EMAIL || 'ncrows77@gmail.com').toLowerCase();
        if (!profileData && formattedEmail === superAdminEmailVal) {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([
              {
                id: authData.user.id,
                display_name: 'Super Admin',
                email: formattedEmail,
                role: 'admin',
                status: 'active'
              }
            ]);

          if (insertError) {
            console.error('Failed to auto-create Super Admin profile:', insertError);
            throw new Error('ไม่สามารถสร้างโปรไฟล์ระบบกลางได้: ' + insertError.message);
          }
        }

        const finalRole = profileData?.role || (formattedEmail === superAdminEmailVal ? 'admin' : '');

        if (finalRole === 'admin' || formattedEmail === superAdminEmailVal) {

          localStorage.setItem('super_admin_mode', 'true');
          localStorage.setItem('active_school_id', 'super_admin');


          localStorage.removeItem('school_profiles');


          window.location.reload();
        } else {

          await supabase.auth.signOut();
          throw new Error('คุณไม่มีสิทธิ์เข้าใช้งานระบบควบคุมส่วนกลาง (Super Admin Console)');
        }
      }
    } catch (err: any) {
      console.error('Super admin login error:', err);
      setError(err.message || 'ล็อกอินไม่สำเร็จ กรุณาตรวจสอบอีเมลหรือรหัสผ่าน');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-orange-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">

        {}
        <div className="bg-brand-primary p-8 text-white text-center relative transition-all duration-300">
          {mode !== 'select' && (
            <button
              onClick={() => { setMode('select'); setError(null); setSuccessMessage(null); }}
              className="absolute left-4 top-8 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <School size={36} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">
            {mode === 'select' && 'เชื่อมต่อสถานศึกษา'}
            {mode === 'register' && 'ลงทะเบียนขอเปิดโรงเรียนใหม่'}
            {mode === 'admin_login' && 'Super Admin Console'}
          </h1>
          <p className="text-green-100/80 mt-1 text-xs uppercase tracking-widest font-black">
            {mode === 'admin_login' ? 'ระบบควบคุมกลางสูงสุด' : 'ระบบสารบรรณและบอทน้องชบา AI'}
          </p>
        </div>

        {}
        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 font-medium mb-5">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 text-green-700 p-5 rounded-xl text-sm border border-green-100 font-medium mb-5 leading-relaxed">
              🎉 {successMessage}
            </div>
          )}

          {mode === 'select' && (
            <div className="space-y-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-8 text-slate-400 gap-3">
                  <Loader2 className="animate-spin text-brand-primary" size={32} />
                  <span className="text-xs font-bold uppercase tracking-wider">กำลังโหลดข้อมูลสถานศึกษา...</span>
                </div>
              ) : (
                <>
                  {schools.length > 0 ? (
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">
                        เลือกโรงเรียนในเครือข่ายของคุณ
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold text-slate-700"
                        value={selectedSchoolId}
                        onChange={(e) => setSelectedSchoolId(e.target.value)}
                      >
                        {schools.map(s => (
                          <option key={s.id} value={s.id}>{s.school_name} ({s.school_code})</option>
                        ))}
                      </select>

                      <button
                        onClick={handleConnectSchool}
                        className="w-full bg-brand-primary hover:bg-green-700 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 mt-6"
                      >
                        <Check size={20} /> เชื่อมต่อระบบโรงเรียน
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-6 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                      <Database className="mx-auto text-slate-300 mb-2" size={32} />
                      <p className="text-slate-500 font-bold text-sm">ยังไม่พบโรงเรียนที่เปิดใช้งานในระบบ</p>
                      <p className="text-slate-400 text-xs mt-1">กรุณากดลงทะเบียนโรงเรียนใหม่ด้านล่างค่ะ</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                    <button
                      onClick={() => { setMode('register'); setError(null); setSuccessMessage(null); }}
                      className="w-full bg-brand-secondary hover:bg-orange-600 text-white py-3.5 rounded-2xl font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Plus size={16} /> ยื่นขอลงทะเบียนโรงเรียนใหม่
                    </button>

                    <button
                      onClick={() => { setMode('admin_login'); setError(null); setSuccessMessage(null); }}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Lock size={12} /> สำหรับผู้ดูแลระบบกลาง (Super Admin)
                    </button>

                    {onBackToLogin && (
                      <button
                        onClick={onBackToLogin}
                        className="w-full bg-slate-50 hover:bg-slate-100 text-slate-500 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 active:scale-95 mt-2"
                      >
                        ย้อนกลับหน้าเข้าสู่ระบบ
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegisterSchool} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">ชื่อโรงเรียน</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold"
                  placeholder="กรอกชื่อโรงเรียนของคุณ"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">
                  รหัสโรงเรียนที่ต้องการ (School Code)
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold uppercase"
                  placeholder="ตัวอย่างเช่น SKW001 (อังกฤษ 4-8 ตัว)"
                  value={schoolCode}
                  onChange={(e) => setSchoolCode(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">
                  อีเมลแอดมินหลักประจำโรงเรียน
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold"
                  placeholder="admin@school.ac.th"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
                <p className="text-[10px] text-slate-400 mt-1 flex items-start gap-1 font-medium leading-relaxed">
                  <HelpCircle size={10} className="shrink-0 mt-0.5" />
                  อีเมลนี้จะได้รับการแต่งตั้งเป็นผู้ดูแลระบบ (Admin) ของโรงเรียนโดยอัตโนมัติเมื่อได้รับการอนุมัติใช้งาน
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">
                  Google Drive Web App URL (ถ้ามี)
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold text-xs"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={gasUrl}
                  onChange={(e) => setGasUrl(e.target.value)}
                />
                <p className="text-[10px] text-slate-400 mt-1 font-medium">
                  * หากยังไม่มี สามารถข้ามไปก่อนและตั้งค่าในตัวโปรแกรมภายหลังได้
                </p>
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full bg-brand-primary hover:bg-green-700 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-75 mt-4"
              >
                {actionLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Send size={18} />
                )}
                ส่งคำขอเปิดโรงเรียน
              </button>
            </form>
          )}

          {mode === 'admin_login' && (
            <form onSubmit={handleSuperAdminLogin} className="space-y-5 animate-in fade-in">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 ml-1 tracking-widest">อีเมลผู้ดูแลระบบกลาง</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 pl-10 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold"
                    placeholder="superadmin@email.com"
                    value={adminUserEmail}
                    onChange={(e) => setAdminUserEmail(e.target.value)}
                  />
                  <div className="absolute left-3.5 top-4 text-slate-400"><Mail size={16} /></div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 ml-1 tracking-widest">รหัสผ่าน</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 pl-10 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold"
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                  <div className="absolute left-3.5 top-4 text-slate-400"><Lock size={16} /></div>
                </div>
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-75 mt-4"
              >
                {actionLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Check size={20} />
                )}
                เข้าสู่ระบบควบคุมกลาง
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} เครือข่ายระบบสารบรรณและบอทชบา AI
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
````

## File: src/pages/TaskManagement.tsx
````typescript
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { sendLineNotification } from '../lib/lineNotify';
import { uploadFileToDrive } from '../lib/storage';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Modal';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertCircle,
  Send,
  MessageSquare,
  User,
  FileText,
  Loader2,
  ChevronRight,
  Search,
  Paperclip,
  Upload,
  X,
  Trash2
} from 'lucide-react';

type TaskStatus = 'all' | 'pending' | 'acknowledged' | 'completed' | 'closed';

export default function TaskManagement() {
  const { user, profile } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TaskStatus>('pending');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [reportText, setReportText] = useState('');
  const [reportFiles, setReportFiles] = useState<File[]>([]);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('doc_assignments')
        .select(`
          *,
          incoming_docs (subject, doc_number, file_url, attachment_urls),
          teachers (first_name, last_name, prefix, email, line_user_id)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (err: any) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(taskId: string, status: string, lineMsg?: string, lineUserId?: string) {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('doc_assignments')
        .update({ status })
        .eq('id', taskId);

      if (error) throw error;

      if (lineMsg) {
        await sendLineNotification(lineMsg, lineUserId);
      }

      await fetchTasks();
    } catch (err: any) {
      alert('ปรับปรุงสถานะไม่สำเร็จ: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleReport() {
    if (!reportText) {
      alert('กรุณากรอกรายละเอียดผลการปฏิบัติงาน');
      return;
    }
    setIsSaving(true);
    try {
      const attachment_urls: string[] = [];
      const sanitizedSubject = (selectedTask.incoming_docs?.subject || 'งานมอบหมาย').replace(/[\/\\?%*:|"<>]/g, '-').slice(0, 30);

      for (let i = 0; i < reportFiles.length; i++) {
        const fileName = `รายงาน_${sanitizedSubject}_ไฟล์_${i+1}_โดย_${selectedTask.teachers?.first_name}`;
        const url = await uploadFileToDrive(reportFiles[i], 'reports', fileName);
        attachment_urls.push(url);
      }

      const { error } = await supabase
        .from('doc_assignments')
        .update({
          status: 'completed',
          staff_report: reportText,
          report_file_urls: attachment_urls,
          reported_at: new Date().toISOString()
        })
        .eq('id', selectedTask.id);

      if (error) throw error;

      const msg = `\n✅ รายงานผลงานเสร็จสิ้น\nเรื่อง: ${selectedTask.incoming_docs?.subject}\nผู้ปฏิบัติ: ${selectedTask.teachers?.prefix}${selectedTask.teachers?.first_name} ${selectedTask.teachers?.last_name}\nผลการปฏิบัติ: ${reportText}\n${attachment_urls.length > 0 ? `📁 มีไฟล์หลักฐาน ${attachment_urls.length} ไฟล์` : ''}\n\nรอ ผอ. ตรวจสอบและปิดงาน`;

      await sendLineNotification(msg);

      setIsReportModalOpen(false);
      setReportText('');
      setReportFiles([]);
      await fetchTasks();
      alert('ส่งรายงานผลและแจ้งเตือนเรียบร้อยแล้ว');
    } catch (err: any) {
      alert('ส่งรายงานไม่สำเร็จ: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleCloseTask() {
    setIsSaving(true);
    const { error } = await supabase
      .from('doc_assignments')
      .update({
        status: 'closed',
        director_feedback: feedbackText,
        closed_at: new Date().toISOString()
      })
      .eq('id', selectedTask.id);

    if (!error) {
      const msg = `\n🏁 ผอ. ตรวจรับงานแล้ว\nเรื่อง: ${selectedTask.incoming_docs.subject}\nความเห็น ผอ.: ${feedbackText || 'รับทราบผลการปฏิบัติงาน'}\n\nขอบคุณสำหรับการปฏิบัติหน้าที่ครับ`;

      // 1. ส่งแจ้งเตือนเข้ากลุ่มไลน์หลักของโรงเรียน
      await sendLineNotification(msg);

      // 2. ส่งแจ้งเตือนหาคุณครูผู้ปฏิบัติโดยตรง (หากมี Line User ID)
      if (selectedTask.teachers?.line_user_id) {
        await sendLineNotification(msg, selectedTask.teachers.line_user_id);
      }

      setIsFeedbackModalOpen(false);
      setFeedbackText('');
      fetchTasks();
    }
    setIsSaving(false);
  }

  async function handleReopenTask(task: any) {
    if (!confirm('คุณต้องการดึงงานนี้กลับมาเพื่อตรวจสอบหรือแก้ไขใหม่ใช่หรือไม่?')) return;
    setIsSaving(true);
    const { error } = await supabase
      .from('doc_assignments')
      .update({
        status: 'completed',
        closed_at: null
      })
      .eq('id', task.id);

    if (!error) {
      alert('ดึงงานกลับเรียบร้อยแล้ว');
      fetchTasks();
    } else {
      alert('ไม่สามารถดึงงานกลับได้: ' + error.message);
    }
    setIsSaving(false);
  }

  async function handleDeleteTask(taskId: string) {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบงานที่มอบหมายนี้? การลบจะไม่สามารถเรียกคืนได้')) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('doc_assignments')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
      alert('ลบงานเรียบร้อยแล้ว');
      fetchTasks();
    } catch (err: any) {
      alert('ลบงานไม่สำเร็จ: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase flex items-center gap-1"><Clock size={12} /> รอรับทราบ</span>;
      case 'acknowledged': return <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase flex items-center gap-1"><ChevronRight size={12} /> กำลังดำเนินการ</span>;
      case 'completed': return <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase flex items-center gap-1"><CheckCircle2 size={12} /> รายงานผลแล้ว</span>;
      case 'closed': return <span className="px-3 py-1 bg-slate-100 text-slate-400 rounded-full text-[10px] font-black uppercase flex items-center gap-1"><CheckCircle2 size={12} /> จบงาน</span>;
      default: return null;
    }
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = (t.incoming_docs?.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${t.teachers?.first_name} ${t.teachers?.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()));

    const isAdmin = profile?.role === 'admin';
    const isDirector = profile?.role === 'director' || isAdmin;
    const hasManageAccess = isDirector || !!profile?.extra_permissions?.access_administrative;
    const userEmail = user?.email?.toLowerCase();
    const teacherEmail = t.teachers?.email?.toLowerCase();
    const isAssignedToMe = userEmail && teacherEmail && userEmail === teacherEmail;


    if (!hasManageAccess && !isAssignedToMe) return false;

    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && t.status === activeTab;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <ClipboardList size={32} className="text-brand-primary" />
            ระบบติดตามงานและสั่งการ
          </h2>
          <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-xs">Task Assignment & Tracking System</p>
        </div>
      </div>

      {}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-[24px] w-fit">
        <TabButton label="รอรับทราบ" active={activeTab === 'pending'} onClick={() => setActiveTab('pending')} count={tasks.filter(t => t.status === 'pending').length} />
        <TabButton label="กำลังดำเนินการ" active={activeTab === 'acknowledged'} onClick={() => setActiveTab('acknowledged')} count={tasks.filter(t => t.status === 'acknowledged').length} />
        <TabButton label="รายงานผลแล้ว" active={activeTab === 'completed'} onClick={() => setActiveTab('completed')} count={tasks.filter(t => t.status === 'completed').length} />
        <TabButton label="จบงาน" active={activeTab === 'closed'} onClick={() => setActiveTab('closed')} count={tasks.filter(t => t.status === 'closed').length} />
        <TabButton label="ทั้งหมด" active={activeTab === 'all'} onClick={() => setActiveTab('all')} count={tasks.length} />
      </div>

      {}
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
          <input
            type="text"
            placeholder="ค้นหาตามชื่อเรื่อง หรือผู้รับมอบหมาย..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => fetchTasks()}
          className="px-6 py-4 bg-white text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all border border-slate-100 flex items-center gap-2"
        >
          <Loader2 size={18} className={loading ? 'animate-spin' : ''} /> รีเฟรช
        </button>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm">
            <Loader2 className="animate-spin text-brand-primary mb-4" size={40} />
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">กำลังดึงข้อมูลงาน...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm">
            <AlertCircle className="text-slate-200 mb-4" size={48} />
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">ไม่มีรายการงานในหมวดหมู่นี้</p>
          </div>
        ) : (
          filteredTasks.map((task, index) => {
            const isAdmin = profile?.role === 'admin';
            const isDirector = profile?.role === 'director' || isAdmin;
            const isAssignedTeacher = user?.email === task.teachers?.email;
            const canAction = isDirector || isAssignedTeacher;

            return (
              <div key={task.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                           <span className="w-8 h-8 bg-slate-800 text-white rounded-lg flex items-center justify-center font-black text-sm">{index + 1}</span>
                           <span className="text-slate-300 font-black">|</span>
                           <span className="text-slate-400 font-black text-xs uppercase tracking-widest">{new Date(task.created_at).toLocaleDateString('th-TH')}</span>
                           {getStatusBadge(task.status)}
                           {task.status === 'pending' && (
                             <span className="flex items-center gap-1 text-[9px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-sm animate-pulse border border-red-100">
                               <AlertCircle size={10} />
                               ยังไม่รับทราบงาน
                             </span>
                           )}
                        </div>
                        <h4 className="text-lg font-black text-slate-800 leading-tight pt-2">{task.incoming_docs?.subject}</h4>
                        <div className="flex items-center gap-3 mt-1">
                           <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                              <FileText size={12} /> {task.incoming_docs?.doc_number} | <User size={12} /> {task.teachers?.prefix}{task.teachers?.first_name} {task.teachers?.last_name}
                           </div>
                           {task.incoming_docs?.file_url && (
                             <a
                               href={task.incoming_docs.file_url}
                               target="_blank"
                               className="flex items-center gap-1.5 text-[10px] font-black text-brand-primary bg-green-50 px-2 py-1 rounded-lg border border-brand-primary/10 hover:bg-brand-primary hover:text-white transition-all shadow-xs"
                             >
                               <FileText size={12} /> ดูเอกสารสั่งการ
                             </a>
                           )}
                           {}
                           {Array.isArray(task.incoming_docs?.attachment_urls) && task.incoming_docs.attachment_urls.map((url: string, i: number) => (
                             <a
                               key={i}
                               href={url}
                               target="_blank"
                               className="flex items-center gap-1.5 text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 hover:bg-blue-500 hover:text-white transition-all shadow-xs"
                               title={`ไฟล์แนบ ${i+1}`}
                             >
                               <Paperclip size={10} /> ไฟล์แนบ {i + 1}
                             </a>
                           ))}
                        </div>
                      </div>

                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="ลบงานที่มอบหมาย"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-1 flex items-center gap-2">
                         <MessageSquare size={12} /> คำสั่งการ
                      </p>
                      <p className="text-sm font-bold text-slate-600 italic">"{task.instruction || 'โปรดดำเนินการตามที่มอบหมาย'}"</p>
                    </div>
                  </div>

                  <div className="md:w-64 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-50 pt-4 md:pt-0 md:pl-6">
                     {!canAction ? (
                       <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100 opacity-60">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">สิทธิ์การเข้าถึง</p>
                          <p className="text-[10px] font-bold text-slate-500 italic">เฉพาะผู้ได้รับมอบหมาย</p>
                       </div>
                     ) : (
                       <div className="space-y-3">
                         {task.status === 'pending' && (
                           <button
                            onClick={() => {
                              const msg = `\n📥 รับทราบการมอบหมายงาน\nเรื่อง: ${task.incoming_docs.subject}\nผู้ปฏิบัติ: ${task.teachers.prefix}${task.teachers.first_name}\n\nขณะนี้กำลังเริ่มดำเนินการครับ`;
                              updateStatus(task.id, 'acknowledged', msg);
                            }}
                            className="w-full py-4 bg-brand-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-green-100 hover:bg-green-700 transition-all active:scale-95"
                           >
                             รับทราบงาน
                           </button>
                         )}

                         {task.status === 'acknowledged' && (
                           <button
                            onClick={() => { setSelectedTask(task); setIsReportModalOpen(true); }}
                            className="w-full py-4 bg-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                           >
                             <Send size={16} /> รายงานผลงาน
                           </button>
                         )}

                         {task.status === 'completed' && (
                           <button
                            onClick={() => { setSelectedTask(task); setIsFeedbackModalOpen(true); }}
                            className={`w-full py-4 bg-slate-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-slate-200 hover:bg-slate-900 transition-all flex items-center justify-center gap-2 ${!isDirector ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!isDirector}
                           >
                             <CheckCircle2 size={16} /> {isDirector ? 'ผอ. ตรวจรับงาน' : 'รอ ผอ. ตรวจรับ'}
                           </button>
                         )}

                         {task.status === 'closed' && (
                           <div className="space-y-2">
                             <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">เสร็จสมบูรณ์เมื่อ</p>
                                <p className="text-xs font-bold text-slate-500">{new Date(task.closed_at).toLocaleDateString('th-TH')}</p>
                             </div>
                             {isDirector && (
                               <button
                                onClick={() => handleReopenTask(task)}
                                className="w-full py-2 bg-white text-red-500 border border-red-100 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all"
                               >
                                 ดึงงานกลับ
                               </button>
                             )}
                           </div>
                         )}
                       </div>
                     )}
                  </div>
                </div>

                {}
                {(task.staff_report || task.director_feedback) && (
                  <div className="mt-6 pt-6 border-t border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {task.staff_report && (
                      <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100/50">
                        <div className="flex flex-col mb-2">
                           <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-2">ผลการปฏิบัติงาน</p>
                           {Array.isArray(task.report_file_urls) && task.report_file_urls.length > 0 && (
                             <div className="flex flex-wrap gap-2 mb-2">
                               {task.report_file_urls.map((url: string, i: number) => (
                                 <a
                                   key={i}
                                   href={url}
                                   target="_blank"
                                   className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 bg-white border border-blue-100 px-2 py-1 rounded-lg hover:bg-blue-50 transition-all"
                                 >
                                   <Paperclip size={10} /> หลักฐาน {i + 1}
                                 </a>
                               ))}
                             </div>
                           )}
                        </div>
                        <p className="text-xs font-bold text-slate-600">{task.staff_report}</p>
                        <p className="text-[9px] text-slate-400 mt-2 font-bold uppercase">รายงานเมื่อ: {task.reported_at ? new Date(task.reported_at).toLocaleString('th-TH') : '-'}</p>
                      </div>
                    )}
                    {task.director_feedback && (
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ความเห็น ผอ.</p>
                        <p className="text-xs font-bold text-slate-600">{task.director_feedback}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => { setIsReportModalOpen(false); setReportFiles([]); setReportText(''); }}
        title="รายงานผลการปฏิบัติงาน"
      >
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
             <h5 className="text-sm font-black text-slate-800 mb-1">{selectedTask?.incoming_docs?.subject}</h5>
             <p className="text-xs font-bold text-slate-400 italic">คำสั่ง: {selectedTask?.instruction}</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">รายละเอียดผลการปฏิบัติงาน</label>
            <textarea
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-green-500/10 focus:border-green-500 transition-all"
              rows={5}
              placeholder="พิมพ์รายงานสิ่งที่ได้ดำเนินการที่นี่..."
              value={reportText}
              onChange={e => setReportText(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1 flex justify-between">
              <span>แนบไฟล์หลักฐาน / เอกสารประกอบ (สูงสุด 4 ไฟล์)</span>
              <span className="text-brand-primary">{reportFiles.length}/4</span>
            </label>
            <div className="grid grid-cols-1 gap-3">
              {reportFiles.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-xl animate-in slide-in-from-left-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Paperclip size={14} className="text-green-600 shrink-0" />
                    <span className="text-xs font-bold text-green-700 truncate">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setReportFiles(reportFiles.filter((_, i) => i !== idx))}
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-white rounded-lg transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              {reportFiles.length < 4 && (
                <label className="block w-full p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center cursor-pointer hover:border-brand-primary hover:bg-slate-50 transition-all group">
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={e => {
                      const selected = Array.from(e.target.files || []);
                      if (reportFiles.length + selected.length > 4) {
                        alert('จำกัดไฟล์แนบสูงสุด 4 ไฟล์');
                        return;
                      }
                      setReportFiles([...reportFiles, ...selected]);
                    }}
                  />
                  <div className="flex items-center justify-center gap-2">
                    <Upload size={18} className="text-slate-300 group-hover:text-brand-primary" />
                    <span className="text-slate-400 text-[10px] font-bold uppercase">คลิกเพื่อเพิ่มไฟล์หลักฐาน</span>
                  </div>
                </label>
              )}
            </div>
          </div>

          <button
            onClick={handleReport}
            disabled={isSaving || !reportText}
            className="w-full py-4.5 bg-green-500 text-white rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-green-100 hover:bg-green-600 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="animate-spin" /> : <Send />} ส่งรายงานผลพร้อมหลักฐาน
          </button>
        </div>
      </Modal>

      {/* Feedback Modal (Director Close Task) */}
      <Modal
        isOpen={isFeedbackModalOpen}
        onClose={() => { setIsFeedbackModalOpen(false); setFeedbackText(''); }}
        title="ตรวจรับงานและปิดงาน"
      >
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
             <div className="flex flex-col mb-2">
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-2">รายงานจากผู้ปฏิบัติ</p>
                {Array.isArray(selectedTask?.report_file_urls) && selectedTask.report_file_urls.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedTask.report_file_urls.map((url: string, i: number) => (
                      <a
                       key={i}
                       href={url}
                       target="_blank"
                       className="flex items-center gap-2 text-[10px] font-black text-white bg-green-600 px-3 py-1.5 rounded-lg hover:bg-green-700 transition-all shadow-sm shadow-green-100"
                      >
                        <Paperclip size={12} /> ดูหลักฐาน {i + 1}
                      </a>
                    ))}
                  </div>
                )}
             </div>
             <p className="text-sm font-bold text-slate-700">{selectedTask?.staff_report}</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">ความเห็นเพิ่มเติมจาก ผอ. (ถ้ามี)</label>
            <textarea
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
              rows={3}
              placeholder="เช่น รับทราบ, ดำเนินการได้ดีมาก..."
              value={feedbackText}
              onChange={e => setFeedbackText(e.target.value)}
            />
          </div>
          <button
            onClick={handleCloseTask}
            disabled={isSaving}
            className="w-full py-4 bg-slate-800 text-white rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-slate-200 hover:bg-slate-900 transition-all"
          >
            {isSaving ? <Loader2 className="animate-spin" /> : <CheckCircle2 />} ตรวจรับและปิดงาน
          </button>
        </div>
      </Modal>
    </div>
  );
}

function TabButton({ label, active, onClick, count }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${active ? 'bg-white text-brand-primary shadow-sm scale-[1.02]' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
    >
      {label}
      {count > 0 && <span className={`px-2 py-0.5 rounded-full text-[10px] ${active ? 'bg-brand-primary text-white' : 'bg-slate-200 text-slate-500'}`}>{count}</span>}
    </button>
  );
}
````

## File: src/services/aiCoworkService.ts
````typescript
import { supabase } from '../lib/supabase';
import {
  callGeminiAPI,
  truncateContext,
  searchKnowledge,
  searchPrivateKnowledge
} from '../lib/aiService';

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

export interface PersonalDoc {
  file_name: string;
  content_text: string;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function extractClassLevel(text: string): string | null {
  const cleaned = text.replace(/\s+/g, '');

  // ค้นหารูปแบบ ป.1 - ป.6
  const pMatch = cleaned.match(/(ป|ประถม|ประถมศึกษา|ประถมศึกษาปีที่)\.?([1-6])/);
  if (pMatch) {
    return `ป.${pMatch[2]}`;
  }

  // ค้นหารูปแบบ อ.2 - อ.3
  const aMatch = cleaned.match(/(อ|อนุบาล|อนุบาลปีที่)\.?([2-3])/);
  if (aMatch) {
    return `อ.${aMatch[2]}`;
  }

  return null;
}

export function searchPersonalDocs(query: string, docs: PersonalDoc[]) {
  if (!docs || docs.length === 0) return [];

  const queryLower = query.toLowerCase();

  // 1. ดึงคำหลักทั่วไปจากการ split
  const baseKeywords = queryLower.split(/[\s,，.、?？!！]+/g).filter(w => w.length > 1);
  const keywordsSet = new Set<string>(baseKeywords);

  // 2. ดึงปีการศึกษา พ.ศ./ค.ศ.
  const yearMatches = queryLower.match(/\d{4}/g);
  if (yearMatches) {
    yearMatches.forEach(y => keywordsSet.add(y));
  }

  // 3. ดึงคำศัพท์ทั่วไปที่ใช้ในโรงเรียน (Thai Keyword Fallback)
  const schoolKeywords = [
    "ค่าน้ำ", "ค่าไฟ", "ค่าโทรศัพท์", "ค่าอินเทอร์เน็ต", "สาธารณูปโภค",
    "โครงการ", "งบประมาณ", "ระเบียบ", "พัสดุ", "จัดซื้อจัดจ้าง", "อาหารกลางวัน",
    "นักเรียน", "ครู", "บุคลากร", "ใบงาน", "แบบฝึกหัด", "ข้อสอบ",
    "บันทึกข้อความ", "คำสั่ง", "สถิติ", "การเช็คชื่อ", "เวรยาม", "เวรประจำวัน",
    "กิจกรรม", "ประเมินผล", "หลักสูตร", "วิจัย", "นวัตกรรม"
  ];

  schoolKeywords.forEach(kw => {
    if (queryLower.includes(kw)) {
      keywordsSet.add(kw);
    }
  });

  const keywords = Array.from(keywordsSet);
  if (keywords.length === 0) return [];

  const results: { file_name: string; snippet: string; score: number }[] = [];

  for (const doc of docs) {
    let score = 0;
    const fileNameLower = doc.file_name.toLowerCase();
    const contentLower = doc.content_text ? doc.content_text.toLowerCase() : "";

    // ตรวจสอบกับ Keywords
    for (const keyword of keywords) {
      if (fileNameLower.includes(keyword)) {
        score += 20;
      }

      if (contentLower) {
        try {
          const regex = new RegExp(escapeRegExp(keyword), 'g');
          const matches = contentLower.match(regex);
          if (matches) {
            score += matches.length;
          }
        } catch (e) {
          let pos = 0;
          while ((pos = contentLower.indexOf(keyword, pos)) !== -1) {
            score++;
            pos += keyword.length;
          }
        }
      }
    }

    if (fileNameLower.includes(queryLower) || queryLower.includes(fileNameLower.split('.')[0])) {
      score += 50;
    }

    if (score > 0) {
      let bestIndex = 0;
      if (doc.content_text) {
        for (const keyword of keywords) {
          const idx = contentLower.indexOf(keyword);
          if (idx !== -1) {
            bestIndex = idx;
            break;
          }
        }

        const snippetStart = Math.max(0, bestIndex - 100);
        const snippetEnd = Math.min(doc.content_text.length, bestIndex + 300);
        const snippet = doc.content_text.substring(snippetStart, snippetEnd).trim();

        results.push({
          file_name: doc.file_name,
          snippet: `... ${snippet} ...`,
          score: score
        });
      } else {
        results.push({
          file_name: doc.file_name,
          snippet: "(ไฟล์นี้ไม่มีเนื้อหาข้อความหรือไม่ได้เป็น PDF)",
          score: score
        });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 3);
}

export const DEFAULT_SCHEMA_MAP: Record<string, { description: string; columns: string[] }> = {
  profiles: {
    description: "ข้อมูลโปรไฟล์/คุณครูในระบบโรงเรียน",
    columns: ["id", "display_name", "email", "role", "status", "created_at"]
  },
  teachers: {
    description: "รายชื่อครูและบุคลากรทางการศึกษาทั้งหมดในโรงเรียน",
    columns: ["id", "prefix", "first_name", "last_name", "position", "department", "phone", "email", "status"]
  },
  teacher_duties: {
    description: "ตารางเวรประจำวันครู (ครูเวรดูแลความปลอดภัย/เวรยามประจำวัน)",
    columns: ["id", "duty_day", "duty_type", "teacher_id", "created_at"]
  },
  students: {
    description: "ทะเบียนประวัตินักเรียนและรายชื่อนักเรียนแยกตามระดับชั้นและห้องเรียน",
    columns: ["id", "student_id", "prefix", "first_name", "last_name", "gender", "class_level", "room", "academic_year", "graduation_status", "religion"]
  },
  attendance: {
    description: "ข้อมูลสถิติการเช็คชื่อเข้าเรียนและการขาด ลา มาสาย ของนักเรียนประจำวัน",
    columns: ["id", "date", "class_level", "room", "summary", "recorded_by"]
  },
  school_projects: {
    description: "แผนงานและโครงการพัฒนาโรงเรียน วงเงินงบประมาณที่วางแผนและใช้ไป",
    columns: ["id", "project_name", "academic_year", "planned_amount", "spent_amount", "status"]
  },
  budget_allocations: {
    description: "แหล่งที่มาของงบประมาณและเงินอุดหนุนจัดสรรของโรงเรียนตามปีการศึกษา",
    columns: ["id", "budget_type", "category_name", "amount", "spent_amount", "remaining_amount", "academic_year"]
  },
  procurement_projects: {
    description: "โครงการและรายการสัญญาการจัดซื้อจัดจ้างพัสดุและวัสดุของสถานศึกษา",
    columns: ["id", "project_name", "academic_year", "method", "procurement_type", "total_amount", "status", "ref_doc_number", "contract_number", "committee_json", "vendor_info"]
  },
  incoming_docs: {
    description: "ทะเบียนหนังสือราชการรับ (หนังสือเข้า) ที่เข้ามายังสถานศึกษา พร้อมลิงก์ไฟล์แนบ",
    columns: ["id", "doc_number", "subject", "from_agency", "doc_date", "urgency", "remark", "file_url", "attachment_urls", "created_at"]
  },
  outgoing_docs: {
    description: "ทะเบียนหนังสือราชการส่ง (หนังสือออก) ที่ส่งไปยังภายนอกสถานศึกษา",
    columns: ["id", "doc_number", "subject", "to_agency", "doc_date", "urgency", "remark", "file_url", "created_at"]
  },
  orders: {
    description: "ทะเบียนคำสั่งของโรงเรียนหรือประกาศที่เป็นข้อสั่งการ",
    columns: ["id", "order_number", "subject", "issuer", "order_date", "remark", "file_url", "created_at"]
  },
  memos: {
    description: "บันทึกข้อความภายในของโรงเรียนเพื่อเสนออนุมัติหรือชี้แจง",
    columns: ["id", "memo_number", "subject", "requester", "memo_date", "urgency", "remark", "file_url", "created_at"]
  },
  utilities: {
    description: "ข้อมูลบิลและการชำระค่าสาธารณูปโภค เช่น ค่าไฟฟ้า ค่าน้ำประปา ค่าโทรศัพท์ ค่าอินเทอร์เน็ต ของสถานศึกษา",
    columns: ["id", "type", "academic_year", "month", "amount", "invoice_number", "status", "bill_date"]
  },
  library_books: {
    description: "ข้อมูลและรายการหนังสือในห้องสมุดของโรงเรียน",
    columns: ["id", "book_id", "title", "category", "author", "available_qty", "status"]
  },
  library_borrow: {
    description: "ประวัติการยืม-คืนหนังสือห้องสมุดของนักเรียนหรือคุณครู",
    columns: ["id", "book_id", "borrower_name", "borrow_date", "return_date", "status"]
  },
  doc_assignments: {
    description: "ข้อมูลการมอบหมายภารกิจหรือหนังสือราชการให้ครูและบุคลากรรับผิดชอบ",
    columns: ["id", "doc_id", "teacher_id", "instruction", "status", "reported_at", "staff_report"]
  },
  procurement_items: {
    description: "รายการวัสดุและอุปกรณ์ที่จัดซื้อภายใต้โครงการจัดซื้อจัดจ้างต่าง ๆ",
    columns: ["id", "procurement_id", "item_name", "quantity", "unit", "price_per_unit", "total_price"]
  },
  lesson_plans: {
    description: "ข้อมูลและสถานะการส่งแผนการสอนหรือแผนการจัดการเรียนรู้ของครูในโรงเรียน",
    columns: ["id", "teacher_id", "title", "subject_code", "subject_name", "class_level", "term", "file_url", "status", "academic_comments", "director_comments"]
  },
  lesson_plan_logs: {
    description: "ประวัติการส่งและอนุมัติแก้ไขแผนการสอนย้อนหลัง",
    columns: ["id", "lesson_plan_id", "actor_id", "action", "comments", "created_at"]
  }
};

export async function planDatabaseQueries(
  message: string,
  apiKey: string,
  academicYear = "2569"
): Promise<{ queries: any[]; need_rag: boolean }> {
  if (!apiKey) return { queries: [], need_rag: true };

  const schemaBrief: Record<string, { desc: string; cols: string[] }> = {};
  Object.entries(DEFAULT_SCHEMA_MAP).forEach(([table, def]) => {
    schemaBrief[table] = {
      desc: def.description,
      cols: def.columns
    };
  });

  const systemInstruction = `คุณคือ AI Database Architect ผู้เชี่ยวชาญการวิเคราะห์ความหมายภาษาไทยเพื่อการสืบค้นข้อมูลโรงเรียน

  โครงสร้างฐานข้อมูล (Schema): ${JSON.stringify(schemaBrief)}
  ปีการศึกษาปัจจุบัน: ${academicYear}

  หน้าที่: วิเคราะห์ว่าคำถามของผู้ใช้ต้องการข้อมูลจากตารางใด โดยตอบเป็นรูปแบบ JSON Object

  กฎเหล็ก:
  1. หากถามถึง "โครงการ" "งบประมาณ" หรือ "แผนงาน" ต้องเลือกตาราง school_projects เป็นอันดับแรก
  2. หากถามถึง "พัสดุ" "จัดซื้อ" หรือ "รายการของ" ต้องเลือกตาราง procurement_projects หรือ procurement_items
  3. หากถามถึง "นักเรียน" "คน" หรือ "รายชื่อ" ต้องเลือกตาราง students
  4. หากถามถึง "สถิติ" "มาเรียน" หรือ "ขาดลา" ต้องเลือกตาราง attendance
  5. หากถามถึง "แผนการสอน" หรือ "ส่งแผน" หรือ "ตรวจแผน" ต้องเลือกตาราง lesson_plans
  6. หากตารางมีคอลัมน์ academic_year ให้ใส่ฟิลเตอร์กรองปี "${academicYear}" เสมอ เว้นแต่ผู้ใช้จะระบุปีอื่น
  7. รูปแบบ JSON: { "queries": [{ "table": "...", "select": "*", "filters": [{"column": "...", "operator": "eq", "value": "..."}] }], "need_rag": boolean }`;

  const prompt = `คำถามของผู้ใช้: "${message}"`;

  try {
    const res = await callGeminiAPI(prompt, apiKey, {
      systemInstruction,
      temperature: 0.1,
      responseMimeType: "application/json"
    });

    let text = res.text.replace(/```json/g, "").replace(/```/g, "").trim();
    const result = JSON.parse(text);
    if (!result.queries) result.queries = [];
    return result;
  } catch (err: any) {
    console.error(`Planning failed:`, err.message);
    return { queries: [], need_rag: true };
  }
}

export interface AICoworkResponse {
  answer: string;
  queryPlanUsed: any;
  dbContextLoaded: string;
  knowledgeContextLoaded: string;
  privateContextLoaded: string;
}

export async function getAICoworkResponse(params: {
  userMsg: string;
  messages: ChatMessage[];
  apiKey: string;
  currentYear: string;
  searchSource: 'all' | 'database' | 'global' | 'private';
  userId: string;
}): Promise<AICoworkResponse> {
  const { userMsg, messages, apiKey, currentYear, searchSource, userId } = params;

  let schoolName = "โรงเรียน";
  let schoolAddress = "";
  let directorName = "";
  let localGovName = "";
  let currentTerm = "1";
  try {
    const schoolId = localStorage.getItem('active_school_id');
    let settingsQuery = supabase.from('settings').select('school_name, school_address, director_name, local_gov_name, current_term');
    if (schoolId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(schoolId)) {
      settingsQuery = settingsQuery.eq('school_id', schoolId);
    }
    const { data: settingsData } = await settingsQuery.maybeSingle();
    if (settingsData) {
      if (settingsData.school_name) schoolName = settingsData.school_name;
      if (settingsData.school_address) schoolAddress = settingsData.school_address;
      if (settingsData.director_name) directorName = settingsData.director_name;
      if (settingsData.local_gov_name) localGovName = settingsData.local_gov_name;
      if (settingsData.current_term) currentTerm = settingsData.current_term;
    }
  } catch (err) {
    console.error("Error loading school info for AI:", err);
  }

  let searchQuery = userMsg;


  const historyForCondensation = messages.filter(m =>
    m.text !== 'สวัสดีค่ะ ชบาคือ "น้องชบา" ผู้ช่วยอัจฉริยะของคุณครู มีอะไรให้หนูช่วยสรุปหรือค้นหาข้อมูลในคลังเอกสารไหมคะ?' &&
    m.text !== 'รีเซ็ตการสนทนาเรียบร้อยค่ะ มีอะไรให้ชบาช่วยไหมคะ?'
  ).slice(-4);

  if (historyForCondensation.length > 0) {
    const condensationPrompt = `ภารกิจ: วิเคราะห์ประวัติการสนทนาและคำถามล่าสุดของผู้ใช้ จากนั้นสร้างคำถามที่สมบูรณ์และเป็นคำถามเดี่ยว (Standalone Query) สำหรับนำไปใช้สืบค้นในฐานข้อมูลหรือคลังเอกสาร RAG โดยต้องไม่เปลี่ยนความหมายเดิม และรักษาชื่อเฉพาะ ข้อมูลตัวเลข หรือคำสำคัญไว้

ประวัติการสนทนา:
${historyForCondensation.map(m => `${m.role === 'user' ? 'คำถาม' : 'คำตอบ'}: ${m.text}`).join('\n')}
คำถามล่าสุด: ${userMsg}

ตอบกลับเฉพาะข้อความที่เป็นคำถามเดี่ยว (Standalone Query) ในภาษาไทยเท่านั้น ห้ามอธิบายเพิ่มเติม ห้ามมีเครื่องหมายคำพูด ห้ามขึ้นต้นด้วย "คำถามเดี่ยว:"`;

    try {
      const condensedRes = await callGeminiAPI(condensationPrompt, apiKey, {
        temperature: 0.2
      });
      const condensedQuery = condensedRes.text.trim();
      if (condensedQuery) {
        console.log("Original query:", userMsg);
        console.log("Condensed query:", condensedQuery);
        searchQuery = condensedQuery;
      }
    } catch (condenseErr) {
      console.warn("Failed to condense query, using original:", condenseErr);
    }
  }


  let dbContextParts: string[] = [];
  let queryPlan = { queries: [] as any[], need_rag: true };


  const queryForPlanner = searchQuery
    .replace(/(วันนี้|เมื่อวาน|เมื่อวานนี้|สัปดาห์นี้|สัปดาห์ที่แล้ว|อาทิตย์นี้|อาทิตย์ที่แล้ว|เดือนนี้|เดือนที่แล้ว|เดือนก่อน|ล่าสุด|วันที่\s*\d+)/g, '')
    .trim();

  try {
    queryPlan = await planDatabaseQueries(queryForPlanner, apiKey, currentYear);
  } catch (planErr) {
    console.error("Failed to plan database queries:", planErr);
  }

  // --- ระบบ RAG Fallback สำหรับตารางหลัก (Database Fallback Solver) ---
  if (!queryPlan.queries) queryPlan.queries = [];
  const msgLower = userMsg.toLowerCase();

  // 2.1 สำหรับข้อมูลนักเรียน
  const hasStudentQuery = queryPlan.queries.some((q: any) => q.table === 'students');
  if (!hasStudentQuery && (msgLower.includes('นักเรียน') || msgLower.includes('ชั้นเรียน') || msgLower.includes('สถิติ') || msgLower.includes('ห้องเรียน') || msgLower.includes('เด็ก'))) {
    const targetClass = extractClassLevel(userMsg);
    if (targetClass) {
      queryPlan.queries.push({
        table: 'students',
        select: 'prefix, first_name, last_name, class_level, room, gender',
        filters: [
          { column: 'class_level', operator: 'eq', value: targetClass },
          { column: 'academic_year', operator: 'eq', value: currentYear },
          { column: 'graduation_status', operator: 'in', value: ['ปกติ', 'กำลังศึกษา'] }
        ]
      });
    } else {
      queryPlan.queries.push({
        table: 'students',
        select: 'class_level, gender, religion',
        limit: 500,
        filters: [
          { column: 'academic_year', operator: 'eq', value: currentYear },
          { column: 'graduation_status', operator: 'in', value: ['ปกติ', 'กำลังศึกษา'] }
        ]
      });
    }
  }


  const hasTeacherQuery = queryPlan.queries.some((q: any) => q.table === 'teachers' || q.table === 'teacher_duties');
  if (!hasTeacherQuery && (msgLower.includes('ครู') || msgLower.includes('คุณครู') || msgLower.includes('เวร') || msgLower.includes('เวรยาม') || msgLower.includes('บุคลากร'))) {
    queryPlan.queries.push({
      table: 'teachers',
      select: 'id, prefix, first_name, last_name, position, department, phone, email',
      filters: []
    });
    queryPlan.queries.push({
      table: 'teacher_duties',
      select: 'duty_day, duty_type, teacher_id',
      filters: []
    });
  }


  const hasProjectQuery = queryPlan.queries.some((q: any) => q.table === 'school_projects' || q.table === 'budget_allocations');
  if (!hasProjectQuery && (msgLower.includes('โครงการ') || msgLower.includes('งบประมาณ') || msgLower.includes('เงินงบ') || msgLower.includes('งบ'))) {
    queryPlan.queries.push({
      table: 'school_projects',
      select: 'project_name, academic_year, planned_amount, spent_amount, status',
      filters: [{ column: 'academic_year', operator: 'eq', value: currentYear }]
    });
    queryPlan.queries.push({
      table: 'budget_allocations',
      select: 'budget_type, category_name, amount, spent_amount, remaining_amount',
      filters: [{ column: 'academic_year', operator: 'eq', value: currentYear }]
    });
  }


  const hasDocQuery = queryPlan.queries.some((q: any) =>
    q.table === 'incoming_docs' || q.table === 'outgoing_docs' || q.table === 'orders' || q.table === 'memos'
  );
  const isDocRelated = msgLower.includes('หนังสือรับ') || msgLower.includes('หนังสือเข้า') ||
    msgLower.includes('หนังสือส่ง') || msgLower.includes('หนังสือออก') ||
    msgLower.includes('คำสั่ง') || msgLower.includes('บันทึกข้อความ') ||
    msgLower.includes('เมโม่') || msgLower.includes('แนบ') || msgLower.includes('สารบรรณ');

  if (!hasDocQuery && isDocRelated) {

    const parseDateRange = (text: string): { gte?: string; lte?: string } | null => {
      const now = new Date();
      const today = now.toISOString().split('T')[0];

      if (text.includes('วันนี้')) {
        return { gte: `${today}T00:00:00`, lte: `${today}T23:59:59` };
      }
      if (text.includes('เมื่อวาน') || text.includes('เมื่อวานนี้')) {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        const yStr = yesterday.toISOString().split('T')[0];
        return { gte: `${yStr}T00:00:00`, lte: `${yStr}T23:59:59` };
      }
      if (text.includes('สัปดาห์นี้') || text.includes('อาทิตย์นี้')) {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        return { gte: weekStart.toISOString().split('T')[0] + 'T00:00:00' };
      }
      if (text.includes('สัปดาห์ที่แล้ว') || text.includes('อาทิตย์ที่แล้ว')) {
        const wStart = new Date(now);
        wStart.setDate(now.getDate() - now.getDay() - 7);
        const wEnd = new Date(now);
        wEnd.setDate(now.getDate() - now.getDay() - 1);
        return { gte: wStart.toISOString().split('T')[0] + 'T00:00:00', lte: wEnd.toISOString().split('T')[0] + 'T23:59:59' };
      }
      if (text.includes('เดือนนี้')) {
        const mStart = new Date(now.getFullYear(), now.getMonth(), 1);
        return { gte: mStart.toISOString().split('T')[0] + 'T00:00:00' };
      }
      if (text.includes('เดือนที่แล้ว') || text.includes('เดือนก่อน')) {
        const pmStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const pmEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        return { gte: pmStart.toISOString().split('T')[0] + 'T00:00:00', lte: pmEnd.toISOString().split('T')[0] + 'T23:59:59' };
      }


      const THAI_MONTHS: Record<string, number> = {
        'มกราคม': 1, 'กุมภาพันธ์': 2, 'มีนาคม': 3, 'เมษายน': 4,
        'พฤษภาคม': 5, 'มิถุนายน': 6, 'กรกฎาคม': 7, 'สิงหาคม': 8,
        'กันยายน': 9, 'ตุลาคม': 10, 'พฤศจิกายน': 11, 'ธันวาคม': 12
      };

      for (const [thMonth, mNum] of Object.entries(THAI_MONTHS)) {
        if (text.includes(thMonth)) {
          const dayMatch = text.match(/(\d{1,2})\s*(?:วันที่)?\s*${thMonth}/);
          const dayMatch2 = text.match(new RegExp(`(\\d{1,2})\\s*${thMonth}`));
          const day = dayMatch?.[1] || dayMatch2?.[1];
          const yearMatch = text.match(/(\d{4})/);
          const buddhistYear = yearMatch ? parseInt(yearMatch[1]) : (now.getFullYear() + 543);
          const adYear = buddhistYear > 2500 ? buddhistYear - 543 : buddhistYear;
          const month = String(mNum).padStart(2, '0');
          const dayStr = day ? String(day).padStart(2, '0') : '01';
          const dateStr = `${adYear}-${month}-${dayStr}`;
          return day
            ? { gte: `${dateStr}T00:00:00`, lte: `${dateStr}T23:59:59` }
            : { gte: `${adYear}-${month}-01T00:00:00` };
        }
      }

      const slashDate = text.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?/);
      if (slashDate) {
        const [, d, m, y] = slashDate;
        const buddhistYear = y ? parseInt(y) : (now.getFullYear() + 543);
        const adYear = buddhistYear > 2500 ? buddhistYear - 543 : buddhistYear;
        const dateStr = `${adYear}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
        return { gte: `${dateStr}T00:00:00`, lte: `${dateStr}T23:59:59` };
      }

      const dayOnlyMatch = text.match(/วันที่\s*(\d{1,2})/);
      if (dayOnlyMatch) {
        const d = dayOnlyMatch[1].padStart(2, '0');
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const dateStr = `${now.getFullYear()}-${m}-${d}`;
        return { gte: `${dateStr}T00:00:00`, lte: `${dateStr}T23:59:59` };
      }
      return null;
    };

    const dateRange = parseDateRange(msgLower + ' ' + userMsg);
    const searchWord = userMsg
      .replace(/(ขอ|ไฟล์|แนบ|หนังสือ|คำสั่ง|บันทึกข้อความ|เมโม่|ล่าสุด|ของ|ที่|เรื่อง|เรื่องที่|วันนี้|เมื่อวาน|สัปดาห์นี้|เดือนนี้|สารบรรณ)/g, '')
      .trim();
    const docFilters: any[] = searchWord && searchWord.length > 1
      ? [{ column: 'subject', operator: 'ilike', value: `%${searchWord}%` }]
      : [];
    if (dateRange?.gte) docFilters.push({ column: 'created_at', operator: 'gte', value: dateRange.gte });
    if (dateRange?.lte) docFilters.push({ column: 'created_at', operator: 'lte', value: dateRange.lte });

    if (msgLower.includes('หนังสือรับ') || msgLower.includes('หนังสือเข้า') || msgLower.includes('แนบ') || msgLower.includes('เอกสารแนบ') || msgLower.includes('สารบรรณ')) {
      queryPlan.queries.push({
        table: 'incoming_docs',
        select: 'doc_number, subject, from_agency, doc_date, urgency, remark, file_url, attachment_urls, created_at',
        filters: docFilters,
        limit: 20
      });
    }
    if (msgLower.includes('หนังสือส่ง') || msgLower.includes('หนังสือออก')) {
      queryPlan.queries.push({
        table: 'outgoing_docs',
        select: 'doc_number, subject, to_agency, doc_date, urgency, remark, file_url, created_at',
        filters: docFilters,
        limit: 20
      });
    }
    if (msgLower.includes('คำสั่ง')) {
      queryPlan.queries.push({
        table: 'orders',
        select: 'order_number, subject, issuer, order_date, remark, file_url, created_at',
        filters: docFilters,
        limit: 20
      });
    }
    if (msgLower.includes('บันทึกข้อความ') || msgLower.includes('เมโม่') || msgLower.includes('บันทึก')) {
      queryPlan.queries.push({
        table: 'memos',
        select: 'memo_number, subject, requester, memo_date, urgency, remark, file_url, created_at',
        filters: docFilters,
        limit: 20
      });
    }

    if (!msgLower.includes('หนังสือ') && !msgLower.includes('คำสั่ง') && !msgLower.includes('บันทึก')) {
      queryPlan.queries.push({
        table: 'incoming_docs',
        select: 'doc_number, subject, from_agency, doc_date, urgency, remark, created_at',
        filters: docFilters,
        limit: 10
      });
    }
  }


  const hasUtilityQuery = queryPlan.queries.some((q: any) => q.table === 'utilities');
  if (!hasUtilityQuery && (msgLower.includes('ค่าไฟ') || msgLower.includes('ไฟฟ้า') || msgLower.includes('ค่าน้ำ') || msgLower.includes('ประปา') || msgLower.includes('โทรศัพท์') || msgLower.includes('เน็ต') || msgLower.includes('อินเทอร์เน็ต') || msgLower.includes('บิล') || msgLower.includes('สาธารณูปโภค'))) {
    const types = [];
    if (msgLower.includes('ค่าไฟ') || msgLower.includes('ไฟฟ้า')) types.push('electricity');
    if (msgLower.includes('ค่าน้ำ') || msgLower.includes('ประปา')) types.push('water');
    if (msgLower.includes('โทรศัพท์')) types.push('telephone');
    if (msgLower.includes('เน็ต') || msgLower.includes('อินเทอร์เน็ต')) types.push('internet');

    queryPlan.queries.push({
      table: 'utilities',
      select: 'type, academic_year, month, amount, invoice_number, status, bill_date',
      filters: [
        { column: 'academic_year', operator: 'eq', value: currentYear },
        ...(types.length > 0 ? [{ column: 'type', operator: 'in', value: types }] : [])
      ],
      limit: 20
    });
  }


  const hasProcureQuery = queryPlan.queries.some((q: any) => q.table === 'procurement_projects');
  if (!hasProcureQuery && (msgLower.includes('จัดซื้อ') || msgLower.includes('จัดจ้าง') || msgLower.includes('พัสดุ') || msgLower.includes('ผู้ขาย') || msgLower.includes('สัญญา') || msgLower.includes('ผู้รับจ้าง'))) {
    queryPlan.queries.push({
      table: 'procurement_projects',
      select: 'project_name, academic_year, method, procurement_type, total_amount, status, ref_doc_number, contract_number, committee_json, vendor_info',
      filters: [{ column: 'academic_year', operator: 'eq', value: currentYear }],
      limit: 20
    });
  }


  let fallbackStats = "";
  try {
    const { count: sCount } = await supabase.from('students').select('*', { count: 'exact', head: true }).eq('academic_year', currentYear).in('graduation_status', ['ปกติ', 'กำลังศึกษา']);
    const { count: tCount } = await supabase.from('teachers').select('*', { count: 'exact', head: true });
    fallbackStats = `สถิติพื้นฐาน: นักเรียน ${sCount || 0} คน, ครู ${tCount || 0} คน (ปีการศึกษา ${currentYear})`;
  } catch (e) {}

  // 4. คิวรีข้อมูลจริงจาก Supabase
  // คอลัมน์ประเภทวันที่/เวลา ห้ามให้ AI Planner กำหนดค่า - ต้องผ่าน parseDateRange เท่านั้น
  const DATE_COLUMNS = new Set(['created_at', 'doc_date', 'order_date', 'memo_date', 'duty_day', 'bill_date', 'updated_at']);

  if (queryPlan.queries && Array.isArray(queryPlan.queries)) {
    for (const q of queryPlan.queries) {
      // ลบ filter วันที่ที่ AI Planner สร้างผิดพลาดออกทั้งหมด
      if (q.filters) {
        q.filters = q.filters.filter((f: any) => !DATE_COLUMNS.has(f.column));
      }
      if (!DEFAULT_SCHEMA_MAP[q.table]) continue;
      try {
        let selectStr = q.select || '*';
        if (selectStr.includes('count') || selectStr.includes('(') || selectStr.includes(')')) {
          const parts = selectStr.split(',').map((p: string) => p.trim());
          const validParts = parts.filter((p: string) => {
            const cleanName = p.replace(/[^a-zA-Z0-9_]/g, '');
            return DEFAULT_SCHEMA_MAP[q.table].columns.includes(cleanName);
          });
          selectStr = validParts.length > 0 ? validParts.join(',') : '*';
        }

        let query = supabase.from(q.table).select(selectStr);

        // กรองปีการศึกษา (academic_year)
        const columnsInTable = DEFAULT_SCHEMA_MAP[q.table]?.columns || [];
        if (columnsInTable.includes('academic_year')) {
          const hasYearFilter = q.filters && q.filters.some((f: any) => f.column === 'academic_year');
          if (!hasYearFilter) {
            query = query.eq('academic_year', currentYear);
          }
        }

        // กรองสถานะนักเรียนปกติ/กำลังศึกษา (graduation_status)
        if (q.table === 'students') {
          const hasStatusFilter = q.filters && q.filters.some((f: any) => f.column === 'graduation_status');
          if (!hasStatusFilter) {
            query = query.in('graduation_status', ['ปกติ', 'กำลังศึกษา']);
          }
        }

        if (q.filters) {
          for (const f of q.filters) {
            if (DEFAULT_SCHEMA_MAP[q.table].columns.includes(f.column)) {
              if (q.table === 'students' && f.column === 'class_level') {
                const rawVal = String(f.value).trim();
                const levelMatch = rawVal.match(/\d+/);
                const prefix = rawVal.includes('อ') || rawVal.includes('อนุบาล') ? 'อ' : 'ป';
                if (levelMatch) {
                  const levelNum = levelMatch[0];
                  if (prefix === 'ป') {
                    query = query.or(`class_level.eq.${rawVal},class_level.ilike.ป%${levelNum}%,class_level.ilike.%ประถม%${levelNum}%`);
                  } else {
                    query = query.or(`class_level.eq.${rawVal},class_level.ilike.อ%${levelNum}%,class_level.ilike.%อนุบาล%${levelNum}%`);
                  }
                } else {
                  // @ts-ignore
                  query = query[f.operator](f.column, f.value);
                }
              } else {
                // @ts-ignore
                query = query[f.operator](f.column, f.value);
              }
            }
          }
        }

        const { data, error } = await query.limit(Math.min(q.limit || 100, 500));
        if (error) {
          console.error(`[AICowork Service DB Query Error on ${q.table}]:`, error);
        } else if (data?.length) {
          // เพิ่ม Pre-computed stats สำหรับตารางนักเรียนภาพรวม
          if (q.table === 'students' && !userMsg.includes('รายชื่อ') && !userMsg.includes('คนไหนบ้าง')) {
            const counts: Record<string, number> = {};
            const genders: Record<string, number> = {};
            const religions: Record<string, number> = {};

            (data as any[]).forEach((s: any) => {
              const lvl = s.class_level || 'ไม่ระบุชั้น';
              const g = s.gender || 'ไม่ระบุเพศ';
              const r = s.religion || 'ไม่ระบุศาสนา';

              counts[lvl] = (counts[lvl] || 0) + 1;
              genders[g] = (genders[g] || 0) + 1;
              religions[r] = (religions[r] || 0) + 1;
            });

            const sortedClasses = Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0], 'th'));
            const summaryStr = sortedClasses.map(([lvl, num]) => `- ${lvl}: ${num} คน`).join('\n');
            const genderStr = Object.entries(genders).map(([g, num]) => `- ${g}: ${num} คน`).join('\n');
            const religionStr = Object.entries(religions).map(([r, num]) => `- ${r}: ${num} คน`).join('\n');

            dbContextParts.push(`[สรุปสถิตินักเรียนปีการศึกษา ${currentYear} คำนวณจากระบบฐานข้อมูล]:
รวมนักเรียนปัจจุบันทั้งหมด: ${data.length} คน

จำนวนนักเรียนแยกตามชั้นเรียน:
${summaryStr}

จำนวนนักเรียนแยกตามเพศ:
${genderStr}

จำนวนนักเรียนแยกตามศาสนา:
${religionStr}

[ข้อมูลรายละเอียดตารางนักเรียนดิบ: ${q.table}]
${JSON.stringify(data, null, 2)}`);
          } else {
            dbContextParts.push(`[ข้อมูลตาราง: ${q.table}]\n${JSON.stringify(data, null, 2)}`);
          }
        }
      } catch (queryErr) {
        console.error(`[AICowork Service DB Query Exec Fail on ${q.table}]:`, queryErr);
      }
    }
  }

  // 5. ค้นหาคลังปัญญา (RAG ส่วนกลาง)
  let knowledgeContext = "";
  if (queryPlan.need_rag !== false && (searchSource === 'all' || searchSource === 'global')) {
    let matches = await searchKnowledge(searchQuery, apiKey, 12);

    const fileRefMatch = searchQuery.match(/(\d+[\/_]\d+|ว\s?\d+|ระเบียบ\s?\d+)/i) || userMsg.match(/(\d+[\/_]\d+|ว\s?\d+|ระเบียบ\s?\d+)/i);
    if (fileRefMatch) {
      const keyword = fileRefMatch[0];
      const cleanKw = keyword.replace(/\//g, '_');
      const { data: deepMatches } = await supabase
        .from('school_knowledge')
        .select('document_name, page_number, chunk_text')
        .or(`document_name.ilike.%${keyword}%,document_name.ilike.%${cleanKw}%,chunk_text.ilike.%${keyword}%,chunk_text.ilike.%${cleanKw}%`)
        .limit(10);

      if (deepMatches?.length) {
        const combinedMatches = [...deepMatches.map(m => ({...m, similarity: 1})), ...matches];
        matches = combinedMatches.filter((v, i, a) => a.findIndex(t => (t.chunk_text === v.chunk_text)) === i);
      }
    }

    knowledgeContext = matches.map((m: any) => `[คลังกลาง: ${m.document_name} หน้า ${m.page_number}]\n${m.chunk_text}`).join('\n\n');
  }

  // 6. ค้นหาเอกสารส่วนตัว (Private Knowledge RAG)
  let privateContext = "";
  if (searchSource === 'all' || searchSource === 'private') {
    try {
      const privateMatches = await searchPrivateKnowledge(searchQuery, userId, apiKey, 10);
      if (privateMatches && privateMatches.length > 0) {
        privateContext = privateMatches.map((m: any) => `[ไฟล์ส่วนตัว: ${m.document_name} หน้า ${m.page_number}]\n${m.chunk_text}`).join('\n\n');
      } else {
        // Fallback: ค้นหาจากเนื้อหาไฟล์ดิบดั้งเดิมแบบ Keyword Search
        const { data: personalDocs } = await supabase
          .from('ai_knowledge_base')
          .select('*')
          .eq('teacher_id', userId)
          .order('created_at', { ascending: false });

        if (personalDocs?.length) {
          const pMatches = searchPersonalDocs(searchQuery, personalDocs);
          if (pMatches.length === 0 && (searchQuery.includes('ล่าสุด') || personalDocs.length === 1)) {
            const latest = personalDocs[0];
            privateContext = `[ไฟล์ล่าสุด: ${latest.file_name}]\n${latest.content_text?.substring(0, 1500)}`;
          } else {
            privateContext = pMatches.map(m => `[ไฟล์ส่วนตัว: ${m.file_name}]\n${m.snippet}`).join('\n\n');
          }
        }
      }
    } catch (privErr) {
      console.error("Private search error in service:", privErr);
    }
  }

  // 7. สร้างประวัติการสนทนาย้อนหลังเสริมเป็น Context
  const historyForPrompt = messages.filter(m =>
    m.text !== 'สวัสดีค่ะ ชบาคือ "น้องชบา" ผู้ช่วยอัจฉริยะของคุณครู มีอะไรให้หนูช่วยสรุปหรือค้นหาข้อมูลในคลังเอกสารไหมคะ?' &&
    m.text !== 'รีเซ็ตการสนทนาเรียบร้อยค่ะ มีอะไรให้ชบาช่วยไหมคะ?'
  ).slice(-5);

  let historyContext = "";
  if (historyForPrompt.length > 0) {
    historyContext = `ประวัติการสนทนาล่าสุดของเซสชันนี้:\n` +
      historyForPrompt.map(m => `- ${m.role === 'user' ? 'คุณครู' : 'น้องชบา'}: ${m.text}`).join('\n') +
      `\n\n`;
  }

  // 8. สร้าง Prompt และเรียก AI
  const schoolInfoLines = [
    `ชื่อโรงเรียน: ${schoolName}`,
    directorName ? `ผู้อำนวยการโรงเรียน: ${directorName}` : '',
    localGovName ? `ต้นสังกัด/สพป./อปท.: ${localGovName}` : '',
    schoolAddress ? `ที่อยู่: ${schoolAddress}` : '',
    `ปีการศึกษาปัจจุบัน: ${currentYear} ภาคเรียนที่ ${currentTerm}`,
  ].filter(Boolean).join('\n  ');

  const systemInstruction = `คุณคือ "น้องชบา" ผู้ช่วยอัจฉริยะของ${schoolName}

  ข้อมูลโรงเรียน (ตอบคำถามเกี่ยวกับโรงเรียนจากข้อมูลนี้ได้เลยโดยไม่ต้องบอกว่าไม่รู้):
  ${schoolInfoLines}

  บุคลิก: สุภาพ ใช้ "ค่ะ/นะคะ" แทนตัวว่า "ชบา" หรือ "หนู"
  กฎการตอบ:
  - ตอบเฉพาะความจริงจากบริบทที่ให้เท่านั้น ห้ามมโนข้อมูลเอง
  - หากนำข้อมูลมาจาก 'บริบทคลังปัญญา' หรือ 'บริบทเอกสารส่วนตัว' มาตอบ ให้เขียนระบุแหล่งอ้างอิงเอกสารต้นฉบับและหน้า (ถ้ามี) ไว้ท้ายข้อมูลหรือส่วนที่เกี่ยวข้องเสมอ เช่น "(อ้างอิงจากคลังกลาง: [ชื่อเอกสาร] หน้า [หน้า])" หรือ "(อ้างอิงจากไฟล์ส่วนตัว: [ชื่อไฟล์] หน้า [หน้า])" เพื่อให้ผู้ใช้สามารถตรวจสอบความถูกต้องได้
  - หากไม่พบข้อมูล ให้แจ้งสุภาพว่า "ชบาหาข้อมูลส่วนนี้ไม่พบค่ะ"
  - ห้ามใช้เครื่องหมายดอกจัน (*) ในคำตอบ
  - จัดรูปแบบให้อ่านง่าย ใช้แท็ก <ans>...</ans> หุ้มคำตอบสุดท้าย`;

  const prompt = `บริบทฐานข้อมูล:
  ${fallbackStats}
  ${truncateContext(dbContextParts.join('\n\n'), 150000)}

  บริบทคลังปัญญา:
  ${truncateContext(knowledgeContext, 150000)}

  บริบทเอกสารส่วนตัว:
  ${truncateContext(privateContext, 150000)}

  ${historyContext}คำถามปัจจุบันของคุณครู: "${userMsg}"

  ตอบในแท็ก <ans> เท่านั้นนะคะ`;

  const res = await callGeminiAPI(prompt, apiKey, {
    systemInstruction,
    temperature: 0.7
  });

  let finalAnswer = res.text;
  const match = finalAnswer.match(/<ans>([\s\S]*?)<\/ans>/);
  if (match) finalAnswer = match[1].trim();

  finalAnswer = finalAnswer.replace(/\*/g, '').replace(/AI Cowork/gi, 'น้องชบา').replace(/ครับ/g, 'ค่ะ');

  return {
    answer: finalAnswer,
    queryPlanUsed: queryPlan,
    dbContextLoaded: dbContextParts.join('\n\n'),
    knowledgeContextLoaded: knowledgeContext,
    privateContextLoaded: privateContext
  };
}
````

## File: src/App.tsx
````typescript
import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { supabase, getSchoolProfiles, getActiveSchoolProfile } from './lib/supabase';
import Login from './pages/Login';
import SchoolSetup from './pages/SchoolSetup';
import IncomingDocs from './pages/IncomingDocs';
import OutgoingDocs from './pages/OutgoingDocs';
import Orders from './pages/Orders';
import Memos from './pages/Memos';
import Teachers from './pages/Teachers';
import TaskManagement from './pages/TaskManagement';
import Reports from './pages/Reports';
import SettingsPage from './pages/Settings';
import UsersManagement from './pages/Users';
import ProfilePage from './pages/Profile';
import Dashboard from './pages/Dashboard';
import AICowork from './pages/AICowork';
import ARLearning from './pages/ARLearning';
import ARAdmin from './pages/ARAdmin';
import SchoolApprovals from './pages/SchoolApprovals';
import IdentityFooter from './components/IdentityFooter';
import ComingSoon from './components/ComingSoon';

import {
  Loader2,
  LayoutDashboard,
  Users,
  Clock,
  Library,
  Settings as SettingsIcon,
  LogOut,
  Book,
  MessageSquare,
  ChevronRight,
  PieChart,
  Printer,
  UserCheck,
  ClipboardList,
  ShieldCheck,
  UserCircle,
  GraduationCap,
  Wallet,
  BarChart3,
  FileDown,
  FileUp,
  User,
  Bot,
  Coins,
  Droplets,
  Download,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Gamepad2,
  MapPin,
  School
} from 'lucide-react';

const { ipcRenderer } = (window as any).require ? (window as any).require('electron') : { ipcRenderer: null };

type Tab = 'dashboard' | 'incoming' | 'outgoing' | 'orders' | 'memos' | 'students' | 'teachers' | 'tasks' | 'attendance' | 'attendance_report' | 'library' | 'wfh' | 'settings' | 'lec' | 'custom_print' | 'users' | 'academic' | 'finance' | 'reports' | 'profile' | 'ai_cowork' | 'free_education' | 'utilities' | 'ar_learning' | 'ar_admin' | 'service_area' | 'athletics' | 'approvals';

function App() {
  const { user, profile, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const superAdminEmail = (import.meta.env.VITE_SUPER_ADMIN_EMAIL || 'ncrows77@gmail.com').toLowerCase();
  const isSuperAdmin = profile?.email?.toLowerCase() === superAdminEmail;
  const [schoolName, setSchoolName] = useState(import.meta.env.VITE_SCHOOL_NAME || 'โรงเรียนบ้านควนโคกยา');
  const [schoolLogo, setSchoolLogo] = useState('');
  const [localGovName, setLocalGovName] = useState('');

  const [showSchoolSetup, setShowSchoolSetup] = useState(() => {
    return sessionStorage.getItem('open_school_setup_after_reload') === 'true';
  });

  useEffect(() => {
    if (showSchoolSetup) {
      sessionStorage.removeItem('open_school_setup_after_reload');
    }
  }, [showSchoolSetup]);

  const handleSwitchSchool = async () => {
    if (window.confirm('คุณครูต้องการสลับสถานศึกษาใช่หรือไม่?\nระบบจะทำการออกจากระบบของโรงเรียนนี้')) {
      await signOut();
      sessionStorage.setItem('open_school_setup_after_reload', 'true');
      window.location.reload();
    }
  };


  const [updateStatus, setUpdateStatus] = useState<{ type: string; message: string; version?: string } | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  useEffect(() => {
    if (!ipcRenderer) return;

    ipcRenderer.on('update-status', (_event: any, status: any) => {
      setUpdateStatus(status);
      if (status.type === 'not-available' || status.type === 'error') {
        setTimeout(() => setUpdateStatus(null), 5000);
      }
    });

    ipcRenderer.on('update-progress', (_event: any, progress: any) => {
      setDownloadProgress(Math.floor(progress.percent));
    });

    return () => {
      ipcRenderer.removeAllListeners('update-status');
      ipcRenderer.removeAllListeners('update-progress');
    };
  }, []);

  useEffect(() => {
    const handleChangeTab = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setActiveTab(customEvent.detail as Tab);
      }
    };
    window.addEventListener('change-tab', handleChangeTab);
    return () => window.removeEventListener('change-tab', handleChangeTab);
  }, []);

  const handleRestart = () => {
    const confirmRestart = window.confirm('ระบบพร้อมอัปเดตแล้วค่ะ คุณครูต้องการเริ่มระบบใหม่ตอนนี้เลยไหมคะ? \n(กรุณาตรวจสอบว่าบันทึกข้อมูลที่ค้างไว้เรียบร้อยแล้วนะคะ)');

    if (confirmRestart) {

      try {
        sessionStorage.clear();
        console.log('Session storage cleared before restart');
      } catch (e) {
        console.error('Failed to clear session storage:', e);
      }

      if (ipcRenderer) ipcRenderer.send('restart-app');
    }
  };

  useEffect(() => {
    async function fetchSchoolName() {

      if (!user) {
        setSchoolName(import.meta.env.VITE_SCHOOL_NAME || 'โรงเรียนบ้านควนโคกยา');
        setSchoolLogo('');
        setLocalGovName('');
        return;
      }

      const activeProfile = getActiveSchoolProfile();
      const isUUID = activeProfile?.id ? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(activeProfile.id) : false;

      if (!activeProfile || !isUUID) {
        // หากยังไม่มีการตั้งค่าโปรไฟล์โรงเรียนจริง ให้ดึงค่าโรงเรียนตัวอย่างจาก env แทนการยิง API ไปหา placeholder URL
        setSchoolName(import.meta.env.VITE_SCHOOL_NAME || 'โรงเรียนบ้านควนโคกยา');
        setSchoolLogo('');
        setLocalGovName('');
        return;
      }

      try {
        const { data } = await supabase
          .from('settings')
          .select('school_name, school_logo_url, local_gov_name')
          .eq('school_id', activeProfile.id)
          .maybeSingle();

        if (data?.school_name) setSchoolName(data.school_name);
        if (data?.school_logo_url) setSchoolLogo(data.school_logo_url);
        if (data?.local_gov_name) setLocalGovName(data.local_gov_name);
      } catch (err) {
        console.error('Error fetching school name/logo:', err);
      }
    }
    fetchSchoolName();
  }, [user]);


  const isAdmin = profile?.role === 'admin';
  const isDirector = profile?.role === 'director' || isAdmin;
  const isTeacher = profile?.role === 'teacher';
  const isGuest = profile?.role === 'guest' || !profile?.role;

  useEffect(() => {
    if (isGuest && activeTab !== 'dashboard') {
      setActiveTab('dashboard');
      return;
    }


    if (user && profile && !isAdmin && !isDirector) {
      const extraPerms = profile.extra_permissions || {};

      const isRestrictedDoc = activeTab === 'incoming' || activeTab === 'outgoing' || activeTab === 'orders';
      const isRestrictedStaff = activeTab === 'teachers' || activeTab === 'wfh';
      const isRestrictedReport = activeTab === 'reports' || activeTab === 'lec';
      const isRestrictedStudent = activeTab === 'students' || activeTab === 'attendance_report';
      const isRestrictedAcademic = activeTab === 'academic';
      const isRestrictedLibrary = activeTab === 'library';
      const isRestrictedFinance = activeTab === 'finance' || activeTab === 'utilities' || activeTab === 'free_education';
      const isRestrictedAdmin = activeTab === 'users' || activeTab === 'settings';
      const isRestrictedAthletics = activeTab === 'athletics';

      if (isRestrictedDoc && !extraPerms.access_administrative) {
        setActiveTab('dashboard');
      } else if (isRestrictedStaff && !extraPerms.access_hr) {
        setActiveTab('dashboard');
      } else if (isRestrictedReport && !extraPerms.access_reports) {
        setActiveTab('dashboard');
      } else if (isRestrictedStudent && !extraPerms.access_student_affairs) {
        setActiveTab('dashboard');
      } else if (isRestrictedAcademic && profile?.role !== 'teacher' && !extraPerms.access_academic) {
        setActiveTab('dashboard');
      } else if (isRestrictedLibrary && !extraPerms.access_academic) {
        setActiveTab('dashboard');
      } else if (isRestrictedFinance && !extraPerms.access_finance) {
        setActiveTab('dashboard');
      } else if (isRestrictedAthletics && !extraPerms.access_athletics) {
        setActiveTab('dashboard');
      } else if (isRestrictedAdmin && !isAdmin) {
        setActiveTab('dashboard');
      }
    }
  }, [user, profile, activeTab, isGuest, isAdmin, isDirector]);

  const hasProfiles = getSchoolProfiles().length > 0;

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-primary" size={48} /></div>;

  if (!user) {
    if (showSchoolSetup || !hasProfiles) {
      return (
        <SchoolSetup
          onBackToLogin={hasProfiles ? () => setShowSchoolSetup(false) : undefined}
        />
      );
    }
    return (
      <Login
        onManageSchools={() => setShowSchoolSetup(true)}
      />
    );
  }

  const extraPerms = profile?.extra_permissions || {};
  const canAccessRegistration = !isGuest && (isAdmin || isDirector || extraPerms.access_administrative);
  const canAccessStaff = !isGuest && (isAdmin || isDirector || extraPerms.access_hr);
  const canAccessReports = !isGuest && (isDirector || extraPerms.access_reports);
  const canAccessStudentAffairs = !isGuest && (isAdmin || isDirector || extraPerms.access_student_affairs);
  const canAccessAcademic = !isGuest && (isAdmin || isDirector || isTeacher || extraPerms.access_academic);
  const canAccessLibrary = !isGuest && (isAdmin || isDirector || extraPerms.access_academic);
  const canAccessFinance = !isGuest && (isAdmin || isDirector || extraPerms.access_finance);
  const canAccessAthletics = !isGuest && (isAdmin || isDirector || extraPerms.access_athletics);

  const isSuperAdminMode = localStorage.getItem('super_admin_mode') === 'true';

  if (isSuperAdminMode) {
    return (
      <div className="min-h-screen flex bg-slate-50 font-sans">
        {}
        <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col sticky top-0 h-screen overflow-y-auto shrink-0 shadow-xl">
          <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
            <div className="w-10 h-10 bg-brand-primary/20 rounded-xl flex items-center justify-center border border-brand-primary/30 shrink-0">
              <School className="text-brand-primary" size={24} />
            </div>
            <div>
              <h1 className="font-black text-white text-sm tracking-tight">Super Admin</h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">ระบบควบคุมส่วนกลาง</p>
            </div>
          </div>

          <nav className="flex-1 py-6 px-4 space-y-1">
            <SidebarItem
              icon={<School size={20} />}
              label="อนุมัติโรงเรียน"
              active={true}
              onClick={() => {}}
            />
          </nav>

          <div className="p-4 border-t border-slate-800 bg-slate-950">
            <button
              onClick={async () => {
                await signOut();
                localStorage.removeItem('super_admin_mode');
                localStorage.removeItem('active_school_id');
                window.location.reload();
              }}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-950/30 rounded-xl transition-all font-bold text-sm"
            >
              <LogOut size={20} /> ออกจากระบบกลาง
            </button>
          </div>
        </aside>

        {}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50">
          <div className="flex-1 overflow-y-auto">
            <SchoolApprovals />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen overflow-y-auto scrollbar-hide shrink-0 shadow-sm">
        <div className="p-6 border-b border-slate-50 flex items-center gap-3 bg-white animate-in fade-in">
          <img src={schoolLogo || import.meta.env.VITE_SCHOOL_LOGO_PATH || "logo.png"} alt="School Logo" className="w-12 h-12 object-contain" />
          <div className="flex-1 min-w-0">
            <h1 className="font-black text-slate-800 text-xs tracking-tighter truncate">{schoolName}</h1>
            <button
              onClick={handleSwitchSchool}
              className="text-[9px] text-brand-primary font-black uppercase tracking-widest hover:underline block text-left mt-0.5"
            >
              🔄 สลับโรงเรียน
            </button>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="แดชบอร์ด" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />

          {!isGuest && (
            <>
              <SidebarItem icon={<User size={20} />} label="ข้อมูลส่วนตัว" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
              {canAccessReports && <SidebarItem icon={<BarChart3 size={20} />} label="ระบบรายงานอัจฉริยะ" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />}

              <div className="py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mt-4 text-[9px]">งานสารบรรณ</div>
              {canAccessRegistration && <SidebarItem icon={<FileDown size={20} />} label="หนังสือรับ" active={activeTab === 'incoming'} onClick={() => setActiveTab('incoming')} />}
              {canAccessRegistration && <SidebarItem icon={<FileUp size={20} />} label="หนังสือส่ง" active={activeTab === 'outgoing'} onClick={() => setActiveTab('outgoing')} />}
              {canAccessRegistration && <SidebarItem icon={<Book size={20} />} label="คำสั่ง" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />}
              <SidebarItem icon={<MessageSquare size={20} />} label="บันทึกข้อความ" active={activeTab === 'memos'} onClick={() => setActiveTab('memos')} />
              <SidebarItem icon={<ClipboardList size={20} />} label="ติดตามงาน/สั่งการ" active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} />

              <div className="py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mt-4 text-[9px]">นวัตกรรม AI & AR</div>
              <SidebarItem icon={<Bot size={20} />} label="AI Cowork" active={activeTab === 'ai_cowork'} onClick={() => setActiveTab('ai_cowork')} />
              <SidebarItem icon={<Gamepad2 size={20} />} label="น้องชบาพาพิชิต(AR)" active={activeTab === 'ar_learning'} onClick={() => setActiveTab('ar_learning')} />
              <SidebarItem icon={<SettingsIcon size={20} />} label="จัดการบทเรียน AR" active={activeTab === 'ar_admin'} onClick={() => setActiveTab('ar_admin')} />

              {canAccessStaff && (
                <>
                  <div className="py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mt-4 text-[9px]">งานบุคคล</div>
                  <SidebarItem icon={<UserCheck size={20} />} label="จัดการข้อมูลครู" active={activeTab === 'teachers'} onClick={() => setActiveTab('teachers')} />
                </>
              )}

              {isAdmin && (
                <>
                  <div className="py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mt-4 text-[9px]">ตั้งค่าและความปลอดภัย</div>
                  <SidebarItem icon={<ShieldCheck size={20} />} label="จัดการสิทธิ์" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
                  <SidebarItem icon={<SettingsIcon size={20} />} label="ตั้งค่าระบบ" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                  {isSuperAdmin && (
                    <SidebarItem icon={<School size={20} />} label="อนุมัติโรงเรียน" active={activeTab === 'approvals'} onClick={() => setActiveTab('approvals')} />
                  )}
                </>
              )}
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-100 bg-white">
          <button onClick={() => signOut()} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-sm mb-4">
            <LogOut size={20} /> ออกจากระบบ
          </button>

          <div className="px-4 py-2 border-t border-slate-50 mt-2">
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter leading-tight">
              Smart School Admin © 2026<br/>
              <span className="text-brand-primary">Phairot Makkaew & Gemini AI</span><br/>
              {schoolName}<br/>
              <span className="text-slate-500 normal-case font-semibold">Version {import.meta.env.VITE_APP_VERSION || '1.1.14'}</span>
            </p>
          </div>
        </div>
      </aside>

      {}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-xs">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 uppercase tracking-tight">
            {activeTab === 'dashboard' && 'แดชบอร์ด'}
            {activeTab === 'profile' && 'ข้อมูลส่วนตัวและลายเซ็น'}
            {activeTab === 'reports' && 'ระบบรายงานอัจฉริยะ'}
            {activeTab === 'incoming' && 'หนังสือรับ'}
            {activeTab === 'outgoing' && 'หนังสือส่ง'}
            {activeTab === 'orders' && 'คำสั่ง'}
            {activeTab === 'memos' && 'บันทึกข้อความ'}
            {activeTab === 'students' && 'ข้อมูลนักเรียน'}
            {activeTab === 'teachers' && 'จัดการข้อมูลครู (งานบุคคล)'}
            {activeTab === 'tasks' && 'ระบบติดตามงาน (งานสารบรรณ)'}
            {activeTab === 'custom_print' && 'พิมพ์รายชื่อ (บริหารทั่วไป)'}
            {activeTab === 'lec' && 'รายงาน LEC (บริหารทั่วไป)'}
            {activeTab === 'attendance' && 'บันทึกเวลาเรียน (บริหารทั่วไป)'}
            {activeTab === 'attendance_report' && 'รายงานเวลาเรียน (บริหารทั่วไป)'}
            {activeTab === 'library' && 'ระบบห้องสมุด (วิชาการ)'}
            {activeTab === 'wfh' && 'ลงเวลาปฏิบัติงาน (งานบุคคล)'}
            {activeTab === 'settings' && 'ตั้งค่าระบบ'}
            {activeTab === 'users' && 'จัดการสิทธิ์ผู้ใช้งาน'}
            {activeTab === 'academic' && (isTeacher && !extraPerms.access_academic ? 'ส่งแผนการสอน' : 'งานวิชาการ')}
            {activeTab === 'finance' && 'งานงบประมาณ (การเงิน/พัสดุ)'}
            {activeTab === 'utilities' && 'ระบบเบิกค่าสาธารณูปโภค'}
            {activeTab === 'free_education' && 'ระบบจ่ายเงินเรียนฟรี (๑๕ ปี)'}
            {activeTab === 'ai_cowork' && 'AI Cowork'}
            {activeTab === 'ar_learning' && 'น้องชบาพาพิชิต (AR)'}
            {activeTab === 'ar_admin' && 'จัดการด่านบทเรียน น้องชบาพาพิชิต (AR)'}
            {activeTab === 'service_area' && 'เด็กในเขตพื้นที่บริการ (ทร.14)'}
            {activeTab === 'athletics' && 'งานลงทะเบียนนักกีฬา'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-none">{profile?.display_name || user.email}</p>
              <p className="text-[10px] font-bold text-brand-primary uppercase mt-1">
                {profile?.role === 'admin' && 'Administrator'}
                {profile?.role === 'director' && 'Director (ผอ.)'}
                {profile?.role === 'teacher' && 'Teacher (ครู)'}
                {profile?.role === 'guest' && 'Guest (รออนุมัติ)'}
                {!profile?.role && 'User'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 shadow-inner overflow-hidden">
              <UserCircle size={32} />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'profile' && <ProfilePage />}
            {activeTab === 'reports' && <Reports />}
            {activeTab === 'incoming' && <IncomingDocs />}
            {activeTab === 'outgoing' && <OutgoingDocs />}
            {activeTab === 'orders' && <Orders />}
            {activeTab === 'memos' && <Memos />}
            {activeTab === 'teachers' && <Teachers />}
            {activeTab === 'tasks' && <TaskManagement />}
            {activeTab === 'settings' && <SettingsPage />}
            {activeTab === 'users' && <UsersManagement />}
            {activeTab === 'ai_cowork' && <AICowork />}
            {activeTab === 'ar_learning' && <ARLearning onBack={() => setActiveTab('dashboard')} />}
            {activeTab === 'ar_admin' && <ARAdmin onBack={() => setActiveTab('dashboard')} />}
            {activeTab === 'approvals' && <SchoolApprovals />}

            {activeTab === 'students' && <ComingSoon title="ระบบข้อมูลนักเรียน" />}
            {activeTab === 'attendance' && <ComingSoon title="ระบบบันทึกเวลาเรียน" />}
            {activeTab === 'attendance_report' && <ComingSoon title="รายงานเวลาเรียน" />}
            {activeTab === 'library' && <ComingSoon title="ระบบห้องสมุด (วิชาการ)" />}
            {activeTab === 'wfh' && <ComingSoon title="ระบบลงเวลาปฏิบัติงาน (WFH)" />}
            {activeTab === 'lec' && <ComingSoon title="รายงานเวลาเรียน (LEC)" />}
            {activeTab === 'custom_print' && <ComingSoon title="พิมพ์รายชื่อตามกิจกรรม" />}
            {activeTab === 'academic' && <ComingSoon title="ระบบส่งแผนการสอน (งานวิชาการ)" />}
            {activeTab === 'finance' && <ComingSoon title="ระบบบริหารงบประมาณและการเงิน" />}
            {activeTab === 'free_education' && <ComingSoon title="ระบบจ่ายเงินเรียนฟรี 15 ปี" />}
            {activeTab === 'utilities' && <ComingSoon title="ระบบเบิกจ่ายค่าสาธารณูปโภค" />}
            {activeTab === 'service_area' && <ComingSoon title="ระบบตรวจสอบเขตพื้นที่บริการ (ทร.14)" />}
            {activeTab === 'athletics' && <ComingSoon title="ระบบลงทะเบียนนักกีฬา" />}

            <IdentityFooter schoolName={schoolName} schoolLogo={schoolLogo} localGovName={localGovName} />
          </div>
        </div>

        {}
        {updateStatus && (
          <div className="fixed bottom-6 right-6 z-[9999] animate-in slide-in-from-bottom-10 duration-500">
            <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 p-6 w-[380px] overflow-hidden relative">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl shrink-0 ${
                  updateStatus.type === 'downloaded' ? 'bg-green-50 text-green-600' :
                  updateStatus.type === 'error' ? 'bg-red-50 text-red-600' :
                  'bg-blue-50 text-blue-600'
                }`}>
                  {updateStatus.type === 'available' && <Download size={24} className="animate-bounce" />}
                  {updateStatus.type === 'checking' && <RefreshCw size={24} className="animate-spin" />}
                  {updateStatus.type === 'downloaded' && <CheckCircle2 size={24} />}
                  {updateStatus.type === 'error' && <XCircle size={24} />}
                  {updateStatus.type === 'not-available' && <CheckCircle2 size={24} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-slate-800 text-sm flex items-center gap-2">
                    {updateStatus.type === 'available' ? 'พบเวอร์ชันใหม่!' :
                     updateStatus.type === 'downloaded' ? 'ดาวน์โหลดเสร็จแล้ว' :
                     updateStatus.type === 'error' ? 'เกิดข้อผิดพลาด' :
                     'ระบบอัปเดตอัตโนมัติ'}
                    {updateStatus.version && <span className="bg-slate-100 px-2 py-0.5 rounded-lg text-[10px] text-slate-500">v{updateStatus.version}</span>}
                  </h4>
                  <p className="text-slate-500 text-xs mt-1 font-medium leading-relaxed truncate">{updateStatus.message}</p>

                  {updateStatus.type === 'available' && (
                    <div className="mt-4 space-y-2">
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-primary transition-all duration-300 ease-out"
                          style={{ width: `${downloadProgress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span>กำลังดาวน์โหลด...</span>
                        <span>{downloadProgress}%</span>
                      </div>
                    </div>
                  )}

                  {updateStatus.type === 'downloaded' && (
                    <button
                      onClick={handleRestart}
                      className="mt-4 w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                    >
                      <RefreshCw size={14} /> เริ่มระบบใหม่เพื่อติดตั้ง
                    </button>
                  )}
                </div>
                {updateStatus.type === 'not-available' && (
                  <button onClick={() => setUpdateStatus(null)} className="text-slate-300 hover:text-slate-500 transition-colors">
                    <XCircle size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function SidebarItem({ icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button onClick={onClick} className={`flex items-center justify-between w-full px-4 py-3.5 rounded-2xl transition-all group ${active ? 'bg-brand-primary text-white shadow-lg shadow-green-100 scale-[1.02]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
      <div className="flex items-center gap-3">
        <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}>{icon}</span>
        <span className="text-sm font-bold">{label}</span>
      </div>
      {active && <ChevronRight size={14} />}
    </button>
  );
}

export default App;
````

## File: src/lib/supabase.ts
````typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SchoolProfile {
  id: string;
  name: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  vercelUrl: string;
  gasUrl?: string;
}

let currentClient: SupabaseClient | null = null;

export function getActiveSchoolProfile(): SchoolProfile | null {
  try {
    const profilesJson = localStorage.getItem('school_profiles');
    const activeId = localStorage.getItem('active_school_id');
    if (profilesJson && activeId) {
      const profiles = JSON.parse(profilesJson);
      return profiles.find((p: SchoolProfile) => p.id === activeId) || null;
    }
  } catch (e) {
    console.error('Error reading active profile:', e);
  }
  return null;
}

export function getSchoolProfiles(): SchoolProfile[] {
  try {
    const profilesJson = localStorage.getItem('school_profiles');
    return profilesJson ? JSON.parse(profilesJson) : [];
  } catch (e) {
    console.error('Error reading profiles:', e);
    return [];
  }
}

export function checkAndCreateDefaultProfile() {
  try {
    const profilesJson = localStorage.getItem('school_profiles');
    let profiles = profilesJson ? JSON.parse(profilesJson) : [];


    const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
    const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    const isRealEnv = envUrl &&
                      envUrl !== 'https:
                      envUrl !== 'https://YOUR_SECOND_SCHOOL_SUPABASE_URL.supabase.co' &&
                      envKey &&
                      envKey !== 'your-anon-key' &&
                      envKey !== 'YOUR_SECOND_SCHOOL_SUPABASE_ANON_KEY';

    if (isRealEnv) {
      const defaultProfile: SchoolProfile = {
        id: 'school_default',
        name: import.meta.env.VITE_SCHOOL_NAME || 'โรงเรียนหลัก (เชื่อมต่ออัตโนมัติ)',
        supabaseUrl: envUrl,
        supabaseAnonKey: envKey,
        vercelUrl: import.meta.env.VITE_VERCEL_URL || window.location.origin,
        gasUrl: import.meta.env.VITE_GAS_URL || ''
      };

      const defaultIndex = profiles.findIndex((p: any) => p.id === 'school_default');

      if (defaultIndex >= 0) {

        if (profiles[defaultIndex].supabaseUrl !== envUrl || profiles[defaultIndex].supabaseAnonKey !== envKey) {
          profiles[defaultIndex] = defaultProfile;
          localStorage.setItem('school_profiles', JSON.stringify(profiles));

          localStorage.setItem('active_school_id', 'school_default');
          initSupabase();
        }
      } else {

        profiles.push(defaultProfile);
        localStorage.setItem('school_profiles', JSON.stringify(profiles));
        localStorage.setItem('active_school_id', defaultProfile.id);
        initSupabase();
      }
    }
  } catch (e) {
    console.error('Error checking/creating default profile:', e);
  }
}

export function initSupabase() {
  const profile = getActiveSchoolProfile();
  const url = profile?.supabaseUrl || import.meta.env.VITE_SUPABASE_URL || '';
  const key = profile?.supabaseAnonKey || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  const schoolId = localStorage.getItem('active_school_id') || 'school_default';

  const options = {
    global: {
      headers: {
        'x-school-id': schoolId
      }
    }
  };

  if (url && key) {
    currentClient = createClient(url, key, options);
  } else {
    currentClient = createClient(
      url || 'https://placeholder-url.supabase.co',
      key || 'placeholder-key',
      options
    );
  }
}


checkAndCreateDefaultProfile();


initSupabase();

export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop, receiver) {
    if (!currentClient) {
      initSupabase();
    }
    return Reflect.get(currentClient!, prop, receiver);
  }
});
````

## File: src/pages/AICowork.tsx
````typescript
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import {
  Bot,
  Send,
  Loader2,
  Trash2,
  FolderOpen,
  FileText,
  ChevronRight,
  Database,
  Search,
  Sparkles,
  RefreshCw,
  Plus,
  ArrowRight,
  BrainCircuit,
  UploadCloud,
  CheckCircle2,
  FileSearch,
  Megaphone,
  Gamepad2,
  BookOpen
} from 'lucide-react';
import {
  extractTextFromPdf,
  getAvailableModels,
  processDocumentToKnowledge,
  searchKnowledge,
  callGeminiAPI,
  truncateContext,
  processPrivateDocumentToKnowledge,
  searchPrivateKnowledge
} from '../lib/aiService';
import { getAICoworkResponse } from '../services/aiCoworkService';
import { uploadFileToDrive, deleteFileFromDrive } from '../lib/storage';


const KNOWLEDGE_FOLDERS = [
  { id: '00', name: '00-นโยบาย/แผนงาน' },
  { id: '01', name: '01-หลักสูตร/การสอน' },
  { id: '02', name: '02-วิจัย/นวัตกรรม' },
  { id: '03', name: '03-วัดผล/ประเมินผล' },
  { id: '04', name: '04-แนะแนว/ระบบดูแล' },
  { id: '05', name: '05-กิจกรรมนักเรียน' },
  { id: '06', name: '06-อบรม/สัมมนา' },
  { id: '07', name: '07-ธุรการ/งบประมาณ' },
  { id: '08', name: '08-อื่นๆ' },
];









export default function AICowork() {
  const { user, profile } = useAuth();
  const [activeView, setActiveTab] = useState<'chat' | 'drive' | 'intelligence'>('chat');
  const [loading, setLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [searchQuery, setSearchTerm] = useState('');

  // Intelligence Hub States
  const [knowledgeFiles, setKnowledgeFiles] = useState<any[]>([]);
  const [processingStatus, setProcessingStatus] = useState<{ current: number, total: number, fileName: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Chat States
  const [messages, setMessages] = useState<any[]>([
    { role: 'ai', text: 'สวัสดีค่ะ ชบาคือ "น้องชบา" ผู้ช่วยอัจฉริยะของคุณครู มีอะไรให้หนูช่วยสรุปหรือค้นหาข้อมูลในคลังเอกสารไหมคะ?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [searchSource, setSearchSource] = useState<'all' | 'global' | 'private'>('all');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const QUICK_TOOLS = [
    {
      id: 'worksheet',
      name: 'ออกแบบใบงาน/แบบฝึกหัด',
      icon: <FileText className="text-orange-500" />,
      prompt: 'ช่วยออกแบบใบงาน หรือแบบฝึกหัดที่น่าสนใจสำหรับนักเรียนเรื่อง... (ระบุหัวข้อและระดับชั้น)',
      description: 'สร้างโจทย์ ปริศนา หรือข้อสอบพร้อมเฉลย'
    },
    {
      id: 'memo',
      name: 'ร่างบันทึกข้อความ/โครงการ',
      icon: <Plus className="text-blue-500" />,
      prompt: 'ช่วยร่างบันทึกข้อความ หรือร่างโครงการโรงเรียนเรื่อง... (ระบุวัตถุประสงค์)',
      description: 'ร่างเอกสารภาษาราชการที่สละสลวย'
    },
    {
      id: 'social',
      name: 'ช่วยคิดโพสต์ PR โรงเรียน',
      icon: <Megaphone className="text-pink-500" />,
      prompt: 'ช่วยร่างโพสต์ Facebook สำหรับประชาสัมพันธ์กิจกรรม... (ระบุชื่อกิจกรรมและรายละเอียดที่เกิดขึ้น)',
      description: 'ร่างโพสต์โซเชียล สคริปต์ข่าว หรือคำกล่าว'
    },
    {
      id: 'creative',
      name: 'ออกแบบกิจกรรมเชิงสร้างสรรค์',
      icon: <Gamepad2 className="text-indigo-500" />,
      prompt: 'ช่วยออกแบบกิจกรรมการเรียนรู้แบบสนุกๆ เช่น เกม ฐานการเรียนรู้ หรือบทบาทสมมติ เรื่อง... (ระบุหัวข้อ)',
      description: 'ออกแบบเกม บทละคร หรือกิจกรรม Active Learning'
    },
    {
      id: 'analyze',
      name: 'วิเคราะห์ข้อมูล/เสนอแนะ',
      icon: <Database className="text-purple-500" />,
      prompt: 'ช่วยวิเคราะห์ข้อมูลนักเรียน หรือสถิติต่างๆ ของโรงเรียน และให้ข้อเสนอแนะในการพัฒนา...',
      description: 'วิเคราะห์จุดแข็ง จุดอ่อน จากข้อมูลจริง'
    },
    {
      id: 'lesson',
      name: 'ช่วยออกแบบแผนการสอน',
      icon: <Sparkles className="text-green-500" />,
      prompt: 'ช่วยออกแบบแผนการจัดการเรียนรู้ (Lesson Plan) ที่เน้น Active Learning เรื่อง...',
      description: 'กำหนดตัวชี้วัด กิจกรรม และการวัดผล'
    }
  ];

  useEffect(() => {
    if (activeView === 'drive') fetchFiles();
    if (activeView === 'intelligence') fetchKnowledgeFiles();
  }, [activeView, selectedFolder]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function fetchFiles() {
    setLoading(true);
    try {
      let query = supabase.from('ai_knowledge_base').select('*').eq('teacher_id', user?.id);
      if (selectedFolder) query = query.eq('folder_id', selectedFolder);
      const { data } = await query.order('created_at', { ascending: false });
      setFiles(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchKnowledgeFiles() {
    setLoading(true);
    try {

      const { data: viewData, error: viewError } = await supabase
        .from('unique_knowledge_docs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!viewError && viewData) {
        setKnowledgeFiles(viewData);
        setLoading(false);
        return;
      }


      const { data, error } = await supabase
        .from('school_knowledge')
        .select('document_name, created_at')
        .order('created_at', { ascending: false })
        .limit(2000);

      if (error) throw error;

      const uniqueFiles = data.reduce((acc: any[], current) => {
        const x = acc.find(item => item.document_name === current.document_name);
        if (!x) return acc.concat([current]);
        return acc;
      }, []);

      setKnowledgeFiles(uniqueFiles);
    } catch (err) {
      console.error('Fetch knowledge files failed:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleKnowledgeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (profile?.role !== 'admin' && profile?.role !== 'director') {
      alert('ขออภัยค่ะ เฉพาะผู้ดูแลระบบหรือผู้อำนวยการเท่านั้นที่มีสิทธิ์เพิ่มข้อมูลคลังสมองส่วนกลาง');
      return;
    }
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    if (file.type !== 'application/pdf') {
      alert('กรุณาเลือกไฟล์ PDF เท่านั้นค่ะ');
      return;
    }

    setIsProcessing(true);
    setProcessingStatus({ current: 0, total: 0, fileName: file.name });

    try {

      const schoolId = profile?.school_id || localStorage.getItem('active_school_id');
      let settingsQuery = supabase.from('settings').select('gemini_api_key, ai_cowork_api_key');
      if (schoolId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(schoolId)) {
        settingsQuery = settingsQuery.eq('school_id', schoolId);
      }
      const { data: settings } = await settingsQuery.maybeSingle();
      const apiKey = settings?.ai_cowork_api_key || settings?.gemini_api_key;
      if (!apiKey) throw new Error('กรุณาตั้งค่า Gemini API Key หรือ AI Cowork API Key ก่อนค่ะ');

      const buffer = await file.arrayBuffer();
      await processDocumentToKnowledge(buffer, file.name, apiKey, (current, total) => {
        setProcessingStatus({ current, total, fileName: file.name });
      });

      alert('ชบาย่อยข้อมูลและจดจำลงสมองเรียบร้อยแล้วค่ะ!');
      fetchKnowledgeFiles();
    } catch (err: any) {
      alert('เกิดข้อผิดพลาด: ' + err.message);
    } finally {
      setIsProcessing(false);
      setProcessingStatus(null);
    }
  }

  async function handleDeleteKnowledge(fileName: string) {
    if (profile?.role !== 'admin' && profile?.role !== 'director') {
      alert('ขออภัยค่ะ เฉพาะผู้ดูแลระบบหรือผู้อำนวยการเท่านั้นที่มีสิทธิ์ลบข้อมูลคลังสมองส่วนกลาง');
      return;
    }
    if (!confirm(`ยืนยันการลบความรู้จากไฟล์ "${fileName}" ออกจากสมองของชบาคะ?`)) return;
    try {
      const { error } = await supabase.from('school_knowledge').delete().eq('document_name', fileName);
      if (error) throw error;
      fetchKnowledgeFiles();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length || !selectedFolder) return;
    setIsUploading(true);
    const file = e.target.files[0];
    setUploadProgress('กำลังอัปโหลดเอกสารไปยังคลังส่วนตัว...');
    try {
      const folderName = KNOWLEDGE_FOLDERS.find(f => f.id === selectedFolder)?.name || 'อื่นๆ';

      let buffer: ArrayBuffer | null = null;
      if (file.type === 'application/pdf') {
        buffer = await file.arrayBuffer();
      }

      const customName = `${Date.now()}_${file.name.split('.')[0]}`;
      const publicUrl = await uploadFileToDrive(file, `kb_${user?.id}_${selectedFolder}`, customName);

      setUploadProgress('อัปโหลดไฟล์เสร็จสิ้น กำลังถอดความข้อความ...');
      let extractedText = "";
      if (buffer) {
        extractedText = await extractTextFromPdf(buffer);
      }

      const { data: dbData, error: insertErr } = await supabase
        .from('ai_knowledge_base')
        .insert([{
          teacher_id: user?.id,
          folder_id: selectedFolder,
          folder_name: folderName,
          file_name: file.name,
          file_url: publicUrl,
          file_type: file.type.split('/')[1],
          content_text: extractedText
        }])
        .select('id')
        .single();

      if (insertErr) throw insertErr;

      if (buffer && dbData?.id) {
        setUploadProgress('กำลังสกัดคำและคำนวณเวกเตอร์ความรู้สำหรับสืบค้น (RAG)...');
        const schoolId = profile?.school_id || localStorage.getItem('active_school_id');
        let settingsQuery = supabase.from('settings').select('gemini_api_key, ai_cowork_api_key');
        if (schoolId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(schoolId)) {
          settingsQuery = settingsQuery.eq('school_id', schoolId);
        }
        const { data: settings } = await settingsQuery.maybeSingle();
        const apiKey = settings?.ai_cowork_api_key || settings?.gemini_api_key;
        if (!apiKey) throw new Error('กรุณาตั้งค่า Gemini API Key หรือ AI Cowork API Key ก่อนสร้างความรู้คลังส่วนตัวนะคะ');

        await processPrivateDocumentToKnowledge(
          buffer,
          file.name,
          dbData.id,
          user?.id || '',
          apiKey,
          (current, total) => {
            setUploadProgress(`กำลังย่อยเอกสารส่วนตัว: หน้าที่ ${current} จาก ${total}...`);
          }
        );
      }

      setUploadProgress('ประมวลผลและเพิ่มคลังเอกสารส่วนตัวเสร็จสมบูรณ์!');
      setTimeout(() => setUploadProgress(null), 3000);
      fetchFiles();
    } catch (err: any) {
      alert('Upload and indexing failed: ' + err.message);
      setUploadProgress(null);
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDeleteFile(id: string, url: string) {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบเอกสารนี้คะ?')) return;
    try {
      await deleteFileFromDrive(url);
      await supabase.from('ai_knowledge_base').delete().eq('id', id);
      fetchFiles();
    } catch (err: any) { alert(err.message); }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!inputText.trim() || isThinking) return;

    const userMsg = inputText;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputText('');
    setIsThinking(true);

    try {
      // ดึง settings กรองด้วย school_id เสมอ เพื่อหลีกเลี่ยง RLS บล็อก
      const schoolId = profile?.school_id || localStorage.getItem('active_school_id');
      let settingsQuery = supabase.from('settings').select('gemini_api_key, ai_cowork_api_key, current_academic_year');
      if (schoolId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(schoolId)) {
        settingsQuery = settingsQuery.eq('school_id', schoolId);
      }
      const { data: settings } = await settingsQuery.maybeSingle();
      const apiKey = settings?.ai_cowork_api_key || settings?.gemini_api_key;
      const currentYear = settings?.current_academic_year || '2569';

      if (!apiKey) throw new Error('กรุณาตั้งค่า API Key ก่อนนะคะ');

      // เรียกใช้สมอง RAG ส่วนกลาง
      const response = await getAICoworkResponse({
        userMsg,
        messages: messages.map(m => ({ role: m.role as 'user' | 'ai', text: m.text })),
        apiKey,
        currentYear,
        searchSource,
        userId: user?.id || ''
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.answer }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'ai', text: `ขออภัยค่ะ เกิดข้อผิดพลาด: ${err.message}` }]);
    } finally {
      setIsThinking(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] gap-6">
      {}
      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 w-fit shadow-sm">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-sm transition-all ${activeView === 'chat' ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
        >
          <Bot size={18} /> Chat Hub
        </button>
        <button
          onClick={() => setActiveTab('drive')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-sm transition-all ${activeView === 'drive' ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
        >
          <Database size={18} /> Virtual Drive
        </button>
        {(profile?.role === 'admin' || profile?.role === 'director') && (
          <button
            onClick={() => setActiveTab('intelligence')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-sm transition-all ${activeView === 'intelligence' ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <BrainCircuit size={18} /> Intelligence Hub
          </button>
        )}
      </div>
      {activeView === 'chat' && (
        <div className="flex-1 flex flex-col bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden relative">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white">
                   <Sparkles size={20} />
                </div>
                <div>
                   <h3 className="font-black text-slate-800 text-sm">น้องชบา (Nong Chaba)</h3>
                   <div className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> พร้อมช่วยงานค่ะ
                   </div>
                </div>
             </div>
             <button onClick={() => setMessages([{ role: 'ai', text: 'รีเซ็ตการสนทนาเรียบร้อยค่ะ มีอะไรให้ชบาช่วยไหมคะ?' }])} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <RefreshCw size={18} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.length <= 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {QUICK_TOOLS.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => setInputText(tool.prompt)}
                    className="flex flex-col items-start p-5 bg-slate-50 border border-slate-100 rounded-[32px] hover:bg-white hover:border-brand-primary/30 hover:shadow-xl hover:shadow-green-100/20 transition-all text-left group"
                  >
                    <div className="p-3 bg-white rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-sm">
                      {tool.icon}
                    </div>
                    <h4 className="font-black text-slate-800 text-sm mb-1">{tool.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{tool.description}</p>
                  </button>
                ))}
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-[28px] text-sm leading-relaxed shadow-sm transition-all ${
                  msg.role === 'user'
                    ? 'bg-brand-primary text-white rounded-tr-none'
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                }`}>
                  <div className={`whitespace-pre-wrap prose-sm max-w-none prose-headings:font-black prose-strong:font-black ${
                    msg.role === 'user'
                      ? 'text-white prose-headings:text-white prose-strong:text-white'
                      : 'text-slate-700 prose-headings:text-slate-800 prose-strong:text-brand-primary'
                  }`}>
                     {msg.text.split('\n').map((line: string, index: number) => {

                        if (line.startsWith('# ')) return <h1 key={index} className="text-xl font-black mb-4 mt-2">{line.replace('# ', '')}</h1>;
                        if (line.startsWith('## ')) return <h2 key={index} className="text-lg font-black mb-3 mt-4">{line.replace('## ', '')}</h2>;
                        if (line.startsWith('### ')) return <h3 key={index} className="text-base font-black mb-2 mt-3">{line.replace('### ', '')}</h3>;

                        // ตรวจสอบและแปลงรายการ Bullet points (*, -, •, +)
                        const trimmedLine = line.trim();
                        const isBullet = trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ') || trimmedLine.startsWith('+ ');
                        const isNumbered = /^\d+(\.\d+)*\.\s/.test(trimmedLine);

                        // คำนวณระดับความเยื้อง (Indentation level) จากจำนวนเว้นวรรคข้างหน้าบรรทัด
                        const leadingSpaces = line.match(/^(\s*)/)?.[1].length || 0;
                        const indentLevel = leadingSpaces > 0 ? Math.floor(leadingSpaces / 2) : 0;

                        let cleanLine = line;
                        if (isBullet) {
                          cleanLine = trimmedLine.replace(/^(\*\s|-\s|•\s|\+\s)/, '');
                        } else if (isNumbered) {
                          cleanLine = trimmedLine.replace(/^\d+(\.\d+)*\.\s/, '');
                        }

                        const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
                        const renderedContent = parts.map((part, pIdx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                              <strong key={pIdx} className={`${msg.role === 'user' ? 'text-white' : 'bg-amber-50 text-amber-900 px-1.5 py-0.5 rounded-md border border-amber-200 font-black mx-0.5 shadow-sm'}`}>
                                {part.slice(2, -2)}
                              </strong>
                            );
                          }

                          // Parse citations in non-bold parts: (อ้างอิงจาก...)
                          const citationRegex = /(\(อ้างอิงจาก[^)]+\))/g;
                          const subParts = part.split(citationRegex);
                          return subParts.map((subPart, sIdx) => {
                            if (subPart.startsWith('(อ้างอิงจาก') && subPart.endsWith(')')) {
                              const citationContent = subPart.slice(1, -1); // e.g. "อ้างอิงจากคลังกลาง: ระเบียบการลาปี 2568 หน้า 5"
                              const cleanContent = citationContent.replace(/^อ้างอิงจาก/, '').trim();
                              return (
                                <span key={`${pIdx}-${sIdx}`} className="group relative inline-block mx-1 cursor-help align-middle">
                                  <span className="inline-flex items-center justify-center bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-200 transition-colors shadow-sm gap-0.5">
                                    <BookOpen size={9} />
                                    <span>อ้างอิง</span>
                                  </span>
                                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-950/95 backdrop-blur text-white text-[11px] font-medium rounded-xl py-2 px-3 w-56 whitespace-normal break-words z-50 shadow-2xl border border-white/10 text-center leading-relaxed">
                                    {cleanContent}
                                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-950/95"></span>
                                  </span>
                                </span>
                              );
                            }
                            return subPart;
                          });
                        });

                        // เพิ่มการรองรับตารางแบบง่าย (Simple Table Support)
                        if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
                          const cells = trimmedLine.split('|').filter(c => c.trim() !== '' || trimmedLine.indexOf('|'+c+'|') !== -1);
                          return (
                            <div key={index} className="overflow-x-auto my-2">
                              <table className="min-w-full border-collapse border border-slate-200 text-xs">
                                <tbody>
                                  <tr className={msg.role === 'user' ? 'bg-white/10' : 'bg-slate-50'}>
                                    {cells.map((cell, cIdx) => (
                                      <td key={cIdx} className="border border-slate-200 px-3 py-2 font-bold">{cell.trim()}</td>
                                    ))}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          );
                        }

                        if (isBullet) {
                          let bulletIndicator = <span className={`${msg.role === 'user' ? 'bg-white' : 'bg-brand-primary'} mt-2 min-w-[6px] h-[6px] rounded-full`}></span>;
                          if (indentLevel === 1) {
                            bulletIndicator = <span className={`mt-1.5 min-w-[6px] h-[6px] rounded-full border ${msg.role === 'user' ? 'border-white' : 'border-brand-primary'} bg-transparent`}></span>;
                          } else if (indentLevel >= 2) {
                            bulletIndicator = <span className={`mt-2 min-w-[5px] h-[5px] ${msg.role === 'user' ? 'bg-white/80' : 'bg-brand-primary/80'}`}></span>;
                          }

                          return (
                            <div key={index} className="flex items-start gap-2 mb-2" style={{ paddingLeft: `${(indentLevel + 1) * 16}px` }}>
                              {bulletIndicator}
                              <span className="flex-1">{renderedContent}</span>
                            </div>
                          );
                        }

                        if (isNumbered) {
                          const numMatch = trimmedLine.match(/^(\d+(\.\d+)*)\.\s/);
                          const num = numMatch ? numMatch[1] : '1';
                          return (
                            <div key={index} className="flex items-start gap-2 mb-2" style={{ paddingLeft: `${(indentLevel + 1) * 16}px` }}>
                              <span className={`font-black text-xs min-w-[20px] ${msg.role === 'user' ? 'text-white' : 'text-brand-primary'}`}>{num}.</span>
                              <span className="flex-1">{renderedContent}</span>
                            </div>
                          );
                        }

                        if (line.trim() === '') {
                          return <div key={index} className="h-2"></div>;
                        }

                        return (
                          <p key={index} className="mb-2 last:mb-0">
                            {renderedContent}
                          </p>
                        );
                     })}
                  </div>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white p-5 rounded-[28px] rounded-tl-none border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2">
                     <Loader2 size={20} className="animate-spin text-brand-primary" />
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ชบากำลังวิเคราะห์คลังปัญญา...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-6 bg-slate-50/50 border-t border-slate-100">
             {/* ขอบเขตการค้นหาความรู้ */}
             <div className="flex flex-wrap gap-2 mb-4 justify-center items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">ขอบเขตสืบค้น:</span>
                <button
                   type="button"
                   onClick={() => setSearchSource('all')}
                   className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wide transition-all active:scale-95 ${
                      searchSource === 'all'
                        ? 'bg-brand-primary text-white shadow-sm'
                        : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
                   }`}
                >
                   ทั้งหมด (สถิติ + คลังกลาง + ส่วนตัว)
                </button>
                <button
                   type="button"
                   onClick={() => setSearchSource('global')}
                   className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wide transition-all active:scale-95 ${
                      searchSource === 'global'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
                   }`}
                >
                   คลังปัญญาส่วนกลาง
                </button>
                <button
                   type="button"
                   onClick={() => setSearchSource('private')}
                   className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wide transition-all active:scale-95 ${
                      searchSource === 'private'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
                   }`}
                >
                   เอกสารส่วนตัวของคุณครู
                </button>
             </div>
             <div className="relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="พิมพ์คำถามถึงน้องชบาที่นี่นะคะ (เช่น ช่วยสรุประเบียบพัสดุให้หน่อย)..."
                  className="w-full pl-6 pr-14 py-4 bg-white border border-slate-200 rounded-[24px] font-bold text-slate-700 outline-hidden focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all shadow-sm"
                />
                <button type="submit" className="absolute right-2 top-2 w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
                   <Send size={18} />
                </button>
             </div>
             <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest mt-3">ขับเคลื่อนด้วย Google Gemini AI • ระบบวิเคราะห์จากคลังปัญญาโรงเรียน</p>
          </form>
        </div>
      )}

      {activeView === 'drive' && (
        <div className="flex-1 flex gap-6 overflow-hidden">
          {}
          <div className="w-72 bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col overflow-hidden">
             <div className="p-6 border-b border-slate-50 bg-slate-50/30">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-1">หมวดหมู่เอกสาร</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Knowledge Folders</p>
             </div>
             <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
                {KNOWLEDGE_FOLDERS.map(folder => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${selectedFolder === folder.id ? 'bg-brand-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
                  >
                    <div className="flex items-center gap-3">
                       <FolderOpen size={18} className={selectedFolder === folder.id ? 'text-white' : 'text-slate-400 group-hover:text-brand-primary'} />
                       <span className="text-xs font-bold">{folder.name}</span>
                    </div>
                    {selectedFolder === folder.id && <ChevronRight size={14} />}
                  </button>
                ))}
             </div>
          </div>

          {}
          <div className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col overflow-hidden">
             <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                   <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight">
                      {selectedFolder ? KNOWLEDGE_FOLDERS.find(f => f.id === selectedFolder)?.name : 'กรุณาเลือกโฟลเดอร์'}
                   </h3>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                      {files.length} รายการเอกสาร
                   </p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="relative">
                      <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                      <input type="text" placeholder="ค้นหาชื่อไฟล์..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:bg-white transition-all w-64" value={searchQuery} onChange={e => setSearchTerm(e.target.value)} />
                   </div>
                   {selectedFolder && (
                     <label className="bg-brand-primary text-white px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer hover:bg-green-700 transition-all shadow-md">
                        <input type="file" className="hidden" onChange={handleFileUpload} />
                        {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} อัปโหลดไฟล์
                     </label>
                   )}
                 </div>
              </div>

              {uploadProgress && (
                <div className="mx-8 mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-in fade-in duration-300">
                  <Loader2 size={16} className="animate-spin text-brand-primary" />
                  <span>{uploadProgress}</span>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-64 text-slate-300">
                     <Loader2 className="animate-spin mb-4" size={40} />
                     <p className="font-bold uppercase tracking-widest text-[10px]">ชบากำลังโหลดคลังเอกสาร...</p>
                  </div>
                ) : files.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {files.filter(f => f.file_name.toLowerCase().includes(searchQuery.toLowerCase())).map(file => (
                        <div key={file.id} className="group p-4 bg-slate-50 border border-slate-100 rounded-[24px] hover:bg-white hover:border-brand-primary/20 hover:shadow-xl hover:shadow-green-100/20 transition-all">
                           <div className="flex items-start justify-between mb-4">
                              <div className="p-3 bg-white rounded-2xl text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                 <FileText size={24} />
                              </div>
                              <button onClick={() => handleDeleteFile(file.id, file.file_url)} className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                 <Trash2 size={16} />
                              </button>
                           </div>
                           <h4 className="font-black text-slate-800 text-sm truncate mb-1" title={file.file_name}>{file.file_name}</h4>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mb-4">{file.file_type || 'PDF'} • {new Date(file.created_at).toLocaleDateString('th-TH')}</p>
                           <a href={file.file_url} target="_blank" className="inline-flex items-center gap-1.5 text-[10px] font-black text-brand-primary uppercase hover:underline">
                              เปิดดูเอกสาร <ArrowRight size={10} />
                           </a>
                        </div>
                     ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-300 border-2 border-dashed border-slate-100 rounded-[40px]">
                     <FolderOpen size={64} className="mb-4 opacity-20" />
                     <p className="font-black uppercase tracking-[0.2em] text-sm">ไม่มีเอกสารในหมวดหมู่นี้</p>
                     <p className="text-[10px] font-bold mt-1 text-slate-400">อัปโหลดไฟล์แรกของคุณครูเพื่อเริ่มให้ชบาช่วยวิเคราะห์นะคะ</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      )}

      {activeView === 'intelligence' && (profile?.role === 'admin' || profile?.role === 'director') && (
        <div className="flex-1 flex flex-col bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-slate-50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
                <BrainCircuit size={32} className="text-brand-primary" /> Intelligence Hub
              </h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">คลังปัญญาโรงเรียน (ระบบอ่านและจดจำเนื้อหาอัตโนมัติ) ใช้ความสามารถของ Gemma 4 จัดการ</p>
            </div>
            <div className="flex gap-3">
              <label className={`bg-brand-primary text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-green-100 transition-all active:scale-95 ${isProcessing ? 'opacity-50 pointer-events-none' : 'hover:bg-green-700'}`}>
                <input type="file" className="hidden" accept="application/pdf" onChange={handleKnowledgeUpload} />
                <UploadCloud size={20} /> สอนงานชบา (ป้อน PDF)
              </label>
            </div>
          </div>

          {isProcessing && processingStatus && (
            <div className="p-8 bg-blue-600 text-white animate-in slide-in-from-top duration-500">
               <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                     <Loader2 className="animate-spin" size={24} />
                     <div>
                        <p className="font-black text-lg">ชบากำลังอ่านและจดจำเนื้อหาค่ะ...</p>
                        <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">ไฟล์: {processingStatus.fileName}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-3xl font-black">{Math.round((processingStatus.current / processingStatus.total) * 100)}%</p>
                     <p className="text-[10px] font-black uppercase opacity-60">หน้า {processingStatus.current} จาก {processingStatus.total}</p>
                  </div>
               </div>
               <div className="h-3 bg-white/20 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-white transition-all duration-300" style={{ width: `${(processingStatus.current / processingStatus.total) * 100}%` }}></div>
               </div>
               <p className="text-[10px] font-black uppercase mt-4 tracking-widest text-center opacity-80">* กรุณาอย่าปิดหน้านี้จนกว่าชบาจะทำงานเสร็จนะคะ *</p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {knowledgeFiles.map((file, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 p-6 rounded-[32px] group hover:bg-white hover:border-brand-primary/20 hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-white rounded-2xl text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      <FileSearch size={28} />
                    </div>
                    <button onClick={() => handleDeleteKnowledge(file.document_name)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <h4 className="font-black text-slate-800 text-lg line-clamp-2 mb-2" title={file.document_name}>{file.document_name}</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-500" /> จดจำเข้าระบบแล้วค่ะ
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase">
                    <span>วันที่จดจำ: {new Date(file.created_at).toLocaleDateString('th-TH')}</span>
                  </div>
                </div>
              ))}

              {knowledgeFiles.length === 0 && !loading && (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-300 border-4 border-dashed border-slate-50 rounded-[40px]">
                   <BrainCircuit size={80} className="mb-6 opacity-10" />
                   <p className="text-xl font-black uppercase tracking-[0.2em]">สมองชบายังว่างเปล่าค่ะ</p>
                   <p className="text-sm font-bold mt-2 text-slate-400 max-w-sm text-center">เริ่มสอนงานชบาโดยการอัปโหลดระเบียบหรือคู่มือการทำงานของโรงเรียนนะคะ เพื่อให้ชบาช่วยตอบคำถามและร่างเอกสารได้แม่นยำขึ้น</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
````

## File: src/pages/IncomingDocs.tsx
````typescript
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { uploadFileToDrive, deleteFileFromDrive, uploadToSupabase, deleteFromSupabase } from '../lib/storage';
import { useAuth } from '../contexts/AuthContext';
import { sendLineNotification, sendInteractiveFlexMessage, sendBulkFlexCarousel } from '../lib/lineNotify';
import { applyDigitalStamps } from '../lib/pdfService';
import { summarizeDocument } from '../lib/aiService';
import Modal from '../components/Modal';
import {
  FilePlus,
  Search,
  FileText,
  Loader2,
  Upload,
  Save,
  Paperclip,
  X,
  Trash2,
  UserCheck,
  Send,
  Sparkles,
  Shield
} from 'lucide-react';

export default function IncomingDocs() {
  const { user, profile } = useAuth();
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const currentYearBE = new Date().getFullYear() + 543;
  const [selectedYear, setSelectedYear] = useState<number | null>(currentYearBE);
  const [latestNumber, setLatestNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const openNewDocModal = async () => {
    setIsModalOpen(true);
    const currentYear = new Date().getFullYear() + 543;
    try {
      const { data: seqData } = await supabase
        .from('incoming_docs')
        .select('doc_sequence')
        .eq('doc_year', currentYear)
        .order('doc_sequence', { ascending: false })
        .limit(1);

      const nextSeq = (seqData && seqData.length > 0) ? (Number(seqData[0].doc_sequence) + 1) : 1;
      setFormData(prev => ({
        ...prev,
        doc_number: nextSeq.toString(),
        doc_date: new Date().toISOString().split('T')[0],
        stamp_page: 1
      }));
    } catch (e) {
      console.error('Failed to auto-generate doc sequence:', e);
    }
  };


  const [assignForm, setAssignForm] = useState({
    teacher_id: '',
    instruction: '',
    stamp_page: 1
  });

  const [formData, setFormData] = useState({
    doc_number: '',
    from_agency: '',
    subject: '',
    doc_date: new Date().toISOString().split('T')[0],
    sender_doc_number: '',
    sender_doc_date: '',
    urgency: 'ปกติ',
    remark: '',
    stamp_page: 1
  });

  const [proposalData, setProposalData] = useState({
    summary: '',
    proposal: 'เพื่อโปรดพิจารณา'
  });

  const [mainFile, setMainFile] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isHolding, setIsHolding] = useState(false);
  const [selectedHoldingIds, setSelectedHoldingIds] = useState<string[]>([]);

  useEffect(() => {
    fetchDocs();

    fetchTeachers();
  }, []);

  async function fetchDocs(yearToFetch = selectedYear) {
    setLoading(true);
    try {
      let query = supabase.from('incoming_docs').select('*');

      if (yearToFetch) {
        query = query.eq('doc_year', yearToFetch);
      }

      const { data } = await query.order('created_at', { ascending: false });
      setDocs(data || []);


      if (yearToFetch) {
        const { data: latestSeqDoc } = await supabase
          .from('incoming_docs')
          .select('doc_number')
          .eq('doc_year', yearToFetch)
          .order('doc_sequence', { ascending: false })
          .limit(1);
        if (latestSeqDoc && latestSeqDoc.length > 0) {
          setLatestNumber(latestSeqDoc[0].doc_number);
        } else {
          setLatestNumber('');
        }
      } else if (data && data.length > 0) {
        setLatestNumber(data[0].doc_number);
      } else {
        setLatestNumber('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTeachers() {
    const { data } = await supabase.from('teachers').select('*').order('first_name');
    setTeachers(data || []);
  }

  async function handleAssign(e: React.FormEvent) {
    e.preventDefault();
    if (!assignForm.teacher_id || !selectedDoc) return;
    setIsSaving(true);

    try {
      console.log('--- START FINAL RETIREMENT PROCESS ---');


      if (assignForm.instruction && selectedDoc.file_url) {
        try {
          console.log('Fetching PDF for final stamping:', selectedDoc.file_url);

          const response = await fetch(selectedDoc.file_url);
          if (!response.ok) throw new Error(`ไม่สามารถดาวน์โหลดไฟล์ได้ (Status: ${response.status})`);

          const pdfBuffer = await response.arrayBuffer();
          const schoolId = localStorage.getItem('active_school_id');
          let settingsQuery = supabase.from('settings').select('school_name, director_name, director_signature_url');
          if (schoolId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(schoolId)) {
            settingsQuery = settingsQuery.eq('school_id', schoolId);
          }
          const { data: setts } = await settingsQuery.maybeSingle();

          const schoolLabel = setts?.school_name
            ? (setts.school_name.startsWith('โรงเรียน') ? setts.school_name : `โรงเรียน${setts.school_name}`)
            : '';
          const directorPosition = schoolLabel ? `ผู้อำนวยการ${schoolLabel}` : 'ผู้อำนวยการโรงเรียน';

          console.log('Applying Director Stamp...');
          const stampedBytes = await applyDigitalStamps(
            pdfBuffer,
            undefined, // Do NOT re-stamp receipt info
            undefined, // Do NOT re-stamp proposal info
            {
              order: assignForm.instruction,
              signer: setts?.director_name || 'ผู้อำนวยการโรงเรียน',
              position: directorPosition,
              date: new Date().toISOString().split('T')[0],
              signatureUrl: setts?.director_signature_url,
              pageNumber: assignForm.stamp_page
            }
          );

          const sanitizedSubject = selectedDoc.subject.replace(/[\/\\?%*:|"<>]/g, '-').slice(0, 50);
          const finalFileName = `${selectedDoc.doc_number}_เรื่อง_${sanitizedSubject}.pdf`;
          const finalFile = new File([stampedBytes as any], finalFileName, { type: 'application/pdf' });

          console.log('Uploading FINAL document to Google Drive...');
          const gDriveUrl = await uploadFileToDrive(finalFile, 'incoming', finalFileName.replace('.pdf', ''));

          console.log('Updating database with final Google Drive link and status...');
          await supabase.from('incoming_docs').update({
            file_url: gDriveUrl,
            status: 'assigned'
          }).eq('id', selectedDoc.id);

          // If it was on Supabase, try to clean up
          if (selectedDoc.file_url.includes('supabase.co')) {
            try {
              const tempPath = selectedDoc.file_url.split('/').pop()?.split('?')[0];
              if (tempPath) await deleteFromSupabase('temp_docs', tempPath);
            } catch (de) { console.warn('Supabase cleanup failed:', de); }
          }

          selectedDoc.file_url = gDriveUrl;
          console.log('FINAL ARCHIVING SUCCESS');
        } catch (pdfErr: any) {
          console.error('FINAL STAMP FAILED:', pdfErr);
          await supabase.from('incoming_docs').update({ status: 'assigned' }).eq('id', selectedDoc.id);
          alert('แจ้งเตือน: ไม่สามารถประทับตรา ผอ. ได้ (สาเหตุ: ' + pdfErr.message + ') ระบบจะบันทึกเฉพาะข้อมูลการมอบหมาย');
        }
      } else {
        await supabase.from('incoming_docs').update({ status: 'assigned' }).eq('id', selectedDoc.id);
      }

      // 2. Insert Assignment
      const { data: insertedAssigns, error } = await supabase.from('doc_assignments').insert([{
        doc_id: selectedDoc.id,
        assignee_id: assignForm.teacher_id,
        instruction: assignForm.instruction,
        status: 'pending'
      }]).select();

      if (error) throw error;
      const insertedAssign = insertedAssigns?.[0];

      // Notify Teacher via LINE (with Fallback to Group)
      const teacher = teachers.find(t => t.id === assignForm.teacher_id);
      const teacherName = teacher ? `${teacher.prefix || ''}${teacher.first_name} ${teacher.last_name}` : 'ครูผู้รับผิดชอบ';

      const lineActions = [
        { label: '📄 ดูเอกสารสั่งการ', type: 'uri' as const, uri: selectedDoc.file_url },
        { label: '✅ รับทราบงาน', type: 'postback' as const, data: `action=acknowledge&id=${insertedAssign?.id || ''}`, color: '#007AFF' }
      ];

      if (Array.isArray(selectedDoc.attachment_urls)) {
        selectedDoc.attachment_urls.forEach((url: string, i: number) => {
          if (lineActions.length < 10) {
            lineActions.push({ label: `📎 แนบ ${i + 1}`, type: 'uri' as const, uri: url });
          }
        });
      }

      let lineNotifyStatus = '';
      try {
        if (teacher?.line_user_id) {
          // ส่งตรงถึงครูผู้รับมอบหมาย
          const personalMsg = `เรื่อง: ${selectedDoc.subject}\nเลขที่: ${selectedDoc.doc_number}\nคำสั่งการ: ${assignForm.instruction || 'โปรดดำเนินการตามหนังสือฉบับนี้'}`;
          console.log(`[LINE NOTIFY] Sending to teacher: ${teacherName} (ID: ${teacher.line_user_id})`);
          const result = await sendInteractiveFlexMessage(teacher.line_user_id, '📌 มีงานมอบหมายถึงคุณครู', personalMsg, lineActions);
          if (result) {
            lineNotifyStatus = `✅ แจ้งเตือน LINE ถึง${teacherName}แล้ว`;
          } else {
            // ถ้าส่งตรงไม่สำเร็จ → Fallback ไปกลุ่ม
            console.warn('[LINE NOTIFY] Personal push failed, falling back to group...');
            const groupMsg = `ถึง: ${teacherName}\nเรื่อง: ${selectedDoc.subject}\nเลขที่: ${selectedDoc.doc_number}\nคำสั่งการ: ${assignForm.instruction || 'โปรดดำเนินการตามหนังสือฉบับนี้'}`;
            await sendInteractiveFlexMessage(undefined, '📢 มอบหมายงานใหม่', groupMsg, lineActions);
            lineNotifyStatus = `⚠️ ส่ง LINE ตรงไม่สำเร็จ → แจ้งผ่านกลุ่มแทนแล้ว`;
          }
        } else {
          // ครูไม่มี line_user_id → Fallback ส่งไปกลุ่มเลย
          console.warn(`[LINE NOTIFY] Teacher ${teacherName} has no line_user_id. Sending to group instead.`);
          const groupMsg = `ถึง: ${teacherName}\nเรื่อง: ${selectedDoc.subject}\nเลขที่: ${selectedDoc.doc_number}\nคำสั่งการ: ${assignForm.instruction || 'โปรดดำเนินการตามหนังสือฉบับนี้'}`;
          const result = await sendInteractiveFlexMessage(undefined, '📢 มอบหมายงานใหม่', groupMsg, lineActions);
          if (result) {
            lineNotifyStatus = `📣 ${teacherName}ยังไม่ผูก LINE → แจ้งผ่านกลุ่มแทนแล้ว`;
          } else {
            lineNotifyStatus = `❌ ไม่สามารถส่งแจ้งเตือน LINE ได้ (ไม่มี Group ID)`;
          }
        }
      } catch (lineErr: any) {
        console.error('[LINE NOTIFY ERROR]', lineErr);
        lineNotifyStatus = `❌ เกิดข้อผิดพลาดในการส่ง LINE: ${lineErr.message}`;
      }

      alert(`เกษียณหนังสือและมอบหมายงานเรียบร้อยแล้ว\n\n${lineNotifyStatus}`);
      setIsAssignModalOpen(false);
      resetForm();
      fetchDocs();
    } catch (err: any) {
      alert('ดำเนินการไม่สำเร็จ: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?')) return;
    try {
      const { data: doc } = await supabase.from('incoming_docs').select('file_url, attachment_urls').eq('id', id).single();
      if (doc) {
        if (doc.file_url.includes('drive.google.com')) await deleteFileFromDrive(doc.file_url);
        else if (doc.file_url.includes('supabase.co')) {
           const path = doc.file_url.split('/').pop()?.split('?')[0];
           if (path) await deleteFromSupabase('temp_docs', path);
        }
        if (Array.isArray(doc.attachment_urls)) {
          for (const url of doc.attachment_urls) await deleteFileFromDrive(url);
        }
      }
      const { error } = await supabase.from('incoming_docs').delete().eq('id', id);
      if (error) throw error;
      fetchDocs();
    } catch (err: any) {
      alert('ลบไม่สำเร็จ: ' + err.message);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const sanitized = formData.subject.replace(/[\/\\?%*:|"<>]/g, '-').slice(0, 50);
      const prefix = `${formData.doc_number}_เรื่อง_${sanitized}`;
      let file_url = '';

      if (mainFile) {
        let fileToStaging = mainFile;

        if (mainFile.type === 'application/pdf') {
          try {
            const buf = await mainFile.arrayBuffer();
            const timeStr = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
            const stamped = await applyDigitalStamps(
              buf,
              {
                docNumber: formData.doc_number,
                date: formData.doc_date,
                time: timeStr,
                pageNumber: formData.stamp_page
              },
              {
                summary: proposalData.summary || 'โปรดดูรายละเอียดตามหนังสือ',
                proposal: proposalData.proposal,
                signer: profile?.display_name || 'เจ้าหน้าที่ธุรการ',
                date: formData.doc_date,
                signatureUrl: profile?.signature_url
              }
            );
            fileToStaging = new File([stamped as any], mainFile.name, { type: 'application/pdf' });
          } catch (se) { console.error('Initial stamping failed:', se); }
        }

        console.log('Uploading to Supabase Staging...');

        const fileExt = mainFile.name.split('.').pop() || 'pdf';
        const tempPath = `temp_${Date.now()}.${fileExt}`;
        file_url = await uploadToSupabase(fileToStaging, 'temp_docs', tempPath);
      }

      const att_urls = [];
      for (let i = 0; i < attachments.length; i++) {
        const url = await uploadFileToDrive(attachments[i], 'incoming', `แนบ_${prefix}_${i + 1}`);
        att_urls.push(url);
      }

      const docDateObj = new Date(formData.doc_date);
      const docYear = docDateObj.getFullYear() + 543;


      const { data: seqData } = await supabase
        .from('incoming_docs')
        .select('doc_sequence')
        .eq('doc_year', docYear)
        .order('doc_sequence', { ascending: false })
        .limit(1);

      const docSeq = (seqData && seqData.length > 0) ? (Number(seqData[0].doc_sequence) + 1) : 1;
      const finalDocNum = formData.doc_number.trim() || docSeq.toString();

      const extraData = {
        sender_doc_number: formData.sender_doc_number,
        sender_doc_date: formData.sender_doc_date,
        proposal_summary: proposalData.summary,
        proposal_text: proposalData.proposal,
        stamp_page: formData.stamp_page
      };

      const { data: insertedDocs, error } = await supabase.from('incoming_docs').insert([{
        doc_number: finalDocNum,
        from_agency: formData.from_agency,
        subject: formData.subject,
        doc_date: formData.doc_date,
        urgency: formData.urgency,
        remark: JSON.stringify(extraData),
        file_url,
        attachment_urls: att_urls,
        status: isHolding ? 'waiting_proposal' : 'pending',
        created_by: user?.id,
        doc_year: docYear,
        doc_sequence: docSeq
      }]).select();

      if (error) throw error;
      const insertedDoc = insertedDocs?.[0];

      let lineNotifyStatus = '';
      if (!isHolding) {
        const regMsg = `เรื่อง: ${formData.subject}\nจาก: ${formData.from_agency}\nเลขที่รับ: ${finalDocNum}`;
        const regActions: any[] = [
          { label: '📄 ดูต้นฉบับหนังสือ', type: 'uri' as const, uri: file_url }
        ];

        if (Array.isArray(att_urls) && att_urls.length > 0) {
          att_urls.forEach((url, i) => {
            regActions.push({
              label: `📎 ไฟล์แนบที่ ${i + 1}`,
              type: 'uri' as const,
              uri: url,
              color: '#3F51B5'
            });
          });
        }

        regActions.push({
          label: '✍️ เกษียณสั่งการ',
          type: 'postback' as const,
          data: `action=start_assign&id=${insertedDoc?.id || ''}`,
          color: '#1DB446'
        });

        try {
          await sendInteractiveFlexMessage(
            undefined,
            '📥 เสนอหนังสือรอเกษียณ',
            regMsg,
            regActions
          );
          lineNotifyStatus = ' และเสนอผู้บริหารผ่าน LINE เรียบร้อยแล้ว';
        } catch (lineErr) {
          console.error('[LINE NOTIFY ERROR]', lineErr);
          lineNotifyStatus = ' แต่ไม่สามารถส่งแจ้งเตือน LINE ได้ (กรุณาเสนอหนังสือแบบกลุ่มแทน)';
        }
      } else {
        lineNotifyStatus = ' (พักรอเสนอผู้บริหารเรียบร้อย)';
      }

      setIsModalOpen(false);
      resetForm();
      fetchDocs();
      alert(`ลงรับหนังสือเรียบร้อยแล้ว${lineNotifyStatus}`);

    } catch (err: any) {
      alert(`บันทึกไม่สำเร็จ: ${err.message}`);
    } finally { setIsSaving(false); }
  }

  async function handleBulkPropose() {
    if (selectedHoldingIds.length === 0) return;
    if (selectedHoldingIds.length > 10) {
      alert('การส่ง Flex Carousel จำกัดสูงสุด 10 ฉบับต่อครั้ง เพื่อไม่ให้เกินข้อจำกัดของระบบ LINE');
      return;
    }

    if (!confirm(`คุณต้องการเสนอหนังสือที่เลือกจำนวน ${selectedHoldingIds.length} ฉบับไปยังผู้บริหารพร้อมกันใช่หรือไม่?`)) return;

    setIsSaving(true);
    try {
      const docsToPropose = docs.filter(d => selectedHoldingIds.includes(d.id));

      const carouselItems = docsToPropose.map(d => ({
        id: d.id,
        subject: d.subject || '',
        from_agency: d.from_agency || '',
        doc_number: d.doc_number || '',
        file_url: d.file_url || '',
        attachment_urls: Array.isArray(d.attachment_urls) ? d.attachment_urls : []
      }));

      await sendBulkFlexCarousel(
        undefined, // ส่งเข้าไลน์กลุ่มที่กำหนดใน Settings
        `📥 เสนอหนังสือรอเกษียณใหม่ (${selectedHoldingIds.length} ฉบับ)`,
        carouselItems
      );

      const { error } = await supabase
        .from('incoming_docs')
        .update({ status: 'pending' })
        .in('id', selectedHoldingIds);

      if (error) throw error;

      alert(`เสนอหนังสือจำนวน ${selectedHoldingIds.length} ฉบับไปยัง LINE ผอ. เรียบร้อยแล้ว`);
      setSelectedHoldingIds([]);
      fetchDocs();
    } catch (err: any) {
      alert('เสนอไม่สำเร็จ: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  function resetForm() {

    setFormData({
      doc_number: '',
      from_agency: '',
      subject: '',
      doc_date: new Date().toISOString().split('T')[0],
      sender_doc_number: '',
      sender_doc_date: '',
      urgency: 'ปกติ',
      remark: '',
      stamp_page: 1
    });
    setProposalData({ summary: '', proposal: 'เพื่อโปรดพิจารณา' });
    setMainFile(null);
    setAttachments([]);
    setAssignForm({ teacher_id: '', instruction: '', stamp_page: 1 });
    setIsHolding(false);
  }


  const handleAddAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (attachments.length + files.length > 4) { alert('จำกัดไฟล์แนบสูงสุด 4 ไฟล์'); return; }
    setAttachments([...attachments, ...files]);
  };

  const isDirector = profile?.role === 'director' || profile?.role === 'admin';
  const isAdmin = profile?.role === 'admin';
  const extraPerms = profile?.extra_permissions || {};
  const hasAccess = isDirector || extraPerms.access_administrative;

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm">
        <Shield size={64} className="text-red-200 mb-4" />
        <h3 className="text-xl font-black text-slate-800">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</h3>
        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">กรุณาติดต่อผู้ดูแลระบบเพื่อขอสิทธิ์เข้าใช้งานโมดูลนี้</p>
      </div>
    );
  }

  async function handleAISummary() {
    if (!mainFile) { alert('กรุณาเลือกไฟล์หนังสือนำก่อน'); return; }
    setIsSaving(true);
    try {
      const schoolId = localStorage.getItem('active_school_id');
      let settingsQuery = supabase.from('settings').select('gemini_api_key');
      if (schoolId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(schoolId)) {
        settingsQuery = settingsQuery.eq('school_id', schoolId);
      }
      const { data: sets } = await settingsQuery.maybeSingle();
      const apiKey = sets?.gemini_api_key;
      if (!apiKey) throw new Error('ยังไม่ได้ระบุ Gemini API Key');
      const buffer = await mainFile.arrayBuffer();
      const info = await summarizeDocument(buffer, apiKey);
      setProposalData(prev => ({ ...prev, summary: info.summary }));
      setFormData(prev => ({
        ...prev,
        sender_doc_number: info.doc_number || prev.sender_doc_number,
        sender_doc_date: info.doc_date || prev.sender_doc_date,
        from_agency: info.from_agency || prev.from_agency,
        subject: info.subject || prev.subject
      }));
    } catch (err: any) { alert('AI ทำงานไม่สำเร็จ: ' + err.message); }
    finally { setIsSaving(false); }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-2xl flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input type="text" placeholder="ค้นหาหนังสือรับ..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-hidden shadow-xs" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <select
            value={selectedYear || ''}
            onChange={(e) => {
              const val = e.target.value ? parseInt(e.target.value) : null;
              setSelectedYear(val);
              fetchDocs(val);
            }}
            className="p-3 bg-white border border-slate-200 rounded-2xl outline-hidden shadow-xs font-bold text-slate-700 text-sm h-[48px]"
          >
            <option value="">ดูทั้งหมด</option>
            <option value={currentYearBE}>{currentYearBE}</option>
            <option value={currentYearBE - 1}>{currentYearBE - 1}</option>
            <option value={currentYearBE - 2}>{currentYearBE - 2}</option>
          </select>

          {latestNumber && (
            <div className="shrink-0 px-3 py-1.5 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex items-center gap-1.5 whitespace-nowrap shadow-xs h-[48px] flex items-center">
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-tighter mr-1">ล่าสุด:</span>
              <span className="text-xs font-black text-brand-primary tracking-tight">{latestNumber}</span>
            </div>
          )}
        </div>
        {(isDirector || !!extraPerms.access_administrative) && (
          <button onClick={openNewDocModal} className="bg-brand-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all">
            <FilePlus size={20} /> ลงรับหนังสือใหม่
          </button>
        )}
      </div>

      {selectedHoldingIds.length > 0 && (
        <div className="mb-4 p-4 bg-purple-50 border border-purple-100 rounded-[24px] flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-ping"></span>
            <p className="text-sm font-black text-purple-950">เลือกหนังสือรอเสนอ {selectedHoldingIds.length} ฉบับ (จำกัดไม่เกิน 10 ฉบับ)</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedHoldingIds([])}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleBulkPropose}
              disabled={isSaving || selectedHoldingIds.length > 10}
              className="bg-purple-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-100 hover:bg-purple-700 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
            >
              <Send size={12} /> เสนอ ผอ. พร้อมกัน (Flex Carousel)
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              {hasAccess && <th className="w-12 px-4 py-4 text-center"></th>}
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">เลขที่รับ / วันที่</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">เรื่อง</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">เอกสาร</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan={hasAccess ? 5 : 4} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-brand-primary" /></td></tr>
            ) : docs.length === 0 ? (
              <tr><td colSpan={hasAccess ? 5 : 4} className="py-20 text-center text-slate-400 italic">ไม่พบข้อมูลหนังสือรับ</td></tr>
            ) : (
              docs.filter(d => d.subject?.includes(searchTerm)).map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                  {hasAccess && (
                    <td className="px-4 py-4 text-center">
                      {doc.status === 'waiting_proposal' && (
                        <input
                          type="checkbox"
                          checked={selectedHoldingIds.includes(doc.id)}
                          onChange={e => {
                            if (e.target.checked) {
                              setSelectedHoldingIds([...selectedHoldingIds, doc.id]);
                            } else {
                              setSelectedHoldingIds(selectedHoldingIds.filter(id => id !== doc.id));
                            }
                          }}
                          className="w-4 h-4 text-brand-primary border-slate-300 rounded focus:ring-brand-primary/20 cursor-pointer"
                        />
                      )}
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 text-sm">{doc.doc_number}</div>
                    <div className="text-[10px] text-slate-400">{doc.doc_date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">{doc.subject}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{doc.from_agency}</p>
                      {doc.status === 'pending' && (
                        <span className="flex items-center gap-1 text-[9px] font-medium text-red-500 bg-red-50/50 px-1.5 py-0.5 rounded-sm">
                          <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                          รอ ผอ. เกษียณ
                        </span>
                      )}
                      {doc.status === 'waiting_proposal' && (
                        <span className="flex items-center gap-1 text-[9px] font-medium text-purple-500 bg-purple-50/50 px-1.5 py-0.5 rounded-sm">
                          <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                          รอเสนอผู้บริหาร
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-1.5">
                      {doc.file_url && (
                        <a href={doc.file_url} target="_blank" className="w-8 h-8 rounded-lg bg-green-50 text-brand-primary flex items-center justify-center hover:bg-green-100 transition-colors">
                          <FileText size={16} />
                        </a>
                      )}
                      {Array.isArray(doc.attachment_urls) && doc.attachment_urls.map((url: string, idx: number) => (
                        <a key={idx} href={url} target="_blank" className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors">
                          <Paperclip size={14} />
                        </a>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {doc.status === 'pending' && isDirector && (
                        <button onClick={() => {
                          setSelectedDoc(doc);
                          let prevStampPage = 1;
                          if (doc.remark) {
                            try {
                              const extra = typeof doc.remark === 'object' ? doc.remark : JSON.parse(doc.remark);
                              if (extra && extra.stamp_page) {
                                prevStampPage = parseInt(extra.stamp_page) || 1;
                              }
                            } catch (e) { console.warn('Failed to parse remark for stamp_page', e); }
                          }
                          setAssignForm({ teacher_id: '', instruction: '', stamp_page: prevStampPage });
                          setIsAssignModalOpen(true);
                        }} className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors flex items-center gap-1.5 font-bold text-xs" title="เกษียณสั่งการ/มอบหมาย">
                          <UserCheck size={14} /> มอบหมายงาน
                        </button>
                      )}
                      {isAdmin && (
                        <button onClick={() => handleDelete(doc.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="ลบข้อมูล">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="ลงรับหนังสือใหม่">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5 col-span-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">เลขที่รับ</label>
              <input type="text" className="w-full p-3 bg-slate-50 border rounded-xl font-bold" required value={formData.doc_number} onChange={e => setFormData({...formData, doc_number: e.target.value})} />
            </div>
            <div className="space-y-1.5 col-span-1">
              <label className="text-[10px] font-black text-brand-primary uppercase ml-1">เกษียณเสนอที่หน้า</label>
              <input type="number" min="1" className="w-full p-3 bg-white border-2 border-brand-primary/20 rounded-xl font-black text-brand-primary text-center" required value={formData.stamp_page} onChange={e => setFormData({...formData, stamp_page: parseInt(e.target.value) || 1})} />
              <p className="text-[8px] text-slate-400 font-bold text-center mt-0.5">*เลขรับอยู่หน้า ๑ เสมอ</p>
            </div>
            <div className="space-y-1.5 col-span-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">วันที่ลงรับ</label>
              <input type="date" className="w-full p-3 bg-slate-50 border rounded-xl font-bold" required value={formData.doc_date} onChange={e => setFormData({...formData, doc_date: e.target.value})} />
            </div>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 space-y-4">
            <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">ข้อมูลในหนังสือ (จากต้นฉบับ)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">เลขที่หนังสือ</label>
                <input type="text" className="w-full p-3 bg-white border rounded-xl font-medium" placeholder="เช่น ศธ 04225/..." value={formData.sender_doc_number} onChange={e => setFormData({...formData, sender_doc_number: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">วันที่ในหนังสือ</label>
                <input type="date" className="w-full p-3 bg-white border rounded-xl font-medium" value={formData.sender_doc_date} onChange={e => setFormData({...formData, sender_doc_date: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">จากหน่วยงาน</label>
              <input type="text" className="w-full p-3 bg-white border rounded-xl font-medium" required value={formData.from_agency} onChange={e => setFormData({...formData, from_agency: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">เรื่อง</label>
              <textarea className="w-full p-3 bg-white border rounded-xl font-medium" rows={2} required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
            </div>
          </div>

          <div className="p-4 bg-brand-primary/5 rounded-2xl border border-brand-primary/10 space-y-4">
             <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-widest">สรุปสาระสำคัญ</h4>
                <button type="button" onClick={handleAISummary} className="flex items-center gap-1.5 text-[10px] font-bold text-brand-primary bg-white px-2 py-1 rounded-lg border border-brand-primary/20 hover:bg-brand-primary hover:text-white transition-all shadow-xs">
                  <Sparkles size={12} /> สแกนข้อมูลและสรุปด้วย AI
                </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">สรุปสาระสำคัญ (เกษียณเสนอ)</label>
                  <textarea className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-medium" rows={2} placeholder="สรุปโดยเจ้าหน้าที่..." value={proposalData.summary} onChange={e => setProposalData({...proposalData, summary: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">ข้อความเสนอ</label>
                  <input type="text" className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold" value={proposalData.proposal} onChange={e => setProposalData({...proposalData, proposal: e.target.value})} />
                </div>
             </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><Upload size={14} /> อัปโหลดเอกสาร (พักไฟล์ชั่วคราว)</p>
             <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">1. หนังสือนำ / หนังสือสั่งการ</label>
                <label className={`block w-full p-4 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${mainFile ? 'border-brand-primary bg-green-50' : 'border-slate-200 hover:border-brand-primary hover:bg-slate-50'}`}>
                   <input type="file" className="hidden" onChange={e => setMainFile(e.target.files?.[0] || null)} />
                   {mainFile ? <div className="flex items-center justify-center gap-2 text-brand-primary font-bold text-sm"><FileText size={18} /> {mainFile.name}</div> : <span className="text-slate-400 text-xs font-bold uppercase">เลือกไฟล์หนังสือนำ (PDF เท่านั้น)</span>}
                </label>
             </div>
             <div className="space-y-3">
                <div className="flex justify-between items-center"><label className="text-xs font-bold text-slate-600">2. เอกสารแนบ (ส่งเข้า Drive ทันที)</label><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{attachments.length}/4 ไฟล์</span></div>
                <div className="grid grid-cols-2 gap-3">
                   {attachments.map((file, idx) => (
                     <div key={idx} className="relative group p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2 overflow-hidden"><Paperclip size={14} className="text-blue-500 shrink-0" /><span className="text-[10px] font-bold text-blue-700 truncate">{file.name}</span><button type="button" onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))} className="absolute right-1 top-1 p-1 bg-white rounded-md shadow-sm text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X size={10} /></button></div>
                   ))}
                   {attachments.length < 4 && (
                     <label className="border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center py-3 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group"><input type="file" className="hidden" multiple onChange={handleAddAttachment} /><Paperclip size={16} className="text-slate-300 group-hover:text-blue-400" /></label>
                   )}
                </div>
             </div>
          </div>
          <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
            <input
              type="checkbox"
              id="isHolding"
              checked={isHolding}
              onChange={e => setIsHolding(e.target.checked)}
              className="w-5 h-5 text-brand-primary border-slate-300 rounded focus:ring-brand-primary/20 cursor-pointer"
            />
            <label htmlFor="isHolding" className="text-xs font-black text-slate-700 cursor-pointer select-none">
              📥 พักหนังสือรอเสนอภายหลัง (ไม่ส่งแจ้งเตือน LINE ผอ. ทันที)
            </label>
          </div>

          <button type="submit" disabled={isSaving || !mainFile} className="w-full bg-brand-primary text-white py-4.5 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-green-100 hover:bg-green-700 transition-all disabled:opacity-50">
            {isSaving ? <Loader2 className="animate-spin" /> : <Save />} {isHolding ? 'บันทึกและพักรอเสนอ' : 'บันทึกและเสนอ ผอ. ทันที'}
          </button>
        </form>

      </Modal>

      <Modal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} title="เกษียณหนังสือและมอบหมายงาน">
        <form onSubmit={handleAssign} className="space-y-6">
          <div className="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-2xl border border-blue-100">
             <div>
               <h4 className="text-sm font-black text-blue-800 mb-1">{selectedDoc?.subject}</h4>
               <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">เลขที่รับ: {selectedDoc?.doc_number}</p>
             </div>
             <div className="space-y-1">
               <label className="text-[10px] font-black text-brand-primary uppercase ml-1">ประทับตรา ผอ. ที่หน้า</label>
               <input type="number" min="1" className="w-full p-2 bg-white border-2 border-brand-primary/20 rounded-xl font-black text-brand-primary text-center" required value={assignForm.stamp_page} onChange={e => setAssignForm({...assignForm, stamp_page: parseInt(e.target.value) || 1})} />
             </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">คำสั่งการผู้อำนวยการ (จะประทับตราลงใน PDF)</label>
            <textarea className="w-full p-4 bg-white border border-brand-primary/20 rounded-2xl font-bold text-blue-800 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all" rows={3} placeholder="เช่น มอบครู... ดำเนินการ, เห็นชอบตามเสนอ..." required value={assignForm.instruction} onChange={e => setAssignForm({...assignForm, instruction: e.target.value})} />
          </div>
          <div className="space-y-1.5 border-t pt-4">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">มอบหมายผู้ปฏิบัติในระบบ</label>
            <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary" required value={assignForm.teacher_id} onChange={e => setAssignForm({...assignForm, teacher_id: e.target.value})}>
              <option value="">-- กรุณาเลือกรายชื่อผู้ปฏิบัติ --</option>
              {teachers.map(t => <option key={t.id} value={t.id}>{t.prefix}{t.first_name} {t.last_name} ({t.position})</option>)}
            </select>
          </div>
          <button type="submit" disabled={isSaving || !assignForm.teacher_id || !assignForm.instruction} className="w-full py-5 bg-slate-800 text-white rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-slate-200 hover:bg-slate-900 transition-all disabled:opacity-50">
            {isSaving ? <Loader2 className="animate-spin" /> : <Send />} ยืนยันเกษียณและส่งเข้า Google Drive
          </button>
          <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest">ระบบจะนำไฟล์จากที่พักไฟล์มาประทับตราและส่งเข้า Drive อัตโนมัติ</p>
        </form>
      </Modal>
    </div>
  );
}
````

## File: src/pages/Login.tsx
````typescript
import { useState, useEffect } from 'react';
import { supabase, getSchoolProfiles, getActiveSchoolProfile, initSupabase, type SchoolProfile } from '../lib/supabase';
import { LogIn, UserPlus, Loader2, ArrowLeft, Settings, School } from 'lucide-react';

interface LoginProps {
  onManageSchools: () => void;
}

export default function Login({ onManageSchools }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [schoolCode, setSchoolCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [profiles, setProfiles] = useState<SchoolProfile[]>([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  const [schoolName, setSchoolName] = useState('โรงเรียนยังไม่ได้ระบุ');
  const [schoolLogo, setSchoolLogo] = useState('');

  useEffect(() => {
    const list = getSchoolProfiles();
    setProfiles(list);

    const active = getActiveSchoolProfile();
    if (active) {
      setSelectedSchoolId(active.id);
      setSchoolName(active.name);
      fetchSchoolSettings();
    } else if (list.length > 0) {
      const firstSchool = list[0];
      setSelectedSchoolId(firstSchool.id);
      localStorage.setItem('active_school_id', firstSchool.id);
      initSupabase();
      setSchoolName(firstSchool.name);
      fetchSchoolSettings();
    }
  }, []);

  async function fetchSchoolSettings() {
    try {
      const schoolId = localStorage.getItem('active_school_id');
      const isUUID = schoolId ? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(schoolId) : false;
      if (!schoolId || !isUUID) return;

      const { data } = await supabase
        .from('settings')
        .select('school_name, school_logo_url')
        .eq('school_id', schoolId)
        .maybeSingle();

      if (data?.school_name) {
        setSchoolName(data.school_name);
      }
      if (data?.school_logo_url) {
        setSchoolLogo(data.school_logo_url);
      } else {
        setSchoolLogo('');
      }
    } catch (err) {
      console.warn('Error fetching school name/logo from DB:', err);
      setSchoolLogo('');
    }
  }

  const handleSchoolChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedSchoolId(id);
    localStorage.setItem('active_school_id', id);
    initSupabase();

    const matched = profiles.find(p => p.id === id);
    if (matched) {
      setSchoolName(matched.name);
    }

    setSchoolLogo('');
    await fetchSchoolSettings();
  };  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        // 1. ค้นหาตรวจสอบความถูกต้องของรหัสโรงเรียนก่อน
        if (!schoolCode.trim()) {
          throw new Error('กรุณากรอกรหัสโรงเรียน');
        }

        const { data: schoolData, error: schoolError } = await supabase
          .from('schools')
          .select('id, school_name')
          .eq('school_code', schoolCode.trim().toUpperCase())
          .single();

        if (schoolError || !schoolData) {
          throw new Error('ไม่พบรหัสโรงเรียนนี้ในระบบ กรุณาตรวจสอบรหัสโรงเรียนอีกครั้ง หรือติดต่อผู้ดูแลระบบส่วนกลาง');
        }


        const schoolProfile: SchoolProfile = {
          id: schoolData.id,
          name: schoolData.school_name,
          supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
          supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
          vercelUrl: import.meta.env.VITE_VERCEL_URL || window.location.origin,
          gasUrl: import.meta.env.VITE_GAS_URL || ''
        };
        localStorage.setItem('active_school_id', schoolData.id);
        localStorage.setItem('school_profiles', JSON.stringify([schoolProfile]));
        initSupabase();


        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: displayName,
              school_code: schoolCode.trim().toUpperCase()
            }
          }
        });

        if (signUpError) throw signUpError;

        setMessage(`ลงทะเบียนกับ ${schoolData.school_name} สำเร็จ! กรุณาเข้าสู่ระบบด้วยบัญชีนี้`);
        setIsSignUp(false);
        setSchoolCode('');
      } else {
        // Sign In
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      let errorMsg = err.message;
      if (err.message === 'User already registered') errorMsg = 'อีเมลนี้ถูกใช้งานไปแล้ว';
      setError(errorMsg || 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-orange-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="bg-brand-primary p-8 text-white text-center transition-all duration-500 relative">
          {isSignUp && (
            <button
              onClick={() => setIsSignUp(false)}
              className="absolute left-4 top-8 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="bg-white w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg p-2 overflow-hidden">
            <img src={schoolLogo || import.meta.env.VITE_SCHOOL_LOGO_PATH || "logo.png"} alt="School Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold">{isSignUp ? 'ลงทะเบียนผู้ใช้งาน' : 'ระบบบริหารจัดการข้อมูลโรงเรียน'}</h1>
          <p className="text-green-100/80 mt-1 truncate">{schoolName}</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleAuth} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 animate-pulse font-medium">
                {error}
              </div>
            )}
            {message && (
              <div className="bg-green-50 text-green-600 p-4 rounded-xl text-sm border border-green-100 font-medium">
                {message}
              </div>
            )}

            {}
            {!isSignUp && profiles.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    เชื่อมต่อฐานข้อมูลสถานศึกษา
                  </label>
                  <button
                    type="button"
                    onClick={onManageSchools}
                    className="text-[10px] text-brand-primary font-black hover:underline uppercase tracking-widest flex items-center gap-1"
                  >
                    <Settings size={10} /> จัดการ
                  </button>
                </div>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold text-slate-700 appearance-none animate-in fade-in"
                    value={selectedSchoolId}
                    onChange={handleSchoolChange}
                  >
                    {profiles.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-4 text-slate-400 pointer-events-none">
                    <School size={16} />
                  </div>
                </div>
              </div>
            )}

            {isSignUp && (
              <>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">รหัสโรงเรียน (School Code)</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold uppercase"
                    placeholder="ตัวอย่างเช่น SKW001"
                    value={schoolCode}
                    onChange={(e) => setSchoolCode(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">ชื่อ-นามสกุล</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold"
                    placeholder="กรอกชื่อของคุณ"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">อีเมลผู้ใช้งาน</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">รหัสผ่าน</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${isSignUp ? 'bg-brand-primary hover:bg-green-700' : 'bg-brand-secondary hover:bg-orange-600'} text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 disabled:active:scale-100`}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                isSignUp ? <UserPlus size={24} /> : <LogIn size={24} />
              )}
              {isSignUp ? 'สร้างบัญชีผู้ใช้' : 'เข้าสู่ระบบ'}
            </button>
          </form>

          {!isSignUp && (
            <div className="mt-6 text-center">
              <p className="text-slate-500 text-sm">
                ยังไม่มีบัญชี? {' '}
                <button
                  onClick={() => { setIsSignUp(true); setError(null); setMessage(null); }}
                  className="text-brand-primary font-bold hover:underline"
                >
                  ลงทะเบียนที่นี่
                </button>
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} {schoolName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: src/pages/OutgoingDocs.tsx
````typescript
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { uploadFile, deleteFileFromDrive } from '../lib/storage';
import { useAuth } from '../contexts/AuthContext';
import { sendLineNotification, sendInteractiveFlexMessage } from '../lib/lineNotify';
import Modal from '../components/Modal';
import {
  Search,
  ExternalLink,
  Loader2,
  Save,
  Send,
  Trash2,
  Printer,
  FileText,
  Plus,
  X,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import garuda3cm from '../assets/saraban/garuda-3cm.png';
import { generateAIDraft } from '../lib/aiService';

export default function OutgoingDocs() {
  const { user, profile } = useAuth();
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const currentYearBE = new Date().getFullYear() + 543;
  const [selectedYear, setSelectedYear] = useState<number | null>(currentYearBE);
  const [latestNumber, setLatestNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [incomingDocs, setIncomingDocs] = useState<any[]>([]);

  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedDocForApproval, setSelectedDocForApproval] = useState<any>(null);
  const [directorDecision, setDirectorDecision] = useState('ลงนามอนุมัติ');
  const [directorOpinion, setDirectorOpinion] = useState('');

  const isDirector = profile?.role === 'director' || profile?.role === 'admin';
  const defaultSchoolName = import.meta.env.VITE_SCHOOL_NAME || 'โรงเรียน';

  const [formData, setFormData] = useState({
    doc_number: '',
    from_agency: defaultSchoolName,
    to_agency: '',
    subject: '',
    doc_date: new Date().toISOString().split('T')[0],
    urgency: 'ปกติ',
    sender_name: '',
    reference: '',
    closing_phrase: 'จึงเรียนมาเพื่อโปรดทราบ',
    sign_name: '',
    sign_position: `ผู้อำนวยการ${defaultSchoolName}`,
    contact_phone: '',
    footer_text: '',
    online_submit: true,
  });

  const [content, setContent] = useState('');
  const [attachmentsList, setAttachmentsList] = useState<string[]>(['']);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchDocs();
    fetchSettings();
    fetchIncomingDocs();
  }, []);

  async function fetchSettings() {
    const { data } = await supabase.from('settings').select('*').maybeSingle();
    if (data) {
      setSettings(data);
      setFormData(prev => ({
        ...prev,
        from_agency: data.school_name || defaultSchoolName,
        sign_name: data.director_name || '',
        sign_position: `ผู้อำนวยการ${data.school_name || defaultSchoolName}`,
        contact_phone: data.phone_number || ''
      }));
    }
  }

  async function fetchIncomingDocs() {
    const { data } = await supabase.from('incoming_docs').select('*').order('created_at', { ascending: false }).limit(20);
    setIncomingDocs(data || []);
  }

  async function fetchDocs(yearToFetch = selectedYear) {
    setLoading(true);
    try {
      let query = supabase.from('outgoing_docs').select('*');
      if (yearToFetch) {
        query = query.eq('doc_year', yearToFetch);
      }
      const { data } = await query.order('created_at', { ascending: false });
      setDocs(data || []);

      if (yearToFetch) {
        const { data: latestSeqDoc } = await supabase
          .from('outgoing_docs')
          .select('doc_number')
          .eq('doc_year', yearToFetch)
          .order('doc_sequence', { ascending: false })
          .limit(1);
        if (latestSeqDoc && latestSeqDoc.length > 0) {
          setLatestNumber(latestSeqDoc[0].doc_number);
        } else {
          setLatestNumber('');
        }
      } else if (data && data.length > 0) {
        setLatestNumber(data[0].doc_number);
      } else {
        setLatestNumber('');
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  const toThaiNumerals = (text: string) => {
    return text?.toString().replace(/[0-9]/g, (digit) => '๐๑๒๓๔๕๖๗๘๙'[parseInt(digit)]) || '';
  };

  const formatThaiFullDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"][date.getMonth()];
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year}`;
  };

  const [aiPurpose, setAiPurpose] = useState('');

  const getNextDocNumber = (customDate = formData.doc_date) => {
    const prefix = settings?.school_doc_prefix || 'ศธ 04225.016/';
    const docDateObj = new Date(customDate);
    const targetYear = docDateObj.getFullYear() + 543;

    const yearDocs = docs.filter(d => d.doc_year === targetYear);
    if (yearDocs.length === 0) {
      return `${prefix}1`;
    }

    const validDocs = yearDocs.filter(d => d.doc_number && d.doc_number.startsWith(prefix));
    if (validDocs.length === 0) {
      return `${prefix}1`;
    }

    let maxNum = 0;
    validDocs.forEach(d => {
      if (d.doc_sequence && d.doc_sequence > maxNum) {
        maxNum = d.doc_sequence;
      } else {
        const match = d.doc_number.match(/\/(\d+)/);
        if (match) {
          const num = parseInt(match[1]);
          if (num > maxNum) {
            maxNum = num;
          }
        }
      }
    });

    return `${prefix}${maxNum + 1}`;
  };

  const handleAiDraft = async (incoming: any = null) => {
    if (!incoming && !aiPurpose.trim()) {
      alert('กรุณาระบุรายละเอียดหรือความต้องการในการร่างหนังสือ');
      return;
    }

    setIsSaving(true);
    try {
      const schoolId = localStorage.getItem('active_school_id');
      let settingsQuery = supabase.from('settings').select('gemini_api_key, ai_cowork_api_key');
      if (schoolId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(schoolId)) {
        settingsQuery = settingsQuery.eq('school_id', schoolId);
      }
      const { data: sets } = await settingsQuery.maybeSingle();
      const apiKey = sets?.ai_cowork_api_key || sets?.gemini_api_key;

      if (!apiKey) {
        throw new Error('ไม่พบ API Key ของ Gemini ในหน้าตั้งค่าระบบ');
      }


      let incomingExtra: any = {};
      let remarkStr = '';
      if (incoming && incoming.remark) {
        remarkStr = incoming.remark;
        try {
          if (typeof incoming.remark === 'object') {
            incomingExtra = incoming.remark;
          } else if (typeof incoming.remark === 'string') {
            const trimmed = incoming.remark.trim();
            incomingExtra = JSON.parse(trimmed);
          }
        } catch (e) {
          console.warn('Failed to parse incoming.remark as JSON directly, attempting cleanup:', e);
          try {
            let cleanStr = incoming.remark.trim();
            if (cleanStr.startsWith('"') && cleanStr.endsWith('"')) {
              cleanStr = cleanStr.substring(1, cleanStr.length - 1).replace(/\\"/g, '"');
            }
            incomingExtra = JSON.parse(cleanStr);
          } catch (e2) {
            console.error('Robust parse incoming remark failed:', e2);
          }
        }
      }

      // ดึงเลขที่จดหมายจริงและวันที่จดหมายจริงของต้นทาง (หากไม่มี ค่อยใช้เลขทะเบียนรับ/วันที่รับ เป็นตัวสำรอง)
      let senderDocNo = incomingExtra.sender_doc_number || incomingExtra.sender_doc_no || incoming?.sender_doc_number || incoming?.sender_doc_no || '';
      let senderDocDate = incomingExtra.sender_doc_date || incomingExtra.sender_date || incoming?.sender_doc_date || incoming?.sender_date || '';

      // แผนสำรอง (Fallback) หากยังไม่ได้ค่า: ใช้ Regex ค้นหาจาก remarkStr หรือข้อมูลอื่นๆ
      if (!senderDocNo && remarkStr) {
        const docNumMatch = remarkStr.match(/"sender_doc_number"\s*:\s*"([^"]+)"/) ||
                            remarkStr.match(/"doc_number"\s*:\s*"([^"]+)"/) ||
                            remarkStr.match(/(?:ที่|เลขที่)\s*([A-Za-z0-9ก-ฮ.\/-]+)/);
        if (docNumMatch) {
          senderDocNo = docNumMatch[1];
        }
      }

      if (!senderDocDate && remarkStr) {
        const dateMatch = remarkStr.match(/"sender_doc_date"\s*:\s*"([^"]+)"/) ||
                          remarkStr.match(/"doc_date"\s*:\s*"([^"]+)"/) ||
                          remarkStr.match(/\d{4}-\d{2}-\d{2}/) ||
                          remarkStr.match(/(?:วันที่|ลงวันที่)\s*([A-Za-z0-9ก-ฮ.\/ -]+)/);
        if (dateMatch) {
          senderDocDate = dateMatch[1];
        }
      }

      // ป้องกันการแสดงคำว่า "ที่" ซ้ำซ้อน (เช่น "ที่ ที่ ศธ...")
      let displayDocNo = senderDocNo || '';
      if (displayDocNo.startsWith('ที่')) {
        displayDocNo = displayDocNo.replace(/^ที่\s*/, '');
      }

      const referenceContext = incoming ? `
บริบทสำหรับอ้างอิง:
- เรื่อง: ${incoming.subject}
- จาก (หน่วยงานต้นทาง): ${incoming.from_agency}
- เลขที่หนังสือต้นทางจริง (ใช้สิ่งนี้อ้างอิงเท่านั้น): ${senderDocNo || 'ไม่มี'}
- ลงวันที่บนหนังสือต้นทางจริง (ใช้สิ่งนี้อ้างอิงเท่านั้น): ${senderDocDate || 'ไม่มี'}
- เลขทะเบียนรับในระบบโรงเรียน (ห้ามใช้อ้างอิงในหนังสือส่งออก): ${incoming.doc_number || 'ไม่มี'}
- วันที่ลงทะเบียนรับในระบบโรงเรียน (ห้ามใช้อ้างอิงในหนังสือส่งออก): ${incoming.doc_date || 'ไม่มี'}
- สิ่งที่ต้องดำเนินการ/รายละเอียด: ${incoming.action_required || 'ไม่มี'}
- ข้อสรุป/ข้อมูล AI: ${incoming.ai_suggestion || 'ไม่มี'}
- หมายเหตุ/ข้อความเพิ่มเติม: ${remarkStr || 'ไม่มี'}` : 'เป็นการร่างหนังสือใหม่โดยตรง (ไม่มีการอ้างถึงหนังสือรับ)';

      const userDetail = aiPurpose.trim() ? `ความต้องการหรือรายละเอียดเพิ่มเติมที่ผู้ใช้ระบุ: "${aiPurpose}"` : 'กรุณาร่างจดหมายตอบกลับที่เหมาะสม';

      const prompt = `คุณคือผู้ช่วยส่วนตัว AI ระดับเชี่ยวชาญด้านงานสารบรรณของ ${settings?.school_name || defaultSchoolName}
กรุณาช่วยร่างจดหมายราชการไทย (หนังสือส่งออก) ตามข้อมูลบริบทด้านล่างนี้:

บริบทหนังสือรับ:
${referenceContext}

ความต้องการของผู้ใช้:
${userDetail}

เงื่อนไขและแนวทางการร่าง:
1. ใช้ภาษาราชการระดับทางการ ถูกต้อง สละสลวย และเป็นไปตามธรรมเนียมปฏิบัติของงานสารบรรณ
2. ร่างเรื่อง (Subject) และ เรียน (To Agency) ให้เหมาะสมกับผู้รับและบริบทของเรื่อง
3. ร่างเนื้อหาหลัก (Content) แบ่งออกเป็นย่อหน้าอย่างสวยงาม:
   - ย่อหน้าแรกต้องเขียนเกริ่นเหตุผลที่มาของการออกจดหมาย โดยอ้างอิงถึงหนังสือรับต้นทางในลักษณะ: "ตามหนังสือที่อ้างถึง [หน่วยงานต้นทาง] ได้แจ้ง/ขอความร่วมมือเรื่อง..."
   - สำคัญมาก: ห้ามระบุเลขที่หนังสือต้นทาง (เช่น ศธ 04225/...) และห้ามระบุวันที่ลงบนหนังสือต้นทางซ้ำลงไปในเนื้อความย่อหน้าแรกหรือในเนื้อความส่วนอื่นๆ ของจดหมายเด็ดขาด เนื่องจากข้อมูลเหล่านี้ได้ระบุไว้ในช่อง "อ้างถึง" ด้านบนชัดเจนแล้ว (ให้เขียนเกริ่นอ้างถึงเพียงสั้นๆ เช่น "ตามหนังสือที่อ้างถึง..." หรือ "ตามหนังสือที่อ้างถึง [หน่วยงานต้นทาง]..." เท่านั้น)
   - ย่อหน้าต่อมาให้ระบุการดำเนินงานหรือผลการพิจารณาของ ${settings?.school_name || defaultSchoolName}
   - ย่อหน้าสุดท้ายเป็นย่อหน้าสรุปความประสงค์ เช่น "จึงเรียนมาเพื่อโปรดทราบ" หรือ "จึงเรียนมาเพื่อโปรดพิจารณา"
   - ห้ามพิมพ์คำว่า "ที่", "เรื่อง", "เรียน", "อ้างถึง" หรือ "คำลงท้าย" เข้ามาปนในเนื้อหาหลัก (Content)
4. แนะนำคำลงท้าย (Closing Phrase) ที่เหมาะสม เช่น "จึงเรียนมาเพื่อโปรดทราบ", "จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ" เป็นต้น
5. แนะนำเอกสารแนบ (Attachments) ที่จำเป็นสำหรับส่งไปพร้อมกับเรื่องนี้ (ถ้ามี) หากไม่มี ให้ปล่อยเป็นค่าว่าง

กรุณาส่งผลลัพธ์กลับมาในรูปแบบ XML tags ต่อไปนี้เท่านั้น (ห้ามมีคำเกริ่นนำ ข้อความวิจารณ์ หรือพูดคุยใดๆ นอกเหนือจาก XML tag เด็ดขาด):
<subject>[พิมพ์หัวเรื่องหนังสือส่งตรงนี้ เช่น ขออนุมัติโครงการ...]</subject>
<to_agency>[พิมพ์ตำแหน่ง/หน่วยงานผู้รับตรงนี้ เช่น ผู้อำนวยการสำนักงานเขต...]</to_agency>
<content>[พิมพ์เนื้อความหนังสือแบ่งย่อหน้าอย่างสมบูรณ์ตรงนี้]</content>
<closing_phrase>[พิมพ์คำลงท้ายตรงนี้ เช่น จึงเรียนมาเพื่อโปรดพิจารณา]</closing_phrase>
<attachments>
[ระบุเอกสารแนบที่ 1 (ถ้ามี)]
[ระบุเอกสารแนบที่ 2 (ถ้ามี)]
</attachments>`;

      const draft = await generateAIDraft(prompt, apiKey);
      if (draft) {
        // แกะ XML tags
        const subjectMatch = draft.match(/<subject>([\s\S]*?)<\/subject>/i);
        const toAgencyMatch = draft.match(/<to_agency>([\s\S]*?)<\/to_agency>/i);
        const contentMatch = draft.match(/<content>([\s\S]*?)<\/content>/i);
        const closingPhraseMatch = draft.match(/<closing_phrase>([\s\S]*?)<\/closing_phrase>/i);
        const attachmentsMatch = draft.match(/<attachments>([\s\S]*?)<\/attachments>/i);

        const aiSubject = subjectMatch ? subjectMatch[1].trim() : '';
        const aiToAgency = toAgencyMatch ? toAgencyMatch[1].trim() : '';
        const aiContent = contentMatch ? contentMatch[1].trim() : draft;
        const aiClosingPhrase = closingPhraseMatch ? closingPhraseMatch[1].trim() : 'จึงเรียนมาเพื่อโปรดทราบ';

        let aiAttachments: string[] = [''];
        if (attachmentsMatch) {
          const lines = attachmentsMatch[1]
            .split('\n')
            .map(line => line.replace(/^[-*•\s\d.)]+\s*/, '').trim())
            .filter(line => line);
          if (lines.length > 0) {
            aiAttachments = lines;
          }
        }

        // คำนวณเลขหนังสือถัดไป
        const nextDocNum = getNextDocNumber();

        setFormData(prev => ({
          ...prev,
          doc_number: nextDocNum,
          to_agency: aiToAgency || (incoming ? incoming.from_agency : ''),
          subject: aiSubject || (incoming ? `ตอบรับเรื่อง ${incoming.subject}` : aiPurpose),
          reference: incoming ? `หนังสือ${incoming.from_agency}\nที่ ${displayDocNo || incoming.doc_number || ''} ลงวันที่ ${formatThaiFullDate(senderDocDate || incoming.doc_date || '')}` : '',
          closing_phrase: aiClosingPhrase
        }));

        setContent(aiContent);
        setAttachmentsList(aiAttachments);
        setAiPurpose('');
        setIsAiModalOpen(false);
        setIsModalOpen(true);
        alert('AI ได้ช่วยวิเคราะห์ร่างเอกสารตอบกลับ แนะนำผู้รับ หัวข้อ คำลงท้าย พร้อมร่างเอกสารแนบและเนื้อความป้อนลงในฟอร์มให้เรียบร้อยแล้วค่ะ! คุณสามารถตรวจสอบและปรับปรุงเพิ่มเติมได้ตามต้องการ');
      }
    } catch (err: any) {
      alert('ไม่สามารถร่างหนังสือด้วย AI ได้: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const printOutgoingDoc = (doc: any) => {
    let extraData: any = {};
    try {
      if (doc.remark && doc.remark.startsWith('{')) {
        extraData = JSON.parse(doc.remark);
      }
    } catch (e) {}

    const data = { ...doc, ...extraData };
    const dateObj = new Date(data.doc_date);
    const thaiMonths = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

    const day = toThaiNumerals(dateObj.getDate().toString());
    const month = thaiMonths[dateObj.getMonth()];
    const yearNum = dateObj.getFullYear() + 543;
    const year = toThaiNumerals(yearNum.toString());

    const fullDate = `${day} ${month} ${year}`;

    const paragraphs = (data.content || '').split('\n').filter((p: string) => p.trim() !== '');
    // กรองและล้างค่าว่างออกจากรายชื่อเอกสารแนบ เพื่อไม่ให้แสดงคำว่า "สิ่งที่ส่งมาด้วย" หากไม่มีการแนบจริง
    const attachments = (Array.isArray(data.attachments) ? data.attachments : (data.attachment ? [data.attachment] : []))
      .map((a: any) => typeof a === 'string' ? a.trim() : '')
      .filter((a: string) => a !== '');
    const referenceLines = (data.reference || '').split('\n');

    const rawAddress = settings?.school_address || '';
    const addressLines = rawAddress.split('\n').map((l: string) => l.trim());

    const htmlAddress = `
      <div style="font-size: 16pt; line-height: 1.1;">
        ${data.from_agency || ''} ${addressLines[0] || ''}<br/>
        ${addressLines[1] || ''}<br/>
        ${addressLines[2] || ''}
      </div>
    `;

    const html = `
      <html>
        <head>
          <title>หนังสือภายนอก - ${data.doc_number}</title>
          <style>
            @font-face {
              font-family: 'THSarabunIT๙';
              src: local('THSarabunIT๙');
            }
            body {
              font-family: 'THSarabunIT๙', 'TH Sarabun New', sans-serif;
              padding: 0;
              margin: 0;
              background: #f0f0f0;
            }
            .page {
              background: white;
              width: 210mm;
              height: 297mm;
              margin: 10mm auto;
              padding: 1.5cm 1cm 2cm 3cm;
              box-sizing: border-box;
              position: relative;
              font-size: 16pt;
              line-height: 1.15;
              color: black;
            }
            .garuda {
              position: absolute;
              top: 1.5cm;
              left: 50%;
              transform: translateX(-50%);
              width: 3cm;
              height: auto;
            }
            .header-info {
              margin-top: 3cm;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 0.2cm;
            }
            .school-address {
              width: 5.5cm;
              text-align: left;
              font-size: 16pt;
              line-height: 1.1;
            }
            .doc-date {
              margin-left: 7.8cm;
              margin-bottom: 0.8cm;
              font-size: 16pt;
            }
            .content-section {
              margin-top: 0.5cm;
              line-height: 1.15;
            }
            .content-section div {
              margin-bottom: 0.1cm;
              font-weight: normal !important;
              font-size: 16pt;
            }
            .content-text p {
              margin-top: 0.3cm;
              margin-bottom: 0;
              text-indent: 2.5cm;
              text-align: justify;
              font-size: 16pt;
              word-break: break-word;
              overflow-wrap: break-word;
            }
            .closing-phrase {
              margin-top: 0.3cm;
              margin-bottom: 0;
              text-indent: 2.5cm;
              text-align: justify;
              font-size: 16pt;
              word-break: break-word;
              overflow-wrap: break-word;
            }
            .footer-sign {
              margin-top: 1.5cm;
              margin-left: 7.8cm;
              width: 8cm;
              font-size: 16pt;
              line-height: 1.2;
            }
            .footer-sign p {
              margin: 0;
              text-align: left;
            }
            .sig-name-block {
              margin-top: 1.5cm;
              text-align: center;
              line-height: 1.5;
              margin-left: -4.8cm;
            }
            .contact-info {
              position: absolute;
              bottom: 3cm;
              left: 3cm;
              font-size: 14pt;
              line-height: 1.1;
            }
            .centered-footer {
              position: absolute;
              bottom: 1.5cm;
              left: 0;
              right: 0;
              text-align: center;
              font-weight: bold;
              font-size: 16pt;
              color: #000;
            }
            @media print {
              body { background: white; }
              .page { margin: 0; box-shadow: none; width: 100%; height: 100%; }
              .no-print { display: none; }
            }
            .no-print-btn {
              position: fixed; top: 20px; right: 20px;
              background: #16a34a; color: white; border: none;
              padding: 12px 24px; border-radius: 12px; cursor: pointer;
              font-weight: bold; z-index: 9999;
            }
          </style>
        </head>
        <body>
          <button class="no-print-btn no-print" onclick="window.print()">🖨️ พิมพ์เอกสาร</button>
          <div class="page">
            <img src="${garuda3cm}" class="garuda" />
            <div class="header-info">
              <div style="width: 40%; font-size: 16pt;">ที่ ${toThaiNumerals(data.doc_number || '')}</div>
              <div class="school-address">
                ${htmlAddress}
              </div>
            </div>
            <div class="doc-date">${fullDate}</div>
            <div class="content-section">
              <div style="display: flex; font-weight: normal !important; align-items: flex-start; margin-bottom: 0.1cm;">
                <span style="white-space: nowrap; width: 1.2cm;">เรื่อง</span>
                <span style="text-align: justify; word-break: break-word; overflow-wrap: break-word; flex-grow: 1;">${toThaiNumerals(data.subject || '')}</span>
              </div>
              <div style="display: flex; font-weight: normal !important; align-items: flex-start; margin-bottom: 0.1cm;">
                <span style="white-space: nowrap; width: 1.2cm;">เรียน</span>
                <span style="flex-grow: 1;">${toThaiNumerals(data.to_agency || '')}</span>
              </div>
              ${referenceLines.filter((l: string) => l.trim() !== '').length > 0 ? `
                <div style="display: flex; font-weight: normal !important; align-items: flex-start; margin-bottom: 0.1cm;">
                  <span style="white-space: nowrap; width: 1.7cm;">อ้างถึง</span>
                  <div style="display: flex; flex-direction: column; flex-grow: 1;">
                    ${referenceLines.filter((l: string) => l.trim() !== '').map((line: string) => `
                      <span style="text-align: justify; word-break: break-word; overflow-wrap: break-word;">${toThaiNumerals(line.trim())}</span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              ${attachments.length > 0 ? `
                <div style="display: flex; font-weight: normal !important; align-items: flex-start; margin-bottom: 0.1cm;">
                  <span style="white-space: nowrap; width: 3.1cm;">สิ่งที่ส่งมาด้วย</span>
                  <div style="display: flex; flex-direction: column; flex-grow: 1;">
                    ${attachments.map((a: string, i: number) => `
                      <span style="text-align: justify; word-break: break-word; overflow-wrap: break-word;">
                        ${attachments.length > 1 ? toThaiNumerals((i + 1).toString()) + '. ' : ''}${toThaiNumerals(a)}
                      </span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
            <div class="content-text">
              ${paragraphs.map((p: string) => `<p>${toThaiNumerals(p)}</p>`).join('')}
            </div>
            ${data.closing_phrase ? `<div class="closing-phrase">${toThaiNumerals(data.closing_phrase)}</div>` : ''}
            <div class="footer-sign">
              <p>ขอแสดงความนับถือ</p>
              ${(data.status === 'approved' && settings?.director_signature_url) ? `
                <div style="margin-top: 0.1cm; margin-bottom: 0.1cm; text-align: center; margin-left: -4.8cm;">
                  <img src="${settings.director_signature_url}" style="height: 1.4cm; width: auto; mix-blend-mode: multiply;" />
                </div>
              ` : `
                <div style="height: 1.6cm;"></div>
              `}
              <div class="sig-name-block" style="${(data.status === 'approved' && settings?.director_signature_url) ? 'margin-top: 0.2cm;' : 'margin-top: 0cm;'}">
                ( ${data.sign_name || '................................................'} )<br/>
                ${data.sign_position || '................................................'}
              </div>
            </div>
            <div class="contact-info">
              ${data.from_agency || ''}<br/>
              โทร. ${toThaiNumerals(data.contact_phone || '-')}
            </div>

            ${data.footer_text ? `
              <div class="centered-footer">
                "${data.footer_text}"
              </div>
            ` : ''}
          </div>
        </body>
      </html>
    `;
    const win = window.open('', '_blank');
    win?.document.write(html);
    win?.document.close();
  };

  async function handleDelete(id: string) {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้? รวมถึงไฟล์ใน Drive จะถูกลบด้วย')) return;
    try {
      const { data: doc } = await supabase.from('outgoing_docs').select('file_url').eq('id', id).single();
      if (doc?.file_url) {
        await deleteFileFromDrive(doc.file_url);
      }
      const { error } = await supabase.from('outgoing_docs').delete().eq('id', id);
      if (error) throw error;
      alert('ลบข้อมูลและไฟล์เรียบร้อยแล้ว');
      fetchDocs();
    } catch (err: any) {
      alert('ลบไม่สำเร็จ: ' + err.message);
    }
  }

  async function handleApprovalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDocForApproval) return;
    setIsSaving(true);
    try {
      let extraData: any = {};
      try {
        if (selectedDocForApproval.remark && selectedDocForApproval.remark.startsWith('{')) {
          extraData = JSON.parse(selectedDocForApproval.remark);
        }
      } catch (err) {}

      const todayThai = new Date().toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const updatedExtraData = {
        ...extraData,
        director_decision: directorDecision,
        director_opinion: directorOpinion,
        approved_date: todayThai,
        show_director_signature: true
      };

      const { error } = await supabase.from('outgoing_docs').update({
        status: 'approved',
        remark: JSON.stringify(updatedExtraData)
      }).eq('id', selectedDocForApproval.id);

      if (error) throw error;


      let requesterLineUserId = '';
      if (selectedDocForApproval.created_by) {
        const { data: reqProfile } = await supabase
          .from('profiles')
          .select('line_user_id')
          .eq('id', selectedDocForApproval.created_by)
          .maybeSingle();
        requesterLineUserId = reqProfile?.line_user_id || '';
      }

      // ส่ง LINE แจ้งเตือนครูผู้เสนอ
      const lineMessage = `\n✅ หนังสือส่งได้รับการลงนามอนุมัติแล้ว\nเรื่อง: ${selectedDocForApproval.subject}\nถึง: ${selectedDocForApproval.to_agency}\nลงวันที่อนุมัติ: ${todayThai}\nความเห็น ผอ.: ${directorOpinion || '-'}\n\nครูผู้เสนอสามารถพิมพ์หนังสือส่งฉบับจริงที่มีลายเซ็น ผอ. ได้ในระบบ`;
      if (requesterLineUserId) {
        await sendLineNotification(lineMessage, requesterLineUserId);
      } else {
        await sendLineNotification(lineMessage);
      }

      alert('ลงนามอนุมัติหนังสือส่งเรียบร้อยแล้ว');
      setIsApprovalModalOpen(false);
      fetchDocs();
    } catch (err: any) {
      alert('ไม่สามารถบันทึกการอนุมัติได้: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleApprovalReject() {
    if (!selectedDocForApproval) return;
    setIsSaving(true);
    try {
      let extraData: any = {};
      try {
        if (selectedDocForApproval.remark && selectedDocForApproval.remark.startsWith('{')) {
          extraData = JSON.parse(selectedDocForApproval.remark);
        }
      } catch (err) {}

      const updatedExtraData = {
        ...extraData,
        director_decision: 'ส่งกลับแก้ไข',
        director_opinion: directorOpinion,
        show_director_signature: false
      };

      const { error } = await supabase.from('outgoing_docs').update({
        status: 'rejected',
        remark: JSON.stringify(updatedExtraData)
      }).eq('id', selectedDocForApproval.id);

      if (error) throw error;


      let requesterLineUserId = '';
      if (selectedDocForApproval.created_by) {
        const { data: reqProfile } = await supabase
          .from('profiles')
          .select('line_user_id')
          .eq('id', selectedDocForApproval.created_by)
          .maybeSingle();
        requesterLineUserId = reqProfile?.line_user_id || '';
      }

      // ส่ง LINE แจ้งเตือนครูผู้เสนอ
      const lineMessage = `\n❌ หนังสือส่งถูกส่งกลับเพื่อแก้ไข\nเรื่อง: ${selectedDocForApproval.subject}\nถึง: ${selectedDocForApproval.to_agency}\nความเห็นข้อแนะนำ ผอ.: ${directorOpinion || '-'}`;
      if (requesterLineUserId) {
        await sendLineNotification(lineMessage, requesterLineUserId);
      } else {
        await sendLineNotification(lineMessage);
      }

      alert('ส่งกลับแก้ไขเรียบร้อยแล้ว');
      setIsApprovalModalOpen(false);
      fetchDocs();
    } catch (err: any) {
      alert('ไม่สามารถส่งกลับแก้ไขได้: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      let file_url = '';
      if (selectedFile) {
        try {
          file_url = await uploadFile(selectedFile, 'documents', 'outgoing');
        } catch (uploadErr: any) {
          throw new Error(`อัปโหลดไฟล์ไม่สำเร็จ: ${uploadErr.message}`);
        }
      }

      const extraData = {
        reference: formData.reference,
        attachments: attachmentsList.filter(a => a.trim() !== ''),
        content: content,
        closing_phrase: formData.closing_phrase,
        sign_name: formData.sign_name,
        sign_position: formData.sign_position,
        contact_phone: formData.contact_phone,
        footer_text: formData.footer_text
      };

      const docDateObj = new Date(formData.doc_date);
      const docYear = docDateObj.getFullYear() + 543;

      // ค้นหา sequence ถัดไปของปีนี้ ณ จังหวะเซฟจริง
      const { data: seqData } = await supabase
        .from('outgoing_docs')
        .select('doc_sequence')
        .eq('doc_year', docYear)
        .order('doc_sequence', { ascending: false })
        .limit(1);

      const docSeq = (seqData && seqData.length > 0) ? (Number(seqData[0].doc_sequence) + 1) : 1;
      const prefix = settings?.school_doc_prefix || 'ศธ 04225.016/';
      const finalDocNumber = formData.doc_number.trim() || `${prefix}${docSeq}`;

      const { data: insertedDocs, error } = await supabase.from('outgoing_docs').insert([{
        doc_number: finalDocNumber,
        from_agency: formData.from_agency,
        to_agency: formData.to_agency,
        subject: formData.subject,
        doc_date: formData.doc_date,
        urgency: formData.urgency,
        sender_name: formData.sender_name,
        remark: JSON.stringify(extraData),
        file_url,
        status: formData.online_submit ? 'pending' : 'sent',
        created_by: user?.id,
        doc_year: docYear,
        doc_sequence: docSeq
      }]).select();

      if (error) throw new Error(`บันทึกข้อมูลไม่สำเร็จ: ${error.message}`);
      const insertedDoc = insertedDocs?.[0];


      const { data: dirProfile } = await supabase
        .from('profiles')
        .select('line_user_id')
        .eq('role', 'director')
        .maybeSingle();

      if (formData.online_submit) {
        const lineMessage = `เรื่อง: ${formData.subject}\nถึง: ${formData.to_agency}\nผู้เสนอ: ${profile?.display_name || ''}`;
        const lineActions: any[] = [
          { label: '✅ อนุมัติลงนาม', type: 'postback', data: `action=approve_doc&type=outgoing&id=${insertedDoc?.id || ''}`, color: '#1DB446' },
          { label: '❌ ส่งกลับแก้ไข', type: 'postback', data: `action=reject_doc&type=outgoing&id=${insertedDoc?.id || ''}`, color: '#FF3B30' }
        ];
        if (file_url) {
          lineActions.unshift({ label: '📄 ดูร่างเอกสาร', type: 'uri', uri: file_url });
        }
        await sendInteractiveFlexMessage(
          dirProfile?.line_user_id || undefined,
          '⏳ เสนออนุมัติหนังสือส่ง',
          lineMessage,
          lineActions
        );
      } else {
        const lineMessage = `เลขที่ส่ง: ${finalDocNumber}\nเรื่อง: ${formData.subject}\nถึง: ${formData.to_agency}`;
        const lineActions = file_url ? [{ label: '📄 ดูเอกสาร', type: 'uri' as const, uri: file_url }] : [];
        await sendInteractiveFlexMessage(
          undefined,
          '📤 หนังสือส่งออกใหม่ (ลงทะเบียนตรง)',
          lineMessage,
          lineActions
        );
      }

      setIsModalOpen(false);
      resetForm();
      fetchDocs();
      alert('บันทึกข้อมูลเรียบร้อยแล้ว');
    } catch (err: any) {
      console.error(err);
      alert(`ไม่สามารถบันทึกได้: ${err.message}`);
    } finally { setIsSaving(false); }
  }

  function resetForm() {
    setFormData({
      doc_number: getNextDocNumber(),
      from_agency: settings?.school_name || defaultSchoolName,
      to_agency: '',
      subject: '',
      doc_date: new Date().toISOString().split('T')[0],
      urgency: 'ปกติ',
      sender_name: '',
      reference: '',
      closing_phrase: 'จึงเรียนมาเพื่อโปรดทราบ',
      sign_name: settings?.director_name || '',
      sign_position: `ผู้อำนวยการ${settings?.school_name || defaultSchoolName}`,
      contact_phone: settings?.phone_number || '',
      footer_text: '',
      online_submit: true,
    });
    setContent('');
    setAttachmentsList(['']);
    setSelectedFile(null);
  }

  const addAttachmentRow = () => setAttachmentsList([...attachmentsList, '']);
  const updateAttachment = (val: string, index: number) => {
    const newList = [...attachmentsList];
    newList[index] = val;
    setAttachmentsList(newList);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-2xl flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input type="text" placeholder="ค้นหาหนังสือส่ง..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-hidden shadow-xs" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <select
            value={selectedYear || ''}
            onChange={(e) => {
              const val = e.target.value ? parseInt(e.target.value) : null;
              setSelectedYear(val);
              fetchDocs(val);
            }}
            className="p-3 bg-white border border-slate-200 rounded-2xl outline-hidden shadow-xs font-bold text-slate-700 text-sm h-[48px]"
          >
            <option value="">ดูทั้งหมด</option>
            <option value={currentYearBE}>{currentYearBE}</option>
            <option value={currentYearBE - 1}>{currentYearBE - 1}</option>
            <option value={currentYearBE - 2}>{currentYearBE - 2}</option>
          </select>

          {latestNumber && (
            <div className="shrink-0 px-3 py-1.5 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex items-center gap-1.5 whitespace-nowrap shadow-xs h-[48px] flex items-center">
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-tighter mr-1">ล่าสุด:</span>
              <span className="text-xs font-black text-brand-primary tracking-tight">{latestNumber}</span>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsAiModalOpen(true)} className="bg-white text-brand-primary border-2 border-brand-primary/20 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-primary/5 active:scale-95 transition-all">
            <Sparkles size={20} /> ร่างด้วย AI
          </button>
          <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="bg-brand-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all">
            <Send size={20} /> ออกเลขหนังสือส่ง
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">เลขที่ส่ง / วันที่</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">เรื่อง</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ถึงหน่วยงาน</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">สถานะ</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan={5} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-brand-primary" /></td></tr>
            ) : docs.length === 0 ? (
              <tr><td colSpan={5} className="py-20 text-center text-slate-400 italic">ไม่พบข้อมูลหนังสือส่ง</td></tr>
            ) : (
              docs.filter(d => d.subject.includes(searchTerm)).map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 text-sm">{doc.doc_number}</div>
                    <div className="text-[10px] text-slate-400">{doc.doc_date}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">
                    {doc.subject}
                    {doc.status === 'rejected' && (
                      <div className="text-xs font-semibold text-red-500 mt-1">
                        ⚠️ ส่งกลับแก้ไข: {(() => {
                          try {
                            if (doc.remark && doc.remark.startsWith('{')) {
                              const r = JSON.parse(doc.remark);
                              return r.director_opinion || 'ไม่ระบุสาเหตุ';
                            }
                          } catch(e) {}
                          return 'ไม่ระบุสาเหตุ';
                        })()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{doc.to_agency}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      doc.status === 'approved' ? 'bg-green-100 text-green-700' :
                      doc.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      doc.status === 'sent' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {doc.status === 'approved' ? 'ลงนามแล้ว' :
                       doc.status === 'rejected' ? 'ส่งกลับแก้ไข' :
                       doc.status === 'sent' ? 'ส่งแล้ว' :
                       'รอลงนาม'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {isDirector && doc.status === 'pending' && (
                        <button
                          onClick={() => {
                            setSelectedDocForApproval(doc);
                            setDirectorOpinion('');
                            setDirectorDecision('ลงนามอนุมัติ');
                            setIsApprovalModalOpen(true);
                          }}
                          className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors flex items-center gap-1 font-bold text-xs shadow-xs"
                          title="ลงนามและอนุมัติออนไลน์"
                        >
                          ✍️ ลงนาม
                        </button>
                      )}

                      <button onClick={() => printOutgoingDoc(doc)} className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors" title="พิมพ์หนังสือ"><Printer size={18} /></button>
                      {doc.file_url && <a href={doc.file_url} target="_blank" className="p-2 text-slate-400 hover:text-brand-primary"><ExternalLink size={18} /></a>}
                      <button onClick={() => handleDelete(doc.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="ลบข้อมูล"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} title="ร่างหนังสือส่งด้วย AI (เลือกจากหนังสือรับ)">
        <div className="space-y-6">
          <div className="bg-brand-primary/5 p-4 rounded-2xl border border-brand-primary/10 space-y-3">
             <label className="text-xs font-black text-brand-primary uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={14} /> สิ่งที่ต้องการให้ AI ร่าง (รายละเอียดเพิ่มเติม)
             </label>
             <textarea
                className="w-full p-4 bg-white border border-brand-primary/20 rounded-xl font-bold text-slate-700 outline-hidden focus:ring-2 ring-brand-primary/20"
                placeholder="เช่น แจ้งผลการดำเนินงานจัดซื้อพัสดุ หรือ ร่างหนังสือเชิญประชุมคณะกรรมการสถานศึกษา..."
                rows={3}
                value={aiPurpose}
                onChange={e => setAiPurpose(e.target.value)}
             />
             <div className="flex justify-between items-center gap-4">
                <p className="text-[10px] text-slate-400 font-bold italic flex-1">* ระบุรายละเอียดที่ต้องการ แล้วเลือกหนังสือรับด้านล่าง หรือกดปุ่มร่างใหม่โดยตรง</p>
                <button
                  onClick={() => handleAiDraft(null)}
                  disabled={isSaving || !aiPurpose.trim()}
                  className="shrink-0 px-4 py-2 bg-brand-primary text-white rounded-xl font-bold text-xs shadow-lg shadow-green-100 hover:bg-green-700 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  ร่างหนังสือใหม่โดยตรง
                </button>
             </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">เลือกหนังสือรับอ้างถึง:</p>
            <div className="max-h-[40vh] overflow-y-auto space-y-2 pr-2">
              {incomingDocs.length === 0 ? (
                <div className="py-10 text-center text-slate-400 italic">ไม่พบข้อมูลหนังสือรับ</div>
              ) : (
                incomingDocs.map(inc => (
                  <button
                    key={inc.id}
                    onClick={() => handleAiDraft(inc)}
                    className="w-full text-left p-4 bg-slate-50 hover:bg-brand-primary/5 border border-slate-100 rounded-2xl transition-all group"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">เลขที่รับ: {inc.doc_number}</span>
                      <span className="text-[10px] font-bold text-slate-400">{inc.doc_date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-brand-primary transition-colors">{inc.subject}</h4>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">จาก: {inc.from_agency}</p>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="ออกเลขหนังสือส่งและสร้างเอกสาร">
        <form onSubmit={handleSave} className="space-y-4 max-h-[80vh] overflow-y-auto px-1 pb-4 text-slate-700">
          <div className="bg-slate-50 p-4 rounded-2xl space-y-4 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><FileText size={14} /> ข้อมูลหัวหนังสือ</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 ml-1">เลขที่หนังสือส่ง</label>
                <input type="text" placeholder="เช่น ศธ 04225.016/..." className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700" required value={formData.doc_number} onChange={e => setFormData({...formData, doc_number: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 ml-1">ลงวันที่</label>
                <input type="date" className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700" required value={formData.doc_date} onChange={e => setFormData({...formData, doc_date: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 ml-1">เรื่อง</label>
              <input type="text" placeholder="ระบุชื่อเรื่อง" className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 ml-1">เรียน (ผู้รับ)</label>
              <input type="text" placeholder="เช่น ผู้อำนวยการสำนักงานเขต..." className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700" required value={formData.to_agency} onChange={e => setFormData({...formData, to_agency: e.target.value})} />
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 ml-1">อ้างถึง (ถ้ามี)</label>
                <input type="text" placeholder="หนังสือที่อ้างถึง" className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700" value={formData.reference} onChange={e => setFormData({...formData, reference: e.target.value})} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-500 ml-1">สิ่งที่ส่งมาด้วย (ถ้ามี)</label>
                  <button type="button" onClick={addAttachmentRow} className="p-1.5 bg-brand-primary/10 text-brand-primary rounded-lg hover:bg-brand-primary/20 transition-all"><Plus size={14} /></button>
                </div>
                {attachmentsList.map((item, idx) => (
                  <div key={idx} className="flex gap-2 animate-in slide-in-from-left-2">
                    <input
                      type="text"
                      placeholder={`รายการเอกสารแนบที่ ${idx + 1}`}
                      className="flex-1 p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700"
                      value={item}
                      onChange={e => updateAttachment(e.target.value, idx)}
                    />
                    {attachmentsList.length > 1 && (
                      <button type="button" onClick={() => setAttachmentsList(attachmentsList.filter((_, i) => i !== idx))} className="p-3 text-red-400 hover:text-red-500"><X size={16} /></button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 ml-1">เนื้อหาข้อความ (กด Enter เพื่อขึ้นย่อหน้าใหม่)</label>
            <textarea placeholder="พิมพ์เนื้อหาของหนังสือที่นี่..." className="w-full p-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-700" rows={6} value={content} onChange={e => setContent(e.target.value)} />
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl space-y-4 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Send size={14} /> คำลงท้าย</h4>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {[
                'จึงเรียนมาเพื่อทราบ',
                'จึงเรียนมาเพื่อโปรดทราบ',
                'จึงเรียนมาเพื่อพิจารณา',
                'จึงเรียนมาเพื่อโปรดพิจารณา',
                'ไม่ระบุ / ใช้ตามเนื้อหา AI'
              ].map((phrase) => (
                <button
                  key={phrase}
                  type="button"
                  onClick={() => setFormData({ ...formData, closing_phrase: phrase.includes('ไม่ระบุ') ? '' : phrase })}
                  className={`p-3 text-[11px] font-bold rounded-xl border-2 transition-all ${
                    (formData.closing_phrase === phrase || (phrase.includes('ไม่ระบุ') && !formData.closing_phrase))
                      ? 'bg-brand-primary border-brand-primary text-white shadow-md'
                      : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-2xl space-y-4 border border-blue-100/50">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2"><Save size={14} /> ข้อมูลการลงนามและติดต่อ</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-blue-500 ml-1">ชื่อผู้ลงนาม</label>
                <input type="text" className="w-full p-3 bg-white border border-blue-200 rounded-xl font-bold text-slate-700" value={formData.sign_name} onChange={e => setFormData({...formData, sign_name: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-blue-500 ml-1">ตำแหน่ง</label>
                <input type="text" className="w-full p-3 bg-white border border-blue-200 rounded-xl font-bold text-slate-700" value={formData.sign_position} onChange={e => setFormData({...formData, sign_position: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-blue-500 ml-1 text-slate-500 uppercase tracking-tighter">ข้อความส่วนท้ายกระดาษ (จะแสดงในเครื่องหมาย " ")</label>
              <input type="text" placeholder="เช่น เรียนดีมีคุณธรรม" className="w-full p-3 bg-white border border-blue-200 rounded-xl font-black text-slate-800" value={formData.footer_text} onChange={e => setFormData({...formData, footer_text: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-blue-500 ml-1">เบอร์โทรศัพท์ติดต่อ</label>
              <input type="text" className="w-full p-3 bg-white border border-blue-200 rounded-xl font-bold text-slate-700" value={formData.contact_phone} onChange={e => setFormData({...formData, contact_phone: e.target.value})} />
            </div>
          </div>

          <div className="flex items-center gap-4">
             <label className="flex-1 p-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer text-center text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-all">
                <input type="file" className="hidden" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                <div className="text-sm font-bold">{selectedFile ? selectedFile.name : 'แนบไฟล์ฉบับจริง (ถ้ามีอัปโหลดแล้ว)'}</div>
                <div className="text-[10px] opacity-60">รองรับ PDF, JPG, PNG</div>
             </label>
             <button type="button" onClick={() => printOutgoingDoc({...formData, content, attachments: attachmentsList.filter(a => a.trim() !== '')})} className="p-4 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-all">
                <Printer size={20} /> ดูตัวอย่าง
             </button>
          </div>

          {/* สวิตช์เสนอออนไลน์ */}
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest flex items-center gap-1.5"><Send size={14} /> เสนอหนังสือส่งออนไลน์</h4>
              <p className="text-[10px] text-slate-500 font-medium">ส่งให้ผู้อำนวยการลงนามอนุมัติออนไลน์ผ่านระบบและแจ้งเตือนผ่าน LINE</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.online_submit}
                onChange={e => setFormData({ ...formData, online_submit: e.target.checked })}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          <button type="submit" disabled={isSaving} className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-xl shadow-green-100 hover:scale-[1.02] active:scale-95 transition-all">
            {isSaving ? <Loader2 className="animate-spin" /> : <Save />} บันทึกข้อมูลและออกเลข
          </button>
        </form>
      </Modal>

      {/* โมดอลพิจารณาลงนามอนุมัติหนังสือส่งออนไลน์สำหรับ ผอ. */}
      <Modal isOpen={isApprovalModalOpen} onClose={() => setIsApprovalModalOpen(false)} title="ลงนามอนุมัติหนังสือส่งออนไลน์">
        <form onSubmit={handleApprovalSubmit} className="space-y-4 text-slate-700">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">รายละเอียดหนังสือส่ง</p>
            <div className="space-y-1">
              <div className="text-sm font-black text-slate-800">เรื่อง: {selectedDocForApproval?.subject}</div>
              <div className="text-xs font-bold text-slate-500">ถึง: {selectedDocForApproval?.to_agency}</div>
              <div className="text-xs font-bold text-slate-500">เลขที่หนังสือส่ง: {selectedDocForApproval?.doc_number}</div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 ml-1">ผลการพิจารณา</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDirectorDecision('ลงนามอนุมัติ')}
                className={`p-3 rounded-xl font-bold border-2 transition-all text-xs ${directorDecision === 'ลงนามอนุมัติ' ? 'bg-brand-primary border-brand-primary text-white' : 'bg-white text-slate-600 border-slate-100'}`}
              >
                ✍️ อนุมัติและลงนามอิเล็กทรอนิกส์
              </button>
              <button
                type="button"
                onClick={() => setDirectorDecision('ส่งกลับแก้ไข')}
                className={`p-3 rounded-xl font-bold border-2 transition-all text-xs ${directorDecision === 'ส่งกลับแก้ไข' ? 'bg-red-500 border-red-500 text-white' : 'bg-white text-slate-600 border-slate-100'}`}
              >
                ❌ ส่งกลับแก้ไข
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 ml-1">ความคิดเห็นเพิ่มเติม / คำแนะนำในการแก้ไข</label>
            <textarea
              placeholder="พิมพ์ข้อความความคิดเห็นของ ผอ. ที่นี่..."
              className="w-full p-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-700"
              rows={3}
              value={directorOpinion}
              onChange={e => setDirectorOpinion(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setIsApprovalModalOpen(false)}
              className="w-full bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all text-sm"
            >
              ยกเลิก
            </button>
            {directorDecision === 'ลงนามอนุมัติ' ? (
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all text-sm flex items-center justify-center gap-1.5"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
                ยืนยันการอนุมัติและลงนาม
              </button>
            ) : (
              <button
                type="button"
                onClick={handleApprovalReject}
                disabled={isSaving}
                className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all text-sm flex items-center justify-center gap-1.5"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
                ส่งกลับแก้ไข
              </button>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
}
````

## File: src/pages/Teachers.tsx
````typescript
import { useEffect, useState } from 'react';
import { supabase, getActiveSchoolProfile } from '../lib/supabase';
import { uploadFile } from '../lib/storage';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Modal';
import {
  UserPlus,
  Search,
  Users,
  Loader2,
  Save,
  Camera,
  Trash2,
  Edit2,
  Calendar,
  Phone,
  ShieldCheck,
  BookOpen,
  Briefcase
} from 'lucide-react';

type Teacher = {
  id: string;
  prefix: string;
  first_name: string;
  last_name: string;
  position: string;
  department: string;
  subject_group: string;
  phone: string;
  email: string;
  photo_url: string;
  status: string;
  line_user_id?: string;
};

type Duty = {
  id: string;
  teacher_id: string;
  duty_day: string;
  duty_type: string;
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_LABELS: Record<string, string> = {
  'Monday': 'วันจันทร์',
  'Tuesday': 'วันอังคาร',
  'Wednesday': 'วันพุธ',
  'Thursday': 'วันพฤหัสบดี',
  'Friday': 'วันศุกร์',
  'Saturday': 'วันเสาร์',
  'Sunday': 'วันอาทิตย์'
};

export default function Teachers() {
  const { profile } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDutyModalOpen, setIsDutyModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [duties, setDuties] = useState<Duty[]>([]);

  // Form State
  const [formData, setFormData] = useState<any>({
    prefix: 'นาย',
    first_name: '',
    last_name: '',
    position: 'ครู',
    department: '',
    subject_group: '',
    phone: '',
    email: '',
    status: 'active',
    line_user_id: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  async function fetchTeachers() {
    try {
      setLoading(true);

      // 1. ดึงข้อมูลโปรไฟล์ที่ลงทะเบียนและผ่านการอนุมัติแล้วของโรงเรียนนี้ (ยกเว้น guest)
      const activeProfile = getActiveSchoolProfile();
      let dbProfiles: any[] = [];

      // ตรวจสอบโครงสร้าง UUID เพื่อป้องกัน Bad Request 400 ในตาราง profiles
      const isUUID = activeProfile?.id ? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(activeProfile.id) : false;

      if (activeProfile?.id && isUUID) {
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('*')
          .eq('school_id', activeProfile.id)
          .eq('status', 'active')
          .in('role', ['admin', 'director', 'teacher']);
        dbProfiles = profilesData || [];
      }


      const { data: teachersData, error: teachersError } = await supabase
        .from('teachers')
        .select('*')
        .order('first_name', { ascending: true });

      if (teachersError) throw teachersError;

      let currentTeachers = teachersData || [];


      if (dbProfiles.length > 0) {
        const existingEmails = new Set(currentTeachers.map(t => t.email?.toLowerCase().trim()));
        const toInsert: any[] = [];

        dbProfiles.forEach(p => {
          const emailLower = p.email?.toLowerCase().trim();
          if (emailLower && !existingEmails.has(emailLower)) {

            const nameParts = p.display_name ? p.display_name.trim().split(/\s+/) : [];
            const firstName = nameParts[0] || p.email.split('@')[0];
            const lastName = nameParts.slice(1).join(' ') || '-';


            let position = 'ครู';
            if (p.role === 'admin') position = 'ผู้ดูแลระบบ';
            if (p.role === 'director') position = 'ผู้อำนวยการ';


            let prefix = 'นาย';
            if (firstName.startsWith('นางสาว') || firstName.startsWith('น.ส.')) prefix = 'นางสาว';
            else if (firstName.startsWith('นาง')) prefix = 'นาง';


            let cleanFirstName = firstName;
            if (prefix === 'นางสาว' && cleanFirstName.startsWith('นางสาว')) cleanFirstName = cleanFirstName.replace('นางสาว', '');
            else if (prefix === 'นางสาว' && cleanFirstName.startsWith('น.ส.')) cleanFirstName = cleanFirstName.replace('น.ส.', '');
            else if (prefix === 'นาง' && cleanFirstName.startsWith('นาง')) cleanFirstName = cleanFirstName.replace('นาง', '');
            else if (cleanFirstName.startsWith('นาย')) {
              prefix = 'นาย';
              cleanFirstName = cleanFirstName.replace('นาย', '');
            }

            toInsert.push({
              school_id: activeProfile?.id,
              prefix: prefix,
              first_name: cleanFirstName.trim(),
              last_name: lastName.trim(),
              position: position,
              department: 'ทั่วไป',
              phone: '',
              email: emailLower,
              photo_url: '',
              status: 'active',
              line_user_id: p.line_user_id || null
            });
          }
        });


        if (toInsert.length > 0) {
          console.log(`Auto-syncing ${toInsert.length} user profiles into teachers table...`);
          const { error: insertError } = await supabase
            .from('teachers')
            .insert(toInsert);

          if (!insertError) {

            const { data: updatedTeachers } = await supabase
              .from('teachers')
              .select('*')
              .order('first_name', { ascending: true });
            currentTeachers = updatedTeachers || [];
          } else {
            console.error('Error insert auto-sync teachers:', insertError);
          }
        }
      }

      setTeachers(currentTeachers);
    } catch (err) {
      console.error('Error fetching teachers:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      let photoUrl = formData.photo_url;
      if (selectedFile) {
        photoUrl = await uploadFile(selectedFile, 'teachers', 'photos');
      }

      const payload = { ...formData, photo_url: photoUrl };

      if (editingId) {
        const { error } = await supabase.from('teachers').update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('teachers').insert([payload]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      resetForm();
      fetchTeachers();
    } catch (err: any) {
      alert('บันทึกไม่สำเร็จ: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลครูท่านนี้?')) return;
    try {
      const { error } = await supabase.from('teachers').delete().eq('id', id);
      if (error) throw error;
      fetchTeachers();
    } catch (err: any) {
      alert('ลบไม่สำเร็จ: ' + err.message);
    }
  }

  const resetForm = () => {
    setFormData({
      prefix: 'นาย',
      first_name: '',
      last_name: '',
      position: 'ครู',
      department: '',
      subject_group: '',
      phone: '',
      email: '',
      status: 'active',
    });
    setEditingId(null);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const openEditModal = (teacher: Teacher) => {
    setEditingId(teacher.id);
    setFormData(teacher);
    setPreviewUrl(teacher.photo_url);
    setIsModalOpen(true);
  };

  const openDutyModal = async (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDutyModalOpen(true);

    const { data } = await supabase.from('teacher_duties').select('*').eq('teacher_id', teacher.id);
    setDuties(data || []);
  };

  const toggleDuty = async (day: string) => {
    if (!selectedTeacher) return;
    const existing = duties.find(d => d.duty_day === day);
    if (existing) {
      await supabase.from('teacher_duties').delete().eq('id', existing.id);
    } else {
      await supabase.from('teacher_duties').insert([{
        teacher_id: selectedTeacher.id,
        duty_day: day,
        duty_type: 'เวรประจำวัน'
      }]);
    }

    const { data } = await supabase.from('teacher_duties').select('*').eq('teacher_id', selectedTeacher.id);
    setDuties(data || []);
  };

  const filteredTeachers = teachers.filter(t =>
    `${t.first_name} ${t.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.position && t.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (t.department && t.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (t.subject_group && t.subject_group.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const isAdmin = profile?.role === 'admin';
  const isDirector = profile?.role === 'director' || isAdmin;
  const extraPerms = profile?.extra_permissions || {};
  const hasAccess = isDirector || extraPerms.access_hr;

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm">
        <ShieldCheck size={64} className="text-red-200 mb-4" />
        <h3 className="text-xl font-black text-slate-800">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</h3>
        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">กรุณาติดต่อผู้ดูแลระบบเพื่อขอสิทธิ์เข้าใช้งานโมดูลงานบุคคล</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <Users size={32} className="text-brand-primary" />
            ระบบจัดการข้อมูลครู
          </h2>
          <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-xs">Teacher & Staff Information Management</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-brand-primary text-white px-8 py-4 rounded-[24px] font-black text-lg flex items-center gap-3 shadow-2xl shadow-green-200 hover:bg-green-700 active:scale-95 transition-all w-full md:w-auto justify-center"
        >
          <UserPlus size={24} /> เพิ่มข้อมูลครูใหม่
        </button>
      </div>

      {}
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
          <input
            type="text"
            placeholder="ค้นหาชื่อครู, ตำแหน่ง, ฝ่าย หรือกลุ่มสาระ..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm">
          <Loader2 className="animate-spin text-brand-primary mb-4" size={40} />
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">กำลังดึงข้อมูลครู...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeachers.map(teacher => (
            <div key={teacher.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-32 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                {teacher.photo_url ? (
                  <img src={teacher.photo_url} alt={teacher.first_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200"><Users size={48} /></div>
                )}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <button onClick={() => openEditModal(teacher)} className="p-2 bg-white/90 backdrop-blur-sm rounded-xl text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"><Edit2 size={16} /></button>
                  {isAdmin && <button onClick={() => handleDelete(teacher.id)} className="p-2 bg-white/90 backdrop-blur-sm rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"><Trash2 size={16} /></button>}
                </div>
              </div>
              <div className="p-6 text-center -mt-12 relative">
                <div className="w-20 h-20 bg-white rounded-3xl border-4 border-white shadow-lg mx-auto overflow-hidden">
                  {teacher.photo_url ? (
                    <img src={teacher.photo_url} alt={teacher.first_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300"><Users size={32} /></div>
                  )}
                </div>
                <h4 className="mt-4 font-black text-slate-800 text-lg">{teacher.prefix}{teacher.first_name} {teacher.last_name}</h4>
                <div className="flex flex-wrap justify-center gap-1 mt-1">
                  <p className="text-[9px] font-black text-brand-primary uppercase tracking-widest bg-green-50 px-2 py-1 rounded-full border border-green-100">{teacher.position}</p>
                  {teacher.subject_group && (
                    <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 px-2 py-1 rounded-full border border-orange-100">{teacher.subject_group}</p>
                  )}
                  {teacher.department && (
                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-full border border-blue-100">{teacher.department}</p>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                   <div className="flex items-center gap-3 text-slate-400 text-xs font-bold bg-slate-50 p-3 rounded-2xl">
                      <Phone size={14} className="text-slate-300" /> {teacher.phone || '-'}
                   </div>
                   <button
                    onClick={() => openDutyModal(teacher)}
                    className="w-full py-3 bg-slate-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-lg shadow-slate-200"
                   >
                     <Calendar size={14} /> ตั้งค่าวันเวร
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'แก้ไขข้อมูลครู' : 'เพิ่มข้อมูลครูใหม่'}
      >
        <form onSubmit={handleSave} className="space-y-6 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-32 h-32 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group relative">
              {previewUrl ? (
                <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <Users className="text-slate-200" size={48} />
              )}
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedFile(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }} />
                <Camera className="text-white" size={24} />
              </label>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">รูปถ่ายหน้าตรง</p>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">คำนำหน้า</label>
              <select
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary"
                value={formData.prefix}
                onChange={e => setFormData({...formData, prefix: e.target.value})}
              >
                <option>นาย</option>
                <option>นาง</option>
                <option>นางสาว</option>
                <option>ว่าที่ ร.ต.</option>
                <option>ดร.</option>
              </select>
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">ชื่อ</label>
              <input
                type="text"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary"
                value={formData.first_name}
                onChange={e => setFormData({...formData, first_name: e.target.value})}
                required
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">นามสกุล</label>
              <input
                type="text"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary"
                value={formData.last_name}
                onChange={e => setFormData({...formData, last_name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">ตำแหน่ง</label>
              <input
                type="text"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary"
                value={formData.position}
                onChange={e => setFormData({...formData, position: e.target.value})}
              />
              <div className="flex flex-wrap gap-1 mt-1">
                {['ผู้อำนวยการ', 'รองผู้อำนวยการ', 'ครู', 'ครูผู้ช่วย', 'เจ้าหน้าที่การเงิน'].map(p => (
                  <button key={p} type="button" onClick={() => setFormData({...formData, position: p})} className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md hover:bg-brand-primary hover:text-white transition-colors">{p}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest flex items-center gap-1">
                  <BookOpen size={10} /> กลุ่มสาระการเรียนรู้
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary"
                  value={formData.subject_group}
                  onChange={e => setFormData({...formData, subject_group: e.target.value})}
                  placeholder="เช่น ภาษาไทย"
                />
                <div className="flex flex-wrap gap-1 mt-1">
                  {['ภาษาไทย', 'คณิตศาสตร์', 'วิทยาศาสตร์และเทคโนโลยี', 'สังคมศึกษา ศาสนา และวัฒนธรรม', 'สุขศึกษาและพลศึกษา', 'ศิลปะ', 'การงานอาชีพ', 'ภาษาต่างประเทศ', 'ปฐมวัย'].map(s => (
                    <button key={s} type="button" onClick={() => setFormData({...formData, subject_group: s})} className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md hover:bg-orange-500 hover:text-white transition-colors">{s}</button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest flex items-center gap-1">
                  <Briefcase size={10} /> ฝ่าย / งานที่รับผิดชอบ
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary"
                  value={formData.department}
                  onChange={e => setFormData({...formData, department: e.target.value})}
                  placeholder="เช่น หัวหน้าฝ่ายงบประมาณ"
                />
                <div className="flex flex-wrap gap-1 mt-1">
                  {['หัวหน้าฝ่ายวิชาการ', 'หัวหน้าฝ่ายงบประมาณ', 'หัวหน้าฝ่ายบริหารทั่วไป', 'หัวหน้าฝ่ายบุคคล', 'เจ้าหน้าที่การเงิน', 'เจ้าหน้าที่พัสดุ'].map(d => (
                    <button key={d} type="button" onClick={() => setFormData({...formData, department: d})} className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md hover:bg-blue-500 hover:text-white transition-colors">{d}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">เบอร์โทรศัพท์</label>
              <input
                type="text"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">อีเมล</label>
              <input
                type="email"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-brand-primary">LINE User ID (สำหรับแจ้งเตือนส่วนบุคคล)</label>
            <input
              type="text"
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
              value={formData.line_user_id}
              onChange={e => setFormData({...formData, line_user_id: e.target.value})}
              placeholder="ใส่ LINE User ID (เช่น U123456...)"
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-8 py-4 border border-slate-200 text-slate-400 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-8 py-4 bg-brand-primary text-white font-black rounded-2xl hover:bg-green-700 transition-all shadow-lg shadow-green-100 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      </Modal>

      {}
      <Modal
        isOpen={isDutyModalOpen}
        onClose={() => setIsDutyModalOpen(false)}
        title={`ตั้งค่าวันเวร: ${selectedTeacher?.prefix}${selectedTeacher?.first_name}`}
      >
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
             <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-brand-primary" /> เลือกวันปฏิบัติหน้าที่
             </h4>
             <div className="grid grid-cols-1 gap-3">
                {DAYS.map(day => {
                  const isActive = duties.some(d => d.duty_day === day);
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDuty(day)}
                      className={`flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${isActive ? 'bg-brand-primary text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:border-brand-primary'}`}
                    >
                      <span>{DAY_LABELS[day]}</span>
                      {isActive && <ShieldCheck size={20} />}
                    </button>
                  );
                })}
             </div>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase text-center">ข้อมูลจะถูกบันทึกและแสดงผลที่หน้าแดชบอร์ดโดยอัตโนมัติ</p>
        </div>
      </Modal>
    </div>
  );
}
````

## File: src/contexts/AuthContext.tsx
````typescript
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  display_name: string;
  email: string;
  role: 'admin' | 'director' | 'teacher' | 'guest';
  status: string;
  school_id?: string | null;
  school_code?: string | null;
  signature_url?: string;
  line_user_id?: string;
  extra_permissions?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}


export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  session: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {

      const cachedProfile = localStorage.getItem(`profile_${userId}`);
      if (cachedProfile && !profile) {
        setProfile(JSON.parse(cachedProfile));
      }


      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (!error && data) {
        setProfile(data);
        localStorage.setItem(`profile_${userId}`, JSON.stringify(data));


        if (data.school_id) {
          localStorage.setItem('active_school_id', data.school_id);

          const profilesJson = localStorage.getItem('school_profiles');
          let profilesList: any[] = [];
          try {
            profilesList = profilesJson ? JSON.parse(profilesJson) : [];
          } catch (e) {
            profilesList = [];
          }

          const hasSchool = profilesList.some((p: any) => p.id === data.school_id);
          if (!hasSchool) {
            supabase
              .from('schools')
              .select('school_name, gas_url')
              .eq('id', data.school_id)
              .maybeSingle()
              .then(({ data: schoolData }) => {
                if (schoolData) {
                  const schoolProfile = {
                    id: data.school_id,
                    name: schoolData.school_name,
                    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
                    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
                    vercelUrl: import.meta.env.VITE_VERCEL_URL || window.location.origin,
                    gasUrl: schoolData.gas_url || import.meta.env.VITE_GAS_URL || ''
                  };
                  profilesList.push(schoolProfile);
                  localStorage.setItem('school_profiles', JSON.stringify(profilesList));
                  import('../lib/supabase').then(m => m.initSupabase());
                }
              });
          }
        }
      } else if (!data) {


        console.log('No profile row found, initiating safety auto-creation...');

        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          const userEmail = currentUser.email || '';
          let userRole: 'admin' | 'director' | 'teacher' | 'guest' = 'teacher';
          let targetSchoolId = localStorage.getItem('active_school_id') || null;


          let isUUID = targetSchoolId ? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(targetSchoolId) : false;
          if (!isUUID) {

            const { data: firstSchool } = await supabase
              .from('schools')
              .select('id')
              .limit(1)
              .maybeSingle();

            if (firstSchool?.id) {
              targetSchoolId = firstSchool.id;
              localStorage.setItem('active_school_id', firstSchool.id);
              isUUID = true;
            } else {
              targetSchoolId = null;
            }
          }


          const superAdminEmail = (import.meta.env.VITE_SUPER_ADMIN_EMAIL || 'ncrows77@gmail.com').toLowerCase();
          if (userEmail.toLowerCase() === superAdminEmail) {
            userRole = 'admin';
          } else if (targetSchoolId) {

            const { data: schoolData } = await supabase
              .from('schools')
              .select('id, admin_email')
              .eq('id', targetSchoolId)
              .maybeSingle();

            if (schoolData && schoolData.admin_email?.toLowerCase() === userEmail.toLowerCase()) {
              userRole = 'admin';
            }
          }

          const fallbackProfile = {
            id: currentUser.id,
            school_id: targetSchoolId,
            display_name: currentUser.user_metadata?.display_name || userEmail.split('@')[0],
            email: userEmail,
            role: userRole,
            status: 'active'
          };


          const { error: insertError } = await supabase
            .from('profiles')
            .insert([fallbackProfile]);

          if (!insertError) {
            setProfile(fallbackProfile);
            localStorage.setItem(`profile_${userId}`, JSON.stringify(fallbackProfile));
            console.log('Safety profile auto-created successfully:', fallbackProfile);
          } else {
            console.error('Failed to create safety profile:', insertError);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });


    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error('Error during Supabase signOut:', e);
    }

    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('sb-') || key.startsWith('profile_') || key.includes('auth-token'))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch (err) {
      console.error('Error clearing localStorage:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
````

## File: src/pages/Settings.tsx
````typescript
import { useEffect, useState } from 'react';
import { supabase, getActiveSchoolProfile, getSchoolProfiles } from '../lib/supabase';
import { uploadToSupabase, uploadFileToDrive, deleteFromSupabase } from '../lib/storage';
import {
  Save,
  Loader2,
  School,
  CalendarDays,
  UserCircle,
  ImageIcon,
  Upload,
  Send,
  Sparkles,
  Info
} from 'lucide-react';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    school_name: '',
    school_address: '',
    director_name: '',
    current_academic_year: '2568',
    current_term: '1',
    school_logo_url: '',
    director_signature_url: '',
    phone_number: '',
    local_gov_name: '',
    line_channel_access_token: '',
    line_group_id: '',
    line_oa_link: '',
    gemini_api_key: '',
    ai_cowork_api_key: '',
    gas_url: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSignature, setSelectedSignature] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [sigPreviewUrl, setSigPreviewUrl] = useState<string | null>(null);
  const [showGasModal, setShowGasModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState('');
  const [migrationProgress, setMigrationProgress] = useState(0);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      setLoading(true);

      const activeProfile = getActiveSchoolProfile();
      const isUUID = activeProfile?.id ? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(activeProfile.id) : false;

      if (!activeProfile?.id || !isUUID) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('school_id', activeProfile.id)
        .maybeSingle();

      if (error) throw error;


      let gasUrl = '';
      const { data: schoolData } = await supabase
        .from('schools')
        .select('gas_url')
        .eq('id', activeProfile.id)
        .maybeSingle();
      if (schoolData) {
        gasUrl = schoolData.gas_url || '';
      }

      if (data) {
        setSettings({
          ...data,
          gas_url: gasUrl
        });
        setPreviewUrl(data.school_logo_url);
        setSigPreviewUrl(data.director_signature_url);
      } else {
        setSettings(prev => ({
          ...prev,
          school_id: activeProfile.id,
          gas_url: gasUrl
        }));
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleFormatLineOa = () => {
    let rawOa = settings.line_oa_link ? settings.line_oa_link.trim() : '';
    if (rawOa && !rawOa.startsWith('http:
      const cleanId = rawOa.startsWith('@') ? rawOa.substring(1) : rawOa;
      const formattedUrl = `https://line.me/R/ti/p/@${cleanId}`;
      setSettings({
        ...settings,
        line_oa_link: formattedUrl
      });
    }
  };

  const handleMigrateOldFiles = async () => {
    if (!confirm('ยืนยันที่จะโอนย้ายไฟล์เอกสารที่เคยเกษียณผ่าน LINE ในอดีตเข้า Google Drive หรือไม่? (ระบบจะค้นหาและย้ายไฟล์ให้เฉพาะเอกสารที่เก็บอยู่ใน Supabase ชั่วคราว)')) return;
    setIsMigrating(true);
    setMigrationStatus('กำลังค้นหาเอกสารเก่า...');
    setMigrationProgress(0);

    try {

      const { data: docs, error } = await supabase
        .from('incoming_docs')
        .select('id, doc_number, subject, file_url')
        .eq('status', 'assigned');

      if (error) throw error;


      const targetDocs = (docs || []).filter(doc => doc.file_url && doc.file_url.includes('supabase.co'));

      if (targetDocs.length === 0) {
        setMigrationStatus('🎉 ไม่พบไฟล์เอกสารค้างใน Supabase แล้ว! เอกสารทั้งหมดอยู่ใน Google Drive เรียบร้อยดีค่ะ');
        setIsMigrating(false);
        return;
      }

      let successCount = 0;
      for (let i = 0; i < targetDocs.length; i++) {
        const doc = targetDocs[i];
        setMigrationStatus(`[${i + 1}/${targetDocs.length}] กำลังย้ายเรื่อง: "${doc.subject.substring(0, 30)}..."`);

        try {

          const response = await fetch(doc.file_url);
          if (!response.ok) throw new Error('ดาวน์โหลดไฟล์จาก Supabase ล้มเหลว');
          const blob = await response.blob();


          const sanitized = doc.subject.replace(/[\/\\?%*:|"<>]/g, '-').slice(0, 50);
          const fileName = `${doc.doc_number}_เรื่อง_${sanitized}.pdf`;
          const file = new File([blob], fileName, { type: 'application/pdf' });

          // 3. ส่งเข้า Google Drive
          const gDriveUrl = await uploadFileToDrive(file, 'incoming', fileName.replace('.pdf', ''));

          // 4. อัปเดตใน Supabase Database
          const { error: updateErr } = await supabase
            .from('incoming_docs')
            .update({ file_url: gDriveUrl })
            .eq('id', doc.id);

          if (updateErr) throw updateErr;

          // 5. ลบไฟล์เดิมใน Supabase Storage
          const tempPath = doc.file_url.split('/').pop()?.split('?')[0];
          if (tempPath) {
            await deleteFromSupabase('temp_docs', tempPath);
          }

          successCount++;
        } catch (err: any) {
          console.error(`Failed to migrate doc ID ${doc.id}:`, err);
        }
        setMigrationProgress(Math.round(((i + 1) / targetDocs.length) * 100));
      }

      setMigrationStatus(`✅ โอนย้ายไฟล์เอกสารเก่าสำเร็จ ${successCount} จากทั้งหมด ${targetDocs.length} รายการแล้วค่ะ 🌸`);
    } catch (err: any) {
      setMigrationStatus(`❌ เกิดข้อผิดพลาดในการโอนย้าย: ${err.message}`);
    } finally {
      setIsMigrating(false);
    }
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    try {
      let logoUrl = settings.school_logo_url;
      let sigUrl = settings.director_signature_url;

      // ตั้งชื่อไฟล์ใหม่เป็นภาษาอังกฤษเพื่อป้องกันปัญหา Invalid Key จากภาษาไทย
      if (selectedFile) {
        const logoExt = selectedFile.name.split('.').pop() || 'png';
        const logoPath = `school_logo_${Date.now()}.${logoExt}`;
        logoUrl = await uploadToSupabase(selectedFile, 'system', logoPath);
      }

      if (selectedSignature) {
        const sigExt = selectedSignature.name.split('.').pop() || 'png';
        const sigPath = `director_sig_${Date.now()}.${sigExt}`;
        sigUrl = await uploadToSupabase(selectedSignature, 'system', sigPath);
      }

      // จัดรูปแบบ LINE OA Link อัตโนมัติ (หากผู้ใช้ใส่เฉพาะ ID)
      let formattedLineOa = settings.line_oa_link ? settings.line_oa_link.trim() : '';
      if (formattedLineOa && !formattedLineOa.startsWith('http://') && !formattedLineOa.startsWith('https://')) {
        const cleanId = formattedLineOa.startsWith('@') ? formattedLineOa.substring(1) : formattedLineOa;
        formattedLineOa = `https://line.me/R/ti/p/@${cleanId}`;
      }

      const activeProfile = getActiveSchoolProfile();
      const isUUID = activeProfile?.id ? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(activeProfile.id) : false;
      if (!activeProfile?.id || !isUUID) {
        alert('ไม่พบรหัสโรงเรียนที่ถูกต้อง กรุณาลงชื่อเข้าใช้งานใหม่อีกครั้ง');
        return;
      }

      // แยก gas_url ออกจาก payload ของตาราง settings
      const { gas_url, ...settingsPayload } = settings;

      const payload = {
        ...settingsPayload,
        school_id: activeProfile.id,
        line_oa_link: formattedLineOa,
        school_logo_url: logoUrl,
        director_signature_url: sigUrl
      };

      const { data: existing } = await supabase
        .from('settings')
        .select('id')
        .eq('school_id', activeProfile.id)
        .maybeSingle();

      const { error } = existing
        ? await supabase.from('settings').update(payload).eq('id', existing.id)
        : await supabase.from('settings').insert([payload]);

      if (error) throw error;

      // อัปเดตตาราง schools
      const { error: schoolError } = await supabase
        .from('schools')
        .update({ gas_url: gas_url ? gas_url.trim() : null })
        .eq('id', activeProfile.id);

      if (schoolError) console.error('Failed to update gas_url in schools:', schoolError);

        // อัปเดต LocalStorage เพื่อให้ระบบรับรู้ทันทีโดยไม่ต้องเข้าสู่ระบบใหม่
        const profiles = getSchoolProfiles();
        const updatedProfiles = profiles.map((p: any) => {
          if (p.id === activeProfile.id) {
            return { ...p, gasUrl: gas_url ? gas_url.trim() : '' };
          }
          return p;
        });
        localStorage.setItem('school_profiles', JSON.stringify(updatedProfiles));

        // โหลด Client Supabase ใหม่
        import('../lib/supabase').then(m => m.initSupabase());

      alert('บันทึกการตั้งค่าเรียบร้อยแล้ว');
      fetchSettings();
    } catch (err: any) {
      console.error(err);
      alert('บันทึกไม่สำเร็จ: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedSignature(file);
      setSigPreviewUrl(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm">
        <Loader2 className="animate-spin text-brand-primary mb-4" size={40} />
        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">กำลังโหลดข้อมูลการตั้งค่า...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <form onSubmit={handleSave} className="space-y-8">
        {}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm">
              <School size={24} />
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">ข้อมูลสถานศึกษา</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">School Identity & Profile</p>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-brand-primary">ชื่อโรงเรียน</label>
              <input
                type="text"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
                value={settings.school_name || ''}
                onChange={e => setSettings({...settings, school_name: e.target.value})}
                placeholder="โรงเรียน..."
                required
              />
            </div>

            <div className="col-span-full space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-brand-primary">ที่อยู่โรงเรียน</label>
              <textarea
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
                rows={3}
                value={settings.school_address || ''}
                onChange={e => setSettings({...settings, school_address: e.target.value})}
                placeholder="ที่อยู่..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-brand-primary">ชื่อผู้อำนวยการ</label>
              <div className="relative">
                <UserCircle className="absolute left-4 top-4 text-slate-300" size={20} />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
                  value={settings.director_name || ''}
                  onChange={e => setSettings({...settings, director_name: e.target.value})}
                  placeholder="นาย/นาง/นางสาว..."
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-brand-primary">ต้นสังกัด/องค์กรปกครองส่วนท้องถิ่น</label>
              <input
                type="text"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
                value={settings.local_gov_name || ''}
                onChange={e => setSettings({...settings, local_gov_name: e.target.value})}
                placeholder="สพป.พัทลุง เขต 2 / ทต..."
              />
            </div>

            <div className="col-span-full space-y-1.5 pt-4 border-t border-slate-50">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-brand-primary">
                  Google Drive Web App (GAS URL) สำหรับเชื่อมข้อมูลและเก็บไฟล์ประจำโรงเรียน
                </label>
                <button
                  type="button"
                  onClick={() => setShowGasModal(true)}
                  className="text-[10px] text-brand-primary font-black hover:underline uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                >
                  📖 ดูคู่มือและโค้ดติดตั้ง
                </button>
              </div>
              <input
                type="url"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all text-xs font-sans"
                value={settings.gas_url || ''}
                onChange={e => setSettings({...settings, gas_url: e.target.value})}
                placeholder="https://script.google.com/macros/s/AKfycb.../exec"
              />
              <p className="text-[10px] text-slate-400 font-bold ml-1 uppercase leading-relaxed">
                * ใช้สำหรับการอัปโหลดและจัดเก็บเอกสารราชการเข้า Google Drive ประจำโรงเรียนของคุณครูเอง
                (หากเว้นว่างไว้ ระบบจะย้อนกลับไปใช้ Google Drive ส่วนกลางของแอดมินโครงการหลักโดยอัตโนมัติ)
              </p>
            </div>

            <div className="col-span-full space-y-4 pt-4 border-t border-slate-50">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <Send size={16} className="text-brand-primary" /> การตั้งค่า LINE Messaging API
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-brand-primary">Channel Access Token</label>
                  <input
                    type="password"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
                    value={settings.line_channel_access_token || ''}
                    onChange={e => setSettings({...settings, line_channel_access_token: e.target.value})}
                    placeholder="ใส่ Long-lived Channel Access Token..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-brand-primary">Group ID (สำหรับแจ้งเตือนส่วนกลาง)</label>
                  <input
                    type="text"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
                    value={settings.line_group_id || ''}
                    onChange={e => setSettings({...settings, line_group_id: e.target.value})}
                    placeholder="เช่น C1234567890abcdef..."
                  />
                </div>
                <div className="col-span-full space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-[#06C755]">ลิงก์เพิ่มเพื่อน LINE OA (เช่น https://line.me/R/ti/p/@...)</label>
                  <input
                    type="text"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-[#06C755]/10 focus:border-[#06C755] transition-all"
                    value={settings.line_oa_link || ''}
                    onChange={e => setSettings({...settings, line_oa_link: e.target.value})}
                    onBlur={handleFormatLineOa}
                    placeholder="ใส่ลิงก์ LINE OA หรือ LINE ID ของบอท เช่น @mybot..."
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-bold ml-1 uppercase">Messaging API จะถูกนำมาใช้แทน LINE Notify ที่กำลังจะปิดตัวลง</p>
            </div>
          </div>
        </div>

        {/* Section: Gemini AI API */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">การตั้งค่า AI (Gemini API)</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">AI Summary & Document Processing</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-indigo-600">Gemini API Key (หลัก)</label>
              <input
                type="password"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                value={settings.gemini_api_key || ''}
                onChange={e => setSettings({...settings, gemini_api_key: e.target.value})}
                placeholder="ใส่ Gemini API Key หลัก (หากมีหลายคีย์ ให้คั่นด้วยเครื่องหมายจุลภาค , )"
              />
              <p className="text-[10px] text-slate-400 font-bold ml-1 uppercase">ใช้สำหรับการสรุปเนื้อหาหนังสือราชการ (งานสารบรรณ) *รองรับการใส่หลายคีย์คั่นด้วยเครื่องหมายจุลภาคเพื่อกระจายโหลดและป้องกัน Rate Limit</p>
            </div>

            <div className="space-y-1.5 pt-4 border-t border-slate-50">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-brand-primary">AI Cowork API Key (เฉพาะส่วนผู้ช่วยครู)</label>
              <input
                type="password"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-green-100 focus:border-brand-primary transition-all"
                value={settings.ai_cowork_api_key || ''}
                onChange={e => setSettings({...settings, ai_cowork_api_key: e.target.value})}
                placeholder="ใส่ API Key แยกสำหรับ AI Cowork (หากมีหลายคีย์ ให้คั่นด้วยเครื่องหมายจุลภาค , )"
              />
              <p className="text-[10px] text-slate-400 font-bold ml-1 uppercase italic">* แนะนำให้แยก Key หรือใส่หลายคีย์คั่นด้วยเครื่องหมายจุลภาค ( , ) เพื่อกระจายการทำงานไม่ให้กระทบงานสารบรรณเมื่อคุณครูใช้งานพร้อมกันจำนวนมาก</p>
            </div>
          </div>

        </div>

        {/* Section: Academic Year & Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30">
              <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
                <CalendarDays size={24} />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">ปีการศึกษาปัจจุบัน</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Active Academic Term</p>
              </div>
            </div>
            <div className="p-8 space-y-6 flex-1">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-orange-600">ปีการศึกษา (พ.ศ.)</label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-2xl text-slate-700 text-center outline-hidden focus:ring-2 focus:ring-orange-200 focus:border-orange-500 transition-all"
                  value={settings.current_academic_year}
                  onChange={e => setSettings({...settings, current_academic_year: e.target.value})}
                  placeholder="256X"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest text-orange-600">ภาคเรียน</label>
                <div className="grid grid-cols-2 gap-4">
                  {['1', '2'].map(term => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setSettings({...settings, current_term: term})}
                      className={`py-4 rounded-2xl font-black text-xl transition-all ${settings.current_term === term ? 'bg-orange-500 text-white shadow-lg shadow-orange-100 ring-4 ring-orange-50' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'}`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                <ImageIcon size={24} />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">ตราสัญลักษณ์โรงเรียน</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">School Logo & Branding</p>
              </div>
            </div>
            <div className="p-8 flex flex-col items-center justify-center gap-6">
              <div className="w-32 h-32 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group relative">
                {previewUrl ? (
                  <img src={previewUrl} className="w-full h-full object-contain p-2" alt="Preview" />
                ) : (
                  <School className="text-slate-200" size={48} />
                )}
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  <Upload className="text-white" size={24} />
                </label>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase text-center leading-relaxed max-w-[200px]">
                รองรับไฟล์ PNG, JPG <br/>ขนาดแนะนำ 512x512 พิกเซล
              </p>
            </div>
          </div>
        </div>

        {}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
              <UserCircle size={24} />
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">ลายเซ็นดิจิทัลผู้อำนวยการ</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Digital Signature Image</p>
            </div>
          </div>
          <div className="p-8 flex flex-col items-center justify-center gap-6">
            <div className="w-64 h-32 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group relative">
              {sigPreviewUrl ? (
                <img src={sigPreviewUrl} className="w-full h-full object-contain p-4" alt="Signature Preview" />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="text-slate-300" size={32} />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">คลิกเพื่ออัปโหลดลายเซ็น</span>
                </div>
              )}
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <input type="file" className="hidden" accept="image/*" onChange={handleSignatureChange} />
                <Upload className="text-white" size={24} />
              </label>
            </div>
            <div className="max-w-md space-y-2">
              <p className="text-[10px] text-slate-400 font-bold uppercase text-center leading-relaxed">
                แนะนำ: ไฟล์ PNG พื้นหลังโปร่งใส (Transparent) <br/>
                จะช่วยให้ลายเซ็นดูสมจริงเมื่อประทับทับเส้นประในเอกสาร PDF
              </p>
              {sigPreviewUrl && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => { setSelectedSignature(null); setSigPreviewUrl(null); setSettings({...settings, director_signature_url: ''}); }}
                    className="text-[10px] font-black text-red-400 uppercase hover:text-red-500 transition-colors"
                  >
                    ลบลายเซ็นเดิม
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-brand-primary text-white px-12 py-4.5 rounded-[24px] font-black text-xl flex items-center gap-3 shadow-2xl shadow-green-200 hover:bg-green-700 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
            บันทึกการตั้งค่าทั้งหมด
          </button>
        </div>
      </form>

      {/* Section: System Migration Tools */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden mb-8 mt-8">
        <div className="p-8 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">เครื่องมือจัดการเอกสารย้อนหลัง</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Document Sync & Migration Tools</p>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100/50">
            <h4 className="font-black text-slate-800 text-sm flex items-center gap-2">
              🔄 โอนย้ายไฟล์เอกสารที่สั่งการผ่าน LINE ในอดีตเข้า Google Drive
            </h4>
            <p className="text-xs text-slate-500 font-bold mt-2 leading-relaxed">
              สำหรับไฟล์ PDF ที่ผู้อำนวยการเคยสั่งการหรือเกษียณหนังสือผ่านระบบ LINE OA ก่อนการอัปเดตระบบ
              ไฟล์เหล่านั้นจะยังคงเก็บค้างอยู่ในระบบจัดเก็บชั่วคราว (Supabase Storage)
              ท่านสามารถใช้เครื่องมือนี้ในการสแกนดึงไฟล์เก่าทั้งหมดเหล่านั้นไปจัดเก็บถาวรใน Google Drive และอัปเดตลิงก์ในระบบให้ถูกต้องโดยอัตโนมัติ
            </p>

            {migrationStatus && (
              <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <p className="text-xs font-bold text-slate-600">{migrationStatus}</p>
                {isMigrating && (
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${migrationProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 flex items-center justify-end">
              <button
                type="button"
                onClick={handleMigrateOldFiles}
                disabled={isMigrating}
                className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isMigrating ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    กำลังโอนย้ายไฟล์... ({migrationProgress}%)
                  </>
                ) : (
                  <>
                    <span>เริ่มโอนย้ายไฟล์ไป Google Drive</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section: About & Changelog */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
            <Info size={24} />
          </div>
          <div>
            <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">เกี่ยวกับระบบ (About System)</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Version info & update history</p>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-50 rounded-3xl">
            <div>
              <h4 className="font-black text-slate-800 text-md">Smart School Admin (V2)</h4>
              <p className="text-xs text-slate-500 font-bold mt-1">ระบบบริหารจัดการข้อมูลโรงเรียน</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">เวอร์ชันปัจจุบัน:</span>
              <span className="px-4 py-1.5 bg-blue-100 text-blue-700 font-black rounded-full text-xs">
                {import.meta.env.VITE_APP_VERSION || '1.1.13'}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-slate-800 text-sm border-l-4 border-brand-primary pl-3 uppercase tracking-tight">ประวัติการปรับปรุง (Changelog)</h4>
            <div className="space-y-3 pl-4">
              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">v1.1.14</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(24 มิ.ย. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>เพิ่มโมดูลย่อย <strong>"ส่งแผนการสอน"</strong> ของฝ่ายวิชาการ อนุมัติโดย ผอ./วิชาการ พร้อมพิมพ์แบบคำขอเสนออนุมัติขนาด A4 มีตราครุฑตามระเบียบงานสารบรรณ</li>
                  <li>อัปเกรดระบบลงทะเบียนนักกีฬา (ระดับจังหวัด): แปลงตัวเลขในเอกสารเป็น <strong>"ตัวเลขไทย"</strong> อัตโนมัติ ปรับปรุงหน้าสิ่งพิมพ์บังคับขนาด 16pt (TH Sarabun) และลดระยะห่างกล่องลงชื่อ ผอ. เพื่อความสมบูรณ์</li>
                  <li>แก้ไขปัญหาหน้าสิ่งพิมพ์ของนักกีฬาเกิดหน้าว่างหน้าสุดท้าย ด้วยการซ่อนแถบเครดิตและโลโก้ท้ายระบบ (IdentityFooter) ขณะสั่งพิมพ์</li>
                  <li>แก้ไขการตรวจสอบข้อมูลเพศของนักเรียน รองรับคำนำหน้าย่อ <code>"ช"</code> และ <code>"ญ"</code> เพื่อป้องกันการแสดงผลผิดพลาด</li>
                  <li>ปรับปรุงสิทธิ์การเข้าใช้งาน: แยกเมนูของครูทั่วไปเป็น <strong>"งานแผนการสอน"</strong> (เข้าถึงเฉพาะส่งแผน) และซ่อนเมนูวิชาการอื่นๆ รวมถึงระบบห้องสมุด</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">v1.1.13</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(18 มิ.ย. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>เพิ่มระบบโมดูล <strong>เด็กในเขตพื้นที่บริการ (ทร.14/พฐ.03)</strong> นำเข้าข้อมูล จัดเรียงตามหมู่และ ก-ฮ พร้อมส่งออก พฐ.03 แนวนอน</li>
                  <li>แก้ไขสิทธิ์ระบบเบิกค่าสาธารณูปโภค ให้ ผอ. และแอดมิน อนุมัติ/ลบรายการเบิกจ่ายของทุกคนได้สำเร็จ (แก้บั๊ก RLS บล็อก)</li>
                  <li>ปิดช่องโหว่ความปลอดภัยบน Supabase: เปิด RLS ตารางจัดสรรงบประมาณ และจำกัดสิทธิ์ SELECT ตาราง <code>profiles</code> และ <code>settings</code> ให้เฉพาะคนที่ล็อกอินแล้วเท่านั้น</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">v1.1.12</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(16 มิ.ย. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>ปรับโมเดล AI หลักเป็น <strong>gemini-3.1-flash-lite</strong> เพื่อแก้ไขข้อจำกัด Rate Limit (โควต้ารายวัน 500 RPD) สำหรับบัญชี Free Tier</li>
                  <li>แก้ไขปัญหา Error 400 จาก Google Server โดยเปลี่ยนพารามิเตอร์ส่งข้อมูลกลับเป็น CamelCase <code>responseMimeType</code> และ <code>systemInstruction</code></li>
                  <li>แก้ไขระบบการจัดเก็บข้อมูลออนไลน์ด่าน AR บังคับใช้รหัส UUID v4 ป้องกันข้อผิดพลาดของ Supabase</li>
                  <li>แยกสิทธิ์จัดการบทเรียน AR: ครูวิชาการ/ผอ. จัดการบทเรียนทั้งหมดได้ ครูทั่วไปจัดการได้เฉพาะของตนเอง</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">v1.1.9</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(16 มิ.ย. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>ปรับปรุงสิทธิ์หน้าจอเมนูควบคุม AR Algorithm ให้รองรับการเข้าถึงของคุณครูทุกคน</li>
                  <li>แก้ไขระบบสแกนกล้องเว็บแคมในโหมด AR หากหาอุปกรณ์ไม่พบจะสลับมาใช้โหมดเมาส์/สัมผัสทันทีโดยไม่มีหน้าต่างแจ้งเตือน Error ขวางกั้น</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">v1.1.7 - v1.1.8</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(15-16 มิ.ย. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>พัฒนาระบบบอร์ดด่านการเรียนรู้ AR Algorithm "น้องชบาพาพิชิต" รูปแบบใหม่</li>
                  <li>เชื่อมต่อโครงสร้างระบบฐานข้อมูลตาราง <code>ar_lessons</code> และ <code>ar_steps</code> ออนไลน์บน Supabase</li>
                  <li>เพิ่มฟังก์ชันน้องชบาช่วยประมวลผลคิดออกแบบด่าน AR ผ่านทาง Gemini AI</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">v1.1.6</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(9 มิ.ย. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>ปรับปรุงระบบตราประทับ ผอ. ในการเกษียณสั่งการ ให้ดึงข้อมูลชื่อโรงเรียนจากหน้าตั้งค่าโดยอัตโนมัติ (Dynamic School Name on Stamping)</li>
                  <li>แยกการแสดงผลและข้อมูลอย่างเป็นอิสระ 100% สำหรับการใช้งานระบบ Multi-School ของแต่ละสถานศึกษา</li>
                  <li>เผยแพร่และอัปโหลดไฟล์ตัวติดตั้งเดสก์ท็อป (Windows Setup) v1.1.6 ขึ้นสู่ GitHub Releases</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">v1.1.5</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(8 มิ.ย. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>แก้ไขปัญหาตำแหน่งผู้อำนวยการโรงเรียนในตราประทับเกษียณ ผอ. ของโรงเรียนที่ 2 ไม่ให้มีชื่อโรงเรียนแรกปะปน</li>
                  <li>เพิ่มระบบการส่งไฟล์ที่สแตมป์เกษียณผ่าน LINE ไปจัดเก็บถาวรใน Google Drive ประจำแต่ละโรงเรียนโดยอัตโนมัติ</li>
                  <li>ติดตั้งเครื่องมือโอนย้ายไฟล์ประวัติเอกสารย้อนหลังที่เกษียณผ่าน LINE เข้าสู่ Google Drive ในหน้าตั้งค่า</li>
                  <li>เพิ่มคอลัมน์เลือกพิมพ์รายชื่อนักเรียนแบบกำหนดเอง ได้แก่ ชื่อบิดา, ชื่อมารดา, ศาสนา และสถานะความด้อยโอกาส</li>
                  <li>แก้ไขบั๊กการนำเข้าข้อมูลนักเรียน (Import Excel) ให้คำนำหน้าและชื่อจริงของผู้ปกครอง บิดา มารดา รวมกันได้อย่างถูกต้อง</li>
                  <li>เผยแพร่และอัปโหลดไฟล์ตัวติดตั้งเดสก์ท็อป (Windows Setup) v1.1.5 ขึ้นสู่ GitHub Releases</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">v1.1.4</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(28-29 พ.ค. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>ปรับปรุงระบบสิทธิ์ของครู (Teacher) แยกสิทธิ์พื้นฐานและสิทธิ์พิเศษ</li>
                  <li>เพิ่มสิทธิ์พิเศษตัวใหม่สำหรับงานวิชาการ (`access_academic`) และงานงบประมาณ (`access_finance`)</li>
                  <li>ติดตั้งระบบ Double-Gate Verification ดีดผู้ใช้กลับหน้าแดชบอร์ดอัตโนมัติหากไม่มีสิทธิ์</li>
                  <li>เพิ่มการส่งกลุ่ม "งานรอสั่งการ" ของ ผอ. และการโต้ตอบของบอท LINE ด้วยรูปแบบ Flex Message Carousel</li>
                  <li>เผยแพร่และอัปโหลดไฟล์ตัวติดตั้งเดสก์ท็อป (Windows Setup) v1.1.4 ขึ้นสู่ GitHub Releases</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">v1.1.3</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(27 พ.ค. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>ปรับปรุงการโหลดฟอนต์ไทย `THSarabunNew.ttf` ใน Vercel Serverless Function</li>
                  <li>เพิ่มระบบล้างแคชภาพ (Cache-Busting) สำหรับไฟล์ PDF หลัง ผอ. ประทับตราเกษียณเพื่อป้องกันการแสดงไฟล์เก่า</li>
                  <li>ปรับโครงสร้างการตั้งชื่อตัวติดตั้งเดสก์ท็อปให้เสถียรกับการอัปโหลดขึ้น GitHub Releases</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">v1.1.2</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(27 พ.ค. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>ปรับปรุงระบบกรองปีการศึกษา (Year System Filter) และรีเซ็ตเลขที่เอกสารอัตโนมัติประจำปี พ.ศ.</li>
                  <li>พัฒนา LINE Interactive Webhook และการเก็บสถานะสนทนาแบบขั้นตอน (Multi-step Chatbot) ด้วยตาราง `line_action_states`</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">v1.1.1</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(26 พ.ค. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>ปรับแต่งการสกัดคำค้นหา RAG คลังเอกสารใน LINE Webhook และแก้ไขบั๊ก TypeScript Compile</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">v1.1.0</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(24 พ.ค. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>ปรับปรุงเลย์เอาต์รายงาน LEC-2 ให้แสดงผล 25 รายชื่อต่อหน้า และแสดงช่องลงลายมือชื่อที่ส่วนท้ายในทุกหน้ากระดาษ</li>
                  <li>แก้ไขปัญหาฟอนต์ TH Sarabun New ในโหมดจัดพิมพ์รายงานให้กลับมาคมชัดสวยงาม ไม่หนาเข้มและไม่ล้นกรอบตาราง</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">v1.0.9</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(24 พ.ค. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-400 mt-1 space-y-1">
                  <li>แก้ไขตัวหนังสือ/ตัวเข้ม ในรายงานสรุปและรายชื่อผู้ปกครองระบบเงินเรียนฟรี (15 ปี) และรายงาน LEC</li>
                  <li>แยกความแตกต่างฟอนต์สำหรับงานพิมพ์เอกสารออกเป็น TH Sarabun New Print ป้องกันความสับสนน้ำหนักฟอนต์</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">v1.0.8</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(24 พ.ค. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>เปลี่ยนระบบ GAS_URL และ LINE_TOKEN ให้รองรับ Environment Variables</li>
                  <li>แก้ไขประเภทข้อมูลประวัติและข้อมูลส่วนตัวผู้เสนอเอกสารส่งออนไลน์</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200 pb-2">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">v1.0.7</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(23 พ.ค. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>ระบบสกัดโครงการพัสดุอัจฉริยะ (AI Project Extraction)</li>
                  <li>เชื่อมโยงข้อมูลโครงการและแผนงบประมาณ (Budget Linkage)</li>
                  <li>ระบบแนะนำร้านค้าจัดซื้อจากประวัติในระบบ (Smart Vendor Suggestion)</li>
                  <li>ระบบ Multimodal OCR สแกนบิลและวิเคราะห์เอกสารใบเสร็จด้วย AI</li>
                </ul>
              </div>

              <div className="relative pl-6 border-l border-slate-200">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">v1.0.6</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">(19 พ.ค. 2569)</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-500 mt-1 space-y-1">
                  <li>ปรับปรุงการแสดงผลและข้อมูลรายงานเรียนฟรี LEC-1 และ LEC-2</li>
                  <li>พัฒนาระบบถัวจ่ายงบประมาณแยกโครงการ (Budget Share)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {}
      {showGasModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            {}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-[32px]">
              <div>
                <h3 className="font-black text-slate-800 text-lg">คู่มือตั้งค่า Google Drive (Apps Script)</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Google Apps Script Web App Integration</p>
              </div>
              <button
                type="button"
                onClick={() => setShowGasModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {}
            <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-600 leading-relaxed font-medium">
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-800 text-sm">💡 ขั้นตอนการจัดทำสคริปต์เชื่อมต่อ:</h4>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-500 pl-2">
                  <li>เปิดเว็บไซต์ <a href="https://script.google.com" target="_blank" rel="noreferrer" className="text-brand-primary font-bold hover:underline">Google Apps Script</a> โดยล็อกอินด้วยบัญชี Google ของสถานศึกษา</li>
                  <li>คลิกปุ่ม **"โครงการใหม่" (New Project)** ที่มุมซ้ายบน</li>
                  <li>ล้างโค้ดตัวอย่างที่แสดงอยู่ในไฟล์ออกทั้งหมด</li>
                  <li>กดปุ่ม **"คัดลอกโค้ดสคริปต์"** ด้านล่าง นำไปวางในหน้าเขียนโค้ดและกดปุ่มเซฟ (รูปแผ่นดิสก์)</li>
                  <li>คลิกที่ปุ่ม **"การทำให้ใช้งานได้"** (ปุ่มสีน้ำเงินมุมขวาบน) &rarr; เลือก **"การทำให้ใช้งานได้ใหม่" (New Deployment)**</li>
                  <li>คลิกที่รูปฟันเฟือง &rarr; เลือกประเภทการทำให้ใช้งานได้เป็น **"เว็บแอป" (Web App)**</li>
                  <li>ตั้งค่าตัวเลือกดังนี้:
                    <ul className="list-disc list-inside pl-4 mt-1.5 space-y-1 text-[11px] font-bold">
                      <li>คำอธิบาย: <span className="text-slate-400">ระบบอัปโหลดไฟล์สารบรรณ</span></li>
                      <li>รันในฐานะ: <span className="text-brand-primary">"ฉัน" (Me / อีเมลของคุณ)</span></li>
                      <li>ผู้มีสิทธิ์เข้าถึง: <span className="text-red-500">"ทุกคน" (Anyone)</span></li>
                    </ul>
                  </li>
                  <li>คลิกปุ่ม **"ทำให้ใช้งานได้"** &rarr; หากมีป๊อปอัปให้สิทธิ์ ให้กด **"ตรวจสอบสิทธิ์"** และทำตามขั้นตอนจนเสร็จสิ้น</li>
                  <li>คัดลอก **"URL เว็บแอป" (Web App URL)** ที่ได้ นำมาวางลงในช่องกรอกในแผงตั้งค่าด้านหลังครับ</li>
                </ol>
              </div>

              {}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-slate-800 text-sm">📋 โค้ดสคริปต์ Google Apps Script (รหัส.gs):</h4>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(GAS_SCRIPT_CODE);
                      setIsCopied(true);
                      setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className={`text-xs font-black px-4 py-2 rounded-xl transition-all ${
                      isCopied
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20'
                    }`}
                  >
                    {isCopied ? '✓ คัดลอกสำเร็จแล้ว' : '📋 คัดลอกโค้ดสคริปต์'}
                  </button>
                </div>
                <div className="relative font-sans">
                  <pre className="bg-slate-900 text-slate-200 text-[11px] p-4 rounded-2xl overflow-x-auto max-h-48 font-mono select-all leading-normal">
                    {GAS_SCRIPT_CODE}
                  </pre>
                </div>
              </div>
            </div>

            {}
            <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50/50 rounded-b-[32px]">
              <button
                type="button"
                onClick={() => setShowGasModal(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const GAS_SCRIPT_CODE = `/**
 * Google Apps Script (GAS) Web App Code
 * สำหรับระบบบริหารจัดการข้อมูลโรงเรียน (School Admin System)
 * ใช้สำหรับบันทึกไฟล์สแกนหนังสือราชการเข้าสู่ Google Drive ของโรงเรียน และตั้งสิทธิ์แชร์ให้อ่านได้อัตโนมัติ
 */

function doPost(e) {
  try {
    // 1. แปลงข้อมูล JSON ที่ส่งมาจากแอปพลิเคชัน
    var data = JSON.parse(e.postData.contents);

    // --- กรณีสั่ง ลบไฟล์ (Delete Action) ---
    if (data.action === 'delete') {
      var fileId = data.fileId;
      if (!fileId) {
        return createJsonResponse({
          status: 'error',
          message: 'กรุณาระบุ fileId ที่ต้องการลบ'
        });
      }

      var file = DriveApp.getFileById(fileId);
      file.setTrashed(true); // ย้ายลงถังขยะ

      return createJsonResponse({
        status: 'success',
        message: 'ย้ายไฟล์ลงถังขยะเรียบร้อยแล้ว'
      });
    }

    // --- กรณีสั่ง อัปโหลดไฟล์ (Upload Action) ---
    var base64Data = data.base64;
    var filename = data.filename;
    var mimeType = data.mimeType;
    var folderName = data.folder || 'SchoolAdminDocs'; // ชื่อโฟลเดอร์ปลายทาง

    if (!base64Data || !filename || !mimeType) {
      return createJsonResponse({
        status: 'error',
        message: 'ข้อมูลไม่ครบถ้วน (ต้องการ base64, filename, mimeType)'
      });
    }

    // 2. ถอดรหัสไฟล์จาก Base64 เป็น Binary Blob
    var decoded = Utilities.base64Decode(base64Data);
    var blob = Utilities.newBlob(decoded, mimeType, filename);

    // 3. ค้นหาหรือสร้างโฟลเดอร์ใน Google Drive ของโรงเรียน
    var folders = DriveApp.getFoldersByName(folderName);
    var folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }

    // 4. บันทึกไฟล์ลงในโฟลเดอร์ และตั้งสิทธิ์แชร์ "ทุกคนที่มีลิงก์สามารถอ่านได้" (สำหรับเปิด PDF และส่งไลน์)
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    // 5. ส่งลิงก์ไฟล์กลับไปยังแอป
    var fileUrl = file.getUrl();

    return createJsonResponse({
      status: 'success',
      url: fileUrl,
      fileId: file.getId()
    });

  } catch (error) {
    return createJsonResponse({
      status: 'error',
      message: 'GAS Error: ' + error.toString()
    });
  }
}

// ฟังก์ชันสร้างตัวตอบกลับ JSON ของ Google Apps Script
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}`;
````
