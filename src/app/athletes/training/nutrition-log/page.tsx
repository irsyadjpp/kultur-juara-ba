'use client';

import { useState, useTransition } from "react";
import {
  Save, Smile, Meh, Frown, Bed, HeartPulse, AlertTriangle, Loader2, ArrowLeft,
  Activity, Utensils, Droplets, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { submitNutritionLog } from "@/app/athletes/actions";
import Link from 'next/link';

// --- COMPONENTS ---
const ModernSection = ({ title, icon: Icon, children, className, gradient = "from-primary/5 to-transparent" }: any) => (
  <div className={cn("relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-secondary/20 backdrop-blur-2xl shadow-sm transition-all hover:shadow-md", className)}>
    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30 pointer-events-none", gradient)} />
    <div className="relative p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-14 w-14 rounded-2xl bg-background/50 flex items-center justify-center border border-border/50 text-primary shadow-sm">
          <Icon className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  </div>
);

export default function AthleteNutritionLogPage() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  // Metrics States
  const [urineColor, setUrineColor] = useState(1);
  const [domsLevel, setDomsLevel] = useState(1);
  const [readiness, setReadiness] = useState(80);
  const [sleepTime, setSleepTime] = useState("22:00");
  const [wakeTime, setWakeTime] = useState("06:00");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      date: formData.get('date'),
      // Pilar 8: Nutrition & Recovery Metrics
      nut_urine_color: urineColor,
      rec_doms_perceived: domsLevel,
      rec_hrv_rmssd: formData.get('rec_hrv_rmssd'),
      // Original Data
      meals: `B: ${formData.get('meal_breakfast')}\nL: ${formData.get('meal_lunch')}\nD: ${formData.get('meal_dinner')}`,
      readiness: readiness / 10,
      notes: formData.get('notes'),
    };

    startTransition(async () => {
      const res = await submitNutritionLog(data);
      if (res.success) {
        toast({ title: "Log Tersimpan!", description: "Data recovery telah diperbarui.", className: "bg-green-600 text-white" });
        router.push('/athletes/dashboard');
      }
    });
  };

  return (
    <div className="min-h-screen pb-32">
      <div className="w-full p-6 pt-8 space-y-4">
        <Link href="/athletes/dashboard" className="inline-flex items-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Link>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
          Nutrition & <span className="text-green-500">Recovery.</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full px-6 grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* Pilar 8: Hydration (Urine Color) */}
        <div className="xl:col-span-4">
          <ModernSection title="Hydration Status" icon={Droplets} gradient="from-blue-500/10 to-transparent">
            <div className="space-y-6 text-center">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((c) => (
                  <div
                    key={c}
                    onClick={() => setUrineColor(c)}
                    className={cn(
                      "h-12 w-8 rounded-md cursor-pointer border-2 transition-all",
                      c === 1 ? "bg-[#fdfdfd]" : c === 2 ? "bg-[#fff9e6]" : c === 3 ? "bg-[#fff1b8]" : c === 4 ? "bg-[#ffeb99]" : c === 5 ? "bg-[#ffd966]" : c === 6 ? "bg-[#f1c232]" : c === 7 ? "bg-[#bf9000]" : "bg-[#7f6000]",
                      urineColor === c ? "border-primary scale-110 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  />
                ))}
              </div>
              <p className="font-bold text-lg">Skala Warna Urin: {urineColor}</p>
            </div>
          </ModernSection>
        </div>

        {/* Pilar 8: DOMS / Muscle Soreness */}
        <div className="xl:col-span-4">
          <ModernSection title="Muscle Soreness" icon={Zap} gradient="from-orange-500/10 to-transparent">
            <div className="space-y-4">
              <div className="flex justify-between font-bold uppercase text-xs text-muted-foreground">
                <span>No Pain</span>
                <span>Max Pain</span>
              </div>
              <Slider value={[domsLevel]} min={1} max={10} step={1} onValueChange={(v) => setDomsLevel(v[0])} />
              <div className="text-center text-4xl font-black text-primary">{domsLevel}/10</div>
            </div>
          </ModernSection>
        </div>

        {/* HRV Input */}
        <div className="xl:col-span-4">
          <ModernSection title="Heart Rate Variability" icon={Activity} gradient="from-red-500/10 to-transparent">
            <div className="space-y-2">
              <Label className="uppercase text-xs font-bold">HRV RMSSD (ms)</Label>
              <Input name="rec_hrv_rmssd" type="number" placeholder="Contoh: 65" className="h-14 text-2xl font-bold bg-background/50" />
            </div>
          </ModernSection>
        </div>

        {/* Meals & Notes */}
        <div className="xl:col-span-8">
          <ModernSection title="Daily Meals" icon={Utensils}>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Breakfast</Label>
                <Textarea name="meal_breakfast" className="h-24 bg-background/50" placeholder="Apa yang kamu makan?" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Lunch</Label>
                <Textarea name="meal_lunch" className="h-24 bg-background/50" placeholder="Apa yang kamu makan?" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Dinner</Label>
                <Textarea name="meal_dinner" className="h-24 bg-background/50" placeholder="Apa yang kamu makan?" />
              </div>
            </div>
          </ModernSection>
        </div>

        {/* Action Button */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          <div className="bg-primary/10 p-6 rounded-[2rem] border border-primary/20">
            <Label className="text-xs font-bold uppercase mb-4 block">Log Date</Label>
            <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="bg-background" />
          </div>
          <Button disabled={isPending} className="h-24 rounded-[2rem] text-2xl font-black uppercase">
            {isPending ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
            Simpan Data
          </Button>
        </div>

      </form>
    </div>
  );
}
