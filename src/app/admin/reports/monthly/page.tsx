'use client';

import { useState } from "react";
import { 
  FileText, Save, Calendar, Users, Activity, Target, ImageIcon, VideoIcon, BookOpen
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// --- Reusable Components ---
const SectionCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <Card className="rounded-3xl shadow-xl">
    <CardHeader className="p-8 pb-4">
      <CardTitle className="text-xl font-headline flex items-center gap-3">
        <Icon className="w-6 h-6 text-primary"/> {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-8 pt-0">
      {children}
    </CardContent>
  </Card>
);

const MetricInput = ({ label, unit, icon: Icon, ...props }: { label: string, unit: string, icon: React.ElementType } & React.ComponentProps<typeof Input>) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-2 text-muted-foreground"><Icon className="w-4 h-4" /> {label}</Label>
    <div className="flex items-center gap-2">
      <Input type="number" step="0.1" className="h-12 rounded-xl font-mono" {...props} />
      <span className="text-sm font-mono text-muted-foreground">{unit}</span>
    </div>
  </div>
);

// --- Main Page Component ---
export default function MonthlyReportPage() {

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM PELAPORAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            Laporan Bulanan Program
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
            Formulir 1 halaman untuk melaporkan progres program pembinaan kepada manajemen dan sponsor.
        </p>
      </div>

      <form className="space-y-8">
        
        {/* IDENTITAS LAPORAN */}
        <SectionCard title="Identitas Laporan" icon={FileText}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Nama Program</Label>
                    <Select defaultValue="Tumbuh Tangguh">
                      <SelectTrigger className="h-14 rounded-xl text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tumbuh Tangguh">Tumbuh Tangguh: Badminton, Alam & Karakter</SelectItem>
                        <SelectItem value="Prestasi Emas">Prestasi Emas U-17</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Bulan Pelaporan</Label>
                    <Input type="month" placeholder="Bulan / Tahun" className="h-14 rounded-xl"/>
                </div>
            </div>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
                {/* A. KEGIATAN UTAMA */}
                <SectionCard title="A. Kegiatan Utama" icon={Activity}>
                    <Textarea placeholder="Contoh: Latihan rutin (8x), Mini challenge (1x), Aksi pungut sampah (1x)..." className="rounded-xl h-24"/>
                </SectionCard>
                
                {/* B. CAPAIAN */}
                 <SectionCard title="B. Capaian" icon={Target}>
                    <div className="space-y-4">
                        <MetricInput label="Kehadiran Latihan" unit="%" icon={Users} />
                        <div className="space-y-2">
                           <Label className="flex items-center gap-2 text-muted-foreground"><BookOpen className="w-4 h-4"/> Perubahan Sikap/Disiplin (Kualitatif)</Label>
                           <Textarea placeholder="Contoh: Peningkatan kedisiplinan waktu, sportivitas saat tanding..." className="rounded-xl h-24"/>
                        </div>
                    </div>
                </SectionCard>
                
            </div>
            
            <div className="space-y-8">
                {/* C. DOKUMENTASI */}
                <SectionCard title="C. Dokumentasi" icon={Calendar}>
                    <div className="space-y-4">
                       <MetricInput label="Jumlah Foto" unit="file" icon={ImageIcon} />
                       <MetricInput label="Jumlah Video" unit="file" icon={VideoIcon} />
                       <div className="text-xs text-muted-foreground pt-2">
                         Pastikan semua file sudah di-upload ke Google Drive sesuai folder bulan ini.
                       </div>
                    </div>
                </SectionCard>

                {/* D. CATATAN PELATIH */}
                <SectionCard title="D. Catatan Pelatih" icon={Users}>
                    <Textarea placeholder="Catatan penting, tantangan yang dihadapi, atau masukan untuk bulan berikutnya..." className="rounded-xl h-32"/>
                </SectionCard>
            </div>
        </div>
        
        {/* SUBMIT */}
        <div className="flex justify-end pt-6 border-t border-border">
            <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
                <Save className="w-6 h-6 mr-3"/> Kirim Laporan Bulanan
            </Button>
        </div>

      </form>
    </div>
  );
}
