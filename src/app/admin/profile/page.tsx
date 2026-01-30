

'use client';

import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateProfile } from "./actions"; // Import server action
import { Camera, Upload, Save, Loader2, ShieldCheck, PenTool, User, Download, CreditCard, Printer, ZoomIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IdCardTemplate } from "@/components/admin/id-card-template";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";


// MOCK DATA USER (Nanti diambil dari Session/DB)
const MOCK_USER = {
  name: "Kevin Sanjaya",
  email: "kevin.ops@badmintour.com",
  role: "HEAD OF DIVISION",
  division: "MATCH CONTROL",
  id_number: "BTOUR-26-001",
  avatar: "https://github.com/shadcn.png",
  signature: null, // Belum ada ttd
  // Data existing
  nickname: "Kevin",
  phone: "081234567890",
  instagram: "@kevin_sanjaya",
  address: "Jl. Dago Atas No. 12, Bandung",
  shirtSize: "L"
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full h-12 text-lg font-headline font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all"
    >
      {pending ? <><Loader2 className="mr-2 animate-spin"/> SAVING...</> : <><Save className="mr-2 w-5 h-5"/> SIMPAN PERUBAHAN</>}
    </Button>
  );
}

export default function ProfilePage() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(updateProfile, { success: false, message: '' });
  
  // State untuk Preview Image
  const [avatarPreview, setAvatarPreview] = useState<string | null>(MOCK_USER.avatar);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);

  const idCardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // FUNGSI DOWNLOAD PDF
  const handleDownloadIdCard = async () => {
    if (!idCardRef.current) return;
    setIsGenerating(true);

    try {
      // 1. Capture Element HTML jadi Gambar
      const canvas = await html2canvas(idCardRef.current, {
        scale: 3, // Biar tajam (High Res)
        backgroundColor: null,
        useCORS: true // Supaya gambar avatar dari URL luar bisa ke-load
      });

      const imgData = canvas.toDataURL("image/png");

      // 2. Buat PDF (A4 Landscape biar muat 2 sisi)
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgWidth = 200; // Lebar di PDF (mm) - sesuaikan rasio
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`ID-CARD-${MOCK_USER.id_number}.pdf`);
      toast({ title: "Berhasil!", description: "ID Card berhasil diunduh.", className: "bg-green-600 text-white" });
    } catch (err) {
      console.error(err);
      toast({ title: "Gagal", description: "Terjadi kesalahan saat generate PDF.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };


  // Handle File Change (Preview)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'signature') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'avatar') setAvatarPreview(url);
      else setSignaturePreview(url);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      
      <main className="relative z-10 py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* HEADER: GREETING & STATUS */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm mb-1">
                <ShieldCheck className="w-4 h-4" /> OFFICIAL COMMITTEE PROFILE
              </div>
              <h1 className="text-4xl md:text-5xl font-black font-headline text-foreground uppercase tracking-tighter">
                {MOCK_USER.name}
              </h1>
              <p className="text-muted-foreground font-mono mt-1">ID: {MOCK_USER.id_number} • <span className="text-green-500">● ACTIVE</span></p>
            </div>
            
            {/* ROLE BADGE (Read Only) */}
            <div className="text-right">
               <Badge variant="outline" className="border-primary text-primary px-3 py-1 mb-2">
                 {MOCK_USER.role}
               </Badge>
               <h2 className="text-2xl font-bold font-headline text-foreground">{MOCK_USER.division}</h2>
            </div>
          </div>
            <div className="flex justify-end gap-3 -mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="h-12 border-primary/50 text-primary bg-primary/5 hover:bg-primary/10 font-bold px-6">
                            <CreditCard className="mr-2 w-5 h-5"/> LIHAT ID CARD SAYA
                        </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-4xl w-full bg-secondary border-border p-0 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        
                        <div className="p-6 border-b shrink-0">
                             <DialogHeader>
                                <DialogTitle className="text-xl font-headline font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary"/> Official ID Card
                                </DialogTitle>
                                <DialogDescription className="mt-1">
                                    Pratinjau tampilan cetak (Depan & Belakang).
                                </DialogDescription>
                            </DialogHeader>
                        </div>

                        <div className="flex-1 overflow-auto bg-background/50 relative p-8 md:p-12">
                            <div className="min-h-[500px] flex items-center justify-center">
                                <div className="relative transform md:scale-100 scale-[0.6] origin-top md:origin-center transition-all duration-500">
                                    <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full opacity-40 pointer-events-none"></div>
                                    <div className="relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden bg-white ring-1 ring-black/10">
                                        <IdCardTemplate 
                                            user={{
                                                ...MOCK_USER,
                                                photoUrl: avatarPreview || undefined
                                            }} 
                                            className="w-[650px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t bg-card flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
                            <div className="text-xs text-muted-foreground text-center md:text-left">
                                <span className="text-primary font-bold">TIPS:</span> Gunakan kertas PVC atau Art Paper 260gr untuk hasil terbaik.
                            </div>
                            <Button onClick={handleDownloadIdCard} disabled={isGenerating} size="lg" className="w-full md:w-auto bg-primary hover:bg-red-700 text-white font-bold shadow-lg shadow-red-900/20">
                                {isGenerating ? <Loader2 className="animate-spin mr-2"/> : <Printer className="mr-2 w-4 h-4"/>}
                                {isGenerating ? "GENERATING..." : "DOWNLOAD PDF"}
                            </Button>
                        </div>

                    </DialogContent>
                </Dialog>
            </div>

            {/* --- Hidden Template for PDF Generation --- */}
            <div className="fixed top-0 left-0 pointer-events-none opacity-0 z-[-1]">
                 <div className="scale-[2] origin-top-left"> 
                    <IdCardTemplate 
                        ref={idCardRef} 
                        user={{
                            ...MOCK_USER,
                            photoUrl: avatarPreview || undefined
                        }} 
                    />
                 </div>
            </div>

          <form action={formAction}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="space-y-6">
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Profile Picture</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center pb-8">
                    <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                      <Avatar className="w-48 h-48 border-4 border-secondary shadow-xl transition-all group-hover:border-primary">
                        <AvatarImage src={avatarPreview || ""} className="object-cover" />
                        <AvatarFallback className="text-4xl font-black bg-secondary text-muted-foreground">KS</AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4 max-w-[200px]">
                      Klik foto untuk mengganti. Gunakan foto formal/semi-formal. (Max 2MB)
                    </p>
                    <input 
                      type="file" 
                      name="avatar" 
                      ref={avatarInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'avatar')} 
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      <PenTool className="w-4 h-4" /> Digital Signature
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="border-2 border-dashed border-border rounded-xl h-32 flex items-center justify-center bg-secondary/30 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all relative overflow-hidden"
                      onClick={() => signatureInputRef.current?.click()}
                    >
                      {signaturePreview ? (
                        <img src={signaturePreview} alt="Signature" className="h-full w-auto object-contain p-2" />
                      ) : (
                        <div className="text-center">
                          <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                          <span className="text-xs text-muted-foreground font-bold">UPLOAD SCAN TTD</span>
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2">
                      *Upload scan tanda tangan (PNG Transparan) untuk keperluan e-sertifikat & surat tugas.
                    </p>
                    <input 
                      type="file" 
                      name="signature" 
                      ref={signatureInputRef} 
                      className="hidden" 
                      accept="image/png, image/jpeg" 
                      onChange={(e) => handleFileChange(e, 'signature')}
                    />
                  </CardContent>
                </Card>

              </div>

              <div className="lg:col-span-2 space-y-6">
                
                <Card>
                  <CardHeader className="border-b pb-4">
                    <CardTitle className="flex items-center gap-2 font-headline text-lg">
                      <User className="w-5 h-5 text-primary" /> Informasi Personal
                    </CardTitle>
                    <CardDescription>Data ini digunakan untuk database panitia & logistik.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-5">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label>Nama Lengkap (Read Only)</Label>
                        <Input disabled value={MOCK_USER.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nickname">Nama Panggilan</Label>
                        <Input id="nickname" name="nickname" defaultValue={MOCK_USER.nickname} placeholder="Sapaan akrab..."/>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone">No. WhatsApp</Label>
                        <Input id="phone" name="phone" type="tel" defaultValue={MOCK_USER.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input id="instagram" name="instagram" defaultValue={MOCK_USER.instagram} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat Domisili Bandung</Label>
                      <Textarea id="address" name="address" defaultValue={MOCK_USER.address} rows={2} className="resize-none" />
                    </div>

                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="border-b pb-4">
                    <CardTitle className="font-headline text-lg">Logistik & Atribut</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-5">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label>Ukuran Jersey (Official)</Label>
                          <Select name="shirtSize" defaultValue={MOCK_USER.shirtSize}>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Pilih Ukuran" />
                            </SelectTrigger>
                            <SelectContent>
                              {["S", "M", "L", "XL", "XXL", "3XL"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <p className="text-[10px] text-muted-foreground">*Pastikan ukuran sudah benar, tidak bisa tukar setelah produksi.</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Email Akun Google (Login)</Label>
                          <Input disabled value={MOCK_USER.email} className="font-mono text-sm" />
                        </div>
                     </div>
                  </CardContent>
                </Card>

                <SubmitButton />

              </div>
            </div>
          </form>

        </div>
      </main>
    </div>
  );
}
