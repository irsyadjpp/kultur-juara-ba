
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
export default function NutritionLogPage() {
    const [sleepQuality, setSleepQuality] = useState(7);
    const [stressLevel, setStressLevel] = useState(4);
    const [readiness, setReadiness] = useState(8);

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM LOG HARIAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            Log Nutrisi & Recovery
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
            Catatan harian nutrisi dan pemulihan untuk memaksimalkan performa atlet.
        </p>
      </div>

      <form className="space-y-8">
        
        {/* IDENTITAS ATLET */}
        <SectionCard title="Identitas Atlet & Sesi" icon={UserSquare}>
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
                    <Label>Dicatat oleh</Label>
                    <Select defaultValue="atlet">
                        <SelectTrigger className="h-14 rounded-xl text-base"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="atlet">Atlet (Self-report)</SelectItem>
                            <SelectItem value="pelatih">Pelatih</SelectItem>
                            <SelectItem value="ahli-gizi">Ahli Gizi</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
                 {/* KONSUMSI MAKANAN */}
                <SectionCard title="Konsumsi Makanan" icon={Utensils} description="Catatan menu makan utama hari ini.">
                    <div className="space-y-4">
                        <Textarea placeholder="Sarapan: Nasi goreng, telur...&#10;Makan Siang: Ayam bakar, nasi, sayur...&#10;Makan Malam: Ikan, kentang..." className="rounded-xl h-40"/>
                    </div>
                </SectionCard>
                
                {/* METRIK RECOVERY */}
                 <SectionCard title="Recovery & Kesejahteraan" icon={HeartPulse} description="Kondisi pemulihan dan tingkat stres.">
                    <div className="space-y-6">
                        <RatingSlider label="Kualitas Tidur (1-10)" value={sleepQuality} onValueChange={setSleepQuality} />
                        <RatingSlider label="Tingkat Stres (1-10)" value={stressLevel} onValueChange={setStressLevel} />
                        <RatingSlider label="Kesiapan Latihan (1-10)" value={readiness} onValueChange={setReadiness} />
                    </div>
                </SectionCard>
            </div>
            
            <div className="space-y-8">
                {/* LOG ISTIRAHAT */}
                <SectionCard title="Log Tidur & Istirahat" icon={Bed}>
                    <div className="space-y-4">
                       <MetricInput label="Durasi Tidur Malam" unit="jam" />
                       <MetricInput label="Durasi Tidur Siang (Ops)" unit="menit" />
                    </div>
                </SectionCard>

                {/* CATATAN TAMBAHAN */}
                <SectionCard title="Catatan Tambahan" icon={StickyNote}>
                    <Textarea placeholder="Catat konsumsi suplemen, keluhan fisik (pegal, cedera ringan), atau hal lain yang relevan..." className="rounded-xl h-40"/>
                </SectionCard>
            </div>
        </div>
        
        {/* SUBMIT */}
        <div className="flex justify-end pt-6 border-t border-border">
            <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
                <Save className="w-6 h-6 mr-3"/> Simpan Log Nutrisi
            </Button>
        </div>

      </form>
    </div>
  );
}
