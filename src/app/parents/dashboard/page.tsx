'use client';

import { getSession } from '@/app/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { cn } from '@/lib/utils';
import { collection, query, where } from 'firebase/firestore';
import { AlertCircle, ChevronRight, Clock, Loader2, ShieldCheck, Trophy, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ChildAthlete {
    id: string;
    fullName: string;
    nickname?: string;
    category?: string;
    status?: string;
    status_aktif?: string;
    photoUrl?: string;
    dob?: string;
    level?: string;
    niaKji?: string;
}

export default function ParentDashboardPage() {
    const [parentEmail, setParentEmail] = useState<string | null>(null);
    const [parentName, setParentName] = useState('');
    const firestore = useFirestore();

    useEffect(() => {
        getSession().then(session => {
            if (session?.email) {
                setParentEmail(session.email);
                setParentName(session.name || '');
            }
        });
    }, []);

    const childrenQuery = useMemoFirebase(() => {
        if (!firestore || !parentEmail) return null;
        return query(collection(firestore, 'athletes'), where('parentEmail', '==', parentEmail));
    }, [firestore, parentEmail]);

    const { data: children, isLoading } = useCollection<ChildAthlete>(childrenQuery);

    // Also check fatherPhone/motherPhone as fallback (shared email field)
    const childrenByDirectQuery = useMemoFirebase(() => {
        if (!firestore || !parentEmail) return null;
        return query(collection(firestore, 'athletes'), where('fatherPhone', '==', parentEmail));
    }, [firestore, parentEmail]);

    const statusIcon = (status?: string) => {
        switch (status) {
            case 'Active': return <ShieldCheck className="w-4 h-4 text-green-500" />;
            case 'Probation': return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'Rejected': return <AlertCircle className="w-4 h-4 text-red-500" />;
            default: return <Clock className="w-4 h-4 text-muted-foreground" />;
        }
    };

    const statusColor = (status?: string) => {
        switch (status) {
            case 'Active': return 'bg-green-500/10 text-green-600 border-green-500/30';
            case 'Probation': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30';
            case 'Rejected': return 'bg-red-500/10 text-red-600 border-red-500/30';
            default: return 'bg-secondary text-muted-foreground';
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    const allChildren = children || [];

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div>
                <Badge className="bg-violet-500/10 text-violet-500 border-violet-500/30 mb-3">
                    <Users className="w-3 h-3 mr-2" /> PARENT PORTAL
                </Badge>
                <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter">
                    Halo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-600">{parentName || 'Orang Tua'}</span>
                </h1>
                <p className="text-muted-foreground mt-2 text-base">
                    Pantau perkembangan anak Anda di Kultur Juara Badminton Academy.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="rounded-[28px] border-l-4 border-l-violet-500">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Total Anak</p>
                            <p className="text-3xl font-black">{allChildren.length}</p>
                        </div>
                        <Users className="w-8 h-8 text-violet-500/30" />
                    </CardContent>
                </Card>
                <Card className="rounded-[28px] border-l-4 border-l-green-500">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Status Aktif</p>
                            <p className="text-3xl font-black text-green-600">{allChildren.filter(c => c.status === 'Active').length}</p>
                        </div>
                        <ShieldCheck className="w-8 h-8 text-green-500/30" />
                    </CardContent>
                </Card>
                <Card className="rounded-[28px] border-l-4 border-l-yellow-500">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Proses Verifikasi</p>
                            <p className="text-3xl font-black text-yellow-600">{allChildren.filter(c => c.status === 'Probation' || c.status === 'Pending Review').length}</p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-500/30" />
                    </CardContent>
                </Card>
            </div>

            {/* Children Cards */}
            <div>
                <h2 className="text-lg font-black uppercase tracking-widest text-foreground mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-violet-500" /> Anak Saya
                </h2>

                {allChildren.length === 0 ? (
                    <Card className="rounded-[32px] border-dashed">
                        <CardContent className="py-16 text-center">
                            <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" />
                            <p className="font-bold text-foreground">Belum ada anak terdaftar</p>
                            <p className="text-sm text-muted-foreground mt-1">Email Anda ({parentEmail}) belum terhubung dengan data atlet manapun.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {allChildren.map(child => (
                            <Link key={child.id} href={`/parents/child/${child.id}`}>
                                <Card className="rounded-[28px] hover:shadow-xl transition-all group cursor-pointer border hover:border-violet-500/30">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-14 w-14 border-2 border-background shadow-lg">
                                                    <AvatarImage src={child.photoUrl} />
                                                    <AvatarFallback className="bg-violet-500/10 text-violet-600 font-black text-lg">
                                                        {child.fullName?.charAt(0) || '?'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-black text-lg tracking-tight group-hover:text-violet-500 transition-colors">
                                                        {child.fullName}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="outline" className="text-[10px]">{child.category || '-'}</Badge>
                                                        {child.level && <Badge variant="outline" className="text-[10px] border-sky-500/30 text-sky-500">{child.level}</Badge>}
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-violet-500 transition-colors" />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {statusIcon(child.status)}
                                                <Badge className={cn("text-[10px] border", statusColor(child.status))}>
                                                    {child.status || 'Unknown'}
                                                </Badge>
                                            </div>
                                            <span className="text-[10px] font-mono text-muted-foreground">{child.niaKji || child.id.slice(0, 10)}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
