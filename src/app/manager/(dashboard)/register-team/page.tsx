

"use client";

import { useState, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  TeamRegistrationFormValues, 
  teamRegistrationSchema 
} from "@/lib/schemas/registration";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Copy, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { registerTeamEntity } from "./actions";

const initialState = {
  success: false,
  teamCode: null,
};

const CATEGORIES = ["Beginner"] as const;

export default function RegisterTeamPage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(registerTeamEntity, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ code: string; name: string } | null>(null);

  const form = useForm<TeamRegistrationFormValues>({
    resolver: zodResolver(teamRegistrationSchema),
    defaultValues: {
      entityName: "",
      officialLocation: "",
      contactPerson: "",
      phoneNumber: "",
      category: undefined,
    },
  });

  useEffect(() => {
    if (state.success && state.teamCode) {
      setSuccessData({
        code: state.teamCode,
        name: form.getValues("entityName"),
      });

      toast({
        title: "Registrasi Berhasil!",
        description: "Komunitas telah dibuat. Silakan bagikan kode akses ke pemain.",
      });
      setIsSubmitting(false);
    } else if (state.success === false && state.teamCode === null) {
      toast({
            title: "Gagal Mendaftar",
            description: "Terjadi kesalahan pada server. Coba lagi nanti.",
            variant: "destructive",
        });
      setIsSubmitting(false);
    }
  }, [state, form, toast]);

  async function onSubmit(data: TeamRegistrationFormValues) {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value) {
            formData.append(key, value as string);
        }
    });
    formAction(formData);
  }

  const copyToClipboard = () => {
    if (successData?.code) {
      navigator.clipboard.writeText(successData.code);
      toast({ title: "Kode Komunitas Disalin", description: "Bagikan ke grup WhatsApp atlet Anda." });
    }
  };

  if (successData) {
    return (
      <div className="container mx-auto py-10 max-w-xl animate-in fade-in zoom-in duration-500">
        <Card className="border-green-500/50 shadow-lg bg-green-50/50 dark:bg-green-900/10">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl text-green-700 dark:text-green-400">Pendaftaran Sukses!</CardTitle>
            <CardDescription>
              Komunitas <strong>{successData.name}</strong> berhasil didaftarkan.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-4">
            <div className="bg-background border rounded-xl p-6 text-center space-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                Kode Join Komunitas (Share Code)
              </p>
              <div 
                className="text-4xl md:text-5xl font-mono font-bold tracking-widest text-primary cursor-pointer hover:opacity-80 transition-opacity"
                onClick={copyToClipboard}
              >
                {successData.code}
              </div>
              <p className="text-xs text-muted-foreground">
                Klik kode di atas untuk menyalin
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full" asChild>
              <Link href={`/manager/members`}>
                Kelola Anggota Komunitas <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Formulir Pendaftaran Komunitas</CardTitle>
          <CardDescription>
            Daftarkan komunitas Anda untuk mengikuti turnamen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Identitas Komunitas & Manajer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="entityName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Komunitas</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: PB. Badminton Ceria" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="officialLocation" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domisili / Asal Komunitas</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: Cimahi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="contactPerson" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Manajer (PIC)</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama Lengkap Anda" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="08xxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )} />
                </div>
              </div>

              <Separator />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-lg font-medium">Kategori Pertandingan</FormLabel>
                    <FormDescription>Pilih kategori yang akan diikuti oleh para pemain di komunitas ini.</FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        {CATEGORIES.map((cat) => (
                           <FormItem key={cat}>
                             <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                               <FormControl>
                                 <RadioGroupItem value={cat} className="sr-only" />
                               </FormControl>
                               <div className="items-center rounded-md border-2 border-muted p-4 hover:border-accent cursor-pointer transition-all">
                                 <h4 className="font-semibold text-center">{cat}</h4>
                               </div>
                             </FormLabel>
                           </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-[200px]">
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Memproses...</>
                  ) : "Buat Komunitas & Dapatkan Kode"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

