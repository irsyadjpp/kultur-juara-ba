
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Copy, Check,
  UserCheck, Trophy, AlertTriangle, 
  ChevronRight, 
  Calendar, PlayCircle, Bell
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

// Data ini sekarang lebih sederhana, fokus pada apa yang bisa ditampilkan di awal.
const MOCK_PLAYER_DATA = {
  name: "Irsyad",
  athleteCode: "KJA-2026-123",
  skillAssessment: {
    status: 'pending', // 'pending' | 'done'
    level: "Intermediate",
    tier: 2,
  },
  nextSession: {
    topic: "Defensive Drills",
    time: "Besok, 16:00",
  },
};

export default function PlayerDashboard() {
  const data = MOCK_PLAYER_DATA;
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast({
      title: "ID Atlet Disalin!",
      description: `${text} telah disalin ke clipboard.`,
      className: "rounded-[1.5rem] bg-foreground border-primary/50 text-background shadow-xl shadow-primary/10",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-8">
      
      <header>
        <h1 className="font-headline text-4xl md:text-5xl tracking-tight">
          HELLO, <span className="text-primary">{data.name.toUpperCase()}</span>
        </h1>
        <p className="text-muted-foreground text-lg mt-1">Selamat datang kembali di arena latihan.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Kolom 1: ID Atlet & Jadwal Berikutnya */}
        <div className="space-y-6">
            <Card className="bg-gradient-sport text-white border-none shadow-m3-3 rounded-[2rem] overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                    <Trophy size={120} />
                </div>
                <CardContent className="p-8 relative z-10 flex flex-col h-full justify-between min-h-[180px]">
                    <div>
                    <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">ID Atlet</p>
                    <div className="flex items-center gap-3">
                        <h2 className="font-mono text-3xl font-bold tracking-tighter">{data.athleteCode}</h2>
                        <Button 
                            size="icon" 
                            variant="secondary" 
                            className={`h-10 w-10 rounded-full border-none transition-all duration-300 ${isCopied ? 'bg-green-500 text-white scale-110' : 'bg-white/20 text-white hover:bg-white/40'}`} 
                            onClick={() => copyToClipboard(data.athleteCode)}
                        >
                            {isCopied ? <Check size={18} className="animate-in zoom-in spin-in-90 duration-300" /> : <Copy size={16} />}
                        </Button>
                    </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm flex flex-col justify-center">
                <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-primary" />
                            <span className="font-bold text-sm">Sesi Latihan Berikutnya</span>
                        </div>
                    </div>
                    <div>
                        <p className="font-headline text-xl text-primary">{data.nextSession.topic}</p>
                        <p className="text-sm text-muted-foreground">{data.nextSession.time}</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Kolom 2: Penilaian Skill */}
        <Card className="rounded-[2rem] border-none shadow-sm flex flex-col justify-center items-center text-center p-6 bg-secondary/30">
            {data.skillAssessment.status === 'pending' ? (
                <>
                    <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-4 animate-pulse">
                       <AlertTriangle size={32}/>
                    </div>
                    <h3 className="font-bold text-lg">Menunggu Penilaian</h3>
                    <p className="text-xs text-muted-foreground max-w-[200px]">Pelatih akan segera menilai kemampuan Anda untuk menentukan program yang paling sesuai.</p>
                </>
            ) : (
                 <>
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
                       <UserCheck size={32}/>
                    </div>
                    <p className="text-xs font-bold uppercase text-muted-foreground">Level Ditetapkan</p>
                    <h3 className="font-headline text-3xl">{data.skillAssessment.level}</h3>
                    <Badge variant="outline" className="mt-1">Tier {data.skillAssessment.tier}</Badge>
                 </>
            )}
        </Card>
        
        {/* Kolom 3: Notifikasi Penting */}
        <Card className="rounded-[2rem] border-none shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Bell size={18} className="text-primary" />
                    <h3 className="font-bold text-sm">Notifikasi Penting</h3>
                </div>
                 <Alert className="rounded-2xl border-l-4 border-l-red-500 bg-red-500/10 text-red-500">
                    <AlertTitle className="text-xs font-bold flex justify-between">
                        <span>PENTING</span>
                        <span>2 hari lalu</span>
                    </AlertTitle>
                    <AlertDescription className="text-xs mt-1 text-red-400/80">
                       Pembayaran SPP bulan Juli akan jatuh tempo dalam 3 hari.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>

      </section>
    </div>
  );
}
