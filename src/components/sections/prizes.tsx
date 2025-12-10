
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trophy, Ticket, Gift, Sparkles } from "lucide-react";

const prizes = [
  {
    rank: 1,
    title: "Juara 1",
    rewards: ["Rp 500.000", "Golden Ticket BCC 2026", "E-Certificate"],
    color: "border-yellow-500 bg-yellow-500/5",
    iconColor: "text-yellow-500",
  },
  {
    rank: 2,
    title: "Juara 2",
    rewards: ["Rp 300.000", "E-Certificate"],
    color: "border-slate-400 bg-slate-500/5",
    iconColor: "text-slate-400",
  },
  {
    rank: 3,
    title: "Juara 3 Bersama",
    rewards: ["@ Rp 100.000", "E-Certificate"],
    color: "border-orange-700 bg-orange-700/5",
    iconColor: "text-orange-700",
  },
];

export function PrizesSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-4">
            Prize Pool & Rewards
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bukan hanya tentang gengsi, tapi juga apresiasi untuk para juara sejati.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {prizes.map((prize) => (
            <Card key={prize.rank} className={`text-center shadow-lg ${prize.color} border-2 hover:-translate-y-2 transition-transform`}>
              <CardHeader>
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${prize.color.replace('border-', 'bg-')} `}>
                  <Trophy className={`w-8 h-8 ${prize.iconColor}`} />
                </div>
                <CardTitle className={`text-2xl font-bold ${prize.iconColor}`}>{prize.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {prize.rewards.map((reward, i) => (
                  <div key={i} className="flex items-center justify-center gap-2">
                    {reward.includes("Golden Ticket") ? 
                        <Ticket className="w-4 h-4 text-primary" /> : 
                        <Sparkles className="w-4 h-4 text-muted-foreground/50" />
                    }
                    <span className="font-medium">{reward}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center bg-card p-6 rounded-lg border">
            <h3 className="font-bold flex items-center justify-center gap-2"><Gift className="w-5 h-5 text-primary"/> Doorprize Tambahan</h3>
            <p className="text-muted-foreground mt-2 text-sm">
                Seluruh peserta yang hadir berkesempatan memenangkan doorprize menarik dari sponsor.
            </p>
        </div>
      </div>
    </section>
  );
}
