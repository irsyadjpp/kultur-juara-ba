
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, UserPlus, Wallet, 
  FileBarChart, Settings, LogOut, Megaphone 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MANAGER_NAV = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/manager/dashboard" },
  { icon: Users, label: "Anggota & TPF", href: "/manager/members" }, // Fitur 2, 4
  // { icon: UserPlus, label: "Pairing & Daftar", href: "/manager/pairing" }, // Fitur 5, 6, 7
  { icon: Wallet, label: "Keuangan", href: "/manager/finance" }, // Fitur 8
  // { icon: Megaphone, label: "Broadcast", href: "/manager/broadcast" }, // Fitur 14
  // { icon: FileBarChart, label: "Laporan", href: "/manager/reports" }, // Fitur 10, 13
  // { icon: Settings, label: "Identitas Klub", href: "/manager/settings" }, // Fitur 3
];

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background text-foreground font-body">
      {/* SIDEBAR */}
      <aside className="w-64 fixed inset-y-0 z-50 bg-card border-r border-border hidden lg:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-sport rounded-xl flex items-center justify-center text-white font-headline shadow-lg">
            M
          </div>
          <div>
             <h1 className="font-headline text-lg leading-none">MANAGER</h1>
             <p className="text-[10px] text-muted-foreground tracking-widest">PANEL</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {MANAGER_NAV.map((item) => {
             const isActive = pathname.startsWith(item.href);
             return (
               <Link key={item.href} href={item.href}>
                 <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                    isActive 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                 }`}>
                    <item.icon size={18} />
                    {item.label}
                 </div>
               </Link>
             )
          })}
        </nav>

        <div className="p-4 border-t border-border">
           <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut size={18} className="mr-2" /> Logout
           </Button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40 px-6 flex items-center justify-between">
           <h2 className="font-headline text-lg text-primary uppercase">
              {MANAGER_NAV.find(n => pathname.startsWith(n.href))?.label || "Dashboard"}
           </h2>
           <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                 <p className="text-sm font-bold">Budi Santoso</p>
                 <p className="text-[10px] text-muted-foreground">PB. Exist Jakarta</p>
              </div>
              <Avatar className="h-9 w-9 border border-border">
                 <AvatarFallback>BS</AvatarFallback>
              </Avatar>
           </div>
        </header>
        <main className="p-6 md:p-8 max-w-[1600px] w-full mx-auto">
           {children}
        </main>
      </div>
    </div>
  );
}
