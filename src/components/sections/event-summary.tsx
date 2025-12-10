"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Banknote, CalendarClock, MapPin, Swords, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function EventSummarySection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
             <div>
                <h2 className="text-4xl md:text-5xl font-black font-headline text-foreground uppercase">Event Info</h2>
                <p className="text-muted-foreground mt-2 text-lg">Semua yang perlu kamu tahu sebelum bertanding.</p>
             </div>
             <div className="h-2 w-full md:w-32 bg-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
            
            {/* Waktu - Large Card */}
            <div className="md:col-span-2 bg-secondary rounded-[2rem] p-8 flex flex-col justify-between hover:bg-secondary/80 transition-colors group relative overflow-hidden">
                <div className="absolute right-0 top-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-500">
                    <CalendarClock className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                    <div className="bg-background rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-sm">
                        <CalendarClock className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold font-headline">Sabtu, 31 Januari 2026</h3>
                    <p className="text-muted-foreground font-medium text-lg mt-1">Kick-off pukul 08:00 WIB - Selesai</p>
                </div>
            </div>

            {/* Lokasi */}
            <div className="bg-primary text-primary-foreground rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-multiply" />
                 <div className="relative z-10">
                    <MapPin className="w-10 h-10 mb-4" />
                    <h3 className="text-2xl font-bold font-headline">GOR Sutta</h3>
                    <p className="text-primary-foreground/80 mt-1">Bandung, Jawa Barat</p>
                    <Link href="#venue" className="absolute bottom-8 right-8 bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
                        <ArrowUpRight className="w-6 h-6" />
                    </Link>
                 </div>
            </div>

            {/* Biaya */}
            <div className="bg-secondary rounded-[2rem] p-8 group">
                 <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-green-600">
                    <Banknote className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-bold font-headline">Registration Fee</h3>
                 <p className="text-3xl font-black mt-2">Rp 120k<span className="text-sm font-medium text-muted-foreground">/tim</span></p>
            </div>

            {/* Format - Wide */}
            <div className="md:col-span-2 bg-zinc-900 text-white dark:bg-zinc-800 rounded-[2rem] p-8 flex items-center justify-between relative overflow-hidden">
                 <div className="relative z-10 max-w-md">
                     <div className="flex items-center gap-3 mb-3 text-yellow-400">
                        <Swords className="w-6 h-6" />
                        <span className="font-bold uppercase tracking-wider text-sm">Game Format</span>
                     </div>
                     <h3 className="text-2xl md:text-3xl font-black font-headline">Ganda Perorangan (Sistem Pool)</h3>
                     <p className="text-gray-400 mt-2">Garansi Main 3x! Tidak langsung gugur. Lebih puas, lebih kompetitif.</p>
                 </div>
                 <div className="hidden md:block absolute right-0 bottom-0 opacity-20 translate-x-10 translate-y-10">
                     <Swords className="w-64 h-64" />
                 </div>
            </div>

        </div>
      </div>
    </section>
  );
}