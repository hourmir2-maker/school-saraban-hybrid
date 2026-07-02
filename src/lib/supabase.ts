import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SchoolProfile {
  id: string;
  name: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  vercelUrl: string;
  gasUrl?: string;
}

let currentClient: SupabaseClient | null = null;

export function getActiveSchoolProfile(): SchoolProfile | null {
  try {
    const profilesJson = localStorage.getItem('school_profiles');
    const activeId = localStorage.getItem('active_school_id');
    if (profilesJson && activeId) {
      const profiles = JSON.parse(profilesJson);
      return profiles.find((p: SchoolProfile) => p.id === activeId) || null;
    }
  } catch (e) {
    console.error('Error reading active profile:', e);
  }
  return null;
}

export function getSchoolProfiles(): SchoolProfile[] {
  try {
    const profilesJson = localStorage.getItem('school_profiles');
    return profilesJson ? JSON.parse(profilesJson) : [];
  } catch (e) {
    console.error('Error reading profiles:', e);
    return [];
  }
}

export function checkAndCreateDefaultProfile() {
  try {
    const profilesJson = localStorage.getItem('school_profiles');
    let profiles = profilesJson ? JSON.parse(profilesJson) : [];
    
    // ตรวจสอบว่าใน .env มี config ที่ตั้งค่าไว้จริงและไม่ใช่ placeholder
    const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
    const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    const isRealEnv = envUrl && 
                      envUrl !== 'https://your-project.supabase.co' && 
                      envUrl !== 'https://YOUR_SECOND_SCHOOL_SUPABASE_URL.supabase.co' &&
                      envKey && 
                      envKey !== 'your-anon-key' &&
                      envKey !== 'YOUR_SECOND_SCHOOL_SUPABASE_ANON_KEY';

    if (isRealEnv) {
      const defaultProfile: SchoolProfile = {
        id: 'school_default',
        name: import.meta.env.VITE_SCHOOL_NAME || 'โรงเรียนหลัก (เชื่อมต่ออัตโนมัติ)',
        supabaseUrl: envUrl,
        supabaseAnonKey: envKey,
        vercelUrl: import.meta.env.VITE_VERCEL_URL || window.location.origin,
        gasUrl: import.meta.env.VITE_GAS_URL || ''
      };
      
      const defaultIndex = profiles.findIndex((p: any) => p.id === 'school_default');
      
      if (defaultIndex >= 0) {
        // หากมีโปรไฟล์เดิมอยู่แล้ว แต่ URL หรือ KEY ไม่ตรงกับ .env ปัจจุบัน ให้ปรับปรุงให้ถูกต้อง
        if (profiles[defaultIndex].supabaseUrl !== envUrl || profiles[defaultIndex].supabaseAnonKey !== envKey) {
          profiles[defaultIndex] = defaultProfile;
          localStorage.setItem('school_profiles', JSON.stringify(profiles));
          // รีเซ็ต active_school_id ให้ชี้ไปที่โรงเรียนหลักที่แก้ไขใหม่
          localStorage.setItem('active_school_id', 'school_default');
          initSupabase();
        }
      } else {
        // หากไม่มีโปรไฟล์เลย ให้สร้างใหม่
        profiles.push(defaultProfile);
        localStorage.setItem('school_profiles', JSON.stringify(profiles));
        localStorage.setItem('active_school_id', defaultProfile.id);
        initSupabase();
      }
    }
  } catch (e) {
    console.error('Error checking/creating default profile:', e);
  }
}

export function initSupabase() {
  const profile = getActiveSchoolProfile();
  const url = profile?.supabaseUrl || import.meta.env.VITE_SUPABASE_URL || '';
  const key = profile?.supabaseAnonKey || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  
  if (url && key) {
    currentClient = createClient(url, key);
  } else {
    currentClient = createClient(
      url || 'https://placeholder-url.supabase.co', 
      key || 'placeholder-key'
    );
  }
}

// Auto-create default profile from ENV if online/configured
checkAndCreateDefaultProfile();

// Initialize on load
initSupabase();

export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop, receiver) {
    if (!currentClient) {
      initSupabase();
    }
    return Reflect.get(currentClient!, prop, receiver);
  }
});
