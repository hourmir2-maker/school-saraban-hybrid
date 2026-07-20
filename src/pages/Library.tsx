import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Library, 
  BookOpen, 
  History, 
  Loader2,
  Plus,
  Search,
  User,
  CheckCircle2,
  ArrowRightLeft,
  Save,
  BarChart3,
  Users,
  CheckCircle,
  TrendingUp,
  Bookmark,
  Calendar,
  Printer,
  FileText
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  Tooltip, 
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis
} from 'recharts';
import Modal from '../components/Modal';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black transition-all duration-300 ${active ? 'bg-slate-800 text-white shadow-md scale-105' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
    >
      {icon}
      {label}
    </button>
  );
}

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6', '#3b82f6'];

const MONTHS_TH = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

export default function LibraryModule() {
  const [books, setBooks] = useState<any[]>([]);
  const [borrowList, setBorrowList] = useState<any[]>([]);
  const [usageLogs, setUsageLogs] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]); 
  const [staff, setStaff] = useState<any[]>([]);       
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'books' | 'borrow' | 'logs'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolName, setSchoolName] = useState('โรงเรียนสาธิต 01'); 

  // Modal States
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [isLogModalOpen, setIsUsageLogModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false); 
  const [isSaving, setIsSaving] = useState(false);

  const [visitorType, setVisitorType] = useState<'student' | 'staff'>('student');
  const [selectedPersonId, setSelectedPersonId] = useState('');

  // ฟิลเตอร์สำหรับสถิติพิมพ์รายงาน
  const [printReportType, setPrintReportType] = useState<'overview' | 'top_visitors' | 'popular_books'>('overview');
  const [printMonth, setPrintMonth] = useState<number>(new Date().getMonth()); 
  const [printYear, setPrintYear] = useState<string>('2569');

  // Form States
  const [bookForm, setBookForm] = useState({
    book_id: '',
    title: '',
    category: 'วิชาการ',
    author: '',
    total_qty: 1
  });

  const [borrowForm, setBorrowForm] = useState(() => ({
    book_id: '',
    borrower_name: '',
    borrower_id: '', 
    return_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }));

  const [usageForm, setUsageLogForm] = useState({
    name: '',
    level: 'ป.1',
    purpose: 'อ่านหนังสือ/ค้นคว้า',
    student_id: '',
    user_id: ''
  });

  async function fetchBooks() {
    const { data } = await supabase.from('library_books').select('*').order('title');
    setBooks(data || []);
  }

  async function fetchBorrowList() {
    const { data } = await supabase
      .from('library_borrow')
      .select('*, library_books(title)')
      .order('borrow_date', { ascending: false });
    setBorrowList(data || []);
  }

  async function fetchUsageLogs() {
    const { data } = await supabase
      .from('library_usage_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(50);
    setUsageLogs(data || []);
  }

  async function fetchPeopleData() {
    try {
      const [studRes, staffRes] = await Promise.all([
        supabase.from('students').select('id, student_id, prefix, first_name, last_name, class_level, room').order('first_name'),
        supabase.from('profiles').select('id, display_name, role').order('display_name')
      ]);
      setStudents(studRes.data || []);
      setStaff(staffRes.data || []);
    } catch (err) {
      console.error('Error fetching people for library:', err);
    }
  }

  async function fetchDashboardData() {
    setLoading(true);
    const [booksRes, borrowRes, logsRes, settingsRes] = await Promise.all([
      supabase.from('library_books').select('*'),
      supabase.from('library_borrow').select('*, library_books(title, category)').order('borrow_date', { ascending: false }),
      supabase.from('library_usage_logs').select('*').order('timestamp', { ascending: false }),
      supabase.from('settings').select('school_name').maybeSingle()
    ]);
    
    setBooks(booksRes.data || []);
    setBorrowList(borrowRes.data || []);
    setUsageLogs(logsRes.data || []);
    if (settingsRes.data?.school_name) {
      setSchoolName(settingsRes.data.school_name);
    }
    setLoading(false);
  }

  async function fetchData() {
    if (activeTab === 'dashboard') await fetchDashboardData();
    else if (activeTab === 'books') {
      setLoading(true);
      await fetchBooks();
      setLoading(false);
    }
    else if (activeTab === 'borrow') {
      setLoading(true);
      await fetchBorrowList();
      setLoading(false);
    }
    else if (activeTab === 'logs') {
      setLoading(true);
      await fetchUsageLogs();
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPeopleData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    if (!selectedPersonId) {
      setUsageLogForm(prev => ({
        ...prev,
        name: '',
        level: visitorType === 'student' ? 'ป.1' : 'ครู/บุคลากร',
        student_id: '',
        user_id: ''
      }));
      return;
    }

    if (visitorType === 'student') {
      const student = students.find(s => s.id === selectedPersonId);
      if (student) {
        setUsageLogForm(prev => ({
          ...prev,
          name: `${student.prefix || ''}${student.first_name} ${student.last_name}`.trim(),
          level: student.class_level ? `${student.class_level}${student.room ? '/' + student.room : ''}` : 'ป.1',
          student_id: student.student_id || student.id,
          user_id: ''
        }));
      }
    } else {
      const p = staff.find(st => st.id === selectedPersonId);
      if (p) {
        setUsageLogForm(prev => ({
          ...prev,
          name: p.display_name,
          level: 'ครู/บุคลากร',
          student_id: '',
          user_id: p.id
        }));
      }
    }
  }, [selectedPersonId, visitorType, students, staff]);

  async function handleAddBook(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    const { error } = await supabase.from('library_books').insert([{
      ...bookForm,
      available_qty: bookForm.total_qty
    }]);
    if (!error) {
      setIsBookModalOpen(false);
      setBookForm({ book_id: '', title: '', category: 'วิชาการ', author: '', total_qty: 1 });
      fetchBooks();
    } else {
      alert('บันทึกไม่สำเร็จ: ' + error.message);
    }
    setIsSaving(false);
  }

  async function handleBorrow(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const { data: book } = await supabase.from('library_books').select('available_qty').eq('id', borrowForm.book_id).single();
      if (!book || book.available_qty <= 0) throw new Error('หนังสือเล่มนี้ถูกยืมหมดแล้ว');

      const { error: borrowError } = await supabase.from('library_borrow').insert([borrowForm]);
      if (borrowError) throw borrowError;

      const { error: updateError } = await supabase
        .from('library_books')
        .update({ available_qty: book.available_qty - 1 })
        .eq('id', borrowForm.book_id);
      
      if (updateError) throw updateError;

      setIsBorrowModalOpen(false);
      setBorrowForm({ book_id: '', borrower_name: '', borrower_id: '', return_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] });
      fetchBorrowList();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleReturn(borrow: any) {
    if (!confirm('ยืนยันการคืนหนังสือ?')) return;
    setIsSaving(true);
    try {
      // 1. อัปเดตสถานะคืนหนังสือ
      const { error: returnError } = await supabase
        .from('library_borrow')
        .update({ status: 'returned', return_date: new Date().toISOString().split('T')[0] })
        .eq('id', borrow.id);
      
      if (returnError) throw returnError;

      // 2. คืนจำนวนหนังสือกลับสู่คลัง
      const { data: book } = await supabase.from('library_books').select('available_qty').eq('id', borrow.book_id).single();
      if (book) {
        await supabase.from('library_books').update({ available_qty: book.available_qty + 1 }).eq('id', borrow.book_id);
      }

      fetchBorrowList();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogUsage(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    
    const payload = {
      name: usageForm.name,
      level: usageForm.level,
      purpose: usageForm.purpose,
      student_id: usageForm.student_id || null,
      user_id: usageForm.user_id || null
    };

    const { error } = await supabase.from('library_usage_logs').insert([payload]);
    if (!error) {
      setIsUsageLogModalOpen(false);
      setSelectedPersonId('');
      setUsageLogForm({ name: '', level: 'ป.1', purpose: 'อ่านหนังสือ/ค้นคว้า', student_id: '', user_id: '' });
      fetchUsageLogs();
    } else {
      alert('บันทึกการเข้าใช้ไม่สำเร็จ: ' + error.message);
    }
    setIsSaving(false);
  }

  function executePrint() {
    setIsPrintModalOpen(false);
    setTimeout(() => {
      window.print();
    }, 200);
  }

  const filteredBooks = books.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.book_id.includes(searchTerm));

  // --- ฟังก์ชันช่วยเหลือเกี่ยวกับวันที่แบบปลอดภัย (Timezone Safe Helpers) ---
  function getLocalDateString(d: Date) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // ดึงค่าเดือนเป็นตัวเลข 0-11 โดยวิเคราะห์จาก TEXT Date String ตรง ๆ เพื่อป้องกันปัญหา Timezone เพี้ยน
  const getMonthFromDateStr = (dateStr: string) => {
    if (!dateStr) return -1;
    const parts = dateStr.split('-');
    if (parts.length >= 2) {
      return parseInt(parts[1]) - 1; // แปลงเป็น 0-indexed (1-12 เป็น 0-11)
    }
    return -1;
  };

  // --- การคำนวณข้อมูลแดชบอร์ดหลัก ---
  const totalBooksCount = books.reduce((acc, b) => acc + (parseInt(b.total_qty) || 1), 0);
  const currentlyBorrowedCount = borrowList.filter(b => b.status === 'borrowing').length;
  const availableBooksCount = books.reduce((acc, b) => acc + (parseInt(b.available_qty) || 0), 0);
  const totalVisitorsCount = usageLogs.length;

  const categoryMap: { [key: string]: number } = {};
  books.forEach(b => {
    const cat = b.category || 'อื่นๆ';
    categoryMap[cat] = (categoryMap[cat] || 0) + (parseInt(b.total_qty) || 1);
  });
  const categoryData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));

  const finalCategoryData = categoryData;

  // รายการแนวโน้มรายสัปดาห์ (ดึงสถิติ ยืม, คืน, เข้าใช้ ตามจริงแยกตามวัน)
  const weeklyTrendData: any[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = getLocalDateString(d);
    const displayDate = d.toLocaleDateString('th-TH', { weekday: 'short', day: 'numeric' });
    
    // นับค่าจริงในฐานข้อมูลตามวันที่บันทึก (Timezone Safe)
    const borrowCount = borrowList.filter(b => b.borrow_date === dateStr).length;
    const returnCount = borrowList.filter(b => b.status === 'returned' && b.return_date === dateStr).length;
    const visitorCount = usageLogs.filter(log => log.date === dateStr).length;

    weeklyTrendData.push({
      date: displayDate,
      'สถิติการยืม': borrowCount,
      'สถิติการคืน': returnCount,
      'ผู้เข้าใช้ห้องสมุด': visitorCount
    });
  }

  // --- การคำนวณสถิติเฉพาะการพิมพ์รายงาน (Filtered Print Data) ---
  
  // 1. กรองสถิติการยืม, การคืน, และการเข้าใช้ ตามเดือนที่เลือกพิมพ์ (Timezone Safe)
  const printBorrowFiltered = borrowList.filter(b => {
    return getMonthFromDateStr(b.borrow_date) === printMonth;
  });

  const printReturnFiltered = borrowList.filter(b => {
    return b.status === 'returned' && getMonthFromDateStr(b.return_date) === printMonth;
  });

  const printUsageFiltered = usageLogs.filter(log => {
    return getMonthFromDateStr(log.date) === printMonth;
  });

  // 2. คำนวณผู้เข้าใช้บริการสูงสุด (Top Visitors)
  const visitorCountsMap: { [key: string]: { name: string; level: string; count: number } } = {};
  printUsageFiltered.forEach(log => {
    const key = log.student_id || log.user_id || log.name;
    if (!visitorCountsMap[key]) {
      visitorCountsMap[key] = { name: log.name, level: log.level, count: 0 };
    }
    visitorCountsMap[key].count += 1;
  });
  const topVisitorsList = Object.values(visitorCountsMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // 3. คำนวณหนังสือยอดนิยมถูกยืมบ่อยสุด (Top Popular Books)
  const bookCountsMap: { [key: string]: { title: string; category: string; count: number } } = {};
  printBorrowFiltered.forEach(b => {
    const key = b.book_id;
    const title = b.library_books?.title || 'ไม่ระบุชื่อเรื่อง';
    const category = b.library_books?.category || 'ทั่วไป';
    if (!bookCountsMap[key]) {
      bookCountsMap[key] = { title, category, count: 0 };
    }
    bookCountsMap[key].count += 1;
  });
  const topPopularBooksList = Object.values(bookCountsMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      
      {/* CSS ควบคุมการสั่งพิมพ์ในระดับ Print Mode เท่านั้น */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          .print-hidden {
            display: none !important;
          }
          .print-block {
            display: block !important;
          }
          aside, header, footer {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            height: auto !important;
            overflow: visible !important;
            width: 100% !important;
          }
          .min-h-screen, .bg-slate-50, .bg-slate-50\\/50 {
            background-color: white !important;
            background: white !important;
            color: black !important;
          }
          @page {
            size: A4;
            margin: 15mm;
          }
        }
      `}</style>

      {/* ========================================================
          หน้าจอสำหรับสั่งพิมพ์ (PRINT MODE ONLY - ซ่อนบนเว็บแสดงเมื่อสั่งพิมพ์)
          ======================================================== */}
      <div className="hidden print:block p-4 font-sans text-black bg-white space-y-6" style={{ width: '100%', minHeight: '270mm' }}>
        
        <div className="text-center space-y-1.5 border-b-2 border-slate-900 pb-4">
          <h1 className="text-xl font-black">
            {printReportType === 'overview' && 'รายงานสรุปสถิติและสถานะการใช้บริการห้องสมุดดิจิทัล'}
            {printReportType === 'top_visitors' && 'รายงานสรุปสถิติผู้เข้าใช้บริการห้องสมุดสูงสุด (Top Visitors)'}
            {printReportType === 'popular_books' && 'รายงานสรุปอันดับหนังสือยอดนิยมและสถิติการยืมสูงสุด'}
          </h1>
          <h2 className="text-md font-bold">{schoolName}</h2>
          <p className="text-xs text-slate-600 font-semibold">
            ประจำเดือน {MONTHS_TH[printMonth]} ปีการศึกษา {printYear}
          </p>
          <p className="text-[10px] text-slate-400">พิมพ์เอกสารเมื่อ: {new Date().toLocaleString('th-TH')}</p>
        </div>

        {/* TYPE 1: รายงานภาพรวมและสถิติการเข้าใช้รายเดือน */}
        {printReportType === 'overview' && (
          <div className="space-y-6">
            <div className="space-y-2.5">
              <h3 className="text-xs font-black border-l-4 border-slate-800 pl-2">1. ข้อมูลสรุปประจำเดือน (สถิติตามจริง)</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-3.5 border border-slate-300 rounded-xl">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">หนังสือทั้งหมดในคลัง</p>
                  <h4 className="text-xl font-black mt-1">{totalBooksCount} เล่ม</h4>
                </div>
                <div className="p-3.5 border border-slate-300 rounded-xl">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">รายการยืมในเดือนนี้</p>
                  <h4 className="text-xl font-black mt-1">{printBorrowFiltered.length} รายการ</h4>
                </div>
                <div className="p-3.5 border border-slate-300 rounded-xl">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">รายการคืนในเดือนนี้</p>
                  <h4 className="text-xl font-black mt-1">{printReturnFiltered.length} รายการ</h4>
                </div>
                <div className="p-3.5 border border-slate-300 rounded-xl">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">คนเข้าใช้ห้องสมุดเดือนนี้</p>
                  <h4 className="text-xl font-black mt-1">{printUsageFiltered.length} ครั้ง</h4>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xs font-black border-l-4 border-slate-800 pl-2">2. สัดส่วนจำแนกประเภทหนังสือทั้งหมด</h3>
              <table className="w-full text-left border-collapse border border-slate-200 text-xs">
                <thead>
                  <tr className="bg-slate-50 font-bold border-b border-slate-300">
                    <th className="py-2 px-4 border border-slate-200">หมวดหมู่หนังสือ</th>
                    <th className="py-2 px-4 border border-slate-200 text-right">จำนวนหนังสือทั้งหมดในระบบ</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.map(entry => (
                    <tr key={entry.name} className="border-b border-slate-200 font-medium">
                      <td className="py-2 px-4 border border-slate-200">{entry.name}</td>
                      <td className="py-2 px-4 border border-slate-200 text-right">{entry.value} เล่ม</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xs font-black border-l-4 border-slate-800 pl-2">3. รายการหนังสือค้างส่งคืนในระบบขณะนี้</h3>
              <table className="w-full text-left border-collapse border border-slate-200 text-[11px]">
                <thead>
                  <tr className="bg-slate-50 font-bold border-b border-slate-300">
                    <th className="py-2 px-3 border border-slate-200">ชื่อหนังสือ</th>
                    <th className="py-2 px-3 border border-slate-200">ผู้ยืม</th>
                    <th className="py-2 px-3 border border-slate-200">รหัสผู้ยืม</th>
                    <th className="py-2 px-3 border border-slate-200">วันที่ยืม</th>
                    <th className="py-2 px-3 border border-slate-200">กำหนดคืน</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowList.filter(b => b.status === 'borrowing').slice(0, 10).map(borrow => (
                    <tr key={borrow.id} className="border-b border-slate-200">
                      <td className="py-2 px-3 border border-slate-200">{borrow.library_books?.title}</td>
                      <td className="py-2 px-3 border border-slate-200">{borrow.borrower_name}</td>
                      <td className="py-2 px-3 border border-slate-200">{borrow.borrower_id}</td>
                      <td className="py-2 px-3 border border-slate-200">{borrow.borrow_date}</td>
                      <td className="py-2 px-3 border border-slate-200">{borrow.return_date}</td>
                    </tr>
                  ))}
                  {borrowList.filter(b => b.status === 'borrowing').length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-slate-400">ไม่มีหนังสือยืมค้างส่งคืนในขณะนี้</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TYPE 2: รายงานผู้เข้าใช้งานสูงสุด (Top Visitors) */}
        {printReportType === 'top_visitors' && (
          <div className="space-y-6">
            <p className="text-xs text-slate-500 font-medium">
              สรุปตารางผู้เข้าใช้บริการห้องสมุดดิจิทัลที่มีจำนวนความถี่การเข้าใช้บริการสูงสุด 10 อันดับแรก ประจำเดือน {MONTHS_TH[printMonth]} (ข้อมูลตามจริง)
            </p>
            <table className="w-full text-left border-collapse border border-slate-200 text-xs">
              <thead>
                <tr className="bg-slate-50 font-bold border-b border-slate-300">
                  <th className="py-2.5 px-4 border border-slate-200 text-center w-16">อันดับ</th>
                  <th className="py-2.5 px-4 border border-slate-200">ชื่อ-นามสกุล</th>
                  <th className="py-2.5 px-4 border border-slate-200">ระดับชั้น/ตำแหน่ง</th>
                  <th className="py-2.5 px-4 border border-slate-200 text-right">จำนวนครั้งการเข้าใช้บริการ</th>
                </tr>
              </thead>
              <tbody>
                {topVisitorsList.map((visitor, idx) => (
                  <tr key={visitor.name + idx} className="border-b border-slate-200 font-semibold">
                    <td className="py-2.5 px-4 border border-slate-200 text-center text-slate-500">{idx + 1}</td>
                    <td className="py-2.5 px-4 border border-slate-200 text-slate-800">{visitor.name}</td>
                    <td className="py-2.5 px-4 border border-slate-200">{visitor.level}</td>
                    <td className="py-2.5 px-4 border border-slate-200 text-right text-indigo-600 font-black">{visitor.count} ครั้ง</td>
                  </tr>
                ))}
                {topVisitorsList.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-slate-400">ไม่มีข้อมูลการเข้าใช้บริการในเดือนนี้</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TYPE 3: รายงานหนังสือยอดนิยม */}
        {printReportType === 'popular_books' && (
          <div className="space-y-6">
            <p className="text-xs text-slate-500 font-medium">
              สรุปตารางหนังสือที่ได้รับการทำรายการยืมออกสูงสุด 10 อันดับแรก ประจำเดือน {MONTHS_TH[printMonth]} (ข้อมูลตามจริง)
            </p>
            <table className="w-full text-left border-collapse border border-slate-200 text-xs">
              <thead>
                <tr className="bg-slate-50 font-bold border-b border-slate-300">
                  <th className="py-2.5 px-4 border border-slate-200 text-center w-16">อันดับ</th>
                  <th className="py-2.5 px-4 border border-slate-200">ชื่อเรื่องหนังสือ</th>
                  <th className="py-2.5 px-4 border border-slate-200">หมวดหมู่</th>
                  <th className="py-2.5 px-4 border border-slate-200 text-right">สถิติจำนวนครั้งการยืม</th>
                </tr>
              </thead>
              <tbody>
                {topPopularBooksList.map((book, idx) => (
                  <tr key={book.title + idx} className="border-b border-slate-200 font-semibold">
                    <td className="py-2.5 px-4 border border-slate-200 text-center text-slate-500">{idx + 1}</td>
                    <td className="py-2.5 px-4 border border-slate-200 text-slate-800">{book.title}</td>
                    <td className="py-2.5 px-4 border border-slate-200">{book.category}</td>
                    <td className="py-2.5 px-4 border border-slate-200 text-right text-amber-600 font-black">{book.count} ครั้ง</td>
                  </tr>
                ))}
                {topPopularBooksList.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-slate-400">ไม่มีข้อมูลการทำรายการยืมหนังสือในเดือนนี้</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="pt-20 grid grid-cols-2 gap-10 text-center text-xs font-bold">
          <div className="space-y-12">
            <p>ลงชื่อ............................................................<br />ผู้รายงานสถิติ (บรรณารักษ์)</p>
            <p>(............................................................)<br />ตำแหน่ง............................................................</p>
          </div>
          <div className="space-y-12">
            <p>ลงชื่อ............................................................<br />ผู้ตรวจสอบรายงาน (หัวหน้างานวิชาการ)</p>
            <p>(............................................................)<br />ตำแหน่ง............................................................</p>
          </div>
        </div>

      </div>

      {/* ========================================================
          หน้าจอปัจจุบันหลักบนเว็บ (ซ่อนเมื่อสั่งพิมพ์)
          ======================================================== */}
      <div className="space-y-6 print-hidden">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <Library size={32} className="text-indigo-600 animate-pulse" />
              ระบบห้องสมุดดิจิทัล
            </h2>
            <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-xs">Digital Library & Statistics Dashboard</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {activeTab === 'dashboard' && (
              <button 
                onClick={() => setIsPrintModalOpen(true)}
                className="bg-indigo-50 text-indigo-600 border border-indigo-100 px-5 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-indigo-100 transition-all text-xs shadow-xs"
              >
                <Printer size={16} /> ตั้งค่าพิมพ์รายงาน
              </button>
            )}
            
            <div className="flex gap-2 p-1 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<BarChart3 size={16} />} label="แดชบอร์ดสถิติ" />
              <TabButton active={activeTab === 'books'} onClick={() => setActiveTab('books')} icon={<Library size={16} />} label="คลังหนังสือ" />
              <TabButton active={activeTab === 'borrow'} onClick={() => setActiveTab('borrow')} icon={<BookOpen size={16} />} label="ยืม-คืน" />
              <TabButton active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} icon={<History size={16} />} label="การเข้าใช้" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 min-h-[600px] p-8">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-3xl border border-indigo-100/80 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
                      <Library size={24} />
                    </div>
                    <span className="text-[10px] font-black text-indigo-500 uppercase bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">หนังสือสะสม</span>
                  </div>
                  <div className="mt-6 space-y-1">
                    <h3 className="text-4xl font-black text-slate-800 tracking-tight">{loading ? '...' : totalBooksCount}</h3>
                    <p className="text-xs text-slate-400 font-bold">เล่มในคลังระบบสารสนเทศ</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-3xl border border-amber-100/80 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="p-4 bg-amber-500 rounded-2xl text-white shadow-lg shadow-amber-100 group-hover:scale-110 transition-transform">
                      <BookOpen size={24} />
                    </div>
                    <span className="text-[10px] font-black text-amber-500 uppercase bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">กำลังยืม</span>
                  </div>
                  <div className="mt-6 space-y-1">
                    <h3 className="text-4xl font-black text-slate-800 tracking-tight">{loading ? '...' : currentlyBorrowedCount}</h3>
                    <p className="text-xs text-slate-400 font-bold">เล่มที่นักเรียน/ครูยืมไปใช้</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-3xl border border-emerald-100/80 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="p-4 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform">
                      <Bookmark size={24} />
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">พร้อมให้บริการ</span>
                  </div>
                  <div className="mt-6 space-y-1">
                    <h3 className="text-4xl font-black text-slate-800 tracking-tight">{loading ? '...' : availableBooksCount}</h3>
                    <p className="text-xs text-slate-400 font-bold">เล่มพร้อมยืมในชั้นหนังสือ</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-3xl border border-purple-100/80 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="p-4 bg-purple-500 rounded-2xl text-white shadow-lg shadow-purple-100 group-hover:scale-110 transition-transform">
                      <Users size={24} />
                    </div>
                    <span className="text-[10px] font-black text-purple-600 uppercase bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100">ผู้เข้าใช้</span>
                  </div>
                  <div className="mt-6 space-y-1">
                    <h3 className="text-4xl font-black text-slate-800 tracking-tight">{loading ? '...' : totalVisitorsCount}</h3>
                    <p className="text-xs text-slate-400 font-bold">ครั้งที่บันทึกการเข้าใช้สะสม</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-6 border border-slate-100 rounded-[32px] bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-slate-800 text-sm tracking-tight flex items-center gap-2">
                      <TrendingUp className="text-indigo-600" size={18} />
                      แนวโน้มการเข้าใช้บริการห้องสมุด ยืม และคืนสะสมรายวัน
                    </h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1">
                      <Calendar size={12} /> ข้อมูล 7 วันล่าสุด (ตามจริง)
                    </span>
                  </div>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', fontFamily: 'inherit', fontWeight: 'bold' }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', paddingTop: '10px' }} />
                        <Line type="monotone" dataKey="ผู้เข้าใช้ห้องสมุด" stroke="#6366f1" strokeWidth={3} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="สถิติการยืม" stroke="#f59e0b" strokeWidth={3} />
                        <Line type="monotone" dataKey="สถิติการคืน" stroke="#10b981" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="p-6 border border-slate-100 rounded-[32px] bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <h4 className="font-black text-slate-800 text-sm tracking-tight">
                      สัดส่วนหนังสือแยกตามประเภท
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">วิเคราะห์สัดส่วนหนังสือในระบบ</p>
                  </div>
                  <div className="h-[200px] flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={finalCategoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {finalCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} เล่ม`, 'จำนวน']} contentStyle={{ borderRadius: '12px', border: 'none', fontWeight: 'bold' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ทั้งหมด</span>
                      <span className="text-2xl font-black text-slate-800">{totalBooksCount}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-black text-slate-500">
                    {finalCategoryData.slice(0, 4).map((entry, idx) => (
                      <div key={entry.name} className="flex items-center gap-1.5 truncate">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                        <span className="truncate">{entry.name} ({entry.value} เล่ม)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Recent Activity Lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 border border-slate-100 rounded-[32px] space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-slate-800 text-sm tracking-tight">ประวัติการยืมล่าสุด</h4>
                    <TabButton active={false} onClick={() => setActiveTab('borrow')} icon={<BookOpen size={12} />} label="ดูทั้งหมด" />
                  </div>
                  <div className="space-y-3">
                    {borrowList.slice(0, 5).map((borrow, idx) => (
                      <div key={borrow.id || idx} className="flex items-center justify-between p-3.5 bg-slate-50/50 hover:bg-slate-50 rounded-2xl border border-slate-100/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl text-white ${borrow.status === 'returned' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                            <BookOpen size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-700">{borrow.library_books?.title || 'หนังสือที่ไม่รู้จัก'}</p>
                            <p className="text-[10px] text-slate-400 font-bold">ผู้ยืม: {borrow.borrower_name} ({borrow.borrower_id})</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${borrow.status === 'returned' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            {borrow.status === 'returned' ? 'คืนแล้ว' : 'กำลังยืม'}
                          </span>
                          <p className="text-[9px] text-slate-400 font-bold mt-1">ยืมเมื่อ: {borrow.borrow_date}</p>
                        </div>
                      </div>
                    ))}
                    {borrowList.length === 0 && (
                      <div className="text-center py-6 text-slate-400 font-bold text-xs">ยังไม่มีรายการยืมหนังสือในระบบ</div>
                    )}
                  </div>
                </div>

                <div className="p-6 border border-slate-100 rounded-[32px] space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-slate-800 text-sm tracking-tight">ประวัติการเข้าใช้งานล่าสุด</h4>
                    <TabButton active={false} onClick={() => setActiveTab('logs')} icon={<History size={12} />} label="ดูทั้งหมด" />
                  </div>
                  <div className="space-y-3">
                    {usageLogs.slice(0, 5).map((log, idx) => (
                      <div key={log.id || idx} className="flex items-center justify-between p-3.5 bg-slate-50/50 hover:bg-slate-50 rounded-2xl border border-slate-100/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-500 rounded-xl text-white">
                            <User size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-700">{log.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold">ชั้น {log.level} | วัตถุประสงค์: {log.purpose}</p>
                          </div>
                        </div>
                        <div className="text-right text-[10px] font-black text-slate-400">
                          <p>{log.date}</p>
                          <p className="text-[9px] text-indigo-500 font-black mt-1">เวลา: {log.time_in?.slice(0, 5) || '10:00'}</p>
                        </div>
                      </div>
                    ))}
                    {usageLogs.length === 0 && (
                      <div className="text-center py-6 text-slate-400 font-bold text-xs">ยังไม่มีประวัติการเข้าใช้ห้องสมุดในระบบ</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKS LIST */}
          {activeTab === 'books' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input 
                    type="text" 
                    placeholder="ค้นหารหัสหนังสือ หรือชื่อเรื่อง..." 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-hidden focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => setIsBookModalOpen(true)}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all w-full md:w-auto justify-center"
                >
                  <Plus size={20} /> เพิ่มหนังสือใหม่
                </button>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
                  <p className="text-slate-400 font-bold text-sm uppercase">กำลังโหลดข้อมูลหนังสือ...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredBooks.map(book => (
                    <div key={book.id} className="p-6 bg-white rounded-[32px] border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                      <div className="w-full aspect-[3/4] bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mb-4 group-hover:bg-indigo-50 transition-colors">
                        <Library size={64} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{book.category}</p>
                        <h4 className="font-black text-slate-800 line-clamp-1">{book.title}</h4>
                        <p className="text-xs text-slate-400 font-bold">โดย {book.author || 'ไม่ระบุชื่อผู้แต่ง'}</p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">รหัส: {book.book_id}</span>
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full ${book.available_qty > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                          {book.available_qty > 0 ? `ว่าง: ${book.available_qty}/${book.total_qty}` : 'ถูกยืมทั้งหมด'}
                        </span>
                      </div>
                    </div>
                  ))}
                  {filteredBooks.length === 0 && (
                    <div className="col-span-full text-center py-20 text-slate-400 font-bold text-sm">ไม่พบหนังสือที่ตรงตามคำค้นหาของคุณ</div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BORROW & RETURN */}
          {activeTab === 'borrow' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-slate-800 text-lg">รายการยืมหนังสือทั้งหมด</h3>
                <button 
                  onClick={() => setIsBorrowModalOpen(true)}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all text-xs"
                >
                  <ArrowRightLeft size={16} /> บันทึกการยืมหนังสือ
                </button>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
                  <p className="text-slate-400 font-bold text-sm uppercase">กำลังโหลดข้อมูลการยืม...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-wider">
                        <th className="py-4 px-6">ชื่อหนังสือ</th>
                        <th className="py-4 px-6">ผู้ยืม</th>
                        <th className="py-4 px-6">รหัสผู้ยืม</th>
                        <th className="py-4 px-6">วันที่ยืม</th>
                        <th className="py-4 px-6">กำหนดคืน</th>
                        <th className="py-4 px-6">สถานะ</th>
                        <th className="py-4 px-6 text-right">การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {borrowList.map(borrow => (
                        <tr key={borrow.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors text-xs font-bold text-slate-600">
                          <td className="py-4 px-6 text-slate-800">{borrow.library_books?.title || 'หนังสือชำรุด/ถูกลบแล้ว'}</td>
                          <td className="py-4 px-6">{borrow.borrower_name}</td>
                          <td className="py-4 px-6 text-[11px] font-mono">{borrow.borrower_id}</td>
                          <td className="py-4 px-6">{borrow.borrow_date}</td>
                          <td className="py-4 px-6">{borrow.return_date || '-'}</td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${borrow.status === 'returned' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                              {borrow.status === 'returned' ? 'คืนแล้ว' : 'กำลังยืม'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            {borrow.status === 'borrowing' && (
                              <button 
                                onClick={() => handleReturn(borrow)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-[10px] font-black transition-all"
                              >
                                คืนหนังสือ
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {borrowList.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-slate-400 font-bold">ไม่มีประวัติการยืมในขณะนี้</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: USAGE LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-slate-800 text-lg">บันทึกประวัติการเข้าใช้งาน</h3>
                <button 
                  onClick={() => setIsUsageLogModalOpen(true)}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all text-xs"
                >
                  <Plus size={16} /> บันทึกการเข้าใช้งาน
                </button>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
                  <p className="text-slate-400 font-bold text-sm uppercase">กำลังโหลดข้อมูลประวัติ...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-wider">
                        <th className="py-4 px-6">ชื่อ-นามสกุล</th>
                        <th className="py-4 px-6">ระดับชั้น</th>
                        <th className="py-4 px-6">วัตถุประสงค์</th>
                        <th className="py-4 px-6">วันที่เข้าใช้</th>
                        <th className="py-4 px-6">เวลาเข้า</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usageLogs.map(log => (
                        <tr key={log.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors text-xs font-bold text-slate-600">
                          <td className="py-4 px-6 text-slate-800">{log.name}</td>
                          <td className="py-4 px-6">{log.level}</td>
                          <td className="py-4 px-6">{log.purpose}</td>
                          <td className="py-4 px-6">{log.date}</td>
                          <td className="py-4 px-6 text-indigo-600 font-black">{log.time_in?.slice(0, 5) || '-'} น.</td>
                        </tr>
                      ))}
                      {usageLogs.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center py-12 text-slate-400 font-bold">ไม่มีประวัติการเข้าใช้งานในขณะนี้</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MODALS SECTION */}
      
      {/* 1. Modal: เพิ่มหนังสือใหม่ */}
      <Modal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} title="เพิ่มหนังสือใหม่">
        <form onSubmit={handleAddBook} className="space-y-4">
           <div className="space-y-1.5">
             <label className="text-[10px] font-black text-slate-400 uppercase ml-1">รหัสหนังสือ (Book ID)</label>
             <input type="text" placeholder="เช่น B001, ISBN..." className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" required value={bookForm.book_id} onChange={e => setBookForm({...bookForm, book_id: e.target.value})} />
           </div>
           <div className="space-y-1.5">
             <label className="text-[10px] font-black text-slate-400 uppercase ml-1">ชื่อเรื่อง (Title)</label>
             <input type="text" className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" required value={bookForm.title} onChange={e => setBookForm({...bookForm, title: e.target.value})} />
           </div>
           <div className="space-y-1.5">
             <label className="text-[10px] font-black text-slate-400 uppercase ml-1">หมวดหมู่</label>
             <select className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" value={bookForm.category} onChange={e => setBookForm({...bookForm, category: e.target.value})}>
                {['วิชาการ','บันเทิง/วรรณกรรม','คู่มือ/ความรู้ทั่วไป','การ์ตูน','วารสาร/นิตยสาร','อื่นๆ'].map(c => <option key={c}>{c}</option>)}
             </select>
           </div>
           <div className="space-y-1.5">
             <label className="text-[10px] font-black text-slate-400 uppercase ml-1">ชื่อผู้เขียน/ผู้แต่ง</label>
             <input type="text" className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" value={bookForm.author} onChange={e => setBookForm({...bookForm, author: e.target.value})} />
           </div>
           <div className="space-y-1.5">
             <label className="text-[10px] font-black text-slate-400 uppercase ml-1">จำนวนหนังสือ (เล่ม)</label>
             <input type="number" min="1" className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" required value={bookForm.total_qty} onChange={e => setBookForm({...bookForm, total_qty: parseInt(e.target.value) || 1})} />
           </div>
           <button type="submit" disabled={isSaving} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-indigo-100">
             {isSaving ? <Loader2 className="animate-spin" /> : <Save />} บันทึกข้อมูล
           </button>
        </form>
      </Modal>

      {/* 2. Modal: บันทึกยืมหนังสือ */}
      <Modal isOpen={isBorrowModalOpen} onClose={() => setIsBorrowModalOpen(false)} title="บันทึกการยืมหนังสือ">
        <form onSubmit={handleBorrow} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">หนังสือที่ต้องการยืม</label>
              <select 
                className="w-full p-4 bg-slate-50 border rounded-2xl font-bold text-slate-700" 
                required 
                value={borrowForm.book_id} 
                onChange={e => setBorrowForm({...borrowForm, book_id: e.target.value})}
              >
                <option value="">-- กรุณาเลือกหนังสือ --</option>
                {books.filter(b => b.available_qty > 0).map(b => (
                  <option key={b.id} value={b.id}>
                    {b.title} (รหัส: {b.book_id}) - คงเหลือ {b.available_qty} / {b.total_qty} เล่ม
                  </option>
                ))}
              </select>
            </div>

            {/* แสดงพรีวิวข้อมูลหนังสือและจำนวนคงเหลือหลังเลือก */}
            {borrowForm.book_id && (() => {
              const selectedBook = books.find(b => b.id === borrowForm.book_id);
              if (!selectedBook) return null;
              return (
                <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-400">หนังสือที่เลือก:</span>
                    <span className="font-black text-slate-700">{selectedBook.title}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-400">ผู้เขียน:</span>
                    <span className="font-black text-slate-700">{selectedBook.author || 'ไม่ระบุ'}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-400">สถานะคงเหลือ:</span>
                    <span className="font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100/50">
                      พร้อมยืม {selectedBook.available_qty} จากทั้งหมด {selectedBook.total_qty} เล่ม
                    </span>
                  </div>
                </div>
              );
            })()}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">ชื่อผู้ยืม (นักเรียน/ครู)</label>
              <input type="text" className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" required value={borrowForm.borrower_name} onChange={e => setBorrowForm({...borrowForm, borrower_name: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">รหัสผู้ยืม (รหัสนักเรียน/ครู)</label>
              <input type="text" className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" required value={borrowForm.borrower_id} onChange={e => setBorrowForm({...borrowForm, borrower_id: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">กำหนดส่งคืน</label>
              <input type="date" className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" required value={borrowForm.return_date} onChange={e => setBorrowForm({...borrowForm, return_date: e.target.value})} />
            </div>
            <button type="submit" disabled={isSaving || !borrowForm.book_id} className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2">
              {isSaving ? <Loader2 className="animate-spin" /> : <ArrowRightLeft />} ยืนยันการยืม
            </button>
         </form>
      </Modal>

      {/* 3. Modal: บันทึกการเข้าใช้ห้องสมุด */}
      <Modal isOpen={isLogModalOpen} onClose={() => setIsUsageLogModalOpen(false)} title="บันทึกการเข้าใช้ห้องสมุด">
        <form onSubmit={handleLogUsage} className="space-y-5">
           
           <div className="space-y-1.5">
             <label className="text-[10px] font-black text-slate-400 uppercase ml-1">ประเภทผู้เข้าใช้</label>
             <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1.5 rounded-2xl border">
               <button 
                 type="button"
                 onClick={() => { setVisitorType('student'); setSelectedPersonId(''); }}
                 className={`py-2.5 rounded-xl text-xs font-black transition-all ${visitorType === 'student' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 นักเรียน
               </button>
               <button 
                 type="button"
                 onClick={() => { setVisitorType('staff'); setSelectedPersonId(''); }}
                 className={`py-2.5 rounded-xl text-xs font-black transition-all ${visitorType === 'staff' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 ครู / บุคลากร
               </button>
             </div>
           </div>

           <div className="space-y-1.5">
             <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
               {visitorType === 'student' ? 'เลือกรายชื่อนักเรียน' : 'เลือกรายชื่อครู / บุคลากร'}
             </label>
             <select 
               className="w-full p-4 bg-slate-50 border rounded-2xl font-bold text-slate-700"
               required
               value={selectedPersonId}
               onChange={e => setSelectedPersonId(e.target.value)}
             >
               <option value="">-- กรุณาเลือกบุคคล --</option>
               {visitorType === 'student' ? (
                 students.map(s => (
                   <option key={s.id} value={s.id}>
                     {s.prefix || ''}{s.first_name} {s.last_name} ({s.class_level || 'ไม่ระบุชั้น'}{s.room ? '/' + s.room : ''})
                   </option>
                 ))
               ) : (
                 staff.map(st => (
                   <option key={st.id} value={st.id}>
                     {st.display_name} ({st.role === 'director' ? 'ผู้อำนวยการ' : st.role === 'academic' ? 'วิชาการ' : 'ครูผู้สอน'})
                   </option>
                 ))
               )}
             </select>
           </div>

           {selectedPersonId && (
             <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-2 animate-in slide-in-from-top-2 duration-300">
               <div className="flex justify-between text-xs">
                 <span className="font-bold text-slate-400">ชื่อผู้เข้าใช้:</span>
                 <span className="font-black text-slate-700">{usageForm.name}</span>
               </div>
               <div className="flex justify-between text-xs">
                 <span className="font-bold text-slate-400">ระดับชั้น:</span>
                 <span className="font-black text-slate-700">{usageForm.level}</span>
               </div>
               {visitorType === 'student' && (
                 <div className="flex justify-between text-xs">
                   <span className="font-bold text-slate-400">รหัสนักเรียน:</span>
                   <span className="font-mono font-black text-indigo-600">{usageForm.student_id}</span>
                 </div>
               )}
             </div>
           )}

           <div className="space-y-1.5">
             <label className="text-[10px] font-black text-slate-400 uppercase ml-1">วัตถุประสงค์</label>
             <input 
               type="text" 
               className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" 
               required 
               value={usageForm.purpose} 
               onChange={e => setUsageLogForm({...usageForm, purpose: e.target.value})} 
             />
           </div>

           <button type="submit" disabled={isSaving || !selectedPersonId} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-indigo-100">
             {isSaving ? <Loader2 className="animate-spin" /> : <Save />} บันทึกการเข้าใช้งาน
           </button>
        </form>
      </Modal>

      {/* 4. Modal ตั้งค่าก่อนพิมพ์รายงาน */}
      <Modal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} title="ตั้งค่าการพิมพ์รายงานสถิติ">
        <div className="space-y-5">
           
           <div className="space-y-1.5">
             <label className="text-[10px] font-black text-slate-400 uppercase ml-1">เลือกประเภทรายงานที่ต้องการ</label>
             <div className="space-y-2">
               <button 
                 onClick={() => setPrintReportType('overview')}
                 className={`w-full p-4 rounded-2xl border text-left font-black text-xs flex items-center justify-between transition-all ${printReportType === 'overview' ? 'border-slate-800 bg-slate-50 text-slate-800 ring-2 ring-slate-800/10' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
               >
                 <span className="flex items-center gap-2"><FileText size={16} /> 1. รายงานภาพรวมและสถิติเข้าใช้รายเดือน</span>
                 {printReportType === 'overview' && <CheckCircle size={16} className="text-slate-800" />}
               </button>
               <button 
                 onClick={() => setPrintReportType('top_visitors')}
                 className={`w-full p-4 rounded-2xl border text-left font-black text-xs flex items-center justify-between transition-all ${printReportType === 'top_visitors' ? 'border-slate-800 bg-slate-50 text-slate-800 ring-2 ring-slate-800/10' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
               >
                 <span className="flex items-center gap-2"><Users size={16} /> 2. รายงานผู้เข้าใช้บริการสูงสุด (Top Visitors)</span>
                 {printReportType === 'top_visitors' && <CheckCircle size={16} className="text-slate-800" />}
               </button>
               <button 
                 onClick={() => setPrintReportType('popular_books')}
                 className={`w-full p-4 rounded-2xl border text-left font-black text-xs flex items-center justify-between transition-all ${printReportType === 'popular_books' ? 'border-slate-800 bg-slate-50 text-slate-800 ring-2 ring-slate-800/10' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
               >
                 <span className="flex items-center gap-2"><BookOpen size={16} /> 3. รายงานหนังสือยอดนิยม/สถิติจำนวนครั้งยืมสูงสุด</span>
                 {printReportType === 'popular_books' && <CheckCircle size={16} className="text-slate-800" />}
               </button>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
               <label className="text-[10px] font-black text-slate-400 uppercase ml-1">ประจำเดือน</label>
               <select 
                 className="w-full p-4 bg-slate-50 border rounded-2xl font-bold text-slate-700"
                 value={printMonth}
                 onChange={e => setPrintMonth(parseInt(e.target.value))}
               >
                 {MONTHS_TH.map((m, idx) => <option key={m} value={idx}>{m}</option>)}
               </select>
             </div>
             <div className="space-y-1.5">
               <label className="text-[10px] font-black text-slate-400 uppercase ml-1">ปีการศึกษา</label>
               <input 
                 type="text" 
                 className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" 
                 value={printYear} 
                 onChange={e => setPrintYear(e.target.value)} 
                 placeholder="เช่น 2569" 
               />
             </div>
           </div>

           <button 
             onClick={executePrint}
             className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-slate-100 transition-all"
           >
             <Printer size={18} /> ยืนยันและสั่งพิมพ์รายงาน A4
           </button>
        </div>
      </Modal>

    </div>
  );
}
