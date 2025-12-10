
'use client';

import { useState, useEffect } from "react";
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

export default function PlayerDashboardPage() {
    const [isMounted, setIsMounted] = useState(false);
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

    useEffect(() => {
        setIsMounted(true);
    }, []);

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

    if (!isMounted) {
        return (
            <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-zinc-800 border-t-zinc-400 rounded-full animate-spin"></div>
            </div>
        );
    }

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
       return <p>Wizard form here...</p>
    }

    return (
        <div className="min-h-screen bg-zinc-950 font-body pb-24">
             <div className="max-w-6xl mx-auto p-4 md:p-8">
                <PlayerDashboardFull />
             </div>
        </div>
    );
}
