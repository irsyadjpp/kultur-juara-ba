'use client';

import { useState, useTransition } from "react";
import {
  Save, Trophy, BarChart, Activity, Loader2, ArrowLeft,
  UserSquare, Calendar, Globe, Target, Flame, Skull, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { submitMatchLog } from "@/app/athletes/actions";
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

const ResultButton = ({ value, selected, onClick, label, color }: any) => (
  <button
    type="button"
    onClick={() => onClick(value)}
    className={cn(
      "flex-1 p-4 rounded-xl border-2 font-black uppercase tracking-widest transition-all",
      selected
        ? cn(color, "scale-[1.02] shadow-lg")
        : "bg-white/5 border-transparent text-muted-foreground hover:bg-white/10"
    )}
  >
    {label}
  </button>
);

export default function AthleteMatchLogPage() {
  const [physicalCondition, setPhysicalCondition] = useState(7);
  const [mentalCondition, setMentalCondition] = useState(7);
  const [result, setResult] = useState("WIN");

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Helper to format score: "21-19" or empty if invalid
    const formatScore = (set: string) => {
      const my = formData.get(`scoreSet${set}_my`);
      const opp = formData.get(`scoreSet${set}_opp`);
      if (!my && !opp) return "";
      return `${my || 0}-${opp || 0}`;
    };

    const data: any = {
      tournamentName: formData.get('tournamentName'),
      level: formData.get('level'),
      date: formData.get('date'),
      matchId: formData.get('matchId'),
      opponentName: formData.get('opponentName'),
      scoreSet1: formatScore('1'),
      scoreSet2: formatScore('2'),
      scoreSet3: formatScore('3'),
      result: result,
      duration: formData.get('duration'),
      unforcedErrors: formData.get('unforcedErrors'),
      winners: formData.get('winners'),
      physicalCondition,
      mentalCondition,
      notes: formData.get('notes'),
    };

    startTransition(async () => {
      const res = await submitMatchLog(data);
      if (res.success) {
        toast({ title: "Tersimpan", description: "Log pertandingan berhasil disimpan!", className: "bg-green-600 text-white border-none" });
        router.push('/athletes/dashboard');
      } else {
        toast({ title: "Gagal", description: res.message, variant: "destructive" });
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
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[80px]" />
          <h1 className="relative text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter text-foreground leading-[0.9]">
            Match <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">& Result Log.</span>
          </h1>
          <p className="relative mt-4 text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
            Catat hasil pertandingan resmi sebagai tolok ukur performa.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* LEFT COLUMN: INFO & OPPONENT */}
          <div className="xl:col-span-8 space-y-6">
            <ModernSection title="Tournament Info" icon={Trophy} gradient="from-yellow-500/5 to-orange-500/5">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Nama Turnamen</Label>
                  <Input name="tournamentName" placeholder="Cth: Sirnas A Bandung" className="h-14 rounded-xl bg-white/5 border-white/10 font-bold" required />
                </div>
                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Level Kompetisi</Label>
                  <Select name="level" required>
                    <SelectTrigger className="h-14 rounded-xl bg-white/5 border-white/10 font-bold"><SelectValue placeholder="Pilih Level..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Internal">Internal (Sparring)</SelectItem>
                      <SelectItem value="Kota">Kota / Kabupaten</SelectItem>
                      <SelectItem value="Provinsi">Provinsi / Kejurprov</SelectItem>
                      <SelectItem value="Nasional">Nasional / Sirnas</SelectItem>
                      <SelectItem value="Internasional">Internasional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Tanggal</Label>
                  <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="h-14 rounded-xl bg-white/5 border-white/10 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Match ID / Court</Label>
                  <Input name="matchId" placeholder="Court 1 / M-032" className="h-14 rounded-xl bg-white/5 border-white/10 font-bold" />
                </div>
              </div>
            </ModernSection>

            <ModernSection title="Opponent & Score" icon={Target} gradient="from-red-500/5 to-rose-500/5">
              <div className="space-y-8">
                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Lawan (Opponent)</Label>
                  <Input name="opponentName" placeholder="Nama Lawan" className="h-16 text-2xl font-black bg-white/5 border-white/10 rounded-2xl" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* SET 1 */}
                  <div className="space-y-3">
                    <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground text-center block">Set 1</Label>
                    <div className="flex gap-2 items-center">
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground text-center block">You</span>
                        <Input name="scoreSet1_my" type="number" placeholder="21" className="h-14 text-2xl text-center font-black bg-white/5 border-white/10 rounded-xl" />
                      </div>
                      <span className="text-muted-foreground font-black text-xl">-</span>
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground text-center block">Opp</span>
                        <Input name="scoreSet1_opp" type="number" placeholder="19" className="h-14 text-2xl text-center font-black bg-white/5 border-white/10 rounded-xl" />
                      </div>
                    </div>
                  </div>

                  {/* SET 2 */}
                  <div className="space-y-3">
                    <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground text-center block">Set 2</Label>
                    <div className="flex gap-2 items-center">
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground text-center block">You</span>
                        <Input name="scoreSet2_my" type="number" placeholder="0" className="h-14 text-2xl text-center font-black bg-white/5 border-white/10 rounded-xl" />
                      </div>
                      <span className="text-muted-foreground font-black text-xl">-</span>
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground text-center block">Opp</span>
                        <Input name="scoreSet2_opp" type="number" placeholder="0" className="h-14 text-2xl text-center font-black bg-white/5 border-white/10 rounded-xl" />
                      </div>
                    </div>
                  </div>

                  {/* SET 3 */}
                  <div className="space-y-3">
                    <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground text-center block">Set 3 (Rubber)</Label>
                    <div className="flex gap-2 items-center">
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground text-center block">You</span>
                        <Input name="scoreSet3_my" type="number" placeholder="0" className="h-14 text-2xl text-center font-black bg-white/5 border-white/10 rounded-xl" />
                      </div>
                      <span className="text-muted-foreground font-black text-xl">-</span>
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground text-center block">Opp</span>
                        <Input name="scoreSet3_opp" type="number" placeholder="0" className="h-14 text-2xl text-center font-black bg-white/5 border-white/10 rounded-xl" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <ResultButton
                    label="VICTORY"
                    value="WIN"
                    selected={result === "WIN"}
                    onClick={setResult}
                    color="bg-green-500 text-white border-green-500"
                  />
                  <ResultButton
                    label="DEFEAT"
                    value="LOSS"
                    selected={result === "LOSS"}
                    onClick={setResult}
                    color="bg-red-500 text-white border-red-500"
                  />
                </div>
              </div>
            </ModernSection>
          </div>

          {/* RIGHT COLUMN: STATS & CONDITIONS */}
          <div className="xl:col-span-4 space-y-6">
            <ModernSection title="Game Stats" icon={BarChart} gradient="from-blue-500/5 to-cyan-500/5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Duration (Minutes)</Label>
                  <Input name="duration" type="number" step="1" placeholder="0" className="h-14 bg-white/5 border-white/10 rounded-xl font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Unforced Errors</Label>
                  <Input name="unforcedErrors" type="number" step="1" placeholder="0" className="h-14 bg-white/5 border-white/10 rounded-xl font-bold text-red-500" />
                </div>
                <div className="space-y-2">
                  <Label className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Winners</Label>
                  <Input name="winners" type="number" step="1" placeholder="0" className="h-14 bg-white/5 border-white/10 rounded-xl font-bold text-green-500" />
                </div>
              </div>
            </ModernSection>

            <ModernSection title="Self Eval" icon={Activity} gradient="from-pink-500/5 to-purple-500/5">
              <div className="space-y-8">
                <EnergyBar
                  value={physicalCondition}
                  onChange={setPhysicalCondition}
                  labelLeft="Exhausted"
                  labelRight="Fresh"
                  colorClass="bg-pink-500"
                />
                <EnergyBar
                  value={mentalCondition}
                  onChange={setMentalCondition}
                  labelLeft="Distracted"
                  labelRight="Focused"
                  colorClass="bg-purple-500"
                />
              </div>
            </ModernSection>
          </div>

          {/* BOTTOM: NOTES & ACTION */}
          <div className="xl:col-span-12 flex flex-col md:flex-row gap-6">
            <div className="rounded-[2.5rem] bg-secondary/20 border border-border/50 p-8 relative overflow-hidden flex-1 backdrop-blur-2xl">
              <div className="relative z-10 space-y-4 h-full flex flex-col">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-background/50 flex items-center justify-center shadow-sm">
                    <UserSquare className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-black font-headline uppercase text-foreground">Post-Match Analysis</h3>
                </div>
                <Textarea
                  name="notes"
                  className="flex-1 rounded-2xl bg-background/50 border-transparent resize-none p-4 focus:bg-background min-h-[120px]"
                  placeholder="Strategi apa yang berhasil? Apa yang perlu diperbaiki?"
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
