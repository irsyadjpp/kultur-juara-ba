
'use client';

import Link from "next/link";
import { ArrowRight, LogIn, Shield, User, Mail, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950">
      
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 rounded-[32px] p-8 shadow-2xl">
        <header className="text-center space-y-3 mb-8">
            <LogIn className="w-10 h-10 text-indigo-500 mx-auto" />
            <h1 className="text-3xl font-black text-white">Login Portal</h1>
            <p className="text-zinc-400 text-sm">Masuk untuk akses dashboard Anda.</p>
        </header>

        <div className="space-y-4">
            
            {/* GOOGLE LOGIN BUTTON (SIMULATED) */}
            <Link href="/player/dashboard" passHref>
                <Button className="w-full h-14 rounded-xl bg-white text-black hover:bg-zinc-200 shadow-lg font-bold text-lg flex items-center justify-center transition-transform hover:scale-[1.01]">
                    <img src="/logos/google-logo.svg" alt="Google" className="w-6 h-6 mr-3" /> 
                    Sign in with Google (Athlete)
                </Button>
            </Link>

            {/* ADMIN LOGIN (SIMULATED DIVERGENCE) */}
            <Link href="/admin/login" passHref>
                <Button variant="outline" className="w-full h-14 rounded-xl bg-zinc-800 text-cyan-400 border-cyan-800 hover:bg-zinc-700 shadow-lg font-bold text-sm flex items-center justify-center transition-transform">
                    <Shield className="w-5 h-5 mr-3"/> Login Panitia / Official
                </Button>
            </Link>


            <div className="flex items-center space-x-2 text-zinc-600 pt-4">
                <Separator className="flex-1 bg-zinc-800"/>
                <span className="text-xs">Secure Access</span>
                <Separator className="flex-1 bg-zinc-800"/>
            </div>

            <p className="text-center text-zinc-500 text-xs pt-4">
                Anda akan diarahkan ke halaman pengisian data setelah berhasil login.
            </p>
        </div>
      </Card>
    </div>
  );
}
