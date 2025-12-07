'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft, Calculator, Zap, Shield, BrainCircuit, 
  Info, CheckCircle2, XCircle, PlayCircle, BookOpen, AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  getPlayerById, 
  submitVerificationResult, 
  type PlayerVerification 
} from "../../actions"; // Adjust path sesuai struktur folder Anda

// Konstanta Bonus Points
const BONUS_POINTS = {
  jumpingSmash: 3, stickSmash: 3, backhandSmash: 4, netKill: 2, flickServe: 2,
  spinningNet: 3, crossNet: 3, backhandDrop: 3, backhandClear: 3, crossDefense: 3,
  splitStep: 4, divingDefense: 3, deception: 4, intercept: 3, judgement: 2
};

export default function AssessmentPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();
  const [player, setPlayer] = useState<PlayerVerification | null>(null);
  const [loading, setLoading] = useState(true);

  // UI State
  const [activeTab, setActiveTab] = useState("visual");
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Scoring State
  const [scores, setScores] = useState({
    grip: 1, footwork: 1, backhand: 1, attack: 1, defense: 1, gameIq: 1, physique: 1
  });
  const [skills, setSkills] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState("");
  const [finalCalc, setFinalCalc] = useState({ scoreA: 0, scoreB: 0, total: 0, level: "", tier: "", color: "" });

  // 1. Fetch Player Data
  useEffect(() => {
    if (id) {
        getPlayerById(id).then((data) => {
            if (data) setPlayer(data);
            setLoading(false);
        });
    }
  }, [id]);

  // 2. Real-time Calculation Logic
  useEffect(() => {
    const totalA = Object.values(scores).reduce((a, b) => a + b, 0);
    let totalB = 0;
    Object.keys(skills).forEach(k => {
      if (skills[k]) totalB += BONUS_POINTS[k as keyof typeof BONUS_POINTS];
    });
    if (totalB > 20) totalB = 20;

    const finalScore = (totalA * 2) + totalB;

    let level = "REJECTED";
    let tier = "Over Spec / Joki";
    let color = "bg-red-600 text-white border-red-800"; // Kontras tinggi untuk header

    if (finalScore >= 14 && finalScore <= 36) {
        level = "BEGINNER";
        color = "bg-green-600 text-white border-green-800";
        if (finalScore <= 24) tier = "Tier 3 (Newbie)";
        else if (finalScore <= 30) tier = "Tier 2 (Rookie)";
        else tier = "Tier 1 (Prospect)";
    } else if (finalScore >= 37 && finalScore <= 62) {
        level = "INTERMEDIATE";
        color = "bg-blue-600 text-white border-blue-800";
        if (finalScore <= 44) tier = "Tier 3 (Grinder)";
        else if (finalScore <= 54) tier = "Tier 2 (Striker)";
        else tier = "Tier 1 (Carry)";
    } else if (finalScore >= 63 && finalScore <= 89) {
        level = "ADVANCE";
        color = "bg-purple-600 text-white border-purple-800";
        if (finalScore <= 70) tier = "Tier 3 (Master)";
        else if (finalScore <= 80) tier = "Tier 2 (Savage)";
        else tier = "Tier 1 (Prime)";
    }

    setFinalCalc({ scoreA: totalA, scoreB: totalB, total: finalScore, level, tier, color });
  }, [scores, skills]);

  const handleSubmit = async () => {
      if (!player) return;
      await submitVerificationResult(player.id, { 
          ...finalCalc, 
          status: finalCalc.level === 'REJECTED' ? 'REJECTED' : 'APPROVED',
          notes 
      });
      toast({ title: "Selesai", description: "Hasil verifikasi disimpan." });
      router.push('/admin/tpf'); // Kembali ke Dashboard TPF
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Loading Data...</div>;
  if (!player) return <div className="flex h-screen items-center justify-center">Player Not Found</div>;

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
        
        {/* --- HEADER BAR (Sticky Top) --- */}
        <header className="bg-white border-b px-6 py-3 flex items-center justify-between shrink-0 h-16 shadow-sm z-20">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="font-bold text-lg flex items-center gap-2">
                        {player.name}
                        <Badge variant="outline">{player.category} (Klaim)</Badge>
                    </h1>
                    <p className="text-xs text-muted-foreground">{player.team}</p>
                </div>
            </div>

            {/* LIVE SCORECARD DISPLAY */}
            <div className={`flex items-center gap-4 px-4 py-1.5 rounded-lg shadow-sm border-2 ${finalCalc.color}`}>
                <div className="flex items-center gap-2 text-sm font-medium opacity-90">
                    <span>(A) {finalCalc.scoreA * 2}</span>
                    <span>+</span>
                    <span>(B) {finalCalc.scoreB}</span>
                    <span>=</span>
                </div>
                <div className="border-l border-white/30 pl-4">
                    <span className="text-xs uppercase font-bold block leading-none opacity-80">Rekomendasi</span>
                    <span className="text-xl font-black leading-none">{finalCalc.level}</span>
                </div>
            </div>
        </header>

        {/* --- MAIN LAYOUT (SPLIT SCREEN) --- */}
        <div className="flex-1 grid grid-cols-12 overflow-hidden">
            
            {/* KIRI: VIDEO PLAYER & CHEAT SHEET (45%) */}
            <div className="col-span-12 lg:col-span-5 bg-black flex flex-col relative border-r border-zinc-800">
                <div className="aspect-video w-full bg-black flex items-center justify-center border-b border-zinc-800 shadow-lg relative z-10">
                    <iframe src={player.videoUrl} className="w-full h-full" allowFullScreen />
                </div>

                {/* Toolbar Video */}
                <div className="bg-zinc-900 p-2 border-b border-zinc-800 flex justify-between items-center px-4">
                    <span className="text-xs text-zinc-400 font-mono">ID: {player.id}</span>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-zinc-300 hover:text-white hover:bg-zinc-800"
                        onClick={() => setShowCheatSheet(!showCheatSheet)}
                    >
                        <BookOpen className="w-4 h-4 mr-2" />
                        {showCheatSheet ? "Tutup Panduan" : "Buka Panduan"}
                    </Button>
                </div>

                {/* Area Bawah Video (Cheat Sheet / Status) */}
                <div className="flex-1 bg-zinc-950 relative overflow-hidden">
                    {showCheatSheet ? (
                        <ScrollArea className="h-full p-6 animate-in slide-in-from-bottom-5">
                            <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider sticky top-0 bg-zinc-950 pb-2 z-10">
                                <Info className="w-4 h-4 text-blue-400"/> Panduan Visual
                            </h4>
                            <div className="space-y-4 pb-10">
                                <CheatItem title="1. Grip" bad="Panci, kaku, bunyi bletak" good="Salaman, luwes, bunyi tring" />
                                <CheatItem title="2. Footwork" bad="Lari jogging, berat, diam" good="Geser (chasse), jinjit, ringan" />
                                <CheatItem title="3. Backhand" bad="Lari mutar badan, panik" good="Clear sampai belakang, santai" />
                                <CheatItem title="4. Attack" bad="Melambung keluar, nyangkut" good="Menukik tajam, bunyi ledakan" />
                                <CheatItem title="5. Defense" bad="Buang muka, raket ditaruh" good="Tembok, drive balik, tenang" />
                            </div>
                        </ScrollArea>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                             {finalCalc.level === 'REJECTED' ? (
                                <div className="bg-red-900/50 border-2 border-red-600 p-8 rounded-2xl w-full max-w-sm backdrop-blur-sm">
                                    <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                                    <h3 className="text-3xl font-black text-white mb-2 tracking-tight">VIDEO INVALID</h3>
                                    <p className="text-red-100 font-medium">
                                        Skor {finalCalc.total} terlalu tinggi. Terindikasi Joki / Atlet.
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-green-900/30 border-2 border-green-600 p-8 rounded-2xl w-full max-w-sm backdrop-blur-sm">
                                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-3xl font-black text-white mb-2 tracking-tight">VIDEO VALID</h3>
                                    <p className="text-green-100 font-medium">
                                        Level: {finalCalc.level} ({finalCalc.tier})
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* KANAN: FORM PENILAIAN (55%) */}
            <div className="col-span-12 lg:col-span-7 bg-slate-50 flex flex-col h-full overflow-hidden border-l border-slate-200 shadow-xl z-10">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 pt-4 bg-white border-b shadow-sm z-10">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="visual">I. Audit Visual (Skor 1-5)</TabsTrigger>
                            <TabsTrigger value="bonus">II. Skill Modifier (Bonus)</TabsTrigger>
                        </TabsList>
                    </div>

                    <ScrollArea className="flex-1 p-6 lg:p-8">
                        <TabsContent value="visual" className="mt-0 space-y-8 pb-10">
                            <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-900">
                                <Info className="w-5 h-5 shrink-0" />
                                <p className="text-sm">Geser slider untuk menilai kualitas teknik dasar. Nilai 1 (Buruk) s/d 5 (Sempurna).</p>
                            </div>
                            <div className="grid gap-8">
                                <ScoreSlider label="1. Biomekanik (Grip)" desc="Apakah pegangan raket kaku (Panci) atau luwes (Salaman)?" val={scores.grip} setVal={(v) => setScores({...scores, grip: v})} />
                                <ScoreSlider label="2. Footwork (Kaki)" desc="Lari berat (Jogging) vs Langkah geser/jinjit (Chasse)?" val={scores.footwork} setVal={(v) => setScores({...scores, footwork: v})} />
                                <ScoreSlider label="3. Backhand (Kiri)" desc="Bisa clear lurus sampai belakang?" val={scores.backhand} setVal={(v) => setScores({...scores, backhand: v})} />
                                <ScoreSlider label="4. Attack (Smash)" desc="Power dan sudut tukikan smash." val={scores.attack} setVal={(v) => setScores({...scores, attack: v})} />
                                <ScoreSlider label="5. Defense (Bertahan)" desc="Tenang jadi tembok atau panik buang bola?" val={scores.defense} setVal={(v) => setScores({...scores, defense: v})} />
                                <ScoreSlider label="6. Game IQ (Rotasi)" desc="Saling mengisi posisi atau sering tabrakan?" val={scores.gameIq} setVal={(v) => setScores({...scores, gameIq: v})} />
                                <ScoreSlider label="7. Physique (Fisik)" desc="Stabil dari awal sampai akhir video?" val={scores.physique} setVal={(v) => setScores({...scores, physique: v})} />
                            </div>
                        </TabsContent>

                        <TabsContent value="bonus" className="mt-0 space-y-8 pb-10">
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-900 mb-6 flex gap-3 shadow-sm">
                                <AlertTriangle className="w-5 h-5 shrink-0 text-yellow-600" />
                                <div>
                                    <strong>Instruksi Bonus:</strong> Centang hanya jika teknik terlihat jelas dan sukses minimal 1x. Jangan berasumsi.
                                </div>
                            </div>

                            <SkillGroup title="A. Kelompok Serangan (Attack)" icon={<Zap className="w-5 h-5 text-red-500"/>} items={[ {id: 'jumpingSmash', l: 'Jumping Smash (+3)'}, {id: 'stickSmash', l: 'Stick Smash (+3)'}, {id: 'backhandSmash', l: 'Backhand Smash (+4)'}, {id: 'netKill', l: 'Net Kill (+2)'}, {id: 'flickServe', l: 'Flick Serve (+2)'} ]} state={skills} setState={setSkills} />
                            <SkillGroup title="B. Kelompok Kontrol" icon={<Shield className="w-5 h-5 text-blue-500"/>} items={[ {id: 'spinningNet', l: 'Spinning Net (+3)'}, {id: 'crossNet', l: 'Cross Net (+3)'}, {id: 'backhandDrop', l: 'Backhand Drop (+3)'}, {id: 'backhandClear', l: 'Backhand Clear (+3)'}, {id: 'crossDefense', l: 'Cross Defense (+3)'} ]} state={skills} setState={setSkills} />
                            <SkillGroup title="C. Kecerdasan & Refleks" icon={<BrainCircuit className="w-5 h-5 text-purple-500"/>} items={[ {id: 'splitStep', l: 'Split Step (+4)'}, {id: 'divingDefense', l: 'Diving Defense (+3)'}, {id: 'deception', l: 'Deception / Hold (+4)'}, {id: 'intercept', l: 'Intercept (+3)'}, {id: 'judgement', l: 'Watch the Line (+2)'} ]} state={skills} setState={setSkills} />
                        </TabsContent>
                    </ScrollArea>

                    {/* FOOTER ACTIONS (Sticky Bottom) */}
                    <div className="p-6 border-t bg-white space-y-4 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                        <div className="space-y-2">
                            <Label className="text-slate-900 font-bold">Catatan Verifikator</Label>
                            <Textarea 
                                placeholder="Wajib diisi jika REJECTED. Contoh: 'Menit 02:15 melakukan backhand smash tajam.'" 
                                value={notes} 
                                onChange={e => setNotes(e.target.value)} 
                                className="h-20 text-sm border-slate-300 focus:border-primary bg-slate-50" 
                            />
                        </div>
                        <Button 
                            size="lg" 
                            className={`w-full text-lg font-bold h-14 shadow-lg transition-all ${
                                finalCalc.level === 'REJECTED' 
                                ? 'bg-red-600 hover:bg-red-700 text-white' 
                                : 'bg-primary hover:bg-primary/90'
                            }`}
                            onClick={handleSubmit}
                        >
                            {finalCalc.level === 'REJECTED' ? (
                                <><XCircle className="w-6 h-6 mr-2" /> TOLAK PEMAIN (INVALID)</>
                            ) : (
                                <><CheckCircle2 className="w-6 h-6 mr-2" /> KONFIRMASI: {finalCalc.level}</>
                            )}
                        </Button>
                    </div>
                </Tabs>
            </div>
        </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

function ScoreSlider({ label, desc, val, setVal }: any) {
    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 transition-all hover:shadow-md">
            <div className="flex justify-between items-center">
                <Label className="text-lg font-bold text-slate-900">{label}</Label>
                <Badge variant="outline" className="text-xl font-mono w-12 h-12 flex items-center justify-center bg-slate-100 text-slate-900 border-slate-300 rounded-lg">
                    {val}
                </Badge>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
            <Slider value={[val]} min={1} max={5} step={1} onValueChange={(v) => setVal(v[0])} className="py-2" />
            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                <span>1. Buruk</span>
                <span>3. Cukup</span>
                <span>5. Sempurna</span>
            </div>
        </div>
    )
}

function SkillGroup({ title, icon, items, state, setState }: any) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-3 text-slate-900 border-b pb-2">
                {icon} {title}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((i: any) => (
                    <div key={i.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <Checkbox 
                            id={i.id} 
                            checked={state[i.id] || false}
                            onCheckedChange={(c) => setState({...state, [i.id]: !!c})} 
                            className="mt-1 w-5 h-5 border-slate-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label 
                            htmlFor={i.id} 
                            className="text-sm font-semibold cursor-pointer select-none leading-tight text-slate-700 hover:text-slate-900 transition-colors pt-0.5"
                        >
                            {i.l}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

function CheatItem({ title, bad, good }: any) {
    return (
        <div className="bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
            <div className="font-bold text-blue-400 mb-1.5 text-xs uppercase tracking-wide">{title}</div>
            <div className="grid grid-cols-1 gap-1 text-[11px]">
                <div className="text-red-400 flex gap-2"><span className="shrink-0">❌</span> {bad}</div>
                <div className="text-green-400 flex gap-2"><span className="shrink-0">✅</span> {good}</div>
            </div>
        </div>
    )
}
