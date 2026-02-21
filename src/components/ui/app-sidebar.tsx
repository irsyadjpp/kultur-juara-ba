
'use client';

import {
    Brain,
    CheckSquare,
    Crown,
    Dumbbell,
    FileSignature,
    FileText,
    LayoutDashboard,
    LogOut,
    Microscope,
    Swords,
    Target,
    User,
    UserCog,
    UserPlus,
    Users
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const data = {
    user: {
        name: "Administrator",
        role: "Admin Operasional",
        avatar: "/avatars/irsyad.jpg",
    },
    navSuperAdmin: [
        { title: "Superadmin Deck", url: "/superadmin/dashboard", icon: Crown },
    ],
    navUtama: [
        { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
        { title: "Profil Saya", url: "/admin/profile", icon: User },
    ],
    navAkademiPerencanaan: [
        { title: "Masterplan CSR", url: "/admin/planning", icon: Target },
        { title: "Program Builder", url: "/admin/training/program-builder", icon: FileSignature },
    ],
    navAkademiAtlet: [
        { title: "Registrasi Atlet", url: "/admin/athletes/register", icon: UserPlus },
        { title: "Roster Atlet", url: "/admin/athletes/roster", icon: Users },
        { title: "Verifikasi & Onboarding", url: "/admin/athletes/verification", icon: CheckSquare },
    ],
    navAkademiLogEvaluasi: [
        { title: "Evaluasi Fisik", url: "/admin/evaluations/physical", icon: Dumbbell },
        { title: "Evaluasi Teknik", url: "/admin/evaluations/technical", icon: Swords },
        { title: "Evaluasi Taktik", url: "/admin/evaluations/tactical", icon: Brain },
        { title: "Evaluasi Mental", url: "/admin/evaluations/mental", icon: Brain },
        { title: "Sport Science Profiling", url: "/admin/evaluations/sport-science", icon: Microscope },
    ],
    navOperasional: [
        { title: "Log Aktivitas CSR", url: "/admin/reports/monthly", icon: FileText },
    ],
    navSistem: [
        { title: "Manajemen User", url: "/admin/settings/users", icon: UserCog },
    ],
    navParent: [
        { title: "Dashboard", url: "/parents/dashboard", icon: LayoutDashboard },
        { title: "Notifikasi", url: "/notifications", icon: FileText },
    ],
    navAthlete: [
        { title: "Dashboard", url: "/athletes/dashboard", icon: LayoutDashboard },
        { title: "Profil Saya", url: "/athletes/profile", icon: User },
        { title: "Notifikasi", url: "/notifications", icon: FileText },
    ],
}

export function AppSidebar({ onLogout, user, ...props }: React.ComponentProps<typeof Sidebar> & { onLogout?: () => void, user?: any }) {
    const pathname = usePathname();

    // Use passed user data or fallback to default
    const currentUser = user ? {
        name: user.name || "User",
        role: user.role || "Role",
        avatar: user.avatar || "/avatars/01.png",
    } : data.user;

    const role = currentUser.role;

    // Filter Logic
    const getNavItems = () => {
        // SUPER ADMIN gets everything
        if (role === 'SUPER_ADMIN') {
            return {
                superAdmin: data.navSuperAdmin,
                utama: data.navUtama,
                akademi: true,
                perencanaan: data.navAkademiPerencanaan,
                atlet: data.navAkademiAtlet,
                evaluasi: data.navAkademiLogEvaluasi,
                operasional: data.navOperasional,
                sistem: data.navSistem
            }
        }

        // HEAD COACH
        if (role === 'HEAD_COACH') {
            return {
                superAdmin: [],
                utama: data.navUtama,
                akademi: true,
                perencanaan: data.navAkademiPerencanaan,
                atlet: data.navAkademiAtlet.filter(i => i.title === 'Roster Atlet' || i.title === 'Verifikasi Dokumen'),
                evaluasi: data.navAkademiLogEvaluasi,
                operasional: [],
                sistem: []
            }
        }

        // COACH & ASSISTANT
        if (role === 'COACH' || role === 'ASSISTANT_COACH') {
            return {
                superAdmin: [],
                utama: data.navUtama,
                akademi: true,
                perencanaan: data.navAkademiPerencanaan.filter(i => i.title !== 'Masterplan CSR'),
                atlet: data.navAkademiAtlet.filter(i => i.title === 'Roster Atlet'),
                evaluasi: data.navAkademiLogEvaluasi,
                operasional: [],
                sistem: []
            }
        }

        // PARENT
        if (role === 'PARENT') {
            return {
                superAdmin: [],
                utama: data.navParent,
                akademi: true,
                perencanaan: [],
                atlet: [],
                evaluasi: [],
                operasional: [],
                sistem: []
            }
        }

        // ATHLETE
        if (role === 'ATHLETE') {
            return {
                superAdmin: [],
                utama: data.navAthlete,
                akademi: true,
                perencanaan: [],
                atlet: [],
                evaluasi: [],
                operasional: [],
                sistem: []
            }
        }

        // ADMIN (OPERASIONAL) - Default fallback
        return {
            superAdmin: [],
            utama: data.navUtama,
            akademi: true,
            perencanaan: data.navAkademiPerencanaan.filter(i => i.title === 'Masterplan CSR'),
            atlet: data.navAkademiAtlet,
            evaluasi: [],
            operasional: data.navOperasional,
            sistem: data.navSistem
        }
    };

    const nav = getNavItems();

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
                        <span className="truncate font-black font-headline text-lg tracking-tight text-foreground">Kultur Juara</span>
                        <span className="truncate text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{currentUser.role?.replace('_', ' ')} Panel</span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-3 py-4 space-y-4 bg-background/50 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted">

                {nav.superAdmin && nav.superAdmin.length > 0 && (
                    <NavGroup label="SUPER ADMIN" items={nav.superAdmin} currentPath={pathname} />
                )}

                <NavGroup label="UTAMA" items={nav.utama} currentPath={pathname} />

                {(nav.perencanaan?.length > 0 || nav.atlet?.length > 0 || nav.evaluasi?.length > 0) && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2 px-3 group-data-[collapsible=icon]:hidden">AKADEMI</SidebarGroupLabel>
                        {nav.perencanaan && nav.perencanaan.length > 0 && <NavGroup label="Perencanaan" items={nav.perencanaan} currentPath={pathname} subGroup />}
                        {nav.atlet && nav.atlet.length > 0 && <NavGroup label="Manajemen Atlet" items={nav.atlet} currentPath={pathname} subGroup />}
                        {nav.evaluasi && nav.evaluasi.length > 0 && <NavGroup label="Log & Evaluasi" items={nav.evaluasi} currentPath={pathname} subGroup />}
                    </SidebarGroup>
                )}

                {nav.operasional && nav.operasional.length > 0 && (
                    <NavGroup label="OPERASIONAL" items={nav.operasional} currentPath={pathname} />
                )}

                {nav.sistem && nav.sistem.length > 0 && (
                    <NavGroup label="SISTEM" items={nav.sistem} currentPath={pathname} />
                )}

            </SidebarContent>

            <SidebarFooter className="p-4 bg-card/80 border-t">
                <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                    <Avatar className="h-10 w-10 rounded-xl border cursor-pointer hover:border-primary transition-colors">
                        <AvatarImage src={currentUser.avatar} />
                        <AvatarFallback className="bg-secondary font-bold text-muted-foreground">KJ</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                        <span className="truncate font-bold text-foreground">{currentUser.name}</span>
                        <span className="truncate text-xs text-muted-foreground">{currentUser.role}</span>
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

function NavGroup({ label, items, currentPath, subGroup }: { label: string, items: any[], currentPath: string, subGroup?: boolean }) {
    const groupLabel = (
        <SidebarGroupLabel className={cn("text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2 px-3", subGroup ? "group-data-[collapsible=icon]:hidden" : "group-data-[collapsible=icon]:text-center group-data-[collapsible=icon]:p-0")}>
            {label}
        </SidebarGroupLabel>
    );

    return (
        <SidebarGroup>
            {subGroup ? (
                <div className="group-data-[collapsible=icon]:hidden pl-3 pb-2 pt-1 border-l ml-3 border-dashed">
                    <span className="text-xs font-bold text-muted-foreground">{label}</span>
                </div>
            ) : groupLabel}
            <SidebarMenu className={cn("space-y-1", subGroup && "border-l ml-3 pl-3 border-dashed")}>
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
