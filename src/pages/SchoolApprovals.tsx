import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Check, 
  X, 
  School, 
  Loader2, 
  Calendar, 
  Mail, 
  Link, 
  AlertCircle, 
  ListFilter,
  CheckCircle,
  Clock,
  Trash2
} from 'lucide-react';

export default function SchoolApprovals() {
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [approvedSchools, setApprovedSchools] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);
  const [editingEmails, setEditingEmails] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'pending') {
        const { data, error } = await supabase
          .from('schools')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPendingRequests(data || []);
        
        // สร้าง map ของอีเมลเริ่มต้นสำหรับแก้ไข
        const emailMap: Record<string, string> = {};
        (data || []).forEach((req: any) => {
          emailMap[req.id] = req.admin_email || '';
        });
        setEditingEmails(emailMap);
      } else {
        const { data, error } = await supabase
          .from('schools')
          .select('*')
          .eq('status', 'approved')
          .order('school_name', { ascending: true });

        if (error) throw error;
        setApprovedSchools(data || []);
      }
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError('ไม่สามารถดึงข้อมูลคำขอโรงเรียนได้: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, name: string, email: string) => {
    setActionId(id);
    setError(null);
    setSuccess(null);
    try {
      // 1. อัปเดตสถานะโรงเรียนเป็น approved และแก้ไขอีเมลแอดมินที่ได้รับการยืนยันแล้ว
      const { error: updateError } = await supabase
        .from('schools')
        .update({ 
          status: 'approved',
          admin_email: email.trim().toLowerCase()
        })
        .eq('id', id);

      if (updateError) throw updateError;

      // 2. สร้างแถวเริ่มต้นในตาราง settings สำหรับโรงเรียนนี้
      const { error: settingsError } = await supabase
        .from('settings')
        .insert([
          {
            school_id: id,
            school_name: name,
            current_academic_year: '2569',
            current_term: '1'
          }
        ]);

      if (settingsError && settingsError.code !== '23505') {
        console.warn('Warning creating default settings:', settingsError);
      }

      setSuccess(`อนุมัติโรงเรียน "${name}" เรียบร้อยแล้ว!`);
      fetchData();
    } catch (err: any) {
      console.error('Approve error:', err);
      setError('อนุมัติไม่สำเร็จ: ' + err.message);
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (id: string, name: string) => {
    if (!confirm(`คุณต้องการปฏิเสธและลบโรงเรียน/คำขอ "${name}" หรือไม่?`)) return;
    
    setActionId(id);
    setError(null);
    setSuccess(null);
    try {
      const { error } = await supabase
        .from('schools')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSuccess(`ลบข้อมูล "${name}" ออกจากระบบแล้ว`);
      fetchData();
    } catch (err: any) {
      console.error('Delete error:', err);
      setError('ลบไม่สำเร็จ: ' + err.message);
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 overflow-y-auto h-full pb-24 scrollbar-hide animate-in fade-in">
      
      {/* Header Panel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <School className="text-brand-primary" size={28} />
            แผงควบคุมระบบเครือข่ายกลาง
          </h1>
          <p className="text-slate-400 text-xs mt-1 font-bold uppercase tracking-wider">
            Super Admin Portal
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'pending'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock size={14} />
            คำขอรออนุมัติ
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'approved'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <CheckCircle size={14} />
            โรงเรียนที่เปิดใช้งานแล้ว
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 font-medium flex items-center gap-2">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm border border-green-100 font-medium">
          🎉 {success}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
          <Loader2 className="animate-spin text-brand-primary" size={36} />
          <span className="text-xs font-bold uppercase tracking-wider">กำลังดึงข้อมูลระบบ...</span>
        </div>
      ) : (
        <>
          {activeTab === 'pending' ? (
            /* Pending Requests View */
            pendingRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-5">
                {pendingRequests.map((req) => (
                  <div 
                    key={req.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg font-black text-xs uppercase tracking-widest border border-amber-100">
                          {req.school_code}
                        </div>
                        <div className="text-slate-400 text-[10px] flex items-center gap-1 font-semibold">
                          <Calendar size={12} />
                          {new Date(req.created_at).toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-slate-800 mb-4">{req.school_name}</h3>

                      <div className="space-y-3 text-xs font-medium text-slate-600 border-t border-b border-slate-50 py-3 mb-6">
                        <div className="flex flex-col gap-1 w-full">
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Mail size={12} /> อีเมลแอดมินโรงเรียน (แก้ไขได้)
                          </label>
                          <input
                            type="email"
                            required
                            className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-primary bg-slate-50 focus:bg-white transition-all font-sans"
                            value={editingEmails[req.id] !== undefined ? editingEmails[req.id] : (req.admin_email || '')}
                            onChange={(e) => setEditingEmails({
                              ...editingEmails,
                              [req.id]: e.target.value
                            })}
                          />
                        </div>
                        {req.gas_url && (
                          <div className="flex items-center gap-2">
                            <Link size={14} className="text-slate-400" />
                            <span className="text-slate-400">GAS Link:</span>
                            <span className="truncate max-w-[200px] text-slate-700 font-bold" title={req.gas_url}>
                              {req.gas_url}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <button
                        onClick={() => handleApprove(req.id, req.school_name, editingEmails[req.id] || req.admin_email)}
                        disabled={actionId !== null}
                        className="flex-1 bg-brand-primary hover:bg-green-700 text-white py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
                      >
                        {actionId === req.id ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <Check size={16} />
                        )}
                        อนุมัติเปิดใช้งาน
                      </button>
                      <button
                        onClick={() => handleReject(req.id, req.school_name)}
                        disabled={actionId !== null}
                        className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-1 active:scale-95 disabled:opacity-50"
                      >
                        <X size={16} />
                        ปฏิเสธคำขอ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <School className="mx-auto text-slate-300 mb-3" size={48} />
                <h3 className="text-base font-bold text-slate-600">ไม่มีคำขอเปิดโรงเรียนใหม่ในขณะนี้</h3>
                <p className="text-slate-400 text-xs mt-1">คำขอทั้งหมดที่ส่งมาได้รับการอนุมัติใช้งานเรียบร้อยแล้วค่ะ</p>
              </div>
            )
          ) : (
            /* Approved Schools List View */
            approvedSchools.length > 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-5">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border-b border-slate-100">
                        <th className="py-4 px-6">รหัสโรงเรียน</th>
                        <th className="py-4 px-6">ชื่อสถานศึกษา</th>
                        <th className="py-4 px-6">ผู้ดูแลระบบประจำโรงเรียน</th>
                        <th className="py-4 px-6">Google Drive Link</th>
                        <th className="py-4 px-6 text-center">การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                      {approvedSchools.map((school) => (
                        <tr key={school.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6">
                            <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-md border border-green-100">
                              {school.school_code}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-slate-800 text-sm font-extrabold">{school.school_name}</td>
                          <td className="py-4 px-6 font-medium text-slate-600">
                            <div className="flex items-center gap-1.5">
                              <Mail size={12} className="text-slate-400" />
                              {school.admin_email || <span className="text-slate-400 italic">ไม่ระบุอีเมล</span>}
                            </div>
                          </td>
                          <td className="py-4 px-6 max-w-[200px] truncate font-medium text-slate-500" title={school.gas_url}>
                            {school.gas_url ? (
                              <div className="flex items-center gap-1.5">
                                <Link size={12} className="text-slate-400 shrink-0" />
                                <span className="truncate">{school.gas_url}</span>
                              </div>
                            ) : (
                              <span className="text-slate-300 italic">ยังไม่ได้ตั้งค่า Google Drive</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => handleReject(school.id, school.school_name)}
                              disabled={actionId !== null}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all inline-flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                              title="ลบโรงเรียนออกจากระบบ"
                            >
                              <Trash2 size={15} />
                              <span className="text-[10px] font-bold uppercase tracking-wider">ถอนสิทธิ์</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <School className="mx-auto text-slate-300 mb-3" size={48} />
                <h3 className="text-base font-bold text-slate-600">ยังไม่มีโรงเรียนที่เปิดใช้งานในระบบ</h3>
                <p className="text-slate-400 text-xs mt-1">กรุณากดสลับแท็บเพื่อไปทำการกดอนุมัติโรงเรียนที่ยื่นเรื่องเข้ามาค่ะ</p>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
