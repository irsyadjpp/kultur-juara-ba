'use client';

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, User, Dumbbell, 
  UserPlus, CheckSquare, Users,
  Box, Package, Layers, Upload, UserCog,
  LogOut,
  Swords,
  BrainCircuit,
  Brain,
  ClipboardCheck,
  Trophy,
  HeartPulse
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

const data = {
  user: {
    name: "Pelatih Kepala",
    role: "Head Coach",
    avatar: "/avatars/irsyad.jpg",
  },
  navUtama: [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Profil Saya", url: "/admin/profile", icon: User },
  ],
  navAtlet: [
    { title: "Registrasi Atlet Baru", url: "/admin/athletes/register", icon: UserPlus },
    { title: "Roster Atlet", url: "/admin/athletes/roster", icon: Users },
    { title: "Verifikasi Dokumen", url: "/admin/athletes/verification", icon: CheckSquare },
  ],
  navEvaluasi: [
    { title: "Evaluasi Fisik", url: "/admin/evaluations/physical", icon: Dumbbell },
    { title: "Evaluasi Teknik", url: "/admin/evaluations/technical", icon: Swords },
    { title: "Evaluasi Taktik", url: "/admin/evaluations/tactical", icon: BrainCircuit },
    { title: "Evaluasi Mental", url: "/admin/evaluations/mental", icon: Brain },
  ],
  navLatihan: [
    { title: "Daily Training Log", url: "/admin/training/daily-log", icon: ClipboardCheck },
    { title: "Log Pertandingan", url: "/admin/training/match-log", icon: Trophy },
    { title: "Log Nutrisi & Recovery", url: "/admin/training/nutrition-log", icon: HeartPulse },
    { title: "Mental Journal", url: "/admin/training/mental-journal", icon: BrainCircuit },
  ],
  navOperasional: [
    { title: "Inventaris Alat", url: "/admin/logistics/inventory", icon: Box },
    { title: "Stok Shuttlecock", url: "/admin/logistics/shuttlecock", icon: Package },
    { title: "Logistik Habis Pakai", url: "/admin/logistics/consumables", icon: Layers },
  ],
  navAdministrasi: [
    { title: "Reimbursement", url: "/admin/reimbursement/submit", icon: Upload },
    { title: "Manajemen User", url: "/admin/settings/users", icon: UserCog },
  ]
}

export function AppSidebar({ onLogout, ...props }: React.ComponentProps<typeof Sidebar> & { onLogout?: () => void }) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props} className="border-r bg-card">
      
      <SidebarHeader className="h-20 flex justify-center border-b bg-card">
        <div className="flex items-center gap-3 px-2 group-data-[collapsible=icon]:justify-center">
          
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-background border shadow-inner overflow-hidden p-1">
            <Image 
              src="/images/logo.png" 
              alt="Kultur Juara Logo" 
              width={40} 
              height={40} 
              className="w-full h-full object-contain"
            />
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-black font-headline text-lg tracking-tight text-foreground">Kultur Juara PWN</span>
            <span className="truncate text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 space-y-4 bg-background/50 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted">
        
        <NavGroup label="UTAMA" items={data.navUtama} currentPath={pathname} />
        <NavGroup label="MANAJEMEN ATLET" items={data.navAtlet} currentPath={pathname} />
        <NavGroup label="EVALUASI" items={data.navEvaluasi} currentPath={pathname} />
        <NavGroup label="LOG LATIHAN" items={data.navLatihan} currentPath={pathname} />
        <NavGroup label="OPERASIONAL" items={data.navOperasional} currentPath={pathname} />
        <NavGroup label="ADMINISTRASI" items={data.navAdministrasi} currentPath={pathname} />

      </SidebarContent>

      <SidebarFooter className="p-4 bg-card/80 border-t">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <Avatar className="h-10 w-10 rounded-xl border cursor-pointer hover:border-primary transition-colors">
                <AvatarImage src={data.user.avatar} />
                <AvatarFallback className="bg-secondary font-bold text-muted-foreground">KJ</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-bold text-foreground">{data.user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{data.user.role}</span>
            </div>
            <Button onClick={onLogout} size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full group-data-[collapsible=icon]:hidden">
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
      <SidebarGroupLabel className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2 px-3 group-data-[collapsible=icon]:hidden">
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
                    ? "bg-primary text-white shadow-[0_4px_14px_0_hsl(var(--primary)/0.3)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <Link href={item.url} className="flex items-center w-full">
                  <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300",
                      isActive ? "bg-background/20" : "bg-secondary text-muted-foreground group-hover/btn:text-foreground"
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
