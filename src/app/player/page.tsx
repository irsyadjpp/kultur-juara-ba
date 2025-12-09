
'use client';

import { useState } from "react";
import Link from "next/link";
import { 
  Trophy, Users, Shield, QrCode, 
  Activity, Calendar, Hash, ArrowRight, 
  CheckCircle2, LogOut, User, Upload, 
  FileText, Wallet, AlertTriangle, Instagram, 
  History, Info, ChevronRight, ChevronLeft,
  Medal, MapPin
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";


// --- MOCK DATA ---
const ATHLETE_INITIAL_DATA = {
  id: "ATL-2026-007",
  name: "Jonathan Christie",
  avatar: "https://github.com/shadcn.png",
  team: null as { name: string; logo: string; role: string } | null 
};

// --- CONSTANTS ---
const PRICES = {
  BEGINNER: 200000,
  INTERMEDIATE: 250000,
  ADVANCE: 300000
};

export default function PlayerPage() {
  const [athlete, setAthlete] = useState(ATHLETE_INITIAL_DATA);
  
  // STATE FLOW
  const [joinCode, setJoinCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  
  // State Simulasi: Ganti ke 'true' jika ingin melihat tampilan tahap selanjutnya langsung saat development
  const [hasJoinedTeam, setHasJoinedTeam] = useState(false); 
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false); 

  // FORM WIZARD STATE
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Agreements
    agreements: { valid: false, health: false, rules: false, media: false },
    // Step 2: Category
    matchType: "DOUBLE", 
    skillLevel: "BEGINNER", 
    // Step 3: Players
    players: [
      { name: "", nik: "", dob: "", gender: "M", wa: "", size: "M", club: "", ig: "", pbsi: "", history: "" }, // Player A
      { name: "", nik: "", dob: "", gender: "M", wa: "", size: "M", club: "", ig: "", pbsi: "", history: "" }  // Player B
    ],
    // Step 4: Manager
    manager: { name: "", wa: "", email: "" },
    // Step 5: Payment
    paymentProof: null
  });

  // --- HANDLERS ---

  const handleJoinTeam = () => {
    if (!joinCode) return;
    setIsJoining(true);
    setTimeout(() => {
      setIsJoining(false);
      // Simulasi kode valid: DJA-8821
      if (joinCode === "DJA-8821") {
        setAthlete(prev => ({
          ...prev,
          team: { name: "PB Djarum Official", logo: "/logos/djarum.png", role: "Member" }
        }));
        setHasJoinedTeam(true);
      } else {
        alert("Kode Tim Tidak Valid! Coba: DJA-8821");
      }
    }, 1000);
  };

  const handleNextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const handlePrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const updateAgreement = (key: keyof typeof formData.agreements) => {
    setFormData(prev => ({ ...prev, agreements: { ...prev.agreements, [key]: !prev.agreements[key] } }));
  };

  const updatePlayer = (index: number, field: string, value: string) => {
    const newPlayers = [...formData.players];
    // @ts-ignore
    newPlayers[index][field] = value;
    setFormData(prev => ({ ...prev, players: newPlayers }));
  };

  const totalPrice = PRICES[formData.skillLevel as keyof typeof PRICES];

  // --- RENDER STEPS ---

  // STEP 1: DISCLAIMER
  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-2xl flex gap-4 items-start">
        <Shield className="w-8 h-8 text-red-500 shrink-0 mt-1"/>
        <div className="space-y-2">
          <h3 className="font-bold text-red-100 text-lg">KETENTUAN UMUM (Disclaimer)</h3>
          <p className="text-red-200/80 text-sm">Harap baca dengan teliti. Pelanggaran terhadap poin ini dapat menyebabkan diskualifikasi.</p>
        </div>
      </div>

      <div className="space-y-4 bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
        <div className="flex items-start space-x-3 p-3 hover:bg-zinc-800/50 rounded-xl transition-colors">
          <Checkbox id="valid" checked={formData.agreements.valid} onCheckedChange={() => updateAgreement('valid')} className="mt-1 border-zinc-600 data-[state=checked]:bg-cyan-600"/>
          <div className="space-y-1">
            <Label htmlFor="valid" className="font-bold text-white cursor-pointer">Validitas Data</Label>
            <p className="text-xs text-zinc-400">Saya menyatakan data yang diisi adalah BENAR. Jika ditemukan pemalsuan (Joki/Sandbagging), saya siap didiskualifikasi & Deposit Hangus.</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 hover:bg-zinc-800/50 rounded-xl transition-colors">
          <Checkbox id="health" checked={formData.agreements.health} onCheckedChange={() => updateAgreement('health')} className="mt-1 border-zinc-600 data-[state=checked]:bg-cyan-600"/>
          <div className="space-y-1">
            <Label htmlFor="health" className="font-bold text-white cursor-pointer">Kesehatan Fisik</Label>
            <p className="text-xs text-zinc-400">Sehat jasmani/rohani. Panitia tidak bertanggung jawab atas cedera bawaan atau serangan jantung (Medis hanya P3K).</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 hover:bg-zinc-800/50 rounded-xl transition-colors">
          <Checkbox id="rules" checked={formData.agreements.rules} onCheckedChange={() => updateAgreement('rules')} className="mt-1 border-zinc-600 data-[state=checked]:bg-cyan-600"/>
          <div className="space-y-1">
            <Label htmlFor="rules" className="font-bold text-white cursor-pointer">Regulasi Pertandingan</Label>
            <p className="text-xs text-zinc-400">Menyetujui aturan penggunaan Shuttlecock dan keputusan Mutlak Wasit/TPF.</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 hover:bg-zinc-800/50 rounded-xl transition-colors">
          <Checkbox id="media" checked={formData.agreements.media} onCheckedChange={() => updateAgreement('media')} className="mt-1 border-zinc-600 data-[state=checked]:bg-cyan-600"/>
          <div className="space-y-1">
            <Label htmlFor="media" className="font-bold text-white cursor-pointer">Hak Publikasi</Label>
            <p className="text-xs text-zinc-400">Mengizinkan penggunaan foto/video saya untuk dokumentasi dan sponsor.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // STEP 2: CATEGORY
  const renderStep2 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="space-y-4">
        <Label className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Jenis Pertandingan</Label>
        <div className="grid grid-cols-2 gap-4">
          <div 
            onClick={() => setFormData({...formData, matchType: "DOUBLE"})}
            className={cn("p-6 rounded-2xl border-2 cursor-pointer transition-all hover:bg-zinc-800", formData.matchType === "DOUBLE" ? "border-cyan-500 bg-cyan-500/10" : "border-zinc-800 bg-zinc-900")}
          >
            <Users className="w-8 h-8 text-cyan-500 mb-2"/>
            <h4 className="font-bold text-white">Ganda Perorangan</h4>
            <p className="text-xs text-zinc-500">MD / WD / XD</p>
          </div>
          <div 
            onClick={() => setFormData({...formData, matchType: "TEAM"})}
            className={cn("p-6 rounded-2xl border-2 cursor-pointer transition-all hover:bg-zinc-800", formData.matchType === "TEAM" ? "border-cyan-500 bg-cyan-500/10" : "border-zinc-800 bg-zinc-900")}
          >
            <Shield className="w-8 h-8 text-cyan-500 mb-2"/>
            <h4 className="font-bold text-white">Beregu / Tim</h4>
            <p className="text-xs text-zinc-500">Club / PT / Komunitas</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Kelas Kemampuan (Skill Level)</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(PRICES).map(([level, price]) => (
            <div 
              key={level}
              onClick={() => setFormData({...formData, skillLevel: level})}
              className={cn(
                "p-4 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden",
                formData.skillLevel === level ? "border-indigo-500 bg-indigo-900/20" : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
              )}
            >
              <h4 className="font-bold text-white mb-1">{level}</h4>
              <p className="text-xs text-zinc-400 mb-2">
                {level === 'BEGINNER' ? "Pemula / Hobi" : level === 'INTERMEDIATE' ? "Rutin / Kompetitif" : "Semi-Pro / Eks Atlet"}
              </p>
              <Badge variant="secondary" className="bg-zinc-950 text-white border border-zinc-700">Rp {price.toLocaleString()}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // STEP 3: ATHLETE DATA
  const renderStep3 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-xl flex gap-3 text-indigo-300 text-xs">
        <Info className="w-5 h-5 shrink-0"/>
        <p>Isi data dengan jujur. <strong>Tim Pencari Fakta (TPF)</strong> akan memverifikasi rekam jejak digital setiap pemain.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[0, 1].map((index) => (
          <Card key={index} className="bg-zinc-900 border-zinc-800 rounded-[24px]">
            <CardHeader className="border-b border-zinc-800 pb-4">
              <CardTitle className="text-lg font-black text-white flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-500"/> DATA PEMAIN {index === 0 ? "A" : "B"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-zinc-500">Nama Lengkap (Sesuai KTP)</Label>
                <Input className="bg-black border-zinc-800" value={formData.players[index].name} onChange={(e) => updatePlayer(index, 'name', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-zinc-500">NIK (16 Digit)</Label>
                  <Input maxLength={16} placeholder="Validasi Usia" className="bg-black border-zinc-800" value={formData.players[index].nik} onChange={(e) => updatePlayer(index, 'nik', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-zinc-500">Tanggal Lahir</Label>
                  <Input type="date" className="bg-black border-zinc-800" value={formData.players[index].dob} onChange={(e) => updatePlayer(index, 'dob', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-zinc-500">No. WhatsApp</Label>
                  <Input type="tel" className="bg-black border-zinc-800" value={formData.players[index].wa} onChange={(e) => updatePlayer(index, 'wa', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-zinc-500">Jersey Size</Label>
                  <Select onValueChange={(val) => updatePlayer(index, 'size', val)}>
                    <SelectTrigger className="bg-black border-zinc-800"><SelectValue placeholder="Pilih" /></SelectTrigger>
                    <SelectContent>
                      {['S','M','L','XL','XXL','XXXL'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="pt-4 border-t border-zinc-800 space-y-4">
                <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-3 h-3"/> Data Validasi TPF
                </h4>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-zinc-500">Username Instagram (@)</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-3 w-4 h-4 text-zinc-500"/>
                    <Input className="bg-black border-zinc-800 pl-9" placeholder="Wajib (Public Account)" value={formData.players[index].ig} onChange={(e) => updatePlayer(index, 'ig', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-zinc-500">ID PBSI (Opsional)</Label>
                  <Input className="bg-black border-zinc-800" value={formData.players[index].pbsi} onChange={(e) => updatePlayer(index, 'pbsi', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-zinc-500">3 Turnamen Terakhir & Pencapaian</Label>
                  <Textarea className="bg-black border-zinc-800 min-h-[80px]" placeholder="Contoh: Kejurkot 2024 (Juara 2), Open Bandung (8 Besar)..." value={formData.players[index].history} onChange={(e) => updatePlayer(index, 'history', e.target.value)} />
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="aspect-video bg-black border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-600 hover:text-cyan-500 cursor-pointer transition-colors">
                        <Upload className="w-5 h-5 mb-1"/> <span className="text-[10px] font-bold">Foto KTP</span>
                    </div>
                    <div className="aspect-video bg-black border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-600 hover:text-cyan-500 cursor-pointer transition-colors">
                        <Upload className="w-5 h-5 mb-1"/> <span className="text-[10px] font-bold">Foto Diri (ID Card)</span>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // STEP 4: MANAGER
  const renderStep4 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300 max-w-2xl mx-auto">
      <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-8">
        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-500"/> Kontak Manajer
        </h3>
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-xs font-bold text-zinc-500">Nama Penanggung Jawab</Label>
                <Input 
                    className="bg-black border-zinc-800 h-12 rounded-xl" 
                    value={formData.manager.name} 
                    onChange={(e) => setFormData({...formData, manager: {...formData.manager, name: e.target.value}})}
                />
            </div>
            <div className="space-y-2">
                <Label className="text-xs font-bold text-zinc-500">No. WhatsApp (Aktif)</Label>
                <Input 
                    type="tel"
                    className="bg-black border-zinc-800 h-12 rounded-xl" 
                    value={formData.manager.wa} 
                    onChange={(e) => setFormData({...formData, manager: {...formData.manager, wa: e.target.value}})}
                />
            </div>
            <div className="space-y-2">
                <Label className="text-xs font-bold text-zinc-500">Email Address</Label>
                <Input 
                    type="email"
                    className="bg-black border-zinc-800 h-12 rounded-xl" 
                    value={formData.manager.email} 
                    onChange={(e) => setFormData({...formData, manager: {...formData.manager, email: e.target.value}})}
                />
            </div>
        </div>
      </Card>
    </div>
  );

  // STEP 5: PAYMENT
  const renderStep5 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300 max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 rounded-[32px] p-8">
        <div className="text-center mb-8">
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">Total Biaya Pendaftaran</p>
            <h2 className="text-5xl font-black text-white">Rp {totalPrice.toLocaleString()}</h2>
            <Badge variant="outline" className="mt-4 border-indigo-500 text-indigo-400">{formData.skillLevel} CLASS</Badge>
        </div>

        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-4 mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-white"/>
                    <span className="text-sm font-bold text-zinc-300">Transfer Bank BJB</span>
                </div>
                <span className="font-mono text-white font-bold">0012-3456-7890</span>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-white"/>
                    <span className="text-sm font-bold text-zinc-300">QRIS Scan</span>
                </div>
                <span className="text-xs text-zinc-500">A.n Panitia BCC 2026</span>
            </div>
        </div>

        <div className="space-y-2">
            <Label className="text-xs font-bold text-zinc-500 uppercase">Upload Bukti Transfer</Label>
            <div className="h-32 bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-2xl flex flex-col items-center justify-center text-zinc-500 hover:text-white hover:border-indigo-500 cursor-pointer transition-all">
                <Upload className="w-8 h-8 mb-2"/>
                <span className="text-sm font-bold">Tap to Upload Image/PDF</span>
            </div>
        </div>
      </Card>
    </div>
  );

  // --- RENDER MAIN LOGIC ---

  if (isRegistrationComplete) {
    // DASHBOARD VIEW
    return (
        <div className="space-y-8 p-4 md:p-8 font-body pb-24 max-w-5xl mx-auto animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-white">Welcome, {athlete.name.split(' ')[0]}</h1>
                    <p className="text-zinc-400">Dashboard Atlet</p>
                </div>
                <Link href="/" passHref>
                    <Button variant="outline" className="rounded-full"><LogOut className="w-4 h-4 mr-2"/> Logout</Button>
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-zinc-900 border-zinc-800 rounded-[24px] col-span-1">
                    <CardContent className="p-6 text-center">
                        <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-zinc-800">
                            <AvatarImage src={athlete.avatar} />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-bold text-white">{athlete.name}</h2>
                        <Badge className="bg-indigo-600 mt-2">{athlete.team?.name}</Badge>
                        <div className="mt-6 p-4 bg-black rounded-xl border border-zinc-800">
                            <p className="text-xs text-zinc-500 font-bold uppercase mb-1">Status Verifikasi</p>
                            <p className="text-yellow-500 font-bold flex items-center justify-center gap-2"><Activity className="w-4 h-4 animate-pulse"/> PENDING</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 rounded-[24px] col-span-2 p-6 flex flex-col justify-center items-center text-center">
                    <Calendar className="w-12 h-12 text-zinc-700 mb-4"/>
                    <h3 className="text-lg font-bold text-white">Jadwal Belum Tersedia</h3>
                    <p className="text-zinc-500 text-sm max-w-md mt-2">
                        Data pendaftaran Anda sedang diverifikasi oleh Tim Pencari Fakta. Jadwal drawing akan diumumkan H-3 pertandingan.
                    </p>
                </Card>
            </div>
        </div>
    );
  }

  // WIZARD VIEW
  return (
    <div className="min-h-screen bg-zinc-950 font-body pb-24">
      
      {/* Navbar Simple */}
      <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-cyan-500"/>
            <span className="font-black text-white tracking-tighter">BCC 2026 REGISTRATION</span>
        </div>
        <div className="text-xs font-mono text-zinc-500">ID: {athlete.id}</div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        
        {/* Progress Stepper */}
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Step {currentStep} of 5</span>
                <span className="text-xs font-bold text-white">
                    {currentStep === 1 && "Disclaimer"}
                    {currentStep === 2 && "Kategori"}
                    {currentStep === 3 && "Data Atlet"}
                    {currentStep === 4 && "Kontak"}
                    {currentStep === 5 && "Pembayaran"}
                </span>
            </div>
            <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500" 
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                ></div>
            </div>
        </div>

        {/* Wizard Content */}
        {!hasJoinedTeam ? (
            // INITIAL: JOIN TEAM
            <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-8 md:p-12 text-center max-w-lg mx-auto border-dashed border-2">
                <Hash className="w-12 h-12 text-zinc-600 mx-auto mb-4"/>
                <h2 className="text-2xl font-black text-white mb-2">Join Your Squad</h2>
                <p className="text-zinc-400 text-sm mb-6">Masukkan kode unik komunitas/tim untuk memulai pendaftaran.</p>
                <div className="space-y-4">
                    <Input 
                        placeholder="XXX-0000" 
                        className="bg-black border-zinc-700 h-14 text-center text-xl font-mono uppercase tracking-widest text-white"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                    />
                    <Button onClick={handleJoinTeam} disabled={isJoining} className="w-full h-14 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-lg">
                        {isJoining ? "SYNCING..." : "START REGISTRATION"}
                    </Button>
                </div>
            </Card>
        ) : (
            // FORM STEPS
            <div className="space-y-8">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
                {currentStep === 5 && renderStep5()}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t border-zinc-800">
                    <Button 
                        variant="outline" 
                        onClick={handlePrevStep} 
                        disabled={currentStep === 1}
                        className="h-14 px-8 rounded-xl border-zinc-700 text-zinc-300 hover:text-white font-bold"
                    >
                        <ChevronLeft className="w-5 h-5 mr-2"/> BACK
                    </Button>
                    
                    {currentStep === 5 ? (
                        <Button 
                            onClick={() => setIsRegistrationComplete(true)}
                            className="h-14 px-10 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black text-lg shadow-[0_0_20px_rgba(22,163,74,0.4)]"
                        >
                            SUBMIT REGISTRATION <CheckCircle2 className="ml-2 w-6 h-6"/>
                        </Button>
                    ) : (
                        <Button 
                            onClick={handleNextStep}
                            disabled={
                                (currentStep === 1 && !Object.values(formData.agreements).every(Boolean)) // Wajib centang semua di Step 1
                            }
                            className="h-14 px-8 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-lg"
                        >
                            NEXT STEP <ChevronRight className="w-5 h-5 ml-2"/>
                        </Button>
                    )}
                </div>
            </div>
        )}

      </div>
    </div>
  );
}
```

```
I've provided a complete refactor of the athlete portal. This new code resides in `/src/app/player/page.tsx` and includes the full onboarding wizard as requested. The old `/src/app/player/dashboard/page.tsx` has been updated to simply redirect to this new, consolidated page. I have also adjusted the layout to ensure a consistent, sporty theme.
```