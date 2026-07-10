import { supabase, getActiveSchoolProfile } from './supabase';

function getVercelBaseUrl(): string {
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
  return vercelBaseUrl;
}

/**
 * ส่งการแจ้งเตือนทาง Telegram (ทั้งห้องแชทส่วนตัวและห้องแชทกลุ่ม)
 * @param message ข้อความแจ้งเตือน (รองรับรูปแบบ HTML)
 * @param specificToId รหัสผู้รับปลายทาง (ถ้าละไว้ จะดึง telegram_group_id จากหน้าตั้งค่าโรงเรียนโดยอัตโนมัติ)
 */
export async function sendTelegramNotification(message: string, specificToId?: string, replyMarkup?: any) {
  try {
    const activeSchoolId = localStorage.getItem('active_school_id');
    if (!activeSchoolId) return;

    // ค้นหาค่าตั้งค่าจากตาราง settings
    const { data: settings } = await supabase
      .from('settings')
      .select('telegram_group_id')
      .eq('school_id', activeSchoolId)
      .maybeSingle();

    const targetId = specificToId || settings?.telegram_group_id;
    if (!targetId) {
      console.warn('[TELEGRAM NOTIFY] Skipping send: No recipient chat_id or group_id found.');
      return;
    }

    const vercelUrl = getVercelBaseUrl();
    const endpoint = `${vercelUrl}/api/telegram-notify`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        school_id: activeSchoolId,
        chat_id: targetId,
        message: message,
        reply_markup: replyMarkup
      })
    });

    const resData = await response.json();
    if (!response.ok || !resData.success) {
      console.error('[TELEGRAM NOTIFY ERROR DETAIL]', resData);
      throw new Error(resData.error?.description || 'Failed to send Telegram notification');
    }

    return resData;
  } catch (err) {
    console.error('[TELEGRAM NOTIFY ERROR]', err);
    throw err;
  }
}
