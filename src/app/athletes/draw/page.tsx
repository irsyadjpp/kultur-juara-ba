
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Trophy, Shield, Minus, Check } from "lucide-react";

// Komponen Bracket Node Sederhana
const BracketMatch = ({ r1, r2, score }: any) => (
  <div className="flex flex-col justify-center gap-0 w-40 shrink-0 relative">
    <div className="border border-border bg-card p-2 rounded-t-xl flex justify-between items-center text-xs font-bold">
      <span className="truncate w-24">{r1}</span>
      <span className="bg-secondary px-1.5 rounded">{score?.[0] || '-'}</span>
    </div>
    <div className="h-px bg-border w-full"></div>
    <div className="border border-border bg-card p-2 rounded-b-xl flex justify-between items-center text-xs font-bold">
      <span className="truncate w-24">{r2}</span>
      <span className="bg-secondary px-1.5 rounded">{score?.[1] || '-'}</span>
    </div>
    {/* Connector Lines (Visual Only) */}
    <div className="absolute top-1/2 -right-4 w-4 h-px bg-border"></div>
  </div>
);

export default function DrawPage() {
  return (
    <div className="min-h-screen bg-background pb-24 px-4 pt-8">
       <div className="mb-6 px-2">
        <h1 className="font-headline text-3xl">TOURNAMENT <span className="text-primary">DRAW</span></h1>
        <p className="text-xs text-muted-foreground">Pantau posisi grup dan jalur menuju juara.</p>
      </div>

      <Tabs defaultValue="group" className="w-full">
        <div className="overflow-x-auto pb-2 mb-4 scrollbar-hide">
           <TabsList className="inline-flex h-10 items-center justify-center rounded-full bg-secondary/50 p-1">
              <TabsTrigger value="group" className="rounded-full px-6 text-xs font-bold">Group Stage</TabsTrigger>
              <TabsTrigger value="bracket" className="rounded-full px-6 text-xs font-bold">Knockout</TabsTrigger>
           </TabsList>
        </div>

        {/* GROUP STAGE VIEW */}
        <TabsContent value="group" className="space-y-6">
          {['GROUP A', 'GROUP B'].map((group) => (
            <div key={group} className="bg-card rounded-3xl p-5 shadow-m3-1 border border-transparent hover:border-border transition-colors">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-headline text-xl">{group}</h3>
                <Badge variant="outline">MD - Intermediate</Badge>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-dashed border-border hover:bg-transparent">
                    <TableHead className="w-[10px] text-[10px] font-bold">#</TableHead>
                    <TableHead className="text-[10px] font-bold">PLAYER</TableHead>
                    <TableHead className="text-right text-[10px] font-bold">W-L</TableHead>
                    <TableHead className="text-right text-[10px] font-bold">PTS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4].map((pos) => (
                    <TableRow key={pos} className="border-b border-dashed border-border/50 last:border-0 hover:bg-secondary/30">
                      <TableCell className="font-mono text-xs font-bold">
                         {pos === 1 ? <Trophy size={14} className="text-yellow-500" /> : pos}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className={`font-bold text-xs ${pos <= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
                            Player Pair {pos}
                          </span>
                          {pos === 1 && <span className="text-[8px] text-green-600 font-bold uppercase">Qualified</span>}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">3-0</TableCell>
                      <TableCell className="text-right font-headline text-sm">{10 - pos * 2}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </TabsContent>

        {/* BRACKET VIEW (Horizontal Scroll) */}
        <TabsContent value="bracket">
          <div className="bg-gradient-to-br from-secondary/20 to-background rounded-[2rem] border border-border p-6 overflow-x-auto">
            <div className="flex gap-8 min-w-[600px]">
              {/* Round of 16 */}
              <div className="flex flex-col justify-around gap-8">
                <div className="text-center text-[10px] font-bold uppercase tracking-widest mb-2 text-muted-foreground">Quarter Final</div>
                <BracketMatch r1="Kevin/Marcus" r2="Fajar/Rian" score={[21, 19]} />
                <BracketMatch r1="Ahsan/Hendra" r2="Leo/Daniel" score={[0, 0]} />
              </div>
              
              {/* Semi Final */}
              <div className="flex flex-col justify-around gap-8 pt-12">
                 <div className="text-center text-[10px] font-bold uppercase tracking-widest mb-2 text-muted-foreground">Semi Final</div>
                 <BracketMatch r1="Kevin/Marcus" r2="TBD" />
              </div>

               {/* Final */}
               <div className="flex flex-col justify-center gap-8 pt-6">
                 <div className="text-center text-[10px] font-bold uppercase tracking-widest mb-2 text-primary">Grand Final</div>
                 <div className="bg-gradient-sport p-1 rounded-xl shadow-lg shadow-red-500/20">
                   <div className="bg-background rounded-lg p-4 w-40 text-center">
                      <Trophy className="mx-auto text-yellow-500 mb-2 h-8 w-8" />
                      <p className="font-headline text-sm">CHAMPION</p>
                      <p className="text-xs text-muted-foreground">??</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
