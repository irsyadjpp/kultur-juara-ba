
'use client';

import { useState } from "react";
import { 
  TrendingUp, TrendingDown, Calendar, Plus, 
  Target, DollarSign, Wallet, PieChart, 
  ArrowRight, CheckCircle2, Clock, AlertCircle, FileText, CheckSquare, Sparkles, HandHeart, Leaf, BookCopy, Bot, HardHat
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// MOCK DATA - Financial Overview (can be kept)
const BUDGET_STATS = {
  total: 450000000, 
  used: 125000000,  
  burnRate: 28,     
  remaining: 325000000
};

// NEW DATA - 12 Month Timeline
const TIMELINE = [
  { month: 1, title: "Kick-off & Baseline", focus: ["Pendataan atlet & orang tua", "Tes fisik dasar (fun)", "Sosialisasi aturan disiplin"] },
  { month: 2, title: "Fondasi Disiplin", focus: ["Latihan teknik dasar rutin", "Edukasi disiplin waktu", "Program Lapangan Bersih"] },
  { month: 3, title: "Evaluasi Awal", focus: ["Evaluasi fisik ringan", "Mini challenge internal", "Dokumentasi progres awal"] },
  { month: 4, title: "Mentalitas & Kebiasaan", focus: ["Simulasi pertandingan internal", "Edukasi mental berani kalah", "Kampanye botol minum pribadi"] },
  { month: 5, title: "Pola & Cerita", focus: ["Latihan pola permainan", "Mini challenge bulanan", "Dokumentasi cerita atlet"] },
  { month: 6, title: "Review Tengah Tahun", focus: ["Evaluasi tengah tahun", "Sparing internal", "Laporan semester 1"] },
  { month: 7, title: "Refresh & Bonding", focus: ["Sparing dengan PB lain", "Fun games luar ruang", "Aksi bersih fasilitas olahraga"] },
  { month: 8, title: "Konsistensi", focus: ["Latihan konsistensi & fokus", "Edukasi sportivitas", "Dokumentasi komunitas"] },
  { month: 9, title: "Simulasi Kompetisi", focus: ["Simulasi turnamen kecil", "Evaluasi mental bertanding", "Testimoni orang tua"] },
  { month: 10, title: "Penguatan Karakter", focus: ["Persiapan turnamen internal", "Review disiplin & karakter", "Dokumentasi intensif"] },
  { month: 11, title: "Puncak Acara Internal", focus: ["Turnamen internal tahunan", "Refleksi atlet & pelatih", "Pengumpulan data akhir"] },
  { month: 12, title: "Evaluasi & Perencanaan", focus: ["Penyusunan laporan tahunan", "Pameran foto perjalanan", "Perencanaan tahun berikutnya"] },
];

// OLD DATA for Budget Sheet (can be kept for that tab)
const PROGRAMS = [
  { id: 1, name: "Sewa Venue GOR KONI", division: "OPERATIONS", cost: 80000000, date: "Jun 2026", status: "APPROVED", progress: 100 },
  { id: 2, name: "Produksi Jersey Panitia", division: "LOGISTICS", cost: 25000000, date: "May 2026", status: "IN_REVIEW", progress: 40 },
  { id: 3, name: "Hadiah Uang Tunai (Prize Pool)", division: "FINANCE", cost: 150000000, date: "Jul 2026", status: "PLANNED", progress: 0 },
  { id: 4, name: "Promosi Iklan Instagram", division: "MEDIA", cost: 15000000, date: "Apr 2026", status: "APPROVED", progress: 80 },
];

// NEW DATA FOR CSR PROGRAM
const CSR_PILLARS = [
    { title: "Pilar 1: Atlet Tangguh & Berkarakter", icon: Sparkles, activities: ["Latihan rutin & pembinaan mental", "Mini challenge disiplin & sportivitas", "Evaluasi fisik & karakter"] },
    { title: "Pilar 2: Cinta Lingkungan & Gaya Hidup Aktif", icon: Leaf, activities: ["Program Lapangan Bersih", "Pengurangan sampah plastik (botol minum pribadi)", "Fun games luar ruang"] },
    { title: "Pilar 3: Literasi Keuangan", icon: Wallet, activities: ["Edukasi menabung atlet (target mikro)", "Edukasi keuangan orang tua", "Simulasi keuangan sederhana"] },
    { title: "Pilar 4: Kemandirian Komunitas PB", icon: HandHeart, activities: ["Pelatihan manajemen PB sederhana", "Pelibatan UMKM orang tua", "Transparansi laporan & dokumentasi"] },
];

const DOC_CHECKLIST = {
    "Setiap Kegiatan": ["Foto kegiatan (5–10)", "Video pendek (30–60 detik)", "Catatan tanggal & kegiatan"],
    "Setiap Bulan": ["Rekap kehadiran", "Laporan 1 halaman", "Backup file (cloud/drive)"],
    "Akhir Tahun": ["Laporan tahunan", "Video perjalanan", "Arsip foto terkurasi"]
};


const MEP_PRINCIPLES = [
    { title: "Transparan", desc: "Semua data dapat diaudit oleh pihak berkepentingan.", icon: CheckSquare},
    { title: "Berkelanjutan", desc: "Data historis tersimpan untuk analisis jangka panjang.", icon: TrendingUp},
    { title: "Terukur", desc: "Menggunakan indikator kuantitatif & kualitatif yang jelas.", icon: PieChart},
    { title: "Scalable", desc: "Siap dikembangkan dengan Machine Learning & AI.", icon: Bot},
    { title: "Human-Centered", desc: "Tidak membebani pelatih dengan input data yang rumit.", icon: HandHeart},
]

export default function PlanningPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="space-y-8 p-4 md:p-0">
      
      {/* --- HEADER (Keep as is) --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-primary text-primary bg-primary/10 backdrop-blur-md">
                    <Target className="w-3 h-3 mr-2 fill-primary" /> STRATEGIC PLANNING
                </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-foreground">
                Masterplan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">& Budget</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl text-lg">
                Peta jalan strategis dan alokasi "amunisi" keuangan PB Kultur Juara.
            </p>
        </div>

        <Button 
            onClick={() => setIsAddOpen(true)}
            className="h-14 rounded-full px-8 bg-foreground text-background hover:bg-zinc-800 font-bold text-lg shadow-lg"
        >
            <Plus className="mr-2 w-5 h-5"/> NEW PROGRAM
        </Button>
      </div>

      {/* --- BUDGET OVERVIEW (Keep as is) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2 bg-gradient-to-br from-card to-secondary/50 border-border rounded-[40px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-all"></div>
            <CardContent className="p-8 md:p-10 relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <p className="text-muted-foreground font-bold uppercase text-xs tracking-[0.2em] mb-2">Total War Chest (RAB)</p>
                        <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tight">
                            Rp {BUDGET_STATS.total.toLocaleString('id-ID', { notation: "compact" })}
                        </h2>
                    </div>
                    <div className="bg-background p-4 rounded-3xl border">
                        <Wallet className="w-8 h-8 text-primary"/>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-3xl font-black text-foreground">{BUDGET_STATS.burnRate}%</span>
                            <span className="text-muted-foreground ml-2 font-bold text-sm uppercase">Burn Rate (Realized)</span>
                        </div>
                        <div className="text-right">
                            <span className="text-muted-foreground text-xs font-bold uppercase block mb-1">Remaining</span>
                            <span className="text-xl font-bold text-foreground font-mono">Rp {BUDGET_STATS.remaining.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                    <Progress value={BUDGET_STATS.burnRate} className="h-4 bg-secondary rounded-full" indicatorClassName="bg-gradient-to-r from-primary to-orange-500" />
                </div>
            </CardContent>
         </Card>

         <div className="space-y-6">
            <Card className="bg-card border rounded-[32px] flex-1">
                <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs font-bold uppercase">Funding Secured</p>
                        <p className="text-2xl font-black text-foreground">85%</p>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-card border rounded-[32px] flex-1">
                <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <FileText className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs font-bold uppercase">Programs</p>
                        <p className="text-2xl font-black text-foreground">{TIMELINE.length} Months</p>
                    </div>
                </CardContent>
            </Card>
         </div>
      </div>

      {/* --- TABS SECTION --- */}
      <Tabs defaultValue="roadmap" className="w-full">
        <div className="flex justify-center mb-8">
            <TabsList className="bg-secondary p-1.5 rounded-full h-16 w-full max-w-2xl border grid grid-cols-4">
                <TabsTrigger value="roadmap" className="rounded-full h-full font-bold text-base data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md">
                    <Calendar className="w-4 h-4 mr-2"/> ROADMAP
                </TabsTrigger>
                <TabsTrigger value="csr" className="rounded-full h-full font-bold text-base data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md">
                    <Sparkles className="w-4 h-4 mr-2"/> PROGRAM CSR
                </TabsTrigger>
                <TabsTrigger value="mep" className="rounded-full h-full font-bold text-base data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md">
                    <HardHat className="w-4 h-4 mr-2"/> SISTEM MEP
                </TabsTrigger>
                <TabsTrigger value="budget" className="rounded-full h-full font-bold text-base data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md">
                    <DollarSign className="w-4 h-4 mr-2"/> BUDGET
                </TabsTrigger>
            </TabsList>
        </div>

        {/* TAB 1: ROADMAP (TIMELINE VIEW) */}
        <TabsContent value="roadmap">
            <div className="relative pl-6 after:absolute after:inset-y-0 after:w-px after:bg-border after:left-6">
              {TIMELINE.map((item, index) => (
                <div key={item.month} className="relative pl-10 pb-8 last:pb-0">
                  <div className="absolute left-[23px] -translate-x-1/2 w-3 h-3 bg-primary rounded-full mt-1.5 ring-4 ring-background" />
                  <Card className="bg-card/50 backdrop-blur border-border/20 rounded-3xl shadow-sm hover:border-primary/30 transition-colors">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                          <CardDescription className="text-primary font-bold text-xs uppercase tracking-widest">Bulan {item.month}</CardDescription>
                          <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                        </div>
                        <div className="p-3 bg-secondary rounded-xl text-muted-foreground font-mono text-2xl font-black">
                            {item.month}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mt-4 text-muted-foreground text-sm">
                            {item.focus.map((f, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckSquare className="w-4 h-4 text-green-500" /> {f}
                                </li>
                            ))}
                        </ul>
                      </CardContent>
                  </Card>
                </div>
              ))}
            </div>
        </TabsContent>

        {/* TAB 2: CSR PROGRAM */}
        <TabsContent value="csr" className="space-y-8">
            <div className="text-center">
                <h3 className="text-3xl font-black font-headline uppercase text-foreground">Program Terpadu CSR: "Tangguh Berprestasi"</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">Satu kegiatan inti untuk memenuhi berbagai pilar CSR, dari olahraga, karakter, lingkungan, hingga literasi keuangan.</p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CSR_PILLARS.map((pillar, idx) => (
                    <Card key={idx} className="rounded-3xl shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-lg font-bold"><pillar.icon className="w-5 h-5 text-primary"/>{pillar.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm font-bold text-muted-foreground mb-2">Aktivitas Utama:</p>
                            <ul className="list-disc pl-5 space-y-1 text-sm">
                                {pillar.activities.map((act, i) => <li key={i}>{act}</li>)}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card className="rounded-3xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg font-bold"><BookCopy className="w-5 h-5 text-primary"/>Checklist Dokumentasi Wajib</CardTitle>
                    <CardDescription>Panduan standar untuk pelaporan ke sponsor.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {Object.entries(DOC_CHECKLIST).map(([title, items], idx) => (
                            <AccordionItem key={idx} value={`item-${idx}`} className={idx === 0 ? "border-t-0" : ""}>
                                <AccordionTrigger className="font-bold">{title}</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc pl-5 space-y-2 text-sm">
                                        {items.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </TabsContent>

        {/* TAB 3: SISTEM MEP */}
        <TabsContent value="mep" className="space-y-8">
            <div className="text-center">
                <h3 className="text-3xl font-black font-headline uppercase text-foreground">Blueprint Sistem MEP</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">Sistem Monitoring, Evaluasi & Perencanaan Program (MEP) menunjukkan tata kelola modern, transparan, dan berbasis data.</p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MEP_PRINCIPLES.map((pillar, idx) => (
                    <Card key={idx} className="rounded-3xl shadow-md border-t-4 border-primary">
                        <CardHeader>
                             <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4"><pillar.icon className="w-6 h-6"/></div>
                            <CardTitle className="text-lg font-bold">{pillar.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-muted-foreground">{pillar.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
             <Card className="rounded-3xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg font-bold"><Wallet className="w-5 h-5 text-primary"/>Alur Sistem (End-to-End)</CardTitle>
                </CardHeader>
                <CardContent>
                     <p className="text-sm text-muted-foreground">Flow data mulai dari perencanaan hingga pelaporan.</p>
                </CardContent>
            </Card>
        </TabsContent>

        {/* TAB 4: BUDGET SHEET (TABLE VIEW) */}
        <TabsContent value="budget">
            <Card className="bg-card border-border rounded-[32px] overflow-hidden">
                <CardHeader className="p-8 border-b">
                    <CardTitle className="text-2xl font-black uppercase">Detail Anggaran (RKA)</CardTitle>
                    <CardDescription>Breakdown pengeluaran per divisi.</CardDescription>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary/30 text-muted-foreground uppercase font-bold text-xs">
                            <tr>
                                <th className="px-8 py-6">Program Item</th>
                                <th className="px-6 py-6">Divisi</th>
                                <th className="px-6 py-6 text-right">RAB (Plan)</th>
                                <th className="px-6 py-6 text-center">Status</th>
                                <th className="px-6 py-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {PROGRAMS.map((prog) => (
                                <tr key={prog.id} className="hover:bg-secondary/30 transition-colors">
                                    <td className="px-8 py-5 font-bold text-foreground text-base">{prog.name}</td>
                                    <td className="px-6 py-5"><Badge variant="secondary" className="bg-secondary text-secondary-foreground border-none">{prog.division}</Badge></td>
                                    <td className="px-6 py-5 text-right font-mono font-bold text-muted-foreground">Rp {prog.cost.toLocaleString('id-ID')}</td>
                                    <td className="px-6 py-5 text-center">
                                        <Badge className={cn("rounded-full", prog.status === 'APPROVED' ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600")}>
                                            {prog.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <Button variant="ghost" size="sm" className="hover:text-foreground">Edit</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </TabsContent>
      </Tabs>

      {/* --- ADD PROGRAM MODAL (Keep as is) --- */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="bg-card text-foreground rounded-[40px] max-w-lg p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b bg-secondary/50">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2">
                        <Plus className="w-6 h-6 text-primary"/> New Program
                    </DialogTitle>
                    <DialogDescription>Tambahkan rencana kerja baru ke dalam masterplan.</DialogDescription>
                </DialogHeader>
            </div>
            
            <div className="p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Nama Program</label>
                    <Input placeholder="Cth: Sewa Lighting Stage" className="bg-secondary border h-14 rounded-2xl text-lg font-bold" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Divisi</label>
                        <Select>
                            <SelectTrigger className="bg-secondary border h-14 rounded-2xl"><SelectValue placeholder="Pilih" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="LOGISTICS">Logistics</SelectItem>
                                <SelectItem value="MEDIA">Media & Creative</SelectItem>
                                <SelectItem value="MATCH">Match Control</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Estimasi Biaya</label>
                        <Input type="number" placeholder="Rp 0" className="bg-secondary border h-14 rounded-2xl font-mono" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Target Tanggal</label>
                    <Input type="month" className="bg-secondary border h-14 rounded-2xl" />
                </div>

                <Button className="w-full h-16 rounded-full font-black text-lg bg-primary hover:bg-primary/90 text-primary-foreground mt-4 shadow-xl shadow-primary/20">
                    SAVE TO MASTERPLAN
                </Button>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
