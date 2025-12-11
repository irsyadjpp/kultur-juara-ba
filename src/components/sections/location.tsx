
"use client";

import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LocationSection() {
  return (
    <section id="venue" className="py-12 px-4">
      <div className="container mx-auto">
        <div className="bg-zinc-900 text-white rounded-[3rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            
            {/* CONTENT */}
            <div className="p-8 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-zinc-400 mb-6 font-bold uppercase tracking-widest text-sm">
                    <MapPin className="w-5 h-5 text-primary" /> Official Venue
                </div>
                <h2 className="text-4xl md:text-5xl font-black font-headline mb-6">
                    GOR SUTTA<br/>BANDUNG
                </h2>
                <p className="text-zinc-400 text-lg mb-8 max-w-md leading-relaxed">
                    Lapangan karpet standar internasional dengan pencahayaan pro-grade. Lokasi strategis di Kiaracondong.
                </p>
                
                <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-sm text-zinc-300">
                            Jl. A.H. Nasution No.105, Cicaheum, Kec. Kiaracondong, Kota Bandung
                        </p>
                    </div>
                    <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 w-full sm:w-auto">
                        <Link href="https://maps.app.goo.gl/u9z7ERpEjuQSk5oE6" target="_blank">
                            <Navigation className="w-5 h-5 mr-2" /> Petunjuk Arah
                        </Link>
                    </Button>
                </div>
            </div>

            {/* MAP VISUAL */}
            <div className="relative h-[300px] lg:h-full bg-zinc-800">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.91612489163!2d107.65342467600181!3d-6.900350493098674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7ea6c564d99%3A0x1d5f658f16b251b3!2sSUTA%20PABERIK%20BADJOE!5e0!3m2!1sen!2sid!4v1719543164582!5m2!1sen!2sid"
                    width="100%" 
                    height="100%" 
                    style={{border:0, filter: 'grayscale(1) contrast(1.2) brightness(0.8)'}} 
                    allowFullScreen 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                ></iframe>
                
                {/* Overlay Text on Map */}
                <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                   <p className="text-sm font-bold text-white">📍 Tap to Open Maps</p>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}
