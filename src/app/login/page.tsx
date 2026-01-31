
'use client';

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, KeyRound } from "lucide-react";
import { loginByCode, unifiedGoogleLogin } from "../actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Re-using the same submit button
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full h-14 text-lg font-bold rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Masuk"}
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
      toast({ title: "Login Berhasil", description: "Mengalihkan ke dashboard...", className: "bg-green-600 text-white" });
      router.push(state.redirectUrl);
      router.refresh(); // Important to re-fetch layout data based on new cookie
    }
    if (state.message && !state.success) {
       toast({ title: "Gagal", description: state.message, variant: "destructive" });
    }
  }, [state, router, toast]);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    const res = await unifiedGoogleLogin();
    if(res.success){
        toast({ title: "Google Login Berhasil", description: "Selamat datang!", className: "bg-green-600 text-white" });
        router.push(res.redirectUrl || '/admin/dashboard');
        router.refresh();
    } else {
        setIsGoogleLoading(false);
        toast({ title: "Gagal", description: (res as any).message || "Gagal login dengan Google.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-secondary/30 p-4 relative overflow-hidden font-body">
        
        {/* BACKGROUND ELEMENTS */}
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-sky-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-grid-sporty opacity-40"/>

        <main className="w-full max-w-md mx-auto z-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-8">
                <Link href="/" className="inline-block mb-6">
                    <div className="h-20 w-20 bg-card rounded-full flex items-center justify-center shadow-2xl border-4 border-background transition-transform hover:scale-105">
                        <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
                    </div>
                </Link>
                <h1 className="text-4xl font-black font-headline text-foreground uppercase tracking-tight">Portal Akses</h1>
                <p className="text-muted-foreground mt-2 font-medium">Masuk untuk mengelola sistem akademi.</p>
            </div>

            <Tabs defaultValue="google" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-background/50 backdrop-blur-md p-1.5 rounded-full h-auto border">
                    <TabsTrigger value="google" className="h-10 rounded-[inherit] data-[state=active]:bg-card data-[state=active]:shadow-md font-bold">Akun Google</TabsTrigger>
                    <TabsTrigger value="pin" className="h-10 rounded-[inherit] data-[state=active]:bg-card data-[state=active]:shadow-md font-bold">Kode PIN</TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    <TabsContent value="google">
                         <div className="text-center p-4 rounded-3xl bg-card border">
                            <p className="text-sm text-muted-foreground mb-6">
                                Gunakan akun Google resmi yang terdaftar untuk akses penuh sebagai pelatih atau admin.
                            </p>
                            <button
                                onClick={handleGoogleLogin}
                                disabled={isGoogleLoading}
                                className="w-full h-14 bg-card-foreground text-card rounded-full flex items-center justify-center gap-3 transition-transform active:scale-95 hover:bg-zinc-800 disabled:opacity-70 font-bold text-lg shadow-lg"
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
                                <Label htmlFor="pin-input" className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center justify-center gap-2">
                                    <KeyRound className="w-4 h-4" /> Masukkan Kode Akses Staf
                                </Label>
                                <Input 
                                    name="code" 
                                    id="pin-input"
                                    type="password"
                                    maxLength={6}
                                    placeholder="••••••"
                                    className="text-center text-5xl tracking-[0.3em] bg-background border-2 border-border/50 text-foreground h-24 rounded-3xl focus:border-primary font-mono placeholder:text-muted-foreground/30"
                                    required 
                                />
                            </div>
                            <SubmitButton />
                        </form>
                    </TabsContent>
                </div>
            </Tabs>
        </main>
    </div>
  );
}

    