"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Dribbble, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const NavLink = ({ href, children, onClick, isExternal = false }: { href: string; children: React.ReactNode; onClick?: () => void; isExternal?: boolean }) => {
  const commonProps = {
    onClick: onClick,
    className: "font-medium text-foreground/80 hover:text-primary transition-all duration-300 px-4 py-2 rounded-full hover:bg-secondary",
  };

  const linkContent = <span className="text-2xl md:text-sm">{children}</span>;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
        {linkContent}
      </a>
    );
  }

  return (
    <Link href={href} {...commonProps}>
      {linkContent}
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


  const navItems = (closeSheet: () => void) => (
    <>
      <SheetClose asChild>
        <NavLink href="/" onClick={closeSheet}>Home</NavLink>
      </SheetClose>
      <SheetClose asChild>
        <NavLink href="https://ayo.co.id/" isExternal onClick={closeSheet}>Jadwal</NavLink>
      </SheetClose>
      <SheetClose asChild>
         <a href="#contact" onClick={closeSheetAndScroll} className="font-medium text-foreground/80 hover:text-primary transition-all duration-300 px-4 py-2 rounded-full hover:bg-secondary text-2xl md:text-sm">Kontak</a>
      </SheetClose>
    </>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-2">
            <Dribbble className="h-7 w-7 text-primary animate-pulse" />
            <span className="font-bold font-headline text-xl tracking-tighter">BCC 2026</span>
            </Link>
        </div>

        <nav className="hidden md:flex flex-1 justify-center items-center gap-2">
           <NavLink href="/" onClick={() => setIsOpen(false)}>Home</NavLink>
           <NavLink href="https://ayo.co.id/" isExternal onClick={() => setIsOpen(false)}>Jadwal</NavLink>
           <a href="#contact" onClick={handleScroll} className="font-medium text-foreground/80 hover:text-primary transition-all duration-300 px-4 py-2 rounded-full hover:bg-secondary text-sm">Kontak</a>
        </nav>

        <div className="flex-1 flex justify-end md:hidden">
           <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6"/>
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95">
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                {navItems(() => setIsOpen(false))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
