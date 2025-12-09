'use client';

import { useState } from "react";
import { 
  Megaphone, Shirt, UserCheck, ArrowRight, 
  Clock, AlertCircle, CheckCircle2, Shield, 
  Mic2, Footprints, XCircle 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

// --- MOCK DATA: MATCH QUEUE ---
const CALL_QUEUE = [
  { 
    id: "M-101", 
    court: "C-1", 
    time: "14:00", 
    category: "MD OPEN", 
    round: "SF",
    teamA: { name: "Kevin / Marcus", club: "PB Jaya Raya", jersey: "Red", status: "PRESENT" },
    teamB: { name: "Ahsan / Hendra", club: "PB Djarum", jersey: "Black", status: "ABSENT" },
    status: "WAITING_OPPONENT" // READY, WAITING_OPPONENT, DEPLOYING
  },
  { 
    id: "M-102", 
    court: "C-2", 
    time: "14:15", 
    category: "MS PRO", 
    round: "QF",
    teamA: { name: "Anthony Ginting", club: "SGS PLN", jersey: "White", status: "PRESENT" },
    teamB: { name: "Jonatan Christie", club: "Tangkas", jersey: "Blue", status: "PRESENT" },
    status: "READY_TO_CHECK" 
  },
  { 
    id: "M-103", 
    court: "C-3", 
    time: "14:20", 
    category: "WD OPEN", 
    round: "R16",
    teamA: { name: "Apri / Fadia", club: "Eng Hian Acad", jersey: "Yellow", status: "PRESENT" },
    teamB: { name: "Ribka / Lanny", club: "PB Djarum", jersey: "Navy", status: "PRESENT" },
    status: "CHECKED_IN" 
  },
];

export default function MLOCallRoomPage() {
  const [selectedMatch, setSelectedMatch] = useState<typeof CALL_QUEUE[0] | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);

  // Checkbox States for Inspection
  const [checks, setChecks] = useState({
    idCard: false,
    jerseyColor: false,
    equipment: false,
    adsRegulation: false
  });

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
        setIsDeploying(false);
        setSelectedMatch(null);
        // Logic update status ke Match Control
    }, 1500);
  };

  return (
    <div className="space-y-6 p-4 md:p-6 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-lime-500 text-lime-500 bg-lime-500/10 backdrop-blur-md animate-pulse">
                    <Mic2 className="w-3 h-3 mr-2" /> CALL ROOM ACTIVE
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-600">Tunnel</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Pintu terakhir sebelum arena. Pastikan atlet siap tempur.
            </p>
        </div>

        {/* QUICK ANNOUNCE */}
        <Button className="h-14 rounded-full px-8 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white font-bold text-lg">
            <Megaphone className="mr-2 w-5 h-5 text-lime-500"/> PANGGIL ATLET
        </Button>
      </div>

      {/* --- MAIN QUEUE --- */}
      <div className="flex-1 bg-zinc-900/50 border border-zinc-800/50 rounded-[40px] p-2 backdrop-blur-sm overflow-hidden flex flex-col">
        <Tabs defaultValue="queue" className="w-full h-full flex flex-col">
            
            <div className="px-4 py-4 shrink-0">
                <TabsList className="bg-zinc-950 p-1 rounded-full h-14 border border-zinc-800 w-full md:w-auto">
                    <TabsTrigger value="queue" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-lime-600 data-[state=active]:text-black">
                        QUEUE LIST ({CALL_QUEUE.length})
                    </TabsTrigger>
                    <TabsTrigger value="deployed" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        DEPLOYED (ON COURT)
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="queue" className="flex-1 overflow-hidden p-2 mt-0">
                <ScrollArea className="h-full">
                    <div className="space-y-4 pb-20">
                        {CALL_QUEUE.map((match) => (
                            <div 
                                key={match.id}
                                onClick={() => setSelectedMatch(match)}
                                className={cn(
                                    "group relative flex flex-col md:flex-row items-center gap-6 p-6 rounded-[32px] border-2 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]",
                                    match.status === 'READY_TO_CHECK' ? "bg-zinc-900 border-lime-500/50 shadow-[0_0_20px_rgba(132,204,22,0.1)]" : 
                                    match.status === 'CHECKED_IN' ? "bg-lime-950/20 border-lime-500" :
                                    "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                                )}
                            >
                                {/* Court Info (Left) */}
                                <div className="flex flex-col items-center justify-center w-24 shrink-0">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">COURT</span>
                                    <span className="text-4xl font-black text-white font-mono">{match.court.split('-')[1]}</span>
                                    <Badge variant="outline" className="mt-2 border-zinc-700 text-zinc-400 text-[10px]">{match.time}</Badge>
                                </div>

                                {/* Matchup (Center) */}
                                <div className="flex-1 w-full text-center md:text-left">
                                    <div className="flex justify-center md:justify-start items-center gap-3 mb-2">
                                        <Badge className="bg-zinc-800 text-white hover:bg-zinc-700">{match.category}</Badge>
                                        <span className="text-xs font-bold text-zinc-500">{match.round} • {match.id}</span>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2">
                                        {/* Team A */}
                                        <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-zinc-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                                                <div className="text-left">
                                                    <p className="font-bold text-white text-sm leading-none">{match.teamA.name}</p>
                                                    <p className="text-[10px] text-zinc-500 uppercase mt-1">{match.teamA.club}</p>
                                                </div>
                                            </div>
                                            {match.teamA.status === 'PRESENT' ? (
                                                <Badge className="bg-green-500/20 text-green-500 border-none">HADIR</Badge>
                                            ) : (
                                                <Badge className="bg-red-500/20 text-red-500 border-none animate-pulse">BELUM</Badge>
                                            )}
                                        </div>

                                        {/* Team B */}
                                        <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-zinc-800/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1 h-8 bg-red-500 rounded-full"></div>
                                                <div className="text-left">
                                                    <p className="font-bold text-white text-sm leading-none">{match.teamB.name}</p>
                                                    <p className="text-[10px] text-zinc-500 uppercase mt-1">{match.teamB.club}</p>
                                                </div>
                                            </div>
                                            {match.teamB.status === 'PRESENT' ? (
                                                <Badge className="bg-green-500/20 text-green-500 border-none">HADIR</Badge>
                                            ) : (
                                                <Badge className="bg-red-500/20 text-red-500 border-none animate-pulse">BELUM</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Action (Right) */}
                                <div className="w-full md:w-auto flex flex-col gap-2">
                                    {match.status === 'CHECKED_IN' ? (
                                        <Button className="h-14 w-full md:w-32 rounded-2xl bg-lime-500 hover:bg-lime-400 text-black font-black text-lg shadow-lg shadow-lime-500/20">
                                            DEPLOY <ArrowRight className="ml-2 w-5 h-5"/>
                                        </Button>
                                    ) : (
                                        <Button variant="outline" className="h-14 w-full md:w-32 rounded-2xl border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white font-bold group-hover:border-lime-500/50 transition-colors">
                                            <UserCheck className="mr-2 w-5 h-5"/> INSPECT
                                        </Button>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </TabsContent>
        </Tabs>
      </div>

      {/* --- INSPECTION SHEET (THE TUNNEL CHECK) --- */}
      <Sheet open={!!selectedMatch} onOpenChange={() => setSelectedMatch(null)}>
        <SheetContent className="w-full sm:max-w-md bg-zinc-950 border-l border-zinc-800 p-0 overflow-y-auto">
            {selectedMatch && (
                <div className="flex flex-col h-full">
                    
                    {/* Header: Match Info */}
                    <div className="bg-zinc-900 p-8 border-b border-zinc-800">
                        <div className="flex justify-between items-start mb-4">
                            <Badge variant="outline" className="border-lime-500 text-lime-500 font-mono bg-lime-500/10">
                                {selectedMatch.id}
                            </Badge>
                            <span className="text-2xl font-black text-white">COURT {selectedMatch.court.split('-')[1]}</span>
                        </div>
                        <h2 className="text-lg font-bold text-white leading-tight mb-1">{selectedMatch.teamA.name}</h2>
                        <div className="text-xs font-black text-zinc-600 uppercase mb-1">VS</div>
                        <h2 className="text-lg font-bold text-white leading-tight">{selectedMatch.teamB.name}</h2>
                    </div>

                    <div className="p-8 space-y-8 flex-1">
                        
                        {/* 1. PRESENCE CHECK */}
                        <div>
                            <h4 className="text-xs font-bold text-zinc-500 uppercase mb-4 tracking-widest flex items-center gap-2">
                                <UserCheck className="w-4 h-4 text-lime-500"/> Kehadiran Atlet
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <Button 
                                    variant={selectedMatch.teamA.status === 'PRESENT' ? "default" : "outline"}
                                    className={cn("h-12 rounded-xl font-bold", selectedMatch.teamA.status === 'PRESENT' ? "bg-green-600 hover:bg-green-700" : "border-zinc-700 text-zinc-400")}
                                >
                                    Team A {selectedMatch.teamA.status === 'PRESENT' && <CheckCircle2 className="ml-2 w-4 h-4"/>}
                                </Button>
                                <Button 
                                    variant={selectedMatch.teamB.status === 'PRESENT' ? "default" : "outline"}
                                    className={cn("h-12 rounded-xl font-bold", selectedMatch.teamB.status === 'PRESENT' ? "bg-green-600 hover:bg-green-700" : "border-zinc-700 text-zinc-400")}
                                >
                                    Team B {selectedMatch.teamB.status === 'PRESENT' && <CheckCircle2 className="ml-2 w-4 h-4"/>}
                                </Button>
                            </div>
                            {selectedMatch.status === 'WAITING_OPPONENT' && (
                                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-xs font-bold">
                                    <AlertCircle className="w-5 h-5"/>
                                    Lawan belum hadir di Call Room!
                                    <Button size="sm" variant="link" className="text-red-400 underline ml-auto h-auto p-0">Call Out</Button>
                                </div>
                            )}
                        </div>

                        {/* 2. GEAR INSPECTION (SOP: 235) */}
                        <div>
                            <h4 className="text-xs font-bold text-zinc-500 uppercase mb-4 tracking-widest flex items-center gap-2">
                                <Shield className="w-4 h-4 text-lime-500"/> Gear Inspection
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                                    <Checkbox id="c1" className="w-6 h-6 border-zinc-600 data-[state=checked]:bg-lime-500 data-[state=checked]:text-black" />
                                    <div className="grid gap-1.5 leading-none">
                                        <label htmlFor="c1" className="text-sm font-bold text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            ID Card / Akreditasi
                                        </label>
                                        <p className="text-xs text-zinc-500">Sesuai dengan nama di bagan.</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                                    <Checkbox id="c2" className="w-6 h-6 border-zinc-600 data-[state=checked]:bg-lime-500 data-[state=checked]:text-black" />
                                    <div className="grid gap-1.5 leading-none">
                                        <label htmlFor="c2" className="text-sm font-bold text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Jersey Regulation (Warna)
                                        </label>
                                        <p className="text-xs text-zinc-500">
                                            A: <span className="text-white font-bold">{selectedMatch.teamA.jersey}</span> vs B: <span className="text-white font-bold">{selectedMatch.teamB.jersey}</span> (Kontras OK)
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                                    <Checkbox id="c3" className="w-6 h-6 border-zinc-600 data-[state=checked]:bg-lime-500 data-[state=checked]:text-black" />
                                    <div className="grid gap-1.5 leading-none">
                                        <label htmlFor="c3" className="text-sm font-bold text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Equipment Check
                                        </label>
                                        <p className="text-xs text-zinc-500">Raket, sepatu, dan tas aman.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
                        {isDeploying ? (
                            <Button disabled className="w-full h-16 rounded-2xl bg-lime-600 text-black font-black text-lg animate-pulse">
                                DEPLOYING TO ARENA...
                            </Button>
                        ) : (
                            <div className="grid grid-cols-4 gap-3">
                                <Button variant="outline" className="col-span-1 h-16 rounded-2xl border-red-900/50 text-red-500 hover:bg-red-950 flex flex-col gap-1">
                                    <XCircle className="w-6 h-6"/>
                                    <span className="text-[10px] font-bold">WO</span>
                                </Button>
                                <Button onClick={handleDeploy} className="col-span-3 h-16 rounded-2xl bg-lime-500 hover:bg-lime-400 text-black font-black text-lg shadow-lg shadow-lime-900/20">
                                    DEPLOY TO COURT <Footprints className="ml-2 w-6 h-6"/>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </SheetContent>
      </Sheet>

    </div>
  );
}
