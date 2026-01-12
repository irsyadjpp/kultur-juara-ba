

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, UserCheck, AlertCircle, Copy, ArrowRight, Trophy, Megaphone } from "lucide-react";

export default function ManagerDashboard() {
  return (
    <div className="space-y-6">
      {/* HERO SECTION: CODE & STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. COMMUNITY CODE CARD (Fitur Utama) */}
        <Card className="md:col-span-1 bg-gradient-sport text-white border-none shadow-m3-3 rounded-[2rem] overflow-hidden relative">
           <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
              <Users size={150} />
           </div>
           <CardContent className="p-8 flex flex-col h-full justify-center relative z-10 text-center">
              <p className="text-white/80 font-medium mb-2 uppercase tracking-widest text-xs">Community Code</p>
              <div className="flex items-center justify-center gap-3 mb-6">
                 <h1 className="font-mono text-5xl font-bold tracking-tighter">EX-2025</h1>
                 <Button size="icon" variant="secondary" className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/40 border-none">
                    <Copy size={16} />
                 </Button>
              </div>
              <p className="text-xs text-white/70 mb-6">
                 Bagikan kode ini kepada atlet Anda untuk bergabung otomatis ke dalam komunitas.
              </p>
              <div className="bg-black/20 rounded-xl p-4 backdrop-blur-sm">
                 <div className="flex justify-between text-sm mb-1">
                    <span className="opacity-80">Total Anggota</span>
                    <span className="font-bold text-xl">42</span>
                 </div>
              </div>
           </CardContent>
        </Card>

        {/* 2. REGISTRATION FUNNEL STATS */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
           {[
             { label: "Siap Tanding", val: 30, total: 42, color: "bg-blue-500", icon: UserCheck, desc: "Selesai dinilai TPF" },
             { label: "Menunggu Pembayaran", val: 12, total: 42, color: "bg-orange-500", icon: Users, desc: "Menunggu pembayaran" },
             { label: "Pembayaran Lunas", val: 8, total: 42, color: "bg-green-500", icon: Trophy, desc: "Pembayaran Lunas" },
             { label: "Masalah Data", val: 2, total: 42, color: "bg-red-500", icon: AlertCircle, desc: "Profil belum lengkap" }
           ].map((stat, i) => (
             <Card key={i} className="rounded-[2rem] shadow-sm border-none bg-card hover:shadow-md transition-all">
                <CardContent className="p-6">
                   <div className="flex justify-between items-start mb-4">
                      <div className={`h-10 w-10 rounded-full ${stat.color} bg-opacity-10 flex items-center justify-center text-white shadow-lg`} style={{backgroundColor: 'var(--card)'}}>
                         <stat.icon size={20} className={stat.color.replace('bg-', 'text-')} />
                      </div>
                      <span className="font-headline text-3xl">{stat.val}</span>
                   </div>
                   <h3 className="font-bold text-sm text-muted-foreground mb-2">{stat.label}</h3>
                   <Progress value={(stat.val / stat.total) * 100} className="h-1.5 mb-2" />
                   <p className="text-[10px] text-muted-foreground">{stat.desc}</p>
                </CardContent>
             </Card>
           ))}
        </div>
      </div>

      {/* NOTIFICATIONS & SHORTCUTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* NOTIFICATION FEED */}
         <Card className="lg:col-span-2 rounded-[2rem] shadow-m3-1 border-none">
            <CardHeader>
               <CardTitle className="font-headline text-lg">NOTIFIKASI KOMUNITAS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-2xl flex gap-3 border border-yellow-100 dark:border-yellow-900/30">
                  <AlertCircle className="text-yellow-600 shrink-0" />
                  <div>
                     <h4 className="font-bold text-sm text-yellow-800 dark:text-yellow-500">Deadline Pendaftaran H-3</h4>
                     <p className="text-xs text-yellow-700 dark:text-yellow-600 mt-1">
                        Segera selesaikan pembayaran untuk 12 pemain yang masih pending sebelum tanggal 24 Des.
                     </p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto bg-transparent border-yellow-600 text-yellow-700 hover:bg-yellow-100">
                     Bayar
                  </Button>
               </div>
               
               {/* List item normal */}
               <div className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                     <div className="h-2 w-2 bg-primary rounded-full"></div>
                     <div>
                        <p className="text-sm font-bold">Revisi Pendaftaran Diperlukan</p>
                        <p className="text-xs text-muted-foreground">Pemain "Kevin" tidak valid secara matriks.</p>
                     </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground">2 jam lalu</span>
               </div>
            </CardContent>
         </Card>
         
         {/* QUICK ACTIONS */}
         <div className="space-y-4">
            <Button className="w-full h-16 rounded-[1.5rem] bg-primary text-white font-headline text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform justify-between px-6">
               KELOLA PEMAIN <ArrowRight />
            </Button>
            <Button variant="outline" className="w-full h-16 rounded-[1.5rem] border-2 font-headline text-lg hover:bg-secondary justify-between px-6">
               DAFTARKAN PEMAIN <Users />
            </Button>
            <Button variant="secondary" className="w-full h-16 rounded-[1.5rem] font-headline text-lg hover:bg-secondary/80 justify-between px-6">
               BROADCAST <Megaphone />
            </Button>
         </div>
      </div>
    </div>
  );
}
