
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

// Section Utama
import { HeroSection } from '@/components/sections/hero';
import { EventSummarySection } from '@/components/sections/event-summary';

// Section Informasi Teknis (Dari Handbook)
import { LevelingGuideSection } from '@/components/sections/leveling-guide';
import { LocationSection } from '@/components/sections/location';

// Section Kompetisi & Bisnis
import { CategoriesSection } from '@/components/sections/categories';
import { SponsorsSection } from '@/components/sections/sponsors';
import { WhyJoinSection } from '@/components/sections/why-join';
import { PrizesSection } from '@/components/sections/prizes';
import { FaqSection } from '@/components/sections/faq';

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow">
        <ClientOnly>
          {/* 1. Hero: Judul Besar & Tombol Aksi */}
          <HeroSection />
        </ClientOnly>
        
        {/* 2. Event Summary: The 4 Ws */}
        <EventSummarySection />
        
        {/* 3. Why Join? - NEW SECTION */}
        <WhyJoinSection />
        
        {/* 4. Kategori: Siapa saja yang bisa ikut? */}
        <CategoriesSection />

        {/* 5. Syarat Level: Filter peserta agar tidak salah daftar */}
        <div id="levels">
          <LevelingGuideSection /> 
        </div>

        {/* 6. Hadiah */}
        <PrizesSection />

        {/* 7. Sponsor: Undangan kerjasama */}
        <SponsorsSection />

        {/* 8. Lokasi: Peta GOR KONI */}
        <div id="venue">
          <LocationSection />
        </div>

        {/* 9. FAQ */}
        <FaqSection />
        
      </main>

      <Footer />
    </div>
  );
}
