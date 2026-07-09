# แผนพัฒนาระบบสิทธิประโยชน์ (Premium Subscriptions) และระบบควบคุมโควตา AR (AR Quota System) - [ฉบับสมบูรณ์]

รายงานฉบับนี้จัดทำขึ้นเพื่อเป็นแนวทางการอัปเกรดระบบจ่ายเงิน (Paywall), ระบบควบคุมโควตา AR และแผนการบูรณาการระบบแจ้งเตือนสำรองผ่าน **Telegram Bot** แยกโรงเรียนอย่างเป็นระบบ

---

## 1. บทบาทผู้ดูแลและสิทธิ์การปลดล็อก (Super Admin Access)

* **ผู้มีสิทธิ์ปลดล็อก**: เฉพาะ **Super Admin (ผู้ดูแลระบบส่วนกลาง)** เท่านั้นที่สามารถเปลี่ยนค่า `is_premium` ในตาราง `schools` เพื่อเปิดสิทธิ์พรีเมียมให้แก่โรงเรียนต่างๆ ได้
* **แผงควบคุมหลัก**: จะมีปุ่ม/สวิตช์เปิดใช้งานพรีเมียมสำหรับ Super Admin อยู่ในหน้าจอ **SchoolApprovals.tsx** เพื่อให้แอดมินกลางอนุมัติปลดล็อกสถานะพรีเมียมให้แก่โรงเรียนที่ชำระเงินแล้ว

---

## 2. โครงสร้างการแบ่งโมดูลฟรีและโมดูลจ่ายเงิน (Pricing & Subscription Rules)

ระบบการให้บริการจะถูกแบ่งข้อจำกัดออกเป็น 3 โมดูลหลักๆ ดังนี้ครับ:

### 🔹 1) โมดูลสารบรรณ (Document Management Module)
* 🟢 **หนังสือรับ (Incoming Docs)**: **ใช้งานฟรี 100% ไม่จำกัด** สำหรับทุกระดับโรงเรียน (สามารถบันทึกรับเอกสาร, มอบหมายงานคุณครู และทำธุรกรรมบอท LINE ขั้นพื้นฐานได้ฟรี)
* 🔴 **หนังสือส่ง (Outgoing Docs) / บันทึกข้อความ (Memos) / คำสั่งแต่งตั้ง (Orders)**: **ต้องเสียเงิน (Premium) เท่านั้น** ถึงจะปลดล็อกสิทธิ์การสร้างเอกสาร, การลงนามเสนออนุมัติ, ระบบ AI ร่างเอกสารราชการ และการทำรายงานเสนอ ผอ. 
*(หากยังเป็นโรงเรียนแบบ Free แล้วคลิกเข้าสู่ 3 หน้าจอนี้ ระบบจะแสดงหน้าจอ Paywall สีทองบล็อกสิทธิ์การทำงานทันที)*

### 🔹 2) โมดูล AI Co-worker (AICowork Module)
* 🟢 **Chat Hub (แชทบอทน้องชบา)**: **ใช้งานฟรี 100%** สำหรับคุณครูและแอดมินทุกคน
* 🔴 **Virtual Drive (คลังเอกสารส่วนตัว) & Intelligence Hub (คลังความรู้ RAG โรงเรียน)**: **ต้องเสียเงิน (Premium) เท่านั้น** ถึงจะปลดล็อกสิทธิ์ใช้งานเพื่ออัปโหลดไฟล์ และคำนวณเวกเตอร์ความรู้สำหรับสืบค้นด้วย AI

### 🔹 3) โมดูล AR (Augmented Reality Module)
* 🟡 **ระบบ AR Learning & AR Admin**: สำหรับการสแกนและเล่นด่าน/ทำแบบฝึกหัด AR จะจำกัดให้คุณครูและผู้เรียนใช้งานฟรีได้ **ไม่เกิน 5 ครั้งต่อคน** (ถ้าเปิดด่านเดิมซ้ำจะไม่หักโควตาเพิ่ม) 
*(หากใช้งานทั่วไปเกิน 5 ครั้งแล้ว จะล็อคและต้องการ Premium status ของโรงเรียนเพื่อเล่นได้ไม่จำกัด)*

---

## 3. แผนการอัปเกรดระบบฐานข้อมูล (Database Schema Plan)

สคริปต์สำหรับรันใน Supabase SQL Editor เพื่อรองรับระบบโควตา AR, Telegram Bot และการตรวจสอบ Premium:

```sql
-- 1. เพิ่มฟิลด์ Premium ลงในตาราง schools เพื่อระบุสถานะจ่ายเงิน (ควบคุมโดย Super Admin)
ALTER TABLE public.schools 
ADD COLUMN IF NOT EXISTS is_premium boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS premium_expires_at timestamp with time zone;

-- 2. เพิ่มฟิลด์สำหรับเชื่อม Telegram บอท ในตาราง settings ประจำโรงเรียน
ALTER TABLE public.settings
ADD COLUMN IF NOT EXISTS telegram_bot_token text;

-- 3. เพิ่มฟิลด์สำหรับเก็บ Chat ID ของผู้ใช้ในตาราง profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS telegram_chat_id text;

-- 4. สร้างตาราง ar_usages เพื่อบันทึกประวัติการเปิดใช้ระบบ AR แยกรายบุคคล
CREATE TABLE IF NOT EXISTS public.ar_usages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    school_id uuid REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
    ar_lesson_id uuid NOT NULL, -- ไอดีด่าน AR ที่เข้าเล่น
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ปิด RLS ของตาราง log การใช้งาน AR เพื่อให้ระบบประมวลผลได้ราบรื่น
ALTER TABLE public.ar_usages DISABLE ROW LEVEL SECURITY;
```

---

## 4. แผนงานการเพิ่มระบบเชื่อมต่อบอท Telegram (Telegram Bot Integration)

ระบบ Telegram Bot จะทำงานควบคู่ไปกับระบบ LINE Bot เพื่อเป็นช่องทางหลักสำรอง โดยมีการแบ่งระบบและผูกบัญชีดังนี้:

### ⚙️ การแยกโรงเรียนแบบเด็ดขาด (Tenant Isolation)
1. แต่ละโรงเรียนจะจดทะเบียนสร้างบอทผ่าน `@BotFather` แยกกันโดยอิสระ
2. จัดเก็บโทเค็นของโรงเรียนไว้ในตาราง `settings.telegram_bot_token` แยกตามโรงเรียน
3. วางเส้นทาง Webhook ยิงเข้า API เดียวกันบน Vercel แต่แยกโรงเรียนด้วย Parameter บน URL:
   `https://school-saraban-hybrid.vercel.app/api/telegram-webhook?school_id=ไอดีโรงเรียน`

### 🔗 การดึงไอดีและการผูกบัญชีผู้ใช้ (Telegram Chat ID & User Pairing)
เมื่อทักบอท Telegram เข้ามา ระบบหลังบ้านจะแกะเลขไอดีผู้ส่งผ่านฟิลด์ `message.chat.id` ของ Payload อัตโนมัติ โดยมีแนวทางเชื่อมโยงโปรไฟล์ 2 แบบ:
* **แนวทางที่ 1 (พิมพ์อีเมล)**: หากแชททักมาเป็นครั้งแรกและไม่มีไอดีในระบบ บอทจะขอให้พิมพ์อีเมลเพื่อค้นหาโปรไฟล์ในตาราง `profiles` ของโรงเรียนนั้น และบันทึก `telegram_chat_id` ให้ทันที
* **แนวทางที่ 2 (Deep Linking - แนะนำ)**: ในหน้าจอข้อมูลส่วนตัวบนเว็บหรือแอป Desktop จะมีปุ่ม **"ผูกบัญชี Telegram"** ซึ่งจะพาผู้ใช้ไปยังลิงก์พิเศษ เช่น `https://t.me/Satit01_Bot?start=auth_token_รหัสลับ` เมื่อผู้ใช้กดปุ่ม **Start** บอทจะดึงรหัสลับและผูกบัญชีให้ผู้ใช้แบบอัตโนมัติทันที 100% โดยครูไม่ต้องพิมพ์ข้อมูลใดๆ

---

## 5. รายละเอียดขั้นตอนการควบคุมโควตาบนหน้าจอ (Application Logic)

### 📌 การควบคุมหน้าสารบรรณพรีเมียม (Memos, Orders, OutgoingDocs):
ในหน้าจอ `src/pages/Memos.tsx`, `src/pages/Orders.tsx`, และ `src/pages/OutgoingDocs.tsx` จะมีตัวดึงข้อมูล `schools.is_premium` มาเช็คสิทธิ์:
```typescript
const [isPremium, setIsPremium] = useState(false);
// คิวรีเช็ค is_premium จาก schools
// หาก isPremium === false ให้แสดงหน้าจอ UI Paywall บล็อกการทำงานในหน้านั้นๆ ทันที
```

### 📌 การควบคุมโควตาในโมดูล AR (ARLearning.tsx):
1. ตรวจสอบความพรีเมียม: หากโรงเรียนเป็น Premium แล้ว -> **ผ่านใช้งานฟรีไม่จำกัด**
2. หากโรงเรียนเป็น Free:
   - ตรวจสอบว่าครูเคยเล่นด่าน `ar_lesson_id` นี้ไปแล้วหรือยังในตาราง `ar_usages`
   - หากเคยเล่นแล้ว -> **อนุญาตให้เล่นซ้ำได้ฟรี**
   - หากเป็นด่านชิ้นใหม่ -> ตรวจดูยอดรวมที่เล่นไป หาก < 5 ครั้ง จะ insert ข้อมูลลง `ar_usages` และอนุญาตให้เล่นได้ แต่หากครบ 5 ครั้งแล้ว จะล็อคหน้าจอและแสดง Paywall
