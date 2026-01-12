

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, Shuffle, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { validatePairing, PlayerLevel, PlayerTier } from "@/lib/matrix-validation";

// Mock Data
const UNPAIRED_PLAYERS: { id: number; name: string; level: PlayerLevel; tier: PlayerTier; communityCode: string; }[] = [
  { id: 1, name: "Kevin", level: "Beginner", tier: 1, communityCode: "DJARUM" },
  { id: 2, name: "Marcus", level: "Beginner", tier: 1, communityCode: "DJARUM" },
  { id: 3, name: "Fajar", level: "Beginner", tier: 1, communityCode: "JAYA-RAYA" },
  { id: 4, name: "Rian", level: "Beginner", tier: 2, communityCode: "JAYA-RAYA" },
];

export default function PairingPage() {
  const [selectedP1, setSelectedP1] = useState<any>(null);
  const [selectedP2, setSelectedP2] = useState<any>(null);
  const [mode, setMode] = useState<'independent' | 'community'>('independent');

  // Simulasi Validasi Matriks (Fitur 6)
  const validationResult = selectedP1 && selectedP2 ? validatePairing(selectedP1, selectedP2, mode) : null;
  const isValid = validationResult?.isValid ?? false;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-headline text-3xl">PENDAFTARAN <span className="text-primary">GANDA</span></h1>
        <Button variant="outline" className="rounded-pill gap-2 border-2">
           <Shuffle size={16} /> Auto-Pairing
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         
         {/* LEFT: BUILDER AREA */}
         <div className="lg:col-span-8 space-y-6">
            <Card className="rounded-[2rem] border-2 border-dashed border-primary/20 bg-secondary/10 shadow-none relative overflow-hidden">
               <CardContent className="p-8 flex flex-col items-center justify-center min-h-[300px]">
                  
                  {/* SLOTS */}
                  <div className="flex items-center gap-4 w-full max-w-lg">
                     {/* Slot 1 */}
                     <div 
                        className={`flex-1 aspect-[3/4] rounded-3xl border-2 flex flex-col items-center justify-center p-4 transition-all ${selectedP1 ? 'bg-card border-primary shadow-m3-3' : 'border-dashed border-muted-foreground/30 bg-background/50'}`}
                        onClick={() => setSelectedP1(null)}
                     >
                        {selectedP1 ? (
                           <>
                              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-2xl mb-4">{selectedP1.name[0]}</div>
                              <h3 className="font-headline text-xl">{selectedP1.name}</h3>
                              <Badge className="mt-2">{selectedP1.level}</Badge>
                              <p className="text-xs text-muted-foreground mt-4 cursor-pointer hover:text-destructive">Click to remove</p>
                           </>
                        ) : (
                           <div className="text-center text-muted-foreground">
                              <Plus className="mx-auto mb-2 opacity-50" />
                              <p className="text-xs font-bold uppercase">Select Player 1</p>
                           </div>
                        )}
                     </div>

                     <div className="font-headline text-2xl text-muted-foreground/30">+</div>

                     {/* Slot 2 */}
                     <div 
                        className={`flex-1 aspect-[3/4] rounded-3xl border-2 flex flex-col items-center justify-center p-4 transition-all ${selectedP2 ? 'bg-card border-primary shadow-m3-3' : 'border-dashed border-muted-foreground/30 bg-background/50'}`}
                        onClick={() => setSelectedP2(null)}
                     >
                        {selectedP2 ? (
                           <>
                              <div className="h-16 w-16 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-600 font-bold text-2xl mb-4">{selectedP2.name[0]}</div>
                              <h3 className="font-headline text-xl">{selectedP2.name}</h3>
                              <Badge variant="secondary" className="mt-2">{selectedP2.level}</Badge>
                              <p className="text-xs text-muted-foreground mt-4 cursor-pointer hover:text-destructive">Click to remove</p>
                           </>
                        ) : (
                           <div className="text-center text-muted-foreground">
                              <Plus className="mx-auto mb-2 opacity-50" />
                              <p className="text-xs font-bold uppercase">Select Player 2</p>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* VALIDATION STATUS (Fitur 6) */}
                  {validationResult && (
                     <div className={`mt-8 px-6 py-3 rounded-2xl flex items-center gap-3 animate-in zoom-in ${isValid ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {isValid ? <CheckCircle2 size={20}/> : <AlertTriangle size={20}/>}
                        <span className="font-bold text-sm">{validationResult.message}</span>
                     </div>
                  )}

                  <div className="mt-6">
                     <Button 
                        disabled={!isValid} 
                        className="rounded-pill h-12 px-8 font-bold shadow-lg shadow-primary/20"
                     >
                        Daftarkan Pasangan
                     </Button>
                  </div>

               </CardContent>
            </Card>

            {/* LIST PASANGAN */}
            <h3 className="font-bold text-lg px-2">Daftar Pasangan Terdaftar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Card className="rounded-[1.5rem] border-none shadow-sm flex items-center p-4 gap-4">
                  <div className="flex -space-x-3">
                     <div className="h-10 w-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-bold">AH</div>
                     <div className="h-10 w-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-bold">HS</div>
                  </div>
                  <div>
                     <p className="font-bold text-sm">Ahsan / Hendra</p>
                     <p className="text-[10px] text-muted-foreground">Ganda Putra</p>
                  </div>
                  <div className="ml-auto">
                     <Badge variant="outline" className="text-orange-600 bg-orange-50 border-orange-200">Belum Bayar</Badge>
                  </div>
               </Card>
            </div>
         </div>

         {/* RIGHT: PLAYER POOL */}
         <div className="lg:col-span-4 h-full">
            <div className="bg-card rounded-[2rem] p-6 shadow-m3-1 h-full flex flex-col">
               <h3 className="font-bold text-lg mb-4">Player Pool</h3>
               <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                  {UNPAIRED_PLAYERS.map((player) => (
                     <div 
                        key={player.id} 
                        onClick={() => !selectedP1 ? setSelectedP1(player) : !selectedP2 && setSelectedP2(player)}
                        className="p-3 rounded-xl border border-border hover:border-primary hover:bg-secondary/30 cursor-pointer transition-all flex justify-between items-center group"
                     >
                        <div className="flex items-center gap-3">
                           <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                              {player.name[0]}
                           </div>
                           <div>
                              <p className="font-bold text-sm">{player.name}</p>
                              <p className="text-[10px] text-muted-foreground">T{player.tier} • {player.level}</p>
                           </div>
                        </div>
                        <Plus size={16} className="text-muted-foreground group-hover:text-primary" />
                     </div>
                  ))}
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}

