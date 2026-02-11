'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Loader2, ArrowLeft, Target, DollarSign, Calendar, Zap } from "lucide-react";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { submitProgram } from './actions';

const initialState = {
    success: false,
    message: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" className="w-full h-16 rounded-full font-black text-lg bg-primary hover:bg-primary/90 text-primary-foreground mt-4 shadow-xl shadow-primary/20" disabled={pending}>
            {pending ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> MENYIMPAN...</> : <><Save className="w-5 h-5 mr-2" /> AJUKAN PROGRAM</>}
        </Button>
    )
}

export default function NewProgramPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [state, formAction] = useActionState(submitProgram, initialState);

    useEffect(() => {
        if (state.success) {
            toast({ title: "Success!", description: state.message, className: "bg-green-600 text-white" });
            router.push('/admin/planning');
        } else if (state.message) {
            toast({ title: "Error", description: state.message, variant: 'destructive' });
        }
    }, [state, router, toast]);

    return (
        <div className="max-w-3xl mx-auto space-y-8">
             <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon" className="h-10 w-10 shrink-0">
                    <Link href="/admin/planning"><ArrowLeft className="w-4 h-4" /></Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-black font-headline uppercase tracking-tighter">Program Baru</h1>
                    <p className="text-muted-foreground mt-1">Isi detail rencana kerja untuk diajukan ke dalam masterplan.</p>
                </div>
            </div>

            <form action={formAction}>
                 <Card className="rounded-[2.5rem] shadow-xl">
                    <CardHeader className="p-8">
                       <CardTitle className="text-xl font-bold font-headline">Detail Program</CardTitle>
                       <p className="text-sm text-muted-foreground">Informasi utama mengenai program yang akan dijalankan.</p>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Nama Program</Label>
                            <Input id="title" name="title" placeholder="Cth: Sewa Lighting Stage untuk Final" className="bg-secondary border h-14 rounded-2xl text-lg font-bold" required />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="objective" className="flex items-center gap-2"><Target className="w-4 h-4" /> Tujuan & Output Program</Label>
                            <Textarea id="objective" name="objective" placeholder="Jelaskan tujuan utama program ini dan apa output konkretnya (misal: 'Meningkatkan visibilitas acara di malam hari, output: 4 unit lighting tower')" className="bg-secondary border h-24 rounded-2xl" required />
                        </div>
                    </CardContent>
                 </Card>

                 <Card className="rounded-[2.5rem] shadow-xl mt-8">
                    <CardHeader className="p-8">
                       <CardTitle className="text-xl font-bold font-headline">Klasifikasi & Anggaran</CardTitle>
                       <p className="text-sm text-muted-foreground">Kategorikan program untuk keperluan pelaporan dan RAB.</p>
                    </CardHeader>
                     <CardContent className="p-8 pt-0 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="pilar_program">Pilar Program (CSR)</Label>
                                <Select name="pilar_program" required>
                                    <SelectTrigger id="pilar_program" className="bg-secondary border h-14 rounded-2xl"><SelectValue placeholder="Pilih Pilar..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="atlet">Atlet Tangguh & Berkarakter</SelectItem>
                                        <SelectItem value="lingkungan">Cinta Lingkungan</SelectItem>
                                        <SelectItem value="keuangan">Literasi Keuangan</SelectItem>
                                        <SelectItem value="komunitas">Kemandirian Komunitas</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sponsor_target">Target Sponsor</Label>
                                <Select name="sponsor_target" required>
                                    <SelectTrigger id="sponsor_target" className="bg-secondary border h-14 rounded-2xl"><SelectValue placeholder="Pilih Target..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="olahraga">CSR Olahraga</SelectItem>
                                        <SelectItem value="bank">CSR Bank</SelectItem>
                                        <SelectItem value="umum">Umum / Lainnya</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="division">Divisi Penanggung Jawab</Label>
                                <Select name="division" required>
                                    <SelectTrigger id="division" className="bg-secondary border h-14 rounded-2xl"><SelectValue placeholder="Pilih" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LOGISTICS">Logistics</SelectItem>
                                        <SelectItem value="MEDIA">Media & Creative</SelectItem>
                                        <SelectItem value="MATCH">Match Control</SelectItem>
                                        <SelectItem value="OPERATIONS">Operations</SelectItem>
                                         <SelectItem value="FINANCE">Finance</SelectItem>
                                         <SelectItem value="IT">IT &amp; System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="costEstimate" className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> Estimasi Biaya (Rp)</Label>
                                <Input id="costEstimate" name="costEstimate" type="number" placeholder="0" className="bg-secondary border h-14 rounded-2xl font-mono text-lg" required />
                            </div>
                        </div>
                     </CardContent>
                 </Card>
                 
                 <Card className="rounded-[2.5rem] shadow-xl mt-8">
                     <CardHeader className="p-8">
                       <CardTitle className="text-xl font-bold font-headline">Jadwal & Prioritas</CardTitle>
                       <p className="text-sm text-muted-foreground">Tentukan urgensi dan waktu pelaksanaan program.</p>
                    </CardHeader>
                     <CardContent className="p-8 pt-0 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="deadline" className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Target Pelaksanaan</Label>
                                <Input id="deadline" name="deadline" type="month" className="bg-secondary border h-14 rounded-2xl" required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="priority" className="flex items-center gap-2"><Zap className="w-4 h-4" /> Prioritas (MoSCoW)</Label>
                                <Select name="priority" required>
                                    <SelectTrigger id="priority" className="bg-secondary border h-14 rounded-2xl"><SelectValue placeholder="Pilih Prioritas..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="MUST">MUST - Wajib ada, tanpa ini acara gagal</SelectItem>
                                        <SelectItem value="SHOULD">SHOULD - Penting, tapi ada alternatif jika gagal</SelectItem>
                                        <SelectItem value="COULD">COULD - Bagus jika ada, tapi tidak krusial</SelectItem>
                                        <SelectItem value="WONT">WON'T - Tidak akan dikerjakan saat ini</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                     </CardContent>
                 </Card>
                 
                 <div className="mt-8">
                    <SubmitButton />
                 </div>
            </form>
        </div>
    )
}