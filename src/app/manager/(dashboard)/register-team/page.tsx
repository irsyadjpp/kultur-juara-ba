
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  TeamRegistrationFormValues, 
  teamRegistrationSchema, 
  CATEGORIES 
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, User, ShieldCheck, CheckCircle2, Copy, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

function LabelCard({ htmlFor, title, code }: { htmlFor: string; title: string; code: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full text-center transition-all"
    >
      <span className="text-2xl font-bold mb-2">{code}</span>
      <span className="text-sm font-medium">{title}</span>
    </label>
  );
}

function getCategoryFullName(code: string) {
  switch (code) {
    case "MD": return "Ganda Putra";
    case "WD": return "Ganda Putri";
    case "XD": return "Ganda Campuran";
    default: return code;
  }
}

export default function RegisterTeamPage() {
  const [isClient, setIsClient] = useState(false);
  const [successData, setSuccessData] = useState<{
    code: string;
    name: string;
    type: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<TeamRegistrationFormValues>({
    resolver: zodResolver(teamRegistrationSchema),
    defaultValues: {
      entityName: "",
      officialLocation: "",
      contactPerson: "",
      phoneNumber: "",
      type: "SINGLE_TEAM",
      registrations: [],
    },
  });

  const registrationType = form.watch("type");

  async function onSubmit(data: TeamRegistrationFormValues) {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockGeneratedCode = `BCC-${data.registrations[0].category}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      setSuccessData({
        code: mockGeneratedCode,
        name: data.entityName,
        type: data.type === 'SINGLE_TEAM' ? 'Tim Tunggal' : 'Komunitas',
      });

      toast({
        title: "Registrasi Berhasil!",
        description: "Tim telah dibuat. Silakan bagikan kode akses ke pemain.",
      });

    } catch (error) {
      toast({
        title: "Gagal Mendaftar",
        description: "Terjadi kesalahan pada server. Coba lagi nanti.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleSingleCategoryChange = (category: "MD" | "WD" | "XD") => {
    form.setValue("registrations", [{ category, quantity: 1 }]);
  };

  const handleCommunityCategoryChange = (category: "MD" | "WD" | "XD", checked: boolean) => {
    const currentRegs = form.getValues("registrations");
    if (checked) {
      form.setValue("registrations", [...currentRegs, { category, quantity: 1 }]);
    } else {
      form.setValue("registrations", currentRegs.filter((r) => r.category !== category));
    }
  };

  const handleCommunityQuantityChange = (category: "MD" | "WD" | "XD", qty: number) => {
    const currentRegs = form.getValues("registrations");
    const updatedRegs = currentRegs.map((r) => 
      r.category === category ? { ...r, quantity: qty } : r
    );
    form.setValue("registrations", updatedRegs);
  };

  const copyToClipboard = () => {
    if (successData?.code) {
      navigator.clipboard.writeText(successData.code);
      toast({ title: "Kode disalin!", description: "Kode tim berhasil disalin ke clipboard." });
    }
  };

  if (!isClient) {
    return null;
  }

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
              Tim <strong>{successData.name}</strong> ({successData.type}) berhasil didaftarkan.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-4">
            <div className="bg-background border rounded-xl p-6 text-center space-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                Kode Join Tim (Share Code)
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

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-300 flex gap-3 items-start">
              <div className="bg-blue-200 dark:bg-blue-800 p-1 rounded mt-0.5">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold mb-1">Langkah Selanjutnya:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Bagikan kode <strong>{successData.code}</strong> ini ke Grup WhatsApp atlet Anda.</li>
                  <li>Minta atlet masuk ke menu "Join Team" di akun mereka.</li>
                  <li>Setelah atlet join dan bayar, mereka akan muncul di Dashboard Roster Anda.</li>
                </ol>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button 
              className="w-full h-12 text-lg" 
              onClick={copyToClipboard}
              variant="outline"
            >
              <Copy className="mr-2 h-4 w-4" /> Salin Kode Tim
            </Button>
            <Button className="w-full" asChild>
              <Link href={`/manager/roster/new`}>
                Kelola Roster & Pemain <ArrowRight className="ml-2 h-4 w-4" />
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
          <CardTitle className="text-2xl">Formulir Pendaftaran BCC 2026</CardTitle>
          <CardDescription>
            Silakan pilih tipe kepesertaan Anda: Tim Tunggal atau Komunitas Besar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Identitas Pendaftar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="entityName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Tim / Komunitas</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: PB. Badminton Ceria" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="officialLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domisili / Asal</FormLabel>
                        <FormControl>
                          <Input placeholder="Kecamatan/Kota (Bandung Raya)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Manajer (PIC)</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama Lengkap" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="08xxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-lg font-medium">Tipe Pendaftaran</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(val) => {
                            field.onChange(val);
                            form.setValue("registrations", []);
                          }}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <FormItem>
                            <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                              <FormControl>
                                <RadioGroupItem value="SINGLE_TEAM" className="sr-only" />
                              </FormControl>
                              <div className="items-center rounded-md border-2 border-muted p-4 hover:border-accent cursor-pointer transition-all">
                                <div className="flex justify-between items-center mb-2">
                                  <User className="h-6 w-6 text-primary" />
                                  <div className="space-y-1">
                                    <h4 className="font-semibold text-right">Tim Tunggal</h4>
                                    <p className="text-xs text-muted-foreground text-right">Daftar 1 Skuad Saja</p>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Hanya boleh memilih <strong>satu kategori</strong> (MD/WD/XD).
                                </p>
                              </div>
                            </FormLabel>
                          </FormItem>

                          <FormItem>
                            <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                              <FormControl>
                                <RadioGroupItem value="COMMUNITY" className="sr-only" />
                              </FormControl>
                              <div className="items-center rounded-md border-2 border-muted p-4 hover:border-accent cursor-pointer transition-all">
                                <div className="flex justify-between items-center mb-2">
                                  <Users className="h-6 w-6 text-primary" />
                                  <div className="space-y-1">
                                    <h4 className="font-semibold text-right">Komunitas</h4>
                                    <p className="text-xs text-muted-foreground text-right">Daftar Banyak Tim</p>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Bebas memilih <strong>banyak kategori</strong> dan > 1 tim per kategori.
                                </p>
                              </div>
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border">
                <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Pilih Kategori Pertandingan
                </h3>

                {registrationType === "SINGLE_TEAM" ? (
                  <div className="space-y-4">
                     <p className="text-sm text-muted-foreground mb-4">
                       Pilih <strong>salah satu</strong> kategori:
                     </p>
                     <RadioGroup 
                       onValueChange={(val) => handleSingleCategoryChange(val as any)}
                       className="grid grid-cols-1 md:grid-cols-3 gap-4"
                     >
                       {CATEGORIES.map((cat) => (
                         <div key={cat} className="relative">
                           <RadioGroupItem value={cat} id={`single-${cat}`} className="peer sr-only" />
                           <LabelCard htmlFor={`single-${cat}`} title={getCategoryFullName(cat)} code={cat} />
                         </div>
                       ))}
                     </RadioGroup>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Centang kategori dan tentukan jumlah tim (Unlimited).
                    </p>
                    <div className="space-y-3">
                      {CATEGORIES.map((cat) => {
                        const isSelected = form.watch("registrations").some(r => r.category === cat);
                        const currentQty = form.watch("registrations").find(r => r.category === cat)?.quantity || 1;
                        return (
                          <div key={cat} className="flex items-center justify-between p-3 border rounded-md bg-background">
                            <div className="flex items-center space-x-3">
                              <Checkbox 
                                id={`com-${cat}`}
                                checked={isSelected}
                                onCheckedChange={(checked) => handleCommunityCategoryChange(cat, checked as boolean)}
                              />
                              <label htmlFor={`com-${cat}`} className="text-sm font-medium cursor-pointer">
                                {getCategoryFullName(cat)} ({cat})
                              </label>
                            </div>
                            {isSelected && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">Jml Tim:</span>
                                <Input 
                                  type="number" min={1} className="w-20 h-8"
                                  value={currentQty}
                                  onChange={(e) => handleCommunityQuantityChange(cat, parseInt(e.target.value))}
                                />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
                {form.formState.errors.registrations && (
                   <p className="text-sm text-destructive mt-4 font-medium">
                     * {form.formState.errors.registrations.message || "Pilihan kategori tidak valid."}
                   </p>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-[200px]">
                  {isSubmitting ? "Memproses..." : "Buat Tim & Dapatkan Kode"}
                </Button>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
