'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, UserCheck, UserX, Filter, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Mock Data (Backend: table 'volunteers')
const MOCK_VOLUNTEERS = [
  { id: "V001", name: "Asep Sunandar", role: "LOGISTIK", status: "ACCEPTED", wa: "0812..." },
  { id: "V002", name: "Lilis Suryani", role: "PENDING", status: "INTERVIEW", wa: "0856..." },
  { id: "V003", name: "Jajang Nurjaman", role: "PENDING", status: "REJECTED", wa: "0878..." },
];

export default function VolunteerManagementPage() {
  const { toast } = useToast();
  const [volunteers, setVolunteers] = useState(MOCK_VOLUNTEERS);
  const [filter, setFilter] = useState("ALL");
  const [selectedVol, setSelectedVol] = useState<any>(null);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  // Fungsi Update Status (CRUD: Update)
  const updateStatus = (id: string, status: string, role?: string) => {
    setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status, role: role || v.role } : v));
    toast({ title: "Status Diperbarui", description: `Volunteer ${status}` });
    setIsAssignOpen(false);
  };

  const filteredData = volunteers.filter(v => filter === "ALL" || v.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-headline">Database Volunteer</h2>
        <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[150px]"><Filter className="w-4 h-4 mr-2"/> {filter}</SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">Semua Status</SelectItem>
                    <SelectItem value="PENDING">Baru Masuk</SelectItem>
                    <SelectItem value="INTERVIEW">Tahap Interview</SelectItem>
                    <SelectItem value="ACCEPTED">Diterima</SelectItem>
                    <SelectItem value="REJECTED">Ditolak</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nama Lengkap</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Divisi (Assignment)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredData.map((vol) => (
                    <TableRow key={vol.id}>
                        <TableCell className="font-medium">{vol.name}</TableCell>
                        <TableCell className="font-mono text-muted-foreground">{vol.wa}</TableCell>
                        <TableCell>
                            {vol.role === 'PENDING' ? <span className="text-muted-foreground italic">- Belum Ditentukan -</span> : <Badge variant="outline">{vol.role}</Badge>}
                        </TableCell>
                        <TableCell>
                            <Badge className={
                                vol.status === 'ACCEPTED' ? 'bg-green-600' : 
                                vol.status === 'REJECTED' ? 'bg-red-600' : 
                                vol.status === 'INTERVIEW' ? 'bg-yellow-500' : 'bg-gray-500'
                            }>{vol.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4"/></Button></DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => updateStatus(vol.id, 'INTERVIEW')}>Panggil Interview</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setSelectedVol(vol); setIsAssignOpen(true); }}>Terima & Tugaskan</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateStatus(vol.id, 'REJECTED')} className="text-red-600">Tolak Lamaran</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </div>

      {/* MODAL ASSIGNMENT */}
      <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
          <DialogContent>
              <DialogHeader><DialogTitle>Tugaskan {selectedVol?.name}</DialogTitle></DialogHeader>
              <div className="py-4">
                  <label className="text-sm font-medium mb-2 block">Pilih Divisi Penempatan</label>
                  <Select onValueChange={(val) => updateStatus(selectedVol.id, 'ACCEPTED', val)}>
                      <SelectTrigger><SelectValue placeholder="Pilih Divisi..." /></SelectTrigger>
                      <SelectContent>
                          <SelectItem value="MATCH_CONTROL">Match Control</SelectItem>
                          <SelectItem value="LOGISTIK">Logistik & Runner</SelectItem>
                          <SelectItem value="MEDIA">Media & Dokum</SelectItem>
                          <SelectItem value="SECURITY">Gate & Security</SelectItem>
                          <SelectItem value="LO">Liaison Officer</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
          </DialogContent>
      </Dialog>
    </div>
  );
}
