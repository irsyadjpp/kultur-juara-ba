'use client';

import { useFormState, useFormStatus } from "react-dom";
import {
  Dumbbell, HeartPulse, Target, User,
  Save, UserSquare, Ruler, Activity, Weight, Wind, StretchVertical, Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { savePhysicalEvaluation, type AthleteSelectOption } from "../actions";
import { useEffect } from "react";
import { toast } from "sonner";

// --- Custom Components for this page ---
const SectionCard = ({ icon: Icon, title, description, children }: { icon: React.ElementType, title: string, description?: string, children: React.ReactNode }) => (
  <Card className="rounded-3xl shadow-xl">
    <CardHeader className="p-8 pb-4">
      <CardTitle className="text-xl font-headline flex items-center gap-3">
        <Icon className="w-6 h-6 text-primary" /> {title}
      </CardTitle>
      {description && <CardDescription className="pt-1">{description}</CardDescription>}
    </CardHeader>
    <CardContent className="p-8 pt-0">
      {children}
    </CardContent>
  </Card>
);

const MetricInput = ({ label, unit, name, step = "0.1", ...props }: { label: string, unit: string, name: string, step?: string } & React.ComponentProps<typeof Input>) => (
  <div className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    <div className="flex items-center gap-2">
      <Input id={name} name={name} type="number" step={step} className="h-12 rounded-xl font-mono bg-secondary border" {...props} />
      <span className="text-sm font-mono text-muted-foreground">{unit}</span>
    </div>
  </div>
);

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="lg" disabled={pending} className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
      <Save className="w-6 h-6 mr-3" /> {pending ? 'Menyimpan...' : 'Simpan Evaluasi'}
    </Button>
  );
}

// --- Main Form Component ---
export default function PhysicalEvaluationForm({ athletes }: { athletes: AthleteSelectOption[] }) {
  const [state, formAction] = useFormState(savePhysicalEvaluation, null);

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-8">

      {/* IDENTITAS ATLET */}
      <SectionCard title="Identitas Atlet & Sesi" icon={UserSquare}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label>Nama Atlet</Label>
            <Select name="athleteId" required>
              <SelectTrigger className="h-14 rounded-xl text-base bg-secondary border">
                <SelectValue placeholder="Pilih Atlet..." />
              </SelectTrigger>
              <SelectContent>
                {athletes.map((athlete) => (
                  <SelectItem key={athlete.id} value={athlete.id}>
                    {athlete.name} {athlete.nickname ? `(${athlete.nickname})` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Periode Evaluasi</Label>
            <Input name="period" type="month" required className="h-14 rounded-xl bg-secondary border" />
          </div>
          <div className="space-y-2">
            <Label>Pelatih Fisik</Label>
            <Input name="evaluator" placeholder="Nama Pelatih" className="h-14 rounded-xl bg-secondary border" />
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">

          {/* 3. DATA FISIK & ANTROPOMETRI */}
          <SectionCard title="Antropometri" icon={Ruler} description="Pengukuran dasar komposisi tubuh.">
            <div className="grid grid-cols-2 gap-4">
              <MetricInput label="Tinggi Badan" unit="cm" name="ant_height_cm" />
              <MetricInput label="Berat Badan" unit="kg" name="ant_weight_kg" />
              <div className="col-span-2 bg-secondary p-3 rounded-lg text-center hidden">
                <p className="text-xs text-muted-foreground">Body Mass Index (BMI)</p>
                <p className="text-2xl font-bold font-mono">-</p>
              </div>
              <MetricInput label="Panjang Lengan" unit="cm" name="ant_arm_span_cm" />
              <MetricInput label="Tinggi Duduk" unit="cm" name="ant_sitting_height" />
              <MetricInput label="Panjang Tungkai" unit="cm" name="ant_leg_length" />
              <MetricInput label="VO2Max (Est.)" unit="ml/kg/min" name="phy_vo2max" />
            </div>
          </SectionCard>

          {/* 3.1. KOMPOSISI TUBUH DETAILED */}
          <SectionCard title="Komposisi Tubuh & Vitals" icon={Weight} description="Pengukuran InBody/Tanita dan Tanda Vital.">
            <div className="space-y-6">
              {/* Vital */}
              <div className="grid grid-cols-3 gap-4">
                <MetricInput label="Tekanan Darah (Sys)" unit="mmHg" name="vit_blood_pressure_sys" step="1" />
                <MetricInput label="Tekanan Darah (Dia)" unit="mmHg" name="vit_blood_pressure_dia" step="1" />
                <MetricInput label="Denyut Nadi Istirahat" unit="bpm" name="vit_heart_rate_resting" step="1" />
              </div>
              {/* Body Comp */}
              <div className="grid grid-cols-2 gap-4">
                <MetricInput label="Body Fat" unit="%" name="ant_body_fat_percent" />
                <MetricInput label="Muscle Mass" unit="%" name="ant_muscle_mass_percent" />

                <div className="col-span-2 space-y-2">
                  <Label>Somatotype (Tipe Tubuh)</Label>
                  <Select name="ant_somatotype">
                    <SelectTrigger className="h-12 rounded-xl bg-secondary border">
                      <SelectValue placeholder="Pilih Tipe Tubuh" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ectomorph">Ectomorph</SelectItem>
                      <SelectItem value="Mesomorph">Mesomorph</SelectItem>
                      <SelectItem value="Endomorph">Endomorph</SelectItem>
                      <SelectItem value="Ecto-Mesomorph">Ecto-Mesomorph</SelectItem>
                      <SelectItem value="Meso-Endomorph">Meso-Endomorph</SelectItem>
                      <SelectItem value="Balanced">Balanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* 4. TES KEKUATAN */}
          <SectionCard title="Tes Kekuatan" icon={Dumbbell} description="Mengukur daya ledak otot.">
            <div className="space-y-4">
              <MetricInput label="Vertical Jump" unit="cm" name="phy_vertical_jump_cm" />
              <MetricInput label="Push-up (1 Menit)" unit="reps" name="phy_push_up_reps" step="1" />
              <MetricInput label="Sit-up (1 Menit)" unit="reps" name="phy_sit_up_reps" step="1" />
            </div>
          </SectionCard>

        </div>

        <div className="space-y-8">

          {/* 4. TES KECEPATAN & AGILITY */}
          <SectionCard title="Kecepatan & Agility" icon={Wind} description="Mengukur akselerasi dan perubahan arah.">
            <div className="space-y-4">
              <MetricInput label="Sprint 10m" unit="detik" name="phy_sprint_10m_sec" />
              <MetricInput label="Agility Test" unit="detik" name="phy_agility_test_sec" />
            </div>
          </SectionCard>

          {/* 4. TES FLEKSIBILITAS */}
          <SectionCard title="Fleksibilitas" icon={StretchVertical} description="Mengukur rentang gerak sendi.">
            <div className="space-y-4">
              <MetricInput label="Sit & Reach" unit="cm" name="phy_flexibility_cm" />
            </div>
          </SectionCard>

        </div>
      </div>

      {/* REKOMENDASI PELATIH */}
      <SectionCard title="Kesimpulan & Rekomendasi" icon={Target}>
        <Textarea name="notes" placeholder="Tulis kesimpulan umum dari hasil tes dan tentukan fokus latihan untuk periode selanjutnya..." className="rounded-xl h-32 bg-secondary border" />
      </SectionCard>

      {/* SUBMIT */}
      <div className="flex justify-end pt-6 border-t border-border">
        <SubmitButton />
      </div>

    </form>
  );
}
