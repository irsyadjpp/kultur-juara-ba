'use client';

import { AnimatedSection } from "@/components/animated-section";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen, Heart, Trophy } from "lucide-react";
import Link from "next/link";

const pillars = [
    {
        icon: Trophy,
        label: "Sport-Tech",
        title: "Platform Manajemen\nAtlet Digital",
        desc: "Sistem terintegrasi untuk pemantauan perkembangan atlet, evaluasi sport science berbasis data, dan pengelolaan program pembinaan secara real-time.",
        href: "/solutions",
        className: "bg-primary text-primary-foreground",
        cardClass: "bg-card border hover:border-primary/50",
    },
    {
        icon: BookOpen,
        label: "Edutech",
        title: "Kurikulum Berbasis\nKarakter",
        desc: "Inovasi teknologi pendidikan yang memadukan nilai-nilai olahraga — disiplin, ketangguhan, dan kerja tim — ke dalam kurikulum pembelajaran modern.",
        href: "/solutions",
        className: "bg-sky-500/10 text-sky-500",
        cardClass: "bg-card border hover:border-sky-500/50",
    },
    {
        icon: Heart,
        label: "Community",
        title: "Ekosistem\nKomunitas Juara",
        desc: "Membangun jaringan alumni, pelatih, orang tua, dan mitra strategis yang saling mendukung untuk menciptakan dampak positif yang berkelanjutan.",
        href: "/about",
        className: "bg-amber-500/10 text-amber-500",
        cardClass: "bg-card border hover:border-amber-500/50",
    },
];

export function EventSummarySection() {
    return (
        <section className="py-24 bg-background relative z-20">
            <div className="container mx-auto px-4">

                <AnimatedSection className="text-center mb-16">
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4">3 Pilar Ekosistem</p>
                    <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter">
                        Satu Visi, Banyak <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Inisiatif.</span>
                    </h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto font-medium">
                        Kami membangun ekosistem terpadu yang menghubungkan dunia olahraga, pendidikan, dan teknologi demi generasi Indonesia yang lebih baik.
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pillars.map((p, i) => (
                        <AnimatedSection key={i} delay={i * 0.1}>
                            <Card className={cn("rounded-[2rem] p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full", p.cardClass)}>
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", p.className)}>
                                    <p.icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{p.label}</p>
                                    <h3 className="text-2xl font-black font-headline whitespace-pre-line leading-tight mb-3">{p.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                                </div>
                                <Link href={p.href} className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all mt-auto">
                                    Pelajari lebih lanjut <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Card>
                        </AnimatedSection>
                    ))}
                </div>

            </div>
        </section>
    );
}
