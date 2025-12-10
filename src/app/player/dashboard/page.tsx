
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import PlayerDashboardFull from "@/components/player/dashboard-full";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Hash,
    ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// --- SUB-COMPONENTS for WIZARD ---

function WizardStepAgreement({ formData, setFormData }: any) {
    const agreements = [
        { id: 'valid', text: 'Saya menyatakan data yang diisi adalah BENAR.' },
        { id: 'health', text: 'Saya dalam kondisi SEHAT jasmani & rohani.' },
        { id: 'rules', text: 'Saya menyetujui REGULASI pertandingan.' },
        { id: 'media', text: 'Saya mengizinkan PUBLIKASI foto/video.' },
    ];

    const handleAgreementClick = (id: keyof typeof formData.agreements) => {
        setFormData((prev: any) => ({
            ...prev,
            agreements: {
                ...prev.agreements,
                [id]: !prev.agreements[id]
            }
        }));
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="bg-red-950/30 border border-red-500/30 p-5 rounded-2xl flex gap-4 text-red-200 text-sm">
                <div className="w-6 h-6 shrink-0 text-red-500 mt-1"/>
                <div>
                    <p className="font-bold text-red-400 mb-1">DISCLAIMER PENTING</p>
                    <p>Pemalsuan data (umur/skill) akan menyebabkan <strong>Tim Diskualifikasi</strong> dan <strong>Uang Pendaftaran Hangus</strong>.</p>
                </div>
            </div>
            <div className="space-y-4">
                {agreements.map((item) => (
                    <div 
                        key={item.id} 
                        className="flex gap-4 items-start p-4 bg-black/40 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 cursor-pointer transition-colors"
                        onClick={() => handleAgreementClick(item.id as any)}
                    >
                        <Checkbox 
                            id={`chk-${item.id}`} 
                            checked={formData.agreements[item.id]}
                            className="mt-1 border-zinc-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                        />
                        <Label htmlFor={`chk-${item.id}`} className="text-zinc-300 cursor-pointer leading-relaxed">{item.text}</Label>
                    </div>
                ))}
            </div>
        </div>
    );
}

function WizardStepSkillLevel({ formData, setFormData }: any) {
  const levels = [
    { id: 'BEGINNER', label: 'Beginner', desc: 'Pemula Komunitas (Grip Panci)', icon: <div className="w-8 h-8"/>, color: "green" },
    { id: 'INTERMEDIATE', label: 'Intermediate', desc: 'Pemain Rutin (Teknik Dasar OK)', icon: <div className="w-8 h-8"/>, color: "blue" },
    { id: 'ADVANCE', label: 'Advance', desc: 'Skill di Atas Rata-rata', icon: <div className="w-8 h-8"/>, color: "purple" },
  ];
  
  const PRICES = {
    BEGINNER: 120000,
    INTERMEDIATE: 145000,
    ADVANCE: 145000,
    '3ON3': 120000,
  };
  const selectedLevel = levels.find(l => l.id === formData.skillLevel);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="text-center">
        <h3 className="text-white text-xl font-black mb-1 uppercase tracking-widest">Pilih Level Anda</h3>
        <p className="text-zinc-500 text-sm max-w-sm mx-auto">
          Pilih level yang paling sesuai dengan kemampuan Anda saat ini. Jujur ya!
        </p>
      </div>
      <ToggleGroup 
        type="single" 
        defaultValue={formData.skillLevel} 
        onValueChange={(value) => { if(value) setFormData((prev:any) => ({ ...prev, skillLevel: value }))}}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {levels.map((level) => (
          <ToggleGroupItem 
            key={level.id} 
            value={level.id} 
            className="h-auto p-6 rounded-3xl border-2 border-zinc-800 bg-zinc-900 data-[state=on]:border-cyan-500 data-[state=on]:bg-cyan-950/20 flex flex-col gap-4 text-left items-start transition-all hover:border-zinc-700"
          >
            <div className={`w-14 h-14 rounded-2xl bg-${level.color}-500/10 text-${level.color}-500 flex items-center justify-center`}>
                {level.icon}
            </div>
            <div className="text-left">
                <p className="font-bold text-lg text-white">{level.label}</p>
                <p className="text-xs text-zinc-400 leading-snug">{level.desc}</p>
            </div>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-center">
        <p className="text-xs text-zinc-500 mb-1">Estimasi Biaya Pendaftaran per Kategori:</p>
        <p className="font-mono text-2xl font-bold text-cyan-400">
          Rp {PRICES[formData.skillLevel as keyof typeof PRICES].toLocaleString('id-ID')}
        </p>
      </div>
    </div>
  );
}

function WizardStepProfile({ formData, setFormData }: any) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev: any) => ({ ...prev, profile: { ...prev.profile, [e.target.name]: e.target.value }}));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="text-center mb-4">
        <h3 className="text-white text-xl font-black mb-1 uppercase tracking-widest">Lengkapi Profil</h3>
        <p className="text-zinc-500 text-sm max-w-sm mx-auto">
          Data ini akan digunakan oleh TPF untuk verifikasi & panitia untuk logistik.
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input name="nik" placeholder="NIK KTP (16 Digit)" onChange={handleInputChange} className="h-12 bg-black border-zinc-800"/>
          <Input name="phone" placeholder="No. WhatsApp" onChange={handleInputChange} className="h-12 bg-black border-zinc-800"/>
        </div>
        <RadioGroup name="gender" onValueChange={(v) => setFormData((p:any) => ({...p, profile: {...p.profile, gender: v}}))} className="grid grid-cols-2 gap-4">
            <Label className="flex items-center gap-3 p-3 bg-black border border-zinc-800 rounded-xl cursor-pointer hover:border-zinc-700">
                <RadioGroupItem value="MALE"/> Putra
            </Label>
            <Label className="flex items-center gap-3 p-3 bg-black border border-zinc-800 rounded-xl cursor-pointer hover:border-zinc-700">
                <RadioGroupItem value="FEMALE"/> Putri
            </Label>
        </RadioGroup>
        <Input name="communityName" placeholder="Nama Komunitas/Klub Asal" onChange={handleInputChange} className="h-12 bg-black border-zinc-800"/>
        <Input name="instagram" placeholder="@username Instagram" onChange={handleInputChange} className="h-12 bg-black border-zinc-800"/>
        <div className="relative">
            <div className="w-5 h-5 text-zinc-500 absolute left-3 top-3.5"/>
            <Input name="youtubeUrl" placeholder="Link Video Verifikasi YouTube" onChange={handleInputChange} className="h-12 bg-black border-zinc-800 pl-10"/>
        </div>
      </div>
    </div>
  );
}

export default function PlayerDashboardPage() {
    const [hasJoinedTeam, setHasJoinedTeam] = useState(false);
    const [isProfileComplete, setIsProfileComplete] = useState(false);

    // Wizard States
    const [joinCode, setJoinCode] = useState("");
    const [isJoining, setIsJoining] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState({
        agreements: { valid: false, health: false, rules: false, media: false },
        skillLevel: "BEGINNER",
        profile: {},
        documents: {
            ktp: null,
            selfie: null,
            followProof: null,
        },
    });

    // HANDLERS
    const handleVerifyCode = () => {
        if (!joinCode) return;
        setIsJoining(true);
        setTimeout(() => {
            setIsJoining(false);
            if (joinCode.toUpperCase() === "TWIN-2026") {
                setHasJoinedTeam(true);
            } else {
                alert("Kode Salah! Coba: TWIN-2026");
            }
        }, 1000);
    };

    const handleNextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
    const handlePrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const allAgreed = Object.values(formData.agreements).every(Boolean);

    if (!hasJoinedTeam) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-body relative overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="text-center absolute top-8">
                    <Button onClick={() => setHasJoinedTeam(true)} variant="link" className="text-zinc-500">Dev: Skip to Wizard</Button>
                    <Button onClick={() => { setHasJoinedTeam(true); setIsProfileComplete(true); }} variant="link" className="text-zinc-500">Dev: Skip to Dashboard</Button>
                </div>

                <Card className="w-full max-w-lg bg-zinc-900/80 backdrop-blur-xl border-zinc-800 rounded-[40px] p-8 md:p-12 border-dashed border-2 relative overflow-hidden shadow-2xl">
                    <div className="text-center space-y-8 relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-zinc-800 to-black rounded-3xl mx-auto flex items-center justify-center border border-zinc-700 shadow-inner">
                            <Hash className="w-10 h-10 text-white" />
                        </div>

                        <div>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Team Access</h2>
                            <p className="text-zinc-400 text-sm mt-3 leading-relaxed px-4">
                                Masukkan <strong>Kode Unik</strong> yang diberikan oleh Manajer Tim/Komunitas untuk membuka formulir pendaftaran.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                                <Input
                                    placeholder="CONTOH: TWIN-2026"
                                    className="relative bg-black border-zinc-700 h-16 text-center text-2xl font-mono uppercase tracking-[0.2em] text-white rounded-2xl focus:border-cyan-500 focus:ring-0 placeholder:text-zinc-800 transition-all"
                                    value={joinCode}
                                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                    maxLength={9}
                                />
                            </div>
                            <Button
                                onClick={handleVerifyCode}
                                disabled={isJoining || joinCode.length < 5}
                                className="w-full h-14 rounded-2xl bg-white hover:bg-zinc-200 text-black font-black text-lg shadow-xl transition-transform active:scale-95"
                            >
                                {isJoining ? "VERIFYING..." : "ENTER TEAM SQUAD"} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </Card>

                <p className="text-zinc-600 text-xs mt-8 font-mono">BCC 2026 • OFFICIAL REGISTRATION PORTAL</p>
            </div>
        );
    }
    
    if (!isProfileComplete) {
       const totalSteps = 4;
       return (
         <div className="min-h-screen bg-zinc-950 font-body py-8 px-4 md:py-12">
           <div className="max-w-3xl mx-auto">
               <div className="mb-10 text-center space-y-4">
                   <Badge variant="outline" className="border-indigo-500 text-indigo-400 px-4 py-1 tracking-widest uppercase">Joining: PB TWINTON</Badge>
                   <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Athlete Data</h1>
                   
                   <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden mt-6">
                       <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 transition-all duration-500 ease-out" style={{ width: `${(currentStep/totalSteps)*100}%` }}></div>
                   </div>
                   <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2 px-1">
                       <span>Agreement</span>
                       <span>Skill</span>
                       <span>Bio</span>
                       <span>Submit</span>
                   </div>
               </div>

               <Card className="bg-zinc-900 border-zinc-800 rounded-[40px] p-8 md:p-10 min-h-[400px] shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
                   <div className="relative z-10">
                       {currentStep === 1 && <WizardStepAgreement formData={formData} setFormData={setFormData} />}
                       {currentStep === 2 && <WizardStepSkillLevel formData={formData} setFormData={setFormData} />}
                       {currentStep === 3 && <WizardStepProfile formData={formData} setFormData={setFormData} />}
                       {currentStep === 4 && (
                           <div className="text-center py-16 animate-in fade-in zoom-in duration-300">
                               <div className="w-20 h-20 bg-zinc-800 rounded-3xl mx-auto flex items-center justify-center mb-6 animate-pulse">
                                   <FileText className="w-10 h-10 text-zinc-600" />
                               </div>
                               <h3 className="text-white text-2xl font-black mb-2 uppercase">Final Step: Submit</h3>
                               <p className="text-zinc-500 text-sm max-w-sm mx-auto mb-8">
                                   Pastikan semua data sudah benar sebelum mengirimkan formulir pendaftaran.
                               </p>
                               <Button 
                                   onClick={() => setIsProfileComplete(true)} 
                                   className="h-16 px-10 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black text-xl shadow-[0_0_30px_rgba(22,163,74,0.4)] transition-transform hover:scale-105"
                               >
                                   SUBMIT & FINISH <div className="w-6 h-6 ml-3"/>
                               </Button>
                           </div>
                       )}
                   </div>
               </Card>

               <div className="flex justify-between items-center mt-8 px-2">
                   <Button variant="ghost" onClick={handlePrevStep} disabled={currentStep===1} className="h-14 px-6 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-900">
                       <div className="w-5 h-5 mr-2"/> BACK
                   </Button>

                   <Button variant="outline" className="h-14 rounded-xl font-bold bg-zinc-800 border-zinc-700 hover:bg-zinc-700">
                       <div className="w-4 h-4 mr-2"/> SAVE DRAFT
                   </Button>
                   
                   {currentStep < totalSteps && (
                       <Button 
                           onClick={handleNextStep} 
                           disabled={!allAgreed && currentStep === 1} 
                           className="h-14 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-lg shadow-lg disabled:bg-zinc-800 disabled:text-zinc-500"
                       >
                           NEXT STEP <div className="w-5 h-5 ml-2"/>
                       </Button>
                   )}
               </div>
           </div>
         </div>
       );
    }

    return (
        <div className="min-h-screen bg-zinc-950 font-body pb-24">
             <div className="max-w-6xl mx-auto p-4 md:p-8">
                <PlayerDashboardFull />
             </div>
        </div>
    );
}
