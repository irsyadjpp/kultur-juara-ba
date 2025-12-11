import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer id="contact" className="bg-background text-foreground border-t">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="md:col-span-2">
            <h3 className="font-headline text-lg font-bold mb-4 text-primary">Bandung Community Championship</h3>
            <p className="text-muted-foreground mb-4">
              Didedikasikan untuk para pecinta bulutangkis sejati. Kami berkomitmen untuk menyajikan turnamen yang adil, kompetitif, dan berkesan dengan standar profesional.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-bold mb-4 text-primary">Tautan Penting</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
              <li><Link href="/#levels" className="hover:text-primary transition-colors">Panduan Level</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
           <div>
             <h3 className="font-headline text-lg font-bold mb-4 text-primary">Hubungi Admin</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center justify-center md:justify-start">
                <Mail className="w-4 h-4 mr-2 text-primary/70" />
                <a href="mailto:admin@managementbcc.com" className="hover:text-primary transition-colors">
                  admin@managementbcc.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Phone className="w-4 h-4 mr-2 text-primary/70" />
                <a href="https://wa.me/6281119522228" target="_blank" className="hover:text-primary transition-colors">
                  WhatsApp Admin
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center">
            <h4 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-widest">Didukung Oleh</h4>
            <div className="flex justify-center items-center gap-8 opacity-50">
                 <Image src="/images/logo-tiento.png" alt="Tiento" width={120} height={40} className="filter grayscale contrast-0 brightness-200" />
            </div>
            <p className="mt-8 text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Road to BCC 2026. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
