import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  display_name: string;
  email: string;
  role: 'admin' | 'director' | 'teacher' | 'guest';
  status: string;
  signature_url?: string;
  line_user_id?: string;
  extra_permissions?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  session: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      // 1. ดึงจาก Cache ก่อนเพื่อความรวดเร็ว (Optimistic UI)
      const cachedProfile = localStorage.getItem(`profile_${userId}`);
      if (cachedProfile && !profile) {
        setProfile(JSON.parse(cachedProfile));
      }

      // 2. คิวรีข้อมูลโปรไฟล์จากตาราง (ใช้ maybeSingle() เพื่อไม่ให้พ่น Error 406 บนระบบ)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (!error && data) {
        setProfile(data);
        localStorage.setItem(`profile_${userId}`, JSON.stringify(data));
      } else if (!data) {
        // --- 🟢 ระบบกู้คืนโปรไฟล์อัตโนมัติอย่างถาวร (Safety Fallback Profile Creator) ---
        // กรณีดึงแล้วไม่พบโปรไฟล์ในตาราง profiles (แต่ล็อกอินใน Auth สำเร็จ) 
        console.log('No profile row found, initiating safety auto-creation...');
        
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          const userEmail = currentUser.email || '';
          let userRole = 'teacher'; // สิทธิ์ครูเริ่มต้น
          let targetSchoolId = localStorage.getItem('active_school_id') || null;

          // ตรวจสอบความถูกต้องของโครงสร้าง UUID เพื่อป้องกันข้อผิดพลาดประเภทข้อมูลใน PostgreSQL
          let isUUID = targetSchoolId ? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(targetSchoolId) : false;
          if (!isUUID) {
            // หากค่าที่ได้ไม่ใช่ UUID (เช่น 'school_default') ให้หาโรงเรียนแรกที่มีในฐานข้อมูลมาผูกให้โดยอัตโนมัติ
            const { data: firstSchool } = await supabase
              .from('schools')
              .select('id')
              .limit(1)
              .maybeSingle();
            
            if (firstSchool?.id) {
              targetSchoolId = firstSchool.id;
              localStorage.setItem('active_school_id', firstSchool.id);
              isUUID = true;
            } else {
              targetSchoolId = null;
            }
          }

          // วิเคราะห์หาบทบาทและสิทธิ์แอดมินอัตโนมัติ:
          const superAdminEmail = (import.meta.env.VITE_SUPER_ADMIN_EMAIL || 'ncrows77@gmail.com').toLowerCase();
          if (userEmail.toLowerCase() === superAdminEmail) {
            userRole = 'admin';
          } else if (targetSchoolId) {
            // ตรวจสอบกับอีเมลแอดมินที่ผูกกับโรงเรียน
            const { data: schoolData } = await supabase
              .from('schools')
              .select('id, admin_email')
              .eq('id', targetSchoolId)
              .maybeSingle();

            if (schoolData && schoolData.admin_email?.toLowerCase() === userEmail.toLowerCase()) {
              userRole = 'admin';
            }
          }

          const fallbackProfile = {
            id: currentUser.id,
            school_id: targetSchoolId,
            display_name: currentUser.user_metadata?.display_name || userEmail.split('@')[0],
            email: userEmail,
            role: userRole,
            status: 'active'
          };

          // บันทึกโปรไฟล์เริ่มต้นลงตารางในฐานข้อมูล
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([fallbackProfile]);

          if (!insertError) {
            setProfile(fallbackProfile);
            localStorage.setItem(`profile_${userId}`, JSON.stringify(fallbackProfile));
            console.log('Safety profile auto-created successfully:', fallbackProfile);
          } else {
            console.error('Failed to create safety profile:', insertError);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error('Error during Supabase signOut:', e);
    }
    // ล้าง localStorage ที่เกี่ยวกับ Auth และ Profile ทั้งหมดเพื่อป้องกัน Token ค้าง
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('sb-') || key.startsWith('profile_') || key.includes('auth-token'))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch (err) {
      console.error('Error clearing localStorage:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
