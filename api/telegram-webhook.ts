declare const process: any;
import { createClient } from '@supabase/supabase-js';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';

// ============================================================
// Telegram Bot Webhook API
// รับ Webhook จาก Telegram เพื่อผูกบัญชีครูรายบุคคลและตอบกลับทั่วไป
// URL Webhook: https://your-domain.vercel.app/api/telegram-webhook?school_id=uuid
// ============================================================

/** ส่งข้อความกลับหาผู้ใช้ทาง Telegram Bot API */
async function sendTelegramMessage(botToken: string, chatId: number, text: string, replyMarkup?: any) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
      reply_markup: replyMarkup
    }),
  });
  if (!resp.ok) {
    const err = await resp.json();
    console.error('[TELEGRAM SEND MESSAGE ERROR]', err);
  }
  return resp;
}

/** เรียกใช้งานโมเดล Gemini API สำหรับโต้ตอบบทสนทนา */
async function callGemini(system: string, user: string, apiKey: string): Promise<string> {
  const models = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash", "gemini-flash-latest"];
  for (const model of models) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: system }]
          },
          contents: [{
            parts: [{ text: user }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048
          }
        })
      });
      if (res.ok) {
        const data = await res.json() as any;
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          console.log(`[TELEGRAM WEBHOOK] Gemini model ${model} success!`);
          return text;
        }
      } else {
        const errData = await res.json() as any;
        console.error(`[TELEGRAM WEBHOOK] Error with model ${model}:`, JSON.stringify(errData));
      }
    } catch (e) {
      console.error(`[TELEGRAM WEBHOOK] Gemini error with model ${model}:`, e);
    }
  }
  return "";
}

/** แยกชั้นเรียนจากข้อความ เช่น ป.1, อ.2 */
function extractClassLevel(text: string): string | null {
  const cleaned = text.replace(/\s+/g, '');
  const pMatch = cleaned.match(/(ป|ประถม|ประถมศึกษา|ประถมศึกษาปีที่)\.?([1-6])/);
  if (pMatch) return `ป.${pMatch[2]}`;
  const aMatch = cleaned.match(/(อ|อนุบาล|อนุบาลปีที่)\.?([2-3])/);
  if (aMatch) return `อ.${aMatch[2]}`;
  return null;
}

/** ดึงคำค้นหาจากข้อความเรื่องเอกสาร */
function extractDocSearchWord(message: string): string {
  if (!message) return '';
  const msg = message.toLowerCase();
  const reangIdx = msg.indexOf('เรื่อง');
  const numIdx = msg.indexOf('เลขที่');
  let keyword = '';
  if (reangIdx !== -1) { keyword = msg.substring(reangIdx + 6).trim(); }
  else if (numIdx !== -1) { keyword = msg.substring(numIdx + 6).trim(); }
  else {
    keyword = msg;
    const commonWords = [
      'ใครรับผิดชอบ', 'ผู้รับผิดชอบ', 'รับผิดชอบ', 'มอบหมายให้ใคร', 'มอบหมายงาน', 'มอบหมาย', 'ส่งให้ใคร', 'ให้ใคร', 'ของใคร', 'ใคร', 'คนไหน', 'ท่านใด', 'ทำหน้าที่',
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
  const suffixes = ['หน่อย', 'ครับ', 'ค่ะ', 'นะ', 'นะคะ', 'ด้วย', 'ที', 'หน่อยครับ', 'หน่อยค่ะ', 'หน่อยนะ', 'หน่อยนะคะ', 'ด้วยครับ', 'ด้วยค่ะ', 'ซิ', 'สิ', 'จ๊ะ', 'จ้า'];
  suffixes.forEach(s => {
    keyword = keyword.replace(new RegExp(s + '$', 'g'), '');
    keyword = keyword.replace(new RegExp('\\s+' + s, 'g'), '');
  });
  return keyword.trim();
}

/** Smart Data Fetch — ดึงข้อมูลจริงจากฐานข้อมูลตามหมวดคำถาม (เทียบเท่า LINE Bot) */
async function smartFetchContext(message: string, currentYear: string, supabase: any, schoolId: string): Promise<string> {
  const msg = message.toLowerCase();
  const targetClass = extractClassLevel(message);

  const rules = [
    {
      keys: ['ครู', 'คุณครู', 'บุคลากร', 'ผู้สอน', 'เวร', 'เวรยาม', 'อีเมล', 'อีเมล์', 'เบอร์โทร', 'เบอร์ติดต่อ', 'มีใครบ้าง', 'ใครบ้าง'],
      fetch: async () => {
        let teachersQuery = supabase.from('teachers').select('id, prefix, first_name, last_name, position, department, phone, email, status');
        if (schoolId) teachersQuery = teachersQuery.eq('school_id', schoolId);
        let { data: teachers } = await teachersQuery;
        if (!teachers || teachers.length === 0) {
          let profilesQuery = supabase.from('profiles').select('id, display_name, email, role, status');
          if (schoolId) profilesQuery = profilesQuery.eq('school_id', schoolId);
          const { data: profiles } = await profilesQuery;
          if (profiles && profiles.length > 0) {
            teachers = profiles.map((p: any) => ({
              id: p.id, prefix: '', first_name: p.display_name || p.email?.split('@')[0], last_name: '',
              position: p.role === 'admin' ? 'ผู้ดูแลระบบ' : p.role === 'director' ? 'ผู้อำนวยการ' : 'ครู',
              department: 'ทั่วไป', phone: '', email: p.email, status: p.status
            }));
          }
        }
        const { data: duties } = await supabase.from('teacher_duties').select('duty_day, duty_type, teacher_id, teachers(prefix, first_name, last_name)');
        return `รายชื่อครูและบุคลากร: ${JSON.stringify(teachers)}\nตารางเวรประจำวันครู: ${JSON.stringify(duties)}`;
      }
    },
    {
      keys: ['เขตพื้นที่บริการ', 'พื้นที่บริการ', 'ทร.14', 'ทร14', 'พฐ.03', 'พฐ03', 'เด็กเข้าเกณฑ์', 'เด็กในเขต'],
      fetch: async () => {
        let sasQuery = supabase.from('service_area_students').select('prefix, first_name, last_name, gender, birth_date, moo, sub_district');
        if (schoolId) sasQuery = sasQuery.eq('school_id', schoolId);
        const { data } = await sasQuery.limit(60);
        return `ข้อมูลทะเบียนเด็กในเขตพื้นที่บริการ (ทร.14 / พฐ.03): ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['โครงการ', 'งบประมาณ', 'งบ', 'เงินงบ', 'สถิติ', 'สรุป', 'ผลสัมฤทธิ์', 'จัดซื้อจัดจ้าง', 'ซื้อจ้าง'],
      fetch: async () => {
        let projQuery = supabase.from('school_projects').select('project_name, planned_amount, spent_amount, status, budget_allocations(budget_type, category_name)').eq('academic_year', currentYear);
        let budgQuery = supabase.from('budget_allocations').select('id, budget_type, category_name, amount, spent_amount, remaining_amount').eq('academic_year', currentYear);
        let procQuery = supabase.from('procurement_projects').select('project_name, total_amount, status, procurement_type').eq('academic_year', currentYear);
        if (schoolId) { projQuery = projQuery.eq('school_id', schoolId); budgQuery = budgQuery.eq('school_id', schoolId); procQuery = procQuery.eq('school_id', schoolId); }
        const { data: projects } = await projQuery;
        const { data: budget } = await budgQuery;
        const { data: procurement } = await procQuery;
        const totalAllocated = budget?.reduce((sum: number, b: any) => sum + (b.amount || 0), 0) || 0;
        const totalSpent = budget?.reduce((sum: number, b: any) => sum + (b.spent_amount || 0), 0) || 0;
        const totalRemaining = budget?.reduce((sum: number, b: any) => sum + (b.remaining_amount || 0), 0) || 0;
        return `สถิติสรุปงบประมาณ ปี ${currentYear}:\n- ยอดงบรวม: ${totalAllocated.toLocaleString()} บาท\n- ใช้ไป: ${totalSpent.toLocaleString()} บาท\n- คงเหลือ: ${totalRemaining.toLocaleString()} บาท\nข้อมูลโครงการ: ${JSON.stringify(projects)}\nข้อมูลงบ: ${JSON.stringify(budget)}\nข้อมูลจัดซื้อจัดจ้าง: ${JSON.stringify(procurement)}`;
      }
    },
    {
      keys: ['หนังสือรับ', 'จดหมาย', 'เอกสารรับ', 'หนังสือเข้า', 'ไฟล์แนบ', 'เอกสารแนบ', 'แนบ', 'ไฟล์รับ'],
      fetch: async () => {
        const searchWord = extractDocSearchWord(message);
        let query = supabase.from('incoming_docs').select('doc_number, subject, from_agency, doc_date, urgency, remark, file_url, attachment_urls, doc_assignments(instruction, status, teachers(prefix, first_name, last_name))');
        if (schoolId) query = query.eq('school_id', schoolId);
        if (searchWord.length > 0) query = query.or(`subject.ilike.%${searchWord}%,doc_number.ilike.%${searchWord}%`);
        const { data } = await query.order('doc_date', { ascending: false }).limit(5);
        return `ข้อมูลหนังสือรับล่าสุด (รวมข้อมูลการมอบหมายงานด้วย): ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['หนังสือส่ง', 'เอกสารส่ง', 'หนังสือออก', 'ไฟล์ส่ง'],
      fetch: async () => {
        const searchWord = extractDocSearchWord(message);
        let query = supabase.from('outgoing_docs').select('doc_number, subject, to_agency, doc_date, urgency, remark, file_url');
        if (schoolId) query = query.eq('school_id', schoolId);
        if (searchWord.length > 0) query = query.or(`subject.ilike.%${searchWord}%,doc_number.ilike.%${searchWord}%`);
        const { data } = await query.order('doc_date', { ascending: false }).limit(5);
        return `ข้อมูลหนังสือส่งล่าสุด: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['คำสั่ง', 'ใบสั่ง', 'ไฟล์คำสั่ง'],
      fetch: async () => {
        const searchWord = extractDocSearchWord(message);
        let query = supabase.from('orders').select('order_number, subject, issuer, order_date, remark, file_url');
        if (schoolId) query = query.eq('school_id', schoolId);
        if (searchWord.length > 0) query = query.or(`subject.ilike.%${searchWord}%,order_number.ilike.%${searchWord}%`);
        const { data } = await query.order('order_date', { ascending: false }).limit(5);
        return `ข้อมูลคำสั่งล่าสุด: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['บันทึก', 'เมโม่', 'memo', 'บันทึกข้อความ', 'ไฟล์บันทึก'],
      fetch: async () => {
        const searchWord = extractDocSearchWord(message);
        let query = supabase.from('memos').select('memo_number, subject, requester, memo_date, urgency, remark, file_url');
        if (schoolId) query = query.eq('school_id', schoolId);
        if (searchWord.length > 0) query = query.or(`subject.ilike.%${searchWord}%,memo_number.ilike.%${searchWord}%`);
        const { data } = await query.order('memo_date', { ascending: false }).limit(5);
        return `ข้อมูลบันทึกข้อความล่าสุด: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['ค่าไฟ', 'ไฟฟ้า', 'ค่าน้ำ', 'ประปา', 'โทรศัพท์', 'เน็ต', 'อินเทอร์เน็ต', 'สาธารณูปโภค', 'บิล'],
      fetch: async () => {
        let query = supabase.from('utilities').select('*').eq('academic_year', currentYear);
        if (schoolId) query = query.eq('school_id', schoolId);
        const types: string[] = [];
        if (msg.includes('ค่าไฟ') || msg.includes('ไฟฟ้า')) types.push('electricity');
        if (msg.includes('ค่าน้ำ') || msg.includes('ประปา')) types.push('water');
        if (msg.includes('โทรศัพท์')) types.push('telephone');
        if (msg.includes('เน็ต') || msg.includes('อินเทอร์เน็ต')) types.push('internet');
        if (types.length > 0) query = query.in('type', types);
        const { data } = await query.order('bill_date', { ascending: false }).limit(20);
        return `ข้อมูลค่าสาธารณูปโภค ปี ${currentYear}: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['เช็คชื่อ', 'ขาด', 'ลา', 'มาสาย', 'เข้าเรียน'],
      fetch: async () => {
        let attQuery = supabase.from('attendance').select('date, class_level, summary, recorded_at');
        if (schoolId) attQuery = attQuery.eq('school_id', schoolId);
        const { data } = await attQuery.order('date', { ascending: false }).limit(5);
        return `ข้อมูลการเช็คชื่อเข้าเรียนล่าสุด: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['พัสดุ', 'จัดซื้อ', 'จัดจ้าง', 'การจ้าง', 'สัญญา', 'ผู้ขาย', 'ผู้รับจ้าง', 'ตรวจรับ', 'กรรมการ'],
      fetch: async () => {
        let procQuery2 = supabase.from('procurement_projects').select('project_name, academic_year, method, procurement_type, total_amount, status, ref_doc_number, contract_number, committee_json, vendor_info, school_projects(project_name)').eq('academic_year', currentYear);
        if (schoolId) procQuery2 = procQuery2.eq('school_id', schoolId);
        const { data: projects } = await procQuery2.limit(10);
        return `ข้อมูลจัดซื้อจัดจ้าง ปี ${currentYear}: ${JSON.stringify(projects)}`;
      }
    },
    {
      keys: ['ห้องสมุด', 'ยืมหนังสือ', 'คืนหนังสือ', 'ยืม-คืน', 'หนังสือห้องสมุด'],
      fetch: async () => {
        let booksQuery = supabase.from('library_books').select('id, book_id, title, category, author, available_qty, status');
        let borrowQuery = supabase.from('library_borrow').select('borrow_date, borrower_name, return_date, status, library_books(book_id, title, category)');
        if (schoolId) { booksQuery = booksQuery.eq('school_id', schoolId); borrowQuery = borrowQuery.eq('school_id', schoolId); }
        const { data: books } = await booksQuery.limit(15);
        const { data: borrow } = await borrowQuery.order('borrow_date', { ascending: false }).limit(10);
        return `หนังสือในห้องสมุด: ${JSON.stringify(books)}\nประวัติยืม-คืน: ${JSON.stringify(borrow)}`;
      }
    },
    {
      keys: ['มอบหมาย', 'งานมอบหมาย', 'ติดตามงาน', 'สั่งงาน', 'มอบหมายงาน'],
      fetch: async () => {
        let daQuery = supabase.from('doc_assignments').select('instruction, status, reported_at, staff_report, incoming_docs(doc_number, subject, school_id), teachers(prefix, first_name, last_name)');
        if (schoolId) daQuery = daQuery.eq('incoming_docs.school_id', schoolId);
        const { data } = await daQuery.limit(15);
        return `ข้อมูลการมอบหมายงาน: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['การตั้งค่า', 'โรงเรียน', 'ผู้อำนวยการ', 'ที่อยู่โรงเรียน', 'ข้อมูลโรงเรียน'],
      fetch: async () => {
        let settingsQuery = supabase.from('settings').select('school_name, school_address, director_name, current_academic_year, current_term, phone_number, local_gov_name');
        if (schoolId) settingsQuery = settingsQuery.eq('school_id', schoolId);
        const { data } = await settingsQuery.limit(1).maybeSingle();
        return `ข้อมูลโรงเรียน: ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['นักเรียน', 'กี่คน', 'รายชื่อ', 'รายนาม', 'เด็กนักเรียน', 'ชั้นเรียน'],
      fetch: async () => {
        if (msg.includes('ครู') || msg.includes('โครงการ') || msg.includes('จัดซื้อ') || msg.includes('พัสดุ') || msg.includes('ห้องสมุด')) return "";
        if (targetClass) {
          const prefix = targetClass.startsWith('ป') ? 'ป' : 'อ';
          const levelNum = targetClass.split('.')[1];
          let query = supabase.from('students').select('prefix, first_name, last_name, class_level, room, gender').eq('academic_year', currentYear).in('graduation_status', ['ปกติ', 'กำลังศึกษา']);
          if (schoolId) query = query.eq('school_id', schoolId);
          if (prefix === 'ป') { query = query.or(`class_level.eq.${targetClass},class_level.ilike.ป%${levelNum}%`); }
          else { query = query.or(`class_level.eq.${targetClass},class_level.ilike.อ%${levelNum}%`); }
          const { data } = await query.order('room', { ascending: true }).order('first_name', { ascending: true });
          if (data && data.length > 0) {
            const listText = data.map((s: any, idx: number) => `${idx + 1}. ${s.prefix || ''}${s.first_name} ${s.last_name} ${s.room ? `(ห้อง ${s.room})` : ''}`).join('\n');
            return `รายชื่อนักเรียนชั้น ${targetClass} ปี ${currentYear} (รวม ${data.length} คน):\n${listText}`;
          }
          return `ไม่พบข้อมูลรายชื่อนักเรียนชั้น ${targetClass} สำหรับปี ${currentYear}`;
        } else {
          let studQuery = supabase.from('students').select('class_level, gender, religion').eq('academic_year', currentYear).in('graduation_status', ['ปกติ', 'กำลังศึกษา']);
          if (schoolId) studQuery = studQuery.eq('school_id', schoolId);
          const { data: allStudents } = await studQuery;
          if (allStudents && allStudents.length > 0) {
            const counts: Record<string, number> = {}; const genders: Record<string, number> = {};
            (allStudents as any[]).forEach((s: any) => { counts[s.class_level || 'ไม่ระบุ'] = (counts[s.class_level || 'ไม่ระบุ'] || 0) + 1; genders[s.gender || 'ไม่ระบุ'] = (genders[s.gender || 'ไม่ระบุ'] || 0) + 1; });
            const summaryStr = Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0], 'th')).map(([lvl, num]) => `- ${lvl}: ${num} คน`).join('\n');
            const genderStr = Object.entries(genders).map(([g, num]) => `- ${g}: ${num} คน`).join('\n');
            return `[สถิตินักเรียนปี ${currentYear}]:\nรวม: ${allStudents.length} คน\nแยกชั้น:\n${summaryStr}\nแยกเพศ:\n${genderStr}`;
          }
          let studQuery2 = supabase.from('students').select('*', { count: 'exact', head: true }).eq('academic_year', currentYear).in('graduation_status', ['ปกติ', 'กำลังศึกษา']);
          if (schoolId) studQuery2 = studQuery2.eq('school_id', schoolId);
          const { count } = await studQuery2;
          return `จำนวนนักเรียนปี ${currentYear}: ${count} คน`;
        }
      }
    },
    {
      keys: ['แผนการสอน', 'ส่งแผน', 'แผนสอน', 'ตรวจแผน'],
      fetch: async () => {
        let lpQuery = supabase.from('lesson_plans').select('title, subject_code, subject_name, class_level, term, status, academic_comments, director_comments, created_at, profiles(display_name, school_id)');
        if (schoolId) lpQuery = lpQuery.eq('profiles.school_id', schoolId);
        const { data } = await lpQuery;
        if (data && data.length > 0) {
          const listText = data.map((p: any, idx: number) => {
            const statusMap: Record<string, string> = { 'Draft': 'แบบร่าง', 'Pending_Academic': 'รอวิชาการตรวจ', 'Rejected_by_Academic': 'วิชาการส่งแก้ไข', 'Pending_Director': 'เสนอ ผอ. อนุมัติ', 'Rejected_by_Director': 'ผอ. ส่งแก้ไข', 'Approved': 'อนุมัติแล้ว 🟢' };
            return `${idx + 1}. "${p.title}" (${p.subject_code} ${p.subject_name} ชั้น ${p.class_level}) สถานะ: ${statusMap[p.status] || p.status} ครู: ${p.profiles?.display_name || '-'}`;
          }).join('\n');
          return `สถานะแผนการสอน:\n${listText}`;
        }
        return `ยังไม่มีข้อมูลแผนการสอนในระบบ`;
      }
    }
  ];

  for (const rule of rules) {
    if (rule.keys.some(key => msg.includes(key))) {
      try {
        const result = await rule.fetch();
        if (result) return result;
      } catch (err) {
        console.error(`[TELEGRAM WEBHOOK] Error in smartFetchContext for keys ${rule.keys[0]}:`, err);
      }
    }
  }

  // Fallback: ค้นหาใน school_knowledge (RAG)
  try {
    let skQuery = supabase.from('school_knowledge').select('document_name, chunk_text').or(`chunk_text.ilike.%${message}%,document_name.ilike.%${message}%`);
    if (schoolId) skQuery = skQuery.eq('school_id', schoolId);
    const { data: knowledge } = await skQuery.limit(3);
    if (knowledge && knowledge.length > 0) {
      return "ข้อมูลจากคลังความรู้โรงเรียน:\n" + knowledge.map((k: any) => `[ไฟล์: ${k.document_name}] ${k.chunk_text}`).join('\n');
    }
  } catch (err) { console.error('[TELEGRAM WEBHOOK RAG ERROR]', err); }

  return "";
}

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

async function applyStampsOnServer(
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
        const buffer = fs.readFileSync(localFontPath);
        fontBytes = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      } else if (fs.existsSync(localDistFontPath)) {
        const buffer = fs.readFileSync(localDistFontPath);
        fontBytes = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      } else if (fs.existsSync(fontB64Path)) {
        const b64Str = fs.readFileSync(fontB64Path, 'utf-8');
        const buf = Buffer.from(b64Str.trim(), 'base64');
        fontBytes = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      } else if (fs.existsSync(rootFontPath)) {
        const buffer = fs.readFileSync(rootFontPath);
        fontBytes = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      } else {
        const res = await fetch('https://school-admin-psi.vercel.app/fonts/THSarabunNew.ttf');
        if (!res.ok) throw new Error(`Failed to fetch remote font: status ${res.status}`);
        fontBytes = await res.arrayBuffer();
      }
    } catch (err) {
      console.error('Error loading local/preferred font, falling back to remote network fetch:', err);
      const res = await fetch('https://school-admin-psi.vercel.app/fonts/THSarabunNew.ttf');
      if (!res.ok) throw new Error(`Remote network backup fetch failed: status ${res.status}`);
      fontBytes = await res.arrayBuffer();
    }

    const customFont = await pdfDoc.embedFont(fontBytes);
    const pages = pdfDoc.getPages();
    const pageCount = pages.length;

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

    const dateObj = new Date(directorData.date);
    const thDay = dateObj.getDate();
    const thMonthAbbr = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."][dateObj.getMonth()];
    const thYear = dateObj.getFullYear() + 543;
    const thDateStr = `${thDay}/${thMonthAbbr}/${thYear}`;

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

async function executeDocAssignment(
  docId: string,
  teacherId: string,
  instruction: string,
  botToken: string,
  chatId: number,
  profile: any,
  supabase: any
) {
  try {
    const { data: doc } = await supabase
      .from('incoming_docs')
      .select('*')
      .eq('id', docId)
      .single();

    if (!doc) {
      await sendTelegramMessage(botToken, chatId, '❌ ไม่พบข้อมูลหนังสือรับชิ้นนี้ในระบบค่ะ');
      return;
    }

    const { data: teacher } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', teacherId)
      .single();

    if (!teacher) {
      await sendTelegramMessage(botToken, chatId, '❌ ไม่พบข้อมูลคุณครูในระบบค่ะ');
      return;
    }

    let proposalStampPage = 1;
    if (doc.remark) {
      try {
        const extra = typeof doc.remark === 'object' ? doc.remark : JSON.parse(doc.remark);
        if (extra && extra.stamp_page) proposalStampPage = parseInt(extra.stamp_page) || 1;
      } catch (e) {}
    }

    const schoolId = doc?.school_id || profile?.school_id;
    let settingsQuery = supabase.from('settings').select('school_name, director_name, director_signature_url');
    if (schoolId) settingsQuery = settingsQuery.eq('school_id', schoolId);
    const { data: settings } = await settingsQuery.limit(1).maybeSingle();

    const schoolLabel = settings?.school_name 
      ? (settings.school_name.startsWith('โรงเรียน') ? settings.school_name : `โรงเรียน${settings.school_name}`)
      : '';
    const directorPosition = schoolLabel ? `ผู้อำนวยการ${schoolLabel}` : 'ผู้อำนวยการโรงเรียน';

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
            pageNumber: proposalStampPage
          });

          const pathSegments = doc.file_url.split('/');
          const fileName = pathSegments[pathSegments.length - 1].split('?')[0];

          await supabase.storage.from('temp_docs').upload(fileName, stampedBytes, { contentType: 'application/pdf', upsert: true });

          const { data: publicData } = supabase.storage.from('temp_docs').getPublicUrl(fileName);
          if (publicData?.publicUrl) finalFileUrl = `${publicData.publicUrl}?t=${Date.now()}`;

          const gasUrl = process.env.VITE_GAS_URL || 'https://script.google.com/macros/s/AKfycbw52uo8upPX6SiZ_W4dD9MUrocA3DkZm3XnE-eU4uE3vvOtOAK4VhXcLIf71PGVsvxj/exec';
          const base64 = Buffer.from(stampedBytes).toString('base64');
          const sanitizedSubject = doc.subject.replace(/[\/\\?%*:|"<>]/g, '-').slice(0, 50);
          const finalFileName = `${doc.doc_number}_เรื่อง_${sanitizedSubject}.pdf`;

          try {
            const driveRes = await fetch(gasUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ folder: 'incoming', filename: finalFileName, mimeType: 'application/pdf', base64: base64 })
            });

            if (driveRes.ok) {
              const driveResult = await driveRes.json() as any;
              if (driveResult.status === 'success' && driveResult.url) {
                finalFileUrl = driveResult.url;
                try {
                  await supabase.storage.from('temp_docs').remove([fileName]);
                } catch (e) {}
              }
            }
          } catch (e) {}
        }
      } catch (e) {}
    }

    await supabase.from('incoming_docs').update({ status: 'assigned', file_url: finalFileUrl }).eq('id', docId);

    const { data: insertedAssigns, error: assignErr } = await supabase
      .from('doc_assignments')
      .insert([{ doc_id: docId, assignee_id: teacherId, instruction: instruction, status: 'pending' }])
      .select();

    if (assignErr) throw assignErr;
    const assignment = insertedAssigns?.[0];

    await supabase.from('line_action_states').delete().eq('user_id', `telegram:${profile.id}`);

    const teacherName = `${teacher.prefix || ''}${teacher.first_name} ${teacher.last_name}`;
    await sendTelegramMessage(botToken, chatId, `✅ ทำการเกษียณสั่งการหนังสือเรื่อง "${doc.subject}" และมอบหมายงานให้คุณครู <b>${teacherName}</b> เรียบร้อยแล้วค่ะ 🌸`);

    const personalMsg = `📌 <b>มีงานมอบหมายใหม่ถึงคุณ</b>\n\n• <b>เรื่อง</b>: ${doc.subject}\n• <b>เลขที่หนังสือ</b>: ${doc.doc_number}\n• <b>คำสั่งการ</b>: ${instruction}\n\n📄 <a href="${finalFileUrl}">เปิดดูต้นฉบับเอกสารสั่งการ</a>`;
    const { data: teacherProfile } = await supabase.from('profiles').select('telegram_chat_id').eq('email', teacher.email).maybeSingle();

    if (teacherProfile?.telegram_chat_id) {
      const teacherReplyMarkup = {
        inline_keyboard: [
          [
            { text: '📢 ประชาสัมพันธ์ลงกลุ่มกลาง', callback_data: `action=broadcast_group&assign_id=${assignment.id}` }
          ]
        ]
      };
      await sendTelegramMessage(botToken, parseInt(teacherProfile.telegram_chat_id), personalMsg, teacherReplyMarkup);
    } else {
      await sendTelegramMessage(botToken, chatId, `📢 <b>แจ้งมอบหมายงานใหม่</b>\n\n• <b>ถึงคุณครู</b>: ${teacherName}\n• <b>เรื่อง</b>: ${doc.subject}\n• <b>คำสั่งการ</b>: ${instruction}\n\n📄 <a href="${finalFileUrl}">เปิดดูเอกสารสั่งการ</a>`);
    }

  } catch (err: any) {
    console.error('executeDocAssignment error:', err);
    await sendTelegramMessage(botToken, chatId, `❌ ดำเนินการไม่สำเร็จ: ${err.message}`);
  }
}

/** สร้าง Supabase client โดยใช้ Service Role Key เพื่อก้าวข้ามสิทธิ์ RLS */
function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables.');
  }
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export default async function handler(req: any, res: any) {
  // รองรับเฉพาะ POST Webhook เท่านั้น
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // --- 1. รับค่า school_id จาก URL query parameter ---
  const schoolId = req.query?.school_id as string;
  if (!schoolId) {
    return res.status(400).json({ message: 'Missing school_id query parameter' });
  }

  try {
    const supabase = getSupabase();

    // --- 2. ค้นหา token ของบอท Telegram จากตาราง schools ---
    const { data: school, error: schoolErr } = await supabase
      .from('schools')
      .select('school_name, telegram_bot_token')
      .eq('id', schoolId)
      .single();

    if (schoolErr || !school?.telegram_bot_token) {
      console.error('[TELEGRAM WEBHOOK ERROR] School or Token not found:', schoolErr);
      return res.status(400).json({ 
        message: 'Invalid school_id or missing telegram_bot_token', 
        error: schoolErr ? schoolErr.message : 'Missing telegram_bot_token' 
      });
    }

    const botToken = school.telegram_bot_token;

    // ดึงคีย์สำหรับใช้งาน AI (Gemini) และปีการศึกษา จากตาราง settings
    const { data: settings } = await supabase
      .from('settings')
      .select('gemini_api_key, ai_cowork_api_key, current_academic_year')
      .eq('school_id', schoolId)
      .maybeSingle();

    const currentYear = settings?.current_academic_year || '2569';
    const rawApiKey = settings?.ai_cowork_api_key || settings?.gemini_api_key;
    let apiKey = '';
    if (rawApiKey) {
      if (rawApiKey.includes(',')) {
        const keys = rawApiKey.split(',').map((k: string) => k.trim()).filter(Boolean);
        apiKey = keys[Math.floor(Math.random() * keys.length)] || '';
      } else {
        apiKey = rawApiKey.trim();
      }
    }

    // --- 3. แกะ payload ที่ Telegram ส่งมา ---
    const update = req.body;
    const message = update?.message;
    const callbackQuery = update?.callback_query;

    // จัดการ callback_query (ปุ่มกดแบบ Inline Keyboard)
    if (callbackQuery) {
      // 1. ตอบรับ callback query ทันทีป้องกันหน้าจอปุ่มค้างหมุน
      await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: callbackQuery.id }),
      });

      const callbackData = callbackQuery.data;
      const callbackChatId = callbackQuery.message?.chat?.id;
      const userTelegramId = callbackQuery.from?.id;

      if (!callbackData || !callbackChatId || !userTelegramId) {
        return res.status(200).json({ ok: true });
      }

      // 2. ดึงข้อมูล Profile ของผู้กดปุ่มเพื่อตรวจสอบสิทธิ์
      const { data: profileLinked, error: linkErr } = await supabase
        .from('profiles')
        .select('id, display_name, role, signature_url')
        .eq('telegram_chat_id', String(userTelegramId))
        .eq('school_id', schoolId)
        .maybeSingle();

      if (linkErr || !profileLinked) {
        await sendTelegramMessage(botToken, callbackChatId, '❌ ขออภัยค่ะ ชบาหาบัญชีที่ผูกกับ Telegram ของคุณครูไม่พบค่ะ กรุณาผูกบัญชีของท่านในระบบก่อนใช้งานฟังก์ชันนี้หน้าตู้ควบคุมนะคะ 🌸');
        return res.status(200).json({ ok: true });
      }

      // 3. แยก params วิเคราะห์ action
      const params = new URLSearchParams(callbackData);
      const action = params.get('action');

      if (action === 'start_assign') {
        const docId = params.get('id');
        if (profileLinked.role !== 'director' && profileLinked.role !== 'admin') {
          await sendTelegramMessage(botToken, callbackChatId, '❌ ขออภัยค่ะ ปุ่มนี้สำหรับผู้อำนวยการ/ผู้รักษาการดำเนินการเกษียณสั่งการเท่านั้นนะคะ 🌸');
          return res.status(200).json({ ok: true });
        }

        const { data: doc } = await supabase
          .from('incoming_docs')
          .select('subject')
          .eq('id', docId)
          .single();

        if (!doc) {
          await sendTelegramMessage(botToken, callbackChatId, '❌ ไม่พบข้อมูลหนังสือรับชิ้นนี้ในระบบค่ะ');
          return res.status(200).json({ ok: true });
        }

        // ดึงรายชื่อคุณครู active ทั้งหมด
        const { data: teachers } = await supabase
          .from('teachers')
          .select('*')
          .eq('status', 'active')
          .order('first_name');

        if (!teachers || teachers.length === 0) {
          await sendTelegramMessage(botToken, callbackChatId, '❌ ไม่พบรายชื่อคุณครูในระบบสำหรับมอบหมายงานค่ะ');
          return res.status(200).json({ ok: true });
        }

        // สร้าง Inline Keyboard ปุ่มรายชื่อครู (2 คอลัมน์)
        const inlineKeyboard: any[] = [];
        for (let i = 0; i < teachers.length; i += 2) {
          const row: any[] = [];
          const t1 = teachers[i];
          const t2 = teachers[i + 1];
          
          row.push({
            text: `🧑‍🏫 ${t1.prefix || ''}${t1.first_name} ${t1.last_name.substring(0, 3)}.`,
            callback_data: `action=assign&doc_id=${docId}&teacher_id=${t1.id}`
          });
          
          if (t2) {
            row.push({
              text: `🧑‍🏫 ${t2.prefix || ''}${t2.first_name} ${t2.last_name.substring(0, 3)}.`,
              callback_data: `action=assign&doc_id=${docId}&teacher_id=${t2.id}`
            });
          }
          inlineKeyboard.push(row);
        }

        await sendTelegramMessage(
          botToken,
          callbackChatId,
          `🧑‍🏫 กรุณาเลือกคุณครูผู้รับมอบงานสำหรับเอกสารเรื่อง <b>"${doc.subject}"</b> ด้านล่างนี้ค่ะ:`,
          { inline_keyboard: inlineKeyboard }
        );

      } else if (action === 'assign') {
        const docId = params.get('doc_id');
        const teacherId = params.get('teacher_id');

        if (profileLinked.role !== 'director' && profileLinked.role !== 'admin') {
          await sendTelegramMessage(botToken, callbackChatId, '❌ ไม่มีสิทธิ์ดำเนินการค่ะ');
          return res.status(200).json({ ok: true });
        }

        const options = ['มอบดำเนินการ', 'ทราบ/ถือปฏิบัติ', 'ประสานงานต่อ', 'พิมพ์ระบุคำสั่งเอง'];
        const inlineKeyboard = options.map(opt => {
          if (opt === 'พิมพ์ระบุคำสั่งเอง') {
            return [{
              text: opt,
              callback_data: `action=confirm_assign&doc_id=${docId}&teacher_id=${teacherId}&instruction=manual`
            }];
          } else {
            return [{
              text: `สั่งการ: ${opt}`,
              callback_data: `action=confirm_assign&doc_id=${docId}&teacher_id=${teacherId}&instruction=${opt}`
            }];
          }
        });

        await sendTelegramMessage(
          botToken,
          callbackChatId,
          '✍️ เลือกคำสั่งการเกษียณสั่งการหนังสือ หรือเลือกพิมพ์แบบเจาะจงเองด้านล่างค่ะ:',
          { inline_keyboard: inlineKeyboard }
        );

      } else if (action === 'confirm_assign') {
        const docId = params.get('doc_id') || '';
        const teacherId = params.get('teacher_id') || '';
        const instruction = params.get('instruction') || 'มอบดำเนินการ';

        if (profileLinked.role !== 'director' && profileLinked.role !== 'admin') {
          await sendTelegramMessage(botToken, callbackChatId, '❌ ไม่มีสิทธิ์ดำเนินการค่ะ');
          return res.status(200).json({ ok: true });
        }

        if (instruction === 'manual') {
          const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
          await supabase
            .from('line_action_states')
            .insert([{
              user_id: `telegram:${userTelegramId}`,
              action: 'awaiting_assign_instruction',
              context: { doc_id: docId, teacher_id: teacherId },
              expires_at: expiresAt
            }]);
          await sendTelegramMessage(botToken, callbackChatId, '💬 กรุณาพิมพ์ข้อความคำสั่งการของคุณครูส่งเข้ามาในแชทนี้ได้เลยค่ะ 🌸');
        } else {
          await executeDocAssignment(docId, teacherId, instruction, botToken, callbackChatId, profileLinked, supabase);
        }
      } else if (action === 'broadcast_group') {
        const assignId = params.get('assign_id');
        const { data: assign } = await supabase
          .from('doc_assignments')
          .select('*, incoming_docs(subject, doc_number, file_url), teachers(prefix, first_name, last_name)')
          .eq('id', assignId)
          .single();

        if (assign) {
          const { data: settings } = await supabase
            .from('settings')
            .select('telegram_group_id')
            .eq('school_id', schoolId)
            .maybeSingle();

          if (settings?.telegram_group_id) {
            const teacherName = `${assign.teachers?.prefix || ''}${assign.teachers?.first_name} ${assign.teachers?.last_name}`;
            const broadcastMsg = `📢 <b>ประชาสัมพันธ์ / แจ้งเพื่อทราบ</b>\n\n• <b>เรื่อง</b>: ${assign.incoming_docs?.subject}\n• <b>เลขที่หนังสือ</b>: ${assign.incoming_docs?.doc_number}\n• <b>ผู้รับมอบหมาย</b>: ${teacherName}\n• <b>คำสั่งการ/การดำเนินการ</b>: ${assign.instruction}\n\n📄 <a href="${assign.incoming_docs?.file_url}">เปิดดูเอกสารสั่งการที่ลงนามแล้ว</a>`;

            await sendTelegramMessage(botToken, settings.telegram_group_id, broadcastMsg);
            await sendTelegramMessage(botToken, callbackChatId, '✅ ได้ทำการประชาสัมพันธ์ข่าวสารเรื่องนี้เข้ากลุ่มกลางเรียบร้อยแล้วค่ะ 📢');
          } else {
            await sendTelegramMessage(botToken, callbackChatId, '⚠️ ไม่พบข้อมูลกลุ่มกลางในตารางตั้งค่าค่ะ กรุณาตั้งค่ากลุ่มกลางก่อนนะคะ');
          }
        }
      }

      return res.status(200).json({ ok: true });
    }

    // หากไม่มีข้อความหรือแชทไอดี ไม่ประมวลผลต่อ
    if (!message?.text || !message?.chat?.id) {
      return res.status(200).json({ ok: true });
    }

    const chatId = message.chat.id;
    const rawText = message.text.trim();
    const userTelegramId = message.from?.id;

    // ดักรับคำสั่งหา Chat ID / Group ID ทันทีเพื่อความสะดวกของคุณครู
    const lowerText = rawText.toLowerCase();
    if (lowerText.startsWith('/id') || lowerText.startsWith('/groupid')) {
      await sendTelegramMessage(
        botToken,
        chatId,
        `🆔 <b>รหัสแชทนี้ (Chat ID):</b> <code>${chatId}</code>\n\n*(คุณครูสามารถคัดลอกเลขตัวนี้ไปกรอกในระบบได้เลยค่ะ)*`
      );
      return res.status(200).json({ ok: true });
    }

    // --- 4. ดำเนินการผูกบัญชีด้วย Deep Linking (/start auth_<base64_email>) ---
    if (rawText.startsWith('/start ')) {
      const authToken = rawText.replace('/start ', '').trim();
      
      if (!authToken.startsWith('auth_')) {
        await sendTelegramMessage(botToken, chatId, '❌ รูปแบบลิงก์การผูกบัญชีไม่ถูกต้อง กรุณากดปุ่มผูกบัญชีจากในระบบใหม่อีกครั้ง');
        return res.status(200).json({ ok: true });
      }

      const base64Part = authToken.replace('auth_', '');
      let email = '';
      try {
        email = Buffer.from(base64Part, 'base64').toString('utf-8');
      } catch (decodeErr) {
        await sendTelegramMessage(botToken, chatId, '❌ ไม่สามารถถอดรหัสข้อมูลการผูกบัญชีได้ กรุณาลองใหม่อีกครั้ง');
        return res.status(200).json({ ok: true });
      }

      if (!email || !email.includes('@')) {
        await sendTelegramMessage(botToken, chatId, '❌ ข้อมูลอีเมลในการผูกบัญชีไม่ถูกต้อง');
        return res.status(200).json({ ok: true });
      }

      // ค้นหาโปรไฟล์คุณครูจากอีเมลและรหัสโรงเรียน
      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('id, display_name')
        .eq('email', email.toLowerCase().trim())
        .eq('school_id', schoolId)
        .maybeSingle();

      if (profileErr || !profile) {
        console.error('[TELEGRAM WEBHOOK LINKING ERROR]', profileErr);
        await sendTelegramMessage(
          botToken, 
          chatId, 
          `❌ ไม่พบบัญชีผู้ใช้ที่มีอีเมล <b>${email}</b> ในระบบของโรงเรียนนี้ กรุณาลงทะเบียนบัญชีผู้ใช้ในระบบสารบรรณก่อน`
        );
        return res.status(200).json({ ok: true });
      }

      // อัปเดต telegram_chat_id ลงในตาราง profiles ของครูผู้ใช้รายนั้น
      const { error: updateErr } = await supabase
        .from('profiles')
        .update({ telegram_chat_id: String(chatId) })
        .eq('id', profile.id);

      if (updateErr) {
        console.error('[TELEGRAM WEBHOOK UPDATE ERROR]', updateErr);
        await sendTelegramMessage(botToken, chatId, '❌ ระบบไม่สามารถบันทึกข้อมูลได้ชั่วคราว กรุณาติดต่อผู้ดูแลระบบ');
        return res.status(200).json({ ok: true });
      }

      const name = profile.display_name || 'คุณครู';
      await sendTelegramMessage(
        botToken,
        chatId,
        `🎉 <b>ผูกบัญชีสำเร็จเรียบร้อย!</b>\n\nยินดีต้อนรับคุณครู <b>${name}</b> เข้าสู่ระบบการแจ้งเตือนสารบรรณผ่าน Telegram\nระบบจะส่งข้อความแจ้งเตือนคำสั่ง, มอบหมายงาน และเอกสารราชการต่างๆ มายังห้องแชทนี้โดยตรงอัตโนมัติค่ะ 📬`
      );
      return res.status(200).json({ ok: true });
    }

    // --- 5. ตอบกลับข้อความทั่วไป ---
    // ตรวจสอบว่าแชทไอดีนี้ผูกบัญชีไว้กับโรงเรียนนี้แล้วหรือยัง
    const { data: profileLinked, error: linkErr } = await supabase
      .from('profiles')
      .select('id, display_name, role')
      .eq('telegram_chat_id', String(userTelegramId))
      .eq('school_id', schoolId)
      .maybeSingle();

    if (linkErr || !profileLinked) {
      await sendTelegramMessage(
        botToken,
        chatId,
        '🔗 <b>แชทนี้ยังไม่ได้เชื่อมต่อระบบสารบรรณ</b>\n\nกรุณาเข้าสู่ระบบสารบรรณโรงเรียนบนเว็บไซต์หรือคอมพิวเตอร์ จากนั้นไปที่หน้า "โปรไฟล์ส่วนตัว" และกดปุ่ม <b>"ผูกบัญชี Telegram"</b> เพื่อเปิดระบบแจ้งเตือนค่ะ'
      );
      return res.status(200).json({ ok: true });
    }

    // ตรวจสอบสถานะการพิมพ์ข้อความสั่งการ/รายงานผล (Stateful Conversation)
    const { data: activeState } = await supabase
      .from('line_action_states')
      .select('*')
      .eq('user_id', `telegram:${userTelegramId}`)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (activeState) {
      if (activeState.action === 'awaiting_assign_instruction') {
        const { doc_id, teacher_id } = activeState.context || {};
        await supabase.from('line_action_states').delete().eq('id', activeState.id);
        await executeDocAssignment(doc_id, teacher_id, rawText, botToken, chatId, profileLinked, supabase);
        return res.status(200).json({ ok: true });
      }
    }

    // จัดการข้อความสนทนาทั่วไป
    const isGroup = chatId < 0;
    const botMention = `@${school.telegram_bot_token?.split(':')[0] || 'ChabaSchoolBot'}`;
    const isMentioned = !isGroup || rawText.includes(botMention) || rawText.includes('ชบา') || rawText.includes('น้องชบา');

    if (isGroup && !isMentioned) {
      // อยู่ในกลุ่มแต่ไม่ได้กล่าวถึงบอท ไม่ตอบเพื่อประหยัดโควตาและลดความรำคาญ
      return res.status(200).json({ ok: true });
    }

    // จัดการข้อความ (ล้าง mention ออกเพื่อให้ AI ตอบได้ดีขึ้น)
    const cleanedText = rawText.replace(new RegExp(botMention, 'g'), '').trim();

    try {
      // 1. Smart Data Fetch — ดึงข้อมูลจริงจากฐานข้อมูลตามหมวดคำถาม
      const contextData = await smartFetchContext(cleanedText, currentYear, supabase, schoolId);
      console.log(`[TELEGRAM WEBHOOK] Context Data size: ${contextData.length} chars`);

      // 2. นับจำนวนบุคลากร
      const { count: staffCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('school_id', schoolId);

      if (apiKey) {
        // --- โหมด AI อัจฉริยะ (Jarvis Mode V2 with Strict Rules) ---
        const systemPrompt = `คุณคือ "น้องชบา AI" ผู้ช่วยอัจฉริยะระบบงานธุรการและสารบรรณของ ${school.school_name || 'โรงเรียน'} (ห้ามใช้คำว่า AI Cowork หรือ AI เด็ดขาด)
ลักษณะนิสัย: สุภาพ อ่อนน้อม ใช้ "ค่ะ/นะคะ" แทนตัวว่า "ชบา" หรือ "หนู" (ห้ามใช้หางเสียง "ครับ" หรือคำพูดเชิงผู้ชายเด็ดขาด)
คล้ายกับบอท J.A.R.V.I.S. ในไอรอนแมน (ผู้ช่วยสมองกลอัจฉริยะ)

กฎเหล็ก:
- ตอบเฉพาะ "คำตอบสุดท้ายที่จะส่งให้ครู" โดยใส่ไว้ในแท็ก <ans>...</ans> เท่านั้น
- ห้ามพิมพ์ขั้นตอนการคิด (Thinking), ห้ามทวนคำถาม, ห้ามเกริ่นนำใดๆ นอกแท็ก <ans>
- ห้ามจินตนาการ ห้ามสร้าง คาดเดา หรือสมมติข้อมูลใดๆ เช่น ชื่อคน ชื่อโครงการ วันที่ หรือตัวเลขขึ้นมาเองโดยเด็ดขาด หากข้อมูลไม่อยู่ใน "ข้อมูลฐานข้อมูลโรงเรียน" ที่ส่งมา ให้ตอบอย่างสุภาพว่าไม่พบข้อมูลดังกล่าวในระบบ
- ให้ใช้รูปแบบ HTML สำหรับ Telegram ในการจัดรูปแบบข้อความเท่านั้น **ห้ามใช้รูปแบบ Markdown (เช่น ห้ามใช้ ** หรือ [ข้อความ](ลิงก์) เด็ดขาด)**:
  * ใช้ <b>ข้อความตัวหนา</b> สำหรับตัวหนา (เช่น <b>เรื่อง:</b> หรือ <b>รายละเอียด:</b>)
  * ใช้ <i>ข้อความตัวเอียง</i> สำหรับตัวเอียง
  * ใช้ <code>รหัส</code> สำหรับข้อความโค้ดหรือ ID
- การจัดรูปแบบลิงก์ (สำคัญมาก):
  * ห้ามแสดงลิงก์ URL ยาวๆ แบบดิบ และห้ามใช้วงเล็บลิงก์แบบ Markdown [ลิงก์](URL) เด็ดขาด
  * ให้แปลงเป็นลิงก์ HTML สวยงามโดยใช้แท็ก <a href="URL">ข้อความอ้างอิงสวยงามเป็นภาษาไทย</a> เสมอ เช่น <a href="file_url">🔗 ดาวน์โหลดหนังสือนำส่งหลัก</a> หรือ <a href="attachment_url">📎 เปิดเอกสารแนบ</a>
- การแยกแยะไฟล์ของหนังสือรับ (incoming_docs):
  * "หนังสือนำส่งหลัก" ใช้ลิงก์จาก file_url
  * "ไฟล์แนบ" หรือ "สิ่งที่ส่งมาด้วย" ใช้ลิงก์จาก attachment_urls
- ห้ามใช้สัญลักษณ์ดอกจันเดี่ยว (*) ในการทำ Bullet point ให้ใช้ "•" หรือ "-" แทน
- ใช้ Emoji ให้ดูเป็นมิตร เว้นบรรทัดให้อ่านง่าย
- ห้ามใช้ Markdown Table ให้ใช้ Bullet points แทน

ข้อมูลคุณครูผู้คุยกับคุณ:
- ชื่อ: ${profileLinked.display_name}
- บทบาท: ${profileLinked.role === 'director' ? 'ผู้อำนวยการโรงเรียน' : profileLinked.role === 'admin' ? 'ผู้ดูแลระบบ (Admin)' : 'คุณครูผู้ปฏิบัติงาน'}
- จำนวนบุคลากรในระบบ: ${staffCount || 0} คน`;

        const userPrompt = `ข้อมูลฐานข้อมูลโรงเรียน: ${contextData || 'ไม่พบข้อมูลที่เกี่ยวข้องในฐานข้อมูล'}\nปีการศึกษา: ${currentYear}\nคำถามของคุณครู: "${cleanedText}"\nกรุณาตอบในแท็ก <ans> ให้ชบาหน่อยนะคะ`;

        const rawResponse = await callGemini(systemPrompt, userPrompt, apiKey);

          if (rawResponse) {
            // 3. Answer Extraction — สกัดคำตอบจากแท็ก <ans>...</ans>
            let finalAnswer = "";
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

            // 4. Answer Polish — ทำความสะอาดคำตอบ
            finalAnswer = finalAnswer
              .replace(/AI Cowork/gi, 'น้องชบา')
              .replace(/ครับ/g, 'ค่ะ')
              .replace(/^\s*\*\s+/gm, '• ')
              .split('\n')
              .filter(line => !line.match(/^\s*(\*|-)?\s*(Identity|Role|User|Context|Input|Logic|Drafting|Winner|Step|Goal|Strict|Formatting|Section|Check|Evaluation|Actionable|Final|Plan|Result).*?:/i))
              .join('\n')
              .trim();

            if (finalAnswer) {
              await sendTelegramMessage(botToken, chatId, finalAnswer);
            } else {
              await sendTelegramMessage(botToken, chatId, `📬 สวัสดีค่ะคุณครู <b>${profileLinked.display_name || ''}</b>\nขณะนี้ระบบพร้อมใช้งานแจ้งเตือนหนังสือราชการและงานสารบรรณแล้วค่ะ หากมีคำสั่งหรือการมอบหมายงานใหม่ ระบบจะทักมาโดยอัตโนมัติค่ะ`);
            }
          } else if (contextData) {
            // Fallback: หาก AI ล่ม แต่มีข้อมูลจาก DB → ส่งข้อมูลดิบกลับ
            const fallbackMsg = `📊 ชบาขอส่งข้อมูลโดยตรงจากฐานข้อมูลให้ดังนี้นะคะ:\n\n${contextData.substring(0, 3500)}`;
            await sendTelegramMessage(botToken, chatId, fallbackMsg);
          } else {
            await sendTelegramMessage(botToken, chatId, `ขออภัยนะคะคุณครู ตอนนี้ระบบสมองของชบามีการเชื่อมต่อขัดข้องชั่วคราวค่ะ รบกวนลองใหม่อีกครั้งในภายหลังนะคะ 🙏🌸`);
          }
        } else if (contextData) {
          // --- โหมดไม่มี API Key แต่มีข้อมูลจาก DB ---
          const fallbackMsg = `📊 ข้อมูลจากฐานข้อมูลโรงเรียน:\n\n${contextData.substring(0, 3500)}`;
          await sendTelegramMessage(botToken, chatId, fallbackMsg);
        } else {
          await sendTelegramMessage(botToken, chatId, `📬 สวัสดีค่ะคุณครู <b>${profileLinked.display_name || ''}</b>\nขณะนี้ระบบพร้อมใช้งานแจ้งเตือนหนังสือราชการและงานสารบรรณแล้วค่ะ หากมีคำสั่งหรือการมอบหมายงานใหม่ ระบบจะทักมาโดยอัตโนมัติค่ะ`);
        }
      } catch (aiErr) {
        console.error('[GEMINI TELEGRAM BOT ERROR]', aiErr);
        await sendTelegramMessage(botToken, chatId, `📬 สวัสดีค่ะคุณครู <b>${profileLinked.display_name || ''}</b>\nขณะนี้ระบบพร้อมใช้งานแจ้งเตือนหนังสือราชการและงานสารบรรณแล้วค่ะ หากมีคำสั่งหรือการมอบหมายงานใหม่ ระบบจะทักมาโดยอัตโนมัติค่ะ`);
      }

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('[TELEGRAM WEBHOOK CRITICAL ERROR]', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
