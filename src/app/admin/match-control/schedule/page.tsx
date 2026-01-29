
'use client';

import { useState } from "react";
import { 
  CalendarDays, Clock, MapPin, Plus, 
  Filter, Save, RefreshCw, AlertTriangle, 
  MoreHorizontal, ChevronRight, GripVertical, Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const DAYS = ["DAY 1 (Fri)", "DAY 2 (Sat)", "DAY 3 (Sun)"];
const COURTS = ["Court 1 (TV)", "Court 2", "Court 3", "Court 4"];

// Matches that are already scheduled
const SCHEDULED_MATCHES = [
  { id: "M-101", court: "Court 1 (TV)", time: "09:00", pA: "Kevin / Marcus", pB: "Ahsan / Hendra", cat: "MD OPEN", status: "LOCKED" },
  { id: "M-102", court: "Court 1 (TV)", time: "09:45", pA: "Fajar / Rian", pB: "Leo / Daniel", cat: "MD OPEN", status: "DRAFT" },
  { id: "M-201", court: "Court 2", time: "09:00", pA: "Ginting", pB: "Christie", cat: "MS PRO", status: "DRAFT" },
  { id: "M-301", court: "Court 3", time: "09:00", pA: "Gregoria", pB: "Akane", cat: "WS PRO", status: "DRAFT" },
  { id: "M-103", court: "Court 1 (TV)", time: "10:30", pA: "Apri / Fadia", pB: "Matsuyama / Shida", cat: "WD OPEN", status: "DRAFT" },
];

// Matches waiting to be assigned
const POOL_MATCHES = [
  { id: "M-401", pA: "Rehan / Lisa", pB: "Rinov / Pitha", cat: "XD OPEN" },
  { id: "M-402", pA: "Dejan / Gloria", pB: "Praveen / Melati", cat: "XD OPEN" },
  { id: "M-501", pA: "Axelsen", pB: "Antonsen", cat: "MS PRO" },
];

export default function ScheduleEditorPage() {
  const [activeDay, setActiveDay] = useState("DAY 1 (Fri)");
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [isPoolOpen, setIsPoolOpen] = useState(false);

  // Filter matches by court for the column view
  const getMatchesForCourt = (courtName: string) => {
    return SCHEDULED_MATCHES.filter(m => m.court === courtName).sort((a, b) => a.time.localeCompare(b.time));
  };

  return (
    <div className="space-y-6 p-4 md:p-8 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-sky-500 text-sky-500 bg-sky-500/10 backdrop-blur-md">
                    <CalendarDays className="w-3 h-3 mr-2" /> FIXTURE ARCHITECT
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Schedule <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Builder</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Drag & drop jadwal, atur alur pertandingan, dan publikasikan fixture.
            </p>
        </div>

        <div className="flex gap-3">
            <Button variant="outline" className="h-12 rounded-full border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
                <RefreshCw className="mr-2 w-4 h-4"/> Auto-Generate
            </Button>
            <Button className="h-12 rounded-full px-6 bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-[0_0_20px_rgba(8,145,178,0.4)]">
                <Save className="mr-2 w-4 h-4"/> PUBLISH FIXTURE
            </Button>
        </div>
      </div>

      {/* --- TOOLBAR --- */}
      <div className="flex items-center justify-between bg-zinc-900/50 p-2 rounded-full border border-zinc-800/50 backdrop-blur-sm shrink-0 overflow-x-auto">
         <div className="flex items-center gap-2 p-1">
            {DAYS.map((day) => (
                <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={cn(
                        "px-6 h-10 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                        activeDay === day 
                            ? "bg-white text-black shadow-lg" 
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    )}
                >
                    {day}
                </button>
            ))}
         </div>
         
         <div className="flex items-center gap-2 pr-2">
             <div className="hidden md:flex items-center gap-2 text-xs font-bold text-zinc-500 mr-4 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Published
                <span className="w-2 h-2 rounded-full bg-yellow-500 ml-2"></span> Draft
             </div>
             <Button 
                onClick={() => setIsPoolOpen(!isPoolOpen)}
                variant="secondary" 
                className={cn("rounded-full h-10 font-bold transition-colors", isPoolOpen && "bg-sky-500/20 text-sky-500")}
             >
                Unscheduled Pool <Badge className="ml-2 bg-zinc-900">{POOL_MATCHES.length}</Badge>
             </Button>
         </div>
      </div>

      {/* --- MAIN EDITOR CANVAS --- */}
      <div className="flex-1 flex gap-6 overflow-hidden relative">
         
         {/* COURT COLUMNS (SWIMLANES) */}
         <ScrollArea className="flex-1 rounded-[32px] bg-zinc-950/30 border border-zinc-800/50">
            <div className="flex p-6 gap-6 min-w-max h-full">
                {COURTS.map((court, i) => (
                    <div key={i} className="w-[320px] flex flex-col gap-4">
                        {/* Column Header */}
                        <div className="flex items-center justify-between bg-zinc-900 p-4 rounded-2xl border border-zinc-800 sticky top-0 z-10 shadow-xl">
                            <div className="font-black text-white uppercase flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-sky-500"/> {court}
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-zinc-500 cursor-pointer"/>
                        </div>

                        {/* Match Slots */}
                        <div className="flex-1 space-y-3 pb-20">
                            {getMatchesForCourt(court).map((match) => (
                                <div 
                                    key={match.id}
                                    onClick={() => setSelectedMatch(match)} 
                                    className={cn(
                                        "group relative p-4 rounded-[24px] border-2 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl",
                                        match.status === 'LOCKED' 
                                            ? "bg-zinc-900/50 border-green-900/30 hover:border-green-500/50" 
                                            : "bg-zinc-900 border-zinc-800 hover:border-sky-500/50"
                                    )}
                                >
                                    {/* Drag Handle */}
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-20">
                                        <GripVertical className="w-4 h-4" />
                                    </div>

                                    <div className="pl-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2 bg-zinc-950 px-2 py-1 rounded-lg border border-zinc-800">
                                                <Clock className="w-3 h-3 text-sky-500"/>
                                                <span className="text-xs font-mono font-bold text-white">{match.time}</span>
                                            </div>
                                            <Badge variant="outline" className="border-zinc-800 text-[9px] text-zinc-500 px-1.5 h-5">{match.id}</Badge>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-white truncate">{match.pA}</p>
                                            <p className="text-[10px] font-black text-zinc-600 uppercase">VS</p>
                                            <p className="text-sm font-bold text-white truncate">{match.pB}</p>
                                        </div>

                                        <div className="mt-3 pt-2 border-t border-zinc-800/50 flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-zinc-500 bg-zinc-950/50 px-2 py-0.5 rounded">{match.cat}</span>
                                            {match.status === 'LOCKED' && <span className="text-[10px] text-green-600 font-bold uppercase flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Locked</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Empty Slot Placeholder */}
                            <div className="h-24 rounded-[24px] border-2 border-dashed border-zinc-800/50 flex flex-col items-center justify-center text-zinc-700 hover:border-zinc-700 hover:bg-zinc-900/20 transition-all cursor-pointer opacity-50 hover:opacity-100">
                                <Plus className="w-6 h-6 mb-1"/>
                                <span className="text-xs font-bold uppercase tracking-widest">Free Slot</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
         </ScrollArea>

         {/* SIDE DRAWER: UNSCHEDULED POOL */}
         {isPoolOpen && (
             <div className="w-80 bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 rounded-l-[32px] overflow-hidden">
                <div className="p-6 border-b border-zinc-800 bg-zinc-950/50">
                    <h3 className="font-black font-headline uppercase text-white flex items-center gap-2">
                        <Filter className="w-4 h-4 text-sky-500"/> Pool
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">Drag ke slot kosong.</p>
                </div>
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-3">
                        {POOL_MATCHES.map(m => (
                            <div key={m.id} className="p-4 bg-black border border-zinc-800 rounded-[20px] hover:border-zinc-600 cursor-grab active:cursor-grabbing">
                                <div className="flex justify-between mb-2">
                                    <Badge className="bg-zinc-900 text-zinc-400 border-none text-[10px]">{m.id}</Badge>
                                    <span className="text-[10px] font-bold text-sky-600">{m.cat}</span>
                                </div>
                                <div className="text-xs font-bold text-white mb-1">{m.pA}</div>
                                <div className="text-[10px] text-zinc-600 font-bold mb-1">VS</div>
                                <div className="text-xs font-bold text-white">{m.pB}</div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
             </div>
         )}

      </div>

      {/* --- EDIT MATCH MODAL --- */}
      <Dialog open={!!selectedMatch} onOpenChange={() => setSelectedMatch(null)}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-md p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 bg-zinc-900/50">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-sky-500"/> Edit Slot
                    </DialogTitle>
                    <DialogDescription>{selectedMatch?.id} • {selectedMatch?.cat}</DialogDescription>
                </DialogHeader>
            </div>
            
            <div className="p-8 space-y-6">
                
                {/* Match Info Readonly */}
                <div className="bg-zinc-900 p-4 rounded-[20px] border border-zinc-800 text-center space-y-2">
                    <div className="font-bold text-white">{selectedMatch?.pA}</div>
                    <div className="text-xs font-black text-zinc-600">VS</div>
                    <div className="font-bold text-white">{selectedMatch?.pB}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Court</label>
                        <Select defaultValue={selectedMatch?.court}>
                            <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12 rounded-xl"><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                {COURTS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Time</label>
                        <Input type="time" defaultValue={selectedMatch?.time} className="bg-zinc-900 border-zinc-800 h-12 rounded-xl font-mono" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Conflict Check</label>
                    <div className="flex items-center gap-2 text-xs font-bold text-green-500 bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                        <CheckCircle2 className="w-4 h-4"/> No Schedule Conflict
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button variant="outline" className="h-14 rounded-full border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800">
                        Unschedule
                    </Button>
                    <Button className="h-14 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-lg shadow-sky-900/20">
                        Save Changes
                    </Button>
                </div>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

function CheckCircle2({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
}
