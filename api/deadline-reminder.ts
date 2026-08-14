declare const process: any;
import { createClient } from '@supabase/supabase-js';

async function sendTelegram(token: string, chatId: number, text: string, replyMarkup?: any) {
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        reply_markup: replyMarkup
      })
    });
  } catch (err) {
    console.error('[DEADLINE-REMINDER] sendTelegram error:', err);
  }
}

function toThaiDate(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    return d.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Bangkok'
    });
  } catch {
    return isoDate;
  }
}

function daysUntil(isoDate: string): number {
  const now = new Date();
  const target = new Date(isoDate);
  const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const diff = targetDay.getTime() - nowDay.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

function daysEmoji(days: number): string {
  if (days <= 0) return '🔴 <b>เลยกำหนดแล้ว!</b>';
  if (days === 1) return '🟠 <b>พรุ่งนี้!</b>';
  if (days <= 3) return `🟡 อีก <b>${days} วัน</b>`;
  return `🟢 อีก <b>${days} วัน</b>`;
}

export default async function handler(req: Request): Promise<Response> {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ error: 'Missing Supabase config' }), { status: 500 });
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: allSettings } = await supabase
      .from('settings')
      .select('school_id, telegram_bot_token, telegram_group_id');

    if (!allSettings || allSettings.length === 0) {
      return new Response(JSON.stringify({ message: 'No school settings found' }), { status: 200 });
    }

    let totalSent = 0;

    for (const setting of allSettings) {
      const { school_id: schoolId, telegram_bot_token: botToken, telegram_group_id: rawGroupId } = setting;
      if (!botToken || !rawGroupId) continue;

      const centralGroupId = rawGroupId.split('|')[0]?.trim();
      if (!centralGroupId) continue;
      const groupIdNum = parseInt(centralGroupId);
      if (isNaN(groupIdNum)) continue;

      const today = new Date();
      const in3Days = new Date(today);
      in3Days.setDate(today.getDate() + 3);

      let docsQuery = supabase
        .from('incoming_docs')
        .select(`
          id,
          doc_number,
          doc_sequence,
          subject,
          action_deadline,
          status,
          suggested_assignee_id,
          teachers:suggested_assignee_id (prefix, first_name, last_name)
        `)
        .not('action_deadline', 'is', null)
        .lte('action_deadline', in3Days.toISOString())
        .neq('status', 'completed')
        .neq('status', 'closed')
        .order('action_deadline', { ascending: true })
        .limit(10);

      if (schoolId) {
        docsQuery = docsQuery.eq('school_id', schoolId);
      }

      const { data: docs } = await docsQuery;
      if (!docs || docs.length === 0) continue;

      for (const doc of docs) {
        const days = daysUntil(doc.action_deadline);
        if (days < -1) continue;

        const receiveNo = doc.doc_sequence
          ? `${doc.doc_sequence}`
          : (doc.doc_number || '-');

        const teacher = (doc as any).teachers;
        const teacherName = teacher
          ? `${teacher.prefix || ''}${teacher.first_name} ${teacher.last_name}`
          : 'ยังไม่ได้มอบหมาย';

        const thaiDeadline = toThaiDate(doc.action_deadline);
        const urgencyText = daysEmoji(days);

        let msg = `⏰ <b>แจ้งเตือน: ใกล้ครบกำหนดดำเนินการ</b>\n`;
        msg += `${urgencyText}\n\n`;
        msg += `📄 <b>หนังสือเลขรับ:</b> ${receiveNo}\n`;
        msg += `📝 <b>เรื่อง:</b> ${doc.subject || '-'}\n`;
        msg += `🗓 <b>กำหนดส่ง:</b> ${thaiDeadline}\n`;
        msg += `🧑‍🏫 <b>ผู้รับผิดชอบ:</b> ${teacherName}\n`;

        if (days <= 0) {
          msg += `\n❗ <b>กรุณาดำเนินการและอัปเดตสถานะในระบบด่วน!</b>`;
        } else {
          msg += `\n⚠️ <b>กรุณาดำเนินการให้ทันกำหนดครับ</b>`;
        }

        const inlineButtons = {
          inline_keyboard: [
            [
              { text: '✅ ดำเนินการแล้ว', callback_data: `action=doc_complete&id=${doc.id}` },
              { text: '⏰ เลื่อน 3 วัน', callback_data: `action=doc_extend_3d&id=${doc.id}` }
            ]
          ]
        };

        await sendTelegram(botToken, groupIdNum, msg, inlineButtons);
        totalSent++;

        await new Promise(r => setTimeout(r, 300));
      }
    }

    return new Response(JSON.stringify({
      success: true,
      sent: totalSent,
      timestamp: new Date().toISOString()
    }), { status: 200 });

  } catch (err: any) {
    console.error('[DEADLINE-REMINDER] Error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
