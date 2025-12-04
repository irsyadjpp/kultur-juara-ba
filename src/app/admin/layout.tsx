

'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, Trophy, BarChart3, LogOut, Lock, 
  ClipboardCheck, ArrowRight, Menu, Home, Settings, AlertOctagon,
  FileCheck, Shield, Mic, Ticket, Award, Wallet,
  ClipboardList, Activity, Gavel, Gift, Stethoscope, Receipt, CheckCircle, FileText,
  Store, Video, QrCode, Archive, ShieldAlert
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const ADMIN_CODES: Record<string, { name: string; role: string }> = {
  // --- STEERING COMMITTEE ---
  "001": { name: "Irsyad Jamal (Director)", role: "DIRECTOR" },
  "111": { name: "Rizki/Annisa (Sekretaris)", role: "SECRETARY" },
  "222": { name: "Selvi Yulia (Bendahara)", role: "FINANCE" },

  // --- MATCH CONTROL ---
  "333": { name: "Agung (Koord. Pertandingan)", role: "MATCH_COORD" },
  "334": { name: "Sarah (MLO)", role: "MLO" },
  "335": { name: "Tim TPF", role: "TPF" },
  "336": { name: "Referee Utama", role: "REFEREE" },
  
  // --- BUSINESS ---
  "444": { name: "Risca/Laras (Komersial)", role: "BUSINESS" },
  "445": { name: "Hera (Tenant)", role: "TENANT_RELATIONS" },

  // --- SHOW & MEDIA ---
  "555": { name: "Rizki K. (Show Dir)", role: "MEDIA" },
  
  // --- OPERATIONS ---
  "666": { name: "Kevin/Terri (Ops)", role: "OPERATIONS" },
  "667": { name: "Sidiq (Security/Gate)", role: "GATE" },
  "668": { name: "Nanda (Medis)", role: "MEDIC" },
  
  // --- IT ---
  "777": { name: "Kevin (IT)", role: "IT_ADMIN" } // Full Access System
};

// --- DEFINISI MENU ---
const getMenusByRole = (role: string) => {
  const allMenus = [
    // --- CORE ---
    { header: "Utama" },
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard, roles: ['ALL'] },

    // --- FINANCE ---
    { header: "Keuangan" },
    { name: "Verifikasi Pendaftaran", href: "/admin/teams", icon: Receipt, roles: ['FINANCE', 'DIRECTOR'] },
    { name: "Reimbursement & Jurnal", href: "/admin/finance/reimbursement-approval", icon: Wallet, roles: ['FINANCE', 'DIRECTOR'] },
    { name: "Manajemen Tenant", href: "/admin/tenants", icon: Store, roles: ['FINANCE', 'TENANT_RELATIONS', 'BUSINESS'] },

    // --- MATCH CONTROL ---
    { header: "Pertandingan" },
    { name: "Jadwal & Lapangan", href: "/admin/matches", icon: Activity, roles: ['MATCH_COORD', 'REFEREE', 'IT_ADMIN'] },
    { name: "Verifikasi TPF", href: "/admin/tpf", icon: CheckCircle, roles: ['TPF', 'MATCH_COORD', 'DIRECTOR'] },
    { name: "Cek Line-Up (MLO)", href: "/admin/lineups", icon: ClipboardList, roles: ['MLO', 'MATCH_COORD'] },
    { name: "Keputusan Protes", href: "/admin/protests", icon: Gavel, roles: ['REFEREE', 'MATCH_COORD'] },

    // --- OPERATIONS ---
    { header: "Operasional" },
    { name: "Gate Check-in", href: "/admin/gate", icon: QrCode, roles: ['GATE', 'OPERATIONS', 'IT_ADMIN'] },
    { name: "Log Medis", href: "/admin/medical", icon: Stethoscope, roles: ['MEDIC', 'OPERATIONS'] },
    { name: "Logistik Kok", href: "/admin/logistics", icon: Archive, roles: ['OPERATIONS', 'MATCH_COORD'] },
    { name: "Undian Doorprize", href: "/admin/raffle", icon: Gift, roles: ['OPERATIONS', 'DIRECTOR', 'MEDIA'] },

    // --- COMMERCIAL & MEDIA ---
    { header: "Bisnis & Media" },
    { name: "Data Pengunjung", href: "/admin/visitors", icon: Users, roles: ['BUSINESS', 'DIRECTOR'] },
    { name: "Laporan Sponsor", href: "/admin/analytics", icon: BarChart3, roles: ['BUSINESS', 'DIRECTOR'] },
    { name: "Manajemen Media", href: "/admin/media", icon: Video, roles: ['MEDIA'] },

    // --- SECRETARY ---
    { header: "Sekretariat" },
    { name: "Dokumen Legal", href: "/admin/secretary/archive", icon: ShieldAlert, roles: ['SECRETARY', 'DIRECTOR'] },
    { name: "Generator Sertifikat", href: "/admin/secretary/cert-gen", icon: FileText, roles: ['SECRETARY', 'DIRECTOR'] },
    
    // --- SYSTEM ---
    { header: "System" },
    { name: "Pengaturan Global", href: "/admin/settings", icon: Settings, roles: ['DIRECTOR', 'IT_ADMIN'] },
  ];

  return allMenus.filter(m => {
    if (m.header) return true;
    if (!m.roles) return false;
    if (m.roles.includes('ALL')) return true;
    if (role === 'IT_ADMIN') return true;
    return m.roles.includes(role);
  });
};


interface NavLinkProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  isActive: boolean;
  isSheet: boolean;
}

const NavLink = ({ href, children, onClick, isActive, isSheet }: NavLinkProps) => {
  const linkContent = (
    <Link 
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group',
        isActive 
          ? 'bg-primary/10 text-primary font-bold shadow-inner shadow-primary/10' 
          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground font-medium'
      )}
    >
      {!isSheet && <div className={cn('absolute left-0 w-1 h-6 rounded-r-full bg-primary transition-all', isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50')} />}
      {children}
    </Link>
  );
  
  return isSheet ? <SheetClose asChild>{linkContent}</SheetClose> : linkContent;
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const pathname = usePathname();
  
  const [session, setSession] = useState({ isLoggedIn: false, role: 'DIRECTOR', name: 'Admin Super' });

  useEffect(() => {
    const sessionStr = sessionStorage.getItem('admin_session');
    if (sessionStr) {
        const storedSession = JSON.parse(sessionStr);
        setSession(storedSession);
        setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = ADMIN_CODES[pin];
    if (user) {
        const newSession = { isLoggedIn: true, role: user.role, name: user.name };
        setSession(newSession);
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_session', JSON.stringify(newSession));
    } else {
      alert("PIN Salah!");
      setPin("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin('');
    sessionStorage.removeItem('admin_session');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex bg-black text-white overflow-hidden">
        <div className="hidden lg:flex w-[60%] relative flex-col justify-between p-12 bg-zinc-900">
          <div className="absolute inset-0 z-0">
              <Image src="/images/gor-koni.jpg" alt="Court" fill className="object-cover opacity-40 grayscale mix-blend-luminosity"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay"></div>
          </div>
          <div className="relative z-10">
               <div className="flex items-center gap-3 mb-2">
                  <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
                  <span className="font-bold text-xl tracking-widest uppercase text-white/80">BCC 2026</span>
               </div>
          </div>
          <div className="relative z-10 max-w-xl">
              <h1 className="text-6xl font-black font-headline leading-[0.9] mb-6 tracking-tighter">
                  KENDALIKAN<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">TURNAMEN.</span>
              </h1>
              <p className="text-lg text-zinc-400 font-medium leading-relaxed">
                  Dashboard admin terpusat untuk Bandung Community Championship 2026. 
                  Mulai dari skor live, manajemen data, hingga verifikasi pemain.
              </p>
          </div>
          <div className="relative z-10 flex gap-6 text-sm text-zinc-500 font-mono">
              <span>© 2026 BCC Dev Team</span>
              <span>v2.0.1 (Admin Panel)</span>
          </div>
        </div>
        <div className="w-full lg:w-[40%] flex items-center justify-center p-8 relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none" />
           <div className="w-full max-w-md space-y-8 relative z-10">
              <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-black font-headline mb-2">Admin Portal Login</h2>
                  <p className="text-zinc-400">Masukkan PIN unik sesuai divisi Anda.</p>
              </div>
              <div className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">PIN Panitia</Label>
                          <div className="relative">
                              <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                              <Input name="pin" type="password" placeholder="••••" className="pl-10 bg-zinc-900 border-zinc-800 text-white h-12 rounded-lg focus:ring-primary focus:border-primary transition-all placeholder:text-zinc-600 text-center tracking-[0.5em]" value={pin} onChange={(e) => setPin(e.target.value)} required />
                          </div>
                      </div>
                      <Button type="submit" className="w-full h-12 bg-primary text-white font-bold rounded-lg transition-all hover:bg-primary/90">Login</Button>
                  </form>
              </div>
              <p className="text-center text-sm text-zinc-500 pt-6">Akses terbatas hanya untuk panitia dan wasit.</p>
           </div>
        </div>
      </div>
    );
  }
  
  const currentMenus = getMenusByRole(session.role);

  const renderNavLinks = (isSheet: boolean = false) => currentMenus.map((menu, idx) => {
      // Logic to not render a header if no items in its group are visible
      if (menu.header) {
        const nextItem = currentMenus[idx + 1];
        if (!nextItem || nextItem.header) return null; // Don't render if it's the last item or followed by another header
        
        return !isSheet && (
          <div key={idx} className="px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground tracking-wider">
            {menu.header}
          </div>
        );
      }

      const isActive = menu.href ? pathname.startsWith(menu.href) && (menu.href !== '/admin' || pathname === '/admin') : false;
      return (
        <NavLink key={menu.href} href={menu.href!} isActive={isActive} isSheet={isSheet}>
          {menu.icon && <menu.icon className="w-5 h-5" />}
          <span>{menu.name}</span>
        </NavLink>
      )
  });


  return (
    <div className="dark flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col fixed h-full">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <Image src="/images/logo.png" alt="Logo" width={32} height={32} />
          <h1 className="font-headline font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-fuchsia-500">
            BCC ADMIN
          </h1>
        </div>
        <nav className="flex-1 py-2 overflow-y-auto no-scrollbar">
          {renderNavLinks()}
        </nav>
        <div className="p-4 border-t border-border">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10 md:justify-end">
             <div className="md:hidden">
              <Sheet>
                  <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                          <Menu className="w-5 h-5"/>
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-72 bg-card">
                      <div className="p-6 border-b border-border flex items-center gap-3">
                        <Image src="/images/logo.png" alt="Logo" width={32} height={32} />
                        <h1 className="font-headline font-black text-2xl text-primary">BCC ADMIN</h1>
                      </div>
                      <nav className="p-4 space-y-1">
                          {currentMenus.map((menu, idx) => {
                            if(menu.header) {
                               const nextItem = currentMenus[idx + 1];
                               if (!nextItem || nextItem.header) return null;
                               return <Separator key={idx} className="my-2" />;
                            }
                            const isActive = pathname.startsWith(menu.href!) && (menu.href !== '/admin' || pathname === '/admin');
                            return (
                              <SheetClose key={menu.href} asChild>
                                <Link 
                                  href={menu.href!}
                                  className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                                    isActive 
                                      ? 'bg-primary text-primary-foreground font-bold' 
                                      : 'text-muted-foreground hover:bg-secondary'
                                  )}
                                >
                                  {menu.icon && <menu.icon className="w-5 h-5" />}
                                  {menu.name}
                                </Link>
                              </SheetClose>
                            )
                          })}
                      </nav>
                  </SheetContent>
              </Sheet>
             </div>
             
             <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/"><Home className="w-4 h-4" /></Link>
                </Button>
                 <Button variant="ghost" size="icon">
                    <Settings className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-bold text-primary">{session.role.charAt(0)}</span>
                    </div>
                    <div className="text-sm hidden sm:block">
                        <p className="font-bold">{session.name.split('(')[0].trim()}</p>
                        <p className="text-xs text-muted-foreground">{session.role}</p>
                    </div>
                </div>
             </div>
        </header>
        
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
