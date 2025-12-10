
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Banknote, CalendarClock, MapPin, Swords } from "lucide-react";

// Data untuk Info Cards
const summaryData = [
  {
    icon: CalendarClock,
    title: "Waktu Pelaksanaan",
    description: "Sabtu, 31 Januari 2026 | 08:00 - Selesai",
    color: "text-blue-500",
  },
  {
    icon: MapPin,
    title: "Lokasi Venue",
    description: "GOR Sutta, Bandung",
    color: "text-orange-500",
  },
  {
    icon: Banknote,
    title: "Biaya Pendaftaran",
    description: "Rp 100.000 / Pasang (Incl. Air & Doorprize)",
    color: "text-green-500",
  },
  {
    icon: Swords,
    title: "Format Pertandingan",
    description: "Ganda Perorangan (Sistem Pool - Main 3x!)",
    color: "text-purple-500",
  },
];

export function EventSummarySection() {
  return (
    <section className="bg-background relative z-10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryData.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="bg-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="pt-8 text-center flex flex-col items-center gap-3">
                  <div className={`p-4 bg-primary/10 rounded-full ${item.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold font-headline">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
