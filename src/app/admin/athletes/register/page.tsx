
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { athleteRegistrationSchema, type AthleteRegistrationFormValues } from '@/lib/schemas/athlete';
import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Loader2, User, Ruler, Shirt, Weight } from 'lucide-react';
import { registerAthlete } from './actions';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';

const initialState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full h-16 text-xl rounded-full font-bold shadow-lg shadow-primary/20" disabled={pending}>
      {pending ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> MENDAFTARKAN...</> : <><UserPlus className="w-5 h-5 mr-2" /> DAFTARKAN ATLET</>}
    </Button>
  );
}

// Helper function to calculate shirt size
const calculateShirtSize = (tb: number, ld: number): string => {
    const sizeChart = [
        { size: 'S', ld: 40, tb: 60 },
        { size: 'M', ld: 42, tb: 62 },
        { size: 'L', ld: 44, tb: 64 },
        { size: 'XL', ld: 46, tb: 66 },
        { size: 'XXL', ld: 48, tb: 68 },
    ];

    // Find the smallest size that fits the measurements
    for (const item of sizeChart) {
        if (ld <= item.ld && tb <= item.tb) {
            return item.size;
        }
    }

    // Handle sizes larger than XXL
    let lastSize = sizeChart[sizeChart.length - 1];
    let currentLd = lastSize.ld;
    let currentTb = lastSize.tb;
    let sizeCounter = 2; // Starts from XXL
    
    while(sizeCounter < 10) { // Safety break
        sizeCounter++;
        currentLd += 2;
        currentTb += 2;
        if(ld <= currentLd && tb <= currentTb){
            return `${'X'.repeat(sizeCounter-1)}L`;
        }
    }

    return "Custom"; // Fallback for very large sizes
};

export default function RegisterAthletePage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(registerAthlete, initialState);
  const [recommendedSize, setRecommendedSize] = useState<string>('-');

  const form = useForm<AthleteRegistrationFormValues>({
    resolver: zodResolver(athleteRegistrationSchema),
    defaultValues: {
      fullName: "",
      nickname: "",
      pob: "",
      dob: "",
      gender: undefined,
      dominantHand: undefined,
      phone: "",
      email: "",
      address: "",
      schoolOrWork: "",
      guardianName: "",
      emergencyContact: "",
      height: "",
      weight: "",
      chestWidth: "",
      waistCircumference: "",
      category: undefined,
      level: undefined,
      pbsiNumber: "",
      startYear: "",
      careerTarget: undefined,
    },
  });

  const { watch } = form;
  const height = watch('height');
  const chestWidth = watch('chestWidth');

  useEffect(() => {
    const tb = parseFloat(height || '0');
    const ld = parseFloat(chestWidth || '0');

    if (tb > 0 && ld > 0) {
        const size = calculateShirtSize(tb, ld);
        setRecommendedSize(size);
    } else {
        setRecommendedSize('-');
    }
  }, [height, chestWidth]);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Berhasil!",
          description: state.message,
          className: "bg-green-600 text-white",
        });
        form.reset(); // Reset form setelah sukses
      } else {
        toast({
          title: "Gagal",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast, form]);

  return (
    <div className="space-y-8 p-4 md:p-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-primary text-primary bg-primary/10">
                    <UserPlus className="w-3 h-3 mr-2" /> PENDAFTARAN MANUAL
                </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-foreground">
                Registrasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Atlet Baru</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl text-lg">
                Formulir untuk mendata atlet baru secara manual di Kultur Juara PWN Indonesia Badminton Academy.
            </p>
        </div>
      </div>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          
          <Card className="rounded-3xl shadow-xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-headline flex items-center gap-3">
                <User className="w-5 h-5 text-primary"/> A. Data Pribadi
              </CardTitle>
              <CardDescription>Informasi dasar sesuai identitas resmi atlet.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Nama Lengkap</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="nickname" render={({ field }) => (
                    <FormItem><FormLabel>Nama Panggilan</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="pob" render={({ field }) => (
                    <FormItem><FormLabel>Tempat Lahir</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="dob" render={({ field }) => (
                    <FormItem><FormLabel>Tanggal Lahir</FormLabel><FormControl><Input type="date" {...field} className="h-12 rounded-xl"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem><FormLabel>Jenis Kelamin</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Laki-laki" id="male" /></FormControl><Label htmlFor="male">Laki-laki</Label></FormItem>
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Perempuan" id="female" /></FormControl><Label htmlFor="female">Perempuan</Label></FormItem>
                    </RadioGroup></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="dominantHand" render={({ field }) => (
                    <FormItem><FormLabel>Tangan Dominan</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Kanan" id="right" /></FormControl><Label htmlFor="right">Kanan</Label></FormItem>
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Kiri" id="left" /></FormControl><Label htmlFor="left">Kiri</Label></FormItem>
                    </RadioGroup></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Nomor HP</FormLabel><FormControl><Input type="tel" {...field} className="h-12 rounded-xl"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} className="h-12 rounded-xl"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Alamat</FormLabel><FormControl><Textarea {...field} className="rounded-xl"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="schoolOrWork" render={({ field }) => (
                    <FormItem><FormLabel>Sekolah / Pekerjaan</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="guardianName" render={({ field }) => (
                    <FormItem><FormLabel>Orang Tua / Wali (Opsional)</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="emergencyContact" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Kontak Darurat</FormLabel><FormControl><Input type="tel" {...field} className="h-12 rounded-xl"/></FormControl><FormMessage /></FormItem>
                )} />
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-headline flex items-center gap-3">
                <Ruler className="w-5 h-5 text-primary"/> B. Antropometri
              </CardTitle>
              <CardDescription>Pengukuran dasar komposisi tubuh.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="height" render={({ field }) => (
                    <FormItem><FormLabel className="flex items-center gap-2"><Ruler className="w-4 h-4"/>Tinggi Badan (cm)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl font-mono text-lg" placeholder="cth: 170"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="weight" render={({ field }) => (
                    <FormItem><FormLabel className="flex items-center gap-2"><Weight className="w-4 h-4"/>Berat Badan (kg)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl font-mono text-lg" placeholder="cth: 65"/></FormControl><FormMessage /></FormItem>
                )} />
            </CardContent>
          </Card>
          
          <Card className="rounded-3xl shadow-xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-headline flex items-center gap-3">
                 <Shirt className="w-5 h-5 text-primary"/> C. Pengukuran & Ukuran Jersey
              </CardTitle>
              <CardDescription>Masukkan pengukuran untuk mendapatkan rekomendasi ukuran jersey. Sistem akan membulatkan ke atas jika perlu.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="chestWidth" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><Ruler className="w-4 h-4"/>Lebar Dada (cm)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl font-mono text-lg" placeholder="cth: 48"/></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="waistCircumference" render={({ field }) => (
                        <FormItem><FormLabel className="flex items-center gap-2"><Ruler className="w-4 h-4"/>Lingkar Pinggang (cm)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl font-mono text-lg" placeholder="cth: 75"/></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <div className="text-center bg-secondary/50 rounded-2xl p-6 border">
                    <p className="text-sm text-muted-foreground font-bold uppercase">Rekomendasi Ukuran</p>
                    <div className="text-8xl font-black font-mono text-primary my-2 animate-in fade-in zoom-in duration-500">{recommendedSize}</div>
                    <p className="text-xs text-muted-foreground">Toleransi 1-2cm. Ukuran dapat disesuaikan manual oleh logistik.</p>
                </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-headline flex items-center gap-3">
                 <Target className="w-5 h-5 text-primary"/> D. Status Kepelatihan
              </CardTitle>
              <CardDescription>Informasi terkait jenjang dan tujuan atlet di akademi.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem><FormLabel>Kategori Usia</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Pilih Kategori" /></SelectTrigger></FormControl>
                      <SelectContent><SelectItem value="Pra-usia dini">Pra-usia dini</SelectItem><SelectItem value="Usia dini">Usia dini</SelectItem><SelectItem value="Anak">Anak</SelectItem><SelectItem value="Remaja">Remaja</SelectItem><SelectItem value="Dewasa">Dewasa</SelectItem><SelectItem value="Veteran">Veteran</SelectItem></SelectContent>
                  </Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="level" render={({ field }) => (
                  <FormItem><FormLabel>Level Atlet</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Pilih Level" /></SelectTrigger></FormControl>
                      <SelectContent><SelectItem value="Beginner">Beginner</SelectItem><SelectItem value="Intermediate">Intermediate</SelectItem><SelectItem value="Advanced">Advanced</SelectItem><SelectItem value="Elite">Elite</SelectItem></SelectContent>
                  </Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="pbsiNumber" render={({ field }) => (
                  <FormItem><FormLabel>Nomor PBSI (Jika Ada)</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl"/></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="startYear" render={({ field }) => (
                  <FormItem><FormLabel>Tahun Mulai Badminton</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl"/></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="careerTarget" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>Target Karier</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Pilih Target" /></SelectTrigger></FormControl>
                      <SelectContent><SelectItem value="Rekreasi">Rekreasi</SelectItem><SelectItem value="Prestasi">Prestasi</SelectItem><SelectItem value="Profesional">Profesional</SelectItem></SelectContent>
                  </Select><FormMessage /></FormItem>
              )} />
            </CardContent>
          </Card>

          <div className="pt-4">
             <SubmitButton />
          </div>
        </form>
      </Form>
    </div>
  );
}
