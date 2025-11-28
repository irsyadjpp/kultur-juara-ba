"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const NavLink = ({ href, children, onClick, isExternal = false }: { href: string; children: React.ReactNode; onClick?: () => void; isExternal?: boolean }) => {
  const commonProps = {
    onClick: onClick,
    className: "font-medium text-foreground/60 hover:text-primary relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
  };

  const linkContent = <span className="text-sm">{children}</span>;
  const mobileLinkContent = <span className="text-2xl md:text-sm">{children}</span>;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
        <span className="md:hidden">{mobileLinkContent}</span>
        <span className="hidden md:inline">{linkContent}</span>
      </a>
    );
  }

  return (
    <Link href={href} {...commonProps}>
       <span className="md:hidden">{mobileLinkContent}</span>
       <span className="hidden md:inline">{linkContent}</span>
    </Link>
  );
};


export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };
  
  const closeSheetAndScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    handleScroll(e);
    setIsOpen(false);
  };

  const closeSheet = () => setIsOpen(false);

  const navItems = () => (
    <>
      <SheetClose asChild><NavLink href="/" onClick={closeSheet}>Beranda</NavLink></SheetClose>
      <SheetClose asChild><NavLink href="/about" onClick={closeSheet}>Tentang BCC</NavLink></SheetClose>
      <SheetClose asChild><NavLink href="/technical-handbook.pdf" isExternal onClick={closeSheet}>Regulasi</NavLink></SheetClose>
      <SheetClose asChild><NavLink href="/partners" onClick={closeSheet}>Mitra Kami</NavLink></SheetClose>
      <SheetClose asChild><a href="#contact" onClick={closeSheetAndScroll} className="font-medium text-foreground/60 hover:text-primary transition-all duration-300 py-2 rounded-md hover:bg-secondary text-2xl md:text-sm">Kontak</a></SheetClose>
    </>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
            <Link href="/" className="flex items-center gap-2">
            <span className="font-bold font-headline text-xl tracking-tighter">BCC 2026</span>
            </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
           <NavLink href="/">Beranda</NavLink>
           <NavLink href="/about">Tentang BCC</NavLink>
           <NavLink href="/technical-handbook.pdf" isExternal>Regulasi</NavLink>
           <NavLink href="/partners">Mitra Kami</NavLink>
           <a href="#contact" onClick={handleScroll} className="font-medium text-foreground/60 hover:text-primary relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full text-sm">Kontak</a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden md:flex">
             <Link href="https://ayo.co.id/" target="_blank" rel="noopener noreferrer">
              Bagan & Jadwal
            </Link>
          </Button>
           <Button asChild>
            <Link href="https://ayo.co.id/register" target="_blank" rel="noopener noreferrer">
              Daftar Tim
            </Link>
          </Button>
          <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6"/>
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 w-[280px]">
                <div className="flex flex-col items-start justify-center h-full space-y-6 p-6">
                  {navItems()}
                   <div className="flex flex-col gap-4 w-full pt-4 border-t border-border">
                     <Button asChild className="w-full">
                        <Link href="https://ayo.co.id/register" target="_blank" rel="noopener noreferrer">
                          Daftar Tim
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                         <Link href="https://ayo.co.id/" target="_blank" rel="noopener noreferrer">
                          Bagan & Jadwal
                        </Link>
                      </Button>
                   </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
