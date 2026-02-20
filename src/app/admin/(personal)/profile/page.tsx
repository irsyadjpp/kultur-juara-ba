'use client';

import { getSession } from '@/app/actions';
import { IdCardTemplate } from '@/components/academy/id-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
    ArrowLeft,
    Camera,
    CreditCard,
    Instagram,
    Loader2,
    Mail,
    MapPin,
    PenTool,
    Phone,
    Printer,
    Save,
    ShieldCheck,
    Upload,
    User,
    Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateProfile } from './actions';

// ─── Role Labels ─────────────────────────────────────────────────────────────
const ROLE_LABELS: Record<string, { label: string; color: string }> = {
    SUPER_ADMIN: { label: 'Super Admin', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' },
    ADMIN: { label: 'Admin', color: 'bg-blue-500/10 text-blue-500 border-blue-500/30' },
    HEAD_COACH: { label: 'Pelatih Kepala', color: 'bg-primary/10 text-primary border-primary/30' },
    COACH: { label: 'Pelatih', color: 'bg-primary/10 text-primary border-primary/30' },
    ASSISTANT_COACH: { label: 'Asisten Pelatih', color: 'bg-green-500/10 text-green-500 border-green-500/30' },
    PSYCHOLOGIST: { label: 'Psikolog Olahraga', color: 'bg-purple-500/10 text-purple-500 border-purple-500/30' },
    ATHLETE: { label: 'Atlet', color: 'bg-red-500/10 text-red-500 border-red-500/30' },
};

// ─── Modern Section Component ─────────────────────────────────────────────────
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

// ─── Submit Button ────────────────────────────────────────────────────────────
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={pending}
            size="lg"
            className="w-full h-14 rounded-2xl text-base font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all"
        >
            {pending ? (
                <><Loader2 className="mr-2 animate-spin" /> MENYIMPAN...</>
            ) : (
                <><Save className="mr-2 w-5 h-5" /> SIMPAN PERUBAHAN</>
            )}
        </Button>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminProfilePage() {
    const { toast } = useToast();
    const [session, setSession] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [state, formAction] = useActionState(updateProfile, { success: false, message: '' });

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const avatarInputRef = useRef<HTMLInputElement>(null);
    const signatureInputRef = useRef<HTMLInputElement>(null);
    const idCardRef = useRef<HTMLDivElement>(null);

    // Load session
    useEffect(() => {
        getSession().then((s) => {
            if (s) {
                setSession(s);
                setAvatarPreview(s.avatar || null);
            }
            setLoading(false);
        });
    }, []);

    // Toast on form save
    useEffect(() => {
        if (state.message) {
            toast({
                title: state.success ? 'Berhasil!' : 'Gagal',
                description: state.message,
                variant: state.success ? 'default' : 'destructive',
                className: state.success ? 'bg-green-600 text-white border-none' : undefined,
            });
        }
    }, [state]);

    // Handle file preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'signature') => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            if (type === 'avatar') setAvatarPreview(url);
            else setSignaturePreview(url);
        }
    };

    // Download ID Card as PDF
    const handleDownloadIdCard = async () => {
        if (!idCardRef.current) return;
        setIsGenerating(true);
        try {
            const canvas = await html2canvas(idCardRef.current, {
                scale: 3,
                backgroundColor: null,
                useCORS: true,
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4');
            const imgWidth = 200;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.save(`ID-CARD-${session?.name?.replace(/\s/g, '-') || 'USER'}.pdf`);
            toast({ title: 'Berhasil!', description: 'ID Card berhasil diunduh.', className: 'bg-green-600 text-white' });
        } catch (err) {
            toast({ title: 'Gagal', description: 'Terjadi kesalahan saat generate PDF.', variant: 'destructive' });
        } finally {
            setIsGenerating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // ─── Computed values from session ─────────────────────
    const userName = session?.name || 'Pengguna';
    const userEmail = session?.email || '-';
    const userRole = session?.role || 'ADMIN';
    const userAvatar = session?.avatar || null;
    const roleInfo = ROLE_LABELS[userRole] || { label: userRole, color: 'bg-muted text-muted-foreground border-border' };
    const initials = userName
        .split(' ')
        .slice(0, 2)
        .map((n: string) => n[0])
        .join('')
        .toUpperCase();

    // Build user object for IdCard
    const idCardUser = {
        name: userName,
        email: userEmail,
        role: roleInfo.label,
        division: 'PB. KULTUR JUARA',
        id_number: `KJ-${userRole.slice(0, 2)}-${new Date().getFullYear()}`,
        avatar: userAvatar,
        photoUrl: avatarPreview || userAvatar || undefined,
        signature: null,
    };

    return (
        <div className="min-h-screen pb-20 space-y-8">

            {/* ── HEADER ─────────────────────────────────────────── */}
            <div className="space-y-6">
                <Link
                    href="/admin/dashboard"
                    className="inline-flex items-center text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Link>

                <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-border pb-6">
                    <div className="relative">
                        <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                        <div className="relative flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs mb-2">
                            <ShieldCheck className="w-4 h-4" /> Official Staff Profile
                        </div>
                        <h1 className="relative text-5xl md:text-6xl font-black font-headline uppercase tracking-tighter text-foreground leading-[0.9]">
                            {userName}
                        </h1>
                        <p className="relative text-muted-foreground font-mono mt-2 text-sm">
                            {userEmail} •{' '}
                            <span className="text-green-500 font-bold">● ACTIVE</span>
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2">
                        <Badge className={cn('border text-xs font-bold px-3 py-1', roleInfo.color)}>
                            {roleInfo.label}
                        </Badge>
                        <p className="text-2xl font-black font-headline text-foreground">
                            PB. KULTUR JUARA
                        </p>
                    </div>
                </div>

                {/* ID Card Button */}
                <div className="flex justify-end">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="h-12 border-primary/40 text-primary bg-primary/5 hover:bg-primary/10 font-bold px-6 rounded-2xl"
                            >
                                <CreditCard className="mr-2 w-5 h-5" /> LIHAT ID CARD SAYA
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-full bg-secondary border-border p-0 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                            <div className="p-6 border-b shrink-0">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-headline font-bold uppercase tracking-widest flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-primary" /> Official ID Card
                                    </DialogTitle>
                                    <DialogDescription>Pratinjau tampilan cetak (Depan & Belakang).</DialogDescription>
                                </DialogHeader>
                            </div>
                            <div className="flex-1 overflow-auto bg-background/50 p-8 md:p-12">
                                <div className="min-h-[500px] flex items-center justify-center">
                                    <div className="relative transform md:scale-100 scale-[0.6] origin-top md:origin-center">
                                        <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full opacity-40 pointer-events-none" />
                                        <div className="relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden bg-white ring-1 ring-black/10">
                                            <IdCardTemplate user={idCardUser} className="w-[650px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border-t bg-card flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-primary font-bold">TIPS:</span> Gunakan kertas PVC atau Art Paper 260gr.
                                </p>
                                <Button
                                    onClick={handleDownloadIdCard}
                                    disabled={isGenerating}
                                    size="lg"
                                    className="w-full md:w-auto font-bold shadow-lg"
                                >
                                    {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <Printer className="mr-2 w-4 h-4" />}
                                    {isGenerating ? 'GENERATING...' : 'DOWNLOAD PDF'}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* ── Hidden ID Card template for PDF ── */}
            <div className="fixed top-0 left-0 pointer-events-none opacity-0 z-[-1]">
                <div className="scale-[2] origin-top-left">
                    <IdCardTemplate ref={idCardRef} user={idCardUser} />
                </div>
            </div>

            {/* ── FORM ─────────────────────────────────────────────── */}
            <form action={formAction}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* ── Kolom Kiri ── */}
                    <div className="space-y-6">

                        {/* Avatar */}
                        <ModernSection title="Foto Profil" icon={Camera} gradient="from-primary/5 to-transparent">
                            <div className="flex flex-col items-center pb-2">
                                <div
                                    className="relative group cursor-pointer"
                                    onClick={() => avatarInputRef.current?.click()}
                                >
                                    <Avatar className="w-40 h-40 border-4 border-secondary shadow-xl transition-all group-hover:border-primary ring-2 ring-primary/10">
                                        <AvatarImage src={avatarPreview || ''} className="object-cover" />
                                        <AvatarFallback className="text-4xl font-black bg-secondary text-muted-foreground">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                                <p className="text-xs text-center text-muted-foreground mt-4 max-w-[180px]">
                                    Klik foto untuk mengganti. Foto formal/semi-formal. (Max 2MB)
                                </p>
                                <input
                                    type="file"
                                    name="avatar"
                                    ref={avatarInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'avatar')}
                                />
                            </div>
                        </ModernSection>

                        {/* Digital Signature */}
                        <ModernSection title="Tanda Tangan Digital" icon={PenTool} gradient="from-violet-500/5 to-purple-500/5">
                            <div
                                className="border-2 border-dashed border-border rounded-2xl h-32 flex items-center justify-center bg-background/30 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all relative overflow-hidden"
                                onClick={() => signatureInputRef.current?.click()}
                            >
                                {signaturePreview ? (
                                    <img src={signaturePreview} alt="Signature" className="h-full w-auto object-contain p-2" />
                                ) : (
                                    <div className="text-center">
                                        <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                                        <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                                            Upload Scan TTD
                                        </span>
                                    </div>
                                )}
                            </div>
                            <p className="text-[10px] text-muted-foreground">
                                *Upload scan tanda tangan (PNG Transparan) untuk keperluan e-sertifikat & surat tugas.
                            </p>
                            <input
                                type="file"
                                name="signature"
                                ref={signatureInputRef}
                                className="hidden"
                                accept="image/png, image/jpeg"
                                onChange={(e) => handleFileChange(e, 'signature')}
                            />
                        </ModernSection>

                    </div>

                    {/* ── Kolom Kanan ── */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Informasi Personal */}
                        <ModernSection title="Informasi Personal" icon={User} gradient="from-blue-500/5 to-cyan-500/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        Nama Lengkap (Read Only)
                                    </Label>
                                    <Input disabled value={userName} className="bg-secondary/50 border-none font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nickname" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        Nama Panggilan
                                    </Label>
                                    <Input id="nickname" name="nickname" placeholder="Sapaan akrab..." className="bg-background/40 border-border/50" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <Phone className="w-3 h-3 inline mr-1" />No. WhatsApp
                                    </Label>
                                    <Input id="phone" name="phone" type="tel" placeholder="08xxxxxxxxxx" className="bg-background/40 border-border/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="instagram" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <Instagram className="w-3 h-3 inline mr-1" />Instagram
                                    </Label>
                                    <Input id="instagram" name="instagram" placeholder="@username" className="bg-background/40 border-border/50" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    <MapPin className="w-3 h-3 inline mr-1" />Alamat Domisili
                                </Label>
                                <Textarea
                                    id="address"
                                    name="address"
                                    rows={2}
                                    placeholder="Jl. ..."
                                    className="resize-none bg-background/40 border-border/50"
                                />
                            </div>
                        </ModernSection>

                        {/* Logistik & Role */}
                        <ModernSection title="Logistik & Atribut" icon={Zap} gradient="from-yellow-500/5 to-orange-500/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        Ukuran Jersey (Official)
                                    </Label>
                                    <Select name="shirtSize" defaultValue="M">
                                        <SelectTrigger className="h-11 bg-background/40 border-border/50">
                                            <SelectValue placeholder="Pilih Ukuran" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {['S', 'M', 'L', 'XL', 'XXL', '3XL'].map((s) => (
                                                <SelectItem key={s} value={s}>{s}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <p className="text-[10px] text-muted-foreground">
                                        *Pastikan ukuran sudah benar, tidak bisa tukar setelah produksi.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <Mail className="w-3 h-3 inline mr-1" />Email Akun (Read Only)
                                    </Label>
                                    <Input disabled value={userEmail} className="bg-secondary/50 border-none font-mono text-sm" />
                                </div>
                            </div>

                            <Separator className="opacity-50" />

                            {/* Role Info (read only display) */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Role Sistem</span>
                                    <Badge className={cn('w-fit border text-xs font-bold px-3 py-1', roleInfo.color)}>
                                        {roleInfo.label}
                                    </Badge>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Organisasi</span>
                                    <span className="text-sm font-bold text-foreground">PB. Kultur Juara</span>
                                </div>
                            </div>
                        </ModernSection>

                        <SubmitButton />
                    </div>
                </div>
            </form>
        </div>
    );
}
