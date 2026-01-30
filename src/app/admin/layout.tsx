'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { logout, signIntegrityPact, getSession } from '../actions'; 
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
    // Client-side session check
    const checkSession = async () => {
        const currentSession = await getSession();
        if (currentSession?.isLoggedIn) {
            setSession(currentSession);
        } else {
            router.push('/login');
        }
        setLoading(false);
    };
    checkSession();
  }, [pathname, router]);
  
  const handlePactComplete = async () => {
    await signIntegrityPact(); 
    const updatedSession = { ...session, isOnboarded: true };
    setSession(updatedSession);
  };

  const handleLogout = async () => {
    await logout();
    setSession(null);
    toast({ title: "Logout Berhasil" });
    router.push('/');
  };
  
  if (loading) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background">
            <div className="w-8 h-8 animate-spin text-primary" />
        </div>
    );
  }

  if (!session?.isLoggedIn) {
    return null;
  }
  
  // Show integrity pact modal if not onboarded
  if (!session.isOnboarded) {
    return (
        <IntegrityPactModal 
            isOpen={true}
            userName={session.name}
            onComplete={handlePactComplete}
        />
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      
      <AppSidebar onLogout={handleLogout} className="z-50" />
      
      <SidebarInset className="relative flex flex-col min-h-screen bg-transparent overflow-hidden">
        
        <div className="fixed inset-0 -z-50 pointer-events-none">
            <AdminBackground />
        </div>

        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-40 transition-all">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full w-10 h-10 transition-all" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <span className="text-sm font-black text-foreground hidden md:block tracking-widest uppercase font-headline">
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
