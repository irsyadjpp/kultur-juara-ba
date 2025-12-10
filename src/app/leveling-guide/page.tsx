
'use client';

import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldAlert, 
  Swords, 
  Dumbbell, 
  Trophy, 
  Users,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CourtLines } from "@/components/ui/court-lines";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function LevelingGuidePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      {/* HEADER SECTION */}
      <section className="relative pt-32 pb-12 overflow-hidden">
         <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-secondary/20 blur-[120px] rounded-full pointer-events-none" />
         <div className="container mx-auto px-4 relative z-10 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-bold uppercase tracking-widest border-primary/30 text-primary bg-primary/5">
               Road to BCC 2026
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter mb-6 uppercase">
               Leveling <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Guide</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
               Panduan teknis dan rekam jejak untuk menentukan kasta permainanmu. <br/>
               <span className="font-bold text-foreground">Jujur itu Juara.</span>
            </p>
         </div>
      </section>

      {/* IMPORTANT NOTICE */}
      <section className="container mx-auto px-4 mb-16">
         <div className="bg-yellow-400 text-black rounded-[2.5rem] p-8 md:p-10 shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
               <div className="bg-black/10 p-4 rounded-full shrink-0">
                  <AlertTriangle className="w-8 h-8" />
               </div>
               <div>
                  <h3 className="text-2xl font-black font-headline uppercase mb-2">PENTING: BACA SEBELUM DAFTAR!</h3>
                  <p className="font-medium text-black/80 text-lg leading-relaxed">
                     Sistem turnamen adalah <strong>Open Gender (Bebas Pasangan) Tanpa Voor</strong>. 
                     Seluruh indikator level di bawah ini mengacu pada <strong>Standar Ganda Putra Umum</strong>. 
                     Pemain Putri harap mengukur kemampuan saat melawan pemain Putra.
                  </p>
               </div>
            </div>
            {/* Pattern Overlay */}
            <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
               <Swords className="w-64 h-64" />
            </div>
         </div>
      </section>

      {/* LEVELS GRID */}
      <section className="container mx-auto px-4 mb-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* BEGINNER */}
            <LevelCard 
               color="green"
               title="BEGINNER"
               subtitle="Pemula / Hobi"
               icon={<Dumbbell className="w-6 h-6" />}
               description="Pemain 'tepok bulu' yang belum menguasai teknik dasar sempurna. Backhand lemah & rotasi belum paham."
               specs={[
                  { label: "Lob", val: "Sering tanggung/pendek" },
                  { label: "Backhand", val: "Lemah/Mati sendiri" },
                  { label: "Rotasi", val: "Sering tabrakan" },
                  { label: "Exp", val: "Non-Turnamen / Otodidak" },
               ]}
            />

            {/* INTERMEDIATE */}
            <LevelCard 
               color="yellow"
               title="INTERMEDIATE"
               subtitle="Zona Kompetitif"
               icon={<Swords className="w-6 h-6" />}
               description="Pemain yang sudah menguasai teknik & strategi. Defense bisa balik smash, rotasi lancar."
               specs={[
                  { label: "Lob & Clear", val: "Konsisten Baseline" },
                  { label: "Power", val: "Smash & Drive Cukup" },
                  { label: "Rotasi", val: "Lancar Depan-Belakang" },
                  { label: "Exp", val: "Juara Lokal / Eks PB" },
               ]}
               recommended
            />

            {/* ADVANCE */}
            <LevelCard 
               color="red"
               title="ADVANCE"
               subtitle="Mahir / Semi-Pro"
               icon={<Trophy className="w-6 h-6" />}
               description="Skill di atas rata-rata komunitas. Punya power besar, akurasi tinggi, dan tipuan mematikan."
               specs={[
                  { label: "Akurasi", val: "Sudut Sulit / Tipuan" },
                  { label: "Power", val: "Smash Tajam & Keras" },
                  { label: "Backhand", val: "Clear Baseline Mudah" },
                  { label: "Exp", val: "Eks Pelatda / Tarkam Pro" },
               ]}
            />

         </div>
      </section>

      {/* PAIRING MATRIX */}
      <section className="container mx-auto px-4 mb-20">
         <div className="bg-secondary/30 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <CourtLines />
            </div>
            
            <div className="relative z-10">
               <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-5xl font-black font-headline uppercase mb-4">
                     Pairing <span className="text-primary">Matrix</span>
                  </h2>
                  <p className="text-muted-foreground text-lg">
                     Prinsip: <span className="font-bold text-foreground">"Peringkat Tertinggi Menentukan Kategori"</span>
                  </p>
               </div>

               <div className="max-w-4xl mx-auto space-y-3">
                  <PairingRow p1="Beginner" p2="Beginner" result="Beginner" valid />
                  <PairingRow p1="Beginner" p2="Intermediate" result="Intermediate" valid note="(Naik Level)" />
                  <PairingRow p1="Intermediate" p2="Intermediate" result="Intermediate" valid />
                  <PairingRow p1="Intermediate" p2="Advance" result="Advance" valid note="(Naik Level)" />
                  <PairingRow p1="Advance" p2="Advance" result="Advance" valid />
                  <PairingRow p1="Beginner" p2="Advance" result="DILARANG" valid={false} note="Gap Skill Terlalu Jauh" />
               </div>
            </div>
         </div>
      </section>

      {/* ANTI SANDBAGGING CHECK */}
      <section className="container mx-auto px-4">
         <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 flex flex-col justify-center">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 w-fit">
                  <ShieldAlert className="w-4 h-4" /> Integrity Check
               </div>
               <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter mb-6">
                  ANTI<br/>SANDBAGGING.
               </h2>
               <p className="text-lg text-muted-foreground leading-relaxed">
                  Jawablah dengan jujur. Jika Anda menjawab <strong className="text-foreground">"YA"</strong> pada salah satu poin di samping, mohon <strong className="text-destructive">JANGAN</strong> mendaftar di level Beginner.
               </p>
            </div>

            <div className="md:col-span-7 space-y-4">
               {[
                  "Apakah Anda bisa melakukan Backhand Clear dari baseline ke baseline lawan?",
                  "Apakah Anda paham dan otomatis melakukan rotasi saat menyerang & bertahan?",
                  "Apakah Anda pernah juara turnamen Open atau Semi-Open?",
                  "Apakah Anda pernah berlatih intensif di Klub/PB selama lebih dari 2 tahun?"
               ].map((q, i) => (
                  <div key={i} className="bg-card border p-6 rounded-3xl flex items-start gap-4 hover:border-primary/50 transition-colors">
                     <div className="bg-secondary font-black font-headline w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                        ?
                     </div>
                     <p className="font-medium text-lg pt-1.5">{q}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* SYSTEM WARNING */}
         <div className="mt-16 bg-destructive/5 border-2 border-destructive/20 rounded-[2rem] p-8 text-center">
            <p className="text-destructive font-bold text-lg">
               ⚠️ Peringatan Sistem: Panitia memiliki database rekam jejak pemain. 
               Ketidaksesuaian level (Sandbagging) = <span className="underline decoration-4 underline-offset-4">DISKUALIFIKASI</span> tanpa refund.
            </p>
         </div>
      </section>
      <Footer />
    </div>
  );
}

// --- COMPONENTS ---

function LevelCard({ 
   color, 
   title, 
   subtitle, 
   icon, 
   description, 
   specs,
   recommended = false
}: { 
   color: 'green' | 'yellow' | 'red', 
   title: string, 
   subtitle: string, 
   icon: React.ReactNode, 
   description: string,
   specs: {label: string, val: string}[],
   recommended?: boolean
}) {
   
   const colors = {
      green: {
         bg: "bg-green-500",
         border: "border-green-200 dark:border-green-900",
         text: "text-green-600 dark:text-green-400",
         light: "bg-green-500/5"
      },
      yellow: {
         bg: "bg-yellow-400",
         border: "border-yellow-200 dark:border-yellow-900",
         text: "text-yellow-600 dark:text-yellow-400",
         light: "bg-yellow-400/5"
      },
      red: {
         bg: "bg-primary",
         border: "border-primary/20",
         text: "text-primary",
         light: "bg-primary/5"
      }
   }

   const theme = colors[color];

   return (
      <Card className={cn(
         "relative overflow-hidden border-2 rounded-[2.5rem] flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2",
         theme.border,
         recommended ? "ring-4 ring-yellow-400/30 scale-[1.02] z-10 shadow-xl" : "shadow-md"
      )}>
         {recommended && (
            <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest z-20">
               Most Popular
            </div>
         )}
         
         <div className={cn("p-8", theme.light)}>
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg", theme.bg)}>
               {icon}
            </div>
            <h3 className={cn("text-3xl font-black font-headline mb-1", theme.text)}>{title}</h3>
            <p className="font-bold text-muted-foreground uppercase tracking-wider text-sm">{subtitle}</p>
         </div>

         <div className="p-8 pt-6 flex-grow flex flex-col gap-6 bg-card">
            <p className="text-foreground/80 leading-relaxed font-medium">
               {description}
            </p>
            
            <div className="space-y-3 mt-auto">
               {specs.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-dashed pb-2 last:border-0 last:pb-0">
                     <span className="text-muted-foreground font-medium">{spec.label}</span>
                     <span className="font-bold text-right">{spec.val}</span>
                  </div>
               ))}
            </div>
         </div>
      </Card>
   )
}

function PairingRow({ p1, p2, result, valid, note }: { p1: string, p2: string, result: string, valid: boolean, note?: string }) {
   return (
      <div className={cn(
         "flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border-2 transition-all",
         valid ? "bg-card border-transparent hover:border-primary/10 shadow-sm" : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30"
      )}>
         <div className="flex items-center gap-3 mb-2 sm:mb-0">
            <Badge variant="outline" className="h-8 px-3 text-sm bg-background">{p1}</Badge>
            <span className="text-muted-foreground font-black">+</span>
            <Badge variant="outline" className="h-8 px-3 text-sm bg-background">{p2}</Badge>
         </div>

         <div className="flex items-center gap-3">
             <div className="hidden sm:block h-px w-8 bg-border" />
             {valid ? (
               <div className="text-right">
                  <Badge className="h-8 px-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black border-none">
                     Masuk {result}
                  </Badge>
                  {note && <span className="block text-[10px] font-bold text-green-600 uppercase tracking-wide mt-1">{note}</span>}
               </div>
             ) : (
                <div className="text-right">
                   <Badge variant="destructive" className="h-8 px-4">
                      <XCircle className="w-3 h-3 mr-1" /> {result}
                   </Badge>
                   {note && <span className="block text-[10px] font-bold text-destructive uppercase tracking-wide mt-1">{note}</span>}
                </div>
             )}
         </div>
      </div>
   )
}
