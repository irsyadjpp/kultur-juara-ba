
'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { logout, signIntegrityPact } from '../actions'; // Updated import
import { IntegrityPactModal } from '@/components/admin/integrity-pact-modal';
import { EmergencyButton } from '@/components/admin/emergency-button';
import { Toaster } from "@/components/ui/toaster";
import { NotificationBell } from '@/components/admin/notification-bell';
import { AdminBackground } from "@/components/admin/admin-background"; 
import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/ui/app-sidebar';

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // No longer need to check for /login path here since this layout won't render for it.
    const sessionStr = sessionStorage.getItem('kultur_juara_session'); // Updated session name
    if (sessionStr) {
        try {
            const storedSession = JSON.parse(sessionStr);
            if (storedSession && storedSession.isLoggedIn) {
                setSession(storedSession);
            } else {
                router.push('/login'); // Redirect to unified login
            }
        } catch (error) {
            console.error("Failed to parse session", error);
            sessionStorage.removeItem('kultur_juara_session');
            router.push('/login');
        }
    } else {
        router.push('/login');
    }
    setLoading(false);
  }, [pathname, router]);
  
  const handlePactComplete = () => {
    if (!session) return;
    const updatedSession = { ...session, isOnboarded: true };
    setSession(updatedSession);
    sessionStorage.setItem('kultur_juara_session', JSON.stringify(updatedSession));
    signIntegrityPact(); // Call server action to update cookie
  };

  const handleLogout = async () => {
    await logout(); // Use unified logout action
    sessionStorage.removeItem('kultur_juara_session');
    setSession(null);
    toast({ title: "Logout Berhasil" });
    router.push('/'); // Redirect to home after logout
  };
  
  if (loading) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background">
            <div className="w-8 h-8 animate-spin text-primary" />
        </div>
    );
  }

  if (!session?.isLoggedIn) {
    // This state should ideally not be reached due to the useEffect redirect,
    // but it's good practice as a fallback.
    return null;
  }
  
  // Temporarily disabling pact for easier debugging if needed
  // if (!session.isOnboarded) {
  //   return (
  //       <IntegrityPactModal 
  //           isOpen={true}
  //           onComplete={handlePactComplete}
  //           userName={session.name}
  //       />
  //   )
  // }

  return (
    <SidebarProvider defaultOpen={true}>
      
      <AppSidebar onLogout={handleLogout} className="z-50 border-r border-white/5" />
      
      <SidebarInset className="relative flex flex-col min-h-screen bg-transparent overflow-hidden">
        
        <div className="fixed inset-0 -z-50 pointer-events-none">
            <AdminBackground />
        </div>

        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 bg-black/40 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 transition-all">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-full w-10 h-10 transition-all" />
                <Separator orientation="vertical" className="mr-2 h-4 bg-zinc-700" />
                <span className="text-sm font-black text-zinc-200 hidden md:block tracking-widest uppercase font-headline">
                  KULTUR JUARA PWN | ADMIN
                </span>
            </div>

            <div className="flex items-center gap-4">
                <NotificationBell />
            </div>
        </header>

        <div className="flex-1 overflow-auto relative z-10 scroll-smooth">
            <div className="p-4 md:p-6 lg:p-8">
                {children}
            </div>
        </div>
        
        <EmergencyButton /> 
        <Toaster />

      </SidebarInset>
    </SidebarProvider>
  )
}
