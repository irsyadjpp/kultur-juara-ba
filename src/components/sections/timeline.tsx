"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Trophy } from "lucide-react";

export function TimelineSection() {
  const schedule = [
    {
      week: "Week 1",
      date: "13-14 Juni 2026",
      category: "Beregu Putra",
      desc: "Babak Penyisihan - Semifinal",
      icon: <CalendarDays className="w-6 h-6 text-primary" />,
      active: false
    },
    {
      week: "Week 2",
      date: "20-21 Juni 2026",
      category: "Beregu Putri",
      desc: "Babak Penyisihan - Semifinal",
      icon: <CalendarDays className="w-6 h-6 text-primary" />,
      active: false
    },
    {
      week: "Week 3",
      date: "27-28 Juni 2026",
      category: "Beregu Campuran",
      desc: "Babak Penyisihan - Semifinal",
      icon: <CalendarDays className="w-6 h-6 text-primary" />,
      active: false
    },
    {
      week: "Grand Final",
      date: "5 Juli 2026",
      category: "All Categories",
      desc: "Perebutan Juara & WBD Celebration",
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      active: true // Highlight untuk final
    }
  ];

  return (
    <section className="py-16 bg-secondary/10 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-4">
            Jadwal Pertandingan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Turnamen dilaksanakan setiap akhir pekan (Sabtu & Minggu) di GOR KONI Bandung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Garis penghubung (hanya tampil di desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-border -z-10 -translate-y-1/2 rounded-full" />

          {schedule.map((item, index) => (
            <div key={index} className="relative group">
              <Card className={`h-full transition-all duration-300 hover:-translate-y-2 border-2 ${item.active ? 'border-primary shadow-lg shadow-primary/10' : 'border-transparent hover:border-border'}`}>
                <CardHeader className="pb-2 text-center relative">
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${item.active ? 'bg-primary/10' : 'bg-background border border-border'} transition-colors`}>
                    {item.icon}
                  </div>
                  <div className="text-sm font-bold text-primary tracking-widest uppercase">
                    {item.week}
                  </div>
                  <CardTitle className="text-xl font-headline mt-1">
                    {item.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-6">
                  <div className="text-lg font-bold font-mono text-foreground mb-1">
                    {item.date}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
