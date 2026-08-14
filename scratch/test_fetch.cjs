const { createClient } = require('@supabase/supabase-js');

const url = 'https://bnqfttmkakdjbktsrsqt.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucWZ0dG1rYWtkamJrdHNyc3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MTgwOTAsImV4cCI6MjA5ODI5NDA5MH0.FioDD90K1W-SHOMttOf_-bvvimLP2YNjCveTSoQ2OPs';

const supabase = createClient(url, key);

function extractClassLevel(message) {
  const match = message.match(/(?:ป|อ|ม)\.?\s*([1-6])(?:\s*\/\s*([1-9]))?/i);
  if (match) {
    const level = match[1];
    const room = match[2];
    const prefix = message.match(/ม\.?/i) ? 'ม' : message.match(/อ\.?/i) ? 'อ' : 'ป';
    return room ? `${prefix}.${level}/${room}` : `${prefix}.${level}`;
  }
  return null;
}

async function smartFetchContext(message, currentYear, supabase, schoolId, profileLinked) {
  const msg = message.toLowerCase();
  const targetClass = extractClassLevel(message);

  const rules = [
    {
      keys: ['ค้างเกษียณ', 'รอเกษียณ', 'ยังไม่ได้เกษียณ', 'ยังไม่เกษียณ', 'ผอ. ยังไม่ได้ทำ', 'ผอ. ยังไม่สั่ง', 'ค้างผอ', 'หนังสือค้าง', 'รอสั่งการ', 'ค้างสั่งการ'],
      fetch: async () => {
        let query = supabase.from('incoming_docs').select('doc_number, subject, from_agency, doc_date, urgency, status');
        if (schoolId) query = query.eq('school_id', schoolId);
        query = query.eq('status', 'pending');
        const { data, error } = await query.order('doc_date', { ascending: false }).limit(20);
        if (error) throw error;
        return `ข้อมูลหนังสือรับที่ยังค้างเสนอผู้อำนวยการเกษียณสั่งการ (สถานะ pending): ${JSON.stringify(data)}`;
      }
    },
    {
      keys: ['งานค้าง', 'งานค้างของฉัน', 'งานของฉัน', 'งานที่ยังไม่ได้ส่ง', 'ยังไม่ได้รายงาน', 'งานที่มอบหมายค้าง', 'งานมอบหมายค้าง'],
      fetch: async () => {
        if (!profileLinked || !profileLinked.email) return 'ไม่มีข้อมูลโปรไฟล์ผู้ใช้สำหรับสืบค้นงานค้างส่วนบุคคล';
        const { data: teacher, error: tErr } = await supabase
          .from('teachers')
          .select('id')
          .eq('email', profileLinked.email)
          .maybeSingle();
        if (tErr) throw tErr;
        if (!teacher) return `ไม่พบข้อมูลคุณครูในตารางระบบโรงเรียนสำหรับอีเมล: ${profileLinked.email}`;
        
        const { data: pendingAssigns, error: aErr } = await supabase
          .from('doc_assignments')
          .select('*, incoming_docs(subject, doc_number)')
          .eq('assignee_id', teacher.id)
          .in('status', ['pending', 'acknowledged'])
          .order('created_at', { ascending: false });
        if (aErr) throw aErr;
        return `รายการงานมอบหมายที่ยังค้างการรายงานผล/ครูยังทำไม่เสร็จ (สถานะ pending หรือ acknowledged) ของครูผู้สอบถาม: ${JSON.stringify(pendingAssigns)}`;
      }
    }
  ];

  for (const rule of rules) {
    if (rule.keys.some(key => msg.includes(key))) {
      try {
        const result = await rule.fetch();
        if (result) return result;
      } catch (err) {
        console.error(`Error in smartFetchContext for keys ${rule.keys[0]}:`, err);
        throw err; // throw ขึ้นไปให้เห็นในสคริปต์ทดสอบ
      }
    }
  }
  return "ไม่ตรงกับกฎ RAG ใดๆ";
}

async function test() {
  const schoolId = '662b2b1a-2895-46f9-bdcc-462a4d385fb9'; // ลองสุ่ม ID หรือเว้นว่าง
  const profileLinked = { email: 'teacher@school.ac.th' };
  
  try {
    console.log('--- ทดสอบคำว่า "รอเกษียณ" ---');
    const res1 = await smartFetchContext('รอเกษียณ', '2569', supabase, null, profileLinked);
    console.log('ผลลัพธ์:', res1);
    
    console.log('\n--- ทดสอบคำว่า "รอสั่งการ" ---');
    const res2 = await smartFetchContext('รอสั่งการ', '2569', supabase, null, profileLinked);
    console.log('ผลลัพธ์:', res2);
  } catch (err) {
    console.error('Test Failed with Error:', err);
  }
}

test();
