'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Trophy, Zap } from 'lucide-react';
import { Countdown } from '@/components/countdown';
import { ClientOnly } from '../client-only';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col pt-24 pb-12 overflow-hidden bg-background">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-grow items-center relative z-10">
        
        {/* LEFT CONTENT */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-accent text-accent-foreground font-bold text-sm w-fit mx-auto lg:mx-0 mb-6 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Road to BCC 2026: Digital Prologue
           </div>

           <h1 className="text-6xl sm:text-7xl md:text-8xl font-black font-headline tracking-tighter leading-[0.9] mb-6">
              SMASH <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">YOUR LIMITS.</span>
           </h1>

           <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Turnamen badminton digital pertama dengan integrasi Live Score & Statistik Real-time. Rasakan atmosfer profesional di level komunitas.
           </p>

           <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="h-16 px-8 rounded-full text-lg font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
                 <Link href="/manager/login">
                    Daftar Sekarang <ArrowRight className="ml-2 w-5 h-5" />
                 </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="h-16 px-8 rounded-full text-lg font-bold hover:bg-secondary/80">
                 <Link href="/live-score">
                    Lihat Jadwal
                 </Link>
              </Button>
           </div>
           
           <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-70 grayscale hover:grayscale-0 transition-all">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Supported By</p>
                {/* Ganti dengan Logo Image jika ada */}
                <span className="font-headline font-black text-xl">VICTOR</span>
                <span className="font-headline font-black text-xl">YONEX</span>
           </div>
        </div>

        {/* RIGHT CONTENT - VISUAL CARD */}
        <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
                {/* Card Container with Material 3 Elevation */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-[2.5rem] shadow-2xl rotate-3 border border-white/10 overflow-hidden">
                    <Image 
                        src="/images/gor-koni.jpg" 
                        alt="Arena" 
                        fill 
                        className="object-cover opacity-80 hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <div className="flex items-center gap-2 mb-2 text-yellow-400">
                             <Trophy className="w-5 h-5 fill-current" />
                             <span className="font-bold tracking-wider">PRIZE POOL</span>
                        </div>
                        <p className="text-4xl font-black font-headline">RP 25 JUTA++</p>
                        
                        <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                           <ClientOnly>
                              <div className="text-center">
                                 <p className="text-xs uppercase tracking-widest text-gray-300 mb-1">Pendaftaran Ditutup</p>
                                 <Countdown targetDate="2026-01-01" />
                              </div>
                           </ClientOnly>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground p-4 rounded-3xl shadow-xl animate-float-slow">
                    <Zap className="w-8 h-8 fill-current" />
                </div>
            </div>
        </div>
      </div>
      
      {/* MARQUEE TEXT */}
      <div className="absolute bottom-0 left-0 w-full bg-primary text-primary-foreground py-3 overflow-hidden rotate-1 scale-105 origin-bottom-left">
         <div className="flex whitespace-nowrap animate-marquee">
            {[1,2,3,4,5].map(i => (
                <span key={i} className="text-2xl font-black font-headline mx-8 uppercase tracking-widest">
                   • ROAD TO BCC 2026 • THE DIGITAL PROLOGUE • LEVEL UP YOUR GAME
                </span>
            ))}
         </div>
      </div>
    </section>
  );
}