'use client';

import { useState } from "react";
import { 
  UserSquare, Save, Smile, Meh, Frown, BrainCircuit, Heart, AlertTriangle, BookHeart, Moon, Sun, Dumbbell
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
                { icon: Frown, label: 'Lelah/Sedih', color: 'text-red-500', value: 'sad' },
                { icon: Meh, label: 'Biasa Saja', color: 'text-yellow-500', value: 'neutral' },
                { icon: Smile, label: 'Bersemangat', color: 'text-green-500', value: 'happy' },
                { icon: BrainCircuit, label: 'Sangat Fokus', color: 'text-blue-500', value: 'focused' },
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

const RatingSlider = ({ label, value, onValueChange, max = 10, step = 1, icon: Icon }: { label: string, value: number, onValueChange: (value: number) => void, max?: number, step?: number, icon?: React.ElementType }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <Label className="flex items-center gap-2 text-base">
        {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
        {label}
      </Label>
      <span className="font-mono font-bold text-lg text-primary w-8 text-center">{value}</span>
    </div>
    <Slider
      defaultValue={[value]}
      max={max}
      min={1}
      step={step}
      onValueChange={(v) => onValueChange(v[0])}
      className="[&>span:first-child]:h-1.5"
    />
  </div>
);


export default function AthleteJournalPage() {
  const [mentalEnergy, setMentalEnergy] = useState(7);
  const [sleepQuality, setSleepQuality] = useState(7);
  const [physicalReady, setPhysicalReady] = useState(7);
  const [safetyFlag, setSafetyFlag] = useState(false);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">SELF-MONITORING</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
            My Daily Journal (AMEL)
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
            Ruang aman untuk mencatat kondisi fisik dan mentalmu setiap hari. Isilah dengan jujur.
        </p>
      </div>

      <form className="space-y-8">
        
        <SectionCard title="1. Quick Check-in" icon={Heart} description="Bagaimana kondisimu hari ini? (Skala 1-10)">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <EmojiSelector label="Mood Hari Ini" onValueChange={() => {}} />
                <div className="space-y-8">
                    <RatingSlider label="Kualitas Tidur" value={sleepQuality} onValueChange={setSleepQuality} icon={Moon} />
                    <RatingSlider label="Kesiapan Fisik" value={physicalReady} onValueChange={setPhysicalReady} icon={Dumbbell} />
                    <RatingSlider label="Energi Mental" value={mentalEnergy} onValueChange={setMentalEnergy} icon={BrainCircuit} />
                </div>
            </div>
        </SectionCard>

        <SectionCard title="2. Guided Journal" icon={BookHeart} description="Ceritakan lebih dalam. Jawabanmu bersifat rahasia dan hanya dapat dilihat oleh psikolog.">
            <div className="space-y-6">
                <div>
                    <Label className="font-bold text-base block mb-2">Apa yang kamu syukuri hari ini?</Label>
                    <Textarea placeholder="Contoh: Bersyukur bisa latihan tanpa cedera, atau senang bisa belajar pukulan baru..." className="rounded-xl h-24 bg-secondary" />
                </div>
                 <div>
                    <Label className="font-bold text-base block mb-2">Adakah tantangan atau kesulitan yang kamu hadapi hari ini (di dalam atau luar lapangan)?</Label>
                    <Textarea placeholder="Contoh: Merasa kurang fokus karena tugas sekolah, atau ada teknik yang sulit dikuasai." className="rounded-xl h-24 bg-secondary" />
                </div>
            </div>
        </SectionCard>
        
        <SectionCard title="3. Safety Check" icon={AlertTriangle} description="Centang jika kamu merasakan salah satu dari hal ini. Psikolog kami akan segera menghubungimu.">
            <div className="space-y-3">
                {['Sulit tidur atau mimpi buruk', 'Kehilangan nafsu makan', 'Merasa sangat cemas atau tertekan', 'Kehilangan minat untuk latihan', 'Ingin menyakiti diri sendiri'].map(item => (
                     <div key={item} className="flex items-center space-x-3 p-4 rounded-xl border bg-secondary/50">
                        <Checkbox id={item} onCheckedChange={(checked) => checked && setSafetyFlag(true)} />
                        <label htmlFor={item} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {item}
                        </label>
                    </div>
                ))}
                {safetyFlag && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-bold">Terima kasih telah jujur. Psikolog kami akan segera menghubungimu secara personal. Kamu tidak sendirian.</div>}
            </div>
        </SectionCard>

        <div className="flex justify-end pt-6 border-t border-border">
            <Button size="lg" className="h-16 rounded-full font-bold text-lg px-10 shadow-lg shadow-primary/20">
                <Save className="w-6 h-6 mr-3"/> Simpan Jurnal Hari Ini
            </Button>
        </div>
      </form>
    </div>
  );
}
