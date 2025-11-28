"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Dribbble, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const NavLink = ({ href, children, onClick, isExternal = false }: { href: string; children: React.ReactNode; onClick?: () => void; isExternal?: boolean }) => {
  const commonProps = {
    onClick: onClick,
    className: "text-sm font-medium text-foreground/80 hover:text-foreground transition-colors",
  };

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...commonProps}>
      {children}
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

  const navItems = (
    <>
      <NavLink href="/" onClick={() => setIsOpen(false)}>Home</NavLink>
      <NavLink href="https://ayo.co.id/" isExternal>Jadwal</NavLink>
      <a href="#contact" onClick={handleScroll} className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Kontak</a>
    </>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Dribbble className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">BCC 2026</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems}
        </nav>

        <div className="md:hidden">
           <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-6 mt-10">
                {navItems}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
