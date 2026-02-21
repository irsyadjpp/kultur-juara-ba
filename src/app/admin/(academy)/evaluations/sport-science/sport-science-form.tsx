'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
    Apple,
    Bone,
    Brain,
    ChevronLeft,
    ChevronRight,
    DollarSign,
    Eye,
    FlaskConical,
    HeartPulse,
    Loader2,
    Microscope,
    Moon,
    Ruler,
    Save,
    UserSquare,
    Wind,
    Zap
} from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { saveSportScienceEvaluation, type AthleteSelectOption } from '../actions';

// ─── Sub-components ───────────────────────────────────────────────────────────

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button size="lg" disabled={pending} className="h-14 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 px-10">
            {pending ? <><Loader2 className="mr-2 animate-spin" />Menyimpan...</> : <><Save className="mr-2 w-5 h-5" />Simpan Profil Sport Science</>}
        </Button>
    );
}

const PillarCard = ({ icon: Icon, number, title, color, children }: {
    icon: React.ElementType; number: number; title: string; color: string; children: React.ReactNode;
}) => (
    <div className="rounded-[2rem] border border-border/50 bg-secondary/20 backdrop-blur-xl overflow-hidden">
        <div className={cn('px-6 py-4 flex items-center gap-3 border-b border-border/30', color)}>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background/30 text-sm font-black">
                {number}
            </div>
            <Icon className="w-5 h-5" />
            <h3 className="font-black uppercase tracking-widest text-sm">{title}</h3>
        </div>
        <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {children}
            </div>
        </div>
    </div>
);

const MetricField = ({ label, name, unit, min, max, step = 'any', type = 'number', tooltip }: {
    label: string; name: string; unit: string; min?: string; max?: string;
    step?: string; type?: string; tooltip?: string;
}) => (
    <div className="space-y-1.5">
        <Label htmlFor={name} className="text-xs font-bold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
            {label}
            {tooltip && (
                <span
                    className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-muted text-muted-foreground text-[10px] cursor-help font-bold"
                    title={tooltip}
                >?</span>
            )}
        </Label>
        <div className="flex items-center gap-2">
            <Input
                id={name} name={name} type={type} step={step}
                min={min} max={max}
                className="h-11 rounded-xl font-mono bg-background/40 border-border/50 flex-1"
                placeholder="—"
            />
            <span className="text-xs font-mono text-muted-foreground whitespace-nowrap min-w-[40px] text-right">{unit}</span>
        </div>
    </div>
);

const ScoreField = ({ label, name, max = 10, tooltip }: { label: string; name: string; max?: number; tooltip?: string }) => (
    <div className="space-y-1.5">
        <Label htmlFor={name} className="text-xs font-bold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
            {label}
            {tooltip && (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-muted text-muted-foreground text-[10px] cursor-help font-bold" title={tooltip}>?</span>
            )}
        </Label>
        <div className="flex items-center gap-2">
            <Input
                id={name} name={name} type="number" min="0" max={String(max)} step="0.1"
                className="h-11 rounded-xl font-mono bg-background/40 border-border/50 flex-1"
                placeholder="—"
            />
            <span className="text-xs font-mono text-muted-foreground">/ {max}</span>
        </div>
    </div>
);

// ─── Tab Config ────────────────────────────────────────────────────────────────

const TABS = [
    { id: 'fisik', label: 'Fisik & Gerak', icon: Ruler, pillars: ['1', '2', '3'] },
    { id: 'skill', label: 'Skill & Taktik', icon: Brain, pillars: ['4', '5'] },
    { id: 'fisiologi', label: 'Fisiologi', icon: Wind, pillars: ['6', '7', '8'] },
    { id: 'mental', label: 'Mental & Sosial', icon: HeartPulse, pillars: ['9', '10'] },
    { id: 'biomarker', label: 'Biomarker & Visual', icon: Microscope, pillars: ['11', '12'] },
    { id: 'biomekanik', label: 'Biomechanik', icon: Bone, pillars: ['13'] },
];

// ─── Main Form ─────────────────────────────────────────────────────────────────

export function SportScienceForm({ athletes }: { athletes: AthleteSelectOption[] }) {
    const { toast } = useToast();
    const [state, formAction] = useActionState(saveSportScienceEvaluation, { success: false, message: '' });
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        if (state?.message) {
            toast({
                title: state.success ? '✓ Tersimpan!' : 'Gagal',
                description: state.message,
                variant: state.success ? 'default' : 'destructive',
                className: state.success ? 'bg-green-700 text-white border-none' : undefined,
            });
        }
    }, [state]);

    const goNext = () => setActiveTab(t => Math.min(t + 1, TABS.length - 1));
    const goPrev = () => setActiveTab(t => Math.max(t - 1, 0));

    return (
        <form action={formAction} className="space-y-6">

            {/* ── Identity & Session ────────────────────────────────── */}
            <div className="rounded-[2rem] border border-border/50 bg-secondary/20 p-6 space-y-4">
                <div className="flex items-center gap-3 text-foreground font-black uppercase tracking-widest">
                    <UserSquare className="w-5 h-5 text-primary" />
                    <span className="text-sm">Identitas Atlet & Sesi</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Atlet</Label>
                        <Select name="athleteId" required>
                            <SelectTrigger className="h-12 rounded-xl bg-background/40 border-border/50">
                                <SelectValue placeholder="Pilih Atlet..." />
                            </SelectTrigger>
                            <SelectContent>
                                {athletes.map(a => (
                                    <SelectItem key={a.id} value={a.id}>
                                        {a.name}{a.nickname ? ` (${a.nickname})` : ''}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Periode Pengukuran</Label>
                        <Input name="period" type="month" required className="h-12 rounded-xl bg-background/40 border-border/50" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nama Evaluator</Label>
                        <Input name="evaluator" placeholder="Nama Sport Scientist / Pelatih" className="h-12 rounded-xl bg-background/40 border-border/50" />
                    </div>
                </div>
            </div>

            {/* ── Tab Navigation ────────────────────────────────────── */}
            <div className="flex flex-wrap gap-2">
                {TABS.map((tab, i) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(i)}
                            className={cn(
                                'flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border',
                                activeTab === i
                                    ? 'bg-primary text-primary-foreground border-transparent shadow-lg shadow-primary/25'
                                    : 'border-border/50 text-muted-foreground bg-secondary/30 hover:bg-secondary hover:text-foreground'
                            )}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* ── Pilar Content ─────────────────────────────────────── */}
            <div className="space-y-4">

                {/* TAB 0: FISIK & GERAK */}
                {activeTab === 0 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                        <PillarCard number={1} title="Anthropometry — Komposisi & Morfologi Tubuh" icon={Ruler} color="bg-blue-500/5 text-blue-400">
                            <MetricField label="Tinggi Badan" name="ant_height_cm" unit="cm" min="100" max="250" step="0.1" tooltip="Stadiometer — Tinggi badan tegak" />
                            <MetricField label="Berat Badan" name="ant_weight_kg" unit="kg" min="20" max="150" step="0.1" tooltip="Digital Scale" />
                            <MetricField label="Rentang Lengan (Arm Span)" name="ant_arm_span_cm" unit="cm" min="100" max="250" step="0.1" tooltip="Rentang ujung jari kanan ke kiri" />
                            <MetricField label="Tinggi Duduk" name="ant_sitting_height" unit="cm" min="50" max="130" step="0.1" tooltip="Untuk menghitung Peak Height Velocity (PHV)" />
                            <MetricField label="Panjang Tungkai" name="ant_leg_length" unit="cm" min="50" max="130" step="0.1" tooltip="Panjang tungkai — rasio daya jangkau" />
                        </PillarCard>

                        <PillarCard number={2} title="Kinematics — Mekanika Gerak Raket" icon={Zap} color="bg-yellow-500/5 text-yellow-400">
                            <ScoreField label="Kecepatan Grip Switch" name="kin_grip_switch_speed" tooltip="Kecepatan transisi Forehand↔Backhand↔Bevel (1-10)" />
                            <MetricField label="Ekstensi Pergelangan Tangan" name="kin_wrist_extension" unit="°" min="0" max="180" step="1" tooltip="Sudut tekukan saat cocking" />
                            <ScoreField label="Posisi Siku (Overhead)" name="kin_elbow_alignment" tooltip="Posisi siku saat overhead — tidak terlalu rendah (1-10)" />
                            <ScoreField label="Kinetic Linkage" name="kin_kinetic_linkage" tooltip="Aliran tenaga: Kaki → Core → Bahu → Raket (1-10)" />
                            <ScoreField label="Konsistensi Titik Kontak" name="kin_contact_height" tooltip="Konsistensi memukul di titik tertinggi jangkauan (1-10)" />
                        </PillarCard>

                        <PillarCard number={3} title="Biomotor — Motorik & Fisik" icon={Wind} color="bg-green-500/5 text-green-400">
                            <MetricField label="T-Test (CODS)" name="bio_t_test_sec" unit="detik" min="5" max="30" step="0.01" tooltip="Waktu lari pola T — Change of Direction Speed" />
                            <MetricField label="Split-Step Latency" name="bio_split_step_lat" unit="ms" min="50" max="500" step="1" tooltip="Latency reaksi langkah pertama (Video Analysis)" />
                            <MetricField label="Vertical Jump" name="bio_vertical_jump" unit="cm" min="10" max="100" step="0.5" tooltip="Sargent Jump Test — Kekuatan eksplosif tungkai" />
                            <MetricField label="Med Ball Throw" name="bio_med_ball_throw" unit="m" min="1" max="20" step="0.1" tooltip="Lempar bola medisin — Kekuatan eksplosif lengan" />
                            <MetricField label="Sit & Reach" name="bio_sit_reach_cm" unit="cm" min="-30" max="50" step="0.5" tooltip="Kelenturan otot punggung bawah dan hamstring" />
                        </PillarCard>
                    </div>
                )}

                {/* TAB 1: SKILL & TAKTIK */}
                {activeTab === 1 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                        <PillarCard number={4} title="Technical — Skill & Stroke" icon={Brain} color="bg-red-500/5 text-red-400">
                            <MetricField label="Kedalaman Backhand" name="tec_backhand_depth" unit="m" min="0" max="14" step="0.1" tooltip="Jarak jatuh bola backhand dari garis belakang" />
                            <MetricField label="Kecepatan Smash" name="tec_smash_velocity" unit="km/h" min="50" max="400" step="1" tooltip="Kecepatan rata-rata smash (Radar/Video)" />
                            <MetricField label="Sudut Smash" name="tec_smash_angle" unit="°" min="0" max="90" step="1" tooltip="Sudut ketajaman smash (Steepness)" />
                            <MetricField label="Net Error Rate" name="tec_net_error_rate" unit="%" min="0" max="100" step="1" tooltip="Rasio bola netting yang tidak menyeberang" />
                            <ScoreField label="Akurasi Servis Pendek" name="tec_serve_short_acc" tooltip="Presisi servis pendek (1-10)" />
                            <ScoreField label="Jangkauan Defense Lebar" name="tec_def_wide_reach" tooltip="Kemampuan mengembalikan bola di sudut ekstrim (1-10)" />
                        </PillarCard>

                        <PillarCard number={5} title="Cognitive — Intelejensi Taktis" icon={Brain} color="bg-violet-500/5 text-violet-400">
                            <ScoreField label="Shot Logic (Pilihan Pukulan)" name="cog_shot_logic" tooltip="Ketepatan pilihan pukulan — Shot Selection (1-10)" />
                            <ScoreField label="Antisipasi Lawan" name="cog_anticipation" tooltip="Membaca arah raket lawan sebelum impact (1-10)" />
                            <MetricField label="Clutch Error" name="cog_clutch_error" unit="count" min="0" max="50" step="1" tooltip="Jumlah unforced error pada skor 19-21" />
                            <MetricField label="Durasi Fokus" name="cog_focus_duration" unit="menit" min="0" max="120" step="1" tooltip="Durasi konsistensi teknik dalam reli panjang" />
                        </PillarCard>
                    </div>
                )}

                {/* TAB 2: FISIOLOGI */}
                {activeTab === 2 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                        <PillarCard number={6} title="Physiology — Faal & Ketahanan" icon={Wind} color="bg-cyan-500/5 text-cyan-400">
                            <MetricField label="VO₂Max (Estimated)" name="phy_vo2max_est" unit="ml/kg/min" min="20" max="90" step="0.1" tooltip="Beep Test / Yo-Yo Intermittent Recovery Test" />
                            <MetricField label="Fatigue Index (Power Drop)" name="phy_fatigue_index" unit="%" min="0" max="100" step="1" tooltip="Penurunan power smash di akhir set ke-3" />
                            <MetricField label="HR Recovery (60 detik)" name="phy_hr_recovery" unit="bpm" min="0" max="60" step="1" tooltip="Penurunan detak jantung dalam 60 detik setelah latihan" />
                        </PillarCard>

                        <PillarCard number={7} title="Nutrition — Status Gizi & Energi" icon={Apple} color="bg-orange-500/5 text-orange-400">
                            <MetricField label="Asupan Kalori Harian" name="nut_caloric_intake" unit="kcal/day" min="500" max="8000" step="50" tooltip="Total asupan vs kebutuhan (deteksi underfueling)" />
                            <ScoreField label="Warna Urine (Hidrasi)" name="nut_urine_color" max={8} tooltip="Level hidrasi harian (1=terhidrasi, 8=dehidrasi berat)" />
                            <MetricField label="Ferritin / Zat Besi" name="nut_iron_ferritin" unit="ng/mL" min="0" max="500" step="1" tooltip="Kadar ferritin — krusial untuk transportasi oksigen" />
                        </PillarCard>

                        <PillarCard number={8} title="Recovery — Pemulihan & Kesiapan" icon={Moon} color="bg-indigo-500/5 text-indigo-400">
                            <MetricField label="Sleep Efficiency" name="rec_sleep_efficiency" unit="%" min="0" max="100" step="1" tooltip="Rasio waktu tidur vs waktu terlelap (via Wearable)" />
                            <MetricField label="HRV (rMSSD)" name="rec_hrv_rmssd" unit="ms" min="0" max="200" step="1" tooltip="Heart Rate Variability — indikator kesiapan saraf" />
                            <ScoreField label="DOMS (Nyeri Otot)" name="rec_doms_perceived" tooltip="Tingkat nyeri otot subjektif pasca latihan intens (1-10)" />
                        </PillarCard>
                    </div>
                )}

                {/* TAB 3: MENTAL & SOSIAL */}
                {activeTab === 3 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                        <PillarCard number={9} title="Mental Health — Psikologi & Mood" icon={HeartPulse} color="bg-pink-500/5 text-pink-400">
                            <ScoreField label="Grit Score (Duckworth)" name="men_grit_score" max={5} tooltip="Ketahanan mental jangka panjang (Grit Scale Duckworth 1-5)" />
                            <ScoreField label="Tekanan Akademik" name="men_academic_pressure" tooltip="Beban sekolah / akademik yang mempengaruhi fokus (1-10)" />
                            <ScoreField label="POMS Index" name="men_poms_index" tooltip="Profile of Mood States — deteksi gejala overtraining (1-10)" />
                        </PillarCard>

                        <PillarCard number={10} title="Socio-Econ — Sistem Dukungan" icon={DollarSign} color="bg-amber-500/5 text-amber-400">
                            <MetricField label="Waktu Tempuh ke GOR" name="soc_travel_time" unit="menit" min="0" max="300" step="5" tooltip="Waktu tempuh ke tempat latihan — faktor kelelahan perjalanan" />
                        </PillarCard>
                    </div>
                )}

                {/* TAB 4: BIOMARKER & VISUAL */}
                {activeTab === 4 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                        <PillarCard number={11} title="Blood & Biomarker — Profil Internal" icon={FlaskConical} color="bg-red-500/5 text-red-400">
                            <MetricField label="Hemoglobin" name="phy_hemoglobin_lvl" unit="g/dL" min="5" max="25" step="0.1" tooltip="Kapasitas angkut oksigen darah (Standar China)" />
                            <MetricField label="Creatine Kinase" name="phy_creatine_kinase" unit="U/L" min="0" max="5000" step="10" tooltip="Deteksi kerusakan jaringan otot — objektivitas kelelahan" />
                            <MetricField label="Testosteron/Kortisol Ratio" name="phy_testosteron_cort" unit="ratio" min="0" max="5" step="0.01" tooltip="Rasio anabolik/katabolik — kesiapan bertanding" />
                        </PillarCard>

                        <PillarCard number={12} title="Visual & Perceptual — Neuro-Performance" icon={Eye} color="bg-teal-500/5 text-teal-400">
                            <MetricField label="Saccadic Speed" name="cog_saccadic_speed" unit="ms" min="50" max="500" step="1" tooltip="Kecepatan mata melacak shuttlecock" />
                            <MetricField label="Peripheral Vision" name="cog_peripheral_deg" unit="°" min="0" max="360" step="1" tooltip="Luas pandangan samping — krusial untuk ganda" />
                            <MetricField label="Choice Reaction Time" name="cog_choice_reaction" unit="ms" min="100" max="1000" step="1" tooltip="Kecepatan memilih respons dari berbagai opsi lawan" />
                        </PillarCard>
                    </div>
                )}

                {/* TAB 5: BIOMECHANIK */}
                {activeTab === 5 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                        <PillarCard number={13} title="Biomechanical Load — Pencegahan Cedera" icon={Bone} color="bg-stone-500/5 text-stone-400">
                            <MetricField label="GRF Asymmetry" name="load_grf_asymmetry" unit="%" min="0" max="50" step="0.5" tooltip="Perbedaan beban injakan kaki kiri & kanan (Pencegahan ACL)" />
                            <MetricField label="Shoulder Torque" name="load_shoulder_torque" unit="Nm" min="0" max="300" step="1" tooltip="Beban puntir pada sendi bahu saat full smash" />
                            <MetricField label="Racket Vibration" name="load_racket_vibration" unit="Hz" min="0" max="1000" step="1" tooltip="Getaran pada sendi siku — deteksi dini Tennis Elbow" />
                        </PillarCard>
                    </div>
                )}
            </div>

            {/* ── Notes + Navigation ────────────────────────────────── */}
            <div className="rounded-[2rem] border border-border/50 bg-secondary/20 p-6 space-y-3">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Catatan Evaluator</Label>
                <Textarea
                    name="notes"
                    rows={3}
                    placeholder="Observasi tambahan, konteks sesi pengukuran, kondisi atlet hari ini..."
                    className="resize-none rounded-xl bg-background/40 border-border/50"
                />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
                <Button type="button" variant="outline" onClick={goPrev} disabled={activeTab === 0} className="h-12 rounded-2xl font-bold gap-2">
                    <ChevronLeft className="w-4 h-4" /> Sebelumnya
                </Button>

                <div className="flex items-center gap-1.5">
                    {TABS.map((_, i) => (
                        <button
                            key={i} type="button" onClick={() => setActiveTab(i)}
                            className={cn(
                                'w-2 h-2 rounded-full transition-all',
                                activeTab === i ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
                            )}
                        />
                    ))}
                </div>

                {activeTab < TABS.length - 1 ? (
                    <Button type="button" onClick={goNext} variant="outline" className="h-12 rounded-2xl font-bold gap-2">
                        Selanjutnya <ChevronRight className="w-4 h-4" />
                    </Button>
                ) : (
                    <SubmitButton />
                )}
            </div>
        </form>
    );
}
