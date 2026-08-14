declare const process: any;
import { createClient } from '@supabase/supabase-js';

async function sendTelegram(token: string, chatId: number, text: string, replyMarkup?: any) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        reply_markup: replyMarkup
      })
    });
    if (!res.ok) {
      const errBody = await res.json() as any;
      console.error('[DIRECTOR-REMINDER] Telegram API error:', errBody);
    }
  } catch (err) {
    console.error('[DIRECTOR-REMINDER] sendTelegram error:', err);
  }
}

function urgencyEmoji(urgency?: string): string {
  if (urgency === 'ด่วนที่สุด') return '🔴 <b>[ด่วนที่สุด]</b>';
  if (urgency === 'ด่วนมาก' || urgency === 'ด่วน') return '🟡 <b>[ด่วน]</b>';
  return '🟢 <b>[ปกติ]</b>';
}

function parseAttachmentUrls(raw: any): string[] {
  if (Array.isArray(raw)) return raw.filter(Boolean);
  if (typeof raw === 'string' && raw.trim().startsWith('[')) {
    try { return JSON.parse(raw).filter(Boolean); } catch { /* ignore */ }
  }
  return [];
}

export default async function handler(req: Request): Promise<Response> {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const now = new Date();
  const bangkokDateStr = now.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
  const bangkokDate = new Date(bangkokDateStr);
  const dayOfWeek = bangkokDate.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return new Response(JSON.stringify({ message: 'Skipped: Weekend day' }), { status: 200 });
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
      .select('school_id, school_name, telegram_bot_token, telegram_group_id');

    if (!allSettings || allSettings.length === 0) {
      return new Response(JSON.stringify({ message: 'No school settings found' }), { status: 200 });
    }

    let totalSent = 0;

    for (const setting of allSettings) {
      const { school_id: schoolId, school_name: schoolName, telegram_bot_token: botToken, telegram_group_id: rawGroupId } = setting;
      if (!botToken) continue;

      const proposalGroupIdStr = (rawGroupId || '').split('|')[1]?.trim() || (rawGroupId || '').split('|')[0]?.trim() || '';
      const proposalGroupIdNum = proposalGroupIdStr ? parseInt(proposalGroupIdStr, 10) : null;
      const validProposalGroupId = proposalGroupIdNum !== null && !isNaN(proposalGroupIdNum) ? proposalGroupIdNum : null;

      let docsQuery = supabase
        .from('incoming_docs')
        .select('id, doc_number, subject, from_agency, urgency, doc_date, file_url, attachment_urls, created_at', { count: 'exact' })
        .in('status', ['pending', 'waiting_proposal'])
        .order('created_at', { ascending: false })
        .limit(10);

      if (schoolId) {
        docsQuery = docsQuery.eq('school_id', schoolId);
      }

      const { data: pendingDocs, count: totalPending } = await docsQuery;
      const totalCount = (totalPending !== null && totalPending !== undefined) ? totalPending : (pendingDocs ? pendingDocs.length : 0);

      if (!pendingDocs || pendingDocs.length === 0 || totalCount === 0) continue;

      let dirQuery = supabase
        .from('profiles')
        .select('telegram_chat_id, display_name, role')
        .or('role.eq.director,role.eq.admin')
        .not('telegram_chat_id', 'is', null);

      if (schoolId) {
        dirQuery = dirQuery.eq('school_id', schoolId);
      }

      const { data: directorProfiles } = await dirQuery;

      const thaiDateText = bangkokDate.toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      let msg = `🌅 <b>[สรุปประจำวัน 08:00 น.] หนังสือรอเกษียณสั่งการ</b>\n`;
      msg += `🏫 <b>${schoolName || 'โรงเรียน'} (ประจำวันที่ ${thaiDateText})</b>\n\n`;
      msg += `⚠️ <b>เรียน ผอ.รร. ขณะนี้มีหนังสือรับเข้าคงค้างรอเกษียณสั่งการทั้งหมด ${totalCount} ฉบับ:</b>\n\n`;

      const inlineButtons: any[] = [];

      pendingDocs.forEach((doc, idx) => {
        const emoji = urgencyEmoji(doc.urgency);
        const docNumStr = doc.doc_number || (idx + 1).toString();
        msg += `${idx + 1}. ${emoji} <b>เรื่อง:</b> ${doc.subject || '-'}\n`;
        msg += `   • <b>จาก:</b> ${doc.from_agency || '-'}\n`;
        msg += `   • <b>เลขรับ:</b> ${docNumStr}\n`;

        if (doc.file_url) {
          msg += `   📄 <a href="${doc.file_url}">เปิดดูต้นฉบับ</a>`;
        }

        const atts = parseAttachmentUrls(doc.attachment_urls);
        if (atts.length > 0) {
          msg += ` | 📎 <b>ไฟล์แนบ:</b> `;
          atts.forEach((url: string, i: number) => {
            msg += `<a href="${url}">[แนบ ${i + 1}]</a> `;
          });
        }

        if (doc.file_url || atts.length > 0) msg += `\n`;
        msg += `\n`;

        if (inlineButtons.length < 5) {
          inlineButtons.push([{
            text: `✍️ สั่งการเรื่อง ${docNumStr}`,
            callback_data: `action=start_assign&id=${doc.id}`
          }]);
        }
      });

      if (totalCount > 10) {
        msg += `📌 <i>และยังมีหนังสือรอเกษียณอีก ${totalCount - 10} ฉบับในระบบ...</i>\n\n`;
      }

      msg += `💡 <i>ท่านสามารถกดปุ่ม "✍️ สั่งการ" ด้านล่างข้อความเพื่อดำเนินการผ่าน Telegram ได้ทันทีครับ</i>`;

      const replyMarkup = { inline_keyboard: inlineButtons };
      let sentCount = 0;

      if (directorProfiles && directorProfiles.length > 0) {
        for (const dir of directorProfiles) {
          if (dir.telegram_chat_id) {
            const chatIdNum = parseInt(String(dir.telegram_chat_id), 10);
            if (!isNaN(chatIdNum)) {
              await sendTelegram(botToken, chatIdNum, msg, replyMarkup);
              sentCount++;
              await new Promise(r => setTimeout(r, 200));
            }
          }
        }
      }

      if (sentCount === 0 && validProposalGroupId !== null) {
        await sendTelegram(botToken, validProposalGroupId, msg, replyMarkup);
        sentCount++;
      }

      totalSent += sentCount;
    }

    return new Response(JSON.stringify({
      success: true,
      sent: totalSent,
      timestamp: bangkokDate.toISOString()
    }), { status: 200 });

  } catch (err: any) {
    console.error('[DIRECTOR-REMINDER] Error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
