
'use client';

import { useState } from "react";
import { 
  UserSquare, Save, Smile, Meh, Frown, BrainCircuit, Heart, AlertTriangle
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
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

// Reusable Components
const SectionCard = ({ icon: Icon, title, description, children }: { icon: React.ElementType, title: string, description?: string, children: React.ReactNode }) => (
  <Card className="rounded-3xl shadow-xl">
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

const EmojiSelector = ({ label, onValueChange }: { label: string, onValueChange: (value: string) => void }) => (
    <div className="space-y-3">
        <Label>{label}</Label>
        <RadioGroup onValueChange={onValueChange} className="grid grid-cols-4 gap-2">
            {[
                { icon: Frown, label: 'Sedih', color: 'text-red-500', value: 'sad' },
                { icon: Meh, label: 'Biasa', color: 'text-yellow-500', value: 'neutral' },
                { icon: Smile, label: 'Senang', color: 'text-green-500', value: 'happy' },
                { icon: BrainCircuit, label: 'Fokus', color: 'text-blue-500', value: 'focused' },
            ].map((emoji, index) => {
                const Icon = emoji.icon;
                return (
                    <div key={index}>
                        <RadioGroupItem value={emoji.value} id={`${label}-${index}`} className="sr-only" />
                        <Label htmlFor={`${label}-${index}`} className={cn("flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-transparent bg-secondary hover:border-primary/50 cursor-pointer data-[state=checked]:border-primary data-[state=checked]:bg-primary/10", emoji.color)}>
                           <Icon className="w-10 h-10" />
                           <span className="text-xs font-bold text-muted-foreground">{emoji.label}</span>
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


export default function MentalJournalPage() {
  const [mentalEnergy, setMentalEnergy] = useState(3);
  const [safetyFlag, setSafetyFlag] = useState(false);

  return (
    <div className="space-y-8 p-4 md:p-0">
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM LOG HARIAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            Athlete Mental Expression Log (AMEL)
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
            Ruang aman untuk atlet mengekspresikan kondisi mental & beban pikiran.
        </p>
      </div>

      <form className="space-y-8">
        
        <SectionCard title="Identitas Atlet & Tanggal" icon={UserSquare}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Nama Atlet</Label>
                    <Select><SelectTrigger className="h-14 rounded-xl text-base"><SelectValue placeholder="Pilih Atlet..." /></SelectTrigger><SelectContent><SelectItem value="irsyad">Irsyad JPP</SelectItem></SelectContent></Select>
                </div>
                 <div className="space-y-2">
                    <Label>Tanggal Pencatatan</Label>
                    <Input type="date" className="h-14 rounded-xl"/>
                </div>
            </div>
        </SectionCard>

        <SectionCard title="A. Quick Check-in" icon={Heart} description="Wajib diisi sebelum melanjutkan.">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <EmojiSelector label="Mood Hari Ini" onValueChange={() => {}} />
                <div className="space-y-6">
                    <RatingSlider label="Energi Mental" value={mentalEnergy} onValueChange={setMentalEnergy} />
                    <div className="space-y-3">
                        <Label>Beban Pikiran</Label>
                        <RadioGroup className="flex gap-2">
                            {['Ringan', 'Sedang', 'Berat'].map(item => (
                                <div key={item}>
                                    <RadioGroupItem value={item} id={item} className="sr-only"/>
                                    <Label htmlFor={item} className="flex items-center justify-center cursor-pointer rounded-xl p-3 border-2 border-transparent bg-secondary data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary w-full">
                                        {item}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                     <div className="space-y-3">
                        <Label>Aktivitas Utama Hari Ini</Label>
                        <RadioGroup className="flex gap-2">
                            {['Latihan', 'Sekolah/Kuliah', 'Tanding', 'Libur'].map(item => (
                                <div key={item}>
                                    <RadioGroupItem value={item} id={`act-${item}`} className="sr-only"/>
                                    <Label htmlFor={`act-${item}`} className="flex items-center justify-center cursor-pointer rounded-xl p-3 border-2 border-transparent bg-secondary data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary w-full text-xs font-bold">
                                        {item}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            </div>
        </SectionCard>

        <SectionCard title="B. Guided Journal" icon={BrainCircuit} description="Jawaban Anda akan membantu psikolog kami memahami Anda lebih baik.">
            <div className="space-y-6">
                <div>
                    <Label className="font-bold text-base block mb-2">Hal apa yang paling mengganggu pikiranmu akhir-akhir ini?</Label>
                    <Textarea placeholder="Tidak ada jawaban benar atau salah, ceritakan saja apa yang Anda rasakan..." className="rounded-xl h-24" />
                </div>
                 <div>
                    <Label className="font-bold text-base block mb-2">Ada kejadian di latihan/sekolah/rumah yang membuatmu tidak nyaman?</Label>
                    <Textarea placeholder="Ini adalah ruang aman Anda. Semua informasi bersifat rahasia." className="rounded-xl h-24" />
                </div>
            </div>
        </SectionCard>
        
        <SectionCard title="C. Safety Check" icon={AlertTriangle} description="Penting: Jika Anda merasakan salah satu dari hal ini, mohon segera hubungi pelatih atau psikolog pendamping.">
            <div className="space-y-3">
                <Label>Apakah perasaan ini sampai membuatmu:</Label>
                {['Sulit tidur', 'Tidak ingin latihan', 'Ingin menyakiti diri sendiri', 'Merasa sangat tidak berharga'].map(item => (
                     <div key={item} className="flex items-center space-x-3 p-4 rounded-xl border bg-secondary">
                        <Checkbox id={item} onCheckedChange={(checked) => checked && setSafetyFlag(true)} />
                        <label htmlFor={item} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {item}
                        </label>
                    </div>
                ))}
                {safetyFlag && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">Terima kasih telah jujur. Psikolog kami akan segera menghubungi Anda untuk sesi personal. Anda tidak sendirian.</div>}
            </div>
        </SectionCard>

        <div className="flex justify-end pt-6 border-t border-border">
            <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
                <Save className="w-6 h-6 mr-3"/> Simpan Journal Hari Ini
            </Button>
        </div>
      </form>
    </div>
  );
}
