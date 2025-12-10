
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Swords, UserPlus, Trophy, Plus, ArrowRight, XCircle, Info } from "lucide-react";

// Matriks Logika Pasangan
const pairings = [
  { level1: "Beginner", level2: "Beginner", result: "Beginner", color: "text-green-500", valid: true },
  { level1: "Beginner", level2: "Intermediate", result: "Intermediate", color: "text-blue-500", valid: true },
  { level1: "Intermediate", level2: "Intermediate", result: "Intermediate", color: "text-blue-500", valid: true },
  { level1: "Intermediate", level2: "Advance", result: "Advance", color: "text-purple-500", valid: true },
  { level1: "Advance", level2: "Advance", result: "Advance", color: "text-purple-500", valid: true },
  { level1: "Beginner", level2: "Advance", result: "DILARANG", color: "text-destructive", valid: false },
];

export function CategoriesSection() {
  return (
    <section className="bg-secondary py-16 md:py-24 relative overflow-hidden">
       {/* Elemen Dekoratif Background */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
       </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-4">
            Kategori & Aturan Main
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <strong className="text-primary">System:</strong> Peringkat tertinggi dalam pasangan menentukan level kategori akhir.
          </p>
          <div className="mt-4 bg-card p-4 rounded-lg border max-w-3xl mx-auto text-sm text-muted-foreground">
             <strong className="text-foreground">Disclaimer:</strong> Kami menggunakan standar Ganda Putra Umum. Peserta wanita harap menyesuaikan dan mengukur kemampuannya untuk bersaing.
          </div>
        </div>
        
        {/* Pairing Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pairings.map((pair, index) => (
            <Card key={index} className={`bg-card border shadow-sm hover:shadow-lg transition-shadow hover:-translate-y-1 ${!pair.valid ? 'border-destructive/30 bg-destructive/5' : ''}`}>
              <CardContent className="pt-6 flex items-center justify-between text-center gap-1">
                <div className="px-3 py-1 bg-secondary rounded-full text-xs font-semibold truncate">{pair.level1}</div>
                <Plus className="w-4 h-4 text-muted-foreground flex-shrink-0"/>
                <div className="px-3 py-1 bg-secondary rounded-full text-xs font-semibold truncate">{pair.level2}</div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0"/>
                 <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                   {pair.valid ? (
                       <div className={`px-4 py-2 rounded-full text-sm font-bold border-2 truncate ${pair.color.replace('text-', 'border-')} ${pair.color.replace('text-', 'bg-')}/10`}>{pair.result}</div>
                   ) : (
                       <div className={`px-3 py-2 rounded-full text-sm font-bold border-2 flex items-center gap-2 truncate ${pair.color.replace('text-', 'border-')} ${pair.color.replace('text-', 'bg-')}/10`}>
                           <XCircle className="w-4 h-4 shrink-0"/>
                           {pair.result}
                        </div>
                   )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SIMULASI PERTANDINGAN */}
        <div className="mt-16">
            <h3 className="text-2xl font-bold font-headline text-center mb-8">Simulasi Pertandingan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                {/* KASUS A */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary">Kasus A: XD vs MD (Intermediate)</CardTitle>
                        <CardDescription>Ganda Campuran vs Ganda Putra</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="font-bold">Tim 1:</p>
                            <p className="text-muted-foreground">Cowok (Intermediate) + Cewek (Intermediate)</p>
                            <p className="text-xs text-muted-foreground italic mt-1">Catatan: Cewek Int berani diadu drive/smash.</p>
                        </div>
                        <div>
                            <p className="font-bold">Tim 2:</p>
                            <p className="text-muted-foreground">Cowok (Intermediate) + Cowok (Beginner)</p>
                        </div>
                        <div className="bg-secondary/50 p-3 rounded-md">
                           <p className="text-xs text-muted-foreground">Analisa:</p>
                           <p className="text-sm font-semibold">Pertandingan imbang. Cewek (Int) memiliki penempatan bola lebih baik daripada Cowok (Beg).</p>
                        </div>
                    </CardContent>
                </Card>

                {/* KASUS B */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-blue-600">Kasus B: WD vs XD (Beginner)</CardTitle>
                        <CardDescription>Ganda Putri vs Ganda Campuran</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div>
                            <p className="font-bold">Tim 1:</p>
                            <p className="text-muted-foreground">Cewek (Beginner) + Cewek (Beginner)</p>
                             <p className="text-xs text-muted-foreground italic mt-1">Catatan: Ini sangat beresiko jadi "bulan-bulanan" jika level Beginner-nya adalah beginner murni putri.</p>
                        </div>
                        <div>
                            <p className="font-bold">Tim 2:</p>
                            <p className="text-muted-foreground">Cowok (Beginner) + Cewek (Beginner)</p>
                        </div>
                         <div className="bg-secondary/50 p-3 rounded-md">
                           <p className="text-xs text-muted-foreground">Analisa:</p>
                           <p className="text-sm font-semibold">Tim 2 kemungkinan besar menang karena faktor tenaga pria (power).</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
             <div className="mt-8 bg-card p-6 rounded-lg border max-w-4xl mx-auto flex items-start gap-4">
                <Info className="w-8 h-8 text-primary mt-1 shrink-0" />
                <div>
                    <h4 className="font-bold text-foreground">Saran Untuk Peserta Ganda Putri (WD)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                        Sangat disarankan bagi Ganda Putri (WD) untuk tidak mendaftar di kategori open gender, kecuali mereka sangat percaya diri ("Tomboy"/Atlet Pelatda) yang biasa bermain melawan pria.
                    </p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}
