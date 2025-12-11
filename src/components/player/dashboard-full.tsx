
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  UserPlus, 
  Users, 
  Zap, 
  Trophy, 
  Settings, 
  Share2, 
  QrCode,
  ShieldAlert,
  Swords
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DigitalPlayerCard } from "./digital-player-card";
import { CourtLines } from "@/components/ui/court-lines";
import { cn } from "@/lib/utils";

export function DashboardClient({ session }: { session: any }) {
  const { toast } = useToast();
  const [partnerCode, setPartnerCode] = useState("");
  const [communityCode, setCommunityCode] = useState("");

  // Handler Copy Code
  const handleCopy = () => {
    navigator.clipboard.writeText(session.athleteCode);
    toast({
      title: "Copied!",
      description: "Kode atlet berhasil disalin ke clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
         <CourtLines />
      </div>
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* --- HEADER SECTION --- */}
      <header className="pt-8 pb-6 px-6 container mx-auto flex justify-between items-center relative z-10">
         <div>
            <h1 className="text-2xl font-bold font-headline uppercase tracking-tighter">
               Halo, <span className="text-primary">{session.name.split(' ')[0]}</span> 👋
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Ready to smash today?</p>
         </div>
         <Button variant="outline" size="icon" className="rounded-full border-2">
            <Settings className="w-5 h-5" />
         </Button>
      </header>

      {/* --- MAIN CONTENT (BENTO GRID) --- */}
      <main className="container mx-auto px-4 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT COL: PLAYER CARD (GAMIFICATION) */}
            <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6">
               <div className="relative group perspective-1000">
                  {/* Panggil Component Kartu Atlet yg sudah dibuat sebelumnya */}
                  <DigitalPlayerCard 
                     name={session.name}
                     level={session.level || "Beginner"} // Default Beginner jika belum ada tpf
                     code={session.athleteCode}
                     position="MD/XD"
                  />
                  
                  {/* Status Badge Floating */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-surface-variant border border-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-xl flex items-center gap-2 whitespace-nowrap z-20">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                         {session.teamId ? "MEMBER" : "LOOKING FOR TEAM"}
                      </span>
                  </div>
               </div>

               {/* Mobile Action: Share */}
               <Button variant="secondary" className="w-full rounded-full font-bold lg:hidden">
                  <Share2 className="w-4 h-4 mr-2" /> Share Card
               </Button>
            </div>

            {/* MIDDLE COL: MISSION CONTROL */}
            <div className="lg:col-span-8 xl:col-span-6 space-y-6">
               
               {/* 1. ATHLETE CODE DISPLAY */}
               <Card className="bg-zinc-900 text-white border-none rounded-[2rem] p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-500">
                     <QrCode className="w-32 h-32 text-white" />
                  </div>
                  
                  <div className="relative z-10">
                     <div className="flex items-center gap-2 mb-4 text-zinc-400">
                        <Zap className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-bold text-sm uppercase tracking-widest">My Identity</span>
                     </div>
                     
                     <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-4 cursor-pointer hover:bg-white/20 transition-colors" onClick={handleCopy}>
                           <code className="text-3xl md:text-4xl font-black font-mono tracking-wider text-yellow-400">
                              {session.athleteCode}
                           </code>
                           <Copy className="w-6 h-6 text-white/70" />
                        </div>
                        <div className="text-sm text-zinc-400 max-w-xs leading-snug">
                           Bagikan kode ini ke partner atau manajer untuk didaftarkan ke dalam tim.
                        </div>
                     </div>
                  </div>
               </Card>

               {/* 2. JOIN / PAIRING ACTION */}
               {!session.teamId ? (
                   <Card className="border-2 border-dashed border-primary/20 bg-surface-variant/30 rounded-[2rem] overflow-hidden">
                      <Tabs defaultValue="partner" className="w-full">
                         <div className="p-2">
                            <TabsList className="bg-surface-variant/50 p-2 m-2 rounded-[1.5rem] flex gap-2 w-full h-auto">
                               <TabsTrigger value="partner" className="w-1/2 rounded-3xl font-bold py-3 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
                                  Cari Pasangan
                               </TabsTrigger>
                               <TabsTrigger value="community" className="w-1/2 rounded-3xl font-bold py-3 data-[state=active]:bg-zinc-900 data-[state=active]:text-white transition-all">
                                  Gabung Klub
                               </TabsTrigger>
                            </TabsList>
                         </div>

                         <div className="p-6 pt-2">
                            <TabsContent value="partner" className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                               <div className="flex items-start gap-4 mb-4">
                                  <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                                     <UserPlus className="w-6 h-6" />
                                  </div>
                                  <div>
                                     <h3 className="font-bold text-lg">Daftar Independen</h3>
                                     <p className="text-muted-foreground text-sm">Punya partner? Masukkan kode atlet mereka untuk mulai pairing.</p>
                                  </div>
                               </div>
                               <div className="flex gap-2">
                                  <Input 
                                     placeholder="ATH-XXXXX" 
                                     className="h-14 text-lg font-mono uppercase rounded-2xl border-2 focus:border-primary/50"
                                     value={partnerCode}
                                     onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                                  />
                                  <Button size="lg" className="h-14 px-8 rounded-2xl font-bold bg-primary hover:bg-primary/90">
                                     Cek
                                  </Button>
                               </div>
                            </TabsContent>

                            <TabsContent value="community" className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                               <div className="flex items-start gap-4 mb-4">
                                  <div className="bg-zinc-900/10 p-3 rounded-full text-zinc-900 dark:text-white shrink-0">
                                     <Users className="w-6 h-6" />
                                  </div>
                                  <div>
                                     <h3 className="font-bold text-lg">Gabung Komunitas</h3>
                                     <p className="text-muted-foreground text-sm">Masukkan kode unik komunitas yang diberikan manajer.</p>
                                  </div>
                               </div>
                               <div className="flex gap-2">
                                  <Input 
                                     placeholder="COM-XXXXX" 
                                     className="h-14 text-lg font-mono uppercase rounded-2xl border-2 focus:border-zinc-500"
                                     value={communityCode}
                                     onChange={(e) => setCommunityCode(e.target.value.toUpperCase())}
                                  />
                                  <Button size="lg" className="h-14 px-8 rounded-2xl font-bold bg-zinc-900 text-white hover:bg-zinc-800">
                                     Join
                                  </Button>
                               </div>
                            </TabsContent>
                         </div>
                      </Tabs>
                   </Card>
               ) : (
                   /* JIKA SUDAH PUNYA TIM */
                   <Card className="bg-green-500 text-white border-none rounded-[2rem] p-8">
                       <div className="flex items-center gap-4">
                           <div className="bg-white/20 p-4 rounded-full">
                               <ShieldAlert className="w-8 h-8" />
                           </div>
                           <div>
                               <h3 className="font-black font-headline text-2xl">YOU'RE IN!</h3>
                               <p className="font-medium opacity-90">Terdaftar di tim: <strong>{session.teamName || "PB JUARA"}</strong></p>
                           </div>
                       </div>
                   </Card>
               )}

            </div>

            {/* RIGHT COL: STATS / INFO */}
            <div className="lg:col-span-12 xl:col-span-3 space-y-6">
               <Card className="rounded-[2rem] p-6 bg-surface-variant/30 border-none">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">Tournament Stats</h3>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 bg-background rounded-2xl shadow-sm">
                        <div className="flex items-center gap-3">
                           <Trophy className="w-5 h-5 text-yellow-500" />
                           <span className="font-bold">Level</span>
                        </div>
                        <Badge>{session.level || "TBD"}</Badge>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-background rounded-2xl shadow-sm">
                        <div className="flex items-center gap-3">
                           <Swords className="w-5 h-5 text-primary" />
                           <span className="font-bold">Matches</span>
                        </div>
                        <span className="font-mono font-bold">0</span>
                     </div>
                  </div>
               </Card>
               
               <div className="bg-primary/5 rounded-[2rem] p-6 border border-primary/10">
                  <h4 className="font-bold text-primary mb-2">Butuh Bantuan?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                     Jika mengalami kendala pairing atau data tidak sesuai.
                  </p>
                  <Button variant="outline" className="w-full rounded-xl border-primary/20 text-primary hover:bg-primary hover:text-white">
                     Hubungi Admin
                  </Button>
               </div>
            </div>

         </div>
      </main>
    </div>
  );
}
