
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, CheckCircle, XCircle, Printer } from "lucide-react";
import { getLineups, verifyLineup } from "../actions";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";

export default function LineupVerificationPage() {
  const [lineups, setLineups] = useState<any[]>([]);
  const [selectedLineup, setSelectedLineup] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    getLineups().then(setLineups);
  }, []);

  const handleVerify = async (id: string) => {
      await verifyLineup(id);
      setLineups(prev => prev.map(l => l.id === id ? { ...l, status: 'VERIFIED' } : l));
      setIsDetailOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold font-headline">Verifikasi Line-Up</h2>
            <p className="text-muted-foreground">Validasi susunan pemain sebelum pertandingan.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tim</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Jam Submit</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {lineups.map((l) => (
                        <TableRow key={l.id}>
                            <TableCell className="font-mono text-xs">{l.id}</TableCell>
                            <TableCell className="font-bold">{l.team}</TableCell>
                            <TableCell>{l.category}</TableCell>
                            <TableCell>{l.submittedAt}</TableCell>
                            <TableCell>
                                {l.status === 'PENDING' && <Badge className="bg-yellow-500 text-yellow-950">Perlu Cek</Badge>}
                                {l.status === 'VERIFIED' && <Badge className="bg-green-600">Valid</Badge>}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" variant="ghost" onClick={() => { setSelectedLineup(l); setIsDetailOpen(true); }}>
                                    <Eye className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>

      {/* MODAL DETAIL LINE-UP */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Line-Up: {selectedLineup?.team}</DialogTitle>
                <DialogDescription>Kategori: {selectedLineup?.category}</DialogDescription>
            </DialogHeader>
            
            <div className="border rounded-lg p-4 bg-secondary/10 space-y-2 text-sm">
                {/* Simulasi Isi Lineup */}
                <div className="grid grid-cols-12 font-bold border-b pb-2 mb-2">
                    <div className="col-span-1">#</div>
                    <div className="col-span-5">Partai</div>
                    <div className="col-span-6">Pemain</div>
                </div>
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-1">1</div>
                    <div className="col-span-5 text-muted-foreground">Ganda Beginner 1</div>
                    <div className="col-span-6 font-medium">Budi / Andi</div>
                </div>
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-1">2</div>
                    <div className="col-span-5 text-muted-foreground">Ganda Intermediate 1</div>
                    <div className="col-span-6 font-medium">Kevin / Marcus</div>
                </div>
                <div className="py-2 text-center text-xs text-muted-foreground italic">... 3 partai lainnya ...</div>
            </div>

            <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-800 border border-yellow-200 flex gap-2">
                <CheckCircle className="w-4 h-4" />
                Sistem otomatis mengecek tidak ada pemain rangkap (kecuali aturan khusus).
            </div>

            <DialogFooter className="gap-2">
                <Button variant="outline" className="w-full" onClick={() => window.print()}>
                    <Printer className="w-4 h-4 mr-2" /> Cetak Fisik
                </Button>
                {selectedLineup?.status === 'PENDING' && (
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleVerify(selectedLineup.id)}>
                        <CheckCircle className="w-4 h-4 mr-2" /> Validasi Line-Up
                    </Button>
                )}
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
