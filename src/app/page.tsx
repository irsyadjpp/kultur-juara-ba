
'use client';

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
import { ClientOnly } from '@/components/client-only';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow">
        <ClientOnly>
          {/* 1. Hero: Judul Besar & Tombol Aksi */}
          <HeroSection />
        </ClientOnly>
        
        {/* 2. Event Summary: The 4 Ws -> Repurposed to Program Summary */}
        <EventSummarySection />
        
        {/* 3. Why Join? -> Why Train at Kultur Juara */}
        <WhyJoinSection />
        
        {/* 4. Kategori -> Programs */}
        <div id="programs">
          <CategoriesSection />
        </div>

        {/* 5. Syarat Level -> Training Philosophy */}
        <LevelingGuideSection /> 

        {/* 6. Hadiah -> Hall of Fame */}
        <PrizesSection />

        {/* 7. Sponsor -> Our Partners */}
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
