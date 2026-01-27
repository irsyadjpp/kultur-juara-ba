
'use client';

import { useState } from "react";
import { 
  Dumbbell, Footprints, Shield, Zap, HeartPulse, 
  Bike, Target, User, Calendar, Save, Loader2 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Reusable component for scoring sections
const ScoreSection = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
  <Card className="bg-zinc-900 border-zinc-800 rounded-3xl">
    <CardHeader>
      <CardTitle className="flex items-center gap-3 font-headline text-lg">
        <Icon className="w-5 h-5 text-primary" /> {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      {children}
    </CardContent>
  </Card>
);

const ScoreToggle = ({ label, name }: { label: string, name: string }) => (
  <div className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800/50 rounded-lg">
    <Label htmlFor={`${name}-${label}`} className="text-sm font-medium">{label}</Label>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(val => (
        <button key={val} type="button" className="w-8 h-8 rounded-md bg-zinc-800 text-zinc-400 hover:bg-zinc-700 font-bold">{val}</button>
      ))}
    </div>
  </div>
);

const QuadToggle = ({ label, name }: { label: string, name: string }) => (
  <div className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800/50 rounded-lg">
    <Label className="text-sm font-medium">{label}</Label>
    <RadioGroup name={name} className="flex gap-1">
      {["Kurang", "Cukup", "Baik", "Sangat Baik"].map(val => (
        <Label key={val} className="px-2 py-1 text-xs rounded-md border border-zinc-700 bg-zinc-800 has-[:checked]:bg-primary has-[:checked]:text-white cursor-pointer">
          <RadioGroupItem value={val.toLowerCase()} className="sr-only" />
          {val}
        </Label>
      ))}
    </RadioGroup>
  </div>
);

export default function PhysicalEvaluationPage() {
  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30">FORM PENILAIAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
            Evaluasi Fisik Badminton (2 Mingguan)
        </h1>
        <p className="text-zinc-400 max-w-xl text-lg">
            Formulir ini digunakan untuk memantau progres fisik atlet menuju standar performa tinggi.
        </p>
      </div>

      <form className="space-y-8">
        {/* IDENTITAS ATLET */}
        <Card className="bg-zinc-900 border-zinc-800 rounded-3xl">
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label>Nama Atlet</Label>
              <Select><SelectTrigger className="h-12 bg-zinc-950 border-zinc-800 rounded-xl"><SelectValue placeholder="Pilih Atlet..." /></SelectTrigger><SelectContent><SelectItem value="irsyad">Irsyad JPP</SelectItem></SelectContent></Select>
            </div>
            <div className="space-y-2">
              <Label>Usia / Kategori</Label>
              <Input value="SMA" disabled className="h-12 bg-zinc-950 border-zinc-800 rounded-xl"/>
            </div>
            <div className="space-y-2">
              <Label>Periode Evaluasi</Label>
              <Input type="text" placeholder="Minggu ke- / Tanggal" className="h-12 bg-zinc-950 border-zinc-800 rounded-xl"/>
            </div>
            <div className="space-y-2">
              <Label>Pelatih Fisik</Label>
              <Input placeholder="Nama Pelatih" className="h-12 bg-zinc-950 border-zinc-800 rounded-xl"/>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
                {/* A. KONDISI UMUM */}
                <ScoreSection title="A. Kondisi Umum Atlet" icon={User}>
                    <ScoreToggle label="Kehadiran latihan" name="kehadiran" />
                    <ScoreToggle label="Motivasi latihan" name="motivasi" />
                    <ScoreToggle label="Fokus & disiplin" name="disiplin" />
                    <ScoreToggle label="Respons terhadap instruksi" name="respons" />
                    <Textarea placeholder="Catatan pelatih..." className="bg-zinc-950 border-zinc-800 rounded-lg"/>
                </ScoreSection>

                {/* B. MOBILITY & STABILITAS */}
                <ScoreSection title="B. Mobility & Stabilitas" icon={Bike}>
                    <QuadToggle label="Mobilitas ankle" name="ankle" />
                    <QuadToggle label="Mobilitas pinggul" name="hip" />
                    <QuadToggle label="Stabilitas lutut" name="knee" />
                    <QuadToggle label="Stabilitas core" name="core" />
                    <Textarea placeholder="Catatan risiko cedera..." className="bg-zinc-950 border-zinc-800 rounded-lg"/>
                </ScoreSection>

                 {/* C. FOOTWORK */}
                <ScoreSection title="C. Footwork & Movement Quality" icon={Footprints}>
                    <ScoreToggle label="Posisi badan rendah" name="posisi" />
                    <ScoreToggle label="Recovery ke tengah" name="recovery" />
                    <ScoreToggle label="Efisiensi langkah" name="efisiensi" />
                    <ScoreToggle label="Konsistensi saat lelah" name="konsistensi_lelah" />
                    <Textarea placeholder="Catatan teknis footwork..." className="bg-zinc-950 border-zinc-800 rounded-lg"/>
                </ScoreSection>
            </div>
            
            <div className="space-y-8">
                {/* D. KEKUATAN */}
                <ScoreSection title="D. Kekuatan (Strength)" icon={Dumbbell}>
                    <QuadToggle label="Kekuatan kaki" name="kaki" />
                    <QuadToggle label="Kekuatan core" name="core_strength" />
                    <QuadToggle label="Kekuatan bahu & lengan" name="lengan" />
                    <Textarea placeholder="Observasi khusus (ketimpangan, postur)..." className="bg-zinc-950 border-zinc-800 rounded-lg"/>
                </ScoreSection>

                {/* E. KECEPATAN & AGILITY */}
                <ScoreSection title="E. Kecepatan & Agility" icon={Zap}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-zinc-500">
                                    <th className="p-2">Tes</th><th className="p-2">Hasil</th><th className="p-2">Standar PB</th><th className="p-2 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {label: "Shuttle run (10-20m)"}, 
                                    {label: "Reaksi arah (coach call)"},
                                    {label: "Agility cone / ladder"}
                                ].map((item, i) => (
                                    <tr key={i} className="border-t border-zinc-800">
                                        <td className="p-2 font-bold">{item.label}</td>
                                        <td><Input className="h-9 bg-zinc-950 border-zinc-800 rounded-md" /></td>
                                        <td><Input className="h-9 bg-zinc-950 border-zinc-800 rounded-md" /></td>
                                        <td className="p-2 text-center"><Checkbox /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ScoreSection>
                
                 {/* F. DAYA TAHAN */}
                <ScoreSection title="F. Daya Tahan & Intensitas" icon={HeartPulse}>
                    <ScoreToggle label="Daya tahan rally" name="rally" />
                    <ScoreToggle label="Recovery antar set" name="recovery_set" />
                    <ScoreToggle label="Penurunan performa di akhir sesi" name="performa_akhir" />
                </ScoreSection>
                
                {/* G. KONDISI FISIK */}
                 <ScoreSection title="G. Kondisi Fisik & Kesehatan" icon={Shield}>
                    <div className="grid grid-cols-2 gap-3">
                      {["Nyeri lutut", "Nyeri ankle", "Nyeri bahu", "Kelelahan berlebih"].map(item => (
                          <div key={item} className="flex items-center p-3 border border-zinc-800/50 rounded-lg bg-zinc-950 justify-between">
                            <Label>{item}</Label>
                            <Checkbox />
                          </div>
                      ))}
                    </div>
                    <Textarea placeholder="Jika ada keluhan, jelaskan detailnya di sini..." className="bg-zinc-950 border-zinc-800 rounded-lg"/>
                </ScoreSection>

            </div>
        </div>

        {/* H. KESIMPULAN */}
        <ScoreSection title="H. Kesimpulan & Fokus Latihan" icon={Target}>
            <div className="space-y-4">
                <Label>Status Atlet (Kesimpulan)</Label>
                 <RadioGroup name="kesimpulan" className="grid grid-cols-3 gap-3">
                    <Label className="p-4 border rounded-lg cursor-pointer has-[:checked]:bg-green-600 has-[:checked]:text-white has-[:checked]:border-green-400">
                        <RadioGroupItem value="ON TRACK" className="sr-only"/>
                        <p className="font-bold">🟢 ON TRACK</p>
                    </Label>
                    <Label className="p-4 border rounded-lg cursor-pointer has-[:checked]:bg-yellow-500 has-[:checked]:text-black has-[:checked]:border-yellow-400">
                        <RadioGroupItem value="ADJUST" className="sr-only"/>
                        <p className="font-bold">🟡 PERLU PENYESUAIAN</p>
                    </Label>
                    <Label className="p-4 border rounded-lg cursor-pointer has-[:checked]:bg-red-600 has-[:checked]:text-white has-[:checked]:border-red-400">
                        <RadioGroupItem value="INTERVENE" className="sr-only"/>
                        <p className="font-bold">🔴 PERLU INTERVENSI</p>
                    </Label>
                </RadioGroup>
                
                <Label>Fokus 2 Minggu Ke Depan</Label>
                <Textarea placeholder="1. ...&#10;2. ...&#10;3. ..." className="bg-zinc-950 border-zinc-800 rounded-lg h-24" />
            </div>
        </ScoreSection>
        
        {/* SUBMIT */}
        <div className="flex justify-end pt-6 border-t border-zinc-800">
            <Button size="lg" className="h-14 rounded-full font-bold text-lg px-8 shadow-lg shadow-primary/20">
                <Save className="w-5 h-5 mr-3"/> Simpan Evaluasi
            </Button>
        </div>

      </form>
    </div>
  );
}
