
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trophy, Ticket, Gift, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const prizeCategories = [
  {
    category: "Advance",
    totalPrize: "Rp 7.500.000",
    note: "Untuk Juara 1, 2, & 3 Bersama",
    color: "border-purple-500 bg-purple-500/5",
    iconColor: "text-purple-400",
  },
  {
    category: "Intermediate",
    totalPrize: "Rp 7.500.000",
    note: "Untuk Juara 1, 2, & 3 Bersama",
    color: "border-blue-500 bg-blue-500/5",
    iconColor: "text-blue-400",
  },
  {
    category: "Beginner",
    totalPrize: "Rp 4.000.000",
    note: "Untuk Juara 1, 2, & 3 Bersama",
    color: "border-green-500 bg-green-500/5",
    iconColor: "text-green-400",
  },
];

export function PrizesSection() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4 ring-4 ring-primary/5">
              <Trophy className="w-8 h-8 text-primary"/>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-4">
            Total Hadiah Puluhan Juta!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bukan hanya tentang gengsi, tapi juga apresiasi untuk para juara sejati di setiap level.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {prizeCategories.map((prize) => (
            <Card key={prize.category} className={cn("text-center shadow-lg border-2 hover:-translate-y-2 transition-transform", prize.color)}>
              <CardHeader>
                <div className={cn("mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4", prize.color.replace('border-', 'bg-'))}>
                  <Trophy className={cn("w-8 h-8", prize.iconColor)} />
                </div>
                <CardTitle className={cn("text-2xl font-bold", prize.iconColor)}>{prize.category}</CardTitle>
                <CardDescription>{prize.note}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-background/50 p-4 rounded-lg border">
                  <p className="text-xs text-muted-foreground">Total Prize Pool</p>
                  <p className="text-3xl font-black font-mono text-foreground">{prize.totalPrize}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
      </div>
    </section>
  );
}
