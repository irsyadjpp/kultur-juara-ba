
'use client';

import { useState } from "react";
import { 
  Stethoscope, Activity, Ambulance, Clock, 
  Plus, Search, AlertTriangle, FileHeart, 
  Thermometer, CheckCircle2, XCircle, HeartPulse, 
  MapPin, User
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const INCIDENTS = [
  { 
    id: "MED-009", 
    athlete: "Anthony Ginting", 
    team: "SGS PLN", 
    court: "Court 1", 
    injury: "Muscle Cramp (Betis Kanan)", 
    treatment: "Ice Spray + Massage", 
    status: "RECOVERED", // RECOVERED, REFERRED, TREATING
    time: "10 mins ago",
    medic: "Dr. Nanda",
    severity: "LOW" 
  },
  { 
    id: "MED-008", 
    athlete: "Siti Fadia", 
    team: "Eng Hian Acad", 
    court: "Court 3", 
    injury: "Ankle Sprain (Cedera Engkel)", 
    treatment: "Rujukan RS (Ambulans)", 
    status: "REFERRED", 
    time: "45 mins ago",
    medic: "Ns. Budi",
    severity: "CRITICAL"
  },
  { 
    id: "MED-007", 
    athlete: "Supporter A", 
    team: "Umum", 
    court: "Tribun Barat", 
    injury: "Pingsan / Dehidrasi", 
    treatment: "Oksigen + Rehidrasi", 
    status: "RECOVERED", 
    time: "1 hour ago",
    medic: "Dr. Nanda",
    severity: "MEDIUM"
  },
];

const MED_STATS = {
  totalCases: 14,
  ambulanceStatus: "STANDBY", // STANDBY, DISPATCHED
  avgResponse: "24s",
  criticalCount: 1
};

export default function MedicalLogPage() {
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<typeof INCIDENTS[0] | null>(null);

  // Helper Severity Color
  const getSeverityStyle = (s: string) => {
    switch(s) {
        case 'CRITICAL': return "bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.6)]";
        case 'MEDIUM': return "bg-yellow-500 text-black";
        default: return "bg-green-500 text-black";
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-8 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-red-500 text-red-500 bg-red-500/10 backdrop-blur-md">
                    <HeartPulse className="w-3 h-3 mr-2" /> MEDICAL CENTER
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Medical <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">Response</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Pencatatan insiden medis, penanganan cedera, dan rujukan rumah sakit.
            </p>
        </div>

        {/* AMBULANCE STATUS WIDGET */}
        <div className={cn(
            "flex items-center gap-4 px-6 py-3 rounded-[24px] border transition-all",
            MED_STATS.ambulanceStatus === 'STANDBY' 
                ? "bg-zinc-900 border-zinc-800" 
                : "bg-red-600 border-red-500 shadow-xl"
        )}>
            <div className={cn(
                "p-3 rounded-xl",
                MED_STATS.ambulanceStatus === 'STANDBY' ? "bg-green-500/20 text-green-500" : "bg-white text-red-600"
            )}>
                <Ambulance className="w-6 h-6" />
            </div>
            <div>
                <p className={cn("text-[10px] font-bold uppercase tracking-widest", MED_STATS.ambulanceStatus === 'STANDBY' ? "text-zinc-500" : "text-white/80")}>
                    Ambulance Unit
                </p>
                <p className={cn("text-xl font-black", MED_STATS.ambulanceStatus === 'STANDBY' ? "text-white" : "text-white")}>
                    {MED_STATS.ambulanceStatus}
                </p>
            </div>
        </div>
      </div>

      {/* --- MAIN INTERFACE --- */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
         
         {/* LEFT: QUICK ACTIONS & STATS (1/3) */}
         <div className="lg:col-span-1 flex flex-col gap-6 h-full">
            
            {/* 1. BIG ACTION BUTTON */}
            <button 
                onClick={() => setIsLogOpen(true)}
                className="group relative w-full h-48 bg-red-600 hover:bg-red-700 rounded-[40px] flex flex-col items-center justify-center text-white shadow-[0_0_40px_rgba(220,38,38,0.3)] transition-all active:scale-95"
            >
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay rounded-[40px]"></div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8"/>
                </div>
                <span className="text-2xl font-black uppercase tracking-tight">Log New Incident</span>
                <span className="text-xs font-medium opacity-80 mt-1">Tap for Emergency Entry</span>
            </button>

            {/* 2. VITAL STATS */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-5">
                    <div className="flex justify-between items-start mb-2">
                        <Activity className="w-5 h-5 text-blue-500" />
                        <span className="text-2xl font-black text-white">{MED_STATS.totalCases}</span>
                    </div>
                    <p className="text-xs text-zinc-500 font-bold uppercase">Total Cases</p>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-5">
                    <div className="flex justify-between items-start mb-2">
                        <Clock className="w-5 h-5 text-green-500" />
                        <span className="text-2xl font-black text-white">{MED_STATS.avgResponse}</span>
                    </div>
                    <p className="text-xs text-zinc-500 font-bold uppercase">Avg Response</p>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-5 col-span-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs text-zinc-500 font-bold uppercase mb-1">Critical Injuries</p>
                            <span className="text-3xl font-black text-red-500">{MED_STATS.criticalCount}</span>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-red-500/20" />
                    </div>
                </Card>
            </div>

         </div>

         {/* RIGHT: INCIDENT FEED (2/3) */}
         <Card className="lg:col-span-2 bg-zinc-900 border-zinc-800 rounded-[32px] flex flex-col overflow-hidden h-full shadow-2xl">
            <div className="p-6 border-b border-zinc-800 bg-zinc-950/50 flex justify-between items-center">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
                    <Input 
                        placeholder="Cari nama atlet / log..." 
                        className="h-12 bg-zinc-900 border-zinc-800 rounded-xl pl-10 text-white focus:ring-red-500"
                    />
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="h-9 px-4 rounded-lg border-zinc-700 text-zinc-400 cursor-pointer hover:text-white">History</Badge>
                    <Badge className="h-9 px-4 rounded-lg bg-red-600 text-white cursor-pointer">Active</Badge>
                </div>
            </div>

            <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                    {INCIDENTS.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => setSelectedIncident(item)}
                            className="group relative bg-zinc-950 border border-zinc-800 rounded-[28px] p-5 hover:bg-zinc-900 hover:border-red-500/30 transition-all cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                                        <User className="w-6 h-6"/>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg leading-none group-hover:text-red-400 transition-colors">
                                            {item.athlete}
                                        </h4>
                                        <p className="text-xs text-zinc-500 mt-1 font-medium">{item.team}</p>
                                    </div>
                                </div>
                                <Badge className={cn("border-none text-[10px] font-black uppercase px-3 py-1", getSeverityStyle(item.severity))}>
                                    {item.severity}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50">
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1 flex items-center gap-1">
                                        <FileHeart className="w-3 h-3"/> Diagnosis
                                    </p>
                                    <p className="text-sm font-bold text-zinc-200">{item.injury}</p>
                                </div>
                                <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50">
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1 flex items-center gap-1">
                                        <Stethoscope className="w-3 h-3"/> Action
                                    </p>
                                    <p className="text-sm font-bold text-zinc-200">{item.treatment}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-xs font-medium text-zinc-500 border-t border-zinc-800 pt-3">
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {item.court}</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {item.time}</span>
                                <span className="text-zinc-400">By: {item.medic}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
         </Card>

      </div>

      {/* --- LOG INCIDENT MODAL --- */}
      <Dialog open={isLogOpen} onOpenChange={setIsLogOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-lg p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 bg-red-950/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2 text-red-500">
                        <Stethoscope className="w-6 h-6"/> New Medical Log
                    </DialogTitle>
                    <DialogDescription>Catat penanganan medis di lapangan.</DialogDescription>
                </DialogHeader>
            </div>
            
            <div className="p-8 space-y-6">
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Lokasi</label>
                        <Select>
                            <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl"><SelectValue placeholder="Pilih..." /></SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                <SelectItem value="C1">Court 1</SelectItem>
                                <SelectItem value="C2">Court 2</SelectItem>
                                <SelectItem value="C3">Court 3</SelectItem>
                                <SelectItem value="TR">Tribun Penonton</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Pasien (Atlet/Umum)</label>
                        <Input placeholder="Nama..." className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Jenis Cedera / Keluhan</label>
                    <Select>
                        <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl"><SelectValue placeholder="Pilih Diagnosis..." /></SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                            <SelectItem value="CRAMP">Muscle Cramp (Kram)</SelectItem>
                            <SelectItem value="SPRAIN">Ankle Sprain (Terkilir)</SelectItem>
                            <SelectItem value="ABRASION">Luka Lecet / Berdarah</SelectItem>
                            <SelectItem value="FATIGUE">Pingsan / Sesak Nafas</SelectItem>
                            <SelectItem value="SERIOUS">Cedera Berat (Fraktur/ACL)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Tindakan Medis</label>
                    <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" className="h-10 rounded-xl border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs">Ice Spray</Button>
                        <Button variant="outline" className="h-10 rounded-xl border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs">Plaster</Button>
                        <Button variant="outline" className="h-10 rounded-xl border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs">Oxygen</Button>
                    </div>
                    <Textarea placeholder="Detail tindakan lainnya..." className="bg-zinc-900 border-zinc-800 rounded-2xl min-h-[80px] mt-2" />
                </div>

                <div className="flex items-center space-x-2 bg-red-900/10 border border-red-900/30 p-4 rounded-2xl">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <label htmlFor="referral" className="text-sm font-bold text-red-400">
                        Butuh Rujukan Ambulans (RS)?
                    </label>
                    <input type="checkbox" id="referral" className="ml-auto w-5 h-5 accent-red-600 rounded" />
                </div>

                <Button className="w-full h-16 rounded-full font-black text-lg bg-red-600 hover:bg-red-700 text-white mt-2 shadow-xl shadow-red-900/20">
                    SAVE MEDICAL RECORD
                </Button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
```

### Highlights Desain "Vital Monitor":

1.  **High-Contrast UI:** Tema gelap dengan aksen merah cerah (bukan oranye/biru) langsung mengkomunikasikan fungsi halaman ini adalah untuk situasi darurat dan medis.
2.  **Emergency-First:** Tombol "Log New Incident" dibuat sangat besar dan mencolok, karena ini adalah aksi utama dan paling sering dilakukan oleh tim medis.
3.  **Ambulance Status:** Widget status ambulans dibuat mencolok di header. Ini adalah informasi kritikal, dan menempatkannya di atas memastikan semua orang di tim tahu apakah transportasi darurat tersedia atau sedang dikirim.
4.  **Severity Tags:** Setiap insiden di log memiliki *tag* "Severity" (Critical/Medium/Low), memungkinkan triase visual cepat untuk memprioritaskan penanganan.
5.  **Smart Form:** Form input menggunakan *preset* tombol untuk tindakan umum ("Ice Spray", "Plaster", dll.), mengurangi waktu mengetik manual di lapangan.