
'use client';

import { useState } from "react";
import { 
  Receipt, Plus, Camera, Upload, 
  Clock, CheckCircle2, XCircle, Wallet, 
  ArrowUpRight, FileText, DollarSign, Image as ImageIcon 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const MY_CLAIMS = [
  { 
    id: "CLM-001", 
    title: "Konsumsi Crew Loading (Nasi Padang)", 
    amount: 450000, 
    date: "Today, 12:30", 
    category: "MEALS", 
    status: "PENDING", 
    notes: "Makan siang 15 orang tim logistik."
  },
  { 
    id: "CLM-002", 
    title: "Bensin Mobil Operasional (Innova)", 
    amount: 300000, 
    date: "Yesterday", 
    category: "TRANSPORT", 
    status: "PAID", 
    notes: "Full tank sebelum jemput atlet."
  },
  { 
    id: "CLM-003", 
    title: "Print ID Card Tambahan", 
    amount: 50000, 
    date: "10 Jun 2026", 
    category: "ATK", 
    status: "REJECTED", 
    notes: "Nota tidak terbaca."
  },
];

const CATEGORIES = [
  { id: "MEALS", label: "Konsumsi (F&B)" },
  { id: "TRANSPORT", label: "Transport / BBM" },
  { id: "ATK", label: "Perlengkapan / ATK" },
  { id: "MEDICAL", label: "Obat / Medis" },
  { id: "OTHER", label: "Lainnya" },
];

export default function ReimbursementRequestPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  // Stats Calculation
  const totalPending = MY_CLAIMS.filter(c => c.status === 'PENDING').reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaid = MY_CLAIMS.filter(c => c.status === 'PAID').reduce((acc, curr) => acc + curr.amount, 0);

  const getStatusColor = (s: string) => {
    switch(s) {
        case 'PAID': return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
        case 'REJECTED': return "text-red-500 bg-red-500/10 border-red-500/20";
        default: return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-0 font-body pb-24">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-sky-500 text-sky-500 bg-sky-500/10">
                    <Receipt className="w-3 h-3 mr-2" /> EXPENSE CLAIM
                </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-foreground">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-600">Payouts</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl text-lg">
                Ajukan klaim pengeluaran operasional dengan cepat.
            </p>
        </div>

        <Button 
            onClick={() => setIsFormOpen(true)}
            className="h-14 rounded-full px-8 bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg shadow-lg shadow-sky-500/30 transition-transform active:scale-95"
        >
            <Plus className="mr-2 w-6 h-6"/> NEW CLAIM
        </Button>
      </div>

      {/* --- WALLET STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Total Paid Card */}
         <Card className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-emerald-200 rounded-[32px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px]"></div>
            <CardContent className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 border border-emerald-200">
                        <Wallet className="w-6 h-6"/>
                    </div>
                    <Badge className="bg-emerald-600 text-white font-bold">PAID OUT</Badge>
                </div>
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">Total Reimbursed</p>
                <h2 className="text-4xl font-black text-foreground font-mono tracking-tight">
                    Rp {totalPaid.toLocaleString('id-ID', { notation: "compact" })}
                </h2>
            </CardContent>
         </Card>

         {/* Pending Card */}
         <Card className="bg-card border rounded-[32px] relative overflow-hidden group">
            <CardContent className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-yellow-100 rounded-2xl text-yellow-600 border border-yellow-200">
                        <Clock className="w-6 h-6"/>
                    </div>
                    <Badge variant="outline" className="border-yellow-500 text-yellow-600 font-bold">PROCESSING</Badge>
                </div>
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">Pending Approval</p>
                <h2 className="text-4xl font-black text-foreground font-mono tracking-tight">
                    Rp {totalPending.toLocaleString('id-ID', { notation: "compact" })}
                </h2>
            </CardContent>
         </Card>
      </div>

      {/* --- CLAIM HISTORY LIST --- */}
      <Card className="rounded-[40px] flex flex-col min-h-[400px]">
        <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-500"/> Transaction History
            </CardTitle>
        </CardHeader>
        <ScrollArea className="flex-1 p-8 pt-0">
            <div className="space-y-4">
                {MY_CLAIMS.map((claim) => (
                    <div key={claim.id} className="group relative bg-secondary/50 hover:bg-secondary border rounded-[28px] p-6 transition-all cursor-pointer hover:border-primary/30">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "h-14 w-14 rounded-2xl flex items-center justify-center text-xl font-black",
                                    claim.status === 'PAID' ? "bg-emerald-100 text-emerald-600" : 
                                    claim.status === 'REJECTED' ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                                )}>
                                    {claim.status === 'PAID' ? <CheckCircle2 className="w-7 h-7"/> : 
                                     claim.status === 'REJECTED' ? <XCircle className="w-7 h-7"/> : <Clock className="w-7 h-7"/>}
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground text-lg line-clamp-1">{claim.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-1 font-medium flex items-center gap-2">
                                        <span className="bg-background px-2 py-0.5 rounded border">{claim.category}</span>
                                        <span>•</span>
                                        <span>{claim.date}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <Badge variant="outline" className={cn("mb-2 border font-bold text-[10px]", getStatusColor(claim.status))}>
                                    {claim.status}
                                </Badge>
                                <p className="text-xl font-black text-foreground font-mono">
                                    Rp {claim.amount.toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-background p-3 rounded-xl text-xs text-muted-foreground italic border">
                            "{claim.notes}"
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
      </Card>

      {/* --- NEW CLAIM MODAL --- */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="bg-card text-foreground rounded-[40px] max-w-md p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b bg-sky-500/10">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2 text-sky-600">
                        <DollarSign className="w-6 h-6"/> Claim Expense
                    </DialogTitle>
                    <DialogDescription>Pastikan foto bukti transaksi jelas.</DialogDescription>
                </DialogHeader>
            </div>
            
            <div className="p-8 space-y-6">
                
                {/* Amount Input */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Total Nominal</label>
                    <div className="relative">
                        <span className="absolute left-6 top-5 text-muted-foreground font-bold text-xl">Rp</span>
                        <Input 
                            type="number" 
                            placeholder="0" 
                            className="bg-secondary h-20 rounded-[24px] pl-16 text-4xl font-black font-mono text-foreground focus:ring-sky-500 focus:border-sky-500 placeholder:text-muted-foreground/30" 
                        />
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Keperluan</label>
                    <Input placeholder="Cth: Beli Aqua Galon" className="bg-secondary h-14 rounded-2xl text-lg font-bold" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Kategori</label>
                    <Select>
                        <SelectTrigger className="bg-secondary h-14 rounded-2xl"><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map(c => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                {/* Photo Proof Upload */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Foto Bukti (Resi/Struk)</label>
                    <div 
                        className="h-32 bg-secondary border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-muted-foreground hover:text-foreground hover:border-sky-500/50 hover:bg-sky-500/10 cursor-pointer transition-all group"
                        onClick={() => setUploadedFile("mock-file.jpg")}
                    >
                        {uploadedFile ? (
                            <div className="flex flex-col items-center text-green-500">
                                <CheckCircle2 className="w-10 h-10 mb-2" />
                                <span className="text-xs font-bold">File Attached!</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="p-3 bg-background rounded-full mb-2 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                    <Camera className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold">Tap to Snap / Upload</span>
                            </div>
                        )}
                    </div>
                </div>

                <Button className="w-full h-16 rounded-full font-black text-lg bg-sky-600 hover:bg-sky-700 text-white mt-4 shadow-xl shadow-sky-500/20">
                    SEND CLAIM REQUEST <ArrowUpRight className="ml-2 w-5 h-5"/>
                </Button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
