
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, QrCode, User, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Konfigurasi Menu Navigasi
  const navItems = [
    { icon: Home, label: "Home", href: "/players/dashboard" },
    { icon: Calendar, label: "Schedule", href: "/players/schedule" },
    { icon: QrCode, label: "Scan", href: "/players/scan", isFab: true }, // Special Action
    { icon: Bell, label: "Inbox", href: "/players/notifications" },
    { icon: User, label: "Profile", href: "/players/profile" },
  ];

  return (
    <div className="min-h-screen bg-background font-body selection:bg-primary selection:text-white">
      {/* Konten Utama */}
      <main className="pb-24 max-w-md mx-auto min-h-screen bg-background border-x border-border/50 shadow-2xl overflow-hidden relative">
        {children}
      </main>

      {/* FLOATING BOTTOM NAVIGATION (Mobile First) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-50">
        <div className="bg-foreground/90 backdrop-blur-lg text-background rounded-[2rem] p-2 shadow-m3-3 border border-white/10 flex justify-between items-center">
          
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            
            if (item.isFab) {
              return (
                <div key={index} className="-mt-8">
                  <Link href={item.href}>
                    <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40 border-4 border-background hover:scale-105 transition-transform">
                      <item.icon className="text-white h-7 w-7" />
                    </div>
                  </Link>
                </div>
              );
            }

            return (
              <Link key={index} href={item.href} className="flex-1 flex justify-center">
                 <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-primary' : 'text-background/60 hover:text-background'}`}>
                    <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                    {isActive && <span className="text-[10px] font-bold animate-in fade-in zoom-in">{item.label}</span>}
                 </div>
              </Link>
            );
          })}

        </div>
      </div>
    </div>
  );
}
