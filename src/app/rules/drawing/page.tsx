

'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Users, Network, ShieldAlert, Clock, ArrowDown, Target, CheckCircle, Info, Calendar, Gavel, Trophy, Shuffle, Scale } from 'lucide-react';
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
    <CardContent className="space-y-4 text-muted-foreground/90 leading-relaxed relative z-10">
      {children}
    </CardContent>
  </Card>
);

const RuleListItem = ({ text }: { text: string }) => (
    <li className="flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
        <span>{text}</span>
    </li>
);

// --- CONTENT SECTIONS ---

const PublicRules = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-8">
            <RuleCard title="Informasi Umum" icon={Info}>
                <ul className="space-y-3">
                    <RuleListItem text="Nama Event: Badmintour Open #1" />
                    <RuleListItem text="Jenis Event: Turnamen Badminton Antar Komunitas (Open)" />
                    <RuleListItem text="Kategori: BEGINNER" />
                    <RuleListItem text="Jenis Ganda: MD / WD / XD (digabung)" />
                </ul>
            </RuleCard>
            <RuleCard title="Format Pertandingan" icon={Network}>
                <div>
                    <h4 className="font-bold text-foreground mb-2">Fase Grup (Round Robin)</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>1 grup berisi 4–5 pasangan.</li>
                        <li>Semua pasangan dalam grup saling bertemu.</li>
                        <li>Peringkat ditentukan oleh: 1. Jumlah menang, 2. Selisih poin, 3. Head-to-head, 4. Fair play.</li>
                        <li>32 pasangan terbaik lolos ke fase eliminasi.</li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-bold text-foreground mb-2">Fase Eliminasi</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Menggunakan sistem gugur (knockout).</li>
                        <li>Babak: 32 Besar → 16 Besar → 8 Besar → Semifinal → Final.</li>
                    </ul>
                </div>
            </RuleCard>
        </div>
        <div className="space-y-8">
            <RuleCard title="Status Peserta & Pasangan" icon={Users}>
                 <ul className="space-y-3">
                    <RuleListItem text="Peserta mendaftar sebagai PASANGAN dari komunitas." />
                    <RuleListItem text="Level pemain dinilai per individu." />
                    <RuleListItem text="Gelar juara ditetapkan sebagai pasangan, bukan individu." />
                </ul>
            </RuleCard>
            <RuleCard title="Fair Play & Keputusan" icon={Gavel}>
                 <ul className="space-y-3">
                    <RuleListItem text="Setiap peserta dan tim wajib menjunjung tinggi sportivitas dan etika pertandingan." />
                    <RuleListItem text="Pelanggaran berat terhadap aturan fair play dapat berujung pada diskualifikasi." />
                    <RuleListItem text="Semua keputusan panitia yang dibuat berdasarkan regulasi resmi bersifat final dan mengikat." />
                </ul>
            </RuleCard>
        </div>
    </div>
);

const TechnicalRules = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-8">
            <RuleCard title="Struktur Otoritas" icon={Users}>
                <ul className="space-y-3">
                    <RuleListItem text="Penyelenggara: Badmintour." />
                    <RuleListItem text="Tim Teknis: Tim Verifikasi Teknis (TVT) bertugas melakukan verifikasi level individu (B1-B3), audit teknis, dan validasi pasangan." />
                </ul>
            </RuleCard>
             <RuleCard title="Sistem Level Beginner" icon={Scale}>
                <ul className="space-y-3">
                    <RuleListItem text="B1: Beginner Bawah" />
                    <RuleListItem text="B2: Beginner Tengah" />
                    <RuleListItem text="B3: Beginner Atas (dengan sub-level L/M/H untuk seeding)" />
                    <RuleListItem text="Penilaian menggunakan skor rubrik 1-5 per aspek teknis." />
                </ul>
            </RuleCard>
            <RuleCard title="Seeding & Drawing" icon={Shuffle}>
                 <ul className="space-y-3">
                    <RuleListItem text="Seeding ditentukan berdasarkan level individu dan keseimbangan pasangan." />
                    <RuleListItem text="MD, WD, dan XD diperlakukan setara dalam proses drawing." />
                </ul>
            </RuleCard>
        </div>
        <div className="space-y-8">
             <RuleCard title="Form Teknis" icon={FileText}>
                <ul className="space-y-3">
                    <RuleListItem text="Form TVT / Audit Individu: Menentukan level pemain (Internal, tidak dipublikasikan)." />
                    <RuleListItem text="Form H (Pair Synergy): Verifikasi awal pasangan (Internal)." />
                </ul>
            </RuleCard>
            <RuleCard title="Pengawasan & Sanksi" icon={ShieldAlert}>
                <ul className="space-y-3">
                    <RuleListItem text="Manipulasi level → diskualifikasi." />
                    <RuleListItem text="Ganti pasangan tanpa izin → diskualifikasi." />
                    <RuleListItem text="Pelanggaran berulang → blacklist event berikutnya." />
                </ul>
            </RuleCard>
             <RuleCard title="Dokumentasi Internal" icon={FileText}>
                <ul className="space-y-3">
                    <RuleListItem text="Lembar Audit Individu" />
                    <RuleListItem text="Form H" />
                    <RuleListItem text="Form Pendaftaran Pasangan" />
                    <RuleListItem text="Rekap Grup & Eliminasi" />
                </ul>
            </RuleCard>
        </div>
    </div>
);


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
                    Regulasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Resmi</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
                    Panduan lengkap mengenai peraturan, format, dan sistem pertandingan Badmintour Open #1.
                </p>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="public" className="w-full">
                <div className="flex justify-center mb-12">
                    <TabsList className="bg-secondary/50 p-1.5 rounded-full h-auto border border-white/10 backdrop-blur-md shadow-lg inline-flex flex-wrap justify-center gap-2">
                        <TabsTrigger 
                            value="public" 
                            className="text-sm md:text-base font-bold rounded-full px-6 py-3 md:px-8 md:py-4 capitalize data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                        >
                            Untuk Peserta (Publik)
                        </TabsTrigger>
                        <TabsTrigger 
                            value="technical" 
                            className="text-sm md:text-base font-bold rounded-full px-6 py-3 md:px-8 md:py-4 capitalize data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                        >
                            Untuk Panitia (Teknis)
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="min-h-[500px]">
                    <TabsContent value="public"><PublicRules /></TabsContent>
                    <TabsContent value="technical"><TechnicalRules /></TabsContent>
                </div>
            </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
