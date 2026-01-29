
'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter
import { 
  ShieldCheck, AlertOctagon, Eye, PlayCircle, 
  CheckCircle2, XCircle, Search, ScanLine, 
  History, Scale, User, FileWarning, ArrowRight,
  Shield, Users, Mail, Phone, MoreHorizontal, Briefcase, Gavel, MonitorPlay, ClipboardCheck, QrCode, Stethoscope, Package, Box, Database, Utensils, Gift, Upload, Layers, Timer, Navigation, BarChart3, Megaphone, FileSignature, Award, Tags, UserCog, Handshake, Newspaper, Settings, LogOut, CheckSquare, ListChecks, StickyNote, PieChart, Wallet, Coins, Receipt, CalendarRange, Target, CalendarDays, FileText, Plus, Filter, MapPin, Gauge, Radio, CarFront, Fuel, LifeBuoy, MessageSquare, PenTool, Send
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const VERIFICATION_QUEUE = [
  { 
    id: "P-1092", 
    name: "Aditya Pratama", 
    club: "Klub Internal", 
    registeredLevel: "BEGINNER", 
    detectedLevel: "INTERMEDIATE",
    riskScore: 85, // High probability sandbagging
    videoUrl: "/videos/mock-play.mp4",
    history: "Juara 2 Kejurkot 2019",
    status: "FLAGGED", 
    avatar: "https://github.com/shadcn.png"
  },
  { 
    id: "P-1093", 
    name: "Siti Nurhaliza", 
    club: "Klub Internal", 
    registeredLevel: "ADVANCE", 
    detectedLevel: "ADVANCE",
    riskScore: 10, 
    videoUrl: "",
    history: "Terdaftar SI PBSI ID: 001239",
    status: "PENDING", 
    avatar: ""
  },
  { 
    id: "P-1094", 
    name: "Budi Santoso", 
    club: "Klub Internal", 
    registeredLevel: "BEGINNER", 
    detectedLevel: "BEGINNER",
    riskScore: 5, 
    videoUrl: "",
    history: "Tidak ada rekam jejak turnamen resmi.",
    status: "PENDING", 
    avatar: ""
  },
];

export default function TPFVerificationPage() {
  const router = useRouter();
  const [selectedPlayer, setSelectedPlayer] = useState<typeof VERIFICATION_QUEUE[0] | null>(null);
  
  const getRiskColor = (score: number) => {
    if (score >= 70) return "text-red-500 bg-red-500/10 border-red-500/20";
    if (score >= 40) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    return "text-green-500 bg-green-500/10 border-green-500/20";
  };

  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-sky-500 text-sky-500 bg-sky-500/10 backdrop-blur-md animate-pulse">
                    <ScanLine className="w-3 h-3 mr-2" /> SKILL ASSESSMENT
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Analisis Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-600">Atlet</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Audit skill, cek rekam jejak, dan tentukan level yang sesuai untuk program latihan.
            </p>
        </div>

        <div className="flex gap-4">
            <div className="bg-zinc-900 px-6 py-3 rounded-[24px] border border-zinc-800 flex flex-col items-center">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Pending</span>
                <span className="text-2xl font-black text-white">45</span>
            </div>
            <div className="bg-zinc-900 px-6 py-3 rounded-[24px] border border-zinc-800 flex flex-col items-center">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Mismatch</span>
                <span className="text-2xl font-black text-red-500">3</span>
            </div>
        </div>
      </div>
      
      <Tabs defaultValue="VERIFICATION" className="flex-1 flex flex-col min-h-0">
        
        <div className="px-1 mb-4">
            <TabsList className="bg-zinc-900 border border-zinc-800 p-1 rounded-full">
                <TabsTrigger value="VERIFICATION" className="rounded-full px-6 data-[state=active]:bg-sky-600 data-[state=active]:text-white">Analisis Video (Pra-Latihan)</TabsTrigger>
                <TabsTrigger value="CASES" className="rounded-full px-6 data-[state=active]:bg-zinc-800">Spot Check Lapangan</TabsTrigger>
            </TabsList>
        </div>

        <TabsContent value="VERIFICATION" className="flex-1 flex flex-col min-h-0 mt-0">
           <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
               <Card className="lg:col-span-1 bg-zinc-900 border-zinc-800 rounded-[32px] flex flex-col overflow-hidden h-full shadow-2xl">
                    <div className="p-6 pb-4 bg-zinc-950/50 border-b border-zinc-800">
                        <div className="relative">
                            <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
                            <input 
                                type="text" 
                                placeholder="Cari nama atau ID atlet..." 
                                className="w-full bg-zinc-900 text-white font-bold placeholder:text-zinc-600 pl-10 pr-4 h-12 rounded-xl border border-zinc-800 focus:outline-none focus:border-sky-500 transition-colors"
                            />
                        </div>
                    </div>
                    
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-3">
                            {VERIFICATION_QUEUE.map((player) => (
                                <div 
                                    key={player.id} 
                                    onClick={() => setSelectedPlayer(player)}
                                    className={cn(
                                        "group relative p-4 rounded-[24px] border-2 transition-all cursor-pointer hover:bg-zinc-800",
                                        selectedPlayer?.id === player.id ? "bg-zinc-800 border-sky-500/50" : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                                    )}
                                >
                                    {player.riskScore >= 70 && (
                                        <div className="absolute top-4 right-4 animate-pulse">
                                            <AlertOctagon className="w-5 h-5 text-red-500" />
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-14 w-14 border-2 border-zinc-700">
                                            <AvatarImage src={player.avatar} />
                                            <AvatarFallback className="bg-zinc-900 font-black text-zinc-500">{player.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-bold text-white text-base group-hover:text-sky-400 transition-colors">{player.name}</h4>
                                            <p className="text-xs text-zinc-500 font-medium mb-2">{player.club}</p>
                                            <Badge variant="secondary" className="bg-zinc-900 text-zinc-300 border-zinc-700 text-[10px]">
                                                Klaim: {player.registeredLevel}
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 flex items-center gap-2">
                                        <div className="h-1.5 flex-1 bg-zinc-900 rounded-full overflow-hidden">
                                            <div 
                                                className={cn("h-full rounded-full", player.riskScore >= 70 ? "bg-red-500" : "bg-sky-500")} 
                                                style={{ width: `${player.riskScore}%` }}
                                            ></div>
                                        </div>
                                        <span className={cn("text-[10px] font-black", player.riskScore >= 70 ? "text-red-500" : "text-sky-500")}>
                                            {player.riskScore}% Mismatch Risk
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                 </Card>
                 <div className="lg:col-span-2 h-full">
                    {/* Inspection Console */}
                 </div>
           </div>
        </TabsContent>

        <TabsContent value="CASES" className="flex-1 mt-0">
           <div className="h-64 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-[2rem]">
            <Gavel size={48} className="text-muted-foreground mb-4 opacity-50" />
            <h3 className="font-headline text-xl">Spot Check / Investigasi</h3>
            <p className="text-muted-foreground text-sm">Fitur untuk mencatat temuan langsung di lapangan (segera hadir).</p>
         </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
