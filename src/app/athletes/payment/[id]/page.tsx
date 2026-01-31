
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  Clock, 
  UploadCloud, 
  CheckCircle2, 
  Copy, 
  QrCode 
} from "lucide-react";
import { useState, useEffect } from "react";

export default function PaymentPage({ params }: { params: { id: string } }) {
  // Simulasi Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      // Logic countdown sederhana
      setTimeLeft(prev => ({ ...prev, seconds: prev.seconds === 0 ? 59 : prev.seconds - 1 }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24 px-6 pt-8">
      {/* Header dengan Timer Urgensi */}
      <div className="mb-8 text-center">
        <Badge variant="outline" className="mb-4 py-1 px-4 rounded-full border-red-500 text-red-500 bg-red-500/10 animate-pulse">
          <Clock className="w-3 h-3 mr-2" />
          Pay before: 24 Dec, 23:59
        </Badge>
        <h1 className="font-headline text-3xl">COMPLETE <span className="text-primary">PAYMENT</span></h1>
        <div className="font-mono text-xl mt-2 font-bold tracking-widest text-muted-foreground">
          {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
        </div>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        
        {/* INVOICE TICKET CARD */}
        <div className="relative bg-card rounded-[2rem] shadow-m3-3 overflow-hidden border-t-8 border-primary">
          <div className="absolute top-0 right-0 p-3 opacity-10 rotate-12">
            <CreditCard size={150} />
          </div>

          <CardHeader className="bg-secondary/30 p-6 border-b border-dashed border-border">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Invoice ID</p>
                <p className="font-mono font-bold text-lg">INV-BCC-8821</p>
              </div>
              <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-none">
                UNPAID
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            {/* Item Details */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Registration Fee (Ganda Putra)</span>
                <span className="font-bold">IDR 300.000</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Admin Fee</span>
                <span>IDR 5.000</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Early Bird Discount</span>
                <span>- IDR 50.000</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-muted-foreground">TOTAL TO PAY</span>
              <span className="text-2xl font-headline text-primary">IDR 255.000</span>
            </div>
          </CardContent>
        </div>

        {/* PAYMENT METHOD SELECTION */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-20 rounded-3xl border-2 hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center gap-2 group">
            <span className="font-bold text-lg group-hover:text-primary">QRIS</span>
            <QrCode className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="outline" className="h-20 rounded-3xl border-2 hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center gap-2 group">
            <span className="font-bold text-lg group-hover:text-primary">Bank Transfer</span>
            <Copy className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>

        {/* VA NUMBER DISPLAY (Jika Bank Transfer dipilih) */}
        <div className="bg-secondary/50 rounded-3xl p-6 flex flex-col items-center text-center space-y-3">
          <p className="text-xs font-bold uppercase text-muted-foreground">Virtual Account (BCA)</p>
          <div className="flex items-center gap-2" onClick={() => alert("Copied!")}>
             <h2 className="font-mono text-3xl font-bold tracking-widest cursor-pointer">8821 0812 3456</h2>
             <Copy className="h-4 w-4 text-primary cursor-pointer" />
          </div>
          <p className="text-[10px] text-muted-foreground">Klik nomor untuk menyalin</p>
        </div>

        {/* UPLOAD PROOF */}
        <div className="space-y-3">
          <Label className="font-bold pl-2">Upload Bukti Pembayaran (Opsional)</Label>
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-2 hover:bg-secondary/30 transition-colors cursor-pointer">
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">Tap to upload receipt image</p>
          </div>
        </div>

        <Button className="w-full h-14 rounded-pill text-lg font-bold shadow-xl shadow-primary/20">
          Konfirmasi Pembayaran
        </Button>

      </div>
    </div>
  );
}
