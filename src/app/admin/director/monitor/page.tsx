'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, MapPin, Utensils, UserCheck, Activity, BatteryCharging } from "lucide-react";

// Tipe Data Simulasi
type LiveEvent = { id: number, type: 'SOS' | 'ABSENSI' | 'MEAL', user: string, message: string, time: string, location?: string };

export default function LiveMonitorPage() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [stats, setStats] = useState({
    present: 45,
    totalStaff: 60,
    mealsRedeemed: 32,
    mealsTotal: 70,
    activeSOS: 0
  });

  // Simulasi WebSocket / Real-time Data
  useEffect(() => {
    const interval = setInterval(() => {
      // Ceritanya ada data baru masuk tiap 3 detik
      const newEvent: LiveEvent = {
        id: Date.now(),
        type: Math.random() > 0.8 ? 'MEAL' : 'ABSENSI',
        user: ['Kevin Ops', 'Sarah Medis', 'Budi Logistik'][Math.floor(Math.random() * 3)],
        message: Math.random() > 0.8 ? 'Redeemed Lunch' : 'Clocked In',
        time: new Date().toLocaleTimeString('id-ID'),
        location: 'Main Hall'
      };
      
      setEvents(prev => [newEvent, ...prev].slice(0, 10)); // Keep last 10
      
      // Update Stats Randomly
      setStats(prev => ({
        ...prev,
        present: Math.min(prev.present + 1, 60),
        mealsRedeemed: Math.min(prev.mealsRedeemed + 1, 70)
      }));

    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      {/* Header Ala Command Center */}
      <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-3xl font-black text-red-600 tracking-widest uppercase flex items-center gap-3">
            <Activity className="animate-pulse" /> LIVE OPERATIONS
          </h1>
          <p className="text-zinc-500 text-sm">GELORA KONI BANDUNG • DAY 1</p>
        </div>
        <div className="text-right">
            <div className="text-2xl font-bold text-white">{new Date().toLocaleTimeString('id-ID')}</div>
            <Badge variant="outline" className="text-green-500 border-green-500 animate-pulse">SYSTEM ONLINE</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* KOLOM KIRI: STATISTIK KRUSIAL */}
        <div className="space-y-6">
            {/* Kartu Absensi */}
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2"><CardTitle className="text-zinc-400 text-xs uppercase">Kehadiran Staff</CardTitle></CardHeader>
                <CardContent>
                    <div className="text-4xl font-black text-white">{stats.present}<span className="text-zinc-600 text-lg">/{stats.totalStaff}</span></div>
                    <div className="w-full bg-zinc-800 h-1 mt-2"><div className="bg-blue-600 h-1" style={{width: `${(stats.present/stats.totalStaff)*100}%`}}></div></div>
                </CardContent>
            </Card>

            {/* Kartu Konsumsi */}
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2"><CardTitle className="text-zinc-400 text-xs uppercase">Stok Makan Siang</CardTitle></CardHeader>
                <CardContent>
                    <div className="text-4xl font-black text-white">{stats.mealsTotal - stats.mealsRedeemed}<span className="text-zinc-600 text-lg"> left</span></div>
                    <div className="text-xs text-orange-500 mt-1">{stats.mealsRedeemed} porsi sudah diambil</div>
                </CardContent>
            </Card>

            {/* Status Darurat */}
            <Card className={`${stats.activeSOS > 0 ? "bg-red-900/20 border-red-600 animate-pulse" : "bg-zinc-900 border-zinc-800"}`}>
                <CardHeader className="pb-2"><CardTitle className="text-zinc-400 text-xs uppercase">Active SOS</CardTitle></CardHeader>
                <CardContent className="flex items-center gap-3">
                    <AlertTriangle className={`w-8 h-8 ${stats.activeSOS > 0 ? "text-red-500" : "text-zinc-700"}`} />
                    <div className="text-2xl font-black text-white">{stats.activeSOS}</div>
                </CardContent>
            </Card>
        </div>

        {/* KOLOM TENGAH: LIVE FEED LOG (CCTV DATA) */}
        <div className="lg:col-span-2">
            <Card className="bg-zinc-900 border-zinc-800 h-[500px] flex flex-col">
                <CardHeader className="border-b border-zinc-800">
                    <CardTitle className="text-sm uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-500" /> Incoming Data Stream
                    </CardTitle>
                </CardHeader>
                <ScrollArea className="flex-grow p-4">
                    <div className="space-y-4">
                        {events.map((ev) => (
                            <div key={ev.id} className="flex items-start gap-4 p-3 rounded bg-black/40 border border-zinc-800 animate-in slide-in-from-left">
                                <div className={`mt-1 p-2 rounded-full ${ev.type === 'SOS' ? 'bg-red-900 text-red-500' : ev.type === 'MEAL' ? 'bg-orange-900 text-orange-500' : 'bg-blue-900 text-blue-500'}`}>
                                    {ev.type === 'SOS' ? <AlertTriangle className="w-4 h-4"/> : ev.type === 'MEAL' ? <Utensils className="w-4 h-4"/> : <UserCheck className="w-4 h-4"/>}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between">
                                        <span className="font-bold text-white">{ev.user}</span>
                                        <span className="text-xs text-zinc-500 font-mono">{ev.time}</span>
                                    </div>
                                    <p className="text-sm text-zinc-400">{ev.message}</p>
                                    {ev.location && <div className="flex items-center gap-1 text-xs text-zinc-600 mt-1"><MapPin className="w-3 h-3"/> {ev.location}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </Card>
        </div>

        {/* KOLOM KANAN: QUICK ACTIONS */}
        <div className="space-y-4">
            <div className="p-4 bg-zinc-800 rounded-xl">
                <h3 className="text-xs font-bold text-zinc-400 uppercase mb-4">Broadcast Message</h3>
                <textarea className="w-full bg-black border border-zinc-700 rounded p-2 text-sm text-white mb-2" rows={3} placeholder="Kirim notifikasi ke semua panitia..."></textarea>
                <button className="w-full bg-white text-black font-bold py-2 rounded uppercase text-sm hover:bg-zinc-200">Kirim Push Notif</button>
            </div>
            
            <div className="p-4 bg-zinc-800 rounded-xl">
                 <h3 className="text-xs font-bold text-zinc-400 uppercase mb-4">Device Status</h3>
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-zinc-300">Server Latency</span>
                    <span className="text-sm text-green-500 font-mono">24ms</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-300">Database</span>
                    <span className="text-sm text-green-500 font-mono">Healthy</span>
                 </div>
            </div>
        </div>

      </div>
    </div>
  );
}
