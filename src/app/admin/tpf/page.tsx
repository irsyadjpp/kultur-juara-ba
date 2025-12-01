'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlayCircle, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { TpfAssessmentModal } from "@/components/admin/tpf-assessment-modal";

// Mock Data Antrean
const pendingPlayers = [
  { id: 1, name: "Andi Smash", team: "PB Djarum KW", claim: "Intermediate", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", status: "PENDING" },
  { id: 2, name: "Budi Lob", team: "PB Jaya", claim: "Beginner", videoUrl: "https://www.youtube.com/embed/example", status: "REVIEWED" },
  { id: 3, name: "Siti Netting", team: "PB Exist", claim: "Advance", videoUrl: "https://www.youtube.com/embed/example", status: "REJECTED" },
];

export default function TpfPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAssess = (player: any) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold font-headline">Verifikasi TPF</h2>
            <p className="text-muted-foreground">Audit teknis pemain berdasarkan video (SOP Anti-Sandbagging).</p>
        </div>
        <div className="flex gap-2">
            <Badge variant="outline" className="px-3 py-1 border-yellow-500 text-yellow-600 bg-yellow-50">Pending: 12</Badge>
            <Badge variant="outline" className="px-3 py-1 border-green-500 text-green-600 bg-green-50">Approved: 45</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Antrean Verifikasi</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama Pemain</TableHead>
                        <TableHead>Tim</TableHead>
                        <TableHead>Klaim Level</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pendingPlayers.map((player) => (
                        <TableRow key={player.id}>
                            <TableCell className="font-medium">{player.name}</TableCell>
                            <TableCell>{player.team}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{player.claim}</Badge>
                            </TableCell>
                            <TableCell>
                                {player.status === 'PENDING' && <Badge className="bg-yellow-500">Menunggu</Badge>}
                                {player.status === 'REVIEWED' && <Badge className="bg-green-500">Selesai</Badge>}
                                {player.status === 'REJECTED' && <Badge className="bg-red-500">Ditolak</Badge>}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" onClick={() => handleAssess(player)}>
                                    <PlayCircle className="w-4 h-4 mr-2" />
                                    Audit Video
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>

      {/* Modal Form Penilaian */}
      {selectedPlayer && (
        <TpfAssessmentModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            player={selectedPlayer} 
        />
      )}
    </div>
  );
}