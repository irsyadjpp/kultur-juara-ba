
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Users, Network, ShieldAlert, Clock, ArrowDown, Target, CheckCircle, Info, Calendar, Gavel, Trophy, Shuffle, Scale } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourtLines } from '@/components/ui/court-lines';
import { cn } from "@/lib/utils";

// --- SUB-COMPONENTS ---

const RuleCard = ({ title, icon: Icon, children, className }: { title: string, icon: React.ElementType, children: React.ReactNode, className?: string }) => (
  <Card className={cn("bg-card/80 backdrop-blur-md border-border/50 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500", className)}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    <CardHeader className="pb-4">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-black font-headline uppercase leading-none tracking-tight">{title}</h3>
      </div>
    </CardHeader>
    <CardContent className="space-y-6 text-muted-foreground/90 leading-relaxed relative z-10">
      {children}
    </CardContent>
  </Card>
);

const CaseStudy = ({ title, desc, children }: { title: string, desc: string, children: React.ReactNode }) => (
  <div className="bg-secondary/30 p-6 rounded-3xl border border-white/5">
    <div className="flex items-start gap-3 mb-4">
        <div className="mt-1 w-2 h-2 rounded-full bg-yellow-500 shrink-0 animate-pulse" />
        <div>
            <h4 className="font-bold text-foreground text-lg leading-tight">{title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{desc}</p>
        </div>
    </div>
    <div className="bg-background/60 p-5 rounded-2xl text-sm border border-white/5 shadow-inner">
      {children}
    </div>
  </div>
);

const BracketViz = ({ pairs, title }: { pairs: { p1: string, p2: string }[], title: string }) => (
  <div className="bg-zinc-900 text-zinc-100 p-6 rounded-3xl border border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[url('/images/noise.png')] mix-blend-overlay" />
    <h4 className="font-bold text-center mb-6 text-xs text-zinc-500 uppercase tracking-[0.2em]">{title}</h4>
    <div className="space-y-3 relative z-10">
      {pairs.map((pair, index) => (
        <div key={index} className="flex items-center justify-between text-xs sm:text-sm bg-black/40 p-3 rounded-xl border border-white/5">
          <span className="font-bold truncate w-[40%] text-right">{pair.p1}</span>
          <span className="font-black text-yellow-500 px-2 italic">VS</span>
          <span className="font-bold truncate w-[40%] text-left">{pair.p2}</span>
        </div>
      ))}
    </div>
  </div>
);

// --- CONTENT SECTIONS ---

const DrawingContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="lg:col-span-8 space-y-8">
            <RuleCard title="Sistem Gugur (Knockout)" icon={Network}>
                <p className="text-lg font-medium text-foreground">
                    Format pertandingan menggunakan sistem gugur murni setelah lolos dari fase grup.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3 text-purple-500 font-bold uppercase tracking-wider text-xs">
                            <Target className="w-4 h-4" /> Contoh Bracket
                        </div>
                        <BracketViz
                            title="Bracket 16 Besar" 
                            pairs={[
                                { p1: "Juara A", p2: "Runner-up B" },
                                { p1: "Juara D", p2: "Runner-up C" },
                                { p1: "Juara E", p2: "Runner-up F" },
                                { p1: "Juara H", p2: "Runner-up G" },
                            ]}
                        />
                    </div>
                    <div>
                         <div className="flex items-center gap-2 mb-3 text-purple-500 font-bold uppercase tracking-wider text-xs">
                            <Target className="w-4 h-4" /> Contoh Bracket
                        </div>
                        <BracketViz
                            title="Bracket 8 Besar" 
                            pairs={[
                                { p1: "Juara A", p2: "Runner-up B" },
                                { p1: "Juara C", p2: "Runner-up D" },
                                { p1: "Juara B", p2: "Runner-up A" },
                                { p1: "Juara D", p2: "Runner-up C" },
                            ]}
                        />
                    </div>
                </div>
                <div className="flex gap-3 items-start p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        <strong>Logic:</strong> Juara grup tidak akan bertemu runner-up dari grup yang sama di babak pertama (Cross-bracket).
                    </p>
                </div>
            </RuleCard>
        </div>

        <div className="lg:col-span-4 space-y-8">
            <Card className="bg-blue-600 text-white border-none rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-black font-headline">
                        <ShieldAlert className="w-8 h-8"/> Anti-Clash
                    </CardTitle>
                    <CardDescription className="text-blue-100 font-medium opacity-90">
                        Protokol pemisahan pemain satu klub.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                    <div className="bg-black/20 p-5 rounded-2xl backdrop-blur-md">
                        <h4 className="font-bold mb-1">1. Separasi Bracket</h4>
                        <p className="text-sm opacity-80 leading-relaxed">
                            Jika 2 pemain dari klub sama lolos, sistem memprioritaskan mereka di <strong>Top Half & Bottom Half</strong> yang berbeda agar tidak bertemu sebelum Final.
                        </p>
                    </div>
                    <div className="bg-black/20 p-5 rounded-2xl backdrop-blur-md">
                        <h4 className="font-bold mb-1">2. Pengecualian</h4>
                        <p className="text-sm opacity-80 leading-relaxed">
                            Jika jumlah wakil sangat banyak (dominasi), clash mungkin tidak terhindarkan secara matematis.
                        </p>
                    </div>
                    
                    <Button variant="secondary" asChild className="w-full rounded-full font-bold text-blue-900 h-12 shadow-lg hover:bg-white">
                        <Link href="/bagan">Lihat Bagan Live</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
);

const SchedulingContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="lg:col-span-2 space-y-8">
            <RuleCard title="Priority Scheduling" icon={ArrowDown}>
                <p className="text-lg mb-6">
                    Pemain yang bermain rangkap dilindungi oleh aturan prioritas untuk mencegah kelelahan ekstrem.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CaseStudy title="Scenario: Double Agent" desc="Atlet bermain di Beginner & Intermediate.">
                        <ol className="list-decimal pl-4 space-y-2 font-medium">
                            <li>Selesaikan semua match <span className="text-green-600 font-bold">Beginner</span>.</li>
                            <li>Istirahat.</li>
                            <li>Lanjut match <span className="text-blue-600 font-bold">Intermediate</span>.</li>
                        </ol>
                    </CaseStudy>
                    <CaseStudy title="Scenario: Iron Man" desc="Atlet bermain di 3 kategori sekaligus.">
                        <div className="flex flex-col gap-2 items-center justify-center h-full">
                            <Badge className="bg-green-500 w-full justify-center py-1">1. Beginner</Badge>
                            <ArrowDown className="w-4 h-4 text-muted-foreground" />
                            <Badge className="bg-blue-500 w-full justify-center py-1">2. Intermediate</Badge>
                            <ArrowDown className="w-4 h-4 text-muted-foreground" />
                            <Badge className="bg-primary w-full justify-center py-1">3. Advance</Badge>
                        </div>
                    </CaseStudy>
                </div>
            </RuleCard>

            <RuleCard title="Recovery Protocol" icon={Clock}>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl">
                        <span className="font-bold text-muted-foreground">Jeda Fase Grup</span>
                        <Badge variant="outline" className="text-lg px-4 py-1 border-primary text-primary">Min. 1 Match</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl">
                        <span className="font-bold text-muted-foreground">Jeda Fase Gugur</span>
                        <Badge variant="outline" className="text-lg px-4 py-1 border-primary text-primary">Min. 2 Match</Badge>
                    </div>
                </div>
            </RuleCard>
        </div>

        <div className="space-y-8">
             <Card className="bg-zinc-900 text-zinc-100 border-none rounded-[2.5rem] p-8 shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-yellow-500">
                        <Target className="w-6 h-6"/> Why This Rule?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {[
                            "Menjaga kualitas permainan tetap tinggi.",
                            "Mencegah cedera akibat kelelahan.",
                            "Menghindari Walkover (WO) konyol.",
                            "Fairness untuk lawan yang menunggu."
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-sm font-medium opacity-80">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    </div>
);

const RankingContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="lg:col-span-7 space-y-6">
            <RuleCard title="Tie-Breaker Rules" icon={Scale}>
                <p className="mb-6">Jika jumlah kemenangan (W-L) sama, penentuan peringkat mengikuti hierarki berikut secara ketat:</p>
                <div className="space-y-3">
                    {[
                        { name: "Win Count", desc: "Jumlah kemenangan mutlak" },
                        { name: "Head-to-Head", desc: "Pemenang pertemuan langsung" },
                        { name: "Game Difference", desc: "Selisih set menang - kalah" },
                        { name: "Game Won", desc: "Total set kemenangan" },
                        { name: "Point Difference", desc: "Selisih poin total" },
                        { name: "Coin Toss", desc: "Undian manual (Ultima Ratio)" },
                    ].map((rule, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-background/50 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary font-black text-xl text-muted-foreground group-hover:bg-primary group-hover:text-white transition-colors shrink-0 mt-1">
                                {i + 1}
                            </div>
                            <div>
                                <p className="font-bold text-foreground text-lg">{rule.name}</p>
                                <p className="text-xs text-muted-foreground mt-1">{rule.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </RuleCard>
        </div>
        
        <div className="lg:col-span-5 space-y-6">
            <Card className="bg-surface-variant border-none rounded-[2.5rem] overflow-hidden shadow-xl">
                <CardHeader className="bg-primary/10 pb-8">
                    <CardTitle className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-primary" /> Case Study: 3-Way Tie
                    </CardTitle>
                    <CardDescription>Situasi di mana 3 tim saling mengalahkan.</CardDescription>
                </CardHeader>
                <CardContent className="-mt-6">
                    <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead className="font-bold text-foreground">Tim</TableHead>
                                    <TableHead className="text-center font-bold">Game Diff</TableHead>
                                    <TableHead className="text-right font-bold">Rank</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Tim A</TableCell>
                                    <TableCell className="text-center text-green-600 font-bold">+2</TableCell>
                                    <TableCell className="text-right"><Badge className="bg-yellow-500 text-black hover:bg-yellow-600">#1</Badge></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Tim B</TableCell>
                                    <TableCell className="text-center text-muted-foreground">0</TableCell>
                                    <TableCell className="text-right"><Badge variant="outline">#2</Badge></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Tim C</TableCell>
                                    <TableCell className="text-center text-red-500 font-bold">-2</TableCell>
                                    <TableCell className="text-right"><Badge variant="outline">#3</Badge></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-6 p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 text-xs text-yellow-700 dark:text-yellow-400 leading-relaxed">
                        <strong>Analisa:</strong> Karena H2H saling mengalahkan (Circle), kita turun ke <strong>Game Difference</strong>. Tim A lolos karena surplus set terbanyak.
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
);

const SeedingContent = () => {
    const process = [
      { title: "Pengumpulan Data", desc: "TPF menerima form penilaian, video, dan data head-to-head (jika ada) maksimal H-14." },
      { title: "Penilaian Individual", desc: "Setiap TPF memberikan skor mandiri. Skor final adalah rata-rata untuk menentukan kategori dan tier." },
      { title: "Penyusunan Ranking Internal", desc: "Ranking disusun berdasarkan: 1. Skor Utama, 2. Skor Tambahan, 3. Observasi Video, 4. Head-to-Head." },
      { title: "Penentuan Jumlah Seed", desc: "Beginner (32 pemain) → 8 seed." },
      { title: "Pemilihan & Penyebaran", desc: "Pemain tier atas diprioritaskan. Seed disebar ke grup berbeda untuk mencegah pertemuan dini." },
      { title: "Validasi & Pengesahan", desc: "Draft dari TPF divalidasi Koordinator dan disahkan oleh Technical Delegate (TD). Hasil dirilis H-7." }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
                <RuleCard title="S.O.P. Penentuan Seeding" icon={Gavel}>
                    <p className="mb-6 text-lg">
                        Menetapkan standar penilaian yang konsisten dan objektif dalam menentukan <span className="font-bold text-primary">pemain unggulan (seed)</span> pada setiap kategori.
                    </p>
                    <div className="space-y-4">
                        {process.map((item, index) => (
                             <div key={index} className="flex items-start gap-4 p-4 bg-background/50 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors group">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary font-black text-xl text-muted-foreground group-hover:bg-primary group-hover:text-white transition-colors shrink-0 mt-1">
                                    {index + 1}
                                </div>
                                <div>
                                    <p className="font-bold text-foreground text-lg">{item.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </RuleCard>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 space-y-6">
                <Card className="bg-surface-variant border-none rounded-[2.5rem] overflow-hidden shadow-xl">
                    <CardHeader className="bg-primary/10">
                        <CardTitle className="flex items-center gap-3">
                            <FileText className="w-6 h-6 text-primary" /> Dasar Penilaian
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <ul className="space-y-3">
                            {[
                                "Penilaian Skill Utama (Skor TPF)",
                                "Penilaian Performa Tambahan (Skor TPF Lanjutan)",
                                "Pengamatan Video Pertandingan",
                                "Head-to-Head (jika ada)",
                                "Tier Kategori (Prioritas Otomatis)"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                
                <Card className="bg-zinc-900 text-zinc-100 border-none rounded-[2.5rem] p-6 shadow-xl">
                     <CardHeader className="p-0 mb-4">
                        <CardTitle className="flex items-center gap-3 text-xl font-bold text-yellow-500">
                            <Users className="w-6 h-6"/> Aturan Multi-Pemain
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-3 text-sm text-zinc-300">
                        <p>Jika 1 klub mengirim banyak pemain:</p>
                        <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                            <li>Pemain <span className="font-bold text-white">ber-seed</span> tetap di grupnya.</li>
                            <li>Pemain lain dari klub yang sama akan dihindarkan dari grup yang sama <span className="font-bold text-white">(jika memungkinkan)</span>.</li>
                            <li>Jika slot terbatas, pemain dari klub yang sama boleh berada dalam satu grup.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};


// --- MAIN PAGE ---

export default function RulesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
      <Header />
      <main className="flex-grow py-20 md:py-32 relative overflow-hidden">
        
        {/* Background FX */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
           <CourtLines />
        </div>
        <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <div className="text-center mb-16 space-y-6">
                <Badge variant="outline" className="px-4 py-1.5 border-primary/30 text-primary font-bold tracking-[0.2em] uppercase bg-primary/5 rounded-full">
                    Official Rulebook 2026
                </Badge>
                <h1 className="text-6xl md:text-8xl font-black font-headline uppercase tracking-tighter text-foreground drop-shadow-sm">
                    Aturan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Main</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
                    Kitab suci turnamen. Pahami mekanisme drawing, sistem peringkat, dan protokol jadwal untuk kompetisi yang adil dan transparan.
                </p>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="drawing" className="w-full">
                <div className="flex justify-center mb-12">
                    <TabsList className="bg-secondary/50 p-1.5 rounded-full h-auto border border-white/10 backdrop-blur-md shadow-lg inline-flex flex-wrap justify-center gap-2">
                        {["drawing", "seeding", "ranking", "scheduling"].map(tab => (
                            <TabsTrigger 
                                key={tab} 
                                value={tab} 
                                className="text-sm md:text-base font-bold rounded-full px-6 py-3 md:px-8 md:py-4 capitalize data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                            >
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <div className="min-h-[500px]">
                    <TabsContent value="drawing"><DrawingContent /></TabsContent>
                    <TabsContent value="seeding"><SeedingContent /></TabsContent>
                    <TabsContent value="ranking"><RankingContent /></TabsContent>
                    <TabsContent value="scheduling"><SchedulingContent /></TabsContent>
                </div>
            </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
