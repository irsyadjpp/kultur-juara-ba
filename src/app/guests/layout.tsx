'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '../actions';
import { Loader2 } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";

export default function GuestLayout({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const currentSession = await getSession();

      if (!currentSession?.isLoggedIn) {
        router.push('/login');
        return;
      }

      // If NOT a guest, they probably shouldn't be here.
      // Redirect to admin dashboard which will handle further routing based on role
      if (currentSession.role !== 'GUEST') {
        router.push('/admin/dashboard');
        return;
      }

      setSession(currentSession);
      setLoading(false);
    };

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session?.isLoggedIn) {
    return null;
  }

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
