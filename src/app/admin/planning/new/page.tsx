
'use client';

import React, { useEffect } from 'react';
import { useActionState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Save, Loader2, ArrowLeft } from "lucide-react";
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
            {pending ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> SAVING...</> : <><Save className="w-5 h-5 mr-2" /> SAVE TO MASTERPLAN</>}
        </Button>
    )
}

export default function NewProgramPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [state, formAction] = useActionState(submitProgram, initialState);

    useEffect(() => {
        if (state.success) {
            toast({ title: "Success!", description: state.message });
            router.push('/admin/planning');
        } else if (state.message) {
            toast({ title: "Error", description: state.message, variant: 'destructive' });
        }
    }, [state, router, toast]);

    return (
        <div className="max-w-2xl mx-auto space-y-8">
             <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon" className="h-10 w-10 shrink-0">
                    <Link href="/admin/planning"><ArrowLeft className="w-4 h-4" /></Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-black font-headline uppercase tracking-tighter">New Program</h1>
                    <p className="text-muted-foreground mt-1">Tambahkan rencana kerja baru ke dalam masterplan.</p>
                </div>
            </div>

            <form action={formAction}>
                 <Card className="rounded-[40px] shadow-xl">
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Nama Program</label>
                            <Input name="title" placeholder="Cth: Sewa Lighting Stage" className="bg-secondary border h-14 rounded-2xl text-lg font-bold" required />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Pilar Program (CSR)</label>
                                <Select name="pilar_program" required>
                                    <SelectTrigger className="bg-secondary border h-14 rounded-2xl"><SelectValue placeholder="Pilih Pilar..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="atlet">Atlet Tangguh & Berkarakter</SelectItem>
                                        <SelectItem value="lingkungan">Cinta Lingkungan</SelectItem>
                                        <SelectItem value="keuangan">Literasi Keuangan</SelectItem>
                                        <SelectItem value="komunitas">Kemandirian Komunitas</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Target Sponsor</label>
                                <Select name="sponsor_target" required>
                                    <SelectTrigger className="bg-secondary border h-14 rounded-2xl"><SelectValue placeholder="Pilih Target..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="olahraga">CSR Olahraga</SelectItem>
                                        <SelectItem value="bank">CSR Bank</SelectItem>
                                        <SelectItem value="umum">Umum / Lainnya</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Divisi</label>
                                <Select name="division" required>
                                    <SelectTrigger className="bg-secondary border h-14 rounded-2xl"><SelectValue placeholder="Pilih" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LOGISTICS">Logistics</SelectItem>
                                        <SelectItem value="MEDIA">Media & Creative</SelectItem>
                                        <SelectItem value="MATCH">Match Control</SelectItem>
                                        <SelectItem value="OPERATIONS">Operations</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Estimasi Biaya (Rp)</label>
                                <Input name="costEstimate" type="number" placeholder="0" className="bg-secondary border h-14 rounded-2xl font-mono" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Target Tanggal</label>
                            <Input name="deadline" type="month" className="bg-secondary border h-14 rounded-2xl" required />
                        </div>
                    </CardContent>
                 </Card>
                 <div className="mt-6">
                    <SubmitButton />
                 </div>
            </form>
        </div>
    )
}
