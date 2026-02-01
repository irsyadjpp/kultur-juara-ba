'use client';

import { useState, useTransition } from "react";
import {
  UserSquare, Save, HeartPulse, Utensils, Bed, StickyNote, Loader2, ArrowLeft
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { submitNutritionLog } from "@/app/athletes/actions";
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


export default function AthleteNutritionLogPage() {
  const [sleepQuality, setSleepQuality] = useState(7);
  const [stressLevel, setStressLevel] = useState(4);
  const [readiness, setReadiness] = useState(8);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: any = {
      date: formData.get('date'),
      meals: formData.get('meals'), // Textarea
      sleepQuality,
      stressLevel,
      readiness,
      sleepDurationNight: formData.get('sleepDurationNight'),
      sleepDurationNap: formData.get('sleepDurationNap'),
      notes: formData.get('notes'),
    };

    startTransition(async () => {
      const res = await submitNutritionLog(data);
      if (res.success) {
        toast({ title: "Tersimpan", description: res.message, className: "bg-green-600 text-white" });
        router.push('/athletes/dashboard');
      } else {
        toast({ title: "Gagal", description: res.message, variant: "destructive" });
      }
    });
  };

  return (
    <div className="space-y-8 p-4 md:p-0 max-w-4xl mx-auto pb-24">
      <div className="space-y-2">
        <Link href="/athletes/dashboard" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Dashboard
        </Link>
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM LOG HARIAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
          Log Nutrisi & Recovery
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
          Pantau nutrisi dan kualitas istirahatmu.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        <SectionCard title="Waktu & Identitas" icon={UserSquare}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Tanggal Pencatatan</Label>
              <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="h-14 rounded-xl" />
            </div>
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <SectionCard title="Konsumsi Makanan" icon={Utensils} description="Menu makan utama hari ini.">
              <div className="space-y-4">
                <Textarea name="meals" placeholder="Sarapan: Nasi goreng, telur...&#10;Makan Siang: Ayam bakar, nasi, sayur...&#10;Makan Malam: Ikan, kentang..." className="rounded-xl h-40" />
              </div>
            </SectionCard>

            <SectionCard title="Recovery & Kesejahteraan" icon={HeartPulse} description="Kondisi fisik & mental.">
              <div className="space-y-6">
                <RatingSlider label="Kualitas Tidur (1-10)" value={sleepQuality} onValueChange={setSleepQuality} />
                <RatingSlider label="Tingkat Stres (1-10)" value={stressLevel} onValueChange={setStressLevel} />
                <RatingSlider label="Kesiapan Latihan (1-10)" value={readiness} onValueChange={setReadiness} />
              </div>
            </SectionCard>
          </div>

          <div className="space-y-8">
            <SectionCard title="Log Tidur" icon={Bed}>
              <div className="space-y-4">
                <MetricInput name="sleepDurationNight" label="Durasi Tidur Malam" unit="jam" />
                <MetricInput name="sleepDurationNap" label="Durasi Tidur Siang (Ops)" unit="menit" />
              </div>
            </SectionCard>

            <SectionCard title="Catatan Tambahan" icon={StickyNote}>
              <Textarea name="notes" placeholder="Catat konsumsi suplemen, keluhan fisik (pegal, cedera ringan), atau hal lain..." className="rounded-xl h-40" />
            </SectionCard>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-border">
          <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20" disabled={isPending}>
            {isPending ? <Loader2 className="w-6 h-6 mr-3 animate-spin" /> : <Save className="w-6 h-6 mr-3" />}
            Simpan Log Nutrisi
          </Button>
        </div>

      </form>
    </div>
  );
}
