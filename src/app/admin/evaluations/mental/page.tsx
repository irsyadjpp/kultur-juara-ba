
'use client';

import { useState, useMemo } from "react";
import { 
  UserSquare, Save, Brain, Smile, Frown, Meh, SmilePlus, Info, CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";


// --- Reusable Components ---
const SectionCard = ({ icon: Icon, title, description, children, className }: { icon: React.ElementType, title: string, description?: string, children: React.ReactNode, className?: string }) => (
  <Card className={cn("bg-zinc-900/50 backdrop-blur-sm border-border/20 rounded-3xl shadow-xl", className)}>
    <CardHeader className="p-8 pb-4">
      <CardTitle className="text-xl font-headline flex items-center gap-3">
        <Icon className="w-6 h-6 text-primary"/> {title}
      </CardTitle>
      {description && <CardDescription className="pt-1">{description}</CardDescription>}
    </CardHeader>
    <CardContent className="p-8 pt-0">
      {children}
    </CardContent>
  </Card>
);

const ObservationScale = ({ label, scale }: { label: string, scale: string[] }) => (
    <div className="space-y-3">
      <Label>{label}</Label>
      <RadioGroup className="flex items-center justify-between bg-zinc-950 p-2 rounded-xl border border-zinc-800">
        {scale.map((item, index) => (
            <div key={item} className="flex-1 text-center">
                <RadioGroupItem value={String(index)} id={`${label}-${index}`} className="sr-only" />
                <Label htmlFor={`${label}-${index}`} className="flex flex-col items-center gap-1 cursor-pointer p-2 rounded-lg transition-colors text-zinc-500 hover:bg-zinc-800 data-[state=checked]:text-primary">
                    <span className="text-2xl font-bold">{index}</span>
                    <span className="text-[10px] uppercase font-bold">{item}</span>
                </Label>
            </div>
        ))}
      </RadioGroup>
    </div>
);

const EmojiScale = ({ label }: { label: string }) => (
    <div className="space-y-3">
        <Label>{label}</Label>
        <RadioGroup className="grid grid-cols-4 gap-2">
            {[
                { icon: Frown, label: 'Sedih', color: 'text-red-500' },
                { icon: Meh, label: 'Biasa', color: 'text-yellow-500' },
                { icon: Smile, label: 'Senang', color: 'text-green-500' },
                { icon: SmilePlus, label: 'Gembira', color: 'text-blue-500' },
            ].map((emoji, index) => {
                const Icon = emoji.icon;
                return (
                    <div key={index}>
                        <RadioGroupItem value={String(index)} id={`${label}-${index}`} className="sr-only" />
                        <Label htmlFor={`${label}-${index}`} className={cn("flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-transparent bg-zinc-950 hover:border-primary/50 cursor-pointer data-[state=checked]:border-primary data-[state=checked]:bg-primary/10", emoji.color)}>
                           <Icon className="w-10 h-10" />
                           <span className="text-xs font-bold text-zinc-400">{emoji.label}</span>
                        </Label>
                    </div>
                )
            })}
        </RadioGroup>
    </div>
)

const RatingSlider = ({ label, value, onValueChange, max = 5, step = 1 }: { label: string, value: number, onValueChange: (value: number) => void, max?: number, step?: number }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <span className="font-mono font-bold text-lg text-primary w-8 text-center">{value}</span>
      </div>
      <Slider
        defaultValue={[value]}
        max={max}
        min={1}
        step={step}
        onValueChange={(v) => onValueChange(v[0])}
        className="[&>span:first-child]:h-1"
      />
    </div>
);


// --- Main Page Component ---
export default function MentalEvaluationPage() {
  const [scores, setScores] = useState({
    focus: 3,
    concentration: 3,
    emotionControl: 3,
    pressureHandling: 3,
    resilience: 3,
    motivation: 7,
    confidence: 7,
    stress: 5,
  });
  
  const [selectedAthleteAge, setSelectedAthleteAge] = useState<number | null>(null);

  const handleScoreChange = (skill: keyof typeof scores, value: number) => {
    setScores(prev => ({ ...prev, [skill]: value }));
  };

  const getAgeGroup = (age: number | null): string => {
    if (age === null) return '';
    if (age >= 3 && age <= 6) return '3-6';
    if (age >= 7 && age <= 9) return '7-9';
    if (age >= 10 && age <= 12) return '10-12';
    if (age >= 13 && age <= 15) return '13-15';
    if (age >= 16 && age <= 20) return '16-20';
    return '';
  };
  
  const ageGroup = useMemo(() => getAgeGroup(selectedAthleteAge), [selectedAthleteAge]);

  const scale = ['Tidak Pernah', 'Kadang', 'Sering', 'Sgt. Sering'];

  const renderFormForAgeGroup = () => {
    switch (ageGroup) {
      case '3-6':
        return (
          <SectionCard title="Observasi Pelatih (Usia 3-6)" icon={Brain}>
              <div className="space-y-6">
                  <ObservationScale label="Mudah menangis saat gagal" scale={scale} />
                  <ObservationScale label="Mudah marah saat kalah" scale={scale} />
                  <ObservationScale label="Bisa tenang kembali < 2 menit" scale={scale} />
                  <ObservationScale label="Bertahan fokus ≥5 menit" scale={scale} />
                  <ObservationScale label="Konflik dengan teman" scale={scale} />
              </div>
          </SectionCard>
        );
      case '7-9':
        return (
          <SectionCard title="Self-report Sederhana (Usia 7-9)" icon={Brain}>
            <div className="space-y-6">
                <EmojiScale label="Saat latihan saya merasa:" />
                <div className="space-y-3">
                    <Label>Kalau gagal saya ingin mencoba lagi</Label>
                    <RadioGroup className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 border p-3 rounded-lg"><RadioGroupItem value="yes" id="b-yes" /><Label htmlFor="b-yes">Ya</Label></div>
                      <div className="flex items-center space-x-2 border p-3 rounded-lg"><RadioGroupItem value="no" id="b-no" /><Label htmlFor="b-no">Tidak</Label></div>
                    </RadioGroup>
                </div>
            </div>
          </SectionCard>
        );
      case '10-12':
        return (
          <SectionCard title="Mental & Motivasi (Usia 10-12)" icon={Brain}>
              <div className="space-y-6">
                  <RatingSlider label="Saya latihan karena saya mau" value={scores.motivation} onValueChange={(v) => handleScoreChange('motivation', v)} max={5}/>
                  <RatingSlider label="Saya takut dimarahi jika salah" value={scores.stress} onValueChange={(v) => handleScoreChange('stress', v)} max={5}/>
                  <RatingSlider label="Saya senang belajar teknik baru" value={scores.focus} onValueChange={(v) => handleScoreChange('focus', v)} max={5}/>
                  <RatingSlider label="Saya ingin jadi atlet hebat" value={scores.confidence} onValueChange={(v) => handleScoreChange('confidence', v)} max={5}/>
              </div>
          </SectionCard>
        );
      case '13-15':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SectionCard title="Mental Kompetisi (Usia 13-15)" icon={Brain}>
                  <div className="space-y-6">
                      <RatingSlider label="Gugup sebelum pertandingan" value={scores.stress} onValueChange={(v) => handleScoreChange('stress', v)} max={5}/>
                      <RatingSlider label="Fokus saat tertinggal" value={scores.focus} onValueChange={(v) => handleScoreChange('focus', v)} max={5}/>
                      <RatingSlider label="Self-talk negatif" value={scores.emotionControl} onValueChange={(v) => handleScoreChange('emotionControl', v)} max={5}/>
                      <RatingSlider label="Emosi setelah kalah" value={scores.resilience} onValueChange={(v) => handleScoreChange('resilience', v)} max={5}/>
                  </div>
              </SectionCard>
              <SectionCard title="Kesejahteraan (Usia 13-15)" icon={Brain}>
                  <div className="space-y-6">
                      <RatingSlider label="Stres dari Sekolah/Akademis" value={3} onValueChange={()=>{}} max={5}/>
                      <RatingSlider label="Merasa Lelah Mental" value={2} onValueChange={()=>{}} max={5}/>
                      <RatingSlider label="Enjoyment Latihan" value={4} onValueChange={()=>{}} max={5}/>
                      <RatingSlider label="Motivasi Jangka Panjang" value={5} onValueChange={()=>{}} max={5}/>
                  </div>
              </SectionCard>
          </div>
        );
      case '16-20':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SectionCard title="Profil Mental Atlet (Usia 16-20)" icon={Brain}>
                  <div className="space-y-6">
                      <RatingSlider label="Fokus (Kualitas Perhatian)" value={scores.focus} onValueChange={(v) => handleScoreChange('focus', v)} />
                      <RatingSlider label="Konsentrasi (Durasi Perhatian)" value={scores.concentration} onValueChange={(v) => handleScoreChange('concentration', v)} />
                      <RatingSlider label="Kontrol Emosi" value={scores.emotionControl} onValueChange={(v) => handleScoreChange('emotionControl', v)} />
                      <RatingSlider label="Mental di Bawah Tekanan" value={scores.pressureHandling} onValueChange={(v) => handleScoreChange('pressureHandling', v)} />
                      <RatingSlider label="Resiliensi (Cepat Bangkit)" value={scores.resilience} onValueChange={(v) => handleScoreChange('resilience', v)} />
                  </div>
              </SectionCard>
              <SectionCard title="Self-Assessment (Usia 16-20)" icon={UserSquare}>
                  <div className="space-y-6">
                      <RatingSlider label="Motivasi Latihan" value={scores.motivation} onValueChange={(v) => handleScoreChange('motivation', v)} max={10} />
                      <RatingSlider label="Tingkat Kepercayaan Diri" value={scores.confidence} onValueChange={(v) => handleScoreChange('confidence', v)} max={10} />
                      <RatingSlider label="Tingkat Stres Umum (Luar Lapangan)" value={scores.stress} onValueChange={(v) => handleScoreChange('stress', v)} max={10} />
                      <div className="space-y-2 pt-4 border-t border-zinc-800">
                          <Label>Goal Orientation</Label>
                          <Select><SelectTrigger className="h-12"><SelectValue placeholder="Pilih Orientasi..."/></SelectTrigger><SelectContent><SelectItem value="task">Task-oriented (Fokus pada proses & self-improvement)</SelectItem><SelectItem value="ego">Ego-oriented (Fokus pada hasil & mengalahkan orang lain)</SelectItem></SelectContent></Select>
                      </div>
                  </div>
              </SectionCard>
          </div>
        );
      default:
        return (
          <div className="h-48 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-zinc-800 rounded-3xl text-zinc-600">
            <UserSquare className="w-12 h-12 mb-2" />
            <p className="font-bold text-zinc-400">Pilih Seorang Atlet</p>
            <p className="text-sm">Formulir evaluasi mental akan muncul di sini sesuai dengan kelompok usianya.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM PENILAIAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            Evaluasi Mental & Psikologis
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
            Formulir untuk memantau ketangguhan mental dan kondisi psikologis atlet, disesuaikan per kelompok umur.
        </p>
      </div>
      
      <form className="space-y-8">
        
        <SectionCard title="Identitas Atlet & Sesi" icon={UserSquare}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <Label>Nama Atlet</Label>
                    <Select onValueChange={(v) => setSelectedAthleteAge(Number(v))}>
                      <SelectTrigger className="h-14 rounded-xl bg-zinc-950 border-zinc-800 text-base">
                        <SelectValue placeholder="Pilih Atlet..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="16">Irsyad JPP (Usia 16)</SelectItem>
                        <SelectItem value="8">Budi (Usia 8)</SelectItem>
                        <SelectItem value="5">Ana (Usia 5)</SelectItem>
                        <SelectItem value="11">Cici (Usia 11)</SelectItem>
                        <SelectItem value="14">Dedi (Usia 14)</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label>Tanggal Evaluasi</Label>
                    <Input type="date" placeholder="Tanggal" className="h-14 rounded-xl bg-zinc-950 border-zinc-800"/>
                </div>
                <div className="space-y-2">
                    <Label>Pelatih Penilai</Label>
                    <Input placeholder="Nama Pelatih" className="h-14 rounded-xl bg-zinc-950 border-zinc-800"/>
                </div>
            </div>
        </SectionCard>

        {/* --- DYNAMIC FORM AREA --- */}
        <div className="animate-in fade-in duration-500">
           {renderFormForAgeGroup()}
        </div>
        
        {/* REKOMENDASI PELATIH & SUBMIT (muncul setelah atlet dipilih) */}
        {ageGroup && (
          <>
            <SectionCard title="Catatan Psikolog / Pelatih Mental" icon={Brain}>
                <Textarea placeholder="Tulis catatan observasi, rekomendasi latihan mental, atau area yang perlu perhatian khusus..." className="bg-zinc-950 border-zinc-800 rounded-xl h-32"/>
            </SectionCard>
            
            <div className="flex justify-end pt-6 border-t border-border/20">
                <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
                    <Save className="w-6 h-6 mr-3"/> Simpan Evaluasi Mental
                </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
