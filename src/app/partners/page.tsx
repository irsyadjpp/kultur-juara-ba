
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, TrendingUp, Users, Megaphone } from 'lucide-react';
import Link from 'next/link';

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-black font-headline text-foreground mb-6">
                Bermitra dengan Badmintour Open #1
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                Jangkau 1.000+ atlit komunitas dan ribuan penonton dalam event olahraga paling dinanti tahun ini.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
                <Card>
                    <CardContent className="pt-6 space-y-4">
                        <Users className="w-10 h-10 text-blue-600" />
                        <h3 className="text-xl font-bold">Target Audiens Premium</h3>
                        <p className="text-muted-foreground">Peserta kategori karyawan, pengusaha, dan mahasiswa aktif dengan daya beli tinggi.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 space-y-4">
                        <Megaphone className="w-10 h-10 text-orange-600" />
                        <h3 className="text-xl font-bold">Brand Exposure Luas</h3>
                        <p className="text-muted-foreground">Logo di Jersey, Spanduk Lapangan, Website, dan Ad-libs MC selama 4 minggu event.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 space-y-4">
                        <TrendingUp className="w-10 h-10 text-green-600" />
                        <h3 className="text-xl font-bold">Aktivasi Langsung</h3>
                        <p className="text-muted-foreground">Hak membuka Booth eksklusif di venue untuk penjualan langsung (Hard Selling).</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-secondary/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Paket Sponsorship Tersedia</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto mb-8">
                    <div className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5"/> Title Sponsor</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5"/> Platinum Partner</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5"/> Gold Partner</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5"/> Supporting Partner</div>
                </div>
                <Button asChild size="lg" className="bg-primary text-white font-bold px-8 py-6 text-lg">
                    <Link href="/contact?subject=Proposal%20Sponsorship">
                        Minta Proposal Sponsorship
                    </Link>
                </Button>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
