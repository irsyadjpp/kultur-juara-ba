
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock, ArrowDown, Target, Zap, CalendarClock } from 'lucide-react';
import { CourtLines } from '@/components/ui/court-lines';

const CaseCard = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <Card className="bg-card/80 backdrop-blur-md border-border/50 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-all">
        <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Icon className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl font-bold font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            {children}
        </CardContent>
    </Card>
);

export default function SchedulingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"><CourtLines /></div>
        
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 max-w-4xl mx-auto">
                <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/30 text-primary font-bold tracking-[0.2em] uppercase bg-primary/5 rounded-full">
                    Scheduling Protocol
                </Badge>
                <h1 className="text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter mb-6">
                    Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Management</span>
                </h1>
                <p className="text-xl text-muted-foreground font-medium">
                    Kami mendesain jadwal dengan algoritma prioritas untuk memaksimalkan recovery atlet yang bermain rangkap.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <CaseCard title="Hierarchy Rule: Low Tier First" icon={ArrowDown}>
                    <p>
                        Jika atlet bermain di multiple category, pertandingan level terendah <strong>SELALU</strong> dimainkan lebih dulu.
                    </p>
                    <div className="bg-secondary/30 p-4 rounded-xl border border-white/5 mt-4">
                        <h4 className="font-bold text-foreground mb-2 text-sm uppercase tracking-wider">Simulation: Player A (Beg + Int)</h4>
                        <ol className="list-decimal pl-5 space-y-2 text-sm">
                            <li><span className="text-green-600 font-bold">R32 Beginner</span> (09:00 WIB)</li>
                            <li><span className="text-green-600 font-bold">R16 Beginner</span> (11:00 WIB)</li>
                            <li><span className="text-muted-foreground italic">-- Istirahat --</span></li>
                            <li><span className="text-blue-600 font-bold">R16 Intermediate</span> (14:00 WIB)</li>
                        </ol>
                    </div>
                </CaseCard>

                <CaseCard title="Rest Interval Standards" icon={Clock}>
                    <p>
                        Jeda minimal antar pertandingan untuk menjamin kualitas fisik.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-secondary/30 p-4 rounded-xl text-center">
                            <p className="text-xs uppercase font-bold text-muted-foreground mb-1">Fase Grup</p>
                            <p className="text-2xl font-black text-foreground">1 Match</p>
                            <p className="text-[10px] text-muted-foreground">Jeda Minimal</p>
                        </div>
                        <div className="bg-secondary/30 p-4 rounded-xl text-center">
                            <p className="text-xs uppercase font-bold text-muted-foreground mb-1">Knockout</p>
                            <p className="text-2xl font-black text-foreground">2 Match</p>
                            <p className="text-[10px] text-muted-foreground">Jeda Minimal</p>
                        </div>
                    </div>
                </CaseCard>
            </div>

            <div className="bg-zinc-900 text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10"><CalendarClock className="w-64 h-64" /></div>
                <div className="relative z-10 max-w-2xl">
                    <h3 className="text-3xl font-black font-headline mb-4 flex items-center gap-3">
                        <Target className="w-8 h-8 text-yellow-500" />
                        Our Goal
                    </h3>
                    <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                        "Tidak ada lagi cerita WO karena jadwal bentrok atau kalah karena kehabisan napas akibat main berturut-turut tanpa jeda. We respect your effort."
                    </p>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-zinc-400">
                            <Zap className="w-4 h-4 text-yellow-500" /> Fairness
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-zinc-400">
                            <Zap className="w-4 h-4 text-yellow-500" /> Quality
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-zinc-400">
                            <Zap className="w-4 h-4 text-yellow-500" /> Safety
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
