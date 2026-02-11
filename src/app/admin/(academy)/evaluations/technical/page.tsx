
'use client';

import { useState } from "react";
import { 
  Dumbbell, Target, User, 
  Save, UserSquare, Ruler, Activity, Weight, Wind, StretchVertical, Calendar, Swords, BarChart3, TrendingUp, XCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

// --- Custom Components for this page ---
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

const StrokeSlider = ({ label, value, onValueChange }: { label: string, value: number, onValueChange: (value: number) => void }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <Label>{label}</Label>
      <span className="font-mono font-bold text-lg text-primary w-8 text-center">{value}</span>
    </div>
    <Slider
      defaultValue={[value]}
      max={5}
      min={1}
      step={1}
      onValueChange={(v) => onValueChange(v[0])}
      className="[&>span:first-child]:h-1"
    />
  </div>
);

const StatInput = ({ label, unit }: { label: string, unit: string }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="flex items-center gap-2">
      <Input type="number" className="h-12 rounded-xl font-mono bg-secondary border" />
      <span className="text-sm font-mono text-muted-foreground">{unit}</span>
    </div>
  </div>
);


// --- Main Page Component ---
export default function TechnicalEvaluationPage() {
  const [scores, setScores] = useState({
    servisPendek: 3,
    servisPanjang: 3,
    netting: 3,
    lob: 3,
    dropshot: 3,
    smash: 3,
    drive: 3,
    defense: 3,
    footwork: 3,
  });

  const handleScoreChange = (stroke: keyof typeof scores, value: number) => {
    setScores(prev => ({ ...prev, [stroke]: value }));
  };

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM PENILAIAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            Evaluasi Teknik Badminton
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
            Formulir untuk penilaian subjektif dan objektif dari kemampuan teknis atlet.
        </p>
      </div>

      <form className="space-y-8">
        
        {/* IDENTITAS ATLET & SESI */}
        <SectionCard title="Identitas Atlet & Sesi" icon={UserSquare}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <Label>Nama Atlet</Label>
                    <Select><SelectTrigger className="h-14 rounded-xl text-base bg-secondary border"><SelectValue placeholder="Pilih Atlet..." /></SelectTrigger><SelectContent><SelectItem value="irsyad">Irsyad JPP</SelectItem></SelectContent></Select>
                </div>
                 <div className="space-y-2">
                    <Label>Tanggal Evaluasi</Label>
                    <Input type="date" placeholder="Tanggal" className="h-14 rounded-xl bg-secondary border"/>
                </div>
                <div className="space-y-2">
                    <Label>Pelatih Penilai</Label>
                    <Input placeholder="Nama Pelatih" className="h-14 rounded-xl bg-secondary border"/>
                </div>
            </div>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* STROKE ASSESSMENT */}
            <div className="space-y-8">
              <SectionCard title="Stroke Assessment" icon={Swords} description="Penilaian kualitas pukulan (Skala 1-5).">
                  <div className="space-y-6">
                    <StrokeSlider label="Servis Pendek" value={scores.servisPendek} onValueChange={(v) => handleScoreChange('servisPendek', v)} />
                    <StrokeSlider label="Servis Panjang" value={scores.servisPanjang} onValueChange={(v) => handleScoreChange('servisPanjang', v)} />
                    <StrokeSlider label="Netting" value={scores.netting} onValueChange={(v) => handleScoreChange('netting', v)} />
                    <StrokeSlider label="Lob" value={scores.lob} onValueChange={(v) => handleScoreChange('lob', v)} />
                    <StrokeSlider label="Dropshot" value={scores.dropshot} onValueChange={(v) => handleScoreChange('dropshot', v)} />
                    <StrokeSlider label="Smash" value={scores.smash} onValueChange={(v) => handleScoreChange('smash', v)} />
                    <StrokeSlider label="Drive" value={scores.drive} onValueChange={(v) => handleScoreChange('drive', v)} />
                    <StrokeSlider label="Defense" value={scores.defense} onValueChange={(v) => handleScoreChange('defense', v)} />
                    <StrokeSlider label="Footwork" value={scores.footwork} onValueChange={(v) => handleScoreChange('footwork', v)} />
                  </div>
              </SectionCard>
            </div>

             {/* STATISTIK LATIHAN */}
            <div className="space-y-8">
              <SectionCard title="Statistik Latihan (Objektif)" icon={BarChart3} description="Data kuantitatif dari sesi latihan khusus.">
                  <div className="space-y-4">
                      <StatInput label="Akurasi Smash" unit="%" />
                      <StatInput label="Error Rate" unit="per game" />
                      <StatInput label="Konsistensi Rally" unit="pukulan" />
                      <StatInput label="Recovery Footwork Time" unit="detik" />
                  </div>
              </SectionCard>
            </div>
        </div>

        {/* REKOMENDASI PELATIH */}
        <SectionCard title="Kesimpulan & Analisis" icon={Target}>
            <Textarea placeholder="Analisa kekuatan dan kelemahan utama. Tentukan fokus latihan teknis untuk siklus berikutnya..." className="rounded-xl h-32 bg-secondary border"/>
        </SectionCard>
        
        {/* SUBMIT */}
        <div className="flex justify-end pt-6 border-t border-border">
            <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
                <Save className="w-6 h-6 mr-3"/> Simpan Evaluasi Teknik
            </Button>
        </div>
      </form>
    </div>
  );
}
