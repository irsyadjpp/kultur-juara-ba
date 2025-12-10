'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, User, Users, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void; }) => {
  return (
    <Link href={href} onClick={onClick} className="font-medium text-foreground/80 hover:text-primary transition-colors">
      <span className="text-2xl md:text-sm">{children}</span>
    </Link>
  );
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeSheet = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/images/logo.png" alt="Road to BCC 2026 Logo" width={32} height={32} />
                <span className="font-black font-headline text-xl tracking-tighter whitespace-nowrap">Road to BCC 2026</span>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
              <NavLink href="/">Beranda</NavLink>
              <NavLink href="/about">Tentang</NavLink>
              <NavLink href="/live-score">Jadwal</NavLink>
              <NavLink href="/news">Berita</NavLink>
          </nav>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-2">
             <ThemeToggle />
            
            {/* DROPDOWN LOGIN (DESKTOP) */}
            <div className="hidden md:block">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="font-bold px-6">
                            MASUK / DAFTAR
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Pilih Akses Anda</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href="/manager/login" className="flex items-center gap-2 py-2">
                                <Users className="w-4 h-4 text-blue-500"/>
                                <div>
                                    <span className="font-bold block">Manajer Tim</span>
                                    <span className="text-xs text-muted-foreground">Daftarkan Tim & Official</span>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href="/player/login" className="flex items-center gap-2 py-2">
                                <User className="w-4 h-4 text-primary"/>
                                <div>
                                    <span className="font-bold block">Atlet / Pemain</span>
                                    <span className="text-xs text-muted-foreground">Gabung Tim & Cek Profil</span>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* MOBILE MENU */}
            <div className="flex items-center md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6"/>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <div className="flex flex-col h-full py-6">
                    <div className="flex flex-col space-y-4 mb-8">
                        <NavLink href="/" onClick={closeSheet}>Beranda</NavLink>
                        <NavLink href="/live-score" onClick={closeSheet}>Jadwal & Skor</NavLink>
                        <NavLink href="/news" onClick={closeSheet}>Berita</NavLink>
                    </div>
                    
                    <div className="mt-auto space-y-3">
                        <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Area Peserta</div>
                        <Button asChild className="w-full justify-start" variant="outline">
                            <Link href="/manager/login" onClick={closeSheet}>
                                <Users className="mr-2 h-4 w-4"/> Login Manajer
                            </Link>
                        </Button>
                        <Button asChild className="w-full justify-start bg-primary text-white hover:bg-primary/90">
                            <Link href="/player/login" onClick={closeSheet}>
                                <User className="mr-2 h-4 w-4"/> Login Atlet
                            </Link>
                        </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
