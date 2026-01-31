'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Trophy, Zap } from 'lucide-react';
import { ClientOnly } from '../client-only';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col pt-24 pb-20 overflow-hidden bg-background">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-grow items-center relative z-10">
        
        {/* LEFT CONTENT */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border text-foreground font-bold text-sm w-fit mx-auto lg:mx-0 mb-6 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Pendaftaran Angkatan 2026 Dibuka!
           </div>

           <h1 className="text-6xl sm:text-7xl md:text-8xl font-black font-headline tracking-tighter leading-[0.9] mb-6 text-foreground">
              FORGING <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">CHAMPIONS.</span>
           </h1>

           <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Akademi bulutangkis dengan kurikulum profesional, fasilitas modern, dan pendekatan sport science untuk mencetak atlet berprestasi.
           </p>

           <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="h-16 px-8 rounded-full text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform bg-primary hover:bg-primary/90">
                 <Link href="/contact">
                    Join Program <ArrowRight className="ml-2 w-5 h-5" />
                 </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-8 rounded-full text-lg font-bold border-2 hover:bg-secondary bg-background text-foreground">
                 <Link href="/about">
                    Tentang Akademi
                 </Link>
              </Button>
           </div>
        </div>

        {/* RIGHT CONTENT - VISUAL CARD */}
        <div className="lg:col-span-5 relative hidden md:block">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-card rounded-[2.5rem] shadow-2xl rotate-3 border overflow-hidden">
                    <Image 
                        src="/images/gor-koni.jpg" 
                        alt="Arena GOR Koni" 
                        fill 
                        className="object-cover opacity-80 hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <div className="flex items-center gap-2 mb-2 text-yellow-400">
                             <Trophy className="w-5 h-5 fill-current" />
                             <span className="font-bold tracking-wider">PROGRAM UNGGULAN</span>
                        </div>
                        <p className="text-4xl font-black font-headline">KELAS INTENSIF U-13 & U-15</p>
                        
                        <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                           <ClientOnly>
                              <div className="text-center">
                                 <p className="text-xs uppercase tracking-widest text-zinc-300 mb-1">Jadwal Seleksi</p>
                                 <p className="text-2xl font-bold font-headline">Setiap Sabtu, 08:00 WIB</p>
                              </div>
                           </ClientOnly>
                        </div>
                    </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground p-4 rounded-3xl shadow-xl animate-float-slow z-20">
                    <Zap className="w-8 h-8 fill-current" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
