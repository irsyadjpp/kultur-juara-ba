'use client';

import { useState } from 'react';
import { Trophy, Swords, Dumbbell, ShieldAlert, CheckCircle2, XCircle, ChevronDown, Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CourtLines } from '@/components/ui/court-lines';
import { cn } from "@/lib/utils";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function LevelingGuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 relative overflow-hidden">
        
        {/* Background FX */}
        <div className="fixed inset-0 pointer-events-none opacity-5"><CourtLines /></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        {/* --- HERO SECTION --- */}
        <div className="container mx-auto px-4 mb-16 relative z-10 text-center">
           <Badge variant="outline" className="mb-4 px-4 py-1 border-primary text-primary font-bold tracking-widest uppercase bg-primary/5">Official Guide</Badge>
           <h1 className="text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter mb-6">
              Level & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">Tier Matrix</span>
           </h1>
           <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Panduan lengkap klasifikasi skill dan aturan kombinasi pasangan Road to BCC 2026.
           </p>
        </div>

        {/* --- 1. DEFINISI LEVEL (Cards) --- */}
        <div className="container mx-auto px-4 mb-20">
           <h2 className="text-3xl font-black font-headline mb-8 text-center uppercase">Definisi Level</h2>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <LevelCard 
                 theme="green" title="Beginner" subtitle="Fun & Social" icon={<Dumbbell className="w-6 h-6" />}
                 desc="Pemain hobi 'tepok bulu'. Teknik belum sempurna, backhand lemah, belum paham rotasi."
                 stats={[{l:"Power",v:30}, {l:"Tech",v:20}, {l:"Footwork",v:10}]}
              />
              <LevelCard 
                 theme="blue" title="Intermediate" subtitle="Competitive" icon={<Swords className="w-6 h-6" />}
                 desc="Pemain rutin komunitas. Teknik solid, bisa smash/drive, paham rotasi ganda."
                 recommended
                 stats={[{l:"Power",v:70}, {l:"Tech",v:65}, {l:"Footwork",v:60}]}
              />
              <LevelCard 
                 theme="red" title="Advance" subtitle="Elite / Semi-Pro" icon={<Trophy className="w-6 h-6" />}
                 desc="Skill di atas rata-rata. Power besar, akurasi tinggi, variasi pukulan mematikan."
                 stats={[{l:"Power",v:95}, {l:"Tech",v:90}, {l:"Footwork",v:90}]}
              />
           </div>
        </div>

        {/* --- 2. DETAILED TIER MATRIX (New Section) --- */}
        <div className="container mx-auto px-4 mb-20">
           <div className="bg-secondary/30 border border-white/5 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-blue-500 to-primary" />
              
              <div className="text-center mb-12">
                 <h2 className="text-4xl md:text-5xl font-black font-headline uppercase mb-4">Matrix Penentuan Kategori</h2>
                 <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                    Detail penentuan kategori berdasarkan kombinasi <strong>Level + Tier (Bawah/Menengah/Atas)</strong>.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 
                 {/* BEGINNER COMBOS */}
                 <MatrixCard title="Beginner + Beginner" color="green">
                    <ComboRow p1="Bawah" p2="Bawah" res="Beginner" />
                    <ComboRow p1="Bawah" p2="Menengah" res="Beginner" />
                    <ComboRow p1="Menengah" p2="Menengah" res="Beginner" note="Tier Menengah" />
                    <ComboRow p1="Menengah" p2="Atas" res="Beginner" note="Tier Atas" />
                    <ComboRow p1="Atas" p2="Atas" res="Beginner" note="SEED CANDIDATE" highlight />
                 </MatrixCard>

                 {/* BEGINNER + INTERMEDIATE */}
                 <MatrixCard title="Beginner + Intermediate" color="blue">
                    <ComboRow p1="Beg (All)" p2="Int (Bawah)" res="Intermediate" note="Tier Bawah" />
                    <ComboRow p1="Beg (Atas)" p2="Int (Bawah)" res="Intermediate" note="Tier Menengah" />
                    <ComboRow p1="Beg (Menengah)" p2="Int (Men/Atas)" res="Intermediate" note="Tier Men/Atas" />
                    <ComboRow p1="Beg (Atas)" p2="Int (Atas)" res="Intermediate" note="TIER KUAT" highlight />
                 </MatrixCard>

                 {/* INTERMEDIATE + INTERMEDIATE */}
                 <MatrixCard title="Inter + Intermediate" color="blue">
                    <ComboRow p1="Bawah" p2="Bawah" res="Intermediate" note="Tier Bawah" />
                    <ComboRow p1="Bawah" p2="Menengah" res="Intermediate" note="Tier Menengah" />
                    <ComboRow p1="Menengah" p2="Atas" res="Intermediate" note="Tier Men/Atas" />
                    <ComboRow p1="Atas" p2="Atas" res="Intermediate" note="SEED CANDIDATE" highlight />
                 </MatrixCard>

                 {/* INTERMEDIATE + ADVANCE */}
                 <MatrixCard title="Inter + Advance" color="purple">
                    <ComboRow p1="Int (Bawah)" p2="Adv (Bawah)" res="Advance" note="Tier Bawah" />
                    <ComboRow p1="Int (Menengah)" p2="Adv (Bawah)" res="Advance" note="Tier Menengah" />
                    <ComboRow p1="Int (Bawah)" p2="Adv (Men/Atas)" res="Advance" note="Tier Men/Atas" />
                    <ComboRow p1="Int (Menengah)" p2="Adv (Menengah)" res="Advance" note="TIER KUAT" highlight />
                    <ComboRow p1="Int (All)" p2="Adv (Atas)" res="Advance" note="SEED CANDIDATE" highlight />
                 </MatrixCard>

                 {/* ADVANCE + ADVANCE */}
                 <MatrixCard title="Advance + Advance" color="purple">
                    <ComboRow p1="Bawah" p2="Bawah" res="Advance" note="Tier Bawah" />
                    <ComboRow p1="Menengah" p2="Menengah" res="Advance" note="Tier Menengah" />
                    <ComboRow p1="Atas" p2="Atas" res="Advance" note="SEED CANDIDATE" highlight />
                 </MatrixCard>

                 {/* FORBIDDEN */}
                 <Card className="bg-red-950/20 border-2 border-red-900/50 p-6 flex flex-col justify-center items-center text-center">
                    <div className="bg-red-500/20 p-4 rounded-full mb-4">
                       <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h4 className="font-black text-xl text-red-500 uppercase mb-2">DILARANG KERAS</h4>
                    <p className="font-bold text-foreground mb-2">Beginner + Advance</p>
                    <p className="text-sm text-red-300 leading-snug">
                       Gap skill terlalu jauh. Berisiko cedera dan tidak kompetitif.
                    </p>
                 </Card>

              </div>
           </div>
        </div>

        {/* --- 3. ANTI SANDBAGGING (Checklist) --- */}
        <div className="container mx-auto px-4">
           <div className="bg-zinc-900 text-zinc-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-white/5">
              <div className="flex flex-col md:flex-row gap-8">
                 <div className="md:w-1/3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-widest mb-4">
                       <ShieldAlert className="w-4 h-4" /> Integrity Check
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black font-headline uppercase mb-4">Anti-Sandbagging</h3>
                    <p className="text-zinc-400 leading-relaxed">
                       Jawab jujur. Jika Anda menjawab <strong>YA</strong> pada salah satu poin ini, Anda <strong className="text-red-400">BUKAN Beginner</strong>.
                    </p>
                 </div>
                 <div className="md:w-2/3 space-y-3">
                    {[
                       "Bisa melakukan Backhand Clear dari baseline ke baseline?",
                       "Pernah juara turnamen Open atau Semi-Open?",
                       "Paham rotasi otomatis saat menyerang (depan-belakang) & bertahan (side-by-side)?",
                       "Pernah latihan intensif di PB/Klub > 2 tahun?"
                    ].map((q, i) => (
                       <div key={i} className="flex gap-4 p-4 bg-black/20 rounded-2xl border border-white/5 items-center hover:bg-black/30 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 font-bold text-zinc-500">?</div>
                          <p className="font-medium text-zinc-200">{q}</p>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}

// --- SUB COMPONENTS ---

function LevelCard({ theme, title, subtitle, icon, desc, stats, recommended }: any) {
   const themes = {
      green: { bg: "bg-emerald-500", text: "text-emerald-500", border: "border-emerald-500/20" },
      blue: { bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500/20" },
      red: { bg: "bg-primary", text: "text-primary", border: "border-primary/20" },
   };
   const t = themes[theme as keyof typeof themes];

   return (
      <Card className={cn(
         "relative overflow-hidden border-2 rounded-[2.5rem] flex flex-col h-full transition-all duration-300 hover:-translate-y-2 bg-card",
         t.border,
         recommended ? "ring-4 ring-yellow-500/20 shadow-xl" : "shadow-md"
      )}>
         {recommended && <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">Popular</div>}
         <div className="p-8 pb-4">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg", t.bg)}>{icon}</div>
            <h3 className={cn("text-3xl font-black font-headline uppercase", t.text)}>{title}</h3>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{subtitle}</p>
            <p className="mt-4 text-sm font-medium opacity-80 leading-relaxed min-h-[3rem]">{desc}</p>
         </div>
         <div className="px-8 pb-8 space-y-3 mt-auto">
            {stats.map((s: any, i: number) => (
               <div key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-16 text-muted-foreground">{s.l}</span>
                  <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                     <div className={cn("h-full rounded-full", t.bg)} style={{ width: `${s.v}%` }} />
                  </div>
               </div>
            ))}
         </div>
      </Card>
   )
}

function MatrixCard({ title, color, children }: any) {
    const colors = {
        green: "border-green-500/20 bg-green-500/5",
        blue: "border-blue-500/20 bg-blue-500/5",
        purple: "border-purple-500/20 bg-purple-500/5"
    }
    return (
        <Card className={cn("border-2 rounded-[2rem] overflow-hidden bg-card/80 backdrop-blur-sm", colors[color as keyof typeof colors])}>
            <div className="p-4 border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
                <h4 className="font-bold text-center uppercase tracking-tight text-sm md:text-base">{title}</h4>
            </div>
            <div className="p-4 space-y-1">
                {children}
            </div>
        </Card>
    )
}

function ComboRow({ p1, p2, res, note, highlight }: any) {
    return (
        <div className={cn(
            "flex justify-between items-center text-xs py-2 px-3 rounded-lg transition-colors",
            highlight ? "bg-primary/10 font-bold border border-primary/20" : "hover:bg-black/5 dark:hover:bg-white/5"
        )}>
            <div className="flex items-center gap-1 text-muted-foreground">
                <span>{p1}</span>
                <span className="text-[8px] opacity-50 mx-1">+</span>
                <span>{p2}</span>
            </div>
            <div className="text-right">
                <span className={cn("block", highlight ? "text-primary" : "text-foreground")}>{res}</span>
                {note && <span className="block text-[9px] uppercase tracking-wider font-bold opacity-70 mt-0.5">{note}</span>}
            </div>
        </div>
    )
}
