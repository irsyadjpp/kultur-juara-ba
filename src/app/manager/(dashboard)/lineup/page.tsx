'use client';

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lineupSchema, type LineupFormValues } from "@/lib/schemas/lineup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Save, Printer, Calendar, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// DEFINISI PARTAI PER KATEGORI (Sesuai Handbook)
const MATCH_STRUCTURE = {
  "Beregu PUTRA": [
    "1. Ganda Beginner 1",
    "2. Ganda Intermediate 1",
    "3. Ganda Advance",
    "4. Ganda Intermediate 2",
    "5. Ganda Beginner 2"
  ],
  "Beregu PUTRI": [
    "1. Ganda Beginner 1",
    "2. Ganda Intermediate 1",
    "3. Ganda Beginner 2",
    "4. Ganda Intermediate 2",
    "5. TRIPLES (3-on-3) Open"
  ],
  "Beregu CAMPURAN": [
    "1. Ganda Campuran (XD) Beginner",
    "2. Ganda Putra (MD) Beginner",
    "3. Ganda Putri (WD) Intermediate",
    "4. Ganda Putra (MD) Intermediate",
    "5. Ganda Campuran (XD) Advance"
  ]
};

export default function LineupPage() {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  const form = useForm<LineupFormValues>({
    resolver: zodResolver(lineupSchema),
    defaultValues: {
      category: "Beregu PUTRA", // Default
      round: "Penyisihan Grup",
      date: "",
      court: "",
      time: "",
      opponent: "",
      matches: MATCH_STRUCTURE["Beregu PUTRA"].map(label => ({ matchLabel: label, player1: "", player2: "", player3: "" })),
      managerSign: false
    },
  });

  const { fields, replace } = useFieldArray({
    name: "matches",
    control: form.control,
  });

  // Effect: Ganti label partai saat kategori berubah
  const selectedCategory = form.watch("category");
  useEffect(() => {
    if (selectedCategory) {
      const structure = MATCH_STRUCTURE[selectedCategory as keyof typeof MATCH_STRUCTURE];
      const currentValues = form.getValues().matches;
      
      // Reset field matches dengan label baru, tapi coba pertahankan nama jika user hanya iseng ganti kategori
      const newMatches = structure.map((label, idx) => ({
        matchLabel: label,
        player1: currentValues[idx]?.player1 || "",
        player2: currentValues[idx]?.player2 || "",
        player3: currentValues[idx]?.player3 || ""
      }));
      
      replace(newMatches);
    }
  }, [selectedCategory, replace, form]);

  const onSubmit = (data: LineupFormValues) => {
    console.log("Lineup Submitted:", data);
    toast({
      title: "Line-Up Disimpan!",
      description: "Silakan cetak formulir untuk diserahkan ke MLO.",
      className: "bg-green-600 text-white"
    });
    setIsSaved(true);
  };

  // Fungsi Cetak (Window Print)
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center print:hidden">
        <div>
            <h1 className="text-3xl font-bold font-headline">Susunan Pemain (Line-Up)</h1>
            <p className="text-muted-foreground">Isi form ini minimal 30 menit sebelum jam pertandingan.</p>
        </div>
        {isSaved && (
            <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
                <Printer className="w-4 h-4 mr-2" /> Cetak Form
            </Button>
        )}
      </div>

      {/* FORM INPUT (Akan disembunyikan saat Print) */}
      <div className="print:hidden">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* INFO PERTANDINGAN */}
                <Card>
                    <CardHeader><CardTitle>Informasi Pertandingan</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="category" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategori</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Beregu PUTRA">Beregu PUTRA</SelectItem>
                                        <SelectItem value="Beregu PUTRI">Beregu PUTRI</SelectItem>
                                        <SelectItem value="Beregu CAMPURAN">Beregu CAMPURAN</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        
                        <FormField control={form.control} name="round" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Babak</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Penyisihan Grup">Penyisihan Grup</SelectItem>
                                        <SelectItem value="Gugur (Knockout)">Gugur (Knockout)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="grid grid-cols-3 gap-4 col-span-1 md:col-span-2">
                             <FormField control={form.control} name="date" render={({ field }) => (
                                <FormItem><FormLabel>Tanggal</FormLabel><FormControl><div className="flex items-center"><Calendar className="w-4 h-4 mr-2 opacity-50"/><Input type="date" {...field} /></div></FormControl><FormMessage /></FormItem>
                             )} />
                             <FormField control={form.control} name="time" render={({ field }) => (
                                <FormItem><FormLabel>Jam</FormLabel><FormControl><div className="flex items-center"><Clock className="w-4 h-4 mr-2 opacity-50"/><Input type="time" {...field} /></div></FormControl><FormMessage /></FormItem>
                             )} />
                             <FormField control={form.control} name="court" render={({ field }) => (
                                <FormItem><FormLabel>Lapangan</FormLabel><FormControl><div className="flex items-center"><MapPin className="w-4 h-4 mr-2 opacity-50"/><Input placeholder="Cth: 1" {...field} /></div></FormControl><FormMessage /></FormItem>
                             )} />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                             <FormField control={form.control} name="opponent" render={({ field }) => (
                                <FormItem><FormLabel>Lawan (Nama Tim)</FormLabel><FormControl><Input placeholder="Nama tim musuh..." {...field} /></FormControl><FormMessage /></FormItem>
                             )} />
                        </div>
                    </CardContent>
                </Card>

                {/* DAFTAR PEMAIN */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pemain</CardTitle>
                        <CardDescription>Pastikan nama sesuai dengan KTP/Akun Ayo Indonesia.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {fields.map((field, index) => (
                            <div key={field.id} className="p-4 border rounded-lg bg-secondary/10">
                                <div className="mb-3 font-bold text-primary flex items-center gap-2">
                                    <Users className="w-4 h-4" /> {field.matchLabel}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField control={form.control} name={`matches.${index}.player1`} render={({ field }) => (
                                        <FormItem><FormControl><Input placeholder="Nama Pemain 1" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name={`matches.${index}.player2`} render={({ field }) => (
                                        <FormItem><FormControl><Input placeholder="Nama Pemain 2" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    
                                    {/* Field Khusus 3-on-3 (Hanya muncul di Partai ke-5 Kategori Putri) */}
                                    {selectedCategory === 'Beregu PUTRI' && index === 4 && (
                                        <FormField control={form.control} name={`matches.${index}.player3`} render={({ field }) => (
                                            <FormItem className="md:col-span-2"><FormControl><Input placeholder="Nama Pemain 3 (Triples)" className="border-pink-300 focus:ring-pink-200" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* PERNYATAAN */}
                <Card>
                    <CardContent className="pt-6">
                        <FormField control={form.control} name="managerSign" render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Saya menyatakan pemain dalam kondisi sehat, level sesuai verifikasi TPF, dan tidak ada rangkap (kecuali aturan khusus Putri).
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )} />
                        <Button type="submit" className="w-full mt-6 font-bold text-lg h-12" disabled={isSaved}>
                            {isSaved ? "Tersimpan" : "Simpan Line-Up"}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Form>
      </div>

      {/* --- LAYOUT CETAK (Hanya muncul saat Print) --- */}
      <div className="hidden print:block bg-white text-black p-0 font-serif">
         <div className="text-center border-b-2 border-black pb-2 mb-4">
            <h1 className="font-bold text-xl uppercase">FORMULIR SUSUNAN PEMAIN (LINE-UP)</h1>
            <h2 className="font-bold text-lg">BANDUNG COMMUNITY CHAMPIONSHIP (BCC) 2026</h2>
         </div>

         <div className="mb-4 text-sm">
             <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                 <div><strong>Kategori:</strong> {form.getValues("category")}</div>
                 <div><strong>Babak:</strong> {form.getValues("round")}</div>
                 <div><strong>Tanggal:</strong> {form.getValues("date")}</div>
                 <div><strong>Lapangan:</strong> {form.getValues("court")} / {form.getValues("time")}</div>
             </div>
             <div className="mt-4 border p-2 font-bold text-lg flex justify-between">
                 <span>TIM KAMI: {form.getValues("opponent") ? "...................." : "...................."}</span>
                 <span>LAWAN: {form.getValues("opponent")}</span>
             </div>
         </div>

         <table className="w-full border-collapse border border-black text-sm mb-6">
             <thead>
                 <tr className="bg-gray-200">
                     <th className="border border-black p-2 w-10">KE</th>
                     <th className="border border-black p-2">KATEGORI / LEVEL</th>
                     <th className="border border-black p-2">NAMA PEMAIN</th>
                     <th className="border border-black p-2 w-16">ID AYO</th>
                 </tr>
             </thead>
             <tbody>
                 {form.getValues("matches").map((m, idx) => (
                     <tr key={idx}>
                         <td className="border border-black p-2 text-center font-bold">{idx + 1}</td>
                         <td className="border border-black p-2 font-bold">{m.matchLabel}</td>
                         <td className="border border-black p-2">
                             <div className="mb-1">1. {m.player1}</div>
                             <div>2. {m.player2}</div>
                             {m.player3 && <div className="mt-1">3. {m.player3}</div>}
                         </td>
                         <td className="border border-black p-2 text-center">[ ]</td>
                     </tr>
                 ))}
             </tbody>
         </table>

         <div className="text-sm mt-8 flex justify-between">
             <div className="w-1/2">
                 <p><strong>Catatan:</strong></p>
                 <ul className="list-disc pl-4 text-xs mt-1">
                     <li>Wajib diisi lengkap sesuai nama KTP/Ayo.</li>
                     <li>Serahkan ke MLO 30 menit sebelum jadwal.</li>
                 </ul>
             </div>
             <div className="w-1/3 text-center">
                 <p>Bandung, ..............................</p>
                 <p className="mb-16">Manajer Tim,</p>
                 <p className="font-bold underline">( ........................................ )</p>
             </div>
         </div>
      </div>

    </div>
  );
}
