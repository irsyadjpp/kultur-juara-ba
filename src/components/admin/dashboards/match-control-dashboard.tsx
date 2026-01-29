
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, Clock, AlertTriangle, Mic, 
  MoreVertical, ArrowRightCircle, Users 
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const initialCourts = [
  { id: 1, status: "LIVE", match: "MD-A (Djarum vs Jaya)", score: "21-19, 5-2", umpire: "Budi", time: "15:00" },
  { id: 2, status: "WARMUP", match: "XD-B (SGS vs Exist)", score: "-", umpire: "Ani", time: "02:00" },
  { id: 3, status: "INTERVAL", match: "WD-C (Mutiara vs Tangkas)", score: "11-8", umpire: "Cipto", time: "00:45" },
  { id: 4, status: "EMPTY", match: "-", score: "-", umpire: "-", time: "-" },
  { id: 5, status: "LIVE", match: "MD-C (Falcon vs Eagle)", score: "18-18", umpire: "Dedi", time: "22:10" },
];

const queue = [
  { id: 101, category: "MD Beginner", teamA: "PB A", teamB: "PB B", status: "READY" },
  { id: 102, category: "XD Advance", teamA: "PB X", teamB: "PB Y", status: "CHECKING" },
  { id: 103, category: "WD Inter", teamA: "PB 1", teamB: "PB 2", status: "WAITING" },
];

export default function MatchControlDashboard() {
  const [courts, setCourts] = useState(initialCourts);

  const handlePushToCourt = (courtId: number, matchId: number) => {
      alert(`Memindahkan Match #${matchId} ke Lapangan ${courtId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold font-headline text-primary">Match Control Center</h2>
            <p className="text-muted-foreground">Monitoring Rolling System & Status Lapangan.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="destructive" className="animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-2" /> Darurat Medis
            </Button>
            <Button className="bg-sky-600 hover:bg-sky-700">
                <Mic className="w-4 h-4 mr-2" /> Panggil Suara (Announcer)
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {courts.map((court) => (
          <Card key={court.id} className={`${
              court.status === 'LIVE' ? 'border-green-500' : 
              court.status === 'WARMUP' ? 'border-yellow-500' :
              court.status === 'INTERVAL' ? 'border-sky-500' :
              'border-gray-300 bg-gray-50 dark:bg-secondary/20'
          }`}>
            <CardContent className="p-4 flex flex-col h-full justify-between">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-black text-xl">COURT {court.id}</span>
                        <Badge variant="outline" className="text-[10px]">{court.status}</Badge>
                    </div>
                    
                    {court.status !== 'EMPTY' ? (
                        <>
                            <div className="text-sm font-bold truncate mb-1" title={court.match}>{court.match}</div>
                            <div className="text-2xl font-mono font-black text-primary mb-2">{court.score}</div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Users className="w-3 h-3" /> Wasit: {court.umpire}
                            </div>
                            {court.status === 'WARMUP' || court.status === 'INTERVAL' ? (
                                <div className="mt-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-center font-mono text-xs animate-pulse">
                                    <Clock className="w-3 h-3 inline mr-1" /> {court.time}
                                </div>
                            ) : (
                                <div className="mt-2 text-xs text-gray-400 text-center">Durasi: {court.time}</div>
                            )}
                        </>
                    ) : (
                        <div className="h-24 flex items-center justify-center text-gray-400 text-sm italic">
                            Lapangan Kosong
                        </div>
                    )}
                </div>

                <div className="mt-4 pt-3 border-t flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><MoreVertical className="w-4 h-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ubah Wasit</DropdownMenuItem>
                            <DropdownMenuItem>Koreksi Skor</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Hentikan Pertandingan</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
                <ArrowRightCircle className="w-5 h-5 text-primary" />
                Antrean Pertandingan (Call Room)
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                {queue.map((q) => (
                    <div key={q.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="font-mono text-sm font-bold text-muted-foreground">#{q.id}</div>
                            <div>
                                <div className="font-bold text-sm">{q.category}</div>
                                <div className="text-xs text-muted-foreground">{q.teamA} vs {q.teamB}</div>
                            </div>
                            <Badge className={q.status === 'READY' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                {q.status}
                            </Badge>
                        </div>
                        
                        <div className="flex gap-2">
                             <Button size="sm" variant="outline" onClick={() => handlePushToCourt(4, q.id)} disabled={q.status !== 'READY'}>
                                Masuk Court 4
                             </Button>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
