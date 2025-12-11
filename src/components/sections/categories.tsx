
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Users, AlertTriangle, Info, ArrowRight, Swords } from "lucide-react";
import { cn } from "@/lib/utils";

const matrix = [
  { p1: "Beginner", p2: "Beginner", res: "Beginner", status: "allowed", color: "bg-green-500" },
  { p1: "Beginner", p2: "Intermediate", res: "Intermediate", status: "allowed", color: "bg-blue-500" },
  { p1: "Intermediate", p2: "Intermediate", res: "Intermediate", status: "allowed", color: "bg-blue-500" },
  { p1: "Intermediate", p2: "Advance", res: "Advance", status: "allowed", color: "bg-purple-500" },
  { p1: "Advance", p2: "Advance", res: "Advance", status: "allowed", color: "bg-purple-500" },
  { p1: "Beginner", p2: "Advance", res: "Banned", status: "banned", color: "bg-red-500" },
];

export function CategoriesSection() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-5 pointer-events-none border-x border-dashed border-foreground/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
                <Badge variant="outline" className="mb-4 text-primary border-primary/30">Fair Play Protocol</Badge>
                <h2 className="text-5xl md:text-6xl font-black font-headline uppercase tracking-tighter mb-6">
                    Class <span className="text-primary">Rules</span>
                </h2>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                    Sistem <strong>"Highest Rank"</strong> berlaku. Level tertinggi dalam pasangan menentukan nasib kategori akhir tim Anda.
                </p>
            </div>
             <div className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 p-6 rounded-[2rem] border border-yellow-500/20 max-w-md w-full backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2 font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-5 h-5" /> Standard Rule
                </div>
                <p className="text-sm font-medium opacity-90">
                    Acuan level adalah <strong>Ganda Putra Umum</strong>. Wanita diperbolehkan join (GD/XD) namun wajib mengikuti standar pace & power Ganda Putra.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* LEFT COLUMN: MATRIX LIST */}
            <div className="xl:col-span-7 space-y-4">
                <h3 className="text-lg font-bold font-headline uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-3">
                    <div className="w-8 h-1 bg-primary rounded-full" /> Pairing Matrix
                </h3>
                {matrix.map((item, idx) => (
                    <div key={idx} className={cn(
                        "group flex flex-col sm:flex-row items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all duration-300 hover:scale-[1.01]",
                        item.status === 'banned' ? "border-red-500/20 bg-red-500/5 hover:border-red-500/40" : "bg-card border-border/50 hover:border-primary/30 hover:shadow-lg"
                    )}>
                        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
                            <Badge variant="outline" className="h-10 px-4 rounded-xl text-sm font-bold bg-background/50 border-foreground/20">{item.p1}</Badge>
                            <Swords className="w-4 h-4 text-muted-foreground/50" />
                            <Badge variant="outline" className="h-10 px-4 rounded-xl text-sm font-bold bg-background/50 border-foreground/20">{item.p2}</Badge>
                        </div>
                        
                        <div className="hidden sm:flex flex-1 h-px bg-foreground/10 mx-6 border-t border-dashed" />
                        
                        <div className="mt-3 sm:mt-0 w-full sm:w-auto text-center">
                             {item.status === 'allowed' ? (
                                <Badge className={cn("h-9 px-6 rounded-lg text-white border-none text-sm font-bold shadow-md", item.color)}>
                                    Masuk {item.res}
                                </Badge>
                             ) : (
                                <Badge variant="destructive" className="h-9 px-6 rounded-lg text-sm font-bold shadow-md">
                                    <X className="w-3 h-3 mr-2" /> DILARANG
                                </Badge>
                             )}
                        </div>
                    </div>
                ))}

                <div className="mt-8 p-6 rounded-[2rem] bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-full text-blue-600 dark:text-blue-400">
                            <Info className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-foreground mb-2">Advisory: Womens Doubles (WD)</h4>
                            <p className="text-muted-foreground leading-relaxed">
                                Sangat disarankan bagi pasangan WD untuk tidak mendaftar di kategori open gender ini, kecuali memiliki jam terbang tinggi melawan Ganda Putra (MD). Resiko cedera & ketimpangan power menjadi tanggung jawab peserta.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: SIMULATION CARDS */}
            <div className="xl:col-span-5 flex flex-col gap-6">
                 <div className="bg-zinc-900 text-zinc-100 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[60px]" />
                     
                     <div className="flex items-center gap-4 mb-8 relative z-10">
                        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black font-headline uppercase leading-none">Battle<br/><span className="text-primary">Sim</span></h3>
                        </div>
                     </div>
                     
                     <div className="space-y-4 relative z-10">
                        {/* KASUS A */}
                        <Card className="bg-white/5 border-white/10 text-zinc-300">
                            <CardContent className="p-5">
                                <div className="flex justify-between items-start mb-3 border-b border-white/10 pb-3">
                                    <span className="font-bold text-white text-sm uppercase tracking-wider">Scenario A</span>
                                    <Badge variant="outline" className="text-xs border-primary text-primary">Balanced</Badge>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Team 1</span>
                                        <span className="font-bold text-white">XD (Int + Int)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Team 2</span>
                                        <span className="font-bold text-white">MD (Int + Beg)</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-white/10 text-xs italic text-zinc-400">
                                    "Wanita level Intermediate (Int) dengan defense kuat mampu mengimbangi Pria Beginner. Pertandingan diprediksi seru."
                                </div>
                            </CardContent>
                        </Card>

                        {/* KASUS B */}
                        <Card className="bg-white/5 border-white/10 text-zinc-300">
                            <CardContent className="p-5">
                                <div className="flex justify-between items-start mb-3 border-b border-white/10 pb-3">
                                    <span className="font-bold text-white text-sm uppercase tracking-wider">Scenario B</span>
                                    <Badge variant="destructive" className="text-xs">Risky</Badge>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Team 1</span>
                                        <span className="font-bold text-white">WD (Beg + Beg)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Team 2</span>
                                        <span className="font-bold text-white">XD (Beg + Beg)</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-white/10 text-xs italic text-zinc-400">
                                    "Faktor tenaga pria (Power) akan sangat dominan. Tim 2 memiliki advantage fisik signifikan."
                                </div>
                            </CardContent>
                        </Card>
                     </div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
}
