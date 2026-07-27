import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, ShieldCheck, X } from 'lucide-react';

interface ResetPasswordModalProps {
  onClose: () => void;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  bgColor: string;
}

function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: '', color: '', bgColor: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const levels: PasswordStrength[] = [
    { score: 0, label: '', color: '', bgColor: '' },
    { score: 1, label: 'อ่อน', color: 'text-red-500', bgColor: 'bg-red-400' },
    { score: 2, label: 'พอใช้', color: 'text-yellow-500', bgColor: 'bg-yellow-400' },
    { score: 3, label: 'ดี', color: 'text-blue-500', bgColor: 'bg-blue-400' },
    { score: 4, label: 'แข็งแรง', color: 'text-green-600', bgColor: 'bg-green-500' },
  ];
  return levels[score] || levels[0];
}

export default function ResetPasswordModal({ onClose }: ResetPasswordModalProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const strength = getPasswordStrength(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  const requirements = [
    { label: 'อย่างน้อย 6 ตัวอักษร', met: newPassword.length >= 6 },
    { label: 'มีตัวเลข (0-9)', met: /[0-9]/.test(newPassword) },
    { label: 'มีตัวพิมพ์ใหญ่ (A-Z)', met: /[A-Z]/.test(newPassword) },
    { label: 'มีอักขระพิเศษ (!@#$...)', met: /[^A-Za-z0-9]/.test(newPassword) },
  ];

  useEffect(() => {
    if (!isSuccess) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); onClose(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSuccess, onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPassword.length < 6) { setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'); return; }
    if (newPassword !== confirmPassword) { setError('รหัสผ่านทั้งสองช่องไม่ตรงกัน'); return; }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) throw updateError;
      setIsSuccess(true);
    } catch (err: any) {
      let msg = err.message || 'เกิดข้อผิดพลาด';
      if (msg.includes('same password')) msg = 'รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านเดิม';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-brand-primary p-6 text-white text-center relative">
          {!isSuccess && (
            <button onClick={onClose} className="absolute right-4 top-4 p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          )}
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
            {isSuccess ? <CheckCircle2 size={36} className="text-white" /> : <ShieldCheck size={36} className="text-white" />}
          </div>
          <h2 className="text-xl font-black">{isSuccess ? 'เปลี่ยนรหัสผ่านสำเร็จ!' : 'ตั้งรหัสผ่านใหม่'}</h2>
          {!isSuccess && <p className="text-green-100/80 text-sm mt-1">กรุณากรอกรหัสผ่านใหม่ที่ต้องการ</p>}
        </div>

        {/* Body */}
        <div className="p-6">
          {!isSuccess ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 font-medium animate-in fade-in">
                  {error}
                </div>
              )}

              {/* New Password */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">รหัสผ่านใหม่</label>
                <div className="relative">
                  <div className="absolute left-4 top-3.5 text-slate-400 pointer-events-none"><Lock size={16} /></div>
                  <input
                    type={showNew ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    className="w-full px-4 py-3 pl-10 pr-11 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold"
                    placeholder="กรอกรหัสผ่านใหม่"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600">
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {newPassword && (
                  <div className="mt-2 space-y-1 animate-in fade-in">
                    <div className="flex gap-1">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.bgColor : 'bg-slate-200'}`} />
                      ))}
                    </div>
                    {strength.label && <p className={`text-xs font-bold ml-1 ${strength.color}`}>ความแข็งแกร่ง: {strength.label}</p>}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">ยืนยันรหัสผ่านใหม่</label>
                <div className="relative">
                  <div className="absolute left-4 top-3.5 text-slate-400 pointer-events-none"><Lock size={16} /></div>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    className={`w-full px-4 py-3 pl-10 pr-11 border rounded-xl focus:outline-none focus:ring-2 transition-all bg-slate-50 font-bold ${
                      confirmPassword && !passwordsMatch ? 'border-red-300 focus:ring-red-200' :
                      confirmPassword && passwordsMatch ? 'border-green-300 focus:ring-green-200' :
                      'border-slate-200 focus:ring-brand-primary/20 focus:border-brand-primary'
                    }`}
                    placeholder="กรอกรหัสผ่านอีกครั้ง"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {confirmPassword && (
                  <p className={`text-xs font-bold mt-1 ml-1 ${passwordsMatch ? 'text-green-600' : 'text-red-500'}`}>
                    {passwordsMatch ? '✓ รหัสผ่านตรงกัน' : '✗ รหัสผ่านไม่ตรงกัน'}
                  </p>
                )}
              </div>

              {/* Requirements */}
              {newPassword && (
                <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 animate-in fade-in">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ข้อแนะนำรหัสผ่าน</p>
                  {requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-black transition-all ${req.met ? 'bg-green-500' : 'bg-slate-200'}`}>
                        {req.met ? '✓' : ''}
                      </div>
                      <span className={`text-xs font-medium ${req.met ? 'text-green-700' : 'text-slate-400'}`}>{req.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !passwordsMatch || newPassword.length < 6}
                className="w-full bg-brand-primary hover:bg-green-700 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? <Loader2 className="animate-spin" size={22} /> : <ShieldCheck size={22} />}
                {loading ? 'กำลังบันทึก...' : 'บันทึกรหัสผ่านใหม่'}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4 animate-in fade-in py-2">
              <p className="text-slate-600 text-sm leading-relaxed">
                รหัสผ่านของท่านถูกเปลี่ยนเรียบร้อยแล้ว<br />
                สามารถใช้รหัสผ่านใหม่เพื่อเข้าสู่ระบบได้ทันที
              </p>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <p className="text-green-700 font-bold text-sm">
                  กลับสู่ระบบอัตโนมัติใน <span className="text-2xl font-black text-green-600">{countdown}</span> วินาที...
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-brand-primary hover:bg-green-700 text-white py-3 rounded-2xl font-black transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
              >
                <CheckCircle2 size={18} />
                กลับสู่ระบบเลย
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
