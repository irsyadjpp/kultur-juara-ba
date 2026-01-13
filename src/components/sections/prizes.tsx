
"use client";

import { Trophy, Star } from "lucide-react";

const prizes = [
  { cat: "Beginner", pool: "5 JUTA", color: "text-green-500", bg: "bg-green-500/10" },
];

export function PrizesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-full mb-6">
                <Trophy className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-headline uppercase mb-4">
                Total Prize Pool Rp 5 Juta
            </h2>
            <p className="text-xl text-muted-foreground font-medium">
                Total Hadiah Uang Tunai + Throphy + Merchandise untuk Kategori Beginner.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-md mx-auto">
            {prizes.map((p, i) => (
                <div key={i} className="bg-secondary rounded-[2.5rem] p-8 text-center hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-primary/20">
                    <div className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full ${p.bg} ${p.color} font-bold text-sm uppercase tracking-widest mb-6`}>
                        {p.cat} Class
                    </div>
                    <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-2">Total Pool</p>
                    <h3 className={`text-4xl lg:text-5xl font-black font-headline ${p.color}`}>
                        <span className="text-2xl align-top opacity-50 mr-1">Rp</span>
                        {p.pool}
                    </h3>
                    <div className="mt-6 flex justify-center gap-1">
                        {[1,2,3].map(x => (
                            <Star key={x} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Juara 1, 2, & 3 Bersama</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
