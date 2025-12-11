
'use client';

import { useState } from 'react';
import { 
  Trophy, Swords, Dumbbell, ShieldAlert, CheckCircle2, Scale, 
  BookOpen, Target, Users, AlertTriangle, XCircle 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CourtLines } from '@/components/ui/court-lines';
import { cn } from "@/lib/utils";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function LevelingGuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 relative overflow-hidden">
        
        {/* Background FX */}
        <div className="fixed inset-0 pointer-events-none opacity-5"><CourtLines /></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

        {/* --- HERO SECTION --- */}
        <div className="container mx-auto px-4 mb-12 relative z-10 text-center">
           <Badge variant="outline" className="mb-4 px-4 py-1 border-primary text-primary font-bold tracking-widest uppercase bg-primary/5">
              Official Rulebook v2.0
           </Badge>
           <h1 className="text-4xl md:text-6xl font-black font-headline uppercase tracking-tighter mb-4 text-foreground">
              Matrix <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Level & Tier</span>
           </h1>
           <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
              Regulasi resmi pembagian kategori pertandingan berdasarkan kombinasi <strong>Level (Beginner/Int/Adv)</strong> dan <strong>Tier (Bawah/Menengah/Atas)</strong> untuk kompetisi yang adil dan seimbang.
           </p>
        </div>

        <div className="container mx-auto px-4 space-y-16 relative z-10">
            
            {/* 1. DEFINISI & TUJUAN */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-surface-variant/30 border border-white/10 rounded-[2rem] p-6">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-3 text-xl font-bold">
                            <Target className="w-6 h-6 text-primary" /> Tujuan Regulasi
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-4">
                        <li className="flex gap-3 text-sm font-medium opacity-80">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                            Menjamin pertandingan adil & seimbang (No Mismatch).
                        </li>
                        <li className="flex gap-3 text-sm font-medium opacity-80">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                            Menghindari pertemuan Beginner Bawah vs Beginner Atas di fase grup.
                        </li>
                        <li className="flex gap-3 text-sm font-medium opacity-80">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                            Struktur seeding yang konsisten & objektif berbasis data TPF.
                        </li>
                    </CardContent>
                </Card>

                <Card className="bg-surface-variant/30 border border-white/10 rounded-[2rem] p-6">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-3 text-xl font-bold">
                            <BookOpen className="w-6 h-6 text-blue-500" /> Definisi Kunci
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 pt-4">
                        <div className="flex gap-3">
                            <Badge variant="outline" className="h-fit">Level</Badge>
                            <p className="text-sm text-muted-foreground">Kategori besar peserta (Beginner, Intermediate, Advance).</p>
                        </div>
                        <div className="flex gap-3">
                            <Badge variant="outline" className="h-fit border-blue-500 text-blue-500">Tier</Badge>
                            <p className="text-sm text-muted-foreground">Klasifikasi kekuatan detail dalam level yang sama (Bawah, Menengah, Atas).</p>
                        </div>
                        <div className="flex gap-3">
                            <Badge variant="outline" className="h-fit border-yellow-500 text-yellow-500">TPF</Badge>
                            <p className="text-sm text-muted-foreground">Tim Penilai Federatif yang memverifikasi skill & tier pemain.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 2. MATRIX DETAIL (TABS) */}
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-black font-headline uppercase mb-2">Matrix Kategori Final</h2>
                    <p className="text-muted-foreground">Klasifikasi detail berdasarkan kombinasi Tier Pemain.</p>
                </div>

                <Tabs defaultValue="beginner" className="w-full">
                    <div className="flex justify-center mb-8">
                        <TabsList className="bg-secondary/50 p-1 rounded-full border border-white/10">
                            <TabsTrigger value="beginner" className="rounded-full px-6 py-2 font-bold data-[state=active]:bg-green-500 data-[state=active]:text-white">Beginner</TabsTrigger>
                            <TabsTrigger value="intermediate" className="rounded-full px-6 py-2 font-bold data-[state=active]:bg-blue-500 data-[state=active]:text-white">Intermediate</TabsTrigger>
                            <TabsTrigger value="advance" className="rounded-full px-6 py-2 font-bold data-[state=active]:bg-purple-500 data-[state=active]:text-white">Advance</TabsTrigger>
                        </TabsList>
                    </div>

                    {/* BEGINNER TAB */}
                    <TabsContent value="beginner">
                        <MatrixTable 
                            theme="green"
                            title="Kategori Beginner"
                            desc="Pasangan Beginner dibagi menjadi Low, Mid, dan High untuk fase grup yang seimbang."
                            data={[
                                { p1: "Bawah", p2: "Bawah", res: "Beginner - Low" },
                                { p1: "Bawah", p2: "Menengah", res: "Beginner - Low" },
                                { p1: "Menengah", p2: "Menengah", res: "Beginner - Mid" },
                                { p1: "Bawah", p2: "Atas", res: "Beginner - Mid" },
                                { p1: "Menengah", p2: "Atas", res: "Beginner - High" },
                                { p1: "Atas", p2: "Atas", res: "Beginner - High (Unggulan)", highlight: true },
                            ]}
                        />
                    </TabsContent>

                    {/* INTERMEDIATE TAB */}
                    <TabsContent value="intermediate">
                        <MatrixTable 
                            theme="blue"
                            title="Kategori Intermediate"
                            desc="Kombinasi Beginner Atas & Intermediate."
                            data={[
                                { p1: "Beg (Atas)", p2: "Int (Bawah)", res: "Intermediate - Low" },
                                { p1: "Int (Bawah)", p2: "Int (Bawah)", res: "Intermediate - Low" },
                                { p1: "Int (Bawah)", p2: "Int (Menengah)", res: "Intermediate - Mid" },
                                { p1: "Int (Menengah)", p2: "Int (Menengah)", res: "Intermediate - Mid" },
                                { p1: "Int (Menengah)", p2: "Int (Atas)", res: "Intermediate - High" },
                                { p1: "Int (Atas)", p2: "Int (Atas)", res: "Intermediate - High (Unggulan)", highlight: true },
                            ]}
                        />
                    </TabsContent>

                    {/* ADVANCE TAB */}
                    <TabsContent value="advance">
                        <MatrixTable 
                            theme="purple"
                            title="Kategori Advance"
                            desc="Level tertinggi. Kombinasi Intermediate Atas & Advance."
                            data={[
                                { p1: "Int (Bawah)", p2: "Adv (Bawah)", res: "Advance - Low" },
                                { p1: "Adv (Bawah)", p2: "Adv (Bawah)", res: "Advance - Low" },
                                { p1: "Int (Menengah)", p2: "Adv (Bawah)", res: "Advance - Mid" },
                                { p1: "Adv (Menengah)", p2: "Adv (Menengah)", res: "Advance - Mid" },
                                { p1: "Int (Atas)", p2: "Adv (Atas)", res: "Advance - High" },
                                { p1: "Adv (Atas)", p2: "Adv (Atas)", res: "Advance - High (Unggulan)", highlight: true },
                            ]}
                        />
                    </TabsContent>
                </Tabs>

                {/* FORBIDDEN COMBO */}
                <div className="mt-8 p-6 bg-red-950/30 border border-red-500/30 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <div className="bg-red-500/20 p-4 rounded-full text-red-500 animate-pulse">
                        <XCircle className="w-10 h-10" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-red-500 uppercase tracking-widest mb-1">DILARANG KERAS</h4>
                        <p className="text-red-200 font-bold text-lg mb-1">Beginner (Semua Tier) + Advance (Semua Tier)</p>
                        <p className="text-sm text-red-300/80">
                            Gap kemampuan terlalu besar. Berisiko membahayakan pemain Beginner dan merusak keseimbangan kompetisi.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. PENERAPAN DI TURNAMEN */}
            <div className="bg-zinc-900 text-zinc-100 rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="text-center mb-10 relative z-10">
                    <h2 className="text-3xl font-black font-headline uppercase mb-4">Penerapan di Lapangan</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Bagaimana Matrix ini mempengaruhi pembagian grup dan penentuan juara?
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {/* Grouping Rule */}
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-primary/20 p-3 rounded-xl text-primary"><Users className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold">1. Pembagian Grup (Tier-Based)</h3>
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                            Pemain <strong>HANYA</strong> akan ditempatkan di grup yang tier-nya selevel. Tidak ada "Grup Neraka" di mana Low bertemu High di awal.
                        </p>
                        <div className="space-y-2 text-xs font-mono bg-black/40 p-4 rounded-xl border border-white/5">
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span>Grup A</span>
                                <span className="text-green-400">Beginner Low vs Beginner Low</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span>Grup C</span>
                                <span className="text-yellow-400">Beginner Mid vs Beginner Mid</span>
                            </div>
                            <div className="flex justify-between pt-1">
                                <span>Grup E</span>
                                <span className="text-red-400">Beginner High vs Beginner High</span>
                            </div>
                        </div>
                    </div>

                    {/* Seeding Rule */}
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-yellow-500/20 p-3 rounded-xl text-yellow-500"><Trophy className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold">2. Penentuan Seeding</h3>
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                            Status <strong>Unggulan (Seed)</strong> hanya diberikan kepada pasangan dalam <strong>Tier Atas</strong> di masing-masing level.
                        </p>
                        <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                            <p className="text-xs text-zinc-500 font-bold uppercase mb-2">Prioritas Penentuan Seed:</p>
                            <ol className="list-decimal pl-4 space-y-1 text-xs text-zinc-300">
                                <li>Total Skor Utama TPF</li>
                                <li>Skor Performa Tambahan</li>
                                <li>Head-to-Head (Jika ada)</li>
                                <li>Video Terbaru</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

// --- COMPONENTS ---

function MatrixTable({ theme, title, desc, data }: { theme: string, title: string, desc: string, data: any[] }) {
    const colors = {
        green: "bg-green-500/10 border-green-500/20 text-green-500",
        blue: "bg-blue-500/10 border-blue-500/20 text-blue-500",
        purple: "bg-purple-500/10 border-purple-500/20 text-purple-500",
    };
    const highlightColors = {
        green: "bg-green-500/20 text-green-400 border-green-500/50",
        blue: "bg-blue-500/20 text-blue-400 border-blue-500/50",
        purple: "bg-purple-500/20 text-purple-400 border-purple-500/50",
    };
    const t = colors[theme as keyof typeof colors];
    const h = highlightColors[theme as keyof typeof highlightColors];

    return (
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden rounded-[2.5rem]">
            <div className={cn("p-6 border-b", t)}>
                <h3 className="text-2xl font-black font-headline uppercase">{title}</h3>
                <p className="text-sm opacity-80 mt-1 font-medium">{desc}</p>
            </div>
            <div className="p-0">
                <Table>
                    <TableHeader className="bg-black/20">
                        <TableRow className="border-none hover:bg-transparent">
                            <TableHead className="font-bold text-muted-foreground w-[30%] pl-6">Tier Pemain A</TableHead>
                            <TableHead className="font-bold text-muted-foreground w-[30%]">Tier Pemain B</TableHead>
                            <TableHead className="font-bold text-muted-foreground text-right pr-6">Hasil Kategori</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row, i) => (
                            <TableRow key={i} className={cn("border-b border-white/5 hover:bg-white/5 transition-colors", row.highlight ? h : "")}>
                                <TableCell className="font-medium pl-6">{row.p1}</TableCell>
                                <TableCell className="font-medium">{row.p2}</TableCell>
                                <TableCell className="text-right font-bold uppercase pr-6">
                                    {row.highlight && <span className="mr-2 text-[10px] bg-white/20 px-2 py-0.5 rounded-sm">SEED</span>}
                                    {row.res}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}
