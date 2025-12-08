'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, User, Lock } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Simulasi Server Action (bisa disatukan di src/app/player/actions.ts)
const loginPlayer = async (formData: FormData) => {
  await new Promise(r => setTimeout(r, 1000));
  // Di real app, validasi email/password ke DB
  return { success: true }; 
};

export default function PlayerLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const res = await loginPlayer(formData);
    
    if (res.success) {
      // Simpan session dummy
      sessionStorage.setItem('player_session', JSON.stringify({ email: formData.get('email'), name: 'Player' }));
      toast({ title: "Login Berhasil", description: "Selamat datang kembali!" });
      router.push('/player/dashboard');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/net-pattern.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-white relative z-10 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-700">
             <User className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-black font-headline uppercase">Login Atlet</CardTitle>
          <CardDescription>Masuk untuk cek jadwal tanding & statistik.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label>Email</Label>
                <Input name="email" type="email" placeholder="nama@email.com" className="bg-black border-zinc-700 text-white" required />
            </div>
            <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                    <Input name="password" type="password" placeholder="••••••••" className="bg-black border-zinc-700 text-white pr-10" required />
                    <Lock className="absolute right-3 top-3 w-4 h-4 text-zinc-500" />
                </div>
            </div>
            
            <Button type="submit" className="w-full h-12 font-bold text-lg" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin"/> : "MASUK SEKARANG"}
            </Button>

            <div className="pt-4 text-center text-sm text-zinc-500 border-t border-zinc-800 mt-4">
                Belum punya akun atlet? <br/>
                <Link href="/player/register" className="text-primary font-bold hover:underline">Daftar di sini</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
