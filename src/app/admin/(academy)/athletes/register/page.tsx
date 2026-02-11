'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { athleteRegistrationSchema, type AthleteRegistrationFormValues } from '@/lib/schemas/athlete';
import { useEffect, useState } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { UserPlus, Loader2, User, Ruler, Shirt, Weight, Edit, ShieldCheck, Lock, Briefcase, HeartPulse, Activity, FileText, CheckCircle, UploadCloud, IdCard, Users, Trophy, ScrollText, Dumbbell, Stethoscope, MapPin, GraduationCap } from 'lucide-react';
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

const calculateBaseline = (score: number): { label: string, color: string } => {
  if (!score || score <= 0) return { label: "Belum Ada Data", color: "bg-gray-100 text-gray-500" };
  if (score < 4) return { label: "Fundamental", color: "bg-yellow-100 text-yellow-700" };
  if (score < 8) return { label: "Pengembangan", color: "bg-blue-100 text-blue-700" };
  return { label: "Prestasi", color: "bg-green-100 text-green-700" };
};


export default function RegisterAthletePage() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(registerAthlete, initialState);
  const [recommendedSize, setRecommendedSize] = useState<string>('-');

  const form = useForm<AthleteRegistrationFormValues>({
    resolver: zodResolver(athleteRegistrationSchema),
    defaultValues: {
      fullName: "",
      nickname: "",
      pob: "",
      dob: "",
      gender: undefined,
      nik: "",
      citizenship: "Indonesia",
      bloodType: undefined,
      rhesus: undefined,
      dominantHand: undefined,
      phone: "",
      email: "",
      socialMedia: "",
      shoeSize: undefined,

      address: "",
      district: "",
      city: "",
      province: "",
      postalCode: "",

      schoolName: "",
      schoolAddress: "",
      schoolGrade: "",
      schoolPhone: "",

      ant_height_cm: undefined,
      ant_weight_kg: undefined,
      ant_sitting_height: undefined,
      ant_arm_span_cm: undefined,
      ant_leg_length: undefined,

      chestWidth: undefined,
      waistCircumference: undefined,
      jerseyLength: undefined,
      shirtSize: "",

      jerseyNameOption: undefined,
      jerseyName: "",

      fatherName: "",
      fatherJob: "",
      fatherPhone: "",
      motherName: "",
      motherJob: "",
      motherPhone: "",

      emergencyName: "",
      emergencyRelation: "",
      emergencyPhone: "",

      parentIncomeBracket: undefined,
      familyStatus: undefined,
      numberOfDependents: undefined,
      siblingsCount: undefined,
      governmentAssistance: [],
      houseStatus: undefined,
      transportationToField: undefined,
      smartphoneAccess: undefined,
      infoSource: undefined,

      seriousInjury: false,
      injuryDetails: "",
      medicalHistory: [],
      allergies: "",
      surgeryHistory: false,
      routineMedication: false,
      riskDiseaseHistory: "",
      vaccinationStatus: "",
      chronicSymptoms: [],

      dietaryHabits: undefined,
      averageSleepHours: undefined,
      stayUpLate: false,
      schoolWorkload: undefined,
      transportationToGym: undefined,

      startYear: undefined,
      pbsiNumber: "",
      previousClub: "",
      specialization: undefined,
      achievements: [],

      category: "Pra-usia dini (U-9)",
      level: "Fundamental",
      trainingTarget: undefined,
      championshipTarget: [],

      // Baseline (Admin)
      // Antropometri defined above
      ant_bmi_score: undefined,
      ant_skeletal_muscle_pct: undefined,
      ant_body_fat_pct: undefined,
      kin_grip_switch_speed: undefined,
      kin_kinetic_linkage: undefined,
      phy_resting_heart_rate: undefined,
      bio_t_test_sec: undefined,
      bio_vertical_jump: undefined,
      bio_beep_test_lvl: undefined,

      contractDuration: undefined,
      contractStartDate: "",
      contractEndDate: "",

      agreeLifestyle: false,
      agreeMediaRights: false,
      agreeLiability: false,
      agreeEmergency: false,
      agreeCodeOfEthics: false,
      authenticityDeclaration: false,

      // Files handled separately usually, but good to init
      fileKK: undefined,
      fileAkta: undefined,
      filePhoto: undefined,
      fileRapor: undefined,
      fileHealthCert: undefined,

      registrationDate: new Date().toISOString().split('T')[0],
      niaKji: "",
      initialStatus: "Probation",
    },
  });

  const { watch, setValue } = form;
  const height = watch('ant_height_cm');
  const jerseyLength = watch('jerseyLength');
  const chestWidth = watch('chestWidth');
  const waistCircumference = watch('waistCircumference');
  const fullName = watch('fullName');
  const jerseyNameOption = watch('jerseyNameOption');

  useEffect(() => {
    const pb = Number(jerseyLength || 0);
    const ld = Number(chestWidth || 0);
    const lp = Number(waistCircumference || 0);

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
            Formulir untuk mendata atlet baru secara manual di Kultur Juara Badminton Academy.
          </p>
        </div>
      </div>
      <Form {...form}>
        <form action={formAction} className="space-y-8">

          <Tabs defaultValue="identitas" className="w-full">
            <TabsList className="flex w-full overflow-x-auto h-auto p-1.5 bg-white/80 backdrop-blur-md rounded-2xl sticky top-4 z-40 shadow-lg border border-slate-200 snap-x gap-2 no-scrollbar">
              <TabsTrigger value="identitas" className="flex-none snap-start min-w-[110px] md:flex-1 h-14 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 font-bold text-xs md:text-sm flex flex-col items-center justify-center gap-1">
                <IdCard className="w-4 h-4 md:w-5 md:h-5" />
                <span>Identitas</span>
              </TabsTrigger>
              <TabsTrigger value="keluarga" className="flex-none snap-start min-w-[110px] md:flex-1 h-14 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 font-bold text-xs md:text-sm flex flex-col items-center justify-center gap-1">
                <Users className="w-4 h-4 md:w-5 md:h-5" />
                <span>Keluarga</span>
              </TabsTrigger>
              <TabsTrigger value="medis" className="flex-none snap-start min-w-[110px] md:flex-1 h-14 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 font-bold text-xs md:text-sm flex flex-col items-center justify-center gap-1">
                <HeartPulse className="w-4 h-4 md:w-5 md:h-5" />
                <span>Medis</span>
              </TabsTrigger>
              <TabsTrigger value="teknis" className="flex-none snap-start min-w-[110px] md:flex-1 h-14 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 font-bold text-xs md:text-sm flex flex-col items-center justify-center gap-1">
                <Trophy className="w-4 h-4 md:w-5 md:h-5" />
                <span>Teknis</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex-none snap-start min-w-[110px] md:flex-1 h-14 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 font-bold text-xs md:text-sm flex flex-col items-center justify-center gap-1">
                <ScrollText className="w-4 h-4 md:w-5 md:h-5" />
                <span>Kontrak</span>
              </TabsTrigger>
            </TabsList>

            {/* === TAB 1: IDENTITAS & ALAMAT === */}
            <TabsContent value="identitas" className="space-y-8 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="rounded-3xl shadow-xl">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-headline flex items-center gap-3"><User className="w-5 h-5 text-primary" /> A. Identitas Pribadi</CardTitle>
                  <CardDescription>Data sesuai KTP/KIA/Akte Kelahiran.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Nama Lengkap</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="nickname" render={({ field }) => (
                    <FormItem><FormLabel>Nama Panggilan</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="nik" render={({ field }) => (
                    <FormItem><FormLabel>NIK (Nomor Induk Kependudukan)</FormLabel><FormControl><Input {...field} maxLength={16} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="pob" render={({ field }) => (
                    <FormItem><FormLabel>Tempat Lahir</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="dob" render={({ field }) => (
                    <FormItem><FormLabel>Tanggal Lahir</FormLabel><FormControl><Input type="date" {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem><FormLabel>Jenis Kelamin</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                      <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Laki-laki" /></FormControl><Label>Laki-laki</Label></FormItem>
                      <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Perempuan" /></FormControl><Label>Perempuan</Label></FormItem>
                    </RadioGroup></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="citizenship" render={({ field }) => (
                    <FormItem><FormLabel>Kewarganegaraan</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" placeholder="Indonesia" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="bloodType" render={({ field }) => (
                      <FormItem><FormLabel>Gol. Darah</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-12 rounded-xl bg-secondary border"><SelectValue placeholder="-" /></SelectTrigger></FormControl><SelectContent><SelectItem value="A">A</SelectItem><SelectItem value="B">B</SelectItem><SelectItem value="AB">AB</SelectItem><SelectItem value="O">O</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="rhesus" render={({ field }) => (
                      <FormItem><FormLabel>Rhesus</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-12 rounded-xl bg-secondary border"><SelectValue placeholder="+/-" /></SelectTrigger></FormControl><SelectContent><SelectItem value="+">Positif (+)</SelectItem><SelectItem value="-">Negatif (-)</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="socialMedia" render={({ field }) => (
                    <FormItem><FormLabel>Username IG/TikTok (Opsional)</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" prefix="@" /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-xl">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-headline flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /> Alamat & Kontak</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Alamat Jalan Lengkap</FormLabel><FormControl><Textarea {...field} className="rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="district" render={({ field }) => (
                    <FormItem><FormLabel>Kecamatan</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>Kota/Kabupaten</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="province" render={({ field }) => (
                    <FormItem><FormLabel>Provinsi</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="postalCode" render={({ field }) => (
                    <FormItem><FormLabel>Kode Pos</FormLabel><FormControl><Input {...field} maxLength={5} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>No. HP Atlet</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email Atlet</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-xl">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-headline flex items-center gap-3"><GraduationCap className="w-5 h-5 text-primary" /> Pendidikan</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="schoolName" render={({ field }) => (
                    <FormItem><FormLabel>Nama Sekolah</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="schoolGrade" render={({ field }) => (
                    <FormItem><FormLabel>Kelas</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="schoolAddress" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Alamat Sekolah</FormLabel><FormControl><Textarea {...field} className="rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* === TAB 2: ORANG TUA & SOSIAL === */}
            <TabsContent value="keluarga" className="space-y-8 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="rounded-3xl shadow-xl border-t-4 border-t-orange-500">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-headline">Data Orang Tua / Wali</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Ayah */}
                  <div className="space-y-4 md:col-span-3"><h4 className="font-bold text-muted-foreground border-b pb-2">Data Ayah</h4></div>
                  <FormField control={form.control} name="fatherName" render={({ field }) => (
                    <FormItem><FormLabel>Nama Ayah</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="fatherJob" render={({ field }) => (
                    <FormItem><FormLabel>Pekerjaan</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="fatherPhone" render={({ field }) => (
                    <FormItem><FormLabel>No. HP</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />

                  {/* Ibu */}
                  <div className="space-y-4 md:col-span-3 pt-4"><h4 className="font-bold text-muted-foreground border-b pb-2">Data Ibu</h4></div>
                  <FormField control={form.control} name="motherName" render={({ field }) => (
                    <FormItem><FormLabel>Nama Ibu</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="motherJob" render={({ field }) => (
                    <FormItem><FormLabel>Pekerjaan</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="motherPhone" render={({ field }) => (
                    <FormItem><FormLabel>No. HP</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />

                  {/* Emergency */}
                  <div className="space-y-4 md:col-span-3 pt-4"><h4 className="font-bold text-red-500 border-b border-red-200 pb-2">Kontak Darurat (Wajib)</h4></div>
                  <FormField control={form.control} name="emergencyName" render={({ field }) => (
                    <FormItem><FormLabel>Nama Kontak</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="emergencyRelation" render={({ field }) => (
                    <FormItem><FormLabel>Hubungan</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" placeholder="e.g. Paman, Kakak" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="emergencyPhone" render={({ field }) => (
                    <FormItem><FormLabel>No. HP Darurat</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-xl">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-headline flex items-center gap-3"><Briefcase className="w-5 h-5 text-primary" /> Data Sosial Ekonomi (Rahasia)</CardTitle>
                  <CardDescription>Digunakan untuk penentuan subsidi/beasiswa.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="parentIncomeBracket" render={({ field }) => (
                    <FormItem><FormLabel>Estimasi Penghasilan Ortu</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-12 rounded-xl bg-secondary border"><SelectValue placeholder="Pilih Range" /></SelectTrigger></FormControl><SelectContent><SelectItem value="< 3jt">&lt; 3 Juta</SelectItem><SelectItem value="3jt - 5jt">3 - 5 Juta</SelectItem><SelectItem value="5jt - 10jt">5 - 10 Juta</SelectItem><SelectItem value="> 10jt">{'>'} 10 Juta</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="familyStatus" render={({ field }) => (
                    <FormItem><FormLabel>Status Keluarga</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-12 rounded-xl bg-secondary border"><SelectValue placeholder="Pilih Status" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Lengkap">Lengkap</SelectItem><SelectItem value="Yatim">Yatim</SelectItem><SelectItem value="Piatu">Piatu</SelectItem><SelectItem value="Yatim Piatu">Yatim Piatu</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="numberOfDependents" render={({ field }) => (
                    <FormItem><FormLabel>Jml Tanggungan</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="siblingsCount" render={({ field }) => (
                    <FormItem><FormLabel>Jml Saudara Kandung</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl bg-secondary border" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="houseStatus" render={({ field }) => (
                    <FormItem><FormLabel>Status Rumah</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-12 rounded-xl bg-secondary border"><SelectValue placeholder="-" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Milik Sendiri">Milik Sendiri</SelectItem><SelectItem value="Sewa/Kontrak">Sewa/Kontrak</SelectItem><SelectItem value="Menumpang">Menumpang</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="transportationToField" render={({ field }) => (
                    <FormItem><FormLabel>Transportasi ke GOR</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-12 rounded-xl bg-secondary border"><SelectValue placeholder="-" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Jalan Kaki">Jalan Kaki</SelectItem><SelectItem value="Sepeda">Sepeda</SelectItem><SelectItem value="Motor">Motor</SelectItem><SelectItem value="Angkutan Umum">Angkutan Umum</SelectItem><SelectItem value="Mobil">Mobil</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="governmentAssistance" render={() => (
                    <FormItem className="md:col-span-2"><div className="mb-4"><FormLabel>Bantuan Pemerintah</FormLabel></div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["KIP (Pintar)", "PKH (Harapan)", "KIS (Sehat)", "KKS (Sembako)"].map((item) => (
                          <FormField key={item} control={form.control} name="governmentAssistance" render={({ field }) => (
                            <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0 text-sm">
                              <FormControl><Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => checked ? field.onChange([...(field.value || []), item]) : field.onChange(field.value?.filter((val) => val !== item))} /></FormControl>
                              <Label className="font-normal text-muted-foreground">{item}</Label>
                            </FormItem>
                          )} />
                        ))}
                      </div><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* === TAB 3: MEDIS & FISIK === */}
            <TabsContent value="medis" className="space-y-8 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="rounded-3xl shadow-xl border-green-500/10 h-full">
                  <CardHeader><CardTitle className="text-xl font-headline flex items-center gap-3"><Ruler className="w-5 h-5 text-green-600" /> Antropometri</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="ant_height_cm" render={({ field }) => (<FormItem><FormLabel>Tinggi (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="ant_weight_kg" render={({ field }) => (<FormItem><FormLabel>Berat (kg)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="ant_sitting_height" render={({ field }) => (<FormItem><FormLabel>Tinggi Duduk (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="ant_arm_span_cm" render={({ field }) => (<FormItem><FormLabel>Rentang Lengan (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="ant_leg_length" render={({ field }) => (<FormItem><FormLabel>Panjang Tungkai (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="shoeSize" render={({ field }) => (<FormItem><FormLabel>Ukuran Sepatu</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="dominantHand" render={({ field }) => (
                      <FormItem><FormLabel>Tangan Dominan</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="-" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Kanan">Kanan</SelectItem><SelectItem value="Kiri">Kiri</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                    )} />
                  </CardContent>
                </Card>
                <Card className="rounded-3xl shadow-xl border-green-500/10 h-full">
                  <CardHeader><CardTitle className="text-xl font-headline flex items-center gap-3"><Shirt className="w-5 h-5 text-green-600" /> Jersey Fitting</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-3 gap-2">
                    <FormField control={form.control} name="jerseyLength" render={({ field }) => (<FormItem><FormLabel>PB (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="chestWidth" render={({ field }) => (<FormItem><FormLabel>LD (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="waistCircumference" render={({ field }) => (<FormItem><FormLabel>LP (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                    <div className="col-span-3 pt-4 text-center"><Badge variant="outline" className="text-lg px-4 py-2">Rekomendasi Size: <span className="font-black ml-2">{recommendedSize}</span></Badge></div>
                    {/* Nama Punggung */}
                    <div className="col-span-3 pt-4 border-t mt-4 space-y-2">
                      <FormField control={form.control} name="jerseyNameOption" render={({ field }) => (
                        <FormItem><FormLabel>Format Nama</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4"><FormItem className="flex items-center space-x-2"><RadioGroupItem value="initials" /><Label>Nama Depan</Label></FormItem><FormItem className="flex items-center space-x-2"><RadioGroupItem value="lastName" /><Label>Nama Belakang</Label></FormItem></RadioGroup></FormControl></FormItem>
                      )} />
                      <FormField control={form.control} name="jerseyName" render={({ field }) => (<FormItem><FormControl><Input {...field} readOnly className="bg-secondary font-mono text-center uppercase font-black tracking-widest" /></FormControl></FormItem>)} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-3xl shadow-xl border-red-500/10">
                <CardHeader><CardTitle className="text-xl font-headline text-red-600">Riwayat Kesehatan & Risiko</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <FormField control={form.control} name="seriousInjury" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-xl border p-4 bg-white"><div className="space-y-0.5"><FormLabel>Pernah Cedera Serius?</FormLabel></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>
                  )} />
                  {form.watch('seriousInjury') && (
                    <FormField control={form.control} name="injuryDetails" render={({ field }) => (<FormItem><FormLabel>Jelaskan Detail Cedera & Tahun</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>)} />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="riskDiseaseHistory" render={({ field }) => (<FormItem><FormLabel>Riwayat Penyakit Berat/Menular</FormLabel><FormControl><Textarea {...field} placeholder="Tulis '-' jika tidak ada" /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="allergies" render={({ field }) => (<FormItem><FormLabel>Alergi (Obat/Makanan/Debu)</FormLabel><FormControl><Textarea {...field} placeholder="Tulis '-' jika tidak ada" /></FormControl></FormItem>)} />
                  </div>

                  <FormField control={form.control} name="medicalHistory" render={() => (
                    <FormItem><div className="mb-2"><FormLabel>Riwayat Penyakit Umum</FormLabel></div><div className="grid grid-cols-2 md:grid-cols-4 gap-2">{["Asma", "Jantung", "Diabetes", "Epilepsi"].map((item) => (
                      <FormField key={item} control={form.control} name="medicalHistory" render={({ field }) => (<FormItem key={item} className="flex flex-row items-center space-x-2 space-y-0"><FormControl><Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => checked ? field.onChange([...(field.value || []), item]) : field.onChange(field.value?.filter((val) => val !== item))} /></FormControl><Label className="font-normal">{item}</Label></FormItem>)} />
                    ))}</div></FormItem>
                  )} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="surgeryHistory" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-xl border p-3"><FormLabel>Pernah Operasi?</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="routineMedication" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-xl border p-3"><FormLabel>Pengobatan Rutin?</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-xl border-blue-500/10">
                <CardHeader><CardTitle className="text-xl font-headline text-blue-600">Lifestyle & Sport Science Baseline</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="dietaryHabits" render={({ field }) => (
                    <FormItem><FormLabel>Konsumsi Gorengan/Manis/Instan</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Frekuensi" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Jarang">Jarang (1-2x/minggu)</SelectItem><SelectItem value="Sering">Sering (3-5x/minggu)</SelectItem><SelectItem value="Sangat Sering">Sangat Sering (&gt;5x)</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="averageSleepHours" render={({ field }) => (<FormItem><FormLabel>Rata-rata Tidur (Jam)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                  <FormField control={form.control} name="stayUpLate" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-xl border p-3 bg-white"><FormLabel>Sering Begadang (&gt; 22.00)?</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />
                  <FormField control={form.control} name="schoolWorkload" render={({ field }) => (<FormItem><FormLabel>Beban Sekolah (Skala 1-10)</FormLabel><FormControl><Input type="number" min={1} max={10} {...field} /></FormControl></FormItem>)} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* === TAB 4: TEKNIS & PRESTASI === */}
            <TabsContent value="teknis" className="space-y-8 mt-6">
              <Card className="rounded-3xl shadow-xl">
                <CardHeader><CardTitle className="text-xl font-headline">Riwayat Bulu Tangkis</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="startYear" render={({ field }) => (<FormItem><FormLabel>Mulai Latihan (Tahun)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                  <FormField control={form.control} name="previousClub" render={({ field }) => (<FormItem><FormLabel>Klub Sebelumnya</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                  <FormField control={form.control} name="pbsiNumber" render={({ field }) => (<FormItem><FormLabel>ID PBSI (SI)</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                  <FormField control={form.control} name="specialization" render={({ field }) => (
                    <FormItem><FormLabel>Spesialisasi</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="-" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Tunggal">Tunggal</SelectItem><SelectItem value="Ganda">Ganda</SelectItem><SelectItem value="Ganda Campuran">Campuran</SelectItem><SelectItem value="Belum ditentukan">Belum ditentukan</SelectItem></SelectContent></Select></FormItem>
                  )} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* === TAB 5: ADMIN & KONTRAK === */}
            <TabsContent value="admin" className="space-y-8 mt-6">
              <Card className="rounded-3xl shadow-xl border-l-4 border-primary bg-slate-50/50">
                <CardHeader>
                  <CardTitle className="text-xl font-headline flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scroll-text text-primary"><path d="M15 12h-5" /><path d="M15 8h-5" /><path d="M19 17V5a2 2 0 0 0-2-2H4" /><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" /></svg>
                    Legal & Persetujuan (Wajib)
                  </CardTitle>
                  <CardDescription>Mohon baca setiap poin dengan teliti sebelum menyetujui.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "agreeLifestyle",
                      label: "Komitmen Gaya Hidup (Nutrisi & Istirahat)",
                      points: [
                        "Atlet wajib menjaga pola tidur minimal 8 jam sehari untuk pemulihan optimal.",
                        "Dilarang keras merokok, menggunakan vape, atau mengonsumsi alkohol.",
                        "Wajib menjaga pola makan sehat dan mengurangi konsumsi gorengan/gula berlebih."
                      ]
                    },
                    {
                      name: "agreeMediaRights",
                      label: "Hak Publikasi & Dokumentasi Media",
                      points: [
                        "Saya mengizinkan akademi mendokumentasikan kegiatan latihan/pertandingan (Foto/Video).",
                        "Materi dokumentasi dapat digunakan sepenuhnya untuk keperluan promosi di sosial media/website resmi akademi."
                      ]
                    },
                    {
                      name: "agreeLiability",
                      label: "Pelepasan Tanggung Jawab (Risiko Cedera)",
                      points: [
                        "Saya menyadari bahwa bulu tangkis adalah olahraga fisik yang memiliki risiko cedera.",
                        "Akademi bertanggung jawab memberikan pertolongan pertama (P3K) di lapangan.",
                        "Biaya pengobatan lanjutan (RS/Terapi) adalah tanggung jawab penuh wali atlet atau asuransi pribadi."
                      ]
                    },
                    {
                      name: "agreeEmergency",
                      label: "Persetujuan Tindakan Medis Darurat",
                      points: [
                        "Dalam kondisi gawat darurat dan wali tidak dapat dihubungi segera, saya memberikan wewenang penuh kepada akademi.",
                        "Akademi diizinkan membawa atlet ke Rumah Sakit terdekat untuk penanganan medis segera."
                      ]
                    },
                    {
                      name: "agreeCodeOfEthics",
                      label: "Kode Etik Atlet & Orang Tua",
                      points: [
                        "Atlet wajib menghormati pelatih, sesama atlet, dan wasit (Fair Play).",
                        "Orang tua dilarang mengintervensi program latihan pelatih di lapangan.",
                        "Tidak ada toleransi untuk tindakan bullying, kekerasan, atau pencurian."
                      ]
                    },
                    {
                      name: "authenticityDeclaration",
                      label: "Pernyataan Keaslian Dokumen",
                      points: [
                        "Saya menyatakan seluruh data dan dokumen (KK/Akta/Umur) yang diserahkan adalah ASLI & BENAR.",
                        "Apabila di kemudian hari ditemukan pemalsuan data, saya siap menerima sanksi (Diskualifikasi/Dikeluarkan dari akademi)."
                      ]
                    },
                  ].map((item: any) => (
                    <FormField key={item.name} control={form.control} name={item.name} render={({ field }) => (
                      <FormItem className="flex flex-col gap-3 p-5 rounded-2xl border border-slate-200 bg-white hover:border-primary/50 transition-all shadow-sm">
                        <div className="flex flex-row items-start justify-between gap-4">
                          <div className="space-y-2">
                            <FormLabel className="text-base font-bold text-slate-800 cursor-pointer" onClick={() => field.onChange(!field.value)}>
                              {item.label}
                            </FormLabel>
                            <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-slate-600 leading-relaxed">
                              {item.points.map((point: string, idx: number) => (
                                <li key={idx}>{point}</li>
                              ))}
                            </ul>
                          </div>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="w-6 h-6 mt-1 border-2 border-slate-300 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )} />
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-xl bg-slate-50 border-dashed border-2">
                <CardHeader><CardTitle className="text-xl font-headline text-slate-500">Administrasi Internal (Diisi Admin)</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="initialStatus" render={({ field }) => (
                    <FormItem><FormLabel>Status Awal</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="-" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Probation">Probation (1 Bulan)</SelectItem><SelectItem value="Kontrak 6 Bulan">Kontrak 6 Bulan</SelectItem><SelectItem value="Kontrak 1 Tahun">Kontrak 1 Tahun</SelectItem></SelectContent></Select></FormItem>
                  )} />
                  <FormField control={form.control} name="level" render={({ field }) => (
                    <FormItem><FormLabel>Placement Level</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="-" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Fundamental">Fundamental</SelectItem><SelectItem value="Pengembangan">Pengembangan</SelectItem><SelectItem value="Prestasi">Prestasi</SelectItem></SelectContent></Select></FormItem>
                  )} />
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem><FormLabel>Kelompok Usia</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="-" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Pra-usia dini (U-9)">U-9</SelectItem><SelectItem value="Usia dini (U-11)">U-11</SelectItem><SelectItem value="Anak-anak (U-13)">U-13</SelectItem><SelectItem value="Pemula & Remaja (U-15, U-17)">U-15 / U-17</SelectItem><SelectItem value="Taruna & Dewasa (U-19+)">U-19+</SelectItem></SelectContent></Select></FormItem>
                  )} />
                  <FormField control={form.control} name="registrationDate" render={({ field }) => (<FormItem><FormLabel>Tanggal Daftar</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>)} />
                </CardContent>
              </Card>

              <div className="pt-8"><SubmitButton /></div>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
