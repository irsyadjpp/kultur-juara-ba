
'use client';

import { useState } from "react";
import { 
  UserSquare, Save, Calendar, Clock, BarChart, Zap, Repeat, HeartPulse, StickyNote
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

// --- Reusable Components (assuming they are available in this context) ---
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

const MetricInput = ({ label, unit, ...props }: { label: string, unit: string } & React.ComponentProps<typeof Input>) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="flex items-center gap-2">
      <Input type="number" step="0.1" className="h-12 rounded-xl font-mono bg-secondary border" {...props} />
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


// --- Main Page Component ---
export default function TrainingLogPage() {
  const [intensity, setIntensity] = useState(5);

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM LOG LATIHAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            Daily Training Log
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
            Catat setiap sesi latihan atlet untuk analisis performa dan beban kerja.
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
                    <Label>Tanggal Latihan</Label>
                    <Input type="date" placeholder="Tanggal" className="h-14 rounded-xl bg-secondary border"/>
                </div>
                <div className="space-y-2">
                    <Label>Pelatih Penilai</Label>
                    <Input placeholder="Nama Pelatih" className="h-14 rounded-xl bg-secondary border"/>
                </div>
            </div>
        </SectionCard>

        {/* LOG DETAIL */}
        <SectionCard title="Detail Sesi Latihan" icon={BarChart} description="Catatan kuantitatif dan kualitatif dari sesi latihan.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                    <Label>Jenis Latihan</Label>
                    <Select>
                        <SelectTrigger className="h-12 rounded-xl bg-secondary border">
                          <SelectValue placeholder="Pilih jenis..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Teknik">Teknik</SelectItem>
                          <SelectItem value="Fisik">Fisik</SelectItem>
                          <SelectItem value="Game">Game / Sparring</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                
                <MetricInput label="Durasi (menit)" unit="min" />

                <div className="md:col-span-2">
                  <RatingSlider label="Intensitas (RPE 1-10)" value={intensity} onValueChange={setIntensity} max={10} />
                </div>
                
                <MetricInput label="Jumlah Set" unit="set" />
                <MetricInput label="Jumlah Rally (Avg)" unit="pukulan" />
                
                <div className="grid grid-cols-2 gap-4">
                  <MetricInput label="HR Avg" unit="bpm" />
                  <MetricInput label="HR Max" unit="bpm" />
                </div>
            </div>
        </SectionCard>

        {/* CATATAN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SectionCard title="Catatan Pelatih" icon={StickyNote}>
                <Textarea placeholder="Observasi, feedback, atau rencana untuk sesi berikutnya..." className="rounded-xl h-32 bg-secondary border"/>
            </SectionCard>
            <SectionCard title="Catatan Atlet" icon={UserSquare}>
                <Textarea placeholder="Bagaimana perasaan Anda hari ini? Apa yang dirasakan selama latihan? (Self-report)" className="rounded-xl h-32 bg-secondary border"/>
            </SectionCard>
        </div>
        
        {/* SUBMIT */}
        <div className="flex justify-end pt-6 border-t border-border">
            <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
                <Save className="w-6 h-6 mr-3"/> Simpan Log Latihan
            </Button>
        </div>
      </form>
    </div>
  );
}
