
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer id="contact" className="bg-background text-foreground border-t">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Kolom 1: Deskripsi */}
          <div>
            <h3 className="font-headline text-lg font-bold mb-4 text-primary">Bandung Community Championship</h3>
            <p className="text-muted-foreground mb-4">
              Didedikasikan untuk para pecinta bulutangkis sejati. Kami berkomitmen untuk menyajikan turnamen yang adil, kompetitif, dan berkesan dengan standar profesional.
            </p>
          </div>
          {/* Kolom 2: Tautan Penting */}
          <div>
            <h3 className="font-headline text-lg font-bold mb-4 text-primary">Tautan Penting</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
              <li><Link href="/leveling-guide" className="hover:text-primary transition-colors">Panduan Level</Link></li>
              <li><Link href="/rules/drawing" className="hover:text-primary transition-colors">Aturan Main</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
           {/* Kolom 3: Kontak */}
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
            <p className="mt-8 text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Road to BCC 2026. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
