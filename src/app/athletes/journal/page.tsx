
'use client';

import { useState } from "react";
import { 
  User, Save, Calendar, Utensils, Moon, Dumbbell, Zap, Brain, HeartPulse, Shield, AlertTriangle, BookHeart, Footprints, Clock, Check
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

// --- Reusable Components ---
const SectionCard = ({ icon: Icon, title, description, children, badge }: { icon: React.ElementType, title: string, description?: string, children: React.ReactNode, badge?:string }) => (
  <Card className="rounded-3xl shadow-lg border">
    <CardHeader className="p-6 md:p-8 pb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Icon className="w-6 h-6"/>
          </div>
          <div>
            <CardTitle className="text-xl font-headline"> {title} </CardTitle>
            {description && <CardDescription className="pt-1">{description}</CardDescription>}
          </div>
        </div>
        {badge && <Badge variant="outline">{badge}</Badge>}
      </div>
    </CardHeader>
    <CardContent className="p-6 md:p-8 pt-0">
      {children}
    </CardContent>
  </Card>
);

const RatingSlider = ({ label, value, onValueChange, min=1, max = 5, step = 1 }: { label: string, value: number, onValueChange: (value: number) => void, min?: number, max?: number, step?: number }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <Label>{label}</Label>
      <span className="font-mono font-bold text-lg text-primary w-10 text-center bg-secondary rounded-lg px-2 py-1">{value}</span>
    </div>
    <Slider defaultValue={[value]} min={min} max={max} step={step} onValueChange={(v) => onValueChange(v[0])} />
  </div>
);

const DomainSwitch = ({ label, icon: Icon }: { label: string, icon: React.ElementType }) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border">
        <Label htmlFor={label} className="flex items-center gap-3 cursor-pointer">
            <Icon className="w-5 h-5 text-muted-foreground" />
            <span className="font-semibold text-foreground">{label}</span>
        </Label>
        <Switch id={label} />
    </div>
)


export default function AthleteSelfMonitoringPage() {
  const [scores, setScores] = useState({
    sleepQuality: 3,
    morningFatigue: 3,
    trainingIntensity: 3,
    trainingFocus: 3,
    trainingAttitude: 3,
    obeyedInstructions: 3,
    mood: 3,
    motivation: 3,
    confidence: 3,
    painLevel: 0,
  });

  const handleScoreChange = (skill: keyof typeof scores, value: number) => {
    setScores(prev => ({ ...prev, [skill]: value }));
  };

  const selfTrainingTypes = ["stretching", "footwork", "core", "skipping", "shadow"];
  
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2 text-center pt-8">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">SELF-MONITORING</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            Daily Athlete Log
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg mx-auto">
            Isi setiap hari untuk memantau progres dan kondisimu. Kejujuranmu adalah kunci prestasimu.
        </p>
      </div>

      <form className="space-y-8">
        
        <SectionCard icon={Calendar} title="Metadata Log" description="Informasi dasar untuk pencatatan harian.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Tanggal</Label>
                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label>Jenis Hari</Label>
                    <Select>
                        <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Pilih Jenis Hari..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latihan_PB">Latihan di PB</SelectItem>
                            <SelectItem value="latihan_rumah">Latihan di Rumah</SelectItem>
                            <SelectItem value="libur">Libur / Istirahat</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </SectionCard>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SectionCard icon={Utensils} title="Domain Nutrisi">
                <div className="space-y-3">
                    <DomainSwitch label="Makan Pagi" icon={Check} />
                    <DomainSwitch label="Makan Siang" icon={Check} />
                    <DomainSwitch label="Makan Malam" icon={Check} />
                    <DomainSwitch label="Minum Air Cukup (≥6 Gelas)" icon={Check} />
                    <DomainSwitch label="Makan Buah" icon={Check} />
                    <DomainSwitch label="Snack Sehat" icon={Check} />
                </div>
            </SectionCard>
            
            <SectionCard icon={Moon} title="Domain Tidur & Recovery">
                 <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label>Jam Tidur</Label><Input type="time" className="h-12 rounded-xl"/></div>
                        <div className="space-y-2"><Label>Jam Bangun</Label><Input type="time" className="h-12 rounded-xl"/></div>
                    </div>
                    <DomainSwitch label="Tidur Sebelum Pukul 22:00" icon={Clock} />
                    <RatingSlider label="Kualitas Tidur" value={scores.sleepQuality} onValueChange={v => handleScoreChange('sleepQuality', v)} />
                    <RatingSlider label="Rasa Lelah di Pagi Hari" value={scores.morningFatigue} onValueChange={v => handleScoreChange('morningFatigue', v)} />
                 </div>
            </SectionCard>
        </div>

        <SectionCard icon={Dumbbell} title="Domain Latihan Utama (di PB)">
            <div className="space-y-6">
                <DomainSwitch label="Hadir Latihan" icon={Check} />
                <div className="space-y-2">
                    <Label>Durasi Latihan (menit)</Label>
                    <Input type="number" placeholder="cth: 120" className="h-12 rounded-xl" />
                </div>
                <RatingSlider label="Intensitas Latihan" value={scores.trainingIntensity} onValueChange={v => handleScoreChange('trainingIntensity', v)} />
                <RatingSlider label="Fokus Saat Latihan" value={scores.trainingFocus} onValueChange={v => handleScoreChange('trainingFocus', v)} />
                <DomainSwitch label="Mengikuti Program Pelatih" icon={Check} />
            </div>
        </SectionCard>

        <SectionCard icon={Footprints} title="Domain Latihan Mandiri (di Rumah)">
            <div className="space-y-6">
                <DomainSwitch label="Melakukan Latihan Mandiri" icon={Check} />
                 <div>
                    <Label className="mb-3 block">Jenis Latihan Mandiri</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selfTrainingTypes.map(item => (
                        <div key={item} className="flex items-center space-x-2 p-3 rounded-lg border bg-secondary/50">
                            <Checkbox id={`self-${item}`} value={item} />
                            <Label htmlFor={`self-${item}`} className="text-sm font-medium capitalize">{item}</Label>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Durasi Latihan Mandiri (menit)</Label>
                    <Input type="number" placeholder="cth: 30" className="h-12 rounded-xl" />
                </div>
            </div>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SectionCard icon={Shield} title="Domain Kedisiplinan">
                <div className="space-y-3">
                    <DomainSwitch label="Datang Tepat Waktu" icon={Clock} />
                    <DomainSwitch label="Atribut Latihan Lengkap" icon={Check} />
                    <DomainSwitch label="Bebas Rokok" icon={Check} />
                    <RatingSlider label="Sikap Saat Latihan" value={scores.trainingAttitude} onValueChange={v => handleScoreChange('trainingAttitude', v)} />
                    <RatingSlider label="Patuh Instruksi Pelatih" value={scores.obeyedInstructions} onValueChange={v => handleScoreChange('obeyedInstructions', v)} />
                </div>
            </SectionCard>
            <SectionCard icon={Brain} title="Domain Mental Positif">
                 <div className="space-y-6">
                    <RatingSlider label="Mood Hari Ini" value={scores.mood} onValueChange={v => handleScoreChange('mood', v)} />
                    <RatingSlider label="Motivasi Latihan" value={scores.motivation} onValueChange={v => handleScoreChange('motivation', v)} />
                    <RatingSlider label="Kepercayaan Diri" value={scores.confidence} onValueChange={v => handleScoreChange('confidence', v)} />
                    <div className="space-y-2">
                        <Label>Hal positif yang terjadi hari ini?</Label>
                        <Textarea placeholder="Contoh: berhasil melakukan smash silang, dipuji pelatih, dll." className="rounded-xl" />
                    </div>
                 </div>
            </SectionCard>
        </div>

        <SectionCard icon={HeartPulse} title="Domain Keluhan Fisik">
            <div className="space-y-6">
                <DomainSwitch label="Ada Keluhan Fisik?" icon={AlertTriangle} />
                <div className="space-y-2">
                    <Label>Lokasi Keluhan</Label>
                    <Select>
                        <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Pilih Lokasi..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="tidak_ada">Tidak Ada</SelectItem>
                            <SelectItem value="kaki">Kaki (Engkel/Telapak)</SelectItem>
                            <SelectItem value="lutut">Lutut</SelectItem>
                            <SelectItem value="bahu">Bahu</SelectItem>
                            <SelectItem value="punggung">Punggung / Pinggang</SelectItem>
                            <SelectItem value="lain">Lainnya</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <RatingSlider label="Tingkat Nyeri (0 jika tidak ada)" value={scores.painLevel} onValueChange={v => handleScoreChange('painLevel', v)} min={0} max={10} />
                <div className="space-y-2">
                    <Label>Catatan Tambahan (Opsional)</Label>
                    <Textarea placeholder="Jelaskan lebih detail keluhanmu atau catatan lain untuk pelatih/psikolog." className="rounded-xl" />
                </div>
            </div>
        </SectionCard>

        <div className="flex justify-center pt-6 border-t border-border">
            <Button size="lg" className="h-16 rounded-full font-bold text-lg px-12 shadow-lg shadow-primary/20 w-full max-w-md">
                <Save className="w-6 h-6 mr-3"/> Simpan Laporan Hari Ini
            </Button>
        </div>
      </form>
    </div>
  );
}
