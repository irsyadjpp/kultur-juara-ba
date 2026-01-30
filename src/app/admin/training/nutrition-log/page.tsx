
'use client';

import { useState } from "react";
import { 
  UserSquare, Save, HeartPulse, Utensils, Bed, StickyNote
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

// --- Reusable Components ---
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
      <Input type="number" step="0.1" className="h-12 rounded-xl font-mono" {...props} />
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
export default function NutritionRecoveryLogPage() {
  const [sleepQuality, setSleepQuality] = useState(7);
  const [domsLevel, setDomsLevel] = useState(3);

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM LOG HARIAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            Log Nutrisi & Recovery
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
            Catat data harian di luar latihan untuk memonitor kondisi holistik atlet.
        </p>
      </div>

      <form className="space-y-8">
        
        {/* IDENTITAS ATLET & SESI */}
        <SectionCard title="Identitas Atlet & Tanggal" icon={UserSquare}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <Label>Nama Atlet</Label>
                    <Select><SelectTrigger className="h-14 rounded-xl text-base"><SelectValue placeholder="Pilih Atlet..." /></SelectTrigger><SelectContent><SelectItem value="irsyad">Irsyad JPP</SelectItem></SelectContent></Select>
                </div>
                 <div className="space-y-2">
                    <Label>Tanggal Pencatatan</Label>
                    <Input type="date" className="h-14 rounded-xl"/>
                </div>
                <div className="space-y-2">
                    <Label>Dicatat Oleh</Label>
                    <Input placeholder="Nama Atlet / Pelatih" className="h-14 rounded-xl"/>
                </div>
            </div>
        </SectionCard>

        {/* DATA LOG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SectionCard title="Log Nutrisi" icon={Utensils}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Pola Makan Harian</Label>
                        <Textarea placeholder="Catat menu sarapan, makan siang, makan malam, dan snack..." className="rounded-xl h-24"/>
                    </div>
                    <MetricInput label="Asupan Air" unit="liter" />
                    <div className="space-y-2">
                        <Label>Suplemen yang Dikonsumsi</Label>
                        <Textarea placeholder="Contoh: Creatine 5g, Whey Protein 1 scoop..." className="rounded-xl h-20"/>
                    </div>
                </div>
            </SectionCard>
            
            <SectionCard title="Log Recovery" icon={Bed} description="Data pemulihan setelah aktivitas berat.">
                <div className="space-y-6">
                     <MetricInput label="Jam Tidur" unit="jam" />
                     <RatingSlider label="Kualitas Tidur" value={sleepQuality} onValueChange={setSleepQuality} />
                     <RatingSlider label="Tingkat Nyeri Otot (DOMS)" value={domsLevel} onValueChange={setDomsLevel} />
                </div>
            </SectionCard>
        </div>
        
        {/* SUBMIT */}
        <div className="flex justify-end pt-6 border-t border-border">
            <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
                <Save className="w-6 h-6 mr-3"/> Simpan Log Harian
            </Button>
        </div>
      </form>
    </div>
  );
}
