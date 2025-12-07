'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Store, Image as ImageIcon, Briefcase, Building } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function PartnerManagementPage() {
  const { toast } = useToast();

  const [partners, setPartners] = useState([
      { id: 1, name: "Bank BJB", type: "SPONSOR", package: "Title Sponsor", logo: "bjb.png" },
      { id: 2, name: "Ayo Indonesia", type: "SPONSOR", package: "Main Partner", logo: "ayo.png" },
      { id: 3, name: "Flypower", type: "SPONSOR", package: "Apparel Partner", logo: "flypower.png" },
      { id: 4, name: "Pocari Sweat", type: "SPONSOR", package: "Official Drink", logo: "pocari.png" },
      { id: 5, name: "Kopi Kenangan", type: "TENANT", package: "Booth F&B", logo: "kopi.png" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPartner, setNewPartner] = useState({ name: '', type: 'SPONSOR', package: '' });

  const handleSave = () => {
    if (!newPartner.name || !newPartner.package) {
      toast({ title: "Gagal", description: "Nama dan Paket wajib diisi.", variant: "destructive" });
      return;
    }
    
    const newEntry = {
      id: Date.now(),
      ...newPartner,
      logo: "" // Placeholder
    };

    setPartners([...partners, newEntry]);
    toast({ title: "Sukses!", description: `${newPartner.name} telah ditambahkan.` });
    setIsModalOpen(false);
    setNewPartner({ name: '', type: 'SPONSOR', package: '' }); // Reset form
  };
  
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
            <div>
                <h2 className="text-3xl font-bold font-headline">Manajemen Mitra</h2>
                <p className="text-muted-foreground">Kelola daftar Sponsor dan Tenant untuk event.</p>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                    <Button><Plus className="w-4 h-4 mr-2" /> Tambah Mitra</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Mitra Baru</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Nama Brand / Perusahaan</Label>
                            <Input placeholder="Contoh: Bank BJB" value={newPartner.name} onChange={e => setNewPartner({...newPartner, name: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Tipe Mitra</Label>
                                <Select value={newPartner.type} onValueChange={(v: 'SPONSOR' | 'TENANT') => setNewPartner({...newPartner, type: v})}>
                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SPONSOR">Sponsor</SelectItem>
                                        <SelectItem value="TENANT">Tenant</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Paket / Slot</Label>
                                <Input placeholder="Cth: Platinum / Booth A1" value={newPartner.package} onChange={e => setNewPartner({...newPartner, package: e.target.value})} />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label>Logo Perusahaan</Label>
                            <Input type="file" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSave}>Simpan Mitra</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {partners.map(p => (
              <Card key={p.id} className="relative group overflow-hidden border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                      <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4 border-4 border-background shadow-inner">
                          {/* Image Placeholder */}
                          <ImageIcon className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <div>
                          <h3 className="font-bold text-lg">{p.name}</h3>
                          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground uppercase mt-1">
                              {p.type === 'SPONSOR' ? <Briefcase className="w-3 h-3"/> : <Store className="w-3 h-3"/>}
                              <span>{p.type} • {p.package}</span>
                          </div>
                      </div>
                      <div className="flex gap-2 w-full pt-4">
                          <Button variant="outline" className="flex-1 text-xs">Edit</Button>
                          <Button variant="destructive" className="flex-1 text-xs">Hapus</Button>
                      </div>
                  </CardContent>
              </Card>
          ))}
          
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <button className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:bg-secondary/20 hover:border-primary/50 transition-colors h-full min-h-[260px]">
                    <Plus className="w-10 h-10 mb-2" />
                    <span className="font-bold">Tambah Mitra</span>
                </button>
            </DialogTrigger>
          </Dialog>
       </div>
    </div>
  );
}
