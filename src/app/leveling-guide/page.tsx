

'use client';

import { useState } from 'react';
import { 
  Trophy, Swords, Dumbbell, ShieldAlert, CheckCircle2, Scale, 
  BookOpen, Target, Users, AlertTriangle, XCircle, Video, Activity, BrainCircuit 
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
           <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary text-primary font-bold tracking-widest uppercase bg-primary/5">
              Official Rulebook v2.0
           </Badge>
           <h1 className="text-4xl md:text-6xl font-black font-headline uppercase tracking-tighter mb-4 text-foreground">
              Matrix <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Level & Tier</span>
           </h1>
           <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
              Regulasi resmi pembagian kategori pertandingan berdasarkan kombinasi <strong>Level (Beginner)</strong> dan <strong>Tier (Bawah/Menengah/Atas)</strong>.
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
                            Struktur seeding yang konsisten & objektif berbasis data TVT.
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
                            <p className="text-sm text-muted-foreground">Kategori turnamen ini adalah Beginner.</p>
                        </div>
                        <div className="flex gap-3">
                            <Badge variant="outline" className="h-fit border-blue-500 text-blue-500">Tier</Badge>
                            <p className="text-sm text-muted-foreground">Klasifikasi kekuatan detail dalam level yang sama (Bawah, Menengah, Atas).</p>
                        </div>
                        <div className="flex gap-3">
                            <Badge variant="outline" className="h-fit border-yellow-500 text-yellow-500">TVT</Badge>
                            <p className="text-sm text-muted-foreground">Tim Verifikasi Teknis yang memverifikasi skill & tier pemain.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 2. MATRIX DETAIL */}
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-black font-headline uppercase mb-2">Matrix Kategori Beginner</h2>
                    <p className="text-muted-foreground">Pemain Beginner akan dikelompokkan ke dalam Tier Low, Mid, dan High untuk fase grup yang seimbang.</p>
                </div>
            </div>
            
            {/* 4. KRITERIA PENILAIAN TVT (NEW SECTION) */}
            <div className="bg-zinc-900 text-zinc-100 rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 mb-10 text-center md:text-left">
                    <Badge variant="outline" className="mb-4 border-purple-500 text-purple-400 bg-purple-500/10">Transparansi TVT</Badge>
                    <h2 className="text-3xl md:text-4xl font-black font-headline uppercase mb-4">Ringkasan Penilaian TVT</h2>
                    <p className="text-zinc-400 max-w-3xl leading-relaxed">
                        TVT menggunakan <strong>Formulir Penilaian Terstandarisasi</strong> (Skala 1-5) untuk memastikan penilaian yang objektif. Berikut adalah ringkasan aspek yang dinilai dari video atau pantauan langsung Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {/* Card 1: Basic Tech */}
                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold flex items-center gap-3">
                                <Swords className="w-5 h-5 text-green-400" /> 1. Penilaian Utama
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-zinc-400 space-y-3">
                            <p className="text-xs text-muted-foreground mb-2">Menentukan Tier (Bawah/Menengah/Atas)</p>
                            <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-500/50" /> Teknik Dasar (Grip, Footwork)</li>
                            <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-500/50" /> Konsistensi Rally & Power</li>
                            <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-500/50" /> Kontrol, Akurasi & Net Play</li>
                            <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-500/50" /> Defense & Transisi</li>
                        </CardContent>
                    </Card>

                    {/* Card 2: Penilaian Utama - Fisik & IQ */}
                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold flex items-center gap-3">
                                <Activity className="w-5 h-5 text-blue-400" /> 2. Fisik & Mental
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-zinc-400 space-y-3">
                            <p className="text-xs text-muted-foreground mb-2">Faktor Penentu Kualitas Permainan</p>
                            <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-blue-500/50" /> Stamina & Mobilitas</li>
                            <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-blue-500/50" /> Pengambilan Keputusan (IQ)</li>
                            <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-blue-500/50" /> Komunikasi & Kerjasama</li>
                        </CardContent>
                    </Card>

                    {/* Card 3: Penilaian Khusus (Seeding) */}
                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold flex items-center gap-3">
                                <Trophy className="w-5 h-5 text-yellow-400" /> 3. Performa Khusus
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-zinc-400 space-y-3">
                            <p className="text-xs text-muted-foreground mb-2">Kriteria Lanjutan untuk Seeding</p>
                            <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-yellow-500/50" /> Power Efektif (Smash Poin)</li>
                            <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-yellow-500/50" /> Kecepatan Reaksi (Drive/Kill)</li>
                            <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-yellow-500/50" /> Pertahanan Poin Kritis</li>
                            <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-yellow-500/50" /> Stabilitas di Game Panjang</li>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8 p-4 bg-purple-900/20 border border-purple-500/20 rounded-2xl flex items-start gap-4">
                    <Video className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-zinc-200 text-sm uppercase mb-1">Fokus Pengamatan Video</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            Berdasarkan standar TVT, video akan diamati untuk melihat: <strong>Momentum Unggul</strong>, <strong>Titik Lemah Dominan</strong>, dan <strong>Konsistensi di Akhir Game</strong>. Pastikan video yang dikirim jelas dan tidak terpotong.
                        </p>
                    </div>
                </div>
            </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
