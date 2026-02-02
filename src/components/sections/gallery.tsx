'use client';

import { Camera, Zap, Dumbbell } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    title: "Latihan Fisik",
    desc: "Membangun stamina dan kelincahan.",
    tag: "Physical",
    image: "/images/koni-1.jpg"
  },
  {
    title: "Drill Teknik",
    desc: "Mempertajam pukulan dan gerakan.",
    tag: "Technical",
    image: "/images/koni-2.jpg"
  },
  {
    title: "Game Session",
    desc: "Simulasi pertandingan yang seru.",
    tag: "Sparring",
    image: "/images/koni-3.jpg"
  },
];

export function GallerySection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="bg-primary/10 p-4 rounded-full mb-6">
            <Camera className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-headline uppercase mb-4">
            Suasana <span className="text-primary">Latihan</span>
          </h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl">
            Intip keseruan dan semangat latihan kami sehari-hari di lapangan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.map((item, i) => (
            <div key={i} className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-lg">
              <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform transition-transform duration-300 group-hover:-translate-y-2">
                <Badge className="bg-primary text-black font-bold mb-3 border-none">{item.tag}</Badge>
                <h3 className="text-2xl font-bold font-headline leading-tight mb-1">{item.title}</h3>
                <p className="text-white/80 text-sm font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
