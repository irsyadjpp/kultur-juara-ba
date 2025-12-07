
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, ArrowDown, ArrowUp, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


// MOCK DATA STOK
const INITIAL_STOCK = 200; // Slop

// 1. Ambil data pertandingan aktif (Mock dulu, nanti fetch dari DB Match Control)
const ACTIVE_MATCHES = [
  { id: "M05", court: "2", players: "Kevin/Marcus vs Hendra/Ahsan" },
  { id: "M06", court: "1", players: "Ginting vs Jonatan" },
];


export default function ShuttlecockControlPage() {
  const { toast } = useToast();
  const [currentStock, setCurrentStock] = useState(INITIAL_STOCK);
  const [logs, setLogs] = useState<any[]>([]);
  
  // Form Request
  const [req, setReq] = useState({ court: "", matchId: "", qty: 1, type: "OUT" });

  const handleTransaction = () => {
      if(!req.matchId) {
        return toast({ title: "Pilih Pertandingan!", variant: "destructive" });
      }
      if (req.type === 'OUT' && currentStock < req.qty) {
          return toast({ title: "Stok Habis!", variant: "destructive" });
      }

      const newLog = {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          ...req,
          balance: req.type === 'OUT' ? currentStock - req.qty : currentStock + Number(req.qty)
      };

      setLogs([newLog, ...logs]);
      setCurrentStock(newLog.balance);
      toast({ title: "Transaksi Tercatat" });
  };

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* KARTU STOK */}
           <Card className="bg-zinc-900 text-white border-none">
               <CardContent className="p-6 text-center">
                   <Package className="w-12 h-12 mx-auto text-yellow-500 mb-2" />
                   <h2 className="text-4xl font-black">{currentStock}</h2>
                   <p className="text-zinc-400">Sisa Tabung (Slop)</p>
               </CardContent>
           </Card>

           {/* FORM DISTRIBUSI */}
           <Card>
               <CardHeader><CardTitle>Distribusi Lapangan</CardTitle></CardHeader>
               <CardContent className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                        <Select 
                            onValueChange={(val) => {
                                const match = ACTIVE_MATCHES.find(m => m.id === val);
                                setReq({ ...req, matchId: val, court: match?.court || "" })
                            }}
                        >
                            <SelectTrigger className="col-span-2">
                                <SelectValue placeholder="Pilih Pertandingan Aktif" />
                            </SelectTrigger>
                            <SelectContent>
                                {ACTIVE_MATCHES.map(m => (
                                <SelectItem key={m.id} value={m.id}>
                                    {m.id} - Court {m.court} ({m.players})
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                   </div>
                   <div className="flex gap-2 items-center">
                       <Button variant="outline" onClick={() => setReq({...req, qty: Math.max(1, req.qty - 1)})}>-</Button>
                       <span className="font-bold w-10 text-center">{req.qty}</span>
                       <Button variant="outline" onClick={() => setReq({...req, qty: req.qty + 1})}>+</Button>
                       <span className="text-sm text-muted-foreground ml-2">Tabung</span>
                   </div>
                   <Button onClick={handleTransaction} className="w-full bg-red-600 hover:bg-red-700">
                       <ArrowUp className="w-4 h-4 mr-2" /> KELUARKAN BARANG
                   </Button>
               </CardContent>
           </Card>
       </div>

       {/* LOG HISTORY */}
       <Card>
           <CardHeader><CardTitle>Riwayat Mutasi</CardTitle></CardHeader>
           <CardContent>
               <Table>
                   <TableHeader><TableRow><TableHead>Waktu</TableHead><TableHead>Aktivitas</TableHead><TableHead>Jml</TableHead><TableHead>Sisa</TableHead></TableRow></TableHeader>
                   <TableBody>
                       {logs.map((log) => (
                           <TableRow key={log.id}>
                               <TableCell className="font-mono text-xs">{log.time}</TableCell>
                               <TableCell>
                                   <div className="font-bold">Court {log.court}</div>
                                   <div className="text-xs text-muted-foreground">Match {log.matchId}</div>
                               </TableCell>
                               <TableCell className="text-red-600 font-bold">-{log.qty}</TableCell>
                               <TableCell>{log.balance}</TableCell>
                           </TableRow>
                       ))}
                   </TableBody>
               </Table>
           </CardContent>
       </Card>
    </div>
  );
}
