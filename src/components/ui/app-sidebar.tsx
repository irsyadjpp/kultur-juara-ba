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
  Swords
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

// SIMPLIFIED DATA
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
    { title: "Registrasi Atlet Baru", url: "/admin/participants/register", icon: UserPlus },
    { title: "Daftar Atlet", url: "/admin/participants/teams", icon: Users },
    { title: "Verifikasi Dokumen", url: "/admin/secretariat/verification", icon: CheckSquare },
    { title: "Evaluasi Fisik", url: "/admin/evaluations/physical", icon: Dumbbell },
    { title: "Evaluasi Teknik", url: "/admin/evaluations/technical", icon: Swords },
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
        
        <NavGroup label="UTAMA" items={data.navUtama} currentPath={pathname} />
        <NavGroup label="MANAJEMEN ATLET" items={data.navAtlet} currentPath={pathname} />
        <NavGroup label="OPERASIONAL" items={data.navOperasional} currentPath={pathname} />
        <NavGroup label="ADMINISTRASI" items={data.navAdministrasi} currentPath={pathname} />

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
                    ? "bg-primary text-white shadow-[0_4px_14px_0_hsl(var(--primary)/0.3)]"
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
