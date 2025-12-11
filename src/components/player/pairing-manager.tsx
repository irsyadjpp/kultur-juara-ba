'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, UserPlus, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validatePairingAndGetPrice } from "@/lib/game-logic";

// Mock Data (Simulasi data user yang sedang login)
const currentUser = { name: "Irsyad", level: "beginner" };

export function PairingManager() {
  const { toast } = useToast();
  const [partnerCode, setPartnerCode] = useState("");
  const [status, setStatus] = useState<'idle' | 'checking' | 'confirming' | 'sent'>('idle');
  const [simulation, setSimulation] = useState<any>(null);

  // 1. Cek Level & Hitung Biaya (Tanpa Invite Dulu)
  const handleCheckPartner = async () => {
    setStatus('checking');
    
    // SIMULASI Fetch Partner dari Server
    // Di real app: const partner = await fetchPartnerByCode(partnerCode);
    const mockPartner = { name: "Budi (Contoh)", level: "intermediate" }; // Anggap partner Intermediate

    // Gunakan Logic Library yang sudah dibuat sebelumnya
    const result = validatePairingAndGetPrice(currentUser.level as any, mockPartner.level as any);

    if (!result.isValid) {
        toast({ variant: "destructive", title: "Gagal", description: result.reason });
        setStatus('idle');
        return;
    }

    setSimulation({ ...result, partnerName: mockPartner.name, partnerLevel: mockPartner.level });
    setStatus('confirming');
  };

  // 2. Kirim Invite (Handshake Start)
  const handleSendInvite = () => {
    // Server Action: createInvitation(currentUser.id, partnerId)
    setStatus('sent');
    toast({ title: "Undangan Terkirim", description: "Menunggu persetujuan partner." });
  };

  return (
    <div className="space-y-6">
      {status === 'idle' && (
        <div className="flex gap-2">
            <Input 
                placeholder="Masukan Kode Partner (ATH-XXXX)" 
                value={partnerCode}
                onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                className="font-mono uppercase"
            />
            <Button onClick={handleCheckPartner} disabled={!partnerCode}>
                Cek
            </Button>
        </div>
      )}

      {/* KONFIRMASI & TRANSPARANSI BIAYA */}
      {status === 'confirming' && simulation && (
        <Card className="bg-secondary/20 border-primary/20">
            <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-dashed border-foreground/10">
                    <div>
                        <p className="text-sm text-muted-foreground">Partner Ditemukan</p>
                        <p className="font-bold text-lg">{simulation.partnerName}</p>
                        <Badge variant="outline" className="mt-1">{simulation.partnerLevel}</Badge>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Level Anda</p>
                        <Badge variant="outline" className="mt-1">{currentUser.level}</Badge>
                    </div>
                </div>

                <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-xl flex gap-3 items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-yellow-800 dark:text-yellow-200">Penyesuaian Kategori</p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-300">
                            Karena partner Anda level {simulation.partnerLevel}, tim masuk kategori <span className="font-black uppercase">{simulation.category}</span>.
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground">Biaya Per Orang</p>
                        <p className="text-2xl font-black font-mono">Rp {simulation.pricePerPerson.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => setStatus('idle')}>Batal</Button>
                        <Button onClick={handleSendInvite} className="bg-primary text-white">
                            <UserPlus className="w-4 h-4 mr-2" /> Undang Partner
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
      )}

      {/* STATUS PENDING */}
      {status === 'sent' && (
        <div className="text-center p-8 border-2 border-dashed rounded-xl bg-secondary/10">
            <div className="animate-pulse bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h3 className="font-bold text-lg">Menunggu Persetujuan</h3>
            <p className="text-muted-foreground text-sm">Notifikasi telah dikirim ke {simulation?.partnerName}.</p>
            <Button variant="link" className="text-destructive mt-2" onClick={() => setStatus('idle')}>Batalkan Undangan</Button>
        </div>
      )}
    </div>
  );
}