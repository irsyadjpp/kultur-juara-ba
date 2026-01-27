
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
import { UserPlus, Loader2, PartyPopper } from 'lucide-react';
import { registerAthlete } from './actions';

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
      nik: "",
      dob: "",
      gender: undefined,
      clubName: "",
      category: undefined,
      email: "",
      whatsapp: "",
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
          <h1 className="text-3xl font-black font-headline tracking-tight">Registrasi Atlet Baru</h1>
          <p className="text-muted-foreground">Formulir untuk pendataan atlet oleh admin.</p>
        </div>
      </div>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          <Card className="rounded-[2rem] border-border/50 shadow-lg">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl">Informasi Personal</CardTitle>
              <CardDescription>Data sesuai dengan identitas resmi (KTP/Akta).</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="nik" render={({ field }) => (
                <FormItem>
                  <FormLabel>NIK</FormLabel>
                  <FormControl><Input {...field} maxLength={16} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="dob" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="gender" render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                      <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Laki-laki" id="male" /></FormControl><Label htmlFor="male">Laki-laki</Label></FormItem>
                      <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Perempuan" id="female" /></FormControl><Label htmlFor="female">Perempuan</Label></FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-border/50 shadow-lg">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl">Informasi Klub & Kontak</CardTitle>
              <CardDescription>Data untuk keperluan administrasi turnamen.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="clubName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Klub / PB</FormLabel>
                  <FormControl><Input {...field} placeholder="Contoh: PB. Jaya Raya" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori Usia</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Pilih Kategori" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="U-13">U-13</SelectItem>
                      <SelectItem value="U-17">U-17</SelectItem>
                      <SelectItem value="Dewasa">Dewasa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" {...field} placeholder="atlet@email.com" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="whatsapp" render={({ field }) => (
                <FormItem>
                  <FormLabel>No. WhatsApp</FormLabel>
                  <FormControl><Input type="tel" {...field} placeholder="08..." /></FormControl>
                  <FormMessage />
                </FormItem>
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
