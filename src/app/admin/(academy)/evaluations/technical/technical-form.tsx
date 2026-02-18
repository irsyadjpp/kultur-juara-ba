'use client';

import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
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
import { toast } from "sonner";
import { saveTechnicalEvaluation, type AthleteSelectOption } from "../actions";

// --- Custom Components for this page ---
const SectionCard = ({ icon: Icon, title, description, children }: { icon: React.ElementType, title: string, description?: string, children: React.ReactNode }) => (
  <Card className="rounded-3xl shadow-xl">
    <CardHeader className="p-8 pb-4">
      <CardTitle className="text-xl font-headline flex items-center gap-3">
        <Icon className="w-6 h-6 text-primary" /> {title}
      </CardTitle>
      {description && <CardDescription className="pt-1">{description}</CardDescription>}
    </CardHeader>
    <CardContent className="p-8 pt-0">
      {children}
    </CardContent>
  </Card>
);

const StrokeSlider = ({ label, name, value, onValueChange }: { label: string, name: string, value: number, onValueChange: (value: number) => void }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <Label htmlFor={name}>{label}</Label>
      <span className="font-mono font-bold text-lg text-primary w-8 text-center">{value}</span>
    </div>
    <input type="hidden" name={name} value={String(value)} />
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

const StatInput = ({ label, unit, name, ...props }: { label: string, unit: string, name: string } & React.ComponentProps<typeof Input>) => (
  <div className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    <div className="flex items-center gap-2">
      <Input id={name} name={name} type="number" className="h-12 rounded-xl font-mono bg-secondary border" {...props} />
      <span className="text-sm font-mono text-muted-foreground">{unit}</span>
    </div>
  </div>
);

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="lg" disabled={pending} className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
      <Save className="w-6 h-6 mr-3" /> {pending ? 'Menyimpan...' : 'Simpan Evaluasi Teknik'}
    </Button>
  );
}


// --- Main Form Component ---
export default function TechnicalEvaluationForm({ athletes }: { athletes: AthleteSelectOption[] }) {
  const [state, formAction] = useFormState(saveTechnicalEvaluation, null);

  const [scores, setScores] = useState({
    tec_service_short: 3,
    tec_service_long: 3,
    tec_netting: 3,
    tec_lob: 3,
    tec_dropshot: 3,
    tec_smash: 3,
    tec_drive: 3,
    tec_defense: 3,
    tec_footwork: 3,
  });

  const handleScoreChange = (stroke: keyof typeof scores, value: number) => {
    setScores(prev => ({ ...prev, [stroke]: value }));
  };

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);


  return (
    <form action={formAction} className="space-y-8">

      {/* IDENTITAS ATLET & SESI */}
      <SectionCard title="Identitas Atlet & Sesi" icon={UserSquare}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label>Nama Atlet</Label>
            <Select name="athleteId" required>
              <SelectTrigger className="h-14 rounded-xl text-base bg-secondary border">
                <SelectValue placeholder="Pilih Atlet..." />
              </SelectTrigger>
              <SelectContent>
                {athletes.map((athlete) => (
                  <SelectItem key={athlete.id} value={athlete.id}>
                    {athlete.name} {athlete.nickname ? `(${athlete.nickname})` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Tanggal Evaluasi</Label>
            <Input name="date" type="date" required className="h-14 rounded-xl bg-secondary border" />
          </div>
          <div className="space-y-2">
            <Label>Pelatih Penilai</Label>
            <Input name="evaluator" placeholder="Nama Pelatih" className="h-14 rounded-xl bg-secondary border" />
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* STROKE ASSESSMENT */}
        <div className="space-y-8">
          <SectionCard title="Stroke Assessment" icon={Swords} description="Penilaian kualitas pukulan (Skala 1-5).">
            <div className="space-y-6">
              <StrokeSlider label="Servis Pendek" name="tec_service_short" value={scores.tec_service_short} onValueChange={(v) => handleScoreChange('tec_service_short', v)} />
              <StrokeSlider label="Servis Panjang" name="tec_service_long" value={scores.tec_service_long} onValueChange={(v) => handleScoreChange('tec_service_long', v)} />
              <StrokeSlider label="Netting" name="tec_netting" value={scores.tec_netting} onValueChange={(v) => handleScoreChange('tec_netting', v)} />
              <StrokeSlider label="Lob" name="tec_lob" value={scores.tec_lob} onValueChange={(v) => handleScoreChange('tec_lob', v)} />
              <StrokeSlider label="Dropshot" name="tec_dropshot" value={scores.tec_dropshot} onValueChange={(v) => handleScoreChange('tec_dropshot', v)} />
              <StrokeSlider label="Smash" name="tec_smash" value={scores.tec_smash} onValueChange={(v) => handleScoreChange('tec_smash', v)} />
              <StrokeSlider label="Drive" name="tec_drive" value={scores.tec_drive} onValueChange={(v) => handleScoreChange('tec_drive', v)} />
              <StrokeSlider label="Defense" name="tec_defense" value={scores.tec_defense} onValueChange={(v) => handleScoreChange('tec_defense', v)} />
              <StrokeSlider label="Footwork" name="tec_footwork" value={scores.tec_footwork} onValueChange={(v) => handleScoreChange('tec_footwork', v)} />
            </div>
          </SectionCard>
        </div>

        {/* STATISTIK LATIHAN */}
        <div className="space-y-8">
          <SectionCard title="Statistik Latihan (Objektif)" icon={BarChart3} description="Data kuantitatif dari sesi latihan khusus.">
            <div className="space-y-4">
              <StatInput label="Akurasi Smash" unit="%" name="stat_smash_accuracy" />
              <StatInput label="Error Rate" unit="per game" name="stat_error_rate" />
              <StatInput label="Konsistensi Rally" unit="pukulan" name="stat_rally_consistency" />
            </div>
          </SectionCard>
        </div>
      </div>

      {/* REKOMENDASI PELATIH */}
      <SectionCard title="Kesimpulan & Analisis" icon={Target}>
        <Textarea name="notes" placeholder="Analisa kekuatan dan kelemahan utama. Tentukan fokus latihan teknis untuk siklus berikutnya..." className="rounded-xl h-32 bg-secondary border" />
      </SectionCard>

      {/* SUBMIT */}
      <div className="flex justify-end pt-6 border-t border-border">
        <SubmitButton />
      </div>
    </form>
  );
}
