'use client';

import { useState, useTransition } from "react";
import {
  UserSquare, Save, BarChart, StickyNote, Loader2, ArrowLeft
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { submitTechnicalLog } from "@/app/athletes/actions";
import Link from 'next/link';

// --- Reusable Components ---
const SectionCard = ({ icon: Icon, title, description, children }: { icon: React.ElementType, title: string, description?: string, children: React.ReactNode }) => (
  <Card className="rounded-3xl shadow-xl border backdrop-blur-sm bg-card/60">
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

const MetricInput = ({ label, unit, name, ...props }: { label: string, unit: string, name: string } & React.ComponentProps<typeof Input>) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="flex items-center gap-2">
      <Input type="number" step="0.1" name={name} className="h-12 rounded-xl font-mono bg-secondary border" {...props} />
      <span className="text-sm font-mono text-muted-foreground">{unit}</span>
    </div>
  </div>
);

const RatingSlider = ({ label, value, onValueChange, max = 10, step = 1 }: { label: string, value: number, onValueChange: (value: number) => void, max?: number, step?: number }) => (
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


export default function TechnicalLogPage() {
  const [intensity, setIntensity] = useState(5);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: any = {
      date: formData.get('date'),
      trainingType: formData.get('trainingType'),
      duration: formData.get('duration'),
      intensity,
      sets: formData.get('sets'),
      rallies: formData.get('rallies'),
      hrAvg: formData.get('hrAvg'),
      hrMax: formData.get('hrMax'),
      coachNotes: formData.get('coachNotes'), // Might remain empty if athlete filling it? Or used for 'Self-Coach' check
      athleteNotes: formData.get('athleteNotes'),
    };

    startTransition(async () => {
      const result = await submitTechnicalLog(data);
      if (result.success) {
        toast({ title: "Tersimpan", description: result.message, className: "bg-green-600 text-white" });
        router.push('/athletes/dashboard');
      } else {
        toast({ title: "Gagal", description: result.message, variant: "destructive" });
      }
    });
  };

  return (
    <div className="space-y-8 p-4 md:p-0 max-w-4xl mx-auto pb-24">
      <div className="space-y-2">
        <Link href="/athletes/dashboard" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Dashboard
        </Link>
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM LOG LATIHAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
          Technical Training Log
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
          Catat detail teknis latihanmu hari ini.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        <SectionCard title="Sesi Latihan" icon={UserSquare}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Tanggal Latihan</Label>
              <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="h-14 rounded-xl bg-secondary border" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Detail Metrik" icon={BarChart} description="Isi sesuai data dari smartwatch atau hitungan manual.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <Label>Jenis Latihan Utama</Label>
              <Select name="trainingType" required>
                <SelectTrigger className="h-12 rounded-xl bg-secondary border">
                  <SelectValue placeholder="Pilih jenis..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Teknik">Teknik (Drill/Stroke)</SelectItem>
                  <SelectItem value="Fisik">Fisik (Agility/Endurance)</SelectItem>
                  <SelectItem value="Game">Game / Sparring</SelectItem>
                  <SelectItem value="Gabungan">Gabungan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <MetricInput name="duration" label="Durasi Total (menit)" unit="min" required />

            <div className="md:col-span-2">
              <RatingSlider label="Intensitas (RPE 1-10)" value={intensity} onValueChange={setIntensity} max={10} />
              <p className="text-xs text-muted-foreground mt-1 text-right">10 = Sangat Berat (Max Effort)</p>
            </div>

            <MetricInput name="sets" label="Jumlah Set / Reps Total" unit="set" />
            <MetricInput name="rallies" label="Rata-rata Reli (Opsional)" unit="pukulan" />

            <div className="grid grid-cols-2 gap-4">
              <MetricInput name="hrAvg" label="HR Avg" unit="bpm" />
              <MetricInput name="hrMax" label="HR Max" unit="bpm" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Catatan & Evaluasi" icon={StickyNote}>
          <div className="space-y-4">
            <Label>Apa yang dirasakan selama latihan? (Evaluasi Diri)</Label>
            <Textarea name="athleteNotes" placeholder="Teknik pukulan terasa lebih solid, atau kaki terasa berat, dll..." className="rounded-xl h-32 bg-secondary border" />
          </div>
        </SectionCard>

        <div className="flex justify-end pt-6 border-t border-border">
          <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20" disabled={isPending}>
            {isPending ? <Loader2 className="w-6 h-6 mr-3 animate-spin" /> : <Save className="w-6 h-6 mr-3" />}
            Simpan Log Teknis
          </Button>
        </div>
      </form>
    </div>
  );
}
