'use client';

import { useState } from "react";
import { 
  ClipboardCheck, Thermometer, Wifi, Zap, 
  Layers, Monitor, Ruler, CheckCircle2, 
  AlertTriangle, RefreshCcw, Save, Camera 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const COURTS = ["Court 1 (TV)", "Court 2", "Court 3", "Court 4", "Court 5", "Court 6"];

const CHECKLIST_ITEMS = [
  {
    category: "FIELD OF PLAY (FOP)",
    icon: Layers,
    items: [
      { id: "net_height", label: "Tinggi Net (1.55m)", desc: "Pastikan kencang & sesuai standar." },
      { id: "floor_dry", label: "Kekesatan Karpet", desc: "Tidak licin / tidak ada keringat." },
      { id: "lines_visible", label: "Garis Lapangan", desc: "Tape tidak mengelupas." },
      { id: "umpire_chair", label: "Kursi Umpire", desc: "Posisi stabil & aman." },
    ]
  },
  {
    category: "TECHNICAL & EQUIPMENT",
    icon: Monitor,
    items: [
      { id: "tablet_battery", label: "Tablet Scoring", desc: "Baterai > 80% & Login App Ready." },
      { id: "scoreboard_tv", label: "TV Scoreboard", desc: "Koneksi HDMI/Wireless stabil." },
      { id: "shuttles", label: "Shuttlecock Dispenser", desc: "Tersedia min. 2 slop baru." },
      { id: "mop_ready", label: "Petugas Mop", desc: "Standby di sudut lapangan." },
    ]
  },
  {
    category: "AMBIENCE",
    icon: Zap,
    items: [
      { id: "lighting", label: "Pencahayaan (Lux)", desc: "Semua lampu menyala, tidak flicker." },
      { id: "ac_wind", label: "Arah Angin (AC)", desc: "Tidak mengganggu laju kok." },
    ]
  }
];

export default function VenueCheckPage() {
  const [activeCourt, setActiveCourt] = useState("Court 1 (TV)");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Calculate Progress
  const totalItems = CHECKLIST_ITEMS.reduce((acc, cat) => acc + cat.items.length, 0);
  const currentChecked = Object.keys(checkedItems).filter(k => k.startsWith(activeCourt) && checkedItems[k]).length;
  const progress = Math.round((currentChecked / totalItems) * 100);

  const toggleCheck = (itemId: string) => {
    const key = `${activeCourt}-${itemId}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isChecked = (itemId: string) => !!checkedItems[`${activeCourt}-${itemId}`];

  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-teal-500 text-teal-500 bg-teal-500/10 backdrop-blur-md">
                    <ClipboardCheck className="w-3 h-3 mr-2" /> VENUE INSPECTION
                </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-white">
                Arena <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-600">Diagnostics</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Sistem pengecekan kesiapan lapangan pra-pertandingan.
            </p>
        </div>

        {/* ENVIRONMENT SENSORS (Mock) */}
        <div className="flex gap-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 flex items-center gap-3">
                <div className="bg-orange-500/10 p-2 rounded-xl text-orange-500">
                    <Thermometer className="w-5 h-5"/>
                </div>
                <div>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase">Temp</p>
                    <p className="text-lg font-black text-white">24°C</p>
                </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 flex items-center gap-3">
                <div className="bg-blue-500/10 p-2 rounded-xl text-blue-500">
                    <Wifi className="w-5 h-5"/>
                </div>
                <div>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase">Network</p>
                    <p className="text-lg font-black text-white">50ms</p>
                </div>
            </div>
        </div>
      </div>

      {/* --- COURT SELECTOR (TABS) --- */}
      <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
        {COURTS.map((c) => (
            <button
                key={c}
                onClick={() => setActiveCourt(c)}
                className={cn(
                    "px-6 h-14 rounded-2xl font-black text-sm whitespace-nowrap transition-all border-2",
                    activeCourt === c 
                        ? "bg-teal-600 border-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.3)]" 
                        : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-white"
                )}
            >
                {c}
            </button>
        ))}
      </div>

      {/* --- MAIN DIAGNOSTIC PANEL --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* LEFT: STATUS & SUMMARY */}
         <div className="lg:col-span-1 space-y-6">
            
            {/* PROGRESS CARD */}
            <Card className="bg-gradient-to-b from-zinc-900 to-black border-zinc-800 rounded-[40px] p-2">
                <CardContent className="p-6 text-center">
                    <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
                        {/* Circular Progress Mockup using SVG */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-zinc-800" />
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                                className={cn("transition-all duration-1000", progress === 100 ? "text-green-500" : "text-teal-500")}
                                strokeDasharray={440}
                                strokeDashoffset={440 - (440 * progress) / 100}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-white">{progress}%</span>
                            <span className="text-[10px] text-zinc-500 font-bold uppercase">Ready</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-black text-white uppercase">{activeCourt}</h3>
                        <Badge variant="outline" className={cn(
                            "border-none font-bold px-3 py-1",
                            progress === 100 ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                        )}>
                            {progress === 100 ? "ALL SYSTEMS GO" : "INSPECTION IN PROGRESS"}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-14 rounded-2xl border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white" onClick={() => setCheckedItems({})}>
                    <RefreshCcw className="mr-2 w-5 h-5"/> RESET
                </Button>
                <Button 
                    className="h-14 rounded-2xl bg-red-900/50 hover:bg-red-900 text-red-500 hover:text-red-400 border border-red-900"
                    onClick={() => setIsReportOpen(true)}
                >
                    <AlertTriangle className="mr-2 w-5 h-5"/> REPORT ISSUE
                </Button>
            </div>

            {progress === 100 && (
                <Button className="w-full h-16 rounded-[24px] bg-green-600 hover:bg-green-700 text-white font-black text-lg shadow-[0_0_30px_rgba(22,163,74,0.4)] animate-in fade-in zoom-in">
                    <CheckCircle2 className="mr-2 w-6 h-6"/> CONFIRM COURT READY
                </Button>
            )}
         </div>

         {/* RIGHT: CHECKLIST ITEMS */}
         <div className="lg:col-span-2 space-y-6">
            {CHECKLIST_ITEMS.map((category, idx) => (
                <Card key={idx} className="bg-zinc-900 border-zinc-800 rounded-[32px] overflow-hidden">
                    <div className="bg-zinc-950/50 border-b border-zinc-800 p-6 flex items-center gap-3">
                        <div className="p-2 bg-zinc-800 rounded-xl text-zinc-400">
                            <category.icon className="w-5 h-5"/>
                        </div>
                        <h3 className="text-sm font-black text-zinc-300 uppercase tracking-widest">
                            {category.category}
                        </h3>
                    </div>
                    <div className="p-2">
                        {category.items.map((item) => (
                            <div 
                                key={item.id}
                                onClick={() => toggleCheck(item.id)}
                                className={cn(
                                    "flex items-center justify-between p-4 m-2 rounded-2xl border-2 transition-all cursor-pointer",
                                    isChecked(item.id) 
                                        ? "bg-teal-950/20 border-teal-500/50" 
                                        : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all",
                                        isChecked(item.id) ? "bg-teal-500 border-teal-500 text-black" : "border-zinc-700 text-transparent"
                                    )}>
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className={cn("font-bold text-base", isChecked(item.id) ? "text-teal-400" : "text-white")}>
                                            {item.label}
                                        </h4>
                                        <p className="text-xs text-zinc-500">{item.desc}</p>
                                    </div>
                                </div>
                                <Switch checked={isChecked(item.id)} className="data-[state=checked]:bg-teal-500" />
                            </div>
                        ))}
                    </div>
                </Card>
            ))}
         </div>

      </div>

      {/* --- REPORT ISSUE MODAL --- */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-md p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 bg-red-950/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2 text-red-500">
                        <AlertTriangle className="w-6 h-6"/> Report Issue
                    </DialogTitle>
                </DialogHeader>
            </div>
            
            <div className="p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Masalah Pada</label>
                    <Input value={activeCourt} disabled className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl text-zinc-400 font-bold" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Deskripsi Kerusakan</label>
                    <Textarea placeholder="Contoh: Net robek di bagian tengah..." className="bg-zinc-900 border-zinc-800 rounded-2xl min-h-[100px] resize-none p-4" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Bukti Foto</label>
                    <div className="h-32 bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-500 hover:text-white hover:border-red-500/50 hover:bg-red-900/10 cursor-pointer transition-all">
                        <Camera className="w-8 h-8 mb-2" />
                        <span className="text-xs font-bold">Ambil Foto</span>
                    </div>
                </div>

                <Button className="w-full h-16 rounded-full font-black text-lg bg-red-600 hover:bg-red-700 text-white mt-2 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                    SUBMIT TO LOGISTICS
                </Button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
