
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Trophy, Zap } from 'lucide-react';
import { Countdown } from '@/components/countdown';
import { ClientOnly } from '../client-only';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col pt-24 pb-20 overflow-hidden bg-background">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-grow items-center relative z-10">
        
        {/* LEFT CONTENT */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-foreground font-bold text-sm w-fit mx-auto lg:mx-0 mb-6 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Badmintour Open #1
           </div>

           <h1 className="text-6xl sm:text-7xl md:text-8xl font-black font-headline tracking-tighter leading-[0.9] mb-6 text-foreground">
              SMASH <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">YOUR LIMITS.</span>
           </h1>

           <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Turnamen badminton dengan integrasi digital penuh, dari Live Score hingga Statistik Real-time. Rasakan atmosfer profesional di level komunitas.
           </p>

           <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="h-16 px-8 rounded-full text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform bg-primary text-white hover:bg-primary/90">
                 <Link href="/#register">
                    Daftar Sekarang <ArrowRight className="ml-2 w-5 h-5" />
                 </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-8 rounded-full text-lg font-bold border-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 bg-background text-foreground">
                 <Link href="/schedule">
                    Lihat Jadwal
                 </Link>
              </Button>
           </div>
        </div>

        {/* RIGHT CONTENT - VISUAL CARD */}
        <div className="lg:col-span-5 relative hidden md:block">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-zinc-900 rounded-[2.5rem] shadow-2xl rotate-3 border border-zinc-800 overflow-hidden">
                    <Image 
                        src="/images/gor-koni.jpg" 
                        alt="Arena" 
                        fill 
                        className="object-cover opacity-60 hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <div className="flex items-center gap-2 mb-2 text-yellow-400">
                             <Trophy className="w-5 h-5 fill-current" />
                             <span className="font-bold tracking-wider">TOTAL PRIZE POOL</span>
                        </div>
                        <p className="text-4xl font-black font-headline">RP 5 JUTA</p>
                        
                        <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                           <ClientOnly>
                              <div className="text-center">
                                 <p className="text-xs uppercase tracking-widest text-zinc-300 mb-1">Pendaftaran Ditutup</p>
                                 <Countdown targetDate="2026-04-03" />
                              </div>
                           </ClientOnly>
                        </div>
                    </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-yellow-400 text-black p-4 rounded-3xl shadow-xl animate-float-slow z-20">
                    <Zap className="w-8 h-8 fill-current" />
                </div>
            </div>
        </div>
      </div>
      
      {/* MARQUEE TEXT - FIXED VISIBILITY */}
      <div className="absolute bottom-0 left-0 w-full z-30 bg-yellow-400 text-black py-3 border-y-4 border-black overflow-hidden -rotate-1 scale-105 origin-bottom-left shadow-lg">
         <div className="flex whitespace-nowrap animate-marquee">
            {[1,2,3,4,5,6].map(i => (
                <span key={i} className="text-xl md:text-2xl font-black font-headline mx-8 uppercase tracking-widest flex items-center gap-4">
                   <Zap className="w-6 h-6 fill-black" /> Badmintour Open #1 • LEVEL UP YOUR GAME
                </span>
            ))}
         </div>
      </div>
    </section>
  );
}
