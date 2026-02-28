'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ChevronDown, ExternalLink, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ClientOnly } from '../client-only';

const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Solusi', href: '/solutions' },
    { name: 'Studi Kasus', href: '/cases' },
    { name: 'Wawasan', href: '/blog' },
    { name: 'Karir', href: '/careers' },
    { name: 'Kontak', href: '/contact' },
];

const ecosystemLinks = [
    { name: 'Kultur Juara Academy', href: '#', desc: 'Program pembinaan atlet' },
    { name: 'Kultur Juara School', href: '#', desc: 'Pendidikan berbasis karakter' },
    { name: 'Kultur Juara Event', href: '#', desc: 'Kompetisi & turnamen' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isEcoOpen, setIsEcoOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
            <div className={cn(
                "flex items-center justify-between px-2 py-2 transition-all duration-300 pointer-events-auto",
                "bg-background/80 backdrop-blur-xl border shadow-lg",
                isScrolled ? "w-full max-w-5xl rounded-full border-border/50" : "w-full max-w-7xl rounded-3xl border-transparent"
            )}>

                {/* LOGO */}
                <Link href="/" className="flex items-center gap-3 px-4 group">
                    <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110">
                        <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className={cn("font-headline font-black tracking-tighter uppercase hidden md:block transition-all", isScrolled ? "text-base" : "text-lg")}>
                        KULTUR JUARA
                    </span>
                </Link>

                {/* DESKTOP NAV */}
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

                    {/* ECOSYSTEM DROPDOWN */}
                    <div className="relative hidden sm:block" onMouseEnter={() => setIsEcoOpen(true)} onMouseLeave={() => setIsEcoOpen(false)}>
                        <Button className="rounded-full font-bold bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/20 px-5 gap-1.5">
                            Portal Ekosistem
                            <ChevronDown className={cn("w-4 h-4 transition-transform", isEcoOpen && "rotate-180")} />
                        </Button>
                        {isEcoOpen && (
                            <div className="absolute right-0 top-full mt-2 w-64 bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-2">
                                {ecosystemLinks.map((link) => (
                                    <Link key={link.name} href={link.href} className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary transition-colors group">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5">
                                                <p className="font-bold text-sm text-foreground">{link.name}</p>
                                                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-0.5">{link.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* MOBILE TRIGGER */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="rounded-full md:hidden w-10 h-10 border bg-secondary">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="top" className="rounded-b-[2.5rem] pt-16">
                            <div className="flex flex-col gap-4 items-center">
                                {navItems.map(item => (
                                    <Link key={item.href} href={item.href} className="text-2xl font-black font-headline uppercase text-muted-foreground hover:text-foreground transition-colors">{item.name}</Link>
                                ))}
                                <div className="w-full border-t my-2" />
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Portal Ekosistem</p>
                                {ecosystemLinks.map(link => (
                                    <Link key={link.href} href={link.href} className="text-lg font-bold text-muted-foreground hover:text-primary transition-colors">{link.name}</Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
