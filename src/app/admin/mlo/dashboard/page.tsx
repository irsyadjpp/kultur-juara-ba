
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Megaphone, CheckCircle2, Clock, Users, ClipboardCheck } from "lucide-react";
import { getCallRoomQueue, updateMatchStatus } from "../actions";
import { useToast } from "@/hooks/use-toast";

export default function MloDashboard() {
  const { toast } = useToast();
  const [queue, setQueue] = useState<any[]>([]);

  useEffect(() => {
    getCallRoomQueue().then(setQueue);
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateMatchStatus(id, newStatus);
    setQueue(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
    
    if (newStatus === 'CALLED') {
        toast({ title: "Panggilan Diumumkan", description: `Tim Match #${id} dipanggil ke Call Room.` });
    } else if (newStatus === 'READY') {
        toast({ title: "Siap Masuk Lapangan", description: `Match #${id} siap diterjunkan.`, className: "bg-green-600 text-white" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold font-headline text-primary">MLO Command Post</h2>
            <p className="text-muted-foreground">Manajemen Call Room & Kesiapan Atlet.</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={() => window.location.href='/admin/mlo/lineups'}>
            <ClipboardCheck className="w-4 h-4" /> Verifikasi Line-Up
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KOLOM 1: MENUNGGU (WAITING) */}
        <Card className="border-t-4 border-t-gray-400 bg-gray-50/50">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Antrean (Waiting)
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {queue.filter(m => m.status === 'WAITING').map(match => (
                    <div key={match.id} className="bg-white p-3 rounded border shadow-sm">
                        <div className="flex justify-between mb-1">
                            <Badge variant="outline">{match.id}</Badge>
                            <span className="text-xs font-mono text-muted-foreground">{match.time}</span>
                        </div>
                        <div className="font-bold text-sm">{match.teamA} vs {match.teamB}</div>
                        <div className="text-xs text-muted-foreground mb-3">{match.category}</div>
                        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleStatusChange(match.id, 'CALLED')}>
                            <Megaphone className="w-3 h-3 mr-2" /> Panggil Tim
                        </Button>
                    </div>
                ))}
                 {queue.filter(m => m.status === 'WAITING').length === 0 && <div className="text-center text-xs text-muted-foreground py-4">Tidak ada antrean.</div>}
            </CardContent>
        </Card>

        {/* KOLOM 2: DIPANGGIL (CALLED) */}
        <Card className="border-t-4 border-t-yellow-500 bg-yellow-50/30">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-yellow-700 flex items-center gap-2">
                    <Megaphone className="w-4 h-4" /> Sedang Dipanggil
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {queue.filter(m => m.status === 'CALLED').map(match => (
                    <div key={match.id} className="bg-white p-3 rounded border border-yellow-200 shadow-sm">
                        <div className="flex justify-between mb-1">
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{match.id}</Badge>
                            <span className="text-xs font-bold text-red-500 animate-pulse">PANGGILAN KE-1</span>
                        </div>
                        <div className="font-bold text-sm">{match.teamA} vs {match.teamB}</div>
                        <div className="text-xs text-muted-foreground mb-3">{match.category}</div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1" onClick={() => handleStatusChange(match.id, 'CALLED')}>
                                Panggil Ulang
                            </Button>
                            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange(match.id, 'READY')}>
                                <CheckCircle2 className="w-3 h-3 mr-2" /> Tim Hadir
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

        {/* KOLOM 3: SIAP (READY) */}
        <Card className="border-t-4 border-t-green-500 bg-green-50/30">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-green-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Siap Masuk Lapangan
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {queue.filter(m => m.status === 'READY').map(match => (
                    <div key={match.id} className="bg-white p-3 rounded border border-green-200 shadow-sm">
                        <div className="flex justify-between mb-1">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{match.id}</Badge>
                            <span className="text-xs font-bold text-green-600">VERIFIED</span>
                        </div>
                        <div className="font-bold text-sm">{match.teamA} vs {match.teamB}</div>
                        <div className="text-xs text-muted-foreground mb-3">{match.category}</div>
                        <div className="p-2 bg-secondary/20 rounded text-xs text-center mb-2">
                            Menunggu Lapangan Kosong...
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
