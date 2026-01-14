
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, Users, LogOut, Settings, CheckCircle, 
  Download, Menu, Home, FileText, AlertCircle, Swords, CreditCard, FilePenLine, UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logoutManager } from '@/app/manager/actions';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { ClientOnly } from '@/components/client-only';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuGroups = [
    {
        title: "MENU UTAMA",
        items: [
            { name: "Dashboard", href: "/manager/dashboard", icon: LayoutDashboard },
        ]
    },
    {
        title: "MANAJEMEN TIM",
        items: [
            { name: "Registrasi Komunitas", href: "/manager/register-team", icon: UserPlus },
            { name: "Status & Verifikasi", href: "/manager/status", icon: CheckCircle },
        ]
    },
    {
        title: "OPERASIONAL PERTANDINGAN",
        items: [
            { name: "Ajukan Protes", href: "/manager/protest/submit", icon: AlertCircle },
            { name: "Tagihan & Denda", href: "/manager/billing", icon: CreditCard },
        ]
    },
    {
        title: "AKUN & BANTUAN",
        items: [
            { name: "Dokumen & Unduh", href: "/manager/downloads", icon: Download },
            { name: "Pengaturan Akun", href: "/manager/settings", icon: Settings },
        ]
    }
  ];
  
  const handleLogout = async () => {
      await logoutManager();
  };

  const renderNavLinks = (isSheet: boolean = false) => menuGroups.map((group, groupIndex) => (
    <div key={groupIndex} className="space-y-1">
        <p className="px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            {group.title}
        </p>
        {group.items.map((menu) => {
            const isActive = pathname.startsWith(menu.href);
            const NavLinkComponent = (
                 <Link 
                    key={menu.href} 
                    href={menu.href}
                    target={(menu as any).isExternal ? "_blank" : undefined}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group',
                      isActive 
                        ? 'bg-primary/10 text-primary font-bold' 
                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground font-medium'
                    )}
                  >
                    <menu.icon className="w-5 h-5" />
                    <span>{menu.name}</span>
                </Link>
            );
            
            if (isSheet) {
                return <SheetClose asChild key={menu.href}>{NavLinkComponent}</SheetClose>;
            }
            return NavLinkComponent;
        })}
    </div>
  ));

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-card hidden md:flex flex-col fixed h-full">
        <div className="p-6 flex items-center gap-3">
          <h1 className="font-headline font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-fuchsia-500">
            MANAGER AREA
          </h1>
        </div>
        
        <nav className="flex-1 space-y-2 py-4 overflow-y-auto no-scrollbar">
          {renderNavLinks()}
        </nav>

        <div className="p-4 border-t">
          <form action={handleLogout}>
            <Button variant="outline" className="w-full">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="h-16 bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10 md:justify-end">
             <div className="md:hidden">
              <Sheet>
                  <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                          <Menu className="w-5 h-5"/>
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-72 bg-card">
                      <SheetHeader className="p-6 border-b">
                        <SheetTitle className="font-headline font-black text-xl text-primary">MANAGER AREA</SheetTitle>
                      </SheetHeader>
                      <nav className="p-4 space-y-2">
                        {renderNavLinks(true)}
                      </nav>
                  </SheetContent>
              </Sheet>
             </div>
             
             <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/"><Home className="w-4 h-4" /></Link>
                </Button>
                <ClientOnly>
                  <ThemeToggle />
                </ClientOnly>
             </div>
        </header>
        
        <main className="p-4 md:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

    