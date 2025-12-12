
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, Calendar, QrCode, User, Bell, Settings, 
  Menu, LogOut, Trophy, ChevronRight, Users as PlayersIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ClientOnly } from "@/components/client-only";

// Menu Navigasi
const NAV_ITEMS = [
  { icon: Home, label: "Dashboard", href: "/players/dashboard" },
  { icon: PlayersIcon, label: "Participants", href: "/players/participants" },
  { icon: Trophy, label: "Turnamen", href: "/players/tournament/register" },
  { icon: Calendar, label: "Jadwal & Bagan", href: "/players/schedule" },
  { icon: User, label: "Profil & TPF", href: "/players/profile" },
  { icon: Bell, label: "Notifikasi", href: "/players/notifications" },
  { icon: Settings, label: "Pengaturan", href: "/players/settings" },
];

export default function PlayerWebLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Komponen Navigasi (Reusable untuk Sidebar & Mobile Drawer)
  const NavigationContent = () => (
    <div className="flex flex-col h-full py-6 px-4 bg-card border-r border-border">
      {/* BRANDING */}
      <div className="mb-8 px-2 flex items-center gap-3">
        <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white font-headline text-xl shadow-lg shadow-primary/30">
          R
        </div>
        <div>
          <h1 className="font-headline text-lg leading-none">ROAD TO BCC</h1>
          <p className="text-[10px] text-muted-foreground font-medium tracking-widest">PLAYER PANEL</p>
        </div>
      </div>

      {/* MENU ITEMS */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}>
              <div 
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-primary text-white shadow-md shadow-primary/20 font-bold" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon size={20} className={isActive ? "text-white" : "group-hover:text-primary"} />
                <span className="text-sm">{item.label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* USER PROFILE MINI (Bottom Sidebar) */}
      <div className="mt-auto pt-4 border-t border-border">
         <div className="flex items-center gap-3 p-2 rounded-xl bg-secondary/50 mb-3">
            <Avatar className="h-9 w-9 border border-border">
               <AvatarImage src="https://github.com/shadcn.png" />
               <AvatarFallback>IJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
               <p className="text-xs font-bold truncate">Irsyad JPP</p>
               <p className="text-[10px] text-muted-foreground truncate">Athlete</p>
            </div>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive">
               <LogOut size={16} />
            </Button>
         </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground font-body">
      
      {/* 1. DESKTOP SIDEBAR (Hidden on Mobile) */}
      <aside className="hidden lg:block w-72 shrink-0 fixed inset-y-0 z-50">
        <NavigationContent />
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        
        {/* TOP HEADER (Sticky) */}
        <header className="sticky top-0 z-40 w-full h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6">
           <div className="flex items-center gap-4">
              {/* Mobile Menu Trigger */}
              <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72 border-none">
                   <SheetHeader className="sr-only">
                    <SheetTitle>Player Menu</SheetTitle>
                    <SheetDescription>Navigate through your player dashboard and tournament info.</SheetDescription>
                  </SheetHeader>
                  <NavigationContent />
                </SheetContent>
              </Sheet>

              {/* Breadcrumbs / Page Title */}
              <h2 className="font-headline text-lg hidden md:block uppercase tracking-tight text-primary">
                 {NAV_ITEMS.find(n => pathname.startsWith(n.href))?.label || "Dashboard"}
              </h2>
           </div>

           {/* Quick Actions Right */}
           <div className="flex items-center gap-3">
              <Button size="sm" className="hidden sm:flex rounded-pill bg-gradient-sport font-bold shadow-lg shadow-red-500/10">
                 <QrCode className="mr-2 h-4 w-4" /> QR Check-in
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-10 w-10 relative">
                 <Bell size={18} />
                 <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border border-background"></span>
              </Button>
           </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
           <ClientOnly>
             {children}
           </ClientOnly>
        </main>

      </div>
    </div>
  );
}
