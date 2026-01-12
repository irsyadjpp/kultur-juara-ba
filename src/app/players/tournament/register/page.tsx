

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ChevronRight, UserPlus, Trophy } from "lucide-react";

// Tahapan Pendaftaran
const STEPS = [
  { id: 1, title: "Category" },
  { id: 2, title: "Player Data" },
  { id: 3, title: "Confirm" },
];

export default function TournamentRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("beginner");
  const [partnerCode, setPartnerCode] = useState("");

  // Handler Navigasi
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-background pb-24 px-6 pt-8">
      
      {/* HEADER WITH STEPPER */}
      <div className="mb-8">
        <h1 className="font-headline text-2xl mb-6">JOIN <span className="text-primary">TOURNAMENT</span></h1>
        
        {/* Modern Stepper */}
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary -z-10 rounded-full" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-primary -z-10 rounded-full transition-all duration-500" 
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }} 
          />
          
          {STEPS.map((step) => {
            const isActive = step.id <= currentStep;
            return (
              <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2">
                <div 
                  className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive ? "bg-primary border-primary text-white" : "bg-background border-muted text-muted-foreground"
                  }`}
                >
                  {step.id < currentStep ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">{step.id}</span>}
                </div>
                <span className={`text-[10px] font-bold uppercase ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP CONTENT */}
      <div className="space-y-6">
        
        {/* STEP 1: PILIH KATEGORI */}
        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-right-10 duration-500">
            <h2 className="text-lg font-bold mb-4">Pilih Kategori Pertandingan</h2>
              <Label htmlFor="cat-begin" className="cursor-pointer">
                <Card className={`relative p-5 rounded-3xl border-2 transition-all border-primary bg-primary/5`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center bg-primary text-white`}>
                        <Trophy size={18} />
                      </div>
                      <div>
                        <h3 className="font-bold text-base">Tunggal Putra / Putri</h3>
                        <p className="text-xs text-muted-foreground">Beginner Only</p>
                      </div>
                    </div>
                    <RadioGroupItem value="beginner" id="cat-begin" className="data-[state=checked]:border-primary data-[state=checked]:text-primary" checked={true} />
                  </div>
                  <div className="mt-4 flex gap-2">
                     <Badge variant="outline" className="text-[10px] rounded-md">Kuota: 40/64</Badge>
                     <Badge variant="outline" className="text-[10px] rounded-md bg-green-500/10 text-green-600 border-none">IDR 100K/org</Badge>
                  </div>
                </Card>
              </Label>
          </div>
        )}

        {/* STEP 2: PILIH PARTNER */}
        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-right-10 duration-500">
             <h2 className="text-lg font-bold mb-4">Verifikasi Data Pemain</h2>
             
             <div className="bg-card rounded-[2rem] p-6 shadow-m3-1 mb-6">
                <div className="mb-4">
                  <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2 block">Cek Kembali Data Anda</Label>
                   <div className="bg-secondary/30 p-4 rounded-xl border">
                        <p className="font-bold">Irsyad JPP (Anda)</p>
                        <p className="text-xs text-muted-foreground">TPF Level: Beginner</p>
                    </div>
                </div>
             </div>
          </div>
        )}

        {/* STEP 3: KONFIRMASI */}
        {currentStep === 3 && (
          <div className="animate-in fade-in slide-in-from-right-10 duration-500">
            <h2 className="text-lg font-bold mb-4">Cek Kembali Data</h2>
            
            <Card className="rounded-[2rem] overflow-hidden border-none shadow-m3-1">
              <div className="bg-primary/10 p-6 flex flex-col items-center justify-center border-b border-primary/10">
                <Trophy className="h-12 w-12 text-primary mb-2" />
                <h3 className="font-headline text-xl">Badmintour Open #1</h3>
                <Badge className="mt-2 bg-primary">Tunggal Beginner</Badge>
              </div>
              <div className="p-6 space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pemain</span>
                    <span className="font-bold">Irsyad JPP (Anda)</span>
                 </div>
                 <Separator />
                 <div className="flex justify-between items-center text-lg">
                    <span className="font-bold">Total Biaya</span>
                    <span className="font-headline text-primary">IDR 100.000</span>
                 </div>
              </div>
            </Card>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl mt-4 flex gap-3">
               <Circle className="h-2 w-2 fill-yellow-500 text-yellow-500 mt-1.5 shrink-0" />
               <p className="text-xs text-yellow-700 dark:text-yellow-400">
                 Dengan mendaftar, Anda menyetujui aturan fair play dan matriks level yang berlaku. Diskualifikasi dapat terjadi jika data dipalsukan.
               </p>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER ACTIONS */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-md border-t border-border z-50">
        <div className="flex gap-4">
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep} className="flex-1 h-12 rounded-pill font-bold">
              Back
            </Button>
          )}
          <Button onClick={nextStep} className="flex-[2] h-12 rounded-pill bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20">
            {currentStep === 3 ? "Lanjut Pembayaran" : "Next Step"} <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

    </div>
  );
}
