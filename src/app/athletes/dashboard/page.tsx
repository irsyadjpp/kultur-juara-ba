'use client';

import {
    AlertCircle,
    AlertTriangle,
    BookHeart,
    Brain,
    Calendar,
    Check,
    Copy,
    Dumbbell,
    Loader2,
    Trophy,
    UserCheck,
    UserPlus,
    Users,
    Utensils
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { collection, query, where } from 'firebase/firestore';
import { getSession } from '../../actions';

export default function AthleteDashboardPage() {
    const { toast } = useToast();
    const [isCopied, setIsCopied] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const firestore = useFirestore();

    useEffect(() => {
        getSession().then((session) => {
            if (session?.email) {
                setUserEmail(session.email);
            }
        });
    }, []);

    const athletesQuery = useMemoFirebase(() => {
        if (!firestore || !userEmail) return null;
        return query(collection(firestore, 'athletes'), where('email', '==', userEmail));
    }, [firestore, userEmail]);

    const { data: athletes, isLoading } = useCollection(athletesQuery);
    const athlete = athletes?.[0];

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        toast({
            title: 'ID Atlet Disalin!',
            description: `${text} telah disalin ke clipboard.`,
        });
        setTimeout(() => setIsCopied(false), 2000);
    };

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    // Use athlete data or fallbacks
    const athleteName = athlete?.fullName || "Atlet";
    const athleteId = athlete?.id || "-";
    const skillLevel = athlete?.level;
    const skillTier = athlete?.tier || athlete?.category;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black font-headline tracking-tight uppercase">
                    Welcome, {athleteName}
                </h1>
                <p className="text-muted-foreground text-lg">
                    Ringkasan aktivitas dan progres latihanmu.
                </p>
            </div>

            {/* REJECTION BANNER [REVISI AUDIT] */}
            {athlete?.status === 'Rejected' && (
                <Card className="rounded-[2rem] border-red-500/50 bg-red-500/5 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center shrink-0">
                                <AlertCircle className="w-6 h-6 text-red-500" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-black font-headline uppercase text-red-600 tracking-tight">Status Pendaftaran: Perlu Revisi</h3>
                                <p className="text-sm font-bold text-red-500/80">Alasan: {athlete.rejectionReason || "Data tidak sesuai kriteria"}</p>
                                {athlete.rejectionNotes && (
                                    <p className="text-sm text-foreground/70 italic mt-2 border-l-2 border-red-500/20 pl-3">
                                        "{athlete.rejectionNotes}"
                                    </p>
                                )}
                                <div className="pt-4 flex items-center gap-3">
                                    <Button asChild size="sm" variant="destructive" className="rounded-full">
                                        <Link href="https://wa.me/6285121374644?text=Halo%20Admin,%20pendaftaran%20saya%20perlu%20revisi.%20Mohon%20bantuannya." target="_blank">
                                            Hubungi Admin
                                        </Link>
                                    </Button>
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Silakan hubungi admin untuk melakukan perbaikan data.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="rounded-[2rem] lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ID Atlet Resmi</CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                        <div className="text-4xl font-black font-mono">
                            {athleteId}
                        </div>
                        <Button
                            size="icon"
                            variant="outline"
                            className={cn(
                                'h-10 w-10 rounded-full transition-all duration-300',
                                isCopied && 'bg-green-500/10 text-green-600 border-green-500/20'
                            )}
                            onClick={() => copyToClipboard(athleteId)}
                        >
                            {isCopied ? <Check size={18} /> : <Copy size={16} />}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="rounded-[2rem]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Sesi Latihan Berikutnya
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder for Schedule - Assuming not yet implemented in backend */}
                        <div className="text-xl font-bold text-muted-foreground">Belum ada jadwal</div>
                        <p className="text-xs text-muted-foreground">
                            Hubungi pelatih untuk jadwal terbaru.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="rounded-[2.5rem] h-full">
                        <CardHeader>
                            <CardTitle>Quick Access</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link
                                href="/athletes/journal"
                                className="block p-6 rounded-2xl bg-secondary hover:bg-primary/10 hover:border-primary border border-transparent transition-all"
                            >
                                <BookHeart className="w-8 h-8 text-primary mb-3" />
                                <h3 className="font-bold text-lg">Isi Jurnal Harian</h3>
                                <p className="text-sm text-muted-foreground">
                                    Catat progres dan kondisimu hari ini.
                                </p>
                            </Link>
                            <Link
                                href="/athletes/profile"
                                className="block p-6 rounded-2xl bg-secondary hover:bg-primary/10 hover:border-primary border border-transparent transition-all"
                            >
                                <Users className="w-8 h-8 text-primary mb-3" />
                                <h3 className="font-bold text-lg">Lihat Profil & Penilaian</h3>
                                <p className="text-sm text-muted-foreground">
                                    Cek hasil evaluasi dari pelatih.
                                </p>
                            </Link>
                            <Link
                                href="/athletes/training/mental-journal"
                                className="block p-6 rounded-2xl bg-secondary hover:bg-primary/10 hover:border-primary border border-transparent transition-all md:col-span-2 lg:col-span-1"
                            >
                                <Brain className="w-8 h-8 text-primary mb-3" />
                                <h3 className="font-bold text-lg">Log Mental (AMEL)</h3>
                                <p className="text-sm text-muted-foreground">
                                    Ekspresikan perasaan & kondisi mentalmu.
                                </p>
                            </Link>

                            <Link
                                href="/athletes/training/technical-log"
                                className="block p-6 rounded-2xl bg-secondary hover:bg-primary/10 hover:border-primary border border-transparent transition-all"
                            >
                                <Dumbbell className="w-8 h-8 text-primary mb-3" />
                                <h3 className="font-bold text-lg">Log Latihan</h3>
                                <p className="text-sm text-muted-foreground">
                                    Catat detail teknis latihan harian.
                                </p>
                            </Link>

                            <Link
                                href="/athletes/training/match-log"
                                className="block p-6 rounded-2xl bg-secondary hover:bg-primary/10 hover:border-primary border border-transparent transition-all"
                            >
                                <Trophy className="w-8 h-8 text-primary mb-3" />
                                <h3 className="font-bold text-lg">Log Pertandingan</h3>
                                <p className="text-sm text-muted-foreground">
                                    Catat hasil turnamen & sparring.
                                </p>
                            </Link>

                            <Link
                                href="/athletes/training/nutrition-log"
                                className="block p-6 rounded-2xl bg-secondary hover:bg-primary/10 hover:border-primary border border-transparent transition-all"
                            >
                                <Utensils className="w-8 h-8 text-primary mb-3" />
                                <h3 className="font-bold text-lg">Log Nutrisi</h3>
                                <p className="text-sm text-muted-foreground">
                                    Pantau asupan & kualitas tidur.
                                </p>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card className="rounded-[2.5rem] bg-secondary h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="text-yellow-500" /> Penilaian Skill
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Hasil evaluasi kemampuanmu.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {!skillLevel ? (
                                <div className="text-center py-4 text-sm text-muted-foreground">
                                    <AlertTriangle className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                                    <p className="font-bold text-foreground">Menunggu Penilaian</p>
                                    <p>Pelatih akan segera mengevaluasi kemampuanmu.</p>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <UserCheck className="mx-auto h-8 w-8 text-green-500 mb-2" />
                                    <p className="text-xs font-bold uppercase text-muted-foreground">
                                        Level Ditetapkan
                                    </p>
                                    <h3 className="font-headline text-3xl">
                                        {skillLevel}
                                    </h3>
                                    {skillTier && (
                                        <Badge variant="outline" className="mt-1">
                                            {skillTier}
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
