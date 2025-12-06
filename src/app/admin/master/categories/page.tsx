'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Settings2 } from "lucide-react";

// Mock Data
const MOCK_CATS = [
  { id: 1, name: "Beregu PUTRA", fee: 150000, quota: 16, gender: "MALE" },
  { id: 2, name: "Beregu PUTRI", fee: 150000, quota: 8, gender: "FEMALE" },
];

export default function CategoryMasterPage() {
  const [cats, setCats] = useState(MOCK_CATS);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<any>({});

  const handleSave = () => {
      if (form.id) {
          setCats(cats.map(c => c.id === form.id ? form : c));
      } else {
          setCats([...cats, { ...form, id: Date.now() }]);
      }
      setIsOpen(false);
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
           <h2 className="text-3xl font-bold font-headline">Kategori Pertandingan</h2>
           <Button onClick={() => { setForm({}); setIsOpen(true); }}><Plus className="w-4 h-4 mr-2"/> Tambah Kategori</Button>
       </div>

       <div className="rounded-md border">
           <Table>
               <TableHeader>
                   <TableRow>
                       <TableHead>Nama Kategori</TableHead>
                       <TableHead>Gender</TableHead>
                       <TableHead>Biaya (Rp)</TableHead>
                       <TableHead>Kuota Tim</TableHead>
                       <TableHead className="text-right">Aksi</TableHead>
                   </TableRow>
               </TableHeader>
               <TableBody>
                   {cats.map((c) => (
                       <TableRow key={c.id}>
                           <TableCell className="font-bold">{c.name}</TableCell>
                           <TableCell>{c.gender}</TableCell>
                           <TableCell>Rp {c.fee.toLocaleString()}</TableCell>
                           <TableCell>{c.quota} Tim</TableCell>
                           <TableCell className="text-right">
                               <Button variant="ghost" size="icon" onClick={() => { setForm(c); setIsOpen(true); }}><Settings2 className="w-4 h-4"/></Button>
                           </TableCell>
                       </TableRow>
                   ))}
               </TableBody>
           </Table>
       </div>

       {/* MODAL */}
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
           <DialogContent>
               <DialogHeader><DialogTitle>Konfigurasi Kategori</DialogTitle></DialogHeader>
               <div className="grid gap-4 py-4">
                   <div className="space-y-2"><label>Nama Kategori</label><Input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} /></div>
                   <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2"><label>Biaya Daftar</label><Input type="number" value={form.fee || ''} onChange={e => setForm({...form, fee: Number(e.target.value)})} /></div>
                       <div className="space-y-2"><label>Kuota Tim</label><Input type="number" value={form.quota || ''} onChange={e => setForm({...form, quota: Number(e.target.value)})} /></div>
                   </div>
               </div>
               <DialogFooter><Button onClick={handleSave}>Simpan Perubahan</Button></DialogFooter>
           </DialogContent>
       </Dialog>
    </div>
  );
}
