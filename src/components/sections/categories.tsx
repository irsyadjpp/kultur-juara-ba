
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Check, AlertTriangle, Info, Swords, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Matrix Data (Rangkuman Simple)
const simpleMatrix = [
  { p1: "Beginner", p2: "Beginner", res: "Beginner", tier: "Tier Bawah - Atas", status: "allowed", color: "bg-green-500" },
  { p1: "Beginner", p2: "Intermediate", res: "Intermediate", tier: "Tier Menengah", status: "allowed", color: "bg-blue-500", note: "Naik Level" },
  { p1: "Intermediate", p2: "Intermediate", res: "Intermediate", tier: "Tier Bawah - Atas", status: "allowed", color: "bg-blue-500" },
  { p1: "Intermediate", p2: "Advance", res: "Advance", tier: "Tier Menengah", status: "allowed", color: "bg-purple-500", note: "Naik Level" },
  { p1: "Advance", p2: "Advance", res: "Advance", tier: "Tier Atas (Seed)", status: "allowed", color: "bg-purple-500" },
  { p1: "Beginner", p2: "Advance", res: "DILARANG", tier: "-", status: "banned", color: "bg-red-500" },
];

export function CategoriesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-5 pointer-events-none border-x border-dashed border-foreground/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
                <Badge variant="outline" className="mb-4 text-primary border-primary/30">New Rule 2026</Badge>
                <h2 className="text-5xl md:text-6xl font-black font-headline uppercase tracking-tighter mb-4">
                    Matrix <span className="text-primary">Kategori</span>
                </h2>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                    Sistem <strong>Level + Tier</strong>. Level tertinggi menentukan kategori, Tier menentukan status unggulan (Seeding).
                </p>
            </div>
             <div className="bg-surface-variant/50 p-6 rounded-[2rem] border border-white/10 max-w-md w-full backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2 font-bold uppercase tracking-wider text-sm">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" /> Core Principle
                </div>
                <p className="text-sm font-medium opacity-90 leading-relaxed">
                    "Kategori pasangan ditentukan berdasarkan <strong>pemain dengan level tertinggi</strong>. Tier digunakan untuk penyeimbangan grup (fairness)."
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: SIMPLE MATRIX LIST */}
            <div className="xl:col-span-7 space-y-4">
                {simpleMatrix.map((item, idx) => (
                    <div key={idx} className={cn(
                        "group flex flex-col sm:flex-row items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all duration-300 hover:scale-[1.01]",
                        item.status === 'banned' ? "border-red-500/20 bg-red-500/5 hover:border-red-500/40" : "bg-card border-border/50 hover:border-primary/30 hover:shadow-lg"
                    )}>
                        {/* Players */}
                        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
                            <Badge variant="outline" className="h-10 px-4 rounded-xl text-sm font-bold bg-background/50">{item.p1}</Badge>
                            <Swords className="w-4 h-4 text-muted-foreground/50" />
                            <Badge variant="outline" className="h-10 px-4 rounded-xl text-sm font-bold bg-background/50">{item.p2}</Badge>
                        </div>
                        
                        {/* Arrow Divider */}
                        <div className="hidden sm:flex flex-1 h-px bg-foreground/10 mx-6 border-t border-dashed" />
                        
                        {/* Result */}
                        <div className="mt-3 sm:mt-0 w-full sm:w-auto text-center flex flex-col items-end gap-1">
                             {item.status === 'allowed' ? (
                                <>
                                    <div className="flex items-center gap-2">
                                        {item.note && <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{item.note}</span>}
                                        <Badge className={cn("h-9 px-6 rounded-lg text-white border-none text-sm font-bold shadow-md", item.color)}>
                                            {item.res}
                                        </Badge>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-medium pr-1">{item.tier}</span>
                                </>
                             ) : (
                                <Badge variant="destructive" className="h-9 px-6 rounded-lg text-sm font-bold shadow-md w-full justify-center">
                                    <X className="w-4 h-4 mr-2" /> DILARANG
                                </Badge>
                             )}
                        </div>
                    </div>
                ))}

                <div className="mt-6 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-center">
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        Ingin tahu detail perhitungan Tier Bawah/Menengah/Atas? 
                        <a href="/leveling-guide" className="font-bold underline ml-1 hover:text-blue-500">Lihat Panduan Lengkap</a>
                    </p>
                </div>
            </div>

            {/* RIGHT COLUMN: VISUAL EXPLANATION */}
            <div className="xl:col-span-5 flex flex-col gap-6">
                 <Card className="bg-zinc-900 text-zinc-100 border-none rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden h-full">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
                     <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px]" />
                     
                     <div className="relative z-10 flex flex-col h-full">
                        <div className="mb-8">
                            <h3 className="text-3xl font-black font-headline uppercase leading-none mb-2">
                                Why <span className="text-primary">Tiering?</span>
                            </h3>
                            <p className="text-zinc-400 text-lg">
                                Agar kompetisi tetap imbang dan seeding valid.
                            </p>
                        </div>

                        <div className="space-y-6 flex-grow">
                            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex justify-between mb-2">
                                    <span className="font-bold text-white">1. Group Balance</span>
                                    <Check className="w-5 h-5 text-green-500" />
                                </div>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    Menghindari "Grup Neraka". Pasangan Tier Atas akan dipisah (seeded) agar tidak bertemu di fase grup awal.
                                </p>
                            </div>

                            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex justify-between mb-2">
                                    <span className="font-bold text-white">2. No Mismatch</span>
                                    <Check className="w-5 h-5 text-green-500" />
                                </div>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    Kombinasi <strong className="text-red-400">Beginner + Advance</strong> tetap dilarang mutlak karena gap skill terlalu jauh, berisiko cedera & tidak fun.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                                <span>Logic Version</span>
                                <span>v2.0 (Tier-Based)</span>
                            </div>
                        </div>
                     </div>
                 </Card>
            </div>
        </div>
      </div>
    </section>
  );
}
