'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Trash2, UserPlus, Users, ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Mock Data
const MOCK_TEAMS = [
  { 
    id: "T01", name: "PB Djarum", manager: "Budi", phone: "0812...", status: "VERIFIED",
    players: [
        { id: "P1", name: "Kevin", nik: "327...", level: "Advance" },
        { id: "P2", name: "Marcus", nik: "321...", level: "Advance" }
    ]
  },
  { 
    id: "T02", name: "PB Jaya Raya", manager: "Susi", phone: "0856...", status: "PENDING",
    players: [
        { id: "P3", name: "Hendra", nik: "311...", level: "Intermediate" }
    ]
  },
];

export default function TeamMasterPage() {
  const [teams, setTeams] = useState(MOCK_TEAMS);
  const [openTeamId, setOpenTeamId] = useState<string | null>(null);
  
  // Modal State
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<any>({});
  const [currentPlayer, setCurrentPlayer] = useState<any>({});

  // --- CRUD LOGIC ---
  const saveTeam = () => {
      // Logic simpan ke backend
      if(currentTeam.id) {
          setTeams(teams.map(t => t.id === currentTeam.id ? {...t, ...currentTeam} : t));
      } else {
          setTeams([...teams, { ...currentTeam, id: Date.now().toString(), players: [], status: "PENDING" }]);
      }
      setIsTeamModalOpen(false);
  };

  const savePlayer = () => {
      const updatedTeams = teams.map(t => {
          if (t.id === currentTeam.id) {
              const newPlayers = currentPlayer.id 
                  ? t.players.map(p => p.id === currentPlayer.id ? currentPlayer : p)
                  : [...t.players, { ...currentPlayer, id: Date.now().toString() }];
              return { ...t, players: newPlayers };
          }
          return t;
      });
      setTeams(updatedTeams);
      setIsPlayerModalOpen(false);
  };

  const deleteTeam = (id: string) => {
      if(confirm("Hapus tim ini beserta semua pemainnya?")) setTeams(teams.filter(t => t.id !== id));
  };

  const deletePlayer = (teamId: string, playerId: string) => {
      if(confirm("Hapus pemain ini?")) {
          setTeams(teams.map(t => t.id === teamId ? { ...t, players: t.players.filter(p => p.id !== playerId) } : t));
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-headline">Master Data Peserta</h2>
        <Button onClick={() => { setCurrentTeam({}); setIsTeamModalOpen(true); }}>
            <UserPlus className="w-4 h-4 mr-2"/> Tim Baru
        </Button>
      </div>

      <div className="border rounded-md">
          <div className="bg-secondary/20 p-3 grid grid-cols-12 font-bold text-sm border-b">
              <div className="col-span-1"></div>
              <div className="col-span-4">Nama Tim</div>
              <div className="col-span-3">Manajer</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Aksi</div>
          </div>
          {teams.map((team) => (
              <Collapsible key={team.id} open={openTeamId === team.id} onOpenChange={() => setOpenTeamId(openTeamId === team.id ? null : team.id)}>
                  <div className="grid grid-cols-12 p-3 text-sm items-center hover:bg-slate-50 border-b">
                      <div className="col-span-1">
                          <CollapsibleTrigger asChild><Button variant="ghost" size="sm"><ChevronRight className={`w-4 h-4 transition-transform ${openTeamId === team.id ? 'rotate-90' : ''}`}/></Button></CollapsibleTrigger>
                      </div>
                      <div className="col-span-4 font-bold flex items-center gap-2"><Users className="w-4 h-4 text-blue-600"/> {team.name} <Badge variant="outline" className="text-[10px]">{team.players.length} Pemain</Badge></div>
                      <div className="col-span-3">{team.manager} ({team.phone})</div>
                      <div className="col-span-2"><Badge className={team.status === 'VERIFIED' ? 'bg-green-600' : 'bg-yellow-500'}>{team.status}</Badge></div>
                      <div className="col-span-2 text-right">
                          <Button variant="ghost" size="icon" onClick={() => { setCurrentTeam(team); setIsTeamModalOpen(true); }}><Edit className="w-4 h-4"/></Button>
                          <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteTeam(team.id)}><Trash2 className="w-4 h-4"/></Button>
                      </div>
                  </div>
                  
                  <CollapsibleContent className="bg-slate-50 p-4 border-b">
                      <div className="flex justify-between items-center mb-2">
                          <h4 className="text-xs font-bold uppercase text-muted-foreground">Daftar Pemain</h4>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => { setCurrentTeam(team); setCurrentPlayer({}); setIsPlayerModalOpen(true); }}>+ Tambah Pemain</Button>
                      </div>
                      <Table>
                          <TableHeader><TableRow><TableHead>Nama</TableHead><TableHead>NIK</TableHead><TableHead>Level</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                          <TableBody>
                              {team.players.map(p => (
                                  <TableRow key={p.id}>
                                      <TableCell>{p.name}</TableCell>
                                      <TableCell>{p.nik}</TableCell>
                                      <TableCell><Badge variant="secondary">{p.level}</Badge></TableCell>
                                      <TableCell className="text-right">
                                          <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => deletePlayer(team.id, p.id)}><Trash2 className="w-3 h-3"/></Button>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </CollapsibleContent>
              </Collapsible>
          ))}
      </div>

      {/* MODAL TIM */}
      <Dialog open={isTeamModalOpen} onOpenChange={setIsTeamModalOpen}>
          <DialogContent>
              <DialogHeader><DialogTitle>{currentTeam.id ? 'Edit Tim' : 'Tambah Tim'}</DialogTitle></DialogHeader>
              <div className="space-y-3 py-4">
                  <Input placeholder="Nama Tim" value={currentTeam.name || ''} onChange={e => setCurrentTeam({...currentTeam, name: e.target.value})} />
                  <Input placeholder="Nama Manajer" value={currentTeam.manager || ''} onChange={e => setCurrentTeam({...currentTeam, manager: e.target.value})} />
                  <Input placeholder="No. HP / WA" value={currentTeam.phone || ''} onChange={e => setCurrentTeam({...currentTeam, phone: e.target.value})} />
              </div>
              <DialogFooter><Button onClick={saveTeam}>Simpan</Button></DialogFooter>
          </DialogContent>
      </Dialog>

      {/* MODAL PEMAIN */}
      <Dialog open={isPlayerModalOpen} onOpenChange={setIsPlayerModalOpen}>
          <DialogContent>
              <DialogHeader><DialogTitle>Data Pemain - {currentTeam.name}</DialogTitle></DialogHeader>
              <div className="space-y-3 py-4">
                  <Input placeholder="Nama Lengkap" value={currentPlayer.name || ''} onChange={e => setCurrentPlayer({...currentPlayer, name: e.target.value})} />
                  <Input placeholder="NIK" value={currentPlayer.nik || ''} onChange={e => setCurrentPlayer({...currentPlayer, nik: e.target.value})} />
                  <Input placeholder="Level (Beginner/Inter/Adv)" value={currentPlayer.level || ''} onChange={e => setCurrentPlayer({...currentPlayer, level: e.target.value})} />
              </div>
              <DialogFooter><Button onClick={savePlayer}>Simpan Pemain</Button></DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  );
}
