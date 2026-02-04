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
import { UserPlus, Loader2, User, Ruler, Shirt, Weight, Edit, ShieldCheck, Lock } from 'lucide-react';
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
// Helper function to calculate shirt size
const calculateShirtSize = (pb: number, ld: number, lp: number): string => {
  // pb: Panjang Badan (Jersey Length), ld: Lingkar Dada, lp: Lingkar Perut
  const sizeChart = [
    { size: 'S', ld: 40, pb: 60, lp: 70 },
    { size: 'M', ld: 42, pb: 62, lp: 75 },
    { size: 'L', ld: 44, pb: 64, lp: 80 },
    { size: 'XL', ld: 46, pb: 66, lp: 85 },
    { size: 'XXL', ld: 48, pb: 68, lp: 90 },
  ];
  for (const item of sizeChart) {
    if (ld <= item.ld && pb <= item.pb && lp <= item.lp) {
      return item.size;
    }
  }
  return "Custom"; // Fallback
};

const generateBackName = (fullName: string, option: 'initials' | 'lastName'): string => {
  if (!fullName) return '';
  const names = fullName.trim().toUpperCase().split(' ').filter(n => n);
  if (names.length === 0) return '';

  if (option === 'lastName') {
    if (names.length > 1) {
      return names[names.length - 1].substring(0, 12);
    }
    return names[0].substring(0, 12);
  }

  if (option === 'initials') {
    if (names.length === 1) return names[0].substring(0, 12);
    const firstName = names[0];
    const initials = names.slice(1).map(n => n.charAt(0)).join(' ');
    const result = `${firstName} ${initials}`;
    return result.substring(0, 12);
  }

  return '';
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
      jerseyLength: "",
      shirtSize: "",
      jerseyNameOption: undefined,
      jerseyName: "",
      category: "Pra-usia dini (U-9)",
      level: "Beginner",
      pbsiNumber: "",
      startYear: "",
      careerTarget: "Rekreasi",
      skillScore: 0,
      coachNotes: "",
      coachName: "",
      adminNotes: "",
    },
  });

  const { watch, setValue } = form;
  const height = watch('height');
  const jerseyLength = watch('jerseyLength');
  const chestWidth = watch('chestWidth');
  const waistCircumference = watch('waistCircumference');
  const fullName = watch('fullName');
  const jerseyNameOption = watch('jerseyNameOption');

  useEffect(() => {
    const pb = parseFloat(jerseyLength || '0');
    const ld = parseFloat(chestWidth || '0');
    const lp = parseFloat(waistCircumference || '0');

    if (pb > 0 && ld > 0 && lp > 0) {
      const size = calculateShirtSize(pb, ld, lp);
      setRecommendedSize(size);
      setValue('shirtSize', size);
    } else {
      setRecommendedSize('-');
      setValue('shirtSize', '');
    }
  }, [jerseyLength, chestWidth, waistCircumference, setValue]);

  useEffect(() => {
    if (fullName && jerseyNameOption) {
      const suggestedName = generateBackName(fullName, jerseyNameOption);
      setValue('jerseyName', suggestedName);
    }
  }, [fullName, jerseyNameOption, setValue]);


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

          {/* === SECTION 1: STATIC DATA === */}
          <div className="flex items-center gap-4 pt-2">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest bg-secondary/50 px-4 py-1 rounded-full border">
              Data Statis (Profil Tetap)
            </span>
            <div className="h-px bg-border flex-1" />
          </div>

          {/* CARD A: DATA PRIBADI */}
          <Card className="rounded-3xl shadow-xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-headline flex items-center gap-3">
                <User className="w-5 h-5 text-primary" /> A. Data Pribadi
              </CardTitle>
              <CardDescription>Informasi dasar sesuai identitas resmi atlet.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Nama Lengkap</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="nickname" render={({ field }) => (
                <FormItem><FormLabel>Nama Panggilan</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="pob" render={({ field }) => (
                <FormItem><FormLabel>Tempat Lahir</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="dob" render={({ field }) => (
                <FormItem><FormLabel>Tanggal Lahir</FormLabel><FormControl><Input type="date" {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
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
                <FormItem><FormLabel>Nomor HP</FormLabel><FormControl><Input type="tel" {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Alamat</FormLabel><FormControl><Textarea {...field} className="rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="schoolOrWork" render={({ field }) => (
                <FormItem><FormLabel>Sekolah / Pekerjaan</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="guardianName" render={({ field }) => (
                <FormItem><FormLabel>Orang Tua / Wali (Opsional)</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="emergencyContact" render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Kontak Darurat</FormLabel><FormControl><Input type="tel" {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
              )} />
            </CardContent>
          </Card>

          {/* CARD D: NAMA PUNGGUNG (MOVED HERE) */}
          <Card className="rounded-3xl shadow-xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-headline flex items-center gap-3">
                <Edit className="w-5 h-5 text-primary" /> D. Nama Punggung Jersey
              </CardTitle>
              <CardDescription>Pilih format penulisan nama di punggung jersey sesuai aturan resmi (maks. 12 karakter).</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <FormField control={form.control} name="jerseyNameOption" render={({ field }) => (
                <FormItem><FormLabel>Pilihan Format</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                  <FormItem className="flex items-center space-x-3 rounded-xl border p-4 bg-secondary"><FormControl><RadioGroupItem value="initials" id="initials" /></FormControl><Label htmlFor="initials" className="font-bold">Nama Depan + Inisial</Label></FormItem>
                  <FormItem className="flex items-center space-x-3 rounded-xl border p-4 bg-secondary"><FormControl><RadioGroupItem value="lastName" id="lastName" /></FormControl><Label htmlFor="lastName" className="font-bold">Nama Belakang</Label></FormItem>
                </RadioGroup></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="jerseyName" render={({ field }) => (
                <FormItem><FormLabel>Hasil Nama Punggung</FormLabel><FormControl><Input {...field} readOnly className="h-14 rounded-xl bg-secondary border text-center font-black text-2xl uppercase tracking-widest font-mono cursor-not-allowed opacity-80" /></FormControl><FormMessage /></FormItem>
              )} />
            </CardContent>
          </Card>

          {/* === SECTION 2: DYNAMIC DATA === */}
          <div className="flex items-center gap-4 py-4 mt-8">
            <div className="h-px bg-green-500/20 flex-1" />
            <span className="text-xs font-black text-green-600 uppercase tracking-widest bg-green-50 px-4 py-1 rounded-full border border-green-200">
              Data Dinamis (Berkala)
            </span>
            <div className="h-px bg-green-500/20 flex-1" />
          </div>

          <div className="grid grid-cols-1 gap-8 opacity-90 hover:opacity-100 transition-opacity">
            {/* CARD B: ANTROPOMETRI */}
            <Card className="rounded-3xl shadow-xl border-green-500/10">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-headline flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-green-600" /> B. Antropometri
                </CardTitle>
                <CardDescription>Pengukuran dasar komposisi tubuh.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="height" render={({ field }) => (
                  <FormItem><FormLabel className="flex items-center gap-2"><Ruler className="w-4 h-4" />Tinggi Badan (cm)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl font-mono text-lg bg-secondary border" placeholder="cth: 170" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="weight" render={({ field }) => (
                  <FormItem><FormLabel className="flex items-center gap-2"><Weight className="w-4 h-4" />Berat Badan (kg)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl font-mono text-lg bg-secondary border" placeholder="cth: 65" /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            {/* CARD C: PENGUKURAN JERSEY */}
            <Card className="rounded-3xl shadow-xl border-green-500/10">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-headline flex items-center gap-3">
                  <Shirt className="w-5 h-5 text-green-600" /> C. Pengukuran & Ukuran Jersey
                </CardTitle>
                <CardDescription>Masukkan pengukuran untuk mendapatkan rekomendasi ukuran jersey.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField control={form.control} name="jerseyLength" render={({ field }) => (
                    <FormItem><FormLabel className="flex items-center gap-2"><Ruler className="w-4 h-4" />Panjang Badan (Paha - Leher) (cm)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl font-mono text-lg bg-secondary border" placeholder="cth: 70" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="chestWidth" render={({ field }) => (
                    <FormItem><FormLabel className="flex items-center gap-2"><Ruler className="w-4 h-4" />Lingkar Dada (LD) (cm)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl font-mono text-lg bg-secondary border" placeholder="cth: 90" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="waistCircumference" render={({ field }) => (
                    <FormItem><FormLabel className="flex items-center gap-2"><Ruler className="w-4 h-4" />Lingkar Perut (LP) (cm)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl font-mono text-lg bg-secondary border" placeholder="cth: 75" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="text-center bg-secondary/50 rounded-2xl p-6 border">
                  <p className="text-sm text-muted-foreground font-bold uppercase">Rekomendasi Ukuran</p>
                  <div className="text-8xl font-black font-mono text-primary my-2 animate-in fade-in zoom-in duration-500">{recommendedSize}</div>
                  <p className="text-xs text-muted-foreground">Toleransi 1-2cm. Ukuran dapat disesuaikan manual oleh logistik.</p>
                  {/* Hidden input to ensure shirtSize is submitted */}
                  <div className="hidden">
                    <FormField control={form.control} name="shirtSize" render={({ field }) => (
                      <FormItem><FormControl><Input {...field} /></FormControl></FormItem>
                    )} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CARD E: STATUS KEPELATIHAN */}
            <Card className="rounded-3xl shadow-xl border-green-500/10">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-headline flex items-center gap-3">
                  <Target className="w-5 h-5 text-green-600" /> E. Status Kepelatihan
                </CardTitle>
                <CardDescription>Informasi terkait jenjang dan tujuan atlet di akademi.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem><FormLabel>Kategori Usia</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className="h-12 rounded-xl bg-secondary border"><SelectValue placeholder="Pilih Kategori" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Pra-usia dini (U-9)">Pra-usia dini (U-9)</SelectItem>
                      <SelectItem value="Usia dini (U-11)">Usia dini (U-11)</SelectItem>
                      <SelectItem value="Anak-anak (U-13)">Anak-anak (U-13)</SelectItem>
                      <SelectItem value="Pemula & Remaja (U-15, U-17)">Pemula & Remaja (U-15, U-17)</SelectItem>
                    </SelectContent>
                  </Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="level" render={({ field }) => (
                  <FormItem><FormLabel>Level Atlet</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className="h-12 rounded-xl bg-secondary border"><SelectValue placeholder="Pilih Level" /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="Beginner">Beginner</SelectItem><SelectItem value="Intermediate">Intermediate</SelectItem><SelectItem value="Advanced">Advanced</SelectItem><SelectItem value="Elite">Elite</SelectItem></SelectContent>
                  </Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="pbsiNumber" render={({ field }) => (
                  <FormItem><FormLabel>Nomor PBSI (Jika Ada)</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="startYear" render={({ field }) => (
                  <FormItem><FormLabel>Tahun Mulai Badminton</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="careerTarget" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>Target Karier</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className="h-12 rounded-xl bg-secondary border"><SelectValue placeholder="Pilih Target" /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="Rekreasi">Rekreasi</SelectItem><SelectItem value="Prestasi">Prestasi</SelectItem><SelectItem value="Profesional">Profesional</SelectItem></SelectContent>
                  </Select><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            {/* CARD F: EVALUASI */}
            <Card className="rounded-3xl shadow-xl border-blue-200 bg-blue-50/50">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-headline flex items-center gap-3 text-blue-700">
                  <ShieldCheck className="w-5 h-5" /> F. Evaluasi & Perkembangan
                </CardTitle>
                <CardDescription className="text-blue-600 font-bold">⚠️ Data ini AKAN MUNCUL di profil atlet.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="skillScore" render={({ field }) => (
                  <FormItem><FormLabel>Daya Juang (0-100)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl bg-white border" placeholder="85" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="coachName" render={({ field }) => (
                  <FormItem><FormLabel>Nama Pelatih Evaluator</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-white border" placeholder="Coach Budi" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="coachNotes" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>Catatan Pelatih</FormLabel><FormControl><Textarea {...field} className="rounded-xl bg-white border h-24" placeholder="Atlet memiliki semangat yang tinggi..." /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            {/* CARD G: DATA INTERNAL */}
            <Card className="rounded-3xl shadow-xl border-red-200 bg-red-50/50">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-headline flex items-center gap-3 text-red-700">
                  <Lock className="w-5 h-5" /> G. Data Internal (Admin Only)
                </CardTitle>
                <CardDescription className="text-red-600 font-bold">🔒 Data ini TIDAK AKAN MUNCUL di profil atlet.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                <FormField control={form.control} name="adminNotes" render={({ field }) => (
                  <FormItem><FormLabel>Catatan Admin</FormLabel><FormControl><Textarea {...field} className="rounded-xl bg-white border h-24" placeholder="Status pembayaran, catatan khusus, dll..." /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            {/* CARD H: KOMPOSISI TUBUH LENGKAP */}
            <Card className="rounded-3xl shadow-xl border-green-500/10 bg-green-50/30">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-headline flex items-center gap-3">
                  <Weight className="w-5 h-5 text-green-600" /> H. Komposisi Tubuh & Kesehatan Lengkap
                </CardTitle>
                <CardDescription>Data pengukuran InBody/Tanita dan Tanda Vital (Opsional).</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-8">

                {/* H1. Lingkar Tubuh */}
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 border-b pb-2">1. Lingkar Tubuh (Circumferences)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField control={form.control} name="armCircumference" render={({ field }) => (
                      <FormItem><FormLabel>Lingkar Lengan (cm)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 28" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="thighCircumference" render={({ field }) => (
                      <FormItem><FormLabel>Lingkar Paha (cm)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 50" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="calfCircumference" render={({ field }) => (
                      <FormItem><FormLabel>Lingkar Betis (cm)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 35" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </div>

                {/* H2. Tanda Vital */}
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 border-b pb-2">2. Tanda Vital (Vitals)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField control={form.control} name="bloodPressureSystolic" render={({ field }) => (
                      <FormItem><FormLabel>Tekanan Darah Sistolik</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 120" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="bloodPressureDiastolic" render={({ field }) => (
                      <FormItem><FormLabel>Tekanan Darah Diastolik</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 80" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="pulse" render={({ field }) => (
                      <FormItem><FormLabel>Denyut Nadi (bpm)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 72" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </div>

                {/* H3. Analisis Komposisi Tubuh */}
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 border-b pb-2">3. Analisis Komposisi Tubuh (Body Composition)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <FormField control={form.control} name="bmi" render={({ field }) => (
                      <FormItem><FormLabel>BMI</FormLabel><FormControl><Input type="number" step="0.1" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 21.5" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="bodyFatPercent" render={({ field }) => (
                      <FormItem><FormLabel>Body Fat (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 15.0" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="skeletalMusclePercent" render={({ field }) => (
                      <FormItem><FormLabel>Skeletal Muscle (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 45.0" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="muscleMassPercent" render={({ field }) => (
                      <FormItem><FormLabel>Muscle Mass (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 40.0" /></FormControl><FormMessage /></FormItem>
                    )} />

                    <FormField control={form.control} name="bodyWaterPercent" render={({ field }) => (
                      <FormItem><FormLabel>Body Water (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 60.0" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="boneMassPercent" render={({ field }) => (
                      <FormItem><FormLabel>Bone Mass (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 4.0" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="proteinPercent" render={({ field }) => (
                      <FormItem><FormLabel>Protein (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 18.0" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="visceralFatIndex" render={({ field }) => (
                      <FormItem><FormLabel>Visceral Fat Index</FormLabel><FormControl><Input type="number" step="0.1" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 5" /></FormControl><FormMessage /></FormItem>
                    )} />

                    <FormField control={form.control} name="subcutaneousFat" render={({ field }) => (
                      <FormItem><FormLabel>Subcutaneous Fat (kg)</FormLabel><FormControl><Input type="number" step="0.1" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 8.5" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="inorganicSalt" render={({ field }) => (
                      <FormItem><FormLabel>Inorganic Salt (kg)</FormLabel><FormControl><Input type="number" step="0.1" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 3.2" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="leanBodyMass" render={({ field }) => (
                      <FormItem><FormLabel>Lean Body Mass (kg)</FormLabel><FormControl><Input type="number" step="0.1" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 55.0" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="somatotype" render={({ field }) => (
                      <FormItem><FormLabel>Somatotype</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="h-12 rounded-xl bg-white border"><SelectValue placeholder="Pilih Tipe" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Ectomorph">Ectomorph</SelectItem>
                          <SelectItem value="Mesomorph">Mesomorph</SelectItem>
                          <SelectItem value="Endomorph">Endomorph</SelectItem>
                          <SelectItem value="Ecto-Mesomorph">Ecto-Mesomorph</SelectItem>
                          <SelectItem value="Meso-Endomorph">Meso-Endomorph</SelectItem>
                          <SelectItem value="Balanced">Balanced</SelectItem>
                          <SelectItem value="Too Lean">Too Lean</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="Plus Size">Plus Size</SelectItem>
                        </SelectContent>
                      </Select><FormMessage /></FormItem>
                    )} />

                    <FormField control={form.control} name="bmr" render={({ field }) => (
                      <FormItem><FormLabel>BMR (kcal)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 1500" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="amr" render={({ field }) => (
                      <FormItem><FormLabel>AMR (kcal)</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl bg-white border" placeholder="e.g. 2400" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </div>

              </CardContent>
            </Card>

          </div>

          <div className="pt-4">
            <SubmitButton />
          </div>
        </form>
      </Form>
    </div>
  );
}
