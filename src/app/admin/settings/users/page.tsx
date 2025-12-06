'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, UserPlus, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Schema Data (Sesuai Database Backend)
type UserData = {
  id: string;
  name: string;
  role: string; // ENUM: DIRECTOR, FINANCE, MATCH_COORD, dll
  pin: string;
  phone: string;
  status: 'ACTIVE' | 'SUSPENDED';
};

export default function UserManagementPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserData[]>([
    { id: "1", name: "Irsyad Jamal", role: "DIRECTOR", pin: "001", phone: "08123...", status: "ACTIVE" },
    { id: "2", name: "Selvi Yulia", role: "FINANCE", pin: "102", phone: "08567...", status: "ACTIVE" },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<UserData>>({});

  const handleSave = async () => {
    // 1. Validasi Frontend
    if (!formData.name || !formData.role || !formData.pin) {
        return toast({ title: "Data Tidak Lengkap", variant: "destructive" });
    }

    // 2. Integrasi Backend (Simulasi)
    // await api.post('/users', formData);
    
    if (formData.id) {
        // Mode Edit
        setUsers(users.map(u => u.id === formData.id ? { ...u, ...formData } as UserData : u));
        toast({ title: "User Diperbarui" });
    } else {
        // Mode Create
        const newUser = { ...formData, id: Date.now().toString(), status: 'ACTIVE' } as UserData;
        setUsers([...users, newUser]);
        toast({ title: "User Baru Ditambahkan" });
    }
    setIsModalOpen(false);
    setFormData({});
  };

  const handleDelete = (id: string) => {
      if(confirm("Hapus akses user ini?")) {
          setUsers(users.filter(u => u.id !== id));
          toast({ title: "User Dihapus" });
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-headline">Manajemen Akses Panitia</h2>
        <Button onClick={() => { setFormData({}); setIsModalOpen(true); }}>
            <UserPlus className="w-4 h-4 mr-2" /> Tambah Personil
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>PIN Akses</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
                        <TableCell className="font-mono flex items-center gap-2">
                            <KeyRound className="w-3 h-3 text-muted-foreground"/> {user.pin}
                        </TableCell>
                        <TableCell>
                            <Badge className={user.status === 'ACTIVE' ? 'bg-green-600' : 'bg-red-600'}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => { setFormData(user); setIsModalOpen(true); }}>
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDelete(user.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </div>

      {/* FORM MODAL (CREATE/EDIT) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
            <DialogHeader><DialogTitle>{formData.id ? 'Edit User' : 'Tambah User Baru'}</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Nama Lengkap</label>
                    <Input value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Nama Panitia" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Role / Jabatan</label>
                        <Select value={formData.role} onValueChange={v => setFormData({...formData, role: v})}>
                            <SelectTrigger><SelectValue placeholder="Pilih Role" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DIRECTOR">Project Director</SelectItem>
                                <SelectItem value="FINANCE">Finance / Bendahara</SelectItem>
                                <SelectItem value="MATCH_COORD">Match Control</SelectItem>
                                <SelectItem value="REFEREE">Referee</SelectItem>
                                <SelectItem value="TPF">Tim TPF</SelectItem>
                                <SelectItem value="GATE">Gate Keeper</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">PIN Login (6 Digit)</label>
                        <Input value={formData.pin || ''} onChange={e => setFormData({...formData, pin: e.target.value})} placeholder="Contoh: 123456" maxLength={6} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">No. HP (WhatsApp)</label>
                    <Input value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="08..." />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={handleSave}>Simpan Data</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
