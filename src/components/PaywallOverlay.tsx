import React from 'react';
import { Crown, ShieldCheck, Sparkles, Lock, PhoneCall, HelpCircle } from 'lucide-react';

interface PaywallOverlayProps {
  featureName: string;
}

export default function PaywallOverlay({ featureName }: PaywallOverlayProps) {
  return (
    <div className="min-h-[500px] h-full w-full flex items-center justify-center p-6 bg-slate-50/50 animate-in fade-in duration-300">
      <div className="relative max-w-lg w-full bg-white rounded-3xl border border-amber-200 shadow-xl overflow-hidden p-8 text-center flex flex-col items-center">
        
        {/* Decorative Gold Header Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600" />

        {/* Lock / Crown Badge */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200 shadow-inner">
            <Crown className="text-amber-500 w-10 h-10 animate-bounce" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-red-500 text-white p-1.5 rounded-full border-2 border-white shadow">
            <Lock className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Header Text */}
        <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-widest border border-amber-200 mb-3">
          Premium Feature
        </span>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
          ฟีเจอร์นี้เฉพาะสิทธิ์พรีเมียมเท่านั้น
        </h2>
        <p className="text-slate-500 text-sm mb-6 max-w-sm">
          ระบบ <span className="font-bold text-amber-600">"{featureName}"</span> ได้รับการป้องกันสิทธิ์การใช้งาน กรุณาอัปเกรดสถานศึกษาเป็นระดับ Premium
        </p>

        {/* Benefits Container */}
        <div className="w-full bg-amber-50/30 rounded-2xl border border-amber-100/50 p-5 text-left mb-6 space-y-3">
          <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            สิทธิพิเศษระดับ Premium ที่โรงเรียนจะได้รับ:
          </h4>
          
          <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>ปลดล็อกการสร้าง<strong>หนังสือส่งออก, คำสั่งแต่งตั้ง, บันทึกข้อความ</strong>ได้ไม่จำกัด</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>ระบบ <strong>AI ช่วยร่างเอกสารราชการ</strong> อัจฉริยะ</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>Virtual Drive & Intelligence Hub (RAG)</strong> คลังความรู้โรงเรียน</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>เล่นและจัดการ<strong>บทเรียนการเรียนรู้ AR</strong> ได้ไม่จำกัดจำนวนครั้ง</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="w-full flex flex-col gap-2">
          <a
            href="mailto:ncrows77@gmail.com?subject=ขอเปิดสิทธิ์%20Premium%20ระบบสารบรรณ"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-750 text-white py-3 rounded-xl font-bold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 text-center"
          >
            <PhoneCall className="w-4 h-4" />
            ติดต่อแอดมินกลางเพื่ออัปเกรด Premium
          </a>
          <p className="text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-1">
            <HelpCircle className="w-3 h-3" />
            สิทธิ์การอนุมัติควบคุมโดย Super Admin เท่านั้น
          </p>
        </div>

      </div>
    </div>
  );
}
