
'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, Search, Filter, Calendar, Flag, 
  CheckCircle2, Clock, AlertTriangle, ArrowRight, Target, Zap 
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const ASSIGNMENTS = [
  { 
    id: "M-001", 
    title: "Finalisasi Rundown Opening", 
    desc: "Pastikan durasi sambutan Ketua PBSI tidak lebih dari 5 menit. Koordinasi dengan MC.",
    assignee: { name: "Fajar Alfian", avatar: "https://github.com/shadcn.png", role: "Head of Event" },
    deadline: "Tomorrow, 10:00 AM",
    priority: "HIGH",
    status: "IN_PROGRESS",
    progress: 65 
  },
  { 
    id: "M-002", 
    title: "Cek Kesiapan Genset Venue", 
    desc: "Pastikan backup power 100KVA sudah standby dan tes beban dilakukan H-1.",
    assignee: { name: "Rian Ardianto", avatar: "", role: "Logistics" },
    deadline: "Fri, 14:00 PM",
    priority: "MEDIUM",
    status: "PENDING",
    progress: 0 
  },
  { 
    id: "M-003", 
    title: "Approval Desain Banner Utama", 
    desc: "Review final desain dari vendor sebelum naik cetak besok pagi.",
    assignee: { name: "Kevin Sanjaya", avatar: "", role: "Media" },
    deadline: "Today, 18:00 PM",
    priority: "CRITICAL",
    status: "DONE",
    progress: 100 
  },
];

const PRIORITIES = ["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"];

export default function AssignmentPage() {
  const [filterPriority, setFilterPriority] = useState("ALL");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Helper Styles
  const getPriorityColor = (p: string) => {
    switch(p) {
        case 'CRITICAL': return 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse';
        case 'HIGH': return 'bg-orange-500 text-white';
        case 'MEDIUM': return 'bg-blue-500 text-white';
        default: return 'bg-zinc-700 text-zinc-300';
    }
  };

  const getStatusIcon = (s: string) => {
      switch(s) {
          case 'DONE': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
          case 'IN_PROGRESS': return <Clock className="w-5 h-5 text-blue-500" />;
          default: return <AlertTriangle className="w-5 h-5 text-zinc-500" />;
      }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-primary text-primary bg-primary/10 backdrop-blur-md">
                    <Target className="w-3 h-3 mr-2" /> COMMAND CENTER
                </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-white">
                Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Control</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Delegasikan tugas strategis dan pantau eksekusi lapangan secara real-time.
            </p>
        </div>

        {/* CREATE BUTTON (MD3 FAB Style for Desktop) */}
        <Button 
            onClick={() => setIsCreateOpen(true)}
            className="hidden md:flex h-14 rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all hover:scale-105"
        >
            <Plus className="mr-2 h-6 w-6" /> NEW MISSION
        </Button>
      </div>

      {/* --- TOOLBAR --- */}
      <div className="sticky top-4 z-30 bg-zinc-950/80 backdrop-blur-xl p-2 rounded-[24px] border border-zinc-800 flex flex-col md:flex-row gap-2 shadow-2xl">
         <div className="relative flex-grow">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500" />
            <Input 
                placeholder="Cari tugas atau assignee..." 
                className="h-12 bg-zinc-900 border-none rounded-full pl-12 text-white focus-visible:ring-1 focus-visible:ring-primary placeholder:text-zinc-600"
            />
         </div>
         <div className="flex items-center gap-2 overflow-x-auto px-2 py-1 md:py-0 no-scrollbar">
            {PRIORITIES.map((p) => (
                <button
                    key={p}
                    onClick={() => setFilterPriority(p)}
                    className={cn(
                        "px-5 h-10 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300",
                        filterPriority === p 
                            ? "bg-white text-black shadow-lg scale-105" 
                            : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    )}
                >
                    {p}
                </button>
            ))}
         </div>
      </div>

      {/* --- ASSIGNMENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
         
         {ASSIGNMENTS.map((task) => (
             <div key={task.id} className="group relative bg-zinc-900 rounded-[32px] border border-zinc-800 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between overflow-hidden">
                
                {/* Accent Glow for High Priority */}
                {task.priority === 'CRITICAL' && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 blur-[50px] rounded-full -mr-10 -mt-10 pointer-events-none"></div>
                )}

                <div className="p-6 md:p-8 space-y-6 relative z-10">
                    
                    {/* Header: Badge & Status */}
                    <div className="flex justify-between items-start">
                        <Badge className={cn("rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-wider border-none", getPriorityColor(task.priority))}>
                            {task.priority}
                        </Badge>
                        <div className="bg-zinc-950/50 p-2 rounded-full border border-zinc-800">
                            {getStatusIcon(task.status)}
                        </div>
                    </div>

                    {/* Title & Desc */}
                    <div>
                        <h3 className="text-2xl font-black text-white leading-tight mb-2 group-hover:text-primary transition-colors">
                            {task.title}
                        </h3>
                        <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                            {task.desc}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase tracking-widest">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2 bg-zinc-950" indicatorClassName={task.progress === 100 ? "bg-green-500" : "bg-primary"} />
                    </div>
                </div>

                {/* Footer: Assignee & Deadline */}
                <div className="bg-zinc-950/50 p-6 border-t border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-zinc-800 rounded-xl">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback className="bg-zinc-800 font-bold text-zinc-500 rounded-xl">
                                {task.assignee.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">{task.assignee.name}</span>
                            <span className="text-[10px] text-zinc-500 font-mono uppercase">{task.assignee.role}</span>
                        </div>
                    </div>
                    
                    <div className="text-right">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 mb-0.5 justify-end">
                            <Calendar className="w-3 h-3" /> Deadline
                        </div>
                        <div className="text-xs text-white font-mono bg-zinc-800 px-2 py-1 rounded-md">
                            {task.deadline}
                        </div>
                    </div>
                </div>

             </div>
         ))}

         {/* Create New Card (Placeholder style) */}
         <button 
            onClick={() => setIsCreateOpen(true)}
            className="group min-h-[300px] rounded-[32px] border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center gap-4 hover:bg-zinc-900/50 hover:border-primary/50 transition-all cursor-pointer"
         >
            <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-primary group-hover:border-primary">
                <Plus className="w-10 h-10 text-zinc-500 group-hover:text-white" />
            </div>
            <div className="text-zinc-500 font-bold uppercase tracking-widest text-sm group-hover:text-primary">
                Deploy New Mission
            </div>
         </button>

      </div>

      {/* --- MOBILE FAB --- */}
      <button 
        onClick={() => setIsCreateOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-16 h-16 bg-primary text-white rounded-[24px] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* --- MODAL CREATE (MD3 Style) --- */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-lg bg-zinc-950 border-zinc-800 p-0 overflow-hidden rounded-[40px] shadow-2xl">
            
            <div className="p-8 border-b border-zinc-800 bg-zinc-900/50">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-black font-headline uppercase flex items-center gap-3">
                        <Zap className="w-8 h-8 text-primary fill-primary" /> New Mission
                    </DialogTitle>
                    <DialogDescription className="text-base text-zinc-400">
                        Berikan arahan strategis kepada Kepala Divisi.
                    </DialogDescription>
                </DialogHeader>
            </div>

            <div className="p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Judul Misi</label>
                    <Input placeholder="Cth: Koordinasi Keamanan VVIP" className="h-14 bg-zinc-900 border-zinc-800 rounded-2xl text-lg font-bold" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Prioritas</label>
                        <Select>
                            <SelectTrigger className="h-14 bg-zinc-900 border-zinc-800 rounded-2xl"><SelectValue placeholder="Pilih" /></SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                <SelectItem value="CRITICAL" className="text-red-500 font-bold">CRITICAL</SelectItem>
                                <SelectItem value="HIGH" className="text-orange-500 font-bold">HIGH</SelectItem>
                                <SelectItem value="MEDIUM" className="text-blue-500 font-bold">MEDIUM</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Deadline</label>
                        <Input type="datetime-local" className="h-14 bg-zinc-900 border-zinc-800 rounded-2xl text-xs" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Assign To (PIC)</label>
                    <Select>
                        <SelectTrigger className="h-14 bg-zinc-900 border-zinc-800 rounded-2xl"><SelectValue placeholder="Pilih Kepala Divisi" /></SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                            <SelectItem value="kevin">Kevin (Match Control)</SelectItem>
                            <SelectItem value="fajar">Fajar (Media)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Detail Instruksi</label>
                    <Textarea placeholder="Jelaskan detail tugas..." className="bg-zinc-900 border-zinc-800 rounded-2xl min-h-[120px] resize-none p-4" />
                </div>

                <Button className="w-full h-16 rounded-full text-xl font-black bg-white text-black hover:bg-zinc-200 mt-4 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    DEPLOY MISSION <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
            </div>

        </DialogContent>
      </Dialog>

    </div>
  );
}
