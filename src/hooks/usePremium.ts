import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export function usePremium() {
  const { profile, loading: authLoading } = useAuth();
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [schoolId, setSchoolId] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    const currentSchoolId = profile?.school_id || localStorage.getItem('active_school_id');
    setSchoolId(currentSchoolId);

    if (!currentSchoolId) {
      setIsPremium(false);
      setLoading(false);
      return;
    }

    async function checkPremiumStatus() {
      try {
        setLoading(true);
        // query ตาราง schools เพื่อเช็ค is_premium และ premium_expires_at
        const { data, error } = await supabase
          .from('schools')
          .select('is_premium, premium_expires_at')
          .eq('id', currentSchoolId)
          .maybeSingle();

        if (error) {
          console.error('[usePremium Check Error]', error);
          setIsPremium(false);
        } else if (data) {
          const premium = data.is_premium === true;
          const expiresAt = data.premium_expires_at;

          if (premium) {
            if (!expiresAt) {
              // พรีเมียมตลอดชีพ
              setIsPremium(true);
            } else {
              // ตรวจสอบวันหมดอายุ
              const expireDate = new Date(expiresAt);
              const now = new Date();
              setIsPremium(expireDate > now);
            }
          } else {
            setIsPremium(false);
          }
        } else {
          setIsPremium(false);
        }
      } catch (err) {
        console.error('[usePremium System Error]', err);
        setIsPremium(false);
      } finally {
        setLoading(false);
      }
    }

    checkPremiumStatus();
  }, [profile?.school_id, authLoading]);

  return { isPremium, loading: loading || authLoading, schoolId };
}
