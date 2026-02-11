
'use client';

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import {
    FileSignature, Save, Calendar, Target, Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { saveTrainingProgram } from "./actions";
import { useToast } from "@/hooks/use-toast";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const SectionCard = ({ icon: Icon, title, description, children, badge }: { icon: React.ElementType, title: string, description?: string, children: React.ReactNode, badge?: string }) => (
    <Card className="rounded-3xl shadow-xl bg-card/80 backdrop-blur-sm border">
        <CardHeader className="p-8 pb-4">
            <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-headline flex items-center gap-3">
                    <Icon className="w-6 h-6 text-primary" /> {title}
                </CardTitle>
                {badge && <Badge variant="outline">{badge}</Badge>}
            </div>
            {description && <CardDescription className="pt-1">{description}</CardDescription>}
        </CardHeader>
        <CardContent className="p-8 pt-0">
            {children}
        </CardContent>
    </Card>
);

const initialState = {
    success: false,
    message: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20" disabled={pending}>
            {pending ? <Loader2 className="w-6 h-6 mr-3 animate-spin" /> : <Save className="w-6 h-6 mr-3" />}
            {pending ? "Menyimpan..." : "Simpan Program Latihan"}
        </Button>
    )
}

const initialWeeklyPlan = [
    { day: "Senin", focus: "", material: "", intensity: "Sedang", duration: "120m" },
    { day: "Selasa", focus: "", material: "", intensity: "Tinggi", duration: "90m" },
    { day: "Rabu", focus: "", material: "", intensity: "Sedang", duration: "120m" },
    { day: "Kamis", focus: "", material: "", intensity: "Tinggi", duration: "120m" },
    { day: "Jumat", focus: "", material: "", intensity: "Sedang", duration: "90m" },
    { day: "Sabtu", focus: "", material: "", intensity: "Tinggi", duration: "120m" },
    { day: "Minggu", focus: "Recovery", material: "Stretching / Libur", intensity: "Rendah", duration: "45m" },
];

export default function ProgramBuilderPage() {
    const { toast } = useToast();
    const [state, formAction] = useActionState(saveTrainingProgram, initialState);
    const [weeklyPlan, setWeeklyPlan] = useState(initialWeeklyPlan);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast({ title: "Berhasil!", description: state.message, className: "bg-green-600 text-white" });
                // Optionally reset form here
            } else {
                toast({ title: "Gagal", description: state.message, variant: "destructive" });
            }
        }
    }, [state, toast]);

    const handlePlanChange = (index: number, field: keyof typeof weeklyPlan[0], value: string) => {
        const updatedPlan = [...weeklyPlan];
        updatedPlan[index] = { ...updatedPlan[index], [field]: value };
        setWeeklyPlan(updatedPlan);
    };

    return (
        <div className="space-y-8 p-4 md:p-0">
            <div className="space-y-2">
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">TRAINING PROGRAM BUILDER</Badge>
                <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
                    Rancang Program Latihan
                </h1>
                <p className="text-muted-foreground max-w-xl text-lg">
                    Gunakan form ini untuk membuat program latihan terstruktur berdasarkan prinsip periodisasi.
                </p>
            </div>

            <form action={formAction}>
                <div className="space-y-8">
                    <SectionCard title="1. Identitas Program" icon={FileSignature}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label>Nama PB</Label>
                                <Input name="pbName" defaultValue="Kultur Juara Indonesia" className="h-14 rounded-2xl bg-secondary border-2 border-transparent focus:border-primary" />
                            </div>
                            <div className="space-y-2">
                                <Label>Kelompok Usia</Label>
                                <Select name="ageGroup"><SelectTrigger className="h-14 rounded-2xl bg-secondary border-2 border-transparent focus:border-primary"><SelectValue placeholder="Pilih Usia..." /></SelectTrigger><SelectContent><SelectItem value="U13">U-13</SelectItem><SelectItem value="U15">U-15</SelectItem><SelectItem value="U17">U-17</SelectItem></SelectContent></Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Level Atlet</Label>
                                <Select name="athleteLevel"><SelectTrigger className="h-14 rounded-2xl bg-secondary border-2 border-transparent focus:border-primary"><SelectValue placeholder="Pilih Level..." /></SelectTrigger><SelectContent><SelectItem value="pemula">Pemula</SelectItem><SelectItem value="pratanding">Pratanding</SelectItem><SelectItem value="prestasi">Prestasi</SelectItem></SelectContent></Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Periode Program</Label>
                                <Input name="period" type="month" placeholder="Bulan / Tahun" className="h-14 rounded-2xl bg-secondary border-2 border-transparent focus:border-primary" />
                            </div>
                            <div className="space-y-2">
                                <Label>Fase Periodisasi</Label>
                                <Select name="phase"><SelectTrigger className="h-14 rounded-2xl bg-secondary border-2 border-transparent focus:border-primary"><SelectValue placeholder="Pilih Fase..." /></SelectTrigger><SelectContent>
                                    <SelectItem value="GP">General Preparation (GP)</SelectItem>
                                    <SelectItem value="SP">Specific Preparation (SP)</SelectItem>
                                    <SelectItem value="PC">Pre-Competition (PC)</SelectItem>
                                    <SelectItem value="C">Competition (C)</SelectItem>
                                    <SelectItem value="T">Transition (T)</SelectItem>
                                </SelectContent></Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Pelatih Kepala</Label>
                                <Input name="coachName" placeholder="Nama Pelatih" className="h-14 rounded-2xl bg-secondary border-2 border-transparent focus:border-primary" />
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title="2. Tujuan Program" icon={Target}>
                        <div className="space-y-4">
                            <div>
                                <Label className="text-base font-bold">Tujuan Utama</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-2">
                                    {['Teknik', 'Fisik', 'Taktik', 'Mental', 'Kombinasi'].map(obj => (
                                        <div key={obj}>
                                            <Checkbox
                                                id={`obj-${obj}`}
                                                name="mainObjectives"
                                                value={obj}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={`obj-${obj}`}
                                                className="flex items-center justify-center gap-2 px-3 py-3 rounded-2xl border-2 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 font-semibold bg-secondary border-transparent hover:border-primary/50"
                                            >
                                                {obj}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2 pt-4 border-t">
                                <Label className="text-base font-bold">Penjabaran Tujuan (1-3 Poin Utama)</Label>
                                <Textarea name="objectiveDetails" placeholder="Contoh:&#10;1. Meningkatkan endurance rally di atas 30 pukulan.&#10;2. Konsistensi clear & drop silang.&#10;3. Disiplin footwork recovery ke tengah." className="h-28 rounded-2xl bg-secondary border-2 border-transparent focus:border-primary" />
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title="3. Rencana Mingguan (Mikrosiklus)" icon={Calendar} description="Isi detail rencana latihan untuk satu minggu ke depan.">
                        <Textarea name="weeklyPlan" value={JSON.stringify(weeklyPlan)} className="hidden" readOnly />
                        <Accordion type="single" collapsible className="w-full space-y-2">
                            {weeklyPlan.map((row, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border-border/30 bg-secondary/30 rounded-2xl shadow-inner data-[state=open]:border-primary/50">
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-background border flex items-center justify-center font-bold">{row.day.substring(0, 1)}</div>
                                            <span className="font-bold text-lg text-foreground">{row.day}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="p-6 pt-2 bg-background/30 rounded-b-2xl">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Fokus</Label>
                                                <Select value={row.focus} onValueChange={(value) => handlePlanChange(index, "focus", value)}>
                                                    <SelectTrigger className="h-12 rounded-xl bg-background border-border/50"><SelectValue placeholder="Pilih..." /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Teknik">Teknik</SelectItem>
                                                        <SelectItem value="Fisik">Fisik</SelectItem>
                                                        <SelectItem value="Taktik">Taktik</SelectItem>
                                                        <SelectItem value="Game">Game</SelectItem>
                                                        <SelectItem value="Recovery">Recovery</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Intensitas</Label>
                                                <Select value={row.intensity} onValueChange={(value) => handlePlanChange(index, "intensity", value)}>
                                                    <SelectTrigger className="h-12 rounded-xl bg-background border-border/50"><SelectValue placeholder="Pilih..." /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Rendah">Rendah</SelectItem>
                                                        <SelectItem value="Sedang">Sedang</SelectItem>
                                                        <SelectItem value="Tinggi">Tinggi</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <Label>Materi Latihan</Label>
                                                <Input value={row.material} onChange={(e) => handlePlanChange(index, "material", e.target.value)} placeholder="Drill, pola, game..." className="h-12 rounded-xl bg-background border-border/50" />
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <Label>Durasi</Label>
                                                <Input value={row.duration} onChange={(e) => handlePlanChange(index, "duration", e.target.value)} placeholder="cth: 120m" className="h-12 rounded-xl bg-background border-border/50" />
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </SectionCard>

                    <div className="flex justify-end pt-6 border-t border-border">
                        <SubmitButton />
                    </div>
                </div>
            </form>
        </div>
    );
}
