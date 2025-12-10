
'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, XCircle, ShieldCheck, Calendar, User, FileText } from "lucide-react";
import Image from "next/image";

// Simulasi Data Fetching (Di real app, ini fetch ke DB berdasarkan params.token)
const getMandateData = async (token: string) => {
  await new Promise(r => setTimeout(r, 1000));
  
  // Simulasi: Jika token valid
  if (token === "SPT-001") {
    return {
      isValid: true,
      noSurat: "002/SPT-TPF/BCC/XII/2025",
      type: "TIM PENCARI FAKTA (TPF)",
      issuedDate: "08 Desember 2025",
      expiredDate: "30 Juli 2026",
      personnel: [
        { name: "Faiz Azilla Syaehon", role: "Koordinator", id: "P-001" },
        { name: "Anindiffa Pandu", role: "Anggota", id: "P-002" }
      ],
      signer: "Irsyad Jamal (Project Director)"
    };
  }
  return { isValid: false };
};

export default function MandateVerifyPage({ params }: { params: { token: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMandateData(params.token).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [params.token]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Verifying...</div>;

  if (!data?.isValid) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-red-950/30 border-red-600 text-center p-8">
            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-black text-white uppercase">INVALID MANDATE</h1>
            <p className="text-red-300 mt-2">QR Code ini tidak dikenali atau surat tugas telah dicabut/kadaluarsa.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-body p-4 flex items-center justify-center relative overflow-hidden">
      
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
         <Image src="/images/logo.png" width={500} height={500} alt="Watermark" />
      </div>

      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 shadow-2xl relative z-10 overflow-hidden">
        
        {/* HEADER: STATUS VALID */}
        <div className="bg-green-600 p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay"></div>
            <div className="relative z-10 flex flex-col items-center">
                <CheckCircle2 className="w-16 h-16 text-white mb-2 drop-shadow-md" />
                <h1 className="text-2xl font-black text-white uppercase tracking-widest">OFFICIAL MANDATE</h1>
                <Badge className="bg-white text-green-700 mt-2 font-bold px-4 py-1">VERIFIED ACTIVE</Badge>
            </div>
        </div>

        <CardContent className="p-6 space-y-6">
            
            {/* INFO SURAT */}
            <div className="text-center space-y-1 border-b border-zinc-800 pb-6">
                <p className="text-xs text-zinc-500 uppercase tracking-widest">Nomor Surat</p>
                <p className="text-lg font-mono font-bold text-white">{data.noSurat}</p>
                <p className="text-sm text-primary font-bold mt-2">{data.type}</p>
            </div>

            {/* PERSONIL LIST */}
            <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <User className="w-3 h-3"/> Personil Ditugaskan
                </p>
                <div className="space-y-3">
                    {data.personnel.map((p: any, i: number) => (
                        <div key={i} className="flex items-center gap-3 bg-black p-3 rounded-xl border border-zinc-800">
                            <Avatar className="h-10 w-10 border border-zinc-700">
                                <AvatarFallback className="bg-zinc-800 text-zinc-400 font-bold">{p.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-bold text-white">{p.name}</p>
                                <p className="text-xs text-zinc-500">{p.role} • {p.id}</p>
                            </div>
                            <ShieldCheck className="w-5 h-5 text-green-500 ml-auto" />
                        </div>
                    ))}
                </div>
            </div>

            {/* DETAIL MASA BERLAKU */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 uppercase flex items-center gap-1"><Calendar className="w-3 h-3"/> Berlaku Sejak</p>
                    <p className="text-sm font-bold text-white">{data.issuedDate}</p>
                </div>
                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 uppercase flex items-center gap-1"><FileText className="w-3 h-3"/> Hingga</p>
                    <p className="text-sm font-bold text-white">{data.expiredDate}</p>
                </div>
            </div>

            {/* FOOTER */}
            <div className="text-center pt-2">
                <p className="text-[10px] text-zinc-600">
                    Dokumen ini sah secara digital dan dikeluarkan oleh Panitia BCC 2026.<br/>
                    Otorisasi: <span className="text-zinc-400 font-bold">{data.signer}</span>
                </p>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
