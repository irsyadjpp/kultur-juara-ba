
'use client';

import { useActionState, useEffect } from "react";
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

const SectionCard = ({ icon: Icon, title, description, children, badge }: { icon: React.ElementType, title: string, description?: string, children: React.ReactNode, badge?: string }) => (
  <Card className="rounded-3xl shadow-xl bg-card/80 backdrop-blur-sm border">
    <CardHeader className="p-8 pb-4">
        <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-headline flex items-center gap-3">
                <Icon className="w-6 h-6 text-primary"/> {title}
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
            {pending ? <Loader2 className="w-6 h-6 mr-3 animate-spin"/> : <Save className="w-6 h-6 mr-3"/>}
            {pending ? "Menyimpan..." : "Simpan Program Latihan"}
        </Button>
    )
}

export default function ProgramBuilderPage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(saveTrainingProgram, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({ title: "Berhasil!", description: state.message, className: "bg-green-600 text-white" });
      } else {
        toast({ title: "Gagal", description: state.message, variant: "destructive" });
      }
    }
  }, [state, toast]);

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
                        <Input name="pbName" defaultValue="Kultur Juara PWN" className="h-14 rounded-2xl bg-secondary border-2 border-transparent focus:border-primary"/>
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
                        <Input name="period" type="month" placeholder="Bulan / Tahun" className="h-14 rounded-2xl bg-secondary border-2 border-transparent focus:border-primary"/>
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
                        <Input name="coachName" placeholder="Nama Pelatih" className="h-14 rounded-2xl bg-secondary border-2 border-transparent focus:border-primary"/>
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
                        <Textarea name="objectiveDetails" placeholder="Contoh:&#10;1. Meningkatkan endurance rally di atas 30 pukulan.&#10;2. Konsistensi clear & drop silang.&#10;3. Disiplin footwork recovery ke tengah." className="h-28 rounded-2xl bg-secondary border-2 border-transparent focus:border-primary"/>
                    </div>
                </div>
            </SectionCard>
            
            <SectionCard title="3. Rencana Mingguan (Mikrosiklus)" icon={Calendar} description="Isi detail rencana latihan untuk satu minggu ke depan.">
                <Textarea
                    name="weeklyPlan"
                    rows={15}
                    className="font-mono text-xs bg-secondary border-2 border-transparent focus:border-primary rounded-2xl"
                    placeholder="Gunakan format tabel atau daftar untuk detail harian. Contoh:&#10;&#10;| Hari  | Fokus  | Materi                | Intensitas | Durasi |&#10;|-------|--------|-----------------------|------------|--------|&#10;| Senin | Teknik | Clear, drop, lob attack | Sedang     | 120m   |&#10;| Selasa| Fisik  | Speed & Agility Drill | Tinggi     | 90m    |"
                />
            </SectionCard>

            <div className="flex justify-end pt-6 border-t border-border">
                <SubmitButton />
            </div>
        </div>
      </form>
    </div>
  );
}
