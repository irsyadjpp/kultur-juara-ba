
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Swords, Crown } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const BRACKET_DATA = {
  quarterFinals: [
    { id: "Q1", pA: "Kevin / Marcus", pB: "Chia / Soh", sA: 2, sB: 0, status: "DONE", winner: "A" },
    { id: "Q2", pA: "Fajar / Rian", pB: "Rankireddy / Shetty", sA: 1, sB: 2, status: "DONE", winner: "B" },
    { id: "Q3", pA: "Ahsan / Hendra", pB: "Liu / Ou", sA: 2, sB: 1, status: "DONE", winner: "A" },
    { id: "Q4", pA: "Leo / Daniel", pB: "Alfian / Ardianto", sA: 0, sB: 0, status: "LIVE", winner: null },
  ],
  semiFinals: [
    { id: "S1", pA: "Kevin / Marcus", pB: "Rankireddy / Shetty", sA: 0, sB: 0, status: "SCHEDULED", winner: null },
    { id: "S2", pA: "Ahsan / Hendra", pB: "TBD", sA: 0, sB: 0, status: "SCHEDULED", winner: null },
  ],
  final: [
    { id: "F1", pA: "TBD", pB: "TBD", sA: 0, sB: 0, status: "SCHEDULED", winner: null },
  ],
  champion: null
};

export default function BracketPage() {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-16 md:py-24 bg-secondary/30 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="container mx-auto px-4 text-center mb-16 relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 ring-4 ring-primary/5">
            <Swords className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-headline text-foreground mb-4 uppercase">
            Bagan Pertandingan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ikuti perjalanan para juara di babak knockout Road to BCC 2026.
          </p>
        </div>
        
        {/* --- BRACKET CANVAS --- */}
        <div className="relative z-10">
           <ScrollArea className="w-full h-full pb-8">
              <div 
                  className="min-w-max flex items-center justify-center py-10 px-4 md:px-20"
              >
                  <div className="flex gap-8 md:gap-16 items-center">
                      
                      {/* COLUMN 1: QUARTER FINALS */}
                      <div className="flex flex-col gap-12 justify-center">
                          <BracketHeader title="Quarter Final" />
                          <div className="flex flex-col gap-16">
                              <div className="flex flex-col gap-6">
                                  <BracketMatch data={BRACKET_DATA.quarterFinals[0]} />
                                  <BracketMatch data={BRACKET_DATA.quarterFinals[1]} />
                              </div>
                              <div className="flex flex-col gap-6">
                                  <BracketMatch data={BRACKET_DATA.quarterFinals[2]} />
                                  <BracketMatch data={BRACKET_DATA.quarterFinals[3]} />
                              </div>
                          </div>
                      </div>

                      {/* CONNECTORS 1 */}
                      <BracketConnector type="quarter" />

                      {/* COLUMN 2: SEMI FINALS */}
                      <div className="flex flex-col gap-12 justify-center mt-8">
                          <BracketHeader title="Semi Final" />
                          <div className="flex flex-col gap-[280px]">
                              <BracketMatch data={BRACKET_DATA.semiFinals[0]} isSemi />
                              <BracketMatch data={BRACKET_DATA.semiFinals[1]} isSemi />
                          </div>
                      </div>

                      {/* CONNECTORS 2 */}
                      <BracketConnector type="semi" />

                      {/* COLUMN 3: FINAL */}
                      <div className="flex flex-col gap-12 justify-center mt-8">
                          <div className="flex flex-col items-center gap-6">
                              <Trophy className="w-16 h-16 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-pulse-slow" />
                              <BracketHeader title="Grand Final" isFinal />
                              <BracketMatch data={BRACKET_DATA.final[0]} isFinal />
                          </div>
                      </div>
                  </div>
              </div>
              <ScrollBar orientation="horizontal" />
           </ScrollArea>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// --- SUB COMPONENTS ---

function BracketHeader({ title, isFinal }: { title: string, isFinal?: boolean }) {
    return (
        <div className={cn(
            "text-center mb-4 uppercase tracking-widest font-black text-sm",
            isFinal ? "text-yellow-500" : "text-zinc-500"
        )}>
            {title}
        </div>
    )
}

function BracketMatch({ data, isSemi, isFinal }: { data: any, isSemi?: boolean, isFinal?: boolean }) {
    return (
        <div className={cn(
            "relative w-[250px] sm:w-[280px] bg-card rounded-[20px] border transition-all duration-300 group hover:scale-105 hover:z-10",
            data.status === 'LIVE' ? "border-primary/50 shadow-[0_0_20px_rgba(220,38,38,0.2)]" : 
            isFinal ? "border-yellow-500/50 bg-gradient-to-b from-card to-black/20" :
            "border-border hover:border-zinc-300 dark:hover:border-zinc-700"
        )}>
            <div className="flex justify-between items-center px-4 py-2 border-b bg-secondary/20 rounded-t-[20px]">
                <span className="text-[10px] font-bold text-muted-foreground">{data.id}</span>
                {data.status === 'LIVE' ? (
                    <span className="text-[9px] font-black text-primary uppercase tracking-wider animate-pulse">● LIVE</span>
                ) : (
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">{data.status}</span>
                )}
            </div>

            <div className="p-4 space-y-3">
                <div className={cn("flex justify-between items-center p-2 rounded-lg transition-colors", data.winner === 'A' ? "bg-primary/10" : "")}>
                    <div className="flex items-center gap-3 overflow-hidden">
                        {data.winner === 'A' && <Crown className="w-3 h-3 text-yellow-500 shrink-0" />}
                        <span className={cn("text-sm font-bold truncate", data.winner === 'A' ? "text-primary" : "text-foreground")}>
                            {data.pA}
                        </span>
                    </div>
                    <span className={cn("font-mono font-black text-lg", data.winner === 'A' ? "text-primary" : "text-muted-foreground")}>
                        {data.sA}
                    </span>
                </div>

                <div className={cn("flex justify-between items-center p-2 rounded-lg transition-colors", data.winner === 'B' ? "bg-primary/10" : "")}>
                    <div className="flex items-center gap-3 overflow-hidden">
                        {data.winner === 'B' && <Crown className="w-3 h-3 text-yellow-500 shrink-0" />}
                        <span className={cn("text-sm font-bold truncate", data.winner === 'B' ? "text-primary" : "text-foreground")}>
                            {data.pB}
                        </span>
                    </div>
                    <span className="font-mono font-black text-lg text-muted-foreground">
                        {data.sB}
                    </span>
                </div>
            </div>
            {isFinal && <div className="absolute inset-0 border-2 border-yellow-500/20 rounded-[20px] pointer-events-none"></div>}
        </div>
    )
}

function BracketConnector({ type }: { type: 'quarter' | 'semi' }) {
    if (type === 'quarter') {
        return (
            <div className="flex flex-col gap-16 py-12">
               <div className="flex flex-col justify-center h-[280px]">
                   <div className="w-8 border-y-2 border-r-2 border-border h-[50%] rounded-r-2xl translate-y-[25%] opacity-30"></div>
                   <div className="w-8 h-[2px] bg-border self-end opacity-30"></div>
               </div>
               <div className="flex flex-col justify-center h-[280px]">
                   <div className="w-8 border-y-2 border-r-2 border-border h-[50%] rounded-r-2xl translate-y-[25%] opacity-30"></div>
                   <div className="w-8 h-[2px] bg-border self-end opacity-30"></div>
               </div>
            </div>
        )
    }
    
    return (
        <div className="flex flex-col justify-center h-[500px]">
             <div className="w-8 border-y-2 border-r-2 border-border h-[50%] rounded-r-2xl translate-y-[25%] opacity-30"></div>
             <div className="w-8 h-[2px] bg-border self-end opacity-30"></div>
        </div>
    )
}


    