'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Loader2, Upload, UserPlus } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { selfRegisterAthlete } from './actions';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button size="lg" disabled={pending} className="w-full h-16 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 text-lg">
            {pending ? <><Loader2 className="mr-2 animate-spin" />Mengirim...</> : <><UserPlus className="mr-2 w-5 h-5" />Kirim Pendaftaran</>}
        </Button>
    );
}

const Field = ({ label, name, type = 'text', required = false, placeholder = '', ...props }: any) => (
    <div className="space-y-1.5">
        <Label htmlFor={name} className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Input id={name} name={name} type={type} required={required} placeholder={placeholder}
            className="h-12 rounded-xl bg-background/60 border-border/50" {...props} />
    </div>
);

export default function GuestRegisterPage() {
    const { toast } = useToast();
    const [state, formAction] = useActionState(selfRegisterAthlete, { success: false, message: '' });

    useEffect(() => {
        if (state?.message) {
            toast({
                title: state.success ? '🎉 Berhasil!' : 'Gagal',
                description: state.message,
                variant: state.success ? 'default' : 'destructive',
                className: state.success ? 'bg-green-700 text-white border-none' : undefined,
            });
        }
    }, [state, toast]);

    if (state?.success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-green-500/5 to-background">
                <div className="max-w-md text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-black font-headline uppercase tracking-tighter">Pendaftaran Terkirim!</h1>
                    <p className="text-muted-foreground">{state.message}</p>
                    <p className="text-sm text-muted-foreground">Kamu akan mendapat notifikasi setelah data diverifikasi oleh tim Kultur Juara.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background py-12 px-4">
            <div className="max-w-2xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-4">
                    <Badge className="bg-primary/10 text-primary border-primary/30 text-xs font-bold px-4 py-1.5">
                        <UserPlus className="w-3 h-3 mr-2" /> PENDAFTARAN MANDIRI
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter">
                        Gabung di<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                            Kultur Juara BA
                        </span>
                    </h1>
                    <p className="text-muted-foreground text-base max-w-md mx-auto">
                        Isi formulir di bawah untuk mendaftar sebagai calon atlet. Data kamu akan akan direview oleh admin dan pelatih.
                    </p>
                </div>

                <form action={formAction} className="space-y-6">
                    {/* Data Pribadi */}
                    <div className="rounded-[2rem] border border-border/50 bg-card/50 backdrop-blur-sm p-6 space-y-4">
                        <h3 className="font-black uppercase tracking-widest text-sm text-foreground">📝 Data Pribadi</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Nama Lengkap" name="fullName" required placeholder="Sesuai akta lahir" />
                            <Field label="Nama Panggilan" name="nickname" placeholder="Nama panggilan" />
                            <Field label="Tempat Lahir" name="pob" placeholder="Kota kelahiran" />
                            <Field label="Tanggal Lahir" name="dob" type="date" required />
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    Jenis Kelamin <span className="text-red-500">*</span>
                                </Label>
                                <Select name="gender" required>
                                    <SelectTrigger className="h-12 rounded-xl bg-background/60 border-border/50"><SelectValue placeholder="Pilih..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    Kategori Usia <span className="text-red-500">*</span>
                                </Label>
                                <Select name="category" required>
                                    <SelectTrigger className="h-12 rounded-xl bg-background/60 border-border/50"><SelectValue placeholder="Pilih..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="U9">U9</SelectItem>
                                        <SelectItem value="U11">U11</SelectItem>
                                        <SelectItem value="U15">U15</SelectItem>
                                        <SelectItem value="U17">U17</SelectItem>
                                        <SelectItem value="U19">U19</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Kontak */}
                    <div className="rounded-[2rem] border border-border/50 bg-card/50 backdrop-blur-sm p-6 space-y-4">
                        <h3 className="font-black uppercase tracking-widest text-sm text-foreground">📱 Kontak & Sekolah</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Email" name="email" type="email" required placeholder="email@contoh.com" />
                            <Field label="No. HP / WhatsApp" name="phone" type="tel" required placeholder="08xxxxxxxxxx" />
                            <Field label="Alamat" name="address" placeholder="Jalan, RT/RW" className="sm:col-span-2" />
                            <Field label="Kota" name="city" placeholder="Kota/Kabupaten" />
                            <Field label="Provinsi" name="province" placeholder="Provinsi" />
                            <Field label="Nama Sekolah" name="schoolName" placeholder="SDN/SMP/SMA..." className="sm:col-span-2" />
                        </div>
                    </div>

                    {/* Orang Tua */}
                    <div className="rounded-[2rem] border border-border/50 bg-card/50 backdrop-blur-sm p-6 space-y-4">
                        <h3 className="font-black uppercase tracking-widest text-sm text-foreground">👨‍👩‍👧 Orang Tua / Wali</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Nama Orang Tua" name="parentName" placeholder="Nama ayah/ibu" />
                            <Field label="No. HP Orang Tua" name="parentPhone" type="tel" placeholder="08xxxxxxxxxx" />
                            <Field label="Email Orang Tua" name="parentEmail" type="email" placeholder="Untuk akses Parent Portal" className="sm:col-span-2" />
                        </div>
                    </div>

                    {/* Upload Dokumen */}
                    <div className="rounded-[2rem] border border-border/50 bg-card/50 backdrop-blur-sm p-6 space-y-4">
                        <h3 className="font-black uppercase tracking-widest text-sm text-foreground">📎 Upload Dokumen</h3>
                        <p className="text-xs text-muted-foreground">Upload foto/scan dokumen. Format: JPG, PNG, atau PDF.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                                    <Upload className="w-3 h-3" /> Pas Foto
                                </Label>
                                <Input name="filePhoto" type="file" accept="image/*" className="h-12 rounded-xl bg-background/60 file:mr-2 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-bold file:text-xs" />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                                    <Upload className="w-3 h-3" /> Kartu Keluarga
                                </Label>
                                <Input name="fileKK" type="file" accept="image/*,.pdf" className="h-12 rounded-xl bg-background/60 file:mr-2 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-bold file:text-xs" />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                                    <Upload className="w-3 h-3" /> Akta Kelahiran
                                </Label>
                                <Input name="fileAkta" type="file" accept="image/*,.pdf" className="h-12 rounded-xl bg-background/60 file:mr-2 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-bold file:text-xs" />
                            </div>
                        </div>
                    </div>

                    <SubmitButton />

                    <p className="text-center text-xs text-muted-foreground">
                        Dengan mengirimkan formulir ini, kamu menyetujui bahwa data yang diisi adalah benar dan dapat diverifikasi.
                    </p>
                </form>
            </div>
        </div>
    );
}
