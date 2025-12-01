'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Minus, Plus, RefreshCw, MonitorPlay, 
  ArrowLeftRight, AlertTriangle, MapPin, Users
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type MatchMode = 'GROUP' | 'KNOCKOUT';

export default function MatchControlPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();

  // --- DATA PEMAIN (Split jadi Array) ---
  const initialTeamA = ["Kevin Sanjaya", "Marcus Gideon"];
  const initialTeamB = ["Hendra Setiawan", "M. Ahsan"];

  const [mode, setMode] = useState<MatchMode>('GROUP');
  
  // --- GAME STATE ---
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [setA, setSetA] = useState(0);
  const [setB, setSetB] = useState(0);
  const [gameSet, setGameSet] = useState(1);
  const [server, setServer] = useState<'A' | 'B'>('A'); 
  const [isFinished, setIsFinished] = useState(false);
  
  // --- PLAYER POSITION STATE (Index 0 = Kanan/Genap, Index 1 = Kiri/Ganjil) ---
  // Kita simpan index pemain. [0, 1] artinya Pemain ke-1 di Kanan, Pemain ke-2 di Kiri.
  const [posA, setPosA] = useState([0, 1]); 
  const [posB, setPosB] = useState([0, 1]);

  // --- HISTORY ---
  const [history, setHistory] = useState<any[]>([]);
  const [shuttles, setShuttles] = useState(1);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- LOGIKA SIAPA YANG SERVIS ---
  // Genap = Pemain di posisi Kanan (Index 0 dari state pos)
  // Ganjil = Pemain di posisi Kiri (Index 1 dari state pos)
  const getCurrentServerName = (team: 'A' | 'B') => {
      const score = team === 'A' ? scoreA : scoreB;
      const posIndex = score % 2 === 0 ? 0 : 1; // 0=Kanan, 1=Kiri
      
      if (team === 'A') return initialTeamA[posA[posIndex]];
      return initialTeamB[posB[posIndex]];
  };

  const handlePoint = (team: 'A' | 'B', type: 'ADD' | 'MIN') => {
    if (isFinished) return;

    if (type === 'ADD') {
        // Simpan History
        setHistory([...history, { scoreA, scoreB, server, posA: [...posA], posB: [...posB] }]);

        const isServerWin = team === server;
        
        // LOGIKA ROTASI BADMINTON
        if (isServerWin) {
            // Jika Server Menang Poin -> Tukar Posisi Kiri/Kanan
            if (team === 'A') setPosA(prev => [prev[1], prev[0]]);
            else setPosB(prev => [prev[1], prev[0]]);
        } else {
            // Jika Pindah Bola -> Posisi Pemain TIDAK BERUBAH (Stay)
            // Hanya server team yang berubah
            setServer(team);
        }

        // Tambah Skor
        if (team === 'A') setScoreA(s => s + 1);
        else setScoreB(s => s + 1);

    } else {
        // UNDO Logic
        if (history.length > 0) {
            const last = history[history.length - 1];
            setScoreA(last.scoreA);
            setScoreB(last.scoreB);
            setServer(last.server);
            setPosA(last.posA);
            setPosB(last.posB);
            setHistory(history.slice(0, -1));
        }
    }
  };

  // Fungsi Manual Swap (Jika Wasit Salah Input Posisi)
  const manualSwap = (team: 'A' | 'B') => {
      if (team === 'A') setPosA(prev => [prev[1], prev[0]]);
      else setPosB(prev => [prev[1], prev[0]]);
      toast({ title: `Posisi Tim ${team} Ditukar Manual` });
  };

  return (
    <div className="min-h-screen bg-black text-white p-2 md:p-4 flex flex-col font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-zinc-900 p-3 rounded-lg gap-4 border border-zinc-800">
        <div className="text-left w-full md:w-auto">
            <div className="text-xs text-zinc-500 font-mono">MATCH ID: {params.id}</div>
            <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-primary">MD Open</span>
                <Badge variant="outline" className="border-zinc-600 text-zinc-300 text-[10px]">
                    {mode === 'GROUP' ? '1x30' : '3x15'}
                </Badge>
            </div>
        </div>
        
        {/* CENTER INFO: CURRENT SERVER */}
        <div className="bg-yellow-950/30 border border-yellow-500/30 px-6 py-2 rounded-lg flex flex-col items-center">
            <span className="text-[10px] text-yellow-500 uppercase font-bold tracking-widest">Serving Now</span>
            <span className="text-xl font-black text-white animate-pulse">
                {getCurrentServerName(server)}
            </span>
        </div>

        <div className="flex items-center gap-3 bg-zinc-950 px-3 py-1.5 rounded-md border border-zinc-800 cursor-pointer" onClick={() => setIsTimerRunning(!isTimerRunning)}>
            <div className="text-center">
                <div className="text-[10px] text-zinc-500 uppercase">Waktu</div>
                <div className={`font-mono font-bold text-lg leading-none ${isTimerRunning ? 'text-green-400' : 'text-red-400'}`}>
                    {formatTime(time)}
                </div>
            </div>
        </div>
      </div>

      {/* SCOREBOARD */}
      <div className="flex-grow grid grid-cols-2 gap-2 md:gap-6">
        
        {/* TIM A (KIRI) */}
        <div className={`relative rounded-2xl p-3 md:p-6 flex flex-col justify-between border-4 transition-all duration-300 ${server === 'A' ? 'border-yellow-500 bg-zinc-800' : 'border-transparent bg-zinc-900 opacity-80'}`}>
            
            <div className="mt-2 text-center md:text-left">
                <h2 className="text-xl md:text-3xl font-black text-white leading-tight">PB Djarum</h2>
                {mode === 'KNOCKOUT' && <div className="text-yellow-500 font-black text-2xl mt-1">SET {setA}</div>}
            </div>

            <div className="flex-grow flex flex-col items-center justify-center py-4">
                <div className="text-[100px] md:text-[180px] leading-none font-black font-mono select-none tracking-tighter text-white mb-6">
                    {scoreA}
                </div>
                
                {/* POSISI PEMAIN VISUAL */}
                <div className="w-full grid grid-cols-2 gap-2 text-center">
                    {/* KIRI (Ganjil) */}
                    <div className={`p-2 rounded border ${scoreA % 2 !== 0 ? 'bg-yellow-500 text-black border-yellow-500 font-bold' : 'border-zinc-700 text-zinc-500'}`}>
                        <div className="text-[10px] uppercase mb-1">Kiri (Ganjil)</div>
                        <div className="text-sm md:text-lg leading-tight truncate">{initialTeamA[posA[1]]}</div>
                    </div>
                    {/* KANAN (Genap) */}
                    <div className={`p-2 rounded border ${scoreA % 2 === 0 ? 'bg-yellow-500 text-black border-yellow-500 font-bold' : 'border-zinc-700 text-zinc-500'}`}>
                        <div className="text-[10px] uppercase mb-1">Kanan (Genap)</div>
                        <div className="text-sm md:text-lg leading-tight truncate">{initialTeamA[posA[0]]}</div>
                    </div>
                </div>
                
                {/* Tombol Swap Manual Kecil */}
                <Button variant="ghost" size="sm" className="mt-2 h-6 text-[10px] text-zinc-600 hover:text-zinc-400" onClick={() => manualSwap('A')}>
                    <RefreshCw className="w-3 h-3 mr-1" /> Swap Posisi
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
                 <Button className="h-16 bg-zinc-800 hover:bg-zinc-700 border-2 border-zinc-700 rounded-xl" onClick={() => handlePoint('A', 'MIN')}>
                    <Minus className="w-8 h-8 text-zinc-500" />
                 </Button>
                 <Button className="h-16 bg-blue-600 hover:bg-blue-500 text-white shadow-[0_5px_0_rgb(29,78,216)] active:translate-y-1 active:shadow-none rounded-xl" onClick={() => handlePoint('A', 'ADD')}>
                    <Plus className="w-12 h-12" />
                 </Button>
            </div>
        </div>

        {/* TIM B (KANAN) */}
        <div className={`relative rounded-2xl p-3 md:p-6 flex flex-col justify-between border-4 transition-all duration-300 ${server === 'B' ? 'border-yellow-500 bg-zinc-800' : 'border-transparent bg-zinc-900 opacity-80'}`}>
            
            <div className="mt-2 text-center md:text-right">
                <h2 className="text-xl md:text-3xl font-black text-white leading-tight">PB Jaya</h2>
                {mode === 'KNOCKOUT' && <div className="text-yellow-500 font-black text-2xl mt-1">SET {setB}</div>}
            </div>

            <div className="flex-grow flex flex-col items-center justify-center py-4">
                <div className="text-[100px] md:text-[180px] leading-none font-black font-mono select-none tracking-tighter text-white mb-6">
                    {scoreB}
                </div>

                 {/* POSISI PEMAIN VISUAL */}
                 <div className="w-full grid grid-cols-2 gap-2 text-center">
                    {/* KIRI (Ganjil) */}
                    <div className={`p-2 rounded border ${scoreB % 2 !== 0 ? 'bg-yellow-500 text-black border-yellow-500 font-bold' : 'border-zinc-700 text-zinc-500'}`}>
                        <div className="text-[10px] uppercase mb-1">Kiri (Ganjil)</div>
                        <div className="text-sm md:text-lg leading-tight truncate">{initialTeamB[posB[1]]}</div>
                    </div>
                    {/* KANAN (Genap) */}
                    <div className={`p-2 rounded border ${scoreB % 2 === 0 ? 'bg-yellow-500 text-black border-yellow-500 font-bold' : 'border-zinc-700 text-zinc-500'}`}>
                        <div className="text-[10px] uppercase mb-1">Kanan (Genap)</div>
                        <div className="text-sm md:text-lg leading-tight truncate">{initialTeamB[posB[0]]}</div>
                    </div>
                </div>

                <Button variant="ghost" size="sm" className="mt-2 h-6 text-[10px] text-zinc-600 hover:text-zinc-400" onClick={() => manualSwap('B')}>
                    <RefreshCw className="w-3 h-3 mr-1" /> Swap Posisi
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
                 <Button className="h-16 bg-zinc-800 hover:bg-zinc-700 border-2 border-zinc-700 rounded-xl" onClick={() => handlePoint('B', 'MIN')}>
                    <Minus className="w-8 h-8 text-zinc-500" />
                 </Button>
                 <Button className="h-16 bg-red-600 hover:bg-red-500 text-white shadow-[0_5px_0_rgb(185,28,28)] active:translate-y-1 active:shadow-none rounded-xl" onClick={() => handlePoint('B', 'ADD')}>
                    <Plus className="w-12 h-12" />
                 </Button>
            </div>
        </div>
      </div>

      {/* CONTROL BAR */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Button variant="secondary" className="h-14 bg-zinc-800 text-zinc-400" onClick={() => setServer(server === 'A' ? 'B' : 'A')}>
            <ArrowLeftRight className="w-5 h-5 mr-2" /> Pindah Bola
        </Button>
        <div className="h-14 flex flex-col items-center justify-center bg-zinc-950 rounded border border-zinc-800">
             <span className="text-[10px] text-zinc-500">TOTAL KOK</span>
             <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-xl text-white">{shuttles}</span>
                <Button size="icon" className="h-6 w-6 bg-zinc-800" onClick={() => setShuttles(s => s+1)}><Plus className="w-3 h-3" /></Button>
             </div>
        </div>
        <Button className="h-14 bg-green-600 hover:bg-green-500" onClick={() => setIsFinished(true)}>
            <MonitorPlay className="w-5 h-5 mr-2" /> Selesai
        </Button>
      </div>
    </div>
  );
}
    