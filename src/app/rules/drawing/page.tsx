
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Users, Network, ShieldAlert, Clock, ArrowDown, Target, CheckCircle, Info, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BracketExample = ({ pairs, title }: { pairs: { p1: string, p2: string }[], title: string }) => (
  <div className="bg-background/50 p-4 rounded-xl border">
    <h4 className="font-bold text-center mb-4 text-sm text-muted-foreground uppercase tracking-widest">{title}</h4>
    <div className="space-y-2">
      {pairs.map((pair, index) => (
        <div key={index} className="flex items-center justify-between text-xs bg-secondary/30 p-2 rounded-md font-mono">
          <span>{pair.p1}</span>
          <span className="font-bold text-primary">VS</span>
          <span>{pair.p2}</span>
        </div>
      ))}
    </div>
  </div>
);

const CaseExample = ({ title, desc, children }: { title: string, desc: string, children: React.ReactNode }) => (
  <div className="bg-background/50 p-6 rounded-2xl border">
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
  <Card className="bg-card/50">
    <CardHeader>
      <CardTitle className="flex items-center gap-3 text-xl">
        <div className="bg-primary/10 text-primary p-3 rounded-xl"><Icon className="w-5 h-5"/></div>
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {children}
    </CardContent>
  </Card>
);

const DrawingContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="space-y-8">
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
                <div className="bg-primary/10 text-primary p-3 rounded-xl"><Network className="w-5 h-5"/></div>
                <span>Beginner – Babak 16 Besar</span>
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <p className="text-xs text-muted-foreground pt-2 border-t">
                <strong>Aturan Utama:</strong> Juara grup tidak akan bertemu dengan runner-up dari grup yang sama di babak pertama. Tim juara dari paruh atas (A-D) dan bawah (E-H) dipisahkan untuk potensi bertemu di final.
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
                <div className="bg-primary/10 text-primary p-3 rounded-xl"><Network className="w-5 h-5"/></div>
                <span>Intermediate & Advance – 8 Besar</span>
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <p className="text-xs text-muted-foreground pt-2 border-t">
                <strong>Semifinal Atas:</strong> Pemenang (Juara A/RU B) vs Pemenang (Juara C/RU D).
                </p>
            </CardContent>
        </Card>
        </div>

        <div className="space-y-8">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50">
            <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
                <ShieldAlert className="w-5 h-5"/> Aturan Anti-Clash
            </CardTitle>
            <CardDescription className="pt-2">Mencegah pertemuan dini antar tim dari klub yang sama di babak gugur.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-blue-800 dark:text-blue-200">
                <div className="space-y-2">
                <h4 className="font-semibold">1. Prioritas Penempatan</h4>
                <p className="text-sm opacity-80">
                    Jika ada 2 tim atau lebih dari klub yang sama lolos ke babak gugur, sistem akan memprioritaskan untuk menempatkan mereka di <strong>paruh bracket yang berbeda (Top Half & Bottom Half)</strong>.
                </p>
                </div>
                <div className="space-y-2">
                <h4 className="font-semibold">2. Kondisi Pengecualian</h4>
                <p className="text-sm opacity-80">
                    Aturan ini mungkin tidak berlaku jika jumlah tim dari satu klub terlalu banyak, sehingga penempatan terpisah tidak memungkinkan secara matematis tanpa melanggar aturan lain (misal: bertemu grup yang sama).
                </p>
                </div>
            </CardContent>
        </Card>

        <div className="text-center">
            <Button variant="outline" asChild>
                <Link href="/live-score">Lihat Bagan Pertandingan Penuh</Link>
            </Button>
        </div>
        </div>
    </div>
);

const SchedulingContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
                <div className="bg-primary/10 text-primary p-3 rounded-xl"><ArrowDown className="w-5 h-5"/></div>
                <span>Aturan Prioritas Utama: Level Terendah Main Duluan</span>
            </CardTitle>
            <CardDescription className="pt-2">
                Jika seorang pemain atau pasangan bermain di lebih dari satu kategori, pertandingan di level yang lebih rendah akan selalu dijadwalkan terlebih dahulu untuk memberikan waktu istirahat yang cukup.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
                <div className="bg-primary/10 text-primary p-3 rounded-xl"><Clock className="w-5 h-5"/></div>
                <span>Aturan Praktis & Jeda Pertandingan</span>
            </CardTitle>
            <CardDescription className="pt-2">
                Untuk menghindari kelelahan dan menjaga kualitas permainan.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              </CardContent>
        </Card>
        </div>

        <div className="space-y-8">
             <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
                    <Target className="w-5 h-5"/> Target & Tujuan Aturan
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
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Urutan Tiebreak Resmi</CardTitle>
                    <CardDescription>Jika ada jumlah kemenangan (W-L) yang sama, sistem akan menggunakan kriteria ini secara berurutan.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {tiebreakRules.map(rule => (
                        <div key={rule.step} className="flex items-start gap-4 p-3 bg-secondary/30 rounded-lg">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-lg shrink-0">{rule.step}</div>
                            <div>
                                <p className="font-bold text-foreground">{rule.name}</p>
                                <p className="text-xs text-muted-foreground">{rule.desc}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Contoh Kasus 3-Way Tie</CardTitle>
                    <CardDescription>Peserta A, B, dan C sama-sama memiliki rekor 2-1.</CardDescription>
                </CardHeader>
                <CardContent>
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
                    <p className="text-xs text-muted-foreground mt-4 p-3 bg-secondary/20 rounded-md">
                        <strong>Analisa:</strong> A menjadi Juara Grup karena Selisih Game tertinggi (+2). B menjadi Runner-up karena Selisih Poin (+5) lebih baik dari C (–5) meskipun Selisih Game mereka sama (0).
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
);

const SeedingContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <div className="lg:col-span-2 space-y-6">
        <SectionWrapper title="Pengertian & Penentu Seeding" icon={Info}>
          <p className="text-muted-foreground mb-4">
            Seeding adalah proses penetapan peringkat awal untuk distribusi kekuatan yang merata. Karena ini turnamen komunitas, TPF menentukan seeding berdasarkan observasi video dan parameter teknis, bukan ranking PBSI/BWF.
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
                <li>Pengalaman (Visual)</li>
              </ul>
            </CaseExample>
          </div>
        </SectionWrapper>

        <SectionWrapper title="Mekanisme Penentuan Seeding Jika Banyak Pasangan Tier Atas" icon={Gavel}>
             <p className="text-muted-foreground mb-4">
                Jika ada beberapa pasangan yang semuanya sama-sama “tier atas”, maka penentuan seeding harus menggunakan kriteria lanjutan untuk menjaga objektivitas.
             </p>
             <div className="space-y-4">
                <h4 className="font-bold">1. Gunakan Skor Penilaian Tier (Total Skor Individu)</h4>
                <p className="text-sm text-muted-foreground">Setiap pemain memiliki skor penilaian TPF. Total skor pasangan (Pemain A + Pemain B) menjadi penentu utama. Pasangan dengan total skor tertinggi mendapat seeding lebih tinggi.</p>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Pasangan</TableHead>
                                <TableHead>Skor A</TableHead>
                                <TableHead>Skor B</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Ranking</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>P1</TableCell><TableCell>19</TableCell><TableCell>18</TableCell><TableCell className="font-bold">37</TableCell><TableCell>#1</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>P2</TableCell><TableCell>18</TableCell><TableCell>18</TableCell><TableCell className="font-bold">36</TableCell><TableCell>#2</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell>P3</TableCell><TableCell>17</TableCell><TableCell>19</TableCell><TableCell className="font-bold">36</TableCell><TableCell>#3 (tie)</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                
                <h4 className="font-bold pt-4 border-t">2. Jika Total Skor Sama → Gunakan “Skor Performa”</h4>
                <p className="text-sm text-muted-foreground">TPF dapat memberikan nilai tambahan pada aspek performa khusus (Power, Stamina, Defense, dll). Pasangan dengan rerata performa khusus lebih tinggi mendapat seeding lebih baik.</p>
                
                 <h4 className="font-bold pt-4 border-t">Urutan Penentuan Seeding</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
                    <li>Total skor tier (skor penilaian TPF).</li>
                    <li>Skor aspek performa khusus.</li>
                    <li>Head-to-head (jika ada data pertemuan sebelumnya).</li>
                    <li>Pengamatan video terbaru (lebih relevan).</li>
                    <li>Undian terkontrol (sebagai langkah terakhir).</li>
                </ol>
             </div>
        </SectionWrapper>


        <SectionWrapper title="Aturan Penempatan & Khusus" icon={FileText}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h4 className="font-bold">Penempatan Seed</h4>
                    <ul className="list-decimal pl-5 text-sm text-muted-foreground space-y-2">
                        <li><strong>Satu Seed per Grup:</strong> Tidak boleh ada 2 seed dalam satu grup.</li>
                        <li><strong>Penyebaran Merata:</strong> Seed 1 di Grup A, Seed 2 di Grup B, dst.</li>
                        <li><strong>Pisah di Gugur:</strong> Seed 1 & 2 ditempatkan di paruh bracket berlawanan agar potensi bertemu di final.</li>
                    </ul>
                </div>
                 <div className="space-y-4">
                    <h4 className="font-bold">Peserta Non-Seed</h4>
                    <p className="text-sm text-muted-foreground">Peserta lain akan ditempatkan melalui undian terbuka atau pengelompokan berdasarkan nilai TPF.</p>
                     <h4 className="font-bold mt-4">Klarifikasi</h4>
                    <p className="text-sm text-muted-foreground">Keberatan atas seeding diterima maks. 24 jam setelah pengumuman untuk review video ulang. Keputusan TPF final.</p>
                </div>
            </div>
        </SectionWrapper>
      </div>
      <div className="space-y-6">
         <SectionWrapper title="Aturan Khusus & Transparansi" icon={Calendar}>
             <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-3">
                 <li><strong>Peserta Satu Klub:</strong> Hanya pasangan dengan nilai TPF tertinggi dari satu klub yang bisa menjadi seed. Pasangan lain akan dipisah di babak gugur jika memungkinkan.</li>
                 <li><strong>Penilaian Ganda:</strong> Penilaian dilakukan per PASANGAN, bukan per individu.</li>
                 <li><strong>Data Video Tidak Lengkap:</strong> Jika peserta tidak mengirim video yang memadai, penilaian akan menggunakan data visual yang tersedia dan otomatis masuk kelompok non-seed.</li>
                 <li><strong>Kerahasiaan Data:</strong> Semua video bersifat rahasia dan hanya digunakan untuk kebutuhan internal TPF.</li>
                 <li><strong>Ketentuan Perubahan Aturan:</strong> Panitia berhak memperbarui aturan seeding sesuai kebutuhan teknis, dengan pemberitahuan sebelum pertandingan dimulai.</li>
             </ul>
         </SectionWrapper>
      </div>
    </div>
);


export default function RulesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24">
        
        <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary text-primary font-bold tracking-widest uppercase">
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
            <TabsList className="grid w-full grid-cols-4 max-w-3xl mx-auto h-14 p-1 rounded-2xl">
                <TabsTrigger value="drawing" className="h-full rounded-xl text-base">Drawing</TabsTrigger>
                <TabsTrigger value="seeding" className="h-full rounded-xl text-base">Seeding</TabsTrigger>
                <TabsTrigger value="ranking" className="h-full rounded-xl text-base">Peringkat</TabsTrigger>
                <TabsTrigger value="scheduling" className="h-full rounded-xl text-base">Jadwal</TabsTrigger>
            </TabsList>
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
      </main>
      <Footer />
    </div>
  );
}

    