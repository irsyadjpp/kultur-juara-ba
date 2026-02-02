'use client';

import { useState, useTransition } from "react";
import {
  Save, Smile, Meh, Frown, Bed, HeartPulse, AlertTriangle, Loader2, ArrowLeft,
  Battery, Activity, Coffee, Moon, Sun, Cloud, CloudRain, Utensils
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

// --- MODERN COMPONENTS (Copied from Mental Journal) ---

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

const COLOR_STYLES: Record<string, { container: string, icon: string, text: string }> = {
  red: {
    container: "bg-red-500/10 border-red-500 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]",
    icon: "bg-red-500 text-white",
    text: "text-red-500"
  },
  yellow: {
    container: "bg-yellow-500/10 border-yellow-500 shadow-[0_0_30px_-5px_rgba(234,179,8,0.3)]",
    icon: "bg-yellow-500 text-white",
    text: "text-yellow-500"
  },
  green: {
    container: "bg-green-500/10 border-green-500 shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]",
    icon: "bg-green-500 text-white",
    text: "text-green-500"
  },
  blue: {
    container: "bg-blue-500/10 border-blue-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
    icon: "bg-blue-500 text-white",
    text: "text-blue-500"
  }
};

const EmojiTile = ({ icon: Icon, label, value, selected, onClick, color }: any) => {
  const styles = COLOR_STYLES[color] || COLOR_STYLES.blue;

  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-3 p-4 h-40 rounded-[2rem] border-2 transition-all duration-300",
        selected
          ? cn(styles.container, "scale-105 z-10")
          : "bg-white/5 border-transparent hover:bg-white/10 hover:scale-105"
      )}
    >
      <div className={cn(
        "p-4 rounded-full transition-transform duration-300 group-hover:rotate-12",
        selected ? styles.icon : "bg-background text-muted-foreground"
      )}>
        <Icon className="w-8 h-8" />
      </div>
      <span className={cn("font-bold text-sm uppercase tracking-wider", selected ? styles.text : "text-muted-foreground")}>
        {label}
      </span>
    </button>
  );
};

const TileOption = ({ label, icon: Icon, value, currentValue, onChange }: any) => (
  <label className={cn(
    "cursor-pointer flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200",
    currentValue === value
      ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]"
      : "bg-white/5 border-transparent hover:bg-white/10 hover:border-primary/30"
  )}>
    <RadioGroupItem value={value} id={`opt-${value}`} className="sr-only" />
    <div className="flex items-center gap-4">
      {Icon && <Icon className={cn("w-6 h-6", currentValue === value ? "text-primary-foreground" : "text-muted-foreground")} />}
      <span className={cn("font-bold text-lg", currentValue === value ? "text-primary-foreground" : "text-foreground")}>{label}</span>
    </div>
    <div className={cn(
      "w-6 h-6 rounded-full border-2 flex items-center justify-center",
      currentValue === value ? "border-white" : "border-muted-foreground"
    )}>
      {currentValue === value && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
    </div>
  </label>
);

const EnergyBar = ({ value, onChange, labelLeft = "Low", labelRight = "Peak" }: any) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center px-2">
      <span className="text-xs font-bold text-muted-foreground uppercase">{labelLeft}</span>
      <span className="font-black text-4xl text-primary">{value}%</span>
      <span className="text-xs font-bold text-muted-foreground uppercase">{labelRight}</span>
    </div>
    <Slider
      defaultValue={[value]}
      max={100}
      min={0}
      step={5}
      onValueChange={(v) => onChange(v[0])}
      className="py-4 cursor-pointer"
    />
    <div className="flex justify-between gap-1">
      {[...Array(10)].map((_, i) => (
        <div key={i} className={cn(
          "h-3 flex-1 rounded-full transition-colors",
          i < value / 10 ? "bg-primary" : "bg-black/10"
        )} />
      ))}
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function AthleteNutritionLogPage() {
  const [sleepQuality, setSleepQuality] = useState(7); // Used as "Emoji" state 1-4 mapped to 10
  const [stressLevel, setStressLevel] = useState("Medium");
  const [readiness, setReadiness] = useState(80);

  // Sleep Calculation State
  const [sleepTime, setSleepTime] = useState("22:00");
  const [wakeTime, setWakeTime] = useState("05:00");
  const [calculatedDuration, setCalculatedDuration] = useState("7.0");

  const [isPending, startTransition] = useTransition();

  // Calculate duration whenever times change
  useState(() => {
    // Initial calculation
    calculateDuration("22:00", "05:00");
  });

  function calculateDuration(start: string, end: string) {
    if (!start || !end) return;
    const startDate = new Date(`2000-01-01T${start}`);
    const endDate = new Date(`2000-01-01T${end}`);

    let diff = endDate.getTime() - startDate.getTime();
    if (diff < 0) {
      diff += 24 * 60 * 60 * 1000; // Crosses midnight
    }

    const hours = diff / (1000 * 60 * 60);
    setCalculatedDuration(hours.toFixed(1));
  }

  const handleTimeChange = (type: 'sleep' | 'wake', value: string) => {
    if (type === 'sleep') {
      setSleepTime(value);
      calculateDuration(value, wakeTime);
    } else {
      setWakeTime(value);
      calculateDuration(sleepTime, value);
    }
  };
  const { toast } = useToast();
  const router = useRouter();

  // Helper to map Emoji selection to 1-10 scale for backend
  const handleSleepQuality = (val: string) => {
    // Map: poor->2, fair->5, good->8, excellent->10
    const map: any = { poor: 2, fair: 5, good: 8, excellent: 10 };
    setSleepQuality(map[val] || 7);
  };

  // Helper to reverse map for UI
  const getSleepQualityUI = () => {
    if (sleepQuality <= 3) return 'poor';
    if (sleepQuality <= 6) return 'fair';
    if (sleepQuality <= 8) return 'good';
    return 'excellent';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Map stress string back to 1-10 if needed, or keeping it compatible
    const stressMap: any = { "Low": 2, "Medium": 5, "High": 8 };

    // Combine meal inputs into one string for storage
    const mealsCombined = [
      `Sarapan: ${formData.get('meal_breakfast') || '-'}`,
      `Makan Siang: ${formData.get('meal_lunch') || '-'}`,
      `Makan Malam: ${formData.get('meal_dinner') || '-'}`,
      `Snacks/Extra: ${formData.get('meal_snack') || '-'}`
    ].join('\n\n');

    const data: any = {
      date: formData.get('date'),
      meals: mealsCombined,
      sleepQuality,
      stressLevel: stressMap[stressLevel] || 5,
      readiness: Math.round(readiness / 10), // Map 0-100 to 1-10
      sleepDurationNight: parseFloat(calculatedDuration),
      sleepDurationNap: formData.get('sleepDurationNap'),
      notes: formData.get('notes'),
    };

    startTransition(async () => {
      const res = await submitNutritionLog(data);
      if (res.success) {
        toast({ title: "Log Saved!", description: "Nutrisi dan istirahat tercatat. Good recovery!", className: "bg-green-600 text-white border-none" });
        router.push('/athletes/dashboard');
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
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
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-500/10 rounded-full blur-[80px]" />
          <h1 className="relative text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter text-foreground leading-[0.9]">
            Nutrition <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">& Recovery.</span>
          </h1>
          <p className="relative mt-4 text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
            Fuel your body, recover your mind. Log nutrisi harian dan kualitas istirahatmu di sini.
          </p>
        </div>
      </div>

      {/* FORM AREA - FULL LAYOUT GRID */}
      <form onSubmit={handleSubmit} className="w-full px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* TOP ROW: SLEEP QUALITY (Using Emoji) & READINESS (Energy Bar) */}
          <div className="xl:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <EmojiTile icon={Frown} label="Poor Sleep" value="poor" color="red" selected={getSleepQualityUI() === 'poor'} onClick={handleSleepQuality} />
            <EmojiTile icon={Meh} label="Fair Sleep" value="fair" color="yellow" selected={getSleepQualityUI() === 'fair'} onClick={handleSleepQuality} />
            <EmojiTile icon={Smile} label="Good Sleep" value="good" color="green" selected={getSleepQualityUI() === 'good'} onClick={handleSleepQuality} />
            <EmojiTile icon={Bed} label="Peak Rest" value="excellent" color="blue" selected={getSleepQualityUI() === 'excellent'} onClick={handleSleepQuality} />
          </div>

          <div className="xl:col-span-4">
            <ModernSection title="Physical Readiness" icon={HeartPulse} gradient="from-red-500/5 to-pink-500/5" className="h-full">
              <EnergyBar value={readiness} onChange={setReadiness} labelLeft="Sore" labelRight="Fresh" />
            </ModernSection>
          </div>

          {/* MIDDLE ROW: STRESS & SLEEP STATS */}
          <div className="xl:col-span-6">
            <ModernSection title="Stress Level" icon={Activity} gradient="from-orange-500/5 to-red-500/5" className="h-full">
              <CustomRadioGroup name="stressLevel" value={stressLevel} onChange={setStressLevel} options={[
                { label: "Low Stress (Relaks)", value: "Low", icon: Sun },
                { label: "Medium Stress (Biasa)", value: "Medium", icon: Cloud },
                { label: "High Stress (Tegang)", value: "High", icon: CloudRain },
              ]} />
            </ModernSection>
          </div>

          <div className="xl:col-span-6">
            <ModernSection title="Sleep Duration" icon={Bed} gradient="from-blue-500/5 to-cyan-500/5" className="h-full">
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Tidur (Malam)</Label>
                    <Input
                      type="time"
                      value={sleepTime}
                      onChange={(e) => handleTimeChange('sleep', e.target.value)}
                      className="h-14 font-bold bg-white/5 border-white/10 rounded-xl text-center text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Bangun (Pagi)</Label>
                    <Input
                      type="time"
                      value={wakeTime}
                      onChange={(e) => handleTimeChange('wake', e.target.value)}
                      className="h-14 font-bold bg-white/5 border-white/10 rounded-xl text-center text-lg"
                    />
                  </div>
                </div>

                <div className="bg-background/40 p-4 rounded-xl flex items-center justify-between border border-border/50">
                  <span className="text-sm font-bold text-muted-foreground uppercase">Total Sleep</span>
                  <span className="text-3xl font-black text-primary">{calculatedDuration} <span className="text-sm font-medium text-muted-foreground">Hours</span></span>
                </div>

                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Nap / Siang (Menit)</Label>
                  <div className="flex items-center gap-2">
                    <Input name="sleepDurationNap" type="number" step="1" defaultValue="0" className="h-14 text-xl font-bold bg-white/5 border-white/10 rounded-xl text-center" />
                  </div>
                </div>
              </div>
            </ModernSection>
          </div>

          {/* BOTTOM ROW: MEALS & NOTES */}
          <div className="xl:col-span-8">
            <ModernSection title="Daily Nutrition" icon={Utensils} gradient="from-emerald-500/5 to-green-500/5" className="h-full">
              <div className="space-y-3 h-full">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    <Label>Date of Log</Label>
                    <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-auto h-8 bg-white/5 border-white/10 rounded-lg text-xs" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground font-bold text-xs uppercase">Sarapan (Breakfast)</Label>
                      <Textarea name="meal_breakfast" placeholder="Oatmeal, Telur Rebus, Pisang..." className="h-28 rounded-2xl bg-white/5 border-white/10 resize-none focus:bg-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground font-bold text-xs uppercase">Makan Siang (Lunch)</Label>
                      <Textarea name="meal_lunch" placeholder="Nasi Merah, Dada Ayam, Sayur Sop..." className="h-28 rounded-2xl bg-white/5 border-white/10 resize-none focus:bg-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground font-bold text-xs uppercase">Makan Malam (Dinner)</Label>
                      <Textarea name="meal_dinner" placeholder="Ikan Bakar, Tumis Kangkung..." className="h-28 rounded-2xl bg-white/5 border-white/10 resize-none focus:bg-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground font-bold text-xs uppercase">Snack / Extra</Label>
                      <Textarea name="meal_snack" placeholder="Whey Protein, Buah, Roti..." className="h-28 rounded-2xl bg-white/5 border-white/10 resize-none focus:bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </ModernSection>
          </div>

          <div className="xl:col-span-4 flex flex-col gap-6">
            {/* NOTES */}
            <div className="rounded-[2.5rem] bg-secondary/20 border border-border/50 p-8 relative overflow-hidden flex-1 backdrop-blur-2xl">
              <div className="relative z-10 space-y-4 h-full flex flex-col">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-background/50 flex items-center justify-center shadow-sm">
                    <AlertTriangle className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-black font-headline uppercase text-foreground">Notes / Complaints</h3>
                </div>
                <Textarea
                  name="notes"
                  className="flex-1 rounded-2xl bg-background/50 border-transparent resize-none p-4 focus:bg-background"
                  placeholder="Ada keluhan fisik? Suplemen tambahan?"
                />
              </div>
            </div>

            {/* ACTION */}
            <Button
              size="lg"
              className="w-full h-24 rounded-[2rem] text-2xl font-black bg-foreground text-background hover:bg-foreground/90 shadow-2xl hover:scale-[1.02] transition-all"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="w-8 h-8 animate-spin mr-3" /> : <Save className="w-8 h-8 mr-3" />}
              {isPending ? "SAVING..." : "SAVE LOG"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Helper for Radio Group
function CustomRadioGroup({ name, value, onChange, options }: { name: string, value: string, onChange: (v: string) => void, options: any[] }) {
  return (
    <RadioGroup name={name} value={value} onValueChange={onChange} className="space-y-3">
      {options.map((opt) => (
        <label key={opt.value} className={cn(
          "cursor-pointer flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300",
          value === opt.value
            ? "bg-foreground text-background border-foreground shadow-xl scale-[1.02]"
            : "bg-white/5 border-transparent hover:border-foreground/20 hover:bg-white/10"
        )}>
          <RadioGroupItem value={opt.value} className="sr-only" />
          <div className="flex items-center gap-4">
            <opt.icon className={cn("w-6 h-6", value === opt.value ? "text-background" : "text-muted-foreground")} />
            <span className={cn("font-bold text-lg", value === opt.value ? "text-background" : "text-foreground")}>{opt.label}</span>
          </div>
          <div className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
            value === opt.value ? "border-background" : "border-muted-foreground/30"
          )}>
            {value === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-background" />}
          </div>
        </label>
      ))}
    </RadioGroup>
  )
}
