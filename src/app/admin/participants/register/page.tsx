
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
import { UserPlus, Loader2 } from 'lucide-react';
import { registerAthlete } from './actions';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const initialState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full h-14 text-lg" disabled={pending}>
      {pending ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> MENYIMPAN...</> : <><UserPlus className="w-5 h-5 mr-2" /> DAFTARKAN ATLET</>}
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black font-headline tracking-tight">Master Identitas Atlet</h1>
          <p className="text-muted-foreground">Formulir pendaftaran inti untuk semua atlet di akademi.</p>
        </div>
      </div>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          
          <Card className="rounded-[2rem] border-border/50 shadow-lg">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl">A. Data Pribadi</CardTitle>
              <CardDescription>Informasi dasar sesuai identitas resmi.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Nama Lengkap</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="nickname" render={({ field }) => (
                    <FormItem><FormLabel>Nama Panggilan</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="pob" render={({ field }) => (
                    <FormItem><FormLabel>Tempat Lahir</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="dob" render={({ field }) => (
                    <FormItem><FormLabel>Tanggal Lahir</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
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
                    <FormItem><FormLabel>Nomor HP</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Alamat</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="schoolOrWork" render={({ field }) => (
                    <FormItem><FormLabel>Sekolah / Pekerjaan</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="guardianName" render={({ field }) => (
                    <FormItem><FormLabel>Orang Tua / Wali (Opsional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="emergencyContact" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Kontak Darurat</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-border/50 shadow-lg">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl">B. Status Kepelatihan</CardTitle>
              <CardDescription>Informasi terkait jenjang dan tujuan atlet di akademi.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem><FormLabel>Kategori Usia</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Pilih Kategori" /></SelectTrigger></FormControl>
                      <SelectContent><SelectItem value="Pra-usia dini">Pra-usia dini</SelectItem><SelectItem value="Usia dini">Usia dini</SelectItem><SelectItem value="Anak">Anak</SelectItem><SelectItem value="Remaja">Remaja</SelectItem><SelectItem value="Dewasa">Dewasa</SelectItem><SelectItem value="Veteran">Veteran</SelectItem></SelectContent>
                  </Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="level" render={({ field }) => (
                  <FormItem><FormLabel>Level Atlet</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Pilih Level" /></SelectTrigger></FormControl>
                      <SelectContent><SelectItem value="Beginner">Beginner</SelectItem><SelectItem value="Intermediate">Intermediate</SelectItem><SelectItem value="Advanced">Advanced</SelectItem><SelectItem value="Elite">Elite</SelectItem></SelectContent>
                  </Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="pbsiNumber" render={({ field }) => (
                  <FormItem><FormLabel>Nomor PBSI (Jika Ada)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="startYear" render={({ field }) => (
                  <FormItem><FormLabel>Tahun Mulai Badminton</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="careerTarget" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>Target Karier</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Pilih Target" /></SelectTrigger></FormControl>
                      <SelectContent><SelectItem value="Rekreasi">Rekreasi</SelectItem><SelectItem value="Prestasi">Prestasi</SelectItem><SelectItem value="Profesional">Profesional</SelectItem></SelectContent>
                  </Select><FormMessage /></FormItem>
              )} />
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
             <SubmitButton />
          </div>
        </form>
      </Form>
    </div>
  );
}
