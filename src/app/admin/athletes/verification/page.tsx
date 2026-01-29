
'use client';

import { useState } from "react";
import { 
  ShieldCheck, UserCheck, FileX, Eye, 
  CheckCircle2, XCircle, Search, Filter, 
  ZoomIn, ChevronRight, AlertTriangle, FileText, 
  Download, RefreshCcw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// MOCK DATA
const APPLICANTS = [
  { 
    id: "KJA-001", 
    name: "Kevin Sanjaya", 
    category: "Dewasa", 
    status: "PENDING", 
    date: "10 mins ago",
    documents: {
      ktp: "/docs/ktp-mock.jpg",
      akta: "/docs/akta-mock.jpg",
    },
    issues: []
  },
  { 
    id: "KJA-002", 
    name: "Siti Fadia", 
    category: "Remaja", 
    status: "VERIFIED", 
    date: "1 hour ago",
    documents: { ktp: "valid", akta: "valid" },
    issues: []
  },
  { 
    id: "KJA-003", 
    name: "Budi Santoso", 
    category: "Anak", 
    status: "REJECTED", 
    date: "Yesterday",
    documents: { ktp: "invalid", akta: "valid" },
    issues: ["Akta lahir tidak sesuai dengan KTP"]
  },
];

const REJECTION_REASONS = [
  "Dokumen KTP Buram / Tidak Terbaca",
  "Usia Tidak Sesuai Kategori",
  "Data Akta Lahir & KTP tidak sinkron",
  "Dokumen tidak lengkap"
];

export default function VerificationPage() {
  const [selectedApplicant, setSelectedApplicant] = useState<typeof APPLICANTS[0] | null>(APPLICANTS[0]);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Stats
  const stats = {
    pending: APPLICANTS.filter(a => a.status === 'PENDING').length,
    verified: APPLICANTS.filter(a => a.status === 'VERIFIED').length,
    rejected: APPLICANTS.filter(a => a.status === 'REJECTED').length
  };

  return (
    <div className="space-y-6 p-4 md:p-8 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-sky-500 text-sky-500 bg-sky-500/10 backdrop-blur-md animate-pulse">
                    <ShieldCheck className="w-3 h-3 mr-2" /> DATA VALIDATION
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Verifikasi Dokumen <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-600">Atlet</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Validasi dokumen identitas (KTP/Akta) untuk memastikan kesesuaian kategori umur.
            </p>
        </div>

        {/* STATS WIDGET */}
        <div className="flex gap-2 bg-zinc-900 p-2 rounded-[24px] border border-zinc-800">
            <div className="px-6 py-2 bg-zinc-950 rounded-2xl border border-zinc-800 text-center">
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Pending</p>
                <p className="text-2xl font-black text-yellow-500">{stats.pending}</p>
            </div>
            <div className="px-6 py-2 bg-zinc-950 rounded-2xl border border-zinc-800 text-center">
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Verified</p>
                <p className="text-2xl font-black text-green-500">{stats.verified}</p>
            </div>
            <div className="px-6 py-2 bg-zinc-950 rounded-2xl border border-zinc-800 text-center">
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Rejected</p>
                <p className="text-2xl font-black text-red-500">{stats.rejected}</p>
            </div>
        </div>
      </div>

      {/* --- MAIN WORKSPACE (SPLIT VIEW) --- */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
         
         {/* LEFT: THE QUEUE (4 Cols) */}
         <Card className="lg:col-span-4 bg-zinc-900/50 border border-zinc-800/50 rounded-[32px] flex flex-col overflow-hidden backdrop-blur-sm">
            
            <div className="p-4 space-y-4">
                <div className="relative">
                    <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
                    <Input placeholder="Search name or ID..." className="h-12 bg-zinc-950 border-zinc-800 rounded-xl pl-10 text-white focus:ring-sky-500" />
                </div>
                <Tabs defaultValue="PENDING" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="bg-zinc-950 p-1 rounded-xl w-full grid grid-cols-3">
                        <TabsTrigger value="PENDING" className="rounded-lg text-xs font-bold">Pending</TabsTrigger>
                        <TabsTrigger value="VERIFIED" className="rounded-lg text-xs font-bold">Done</TabsTrigger>
                        <TabsTrigger value="REJECTED" className="rounded-lg text-xs font-bold">Issues</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <ScrollArea className="flex-1 px-4 pb-4">
                <div className="space-y-3">
                    {APPLICANTS.filter(a => a.status === activeTab).map((applicant) => (
                        <div 
                            key={applicant.id} 
                            onClick={() => setSelectedApplicant(applicant)}
                            className={cn(
                                "group p-4 rounded-[20px] border cursor-pointer transition-all hover:bg-zinc-800",
                                selectedApplicant?.id === applicant.id 
                                    ? "bg-zinc-800 border-sky-500/50 shadow-lg" 
                                    : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                            )}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <Badge variant="outline" className="text-[9px] border-zinc-700 text-zinc-400">
                                    {applicant.id}
                                </Badge>
                                <span className="text-[10px] text-zinc-500 font-medium">{applicant.date}</span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border border-zinc-700">
                                    <AvatarFallback className="bg-zinc-900 text-xs font-bold text-zinc-500">
                                        {applicant.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-bold text-white text-sm line-clamp-1 group-hover:text-sky-400 transition-colors">
                                        {applicant.name}
                                    </h4>
                                    <p className="text-xs text-zinc-500 truncate">{applicant.category}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
         </Card>

         {/* RIGHT: INSPECTOR DECK (8 Cols) */}
         <div className="lg:col-span-8 h-full">
            {selectedApplicant ? (
                <Card className="bg-zinc-950 border-zinc-800 rounded-[32px] h-full flex flex-col overflow-hidden shadow-2xl relative">
                    
                    <div className="p-8 border-b border-zinc-800 bg-zinc-900/30 flex justify-between items-start">
                        <div className="flex items-center gap-6">
                            <Avatar className="h-20 w-20 border-4 border-zinc-800 shadow-xl">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>AT</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
                                    {selectedApplicant.name}
                                </h2>
                                <Badge variant="outline" className="text-zinc-400 border-zinc-700">{selectedApplicant.category}</Badge>
                            </div>
                        </div>
                        
                        <div className={cn(
                            "px-4 py-2 rounded-xl border flex items-center gap-2 font-bold text-sm",
                            selectedApplicant.status === 'PENDING' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                            selectedApplicant.status === 'VERIFIED' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                            "bg-red-500/10 text-red-500 border-red-500/20"
                        )}>
                            {selectedApplicant.status === 'PENDING' ? <RefreshCcw className="w-4 h-4 animate-spin-slow"/> : 
                             selectedApplicant.status === 'VERIFIED' ? <CheckCircle2 className="w-4 h-4"/> : <XCircle className="w-4 h-4"/>}
                            {selectedApplicant.status}
                        </div>
                    </div>

                    <ScrollArea className="flex-1 bg-zinc-950/50 p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-sky-500"/> KTP / Identitas
                                </h3>
                                <div 
                                    className="aspect-video bg-black rounded-2xl border border-zinc-800 relative group cursor-zoom-in overflow-hidden"
                                    onClick={() => setPreviewImage(selectedApplicant.documents.ktp)}
                                >
                                    <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center text-zinc-600">
                                        [ Preview KTP Image ]
                                    </div>
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <ZoomIn className="w-8 h-8 text-white"/>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-sky-500"/> Akta Kelahiran
                                </h3>
                                <div 
                                    className="aspect-video bg-black rounded-2xl border border-zinc-800 relative group cursor-zoom-in overflow-hidden"
                                    onClick={() => setPreviewImage(selectedApplicant.documents.akta)}
                                >
                                    <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center text-zinc-600">
                                        [ Preview Akta Image ]
                                    </div>
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <ZoomIn className="w-8 h-8 text-white"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    {selectedApplicant.status === 'PENDING' && (
                        <div className="p-6 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-md grid grid-cols-2 gap-4">
                            <Button 
                                variant="outline" 
                                className="h-14 rounded-2xl border-red-900/50 text-red-500 hover:bg-red-950 font-bold hover:text-white"
                                onClick={() => setIsRejectModalOpen(true)}
                            >
                                <XCircle className="w-5 h-5 mr-2"/> REJECT / REVISION
                            </Button>
                            <Button className="h-14 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-lg shadow-sky-900/20 text-lg">
                                <UserCheck className="w-5 h-5 mr-2"/> VERIFY ATLET
                            </Button>
                        </div>
                    )}

                </Card>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 bg-zinc-900/50 rounded-[32px] border border-zinc-800 border-dashed">
                    <ShieldCheck className="w-20 h-20 mb-4 opacity-20 animate-pulse"/>
                    <p className="font-bold uppercase tracking-widest text-lg">Pilih Atlet untuk Diinspeksi</p>
                </div>
            )}
         </div>

      </div>
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="bg-black/90 border-none shadow-none max-w-4xl h-[80vh] p-0 flex items-center justify-center">
            <div className="relative w-full h-full p-4 flex items-center justify-center">
                <img src={previewImage || ""} alt="Document Preview" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                <Button 
                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full"
                    onClick={() => setPreviewImage(null)}
                >
                    Close
                </Button>
            </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-md p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 bg-red-950/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2 text-red-500">
                        <AlertTriangle className="w-6 h-6"/> Reject Entry
                    </DialogTitle>
                </DialogHeader>
            </div>
            
            <div className="p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Alasan Penolakan</label>
                    <Select>
                        <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl"><SelectValue placeholder="Pilih Alasan..." /></SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                            {REJECTION_REASONS.map((r, i) => <SelectItem key={i} value={r}>{r}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Catatan Tambahan (Email ke Atlet)</label>
                    <Textarea placeholder="Jelaskan detail perbaikan yang diperlukan..." className="bg-zinc-900 border-zinc-800 rounded-2xl min-h-[100px] resize-none p-4" />
                </div>

                <Button className="w-full h-16 rounded-full font-black text-lg bg-red-600 hover:bg-red-700 text-white mt-2 shadow-xl shadow-red-900/20">
                    CONFIRM REJECTION
                </Button>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
