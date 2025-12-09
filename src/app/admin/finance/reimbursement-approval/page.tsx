'use client';

import { useState } from "react";
import { 
  Receipt, CheckCircle2, XCircle, Clock, 
  Filter, Eye, AlertTriangle, ArrowUpRight, 
  FileText, Download, DollarSign, Wallet
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

// --- MOCK DATA ---
const REQUESTS = [
  { 
    id: "R-1023", 
    requester: { name: "Rian Ardianto", role: "Logistics", avatar: "" },
    title: "Beli Es Batu & Galon (3 Hari)", 
    amount: 450000, 
    date: "Today, 09:30", 
    category: "CONSUMPTION", 
    status: "PENDING", 
    proof: "/images/receipt-mock.jpg",
    notes: "Untuk kebutuhan court dan medis selama babak penyisihan."
  },
  { 
    id: "R-1022", 
    requester: { name: "Sidiq", role: "Security", avatar: "" },
    title: "Uang Makan Lembur Guard (Malam)", 
    amount: 250000, 
    date: "Yesterday, 23:15", 
    category: "MEALS", 
    status: "PENDING", 
    proof: "",
    notes: "Shift malam jaga alat sound system."
  },
  { 
    id: "R-1021", 
    requester: { name: "Kevin Sanjaya", role: "Media", avatar: "https://github.com/shadcn.png" },
    title: "Sewa Lensa Kamera Tambahan", 
    amount: 1200000, 
    date: "Yesterday, 14:00", 
    category: "EQUIPMENT", 
    status: "APPROVED", 
    proof: "",
    notes: "Lensa tele untuk foto aksi di lapangan utama."
  },
  { 
    id: "R-1020", 
    requester: { name: "Fajar Alfian", role: "Match Control", avatar: "" },
    title: "Print Score Sheet Cadangan", 
    amount: 75000, 
    date: "12 Jun 2026", 
    category: "ATK", 
    status: "REJECTED", 
    proof: "",
    notes: "Score sheet habis mendadak."
  },
];

export default function ReimbursementPage() {
  const [selectedReq, setSelectedReq] = useState<typeof REQUESTS[0] | null>(null);
  const [activeTab, setActiveTab] = useState("pending");

  // Filter Logic
  const filteredRequests = REQUESTS.filter(r => 
    activeTab === "pending" ? r.status === "PENDING" : r.status !== "PENDING"
  );

  const totalPending = REQUESTS.filter(r => r.status === "PENDING").reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-blue-500 text-blue-500 bg-blue-500/10 backdrop-blur-md">
                    <Wallet className="w-3 h-3 mr-2" /> FINANCE APPROVAL
                </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-white">
                Expense <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Control</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Validasi pengeluaran tim dan jaga cash flow tetap sehat.
            </p>
        </div>

        {/* SUMMARY CARD (Mobile & Desktop) */}
        <Card className="bg-zinc-900 border-zinc-800 rounded-[28px] p-1 shadow-2xl min-w-[250px]">
            <CardContent className="p-5 flex items-center justify-between gap-4">
                <div>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Total Pending</p>
                    <p className="text-2xl font-black text-white font-mono">Rp {totalPending.toLocaleString('id-ID', {notation: "compact"})}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                    <AlertTriangle className="w-5 h-5" />
                </div>
            </CardContent>
        </Card>
      </div>

      {/* --- TABS & LIST --- */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-[40px] p-2 backdrop-blur-sm">
        <Tabs defaultValue="pending" className="w-full" onValueChange={setActiveTab}>
            
            <div className="flex items-center justify-between px-4 py-4 overflow-x-auto">
                <TabsList className="bg-zinc-950 p-1 rounded-full h-14 border border-zinc-800 shrink-0">
                    <TabsTrigger value="pending" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        NEEDS ACTION
                        <Badge className="ml-2 bg-red-600 text-white border-none h-5 px-1.5">{REQUESTS.filter(r => r.status === 'PENDING').length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="history" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        HISTORY
                    </TabsTrigger>
                </TabsList>

                <Button variant="ghost" size="icon" className="rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 ml-2">
                    <Filter className="w-5 h-5" />
                </Button>
            </div>

            <div className="px-2 pb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-2">
                    {filteredRequests.map((req) => (
                        <div 
                            key={req.id} 
                            onClick={() => setSelectedReq(req)}
                            className="group relative bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-[32px] p-6 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
                        >
                            {/* Status Indicator Bar */}
                            <div className={cn(
                                "absolute left-0 top-0 bottom-0 w-1.5",
                                req.status === 'PENDING' ? "bg-yellow-500" : 
                                req.status === 'APPROVED' ? "bg-green-500" : "bg-red-500"
                            )}></div>

                            <div className="flex justify-between items-start mb-4 pl-2">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 border border-zinc-700">
                                        <AvatarImage src={req.requester.avatar} />
                                        <AvatarFallback className="bg-zinc-800 text-xs font-bold text-zinc-400">
                                            {req.requester.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-bold text-white leading-none">{req.requester.name}</p>
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1">{req.requester.role}</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="border-zinc-800 bg-zinc-950 text-zinc-400 text-[10px] font-bold">
                                    {req.category}
                                </Badge>
                            </div>

                            <div className="pl-2 space-y-1">
                                <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                                    {req.title}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xs text-zinc-500 font-medium">Rp</span>
                                    <span className="text-2xl font-black text-white font-mono tracking-tight">
                                        {req.amount.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-zinc-800 pl-2 flex justify-between items-center">
                                <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                                    <Clock className="w-3.5 h-3.5" /> {req.date}
                                </div>
                                {req.status === 'PENDING' ? (
                                    <Button size="sm" className="h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold px-4">
                                        Review
                                    </Button>
                                ) : (
                                    <Badge className={cn("rounded-full px-3", 
                                        req.status === 'APPROVED' ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                                    )}>
                                        {req.status}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                
                {filteredRequests.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                        <CheckCircle2 className="w-16 h-16 mb-4 opacity-20" />
                        <p className="font-bold uppercase tracking-widest">All Clear</p>
                        <p className="text-sm">Tidak ada permintaan di sini.</p>
                    </div>
                )}
            </div>
        </Tabs>
      </div>

      {/* --- DETAIL SHEET (SLIDE OVER) --- */}
      <Sheet open={!!selectedReq} onOpenChange={() => setSelectedReq(null)}>
        <SheetContent className="w-full sm:max-w-md bg-zinc-950 border-l border-zinc-800 p-0 overflow-y-auto">
            {selectedReq && (
                <div className="flex flex-col h-full">
                    
                    {/* Header Visual */}
                    <div className="h-40 bg-zinc-900 relative flex items-end p-6 border-b border-zinc-800">
                        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px]"></div>
                        
                        <div className="relative z-10 w-full">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Total Request</p>
                                    <h2 className="text-4xl font-black text-white font-mono tracking-tighter">
                                        Rp {selectedReq.amount.toLocaleString('id-ID')}
                                    </h2>
                                </div>
                                <div className={cn(
                                    "p-2 rounded-xl",
                                    selectedReq.status === 'PENDING' ? "bg-yellow-500/20 text-yellow-500" :
                                    selectedReq.status === 'APPROVED' ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                                )}>
                                    {selectedReq.status === 'PENDING' ? <Clock className="w-6 h-6"/> : 
                                     selectedReq.status === 'APPROVED' ? <CheckCircle2 className="w-6 h-6"/> : <XCircle className="w-6 h-6"/>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-8 flex-1">
                        
                        {/* Requester Info */}
                        <div className="flex items-center gap-4 bg-zinc-900/50 p-4 rounded-[24px] border border-zinc-800">
                            <Avatar className="w-12 h-12 border-2 border-zinc-800">
                                <AvatarImage src={selectedReq.requester.avatar} />
                                <AvatarFallback className="bg-zinc-900 text-zinc-400 font-bold">{selectedReq.requester.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-bold text-white">{selectedReq.requester.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <Badge variant="outline" className="border-zinc-700 text-[10px] text-zinc-400 h-5 px-2">{selectedReq.requester.role}</Badge>
                                    <span className="text-[10px] text-zinc-600 font-mono">{selectedReq.id}</span>
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-zinc-500 uppercase mb-2">Perihal Pengeluaran</h4>
                                <p className="text-lg font-bold text-white leading-tight">{selectedReq.title}</p>
                            </div>
                            
                            <div>
                                <h4 className="text-xs font-bold text-zinc-500 uppercase mb-2">Catatan / Keterangan</h4>
                                <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 text-sm text-zinc-300 italic">
                                    "{selectedReq.notes}"
                                </div>
                            </div>

                            {/* Proof Image */}
                            <div>
                                <h4 className="text-xs font-bold text-zinc-500 uppercase mb-2 flex items-center justify-between">
                                    Bukti Transaksi
                                    <Button variant="link" className="h-auto p-0 text-[10px] text-blue-500">Download</Button>
                                </h4>
                                <div className="aspect-video bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                                    {selectedReq.proof ? (
                                        // Ganti div ini dengan <Image> di real app
                                        <div className="w-full h-full bg-zinc-800 flex flex-col items-center justify-center text-zinc-500 group-hover:bg-zinc-700 transition-colors">
                                            <FileText className="w-8 h-8 mb-2" />
                                            <span className="text-xs font-bold">RECEIPT_IMG.JPG</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center text-zinc-600">
                                            <XCircle className="w-8 h-8 mb-2 opacity-50"/>
                                            <span className="text-xs font-bold">No Proof Attached</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Footer (Sticky) */}
                    {selectedReq.status === 'PENDING' && (
                        <div className="p-6 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-14 rounded-2xl border-red-900/50 text-red-500 hover:bg-red-950 font-bold">
                                    REJECT
                                </Button>
                                <Button className="h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-900/20">
                                    APPROVE & PAY
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </SheetContent>
      </Sheet>

    </div>
  );
}

    