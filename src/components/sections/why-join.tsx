
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Trophy, ShieldCheck, Gamepad2, BrainCircuit, Dumbbell, Award } from "lucide-react";

export function WhyJoinSection() {
  const points = [
    {
      icon: Award,
      title: "Pelatih Berlisensi",
      desc: "Dibimbing oleh pelatih profesional dengan sertifikasi PBSI untuk memastikan teknik dan strategi Anda berkembang pesat.",
      bg: "bg-blue-500 text-white",
    },
    {
      icon: BrainCircuit,
      title: "Kurikulum Modern",
      desc: "Program latihan terstruktur yang menggabungkan sport science dengan metode pelatihan terkini untuk hasil maksimal.",
      bg: "bg-yellow-400 text-black",
    },
    {
      icon: Dumbbell,
      title: "Fasilitas Standar",
      desc: "Berlatih di GOR dengan lapangan karpet standar internasional, pencahayaan optimal, dan fasilitas pendukung yang lengkap.",
      bg: "bg-primary text-black",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30 rounded-t-[3rem] -mt-10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-headline mb-6 uppercase">
            Why Train at <span className="text-primary">Kultur Juara?</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            Kami bukan sekadar tempat latihan. Kami adalah ekosistem untuk mencetak juara.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {points.map((item, idx) => (
            <Card key={idx} className="group relative border-none overflow-hidden rounded-[2.5rem] bg-background shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className={`h-3 ${item.bg.split(' ')[0]} w-full`} />
              <CardContent className="p-8 pt-12 relative">
                 <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition-transform`}>
                    <item.icon className="w-8 h-8" />
                 </div>
                 <h3 className="text-2xl font-bold font-headline mb-4">{item.title}</h3>
                 <p className="text-muted-foreground leading-relaxed text-lg">
                    {item.desc}
                 </p>
                 <div className="absolute bottom-0 right-0 p-8 opacity-5">
                    <item.icon className="w-32 h-32" />
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
