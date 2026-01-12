
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

export default function PlayerLoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      
      {/* LEFT: Visual Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 text-white p-12 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('/images/gor-koni.jpg')] bg-cover opacity-20 mix-blend-overlay"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/40 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
         
         <div className="relative z-10">
           <h1 className="font-headline text-4xl">Badmintour Open #1</h1>
         </div>
         <div className="relative z-10">
           <blockquote className="font-headline text-3xl leading-tight max-w-md">
             "THE ONLY WAY TO PROVE THAT YOU’RE A GOOD SPORT IS TO LOSE."
           </blockquote>
           <p className="mt-4 opacity-60 font-mono">— Ernie Banks</p>
         </div>
      </div>

      {/* RIGHT: Login Form */}
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-sm space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="font-headline text-4xl mb-2">WELCOME <span className="text-primary">CHAMP</span></h2>
            <p className="text-muted-foreground">Masuk untuk mengelola jadwal dan turnamen.</p>
          </div>

          <div className="space-y-4">
             <div className="space-y-2">
               <Input 
                 placeholder="Email / Athlete Code" 
                 className="h-14 rounded-2xl bg-secondary/30 border-transparent text-lg px-4"
               />
             </div>
             <div className="space-y-2 relative">
               <Input 
                 type="password" 
                 placeholder="Password" 
                 className="h-14 rounded-2xl bg-secondary/30 border-transparent text-lg px-4"
               />
               <Button variant="ghost" size="sm" className="absolute right-2 top-2 h-10 w-10 rounded-xl">
                 <Lock size={16} className="opacity-50" />
               </Button>
             </div>
             
             <div className="flex justify-end">
               <Link href="#" className="text-xs font-bold text-primary hover:underline">
                 Lupa Password?
               </Link>
             </div>

             <Button className="w-full h-14 rounded-pill font-bold text-lg shadow-xl shadow-primary/20">
               Sign In <ArrowRight className="ml-2" />
             </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-dashed border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground font-bold">Belum punya akun?</span>
            </div>
          </div>

          <Button variant="outline" className="w-full h-14 rounded-pill font-bold border-2">
            Daftar Sekarang
          </Button>

        </div>
      </div>
    </div>
  );
}
