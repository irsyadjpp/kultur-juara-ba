
'use client';

import { Trophy, Star, Award } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const achievements = [
  {
    event: "Kejurda Jabar 2025",
    winner: "Andi Pratama",
    category: "Juara 1 - Tunggal Putra U-17",
    image: "https://images.unsplash.com/photo-1521575107034-e0fa0b594529?q=80&w=2068&auto=format&fit=crop"
  },
  {
    event: "Sirnas A Bandung 2025",
    winner: "Siti & Bunga",
    category: "Juara 1 - Ganda Putri U-15",
    image: "https://images.unsplash.com/photo-1612872087720-bb8f6e21a4f9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    event: "Piala Gubernur 2024",
    winner: "Kevin Junior",
    category: "Juara 2 - Tunggal Putra U-13",
    image: "https://images.unsplash.com/photo-1626252346592-7480a373456e?q=80&w=2070&auto=format&fit=crop"
  },
];

export function PrizesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-full mb-6">
                <Award className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-headline uppercase mb-4">
                Galeri Prestasi
            </h2>
            <p className="text-xl text-muted-foreground font-medium">
                Beberapa pencapaian gemilang dari para atlet didikan Kultur Juara Academy.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((item, i) => (
                <div key={i} className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-lg">
                    <Image src={item.image} alt={item.winner} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <Badge className="bg-primary text-black font-bold mb-2">{item.event}</Badge>
                        <h3 className="text-2xl font-bold font-headline leading-tight">{item.winner}</h3>
                        <p className="text-sm opacity-80">{item.category}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
