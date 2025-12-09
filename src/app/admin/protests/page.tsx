
'use client';

import { useState } from "react";
import { 
  Gavel, Scale, AlertOctagon, FileWarning, 
  CheckCircle2, XCircle, ChevronRight, Search, 
  ShieldAlert, History, User, MessageSquare 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// --- MOCK DATA: PROTEST CASES ---
const CASES = [
  { 
    id: "CASE-009", 
    type: "ELIGIBILITY", // Eligibility (Joki/Sandbagging), Technical, Misconduct
    match: "MD OPEN - QF (Kevin/Marcus vs Ahsan/Hendra)",
    petitioner: "Manajer PB Djarum",
    respondent: "Kevin Sanjaya (PB Jaya Raya)",
    subject: "Dugaan Manipulasi Level (Sandbagging)",
    description: "Pemain atas nama Kevin Sanjaya terindikasi level PRO tapi main di kategori OPEN/Beginner. Mohon cek data TPF.",
    evidence: "/images/evidence-mock.jpg",
    status: "UNDER_REVIEW", 
    submittedAt: "10:30 AM",
    riskLevel: "HIGH"
  },
  { 
    id: "CASE-008", 
    type: "TECHNICAL", 
    match: "MS PRO - R16",
    petitioner: "Official SGS PLN",
    respondent: "Umpire Court 2",
    subject: "Kesalahan Hitung Skor",
    description: "Wasit salah input poin di set kedua saat interval. Skor fisik 11-9, di digital 11-8.",
    evidence: "",
    status: "OPEN", 
    submittedAt: "09:45 AM",
    riskLevel: "MEDIUM"
  },
  { 
    id: "CASE-007", 
    type: "MISCONDUCT", 
    match: "WD OPEN - R32",
    petitioner: "Referee",
    respondent: "Supporter Tim B",
    subject: "Pelemparan Botol ke Lapangan",
    description: "Supporter melakukan tindakan anarkis yang mengganggu jalannya pertandingan.",
    evidence: "",
    status: "VERDICT_ISSUED", 
    verdict: "WARNING", // WARNING, DISQUALIFIED, FINE
    submittedAt: "Yesterday",
    riskLevel: "CRITICAL"
  },
];

export default function ProtestPage() {
  const [selectedCase, setSelectedCase] = useState<typeof CASES[0] | null>(null);
  const [verdictNote, setVerdictNote] = useState("");

  const getStatusStyle = (status: string) => {
    switch(status) {
        case 'OPEN': return "bg-red-500/10 text-red-500 border-red-500/20 animate-pulse";
        case 'UNDER_REVIEW': return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
        case 'VERDICT_ISSUED': return "bg-zinc-800 text-zinc-400 border-zinc-700";
        default: return "bg-zinc-900 text-zinc-500";
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-red-500 text-red-500 bg-red-500/10 backdrop-blur-md">
                    <Scale className="w-3 h-3 mr-2" /> DISPUTE TRIBUNAL
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Protest <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Decision</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Penyelesaian sengketa, validasi protes, dan penegakan sanksi disipliner.
            </p>
        </div>

        {/* STATS */}
        <div className="flex gap-3">
            <Card className="bg-zinc-900 border-zinc-800 rounded-[24px] px-6 py-3 flex items-center gap-4">
                <div className="bg-red-500/20 p-2 rounded-xl text-red-500"><AlertOctagon className="w-6 h-6"/></div>
                <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase">Active Cases</p>
                    <p className="text-2xl font-black text-white">2</p>
                </div>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800 rounded-[24px] px-6 py-3 flex items-center gap-4">
                <div className="bg-green-500/20 p-2 rounded-xl text-green-500"><Gavel className="w-6 h-6"/></div>
                <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase">Resolved</p>
                    <p className="text-2xl font-black text-white">5</p>
                </div>
            </Card>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
         
         {/* LEFT: CASE LIST (1/3) */}
         <Card className="lg:col-span-1 bg-zinc-900 border-zinc-800 rounded-[32px] flex flex-col overflow-hidden h-full shadow-2xl">
            <div className="p-6 pb-2 border-b border-zinc-800 bg-zinc-950/50">
                <div className="relative">
                    <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
                    <Input 
                        placeholder="Search Case ID / Name..." 
                        className="h-12 bg-zinc-900 border-zinc-800 rounded-xl pl-10 text-white focus:ring-red-500"
                    />
                </div>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                    {CASES.map((item) => (
                        <div 
                            key={item.id}
                            onClick={() => setSelectedCase(item)}
                            className={cn(
                                "group relative p-5 rounded-[24px] border-2 transition-all cursor-pointer hover:bg-zinc-800",
                                selectedCase?.id === item.id ? "bg-zinc-800 border-red-500/50 shadow-lg" : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                            )}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className={cn("border text-[10px] font-bold", getStatusStyle(item.status))}>
                                    {item.status.replace('_', ' ')}
                                </Badge>
                                <span className="text-[10px] font-mono text-zinc-500">{item.submittedAt}</span>
                            </div>
                            
                            <h4 className="font-bold text-white text-sm line-clamp-1 mb-1 group-hover:text-red-400 transition-colors">
                                {item.subject}
                            </h4>
                            
                            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
                                <ShieldAlert className="w-3 h-3 text-zinc-600"/>
                                <span>{item.type}</span>
                            </div>

                            <div className="flex items-center justify-between border-t border-zinc-800/50 pt-3">
                                <span className="text-[10px] font-mono text-zinc-600">{item.id}</span>
                                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors"/>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
         </Card>

         {/* RIGHT: VERDICT CHAMBER (2/3) */}
         <div className="lg:col-span-2 h-full">
            {selectedCase ? (
                <Card className="bg-zinc-950 border-zinc-800 rounded-[32px] h-full flex flex-col overflow-hidden shadow-2xl relative">
                    
                    {/* Header Detail */}
                    <div className="p-8 border-b border-zinc-800 bg-zinc-900/30">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                                    <FileWarning className="w-6 h-6"/>
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                                        {selectedCase.subject}
                                    </h2>
                                    <p className="text-zinc-500 text-xs font-mono mt-1">CASE ID: {selectedCase.id}</p>
                                </div>
                            </div>
                            {selectedCase.riskLevel === 'HIGH' && (
                                <Badge className="bg-red-600 text-white border-none font-bold animate-pulse">HIGH RISK</Badge>
                            )}
                        </div>
                    </div>

                    <ScrollArea className="flex-1 bg-zinc-950/50">
                        <div className="p-8 space-y-8">
                            
                            {/* 1. THE CHARGE (Details) */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4 text-red-500"/> The Charge (Kronologi)
                                </h3>
                                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-zinc-300 text-sm leading-relaxed">
                                    "{selectedCase.description}"
                                </div>
                            </div>

                            {/* 2. PARTIES INVOLVED */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Petitioner (Pelapor)</h3>
                                    <div className="flex items-center gap-3 bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                                        <Avatar className="h-8 w-8"><AvatarFallback className="bg-zinc-800 text-zinc-500">P</AvatarFallback></Avatar>
                                        <span className="text-sm font-bold text-white">{selectedCase.petitioner}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Respondent (Terlapor)</h3>
                                    <div className="flex items-center gap-3 bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                                        <Avatar className="h-8 w-8"><AvatarFallback className="bg-zinc-800 text-zinc-500">R</AvatarFallback></Avatar>
                                        <span className="text-sm font-bold text-white">{selectedCase.respondent}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 3. TPF RECOMMENDATION (Jika Tipe Eligibility) */}
                            {selectedCase.type === 'ELIGIBILITY' && (
                                <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-2xl flex gap-4">
                                    <ShieldAlert className="w-6 h-6 text-blue-400 mt-1 shrink-0"/>
                                    <div>
                                        <h4 className="text-blue-400 text-xs font-black uppercase mb-1">TPF Intelligence</h4>
                                        <p className="text-blue-200/70 text-xs leading-relaxed">
                                            Berdasarkan analisis video, pemain ini memiliki teknik di atas rata-rata kategori (Grade A). Risk Score 85%. Rekomendasi: <strong>Diskualifikasi</strong>.
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </ScrollArea>

                    {/* ACTION VERDICT (Sticky) */}
                    <div className="p-6 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
                        {selectedCase.status !== 'VERDICT_ISSUED' ? (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Keputusan Hakim / Referee</label>
                                    <Textarea 
                                        placeholder="Tulis alasan keputusan dan sanksi yang diberikan..." 
                                        className="bg-black border-zinc-800 rounded-2xl resize-none h-20 text-white"
                                        value={verdictNote}
                                        onChange={(e) => setVerdictNote(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="outline" className="h-14 rounded-2xl border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 font-bold">
                                        <XCircle className="w-5 h-5 mr-2"/> REJECT PROTEST
                                    </Button>
                                    <Button className="h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-900/20">
                                        <Gavel className="w-5 h-5 mr-2"/> UPHOLD & SANCTION
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-500">
                                <Gavel className="w-8 h-8 mb-2 opacity-50"/>
                                <span className="font-bold uppercase tracking-widest">Case Closed</span>
                                <span className="text-xs">Verdict: {selectedCase.verdict}</span>
                            </div>
                        )}
                    </div>

                </Card>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 bg-zinc-900/50 rounded-[32px] border border-zinc-800 border-dashed">
                    <Scale className="w-20 h-20 mb-4 opacity-20 animate-pulse"/>
                    <p className="font-bold uppercase tracking-widest text-lg">Select Case to Judge</p>
                </div>
            )}
         </div>

      </div>
    </div>
  );
}
