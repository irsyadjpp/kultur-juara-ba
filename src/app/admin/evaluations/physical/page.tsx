
'use client';

import { useState } from "react";
import { 
  Dumbbell, HeartPulse, Target, User, 
  Save, UserSquare, Ruler, Activity, Weight, Wind, StretchVertical, Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// --- Custom Components for this page ---
const SectionCard = ({ icon: Icon, title, description, children }: { icon: React.ElementType, title: string, description?: string, children: React.ReactNode }) => (
  <Card className="bg-zinc-900/50 backdrop-blur-sm border-border/20 rounded-3xl shadow-xl">
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

const MetricInput = ({ label, unit, ...props }: { label: string, unit: string } & React.ComponentProps<typeof Input>) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="flex items-center gap-2">
      <Input type="number" step="0.1" className="h-12 rounded-xl bg-zinc-950 border-zinc-800 font-mono" {...props} />
      <span className="text-sm font-mono text-muted-foreground">{unit}</span>
    </div>
  </div>
);

// --- Main Page Component ---
export default function PhysicalEvaluationPage() {

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM PENILAIAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            Evaluasi Fisik Atlet (Bulanan)
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
            Formulir ini digunakan untuk memantau progres fisik atlet secara kuantitatif sesuai standar sport science.
        </p>
      </div>

      <form className="space-y-8">
        
        {/* IDENTITAS ATLET */}
        <SectionCard title="Identitas Atlet & Sesi" icon={UserSquare}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <Label>Nama Atlet</Label>
                    <Select><SelectTrigger className="h-14 rounded-xl bg-zinc-950 border-zinc-800 text-base"><SelectValue placeholder="Pilih Atlet..." /></SelectTrigger><SelectContent><SelectItem value="irsyad">Irsyad JPP</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-2">
                    <Label>Periode Evaluasi</Label>
                    <Input type="month" placeholder="Bulan / Tahun" className="h-14 rounded-xl bg-zinc-950 border-zinc-800"/>
                </div>
                <div className="space-y-2">
                    <Label>Pelatih Fisik</Label>
                    <Input placeholder="Nama Pelatih" className="h-14 rounded-xl bg-zinc-950 border-zinc-800"/>
                </div>
            </div>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">

                {/* 3. DATA FISIK & ANTROPOMETRI */}
                <SectionCard title="Antropometri" icon={Ruler} description="Pengukuran dasar komposisi tubuh.">
                    <div className="grid grid-cols-2 gap-4">
                        <MetricInput label="Tinggi Badan" unit="cm" />
                        <MetricInput label="Berat Badan" unit="kg" />
                        <div className="col-span-2 bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-center">
                            <p className="text-xs text-muted-foreground">Body Mass Index (BMI)</p>
                            <p className="text-2xl font-bold font-mono">22.5</p>
                        </div>
                        <MetricInput label="Panjang Lengan" unit="cm" />
                        <MetricInput label="Rentang Tangan" unit="cm" />
                        <MetricInput label="Panjang Tungkai" unit="cm" />
                        <MetricInput label="VO2Max (Opsional)" unit="ml/kg/min" />
                    </div>
                </SectionCard>
                
                {/* 4. TES KEKUATAN */}
                 <SectionCard title="Tes Kekuatan" icon={Dumbbell} description="Mengukur daya ledak otot.">
                    <div className="space-y-4">
                        <MetricInput label="Vertical Jump" unit="cm" />
                        <MetricInput label="Standing Broad Jump" unit="cm" />
                        <MetricInput label="Push-up (1 Menit)" unit="reps" />
                        <MetricInput label="Sit-up (1 Menit)" unit="reps" />
                    </div>
                </SectionCard>
                
            </div>
            
            <div className="space-y-8">
            
                {/* 4. TES DAYA TAHAN */}
                <SectionCard title="Tes Daya Tahan" icon={HeartPulse} description="Mengukur kapasitas kardiovaskular.">
                    <div className="space-y-4">
                       <MetricInput label="Bleep Test Level" unit="level" />
                       <MetricInput label="Yo-Yo Test Score" unit="score" />
                       <MetricInput label="Rally Maksimal" unit="detik" />
                    </div>
                </SectionCard>

                {/* 4. TES KECEPATAN & AGILITY */}
                <SectionCard title="Kecepatan & Agility" icon={Wind} description="Mengukur akselerasi dan perubahan arah.">
                    <div className="space-y-4">
                        <MetricInput label="Sprint 10m" unit="detik" />
                        <MetricInput label="Illinois Agility Test" unit="detik" />
                        <MetricInput label="Shuttle Run Time" unit="detik" />
                    </div>
                </SectionCard>

                {/* 4. TES FLEKSIBILITAS */}
                <SectionCard title="Fleksibilitas" icon={StretchVertical} description="Mengukur rentang gerak sendi.">
                    <div className="space-y-4">
                        <MetricInput label="Sit & Reach" unit="cm" />
                        <MetricInput label="Shoulder Mobility" unit="derajat" />
                    </div>
                </SectionCard>

            </div>
        </div>

        {/* REKOMENDASI PELATIH */}
        <SectionCard title="Kesimpulan & Rekomendasi" icon={Target}>
            <Textarea placeholder="Tulis kesimpulan umum dari hasil tes dan tentukan fokus latihan untuk periode selanjutnya..." className="bg-zinc-950 border-zinc-800 rounded-xl h-32"/>
        </SectionCard>
        
        {/* SUBMIT */}
        <div className="flex justify-end pt-6 border-t border-border/20">
            <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
                <Save className="w-6 h-6 mr-3"/> Simpan Evaluasi
            </Button>
        </div>

      </form>
    </div>
  );
}
