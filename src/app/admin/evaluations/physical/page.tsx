
'use client';

import { useState } from "react";
import { 
  Dumbbell, Footprints, Shield, Zap, HeartPulse, 
  Bike, Target, User, Calendar, Save, Loader2, Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

// --- MD3 Style Components ---

const AssessmentCard = ({ icon: Icon, title, description, children, className }: { icon: React.ElementType, title: string, description?: string, children: React.ReactNode, className?: string }) => (
  <Card className={cn("rounded-[1.75rem] border-border/50 bg-card/80 backdrop-blur-md shadow-lg", className)}>
    <CardHeader className="pb-4">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-xl mt-1">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <CardTitle className="font-headline text-lg text-foreground">{title}</CardTitle>
          {description && <CardDescription className="text-sm mt-1">{description}</CardDescription>}
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      {children}
    </CardContent>
  </Card>
);

const RatingScale = ({ label, name, value, onChange }: { label: string, name: string, value: number, onChange: (val: number) => void }) => (
  <div>
    <Label className="text-sm font-medium text-muted-foreground ml-1">{label}</Label>
    <div className="mt-2 flex gap-1 p-1 bg-secondary/50 rounded-full border">
      {[1, 2, 3, 4, 5].map((val) => (
        <TooltipProvider key={val} delayDuration={100}>
           <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => onChange(val)}
                  className={cn(
                    "flex-1 h-10 rounded-full font-bold text-lg transition-all",
                    value === val 
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-secondary"
                  )}
                >
                  {val}
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-800 text-white border-zinc-700">
                <p>Skor {val}</p>
              </TooltipContent>
           </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  </div>
);

const SegmentedButton = ({ label, name, options, value, onChange }: { label: string, name: string, options: string[], value: string, onChange: (val: string) => void }) => (
  <div>
    <Label className="text-sm font-medium text-muted-foreground ml-1">{label}</Label>
    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "h-11 rounded-lg text-xs font-bold transition-colors border-2",
            value === opt
              ? "bg-primary/10 text-primary border-primary/50"
              : "bg-secondary/50 border-transparent hover:bg-secondary"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const HealthCheckbox = ({ label, name, checked, onChange }: { label: string, name: string, checked: boolean, onChange: (checked: boolean) => void }) => (
    <div 
        onClick={() => onChange(!checked)}
        className={cn("flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all",
        checked ? "bg-red-500/10 text-red-500 border-red-500/30" : "bg-secondary/50 border-transparent"
    )}>
        <Label className="font-semibold cursor-pointer">{label}</Label>
        <Checkbox checked={checked} onCheckedChange={onChange} className="h-5 w-5"/>
    </div>
);

export default function PhysicalEvaluationPage() {
  const [formState, setFormState] = useState({
      kehadiran: 0, motivasi: 0, disiplin: 0, respons: 0,
      ankle: '', hip: '', knee: '', core: '',
      posisi: 0, recovery: 0, efisiensi: 0, konsistensi_lelah: 0,
      kaki: '', core_strength: '', lengan: '',
      shuttleRun: '', shuttleRunStandar: '', shuttleRunOk: false,
      reaksi: '', reaksiStandar: '', reaksiOk: false,
      agility: '', agilityStandar: '', agilityOk: false,
      rally: 0, recovery_set: 0, performa_akhir: 0,
      nyeriLutut: false, nyeriAnkle: false, nyeriBahu: false, kelelahan: false,
      kesimpulan: '',
  });

  const handleStateChange = (field: string, value: any) => {
      setFormState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM PENILAIAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            Evaluasi Fisik Badminton (2 Mingguan)
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
            Formulir ini digunakan untuk memantau progres fisik atlet menuju standar performa tinggi.
        </p>
      </div>

      <form className="space-y-8">
        {/* IDENTITAS ATLET */}
        <AssessmentCard title="Identitas Atlet" icon={User} description="Pilih atlet dan periode evaluasi.">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2 lg:col-span-2">
                    <Label>Nama Atlet</Label>
                    <Select><SelectTrigger className="h-14 rounded-xl bg-secondary/50 text-base"><SelectValue placeholder="Pilih Atlet..." /></SelectTrigger><SelectContent><SelectItem value="irsyad">Irsyad JPP</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-2">
                    <Label>Kategori</Label>
                    <Input value="SMA" disabled className="h-14 rounded-xl bg-secondary/30 font-bold"/>
                </div>
                <div className="space-y-2">
                    <Label>Periode Evaluasi</Label>
                    <Input type="text" placeholder="Minggu ke- / Tanggal" className="h-14 rounded-xl bg-secondary/50"/>
                </div>
                <div className="space-y-2 lg:col-span-2">
                    <Label>Pelatih Fisik</Label>
                    <Input placeholder="Nama Pelatih" className="h-14 rounded-xl bg-secondary/50"/>
                </div>
            </div>
        </AssessmentCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
                {/* A. KONDISI UMUM */}
                <AssessmentCard title="A. Kondisi Umum Atlet" icon={User}>
                    <RatingScale label="Kehadiran latihan" name="kehadiran" value={formState.kehadiran} onChange={(v) => handleStateChange('kehadiran', v)} />
                    <RatingScale label="Motivasi latihan" name="motivasi" value={formState.motivasi} onChange={(v) => handleStateChange('motivasi', v)} />
                    <RatingScale label="Fokus & disiplin" name="disiplin" value={formState.disiplin} onChange={(v) => handleStateChange('disiplin', v)} />
                    <RatingScale label="Respons terhadap instruksi" name="respons" value={formState.respons} onChange={(v) => handleStateChange('respons', v)} />
                    <Textarea placeholder="Catatan pelatih..." className="bg-secondary/50 rounded-xl border-border/50"/>
                </AssessmentCard>

                {/* B. MOBILITY & STABILITAS */}
                <AssessmentCard title="B. Mobility & Stabilitas" icon={Bike}>
                    <SegmentedButton label="Mobilitas ankle" name="ankle" options={["Kurang", "Cukup", "Baik", "Sangat Baik"]} value={formState.ankle} onChange={(v) => handleStateChange('ankle', v)} />
                    <SegmentedButton label="Mobilitas pinggul" name="hip" options={["Kurang", "Cukup", "Baik", "Sangat Baik"]} value={formState.hip} onChange={(v) => handleStateChange('hip', v)} />
                    <SegmentedButton label="Stabilitas lutut" name="knee" options={["Kurang", "Cukup", "Baik", "Sangat Baik"]} value={formState.knee} onChange={(v) => handleStateChange('knee', v)} />
                    <SegmentedButton label="Stabilitas core" name="core" options={["Kurang", "Cukup", "Baik", "Sangat Baik"]} value={formState.core} onChange={(v) => handleStateChange('core', v)} />
                    <Textarea placeholder="Catatan risiko cedera..." className="bg-secondary/50 rounded-xl border-border/50"/>
                </AssessmentCard>

                 {/* C. FOOTWORK */}
                <AssessmentCard title="C. Footwork & Movement Quality" icon={Footprints}>
                    <RatingScale label="Posisi badan rendah" name="posisi" value={formState.posisi} onChange={(v) => handleStateChange('posisi', v)} />
                    <RatingScale label="Recovery ke tengah" name="recovery" value={formState.recovery} onChange={(v) => handleStateChange('recovery', v)} />
                    <RatingScale label="Efisiensi langkah" name="efisiensi" value={formState.efisiensi} onChange={(v) => handleStateChange('efisiensi', v)} />
                    <RatingScale label="Konsistensi saat lelah" name="konsistensi_lelah" value={formState.konsistensi_lelah} onChange={(v) => handleStateChange('konsistensi_lelah', v)} />
                    <Textarea placeholder="Catatan teknis footwork..." className="bg-secondary/50 rounded-xl border-border/50"/>
                </AssessmentCard>
            </div>
            
            <div className="space-y-8">
                {/* D. KEKUATAN */}
                <AssessmentCard title="D. Kekuatan (Strength)" icon={Dumbbell}>
                    <SegmentedButton label="Kekuatan kaki" name="kaki" options={["Kurang", "Cukup", "Baik", "Sangat Baik"]} value={formState.kaki} onChange={(v) => handleStateChange('kaki', v)} />
                    <SegmentedButton label="Kekuatan core" name="core_strength" options={["Kurang", "Cukup", "Baik", "Sangat Baik"]} value={formState.core_strength} onChange={(v) => handleStateChange('core_strength', v)} />
                    <SegmentedButton label="Kekuatan bahu & lengan" name="lengan" options={["Kurang", "Cukup", "Baik", "Sangat Baik"]} value={formState.lengan} onChange={(v) => handleStateChange('lengan', v)} />
                    <Textarea placeholder="Observasi khusus (ketimpangan, postur)..." className="bg-secondary/50 rounded-xl border-border/50"/>
                </AssessmentCard>

                {/* E. KECEPATAN & AGILITY */}
                <AssessmentCard title="E. Kecepatan & Agility" icon={Zap}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-muted-foreground">
                                    <th className="p-2">Tes</th><th className="p-2">Hasil</th><th className="p-2 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {label: "Shuttle run (10-20m)", name: 'shuttleRun'}, 
                                    {label: "Reaksi arah (coach call)", name: 'reaksi'},
                                    {label: "Agility cone / ladder", name: 'agility'}
                                ].map((item, i) => (
                                    <tr key={i} className="border-t border-border/50">
                                        <td className="p-2 font-bold">{item.label}</td>
                                        <td><Input className="h-10 bg-secondary/50 rounded-lg" /></td>
                                        <td className="p-2 text-center"><Checkbox /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </AssessmentCard>
                
                 {/* F. DAYA TAHAN */}
                <AssessmentCard title="F. Daya Tahan & Intensitas" icon={HeartPulse}>
                    <RatingScale label="Daya tahan rally" name="rally" value={formState.rally} onChange={(v) => handleStateChange('rally', v)} />
                    <RatingScale label="Recovery antar set" name="recovery_set" value={formState.recovery_set} onChange={(v) => handleStateChange('recovery_set', v)} />
                    <RatingScale label="Penurunan performa di akhir sesi" name="performa_akhir" value={formState.performa_akhir} onChange={(v) => handleStateChange('performa_akhir', v)} />
                </AssessmentCard>
                
                {/* G. KONDISI FISIK */}
                 <AssessmentCard title="G. Kondisi Fisik & Kesehatan" icon={Shield}>
                    <div className="grid grid-cols-2 gap-3">
                      <HealthCheckbox label="Nyeri lutut" name="nyeriLutut" checked={formState.nyeriLutut} onChange={(c) => handleStateChange('nyeriLutut', c)} />
                      <HealthCheckbox label="Nyeri ankle" name="nyeriAnkle" checked={formState.nyeriAnkle} onChange={(c) => handleStateChange('nyeriAnkle', c)} />
                      <HealthCheckbox label="Nyeri bahu" name="nyeriBahu" checked={formState.nyeriBahu} onChange={(c) => handleStateChange('nyeriBahu', c)} />
                      <HealthCheckbox label="Kelelahan berlebih" name="kelelahan" checked={formState.kelelahan} onChange={(c) => handleStateChange('kelelahan', c)} />
                    </div>
                    <Textarea placeholder="Jika ada keluhan, jelaskan detailnya di sini..." className="bg-secondary/50 rounded-xl border-border/50"/>
                </AssessmentCard>

            </div>
        </div>

        {/* H. KESIMPULAN */}
        <AssessmentCard title="H. Kesimpulan & Fokus Latihan" icon={Target}>
            <div className="space-y-4">
                <Label className="font-bold">Status Atlet (Kesimpulan)</Label>
                 <RadioGroup value={formState.kesimpulan} onValueChange={(v) => handleStateChange('kesimpulan', v)} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Label className="p-5 border-2 rounded-xl cursor-pointer has-[:checked]:border-green-500/50 has-[:checked]:bg-green-500/10 flex items-center gap-3">
                        <RadioGroupItem value="ON TRACK"/>
                        <span className="font-bold text-green-500">🟢 ON TRACK</span>
                    </Label>
                    <Label className="p-5 border-2 rounded-xl cursor-pointer has-[:checked]:border-yellow-500/50 has-[:checked]:bg-yellow-500/10 flex items-center gap-3">
                        <RadioGroupItem value="ADJUST"/>
                        <span className="font-bold text-yellow-500">🟡 PERLU PENYESUAIAN</span>
                    </Label>
                     <Label className="p-5 border-2 rounded-xl cursor-pointer has-[:checked]:border-red-500/50 has-[:checked]:bg-red-500/10 flex items-center gap-3">
                        <RadioGroupItem value="INTERVENE"/>
                        <span className="font-bold text-red-500">🔴 PERLU INTERVENSI</span>
                    </Label>
                </RadioGroup>
                
                <div>
                    <Label className="font-bold">Fokus 2 Minggu Ke Depan</Label>
                    <Textarea placeholder="1. Peningkatan kekuatan core\n2. Latihan agility dengan ladder drill\n3. Pemantauan recovery lutut" className="bg-secondary/50 rounded-xl border-border/50 h-28 mt-2" />
                </div>
            </div>
        </AssessmentCard>
        
        {/* SUBMIT */}
        <div className="flex justify-end pt-6 border-t border-border/50">
            <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
                <Save className="w-6 h-6 mr-3"/> Simpan Evaluasi
            </Button>
        </div>

      </form>
    </div>
  );
}
