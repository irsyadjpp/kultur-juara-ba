'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Package, BoxSelect, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock Data (Backend: table 'assets')
const MOCK_ASSETS = [
  { id: 1, name: "Handy Talky (HT)", qty: 20, condition: "BAIK", location: "Posko Utama" },
  { id: 2, name: "Meja Wasit", qty: 5, condition: "BAIK", location: "Lapangan" },
  { id: 3, name: "Kabel Roll 10m", qty: 8, condition: "RUSAK RINGAN", location: "Gudang" },
];

export default function GeneralInventoryPage() {
  const { toast } = useToast();
  const [assets, setAssets] = useState(MOCK_ASSETS);
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState<any>({});

  const handleSave = () => {
      if(!newItem.name || !newItem.qty) return;
      setAssets([...assets, { id: Date.now(), ...newItem, condition: "BAIK" }]);
      setIsOpen(false);
      setNewItem({});
      toast({ title: "Aset Tercatat" });
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
           <h2 className="text-3xl font-bold font-headline">Inventaris Umum</h2>
           <Button onClick={() => setIsOpen(true)}><Plus className="w-4 h-4 mr-2"/> Catat Aset Baru</Button>
       </div>

       <div className="rounded-md border">
           <Table>
               <TableHeader>
                   <TableRow>
                       <TableHead>Nama Barang</TableHead>
                       <TableHead>Jumlah</TableHead>
                       <TableHead>Kondisi</TableHead>
                       <TableHead>Lokasi</TableHead>
                       <TableHead className="w-[50px]"></TableHead>
                   </TableRow>
               </TableHeader>
               <TableBody>
                   {assets.map((item) => (
                       <TableRow key={item.id}>
                           <TableCell className="font-medium">{item.name}</TableCell>
                           <TableCell>{item.qty} Unit</TableCell>
                           <TableCell>{item.condition}</TableCell>
                           <TableCell>{item.location}</TableCell>
                           <TableCell><Button variant="ghost" size="sm"><Trash2 className="w-4 h-4 text-red-500"/></Button></TableCell>
                       </TableRow>
                   ))}
               </TableBody>
           </Table>
       </div>

       {/* MODAL INPUT */}
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
           <DialogContent>
               <DialogHeader><DialogTitle>Input Barang Masuk</DialogTitle></DialogHeader>
               <div className="space-y-3 py-4">
                   <Input placeholder="Nama Barang (Cth: Kursi Plastik)" onChange={e => setNewItem({...newItem, name: e.target.value})} />
                   <div className="grid grid-cols-2 gap-3">
                       <Input type="number" placeholder="Jumlah" onChange={e => setNewItem({...newItem, qty: e.target.value})} />
                       <Input placeholder="Lokasi Simpan" onChange={e => setNewItem({...newItem, location: e.target.value})} />
                   </div>
               </div>
               <DialogFooter><Button onClick={handleSave}>Simpan Data</Button></DialogFooter>
           </DialogContent>
       </Dialog>
    </div>
  );
}
