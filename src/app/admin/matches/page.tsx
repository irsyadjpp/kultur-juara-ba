'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayCircle, StopCircle, Clock, Save, Trophy } from "lucide-react";

// Mock Data Pertandingan
const initialMatches = [
  { 
    id: 1, 
    court: "Lapangan 1", 
    category: "Beregu PUTRA", 
    teamA: "PB Djarum KW", 
    teamB: "PB Jaya Raya", 
    scoreA: [21, 18, 5], 
    scoreB: [19, 21, 2], 
    status: "LIVE", // UPCOMING, LIVE, FINISHED
    currentSet: 3 
  },
  { 
    id: 2, 
    court: "Lapangan 2", 
    category: "Beregu PUTRI", 
    teamA: "PB Smash", 
    teamB: "PB Exist", 
    scoreA: [0, 0, 0], 
    scoreB: [0, 0, 0], 
    status: "UPCOMING", 
    currentSet: 1 
  },
  { 
    id: 3, 
    court: "Lapangan 3", 
    category: "Beregu CAMPURAN", 
    teamA: "PB Tangkas", 
    teamB: "PB Mutiara", 
    scoreA: [30, 0, 0],
    scoreB: [28, 0, 0],
    status: "FINISHED", 
    currentSet: 1 
  },
];

export default function MatchInputPage() {
  const [matches, setMatches] = useState(initialMatches);

  // Fungsi update skor (Simulasi)
  const handleScoreChange = (id: number, team: 'A' | 'B', setIdx: number, val: string) => {
    const newMatches = matches.map(m => {
      if (m.id === id) {
        const newScores = team === 'A' ? [...m.scoreA] : [...m.scoreB];
        newScores[setIdx] = parseInt(val) || 0;
        return team === 'A' ? { ...m, scoreA: newScores } : { ...m, scoreB: newScores };
      }
      return m;
    });
    setMatches(newMatches);
  };

  const handleStatusChange = (id: number, status: string) => {
    setMatches(matches.map(m => m.id === id ? { ...m, status } : m));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold font-headline">Input Skor (Live Match)</h2>
            <p className="text-muted-foreground">Update skor pertandingan secara real-time.</p>
        </div>
        <div className="flex gap-2">
             <Badge variant="secondary" className="text-lg px-4 py-2 h-auto">
                {matches.filter(m => m.status === 'LIVE').length} Pertandingan LIVE
             </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {matches.map((match) => (
          <Card key={match.id} className={`border-2 ${match.status === 'LIVE' ? 'border-red-500 shadow-red-100 shadow-lg' : 'border-border'}`}>
            <CardHeader className="pb-2 border-b bg-secondary/10">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-background">{match.court}</Badge>
                        <span className="text-xs font-bold text-muted-foreground uppercase">{match.category}</span>
                    </div>
                    <Select 
                        defaultValue={match.status} 
                        onValueChange={(val) => handleStatusChange(match.id, val)}
                    >
                        <SelectTrigger className={`w-[130px] h-8 text-xs font-bold ${match.status === 'LIVE' ? 'bg-red-100 text-red-600 border-red-200' : ''}`}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="UPCOMING">BELUM MAIN</SelectItem>
                            <SelectItem value="LIVE">SEDANG MAIN</SelectItem>
                            <SelectItem value="FINISHED">SELESAI</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            
            <CardContent className="pt-6">
                {/* SKOR BOARD */}
                <div className="flex items-center justify-between gap-4 mb-6">
                    {/* TIM A */}
                    <div className="text-center w-1/3">
                        <h3 className="font-black text-lg leading-tight mb-2">{match.teamA}</h3>
                        <div className="flex flex-col gap-2">
                            {match.scoreA.map((score, idx) => (
                                <Input 
                                    key={`A-${idx}`}
                                    type="number" 
                                    className={`text-center font-mono font-bold text-lg h-12 ${match.status === 'LIVE' && idx === match.currentSet - 1 ? 'border-primary ring-2 ring-primary/20' : ''}`}
                                    value={score}
                                    onChange={(e) => handleScoreChange(match.id, 'A', idx, e.target.value)}
                                    disabled={match.status === 'FINISHED'}
                                />
                            ))}
                        </div>
                    </div>

                    {/* VS / SET */}
                    <div className="text-center text-muted-foreground font-bold text-xs space-y-4 pt-8">
                        <div>SET 1</div>
                        <div>SET 2</div>
                        <div>SET 3</div>
                    </div>

                    {/* TIM B */}
                    <div className="text-center w-1/3">
                        <h3 className="font-black text-lg leading-tight mb-2">{match.teamB}</h3>
                        <div className="flex flex-col gap-2">
                            {match.scoreB.map((score, idx) => (
                                <Input 
                                    key={`B-${idx}`}
                                    type="number" 
                                    className={`text-center font-mono font-bold text-lg h-12 ${match.status === 'LIVE' && idx === match.currentSet - 1 ? 'border-primary ring-2 ring-primary/20' : ''}`}
                                    value={score}
                                    onChange={(e) => handleScoreChange(match.id, 'B', idx, e.target.value)}
                                    disabled={match.status === 'FINISHED'}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex justify-between items-center border-t pt-4">
                    <div className="text-xs text-muted-foreground">
                        {match.status === 'LIVE' && <span className="flex items-center gap-1 text-red-600 animate-pulse"><Clock className="w-3 h-3" /> Live Update</span>}
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Save className="w-4 h-4 mr-2" /> Simpan Skor
                    </Button>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
