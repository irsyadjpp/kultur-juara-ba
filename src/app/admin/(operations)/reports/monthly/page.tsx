'use client';

import { useState } from "react";
import { 
  FileText, Save, Calendar, Users, Activity, Target, ImageIcon, VideoIcon, BookOpen, Wallet, Leaf, Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// --- Reusable Components ---
const SectionCard = ({ icon: Icon, title, description, children }: { icon: React.ElementType, title: string, description?: string, children: React.ReactNode }) => (
  <Card className="rounded-3xl shadow-xl">
    <CardHeader className="p-8 pb-4">
      <CardTitle className="text-xl font-headline flex items-center gap-3">
        <Icon className="w-6 h-6 text-primary"/> {title}
      </CardTitle>
      {description && <CardDescription className="pt-1">{description}</CardDescription>}
    </CardHeader>
    <CardContent className="p-8 pt-0">
      {children}
    </CardContent>
  </Card>
);

const MetricInput = ({ label, unit, icon: Icon, ...props }: { label: string, unit?: string, icon?: React.ElementType } & React.ComponentProps<typeof Input>) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-2 text-muted-foreground">{Icon && <Icon className="w-4 h-4" />} {label}</Label>
    <div className="flex items-center gap-2">
      <Input type="number" step="0.1" className="h-12 rounded-xl font-mono" {...props} />
      {unit && <span className="text-sm font-mono text-muted-foreground">{unit}</span>}
    </div>
  </div>
);

// Mock data of approved programs, which would be fetched in a real app
const APPROVED_PROGRAMS = [
    { id: "PROG-003", name: "Program Botol Minum Reusable", pilar: "Cinta Lingkungan"},
    { id: "PROG-004", name: "Workshop Finansial Atlet", pilar: "Literasi Keuangan"},
    { id: "PROG-005", name: "Bakti Sosial Panti Asuhan", pilar: "Kemandirian Komunitas"},
]

// --- Main Page Component ---
export default function LogProgramPage() {
  const [selectedPillar, setSelectedPillar] = useState('');

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM PELAPORAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            Log Aktivitas Program CSR
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
            Catat setiap kegiatan yang dijalankan di bawah program CSR untuk monitoring dan evaluasi.
        </p>
      </div>

      <form className="space-y-8">
        
        {/* IDENTITAS LAPORAN */}
        <SectionCard title="1. Detail Kegiatan" icon={Activity}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <Label>Pilih Program Induk (CSR)</Label>
                    <Select onValueChange={(value) => {
                        const program = APPROVED_PROGRAMS.find(p => p.id === value);
                        setSelectedPillar(program?.pilar || '');
                    }}>
                      <SelectTrigger className="h-14 rounded-xl text-base">
                        <SelectValue placeholder="Pilih program yang sudah disetujui..." />
                      </SelectTrigger>
                      <SelectContent>
                        {APPROVED_PROGRAMS.map(p => (
                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Nama Kegiatan Spesifik</Label>
                    <Input placeholder="Contoh: Aksi Pungut Sampah di CFD" className="h-14 rounded-xl"/>
                </div>
                 <div className="space-y-2">
                    <Label>Tanggal Pelaksanaan</Label>
                    <Input type="date" className="h-14 rounded-xl"/>
                </div>

                <div className="md:col-span-2 space-y-2">
                    <Label>Deskripsi Singkat Kegiatan</Label>
                    <Textarea placeholder="Jelaskan apa yang dilakukan, siapa saja yang terlibat, dan tujuan dari kegiatan ini." className="rounded-xl h-24"/>
                </div>
            </div>
        </SectionCard>
        
        {/* KONTEN DINAMIS BERDASARKAN PILAR */}
        {selectedPillar && (
            <SectionCard 
                title={`2. Metrik Pilar: ${selectedPillar}`} 
                icon={selectedPillar === 'Cinta Lingkungan' ? Leaf : selectedPillar === 'Literasi Keuangan' ? Wallet : Sparkles}
                description="Isi data kuantitatif dan kualitatif sesuai pilar program yang dipilih."
            >
                {selectedPillar === 'Cinta Lingkungan' && (
                    <div className="space-y-4">
                        <Select>
                            <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Pilih Jenis Aksi..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pungut-sampah">Aksi Pungut Sampah</SelectItem>
                                <SelectItem value="edukasi">Edukasi Daur Ulang</SelectItem>
                                <SelectItem value="penanaman">Penanaman Pohon</SelectItem>
                            </SelectContent>
                        </Select>
                        <MetricInput label="Jumlah Partisipan (Atlet & Staf)" icon={Users} />
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-muted-foreground"><BookOpen className="w-4 h-4"/> Dampak Deskriptif</Label>
                            <Textarea placeholder="Contoh: Terkumpul 5kg sampah plastik, meningkatkan kesadaran atlet tentang kebersihan lingkungan..." className="rounded-xl h-24"/>
                        </div>
                    </div>
                )}
                 {selectedPillar === 'Literasi Keuangan' && (
                    <div className="space-y-4">
                        <MetricInput label="Jumlah Peserta Workshop" icon={Users} />
                        <MetricInput label="Rata-rata Skor Pre-Test (1-5)" />
                        <MetricInput label="Rata-rata Skor Post-Test (1-5)" />
                        <div className="space-y-2">
                           <Label className="flex items-center gap-2 text-muted-foreground"><BookOpen className="w-4 h-4"/> Feedback & Observasi</Label>
                           <Textarea placeholder="Contoh: Atlet antusias belajar tentang investasi, beberapa masih bingung soal pajak..." className="rounded-xl h-24"/>
                        </div>
                    </div>
                )}
            </SectionCard>
        )}


        {/* DOKUMENTASI */}
        <SectionCard title="3. Dokumentasi" icon={ImageIcon}>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Link Google Drive Folder</Label>
                    <Input placeholder="Salin & tempel tautan folder Google Drive di sini..." className="h-12 rounded-xl font-mono text-xs"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <MetricInput label="Jumlah Foto" unit="file" />
                    <MetricInput label="Jumlah Video" unit="file" />
                </div>
                <div className="text-xs text-muted-foreground pt-2">
                    Pastikan folder sudah diatur "Dapat diakses siapa saja yang memiliki link".
                </div>
            </div>
        </SectionCard>
        
        {/* SUBMIT */}
        <div className="flex justify-end pt-6 border-t border-border">
            <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
                <Save className="w-6 h-6 mr-3"/> Simpan Laporan Aktivitas
            </Button>
        </div>

      </form>
    </div>
  );
}
