

'use client';

import { useActionState } from "react"; 
import { useFormStatus } from "react-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Loader2, CheckCircle, XCircle, AlertCircle, Download, FileText, CreditCard, UserCheck } from "lucide-react";
import { checkRegistrationStatus } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const initialState = {
  success: false,
  message: "",
  data: null as any,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" size="lg" className="h-12 px-8" disabled={pending}>
      {pending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Search className="w-4 h-4 mr-2" />}
      {pending ? "Mencari..." : "Cari Data"}
    </Button>
  );
}

export default function StatusPage() {
  const [state, formAction] = useActionState(checkRegistrationStatus, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        title: "Pencarian Gagal",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  // Simulasi Download ID Card
  const handleDownload = (docName: string) => {
    toast({
      title: "Mengunduh...",
      description: `Sedang menyiapkan dokumen ${docName}.`,
    });
    setTimeout(() => {
        toast({
            title: "Berhasil!",
            description: "Dokumen telah disimpan di perangkat Anda.",
            className: "bg-green-600 text-white border-none"
        });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-16 px-4 md:px-8 bg-secondary/10">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* SEARCH BOX */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-black font-headline text-primary">Cek Status Pendaftaran</h1>
            <p className="text-muted-foreground">
              Masukkan <strong>Nomor WhatsApp</strong> atau <strong>Email Manajer</strong> untuk melihat status pembayaran dan verifikasi pemain.
            </p>
            
            <Card className="p-6 border-2 border-primary/20 shadow-lg">
              <form action={formAction} className="flex flex-col sm:flex-row gap-4">
                <Input 
                  name="query" 
                  placeholder="Contoh: 08123456789 atau budi@example.com" 
                  className="h-12 text-lg"
                  required
                />
                <SubmitButton />
              </form>
            </Card>
          </div>

          {/* HASIL PENCARIAN */}
          {state.success && state.data && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                
                {/* 1. STATUS TIM & PEMBAYARAN */}
                <Card className="overflow-hidden border-t-4 border-t-primary">
                    <CardHeader className="bg-secondary/20 pb-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <CardTitle className="text-2xl font-bold font-headline text-primary">{state.data.teamName}</CardTitle>
                                <CardDescription className="flex items-center gap-2 mt-1">
                                    <UserCheck className="w-4 h-4" /> {state.data.manager} ({state.data.category})
                                </CardDescription>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Status Pembayaran</div>
                                {state.data.paymentStatus === 'PAID' && 
                                    <Badge className="bg-green-600 text-base px-4 py-1 hover:bg-green-700"><CheckCircle className="w-4 h-4 mr-2"/> LUNAS</Badge>}
                                {state.data.paymentStatus === 'PENDING' && 
                                    <Badge className="bg-yellow-500 text-base px-4 py-1 hover:bg-yellow-600 text-yellow-950"><AlertCircle className="w-4 h-4 mr-2"/> MENUNGGU KONFIRMASI</Badge>}
                                {state.data.paymentStatus === 'REJECTED' && 
                                    <Badge variant="destructive" className="text-base px-4 py-1"><XCircle className="w-4 h-4 mr-2"/> DITOLAK</Badge>}
                            </div>
                        </div>
                    </CardHeader>
                    
                    {/* Tombol Download Dokumen (Hanya muncul jika sudah Lunas) */}
                    {state.data.paymentStatus === 'PAID' && (
                        <div className="p-4 bg-blue-50 border-b border-blue-100 flex flex-wrap gap-3">
                            <Button size="sm" variant="outline" onClick={() => handleDownload("ID Card")} className="bg-white text-blue-700 border-blue-200 hover:bg-blue-100">
                                <Download className="w-4 h-4 mr-2" /> Unduh ID Card
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDownload("Formulir Waiver")} className="bg-white text-blue-700 border-blue-200 hover:bg-blue-100">
                                <FileText className="w-4 h-4 mr-2" /> Unduh Lembar Pernyataan (Waiver)
                            </Button>
                             <Button size="sm" variant="outline" onClick={() => handleDownload("Kwitansi")} className="bg-white text-blue-700 border-blue-200 hover:bg-blue-100">
                                <CreditCard className="w-4 h-4 mr-2" /> Unduh Kwitansi
                            </Button>
                        </div>
                    )}
                </Card>

                {/* 2. STATUS PEMAIN (TPF) */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Status Verifikasi Pemain (TPF)</CardTitle>
                        <CardDescription>
                            Pastikan seluruh pemain berstatus <strong>APPROVED</strong> sebelum Technical Meeting.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Pemain</TableHead>
                                        <TableHead>NIK</TableHead>
                                        <TableHead>Status TPF</TableHead>
                                        <TableHead>Catatan</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {state.data.players.map((player: any, idx: number) => (
                                        <TableRow key={idx}>
                                            <TableCell className="font-medium">{player.name}</TableCell>
                                            <TableCell className="text-muted-foreground font-mono text-xs">{player.nik}</TableCell>
                                            <TableCell>
                                                {player.status === 'APPROVED' && <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Lolos</Badge>}
                                                {player.status === 'PENDING' && <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Sedang Dicek</Badge>}
                                                {player.status === 'REJECTED' && <Badge variant="destructive">Ditolak</Badge>}
                                                {player.status === 'UPGRADE REQUIRED' && <Badge className="bg-blue-600 hover:bg-blue-700">Wajib Naik Level</Badge>}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground italic">
                                                {player.note !== '-' ? player.note : ''}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-secondary/10 p-4 text-xs text-muted-foreground">
                        *Keputusan Tim Pencari Fakta (TPF) bersifat mutlak. Jika status "Ditolak" atau "Naik Level", silakan hubungi panitia untuk revisi roster sebelum batas waktu.
                    </CardFooter>
                </Card>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}

