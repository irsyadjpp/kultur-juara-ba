

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

// Section Utama
import { EventSummarySection } from '@/components/sections/event-summary';
import { HeroSection } from '@/components/sections/hero';

// Section Informasi Teknis (Dari Handbook)
import { LocationSection } from '@/components/sections/location';

// Section Kompetisi & Bisnis
import { ClientOnly } from '@/components/client-only';
import { CategoriesSection } from '@/components/sections/categories';
import { FaqSection } from '@/components/sections/faq';
import { GallerySection } from '@/components/sections/gallery';
import { SponsorsSection } from '@/components/sections/sponsors';
import { WhyJoinSection } from '@/components/sections/why-join';

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

                {/* 5. Galeri -> Activities */}
                <GallerySection />

                {/* 6. Sponsor -> Our Partners */}
                <SponsorsSection />

                {/* 7. Lokasi: Peta GOR KONI */}
                <div id="venue">
                    <LocationSection />
                </div>

                {/* 8. FAQ */}
                <FaqSection />

            </main>

            <Footer />
        </div>
    );
}
