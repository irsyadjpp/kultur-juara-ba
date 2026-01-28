'use client';

import { useState } from "react";
import { 
  Target, UserSquare, Save, BrainCircuit
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { FormControl } from "@/components/ui/form";

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

const RatingSlider = ({ label, value, onValueChange, max = 5 }: { label: string, value: number, onValueChange: (value: number) => void, max?: number }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <Label>{label}</Label>
      <span className="font-mono font-bold text-lg text-primary w-8 text-center">{value}</span>
    </div>
    <Slider
      defaultValue={[value]}
      max={max}
      min={1}
      step={1}
      onValueChange={(v) => onValueChange(v[0])}
      className="[&>span:first-child]:h-1"
    />
  </div>
);

// --- Main Page Component ---
export default function TacticalEvaluationPage() {
  const [scores, setScores] = useState({
    decisionSpeed: 3,
    adaptation: 3,
    shotSelection: 3,
    positioning: 3,
  });

  const handleScoreChange = (skill: keyof typeof scores, value: number) => {
    setScores(prev => ({ ...prev, [skill]: value }));
  };

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM PENILAIAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            Evaluasi Taktik & Game Sense
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
            Formulir untuk menilai kecerdasan dan pengambilan keputusan atlet di lapangan.
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

        {/* TACTICAL ASSESSMENT */}
        <SectionCard title="Tactic & Game Sense Assessment" icon={BrainCircuit} description="Penilaian kualitas pengambilan keputusan (Skala 1-5).">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Pola Bermain Dominan</Label>
                <Select>
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-xl bg-zinc-950 border-zinc-800">
                        <SelectValue placeholder="Pilih pola bermain..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="agresif">Agresif (Attacking)</SelectItem>
                      <SelectItem value="rally">Rally (Defensive/Control)</SelectItem>
                      <SelectItem value="counter">Counter-Attack</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <RatingSlider label="Decision Making Speed" value={scores.decisionSpeed} onValueChange={(v) => handleScoreChange('decisionSpeed', v)} />
              <RatingSlider label="Adaptasi Terhadap Lawan" value={scores.adaptation} onValueChange={(v) => handleScoreChange('adaptation', v)} />
              <RatingSlider label="Shot Selection Quality" value={scores.shotSelection} onValueChange={(v) => handleScoreChange('shotSelection', v)} />
              <RatingSlider label="Awareness & Positioning" value={scores.positioning} onValueChange={(v) => handleScoreChange('positioning', v)} />
            </div>
        </SectionCard>

        {/* REKOMENDASI PELATIH */}
        <SectionCard title="Analisis & Rencana Pengembangan" icon={Target}>
            <Textarea placeholder="Analisa pola permainan dan tentukan area fokus untuk pengembangan taktik selanjutnya..." className="bg-zinc-950 border-zinc-800 rounded-xl h-32"/>
        </SectionCard>
        
        {/* SUBMIT */}
        <div className="flex justify-end pt-6 border-t border-border/20">
            <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
                <Save className="w-6 h-6 mr-3"/> Simpan Evaluasi Taktik
            </Button>
        </div>
      </form>
    </div>
  );
}
