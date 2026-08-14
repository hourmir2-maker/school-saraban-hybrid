# 🏫 กฎเฉพาะโปรเจกต์ school-saraban-hybrid (Hybrid Multi-Tenant Instance)

### Rule 1 — Multi-Tenant Architecture & Strict Isolation
- **ห้ามแก้ไขไฟล์ใน `school-admin-multischool` โดยพลการ** ให้อ่านเป็นโค้ดต้นแบบเพื่อนำมาพอร์ตปรับใช้เท่านั้น เว้นแต่ผู้ใช้สั่งให้แก้โดยตรง
- **รักษาโครงสร้าง `school_id`**: ทุกการคิวรี (SELECT, INSERT, UPDATE, DELETE) ใน `school-saraban-hybrid` ต้องมีเงื่อนไข `.eq('school_id', schoolId)` กำกับเสมอ
- **การ Push Git แยกชัดเจน 100%**:
  - `school-admin-multischool` → Branch **`multischool`** (Remote: `officebkky-sketch/school-admin.git`)
  - `school-saraban-hybrid` → Branch **`main`** (Remote: `hourmir2-maker/school-saraban-hybrid.git`)

### Rule 2 — มาตรฐาน Supabase Query & ความปลอดภัยของ Schema
- **ห้ามใช้ `.single()` กับตารางที่มีโอกาสไม่มีข้อมูล** (เช่น `settings`, `profiles`): ให้ใช้ **`.maybeSingle()`** เสมอ เพื่อป้องกันปัญหา PostgREST HTTP Error 406 (Not Acceptable)
- **ตรวจสอบตารางเป้าหมายก่อนพอร์ต**: ห้ามอ้างอิงตารางหรือ RPC ที่ไม่มีใน Hybrid schema โดยเด็ดขาด หากฟีเจอร์ใดต้องใช้ตารางใหม่ ต้องทำ Fallback ที่ปลอดภัย และจัดทำคำสั่ง `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` ในไฟล์ SQL Patch ทุกครั้ง
- **คอมเมนต์ในโค้ด SQL**: ต้องใช้ขีดคู่ `--` เท่านั้น (ห้ามใช้ขีดเดี่ยว `-`)
- **ตารางหลักของโรงเรียนใน Hybrid**: คือ `schools(id)` (UUID)

### Rule 3 — มาตรฐาน UI และระบบจองเลขเอกสาร (Reserve Mode)
- **ป้ายสถานะจองเลข:** ต้องแสดงผลเป็นแท็กแนวนอนสีเหลือง `🟡 จองเลขแล้ว (รอไฟล์)` ใต้คอลัมน์ `เลขที่รับ / วันที่` หรือในช่องเรื่องอย่างเป็นระเบียบ (ห้ามวางในคอลัมน์แรกจนโดนบีบเป็นแนวตั้ง)
- **ปุ่มแนบไฟล์เอกสาร:** ปุ่ม `[📎 แนบไฟล์เอกสาร]` สีส้ม Amber ต้องแสดงผลค้างไว้อย่างโดดเด่นบนแถวตารางของรายการจองเลข (ห้ามซ่อนอยู่หลัง Hover)
- **ระบบจองเลขผ่านหน้าเว็บ (Web Reserve Mode):** ในป๊อปอัปสร้างเอกสารใหม่ ต้องมีช่องติ๊ก `isReserveMode` (`🟡 จองเลขไว้ก่อน (ยังไม่มีไฟล์เอกสาร)`) ให้ผู้ใช้สามารถเลือกจองเลขบนหน้าเว็บได้ทุกโมดูล (หนังสือรับ, หนังสือส่ง, คำสั่ง, บันทึกข้อความ)

### Rule 4 — มาตรฐานกราฟ Recharts (No Negative Dimension Warnings)
- สำหรับคอมโพเนนต์ `<ResponsiveContainer>` ทุกจุด ให้กำหนดความสูงเป็นตัวเลขพิกเซลแน่นอน (เช่น `height={280}`, `height={200}`) และใส่ `minWidth={0}` เสมอ ห้ามใช้ `height="100%"` โดยไม่มีขนาดที่ชัดเจนจาก Parent

### Rule 5 — ระบบสถานะการผูกบัญชี LINE & Telegram
- ในหน้า **จัดการสิทธิ์ผู้ใช้งาน (`Users.tsx`)**, **ข้อมูลครู (`Teachers.tsx`)**, และ **โปรไฟล์ (`Profile.tsx`)** ต้องแสดงป้ายสถานะการผูกทั้ง 2 ช่องทาง:
  - ✈️ Telegram: `✈️ ผูก Telegram แล้ว` (แสดง Chat ID) / `⚪ ยังไม่ผูก Telegram`
  - 🟢 LINE: `🟢 ผูก LINE แล้ว` (แสดง Line User ID) / `⚪ ยังไม่ผูก LINE`

### Rule 6 — ระบบ Telegram Slash Commands
- รักษาการดักจับชุดคำสั่ง Slash Commands ภาษาไทยใน Telegram Webhook (`/ขอเลขรับ`, `/ขอเลขส่ง`, `/ขอเลขคำสั่ง`, `/ขอเลขบันทึก`, `/เช็คเลขจอง`, `/แนบเอกสาร`) และคำนวณ `getAccurateNextSeqInWebhook` ที่กรองด้วย `school_id` เสมอ
