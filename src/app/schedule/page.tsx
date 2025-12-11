
'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Search, Trophy, Users, Award, ListOrdered } from 'lucide-react';
import { CourtLines } from '@/components/ui/court-lines';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';
import { ClientOnly } from '@/components/client-only';

// --- UPDATED MOCK DATA ---
const SCHEDULE_DATA = [
  // Court 1
  { id: 'M101', court: 'Court 1', time: '09:00', round: 'R32', matchOrder: 1, category: 'MD OPEN', pA: 'Kevin S / Marcus G', pB: 'Ahsan / Hendra', status: 'FINISHED', winner: 'A', score: {set1: '21-19', set2: '18-21', set3: '21-15'}, duration: '58m' },
  { id: 'M102', court: 'Court 1', time: '09:45', round: 'QF', matchOrder: 2, category: 'MS PRO', pA: 'Anthony Ginting', pB: 'Jonatan Christie', status: 'LIVE', winner: null, score: {set1: '19-21', set2: '15-12'}, duration: null },
  { id: 'M103', court: 'Court 1', time: '10:30', round: 'SF', matchOrder: 3, category: 'WD OPEN', pA: 'Apriyani R / Siti Fadia', pB: 'Nami M / Chiharu S', status: 'UPCOMING', winner: null, score: null, duration: null },
  { id: 'M104', court: 'Court 1', time: '11:15', round: 'R16', matchOrder: 4, category: 'XD BEGINNER', pA: 'Budi / Ani', pB: 'Joko / Wati', status: 'UPCOMING', winner: null, score: null, duration: null },

  // Court 2
  { id: 'M201', court: 'Court 2', time: '09:00', round: 'R32', matchOrder: 1, category: 'MD INTERMEDIATE', pA: 'Fajar A / Rian A', pB: 'Leo C / Daniel M', status: 'FINISHED', winner: 'A', score: {set1: '21-18', set2: '22-20'}, duration: '45m' },
  { id: 'M202', court: 'Court 2', time: '09:45', round: 'R16', matchOrder: 2, category: 'WS BEGINNER', pA: 'Susi Susanti KW', pB: 'Mia Audina KW', status: 'FINISHED', winner: 'A', score: {set1: '21-10'}, duration: '25m' },
  { id: 'M203', court: 'Court 2', time: '10:30', round: 'FINAL', matchOrder: 3, category: 'MS ADVANCE', pA: 'Taufik Hidayat', pB: 'Lee Chong Wei', status: 'LIVE', winner: null, score: {set1: '20-22', set2: '5-1'}, duration: null },
  { id: 'M204', court: 'Court 2', time: '11:15', round: 'R32', matchOrder: 4, category: 'MD BEGINNER', pA: 'Tim A', pB: 'Tim B', status: 'UPCOMING', winner: null, score: null, duration: null },

  // Court 3
  { id: 'M301', court: 'Court 3', time: '09:15', round: 'SF', matchOrder: 1, category: 'XD INTERMEDIATE', pA: 'Praveen J / Melati D', pB: 'Rinov R / Pitha H', status: 'FINISHED', winner: 'B', score: {set1: '15-21', set2: '18-21'}, duration: '48m' },
  { id: 'M302', court: 'Court 3', time: '10:00', round: 'R16', matchOrder: 2, category: 'MD BEGINNER', pA: 'Tim C', pB: 'Tim D', status: 'LIVE', winner: null, score: {set1: '10-5'}, duration: null },
  { id: 'M303', court: 'Court 3', time: '10:45', round: 'QF', matchOrder: 3, category: 'WS ADVANCE', pA: 'Gregoria M', pB: 'Putri KW', status: 'UPCOMING', winner: null, score: null, duration: null },

  // Court 4
  { id: 'M401', court: 'Court 4', time: '09:15', round: 'R64', matchOrder: 1, category: 'MS BEGINNER', pA: 'Udin', pB: 'Asep', status: 'FINISHED', winner: 'A', score: {set1: '21-5'}, duration: '18m' },
  { id: 'M402', court: 'Court 4', time: '10:00', round: 'R32', matchOrder: 2, category: 'WD INTERMEDIATE', pA: 'Pasangan X', pB: 'Pasangan Y', status: 'UPCOMING', winner: null, score: null, duration: null },
];


const PODIUM_DATA = {
  "MD OPEN": [
    { rank: 1, name: "Kevin S / Marcus G", team: "PB Jaya Raya" },
    { rank: 2, name: "Ahsan / Hendra", team: "PB Djarum" },
    { rank: 3, name: "Fajar A / Rian A", team: "SGS PLN" },
  ],
  "MS PRO": [
    { rank: 1, name: "Jonatan Christie", team: "PB Tangkas" },
    { rank: 2, name: "Anthony Ginting", team: "SGS PLN" },
    { rank: 3, name: "Chico Aura", team: "PB Exist" },
  ]
};

const COURTS = ['Court 1', 'Court 2', 'Court 3', 'Court 4'];

const ScheduleView = ({ searchTerm }: { searchTerm: string }) => {
  const filteredSchedule = useMemo(() => {
    if (!searchTerm) {
      return SCHEDULE_DATA;
    }
    return SCHEDULE_DATA.filter(match =>
      match.pA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.pB.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'LIVE': return 'bg-red-900/30 border-red-500/30';
      case 'FINISHED': return 'bg-zinc-800/50 border-zinc-700/50 opacity-70';
      default: return 'bg-zinc-900/50 border-border/10';
    }
  };

  const ScoreDisplay = ({ score, status, winner }: { score: any, status: string, winner: string | null }) => {
    const sets = Object.values(score || {}) as string[];
    const isFinished = status === 'FINISHED';

    const renderSetScores = (setScore: string, setIndex: number) => {
      const [sA, sB] = setScore.split('-').map(Number);
      const isLiveSet = !isFinished && setIndex === sets.length - 1;

      let classA = "text-white";
      let classB = "text-white";

      if (isLiveSet) {
        // For live sets, only dim the losing score
        if (sA > sB) classB = "text-zinc-400";
        if (sB > sA) classA = "text-zinc-400";
      } else {
         // For finished sets, always dim the loser
        if (sA > sB) classB = "text-zinc-400";
        else classA = "text-zinc-400";
      }

      return (
        <div key={setIndex} className="flex flex-col items-center">
            <span className={cn("text-2xl font-black font-mono", classA)}>{sA}</span>
            <span className={cn("text-2xl font-black font-mono", classB)}>{sB}</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-center gap-4 bg-black/30 p-2 rounded-lg">
          {sets.map(renderSetScores)}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {COURTS.map(courtName => (
        <div key={courtName} className="space-y-4">
          <h3 className="font-bold text-lg text-center font-headline uppercase tracking-wider text-primary border-b-2 border-primary/20 pb-2">
            {courtName}
          </h3>
          <div className="space-y-4">
            {filteredSchedule.filter(m => m.court === courtName).length > 0 ? (
              filteredSchedule.filter(m => m.court === courtName).map(match => (
                <Card key={match.id} className={cn("p-4 rounded-2xl transition-all shadow-lg", getStatusStyle(match.status))}>
                   <div className="flex justify-between items-start text-xs mb-3">
                        <Badge variant="outline" className="font-mono bg-background/30 text-foreground/70">{match.round} - Match {match.matchOrder}</Badge>
                        {match.status === 'LIVE' && <div className="flex items-center gap-1.5 text-red-500 font-bold animate-pulse"><div className="w-2 h-2 bg-red-500 rounded-full"/>LIVE</div>}
                        {match.status === 'FINISHED' && <div className="flex items-center gap-1.5 text-zinc-500 font-bold"><Clock className="w-3 h-3"/>{match.duration}</div>}
                        {match.status === 'UPCOMING' && <div className="flex items-center gap-1.5 text-zinc-500 font-bold"><Clock className="w-3 h-3"/>{match.time}</div>}
                   </div>
                   
                   <div className="space-y-2 mb-4">
                        <div className={cn("flex items-center gap-2", match.winner === 'A' && match.status === 'FINISHED' ? 'font-black text-white' : 'font-bold text-foreground')}>
                            <span className="w-1.5 h-4 rounded-full bg-blue-500" />
                            <p className="truncate">{match.pA}</p>
                        </div>
                        <div className={cn("flex items-center gap-2", match.winner === 'B' && match.status === 'FINISHED' ? 'font-black text-white' : 'font-bold text-foreground')}>
                            <span className="w-1.5 h-4 rounded-full bg-red-500" />
                            <p className="truncate">{match.pB}</p>
                        </div>
                    </div>
                    
                    {match.score && (
                      <ScoreDisplay score={match.score} status={match.status} winner={match.winner} />
                    )}

                </Card>
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground text-sm border-2 border-dashed rounded-2xl">
                Tidak ada jadwal.
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const PodiumView = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
    {Object.entries(PODIUM_DATA).map(([category, winners]) => (
      <Card key={category} className="bg-card/50 backdrop-blur-sm border-border/20 rounded-3xl overflow-hidden shadow-lg">
        <CardHeader className="bg-secondary/30 border-b border-border/20 p-4">
          <CardTitle className="text-lg font-bold text-center">{category}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {winners.map(winner => (
            <div key={winner.rank} className="flex items-center gap-4 p-3 rounded-xl bg-background">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-black text-xl", 
                winner.rank === 1 ? "bg-yellow-400 text-black" : 
                winner.rank === 2 ? "bg-zinc-400 text-black" : "bg-orange-600 text-white")}>
                {winner.rank}
              </div>
              <div>
                <p className="font-bold text-foreground">{winner.name}</p>
                <p className="text-xs text-muted-foreground">{winner.team}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    ))}
  </div>
);

export default function SchedulePage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-24 pb-20 relative">
        <div className="absolute inset-0 pointer-events-none opacity-5">
           <CourtLines />
        </div>
        <div className="absolute -top-1/4 left-0 w-full h-1/2 bg-gradient-to-br from-primary/10 via-transparent to-transparent blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
             <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary/50 text-primary bg-primary/10 font-bold tracking-widest uppercase">
              Live Arena
             </Badge>
             <h1 className="text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter mb-6">
                Order of Play
             </h1>
          </div>
          
          <ClientOnly>
            <Tabs defaultValue="schedule" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-secondary/50 p-2 rounded-full h-auto border border-border/20 backdrop-blur-sm">
                  <TabsTrigger value="schedule" className="text-sm font-bold rounded-full px-6 py-3 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md">
                    Jadwal Pertandingan
                  </TabsTrigger>
                  <TabsTrigger value="podium" className="text-sm font-bold rounded-full px-6 py-3 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md">
                    Podium Juara
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="schedule">
                <div className="sticky top-20 z-20 mb-8 p-2 bg-background/80 backdrop-blur-md rounded-full border border-border/50 max-w-lg mx-auto">
                  <div className="relative">
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Cari nama pemain, klub, atau kategori..."
                      className="w-full h-12 pl-12 rounded-full border-none bg-transparent focus-visible:ring-2 focus-visible:ring-primary"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <ScheduleView searchTerm={searchTerm} />
              </TabsContent>

              <TabsContent value="podium">
                <PodiumView />
              </TabsContent>
            </Tabs>
          </ClientOnly>
        </div>
      </main>
      <Footer />
    </div>
  );
}
