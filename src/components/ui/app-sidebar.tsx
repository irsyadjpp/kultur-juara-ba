
'use client';

import * as React from "react"
import Link from "next/link"
import Image from "next/image" // Import Image dari Next.js
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, User, Briefcase, CalendarRange, 
  Activity, Users, Network, CheckSquare, 
  PieChart, FileCheck, Stamp, Receipt, Store, Wallet, Coins, 
  Trophy, CalendarDays, FileText, ShieldAlert, Mic2, LifeBuoy, ClipboardList, Gavel, MonitorPlay, ClipboardCheck, 
  QrCode, Stethoscope, Package, Box, Database, Utensils, Gift, Upload, Layers, 
  Timer, Navigation,
  BarChart3, Megaphone,
  Mail, FileSignature, Award, 
  Tags, UserCog, Handshake, Newspaper, Settings, ChevronRight, LogOut, ShieldCheck as UserCheck, Dumbbell, UserPlus
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// --- DATA MENU LENGKAP ---
const data = {
  user: {
    name: "Pelatih Kepala",
    role: "Head Coach",
    avatar: "/avatars/irsyad.jpg",
  },
  // 1. MAIN
  navMain: [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Profil Akademi", url: "/admin/profile", icon: User },
    { title: "Program Latihan", url: "/admin/planning", icon: CalendarRange },
  ],
  // 2. MANAJEMEN
  navManajemen: [
    { title: "Monitoring Latihan", url: "/admin/director/monitor", icon: Activity },
    { title: "Database Pelatih", url: "/admin/director/roster", icon: Users },
    { title: "Struktur Organisasi", url: "/admin/director/committee", icon: Network },
  ],
  // 3. KEUANGAN
  navFinance: [
    { title: "Dashboard Keuangan", url: "/admin/finance", icon: PieChart },
    { title: "Manajemen SPP", url: "/admin/finance/invoices", icon: Receipt },
    { title: "Approval Pengeluaran", url: "/admin/finance/reimbursement-approval", icon: Stamp },
    { title: "Honorarium Pelatih", url: "/admin/finance/honorarium", icon: Wallet },
    { title: "Kas Kecil", url: "/admin/finance/petty-cash", icon: Coins },
  ],
  // 4. LATIHAN
  navLatihan: [
    { title: "Jadwal Latihan", url: "/admin/match-control/schedule", icon: CalendarDays },
    { title: "Evaluasi Fisik", url: "/admin/evaluations/physical", icon: Dumbbell },
    { title: "Hasil Pertandingan", url: "/admin/match-control/results", icon: FileText },
    { title: "Absensi Atlet", url: "/admin/gate", icon: QrCode },
  ],
  // 5. OPERASIONAL
  navOperasional: [
    { title: "Inventaris Alat", url: "/admin/logistics/inventory", icon: Box },
    { title: "Manajemen Shuttlecock", url: "/admin/logistics/shuttlecock", icon: Package },
  ],
  // 6. ADMINISTRASI
  navSecretariat: [
    { title: "Verifikasi Pendaftaran", url: "/admin/secretariat/verification", icon: UserCheck },
    { title: "Surat-menyurat", url: "/admin/secretary/correspondence", icon: Mail },
    { title: "Generator Sertifikat", url: "/admin/event/certificates", icon: Award },
  ],
}

export function AppSidebar({ onLogout, ...props }: React.ComponentProps<typeof Sidebar> & { onLogout?: () => void }) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props} className="border-r-0 bg-black">
      
      <SidebarHeader className="h-20 flex justify-center border-b border-white/5 bg-zinc-950/50">
        <div className="flex items-center gap-3 px-2 group-data-[collapsible=icon]:justify-center">
          
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-black/50 border border-white/10 shadow-[0_0_20px_hsl(var(--primary)/0.4)] overflow-hidden p-1">
            <Image 
              src="/images/logo.png" 
              alt="Kultur Juara Logo" 
              width={40} 
              height={40} 
              className="w-full h-full object-contain"
            />
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-black font-headline text-lg tracking-tight text-white">Kultur Juara</span>
            <span className="truncate text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 space-y-4 bg-zinc-950/50 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
        
        <NavGroup label="UTAMA" items={data.navMain} currentPath={pathname} />
        <NavGroup label="MANAJEMEN" items={data.navManajemen} currentPath={pathname} />
        <NavGroup label="KEUANGAN" items={data.navFinance} currentPath={pathname} />
        <NavGroup label="ATLET & LATIHAN" items={data.navLatihan} currentPath={pathname} />
        <NavGroup label="OPERASIONAL" items={data.navOperasional} currentPath={pathname} />
        <NavGroup label="ADMINISTRASI" items={data.navSecretariat} currentPath={pathname} />

      </SidebarContent>

      <SidebarFooter className="p-4 bg-zinc-950/80 border-t border-white/5">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <Avatar className="h-10 w-10 rounded-xl border-2 border-zinc-800 cursor-pointer hover:border-primary transition-colors">
                <AvatarImage src={data.user.avatar} />
                <AvatarFallback className="bg-zinc-900 font-bold text-zinc-400">KJ</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-bold text-white">{data.user.name}</span>
                <span className="truncate text-xs text-zinc-500">{data.user.role}</span>
            </div>
            <Button onClick={onLogout} size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-full group-data-[collapsible=icon]:hidden">
                <LogOut className="h-4 w-4" />
            </Button>
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}

function NavGroup({ label, items, currentPath }: { label: string, items: any[], currentPath:string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-2 px-3 group-data-[collapsible=icon]:hidden">
        {label}
      </SidebarGroupLabel>
      <SidebarMenu className="space-y-1">
        {items.map((item) => {
          const isActive = currentPath.startsWith(item.url);
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={cn(
                  "h-12 rounded-full px-3 justify-start transition-all duration-300 font-bold text-sm group/btn",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[0_4px_14px_0_hsl(var(--primary)/0.3)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Link href={item.url} className="flex items-center w-full">
                  <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300",
                      isActive ? "bg-black/20" : "bg-zinc-800 text-zinc-400 group-hover/btn:text-white"
                  )}>
                    <item.icon className="size-5" />
                  </div>
                  <span className="flex-1 truncate group-data-[collapsible=icon]:hidden">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
