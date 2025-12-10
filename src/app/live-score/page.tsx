import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Activity } from "lucide-react";

// Di real app, data ini di-fetch dari database (server component)
const liveMatches = [
  { 
    id: 1, 
    court: "Lapangan 1", 
    category: "Beregu PUTRA", 
    teamA: "PB Djarum KW", 
    teamB: "PB Jaya Raya", 
    scoreA: [21, 18, 5], 
    scoreB: [19, 21, 2], 
    status: "LIVE",
    currentSet: 3 
  },
  { 
    id: 3, 
    court: "Lapangan 3", 
    category: "Beregu CAMPURAN", 
    teamA: "PB Tangkas", 
    teamB: "PB Mutiara", 
    scoreA: [30], 
    scoreB: [28], 
    status: "FINISHED", 
    winner: "PB Tangkas"
  },
];

export default function PublicLiveScorePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-12 bg-secondary/5">
        <div className="container mx-auto px-4">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-red-100 text-red-600 rounded-full mb-4 animate-pulse">
                    <Activity className="w-6 h-6" />
                </div>
                <h1 className="text-4xl font-black font-headline mb-2">Live Score</h1>
                <p className="text-muted-foreground">Pantau hasil pertandingan Road to BCC 2026 secara langsung.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {liveMatches.map((match) => (
                    <Card key={match.id} className="overflow-hidden border-2 border-transparent hover:border-primary/20 transition-colors">
                        {/* Header Status */}
                        <div className={`h-2 w-full ${match.status === 'LIVE' ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
                        
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <Badge variant="outline">{match.court}</Badge>
                                {match.status === 'LIVE' ? (
                                    <Badge className="bg-red-500 hover:bg-red-600 animate-pulse">LIVE</Badge>
                                ) : (
                                    <Badge variant="secondary">SELESAI</Badge>
                                )}
                            </div>

                            <div className="flex justify-between items-center gap-4 mb-6">
                                {/* Team A */}
                                <div className="text-left flex-1">
                                    <div className="font-black text-lg leading-tight mb-1">{match.teamA}</div>
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Tim A</div>
                                </div>

                                {/* VS */}
                                <div className="text-xs font-bold text-muted-foreground">VS</div>

                                {/* Team B */}
                                <div className="text-right flex-1">
                                    <div className="font-black text-lg leading-tight mb-1">{match.teamB}</div>
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Tim B</div>
                                </div>
                            </div>

                            {/* Skor Besar */}
                            <div className="bg-secondary/30 rounded-lg p-4 flex justify-between items-center font-mono text-2xl font-bold">
                                <div className={match.status === 'LIVE' ? 'text-primary' : ''}>
                                    {match.scoreA[match.currentSet ? match.currentSet - 1 : 0]}
                                </div>
                                <div className="text-sm text-muted-foreground font-sans font-normal">
                                    {match.status === 'LIVE' ? `Set ${match.currentSet}` : 'Skor Akhir'}
                                </div>
                                <div className={match.status === 'LIVE' ? 'text-primary' : ''}>
                                    {match.scoreB[match.currentSet ? match.currentSet - 1 : 0]}
                                </div>
                            </div>

                            {/* Detail Set (Kecil) */}
                            <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground">
                                {match.scoreA.map((s, i) => (
                                    // Hanya tampilkan set yang sudah ada skornya
                                    (s > 0 || match.scoreB[i] > 0) && (
                                        <span key={i}>S{i+1}: {s}-{match.scoreB[i]}</span>
                                    )
                                ))}
                            </div>

                            {match.winner && (
                                <div className="mt-4 pt-4 border-t flex items-center justify-center gap-2 text-green-600 font-bold">
                                    <Trophy className="w-4 h-4" />
                                    Pemenang: {match.winner}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
