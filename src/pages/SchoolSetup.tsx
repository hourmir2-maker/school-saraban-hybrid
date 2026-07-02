import { useState, useEffect } from 'react';
import { 
  School, 
  Plus, 
  ArrowLeft, 
  Check, 
  Loader2, 
  Send,
  HelpCircle,
  Database,
  Lock,
  Mail
} from 'lucide-react';
import { supabase, type SchoolProfile } from '../lib/supabase';

interface SchoolSetupProps {
  onBackToLogin?: () => void;
}

export default function SchoolSetup({ onBackToLogin }: SchoolSetupProps) {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [mode, setMode] = useState<'select' | 'register' | 'admin_login'>('select');
  
  // Select Mode State
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  
  // Register Mode State
  const [schoolName, setSchoolName] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [gasUrl, setGasUrl] = useState('');

  // Super Admin Login State
  const superAdminEmail = (import.meta.env.VITE_SUPER_ADMIN_EMAIL || 'ncrows77@gmail.com').toLowerCase();
  const [adminUserEmail, setAdminUserEmail] = useState(superAdminEmail);
  const [adminPassword, setAdminPassword] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchApprovedSchools();
  }, [mode]);

  const fetchApprovedSchools = async () => {
    if (mode !== 'select') return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('status', 'approved')
        .order('school_name', { ascending: true });

      if (error) throw error;
      setSchools(data || []);
      
      if (data && data.length > 0) {
        setSelectedSchoolId(data[0].id);
      }
    } catch (err: any) {
      console.error('Error fetching schools:', err);
      setError('ไม่สามารถเชื่อมต่อฐานข้อมูลได้ กรุณาตรวจสอบอินเทอร์เน็ต หรือให้แน่ใจว่าได้ติดตั้งสคริปต์ SQL บน Supabase แล้ว');
    } finally {
      setLoading(false);
    }
  };

  const handleConnectSchool = () => {
    if (!selectedSchoolId) {
      setError('กรุณาเลือกสถานศึกษาเพื่อเชื่อมต่อ');
      return;
    }

    const matched = schools.find(s => s.id === selectedSchoolId);
    if (!matched) return;

    try {
      const profile: SchoolProfile = {
        id: matched.id,
        name: matched.school_name,
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
        supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
        vercelUrl: import.meta.env.VITE_VERCEL_URL || window.location.origin,
        gasUrl: matched.gas_url || ''
      };

      // ล้างข้อมูล super admin mode เผื่อมีค้าง
      localStorage.removeItem('super_admin_mode');

      localStorage.setItem('school_profiles', JSON.stringify([profile]));
      localStorage.setItem('active_school_id', profile.id);
      
      if (onBackToLogin) {
        onBackToLogin();
      } else {
        window.location.reload();
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการบันทึกโปรไฟล์การเชื่อมต่อ');
    }
  };

  const handleRegisterSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    
    const formattedCode = schoolCode.trim().toUpperCase();
    const formattedEmail = adminEmail.trim().toLowerCase();

    if (!schoolName || !formattedCode || !formattedEmail) {
      setError('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return;
    }

    if (formattedCode.length < 4 || formattedCode.length > 8) {
      setError('รหัสโรงเรียนต้องมีความยาว 4 - 8 ตัวอักษรภาษาอังกฤษ');
      return;
    }

    setActionLoading(true);
    try {
      const { data: existSchool } = await supabase
        .from('schools')
        .select('id')
        .eq('school_code', formattedCode)
        .maybeSingle();

      if (existSchool) {
        throw new Error('รหัสโรงเรียนนี้ถูกใช้งานไปแล้ว กรุณาใช้รหัสอื่น');
      }

      const { error: regError } = await supabase
        .from('schools')
        .insert([
          {
            school_code: formattedCode,
            school_name: schoolName.trim(),
            admin_email: formattedEmail,
            gas_url: gasUrl.trim() || null,
            status: 'pending' // รออนุมัติ
          }
        ]);

      if (regError) throw regError;

      setSuccessMessage(`ยื่นขอเปิดโรงเรียนสำเร็จ! รหัสโรงเรียนของคุณคือ "${formattedCode}" กรุณาแจ้งผู้ดูแลระบบกลาง (Super Admin) เพื่ออนุมัติเปิดใช้งาน เมื่อได้รับอนุมัติแล้ว คุณครูแอดมินอีเมล "${formattedEmail}" จะสามารถเข้าใช้งานได้ทันทีค่ะ`);
      
      setSchoolName('');
      setSchoolCode('');
      setAdminEmail('');
      setGasUrl('');
      
    } catch (err: any) {
      setError(err.message || 'ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSuperAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setActionLoading(true);

    try {
      const formattedEmail = adminUserEmail.trim().toLowerCase();
      
      // 1. เข้าสู่ระบบผ่าน Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formattedEmail,
        password: adminPassword,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. ดึงข้อมูลโปรไฟล์ (ใช้ maybeSingle() เพื่อป้องกัน Error 406 หากไม่มีแถวข้อมูลในตาราง)
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .maybeSingle();

        // 3. หากไม่มีข้อมูลโปรไฟล์ และล็อกอินเข้ามาด้วยเมล Super Admin ให้สร้างโปรไฟล์ให้ทันที
        const superAdminEmailVal = (import.meta.env.VITE_SUPER_ADMIN_EMAIL || 'ncrows77@gmail.com').toLowerCase();
        if (!profileData && formattedEmail === superAdminEmailVal) {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([
              {
                id: authData.user.id,
                display_name: 'Super Admin',
                email: formattedEmail,
                role: 'admin',
                status: 'active'
              }
            ]);
            
          if (insertError) {
            console.error('Failed to auto-create Super Admin profile:', insertError);
            throw new Error('ไม่สามารถสร้างโปรไฟล์ระบบกลางได้: ' + insertError.message);
          }
        }

        const finalRole = profileData?.role || (formattedEmail === superAdminEmailVal ? 'admin' : '');

        if (finalRole === 'admin' || formattedEmail === superAdminEmailVal) {
          // ยอมรับสิทธิ์แอดมินกลาง
          localStorage.setItem('super_admin_mode', 'true');
          localStorage.setItem('active_school_id', 'super_admin');
          
          // ล้างโปรไฟล์โรงเรียนทั่วไปออกเพื่อไม่ให้สับสน
          localStorage.removeItem('school_profiles');

          // รีเฟรชหน้าจอเพื่อสลับเข้าหน้า Super Admin Console ทันที
          window.location.reload();
        } else {
          // หากไม่มีสิทธิ์ ให้สั่งออกจากระบบทันที
          await supabase.auth.signOut();
          throw new Error('คุณไม่มีสิทธิ์เข้าใช้งานระบบควบคุมส่วนกลาง (Super Admin Console)');
        }
      }
    } catch (err: any) {
      console.error('Super admin login error:', err);
      setError(err.message || 'ล็อกอินไม่สำเร็จ กรุณาตรวจสอบอีเมลหรือรหัสผ่าน');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-orange-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        
        {/* Header */}
        <div className="bg-brand-primary p-8 text-white text-center relative transition-all duration-300">
          {mode !== 'select' && (
            <button 
              onClick={() => { setMode('select'); setError(null); setSuccessMessage(null); }}
              className="absolute left-4 top-8 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <School size={36} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">
            {mode === 'select' && 'เชื่อมต่อสถานศึกษา'}
            {mode === 'register' && 'ลงทะเบียนขอเปิดโรงเรียนใหม่'}
            {mode === 'admin_login' && 'Super Admin Console'}
          </h1>
          <p className="text-green-100/80 mt-1 text-xs uppercase tracking-widest font-black">
            {mode === 'admin_login' ? 'ระบบควบคุมกลางสูงสุด' : 'ระบบสารบรรณและบอทน้องชบา AI'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 font-medium mb-5">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-50 text-green-700 p-5 rounded-xl text-sm border border-green-100 font-medium mb-5 leading-relaxed">
              🎉 {successMessage}
            </div>
          )}

          {mode === 'select' && (
            <div className="space-y-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-8 text-slate-400 gap-3">
                  <Loader2 className="animate-spin text-brand-primary" size={32} />
                  <span className="text-xs font-bold uppercase tracking-wider">กำลังโหลดข้อมูลสถานศึกษา...</span>
                </div>
              ) : (
                <>
                  {schools.length > 0 ? (
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">
                        เลือกโรงเรียนในเครือข่ายของคุณ
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold text-slate-700"
                        value={selectedSchoolId}
                        onChange={(e) => setSelectedSchoolId(e.target.value)}
                      >
                        {schools.map(s => (
                          <option key={s.id} value={s.id}>{s.school_name} ({s.school_code})</option>
                        ))}
                      </select>
                      
                      <button
                        onClick={handleConnectSchool}
                        className="w-full bg-brand-primary hover:bg-green-700 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 mt-6"
                      >
                        <Check size={20} /> เชื่อมต่อระบบโรงเรียน
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-6 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                      <Database className="mx-auto text-slate-300 mb-2" size={32} />
                      <p className="text-slate-500 font-bold text-sm">ยังไม่พบโรงเรียนที่เปิดใช้งานในระบบ</p>
                      <p className="text-slate-400 text-xs mt-1">กรุณากดลงทะเบียนโรงเรียนใหม่ด้านล่างค่ะ</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                    <button
                      onClick={() => { setMode('register'); setError(null); setSuccessMessage(null); }}
                      className="w-full bg-brand-secondary hover:bg-orange-600 text-white py-3.5 rounded-2xl font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Plus size={16} /> ยื่นขอลงทะเบียนโรงเรียนใหม่
                    </button>

                    <button
                      onClick={() => { setMode('admin_login'); setError(null); setSuccessMessage(null); }}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Lock size={12} /> สำหรับผู้ดูแลระบบกลาง (Super Admin)
                    </button>
                    
                    {onBackToLogin && (
                      <button
                        onClick={onBackToLogin}
                        className="w-full bg-slate-50 hover:bg-slate-100 text-slate-500 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 active:scale-95 mt-2"
                      >
                        ย้อนกลับหน้าเข้าสู่ระบบ
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegisterSchool} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">ชื่อโรงเรียน</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold"
                  placeholder="กรอกชื่อโรงเรียนของคุณ"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">
                  รหัสโรงเรียนที่ต้องการ (School Code)
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold uppercase"
                  placeholder="ตัวอย่างเช่น SKW001 (อังกฤษ 4-8 ตัว)"
                  value={schoolCode}
                  onChange={(e) => setSchoolCode(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">
                  อีเมลแอดมินหลักประจำโรงเรียน
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold"
                  placeholder="admin@school.ac.th"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
                <p className="text-[10px] text-slate-400 mt-1 flex items-start gap-1 font-medium leading-relaxed">
                  <HelpCircle size={10} className="shrink-0 mt-0.5" />
                  อีเมลนี้จะได้รับการแต่งตั้งเป็นผู้ดูแลระบบ (Admin) ของโรงเรียนโดยอัตโนมัติเมื่อได้รับการอนุมัติใช้งาน
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">
                  Google Drive Web App URL (ถ้ามี)
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold text-xs"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={gasUrl}
                  onChange={(e) => setGasUrl(e.target.value)}
                />
                <p className="text-[10px] text-slate-400 mt-1 font-medium">
                  * หากยังไม่มี สามารถข้ามไปก่อนและตั้งค่าในตัวโปรแกรมภายหลังได้
                </p>
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full bg-brand-primary hover:bg-green-700 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-75 mt-4"
              >
                {actionLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Send size={18} />
                )}
                ส่งคำขอเปิดโรงเรียน
              </button>
            </form>
          )}

          {mode === 'admin_login' && (
            <form onSubmit={handleSuperAdminLogin} className="space-y-5 animate-in fade-in">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 ml-1 tracking-widest">อีเมลผู้ดูแลระบบกลาง</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 pl-10 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold"
                    placeholder="superadmin@email.com"
                    value={adminUserEmail}
                    onChange={(e) => setAdminUserEmail(e.target.value)}
                  />
                  <div className="absolute left-3.5 top-4 text-slate-400"><Mail size={16} /></div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 ml-1 tracking-widest">รหัสผ่าน</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 pl-10 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-slate-50 font-bold"
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                  <div className="absolute left-3.5 top-4 text-slate-400"><Lock size={16} /></div>
                </div>
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-75 mt-4"
              >
                {actionLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Check size={20} />
                )}
                เข้าสู่ระบบควบคุมกลาง
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} เครือข่ายระบบสารบรรณและบอทชบา AI
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
