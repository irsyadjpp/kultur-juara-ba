
'use client';

import { useState } from "react";
import { 
  UserSquare, Save, Trophy, BarChart, Server, Activity, BrainCircuit, Calendar, Sword
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


// --- Reusable Components (assuming they are available in this context) ---
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

const MetricInput = ({ label, unit, ...props }: { label: string, unit: string } & React.ComponentProps<typeof Input>) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="flex items-center gap-2">
      <Input type="number" step="0.1" className="h-12 rounded-xl bg-zinc-950 border-zinc-800 font-mono" {...props} />
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
export default function MatchLogPage() {
  const [physicalCondition, setPhysicalCondition] = useState(7);
  const [mentalCondition, setMentalCondition] = useState(7);

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM LOG PERTANDINGAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            Match & Tournament Log
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
            Catat hasil pertandingan resmi sebagai tolok ukur performa puncak.
        </p>
      </div>

      <form className="space-y-8">
        
        {/* IDENTITAS ATLET & PERTANDINGAN */}
        <SectionCard title="Identitas Pertandingan" icon={Trophy}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <Label>Nama Atlet</Label>
                    <Select><SelectTrigger className="h-14 rounded-xl bg-zinc-950 border-zinc-800 text-base"><SelectValue placeholder="Pilih Atlet..." /></SelectTrigger><SelectContent><SelectItem value="irsyad">Irsyad JPP</SelectItem></SelectContent></Select>
                </div>
                 <div className="space-y-2">
                    <Label>Nama Turnamen</Label>
                    <Input placeholder="Cth: Sirnas A Bandung" className="h-14 rounded-xl bg-zinc-950 border-zinc-800"/>
                </div>
                <div className="space-y-2">
                    <Label>Level Kompetisi</Label>
                    <Select>
                        <SelectTrigger className="h-14 rounded-xl bg-zinc-950 border-zinc-800 text-base"><SelectValue placeholder="Pilih Level..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="internal">Internal</SelectItem>
                            <SelectItem value="kota">Kota</SelectItem>
                            <SelectItem value="provinsi">Provinsi</SelectItem>
                            <SelectItem value="nasional">Nasional</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label>Tanggal Pertandingan</Label>
                    <Input type="date" className="h-14 rounded-xl bg-zinc-950 border-zinc-800"/>
                </div>
                <div className="space-y-2">
                    <Label>Nomor Pertandingan (Match ID)</Label>
                    <Input placeholder="cth: M-032" className="h-14 rounded-xl bg-zinc-950 border-zinc-800"/>
                </div>
            </div>
        </SectionCard>

        {/* HASIL & STATISTIK */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SectionCard title="Hasil & Statistik" icon={BarChart}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Nama Lawan</Label>
                        <Input placeholder="Cth: Taufik Hidayat" className="h-12 rounded-xl bg-zinc-950 border-zinc-800"/>
                    </div>
                     <div className="grid grid-cols-3 gap-2">
                        <Input placeholder="Set 1 (Anda-Lawan)" className="h-12 rounded-xl bg-zinc-950 border-zinc-800 text-center"/>
                        <Input placeholder="Set 2" className="h-12 rounded-xl bg-zinc-950 border-zinc-800 text-center"/>
                        <Input placeholder="Set 3 (Ops)" className="h-12 rounded-xl bg-zinc-950 border-zinc-800 text-center"/>
                    </div>
                    <RadioGroup className="flex pt-2">
                        <Label className="flex items-center gap-2 p-3 bg-green-950/20 border border-green-500/20 rounded-lg cursor-pointer">
                            <RadioGroupItem value="WIN" id="win" /> Menang
                        </Label>
                        <Label className="flex items-center gap-2 p-3 bg-red-950/20 border border-red-500/20 rounded-lg cursor-pointer">
                            <RadioGroupItem value="LOSS" id="loss" /> Kalah
                        </Label>
                    </RadioGroup>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                        <MetricInput label="Durasi (menit)" unit="min"/>
                        <MetricInput label="Error" unit="kali"/>
                        <MetricInput label="Winner" unit="kali"/>
                    </div>
                </div>
            </SectionCard>
            
            <SectionCard title="Kondisi Saat Tanding" icon={Activity} description="Self-report atlet setelah pertandingan (Skala 1-10).">
                <div className="space-y-8">
                     <RatingSlider label="Kondisi Fisik" value={physicalCondition} onValueChange={setPhysicalCondition} />
                     <RatingSlider label="Kondisi Mental" value={mentalCondition} onValueChange={setMentalCondition} />
                </div>
            </SectionCard>
        </div>
        
        {/* SUBMIT */}
        <div className="flex justify-end pt-6 border-t border-border/20">
            <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
                <Save className="w-6 h-6 mr-3"/> Simpan Log Pertandingan
            </Button>
        </div>
      </form>
    </div>
  );
}

