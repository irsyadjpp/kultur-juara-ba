"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Swords, Calendar } from "lucide-react";

export default function MatchHistoryPage() {
  return (
    <div className="min-h-screen bg-background pb-24 px-6 pt-8">
      <h1 className="font-headline text-3xl mb-6">MATCH <span className="text-primary text-outline">HISTORY</span></h1>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="p-4 rounded-3xl border-none shadow-m3-1 bg-gradient-to-br from-green-500/10 to-transparent border-l-4 border-green-500">
          <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Win Rate</p>
          <div className="flex items-end gap-2">
            <span className="font-headline text-3xl text-green-600 dark:text-green-400">75%</span>
            <TrendingUp className="h-5 w-5 text-green-600 mb-1.5" />
          </div>
          <Progress value={75} className="h-1.5 mt-3 rounded-full bg-green-200 [&>div]:bg-green-600" />
        </Card>
        
        <Card className="p-4 rounded-3xl border-none shadow-m3-1 bg-card">
          <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Total Match</p>
          <div className="flex items-end gap-2">
            <span className="font-headline text-3xl">12</span>
            <Swords className="h-5 w-5 text-muted-foreground mb-1.5" />
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">8 Wins - 4 Lose</p>
        </Card>
      </div>

      {/* MATCH LIST TIMELINE */}
      <div className="space-y-6 relative">
        {/* Vertical Line */}
        <div className="absolute left-4 top-2 bottom-0 w-px bg-border border-l border-dashed border-muted-foreground/30"></div>

        {/* Match Item 1 (WIN) */}
        <div className="relative pl-10 animate-in slide-in-from-bottom-2 duration-500">
          <div className="absolute left-2.5 top-3 h-3 w-3 rounded-full bg-green-500 ring-4 ring-background z-10"></div>
          
          <Card className="rounded-3xl border-none shadow-m3-1 overflow-hidden">
             <div className="bg-green-500/10 p-3 flex justify-between items-center border-b border-green-500/10">
                <Badge className="bg-green-500 hover:bg-green-600 text-white border-none text-[10px]">VICTORY</Badge>
                <span className="text-[10px] font-mono opacity-60 flex items-center gap-1"><Calendar size={10}/> 12 Dec 2024</span>
             </div>
             <div className="p-4">
                <p className="text-xs text-muted-foreground font-bold mb-2">Road to BCC • Group Stage</p>
                <div className="flex justify-between items-center">
                   <div className="font-bold">You / Kevin</div>
                   <div className="text-xl font-headline text-green-600">2 - 0</div>
                   <div className="font-bold opacity-50">Lawan A / B</div>
                </div>
                <div className="mt-2 text-center text-xs font-mono bg-secondary/50 rounded-lg py-1">
                   21-18 • 21-15
                </div>
             </div>
          </Card>
        </div>

        {/* Match Item 2 (LOSE) */}
        <div className="relative pl-10 animate-in slide-in-from-bottom-2 duration-500 delay-100">
          <div className="absolute left-2.5 top-3 h-3 w-3 rounded-full bg-red-500 ring-4 ring-background z-10"></div>
          
          <Card className="rounded-3xl border-none shadow-m3-1 overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
             <div className="bg-red-500/10 p-3 flex justify-between items-center border-b border-red-500/10">
                <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 text-[10px]">DEFEAT</Badge>
                <span className="text-[10px] font-mono opacity-60 flex items-center gap-1"><Calendar size={10}/> 10 Dec 2024</span>
             </div>
             <div className="p-4">
                <p className="text-xs text-muted-foreground font-bold mb-2">Friendly Match</p>
                <div className="flex justify-between items-center">
                   <div className="font-bold">You / Kevin</div>
                   <div className="text-xl font-headline text-red-500">1 - 2</div>
                   <div className="font-bold">Champion / Pro</div>
                </div>
                <div className="mt-2 text-center text-xs font-mono bg-secondary/50 rounded-lg py-1">
                   21-19 • 15-21 • 18-21
                </div>
             </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
