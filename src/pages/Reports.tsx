import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase'; 
import { useAuth } from '../contexts/AuthContext';
import {
  FileSpreadsheet,
  FileDown,
  Users,
  ClipboardList,
  Calendar,
  ChevronRight,
  Loader2,
  TrendingUp,
  FileText,
  BarChart,
  PieChart as PieChartIcon,
  Filter,
  GraduationCap,
  Download
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export default function Reports() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [stats, setStats] = useState({
    incomingCount: 0,
    outgoingCount: 0,
    orderCount: 0,
    memoCount: 0,
    teacherCount: 0,
    studentCount: 0,
    pendingTasks: 0,
    completedTasks: 0,
    totalTasks: 0
  });

  const [chartData, setChartData] = useState<any[]>([]);
  const [studentDistData, setStudentDistData] = useState<any[]>([]);

  // ตารางสถิตินักเรียน แยกชั้น เพศ ศาสนา
  type ClassRow = {
    class_level: string;
    room: string;
    male: number;
    female: number;
    total: number;
    religions: Record<string, number>;
  };
  const [classRows, setClassRows] = useState<ClassRow[]>([]);
  const [allReligions, setAllReligions] = useState<string[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const getSchoolId = () => profile?.school_id || localStorage.getItem('active_school_id');

  useEffect(() => {
    initReports();
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchStats();
      fetchChartData();
      fetchStudentTableData();
    }
  }, [selectedYear]);

  async function initReports() {
    try {
      const schoolId = getSchoolId();

      let yearsQuery = supabase.from('students').select('academic_year');
      if (schoolId) yearsQuery = yearsQuery.eq('school_id', schoolId);
      const { data: yearsData } = await yearsQuery;

      let uniqueYears: string[] = [];
      if (yearsData) {
        uniqueYears = Array.from(new Set(yearsData.map(s => s.academic_year))).filter(Boolean) as string[];     
      }

      let settingsQuery = supabase.from('settings').select('current_academic_year, school_name');
      if (schoolId) settingsQuery = settingsQuery.eq('school_id', schoolId);
      const { data: settings } = await settingsQuery.maybeSingle();

      const currentYear = settings?.current_academic_year || '2568';
      if (settings?.school_name) {
        setSchoolName(settings.school_name);
      }

      if (!uniqueYears.includes(currentYear)) {
        uniqueYears.unshift(currentYear);
      }
      uniqueYears.sort((a, b) => b.localeCompare(a));
      setAvailableYears(uniqueYears);
      setSelectedYear(currentYear);
    } catch (e) {
      console.error('Error initializing reports:', e);
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats() {
    try {
      const year = selectedYear;
      const yearNum = parseInt(year, 10) || (new Date().getFullYear() + 543);
      const schoolId = getSchoolId();

      let incQ = supabase.from('incoming_docs').select('id', { count: 'exact' });
      let outQ = supabase.from('outgoing_docs').select('id', { count: 'exact' });
      let ordQ = supabase.from('orders').select('id', { count: 'exact' });
      let memQ = supabase.from('memos').select('id', { count: 'exact' });
      let tchQ = supabase.from('teachers').select('id', { count: 'exact' }).eq('status', 'active');
      let stdQ = supabase.from('students').select('id', { count: 'exact' }).eq('status', 'active').eq('academic_year', year);
      let taskQ = supabase.from('incoming_docs').select('id, status');

      if (schoolId) {
        incQ = incQ.eq('school_id', schoolId);
        outQ = outQ.eq('school_id', schoolId);
        ordQ = ordQ.eq('school_id', schoolId);
        memQ = memQ.eq('school_id', schoolId);
        tchQ = tchQ.eq('school_id', schoolId);
        stdQ = stdQ.eq('school_id', schoolId);
        taskQ = taskQ.eq('school_id', schoolId);
      }

      incQ = incQ.or(`doc_year.eq.${yearNum},created_at.gte.${yearNum - 543}-01-01`);
      outQ = outQ.or(`doc_year.eq.${yearNum},created_at.gte.${yearNum - 543}-01-01`);
      ordQ = ordQ.or(`doc_year.eq.${yearNum},created_at.gte.${yearNum - 543}-01-01`);
      memQ = memQ.or(`doc_year.eq.${yearNum},created_at.gte.${yearNum - 543}-01-01`);

      const [inc, out, ord, mem, tch, std, tasks] = await Promise.all([
        incQ, outQ, ordQ, memQ, tchQ, stdQ, taskQ
      ]);

      const allTasks = tasks.data || [];
      const pending = allTasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length;
      const completed = allTasks.filter(t => t.status === 'completed' || t.status === 'closed').length;

      setStats({
        incomingCount: inc.count || 0,
        outgoingCount: out.count || 0,
        orderCount: ord.count || 0,
        memoCount: mem.count || 0,
        teacherCount: tch.count || 0,
        studentCount: std.count || 0,
        pendingTasks: pending,
        completedTasks: completed,
        totalTasks: allTasks.length
      });
    } catch (e) {
      console.error('Error fetching stats:', e);
    }
  }

    async function fetchChartData() {
    try {
      const year = selectedYear;
      const yearNum = parseInt(year, 10) || (new Date().getFullYear() + 543);
      const yearAD = yearNum - 543;
      const schoolId = getSchoolId();

      const startDate = `${yearAD}-01-01T00:00:00.000Z`;
      const endDate = `${yearAD}-12-31T23:59:59.999Z`;

      // 1. ดึงข้อมูลจริงปริมาณงานเอกสารราชการรายเดือน 4 ประเภท
      let incQ = supabase.from('incoming_docs').select('created_at, doc_date').gte('created_at', startDate).lte('created_at', endDate);
      let outQ = supabase.from('outgoing_docs').select('created_at, doc_date').gte('created_at', startDate).lte('created_at', endDate);
      let ordQ = supabase.from('orders').select('created_at, doc_date').gte('created_at', startDate).lte('created_at', endDate);
      let memQ = supabase.from('memos').select('created_at, doc_date').gte('created_at', startDate).lte('created_at', endDate);

      if (schoolId) {
        incQ = incQ.eq('school_id', schoolId);
        outQ = outQ.eq('school_id', schoolId);
        ordQ = ordQ.eq('school_id', schoolId);
        memQ = memQ.eq('school_id', schoolId);
      }

      const [incRes, outRes, ordRes, memRes] = await Promise.all([incQ, outQ, ordQ, memQ]);

      const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
      const realMonthly: any[] = months.map(m => ({
        month: m,
        'หนังสือรับ': 0,
        'หนังสือส่ง': 0,
        'คำสั่ง': 0,
        'บันทึกข้อความ': 0
      }));

      const processMonth = (items: any[], key: string) => {
        (items || []).forEach(item => {
          const dateStr = item.doc_date || item.created_at;
          if (dateStr) {
            const d = new Date(dateStr);
            const monthIdx = d.getMonth();
            if (monthIdx >= 0 && monthIdx < 12) {
              realMonthly[monthIdx][key] += 1;
            }
          }
        });
      };

      processMonth(incRes.data || [], 'หนังสือรับ');
      processMonth(outRes.data || [], 'หนังสือส่ง');
      processMonth(ordRes.data || [], 'คำสั่ง');
      processMonth(memRes.data || [], 'บันทึกข้อความ');

      setChartData(realMonthly);

      // 2. ดึงข้อมูลจริงสัดส่วนนักเรียนแยกตามระดับชั้น
      let stdQ = supabase.from('students').select('class_level').eq('academic_year', selectedYear);
      if (schoolId) stdQ = stdQ.eq('school_id', schoolId);
      const { data: students } = await stdQ;

      if (students && students.length > 0) {
        const counts: Record<string, number> = {};
        students.forEach(s => {
          const cls = (s.class_level || 'ไม่ระบุ').trim();
          counts[cls] = (counts[cls] || 0) + 1;
        });

        const order = ['อนุบาล 1', 'อนุบาล 2', 'อนุบาล 3', 'อ.1', 'อ.2', 'อ.3', 'ป.1', 'ป.2', 'ป.3', 'ป.4', 'ป.5', 'ป.6', 'ม.1', 'ม.2', 'ม.3'];
        const sortedKeys = Object.keys(counts).sort((a, b) => {
          const idxA = order.findIndex(o => a.includes(o));
          const idxB = order.findIndex(o => b.includes(o));
          if (idxA !== -1 && idxB !== -1) return idxA - idxB;
          return a.localeCompare(b, 'th');
        });

        const dist = sortedKeys.map(key => ({
          name: key,
          value: counts[key]
        }));
        setStudentDistData(dist);
      } else {
        setStudentDistData([]);
      }
    } catch (e) {
      console.error('Error fetching real chart data:', e);
    }
  }

  async function fetchStudentTableData() {
    setTableLoading(true);
    try {
      const schoolId = getSchoolId();
      let query = supabase
        .from('students')
        .select('class_level, room, gender, religion')
        .eq('academic_year', selectedYear);

      if (schoolId) query = query.eq('school_id', schoolId);
      const { data: students, error } = await query;

      if (error) throw error;

      if (!students || students.length === 0) {
        setClassRows([]);
        setAllReligions([]);
        return;
      }

      const religionsSet = new Set<string>();
      const grouped: Record<string, { class_level: string; room: string; male: number; female: number; religions: Record<string, number> }> = {};

      students.forEach(s => {
        const cls = (s.class_level || 'ไม่ระบุ').trim();
        const rm = (s.room || '').trim();
        const key = `${cls}_${rm}`;

        if (!grouped[key]) {
          grouped[key] = { class_level: cls, room: rm, male: 0, female: 0, religions: {} };
        }

        const g = (s.gender || '').trim();
        if (g === 'ชาย' || g === 'นาย' || g === 'เด็กชาย') {
          grouped[key].male += 1;
        } else {
          grouped[key].female += 1;
        }

        let rel = (s.religion || '').trim();
        if (!rel || rel === '-' || rel === 'null') rel = 'พุทธ';
        religionsSet.add(rel);

        grouped[key].religions[rel] = (grouped[key].religions[rel] || 0) + 1;
      });

      const relList = Array.from(religionsSet).sort((a, b) => {
        if (a === 'พุทธ') return -1;
        if (b === 'พุทธ') return 1;
        if (a === 'อิสลาม') return -1;
        if (b === 'อิสลาม') return 1;
        return a.localeCompare(b, 'th');
      });
      setAllReligions(relList);

      const rows: ClassRow[] = Object.values(grouped).map(item => ({
        class_level: item.class_level,
        room: item.room,
        male: item.male,
        female: item.female,
        total: item.male + item.female,
        religions: item.religions
      }));

      rows.sort((a, b) => {
        const order = ['อนุบาล 1', 'อนุบาล 2', 'อนุบาล 3', 'ป.1', 'ป.2', 'ป.3', 'ป.4', 'ป.5', 'ป.6', 'ม.1', 'ม.2', 'ม.3'];
        const idxA = order.findIndex(o => a.class_level.includes(o));
        const idxB = order.findIndex(o => b.class_level.includes(o));
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        return a.class_level.localeCompare(b.class_level, 'th');
      });

      setClassRows(rows);
    } catch (e) {
      console.error('Error fetching student table data:', e);
    } finally {
      setTableLoading(false);
    }
  }

  // คำนวณยอดรวมท้ายตาราง
  const totalMale = classRows.reduce((acc, r) => acc + r.male, 0);
  const totalFemale = classRows.reduce((acc, r) => acc + r.female, 0);
  const grandTotal = classRows.reduce((acc, r) => acc + r.total, 0);
  const religionTotals: Record<string, number> = {};
  allReligions.forEach(rel => {
    religionTotals[rel] = classRows.reduce((acc, r) => acc + (r.religions[rel] || 0), 0);
  });

  const exportToExcel = () => {
    const headers = ['ลำดับ', 'ชั้น/ห้อง', 'ชาย', 'หญิง', 'รวม', ...allReligions.map(r => `ศาสนา${r}`)];
    const excelData = classRows.map((r, idx) => {
      const clsName = r.room ? `${r.class_level}/${r.room}` : r.class_level;
      const rowObj: Record<string, any> = {
        'ลำดับ': idx + 1,
        'ชั้น/ห้อง': clsName,
        'ชาย': r.male,
        'หญิง': r.female,
        'รวม': r.total,
      };
      allReligions.forEach(rel => {
        rowObj[`ศาสนา${rel}`] = r.religions[rel] || 0;
      });
      return rowObj;
    });

    const totalRowObj: Record<string, any> = {
      'ลำดับ': '',
      'ชั้น/ห้อง': 'รวมทั้งหมด',
      'ชาย': totalMale,
      'หญิง': totalFemale,
      'รวม': grandTotal,
    };
    allReligions.forEach(rel => {
      totalRowObj[`ศาสนา${rel}`] = religionTotals[rel] || 0;
    });
    excelData.push(totalRowObj);

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'สถิตินักเรียน');
    XLSX.writeFile(workbook, `สถิตินักเรียน_${schoolName || 'โรงเรียน'}_ปี${selectedYear}.xlsx`);
    setExportMenuOpen(false);
  };

  const exportToImage = async () => {
    if (!tableRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(tableRef.current, { cacheBust: true, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = `รายงานสถิตินักเรียน_${selectedYear}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error('Error exporting image:', e);
    } finally {
      setExporting(false);
      setExportMenuOpen(false);
    }
  };

  const exportToPDF = async () => {
    if (!tableRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(tableRef.current, { cacheBust: true, backgroundColor: '#ffffff' });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`รายงานสถิตินักเรียน_${selectedYear}.pdf`);
    } catch (e) {
      console.error('Error exporting PDF:', e);
    } finally {
      setExporting(false);
      setExportMenuOpen(false);
    }
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  const efficiencyRate = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0;

  const exportTableToExcel = async (table: string, fileName: string) => {
    try {
      const schoolId = getSchoolId();
      let query = supabase.from(table).select('*');
      if (schoolId) query = query.eq('school_id', schoolId);
      const { data, error } = await query;
      if (error) throw error;

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    } catch (err: any) {
      alert('Export failed: ' + err.message);
    }
  };

  const reportCards = [
    {
      title: "งานสารบรรณ (Admin Docs)",
      description: "สรุปทะเบียนหนังสือรับ-ส่ง และสถิติเอกสาร",
      icon: <FileText className="text-blue-500" />,
      color: "bg-blue-50",
      actions: [
        { label: "Excel หนังสือรับ", onClick: () => exportTableToExcel('incoming_docs', 'ทะเบียนหนังสือรับ') },      
        { label: "Excel หนังสือส่ง", onClick: () => exportTableToExcel('outgoing_docs', 'ทะเบียนหนังสือส่ง') }       
      ]
    },
    {
      title: "บริหารงานบุคคล (HR)",
      description: "รายงานการมอบหมายงาน และสถิตัครู",
      icon: <Users className="text-purple-500" />,
      color: "bg-purple-50",
      actions: [
        { label: "สรุปการมอบหมายงาน", onClick: () => exportTableToExcel('doc_assignments', 'รายงานการมอบหมายงาน') }, 
        { label: "ทะเบียนประวัติครู", onClick: () => exportTableToExcel('teachers', 'ทะเบียนครูบุคลากร') }
      ]
    },
    {
      title: "กิจการนักเรียน (Students)",
      description: "สถิติการมาเรียน และข้อมูลพื้นฐานนักเรียน",
      icon: <Users className="text-green-500" />,
      color: "bg-green-50",
      actions: [
        { label: "ข้อมูลนักเรียนรายบุคคล", onClick: () => exportTableToExcel('students', 'ข้อมูลนักเรียน') },        
        { label: "สถิติการมาเรียน (LEC)", onClick: () => alert('ฟีเจอร์นี้เปิดใช้งานในหน้า LEC Reports') }      
      ]
    }
  ];
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-brand-primary mb-4" size={40} />
        <p className="text-slate-500 font-bold text-sm">กำลังโหลดข้อมูลรายงานอัจฉริยะ...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      {/* Top Banner & Filters */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
            <TrendingUp className="text-brand-primary" size={28} />
            ระบบรายงานสรุปและสถิติอัจฉริยะ
          </h2>
          <p className="text-slate-500 text-xs font-semibold mt-1">
            สรุปข้อมูลสารบรรณ งานบุคคล วิชาการ และสถิตินักเรียนรายปีของ {schoolName || 'โรงเรียน'}
          </p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
            <Calendar size={18} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-600">ปีการศึกษา:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent font-black text-brand-primary text-sm focus:outline-none cursor-pointer"
            >
              {availableYears.map(y => (
                <option key={y} value={y}>พ.ศ. {y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard title="หนังสือรับ" value={stats.incomingCount} unit="ฉบับ" color="blue" icon={<FileDown size={20} />} />
        <MetricCard title="หนังสือส่ง" value={stats.outgoingCount} unit="ฉบับ" color="emerald" icon={<FileText size={20} />} />
        <MetricCard title="คำสั่งโรงเรียน" value={stats.orderCount} unit="ฉบับ" color="purple" icon={<ClipboardList size={20} />} />
        <MetricCard title="บันทึกข้อความ" value={stats.memoCount} unit="ฉบับ" color="amber" icon={<FileText size={20} />} />
        <MetricCard title="ข้าราชการครู" value={stats.teacherCount} unit="คน" color="cyan" icon={<GraduationCap size={20} />} />
        <MetricCard title="นักเรียนปัจจุบัน" value={stats.studentCount} unit="คน" color="indigo" icon={<Users size={20} />} />
      </div>

      {/* Student Demographics Table (เพศ & ศาสนา) */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Users className="text-indigo-500" size={22} />
              ตารางสรุปจำนวนนักเรียน จำแนกตามชั้น เพศ และศาสนา
            </h3>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">
              ข้อมูลประจำปีการศึกษา {selectedYear} ({schoolName || 'โรงเรียน'})
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-primary text-white rounded-2xl font-bold text-xs hover:bg-brand-secondary transition-all shadow-md shadow-brand-primary/20"
            >
              <Download size={16} />
              ส่งออกรายงาน
            </button>

            {exportMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-30 animate-in fade-in-50 duration-150">
                <button
                  onClick={exportToExcel}
                  className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <FileSpreadsheet className="text-emerald-500" size={16} />
                  ส่งออกเป็น Excel (.xlsx)
                </button>
                <button
                  onClick={exportToImage}
                  className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <FileText className="text-blue-500" size={16} />
                  ส่งออกเป็นรูปภาพ (PNG)
                </button>
                <button
                  onClick={exportToPDF}
                  className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <FileDown className="text-rose-500" size={16} />
                  ส่งออกเป็นเอกสาร PDF
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Printable Table Container */}
        <div ref={tableRef} className="bg-white p-4 rounded-2xl">
          {tableLoading ? (
            <div className="py-12 flex justify-center items-center">
              <Loader2 className="animate-spin text-brand-primary" size={32} />
            </div>
          ) : classRows.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-bold text-sm">
              ไม่พบข้อมูลนักเรียนในปีการศึกษา {selectedYear}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs font-semibold text-slate-700">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-800 font-black border-b border-slate-200">
                    <th className="p-3 text-center border-r border-slate-200 w-12">ลำดับ</th>
                    <th className="p-3 text-left border-r border-slate-200">ชั้น / ห้อง</th>
                    <th className="p-3 text-center border-r border-slate-200 bg-blue-50/50 text-blue-900 w-20">ชาย</th>
                    <th className="p-3 text-center border-r border-slate-200 bg-pink-50/50 text-pink-900 w-20">หญิง</th>
                    <th className="p-3 text-center border-r border-slate-200 bg-purple-50/50 text-purple-900 w-24">รวมทั้งหมด</th>
                    {allReligions.map(rel => (
                      <th key={rel} className="p-3 text-center border-r border-slate-200 bg-amber-50/40 text-amber-900">
                        ศาสนา{rel}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classRows.map((row, idx) => {
                    const clsName = row.room ? `${row.class_level}/${row.room}` : row.class_level;
                    return (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-2.5 text-center font-bold text-slate-400 border-r border-slate-100">{idx + 1}</td>
                        <td className="p-2.5 font-bold text-slate-800 border-r border-slate-100">{clsName}</td>
                        <td className="p-2.5 text-center font-bold text-blue-600 bg-blue-50/20 border-r border-slate-100">{row.male}</td>
                        <td className="p-2.5 text-center font-bold text-pink-600 bg-pink-50/20 border-r border-slate-100">{row.female}</td>
                        <td className="p-2.5 text-center font-black text-purple-700 bg-purple-50/30 border-r border-slate-100">{row.total}</td>
                        {allReligions.map(rel => (
                          <td key={rel} className="p-2.5 text-center font-semibold text-slate-600 border-r border-slate-100">
                            {row.religions[rel] || 0}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  {/* Row Total */}
                  <tr className="bg-slate-900 text-white font-black">
                    <td className="p-3 text-center" colSpan={2}>รวมนักเรียนทั้งหมด</td>
                    <td className="p-3 text-center text-blue-300">{totalMale}</td>
                    <td className="p-3 text-center text-pink-300">{totalFemale}</td>
                    <td className="p-3 text-center text-purple-300 text-sm">{grandTotal}</td>
                    {allReligions.map(rel => (
                      <td key={rel} className="p-3 text-center text-amber-200">
                        {religionTotals[rel] || 0}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Visual Charts */}
      {mounted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <BarChart className="text-brand-primary" size={20} />
              สถิติปริมาณงานเอกสารราชการรายเดือน (ประจำปี พ.ศ. {selectedYear})
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 'bold' }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 11, fontWeight: 'bold' }} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="หนังสือรับ" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="หนังสือส่ง" fill="#10b981" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="คำสั่ง" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="บันทึกข้อความ" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                </ReBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                <PieChartIcon className="text-indigo-500" size={20} />
                สัดส่วนนักเรียนตามระดับชั้น
              </h3>
              <div className="h-64 w-full flex items-center justify-center">
                {studentDistData.length === 0 ? (
                  <div className="text-center text-slate-400 font-bold text-xs py-10">
                    <Users size={36} className="mx-auto mb-2 opacity-30 text-indigo-400" />
                    ยังไม่มีข้อมูลนักเรียนในปีการศึกษา พ.ศ. {selectedYear}
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie data={studentDistData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {studentDistData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportCards.map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col h-full">
            <div className={`w-16 h-16 ${card.color} rounded-[24px] flex items-center justify-center mb-6`}>    
              {card.icon}
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">{card.title}</h3>
            <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed">{card.description}</p>       

            <div className="mt-auto space-y-3">
              {card.actions.map((action, j) => (
                <button
                  key={j}
                  onClick={action.onClick}
                  className="w-full py-4 px-6 bg-slate-50 hover:bg-brand-primary hover:text-white rounded-2xl font-bold text-sm text-slate-600 flex items-center justify-between transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <FileSpreadsheet size={16} /> {action.label}
                  </span>
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />   
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Analytics Banner */}
      <div className="bg-slate-800 p-10 rounded-[48px] text-white overflow-hidden relative shadow-2xl mt-8">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/10 rounded-2xl">
              <TrendingUp size={24} />
            </div>
            <h2 className="text-2xl font-black">Smart Analytics Engine</h2>
          </div>
          <p className="text-white/60 font-bold max-w-lg mb-8">
            ระบบวิเคราะห์ข้อมูลขั้นสูงกำลังประมวลผลแนวโน้มการมาเรียนและประสิทธิภาพการทำงานของบุคลากร เพื่อช่วยในการตัดสินใจเชิงกลยุทธ์สำหรับผู้บริหาร
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <div className="text-4xl font-black mb-1">{efficiencyRate}%</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">อัตราความสำเร็จ</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">{stats.incomingCount + stats.outgoingCount + stats.orderCount + stats.memoCount}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">จำนวนเอกสารที่ดำเนินการ</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">{stats.studentCount}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">นักเรียนที่กำลังศึกษา</div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-10 right-10 opacity-10">
           <TrendingUp size={200} />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, unit, color, icon }: any) {
  const bgColors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
    cyan: 'bg-cyan-50 text-cyan-600',
    indigo: 'bg-indigo-50 text-indigo-600'
  };

  return (
    <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500">{title}</span>
        <div className={`p-2 rounded-2xl ${bgColors[color] || 'bg-slate-50 text-slate-600'}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <span className="text-2xl font-black text-slate-800">{value}</span>
        <span className="text-xs font-bold text-slate-400 ml-1">{unit}</span>
      </div>
    </div>
  );
}
