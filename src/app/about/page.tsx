import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Trophy } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero About */}
        <section className="py-20 bg-primary text-primary-foreground text-center px-4">
            <h1 className="text-4xl md:text-5xl font-black font-headline mb-4">Tentang Road to BCC 2026</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
                Wadah kompetisi komunitas bulutangkis terbesar di Bandung dengan standar profesional.
            </p>
        </section>

        {/* Values */}
        <section className="py-16 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24">
                {[
                    { title: "Integritas", icon: Shield, desc: "Mengutamakan kejujuran level permainan melalui verifikasi ketat." },
                    { title: "Solidaritas", icon: Users, desc: "Mempererat tali persaudaraan antar komunitas di Bandung Raya." },
                    { title: "Sportivitas", icon: Trophy, desc: "Panggung prestisius untuk melahirkan juara sejati." }
                ].map((item, i) => (
                    <Card key={i} className="shadow-xl border-t-4 border-t-orange-500">
                        <CardContent className="pt-8 text-center">
                            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold font-headline mb-6 text-primary">Visi Kami</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        Road to BCC 2026 hadir untuk menjawab kerinduan komunitas akan turnamen yang <strong>adil (fair)</strong> dan <strong>bergengsi</strong>. Kami menolak praktik "Sandbagging" (memalsukan level) demi menjaga sportivitas.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <Trophy className="w-6 h-6 text-primary shrink-0" />
                            <span>Menjadi barometer turnamen komunitas di Jawa Barat.</span>
                        </li>
                        <li className="flex gap-3">
                            <Trophy className="w-6 h-6 text-primary shrink-0" />
                            <span>Menciptakan ekosistem olahraga yang sehat dan kompetitif.</span>
                        </li>
                    </ul>
                </div>
                <div className="relative h-[400px] rounded-2xl overflow-hidden bg-secondary">
                    {/* Placeholder Image - Ganti dengan foto crowd tahun lalu jika ada */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-secondary/80 flex items-center justify-center text-white font-bold text-2xl">
                        Foto Dokumentasi Event
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
