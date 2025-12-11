
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Users, Network, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DrawingMechanismPage() {

  const BracketExample = ({ pairs, title }: { pairs: { p1: string, p2: string }[], title: string }) => (
    <div className="bg-background/50 p-4 rounded-xl border">
      <h4 className="font-bold text-center mb-4 text-sm text-muted-foreground uppercase tracking-widest">{title}</h4>
      <div className="space-y-2">
        {pairs.map((pair, index) => (
          <div key={index} className="flex items-center justify-between text-xs bg-secondary/30 p-2 rounded-md font-mono">
            <span>{pair.p1}</span>
            <span className="font-bold text-primary">VS</span>
            <span>{pair.p2}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24">
        
        <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary text-primary font-bold tracking-widest uppercase">
                Official Rulebook
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter mb-6">
                Mekanisme <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">Drawing</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                Sistem pembagian pool dan penempatan tim di babak gugur untuk menjamin keadilan.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* KOLOM KIRI */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="bg-primary/10 text-primary p-3 rounded-xl"><Network className="w-5 h-5"/></div>
                    <span>Beginner – Babak 16 Besar</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div>
                    <p className="font-bold text-foreground">Peserta Lolos:</p>
                    <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1 mt-2">
                        <li>8 Juara Grup (A - H)</li>
                        <li>8 Runner-up Grup (A - H)</li>
                    </ul>
                  </div>
                  <BracketExample
                    title="Contoh Bracket 16 Besar" 
                    pairs={[
                        { p1: "Juara A", p2: "Runner-up B" },
                        { p1: "Juara D", p2: "Runner-up C" },
                        { p1: "Juara E", p2: "Runner-up F" },
                        { p1: "Juara H", p2: "Runner-up G" },
                    ]}
                  />
                  <p className="text-xs text-muted-foreground pt-2 border-t">
                    <strong>Aturan Utama:</strong> Juara grup tidak akan bertemu dengan runner-up dari grup yang sama di babak pertama. Tim juara dari paruh atas (A-D) dan bawah (E-H) dipisahkan untuk potensi bertemu di final.
                  </p>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="bg-primary/10 text-primary p-3 rounded-xl"><Network className="w-5 h-5"/></div>
                    <span>Intermediate & Advance – 8 Besar</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                   <div>
                    <p className="font-bold text-foreground">Peserta Lolos:</p>
                    <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1 mt-2">
                        <li>4 Juara Grup (A - D)</li>
                        <li>4 Runner-up Grup (A - D)</li>
                    </ul>
                  </div>
                  <BracketExample
                    title="Contoh Bracket 8 Besar" 
                    pairs={[
                        { p1: "Juara A", p2: "Runner-up B" },
                        { p1: "Juara C", p2: "Runner-up D" },
                        { p1: "Juara B", p2: "Runner-up A" },
                        { p1: "Juara D", p2: "Runner-up C" },
                    ]}
                  />
                   <p className="text-xs text-muted-foreground pt-2 border-t">
                    <strong>Semifinal Atas:</strong> Pemenang (Juara A/RU B) vs Pemenang (Juara C/RU D).
                  </p>
              </CardContent>
            </Card>
          </div>

          {/* KOLOM KANAN */}
          <div className="space-y-8">
             <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
                    <ShieldAlert className="w-5 h-5"/> Aturan Anti-Clash
                </CardTitle>
                 <CardDescription className="pt-2">Mencegah pertemuan dini antar tim dari klub yang sama di babak gugur.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-blue-800 dark:text-blue-200">
                  <div className="space-y-2">
                    <h4 className="font-semibold">1. Prioritas Penempatan</h4>
                    <p className="text-sm opacity-80">
                        Jika ada 2 tim atau lebih dari klub yang sama lolos ke babak gugur, sistem akan memprioritaskan untuk menempatkan mereka di <strong>paruh bracket yang berbeda (Top Half & Bottom Half)</strong>.
                    </p>
                  </div>
                   <div className="space-y-2">
                    <h4 className="font-semibold">2. Kondisi Pengecualian</h4>
                    <p className="text-sm opacity-80">
                        Aturan ini mungkin tidak berlaku jika jumlah tim dari satu klub terlalu banyak, sehingga penempatan terpisah tidak memungkinkan secara matematis tanpa melanggar aturan lain (misal: juara vs runner-up grup).
                    </p>
                  </div>
              </CardContent>
            </Card>

            <div className="text-center">
                <Button variant="outline" asChild>
                    <Link href="/live-score">Lihat Bagan Pertandingan Penuh</Link>
                </Button>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
