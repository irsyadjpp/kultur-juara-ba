import { Mail, Phone, BookOpen } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-headline text-lg font-bold mb-4">Kontak Kami</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-center md:justify-start">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:sekretariat@bccbandung.com" className="hover:text-primary transition-colors">
                  sekretariat@bccbandung.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Phone className="w-4 h-4 mr-2" />
                <a href="tel:+6281234567890" className="hover:text-primary transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-bold mb-4">Informasi</h3>
            <ul className="space-y-2">
               <li className="flex items-center justify-center md:justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                <a href="/technical-handbook.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Technical Handbook
                </a>
              </li>
            </ul>
          </div>
           <div className="md:col-span-1">
             <h3 className="font-headline text-lg font-bold mb-4">Komitmen Integritas</h3>
            <p className="text-sm text-muted-foreground [&_a]:text-primary [&_a:hover]:underline">
                BCC 2026 menjunjung tinggi nilai sportivitas. Setiap pelanggaran terhadap integritas kompetisi akan ditindak sesuai aturan yang berlaku.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bandung Community Championship. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
