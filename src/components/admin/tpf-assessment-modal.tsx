
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, Eye, Zap, Shield, BrainCircuit, Activity, FileWarning, CheckCircle, XCircle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitVerificationResult, type PlayerVerification } from "@/app/admin/tpf/actions";
import { RUBRIC_GUIDELINES } from '@/lib/tpf-data';
import { ScrollArea } from '../ui/scroll-area';

// Konstanta Poin Bonus [cite: 785-801]
const BONUS_POINTS = {
  // Attack
  jumpingSmash: 3, stickSmash: 3, backhandSmash: 4, netKill: 2, flickServe: 2,
  // Control
  spinningNet: 3, crossNet: 3, backhandDrop: 3, backhandClear: 3, crossDefense: 3,
  // IQ
  splitStep: 4, divingDefense: 3, deception: 4, intercept: 3, judgement: 2
};

export function TpfAssessmentModal({ isOpen, onClose, player }: { isOpen: boolean, onClose: () => void, player: PlayerVerification }) {
  const { toast } = useToast();
  const [tab, setTab] = useState("main");
  
  // State Skor Utama (A)
  const [scores, setScores] = useState({
    grip: 1, footwork: 1, backhand: 1, attack: 1, defense: 1, gameIq: 1, physique: 1
  });

  // State Skill Bonus (B)
  const [skills, setSkills] = useState<Record<string, boolean>>({});
  
  // State Hasil
  const [notes, setNotes] = useState("");
  const [finalCalc, setFinalCalc] = useState({ scoreA: 0, scoreB: 0, total: 0, level: "", tier: "" });
  const [isVideoValid, setIsVideoValid] = useState<boolean | null>(null);

  // Kalkulasi Real-time [cite: 804-807]
  useEffect(() => {
    // 1. Hitung Total A
    const totalA = Object.values(scores).reduce((a, b) => a + b, 0);
    
    // 2. Hitung Total B
    let totalB = 0;
    Object.keys(skills).forEach(k => {
      if (skills[k]) totalB += BONUS_POINTS[k as keyof typeof BONUS_POINTS];
    });
    // Max Bonus 20
    if (totalB > 20) totalB = 20;

    // 3. Rumus Final: (A x 2) + B
    const finalScore = (totalA * 2) + totalB;

    // 4. Tentukan Level
    let level = "REJECTED";
    let tier = "OVER";

    if (finalScore <= 13) {
      level = "REJECTED";
      tier = "BELOW STANDARD";
    } else if (finalScore >= 14 && finalScore <= 36) {
        level = "BEGINNER";
        if (finalScore <= 24) tier = "Tier 3 (Newbie)";
        else if (finalScore <= 30) tier = "Tier 2 (Rookie)";
        else tier = "Tier 1 (Prospect)";
    } else if (finalScore >= 37 && finalScore <= 62) {
        level = "INTERMEDIATE";
        if (finalScore <= 44) tier = "Tier 3 (Grinder)";
        else if (finalScore <= 54) tier = "Tier 2 (Striker)";
        else tier = "Tier 1 (Carry)";
    } else if (finalScore >= 63 && finalScore <= 89) {
        level = "ADVANCE";
        if (finalScore <= 70) tier = "Tier 3 (Master)";
        else if (finalScore <= 80) tier = "Tier 2 (Savage)";
        else tier = "Tier 1 (Prime)";
    } else { // >= 90
        level = "REJECTED";
        tier = "OVER-QUALIFIED";
    }

    setFinalCalc({ scoreA: totalA, scoreB: totalB, total: finalScore, level, tier });
  }, [scores, skills]);

  const handleSubmit = async () => {
      let finalStatus;
      if(isVideoValid === false){
          finalStatus = 'REJECTED';
      } else if (finalCalc.level === player.category) {
          finalStatus = 'APPROVED';
      } else if (finalCalc.level === 'REJECTED') {
          finalStatus = 'REJECTED';
      } else {
          finalStatus = 'UPGRADE_REQUIRED';
      }

      await submitVerificationResult(player.id, { 
          ...finalCalc, 
          status: finalStatus,
          notes 
      });

      toast({ title: "Audit Selesai", description: `${player.name} -> ${finalStatus === 'UPGRADE_REQUIRED' ? `Naik ke ${finalCalc.level}` : finalStatus}` });
      onClose();
  };

  // Helper UI Slider
  const ScoreRow = ({ label, id, desc }: { label: string, id: keyof typeof scores, desc: string }) => (
    <div className="space-y-2 border-b pb-4">
        <div className="flex justify-between">
            <Label className="font-bold text-base">{label}</Label>
            <span className="font-mono font-bold bg-secondary px-2 rounded">{scores[id]}</span>
        </div>
        <p className="text-xs text-muted-foreground italic mb-2">{desc}</p>
        <Slider 
            value={[scores[id]]} 
            min={1} max={5} step={1} 
            onValueChange={(v) => setScores({...scores, [id]: v[0]})}
            className="cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 px-1">
            <span>Beginner (1-2)</span><span>Inter (3-4)</span><span>Adv (5)</span>
        </div>
    </div>
  );
  
  const isFormDisabled = isVideoValid === false;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
            <DialogTitle>Audit Teknis: {player.name} ({player.team})</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0 px-6 pb-6">
            
            {/* --- KOLOM KIRI: VIDEO --- */}
            <div className="flex flex-col space-y-4">
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-white relative">
                    <iframe src={player.videoUrl} className="w-full h-full rounded-lg" allowFullScreen title="Player Video" />
                </div>
                <div className="bg-secondary/30 p-4 rounded-lg border">
                    <h4 className="font-bold mb-2">Validasi Video</h4>
                    <p className="text-xs text-muted-foreground mb-3">Pastikan video tidak diedit (uncut), durasi cukup, dan subjek terlihat jelas.</p>
                     <div className="grid grid-cols-2 gap-2">
                        <Button 
                            variant={isVideoValid === true ? "default" : "outline"}
                            className={isVideoValid === true ? "bg-green-600 hover:bg-green-700" : ""}
                            onClick={() => setIsVideoValid(true)}
                        >
                            <CheckCircle className="w-4 h-4 mr-2"/> Valid
                        </Button>
                        <Button 
                            variant={isVideoValid === false ? "destructive" : "outline"}
                            onClick={() => setIsVideoValid(false)}
                        >
                            <XCircle className="w-4 h-4 mr-2"/> Tidak Valid
                        </Button>
                     </div>
                </div>
            </div>

            {/* --- KOLOM KANAN: FORM PENILAIAN --- */}
            <div className="flex flex-col space-y-4 min-h-0">
              <Tabs value={tab} onValueChange={setTab} className="w-full flex flex-col flex-grow min-h-0" disabled={isFormDisabled}>
                  <TabsList className="grid w-full grid-cols-2 shrink-0">
                      <TabsTrigger value="main">1. Audit Visual (A)</TabsTrigger>
                      <TabsTrigger value="bonus">2. Skill Bonus (B)</TabsTrigger>
                  </TabsList>
                  
                  <ScrollArea className="flex-grow mt-4 pr-4">
                      <TabsContent value="main" className="space-y-4 pt-0">
                          {RUBRIC_GUIDELINES.map(item => (
                              <ScoreRow key={item.id} id={item.id as keyof typeof scores} label={item.title} desc={item.scores[2].desc} />
                          ))}
                      </TabsContent>

                      <TabsContent value="bonus" className="space-y-6 pt-0">
                          <div className="space-y-2">
                            <h4 className="font-bold flex items-center gap-2 text-red-600"><Zap className="w-4 h-4"/> Attack (+Point)</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    {id: 'jumpingSmash', l: 'Jumping Smash (+3)'},
                                    {id: 'stickSmash', l: 'Stick Smash (+3)'},
                                    {id: 'backhandSmash', l: 'Backhand Smash (+4)'},
                                    {id: 'netKill', l: 'Net Kill (+2)'},
                                    {id: 'flickServe', l: 'Flick Serve (+2)'}
                                ].map(i => (
                                    <div key={i.id} className="flex items-center space-x-2">
                                        <Checkbox id={i.id} onCheckedChange={(c) => setSkills({...skills, [i.id]: !!c})} />
                                        <label htmlFor={i.id} className="text-sm cursor-pointer">{i.l}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold flex items-center gap-2 text-blue-600"><Shield className="w-4 h-4"/> Control (+Point)</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    {id: 'spinningNet', l: 'Spinning Net (+3)'},
                                    {id: 'crossNet', l: 'Cross Net (+3)'},
                                    {id: 'backhandDrop', l: 'Backhand Drop (+3)'},
                                    {id: 'backhandClear', l: 'BH Clear Baseline (+3)'},
                                    {id: 'crossDefense', l: 'Cross Defense (+3)'}
                                ].map(i => (
                                    <div key={i.id} className="flex items-center space-x-2">
                                        <Checkbox id={i.id} onCheckedChange={(c) => setSkills({...skills, [i.id]: !!c})} />
                                        <label htmlFor={i.id} className="text-sm cursor-pointer">{i.l}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold flex items-center gap-2 text-purple-600"><BrainCircuit className="w-4 h-4"/> IQ & Reflex (+Point)</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    {id: 'splitStep', l: 'Split Step (+4)'},
                                    {id: 'divingDefense', l: 'Diving (+3)'},
                                    {id: 'deception', l: 'Deception/Hold (+4)'},
                                    {id: 'intercept', l: 'Intercept (+3)'},
                                    {id: 'judgement', l: 'Watch the Line (+2)'}
                                ].map(i => (
                                    <div key={i.id} className="flex items-center space-x-2">
                                        <Checkbox id={i.id} onCheckedChange={(c) => setSkills({...skills, [i.id]: !!c})} />
                                        <label htmlFor={i.id} className="text-sm cursor-pointer">{i.l}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                      </TabsContent>
                  </ScrollArea>
              </Tabs>
                
              {/* --- KALKULATOR & KEPUTUSAN --- */}
              <div className="bg-card p-4 rounded-lg border flex flex-col h-full mt-auto">
                  <h3 className="font-bold text-base mb-2 flex items-center gap-2"><Calculator className="w-4 h-4"/> Kalkulasi & Keputusan</h3>
                  
                  <div className="space-y-2 flex-1">
                      <div className="flex justify-between items-center p-2 bg-secondary border rounded text-xs">
                          <span>Skor Indikator (A x 2)</span>
                          <span className="font-mono font-bold">{finalCalc.scoreA} x 2 = {finalCalc.scoreA * 2}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-secondary border rounded text-xs">
                          <span>Bonus Skill (B)</span>
                          <span className="font-mono font-bold text-green-600">+{finalCalc.scoreB}</span>
                      </div>
                      
                      <div className="flex justify-between items-end pt-2">
                          <span className="font-bold text-sm">SKOR AKHIR</span>
                          <span className="font-black text-2xl text-primary">{finalCalc.total}</span>
                      </div>

                      <div className={`p-2 rounded-lg text-center mt-2 border-2 text-xs ${
                          finalCalc.level === 'BEGINNER' ? 'bg-green-100 border-green-500 text-green-800' :
                          finalCalc.level === 'INTERMEDIATE' ? 'bg-blue-100 border-blue-500 text-blue-800' :
                          finalCalc.level === 'ADVANCE' ? 'bg-purple-100 border-purple-500 text-purple-800' :
                          'bg-red-100 border-red-500 text-red-800'
                      }`}>
                          <div className="font-bold uppercase">Rekomendasi: {finalCalc.level}</div>
                          <div className="font-medium">{finalCalc.tier}</div>
                      </div>

                      <div className="space-y-1 pt-2">
                          <Label className="text-xs">Catatan / Alasan Keputusan</Label>
                          <Textarea 
                              placeholder="Contoh: 'Backhand smash di menit 02:15 sangat tajam, fix Advance.'" 
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              className="h-16 text-xs"
                              disabled={isVideoValid === null}
                          />
                      </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                      <Button size="lg" className="w-full font-bold" onClick={handleSubmit} disabled={isVideoValid === null}>
                          SIMPAN & TETAPKAN LEVEL
                      </Button>
                  </div>
              </div>
            </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
