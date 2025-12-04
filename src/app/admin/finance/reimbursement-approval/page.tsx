'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { getReimbursements, processReimbursement, type ReimbursementRequest } from "../actions";
import { CheckCircle2, XCircle, Eye, Wallet, AlertCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from '@/components/ui/textarea';

export default function ReimbursementApprovalPage() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<ReimbursementRequest[]>([]);
  const [selectedReq, setSelectedReq] = useState<ReimbursementRequest | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    // Load Data
    getReimbursements().then(setRequests);
  }, []);

  const handleProcess = async (action: 'APPROVE' | 'REJECT' | 'PAY') => {
    if (!selectedReq) return;
    
    if (action === 'REJECT' && !rejectReason) return alert("Isi alasan penolakan!");

    const res = await processReimbursement(selectedReq.id, action, rejectReason);
    if (res.success) {
        toast({ title: "Berhasil", description: `Status klaim diperbarui menjadi ${action}` });
        setIsDetailOpen(false);
        setRejectReason("");
        // Refresh Data Local
        setRequests(prev => prev.map(r => r.id === selectedReq.id ? { ...r, status: action === 'APPROVE' ? 'APPROVED' : action === 'PAY' ? 'PAID' : 'REJECTED' } : r));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold font-headline">Persetujuan Reimbursement</h2>
            <p className="text-muted-foreground">Verifikasi dan pembayaran klaim panitia.</p>
        </div>
        <div className="flex gap-2">
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending: {requests.filter(r => r.status === 'PENDING').length}</Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Siap Bayar: {requests.filter(r => r.status === 'APPROVED').length}</Badge>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID & Tanggal</TableHead>
                        <TableHead>Pemohon</TableHead>
                        <TableHead>Total Klaim</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((req) => (
                        <TableRow key={req.id}>
                            <TableCell>
                                <div className="font-mono text-xs">{req.id}</div>
                                <div className="text-xs text-muted-foreground">{req.date}</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{req.applicantName}</div>
                                <Badge variant="secondary" className="text-[10px]">{req.division}</Badge>
                            </TableCell>
                            <TableCell className="font-bold">Rp {req.totalAmount.toLocaleString('id-ID')}</TableCell>
                            <TableCell>
                                {req.status === 'PENDING' && <Badge className="bg-yellow-500 hover:bg-yellow-600">Menunggu Review</Badge>}
                                {req.status === 'APPROVED' && <Badge className="bg-blue-500 hover:bg-blue-600">Disetujui (Belum Bayar)</Badge>}
                                {req.status === 'PAID' && <Badge className="bg-green-600 hover:bg-green-700">Lunas / Selesai</Badge>}
                                {req.status === 'REJECTED' && <Badge variant="destructive">Ditolak</Badge>}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" variant="ghost" onClick={() => { setSelectedReq(req); setIsDetailOpen(true); }}>
                                    <Eye className="w-4 h-4" /> Detail
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>

      {/* MODAL DETAIL */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Detail Pengajuan: {selectedReq?.id}</DialogTitle>
                <DialogDescription>Diajukan oleh {selectedReq?.applicantName} ({selectedReq?.division})</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="bg-secondary/20 p-3 rounded-lg space-y-1">
                        <p className="text-xs text-muted-foreground uppercase font-bold">Rekening Tujuan</p>
                        <p className="font-mono text-sm">{selectedReq?.bankName} - {selectedReq?.accountNumber}</p>
                        <p className="text-sm font-medium">{selectedReq?.accountHolder}</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                         <h4 className="font-bold mb-2 text-sm">Bukti Transaksi</h4>
                         <div className="aspect-video bg-gray-100 rounded flex items-center justify-center text-muted-foreground text-sm">
                             <FileText className="w-6 h-6 mr-2" /> Preview Gambar/PDF
                         </div>
                         <Button variant="link" size="sm" className="w-full mt-1">Buka Gambar Full</Button>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-3 text-sm">Rincian Item</h4>
                    <Table>
                        <TableBody>
                            {selectedReq?.items.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell className="py-2">
                                        <div className="font-medium text-sm">{item.description}</div>
                                        <div className="text-xs text-muted-foreground">{item.category}</div>
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-sm py-2">
                                        {item.amount.toLocaleString('id-ID')}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow className="bg-secondary/30 font-bold">
                                <TableCell>TOTAL</TableCell>
                                <TableCell className="text-right text-lg">Rp {selectedReq?.totalAmount.toLocaleString('id-ID')}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 pt-4 border-t">
                {/* TOMBOL AKSI BERDASARKAN STATUS */}
                
                {selectedReq?.status === 'PENDING' && (
                    <div className="flex gap-2 w-full justify-end">
                        <div className="flex-1 mr-2">
                             <Textarea 
                                placeholder="Alasan jika menolak..." 
                                value={rejectReason} 
                                onChange={e => setRejectReason(e.target.value)}
                                className="h-10 min-h-0 resize-none text-xs"
                             />
                        </div>
                        <Button variant="destructive" onClick={() => handleProcess('REJECT')}>
                            <XCircle className="w-4 h-4 mr-2" /> Tolak
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleProcess('APPROVE')}>
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Setujui (Verifikasi)
                        </Button>
                    </div>
                )}

                {selectedReq?.status === 'APPROVED' && (
                    <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg" onClick={() => handleProcess('PAY')}>
                        <Wallet className="w-5 h-5 mr-2" /> Tandai Sudah Ditransfer (Lunas)
                    </Button>
                )}

                {selectedReq?.status === 'PAID' && (
                    <div className="flex items-center justify-center w-full text-green-600 font-bold gap-2 bg-green-50 p-2 rounded">
                        <CheckCircle2 className="w-5 h-5" /> Transaksi Selesai
                    </div>
                )}
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
