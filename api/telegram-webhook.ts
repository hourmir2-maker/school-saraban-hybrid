declare const process: any;
import { createClient } from '@supabase/supabase-js';

// ============================================================
// Telegram Bot Webhook API
// รับ Webhook จาก Telegram เพื่อผูกบัญชีครูรายบุคคลและตอบกลับทั่วไป
// URL Webhook: https://your-domain.vercel.app/api/telegram-webhook?school_id=uuid
// ============================================================

/** ส่งข้อความกลับหาผู้ใช้ทาง Telegram Bot API */
async function sendTelegramMessage(botToken: string, chatId: number, text: string) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML'
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

    // ดึงคีย์สำหรับใช้งาน AI (Gemini) จากตาราง settings
    const { data: settings } = await supabase
      .from('settings')
      .select('gemini_api_key, ai_cowork_api_key')
      .eq('school_id', schoolId)
      .maybeSingle();

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

    // จัดการ callback_query (ถ้ามี) เพื่อหลีกเลี่ยง loading ค้างบนปุ่มบอท
    if (callbackQuery) {
      await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: callbackQuery.id }),
      });
      return res.status(200).json({ ok: true });
    }

    // หากไม่มีข้อความหรือแชทไอดี ไม่ประมวลผลต่อ
    if (!message?.text || !message?.chat?.id) {
      return res.status(200).json({ ok: true });
    }

    const chatId = message.chat.id;
    const rawText = message.text.trim();

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
      .eq('telegram_chat_id', String(chatId))
      .eq('school_id', schoolId)
      .maybeSingle();

    if (linkErr || !profileLinked) {
      await sendTelegramMessage(
        botToken,
        chatId,
        '🔗 <b>แชทนี้ยังไม่ได้เชื่อมต่อระบบสารบรรณ</b>\n\nกรุณาเข้าสู่ระบบสารบรรณโรงเรียนบนเว็บไซต์หรือคอมพิวเตอร์ จากนั้นไปที่หน้า "โปรไฟล์ส่วนตัว" และกดปุ่ม <b>"ผูกบัญชี Telegram"</b> เพื่อเปิดระบบแจ้งเตือนค่ะ'
      );
    } else {
      const lowerText = rawText.toLowerCase();
      
      // ดักคำสั่งพื้นฐานก่อน หากต้องการใช้ความเร็วสูงหรือไม่ประมวลผลผ่าน AI
      if (lowerText.includes('ข้อมูลฉัน') || lowerText.includes('profile') || lowerText.includes('สิทธิ์')) {
        let roleName = 'คุณครูทั่วไป';
        if (profileLinked.role === 'admin') roleName = 'ผู้ดูแลระบบ (Admin)';
        else if (profileLinked.role === 'director') roleName = 'ผู้อำนวยการ (Director)';
        
        await sendTelegramMessage(
          botToken,
          chatId,
          `👤 <b>ข้อมูลผู้ใช้งานในระบบ:</b>\n\n• <b>ชื่อแสดง</b>: ${profileLinked.display_name}\n• <b>บทบาท</b>: ${roleName}\n• <b>สังกัด</b>: ${school.school_name || 'โรงเรียนหลัก'}`
        );
      } else if (apiKey) {
        // --- เรียกใช้ Jarvis Mode (Gemini AI Conversation) ---
        try {
          // สอบถามจำนวนบุคลากรแบบเรียลไทม์เพื่อแจ้งให้ AI ทราบ
          const { count: staffCount } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('school_id', schoolId);

          // สอบถามข้อมูลความรู้โรงเรียน (RAG) จากตาราง school_knowledge (AI Cowork)
          let contextText = '';
          try {
            let skQuery = supabase
              .from('school_knowledge')
              .select('document_name, chunk_text')
              .or(`chunk_text.ilike.%${rawText}%,document_name.ilike.%${rawText}%`);
            if (schoolId) skQuery = skQuery.eq('school_id', schoolId);
            const { data: knowledge } = await skQuery.limit(3);
            
            if (knowledge && knowledge.length > 0) {
              contextText = "\n\nข้อมูลอ้างอิงจากคลังความรู้โรงเรียน (AI Cowork):\n" + 
                knowledge.map((k: any) => `[ไฟล์: ${k.document_name}] ${k.chunk_text}`).join('\n');
            }
          } catch (ragErr) {
            console.error('[TELEGRAM WEBHOOK RAG ERROR]', ragErr);
          }

          const systemPrompt = `คุณคือ "น้องชบา AI" ผู้ช่วยอัจฉริยะระบบงานธุรการและสารบรรณของ ${school.school_name || 'โรงเรียน'}
บทบาทหน้าที่ของคุณ:
1. ทำการโต้ตอบกับคุณครูอย่างชาญฉลาดและเป็นมิตร มีบุคลิกสุภาพเรียบร้อย มีหางเสียง "ค่ะ/นะคะ"
2. คล้ายกับบอท J.A.R.V.I.S. ในไอรอนแมน (ผู้ช่วยสมองกลอัจฉริยะ)
3. ตอบคำถามเกี่ยวกับการใช้งานระบบสารบรรณและธุรการโรงเรียน เช่น อนุมัติเอกสาร เกษียณเอกสาร ดูรายงาน โดยอิงข้อมูลจากชื่อผู้ใช้
4. สามารถคุยทั่วไปหรือช่วยตอบคำถามความรู้ทางวิชาการและงานธุรการได้ดีเยี่ยม
5. หากมี "ข้อมูลอ้างอิงจากคลังความรู้โรงเรียน (AI Cowork)" ด้านล่าง ให้ใช้ข้อมูลนั้นเพื่อตอบคำถามคุณครูอย่างถูกต้องแม่นยำ และอย่าลืมระบุชื่อไฟล์อ้างอิงด้วยนะคะ

ข้อมูลคุณครูผู้คุยกับคุณ:
- ชื่อคุณครู: ${profileLinked.display_name}
- บทบาทหน้าที่: ${profileLinked.role === 'director' ? 'ผู้อำนวยการโรงเรียน' : profileLinked.role === 'admin' ? 'ผู้ดูแลระบบ (Admin)' : 'คุณครูผู้ปฏิบัติงาน'}
- จำนวนบุคลากรทั้งหมดในระบบของโรงเรียนในขณะนี้: ${staffCount || 0} คน${contextText}`;

          const aiReply = await callGemini(systemPrompt, rawText, apiKey);
          if (aiReply) {
            await sendTelegramMessage(botToken, chatId, aiReply);
          } else {
            // กรณี API ผิดพลาด ตกกลับไปใช้ข้อความตอบกลับเริ่มต้น
            await sendTelegramMessage(
              botToken,
              chatId,
              `📬 สวัสดีค่ะคุณครู <b>${profileLinked.display_name || ''}</b>\nขณะนี้ระบบพร้อมใช้งานแจ้งเตือนหนังสือราชการและงานสารบรรณแล้วค่ะ หากมีคำสั่งหรือการมอบหมายงานใหม่ ระบบจะทักมาโดยอัตโนมัติค่ะ`
            );
          }
        } catch (aiErr) {
          console.error('[GEMINI TELEGRAM BOT ERROR]', aiErr);
          await sendTelegramMessage(
            botToken,
            chatId,
            `📬 สวัสดีค่ะคุณครู <b>${profileLinked.display_name || ''}</b>\nขณะนี้ระบบพร้อมใช้งานแจ้งเตือนหนังสือราชการและงานสารบรรณแล้วค่ะ หากมีคำสั่งหรือการมอบหมายงานใหม่ ระบบจะทักมาโดยอัตโนมัติค่ะ`
          );
        }
      } else {
        // --- โหมดธรรมดา (เมื่อไม่มี Gemini API Key) ---
        if (lowerText.includes('โรงเรียน') || lowerText.includes('ชื่อโรงเรียน') || lowerText.includes('ที่ไหน') || lowerText.includes('school')) {
          await sendTelegramMessage(
            botToken,
            chatId,
            `🏫 บอทสารบรรณนี้ผูกอยู่กับ <b>${school.school_name || 'โรงเรียนหลัก'}</b> ค่ะคุณครู <b>${profileLinked.display_name}</b>`
          );
        } else {
          await sendTelegramMessage(
            botToken,
            chatId,
            `📬 สวัสดีค่ะคุณครู <b>${profileLinked.display_name || ''}</b>\nขณะนี้ระบบพร้อมใช้งานแจ้งเตือนหนังสือราชการและงานสารบรรณแล้วค่ะ หากมีคำสั่งหรือการมอบหมายงานใหม่ ระบบจะทักมาโดยอัตโนมัติค่ะ`
          );
        }
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('[TELEGRAM WEBHOOK CRITICAL ERROR]', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
