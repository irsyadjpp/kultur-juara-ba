'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const programs = [
  {
    level: "U9 & U11",
    title: "Kelompok Prioritas (U9 & U11)",
    desc: "Pembinaan dasar yang fokus pada teknik fundamental, koordinasi, dan menanamkan kecintaan pada olahraga sejak dini.",
    icon: User,
    color: "text-green-500 border-green-500/30 bg-green-500/10",
  },
  {
    level: "U-13",
    title: "Kelompok Seleksi (U-13)",
    desc: "Program evaluasi khusus bagi atlet dengan potensi tinggi untuk masuk ke jenjang pembinaan prestasi yang lebih intensif.",
    icon: Users,
    color: "text-blue-500 border-blue-500/30 bg-blue-500/10",
  },
  {
    level: "Prestasi",
    title: "Tim Prestasi (Elite)",
    desc: "Latihan intensif dengan sport science, taktik pertandingan, dan pembinaan mental untuk mencetak juara.",
    icon: Trophy,
    color: "text-purple-500 border-purple-500/30 bg-purple-500/10",
  },
];

export function CategoriesSection() {
  return (
    <section id="programs" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-5 pointer-events-none border-x border-dashed border-foreground/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
                <Badge variant="outline" className="mb-4 text-primary border-primary/30">Our Programs</Badge>
                <h2 className="text-5xl md:text-6xl font-black font-headline uppercase tracking-tighter mb-4">
                    Program <span className="text-primary">Latihan</span>
                </h2>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                    Kurikulum terstruktur untuk setiap jenjang, dari usia dini hingga jenjang prestasi.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program, idx) => (
            <Card key={idx} className="bg-card/50 backdrop-blur-sm border-border/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", program.color)}>
                  <program.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-headline mb-3 text-foreground">{program.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{program.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
