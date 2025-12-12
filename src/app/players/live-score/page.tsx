"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleDot, Share2, MapPin, Trophy } from "lucide-react";

export default function LiveScorePage() {
  return (
    <div className="min-h-screen bg-background pb-24 px-4 pt-6">
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
          <h1 className="font-headline text-xl tracking-tight">LIVE <span className="text-primary">COURTS</span></h1>
        </div>
        <Button size="icon" variant="ghost" className="rounded-full">
           <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* FILTER COURTS */}
      <Tabs defaultValue="court1" className="w-full space-y-6">
        <TabsList className="bg-transparent p-0 gap-2 overflow-x-auto justify-start w-full scrollbar-hide">
          {['Court 1', 'Court 2', 'Court 3', 'Court 4'].map((court, idx) => (
            <TabsTrigger 
              key={court} 
              value={`court${idx+1}`}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary transition-all shadow-sm"
            >
              {court}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="court1" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* MAIN SCOREBOARD CARD */}
          <div className="bg-card rounded-[2.5rem] overflow-hidden shadow-m3-3 border border-border/50 relative">
            {/* Header info */}
            <div className="bg-secondary/30 p-4 flex justify-between items-center text-xs font-bold text-muted-foreground border-b border-dashed">
               <span className="flex items-center gap-1"><MapPin size={12}/> Court 1 - Senayan</span>
               <span className="text-primary">SET 3 (RUBBER)</span>
            </div>

            {/* Scores Area */}
            <div className="p-6">
              {/* Player 1 */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-headline text-2xl leading-none">KEVIN / MARCUS</h2>
                  <p className="text-xs text-muted-foreground font-bold">PB. DJARUM</p>
                </div>
                <div className="text-5xl font-mono font-bold tracking-tighter">19</div>
              </div>

              {/* VS Divider */}
              <div className="relative h-px bg-border my-6">
                 <div className="absolute left-1/2 -top-3 -translate-x-1/2 bg-card px-2 text-xs font-bold text-muted-foreground">VS</div>
              </div>

              {/* Player 2 */}
              <div className="flex justify-between items-center mt-6">
                <div>
                  <h2 className="font-headline text-2xl leading-none opacity-50">FAJAR / RIAN</h2>
                  <p className="text-xs text-muted-foreground font-bold">PB. SGS PLN</p>
                  <Badge variant="secondary" className="mt-1 text-[10px] h-5">Serve</Badge>
                </div>
                <div className="text-5xl font-mono font-bold tracking-tighter opacity-50">17</div>
              </div>
            </div>

            {/* Set History Bubbles */}
            <div className="bg-foreground text-background p-4 flex justify-between items-center">
               <div className="flex gap-2">
                 <div className="flex flex-col items-center gap-1">
                   <span className="text-[8px] font-bold opacity-60">SET 1</span>
                   <Badge className="bg-green-500 text-white border-none h-6 w-6 flex items-center justify-center p-0 rounded-full text-[10px]">21</Badge>
                   <span className="text-[10px] font-bold">18</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                   <span className="text-[8px] font-bold opacity-60">SET 2</span>
                   <span className="text-[10px] font-bold">19</span>
                   <Badge className="bg-red-500 text-white border-none h-6 w-6 flex items-center justify-center p-0 rounded-full text-[10px]">21</Badge>
                 </div>
               </div>
               
               <div className="text-right">
                  <p className="text-[10px] opacity-70">Duration</p>
                  <p className="font-mono font-bold text-lg">00:45:12</p>
               </div>
            </div>
          </div>

          {/* UPCOMING NEXT */}
          <div className="mt-6">
            <h3 className="font-bold text-sm mb-3 pl-2 text-muted-foreground uppercase tracking-widest">Up Next on Court 1</h3>
            <Card className="p-4 rounded-3xl border-none shadow-m3-1 flex justify-between items-center bg-secondary/20">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Trophy size={18} />
                 </div>
                 <div>
                   <p className="font-bold text-sm">Semi Final MD</p>
                   <p className="text-xs text-muted-foreground">Ahsan/Hendra vs Leo/Daniel</p>
                 </div>
               </div>
               <Badge variant="outline" className="text-[10px]">14:00</Badge>
            </Card>
          </div>

        </TabsContent>
      </Tabs>
    </div>
  );
}
