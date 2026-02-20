'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { collection } from 'firebase/firestore';
import {
    Clock,
    FileText,
    Loader2,
    MoreHorizontal,
    Pencil,
    Search,
    ShieldCheck,
    Trash2, UserPlus,
    Users,
    UserX
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { deleteAthlete } from "./actions";

// Define the type for an athlete based on Firestore data
interface Athlete {
    id: string;
    fullName: string;
    email?: string;
    niaKji?: string;
    category: string;
    level: string;
    status_aktif: 'AKTIF' | 'NON-AKTIF' | 'DRAFT';
    status?: string; // 'Probation', 'Draft', 'Contract', etc.
    initialStatus?: string;
    avatar?: string;
    isDraft?: boolean;
}



export default function AthleteRosterPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const firestore = useFirestore();
    const { toast } = useToast();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("all");

    const athletesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'athletes');
    }, [firestore]);

    const { data: athletesData, isLoading } = useCollection<Athlete>(athletesQuery);

    const filteredAthletes = useMemo(() => {
        if (!athletesData) return [];
        let filtered = athletesData.filter(athlete =>
            (athlete.fullName || "").toLowerCase().includes(searchQuery.toLowerCase())
        );

        switch (activeTab) {
            case "draft":
                return filtered.filter(a => a.status_aktif === 'DRAFT' || a.isDraft);
            case "process":
                // Process: Aktif tapi status masih Probation/Trial, atau initialStatus = Probation
                return filtered.filter(a => a.status_aktif === 'AKTIF' && (a.status === 'Probation' || a.initialStatus === 'Probation'));
            case "active":
                // Active: Aktif dan status BUKAN Probation/Draft
                return filtered.filter(a => a.status_aktif === 'AKTIF' && a.status !== 'Probation' && a.status !== 'Draft');
            case "inactive":
                return filtered.filter(a => a.status_aktif === 'NON-AKTIF');
            default:
                return filtered;
        }
    }, [athletesData, searchQuery, activeTab]);

    // Stats Calculations
    const totalAthletes = athletesData?.length || 0;
    const activeCount = athletesData?.filter(a => a.status_aktif === 'AKTIF' && a.status !== 'Probation').length || 0;
    const processCount = athletesData?.filter(a => a.status_aktif === 'AKTIF' && (a.status === 'Probation' || a.initialStatus === 'Probation')).length || 0;
    const draftCount = athletesData?.filter(a => a.status_aktif === 'DRAFT' || a.isDraft).length || 0;
    const inactiveCount = athletesData?.filter(a => a.status_aktif === 'NON-AKTIF').length || 0;



    const handleDelete = async (id: string, name: string) => {
        const confirm = window.confirm(`Apakah Anda yakin ingin menghapus data atlet "${name}"? Tindakan ini tidak dapat dibatalkan.`);
        if (!confirm) return;

        try {
            const result = await deleteAthlete(id);
            if (result.success) {
                toast({
                    title: "Berhasil",
                    description: result.message,
                    className: "bg-green-600 text-white",
                });
            } else {
                toast({
                    title: "Gagal",
                    description: result.message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Terjadi kesalahan saat menghapus data.",
                variant: "destructive",
            });
        }
    };


    return (
        <div className="space-y-8 p-4 md:p-0 font-body pb-24">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="rounded-full px-3 py-1 border-sky-500 text-sky-500 bg-sky-500/10">
                            <Users className="w-3 h-3 mr-2" /> DATABASE ATLET
                        </Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-foreground">
                        Roster <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-600">Atlet</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 max-w-xl text-lg">
                        Lihat dan kelola semua atlet yang terdaftar di Kultur Juara Academy.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        asChild
                        className="h-14 rounded-full px-8 bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg shadow-lg transition-transform active:scale-95"
                    >
                        <Link href="/admin/athletes/register">
                            <UserPlus className="mr-2 w-5 h-5" /> DAFTARKAN ATLET BARU
                        </Link>
                    </Button>
                </div>
            </div>

            {/* --- STATS CARDS --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="rounded-[28px] p-1 overflow-hidden group border-l-4 border-l-gray-400">
                    <CardContent className="p-4 flex flex-col gap-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Drafts</span>
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-black text-foreground">{draftCount}</p>
                            <FileText className="w-5 h-5 text-gray-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-[28px] p-1 overflow-hidden group border-l-4 border-l-yellow-500">
                    <CardContent className="p-4 flex flex-col gap-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">In Process</span>
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-black text-foreground">{processCount}</p>
                            <Clock className="w-5 h-5 text-yellow-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-[28px] p-1 overflow-hidden group border-l-4 border-l-blue-500">
                    <CardContent className="p-4 flex flex-col gap-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Active</span>
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-black text-foreground">{activeCount}</p>
                            <ShieldCheck className="w-5 h-5 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-[28px] p-1 overflow-hidden group border-l-4 border-l-red-500">
                    <CardContent className="p-4 flex flex-col gap-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Inactive</span>
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-black text-foreground">{inactiveCount}</p>
                            <UserX className="w-5 h-5 text-red-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* --- ATHLETE LIST --- */}
            <div className="bg-card border rounded-[40px] p-2 flex flex-col">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex flex-col md:flex-row justify-between items-center px-4 py-4 gap-4 border-b">
                        <TabsList className="bg-secondary/50 rounded-full h-12 p-1">
                            <TabsTrigger value="all" className="rounded-full px-6 h-10 data-[state=active]:bg-background data-[state=active]:shadow-sm">All</TabsTrigger>
                            <TabsTrigger value="draft" className="rounded-full px-6 h-10 data-[state=active]:bg-gray-500 data-[state=active]:text-white">Draft</TabsTrigger>
                            <TabsTrigger value="process" className="rounded-full px-6 h-10 data-[state=active]:bg-yellow-500 data-[state=active]:text-white">Process</TabsTrigger>
                            <TabsTrigger value="active" className="rounded-full px-6 h-10 data-[state=active]:bg-blue-500 data-[state=active]:text-white">Active</TabsTrigger>
                            <TabsTrigger value="inactive" className="rounded-full px-6 h-10 data-[state=active]:bg-red-500 data-[state=active]:text-white">Inactive</TabsTrigger>
                        </TabsList>

                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-4 top-3.5 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari nama atlet..."
                                className="h-12 bg-background border-border rounded-full pl-10 focus:ring-sky-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto min-h-[300px]">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="pl-6">Nama Atlet</TableHead>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Level / Kategori</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right pr-6">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredAthletes.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                                Tidak ada data atlet ditemukan.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredAthletes.map((athlete) => (
                                            <TableRow key={athlete.id} className="hover:bg-secondary/50">
                                                <TableCell className="pl-6">
                                                    <div className="flex items-center gap-4">
                                                        <Avatar className="h-10 w-10 border-2">
                                                            <AvatarImage src={athlete.avatar} />
                                                            <AvatarFallback className="bg-secondary text-sm font-bold">{athlete.fullName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-bold text-foreground">{athlete.fullName}</div>
                                                            <div className="text-xs text-muted-foreground">{athlete.email}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-mono text-xs text-muted-foreground">
                                                    {athlete.niaKji || athlete.id}
                                                    {athlete.isDraft && <Badge variant="outline" className="ml-2 border-dashed">Draft ID</Badge>}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1">
                                                        <Badge variant="outline" className="w-fit border-sky-500/30 text-sky-500 bg-sky-500/10">
                                                            {athlete.level}
                                                        </Badge>
                                                        <span className="text-[10px] text-muted-foreground">{athlete.category}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={
                                                        athlete.status_aktif === 'DRAFT' || athlete.isDraft ? 'outline' :
                                                            athlete.status_aktif === 'NON-AKTIF' ? 'secondary' :
                                                                (athlete.status === 'Probation' || athlete.initialStatus === 'Probation') ? 'secondary' : // Process is Yellowish usually
                                                                    'default'
                                                    } className={cn(
                                                        'border-none',
                                                        athlete.status_aktif === 'DRAFT' || athlete.isDraft ? 'bg-gray-200 text-gray-700' :
                                                            athlete.status_aktif === 'NON-AKTIF' ? 'bg-red-100 text-red-700' :
                                                                (athlete.status === 'Probation' || athlete.initialStatus === 'Probation') ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' :
                                                                    'bg-green-100 text-green-700 hover:bg-green-200'
                                                    )}>
                                                        {athlete.status_aktif === 'DRAFT' || athlete.isDraft ? 'DRAFT' :
                                                            athlete.status_aktif === 'NON-AKTIF' ? 'NON-AKTIF' :
                                                                (athlete.status === 'Probation' || athlete.initialStatus === 'Probation') ? 'PROCESS' :
                                                                    'ACTIVE'
                                                        }
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right pr-6">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
                                                                <MoreHorizontal className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                                            <DropdownMenuItem onClick={() => router.push(`/admin/athletes/edit/${athlete.id}`)}>
                                                                <Pencil className="mr-2 h-4 w-4" /> Edit Data
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                                                onClick={() => handleDelete(athlete.id, athlete.fullName)}
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" /> Hapus Data
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
