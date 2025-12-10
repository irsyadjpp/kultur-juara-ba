
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CourtLines } from "../ui/court-lines";

export function LocationSection() {
  return (
    <section id="venue" className="py-16 bg-background md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <CourtLines />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-0 items-center rounded-2xl overflow-hidden border bg-card shadow-sm">
            {/* Bagian Kiri: Info Teks */}
            <div className="w-full md:w-1/3 p-8">
                <div className="flex items-center gap-2 text-primary mb-4">
                    <MapPin className="w-6 h-6" />
                    <span className="font-bold tracking-wider uppercase">Official Venue</span>
                </div>
                <h2 className="text-3xl font-black font-headline mb-4">GOR Sutta Paberik Badjoe</h2>
                <p className="text-muted-foreground mb-6">
                    Jl. A.H. Nasution No.105, Cicaheum, Kec. Kiaracondong, Kota Bandung, Jawa Barat 40282
                </p>
                <Button variant="outline" asChild className="w-full">
                    <Link href="https://maps.app.goo.gl/9qYd2QGj8rZkHq3f7" target="_blank">
                        Buka di Google Maps
                    </Link>
                </Button>
            </div>

            {/* Bagian Kanan: Map Embed */}
            <div className="w-full md:w-2/3 h-64 md:h-96 bg-muted relative">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.91612489163!2d107.65342467600181!3d-6.900350493098674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7ea6c564d99%3A0x1d5f658f16b251b3!2sSUTA%20PABERIK%20BADJOE!5e0!3m2!1sen!2sid!4v1719543164582!5m2!1sen!2sid"
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
            </div>
        </div>
      </div>
    </section>
  );
}
