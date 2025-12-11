
'use client';

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { ClientOnly } from "@/components/client-only";

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/20 flex flex-col">
      
      {/* Header Minimalis (Non-Intrusive) */}
      <header className="flex-none h-16 flex items-center justify-between px-4 sm:px-6 z-40 bg-background/80 backdrop-blur-sm border-b border-border/40 sticky top-0">
        
        {/* Left: Home / Back */}
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary" asChild>
                <Link href="/">
                    <Home className="w-5 h-5" />
                    <span className="sr-only">Back to Home</span>
                </Link>
            </Button>
            <span className="font-headline font-bold text-sm tracking-wide hidden sm:block opacity-70">
              PLAYER PORTAL
            </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <ClientOnly>
             <div className="scale-90">
                <ThemeToggle />
             </div>
          </ClientOnly>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
