'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BookOpen, Dumbbell, Trophy } from "lucide-react";

const portals = [
    {
        title: "Pengelolaan Ekskul Bulu Tangkis",
        desc: "Membangun pondasi dasar bulu tangkis yang terintegrasi di lingkungan sekolah.",
        icon: Trophy,
        color: "text-purple-500 border-purple-500/30 bg-purple-500/10",
        link: "#",
    },
    {
        title: "Kultur Juara Badminton Academy",
        desc: "Pembinaan intensif dengan pendekatan sport science untuk mencetak atlet profesional.",
        icon: Dumbbell,
        color: "text-blue-500 border-blue-500/30 bg-blue-500/10",
        link: "https://academy.kulturjuara.org",
    },
    {
        title: "Manajemen Sekolah Terpadu",
        desc: "Platform end-to-end dari perancangan Capaian Pembelajaran (CP) hingga pencetakan rapor.",
        icon: BookOpen,
        color: "text-green-500 border-green-500/30 bg-green-500/10",
        link: "https://school.kulturjuara.org",
    },
];

export function CategoriesSection() {
    return (
        <section id="ekosistem" className="py-24 bg-background relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-5 pointer-events-none border-x border-dashed border-foreground/20" />

            <div className="container mx-auto px-4 relative z-10">

                <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <Badge variant="outline" className="mb-4 text-primary border-primary/30">Pusat Ekosistem</Badge>
                        <h2 className="text-5xl md:text-6xl font-black font-headline uppercase tracking-tighter mb-4">
                            Jelajahi <span className="text-primary">Ekosistem Kami</span>
                        </h2>
                        <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                            Pilih portal layanan yang terintegrasi sesuai dengan kebutuhan instansi, sekolah, atau komunitas Anda.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {portals.map((portal, idx) => (
                        <a href={portal.link} target="_blank" rel="noreferrer" key={idx} className="block group">
                            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/20 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-300 group-hover:border-primary/50">
                                <CardContent className="p-8 flex flex-col h-full">
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", portal.color)}>
                                        <portal.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold font-headline mb-3 text-foreground group-hover:text-primary transition-colors">{portal.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed flex-grow">{portal.desc}</p>

                                    <div className="mt-6 pt-4 border-t border-border/50 text-sm font-semibold text-primary inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Kunjungi Portal &rarr;
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
