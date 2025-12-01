"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationFormSchema, type RegistrationFormValues, CATEGORIES } from "@/lib/schemas/registration";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Info, Users, AlertCircle, CheckCircle2, Instagram, Receipt } from "lucide-react";
import { useState, useEffect } from "react";
import confetti from 'canvas-confetti';
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function RegistrationPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<RegistrationFormValues | null>(null);

  // Inisialisasi Form
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      communityName: "",
      managerName: "",
      managerWhatsapp: "",
      managerEmail: "",
      basecamp: "",
      players: [
        { fullName: "", nik: "", motherName: "", ayoId: "", level: undefined, videoUrl: "", participation: [] }
      ], 
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "players",
    control: form.control,
  });

  // --- LOGIC MENGHITUNG TOTAL & KUOTA REAL-TIME ---
  const watchedPlayers = form.watch("players");
  
  const stats: Record<string, number> = {
    "Beregu PUTRA": 0,
    "Beregu PUTRI": 0,
    "Beregu CAMPURAN": 0,
  };

  watchedPlayers?.forEach(p => {
    p.participation?.forEach((cat: any) => {
      if (stats[cat as keyof typeof stats] !== undefined) {
        stats[cat as keyof typeof stats]++;
      }
    });
  });
  
  const activeCategoriesCount = Object.values(stats).filter(count => count > 0).length;
  const potentialBill = activeCategoriesCount * 1000000; 

  // --- END LOGIC ---

  // Efek Confetti
  useEffect(() => {
    if (isSuccess) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [isSuccess]);

  async function onSubmit(data: RegistrationFormValues) {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmittedData(data);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center py-16 px-4 bg-secondary/10">
          <Card className="max-w-2xl w-full shadow-2xl border-t-8 border-t-green-500">
             <CardContent className="pt-10 pb-10 px-8 text-center space-y-8">
                <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto" />
                <div>
                    <h1 className="text-3xl font-black text-green-700">Pendaftaran Komunitas Berhasil!</h1>
                    <p className="text-muted-foreground">
                        Terima kasih <span className="font-bold text-foreground">{submittedData?.communityName}</span>.
                    </p>
                </div>
                <div className="bg-white border rounded-lg p-4 text-left grid grid-cols-1 gap-2">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Total Tim Didaftarkan:</span>
                        <span className="font-bold">{activeCategoriesCount} Tim</span>
                    </div>
                     <div className="flex justify-between pt-2">
                        <span className="text-muted-foreground">Total Pemain:</span>
                        <span className="font-bold">{submittedData?.players.length} Orang</span>
                    </div>
                </div>
                <Button onClick={() => window.location.reload()} variant="outline">Daftar Lagi</Button>
             </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-12 px-4 md:px-8 bg-secondary/10 relative">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
             <div className="space-y-2">
                <h1 className="text-3xl font-black font-headline text-primary">REGISTRASI KOMUNITAS</h1>
                <p className="text-muted-foreground">Satu formulir untuk semua tim Anda.</p>
             </div>

             <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <Card>
                  <CardHeader className="bg-primary/5 border-b pb-4">
                    <CardTitle className="text-lg text-primary font-bold">1. Identitas Komunitas & Manajer</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <FormField
                      control={form.control}
                      name="communityName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Komunitas / PB</FormLabel>
                          <FormControl><Input placeholder="PB Juara Bandung" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="managerName" render={({ field }) => (
                            <FormItem><FormLabel>Nama Manajer</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="managerWhatsapp" render={({ field }) => (
                            <FormItem><FormLabel>WhatsApp</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="managerEmail" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="basecamp" render={({ field }) => (
                        <FormItem><FormLabel>Basecamp Latihan</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-primary/5 border-b pb-4">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg text-primary font-bold">2. Data Pemain</CardTitle>
                        <Badge variant="secondary">{fields.length} Pemain</Badge>
                    </div>
                    <CardDescription>Masukkan semua pemain, lalu centang kategori yang diikuti.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    
                    {fields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg bg-card relative group">
                        <div className="absolute top-4 right-4">
                            <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => remove(index)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        
                        <h4 className="font-bold mb-4 text-sm text-muted-foreground">Pemain #{index + 1}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                             <FormField control={form.control} name={`players.${index}.fullName`} render={({ field }) => (
                                <FormItem><FormLabel>Nama Lengkap</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                             )} />
                             <FormField control={form.control} name={`players.${index}.nik`} render={({ field }) => (
                                <FormItem><FormLabel>NIK</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                             )} />
                              <FormField control={form.control} name={`players.${index}.motherName`} render={({ field }) => (
                                <FormItem><FormLabel>Nama Ibu Kandung</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                             )} />
                             <FormField control={form.control} name={`players.${index}.ayoId`} render={({ field }) => (
                                <FormItem><FormLabel>Akun Ayo Indonesia</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                             )} />
                             <FormField control={form.control} name={`players.${index}.level`} render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Level</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                      <SelectItem value="Beginner">Beginner</SelectItem>
                                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                                      <SelectItem value="Advance">Advance</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                             )} />
                        </div>
                        
                        <FormField control={form.control} name={`players.${index}.videoUrl`} render={({ field }) => (
                            <FormItem className="mb-4"><FormLabel>Link Video (YouTube)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                        <FormField
                            control={form.control}
                            name={`players.${index}.participation`}
                            render={() => (
                                <FormItem>
                                    <div className="mb-2 font-medium text-sm">Ikut Kategori:</div>
                                    <div className="flex flex-wrap gap-4">
                                        {CATEGORIES.map((cat) => (
                                            <FormField
                                                key={cat}
                                                control={form.control}
                                                name={`players.${index}.participation`}
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={cat}
                                                            className="flex flex-row items-start space-x-2 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(cat)}
                                                                    onCheckedChange={(checked) => {
                                                                        const newValue = checked
                                                                            ? [...(field.value || []), cat]
                                                                            : (field.value || []).filter(
                                                                                (value) => value !== cat
                                                                            );
                                                                        field.onChange(newValue);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal cursor-pointer">
                                                                {cat.replace('Beregu ', '')}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full py-6 border-dashed"
                      onClick={() => append({ fullName: "", nik: "", motherName: "", ayoId: "", level: undefined as any, videoUrl: "", participation: [] })}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Tambah Pemain
                    </Button>
                    
                    {form.formState.errors.players?.root && (
                         <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md font-medium flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {form.formState.errors.players.root.message}
                         </div>
                    )}
                     {form.formState.errors.players && !form.formState.errors.players.root && (
                         <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md font-medium flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Pastikan semua data pemain terisi dengan benar.
                         </div>
                    )}


                  </CardContent>
                </Card>

                 <Card>
                    <CardHeader className="bg-primary/5 border-b pb-4"><CardTitle className="text-lg text-primary font-bold">3. Pembayaran & Legal</CardTitle></CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <FormField control={form.control} name="transferProof" render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                                <FormLabel>Upload Bukti Transfer (Estimasi: Rp {potentialBill.toLocaleString('id-ID')})</FormLabel>
                                <FormControl><Input {...fieldProps} type="file" accept="image/*,application/pdf" onChange={(e) => onChange(e.target.files)} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="agreementValidData" render={({ field }) => (
                            <FormItem className="flex gap-2 items-center space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel className="font-normal text-sm">Saya menyatakan data benar.</FormLabel></FormItem>
                        )} />
                         <FormField control={form.control} name="agreementWaiver" render={({ field }) => (
                            <FormItem className="flex gap-2 items-center space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel className="font-normal text-sm">Setuju Waiver of Liability.</FormLabel></FormItem>
                        )} />
                         <FormField control={form.control} name="agreementTpf" render={({ field }) => (
                            <FormItem className="flex gap-2 items-center space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel className="font-normal text-sm">Setuju Keputusan TPF.</FormLabel></FormItem>
                        )} />
                         <FormField control={form.control} name="agreementRules" render={({ field }) => (
                            <FormItem className="flex gap-2 items-center space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel className="font-normal text-sm">Paham Aturan Main.</FormLabel></FormItem>
                        )} />
                        {(form.formState.errors.agreementValidData || form.formState.errors.agreementWaiver || form.formState.errors.agreementTpf || form.formState.errors.agreementRules) && (
                            <p className="text-sm font-medium text-destructive">Anda harus menyetujui semua pernyataan legal.</p>
                        )}
                    </CardContent>
                 </Card>

                 <div className="block lg:hidden">
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Mengirim..." : "KIRIM PENDAFTARAN"}
                    </Button>
                 </div>

              </form>
             </Form>
          </div>

          <div className="hidden lg:block lg:col-span-1">
             <div className="sticky top-24 space-y-6">
                <Card className="border-2 border-primary/20 bg-primary/5 shadow-lg">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            Status Tim
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Object.entries(stats).map(([key, val]) => (
                            <div key={key} className="space-y-1">
                                <div className="flex justify-between text-sm font-medium">
                                    <span>{key.replace('Beregu ', '')}</span>
                                    <span className={val > 0 && val < 10 ? 'text-destructive' : val >= 10 ? 'text-green-600' : 'text-muted-foreground'}>
                                        {val}/14
                                    </span>
                                </div>
                                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full transition-all ${val > 0 && val < 10 ? 'bg-destructive' : val >= 10 ? 'bg-green-500' : 'bg-transparent'}`} 
                                        style={{ width: `${Math.min((val / 14) * 100, 100)}%` }} 
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {val === 0 ? 'Tidak ikut' : val < 10 ? `Kurang ${10 - val} pemain` : val > 14 ? 'Kelebihan pemain' : 'Kuota Terpenuhi'}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="flex-col items-start pt-4 border-t">
                        <div className="w-full flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Receipt className="w-4 h-4" />
                                <span className="text-sm">Estimasi Total</span>
                            </div>
                            <span className="text-xl font-black text-primary">
                                Rp {potentialBill.toLocaleString('id-ID')}
                            </span>
                        </div>
                        <Button 
                            onClick={form.handleSubmit(onSubmit)} 
                            className="w-full font-bold shadow-md hover:shadow-lg transition-all" 
                            size="lg"
                            disabled={isSubmitting}
                        >
                             {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "KIRIM PENDAFTARAN"}
                        </Button>
                    </CardFooter>
                </Card>

                <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-800 border border-blue-100">
                    <p className="font-bold mb-1 flex items-center gap-1"><Info className="w-3 h-3"/> Info:</p>
                    Satu pemain boleh dicentang di lebih dari satu kategori (misal: Putra & Campuran) dan tetap dihitung sebagai satu data entri, namun berkontribusi ke kuota kedua tim.
                </div>
             </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}