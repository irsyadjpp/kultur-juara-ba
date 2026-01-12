

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, XCircle, Smartphone, Trophy, Database, Target, Users, Scale } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { CourtLines } from '@/components/ui/court-lines';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  const pillars = [
    {
      icon: Database,
      title: "Digital Integrity",
      desc: "Verifikasi level pemain yang ketat berbasis data dan rekam jejak. Di sini, kejujuran adalah segalanya.",
      className: "lg:col-span-2 bg-blue-950/20 border-blue-500/30",
    },
    {
      icon: XCircle,
      title: "Zero Sandbagging",
      desc: "Sistem kami dirancang untuk mendeteksi ketimpangan skill. Tidak ada celah untuk 'turun level'.",
      className: "bg-red-950/20 border-red-500/30",
    },
    {
      icon: Smartphone,
      title: "Modern Experience",
      desc: "Pantau jadwal, hasil, dan bagan langsung dari genggaman tangan Anda. Tanpa kerumunan, tanpa ribet.",
      className: "bg-emerald-950/20 border-emerald-500/30",
    },
     {
      icon: Scale,
      title: "Fair Pairing",
      desc: "Sistem 'Highest Rank' memastikan kategori pasangan ditentukan oleh pemain dengan level tertinggi.",
      className: "lg:col-span-2 bg-purple-950/20 border-purple-500/30",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-grow pt-24 pb-20 relative overflow-hidden">
        
        {/* BACKGROUND DECORATION */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
           <CourtLines />
        </div>
        <div className="absolute -top-1/4 left-0 w-full h-1/2 bg-gradient-to-br from-primary/10 via-transparent to-transparent blur-3xl" />
        
        {/* --- HERO SECTION --- */}
        <div className="container mx-auto px-4 mb-24 relative z-10 text-center">
           <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary/50 text-primary bg-primary/10 font-bold tracking-widest uppercase">
              The Badmintour Manifesto
           </Badge>
           <h1 className="text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter mb-6">
              REVOLUSI <br/>TURNAMEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">KOMUNITAS.</span>
           </h1>
           <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto font-medium">
              Kami bukan sekadar ajang kumpul. Kami adalah pionir kompetisi bulutangkis di Bandung yang terintegrasi penuh dengan sistem digital untuk menjamin <span className="text-white font-bold">integritas & fair play</span>.
           </p>
        </div>

        {/* --- 3 PILLARS (BENTO GRID) --- */}
        <div className="container mx-auto px-4 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {pillars.map((item, i) => (
                    <Card key={i} className={cn("rounded-[2rem] border backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl", item.className)}>
                        <CardContent className="p-8">
                            <div className="w-16 h-16 rounded-2xl bg-black/30 flex items-center justify-center mb-6 border border-white/10">
                                <item.icon className="w-8 h-8 opacity-80" />
                            </div>
                            <h3 className="text-xl font-bold font-headline mb-3">{item.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        {/* --- VISION SECTION --- */}
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center p-8">
                   <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-10"></div>
                   <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
                   <div className="relative z-10 text-center">
                     <div className="mx-auto bg-card p-4 rounded-full w-fit mb-6 border-2 border-primary/30 shadow-2xl shadow-primary/20">
                        <Trophy className="w-12 h-12 text-primary" />
                     </div>
                     <p className="text-3xl font-black text-white leading-tight">Badmintour Open #1</p>
                     <p className="text-sm text-primary font-bold mt-1 tracking-widest uppercase">Fair Play Powered by Data</p>
                   </div>
                </div>
                <div>
                    <h2 className="text-4xl font-bold font-headline mb-6">
                        Visi Kami: Turnamen yang <span className="text-primary">Adil & Terukur</span>
                    </h2>
                    <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                        Kami menjawab keresahan komunitas akan maraknya praktik "Sandbagging" yang mencederai sportivitas. Integritas adalah inti dari kompetisi sejati.
                    </p>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <div className="bg-primary/10 text-primary p-2 rounded-lg mt-1"><Target className="w-5 h-5"/></div>
                            <div>
                                <h4 className="font-bold text-white text-lg">Iklim Kompetisi Objektif</h4>
                                <p className="text-zinc-500">Menciptakan arena yang terukur di mana skill, bukan manipulasi, yang menjadi penentu kemenangan.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                             <div className="bg-primary/10 text-primary p-2 rounded-lg mt-1"><Users className="w-5 h-5"/></div>
                            <div>
                                <h4 className="font-bold text-white text-lg">Panggung Juara Sejati</h4>
                                <p className="text-zinc-500">Memberikan panggung yang layak bagi juara sejati, bukan mereka yang menang karena "salah kamar".</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
