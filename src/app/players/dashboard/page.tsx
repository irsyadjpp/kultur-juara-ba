
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
import { Separator } from "@/components/ui/separator";

import { MOCK_PLAYER_DATA, TPFStatus, RegistrationStatus } from "@/lib/dashboard-types";
import { useToast } from "@/hooks/use-toast"; // 1. Import Hook Toast

export default function PlayerDashboard() {
  const data = MOCK_PLAYER_DATA; // Gunakan data mock
  const { toast } = useToast(); // 2. Init Toast
  const [isCopied, setIsCopied] = useState(false); // 3. State untuk animasi tombol


  // 4. Fungsi Copy Baru yang Lebih Sporty
  const copyToClipboard = (text: string, label: string = "Kode") => {
    navigator.clipboard.writeText(text);
    
    // Efek visual pada tombol (Ganti icon sesaat)
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);

    // Tampilkan Toast Kustom
    toast({
      // Judul yang Bold & Gen-Z (Capslock)
      title: "COPIED TO CLIPBOARD!", 
      description: `${label} ${text} siap dibagikan.`,
      // Styling Custom: Gelap, Rounded Besar, Border Neon/Primary
      className: "rounded-[1.5rem] bg-zinc-900 border-2 border-primary/50 text-white shadow-xl shadow-primary/10",
      duration: 3000,
      // Ikon visual di dalam toast
      action: (
        <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 border border-green-500/50">
           <Check size={20} />
        </div>
      ),
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24 space-y-8">
      
      {/* 1. HEADER (PRD Poin 1: Nama, Foto, Logout) */}
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

        {/* 2. PANEL RINGKASAN (PRD Poin 2.A & 2.B) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* CARD A: IDENTITY (Athlete Code) */}
          <Card className="rounded-[2rem] bg-gradient-sport text-white border-none shadow-m3-3 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                <Users size={120} />
             </div>
             <CardContent className="p-8 relative z-10 flex flex-col h-full justify-between">
                <div>
                   <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Athlete Identity</p>
                   <div className="flex items-center gap-3">
                      <h2 className="font-mono text-3xl font-bold tracking-tighter">{data.athleteCode}</h2>
                      
                      {/* 5. Update Tombol Copy */}
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className={`h-10 w-10 rounded-full border-none transition-all duration-300 ${isCopied ? 'bg-green-500 text-white scale-110' : 'bg-white/20 text-white hover:bg-white/40'}`} 
                        onClick={() => copyToClipboard(data.athleteCode, "Athlete Code")}
                      >
                         {/* Animasi Icon Swap */}
                         {isCopied ? <Check size={18} className="animate-in zoom-in spin-in-90 duration-300" /> : <Copy size={16} />}
                      </Button>
                   </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20">
                   <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Community</p>
                   {data.communityCode ? (
                      <div className="flex items-center justify-between">
                         <Badge className="bg-white/20 text-white hover:bg-white/30 border-none px-3 py-1 font-mono">
                            {data.communityCode}
                         </Badge>
                         <Button variant="link" className="text-white text-xs font-bold p-0 h-auto underline decoration-white/50">
                            Lihat Klub
                         </Button>
                      </div>
                   ) : (
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" className="text-xs font-bold rounded-pill h-8">Join</Button>
                        <Button size="sm" variant="outline" className="text-xs font-bold rounded-pill h-8 bg-transparent text-white border-white hover:bg-white/10">Buat Baru</Button>
                      </div>
                   )}
                </div>
             </CardContent>
          </Card>

          {/* CARD B: STATUS TRACKER (PRD Poin 2.C & 2.D) */}
          <div className="grid grid-rows-2 gap-4">
             {/* Profil Status */}
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

             {/* TPF Status */}
             <Card className="rounded-[2rem] border-none shadow-sm flex flex-col justify-center">
                <CardContent className="p-6">
                   <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                         <PlayCircle size={18} className="text-primary" />
                         <span className="font-bold text-sm">Status TPF</span>
                      </div>
                      <TPFBadge status={data.tpfStatus} />
                   </div>
                   
                   {data.tpfStatus === 'done' && data.tpfResult ? (
                      <div className="mt-2">
                         <p className="font-headline text-xl text-primary">{data.tpfResult.level}</p>
                         <p className="text-xs text-muted-foreground">Tier {data.tpfResult.tier}</p>
                      </div>
                   ) : (
                      <p className="text-xs text-muted-foreground mt-2">
                         {data.tpfStatus === 'none' ? 'Upload video untuk penilaian.' : 'Sedang ditinjau oleh tim penilai.'}
                      </p>
                   )}
                </CardContent>
             </Card>
          </div>

          {/* CARD C: REGISTRATION JOURNEY (PRD Poin 2.E) */}
          <Card className="rounded-[2rem] border-l-8 border-l-primary shadow-m3-1 flex flex-col">
             <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 font-headline text-lg">
                   <Trophy size={20} className="text-primary" /> PENDAFTARAN
                </CardTitle>
             </CardHeader>
             <CardContent className="flex-1 flex flex-col">
                <RegistrationStepper status={data.registrationStatus} />
                
                <div className="mt-auto pt-4">
                   <RegistrationAction status={data.registrationStatus} />
                </div>
             </CardContent>
          </Card>

        </section>

        {/* 3. SHORTCUTS (PRD Poin 2.F) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <ShortcutButton 
             icon={UserCheck} title="Lengkapi Profil" desc="Data diri & Video" 
             href="/players/profile" isComplete={data.profileCompleteness === 100} 
           />
           <ShortcutButton 
             icon={Users} title="Cari Pasangan" desc="Temukan Duo Anda" 
             href="/players/find-partner" 
           />
           <ShortcutButton 
             icon={Trophy} title="Daftar Turnamen" desc="Badmintour Open #1" 
             href="/players/tournament" highlight 
           />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* 4. HISTORY PERTANDINGAN (PRD Poin 2.G) */}
           <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 px-2">
                 <History className="text-primary" size={20} />
                 <h3 className="font-headline text-xl">MATCH HISTORY</h3>
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
                          {data.history.map((match) => (
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
                 <div className="bg-secondary/10 p-3 text-center">
                    <Button variant="link" className="text-xs font-bold text-muted-foreground">Lihat Semua History</Button>
                 </div>
              </Card>
           </div>

           {/* 5. NOTIFIKASI & NEXT MATCH (PRD Poin 2.H & Next Match) */}
           <div className="space-y-6">
              
              {/* Next Match / Placeholder */}
              <Card className="rounded-[2rem] bg-zinc-900 text-white border-none shadow-xl relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                 <CardContent className="p-6 relative z-10 text-center">
                    {data.nextMatch ? (
                       <>
                          <Badge className="bg-primary text-white border-none mb-4 animate-pulse">UPCOMING MATCH</Badge>
                          <p className="text-xs opacity-70 uppercase tracking-widest mb-1">Opponent</p>
                          <h3 className="font-headline text-2xl mb-4">{data.nextMatch.opponent}</h3>
                          <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                             <div>
                                <Calendar size={16} className="mx-auto mb-1 opacity-70"/>
                                <p className="font-bold">{data.nextMatch.time}</p>
                             </div>
                             <div>
                                <Trophy size={16} className="mx-auto mb-1 opacity-70"/>
                                <p className="font-bold">{data.nextMatch.court}</p>
                             </div>
                          </div>
                       </>
                    ) : (
                       <div className="py-6">
                          <Calendar size={40} className="mx-auto mb-4 opacity-50 text-primary" />
                          <h3 className="font-bold text-lg">Belum Ada Jadwal</h3>
                          <p className="text-xs opacity-60 mt-2">Jadwal pertandingan akan muncul H-12 jam sebelum laga dimulai.</p>
                       </div>
                    )}
                 </CardContent>
              </Card>

              {/* Notification Panel */}
              <Card className="rounded-[2rem] border-none shadow-m3-1">
                 <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                       <Bell size={18} /> PENGUMUMAN PENTING
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

/* --- SUB-COMPONENTS (Untuk Modularity & Clean Code) --- */

// 1. TPF Status Badge Logic
function TPFBadge({ status }: { status: TPFStatus }) {
  const styles = {
    none: "bg-secondary text-muted-foreground",
    waiting: "bg-yellow-100 text-yellow-700 border-yellow-200",
    process: "bg-blue-100 text-blue-700 border-blue-200",
    done: "bg-green-100 text-green-700 border-green-200",
    revision: "bg-red-100 text-red-700 border-red-200 animate-pulse"
  };

  const labels = {
    none: "Belum Upload",
    waiting: "Menunggu",
    process: "Dalam Proses",
    done: "Selesai",
    revision: "Perlu Revisi"
  };

  return (
    <Badge variant="outline" className={`border ${styles[status]}`}>
      {labels[status]}
    </Badge>
  );
}

// 2. Registration Stepper Logic (PRD Poin 2.E)
function RegistrationStepper({ status }: { status: RegistrationStatus }) {
   // Mapping status ke index step (0-3)
   const steps = ['draft', 'waiting_partner', 'valid', 'unpaid', 'paid'];
   const currentIndex = steps.indexOf(status);
   
   // Label untuk UI
   const displaySteps = [
      { label: "Draft", icon: Trophy },
      { label: "Pairing", icon: Users },
      { label: "Bayar", icon: CreditCard },
      { label: "Lunas", icon: CheckCircle2 }
   ];

   return (
      <div className="flex justify-between items-center mb-6 relative mt-4">
         {/* Line Background */}
         <div className="absolute top-3 left-0 w-full h-0.5 bg-secondary -z-10"></div>
         <div 
            className="absolute top-3 left-0 h-0.5 bg-primary -z-10 transition-all duration-500"
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
         ></div>

         {displaySteps.map((s, i) => {
            // Simplified logic: index 0=draft, 1=waiting, 2=valid, 3=unpaid, 4=paid
            // Map 5 logic steps to 4 visual steps
            let isActive = false;
            let isCompleted = false;

            if (i === 0) { isCompleted = currentIndex > 0; isActive = currentIndex === 0; } // Draft
            if (i === 1) { isCompleted = currentIndex > 1; isActive = currentIndex === 1; } // Pairing
            if (i === 2) { isCompleted = currentIndex > 3; isActive = currentIndex === 2 || currentIndex === 3; } // Payment (Valid/Unpaid)
            if (i === 3) { isCompleted = currentIndex === 4; isActive = currentIndex === 4; } // Paid

            return (
               <div key={i} className="flex flex-col items-center gap-2 bg-background px-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all ${isCompleted || isActive ? 'border-primary bg-primary text-white' : 'border-muted bg-background text-muted-foreground'}`}>
                     <s.icon size={14} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{s.label}</span>
               </div>
            )
         })}
      </div>
   );
}

// 3. Registration Action Button Logic
function RegistrationAction({ status }: { status: RegistrationStatus }) {
   switch (status) {
      case 'draft':
         return <Button className="w-full rounded-pill font-bold">Daftar Sekarang</Button>;
      case 'waiting_partner':
         return <Button variant="secondary" className="w-full rounded-pill font-bold border-2 border-primary text-primary">Cari Pasangan</Button>;
      case 'valid':
      case 'unpaid':
         return <Button className="w-full rounded-pill font-bold bg-orange-500 hover:bg-orange-600 text-white">Bayar Tagihan</Button>;
      case 'paid':
         return <Button variant="outline" className="w-full rounded-pill font-bold text-green-600 border-green-200 bg-green-50">Unduh Kuitansi</Button>;
      default:
         return null;
   }
}

// 4. Shortcut Button Component
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
