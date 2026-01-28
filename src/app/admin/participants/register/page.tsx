
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { athleteRegistrationSchema, type AthleteRegistrationFormValues } from '@/lib/schemas/athlete';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Loader2, User } from 'lucide-react';
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

export default function RegisterAthletePage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(registerAthlete, initialState);

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
      category: undefined,
      level: undefined,
      pbsiNumber: "",
      startYear: "",
      careerTarget: undefined,
    },
  });

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
                <Badge variant="outline" className="rounded-full px-3 py-1 border-primary text-primary bg-primary/10 backdrop-blur-md">
                    <UserPlus className="w-3 h-3 mr-2" /> PENDAFTARAN MANUAL
                </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-white">
                Registrasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Atlet Baru</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Formulir untuk mendata atlet baru secara manual di Kultur Juara Academy.
            </p>
        </div>
      </div>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          
          <Card className="bg-zinc-900/50 backdrop-blur-sm border-border/20 rounded-3xl shadow-xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-headline flex items-center gap-3">
                <User className="w-5 h-5 text-primary"/> A. Data Pribadi
              </CardTitle>
              <CardDescription>Informasi dasar sesuai identitas resmi.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Nama Lengkap</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-zinc-950 border-zinc-800" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="nickname" render={({ field }) => (
                    <FormItem><FormLabel>Nama Panggilan</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-zinc-950 border-zinc-800"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="pob" render={({ field }) => (
                    <FormItem><FormLabel>Tempat Lahir</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-zinc-950 border-zinc-800"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="dob" render={({ field }) => (
                    <FormItem><FormLabel>Tanggal Lahir</FormLabel><FormControl><Input type="date" {...field} className="h-12 rounded-xl bg-zinc-950 border-zinc-800"/></FormControl><FormMessage /></FormItem>
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
                    <FormItem><FormLabel>Nomor HP</FormLabel><FormControl><Input type="tel" {...field} className="h-12 rounded-xl bg-zinc-950 border-zinc-800"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} className="h-12 rounded-xl bg-zinc-950 border-zinc-800"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Alamat</FormLabel><FormControl><Textarea {...field} className="rounded-xl bg-zinc-950 border-zinc-800"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="schoolOrWork" render={({ field }) => (
                    <FormItem><FormLabel>Sekolah / Pekerjaan</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-zinc-950 border-zinc-800"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="guardianName" render={({ field }) => (
                    <FormItem><FormLabel>Orang Tua / Wali (Opsional)</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-zinc-950 border-zinc-800"/></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="emergencyContact" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Kontak Darurat</FormLabel><FormControl><Input type="tel" {...field} className="h-12 rounded-xl bg-zinc-950 border-zinc-800"/></FormControl><FormMessage /></FormItem>
                )} />
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 backdrop-blur-sm border-border/20 rounded-3xl shadow-xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-headline flex items-center gap-3">
                 <Target className="w-5 h-5 text-primary"/> B. Status Kepelatihan
              </CardTitle>
              <CardDescription>Informasi terkait jenjang dan tujuan atlet di akademi.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem><FormLabel>Kategori Usia</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="h-12 rounded-xl bg-zinc-950 border-zinc-800"><SelectValue placeholder="Pilih Kategori" /></SelectTrigger></FormControl>
                      <SelectContent><SelectItem value="Pra-usia dini">Pra-usia dini</SelectItem><SelectItem value="Usia dini">Usia dini</SelectItem><SelectItem value="Anak">Anak</SelectItem><SelectItem value="Remaja">Remaja</SelectItem><SelectItem value="Dewasa">Dewasa</SelectItem><SelectItem value="Veteran">Veteran</SelectItem></SelectContent>
                  </Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="level" render={({ field }) => (
                  <FormItem><FormLabel>Level Atlet</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="h-12 rounded-xl bg-zinc-950 border-zinc-800"><SelectValue placeholder="Pilih Level" /></SelectTrigger></FormControl>
                      <SelectContent><SelectItem value="Beginner">Beginner</SelectItem><SelectItem value="Intermediate">Intermediate</SelectItem><SelectItem value="Advanced">Advanced</SelectItem><SelectItem value="Elite">Elite</SelectItem></SelectContent>
                  </Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="pbsiNumber" render={({ field }) => (
                  <FormItem><FormLabel>Nomor PBSI (Jika Ada)</FormLabel><FormControl><Input {...field} className="h-12 rounded-xl bg-zinc-950 border-zinc-800"/></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="startYear" render={({ field }) => (
                  <FormItem><FormLabel>Tahun Mulai Badminton</FormLabel><FormControl><Input type="number" {...field} className="h-12 rounded-xl bg-zinc-950 border-zinc-800"/></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="careerTarget" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>Target Karier</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="h-12 rounded-xl bg-zinc-950 border-zinc-800"><SelectValue placeholder="Pilih Target" /></SelectTrigger></FormControl>
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
