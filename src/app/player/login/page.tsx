
'use client';

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginPlayerManual, loginPlayerGoogle } from "../actions";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function GoogleLoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full h-14 rounded-xl bg-white text-black hover:bg-zinc-200 shadow-lg font-bold text-lg flex items-center justify-center transition-transform hover:scale-[1.01]"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          <img src="/logos/google-logo.svg" alt="Google" className="w-6 h-6 mr-3" />
          Lanjutkan dengan Google
        </>
      )}
    </Button>
  );
}

function ManualLoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full h-12 bg-transparent border border-zinc-700 hover:bg-zinc-800 text-white font-bold rounded-lg transition-all"
      disabled={pending}
    >
      {pending ? <Loader2 className="animate-spin" /> : "Masuk dengan Email"}
    </Button>
  );
}

export default function PlayerLoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [googleState, googleAction] = useActionState(loginPlayerGoogle, { success: false });
  const [manualState, manualAction] = useActionState(loginPlayerManual, { success: false, message: '' });

  useEffect(() => {
    if (googleState.success) {
      toast({ title: "Login Berhasil!", description: "Selamat datang kembali, Juara!", className: "bg-green-600 text-white" });
      router.push('/player/dashboard');
      router.refresh();
    }
  }, [googleState, router, toast]);

  useEffect(() => {
    if (manualState.success) {
      toast({ title: "Login Berhasil!", description: "Selamat datang kembali!", className: "bg-green-600 text-white" });
      router.push('/player/dashboard');
    } else if (manualState.message) {
      toast({ title: "Login Gagal", description: manualState.message, variant: "destructive" });
    }
  }, [manualState, router, toast]);


  return (
    <div className="min-h-screen w-full flex bg-black text-white overflow-hidden">
      
      {/* --- BAGIAN KIRI: VISUAL & BRANDING --- */}
      <div className="hidden lg:flex w-[60%] relative flex-col justify-between p-12 bg-zinc-900">
        
        <div className="absolute inset-0 z-0">
            <Image 
                src="/images/gor-koni.jpg" 
                alt="Court" 
                fill 
                className="object-cover opacity-40 grayscale mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10">
             <div className="flex items-center gap-3 mb-2">
                <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
                <span className="font-bold text-xl tracking-widest uppercase text-white/80">BCC 2026</span>
             </div>
        </div>

        <div className="relative z-10 max-w-xl">
            <h1 className="text-6xl font-black font-headline leading-[0.9] mb-6 tracking-tighter">
                FOCUS ON <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">THE GAME.</span>
            </h1>
            <p className="text-lg text-zinc-400 font-medium leading-relaxed">
                Biarkan sistem kami mengurus administrasi. Anda cukup fokus berlatih dan memenangkan pertandingan.
            </p>
        </div>

        <div className="relative z-10 flex gap-6 text-sm text-zinc-500 font-mono">
            <span>© 2026 BCC Dev Team</span>
            <span>v2.0.1 (Beta)</span>
        </div>
      </div>

      {/* --- BAGIAN KANAN: FORM LOGIN --- */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none" />

         <div className="w-full max-w-md space-y-8 relative z-10">
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-black font-headline mb-2">Welcome Back, Champ!</h2>
                <p className="text-zinc-400">Masuk untuk mengakses dashboard atlet.</p>
            </div>

            <div className="space-y-4">
                <form action={googleAction}>
                    <GoogleLoginButton />
                </form>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-zinc-800"></div>
                    <span className="flex-shrink-0 mx-4 text-xs text-zinc-500 uppercase font-bold tracking-wider">Atau Manual</span>
                    <div className="flex-grow border-t border-zinc-800"></div>
                </div>

                <form action={manualAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                            <Input 
                                name="email" 
                                type="email" 
                                placeholder="atlet@email.com" 
                                className="pl-10 bg-zinc-900 border-zinc-800 text-white h-12 rounded-lg focus:ring-primary focus:border-primary transition-all placeholder:text-zinc-600" 
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Password</Label>
                            <Link href="#" className="text-xs text-primary hover:underline">Lupa Password?</Link>
                        </div>
                        <Input 
                            name="password" 
                            type="password" 
                            placeholder="••••••••"
                            className="bg-zinc-900 border-zinc-800 text-white h-12 rounded-lg focus:ring-primary focus:border-primary transition-all placeholder:text-zinc-600" 
                            required
                        />
                    </div>
                    <ManualLoginButton />
                </form>
            </div>

            <p className="text-center text-sm text-zinc-500 pt-6">
                Belum punya akun? <Link href="/player/register" className="text-primary font-bold hover:underline">Daftar sebagai Atlet</Link>
            </p>
         </div>
      </div>
    </div>
  );
}
