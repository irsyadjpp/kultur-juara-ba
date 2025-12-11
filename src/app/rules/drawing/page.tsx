
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Users, Network, ShieldAlert, Clock, ArrowDown, Target, CheckCircle, Info, Calendar, Gavel } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourtLines } from '@/components/ui/court-lines';

const BracketExample = ({ pairs, title }: { pairs: { p1: string, p2: string }[], title: string }) => (
  <div className="bg-background/50 p-4 rounded-2xl border border-border/50">
    <h4 className="font-bold text-center mb-4 text-sm text-muted-foreground uppercase tracking-widest">{title}</h4>
    <div className="space-y-2">
      {pairs.map((pair, index) => (
        <div key={index} className="flex items-center justify-between text-xs bg-secondary/30 p-2 rounded-lg font-mono">
          <span>{pair.p1}</span>
          <span className="font-bold text-primary">VS</span>
          <span>{pair.p2}</span>
        </div>
      ))}
    </div>
  </div>
);

const CaseExample = ({ title, desc, children }: { title: string, desc: string, children: React.ReactNode }) => (
  <div className="bg-background/50 p-6 rounded-2xl border border-border/50">
    <h4 className="font-bold text-foreground mb-1">{title}</h4>
    <p className="text-sm text-muted-foreground mb-4">{desc}</p>
    <div className="bg-secondary/30 p-4 rounded-xl">
      {children}
    </div>
  </div>
);

const tiebreakExample = [
    { name: "A", wl: "2–1", game: "5–3", gameDiff: "+2", point: "142–130", pointDiff: "+12", rank: 1 },
    { name: "B", wl: "2–1", game: "4–4", gameDiff: "0", point: "137–132", pointDiff: "+5", rank: 2 },
    { name: "C", wl: "2–1", game: "4–4", gameDiff: "0", point: "134–139", pointDiff: "–5", rank: 3 },
    { name: "D", wl: "0–3", game: "1–6", gameDiff: "–5", point: "98–140", pointDiff: "–42", rank: 4 },
];

const tiebreakRules = [
    { step: 1, name: "Jumlah Kemenangan (Win Count)", desc: "Peserta dengan kemenangan terbanyak." },
    { step: 2, name: "Head-to-head (jika 2 peserta)", desc: "Pemenang pertemuan langsung antar keduanya." },
    { step: 3, name: "Game Difference (selisih game)", desc: "Total game menang dikurangi total game kalah." },
    { step: 4, name: "Game Won (jumlah game menang)", desc: "Total game yang berhasil dimenangkan." },
    { step: 5, name: "Point Difference (selisih poin)", desc: "Total poin yang didapat dikurangi total poin kemasukan." },
    { step: 6, name: "Point Won (jumlah poin menang)", desc: "Total poin yang berhasil dikumpulkan." },
    { step: 7, name: "Drawing (undi)", desc: "Langkah terakhir jika semua kriteria masih sama." }
];

const SectionWrapper = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
  <Card className="bg-card/50 backdrop-blur-sm border-border/30 rounded-3xl shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center gap-4 text-2xl font-headline">
        <div className="bg-primary/10 text-primary p-3 rounded-2xl"><Icon className="w-6 h-6"/></div>
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      {children}
    </CardContent>
  </Card>
);

const DrawingContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="space-y-8">
        <SectionWrapper title="Beginner – Babak 16 Besar" icon={Network}>
            <div>
            <p className="font-bold text-foreground">Peserta Lolos:</p>
            <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1 mt-2">
                <li>8 Juara Grup (A - H)</li>
                <li>8 Runner-up Grup (A - H)</li>
            </ul>
            </div>
            <BracketExample
            title="Contoh Bracket 16 Besar" 
            pairs={[
                { p1: "Juara A", p2: "Runner-up B" },
                { p1: "Juara D", p2: "Runner-up C" },
                { p1: "Juara E", p2: "Runner-up F" },
                { p1: "Juara H", p2: "Runner-up G" },
            ]}
            />
            <p className="text-xs text-muted-foreground pt-4 border-t border-border/20">
            <strong>Aturan Utama:</strong> Juara grup tidak akan bertemu dengan runner-up dari grup yang sama di babak pertama. Tim juara dari paruh atas (A-D) dan bawah (E-H) dipisahkan untuk potensi bertemu di final.
            </p>
        </SectionWrapper>

        <SectionWrapper title="Intermediate & Advance – 8 Besar" icon={Network}>
            <div>
            <p className="font-bold text-foreground">Peserta Lolos:</p>
            <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1 mt-2">
                <li>4 Juara Grup (A - D)</li>
                <li>4 Runner-up Grup (A - D)</li>
            </ul>
            </div>
            <BracketExample
            title="Contoh Bracket 8 Besar" 
            pairs={[
                { p1: "Juara A", p2: "Runner-up B" },
                { p1: "Juara C", p2: "Runner-up D" },
                { p1: "Juara B", p2: "Runner-up A" },
                { p1: "Juara D", p2: "Runner-up C" },
            ]}
            />
            <p className="text-xs text-muted-foreground pt-4 border-t border-border/20">
            <strong>Semifinal Atas:</strong> Pemenang (Juara A/RU B) vs Pemenang (Juara C/RU D).
            </p>
        </SectionWrapper>
        </div>

        <div className="space-y-8">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-900/50 rounded-3xl shadow-lg">
            <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
                <ShieldAlert className="w-6 h-6"/> Aturan Anti-Clash
            </CardTitle>
            <CardDescription className="pt-2 text-blue-600 dark:text-blue-300/80">Mencegah pertemuan dini antar tim dari klub yang sama di babak gugur.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-blue-800 dark:text-blue-200">
                <div className="space-y-2">
                <h4 className="font-semibold">1. Prioritas Penempatan</h4>
                <p className="text-sm opacity-90">
                    Jika ada 2 tim atau lebih dari klub yang sama lolos, sistem akan memprioritaskan untuk menempatkan mereka di <strong>paruh bracket yang berbeda (Top Half & Bottom Half)</strong>.
                </p>
                </div>
                <div className="space-y-2">
                <h4 className="font-semibold">2. Kondisi Pengecualian</h4>
                <p className="text-sm opacity-90">
                    Aturan ini mungkin tidak berlaku jika jumlah wakilnya banyak, sehingga penempatan terpisah tidak memungkinkan secara matematis tanpa melanggar aturan lain.
                </p>
                </div>
            </CardContent>
        </Card>

        <div className="text-center">
            <Button variant="outline" asChild className="rounded-full h-12 px-8 font-bold border-2">
                <Link href="/live-score">Lihat Bagan Pertandingan Penuh</Link>
            </Button>
        </div>
        </div>
    </div>
);

const SchedulingContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
        <SectionWrapper title="Aturan Prioritas Utama: Level Terendah Main Duluan" icon={ArrowDown}>
            <p className="text-muted-foreground -mt-4">
                Jika seorang pemain atau pasangan bermain di lebih dari satu kategori, pertandingan di level yang lebih rendah akan selalu dijadwalkan terlebih dahulu.
            </p>
            <CaseExample title="Kasus 1: Beginner + Intermediate" desc="Peserta A ikut kategori Beginner dan Intermediate.">
                <p className="text-sm">Jadwal Pertandingan Peserta A:</p>
                <ul className="list-decimal pl-5 text-muted-foreground text-sm space-y-1">
                    <li>Mainkan semua match <strong>Beginner</strong> hingga selesai.</li>
                    <li>Baru mainkan match <strong>Intermediate</strong> setelahnya.</li>
                </ul>
            </CaseExample>
            <CaseExample title="Kasus 2: 3 Kategori Sekaligus" desc="Peserta B yang luar biasa ikut 3 kategori.">
                <p className="font-bold text-sm text-foreground">Urutan Wajib:</p>
                <p className="text-sm">1. Beginner ➡️ 2. Intermediate ➡️ 3. Advance</p>
            </CaseExample>
        </SectionWrapper>

        <SectionWrapper title="Aturan Praktis & Jeda Pertandingan" icon={Clock}>
            <p className="text-muted-foreground -mt-4">Untuk menghindari kelelahan dan menjaga kualitas permainan.</p>
            <CaseExample title="Saat Babak Grup (Group Stage)" desc="Jadwal antar pertandingan dibuat lebih renggang.">
                <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-2">
                    <li><strong>Minimal jeda 1 match</strong> jika kategori berbeda dimainkan di lapangan yang berbeda.</li>
                    <li><strong>Minimal jeda 2 match</strong> jika semua kategori dimainkan di lapangan yang sama.</li>
                </ul>
            </CaseExample>
            <CaseExample title="Saat Babak Gugur (Knockout)" desc="Jeda menjadi lebih krusial karena intensitas meningkat.">
                <p className="text-sm text-muted-foreground">Jika Peserta A lolos ke 16 Besar Beginner dan 8 Besar Intermediate di hari yang sama:</p>
                <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1 mt-2">
                    <li>Pertandingan 16 Besar Beginner <strong>wajib</strong> dimainkan lebih dulu.</li>
                    <li>Pertandingan 8 Besar Intermediate baru boleh dimainkan minimal setelah ada jeda <strong>2 slot pertandingan</strong>.</li>
                </ul>
            </CaseExample>
        </SectionWrapper>
        </div>

        <div className="space-y-8">
             <Card className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-900/50 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
                    <Target className="w-6 h-6"/> Target & Tujuan Aturan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-blue-800 dark:text-blue-200">
                  <ul className="list-disc pl-5 text-sm space-y-2 opacity-90">
                      <li>Memberikan waktu recovery fisik yang cukup bagi pemain multi-kategori.</li>
                      <li>Mencegah jadwal bentrok (clash) di lapangan.</li>
                      <li>Menjaga kualitas dan intensitas pertandingan di level yang lebih tinggi.</li>
                      <li>Memastikan fairness bagi semua peserta.</li>
                  </ul>
              </CardContent>
            </Card>
        </div>
    </div>
);

const RankingContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-6">
            <SectionWrapper title="Urutan Tiebreak Resmi" icon={FileText}>
                <p className="text-muted-foreground -mt-4">Jika ada jumlah kemenangan (W-L) yang sama, sistem akan menggunakan kriteria ini secara berurutan.</p>
                <div className="space-y-3">
                    {tiebreakRules.map(rule => (
                        <div key={rule.step} className="flex items-start gap-4 p-4 bg-secondary/30 rounded-xl">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-lg shrink-0">{rule.step}</div>
                            <div>
                                <p className="font-bold text-foreground">{rule.name}</p>
                                <p className="text-xs text-muted-foreground">{rule.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        </div>
        <div className="space-y-6">
            <SectionWrapper title="Contoh Kasus 3-Way Tie" icon={Users}>
                <p className="text-muted-foreground -mt-4">Peserta A, B, dan C sama-sama memiliki rekor 2-1.</p>
                <div className="rounded-2xl overflow-hidden border border-border/50">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Peserta</TableHead>
                                <TableHead>Game</TableHead>
                                <TableHead>Poin</TableHead>
                                <TableHead className="text-right">Rank</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tiebreakExample.map((t) => (
                                <TableRow key={t.name}>
                                    <TableCell className="font-medium">{t.name}</TableCell>
                                    <TableCell className={t.gameDiff > 0 ? "text-green-500" : ""}>{t.gameDiff > 0 ? `+${t.gameDiff}` : t.gameDiff}</TableCell>
                                    <TableCell className={t.pointDiff > 0 ? "text-green-500" : ""}>{t.pointDiff > 0 ? `+${t.pointDiff}` : t.pointDiff}</TableCell>
                                    <TableCell className="text-right font-bold">{t.rank}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <p className="text-xs text-muted-foreground pt-4 border-t border-border/20 p-3 bg-secondary/20 rounded-xl">
                    <strong>Analisa:</strong> A menjadi Juara Grup karena Selisih Game tertinggi (+2). B menjadi Runner-up karena Selisih Poin (+5) lebih baik dari C (–5) meskipun Selisih Game mereka sama (0).
                </p>
            </SectionWrapper>
        </div>
    </div>
);

const SeedingContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <div className="lg:col-span-2 space-y-6">
        <SectionWrapper title="Pengertian & Penentu Seeding" icon={Info}>
          <p className="text-muted-foreground mb-4 -mt-4">
            Seeding adalah proses penetapan peringkat awal peserta untuk menentukan posisi mereka dalam pembagian grup atau bagan pertandingan. Tujuannya adalah untuk membuat kompetisi lebih seimbang.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <CaseExample title="A. Observasi Video" desc="Sumber data penilaian.">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Video pertandingan/sparring</li>
                <li>Video kiriman pendaftaran</li>
                <li>Rekaman turnamen lampau</li>
              </ul>
            </CaseExample>
            <CaseExample title="B. Parameter TPF" desc="Aspek yang dinilai (skor 1-10).">
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Teknik & Biomekanik</li>
                <li>Tempo & Kecepatan</li>
                <li>Konsistensi & Kesalahan</li>
              </ul>
            </CaseExample>
          </div>
        </SectionWrapper>

        <SectionWrapper title="Mekanisme Penentuan Seeding (Tier Atas)" icon={Gavel}>
            <p className="text-muted-foreground mb-4 -mt-4">
                Jika beberapa pasangan yang sama kuat, kriteria berikut digunakan untuk seeding objektif.
            </p>
            <h4 className="font-bold text-foreground mb-2">Urutan Penentuan Seeding</h4>
            <ol className="list-decimal pl-5 space-y-3 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Total Skor Tier (TPF):</strong> Jumlah skor individu pemain dalam satu tim.</li>
                <li><strong className="text-foreground">Skor Aspek Performa Khusus:</strong> Nilai pada aspek Power, Stamina, dll.</li>
                <li><strong className="text-foreground">Pengamatan Video Terbaru:</strong> Performa paling stabil di video terakhir lebih diutamakan.</li>
                <li><strong className="text-foreground">Undian Terkontrol:</strong> Langkah terakhir jika semua kriteria masih identik, disaksikan TPF.</li>
            </ol>
        </SectionWrapper>
      </div>

      <div className="space-y-6">
         <SectionWrapper title="Aturan Khusus & Transparansi" icon={FileText}>
             <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-3">
                 <li><strong className="text-foreground">Peserta Satu Klub:</strong> Hanya pasangan dengan nilai TPF tertinggi dari satu klub yang bisa menjadi seed.</li>
                 <li><strong className="text-foreground">Penilaian Ganda:</strong> Penilaian ada 2 yaitu penilaian individu dan penilaian sebagai pasangan.</li>
                 <li><strong className="text-foreground">Data Video Tidak Lengkap:</strong> Jika peserta tidak mengirim video yang memadai, penilaian akan menggunakan data visual yang tersedia dan peserta otomatis masuk kelompok non-seed.</li>
                 <li><strong className="text-foreground">Kerahasiaan Data:</strong> Semua video peserta bersifat rahasia dan hanya digunakan untuk kebutuhan penilaian TPF.</li>
                 <li><strong className="text-foreground">Ketentuan Perubahan Aturan:</strong> Panitia berhak memperbarui atau menyesuaikan aturan seeding dengan pemberitahuan kepada peserta.</li>
             </ul>
         </SectionWrapper>
      </div>
    </div>
);


export default function RulesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
           <CourtLines />
        </div>
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary text-primary font-bold tracking-widest uppercase bg-primary/5">
                    Official Rulebook
                </Badge>
                <h1 className="text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter mb-6">
                    Aturan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">Main</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                    Pahami mekanisme drawing, penentuan peringkat, dan prinsip penjadwalan untuk memastikan keadilan bagi semua.
                </p>
            </div>

            <Tabs defaultValue="drawing" className="w-full">
                <div className="flex justify-center mb-10">
                    <TabsList className="bg-secondary/50 p-2 rounded-full h-auto border border-border/20 backdrop-blur-sm">
                        <TabsTrigger value="drawing" className="text-sm font-bold rounded-full px-6 py-3 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md">Drawing</TabsTrigger>
                        <TabsTrigger value="seeding" className="text-sm font-bold rounded-full px-6 py-3 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md">Seeding</TabsTrigger>
                        <TabsTrigger value="ranking" className="text-sm font-bold rounded-full px-6 py-3 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md">Peringkat</TabsTrigger>
                        <TabsTrigger value="scheduling" className="text-sm font-bold rounded-full px-6 py-3 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md">Jadwal</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="drawing">
                    <DrawingContent />
                </TabsContent>
                <TabsContent value="seeding">
                    <SeedingContent />
                </TabsContent>
                <TabsContent value="ranking">
                    <RankingContent />
                </TabsContent>
                <TabsContent value="scheduling">
                    <SchedulingContent />
                </TabsContent>
            </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
