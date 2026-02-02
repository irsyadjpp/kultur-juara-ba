'use client';

import { useState, useTransition } from "react";
import {
  User, Save, Calendar, Utensils, Moon, Dumbbell, Zap, Brain, HeartPulse, Shield, AlertTriangle, BookHeart, Footprints, Clock, Check, Bed, Loader2, ArrowLeft, Sun, Battery, Smile, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { submitJournalEntry } from "../actions";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator"; // Added Separator import

// --- MODERN COMPONENTS ---

const ModernSection = ({ title, icon: Icon, children, className, gradient = "from-primary/5 to-transparent" }: any) => (
  <div className={cn("relative overflow-hidden rounded-[2rem] border border-border/50 bg-secondary/20 backdrop-blur-2xl shadow-sm transition-all hover:shadow-md h-full", className)}>
    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30 pointer-events-none", gradient)} />
    <div className="relative p-5 md:p-6 space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-primary shadow-sm">
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-black font-headline tracking-tight uppercase text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  </div>
);

// Wrapper for energy bar with dynamic max
const DynamicEnergyBar = ({ value, onChange, label, max = 10, colorClass = "bg-primary" }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center px-1">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest truncate max-w-[70%]">{label}</span>
      <span className="font-black text-lg text-foreground">{value}<span className="text-[10px] text-muted-foreground">/{max}</span></span>
    </div>
    <Slider
      defaultValue={[value]}
      max={max}
      min={1}
      step={1}
      onValueChange={(v) => onChange(v[0])}
      className="py-1 cursor-pointer"
    />
    <div className="flex gap-1 h-1.5">
      {[...Array(max)].map((_, i) => (
        <div key={i} className={cn(
          "flex-1 rounded-full transition-colors",
          i < value ? colorClass : "bg-black/10 dark:bg-white/10"
        )} />
      ))}
    </div>
  </div>
);

const ModernCheckItem = ({ name, label, icon: Icon }: any) => (
  <div className="relative flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 group">
    <Label htmlFor={name} className="flex items-center gap-3 cursor-pointer z-10 flex-1">
      <div className="h-6 w-6 rounded-full bg-background/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
        <Icon className="w-3 h-3" />
      </div>
      <span className="font-bold text-foreground text-xs">{label}</span>
    </Label>
    <Switch id={name} name={name} className="scale-75 data-[state=checked]:bg-primary origin-right" />
  </div>
);

export default function AthleteSelfMonitoringPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const payload: any = {
      ...scores,
      selfTrainingTypes: []
    };

    formData.forEach((value, key) => {
      if (key === 'selfTrainingTypes') {
        payload.selfTrainingTypes.push(value);
      } else {
        // Convert 'on' to true for switches, else keep string
        payload[key] = value === 'on' ? true : value;
      }
    });

    startTransition(async () => {
      const result = await submitJournalEntry(payload);
      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Laporan harian berhasil disimpan.",
          className: "bg-green-600 text-white border-none"
        });
        router.push('/athletes/dashboard');
      } else {
        toast({
          title: "Gagal",
          description: result.message,
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="min-h-screen pb-32">
      {/* HEADER */}
      <div className="w-full p-6 pt-8 space-y-4">
        <Link href="/athletes/dashboard" className="inline-flex items-center text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>

        <div className="relative pt-4 max-w-4xl">
          {/* Decorative blurs */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px]" />
          <h1 className="relative text-4xl md:text-6xl font-black font-headline uppercase tracking-tighter text-foreground leading-[0.9]">
            Daily <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">& Athlete Log.</span>
          </h1>
          <p className="relative mt-3 text-lg text-muted-foreground font-medium leading-relaxed max-w-xl">
            Pantau kondisi fisik dan mentalmu setiap hari.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full px-4 md:px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-5">

          {/* COL 1: INFO & RECOVERY */}
          <div className="xl:col-span-4 space-y-5">
            <ModernSection title="General" icon={Calendar} gradient="from-emerald-500/5 to-teal-500/5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="uppercase text-[10px] font-bold tracking-widest text-muted-foreground">Tanggal</Label>
                  <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="h-10 rounded-xl bg-white/5 border-white/10 font-bold text-sm" required />
                </div>
                <div className="space-y-1.5">
                  <Label className="uppercase text-[10px] font-bold tracking-widest text-muted-foreground">Jenis Hari</Label>
                  <Select name="dayType" required>
                    <SelectTrigger className="h-10 rounded-xl bg-white/5 border-white/10 font-bold text-sm"><SelectValue placeholder="Pilih..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latihan_PB">Latihan di PB</SelectItem>
                      <SelectItem value="latihan_rumah">Latihan di Rumah</SelectItem>
                      <SelectItem value="libur">Libur / Istirahat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </ModernSection>

            <ModernSection title="Recovery" icon={Battery} gradient="from-green-500/5 to-emerald-500/5">
              <div className="space-y-5">
                {/* Sleep */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 font-bold text-muted-foreground text-xs uppercase tracking-widest"><Moon className="w-4 h-4" /> Sleep & Rest</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><Label className="text-[10px] text-muted-foreground uppercase">Tidur</Label><Input name="sleepTime" type="time" className="h-9 rounded-xl bg-white/5 border-white/10 text-sm" /></div>
                    <div className="space-y-1"><Label className="text-[10px] text-muted-foreground uppercase">Bangun</Label><Input name="wakeTime" type="time" className="h-9 rounded-xl bg-white/5 border-white/10 text-sm" /></div>
                  </div>
                  <ModernCheckItem name="tidur_awal" label="Tidur < 22:00" icon={Clock} />
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <DynamicEnergyBar label="Quality" value={scores.sleepQuality} onValueChange={(v: number) => handleScoreChange('sleepQuality', v)} max={5} colorClass="bg-indigo-400" />
                    <DynamicEnergyBar label="Freshness" value={scores.morningFatigue} onValueChange={(v: number) => handleScoreChange('morningFatigue', v)} max={5} colorClass="bg-orange-400" />
                  </div>
                </div>

                {/* Nutrition */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <Label className="flex items-center gap-2 font-bold text-muted-foreground text-xs uppercase tracking-widest"><Utensils className="w-4 h-4" /> Nutrition</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <ModernCheckItem name="makan_pagi" label="Breakfast" icon={Check} />
                    <ModernCheckItem name="makan_siang" label="Lunch" icon={Check} />
                    <ModernCheckItem name="makan_malam" label="Dinner" icon={Check} />
                    <ModernCheckItem name="cukup_air" label="Minum +2L" icon={Check} />
                    <ModernCheckItem name="makan_buah" label="Fruits" icon={Check} />
                  </div>
                </div>
              </div>
            </ModernSection>
          </div>

          {/* COL 2: TRAINING */}
          <div className="xl:col-span-4 space-y-5">
            <ModernSection title="Training" icon={Dumbbell} gradient="from-blue-500/5 to-cyan-500/5">
              <div className="space-y-5">
                {/* Main Training */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 font-bold text-muted-foreground text-xs uppercase tracking-widest"><Zap className="w-4 h-4" /> Main Session</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <ModernCheckItem name="hadir_latihan" label="Hadir" icon={Check} />
                    <Input name="trainingDuration" type="number" placeholder="Durasi (Min)" className="h-auto py-2 rounded-xl bg-white/5 border-white/10 font-bold text-sm text-center placeholder:text-muted-foreground/50" />
                  </div>
                  <DynamicEnergyBar label="Intensity" value={scores.trainingIntensity} onValueChange={(v: number) => handleScoreChange('trainingIntensity', v)} max={5} colorClass="bg-red-400" />
                  <DynamicEnergyBar label="Focus" value={scores.trainingFocus} onValueChange={(v: number) => handleScoreChange('trainingFocus', v)} max={5} colorClass="bg-blue-400" />
                </div>

                {/* Self Training */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <Label className="flex items-center gap-2 font-bold text-muted-foreground text-xs uppercase tracking-widest"><User className="w-4 h-4" /> Self Training</Label>
                  <div className="flex items-center gap-3">
                    <ModernCheckItem name="latihan_mandiri" label="Extra" icon={Check} />
                    <Input name="selfTrainingDuration" type="number" placeholder="Durasi (Min)" className="flex-1 h-auto py-2 rounded-xl bg-white/5 border-white/10 font-bold text-sm text-center placeholder:text-muted-foreground/50" />
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {selfTrainingTypes.map(item => (
                      <div key={item}>
                        <Checkbox id={`self-${item}`} name="selfTrainingTypes" value={item} className="sr-only peer" />
                        <Label
                          htmlFor={`self-${item}`}
                          className="inline-block px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 cursor-pointer capitalize text-[10px] font-bold text-muted-foreground transition-all peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-white/10"
                        >
                          {item}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ModernSection>

            <ModernSection title="Discipline" icon={Shield} gradient="from-purple-500/5 to-pink-500/5">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <ModernCheckItem name="tepat_waktu" label="On Time" icon={Clock} />
                  <ModernCheckItem name="atribut_lengkap" label="Full Gear" icon={Check} />
                  <ModernCheckItem name="bebas_rokok" label="No Smoke" icon={Check} />
                </div>
                <Separator className="bg-white/5" />
                <DynamicEnergyBar label="Attitude" value={scores.trainingAttitude} onValueChange={(v: number) => handleScoreChange('trainingAttitude', v)} max={5} colorClass="bg-purple-400" />
                <DynamicEnergyBar label="Obedience" value={scores.obeyedInstructions} onValueChange={(v: number) => handleScoreChange('obeyedInstructions', v)} max={5} colorClass="bg-purple-400" />
              </div>
            </ModernSection>
          </div>

          {/* COL 3: MENTAL & PHYSICAL */}
          <div className="xl:col-span-4 space-y-5">
            <ModernSection title="Mental" icon={Brain} gradient="from-pink-500/5 to-rose-500/5">
              <div className="space-y-4">
                <DynamicEnergyBar label="Mood" value={scores.mood} onValueChange={(v: number) => handleScoreChange('mood', v)} max={5} colorClass="bg-pink-400" />
                <DynamicEnergyBar label="Motivation" value={scores.motivation} onValueChange={(v: number) => handleScoreChange('motivation', v)} max={5} colorClass="bg-orange-400" />
                <DynamicEnergyBar label="Confidence" value={scores.confidence} onValueChange={(v: number) => handleScoreChange('confidence', v)} max={5} colorClass="bg-yellow-400" />

                <div className="space-y-1.5 pt-1">
                  <Label className="uppercase text-[10px] font-bold tracking-widest text-muted-foreground">Positive Highlight</Label>
                  <Textarea name="positiveNote" placeholder="Hal positif hari ini..." className="rounded-xl bg-white/5 border-white/10 min-h-[60px] text-sm" />
                </div>
              </div>
            </ModernSection>

            <ModernSection title="Physio Check" icon={Activity} gradient="from-red-500/5 to-orange-500/5">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <ModernCheckItem name="ada_keluhan" label="Injury?" icon={AlertTriangle} />
                  </div>
                  <Select name="painLocation">
                    <SelectTrigger className="h-auto py-2.5 flex-1 rounded-xl bg-white/5 border-white/10 font-bold text-xs"><SelectValue placeholder="Area..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tidak_ada">Aman</SelectItem>
                      <SelectItem value="kaki">Kaki</SelectItem>
                      <SelectItem value="lutut">Lutut</SelectItem>
                      <SelectItem value="bahu">Bahu</SelectItem>
                      <SelectItem value="punggung">Punggung</SelectItem>
                      <SelectItem value="lain">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>


                <DynamicEnergyBar label="Pain Level (0-10)" value={scores.painLevel} onValueChange={(v: number) => handleScoreChange('painLevel', v)} max={10} colorClass="bg-red-500" />

                <div className="space-y-1.5">
                  <Label className="uppercase text-[10px] font-bold tracking-widest text-muted-foreground">Detail</Label>
                  <Textarea name="additionalNote" placeholder="Keluhan detail..." className="rounded-xl bg-white/5 border-white/10 min-h-[60px] text-sm" />
                </div>
              </div>
            </ModernSection>

            <Button
              size="lg"
              className="w-full h-auto rounded-[2rem] text-xl font-black bg-foreground text-background hover:bg-foreground/90 shadow-2xl hover:scale-[1.02] transition-all p-6 md:mt-2"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <Save className="w-6 h-6 mr-3" />}
              SAVE JOURNAL
            </Button>
          </div>

        </div>
      </form>
    </div>
  );
}
