
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarClock, ArrowRight, FileDown, Users, UserPlus } from 'lucide-react';
import { Countdown } from '@/components/countdown';
import { CourtLines } from '@/components/ui/court-lines';

export function HeroSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <section className="relative bg-black text-white overflow-hidden cursor-crosshair">
      
      {/* BACKGROUND IMAGE & ANIMATION */}
      <div className="absolute inset-0 z-0">
        {/* Latar Belakang Gambar Stadion */}
        <div className="relative h-full w-full animate-zoom-slow">
            <Image
            src="/images/gor-koni.jpg"
            alt="GOR KONI Bandung"
            fill
            priority
            className="object-cover opacity-50" 
            />
        </div>
        
        {/* Overlay Gradasi Hitam */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        
        {/* Animasi Garis Lapangan & Shuttlecock */}
        <CourtLines />

        {/* Efek Partikel/Debu Stadion */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay"></div>
      </div>
      
      <div className="relative z-10 flex min-h-[90vh] items-center pt-20 md:min-h-[75vh] md:pt-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-lg md:text-xl text-primary font-bold mb-2 font-body tracking-widest uppercase animate-fade-in-up">
              Road to BCC 2026
            </p>
            
            {/* Judul Besar */}
            <h1 className="text-5xl md:text-[80px] leading-[0.9] font-black font-headline text-white mb-6 animate-fade-in-up tracking-tighter drop-shadow-2xl">
              Road to BCC 2026: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">The Digital Prologue</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-10 font-body animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.3s' }}>
              Rasakan sensasi turnamen badminton dengan sistem digital terintegrasi pertama. Format Mabar, Atmosfer Juara.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
               
               {/* Tombol Utama: Manajer */}
               <Button asChild size="lg" className="h-14 px-8 text-lg font-bold bg-white text-black hover:bg-zinc-200">
                  <Link href="/manager/login">
                     <Users className="mr-2 h-5 w-5"/> DAFTAR SEKARANG
                  </Link>
               </Button>

               {/* Tombol Sekunder: Atlet */}
               <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                  <Link href="/player/login">
                     <UserPlus className="mr-2 h-5 w-5"/> LOGIN ATLIT
                  </Link>
               </Button>

            </div>
            
            <p className="mt-4 text-sm text-zinc-400 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
               *Atlet wajib membuat akun sendiri untuk bergabung ke dalam Tim.
            </p>
          </div>
        </div>
      </div>
      
      {/* Widget Countdown (Bagian Bawah) */}
      <div className="relative z-20 bg-black/80 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                     <div className="p-3 bg-primary/20 rounded-full animate-pulse-slow">
                        <CalendarClock className="h-8 w-8 text-primary" />
                     </div>
                    <div>
                        <h3 className="font-headline text-sm font-semibold text-gray-400 uppercase tracking-widest">Pendaftaran Ditutup Dalam</h3>
                        <p className="text-white font-bold">1 Januari 2026</p>
                    </div>
                </div>
                {/* Garis Pemisah Visual */}
                <div className="hidden md:block w-px h-12 bg-white/10"></div>
                
                <div className="flex-grow flex justify-center text-white">
                    {isClient && <Countdown targetDate="2026-01-01" />}
                </div>

                <div className="hidden lg:block bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 font-bold px-4 py-2 rounded-xl text-center">
                    Kuota Terbatas: Hanya 32 Pasang!
                </div>
              </div>
        </div>
      </div>
    </section>
  );
}
