
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, User, ShieldCheck } from "lucide-react";

export default function RegisterTeamPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inisialisasi Form
  const form = useForm<TeamRegistrationFormValues>({
    resolver: zodResolver(teamRegistrationSchema),
    defaultValues: {
      entityName: "",
      officialLocation: "",
      contactPerson: "",
      phoneNumber: "",
      type: "SINGLE_TEAM", // Default ke Tim Tunggal
      registrations: [],
    },
  });

  // Watch tipe pendaftaran untuk conditional rendering
  const registrationType = form.watch("type");

  useEffect(() => {
      // Reset categories when registration type changes
      form.setValue("registrations", []);
  }, [registrationType, form]);

  async function onSubmit(data: TeamRegistrationFormValues) {
    setIsSubmitting(true);
    try {
      // TODO: Panggil Server Action di sini (misal: registerTeamAction(data))
      console.log("Data Submitted:", data);
      
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Pendaftaran Berhasil",
        description: `Berhasil mendaftar sebagai ${ data.type === 'SINGLE_TEAM' ? 'Tim' : 'Komunitas' } `,
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal melakukan pendaftaran.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Helper untuk mengubah registration pada mode Single Team
  const handleSingleCategoryChange = (category: "MD" | "WD" | "XD") => {
    form.setValue("registrations", [{ category, quantity: 1 }]);
  };

  // Helper untuk mengubah registration pada mode Community
  const handleCommunityCategoryChange = (
    category: "MD" | "WD" | "XD", 
    checked: boolean
  ) => {
    const currentRegs = form.getValues("registrations");
    if (checked) {
      // Tambah kategori dengan default qty 1
      form.setValue("registrations", [...currentRegs, { category, quantity: 1 }]);
    } else {
      // Hapus kategori
      form.setValue(
        "registrations",
        currentRegs.filter((r) => r.category !== category)
      );
    }
  };

  const handleCommunityQuantityChange = (
    category: "MD" | "WD" | "XD", 
    qty: number
  ) => {
    const currentRegs = form.getValues("registrations");
    const updatedRegs = currentRegs.map((r) => 
      r.category === category ? { ...r, quantity: qty } : r
    );
    form.setValue("registrations", updatedRegs);
  };

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
              
              {/* Bagian 1: Identitas */}
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

              {/* Bagian 2: Tipe Kepesertaan */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-lg font-medium">Tipe Pendaftaran</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          {/* Opsi SINGLE TEAM */}
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
                                    <p className="text-xs text-muted-foreground text-right">
                                      Daftar 1 Skuad Saja
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Hanya boleh memilih <strong>satu kategori</strong> (MD/WD/XD). Tidak boleh merangkap kategori lain.
                                </p>
                              </div>
                            </FormLabel>
                          </FormItem>

                          {/* Opsi COMMUNITY */}
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
                                    <p className="text-xs text-muted-foreground text-right">
                                      Daftar Banyak Tim
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Bebas memilih <strong>banyak kategori</strong> dan mendaftarkan <strong>lebih dari 1 tim</strong> per kategori.
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

              {/* Bagian 3: Pemilihan Kategori (Kondisional) */}
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border">
                <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Pilih Kategori Pertandingan
                </h3>

                {registrationType === "SINGLE_TEAM" ? (
                  /* Logic UI untuk SINGLE TEAM (Radio Selection) */
                  <div className="space-y-4">
                     <p className="text-sm text-muted-foreground mb-4">
                       Karena Anda mendaftar sebagai Tim Tunggal, silakan pilih <strong>salah satu</strong> kategori di bawah ini:
                     </p>
                     <RadioGroup 
                       onValueChange={(val) => handleSingleCategoryChange(val as any)}
                       className="grid grid-cols-1 md:grid-cols-3 gap-4"
                     >
                       {CATEGORIES.map((cat) => (
                         <div key={cat} className="relative">
                           <RadioGroupItem 
                             value={cat} 
                             id={`single-${cat}`} 
                             className="peer sr-only" 
                           />
                           <LabelCard 
                             htmlFor={`single-${cat}`} 
                             title={getCategoryFullName(cat)} 
                             code={cat}
                           />
                         </div>
                       ))}
                     </RadioGroup>
                     {form.formState.errors.registrations && (
                        <p className="text-sm text-destructive mt-2">
                          {form.formState.errors.registrations.message || "Wajib memilih satu kategori."}
                        </p>
                      )}
                  </div>
                ) : (
                  /* Logic UI untuk COMMUNITY (Checkbox + Quantity Input) */
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Silakan centang kategori yang diikuti dan tentukan jumlah tim per kategori (Unlimited).
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
                              <label htmlFor={`com-${cat}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                {getCategoryFullName(cat)} ({cat})
                              </label>
                            </div>
                            
                            {isSelected && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">Jml Tim:</span>
                                <Input 
                                  type="number" 
                                  min={1} 
                                  className="w-20 h-8"
                                  value={currentQty}
                                  onChange={(e) => handleCommunityQuantityChange(cat, parseInt(e.target.value))}
                                />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                     {form.formState.errors.registrations && (
                        <p className="text-sm text-destructive mt-2">
                          {form.formState.errors.registrations.message}
                        </p>
                      )}
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Memproses..." : "Daftarkan Sekarang"}
                </Button>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

// Komponen Helper Kecil untuk Tampilan Card Radio
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
