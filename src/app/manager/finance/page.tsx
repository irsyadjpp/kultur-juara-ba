
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Wallet, CreditCard, Download } from "lucide-react";

export default function FinancePage() {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline text-3xl mb-1">KEUANGAN <span className="text-primary">KLUB</span></h1>
          <p className="text-muted-foreground text-sm">Kelola pembayaran pendaftaran secara kolektif.</p>
        </div>
        <Button variant="outline" className="rounded-pill gap-2 border-2">
           <Download size={16} /> Laporan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* LEFT: LIST TAGIHAN */}
         <Card className="lg:col-span-2 rounded-[2rem] border-none shadow-m3-1">
            <CardContent className="p-6">
               <div className="flex items-center justify-between mb-4 bg-secondary/30 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                     <Checkbox id="select-all" />
                     <label htmlFor="select-all" className="text-sm font-bold cursor-pointer">Pilih Semua (Unpaid)</label>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">3 Pasangan Dipilih</span>
               </div>

               <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                     <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:bg-secondary/10 transition-colors">
                        <Checkbox id={`item-${i}`} defaultChecked={i <= 2} />
                        <div className="flex-1">
                           <div className="flex justify-between">
                              <p className="font-bold">Ahsan / Hendra</p>
                              <p className="font-mono font-bold">IDR 300.000</p>
                           </div>
                           <div className="flex justify-between mt-1">
                              <p className="text-xs text-muted-foreground">Ganda Dewasa Putra • Advance</p>
                              <Badge variant="outline" className="text-[10px] text-orange-600 bg-orange-50 border-orange-200">Pending</Badge>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* RIGHT: CHECKOUT SUMMARY */}
         <div className="space-y-6">
            <Card className="rounded-[2rem] bg-foreground text-background border-none shadow-xl sticky top-24">
               <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6 opacity-80">
                     <Wallet className="h-6 w-6" />
                     <span className="font-headline text-xl">TOTAL PAYMENT</span>
                  </div>

                  <div className="space-y-3 mb-6">
                     <div className="flex justify-between text-sm">
                        <span>Subtotal (2 items)</span>
                        <span>IDR 600.000</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span>Admin Fee</span>
                        <span>IDR 5.000</span>
                     </div>
                     <div className="flex justify-between text-sm text-primary font-bold">
                        <span>Klub Diskon (5%)</span>
                        <span>- IDR 30.000</span>
                     </div>
                     <Separator className="bg-background/20 my-2" />
                     <div className="flex justify-between text-2xl font-mono font-bold">
                        <span>TOTAL</span>
                        <span>575.000</span>
                     </div>
                  </div>

                  <Button className="w-full h-14 rounded-pill bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg shadow-primary/20 mb-3">
                     Bayar Sekarang
                  </Button>
                  <p className="text-[10px] text-center opacity-50">
                     Pembayaran aman via QRIS / Virtual Account
                  </p>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
