
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Copy, Check, // Import icon Check
  Users, UserCheck, Trophy, AlertTriangle, 
  CheckCircle2, Clock, UploadCloud, ChevronRight, 
  Calendar, CreditCard, PlayCircle, Bell, History 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

// Simplified data for academy context
const MOCK_PLAYER_DATA = {
  athleteCode: "KJA-2026-123",
  profileCompleteness: 80,
  skillAssessment: {
    status: 'done',
    level: "Intermediate",
    tier: 2,
  },
  nextSession: {
    topic: "Defensive Drills",
    time: "Tomorrow, 16:00",
    court: "Court 2",
  },
  notifications: [
    { id: 1, type: 'info', message: "Jadwal latihan minggu depan telah diperbarui.", timestamp: "1h ago", isCritical: false },
    { id: 2, type: 'alert', message: "Pembayaran SPP bulan Juli akan jatuh tempo.", timestamp: "2d ago", isCritical: true },
  ],
  sparringHistory: [
    { id: 101, event: "Internal Sparring", date: "2024", category: "U-17", result: "Win (2-1)" }
  ]
};

export default function PlayerDashboard() {
  const data = MOCK_PLAYER_DATA;
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string, label: string = "Kode") => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast({
      title: "COPIED TO CLIPBOARD!", 
      description: `${label} ${text} siap dibagikan.`,
      className: "rounded-[1.5rem] bg-zinc-900 border-2 border-primary/50 text-white shadow-xl shadow-primary/10",
      duration: 3000,
      action: (
        <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 border border-green-500/50">
           <Check size={20} />
        </div>
      ),
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24 space-y-8">
      
      <header className="flex justify-between items-center bg-card p-6 rounded-b-[2.5rem] shadow-sm mb-6">
        <div>
          <h1 className="font-headline text-2xl md:text-3xl tracking-tight">
            HELLO, <span className="text-primary">IRSYAD</span>
          </h1>
          <p className="text-muted-foreground text-sm">Welcome back to the arena.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="ghost" className="text-xs font-bold text-destructive hidden md:block">Logout</Button>
           <Avatar className="h-12 w-12 border-2 border-primary">
             <AvatarImage src="https://github.com/shadcn.png" />
             <AvatarFallback>IJ</AvatarFallback>
           </Avatar>
        </div>
      </header>

      <div className="px-4 md:px-8 max-w-7xl mx-auto space-y-8">

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Card className="md:col-span-1 bg-gradient-sport text-white border-none shadow-m3-3 rounded-[2rem] overflow-hidden relative">
             <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                <Users size={120} />
             </div>
             <CardContent className="p-8 relative z-10 flex flex-col h-full justify-between">
                <div>
                   <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Athlete ID</p>
                   <div className="flex items-center gap-3">
                      <h2 className="font-mono text-3xl font-bold tracking-tighter">{data.athleteCode}</h2>
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className={`h-10 w-10 rounded-full border-none transition-all duration-300 ${isCopied ? 'bg-green-500 text-white scale-110' : 'bg-white/20 text-white hover:bg-white/40'}`} 
                        onClick={() => copyToClipboard(data.athleteCode, "Athlete ID")}
                      >
                         {isCopied ? <Check size={18} className="animate-in zoom-in spin-in-90 duration-300" /> : <Copy size={16} />}
                      </Button>
                   </div>
                </div>
             </CardContent>
          </Card>

          <div className="grid grid-rows-2 gap-4">
             <Card className="rounded-[2rem] border-none shadow-sm flex flex-col justify-center">
                <CardContent className="p-6">
                   <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                         <UserCheck size={18} className="text-primary" />
                         <span className="font-bold text-sm">Kelengkapan Profil</span>
                      </div>
                      <span className={`text-xs font-bold ${data.profileCompleteness === 100 ? 'text-green-600' : 'text-orange-500'}`}>
                         {data.profileCompleteness}%
                      </span>
                   </div>
                   <Progress value={data.profileCompleteness} className={`h-2 rounded-full ${data.profileCompleteness === 100 ? '[&>div]:bg-green-500' : '[&>div]:bg-orange-500'}`} />
                   {data.profileCompleteness < 100 && (
                      <Link href="/players/profile">
                        <Button variant="link" className="text-orange-600 text-xs font-bold p-0 mt-2 h-auto">
                           Lengkapi Sekarang <ChevronRight size={12} />
                        </Button>
                      </Link>
                   )}
                </CardContent>
             </Card>

             <Card className="rounded-[2rem] border-none shadow-sm flex flex-col justify-center">
                <CardContent className="p-6">
                   <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                         <PlayCircle size={18} className="text-primary" />
                         <span className="font-bold text-sm">Skill Assessment</span>
                      </div>
                      <Badge variant="outline" className="border bg-green-100 text-green-700 border-green-200">
                        Selesai
                      </Badge>
                   </div>
                    <div>
                        <p className="font-headline text-xl text-primary">{data.skillAssessment.level}</p>
                        <p className="text-xs text-muted-foreground">Tier {data.skillAssessment.tier}</p>
                    </div>
                </CardContent>
             </Card>
          </div>

          <Card className="rounded-[2rem] bg-zinc-900 text-white border-none shadow-xl relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             <CardContent className="p-6 relative z-10 text-center">
                {data.nextSession ? (
                   <>
                      <Badge className="bg-primary text-white border-none mb-4 animate-pulse">NEXT SESSION</Badge>
                      <p className="text-xs opacity-70 uppercase tracking-widest mb-1">Topic</p>
                      <h3 className="font-headline text-2xl mb-4">{data.nextSession.topic}</h3>
                      <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                         <div>
                            <Calendar size={16} className="mx-auto mb-1 opacity-70"/>
                            <p className="font-bold">{data.nextSession.time}</p>
                         </div>
                         <div>
                            <Trophy size={16} className="mx-auto mb-1 opacity-70"/>
                            <p className="font-bold">{data.nextSession.court}</p>
                         </div>
                      </div>
                   </>
                ) : (
                   <div className="py-6">
                      <Calendar size={40} className="mx-auto mb-4 opacity-50 text-primary" />
                      <h3 className="font-bold text-lg">Jadwal Latihan Kosong</h3>
                      <p className="text-xs opacity-60 mt-2">Hubungi pelatih untuk jadwal latihan berikutnya.</p>
                   </div>
                )}
             </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 px-2">
                 <History className="text-primary" size={20} />
                 <h3 className="font-headline text-xl">SPARRING HISTORY</h3>
              </div>
              <Card className="rounded-[2rem] border-none shadow-m3-1 overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                       <thead className="bg-secondary/30 text-xs uppercase font-bold text-muted-foreground">
                          <tr>
                             <th className="px-6 py-4">Event / Tahun</th>
                             <th className="px-6 py-4">Kategori</th>
                             <th className="px-6 py-4 text-right">Hasil</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-border/50">
                          {data.sparringHistory.map((match) => (
                             <tr key={match.id} className="hover:bg-secondary/10 transition-colors">
                                <td className="px-6 py-4">
                                   <p className="font-bold">{match.event}</p>
                                   <p className="text-xs text-muted-foreground">{match.date}</p>
                                </td>
                                <td className="px-6 py-4">
                                   <Badge variant="outline" className="rounded-md">{match.category}</Badge>
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-primary">
                                   {match.result}
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </Card>
           </div>

           <div className="space-y-6">
              <Card className="rounded-[2rem] border-none shadow-m3-1">
                 <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                       <Bell size={18} /> PENGUMUMAN
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    {data.notifications.map((notif) => (
                       <Alert key={notif.id} className={`rounded-2xl border-l-4 ${notif.isCritical ? 'border-l-red-500 bg-red-50 dark:bg-red-900/10' : 'border-l-blue-500 bg-secondary/30'}`}>
                          <AlertTitle className="text-xs font-bold flex justify-between">
                             {notif.isCritical ? <span className="text-red-600">PENTING</span> : 'INFO'}
                             <span className="text-[10px] opacity-60 font-normal">{notif.timestamp}</span>
                          </AlertTitle>
                          <AlertDescription className="text-xs mt-1">
                             {notif.message}
                          </AlertDescription>
                       </Alert>
                    ))}
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
}

// Shortcut Button Component
function ShortcutButton({ icon: Icon, title, desc, href, highlight, isComplete }: any) {
   return (
      <Link href={href}>
         <Card className={`h-full rounded-[2rem] border-none shadow-sm hover:shadow-md transition-all group cursor-pointer ${highlight ? 'bg-primary text-white' : 'bg-card hover:bg-secondary/30'}`}>
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
               <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${highlight ? 'bg-white/20 text-white' : 'bg-secondary text-primary'}`}>
                  {isComplete ? <CheckCircle2 size={24} /> : <Icon size={24} />}
               </div>
               <div>
                  <h3 className="font-bold text-lg leading-tight">{title}</h3>
                  <p className={`text-xs mt-1 ${highlight ? 'text-white/80' : 'text-muted-foreground'}`}>{desc}</p>
               </div>
            </CardContent>
         </Card>
      </Link>
   );
}
