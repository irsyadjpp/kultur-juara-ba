'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarClock, Edit, Trash2, Plus } from "lucide-react";

// Mock Schedule
const MOCK_SCHEDULE = [
  { id: "M01", round: "R32", teamA: "PB Djarum", teamB: "PB Jaya", court: "1", time: "08:00", category: "MD Open" },
  { id: "M02", round: "R32", teamA: "PB Exist", teamB: "PB SGS", court: "2", time: "08:00", category: "MD Open" },
];

export default function ScheduleEditorPage() {
  const [matches, setMatches] = useState(MOCK_SCHEDULE);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<any>({});

  const handleSave = () => {
      if (form.id) {
          setMatches(matches.map(m => m.id === form.id ? form : m));
      } else {
          setMatches([...matches, { ...form, id: `M${Date.now()}` }]);
      }
      setIsOpen(false);
  };

  const handleDelete = (id: string) => {
      if(confirm("Hapus jadwal ini?")) setMatches(matches.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
           <h2 className="text-3xl font-bold font-headline">Editor Jadwal (Fixture)</h2>
           <Button onClick={() => { setForm({}); setIsOpen(true); }} className="bg-primary hover:bg-primary/90">
               <Plus className="w-4 h-4 mr-2"/> Jadwal Manual
           </Button>
       </div>

       <div className="border rounded-md">
           <Table>
               <TableHeader>
                   <TableRow>
                       <TableHead>ID</TableHead>
                       <TableHead>Babak</TableHead>
                       <TableHead>Matchup</TableHead>
                       <TableHead>Jadwal (Court / Jam)</TableHead>
                       <TableHead className="text-right">Aksi</TableHead>
                   </TableRow>
               </TableHeader>
               <TableBody>
                   {matches.map((m) => (
                       <TableRow key={m.id}>
                           <TableCell className="font-mono text-xs">{m.id}</TableCell>
                           <TableCell>{m.round}</TableCell>
                           <TableCell className="font-bold">{m.teamA} <span className="text-muted-foreground font-normal">vs</span> {m.teamB}</TableCell>
                           <TableCell>
                               <div className="flex items-center gap-2">
                                   <span className="bg-black text-white px-2 rounded text-xs font-bold">C-{m.court}</span>
                                   <span className="text-sm">{m.time}</span>
                               </div>
                           </TableCell>
                           <TableCell className="text-right space-x-2">
                               <Button variant="outline" size="icon" onClick={() => { setForm(m); setIsOpen(true); }}><Edit className="w-4 h-4"/></Button>
                               <Button variant="outline" size="icon" className="text-red-500" onClick={() => handleDelete(m.id)}><Trash2 className="w-4 h-4"/></Button>
                           </TableCell>
                       </TableRow>
                   ))}
               </TableBody>
           </Table>
       </div>

       {/* MODAL JADWAL */}
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
           <DialogContent>
               <DialogHeader><DialogTitle>Edit Data Pertandingan</DialogTitle></DialogHeader>
               <div className="grid gap-4 py-4">
                   <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2"><label>Babak</label><Input value={form.round || ''} onChange={e => setForm({...form, round: e.target.value})} placeholder="R32 / QF / SF" /></div>
                       <div className="space-y-2"><label>Kategori</label><Input value={form.category || ''} onChange={e => setForm({...form, category: e.target.value})} /></div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2"><label>Tim A</label><Input value={form.teamA || ''} onChange={e => setForm({...form, teamA: e.target.value})} /></div>
                       <div className="space-y-2"><label>Tim B</label><Input value={form.teamB || ''} onChange={e => setForm({...form, teamB: e.target.value})} /></div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2"><label>Lapangan (Court)</label><Input type="number" value={form.court || ''} onChange={e => setForm({...form, court: e.target.value})} /></div>
                       <div className="space-y-2"><label>Jam Main</label><Input type="time" value={form.time || ''} onChange={e => setForm({...form, time: e.target.value})} /></div>
                   </div>
               </div>
               <DialogFooter><Button onClick={handleSave}>Simpan Jadwal</Button></DialogFooter>
           </DialogContent>
       </Dialog>
    </div>
  );
}
