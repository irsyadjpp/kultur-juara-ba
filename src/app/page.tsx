import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, UserPlus } from 'lucide-react';

// Section Utama
import { HeroSection } from '@/components/sections/hero';

// Section Informasi Teknis (Dari Handbook)
import { LevelingGuideSection } from '@/components/sections/leveling-guide';
import { RegistrationInfoSection } from '@/components/sections/registration-info';
import { LocationSection } from '@/components/sections/location';

// Section Kompetisi & Bisnis
import { CategoriesSection } from '@/components/sections/categories';
import { SponsorsSection } from '@/components/sections/sponsors';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* 1. Hero: Judul Besar & Tombol Aksi */}
        <HeroSection />
        
        {/* 2. Kategori: Siapa saja yang bisa ikut? */}
        <CategoriesSection />

        {/* 3. Syarat Level: Filter peserta agar tidak salah daftar */}
        <div id="levels">
          <LevelingGuideSection /> 
        </div>

        {/* 4. Cara Daftar: Langkah-langkah teknis */}
        <div id="registration">
          <RegistrationInfoSection />
        </div>

        {/* 5. Sponsor: Undangan kerjasama */}
        <SponsorsSection />

        {/* 6. Lokasi: Peta GOR KONI */}
        <div id="venue">
          <LocationSection />
        </div>
        
      </main>

      <Footer />
    </div>
  );
}
