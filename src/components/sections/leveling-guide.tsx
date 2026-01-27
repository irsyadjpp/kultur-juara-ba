
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Dumbbell, BrainCircuit, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function LevelingGuideSection() {
  const philosophies = [
    {
      title: "Teknik Fundamental",
      description: "Penguasaan grip, footwork, dan body balance sebagai fondasi utama setiap pukulan.",
      icon: Dumbbell,
      color: "border-green-500",
    },
    {
      title: "Kecerdasan Taktis",
      description: "Kemampuan membaca permainan, mengatur tempo, dan mengeksekusi strategi yang efektif.",
      icon: BrainCircuit,
      color: "border-blue-500",
    },
    {
      title: "Kondisi Fisik Prima",
      description: "Program latihan fisik terpadu untuk meningkatkan stamina, kecepatan, dan power.",
      icon: Activity,
      color: "border-orange-500",
    },
  ];

  return (
    <section id="levels" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-headline text-foreground mb-6">
            Filosofi Latihan Kami
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Kami percaya juara sejati dibentuk dari tiga pilar utama: Teknik, Taktik, dan Fisik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {philosophies.map((item, idx) => (
            <Card key={idx} className={cn("border-t-8 shadow-xl hover:-translate-y-2 transition-transform duration-300 rounded-[2rem] overflow-hidden bg-card text-center", item.color)}>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
