'use client';

import { useState } from "react";
import { 
  Trophy, Users, Shield, QrCode, 
  Activity, Calendar, MapPin, Hash, 
  ArrowRight, CheckCircle2, Copy, LogOut
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";

// --- MOCK DATA ---
const ATHLETE = {
  id: "ATL-2026-007",
  name: "Jonathan Christie",
  rank: "PRO",
  points: 8500,
  winRate: 78,
  avatar: "https://github.com/shadcn.png",
  // Initial State: No Team
  team: null as { name: string; logo: string; role: string } | null 
};

const UPCOMING_MATCH = {
  event: "Babak Penyisihan - MS Open",
  opponent: "Anthony Ginting",
  court: "Court 1 (TV)",
  time: "Besok, 10:00 WIB"
};

export default function AthleteDashboard() {
  const [athlete, setAthlete] = useState(ATHLETE);
  const [joinCode, setJoinCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { toast } = useToast();

  // Simulasi Join Team
  const handleJoinTeam = () => {
    if (!joinCode) return;
    setIsJoining(true);

    // Mock API Call
    setTimeout(() => {
      setIsJoining(false);
      if (joinCode === "DJA-8821") {
        setAthlete(prev => ({
          ...prev,
          team: {
            name: "PB Djarum Official",
            logo: "/logos/djarum.png",
            role: "Member"
          }
        }));
        setShowSuccessModal(true);
      } else {
        toast({ title: "Kode Tim Tidak Valid!", variant: "destructive" });
      }
    }, 1500);
  };

  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24 max-w-5xl mx-auto">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-cyan-500 text-cyan-500 bg-cyan-500/10 backdrop-blur-md">
                    <Activity className="w-3 h-3 mr-2" /> ATHLETE PORTAL
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">{athlete.name.split(' ')[0]}</span>
            </h1>
            <p className="text-zinc-400 mt-2 text-lg">
                Kelola profil, jadwal tanding, dan keanggotaan tim kamu di sini.
            </p>
        </div>
        
        {/* ID CARD MINI */}
        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl flex items-center gap-3">
            <div className="bg-white p-1 rounded-lg">
                <QrCode className="w-8 h-8 text-black"/>
            </div>
            <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Player ID</p>
                <p className="text-sm font-mono font-bold text-white tracking-wider">{athlete.id}</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* LEFT: PLAYER CARD (1/3) */}
         <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-to-b from-zinc-900 to-black border-zinc-800 rounded-[32px] overflow-hidden relative group shadow-2xl">
                {/* Background FX */}
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-[80px]"></div>

                <CardContent className="p-8 text-center relative z-10">
                    <div className="relative inline-block">
                        <Avatar className="w-32 h-32 border-4 border-zinc-900 shadow-xl mb-4">
                            <AvatarImage src={athlete.avatar} />
                            <AvatarFallback className="bg-zinc-800 text-2xl font-black text-zinc-500">{athlete.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-black font-black border-4 border-zinc-900">
                            {athlete.rank}
                        </Badge>
                    </div>
                    
                    <h2 className="text-2xl font-black text-white uppercase leading-tight mb-1">{athlete.name}</h2>
                    <p className="text-zinc-500 text-sm font-bold mb-6">Mens Singles Specialist</p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-6">
                        <div>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase">Points</p>
                            <p className="text-xl font-black text-white">{athlete.points}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase">Win Rate</p>
                            <p className="text-xl font-black text-green-500">{athlete.winRate}%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* UPCOMING MATCH WIDGET */}
            <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-red-500"/> Next Match
                </h3>
                <div className="space-y-1">
                    <p className="text-lg font-bold text-white">{UPCOMING_MATCH.opponent}</p>
                    <p className="text-xs text-zinc-400">{UPCOMING_MATCH.event}</p>
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-zinc-800/50">
                        <Badge variant="outline" className="text-[10px] border-zinc-700 text-zinc-300">{UPCOMING_MATCH.court}</Badge>
                        <span className="text-[10px] text-red-400 font-bold animate-pulse">{UPCOMING_MATCH.time}</span>
                    </div>
                </div>
            </Card>
         </div>

         {/* RIGHT: TEAM & ACTIONS (2/3) */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* --- TEAM STATUS SECTION --- */}
            {athlete.team ? (
                // STATE: ALREADY IN TEAM
                <Card className="bg-indigo-950/20 border-indigo-500/30 rounded-[32px] overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
                    <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="h-20 w-20 bg-white p-2 rounded-2xl shadow-lg transform -rotate-3">
                                <img src={athlete.team.logo} alt="Team Logo" className="w-full h-full object-contain"/>
                            </div>
                            <div>
                                <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white mb-2">MY SQUAD</Badge>
                                <h3 className="text-3xl font-black text-white">{athlete.team.name}</h3>
                                <p className="text-indigo-300 text-sm font-bold flex items-center gap-2">
                                    <Shield className="w-4 h-4"/> Registered as {athlete.team.role}
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" className="border-red-500/30 text-red-500 hover:bg-red-950/30 hover:text-red-400 h-12 rounded-xl">
                            <LogOut className="w-4 h-4 mr-2"/> LEAVE TEAM
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                // STATE: NO TEAM (JOIN VIA CODE)
                <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] overflow-hidden relative border-dashed border-2">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1 space-y-2 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold mb-2">
                                    <Users className="w-4 h-4"/> NO TEAM AFFILIATION
                                </div>
                                <h3 className="text-2xl font-black text-white">Join a Community?</h3>
                                <p className="text-zinc-400 text-sm">
                                    Minta <strong>Kode Unik Tim</strong> (e.g., DJA-8821) kepada manajer kamu untuk masuk ke roster secara otomatis.
                                </p>
                            </div>
                            
                            <div className="w-full md:w-auto bg-black p-6 rounded-3xl border border-zinc-800 flex flex-col gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Input Team Code</label>
                                    <div className="relative">
                                        <Hash className="absolute left-4 top-4 w-5 h-5 text-zinc-500"/>
                                        <Input 
                                            placeholder="XXX-0000" 
                                            className="h-14 pl-12 rounded-2xl bg-zinc-900 border-zinc-700 text-white font-mono text-lg uppercase tracking-widest focus:ring-cyan-500 focus:border-cyan-500"
                                            value={joinCode}
                                            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                            maxLength={8}
                                        />
                                    </div>
                                </div>
                                <Button 
                                    onClick={handleJoinTeam}
                                    disabled={!joinCode || isJoining}
                                    className="h-14 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-black text-lg shadow-lg shadow-cyan-900/20"
                                >
                                    {isJoining ? "SYNCING..." : "JOIN SQUAD"}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* --- RECENT HISTORY --- */}
            <Card className="bg-zinc-900/50 border border-zinc-800/50 rounded-[32px] flex-1">
                <div className="p-6 border-b border-zinc-800">
                    <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest">Performance History</h3>
                </div>
                <ScrollArea className="h-64">
                    <div className="p-4 space-y-3">
                        {[1,2,3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-[20px] hover:bg-zinc-800 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={cn("w-2 h-12 rounded-full", i === 1 ? "bg-red-500" : "bg-green-500")}></div>
                                    <div>
                                        <p className="text-sm font-bold text-white">vs. Gideon/Sukamuljo</p>
                                        <p className="text-xs text-zinc-500">MD Open • Round of 16</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={cn("text-lg font-black font-mono", i === 1 ? "text-red-500" : "text-green-500")}>
                                        {i === 1 ? "L" : "W"} 19-21
                                    </p>
                                    <p className="text-[10px] text-zinc-600">12 Oct 2025</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </Card>

         </div>

      </div>

      {/* --- SUCCESS MODAL --- */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-sm p-0 overflow-hidden text-center">
            <div className="p-8 flex flex-col items-center">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle2 className="w-12 h-12 text-green-500"/>
                </div>
                <h2 className="text-2xl font-black uppercase mb-2">Welcome Aboard!</h2>
                <p className="text-zinc-400 text-sm mb-6">
                    Kamu berhasil bergabung dengan skuad:
                    <br/><strong className="text-white text-lg">PB Djarum Official</strong>
                </p>
                <div className="bg-zinc-900 p-4 rounded-2xl w-full border border-zinc-800 mb-6">
                    <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Your Role</p>
                    <p className="text-cyan-400 font-bold">Registered Athlete</p>
                </div>
                <Button 
                    className="w-full h-14 rounded-2xl bg-white text-black font-bold hover:bg-zinc-200"
                    onClick={() => setShowSuccessModal(false)}
                >
                    GO TO DASHBOARD
                </Button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
