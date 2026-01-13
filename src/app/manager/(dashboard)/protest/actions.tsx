
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { ClientOnly } from '@/components/client-only';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Bagan', href: '/bagan' },
    { name: 'Jadwal', href: '/schedule' },
    { name: 'Players', href: '/players' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <div className={cn(
        "flex items-center justify-between px-2 py-2 transition-all duration-300 pointer-events-auto",
        "bg-background/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg",
        isScrolled ? "w-full max-w-5xl rounded-full" : "w-full max-w-7xl rounded-3xl"
      )}>
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 px-4 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110">
                <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <span className={cn("font-headline font-black tracking-tighter uppercase hidden md:block transition-all", isScrolled ? "text-lg" : "text-xl")}>
              BADMINTOUR
            </span>
        </Link>

        {/* DESKTOP NAV - Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-full p-1 mx-4">
            {navItems.map((item) => (
               <Button key={item.name} variant="ghost" className="rounded-full hover:bg-background hover:shadow-sm text-muted-foreground hover:text-foreground font-bold transition-all text-xs" asChild>
                  <Link href={item.href}>{item.name}</Link>
               </Button>
            ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 pr-1">
             <ClientOnly>
               <div className="hidden sm:block">
                  <ThemeToggle />
               </div>
             </ClientOnly>
             
             <Button asChild className="rounded-full font-bold bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/20 px-6 hidden sm:flex">
                <Link href="/admin/login">
                    <User className="w-4 h-4 mr-2"/> Masuk
                </Link>
             </Button>
            
            {/* MOBILE TRIGGER */}
            <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full md:hidden w-10 h-10 border-none bg-secondary">
                    <Menu className="h-5 w-5"/>
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="rounded-b-[2.5rem] pt-16">
                   <div className="flex flex-col gap-4 items-center">
                      {navItems.map(item => (
                         <Link key={item.href} href={item.href} className="text-2xl font-black font-headline uppercase text-muted-foreground data-[active=true]:text-foreground">{item.name}</Link>
                      ))}
                      <div className="flex flex-col w-full gap-3 mt-8">
                         <Button asChild size="lg" className="w-full rounded-full text-lg font-bold bg-primary"><Link href="/admin/login">Login Admin</Link></Button>
                      </div>
                   </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
