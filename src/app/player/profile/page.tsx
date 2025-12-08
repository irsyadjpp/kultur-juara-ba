
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  Loader2, Camera, Save, ArrowLeft, Shield, User, 
  Phone, MapPin, Mail, CreditCard, Lock, Sparkles 
} from "lucide-react";
import { updatePlayerProfile } from "../actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock Data
const INITIAL_DATA = {
  fullName: "Kevin Sanjaya Sukamuljo",
  nik: "3273000000000001",
  email: "kevin@djarum.com",
  nickname: "KEVIN",
  phone: "081234567890",
  address: "Jl. Dago Asri No. 1, Bandung",
  photoUrl: "https://github.com/shadcn.png",
  team: "PB DJARUM"
};

export default function EditProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State untuk Live Preview
  const [photoPreview, setPhotoPreview] = useState(INITIAL_DATA.photoUrl);
  const [nickname, setNickname] = useState(INITIAL_DATA.nickname);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    const res = await updatePlayerProfile(formData); 
    setIsSubmitting(false);

    if (res.success) {
      toast({ title: "Profil Diupdate!", description: "Perubahan berhasil disimpan.", className: "bg-green-600 text-white border-none" });
      router.refresh();
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-body relative pb-24 md:pb-10 selection:bg-primary/30">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="fixed inset-0 bg-[url('/images/noise.png')] opacity-20 pointer-events-none z-0 mix-blend-overlay"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* --- MAIN CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div className="flex items-center gap-4">
                <Link href="/player/dashboard">
                    <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-zinc-800 bg-black/50 hover:bg-white hover:text-black transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tight text-white">Edit Profil</h1>
                    <p className="text-zinc-400">Sesuaikan identitas publik dan data kontak Anda.</p>
                </div>
            </div>
            
            {/* Desktop Save Button (Top Right) */}
            <div className="hidden md:block">
                <Button 
                    onClick={() => document.getElementById('profile-form')?.requestSubmit()} 
                    disabled={isSubmitting}
                    className="h-12 px-8 rounded-full bg-white text-black hover:bg-zinc-200 font-bold text-lg shadow-xl shadow-white/5"
                >
                    {isSubmitting ? <Loader2 className="animate-spin mr-2"/> : <Save className="mr-2 w-5 h-5"/>}
                    SIMPAN PERUBAHAN
                </Button>
            </div>
        </div>

        <form id="profile-form" action={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* --- KOLOM KIRI: PLAYER CARD PREVIEW (STICKY) --- */}
                <div className="lg:col-span-4 order-1 lg:order-1">
                    <div className="sticky top-10 space-y-6">
                        
                        <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary"/> Live Preview
                        </div>

                        {/* THE CARD */}
                        <div className="relative group perspective-1000">
                            <div className="relative bg-gradient-to-b from-zinc-800 to-black rounded-3xl p-1 shadow-2xl border border-zinc-700/50 transform transition-transform duration-500 hover:scale-[1.02]">
                                
                                {/* Inner Card Content */}
                                <div className="bg-zinc-900 rounded-[22px] overflow-hidden relative">
                                    {/* Header Pattern */}
                                    <div className="h-32 bg-[url('/images/net-pattern.png')] bg-cover opacity-20 bg-primary absolute top-0 w-full"></div>
                                    <div className="h-32 bg-gradient-to-b from-transparent to-zinc-900 absolute top-0 w-full"></div>

                                    {/* Avatar Upload Area */}
                                    <div className="relative flex justify-center pt-12 pb-6">
                                        <div className="relative">
                                            <div className="absolute -inset-1 bg-gradient-to-br from-primary to-blue-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                                            <Avatar className="w-40 h-40 md:w-48 md:h-48 border-4 border-black relative z-10 shadow-2xl">
                                                <AvatarImage src={photoPreview} className="object-cover" />
                                                <AvatarFallback className="bg-zinc-800 text-3xl font-bold">AT</AvatarFallback>
                                            </Avatar>
                                            
                                            {/* Camera Button */}
                                            <label className="absolute bottom-2 right-2 z-20 bg-white text-black p-3 rounded-full cursor-pointer hover:bg-zinc-200 transition-transform hover:scale-110 shadow-lg group/cam">
                                                <Camera className="w-5 h-5" />
                                                <div className="absolute right-full mr-2 top-1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/cam:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
                                                    Ganti Foto
                                                </div>
                                                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} name="photo" />
                                            </label>
                                        </div>
                                    </div>

                                    {/* Player Info */}
                                    <div className="text-center pb-8 px-6">
                                        <h2 className="text-3xl font-black font-headline text-white uppercase tracking-tighter mb-1 truncate">
                                            {nickname || "PLAYER NAME"}
                                        </h2>
                                        <div className="inline-flex items-center gap-2 bg-zinc-800/50 px-3 py-1 rounded-full border border-zinc-700/50">
                                            <Shield className="w-3 h-3 text-zinc-400" />
                                            <span className="text-xs font-bold text-zinc-300 tracking-wide">{INITIAL_DATA.team}</span>
                                        </div>
                                    </div>

                                    {/* Footer Stats Mockup */}
                                    <div className="grid grid-cols-3 border-t border-zinc-800 bg-black/40">
                                        <div className="p-4 text-center border-r border-zinc-800">
                                            <div className="text-[10px] text-zinc-500 font-bold uppercase">Rank</div>
                                            <div className="text-lg font-black text-white">#24</div>
                                        </div>
                                        <div className="p-4 text-center border-r border-zinc-800">
                                            <div className="text-[10px] text-zinc-500 font-bold uppercase">Win</div>
                                            <div className="text-lg font-black text-green-500">75%</div>
                                        </div>
                                        <div className="p-4 text-center">
                                            <div className="text-[10px] text-zinc-500 font-bold uppercase">Points</div>
                                            <div className="text-lg font-black text-primary">4.5K</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <p className="text-center text-xs text-zinc-500">
                            *Tampilan ini akan muncul di roster tim & bagan pertandingan.
                        </p>
                    </div>
                </div>

                {/* --- KOLOM KANAN: FORM FIELDS --- */}
                <div className="lg:col-span-8 order-2 space-y-8">
                    
                    {/* SECTION 1: PUBLIC IDENTITY */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                                <User className="w-4 h-4" />
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Identitas Publik</h3>
                        </div>
                        
                        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                            <CardContent className="p-6 md:p-8 space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-zinc-400 font-bold uppercase text-xs">Nama Punggung / Panggilan</Label>
                                    <Input 
                                        name="nickname" 
                                        value={nickname} 
                                        onChange={(e) => setNickname(e.target.value.toUpperCase())}
                                        className="bg-black border-zinc-700 h-14 text-xl font-black font-headline tracking-wider rounded-xl focus:border-primary focus:ring-1 focus:ring-primary" 
                                        placeholder="KEVIN"
                                    />
                                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                                        <Sparkles className="w-3 h-3 text-yellow-500"/>
                                        Nama ini akan dicetak di ID Card dan ditampilkan di papan skor TV.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* SECTION 2: CONTACT & ADDRESS */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 border border-blue-500/30">
                                <Phone className="w-4 h-4" />
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Kontak Darurat</h3>
                        </div>

                        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                            <CardContent className="p-6 md:p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-zinc-400 font-bold uppercase text-xs">Nomor WhatsApp</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-4 w-4 h-4 text-zinc-500" />
                                            <Input 
                                                name="phone" 
                                                defaultValue={INITIAL_DATA.phone} 
                                                className="bg-black border-zinc-700 h-12 pl-12 rounded-xl font-mono text-zinc-200" 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-400 font-bold uppercase text-xs">Email Notifikasi</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-4 w-4 h-4 text-zinc-500" />
                                            <Input 
                                                value={INITIAL_DATA.email} 
                                                disabled
                                                className="bg-zinc-950 border-zinc-800 h-12 pl-12 rounded-xl text-zinc-500" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400 font-bold uppercase text-xs">Alamat Domisili (Bandung)</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-4 w-4 h-4 text-zinc-500" />
                                        <Textarea 
                                            name="address" 
                                            defaultValue={INITIAL_DATA.address} 
                                            className="bg-black border-zinc-700 pl-12 pt-3 rounded-xl min-h-[100px] resize-none text-zinc-200" 
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* SECTION 3: SENSITIVE DATA (READ ONLY) */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 border border-red-500/30">
                                <Lock className="w-4 h-4" />
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Data Kependudukan</h3>
                        </div>

                        <Card className="bg-zinc-950 border-zinc-800 border-dashed">
                            <CardContent className="p-6 md:p-8">
                                <div className="flex items-start gap-4">
                                    <Shield className="w-10 h-10 text-zinc-700 mt-1 shrink-0" />
                                    <div className="space-y-4 w-full">
                                        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                                            <div className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Nama Lengkap (KTP)</div>
                                            <div className="font-bold text-zinc-300">{INITIAL_DATA.fullName}</div>
                                        </div>
                                        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                                            <div className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Nomor Induk Kependudukan (NIK)</div>
                                            <div className="font-mono font-bold text-zinc-300 tracking-widest">
                                                {INITIAL_DATA.nik.replace(/(\d{6})\d{6}(\d{4})/, "$1******$2")}
                                            </div>
                                        </div>
                                        <p className="text-xs text-zinc-500 italic">
                                            *Data ini dikunci (Locked) untuk mencegah pemalsuan identitas atlet saat turnamen berlangsung. Hubungi Admin jika ada kesalahan input.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                </div>
            </div>

            {/* --- MOBILE FLOATING BUTTON (Hanya muncul di HP) --- */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent z-50">
                <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full h-14 rounded-full bg-white text-black hover:bg-zinc-200 font-black text-lg uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all active:scale-95"
                >
                    {isSubmitting ? <Loader2 className="animate-spin w-6 h-6"/> : <><Save className="mr-2 w-5 h-5"/> SIMPAN</>}
                </Button>
            </div>

        </form>
      </div>
    </div>
  );
}
