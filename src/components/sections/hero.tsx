'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col pt-24 pb-20 overflow-hidden bg-background">

            {/* BACKGROUND BLUR */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-grow items-center relative z-10">

                {/* LEFT CONTENT */}
                <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border text-foreground font-bold text-sm w-fit mx-auto lg:mx-0 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Ekosistem Olahraga & Pendidikan Indonesia
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-headline tracking-tighter leading-[0.95] mb-6 text-foreground">
                        Membangun <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Generasi Juara,</span>
                        <br />
                        dari Lapangan hingga <br className="hidden sm:block" /> Ruang Kelas.
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                        Ekosistem terintegrasi yang memadukan pembinaan karakter berbasis olahraga dan inovasi teknologi pendidikan untuk mencetak talenta masa depan Indonesia.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button asChild size="lg" className="h-14 px-8 rounded-full text-base font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform bg-primary hover:bg-primary/90">
                            <Link href="/solutions">
                                Pelajari Inisiatif Kami <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full text-base font-bold border-2 hover:bg-secondary bg-background text-foreground">
                            <Link href="/contact">
                                Hubungi Kami
                            </Link>
                        </Button>
                    </div>

                    {/* STAT BADGES */}
                    <div className="flex flex-wrap gap-4 mt-10 justify-center lg:justify-start">
                        {[
                            { icon: Trophy, label: "Sport-Tech", desc: "Platform manajemen atlet" },
                            { icon: BookOpen, label: "Edutech", desc: "Kurikulum berbasis karakter" },
                        ].map((stat) => (
                            <div key={stat.label} className="flex items-center gap-3 bg-card border rounded-2xl px-4 py-3">
                                <div className="bg-primary/10 p-2 rounded-xl">
                                    <stat.icon className="w-4 h-4 text-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-black text-foreground">{stat.label}</p>
                                    <p className="text-xs text-muted-foreground">{stat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT CONTENT - VISUAL */}
                <div className="lg:col-span-5 relative hidden md:block">
                    <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
                        <div className="absolute inset-0 bg-card rounded-[2.5rem] shadow-2xl rotate-3 border overflow-hidden">
                            <Image
                                src="/images/gor-koni.jpg"
                                alt="Kultur Juara Indonesia"
                                fill
                                className="object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">KULTUR JUARA INDONESIA</p>
                                <p className="text-3xl font-black font-headline leading-tight">Membentuk Juara Sejati Sejak 2026</p>
                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    {[
                                        { num: "3+", label: "Inisiatif Aktif" },
                                        { num: "100+", label: "Talenta Dibina" },
                                    ].map(s => (
                                        <div key={s.label} className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                                            <p className="text-xl font-black">{s.num}</p>
                                            <p className="text-xs text-white/70">{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground p-4 rounded-3xl shadow-xl z-20 animate-bounce">
                            <Trophy className="w-8 h-8 fill-current" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
