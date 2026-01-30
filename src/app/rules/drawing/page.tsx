
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Users, Network, ShieldAlert, CheckCircle, Info, Calendar, Gavel, Trophy, Shuffle, Scale, BookOpen, HardHat, Database, Bot } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourtLines } from '@/components/ui/court-lines';
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


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
            <RuleCard title="Tujuan" icon={Target}>
                <p>Aturan ini disusun sebagai pedoman resmi penerimaan atlet Persatuan Bulutangkis (PB) dalam rangka pembinaan jangka panjang, pembentukan karakter, serta persiapan atlet usia dini menuju pembinaan prestasi yang berjenjang dan berkelanjutan.</p>
            </RuleCard>
            <RuleCard title="Prinsip Pembinaan" icon={Scale}>
                <ul className="space-y-3">
                    <RuleListItem text="Pembinaan jangka panjang (Long Term Athlete Development)" />
                    <RuleListItem text="Kesetaraan kesempatan bagi anak dari berbagai latar belakang sosial" />
                    <RuleListItem text="Keselamatan, kesehatan, dan perkembangan psikologis atlet" />
                    <RuleListItem text="Pendidikan karakter melalui olahraga" />
                    <RuleListItem text="Prestasi sebagai proses, bukan tujuan instan" />
                </ul>
            </RuleCard>
            <RuleCard title="Syarat Administrasi" icon={FileText}>
                 <ul className="space-y-3">
                    <RuleListItem text="Fotokopi Akta Kelahiran / Kartu Keluarga" />
                    <RuleListItem text="Pas foto terbaru" />
                    <RuleListItem text="Formulir pendaftaran atlet PB" />
                    <RuleListItem text="Surat izin orang tua/wali" />
                    <RuleListItem text="Surat keterangan kesehatan (jika diminta)" />
                </ul>
            </RuleCard>
             <RuleCard title="Ketentuan Khusus Sosial" icon={Users}>
                <p className="mb-2">PB memberikan kesempatan khusus bagi atlet dari keluarga kurang mampu atau kondisi rentan, dengan dukungan dapat berupa:</p>
                 <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Keringanan iuran</li>
                    <li>Skema subsidi silang</li>
                    <li>Program pembinaan berbasis komitmen</li>
                </ul>
                <p className="mt-2 text-xs font-bold">Atlet penerima dukungan wajib menunjukkan disiplin dan komitmen sebagai bentuk tanggung jawab.</p>
            </RuleCard>
        </div>
        <div className="space-y-8">
            <RuleCard title="Kriteria Usia Atlet" icon={Calendar}>
                <p>PB menerima atlet usia dini dan usia pembinaan awal, ditentukan berdasarkan tahun kelahiran sesuai ketentuan PBSI.</p>
                <div className="mt-4">
                  <h4 className="font-bold text-foreground mb-2">Kategori Usia Prioritas</h4>
                  <Table>
                    <TableHeader><TableRow><TableHead>Kategori</TableHead><TableHead>Tahun Lahir</TableHead></TableRow></TableHeader>
                    <TableBody>
                      <TableRow><TableCell>U9</TableCell><TableCell>2018 ke atas</TableCell></TableRow>
                      <TableRow><TableCell>U11</TableCell><TableCell>2016–2017</TableCell></TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4">
                  <h4 className="font-bold text-foreground mb-2">Kategori Bersyarat</h4>
                  <Table>
                    <TableHeader><TableRow><TableHead>Kategori</TableHead><TableHead>Tahun Lahir</TableHead><TableHead>Ketentuan</TableHead></TableRow></TableHeader>
                    <TableBody>
                      <TableRow><TableCell>U13</TableCell><TableCell>2014–2015</TableCell><TableCell>Evaluasi khusus</TableCell></TableRow>
                    </TableBody>
                  </Table>
                </div>
            </RuleCard>
            <RuleCard title="Proses Seleksi" icon={Gavel}>
                 <p>Seleksi bukan bertujuan mencari juara instan, tetapi menilai potensi dan kesiapan pembinaan melalui:</p>
                 <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                    <li>Observasi fisik dasar</li>
                    <li>Koordinasi dan motorik</li>
                    <li>Minat dan sikap terhadap latihan</li>
                </ul>
                <p className="mt-2 text-xs font-bold">Keputusan penerimaan ditetapkan oleh pelatih utama dan pengurus PB.</p>
            </RuleCard>
            <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card/50 p-4 rounded-xl border">
                    <h4 className="font-bold text-sm mb-2">Hak Atlet</h4>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                        <li>Mengikuti program latihan</li>
                        <li>Mendapat pembinaan</li>
                        <li>Evaluasi berkala</li>
                        <li>Kesempatan ikut event</li>
                    </ul>
                </Card>
                 <Card className="bg-card/50 p-4 rounded-xl border">
                    <h4 className="font-bold text-sm mb-2">Kewajiban Atlet</h4>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                        <li>Disiplin latihan</li>
                        <li>Menjaga etika</li>
                        <li>Menghormati sesama</li>
                        <li>Menjaga nama baik PB</li>
                    </ul>
                </Card>
            </div>
        </div>
    </div>
);

const InternalDocs = () => (
    <div className="max-w-4xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-card/80 border-border/50 rounded-2xl">
                <AccordionTrigger className="p-6 text-lg font-bold hover:no-underline">Lampiran Program 1 Tahun</AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <p className="text-muted-foreground text-sm mb-4">Lampiran ini digunakan untuk persiapan proposal CSR dan bahan evaluasi internal.</p>
                  <h4 className="font-bold mb-2">Timeline Bulanan</h4>
                  <Table>
                    <TableHeader><TableRow><TableHead>Bulan</TableHead><TableHead>Fokus Utama</TableHead></TableRow></TableHeader>
                    <TableBody>
                        <TableRow><TableCell>1</TableCell><TableCell>Pendataan atlet & orang tua, Tes fisik dasar (fun), Sosialisasi aturan</TableCell></TableRow>
                        <TableRow><TableCell>2</TableCell><TableCell>Latihan teknik dasar rutin, Edukasi disiplin waktu, Program Lapangan Bersih</TableCell></TableRow>
                        <TableRow><TableCell>3</TableCell><TableCell>Evaluasi fisik ringan, Mini challenge internal, Dokumentasi progres</TableCell></TableRow>
                        <TableRow><TableCell>...</TableCell><TableCell>...</TableCell></TableRow>
                        <TableRow><TableCell>12</TableCell><TableCell>Penyusunan laporan tahunan, Pameran foto, Perencanaan tahun berikutnya</TableCell></TableRow>
                    </TableBody>
                  </Table>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-card/80 border-border/50 rounded-2xl">
                <AccordionTrigger className="p-6 text-lg font-bold hover:no-underline">Program Terpadu CSR</AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                    <p className="text-muted-foreground text-sm mb-4">Program "Tangguh Berprestasi" dirancang untuk memenuhi berbagai pilar CSR, dari olahraga, karakter, lingkungan, hingga literasi keuangan.</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-background"><CardHeader><CardTitle className="text-base">Pilar 1: Atlet Tangguh</CardTitle></CardHeader><CardContent className="text-xs">Fokus pembinaan anak usia dini dari keluarga prasejahtera.</CardContent></Card>
                        <Card className="bg-background"><CardHeader><CardTitle className="text-base">Pilar 2: Cinta Lingkungan</CardTitle></CardHeader><CardContent className="text-xs">Mengintegrasikan nilai petualangan, alam, dan kepedulian lingkungan.</CardContent></Card>
                        <Card className="bg-background"><CardHeader><CardTitle className="text-base">Pilar 3: Literasi Keuangan</CardTitle></CardHeader><CardContent className="text-xs">Membentuk kebiasaan finansial sehat sejak dini.</CardContent></Card>
                        <Card className="bg-background"><CardHeader><CardTitle className="text-base">Pilar 4: Kemandirian PB</CardTitle></CardHeader><CardContent className="text-xs">Penguatan tata kelola PB & ekonomi pendukung.</CardContent></Card>
                     </div>
                </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-3" className="bg-card/80 border-border/50 rounded-2xl">
                <AccordionTrigger className="p-6 text-lg font-bold hover:no-underline">Sistem Monitoring & Evaluasi (MEP)</AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                    <p className="text-muted-foreground text-sm mb-4">Blueprint sistem digital PB untuk menunjukkan tata kelola modern, transparan, dan berbasis data kepada sponsor.</p>
                    <h4 className="font-bold mb-2">Prinsip Desain</h4>
                     <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
                        <li>**Transparan:** Semua data dapat diaudit</li>
                        <li>**Berkelanjutan:** Data historis tersimpan</li>
                        <li>**Terukur:** Indikator kuantitatif & kualitatif</li>
                        <li>**Scalable:** Bisa dikembangkan dengan ML/AI</li>
                    </ul>
                    <div className="p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg text-sm text-blue-300 flex items-center gap-3">
                        <Bot className="w-5 h-5 shrink-0" />
                        <span>Sistem ini membuka potensi **analisis prediktif** untuk risiko putus latihan dan rekomendasi program.</span>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
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
                    Official PB Rulebook
                </Badge>
                <h1 className="text-6xl md:text-8xl font-black font-headline uppercase tracking-tighter text-foreground drop-shadow-sm">
                    ATURAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">RESMI</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
                    Panduan lengkap mengenai peraturan, program, dan sistem pembinaan di PB Kultur Juara.
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
                            Aturan Penerimaan (Publik)
                        </TabsTrigger>
                        <TabsTrigger 
                            value="technical" 
                            className="text-sm md:text-base font-bold rounded-full px-6 py-3 md:px-8 md:py-4 capitalize data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                        >
                            Struktur Program (Internal)
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="min-h-[500px]">
                    <TabsContent value="public"><PublicRules /></TabsContent>
                    <TabsContent value="technical"><InternalDocs /></TabsContent>
                </div>
            </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
