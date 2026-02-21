'use client';

import { getAllSportScienceEvaluations } from '@/app/admin/(academy)/evaluations/actions';
import { ProgressChart } from '@/components/athlete/progress-chart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { cn } from '@/lib/utils';
import { doc } from 'firebase/firestore';
import {
    Activity,
    ArrowLeft,
    Brain,
    Loader2,
    Ruler,
    ShieldCheck,
    Trophy,
    User,
    Weight
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AthleteData {
    id: string;
    fullName: string;
    nickname?: string;
    pin?: string;
    pob?: string;
    dob?: string;
    gender?: string;
    nik?: string;
    citizenship?: string;
    bloodType?: string;
    rhesus?: string;
    dominantHand?: string;
    phone?: string;
    email?: string;
    socialMedia?: string;
    shoeSize?: number;

    // Alamat
    address?: string;
    district?: string;
    city?: string;
    province?: string;
    postalCode?: string;

    // Sekolah
    schoolName?: string;
    schoolGrade?: string;
    schoolAddress?: string;
    schoolPhone?: string;

    // Antropometri Extended
    ant_height_cm?: number;
    ant_weight_kg?: number;
    ant_arm_span_cm?: number;
    ant_sitting_height?: number;
    ant_leg_length?: number;
    ant_protein_pct?: number;
    ant_bmi_score?: number;
    ant_skeletal_muscle_pct?: number;
    ant_body_fat_pct?: number;

    // Jersey
    shirtSize?: string;
    jerseyName?: string;
    jerseyNameOption?: 'initials' | 'lastName';
    chestWidth?: number;
    waistCircumference?: number;
    jerseyLength?: number;

    // Keluarga & Ortu
    fatherName?: string;
    fatherJob?: string;
    fatherPhone?: string;
    motherName?: string;
    motherJob?: string;
    motherPhone?: string;
    emergencyName?: string;
    emergencyRelation?: string;
    emergencyPhone?: string;

    // Sosio-Econ
    familyStatus?: string;
    numberOfDependents?: number;
    siblingsCount?: number;
    parentIncomeBracket?: string;
    houseStatus?: string;
    transportationToField?: string;
    smartphoneAccess?: string;
    governmentAssistance?: string[];

    // Kesehatan
    seriousInjury?: boolean;
    injuryDetails?: string;
    medicalHistory?: string[];
    allergies?: string;
    surgeryHistory?: boolean;
    routineMedication?: boolean;
    riskDiseaseHistory?: string;
    vaccinationStatus?: string;
    chronicSymptoms?: string[];

    // Habits & Recovery
    nut_urine_color?: number;
    rec_hrv_rmssd?: number;
    rec_doms_perceived?: number;
    averageSleepHours?: number;
    dietaryHabits?: string;
    stayUpLate?: boolean;
    schoolWorkload?: number;

    // Badminton
    startYear?: number;
    pbsiNumber?: string;
    previousClub?: string;
    specialization?: string;
    achievements?: string[];
    level?: string;
    category?: string;
    trainingTarget?: string;
    trainingSchedule?: string;

    // Status
    status?: string;
    niaKji?: string;
    photoUrl?: string;
    skillScore?: number;
    coachNotes?: string;
    coachName?: string;
}

// ─── Modern Section Component ─────────────────────────────────────────────
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
            'relative overflow-hidden rounded-[2rem] border border-border/50 bg-secondary/10 backdrop-blur-2xl transition-all',
            className
        )}
    >
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-30 pointer-events-none', gradient)} />
        <div className="relative p-6 space-y-4">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-background/50 flex items-center justify-center border border-border/50 text-primary shadow-sm">
                    <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-black font-headline tracking-tight uppercase text-foreground">
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
            {value || (typeof value === 'number' && value === 0) ? value : <span className="text-muted-foreground italic font-normal">-</span>}
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
    <div className="flex flex-col gap-2 p-4 rounded-xl bg-background/40 border border-border/30">
        <Icon className={cn('w-4 h-4', color)} />
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className={cn('text-xl font-black font-headline', color)}>
            {value ?? '-'}
            {value !== undefined && value !== null && unit && <span className="text-xs font-bold text-muted-foreground ml-1">{unit}</span>}
        </p>
    </div>
);

export default function ChildDetailPage() {
    const params = useParams();
    const childId = params.id as string;
    const firestore = useFirestore();
    const [evaluations, setEvaluations] = useState<Record<string, any>[]>([]);
    const [loadingEvals, setLoadingEvals] = useState(true);

    const docRef = useMemoFirebase(() => {
        if (!firestore || !childId) return null;
        return doc(firestore, 'athletes', childId);
    }, [firestore, childId]);

    const { data: child, isLoading } = useDoc<AthleteData>(docRef);

    useEffect(() => {
        if (childId) {
            getAllSportScienceEvaluations(childId).then(data => {
                setEvaluations(data);
                setLoadingEvals(false);
            });
        }
    }, [childId]);

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!child) {
        return (
            <div className="text-center py-20">
                <p className="text-muted-foreground">Data anak tidak ditemukan.</p>
                <Link href="/parents/dashboard">
                    <Button variant="outline" className="mt-4"><ArrowLeft className="w-4 h-4 mr-2" /> Kembali</Button>
                </Link>
            </div>
        );
    }

    const age = child.dob ? Math.floor((Date.now() - new Date(child.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : null;

    return (
        <div className="min-h-screen pb-20 space-y-8">
            {/* Header / Nav */}
            <div className="flex items-center justify-between">
                <Link href="/parents/dashboard">
                    <Button variant="ghost" size="sm" className="rounded-full hover:bg-secondary">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Dashboard
                    </Button>
                </Link>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-4">
                    ID Atlet: <span className="font-mono text-foreground">{child.niaKji || child.id?.slice(0, 8)}</span>
                </p>
            </div>

            {/* Profile Header Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-secondary/10 backdrop-blur-2xl p-8 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-violet-600/5 opacity-40 pointer-events-none" />
                <div className="relative flex flex-col md:flex-row items-center gap-8">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-2xl ring-2 ring-primary/20">
                        <AvatarImage src={child.photoUrl || '/avatars/default.png'} />
                        <AvatarFallback className="text-4xl font-black bg-primary/10 text-primary">
                            {child.fullName?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black font-headline uppercase tracking-tighter leading-none">
                                {child.fullName}
                            </h1>
                            {child.nickname && <p className="text-lg text-muted-foreground font-bold mt-1">"{child.nickname}"</p>}
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <Badge className={cn(
                                "border text-xs font-bold px-3 py-1",
                                child.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/30' :
                                    child.status === 'Probation' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' :
                                        'bg-muted text-muted-foreground'
                            )}>
                                {child.status || 'NON-AKTIF'}
                            </Badge>
                            {child.category && <Badge variant="outline" className="text-xs font-bold px-3 py-1">{child.category}</Badge>}
                            {child.level && <Badge variant="secondary" className="text-xs font-bold px-3 py-1">{child.level}</Badge>}
                        </div>
                    </div>

                    <div className="hidden lg:block w-px h-24 bg-border/50" />

                    <div className="grid grid-cols-2 gap-4 min-w-[200px]">
                        <div className="text-center p-3 rounded-2xl bg-background/40 border border-border/30">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Usia</p>
                            <p className="text-2xl font-black font-headline text-primary">{age ? `${age}` : '-'}</p>
                        </div>
                        <div className="text-center p-3 rounded-2xl bg-background/40 border border-border/30">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Akses PIN</p>
                            <p className="text-2xl font-black font-headline text-primary tracking-widest">{child.pin || '------'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column (Personal + Contact) */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Data Pribadi & Alamat */}
                    <ModernSection title="Data Pribadi & Alamat" icon={User} gradient="from-primary/5 to-transparent">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <InfoRow label="Tempat Lahir" value={child.pob} />
                            <InfoRow label="Tanggal Lahir" value={child.dob} />
                            <InfoRow label="Gender" value={child.gender} />
                            <InfoRow label="Kewarganegaraan" value={child.citizenship} />
                            <InfoRow label="Gol. Darah" value={child.bloodType ? `${child.bloodType}${child.rhesus || ''}` : null} />
                            <InfoRow label="Tangan Dominan" value={child.dominantHand} />
                        </div>
                        <Separator className="opacity-50" />
                        <div className="space-y-4">
                            <InfoRow label="Alamat Lengkap" value={child.address} />
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <InfoRow label="Kecamatan" value={child.district} />
                                <InfoRow label="Kota" value={child.city} />
                                <InfoRow label="Provinsi" value={child.province} />
                                <InfoRow label="Kode Pos" value={child.postalCode} />
                            </div>
                        </div>
                        <Separator className="opacity-50" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <InfoRow label="Asal Sekolah" value={child.schoolName} />
                            <InfoRow label="Jenjang/Kelas" value={child.schoolGrade} />
                            <InfoRow label="No. Telp Sekolah" value={child.schoolPhone} />
                        </div>
                    </ModernSection>

                    {/* Antropometri Detail */}
                    <ModernSection title="Antropometri" icon={Ruler} gradient="from-violet-500/5 to-purple-500/5">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <StatTile label="Tinggi" value={child.ant_height_cm} unit="cm" icon={Ruler} color="text-blue-500" />
                            <StatTile label="Berat" value={child.ant_weight_kg} unit="kg" icon={Weight} color="text-green-500" />
                            <StatTile label="Arm Span" icon={Activity} value={child.ant_arm_span_cm} unit="cm" color="text-amber-500" />
                            <StatTile label="Sitting H." icon={User} value={child.ant_sitting_height} unit="cm" color="text-emerald-500" />
                            <StatTile label="Leg Len." icon={Activity} value={child.ant_leg_length} unit="cm" color="text-sky-500" />
                            <StatTile label="Protein" icon={ShieldCheck} value={child.ant_protein_pct} unit="%" color="text-rose-500" />
                        </div>
                        <Separator className="opacity-50" />
                        <div className="grid grid-cols-3 gap-4">
                            <InfoRow label="BMI Score" value={child.ant_bmi_score} />
                            <InfoRow label="Otot Rangka" value={child.ant_skeletal_muscle_pct ? `${child.ant_skeletal_muscle_pct}%` : null} />
                            <InfoRow label="Lemak Tubuh" value={child.ant_body_fat_pct ? `${child.ant_body_fat_pct}%` : null} />
                        </div>
                    </ModernSection>

                    {/* Evaluasi Progress */}
                    <Card className="rounded-[2.5rem] border border-border/50 bg-secondary/10 backdrop-blur-2xl overflow-hidden">
                        <div className="bg-gradient-to-br from-primary/5 to-transparent p-6 md:p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-black uppercase tracking-tight text-xl flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                                        <Trophy className="w-5 h-5" />
                                    </div>
                                    Progress Sport Science
                                </h3>
                            </div>

                            {loadingEvals ? (
                                <div className="flex items-center justify-center py-20">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                </div>
                            ) : (
                                <ProgressChart evaluations={evaluations} />
                            )}
                        </div>
                    </Card>
                </div>

                {/* Right Column (Badminton + Health + Jersey) */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Riwayat Badminton */}
                    <ModernSection title="Badminton" icon={Trophy} gradient="from-orange-500/5 to-red-500/5">
                        <div className="space-y-4">
                            <InfoRow label="Mulai Latihan" value={child.startYear} />
                            <InfoRow label="No. PBSI" value={child.pbsiNumber} />
                            <InfoRow label="Spesialisasi" value={child.specialization} />
                            <InfoRow label="Klub Asal" value={child.previousClub} />
                            <div className="pt-2">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Target & Jadwal</p>
                                <InfoRow label="Target" value={child.trainingTarget} />
                                <InfoRow label="Jadwal" value={child.trainingSchedule} />
                            </div>
                        </div>
                    </ModernSection>

                    {/* Kesehatan */}
                    <ModernSection title="Kesehatan" icon={ShieldCheck} gradient="from-red-500/5 to-pink-500/5">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <InfoRow label="Cedera Serius" value={child.seriousInjury ? "Ada" : "Tidak"} />
                                <InfoRow label="Alergi" value={child.allergies} />
                            </div>
                            <InfoRow label="Riwayat Medis" value={child.medicalHistory?.join(", ")} />
                            <InfoRow label="Pernah Operasi" value={child.surgeryHistory ? "Ya" : "Tidak"} />
                            <InfoRow label="Obat Rutin" value={child.routineMedication ? "Ya" : "Tidak"} />
                            <InfoRow label="Gejala Kronis" value={child.chronicSymptoms?.join(", ")} />
                        </div>
                    </ModernSection>

                    {/* Jersey & Habits */}
                    <ModernSection title="Equipment & Habits" icon={Brain} gradient="from-blue-500/5 to-cyan-500/5">
                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <InfoRow label="Size Jersey" value={child.shirtSize} />
                                <InfoRow label="Nama Jersey" value={child.jerseyName} />
                                <InfoRow label="Ukuran Sepatu" value={child.shoeSize} />
                                <InfoRow label="Jam Tidur" value={child.averageSleepHours} />
                            </div>
                            <Separator className="opacity-50" />
                            <div className="space-y-3">
                                <InfoRow label="Pola Makan" value={child.dietaryHabits} />
                                <InfoRow label="Sering Begadang" value={child.stayUpLate ? "Ya" : "Tidak"} />
                                <InfoRow label="Beban Sekolah" value={child.schoolWorkload} />
                            </div>
                        </div>
                    </ModernSection>

                    {/* Catatan Pelatih */}
                    {child.coachNotes && (
                        <div className="relative rounded-[2rem] border border-primary/20 bg-primary/5 p-6 space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-black">
                                    TP
                                </div>
                                <p className="text-xs font-black uppercase tracking-widest text-primary">Catatan Pelatih</p>
                            </div>
                            <p className="text-sm text-foreground italic leading-relaxed">
                                "{child.coachNotes}"
                            </p>
                            <p className="text-[10px] text-muted-foreground font-bold">Evaluator: {child.coachName || 'Tim Pelatih'}</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
