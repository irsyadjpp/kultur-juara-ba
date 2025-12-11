
'use client';

import { useState } from 'react';
import { 
  Trophy, 
  Swords, 
  Dumbbell, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Info,
  ChevronDown,
  Scale
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { CourtLines } from '@/components/ui/court-lines';
import { cn } from "@/lib/utils";

export default function LevelingGuidePage() {
  const [activeTab, setActiveTab] = useState<string>("beginner");

  return (
    <div className="min-h-screen bg-background pb-20 pt-24 relative overflow-hidden">
      
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
         <CourtLines />
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <div className="container mx-auto px-4 mb-16 relative z-10 text-center">
         <Badge variant="outline" className="mb-4 px-4 py-1 border-primary text-primary font-bold tracking-widest uppercase">
            Official Rulebook
         </Badge>
         <h1 className="text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter mb-6">
            Know Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">Limits.</span>
         </h1>
         <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Panduan klasifikasi skill Road to BCC 2026. <br/>
            <span className="text-foreground font-bold">Fair Play</span> dimulai dari kejujuran memilih level.
         </p>
      </div>

      {/* --- IMPORTANT DISCLAIMER (MD3 Surface Container High) --- */}
      <div className="container mx-auto px-4 mb-12">
         <div className="bg-yellow-500 text-black rounded-[2rem] p-8 relative overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
               <div className="bg-black/10 p-4 rounded-full shrink-0">
                  <Scale className="w-8 h-8" />
               </div>
               <div className="text-center md:text-left">
                  <h3 className="text-2xl font-black font-headline uppercase mb-2">Rule #1: Open Gender</h3>
                  <p className="font-medium text-lg leading-relaxed opacity-90">
                     Turnamen ini menggunakan standar <strong>Ganda Putra Umum</strong> tanpa <em>Voor</em>. 
                     Peserta Putri wajib mengukur kemampuan saat melawan Putra.
                  </p>
               </div>
            </div>
            {/* Pattern */}
            <Swords className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10 rotate-12" />
         </div>
      </div>

      {/* --- LEVEL CARDS (Bento Grid) --- */}
      <div className="container mx-auto px-4 mb-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* BEGINNER CARD */}
            <LevelCard 
               theme="green"
               title="Beginner"
               subtitle="Fun & Social"
               icon={<Dumbbell className="w-6 h-6" />}
               desc="Untuk pemain hobi 'tepok bulu'. Belum menguasai teknik dasar sempurna."
               stats={[
                  { label: "Power", val: 30 },
                  { label: "Technique", val: 20 },
                  { label: "Footwork", val: 10 },
               ]}
               checklist={[
                  "Lob sering tanggung / tidak sampai baseline",
                  "Backhand lemah (sering mati sendiri)",
                  "Belum paham rotasi ganda",
                  "Servis sering nyangkut"
               ]}
            />

            {/* INTERMEDIATE CARD (Highlighted) */}
            <LevelCard 
               theme="blue"
               title="Intermediate"
               subtitle="Competitive Zone"
               icon={<Swords className="w-6 h-6" />}
               desc="Pemain rutin komunitas. Teknik dasar solid, paham rotasi, power cukup."
               recommended
               stats={[
                  { label: "Power", val: 70 },
                  { label: "Technique", val: 65 },
                  { label: "Footwork", val: 60 },
               ]}
               checklist={[
                  "Lob & Clear konsisten baseline-to-baseline",
                  "Bisa Smash & Drive dengan power",
                  "Defense bisa mengembalikan smash",
                  "Rotasi lancar (Depan-Belakang)"
               ]}
            />

            {/* ADVANCE CARD */}
            <LevelCard 
               theme="red"
               title="Advance"
               subtitle="Kompetitif"
               icon={<Trophy className="w-6 h-6" />}
               desc="Pemain dengan teknik matang & pengalaman turnamen. Memiliki pukulan mematikan dan footwork yang efisien."
               stats={[
                  { label: "Power", val: 90 },
                  { label: "Technique", val: 85 },
                  { label: "Footwork", val: 85 },
               ]}
               checklist={[
                  "Akurasi & penempatan bola sangat baik",
                  "Backhand clear & drop shot konsisten",
                  "Penguasaan tempo & strategi permainan",
                  "Sering juara di level komunitas/lokal"
               ]}
            />
         </div>
      </div>

      {/* --- MATRIX & FAQ SECTION --- */}
      <div className="container mx-auto px-4">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Pairing Matrix */}
            <div className="bg-surface-variant/30 border border-white/5 rounded-[2.5rem] p-8">
               <h3 className="text-2xl font-black font-headline uppercase mb-6 flex items-center gap-2">
                  <div className="w-3 h-8 bg-primary rounded-full" />
                  Pairing Matrix
               </h3>
               
               <div className="space-y-3">
                  <PairRow p1="Beginner" p2="Beginner" res="Beginner" valid />
                  <PairRow p1="Beginner" p2="Intermediate" res="Intermediate" valid note="Naik Kelas" />
                  <PairRow p1="Intermediate" p2="Intermediate" res="Intermediate" valid />
                  <PairRow p1="Intermediate" p2="Advance" res="Advance" valid note="Naik Kelas" />
                  <PairRow p1="Advance" p2="Advance" res="Advance" valid />
                  <PairRow p1="Beginner" p2="Advance" res="DILARANG" valid={false} note="Gap Skill Jauh" />
               </div>
            </div>

            {/* Anti-Sandbagging & FAQ */}
            <div className="space-y-6">
               {/* Warning Box */}
               <div className="bg-red-950/20 border border-red-900/50 rounded-[2rem] p-6 text-red-200">
                  <div className="flex items-center gap-3 mb-2 text-red-500">
                     <ShieldAlert className="w-6 h-6" />
                     <h4 className="font-bold uppercase tracking-wider">TPF Protocol</h4>
                  </div>
                  <p className="text-sm leading-relaxed opacity-80">
                     Panitia memiliki database rekam jejak pemain. 
                     Ketidaksesuaian level (Sandbagging) saat pertandingan akan dikenakan sanksi 
                     <span className="text-white font-black"> DISKUALIFIKASI TANPA REFUND</span>.
                  </p>
               </div>

               {/* Checklist Accordion */}
               <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b-white/10">
                     <AccordionTrigger className="font-bold text-lg hover:no-underline">
                        🛡️ Self-Check: Apakah saya Beginner?
                     </AccordionTrigger>
                     <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                        Jika Anda menjawab <strong>YA</strong> untuk salah satu poin ini, Anda <strong>BUKAN</strong> Beginner:
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                           <li>Bisa Backhand Clear dari baseline ke baseline?</li>
                           <li>Pernah juara turnamen Open/Semi-Open?</li>
                           <li>Paham rotasi otomatis saat menyerang/bertahan?</li>
                           <li>Pernah latihan intensif di PB {'>'} 2 tahun?</li>
                        </ul>
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
            </div>

         </div>
      </div>

    </div>
  );
}

// --- SUB COMPONENTS ---

function LevelCard({ theme, title, subtitle, icon, desc, stats, checklist, recommended }: any) {
   const themes = {
      green: { bg: "bg-emerald-500", text: "text-emerald-500", border: "border-emerald-500/20", light: "bg-emerald-500/10" },
      blue: { bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500/20", light: "bg-blue-500/10" },
      red: { bg: "bg-primary", text: "text-primary", border: "border-primary/20", light: "bg-primary/10" },
   };
   
   const t = themes[theme as keyof typeof themes];

   return (
      <Card className={cn(
         "relative overflow-hidden border-2 rounded-[2.5rem] flex flex-col h-full transition-all duration-300 hover:-translate-y-2",
         t.border,
         recommended ? "shadow-2xl ring-2 ring-primary shadow-primary/20 scale-[1.02]" : "shadow-lg bg-surface-variant/20"
      )}>
         {recommended && (
            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-bl-2xl uppercase tracking-widest">
               Most Popular
            </div>
         )}

         <div className="p-8">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg", t.bg)}>
               {icon}
            </div>
            <h3 className={cn("text-4xl font-black font-headline uppercase leading-none mb-1", t.text)}>{title}</h3>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{subtitle}</p>
            <p className="mt-4 text-foreground/80 font-medium leading-relaxed min-h-[3rem]">{desc}</p>
         </div>

         {/* Stats Bar */}
         <div className="px-8 pb-6 space-y-3">
            {stats.map((s: any, i: number) => (
               <div key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                  <span className="w-20 text-muted-foreground">{s.label}</span>
                  <div className="flex-1 h-2 bg-secondary/20 rounded-full overflow-hidden">
                     <div className={cn("h-full rounded-full", t.bg)} style={{ width: `${s.val}%` }} />
                  </div>
               </div>
            ))}
         </div>

         {/* Checklist */}
         <div className="mt-auto bg-black/20 p-8 border-t border-white/5">
            <ul className="space-y-3">
               {checklist.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium opacity-80">
                     <CheckCircle2 className={cn("w-4 h-4 mt-0.5 shrink-0", t.text)} />
                     {item}
                  </li>
               ))}
            </ul>
         </div>
      </Card>
   )
}

function PairRow({ p1, p2, res, valid, note }: any) {
   return (
      <div className={cn(
         "flex items-center justify-between p-4 rounded-2xl border transition-all hover:scale-[1.01]",
         valid ? "bg-background border-white/5 hover:border-primary/20" : "bg-red-950/10 border-red-900/30"
      )}>
         <div className="flex items-center gap-2 text-sm font-bold">
            <Badge variant="outline" className="bg-transparent">{p1}</Badge>
            <span className="text-muted-foreground">+</span>
            <Badge variant="outline" className="bg-transparent">{p2}</Badge>
         </div>
         <div className="text-right">
            {valid ? (
               <Badge className="bg-white text-black hover:bg-zinc-200">Kategori {res}</Badge>
            ) : (
               <Badge variant="destructive">DILARANG</Badge>
            )}
            {note && <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase">{note}</p>}
         </div>
      </div>
   )
}
