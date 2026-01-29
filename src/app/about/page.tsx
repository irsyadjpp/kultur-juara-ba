
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, BrainCircuit, Heart, Trophy, Target, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CourtLines } from '@/components/ui/court-lines';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  const pillars = [
    {
      icon: Dumbbell,
      title: "Pengembangan Fisik",
      desc: "Program latihan fisik terstruktur untuk membangun stamina, kekuatan, dan agilitas.",
      className: "lg:col-span-2 bg-sky-950/20 border-sky-500/30",
    },
    {
      icon: BrainCircuit,
      title: "Kecerdasan Taktis",
      desc: "Mempelajari cara membaca permainan, mengatur strategi, dan mengambil keputusan cerdas di lapangan.",
      className: "bg-red-950/20 border-red-500/30",
    },
    {
      icon: Heart,
      title: "Karakter Juara",
      desc: "Membentuk mentalitas juara: disiplin, kerja keras, respek, dan sportivitas.",
      className: "bg-emerald-950/20 border-emerald-500/30",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-grow pt-24 pb-20 relative overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none opacity-5">
           <CourtLines />
        </div>
        <div className="absolute -top-1/4 left-0 w-full h-1/2 bg-gradient-to-br from-primary/10 via-transparent to-transparent blur-3xl" />
        
        <div className="container mx-auto px-4 mb-24 relative z-10 text-center">
           <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary/50 text-primary bg-primary/10 font-bold tracking-widest uppercase">
              The Kultur Juara Way
           </Badge>
           <h1 className="text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter mb-6">
              LEBIH DARI <br/>SEKADAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">LATIHAN.</span>
           </h1>
           <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto font-medium">
              Kultur Juara PWN Indonesia adalah akademi bulutangkis yang berdedikasi untuk mencetak generasi atlet berkarakter, berprestasi, dan bermental juara.
           </p>
        </div>

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

        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center p-8">
                   <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-10"></div>
                   <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
                   <div className="relative z-10 text-center">
                     <div className="mx-auto bg-card p-4 rounded-full w-fit mb-6 border-2 border-primary/30 shadow-2xl shadow-primary/20">
                        <Trophy className="w-12 h-12 text-primary" />
                     </div>
                     <p className="text-3xl font-black text-white leading-tight">Kultur Juara PWN Indonesia</p>
                     <p className="text-sm text-primary font-bold mt-1 tracking-widest uppercase">Forging Champions Since 2024</p>
                   </div>
                </div>
                <div>
                    <h2 className="text-4xl font-bold font-headline mb-6">
                        Visi Kami: Ekosistem <span className="text-primary">Juara</span>
                    </h2>
                    <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                        Kami percaya bahwa juara tidak dilahirkan, tapi ditempa melalui latihan yang benar, mental yang kuat, dan lingkungan yang mendukung.
                    </p>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <div className="bg-primary/10 text-primary p-2 rounded-lg mt-1"><Target className="w-5 h-5"/></div>
                            <div>
                                <h4 className="font-bold text-white text-lg">Kurikulum Terukur</h4>
                                <p className="text-zinc-500">Program latihan berbasis data dan sport science untuk mengoptimalkan potensi setiap atlet.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                             <div className="bg-primary/10 text-primary p-2 rounded-lg mt-1"><Users className="w-5 h-5"/></div>
                            <div>
                                <h4 className="font-bold text-white text-lg">Komunitas Positif</h4>
                                <p className="text-zinc-500">Menciptakan lingkungan yang kompetitif namun suportif, di mana setiap atlet tumbuh bersama.</p>
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
