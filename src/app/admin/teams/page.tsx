'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, CheckCircle, XCircle, AlertCircle, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Mock Data (Nanti diganti fetch dari Firebase 'registrations')
const mockTeams = [
  { id: 1, name: "PB Djarum KW", category: "Beregu PUTRA", manager: "Budi", wa: "0812...", status: "PAID", players: 12, transferProof: "/mock-proof.jpg" },
  { id: 2, name: "PB Jaya Raya", category: "Beregu CAMPURAN", manager: "Susi", wa: "0813...", status: "PENDING", players: 14, transferProof: null },
  { id: 3, name: "PB Smash", category: "Beregu PUTRI", manager: "Rina", wa: "0815...", status: "REJECTED", players: 10, transferProof: null },
];

export default function TeamManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Filter Tim
  const filteredTeams = mockTeams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetail = (team: any) => {
    setSelectedTeam(team);
    setIsDetailOpen(true);
  };

  const updateStatus = (status: string) => {
    // Disini panggil server action updateStatus(selectedTeam.id, status)
    alert(`Status tim ${selectedTeam.name} diubah menjadi ${status}`);
    setIsDetailOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-3xl font-bold font-headline">Manajemen Tim</h2>
            <p className="text-muted-foreground">Verifikasi pembayaran dan data pendaftar.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Cari nama tim..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Button variant="outline">Export CSV</Button>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Tim</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Manajer</TableHead>
              <TableHead>Jml Pemain</TableHead>
              <TableHead>Status Bayar</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell>
                    <Badge variant="outline">{team.category.replace('Beregu ', '')}</Badge>
                </TableCell>
                <TableCell>
                    <div className="text-sm">{team.manager}</div>
                    <div className="text-xs text-muted-foreground">{team.wa}</div>
                </TableCell>
                <TableCell>{team.players}</TableCell>
                <TableCell>
                    {team.status === 'PAID' && <Badge className="bg-green-500">Lunas</Badge>}
                    {team.status === 'PENDING' && <Badge className="bg-yellow-500">Cek Bukti</Badge>}
                    {team.status === 'REJECTED' && <Badge className="bg-destructive">Ditolak</Badge>}
                </TableCell>
                <TableCell className="text-right">
                    <Button size="sm" variant="ghost" onClick={() => handleViewDetail(team)}>
                        <Eye className="w-4 h-4" />
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MODAL DETAIL TIM */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Detail Tim: {selectedTeam?.name}</DialogTitle>
                <DialogDescription>Kategori: {selectedTeam?.category}</DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                    <h4 className="font-bold text-sm text-muted-foreground border-b pb-1">Info Manajer</h4>
                    <div className="text-sm">
                        <p><span className="font-semibold">Nama:</span> {selectedTeam?.manager}</p>
                        <p><span className="font-semibold">WhatsApp:</span> {selectedTeam?.wa}</p>
                    </div>
                    
                    <h4 className="font-bold text-sm text-muted-foreground border-b pb-1 mt-4">Bukti Transfer</h4>
                    {selectedTeam?.status === 'PAID' ? (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-2 rounded">
                            <CheckCircle className="w-4 h-4" /> Terverifikasi Lunas
                        </div>
                    ) : (
                        <div className="border rounded p-2 bg-secondary/10 text-center">
                             {/* Di real app, ini <Image src={selectedTeam.transferProof} ... /> */}
                             <FileText className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                             <p className="text-xs text-muted-foreground">Klik untuk melihat bukti transfer</p>
                             <Button variant="link" size="sm">Lihat Gambar</Button>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold text-sm text-muted-foreground border-b pb-1">Daftar Pemain ({selectedTeam?.players})</h4>
                    <div className="h-48 overflow-y-auto border rounded p-2 text-sm space-y-2 bg-secondary/5">
                        {/* Simulasi List Pemain */}
                        <div className="flex justify-between items-center p-2 border-b">
                            <span>1. Pemain A</span>
                            <Badge variant="outline" className="text-[10px]">Intermediate</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border-b">
                            <span>2. Pemain B</span>
                            <Badge variant="outline" className="text-[10px]">Beginner</Badge>
                        </div>
                        <div className="p-2 text-center text-muted-foreground text-xs">
                            ... dan {selectedTeam?.players - 2} lainnya
                        </div>
                    </div>
                    <Button className="w-full" variant="secondary">
                        Lihat Semua Pemain & Video (TPF)
                    </Button>
                </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="destructive" onClick={() => updateStatus("REJECTED")}>
                    <XCircle className="w-4 h-4 mr-2" /> Tolak / Belum Lunas
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => updateStatus("PAID")}>
                    <CheckCircle className="w-4 h-4 mr-2" /> Verifikasi Lunas
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
