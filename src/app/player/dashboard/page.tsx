'use client';

import { useState } from "react";
import Link from "next/link";
import { 
  Hash, ArrowRight, Trophy, Shield, 
  CheckCircle2, Users, AlertTriangle, Wallet,
  Upload, User, Activity, Instagram
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Import komponen Full Dashboard yang sudah kita buat sebelumnya
// Anggap saja kode panjang tadi kita simpan di komponen terpisah agar rapi
import PlayerDashboardFull from "@/components/player/dashboard-full"; 

export default function PlayerPage() {
  // --- STATE LEVEL: MENENTUKAN USER ADA DI TAHAP MANA ---
  
  // Tahap 1: Belum Join Tim (Default untuk user baru)
  const [hasJoinedTeam, setHasJoinedTeam] = useState(false);
  
  // Tahap 2: Sudah Join Tim, tapi Belum Isi Formulir
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  // Data Sementara
  const [joinCode, setJoinCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Untuk Wizard Form

  // ---------------------------------------------------------
  // TAHAP 1: INPUT KODE TIM (GATEKEEPER)
  // ---------------------------------------------------------
  const handleVerifyCode = () => {
    if (!joinCode) return;
    setIsJoining(true);
    
    // Simulasi Cek Server
    setTimeout(() => {
      setIsJoining(false);
      if (joinCode === "TWIN-2026") {
        setHasJoinedTeam(true); // Lolos Tahap 1 -> Masuk ke Form Wizard
      } else {
        alert("Kode Salah! Coba: TWIN-2026");
      }
    }, 1000);
  };

  const renderJoinGate = () => (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 rounded-[32px] p-8 md:p-12 border-dashed border-2 relative overflow-hidden">
        {/* Background Blob */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[50px] pointer-events-none"></div>
        
        <div className="text-center space-y-6 relative z-10">
          <div className="w-16 h-16 bg-zinc-800 rounded-2xl mx-auto flex items-center justify-center border border-zinc-700">
            <Hash className="w-8 h-8 text-white"/>
          </div>
          
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Team Access</h2>
            <p className="text-zinc-400 text-sm mt-2">
              Masukkan <strong>Kode Unik</strong> dari Manajer Komunitas (Misal: Twinton) untuk mendaftar.
            </p>
          </div>

          <div className="space-y-4">
            <Input 
              placeholder="CONTOH: TWIN-2026" 
              className="bg-black border-zinc-700 h-16 text-center text-2xl font-mono uppercase tracking-[0.2em] text-white focus:ring-cyan-500 focus:border-cyan-500 rounded-2xl"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              maxLength={9}
            />
            <Button 
              onClick={handleVerifyCode} 
              disabled={isJoining || joinCode.length < 5} 
              className="w-full h-14 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-black text-lg shadow-[0_0_20px_rgba(8,145,178,0.4)]"
            >
              {isJoining ? "VERIFYING..." : "ENTER TEAM SQUAD"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  // ---------------------------------------------------------
  // TAHAP 2: FORMULIR WIZARD (DISCLAIMER -> DATA -> PAYMENT)
  // ---------------------------------------------------------
  
  // ... (Kode renderStep1 s/d renderStep5 sama seperti sebelumnya) ...
  // Saya persingkat di sini untuk fokus ke Flow Logic
  
  const renderWizard = () => (
    <div className="min-h-screen bg-zinc-950 font-body py-12 px-4">
        <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
                <Badge className="bg-indigo-600 mb-4">BERGABUNG DENGAN: PB TWINTON</Badge>
                <h1 className="text-3xl font-black text-white">Lengkapi Data Peserta</h1>
                <p className="text-zinc-400">Step {currentStep} of 5</p>
            </div>

            {/* CONTOH STEP 1: DISCLAIMER (Sederhana) */}
            {currentStep === 1 && (
                <Card className="bg-zinc-900 border-zinc-800 p-8 rounded-[32px]">
                    <div className="space-y-6">
                        <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-xl flex gap-3 text-red-200 text-sm">
                            <AlertTriangle className="w-5 h-5 shrink-0 text-red-500"/>
                            <p>Data palsu = Diskualifikasi Tim & Blacklist.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Checkbox id="agg" className="border-white"/>
                            <Label htmlFor="agg" className="text-white">Saya menyetujui aturan BCC 2026.</Label>
                        </div>
                        <Button onClick={() => setCurrentStep(2)} className="w-full h-12 bg-white text-black font-bold">NEXT: PILIH SKILL</Button>
                    </div>
                </Card>
            )}

            {/* CONTOH STEP 2 dst... (Langsung ke tombol Finish untuk simulasi) */}
            {currentStep > 1 && (
                 <Card className="bg-zinc-900 border-zinc-800 p-8 rounded-[32px] text-center">
                    <h3 className="text-white text-xl font-bold mb-4">Simulasi Pengisian Data...</h3>
                    <Button 
                        onClick={() => setIsRegistrationComplete(true)} // Lolos Tahap 2 -> Masuk Dashboard
                        className="w-full h-14 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black text-lg"
                    >
                        SUBMIT & SELESAI
                    </Button>
                 </Card>
            )}
        </div>
    </div>
  );

  // ---------------------------------------------------------
  // LOGIKA UTAMA (MAIN RENDER SWITCH)
  // ---------------------------------------------------------

  // 1. Jika belum input kode tim -> Tampilkan Gate
  if (!hasJoinedTeam) {
    return renderJoinGate();
  }

  // 2. Jika sudah kode tim tapi belum isi form -> Tampilkan Wizard
  if (!isRegistrationComplete) {
    return renderWizard();
  }

  // 3. Jika semua selesai -> Tampilkan Dashboard Lengkap (7 Fitur)
  // Ini memanggil komponen yang kita buat di prompt sebelumnya
  return <PlayerDashboardFull />;
}