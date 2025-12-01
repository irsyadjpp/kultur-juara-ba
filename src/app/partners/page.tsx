import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Construction } from 'lucide-react';

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <Construction className="w-24 h-24 text-primary mb-8" />
        <h1 className="text-5xl font-black font-headline text-foreground">Halaman Mitra Segera Hadir</h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Kami akan segera menampilkan para mitra visioner yang menjadi bagian dari kesuksesan BCC 2026. Jika Anda tertarik untuk berkolaborasi, silakan hubungi kami.
        </p>
      </main>
      <Footer />
    </div>
  );
}
