'use client';

import { useState, useTransition } from "react";
import {
  Save, Smile, Meh, Frown, BrainCircuit, Heart, AlertTriangle, Loader2, ArrowLeft,
  Battery, BatteryMedium, BatteryLow, Zap, Activity, Coffee, Moon, Sun, Cloud, CloudRain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { submitMentalJournalEntry } from "@/app/athletes/actions";
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

const EnergyBar = ({ value, onChange }: any) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center px-2">
      <span className="text-xs font-bold text-muted-foreground uppercase">Low Battery</span>
      <span className="font-black text-4xl text-primary">{value}%</span>
      <span className="text-xs font-bold text-muted-foreground uppercase">Full Power</span>
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

export default function AthleteMentalJournalPage() {
  const [mentalEnergy, setMentalEnergy] = useState(70);
  const [safetyFlag, setSafetyFlag] = useState(false);
  const [mood, setMood] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!mood) {
      toast({ title: "Mood Check!", description: "Gimana perasaanmu hari ini? Pilih satu emoji ya.", variant: "destructive" });
      return;
    }

    const formData = new FormData(event.currentTarget);
    const data: any = {
      mentalEnergy,
      mood,
      safetyFlag,
      date: formData.get('date'),
      mindBurden: formData.get('mindBurden'),
      mainActivity: formData.get('mainActivity'),
      disturbingThoughts: formData.get('disturbingThoughts'),
      discomfortEvent: formData.get('discomfortEvent'),
      safetySymptoms: [], // Flags handled separately if needed
    };

    startTransition(async () => {
      const result = await submitMentalJournalEntry(data);
      if (result.success) {
        toast({ title: "Journal Saved!", description: "Terima kasih sudah berbagi cerita hari ini. Keep fighting!", className: "bg-green-600 text-white border-none" });
        router.push('/athletes/dashboard');
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
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
          {/* Decorative blurs positioned relative to header only */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[80px]" />
          <h1 className="relative text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter text-foreground leading-[0.9]">
            Mental <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Check-in.</span>
          </h1>
          <p className="relative mt-4 text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
            Tidak ada penilaian di sini. Hanya kamu, dan ruang aman untuk melepaskan beban pikiranmu.
          </p>
        </div>
      </div>

      {/* FORM AREA - FULL LAYOUT GRID */}
      <form onSubmit={handleSubmit} className="w-full px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* TOP ROW: MOOD & ENERGY */}
          <div className="xl:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* MOOD SELECTOR */}
            <EmojiTile icon={Frown} label="Low" value="sad" color="red" selected={mood === 'sad'} onClick={setMood} />
            <EmojiTile icon={Meh} label="Neutral" value="neutral" color="yellow" selected={mood === 'neutral'} onClick={setMood} />
            <EmojiTile icon={Smile} label="Good" value="happy" color="green" selected={mood === 'happy'} onClick={setMood} />
            <EmojiTile icon={Zap} label="Hyped" value="focused" color="blue" selected={mood === 'focused'} onClick={setMood} />
          </div>

          <div className="xl:col-span-4">
            <ModernSection title="Energy Level" icon={Battery} gradient="from-yellow-500/5 to-orange-500/5" className="h-full">
              <EnergyBar value={mentalEnergy} onChange={setMentalEnergy} />
            </ModernSection>
          </div>

          {/* MIDDLE ROW: CONTEXT */}
          <div className="xl:col-span-6">
            <ModernSection title="Main Activity" icon={Activity} gradient="from-blue-500/5 to-cyan-500/5" className="h-full">
              <RadioGroup name="mainActivity" defaultValue="Latihan" className="space-y-3">
                <CustomRadioGroup name="mainActivity" defaultValue="Latihan" options={[
                  { label: "Training Day", value: "Latihan", icon: Activity },
                  { label: "School / Uni Book", value: "Sekolah", icon: BrainCircuit },
                  { label: "Competition", value: "Tanding", icon: Zap },
                  { label: "Rest Day", value: "Libur", icon: Coffee },
                ]} />
              </RadioGroup>
            </ModernSection>
          </div>

          <div className="xl:col-span-6">
            <ModernSection title="Mind Burden" icon={Cloud} gradient="from-gray-500/5 to-slate-500/5" className="h-full">
              <CustomRadioGroup name="mindBurden" defaultValue="Ringan" options={[
                { label: "Clear Mind (Ringan)", value: "Ringan", icon: Sun },
                { label: "Overthinking (Sedang)", value: "Sedang", icon: Cloud },
                { label: "Burnout / Heavy (Berat)", value: "Berat", icon: CloudRain },
              ]} />
            </ModernSection>
          </div>

          {/* BOTTOM ROW: JOURNAL & SAFETY */}
          <div className="xl:col-span-8">
            <ModernSection title="Guided Journal" icon={BrainCircuit} gradient="from-violet-500/5 to-fuchsia-500/5" className="h-full">
              <div className="grid md:grid-cols-2 gap-6 h-full">
                <div className="space-y-3">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Is Something Bothering You?</Label>
                  <Textarea
                    name="disturbingThoughts"
                    className="h-[200px] rounded-[1.5rem] bg-white/5 border-white/10 focus:ring-2 ring-primary/20 p-5 text-lg leading-relaxed resize-none transition-all focus:bg-white/10"
                    placeholder="Ceritakan saja, tidak ada yang akan menghakimi..."
                  />
                </div>
                <div className="space-y-3">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Uncomfortable Events?</Label>
                  <Textarea
                    name="discomfortEvent"
                    className="h-[200px] rounded-[1.5rem] bg-white/5 border-white/10 focus:ring-2 ring-primary/20 p-5 text-lg leading-relaxed resize-none transition-all focus:bg-white/10"
                    placeholder="Ada kejadian yang bikin gak nyaman?"
                  />
                </div>
              </div>
            </ModernSection>
          </div>

          <div className="xl:col-span-4 flex flex-col gap-6">
            {/* RED FLAG */}
            <div className="rounded-[2.5rem] bg-red-500 text-white p-8 relative overflow-hidden flex-1">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black font-headline uppercase">Safety Check</h3>
                </div>

                <div className="grid gap-3">
                  {['Sulit tidur parah', 'Malas/Takut latihan', 'Ingin menyakiti diri', 'Merasa tidak berharga'].map((item) => (
                    <label key={item} className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 cursor-pointer transition-colors">
                      <Checkbox
                        className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-red-500 h-6 w-6 rounded-lg"
                        onCheckedChange={(c) => c && setSafetyFlag(true)}
                      />
                      <span className="font-bold text-sm">{item}</span>
                    </label>
                  ))}
                </div>

                {safetyFlag && (
                  <div className="bg-red-950/20 border border-red-500/20 text-red-200 p-4 rounded-2xl font-bold text-sm animate-in zoom-in duration-300 backdrop-blur-md shadow-lg">
                    ⚠️ Noted. Psikolog kami akan diinfokan untuk segera menghubungimu. Kamu tidak sendiri!
                  </div>
                )}
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-black/20 rounded-full blur-3xl opacity-50" />
            </div>

            {/* ACTION */}
            <Button
              size="lg"
              className="w-full h-24 rounded-[2rem] text-2xl font-black bg-foreground text-background hover:bg-foreground/90 shadow-2xl hover:scale-[1.02] transition-all"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="w-8 h-8 animate-spin mr-3" /> : <Save className="w-8 h-8 mr-3" />}
              {isPending ? "SAVING..." : "SAVE JOURNAL"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Helper for Radio Group to handle state cleanly in the map
function CustomRadioGroup({ name, defaultValue, options }: { name: string, defaultValue: string, options: any[] }) {
  const [val, setVal] = useState(defaultValue);

  return (
    <RadioGroup name={name} value={val} onValueChange={setVal} className="space-y-3">
      {options.map((opt) => (
        <label key={opt.value} className={cn(
          "cursor-pointer flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300",
          val === opt.value
            ? "bg-foreground text-background border-foreground shadow-xl scale-[1.02]"
            : "bg-white/5 border-transparent hover:border-foreground/20 hover:bg-white/10"
        )}>
          <RadioGroupItem value={opt.value} className="sr-only" />
          <div className="flex items-center gap-4">
            <opt.icon className={cn("w-6 h-6", val === opt.value ? "text-background" : "text-muted-foreground")} />
            <span className="font-bold text-lg">{opt.label}</span>
          </div>
          <div className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
            val === opt.value ? "border-background" : "border-muted-foreground/30"
          )}>
            {val === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-background" />}
          </div>
        </label>
      ))}
    </RadioGroup>
  )
}

// Dummy Icon fallbacks just in case
const DumbbellIcon = Activity; 
