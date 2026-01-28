'use client';

import { useState } from "react";
import { 
  UserSquare, Save, Brain
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

// --- Custom Components from other eval pages ---
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

const RatingSlider = ({ label, value, onValueChange, max = 5, step = 1 }: { label: string, value: number, onValueChange: (value: number) => void, max?: number, step?: number }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <Label>{label}</Label>
      <span className="font-mono font-bold text-lg text-primary w-8 text-center">{value}</span>
    </div>
    <Slider
      defaultValue={[value]}
      max={max}
      min={1}
      step={step}
      onValueChange={(v) => onValueChange(v[0])}
      className="[&>span:first-child]:h-1"
    />
  </div>
);

// --- Main Page Component ---
export default function MentalEvaluationPage() {
  const [mentalScores, setMentalScores] = useState({
    focus: 3,
    concentration: 3,
    emotionControl: 3,
    pressureHandling: 3,
    resilience: 3,
  });

  const [psychoScores, setPsychoScores] =useState({
      motivation: 7,
      confidence: 7,
      stress: 5,
  })

  const handleMentalScoreChange = (skill: keyof typeof mentalScores, value: number) => {
    setMentalScores(prev => ({ ...prev, [skill]: value }));
  };

  const handlePsychoScoreChange = (skill: keyof typeof psychoScores, value: number) => {
    setPsychoScores(prev => ({ ...prev, [skill]: value }));
  };


  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM PENILAIAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            Evaluasi Mental & Psikologis
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
            Formulir untuk memantau ketangguhan mental dan kondisi psikologis atlet.
        </p>
      </div>

      <form className="space-y-8">
        
        {/* IDENTITAS ATLET & SESI */}
        <SectionCard title="Identitas Atlet & Sesi" icon={UserSquare}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <Label>Nama Atlet</Label>
                    <Select><SelectTrigger className="h-14 rounded-xl bg-zinc-950 border-zinc-800 text-base"><SelectValue placeholder="Pilih Atlet..." /></SelectTrigger><SelectContent><SelectItem value="irsyad">Irsyad JPP</SelectItem></SelectContent></Select>
                </div>
                 <div className="space-y-2">
                    <Label>Tanggal Evaluasi</Label>
                    <Input type="date" placeholder="Tanggal" className="h-14 rounded-xl bg-zinc-950 border-zinc-800"/>
                </div>
                <div className="space-y-2">
                    <Label>Pelatih Penilai</Label>
                    <Input placeholder="Nama Pelatih" className="h-14 rounded-xl bg-zinc-950 border-zinc-800"/>
                </div>
            </div>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* MENTAL TRAINING ASSESSMENT */}
            <SectionCard title="Mental Training Assessment" icon={Brain} description="Penilaian kualitas mental di lapangan (Skala 1-5).">
                <div className="space-y-6">
                    <RatingSlider label="Fokus (Kualitas Perhatian)" value={mentalScores.focus} onValueChange={(v) => handleMentalScoreChange('focus', v)} />
                    <RatingSlider label="Konsentrasi (Durasi Perhatian)" value={mentalScores.concentration} onValueChange={(v) => handleMentalScoreChange('concentration', v)} />
                    <RatingSlider label="Kontrol Emosi" value={mentalScores.emotionControl} onValueChange={(v) => handleMentalScoreChange('emotionControl', v)} />
                    <RatingSlider label="Mental di Bawah Tekanan" value={mentalScores.pressureHandling} onValueChange={(v) => handleMentalScoreChange('pressureHandling', v)} />
                    <RatingSlider label="Resiliensi (Cepat Bangkit)" value={mentalScores.resilience} onValueChange={(v) => handleMentalScoreChange('resilience', v)} />
                </div>
            </SectionCard>

            {/* PSYCHOLOGICAL ASSESSMENT */}
            <SectionCard title="Psychological Report (Self-Assessment)" icon={UserSquare} description="Input berdasarkan wawancara dengan atlet (Skala 1-10).">
                <div className="space-y-6">
                    <RatingSlider label="Motivasi Latihan" value={psychoScores.motivation} onValueChange={(v) => handlePsychoScoreChange('motivation', v)} max={10} />
                    <RatingSlider label="Tingkat Kepercayaan Diri" value={psychoScores.confidence} onValueChange={(v) => handlePsychoScoreChange('confidence', v)} max={10} />
                    <RatingSlider label="Tingkat Stres Umum" value={psychoScores.stress} onValueChange={(v) => handlePsychoScoreChange('stress', v)} max={10} />
                </div>
            </SectionCard>
        </div>


        {/* REKOMENDASI PELATIH */}
        <SectionCard title="Catatan Psikolog / Pelatih Mental" icon={Brain}>
            <Textarea placeholder="Tulis catatan observasi, rekomendasi latihan mental, atau area yang perlu perhatian khusus..." className="bg-zinc-950 border-zinc-800 rounded-xl h-32"/>
        </SectionCard>
        
        {/* SUBMIT */}
        <div className="flex justify-end pt-6 border-t border-border/20">
            <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
                <Save className="w-6 h-6 mr-3"/> Simpan Evaluasi Mental
            </Button>
        </div>
      </form>
    </div>
  );
}