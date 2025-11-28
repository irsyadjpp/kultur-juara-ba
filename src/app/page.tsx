import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { ValuePropositionSection } from '@/components/sections/value-props';
import { SponsorsSection } from '@/components/sections/sponsors';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ValuePropositionSection />
        <SponsorsSection />
      </main>
      <Footer />
    </div>
  );
}
