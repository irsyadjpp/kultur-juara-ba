'use client';

import { useState, useTransition } from "react";
import {
  Save, BarChart, StickyNote, Loader2, ArrowLeft,
  UserSquare, Calendar, Dumbbell, Activity, Timer, Heart, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { submitTechnicalLog } from "@/app/athletes/actions";
import Link from 'next/link';

// --- MODERN COMPONENTS ---

const ModernSection = ({ title, icon: Icon, children, className, gradient = "from-primary/5 to-transparent" }: any) => (
  <div className={cn("relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-secondary/20 backdrop-blur-2xl shadow-sm transition-all hover:shadow-md", className)}>
    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30 pointer-events-none", gradient)} />
    <div className="relative p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-14 w-14 rounded-2xl bg-background/50 flex items-center justify-center border border-border/50 text-primary shadow-sm">
          <Icon className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black font-headline tracking-tight uppercase text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  </div>
);

const EnergyBar = ({ value, onChange, labelLeft = "Low", labelRight = "Peak", colorClass = "bg-primary" }: any) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center px-2">
      <span className="text-xs font-bold text-muted-foreground uppercase">{labelLeft}</span>
      <span className="font-black text-4xl text-foreground">{value}<span className="text-sm text-muted-foreground font-medium">/10</span></span>
      <span className="text-xs font-bold text-muted-foreground uppercase">{labelRight}</span>
    </div>
    <Slider
      defaultValue={[value]}
      max={10}
      min={1}
      step={1}
      onValueChange={(v) => onChange(v[0])}
      className="py-4 cursor-pointer"
    />
    <div className="flex justify-between gap-1">
      {[...Array(10)].map((_, i) => (
        <div key={i} className={cn(
          "h-3 flex-1 rounded-full transition-colors",
          i < value ? colorClass : "bg-black/10 dark:bg-white/10"
        )} />
      ))}
    </div>
  </div>
);

export default function TechnicalLogPage() {
  const [intensity, setIntensity] = useState(5);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: any = {
      date: formData.get('date'),
      trainingType: formData.get('trainingType'),
      duration: formData.get('duration'),
      intensity,
      sets: formData.get('sets'),
      rallies: formData.get('rallies'),
      hrAvg: formData.get('hrAvg'),
      hrMax: formData.get('hrMax'),
      coachNotes: formData.get('coachNotes'),
      athleteNotes: formData.get('athleteNotes'),
    };

    startTransition(async () => {
      const result = await submitTechnicalLog(data);
      if (result.success) {
        toast({ title: "Tersimpan", description: "Log teknis berhasil disimpan.", className: "bg-green-600 text-white border-none" });
        router.push('/athletes/dashboard');
      } else {
        toast({ title: "Gagal", description: result.message, variant: "destructive" });
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

        <div className="relative pt-6 max-w-4xl">
          {/* Decorative blurs */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[80px]" />
          <h1 className="relative text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter text-foreground leading-[0.9]">
            Technical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">& Skills Log.</span>
          </h1>
          <p className="relative mt-4 text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
            Catat detail teknis, metrik fisik, dan evaluasi latihanmu hari ini.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* LEFT COLUMN: INFO & METRICS */}
          <div className="xl:col-span-8 space-y-6">
            <ModernSection title="Session Info" icon={Calendar} gradient="from-blue-500/5 to-cyan-500/5">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Jenis Latihan Utama</Label>
                  <Select name="trainingType" required>
                    <SelectTrigger className="h-14 rounded-xl bg-white/5 border-white/10 font-bold"><SelectValue placeholder="Pilih jenis..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Teknik">Teknik (Drill/Stroke)</SelectItem>
                      <SelectItem value="Fisik">Fisik (Agility/Endurance)</SelectItem>
                      <SelectItem value="Game">Game / Sparring</SelectItem>
                      <SelectItem value="Gabungan">Gabungan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Tanggal Latihan</Label>
                  <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="h-14 rounded-xl bg-white/5 border-white/10 font-bold" />
                </div>
              </div>
            </ModernSection>

            <ModernSection title="Metrics" icon={BarChart} gradient="from-indigo-500/5 to-purple-500/5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Duration (Min)</Label>
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-muted-foreground" />
                    <Input name="duration" type="number" placeholder="90" className="h-12 bg-white/5 border-white/10 rounded-xl font-bold" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Total Sets</Label>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-muted-foreground" />
                    <Input name="sets" type="number" placeholder="0" className="h-12 bg-white/5 border-white/10 rounded-xl font-bold" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Avg Pulse</Label>
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-500" />
                    <Input name="hrAvg" type="number" placeholder="140" className="h-12 bg-white/5 border-white/10 rounded-xl font-bold text-green-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Max Pulse</Label>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <Input name="hrMax" type="number" placeholder="185" className="h-12 bg-white/5 border-white/10 rounded-xl font-bold text-red-500" />
                  </div>
                </div>
              </div>
              <div className="space-y-2 mt-4 pt-4 border-t border-white/5">
                <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Rallies (Optional)</Label>
                <Input name="rallies" type="number" placeholder="Jumlah pukulan..." className="h-12 bg-white/5 border-white/10 rounded-xl font-bold" />
              </div>
            </ModernSection>
          </div>

          {/* RIGHT COLUMN: RPE & NOTES */}
          <div className="xl:col-span-4 space-y-6">
            <ModernSection title="Intensity" icon={Zap} gradient="from-yellow-500/5 to-orange-500/5">
              <div className="space-y-2">
                <EnergyBar
                  value={intensity}
                  onChange={setIntensity}
                  labelLeft="Light"
                  labelRight="Max Effort"
                  colorClass="bg-yellow-500"
                />
                <p className="text-center text-xs text-muted-foreground font-medium uppercase tracking-widest mt-4">
                  RPE 1-10 (Rate of Perceived Exertion)
                </p>
              </div>
            </ModernSection>

            {/* Combined Notes Area in the column or below? Doing below for more space, but sidebar is nice. 
                 Let's put Self Eval in the side for quick access. */}
          </div>

          {/* BOTTOM: NOTES & ACTION */}
          <div className="xl:col-span-12 flex flex-col md:flex-row gap-6">
            <div className="rounded-[2.5rem] bg-secondary/20 border border-border/50 p-8 relative overflow-hidden flex-1 backdrop-blur-2xl">
              <div className="relative z-10 space-y-4 h-full flex flex-col">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-background/50 flex items-center justify-center shadow-sm">
                    <StickyNote className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-black font-headline uppercase text-foreground">Self Evaluation</h3>
                </div>
                <Textarea
                  name="athleteNotes"
                  className="flex-1 rounded-2xl bg-background/50 border-transparent resize-none p-4 focus:bg-background min-h-[120px]"
                  placeholder="Bagaimana perasaanmu hari ini? Gerakan apa yang terasa enak atau sulit?"
                />
              </div>
            </div>

            <Button
              size="lg"
              className="w-full md:w-auto md:min-w-[300px] h-auto rounded-[2.5rem] text-2xl font-black bg-foreground text-background hover:bg-foreground/90 shadow-2xl hover:scale-[1.02] transition-all p-8"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="w-8 h-8 animate-spin mr-3" /> : <Save className="w-8 h-8 mr-3" />}
              SAVE LOG
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
