
import { Instagram, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Solusi', href: '/solutions' },
    { name: 'Studi Kasus', href: '/cases' },
    { name: 'Wawasan', href: '/blog' },
    { name: 'Galeri', href: '/gallery' },
    { name: 'Kontak', href: '/contact' },
];

const ecosystem = [
    { name: 'Pengelolaan Ekskul Bulu Tangkis', href: '/solutions#ekskul', desc: 'Membangun pondasi di lingkungan sekolah' },
    { name: 'Kultur Juara Badminton Academy', href: 'https://academy.kulturjuara.org', desc: 'Mencetak atlet profesional' },
    { name: 'Manajemen Sekolah Terpadu', href: 'https://school.kulturjuara.org', desc: 'Dari manajemen CP hingga rapor' },
];

export function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground border-t">
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

                    {/* BRAND */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="relative w-8 h-8">
                                <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
                            </div>
                            <span className="font-headline font-black text-base tracking-tighter uppercase">KULTUR JUARA</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Ekosistem terintegrasi yang memadukan sport-tech dan edutech untuk mencetak generasi juara Indonesia.
                        </p>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <a href="mailto:admin@kulturjuara.org" className="flex items-center gap-2 hover:text-primary transition-colors">
                                <Mail className="w-4 h-4 shrink-0" />
                                admin@kulturjuara.org
                            </a>
                            <a href="https://wa.me/6285121374644" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                                <Phone className="w-4 h-4 shrink-0" />
                                WhatsApp Admin
                            </a>
                            <a href="https://instagram.com/kulturjuara.id" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                                <Instagram className="w-4 h-4 shrink-0" />
                                @kulturjuara.id
                            </a>
                        </div>
                    </div>

                    {/* NAVIGATION */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-foreground">Navigasi</h3>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                            {navLinks.map(l => (
                                <li key={l.name}>
                                    <Link href={l.href} className="hover:text-primary transition-colors">{l.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ECOSYSTEM */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-foreground">Ekosistem Kami</h3>
                        <ul className="space-y-4 text-sm">
                            {ecosystem.map(e => (
                                <li key={e.name}>
                                    <a href={e.href} className="group">
                                        <p className="font-bold text-foreground group-hover:text-primary transition-colors">{e.name}</p>
                                        <p className="text-muted-foreground text-xs mt-0.5">{e.desc}</p>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* TAGLINE */}
                    <div className="bg-background border rounded-2xl p-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Misi Kami</p>
                        <p className="font-black text-xl font-headline leading-snug">
                            Membangun Generasi Juara, dari Lapangan hingga Ruang Kelas.
                        </p>
                    </div>

                </div>

                <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Kultur Juara Indonesia. All Rights Reserved.</p>
                    <p className="text-xs">kulturjuara.org</p>
                </div>
            </div>
        </footer>
    );
}
