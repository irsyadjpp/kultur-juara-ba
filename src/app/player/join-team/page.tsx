
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Search, CreditCard, Users } from "lucide-react";

// --- Schema Form Join ---
const joinTeamSchema = z.object({
  teamCode: z.string().min(5, "Kode tim minimal 5 karakter"),
  selfLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCE", "3ON3"], {
    required_error: "Pilih estimasi skill level Anda",
  }),
});

export default function PlayerJoinTeamPage() {
  const [step, setStep] = useState<"SEARCH" | "CONFIRM" | "PAYMENT" | "DONE">("SEARCH");
  const [foundTeam, setFoundTeam] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof joinTeamSchema>>({
    resolver: zodResolver(joinTeamSchema),
    defaultValues: {
      teamCode: "",
    },
  });

  // 1. Fungsi Cari Tim
  const handleSearch = async (values: z.infer<typeof joinTeamSchema>) => {
    // Simulasi API Check Code
    if (values.teamCode === "BCC-CERIA-001") {
      setFoundTeam({
        name: "PB. Badminton Ceria - Tim A",
        manager: "Bpk. Manager",
        category: "Beregu Putra (MD)",
        fee: 150000, // Biaya per orang
      });
      setStep("CONFIRM");
    } else {
      form.setError("teamCode", { message: "Kode Tim tidak ditemukan" });
    }
  };

  // 2. Fungsi Lanjut Bayar
  const handleProceedPayment = () => {
    setStep("PAYMENT");
    // Di sini nanti redirect ke Midtrans / Payment Gateway
  };

  // 3. Fungsi Simulasi Bayar Sukses
  const handleSimulatePaymentSuccess = () => {
    setStep("DONE");
    toast({
      title: "Pembayaran Berhasil!",
      description: "Anda telah bergabung ke dalam Pool Pemain tim.",
    });
  };

  return (
    <div className="container mx-auto py-10 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" /> Gabung Tim Beregu
          </CardTitle>
          <CardDescription>
            Masukkan kode unik yang diberikan oleh Manajer Tim Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          
          {/* STEP 1: CARI TIM */}
          {step === "SEARCH" && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="teamCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Tim</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: BCC-XYZ-123" {...field} className="uppercase font-mono" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="selfLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimasi Level Skill</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih level Anda" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="BEGINNER">Beginner (Pemula)</SelectItem>
                          <SelectItem value="INTERMEDIATE">Intermediate (Menengah)</SelectItem>
                          <SelectItem value="ADVANCE">Advance (Lanjut)</SelectItem>
                          <SelectItem value="3ON3">Spesialis 3-on-3</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-[11px] text-muted-foreground">
                        *Manajer tim berhak memindahkan posisi Anda nanti.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  <Search className="mr-2 h-4 w-4" /> Cari Tim
                </Button>
              </form>
            </Form>
          )}

          {/* STEP 2: KONFIRMASI TIM */}
          {step === "CONFIRM" && foundTeam && (
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border">
                <h3 className="font-bold text-lg text-primary">{foundTeam.name}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                  <span className="text-muted-foreground">Manajer:</span>
                  <span>{foundTeam.manager}</span>
                  <span className="text-muted-foreground">Kategori:</span>
                  <span>{foundTeam.category}</span>
                  <span className="text-muted-foreground">Biaya Join:</span>
                  <span className="font-semibold text-green-600">
                    Rp {foundTeam.fee.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep("SEARCH")}>
                  Batal
                </Button>
                <Button className="flex-1" onClick={handleProceedPayment}>
                  Lanjut Pembayaran
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: SIMULASI PEMBAYARAN */}
          {step === "PAYMENT" && (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg">Gateway Pembayaran</h3>
              <p className="text-sm text-muted-foreground">
                (Simulasi) Silakan selesaikan pembayaran sebesar Rp {foundTeam?.fee.toLocaleString("id-ID")}
              </p>
              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" onClick={handleSimulatePaymentSuccess}>
                Bayar Sekarang (Simulasi Lunas)
              </Button>
            </div>
          )}

          {/* STEP 4: SELESAI */}
          {step === "DONE" && (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg">Berhasil Bergabung!</h3>
              <p className="text-sm text-muted-foreground">
                Data Anda sudah masuk ke sistem Manajer. Silakan tunggu Manajer menempatkan Anda ke dalam slot/partai pertandingan.
              </p>
              <Button className="w-full" onClick={() => window.location.href = "/player/dashboard"}>
                Kembali ke Dashboard
              </Button>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
