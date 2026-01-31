'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getSession, logout } from '../actions';
import { Loader2 } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";
import { AdminBackground } from "@/components/admin/admin-background";
import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { useToast } from '@/hooks/use-toast';
import { AthleteSidebar } from '@/components/ui/athlete-sidebar'; // Using the new sidebar

export default function AthleteLayout({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const currentSession = await getSession();

      if (!currentSession?.isLoggedIn) {
        router.push('/login');
        return;
      }
      
      // Ensure only athletes can access this layout
      if (currentSession.role !== 'ATHLETE') {
        // Redirect non-athletes away, maybe to admin dashboard or login
        router.push('/admin/dashboard'); 
        return;
      }

      setSession(currentSession);
      setLoading(false);
    };

    checkSession();
  }, [pathname, router]);

  const handleLogout = async () => {
    await logout();
    setSession(null);
    toast({ title: "Logout Berhasil" });
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
    );
  }

  if (!session?.isLoggedIn) {
    return null; // Redirect is handled by useEffect
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AthleteSidebar onLogout={handleLogout} className="z-50" />
      <SidebarInset className="relative flex flex-col min-h-screen bg-transparent overflow-hidden">
        <div className="fixed inset-0 -z-50 pointer-events-none">
            <AdminBackground />
        </div>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-40 transition-all">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full w-10 h-10 transition-all" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <span className="text-sm font-black text-foreground hidden md:block tracking-widest uppercase font-headline">
                  KULTUR JUARA | ATHLETE PORTAL
                </span>
            </div>
        </header>
        <div className="flex-1 overflow-auto relative z-10 scroll-smooth">
            <div className="p-4 md:p-6 lg:p-8">
                {children}
            </div>
        </div>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
