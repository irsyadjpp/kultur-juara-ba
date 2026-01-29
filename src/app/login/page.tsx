
'use client';

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Loader2 } from "lucide-react";
import { loginByCode, unifiedGoogleLogin } from "../actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Masuk dengan PIN"}
    </Button>
  );
}

export default function UnifiedLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const [state, formAction] = useActionState(loginByCode, { success: false, message: '', redirectUrl: '' });

  useEffect(() => {
    if (state.success && state.redirectUrl) {
      const sessionData = { isLoggedIn: true, ...state }; // A bit of a hack to get user data for session
      sessionStorage.setItem('kultur_juara_session', JSON.stringify(sessionData));
      toast({ title: "Login Berhasil", description: "Mengalihkan ke dashboard...", className: "bg-green-600 text-white" });
      router.push(state.redirectUrl); 
      router.refresh();
    }
    if (state.message && !state.success) {
       toast({ title: "Gagal", description: state.message, variant: "destructive" });
    }
  }, [state, router, toast]);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    const res = await unifiedGoogleLogin();
    if(res.success){
        const sessionData = {
            ...res.user,
            isLoggedIn: true
        };
        sessionStorage.setItem('kultur_juara_session', JSON.stringify(sessionData));

        toast({ title: "Google Login Berhasil", description: "Selamat datang!", className: "bg-green-600 text-white" });
        router.push(res.redirectUrl || '/admin/dashboard');
        router.refresh();
    } else {
        setIsGoogleLoading(false);
        toast({ title: "Gagal", description: (res as any).message || "Gagal login dengan Google.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-black text-white overflow-hidden">
      
      <div className="hidden lg:flex w-[60%] relative flex-col justify-between p-12 bg-zinc-900">
        
        <div className="absolute inset-0 z-0">
            <Image 
                src="https://images.unsplash.com/photo-1579487784860-e4d42c385f09?q=80&w=1974&auto=format&fit=crop" 
                alt="Academy" 
                fill 
                className="object-cover opacity-30 grayscale mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay"></div>
        </div>

        <Link href="/" className="relative z-10">
             <div className="flex items-center gap-3 mb-2">
                <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
                <span className="font-bold text-lg tracking-widest uppercase text-white/80">Kultur Juara PWN Indonesia</span>
             </div>
        </Link>

        <div className="relative z-10 max-w-xl">
            <h1 className="text-6xl font-black font-headline leading-[0.9] mb-6 tracking-tighter">
                PUSAT KENDALI.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">SATU GENGGAMAN.</span>
            </h1>
            <p className="text-lg text-zinc-400 font-medium leading-relaxed">
                Selamat datang di Portal Kultur Juara PWN Indonesia. Pusat komando untuk mengelola seluruh aspek akademi, dari pendaftaran atlet hingga evaluasi latihan.
            </p>
        </div>

        <div className="relative z-10 flex gap-6 text-sm text-zinc-500 font-mono">
            <span>© {new Date().getFullYear()} Kultur Juara PWN Indonesia</span>
            <span>v1.0.0 (Beta)</span>
        </div>
      </div>

      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-600/10 blur-[100px] pointer-events-none" />

         <div className="w-full max-w-md space-y-8 relative z-10">
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-black font-headline mb-2">Portal Login</h2>
                <p className="text-zinc-400">Masuk untuk mengakses dasbor Anda.</p>
            </div>

            <Tabs defaultValue="google" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
                  <TabsTrigger value="google">Akun Google</TabsTrigger>
                  <TabsTrigger value="pin">Kode PIN</TabsTrigger>
              </TabsList>

               <TabsContent value="google" className="space-y-4">
                  <div className="text-center py-6 px-4 border border-zinc-800 rounded-lg bg-black/50">
                      <p className="text-sm text-zinc-400 mb-6">
                          Gunakan akun Google resmi yang terdaftar untuk akses penuh sebagai pelatih atau admin.
                      </p>
                      <button
                          onClick={handleGoogleLogin}
                          disabled={isGoogleLoading}
                          className="w-full h-12 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-3 transition-transform active:scale-95 hover:bg-gray-100 disabled:opacity-70"
                      >
                          {isGoogleLoading ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                              <>
                                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                  </svg>
                                  <span>Masuk dengan Google</span>
                              </>
                          )}
                      </button>
                  </div>
              </TabsContent>

              <TabsContent value="pin">
                  <form action={formAction} className="space-y-6">
                      <div className="space-y-2 text-center">
                          <Label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">Masukkan Kode Akses Staf</Label>
                          <Input 
                            name="code" 
                            type="password"
                            maxLength={6}
                            placeholder="••••••"
                            className="text-center text-4xl tracking-[0.5em] bg-zinc-900 border-zinc-800 text-white h-20 rounded-lg focus:ring-primary focus:border-primary font-mono"
                            required 
                          />
                      </div>
                      <SubmitButton />
                  </form>
              </TabsContent>
            </Tabs>
         </div>
      </div>
    </div>
  );
}
