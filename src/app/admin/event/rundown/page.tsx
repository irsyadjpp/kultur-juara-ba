'use client';

import { useState, useEffect } from "react";
import { 
  Timer, Mic2, Music, Zap, 
  Play, Pause, FastForward, Edit3, 
  MoreVertical, CalendarClock, Flag, 
  Megaphone, CheckCircle2, CircleDashed 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const RUNDOWN_ITEMS = [
  { 
    id: "R-01", 
    time: "08:00", 
    duration: "60m", 
    activity: "Open Gate & Registration", 
    category: "OPS", 
    pic: "Gate Team", 
    status: "DONE",
    notes: "Pastikan scanner tiket ready."
  },
  { 
    id: "R-02", 
    time: "09:00", 
    duration: "15m", 
    activity: "Opening Ceremony: MC Opening", 
    category: "SHOW", 
    pic: "MC (Raffi)", 
    status: "LIVE",
    notes: "Cue Music: Opening_BCC_2026.mp3 (Fade In)"
  },
  { 
    id: "R-03", 
    time: "09:15", 
    duration: "10m", 
    activity: "Sambutan Ketua PBSI", 
    category: "PROTOCOL", 
    pic: "Stage Mgr", 
    status: "NEXT",
    notes: "Mic 1 (Wireless) Standby."
  },
  { 
    id: "R-04", 
    time: "09:30", 
    duration: "180m", 
    activity: "Match Session 1 (Penyisihan)", 
    category: "MATCH", 
    pic: "Referee", 
    status: "UPCOMING",
    notes: "8 Court simultaneous."
  },
  { 
    id: "R-05", 
    time: "12:30", 
    duration: "60m", 
    activity: "ISHOMA / Break", 
    category: "BREAK", 
    pic: "All Crew", 
    status: "UPCOMING",
    notes: "Screen tampilkan slide sponsor."
  },
];

const CATEGORIES = [
  { id: "SHOW", label: "Show / Entertainment", icon: Music, color: "text-purple-400 border-purple-500 bg-purple-500/10" },
  { id: "MATCH", label: "Competition", icon: Zap, color: "text-red-400 border-red-500 bg-red-500/10" },
  { id: "PROTOCOL", label: "Protocol / Speech", icon: Mic2, color: "text-blue-400 border-blue-500 bg-blue-500/10" },
  { id: "OPS", label: "Operations", icon: Flag, color: "text-zinc-400 border-zinc-500 bg-zinc-500/10" },
];

export default function MasterRundownPage() {
  const [currentTime, setCurrentTime] = useState("");
  const [selectedItem, setSelectedItem] = useState<typeof RUNDOWN_ITEMS[0] | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Realtime Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getCategoryStyle = (catId: string) => {
    return CATEGORIES.find(c => c.id === catId) || CATEGORIES[3];
  };

  return (
    <div className="space-y-6 p-4 md:p-8 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-purple-500 text-purple-500 bg-purple-500/10 backdrop-blur-md animate-pulse">
                    <Timer className="w-3 h-3 mr-2" /> SHOW DIRECTOR MODE
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Run of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Show</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Master timeline acara, cue panggung, dan koordinasi teknis.
            </p>
        </div>

        {/* LIVE CLOCK WIDGET */}
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-[24px] flex items-center gap-4 shadow-2xl">
            <div className="text-right">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Master Clock</p>
                <p className="text-3xl font-black text-white font-mono leading-none">{currentTime}</p>
            </div>
            <div className="h-10 w-[1px] bg-zinc-800"></div>
            <Button variant="outline" className="h-12 w-12 rounded-xl border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white p-0">
                <Megaphone className="w-5 h-5"/>
            </Button>
        </div>
      </div>

      {/* --- MAIN SEQUENCER --- */}
      <div className="flex-1 bg-zinc-900/50 border border-zinc-800/50 rounded-[40px] p-2 backdrop-blur-sm flex flex-col min-h-0 overflow-hidden relative">
        
        {/* TIME MARKER LINE (Visual Decoration) */}
        <div className="absolute left-[88px] top-0 bottom-0 w-[2px] bg-zinc-800 z-0"></div>

        <ScrollArea className="flex-1 h-full px-4 py-4">
            <div className="space-y-6 relative z-10">
                {RUNDOWN_ITEMS.map((item, index) => {
                    const style = getCategoryStyle(item.category);
                    const Icon = style.icon;
                    const isLive = item.status === 'LIVE';

                    return (
                        <div key={item.id} className={cn("flex group", isLive ? "opacity-100" : item.status === 'DONE' ? "opacity-50" : "opacity-80")}>
                            
                            {/* Time Column */}
                            <div className="w-20 text-right pr-6 pt-2 shrink-0 relative">
                                <span className={cn("text-lg font-black font-mono", isLive ? "text-purple-400" : "text-zinc-500")}>
                                    {item.time}
                                </span>
                                {/* Timeline Dot */}
                                <div className={cn(
                                    "absolute right-[-5px] top-4 w-3 h-3 rounded-full border-2 z-20 bg-zinc-950",
                                    isLive ? "border-purple-500 bg-purple-500 shadow-[0_0_15px_#a855f7]" : 
                                    item.status === 'DONE' ? "border-zinc-700 bg-zinc-700" : "border-zinc-500"
                                )}></div>
                            </div>

                            {/* Event Card */}
                            <div 
                                onClick={() => { setSelectedItem(item); setIsEditOpen(true); }}
                                className={cn(
                                    "flex-1 rounded-[24px] border-2 p-5 transition-all cursor-pointer hover:scale-[1.01] relative overflow-hidden",
                                    isLive 
                                        ? "bg-zinc-900 border-purple-500 shadow-xl" 
                                        : "bg-zinc-950 border-zinc-800 hover:border-zinc-600"
                                )}
                            >
                                {isLive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-500 animate-pulse"></div>}

                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className={cn("text-[9px] font-black border-none px-2 py-1", style.color)}>
                                            <Icon className="w-3 h-3 mr-1"/> {style.label}
                                        </Badge>
                                        <span className="text-xs font-bold text-zinc-500 flex items-center gap-1">
                                            <CalendarClock className="w-3 h-3"/> {item.duration}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {isLive && <span className="text-[10px] font-black text-red-500 uppercase tracking-wider animate-pulse">● ON AIR</span>}
                                        {item.status === 'DONE' && <CheckCircle2 className="w-5 h-5 text-zinc-600"/>}
                                    </div>
                                </div>

                                <h3 className={cn("text-xl font-bold leading-tight mb-2", isLive ? "text-white" : "text-zinc-300")}>
                                    {item.activity}
                                </h3>

                                <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-start gap-3">
                                    <div className="mt-0.5"><Mic2 className="w-4 h-4 text-zinc-500"/></div>
                                    <div className="text-sm text-zinc-400 font-mono leading-relaxed">
                                        <span className="text-zinc-600 font-bold uppercase text-[10px] block mb-1">Technical Cue</span>
                                        {item.notes}
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-xs font-bold text-zinc-500">PIC: {item.pic}</span>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-zinc-800">
                                        <MoreVertical className="w-4 h-4 text-zinc-500"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </ScrollArea>

        {/* FLOATING ACTION BUTTON */}
        <div className="absolute bottom-6 right-6">
            <Button className="h-16 w-16 rounded-[24px] bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-transform hover:scale-110">
                <Play className="w-8 h-8 fill-current ml-1"/>
            </Button>
        </div>

      </div>

      {/* --- EDIT MODAL --- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-md p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 bg-purple-950/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2 text-purple-500">
                        <Edit3 className="w-6 h-6"/> Edit Sequence
                    </DialogTitle>
                    <DialogDescription>Ubah detail atau status acara.</DialogDescription>
                </DialogHeader>
            </div>
            
            <div className="p-8 space-y-6">
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Jam Mulai</label>
                        <Input defaultValue={selectedItem?.time} className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl font-mono text-lg" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Durasi</label>
                        <Input defaultValue={selectedItem?.duration} className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Nama Kegiatan</label>
                    <Input defaultValue={selectedItem?.activity} className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl font-bold" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Technical Cue / Notes</label>
                    <Textarea defaultValue={selectedItem?.notes} className="bg-zinc-900 border-zinc-800 rounded-2xl min-h-[100px] font-mono text-sm" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Set Status</label>
                    <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" className="h-12 rounded-xl border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-600">Pending</Button>
                        <Button className="h-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white border-none shadow-lg shadow-purple-900/20">LIVE NOW</Button>
                        <Button variant="outline" className="h-12 rounded-xl border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-600">Done</Button>
                    </div>
                </div>

            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
