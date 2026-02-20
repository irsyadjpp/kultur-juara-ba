
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
    AlertTriangle,
    ClipboardCheck, Dumbbell,
    Eye,
    FileX,
    Loader2,
    Search,
    ShieldCheck,
    Swords,
    UserCheck,
    XCircle
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { getAthletesForVerification, verifyAthlete, type VerificationAthlete } from "./actions";

const REJECTION_REASONS = [
    "Dokumen KTP Buram / Tidak Terbaca",
    "Usia Tidak Sesuai Kategori",
    "Data Akta Lahir & KTP tidak sinkron",
    "Dokumen tidak lengkap"
];

export default function VerificationPage() {
    const [applicants, setApplicants] = useState<VerificationAthlete[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedApplicant, setSelectedApplicant] = useState<VerificationAthlete | null>(null);
    const [activeTab, setActiveTab] = useState("PENDING");
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { toast } = useToast();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const result = await getAthletesForVerification();
        if (result.success) {
            setApplicants(result.data);
            if (result.data.length > 0 && !selectedApplicant) {
                setSelectedApplicant(result.data[0]);
            }
        } else {
            toast({
                title: "Error",
                description: result.message,
                variant: "destructive",
            });
        }
        setIsLoading(false);
    }, [toast, selectedApplicant]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleVerify = async () => {
        if (!selectedApplicant) return;

        if (!selectedApplicant.hasPhysicalBaseline || !selectedApplicant.hasTechnicalBaseline) {
            toast({
                title: "Gagal Verifikasi",
                description: "Baseline Test (Fisik & Teknik) wajib dilengkapi terlebih dahulu.",
                variant: "destructive",
            });
            return;
        }

        setIsVerifying(true);
        const result = await verifyAthlete(selectedApplicant.id);
        if (result.success) {
            toast({
                title: "Berhasil",
                description: result.message,
                className: "bg-green-600 text-white",
            });
            fetchData();
            setSelectedApplicant(null);
        } else {
            toast({
                title: "Gagal",
                description: result.message,
                variant: "destructive",
            });
        }
        setIsVerifying(false);
    };

    // Filtered data for the list
    const displayedApplicants = applicants.filter(a => {
        const matchesSearch = a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.niaKji.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeTab === "VERIFIED") return false; // Not implemented for real data yet as verified moves to Roster
        if (activeTab === "REJECTED") return false; // Mock Issues
        return matchesSearch;
    });

    // Stats
    const stats = {
        pending: applicants.length,
        verified: 0, // In this real page, verified athletes are moved to Roster
        rejected: 0
    };

    return (
        <div className="space-y-6 p-4 md:p-0 font-body pb-24 h-[calc(100vh-112px)] flex flex-col">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="rounded-full px-3 py-1 border-sky-500 text-sky-500 bg-sky-500/10 animate-pulse">
                            <ShieldCheck className="w-3 h-3 mr-2" /> DATA VALIDATION & ONBOARDING
                        </Badge>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
                        Verifikasi & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-600">Onboarding</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 max-w-xl text-lg">
                        Validasi dokumen dan cek kelengkapan Baseline Test sebelum aktivasi atlet ke Roster.
                    </p>
                </div>

                {/* STATS WIDGET */}
                <div className="flex gap-2 bg-secondary p-2 rounded-[24px] border">
                    <div className="px-6 py-2 bg-background rounded-2xl border text-center min-w-[100px]">
                        <p className="text-[10px] text-muted-foreground font-bold uppercase">In Process</p>
                        <p className="text-2xl font-black text-yellow-500">{stats.pending}</p>
                    </div>
                </div>
            </div>

            {/* --- MAIN WORKSPACE (SPLIT VIEW) --- */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">

                {/* LEFT: THE QUEUE (4 Cols) */}
                <Card className="lg:col-span-4 bg-card/50 border rounded-[32px] flex flex-col overflow-hidden">

                    <div className="p-4 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-3.5 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari nama atau ID..."
                                className="h-12 bg-background rounded-xl pl-10 focus:ring-sky-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Tabs defaultValue="PENDING" className="w-full" onValueChange={setActiveTab}>
                            <TabsList className="bg-secondary p-1 rounded-xl w-full grid grid-cols-3">
                                <TabsTrigger value="PENDING" className="rounded-lg text-xs font-bold">Process</TabsTrigger>
                                <TabsTrigger value="VERIFIED" className="rounded-lg text-xs font-bold" disabled>History</TabsTrigger>
                                <TabsTrigger value="REJECTED" className="rounded-lg text-xs font-bold" disabled>Issues</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <ScrollArea className="flex-1 px-4 pb-4">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-40 gap-2">
                                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                                <span className="text-xs text-muted-foreground font-bold uppercase">Loading Athletes...</span>
                            </div>
                        ) : displayedApplicants.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-sm text-muted-foreground">Tidak ada atlet dalam antrean.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {displayedApplicants.map((applicant) => (
                                    <div
                                        key={applicant.id}
                                        onClick={() => setSelectedApplicant(applicant)}
                                        className={cn(
                                            "group p-4 rounded-[20px] border cursor-pointer transition-all hover:bg-secondary/50",
                                            selectedApplicant?.id === applicant.id
                                                ? "bg-primary/10 border-primary/50 shadow-lg"
                                                : "bg-background border-border hover:border-border/50"
                                        )}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <Badge variant="outline" className="text-[9px]">
                                                {applicant.niaKji || applicant.id}
                                            </Badge>
                                            <span className="text-[10px] text-muted-foreground font-medium">
                                                {new Date(applicant.registeredAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border">
                                                <AvatarFallback className="bg-secondary text-xs font-bold text-muted-foreground">
                                                    {applicant.fullName.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-bold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
                                                    {applicant.fullName}
                                                </h4>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <Badge variant="outline" className="text-[8px] h-4">{applicant.category}</Badge>
                                                    <div className="flex gap-0.5">
                                                        <div className={cn("w-2 h-2 rounded-full", applicant.hasPhysicalBaseline ? "bg-green-500" : "bg-slate-300")} title="Physical Baseline" />
                                                        <div className={cn("w-2 h-2 rounded-full", applicant.hasTechnicalBaseline ? "bg-green-500" : "bg-slate-300")} title="Technical Baseline" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </Card>

                {/* RIGHT: INSPECTOR DECK (8 Cols) */}
                <div className="lg:col-span-8 h-full">
                    {selectedApplicant ? (
                        <Card className="bg-background border rounded-[32px] h-full flex flex-col overflow-hidden shadow-2xl relative">

                            <div className="p-8 border-b bg-secondary/30 flex justify-between items-start shrink-0">
                                <div className="flex items-center gap-6">
                                    <Avatar className="h-20 w-20 border-4 border-background shadow-xl">
                                        <AvatarImage src={selectedApplicant.photoUrl} />
                                        <AvatarFallback className="bg-slate-200 text-2xl font-black">{selectedApplicant.fullName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2 className="text-2xl font-black text-foreground uppercase tracking-tight mb-1">
                                            {selectedApplicant.fullName}
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">{selectedApplicant.category}</Badge>
                                            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-none font-bold">{selectedApplicant.status}</Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h4 className="text-[10px] font-black uppercase text-muted-foreground text-right tracking-widest">Baseline Readiness</h4>
                                    <div className="flex gap-2">
                                        <Badge variant={selectedApplicant.hasPhysicalBaseline ? "default" : "outline"} className={cn("h-8 px-3 rounded-lg gap-2", selectedApplicant.hasPhysicalBaseline && "bg-green-600")}>
                                            <Dumbbell className="w-3.5 h-3.5" /> Fisik {selectedApplicant.hasPhysicalBaseline ? '✓' : '×'}
                                        </Badge>
                                        <Badge variant={selectedApplicant.hasTechnicalBaseline ? "default" : "outline"} className={cn("h-8 px-3 rounded-lg gap-2", selectedApplicant.hasTechnicalBaseline && "bg-green-600")}>
                                            <Swords className="w-3.5 h-3.5" /> Teknik {selectedApplicant.hasTechnicalBaseline ? '✓' : '×'}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <ScrollArea className="flex-1 bg-background p-8">
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                                            <ClipboardCheck className="w-5 h-5 text-sky-500" /> Dokumen Administrasi
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                                    Kartu Keluarga
                                                </h3>
                                                <div
                                                    className="aspect-video bg-slate-50 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors overflow-hidden group relative"
                                                    onClick={() => selectedApplicant?.kkUrl && setPreviewImage(selectedApplicant.kkUrl)}
                                                >
                                                    {selectedApplicant?.kkUrl ? (
                                                        <>
                                                            <img src={selectedApplicant.kkUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="KK" />
                                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Eye className="text-white w-8 h-8" />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <FileX className="w-8 h-8 text-slate-300" />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                                    Akta Kelahiran
                                                </h3>
                                                <div
                                                    className="aspect-video bg-slate-50 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors overflow-hidden group relative"
                                                    onClick={() => selectedApplicant?.aktaUrl && setPreviewImage(selectedApplicant.aktaUrl)}
                                                >
                                                    {selectedApplicant?.aktaUrl ? (
                                                        <>
                                                            <img src={selectedApplicant.aktaUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Akta" />
                                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Eye className="text-white w-8 h-8" />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <FileX className="w-8 h-8 text-slate-300" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-6">
                                            <div className="p-4 bg-secondary/20 rounded-2xl border border-dashed">
                                                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Rapor Terakhir</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-bold">{selectedApplicant?.raporUrl ? 'Tersedia' : 'Belum Ada'}</span>
                                                    {selectedApplicant?.raporUrl && <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setPreviewImage(selectedApplicant.raporUrl!)}><Eye className="w-4 h-4" /></Button>}
                                                </div>
                                            </div>
                                            <div className="p-4 bg-secondary/20 rounded-2xl border border-dashed">
                                                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Ket. Sehat</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-bold">{selectedApplicant?.healthUrl ? 'Tersedia' : 'Belum Ada'}</span>
                                                    {selectedApplicant?.healthUrl && <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setPreviewImage(selectedApplicant.healthUrl!)}><Eye className="w-4 h-4" /></Button>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>

                            <div className="p-6 border-t bg-secondary/80 grid grid-cols-2 gap-4 shrink-0">
                                <Button
                                    variant="destructive"
                                    className="h-14 rounded-2xl font-bold"
                                    onClick={() => setIsRejectModalOpen(true)}
                                >
                                    <XCircle className="w-5 h-5 mr-2" /> REJECT / REVISION
                                </Button>
                                <Button
                                    className="h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 text-lg disabled:opacity-50 disabled:grayscale"
                                    disabled={isVerifying || !selectedApplicant?.hasPhysicalBaseline || !selectedApplicant?.hasTechnicalBaseline}
                                    onClick={handleVerify}
                                >
                                    {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserCheck className="w-5 h-5 mr-2" />}
                                    AKTIVASI ATLET
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-secondary rounded-[32px] border border-dashed">
                            <ShieldCheck className="w-20 h-20 mb-4 opacity-20 animate-pulse" />
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
                <DialogContent className="bg-card border text-foreground rounded-[40px] max-w-md p-0 overflow-hidden shadow-2xl">
                    <div className="p-8 border-b bg-red-500/10">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2 text-red-500">
                                <AlertTriangle className="w-6 h-6" /> Reject Entry
                            </DialogTitle>
                        </DialogHeader>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Alasan Penolakan</label>
                            <Select>
                                <SelectTrigger className="bg-background h-14 rounded-2xl"><SelectValue placeholder="Pilih Alasan..." /></SelectTrigger>
                                <SelectContent>
                                    {REJECTION_REASONS.map((r, i) => <SelectItem key={i} value={r}>{r}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Catatan Tambahan (Email ke Atlet)</label>
                            <Textarea placeholder="Jelaskan detail perbaikan yang diperlukan..." className="bg-background rounded-2xl min-h-[100px] resize-none p-4" />
                        </div>

                        <Button className="w-full h-16 rounded-full font-black text-lg bg-red-600 hover:bg-red-700 text-white mt-2 shadow-xl shadow-red-900/20">
                            CONFIRM REJECTION
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    );
}
