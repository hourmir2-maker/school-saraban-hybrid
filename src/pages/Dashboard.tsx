import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Loader2, 
  FileText, 
  FileDown, 
  FileUp, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Inbox
} from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    incomingTotal: 0,
    outgoingTotal: 0,
    ordersTotal: 0,
    memosTotal: 0,
    pendingTasks: 0,
    completedTasks: 0
  });
  const [recentDocs, setRecentDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        // 1. ดึงจำนวนหนังสือรับสะสมทั้งหมด
        const { count: incomingCount } = await supabase
          .from('incoming_docs')
          .select('*', { count: 'exact', head: true });

        // 2. ดึงจำนวนหนังสือส่งสะสมทั้งหมด
        const { count: outgoingCount } = await supabase
          .from('outgoing_docs')
          .select('*', { count: 'exact', head: true });

        // 3. ดึงจำนวนคำสั่งสะสมทั้งหมด
        const { count: ordersCount } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true });

        // 4. ดึงจำนวนบันทึกข้อความสะสมทั้งหมด
        const { count: memosCount } = await supabase
          .from('memos')
          .select('*', { count: 'exact', head: true });

        // 5. ดึงสถิติติดตามงาน/สั่งการ (ที่ค้าง)
        const { count: pendingTaskCount } = await supabase
          .from('doc_assignments')
          .select('*', { count: 'exact', head: true })
          .in('status', ['pending', 'acknowledged']);

        // 6. ดึงสถิติติดตามงานที่เสร็จแล้ว
        const { count: completedCount } = await supabase
          .from('doc_assignments')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'completed');

        // 7. ดึงเอกสารรับเข้าล่าสุด 5 ฉบับ
        const { data: latestDocs } = await supabase
          .from('incoming_docs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          incomingTotal: incomingCount || 0,
          outgoingTotal: outgoingCount || 0,
          ordersTotal: ordersCount || 0,
          memosTotal: memosCount || 0,
          pendingTasks: pendingTaskCount || 0,
          completedTasks: completedCount || 0
        });
        setRecentDocs(latestDocs || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm animate-in fade-in">
      <Loader2 className="animate-spin text-brand-primary mb-4" size={40} />
      <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">กำลังดึงข้อมูลสถิติล่าสุด...</p>
    </div>
  );

  return (
    <div className="space-y-8 p-8 max-w-6xl mx-auto overflow-y-auto h-full pb-24 scrollbar-hide animate-in fade-in duration-500">
      
      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="หนังสือรับสะสม" value={stats.incomingTotal} color="bg-blue-500" icon={<FileDown size={28} />} />
        <StatCard label="หนังสือส่งสะสม" value={stats.outgoingTotal} color="bg-orange-500" icon={<FileUp size={28} />} />
        <StatCard label="คำสั่งโรงเรียน" value={stats.ordersTotal} color="bg-purple-500" icon={<BookOpen size={28} />} />
        <StatCard label="บันทึกข้อความ" value={stats.memosTotal} color="bg-teal-500" icon={<FileText size={28} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Tasks & Docs */}
        <div className="lg:col-span-2 space-y-8">
           {/* Task Overview */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                 <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                    <AlertCircle size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">งานที่รอดำเนินการ</p>
                    <p className="text-2xl font-black text-slate-800">{stats.pendingTasks} รายการ</p>
                 </div>
              </div>
              <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                 <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                    <CheckCircle2 size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">งานที่รายงานผลแล้ว</p>
                    <p className="text-2xl font-black text-slate-800">{stats.completedTasks} รายการ</p>
                 </div>
              </div>
           </div>

           {/* Recent Docs */}
           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Inbox size={20} className="text-orange-500" /> เอกสารรับเข้าล่าสุด</h3>
              <div className="space-y-4">
                  {recentDocs.length === 0 ? (
                    <div className="py-10 text-center text-slate-400 italic font-bold">ไม่มีรายการเอกสารใหม่วันนี้</div>
                  ) : recentDocs.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                      <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-xs group-hover:text-orange-500 transition-colors"><FileText size={18} /></div>
                        <div>
                          <p className="text-sm font-bold text-slate-700 truncate max-w-[250px] md:max-w-[400px]">{doc.subject}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter mt-0.5">{doc.from_agency}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">
                        {new Date(doc.created_at).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  ))}
              </div>
           </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-8">
           <div className="bg-brand-primary p-8 rounded-[40px] text-white shadow-xl shadow-green-100/50 relative overflow-hidden h-fit">
              <div className="relative z-10">
                <h4 className="font-black text-xl mb-2">ระบบสารบรรณอิเล็กทรอนิกส์</h4>
                <p className="text-xs text-green-100 font-bold leading-relaxed">
                  ระบบสารบรรณอิเล็กทรอนิกส์และบอทน้องชบา AI ยินดีต้อนรับเข้าปฏิบัติงานในวันนี้ค่ะ
                </p>
                <div className="mt-6 flex items-center gap-2 bg-white/20 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
                   <TrendingUp size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">System Online</span>
                </div>
              </div>
              <Inbox className="absolute -right-8 -bottom-8 text-white/10" size={160} />
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon }: any) {
  return (
    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform`}>{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black text-slate-800 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
