'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, UserPlus, FileBadge, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getMandates, createMandate, type Mandate } from "./actions";

// Tugas sesuai dokumen 
const OFFICIAL_DUTIES = [
  { id: "audit", label: "Verifikasi Pra-Event (Audit Video Gameplay)" },
  { id: "spotcheck", label: "Pengawasan Lapangan (Spot Check & Identifikasi Joki)" },
  { id: "dispute", label: "Investigasi Sengketa & Rekomendasi Sanksi" },
  { id: "report", label: "Pelaporan Berkala ke Koordinator Pertandingan" }
];

export default function AssignmentPage() {
  const { toast } = useToast();
  const [mandates, setMandates] = useState<Mandate[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  
  // Form State
  const [form, setForm] = useState({
    name: "",
    role: "Anggota TPF",
    refNumber: "002/SPT-TPF/BCC/XII/2026", // Auto-generated pattern [cite: 16]
    selectedDuties: [] as string[]
  });

  useEffect(() => {
    getMandates().then(setMandates);
  }, []);

  const handleDutyToggle = (label: string) => {
    setForm(prev => {
      const exists = prev.selectedDuties.includes(label);
      return {
        ...prev,
        selectedDuties: exists 
          ? prev.selectedDuties.filter(d => d !== label)
          : [...prev.selectedDuties, label]
      };
    });
  };

  const handleSubmit = async () => {
    if (!form.name) return toast({ title: "Error", description: "Nama wajib diisi", variant: "destructive" });
    
    setIsCreating(true);
    await createMandate({
        assigneeName: form.name,
        role: form.role,
        refNumber: form.refNumber,
        duties: form.selectedDuties
    });
    setIsCreating(false);
    
    toast({ title: "Sukses", description: `${form.name} telah resmi ditugaskan.` });
    getMandates().then(setMandates); // Refresh list
    setForm({ ...form, name: "", selectedDuties: [] }); // Reset
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold font-headline text-primary">Digital Assignment</h2>
            <p className="text-muted-foreground">Penerbitan Surat Perintah Tugas (SPT) Digital.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: FORM PENUGASAN */}
        <Card className="lg:col-span-1 h-fit">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-primary" /> Tugas Baru
                </CardTitle>
                <CardDescription>Dasar: SK Project Director No. 001/SK/BCC/XII/2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Nomor Surat Tugas</Label>
                    <Input value={form.refNumber} onChange={e => setForm({...form, refNumber: e.target.value})} className="font-mono text-xs bg-secondary/20" />
                </div>
                
                <div className="space-y-2">
                    <Label>Nama Personil</Label>
                    <Input placeholder="Nama Lengkap" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>

                <div className="space-y-2">
                    <Label>Jabatan Fungsional</Label>
                    <Select onValueChange={v => setForm({...form, role: v})} defaultValue={form.role}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Koordinator TPF">Koordinator TPF</SelectItem>
                            <SelectItem value="Anggota TPF">Anggota TPF</SelectItem>
                            <SelectItem value="Delegasi PBSI">Delegasi PBSI</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3 pt-2 border-t">
                    <Label>Lingkup Tugas (Checklist):</Label>
                    {OFFICIAL_DUTIES.map((d) => (
                        <div key={d.id} className="flex items-start space-x-2">
                            <Checkbox 
                                id={d.id} 
                                checked={form.selectedDuties.includes(d.label)}
                                onCheckedChange={() => handleDutyToggle(d.label)}
                            />
                            <Label htmlFor={d.id} className="font-normal text-xs cursor-pointer leading-tight">
                                {d.label}
                            </Label>
                        </div>
                    ))}
                </div>

                <Button onClick={handleSubmit} disabled={isCreating} className="w-full bg-primary">
                    {isCreating ? "Menerbitkan..." : "Terbitkan Mandat Digital"}
                </Button>
            </CardContent>
        </Card>

        {/* KOLOM KANAN: DAFTAR PERSONIL AKTIF */}
        <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" /> Personil Bertugas Aktif
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mandates.map((m) => (
                    <Card key={m.id} className="relative overflow-hidden hover:shadow-md transition-shadow group">
                        {/* Visual Badge Background */}
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FileBadge className="w-24 h-24 text-primary" />
                        </div>

                        <CardContent className="p-5 relative z-10">
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    {m.status}
                                </Badge>
                                <span className="text-[10px] font-mono text-muted-foreground">{m.refNumber}</span>
                            </div>
                            
                            <h4 className="font-bold text-lg">{m.assigneeName}</h4>
                            <p className="text-sm font-bold text-primary mb-3">{m.role}</p>
                            
                            <div className="space-y-1 bg-secondary/10 p-3 rounded text-xs text-muted-foreground">
                                <p className="font-bold text-foreground text-[10px] uppercase mb-1">Wewenang:</p>
                                <ul className="list-disc pl-4 space-y-0.5">
                                    {m.duties.map((duty, idx) => (
                                        <li key={idx}>{duty}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-4 flex justify-between items-center pt-3 border-t">
                                <span className="text-[10px] text-muted-foreground">Berlaku s/d Akhir Event</span>
                                <Button variant="ghost" size="sm" className="h-6 text-red-500 hover:text-red-700 hover:bg-red-50">
                                    <Trash2 className="w-3 h-3 mr-1" /> Cabut
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}
