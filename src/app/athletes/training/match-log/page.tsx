'use client';

import { useState, useTransition } from "react";
import {
  UserSquare, Save, Trophy, BarChart, Activity, Loader2, ArrowLeft
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { submitMatchLog } from "@/app/athletes/actions";
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


export default function AthleteMatchLogPage() {
  const [physicalCondition, setPhysicalCondition] = useState(7);
  const [mentalCondition, setMentalCondition] = useState(7);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: any = {
      tournamentName: formData.get('tournamentName'),
      level: formData.get('level'),
      date: formData.get('date'),
      matchId: formData.get('matchId'),
      opponentName: formData.get('opponentName'),
      scoreSet1: formData.get('scoreSet1'),
      scoreSet2: formData.get('scoreSet2'),
      scoreSet3: formData.get('scoreSet3'),
      result: formData.get('result'), // WIN / LOSS
      duration: formData.get('duration'),
      unforcedErrors: formData.get('unforcedErrors'),
      winners: formData.get('winners'),
      physicalCondition,
      mentalCondition,
      notes: formData.get('notes'),
    };

    startTransition(async () => {
      const res = await submitMatchLog(data);
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
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM LOG PERTANDINGAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
          Match & Tournament Log
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
          Catat hasil pertandingan resmi sebagai tolok ukur performa.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        <SectionCard title="Info Pertandingan" icon={Trophy}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Nama Turnamen</Label>
              <Input name="tournamentName" placeholder="Cth: Sirnas A Bandung" className="h-14 rounded-xl bg-secondary border" required />
            </div>
            <div className="space-y-2">
              <Label>Level Kompetisi</Label>
              <Select name="level" required>
                <SelectTrigger className="h-14 rounded-xl text-base bg-secondary border"><SelectValue placeholder="Pilih Level..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Internal">Internal (Sparring)</SelectItem>
                  <SelectItem value="Kota">Kota / Kabupaten</SelectItem>
                  <SelectItem value="Provinsi">Provinsi / Kejurprov</SelectItem>
                  <SelectItem value="Nasional">Nasional / Sirnas</SelectItem>
                  <SelectItem value="Internasional">Internasional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tanggal Pertandingan</Label>
              <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="h-14 rounded-xl bg-secondary border" />
            </div>
            <div className="space-y-2">
              <Label>Nomor Match / Lapangan (Opsional)</Label>
              <Input name="matchId" placeholder="cth: M-032 / Court 1" className="h-14 rounded-xl bg-secondary border" />
            </div>
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SectionCard title="Skor & Hasil" icon={BarChart}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nama Lawan</Label>
                <Input name="opponentName" placeholder="Cth: Taufik Hidayat" className="h-12 rounded-xl bg-secondary border" required />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Input name="scoreSet1" placeholder="Set 1 (21-19)" className="h-12 rounded-xl text-center bg-secondary border" />
                <Input name="scoreSet2" placeholder="Set 2" className="h-12 rounded-xl text-center bg-secondary border" />
                <Input name="scoreSet3" placeholder="Set 3" className="h-12 rounded-xl text-center bg-secondary border" />
              </div>
              <RadioGroup name="result" defaultValue="WIN" className="flex pt-2 gap-4">
                <div className="flex-1">
                  <RadioGroupItem value="WIN" id="win" className="peer sr-only" />
                  <Label htmlFor="win" className="flex items-center justify-center gap-2 p-3 bg-secondary border-2 border-transparent rounded-xl cursor-pointer peer-data-[state=checked]:bg-green-500/10 peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:text-green-600 font-bold transition-all">
                    WIN
                  </Label>
                </div>
                <div className="flex-1">
                  <RadioGroupItem value="LOSS" id="loss" className="peer sr-only" />
                  <Label htmlFor="loss" className="flex items-center justify-center gap-2 p-3 bg-secondary border-2 border-transparent rounded-xl cursor-pointer peer-data-[state=checked]:bg-red-500/10 peer-data-[state=checked]:border-red-500 peer-data-[state=checked]:text-red-600 font-bold transition-all">
                    LOSS
                  </Label>
                </div>
              </RadioGroup>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <MetricInput name="duration" label="Durasi (m)" unit="min" />
                <MetricInput name="unforcedErrors" label="Error Sendiri" unit="kali" />
                <MetricInput name="winners" label="Winner Point" unit="kali" />
              </div>
            </div>
          </SectionCard>

          <div className="space-y-8">
            <SectionCard title="Kondisi" icon={Activity} description="Evaluasi diri setelah pertandingan.">
              <div className="space-y-8">
                <RatingSlider label="Kondisi Fisik Saat Main" value={physicalCondition} onValueChange={setPhysicalCondition} />
                <RatingSlider label="Kondisi Mental / Fokus" value={mentalCondition} onValueChange={setMentalCondition} />
              </div>
            </SectionCard>

            <SectionCard title="Catatan" icon={UserSquare}>
              <Textarea name="notes" placeholder="Apa strategi yang berhasil? Apa yang perlu diperbaiki?" className="rounded-xl h-32 bg-secondary border" />
            </SectionCard>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-border">
          <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20" disabled={isPending}>
            {isPending ? <Loader2 className="w-6 h-6 mr-3 animate-spin" /> : <Save className="w-6 h-6 mr-3" />}
            Simpan Log Match
          </Button>
        </div>
      </form>
    </div>
  );
}
