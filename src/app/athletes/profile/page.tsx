'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { cn } from '@/lib/utils';
import { collection, query, where } from 'firebase/firestore';
import {
    AlertCircle,
    ArrowLeft,
    BookOpen,
    Edit2,
    Loader2,
    MessageSquare,
    Phone,
    Ruler,
    ShieldCheck,
    Swords,
    Trophy,
    User,
    Users,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSession } from '../../actions';

// ─── Modern Section Component (konsisten dengan mental-journal) ─────────────
const ModernSection = ({
    title,
    icon: Icon,
    children,
    className,
    gradient = 'from-primary/5 to-transparent',
}: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    className?: string;
    gradient?: string;
}) => (
    <div
        className={cn(
            'relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-secondary/20 backdrop-blur-2xl shadow-sm transition-all hover:shadow-md',
            className
        )}
    >
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-30 pointer-events-none', gradient)} />
        <div className="relative p-6 md:p-8 space-y-5">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-background/50 flex items-center justify-center border border-border/50 text-primary shadow-sm">
                    <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black font-headline tracking-tight uppercase text-foreground">
                    {title}
                </h2>
            </div>
            {children}
        </div>
    </div>
);

// ─── Info Row (label + value) ───────────────────────────────────────────────
const InfoRow = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {label}
        </span>
        <span className="text-sm font-semibold text-foreground">
            {value || <span className="text-muted-foreground italic font-normal">-</span>}
        </span>
    </div>
);

// ─── Stat Tile ──────────────────────────────────────────────────────────────
const StatTile = ({
    label,
    value,
    unit,
    icon: Icon,
    color = 'text-primary',
}: {
    label: string;
    value?: string | number | null;
    unit?: string;
    icon: React.ElementType;
    color?: string;
}) => (
    <div className="flex flex-col gap-2 p-5 rounded-2xl bg-background/40 border border-border/30">
        <Icon className={cn('w-5 h-5', color)} />
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className={cn('text-2xl font-black font-headline', color)}>
            {value ?? '-'}
            {value && unit && <span className="text-sm font-bold text-muted-foreground ml-1">{unit}</span>}
        </p>
    </div>
);

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function AthleteProfilePage() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const firestore = useFirestore();

    useEffect(() => {
        getSession().then((session) => {
            if (session?.email) setUserEmail(session.email);
        });
    }, []);

    const athletesQuery = useMemoFirebase(() => {
        if (!firestore || !userEmail) return null;
        return query(collection(firestore, 'athletes'), where('email', '==', userEmail));
    }, [firestore, userEmail]);

    const { data: athletes, isLoading } = useCollection(athletesQuery);
    const athlete = athletes?.[0];

    // ── Loading State ──
    if (!userEmail || isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // ── No Data State ──
    if (!athlete) {
        return (
            <div className="space-y-8">
                <Link
                    href="/athletes/dashboard"
                    className="inline-flex items-center text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Link>
                <div className="relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-secondary/20 p-12 flex flex-col items-center justify-center text-center">
                    <AlertCircle className="w-14 h-14 text-yellow-500 mb-5" />
                    <h2 className="text-2xl font-black font-headline uppercase tracking-tight">
                        Data Atlet Tidak Ditemukan
                    </h2>
                    <p className="text-muted-foreground max-w-md mt-3 leading-relaxed">
                        Kami tidak dapat menemukan data atlet yang terhubung dengan email{' '}
                        <strong className="text-foreground">{userEmail}</strong>. Silakan hubungi administrator
                        untuk verifikasi data Anda.
                    </p>
                    <Button asChild className="mt-6">
                        <Link
                            href="https://wa.me/6285121374644?text=Halo%20Admin,%20saya%20ingin%20konfirmasi%20data%20atlet."
                            target="_blank"
                        >
                            <Phone className="w-4 h-4 mr-2" /> Hubungi Admin
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    // ── Computed Values ──
    const skillScore = athlete.skillScore || 0;
    const initials = athlete.fullName
        ? athlete.fullName
            .split(' ')
            .slice(0, 2)
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
        : '??';

    const statusColor =
        athlete.status_aktif === 'Aktif'
            ? 'bg-green-500/10 text-green-500 border-green-500/30'
            : athlete.status_aktif === 'Probation'
                ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                : 'bg-muted text-muted-foreground border-border';

    return (
        <div className="min-h-screen pb-20 space-y-8">

            {/* ── PAGE HEADER ─────────────────────────────────────────── */}
            <div className="space-y-6">
                <Link
                    href="/athletes/dashboard"
                    className="inline-flex items-center text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Link>

                <div className="relative">
                    <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                    <h1 className="relative text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter text-foreground leading-[0.9]">
                        Profil <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600">
                            Atlet.
                        </span>
                    </h1>
                    <p className="relative mt-4 text-lg text-muted-foreground font-medium max-w-xl">
                        Identitas, data fisik, dan evaluasi perkembanganmu di Kultur Juara.
                    </p>
                </div>
            </div>

            {/* ── MAIN GRID ───────────────────────────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* ── LEFT COLUMN: Avatar Hero + Kontak ── */}
                <div className="xl:col-span-4 flex flex-col gap-6">

                    {/* Avatar Hero Card */}
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-secondary/20 backdrop-blur-2xl p-8 flex flex-col items-center text-center shadow-sm">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-red-600/5 opacity-40 pointer-events-none" />
                        <div className="relative flex flex-col items-center gap-4">
                            <Avatar className="h-28 w-28 border-4 border-background shadow-2xl ring-2 ring-primary/20">
                                <AvatarImage src={athlete.avatar || '/avatars/default.png'} />
                                <AvatarFallback className="text-3xl font-black bg-primary/10 text-primary">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <h2 className="text-2xl font-black font-headline tracking-tight text-foreground">
                                    {athlete.fullName}
                                </h2>
                                {athlete.nickname && (
                                    <p className="text-sm text-muted-foreground mt-0.5">"{athlete.nickname}"</p>
                                )}
                                <p className="text-xs text-muted-foreground mt-1 font-mono">PB. Kultur Juara</p>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center">
                                <Badge className={cn('border text-xs font-bold px-3 py-1', statusColor)}>
                                    {athlete.status_aktif || 'NON-AKTIF'}
                                </Badge>
                                {athlete.category && (
                                    <Badge variant="outline" className="text-xs font-bold px-3 py-1">
                                        {athlete.category}
                                    </Badge>
                                )}
                            </div>

                            {athlete.niaKji && (
                                <div className="w-full pt-4 border-t border-border/50">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                                        NIA / ID Atlet
                                    </p>
                                    <p className="font-mono font-black text-xl text-primary tracking-wider">
                                        {athlete.niaKji}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Kontak & Darurat */}
                    <ModernSection title="Kontak" icon={Phone} gradient="from-green-500/5 to-emerald-500/5">
                        <div className="space-y-4">
                            <InfoRow label="Nomor WhatsApp" value={athlete.phone} />
                            <InfoRow label="Email Akun" value={athlete.email} />
                            {athlete.socialMedia && (
                                <InfoRow label="Media Sosial" value={athlete.socialMedia} />
                            )}
                            <Separator className="opacity-50" />
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                Kontak Darurat
                            </p>
                            {athlete.emergencyName ? (
                                <>
                                    <InfoRow label="Nama" value={athlete.emergencyName} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <InfoRow label="Hubungan" value={athlete.emergencyRelation} />
                                        <InfoRow label="Nomor HP" value={athlete.emergencyPhone} />
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">Belum diisi.</p>
                            )}
                        </div>
                    </ModernSection>

                    {/* Data Orang Tua */}
                    <ModernSection title="Orang Tua" icon={Users} gradient="from-blue-500/5 to-cyan-500/5">
                        <div className="space-y-4">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ayah</p>
                            <div className="grid grid-cols-2 gap-4">
                                <InfoRow label="Nama" value={athlete.fatherName} />
                                <InfoRow label="No. HP" value={athlete.fatherPhone} />
                            </div>
                            <Separator className="opacity-50" />
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ibu</p>
                            <div className="grid grid-cols-2 gap-4">
                                <InfoRow label="Nama" value={athlete.motherName} />
                                <InfoRow label="No. HP" value={athlete.motherPhone} />
                            </div>
                        </div>
                    </ModernSection>

                    {/* CTA Ajukan Perubahan */}
                    <Button
                        variant="outline"
                        className="w-full h-14 rounded-2xl border-primary/40 text-primary hover:bg-primary/10 font-bold uppercase tracking-widest"
                        asChild
                    >
                        <Link
                            href="https://wa.me/6285121374644?text=Halo%20Admin,%20saya%20ingin%20mengajukan%20perubahan%20data%20atlet."
                            target="_blank"
                        >
                            <Edit2 className="w-4 h-4 mr-2" /> Ajukan Perubahan Data
                        </Link>
                    </Button>
                </div>

                {/* ── RIGHT COLUMN: Info Lengkap + Evaluasi ── */}
                <div className="xl:col-span-8 flex flex-col gap-6">

                    {/* Data Pribadi & Badminton */}
                    <ModernSection title="Data Pribadi" icon={User} gradient="from-primary/5 to-transparent">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5">
                            <InfoRow label="Nama Lengkap" value={athlete.fullName} />
                            <InfoRow label="Nama Panggilan" value={athlete.nickname} />
                            <InfoRow label="Jenis Kelamin" value={athlete.gender} />
                            <InfoRow label="Tempat Lahir" value={athlete.pob} />
                            <InfoRow label="Tanggal Lahir" value={athlete.dob} />
                            <InfoRow label="Kewarganegaraan" value={athlete.citizenship} />
                            <InfoRow label="Golongan Darah" value={athlete.bloodType ? `${athlete.bloodType}${athlete.rhesus || ''}` : null} />
                            <InfoRow label="Tangan Dominan" value={athlete.dominantHand} />
                            <InfoRow label="Ukuran Sepatu" value={athlete.shoeSize} />
                        </div>
                        <Separator className="opacity-50" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5">
                            <InfoRow label="Asal Sekolah" value={athlete.schoolName} />
                            <InfoRow label="Kelas/Jenjang" value={athlete.schoolGrade} />
                            <InfoRow label="Kota" value={athlete.city} />
                        </div>
                    </ModernSection>

                    {/* Riwayat Badminton */}
                    <ModernSection title="Riwayat Badminton" icon={Swords} gradient="from-red-500/5 to-orange-500/5">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <InfoRow label="Mulai Berlatih" value={athlete.startYear ? `${athlete.startYear}` : null} />
                            <InfoRow label="No. PBSI" value={athlete.pbsiNumber} />
                            <InfoRow label="Spesialisasi" value={athlete.specialization} />
                            <InfoRow label="Level" value={athlete.level} />
                        </div>
                        {athlete.previousClub && (
                            <div className="pt-2">
                                <InfoRow label="Klub Sebelumnya" value={athlete.previousClub} />
                            </div>
                        )}
                        {athlete.achievements && athlete.achievements.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                    Prestasi
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {athlete.achievements.map((ach: string, i: number) => (
                                        <Badge key={i} variant="secondary" className="text-xs">
                                            <Trophy className="w-3 h-3 mr-1 text-yellow-500" />
                                            {ach}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </ModernSection>

                    {/* Antropometri */}
                    <ModernSection title="Antropometri" icon={Ruler} gradient="from-violet-500/5 to-purple-500/5">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatTile
                                label="Tinggi Badan"
                                value={athlete.ant_height_cm}
                                unit="cm"
                                icon={Ruler}
                                color="text-blue-500"
                            />
                            <StatTile
                                label="Berat Badan"
                                value={athlete.ant_weight_kg}
                                unit="kg"
                                icon={Zap}
                                color="text-green-500"
                            />
                            <StatTile
                                label="Rentang Lengan"
                                value={athlete.ant_arm_span_cm}
                                unit="cm"
                                icon={Ruler}
                                color="text-primary"
                            />
                            <StatTile
                                label="Ukuran Jersey"
                                value={athlete.shirtSize || athlete.jerseySize}
                                icon={User}
                                color="text-orange-500"
                            />
                        </div>
                        {(athlete.ant_body_fat_pct || athlete.ant_skeletal_muscle_pct || athlete.ant_bmi_score) && (
                            <div className="grid grid-cols-3 gap-4 pt-2">
                                <InfoRow label="BMI" value={athlete.ant_bmi_score} />
                                <InfoRow label="Otot Rangka" value={athlete.ant_skeletal_muscle_pct ? `${athlete.ant_skeletal_muscle_pct}%` : null} />
                                <InfoRow label="Lemak Tubuh" value={athlete.ant_body_fat_pct ? `${athlete.ant_body_fat_pct}%` : null} />
                            </div>
                        )}
                    </ModernSection>

                    {/* Evaluasi Perkembangan */}
                    <ModernSection
                        title="Evaluasi Perkembangan"
                        icon={ShieldCheck}
                        gradient="from-yellow-500/5 to-amber-500/5"
                    >
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-3 md:col-span-1 p-5 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Level</p>
                                <p className="font-headline text-3xl font-black text-primary">
                                    {athlete.level || 'Belum'}
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-background/40 border border-border/30 text-center">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                                    Kelompok Usia
                                </p>
                                <p className="font-headline text-3xl font-black text-foreground">
                                    {athlete.category || '-'}
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-background/40 border border-border/30 flex flex-col items-center justify-center text-center">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                                    Daya Juang
                                </p>
                                <p className="font-headline text-3xl font-black text-foreground">
                                    {skillScore}
                                    <span className="text-lg font-bold text-muted-foreground">/100</span>
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar Daya Juang */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                <span className="text-muted-foreground">Effort Score</span>
                                <span className="text-foreground">{skillScore}%</span>
                            </div>
                            <Progress value={skillScore} className="h-3 rounded-full" />
                        </div>

                        {/* Catatan Pelatih */}
                        {athlete.coachNotes && (
                            <div className="relative rounded-2xl bg-background/40 border border-border/40 p-5 space-y-3">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4 text-primary" />
                                    <p className="text-xs font-black uppercase tracking-widest text-primary">
                                        Catatan Pelatih
                                    </p>
                                </div>
                                <p className="text-sm text-foreground italic leading-relaxed">
                                    "{athlete.coachNotes}"
                                </p>
                                <div className="flex items-center gap-2 pt-2 border-t border-dashed border-border/50">
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback className="bg-primary text-white text-[10px] font-black">
                                            TP
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-muted-foreground">
                                        Evaluator: {athlete.coachName || 'Tim Pelatih'}
                                    </span>
                                    {athlete.lastAssessmentDate && (
                                        <span className="ml-auto text-[10px] text-muted-foreground font-mono">
                                            {new Date(athlete.lastAssessmentDate).toLocaleDateString('id-ID')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Info Kontrak */}
                        {(athlete.contractDuration || athlete.contractStartDate) && (
                            <div className="grid grid-cols-3 gap-4 pt-2">
                                <InfoRow label="Durasi Kontrak" value={athlete.contractDuration} />
                                <InfoRow label="Mulai Kontrak" value={athlete.contractStartDate} />
                                <InfoRow label="Selesai Kontrak" value={athlete.contractEndDate} />
                            </div>
                        )}

                        {/* Update terakhir */}
                        {athlete.lastAssessmentDate && (
                            <p className="text-[11px] text-muted-foreground text-right font-mono">
                                Update terakhir:{' '}
                                {new Date(athlete.lastAssessmentDate).toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        )}
                    </ModernSection>

                    {/* Target Latihan */}
                    {(athlete.trainingTarget || athlete.championshipTarget?.length > 0) && (
                        <ModernSection title="Target & Program" icon={BookOpen} gradient="from-emerald-500/5 to-green-500/5">
                            <div className="grid grid-cols-2 gap-4">
                                <InfoRow label="Target Latihan" value={athlete.trainingTarget} />
                                <InfoRow label="Jadwal Latihan" value={athlete.trainingSchedule} />
                            </div>
                            {athlete.championshipTarget && athlete.championshipTarget.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                        Target Kejuaraan
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {athlete.championshipTarget.map((t: string, i: number) => (
                                            <Badge key={i} variant="outline" className="text-xs border-emerald-500/40 text-emerald-600">
                                                <Trophy className="w-3 h-3 mr-1" />
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </ModernSection>
                    )}

                </div>
            </div>
        </div>
    );
}
