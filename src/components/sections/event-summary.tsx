
'use client';

import { Card } from "@/components/ui/card";
import { Banknote, CalendarClock, MapPin, Swords, Zap, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function EventSummarySection() {
  return (
    <section className="py-20 bg-background relative z-20 -mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* TITLE CARD */}
          <div className="md:col-span-4 bg-primary text-primary-foreground rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
             <div className="absolute -right-10 -top-10 bg-black/10 w-64 h-64 rounded-full blur-3xl pointer-events-none" />
             <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
                   <Info className="w-3 h-3" /> Kultur Juara Academy
                </div>
                <h2 className="text-5xl font-black font-headline leading-[0.9]">
                   PROGRAM<br/>& BIAYA.
                </h2>
             </div>
             <p className="font-medium text-primary-foreground/90 mt-4">
                Informasi dasar mengenai jadwal latihan, lokasi, program, dan biaya bulanan di akademi kami.
             </p>
          </div>

          {/* FEES - UPDATED */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-1 gap-4">
              <Card className="bg-card border-border rounded-[2.5rem] p-8 flex flex-col justify-center gap-2 relative overflow-hidden group">
                  <div className="absolute right-0 top-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-500 text-muted-foreground">
                      <Zap className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                      <div className="flex items-center gap-3 text-muted-foreground mb-2">
                          <Banknote className="w-6 h-6 text-primary" />
                          <span className="font-bold uppercase tracking-wider text-sm">Biaya Bulanan</span>
                      </div>
                      <p className="text-4xl font-black font-headline text-accent">
                        IDR 200K <span className="text-lg text-muted-foreground font-medium">/atlet</span>
                      </p>
                       <p className="text-sm text-muted-foreground mt-1 bg-secondary w-fit px-3 py-1 rounded-full">
                         Termasuk 8x Sesi Latihan & Shuttlecock
                      </p>
                  </div>
              </Card>
          </div>

          {/* DATE & TIME */}
          <div className="md:col-span-5 bg-secondary rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[250px] relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-full h-full bg-grid-black/[0.05] dark:bg-grid-white/[0.05] pointer-events-none" />
               <div className="bg-background w-12 h-12 rounded-full flex items-center justify-center shadow-sm z-10">
                  <CalendarClock className="w-6 h-6 text-primary" />
               </div>
               <div className="z-10 mt-auto">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div>
                            <h4 className="text-lg font-bold">Senin & Rabu</h4>
                            <p className="text-sm text-muted-foreground">15:00 - 19:00 WIB</p>
                        </div>
                         <div>
                            <h4 className="text-lg font-bold">Jumat</h4>
                            <p className="text-sm text-muted-foreground">13:00 - 17:00 WIB</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold">Sabtu</h4>
                            <p className="text-sm text-muted-foreground">08:00 - 12:00 WIB</p>
                        </div>
                    </div>
               </div>
          </div>

          {/* LOCATION & FORMAT */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-background border rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-primary/50 transition-colors">
                  <MapPin className="w-8 h-8 text-primary mb-4" />
                  <div>
                      <h4 className="text-xl font-bold font-headline">GOR Sutta</h4>
                      <p className="text-muted-foreground">Bandung, Jawa Barat</p>
                  </div>
              </div>
              <div className="bg-background border rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-primary/50 transition-colors">
                  <Swords className="w-8 h-8 text-primary mb-4" />
                  <div>
                      <h4 className="text-xl font-bold font-headline">Fokus Program</h4>
                      <p className="text-muted-foreground">Teknik, Fisik, & Taktik Pertandingan</p>
                  </div>
              </div>
          </div>

        </div>
      </div>
    </section>
  );
}
