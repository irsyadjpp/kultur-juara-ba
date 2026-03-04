import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import fs from 'fs';
import { Metadata } from 'next';
import path from 'path';
import { GalleryClient } from './gallery-client';

export const metadata: Metadata = {
    title: 'Galeri | Kultur Juara Indonesia',
    description: 'Dokumentasi momen-momen berharga dalam perjalanan kami membangun generasi juara Indonesia.',
};

// Paksa halaman ini di-render secara statis saat build — agar fs bisa membaca folder public/
export const dynamic = 'force-static';

export default async function GalleryPage() {
    // Membaca isi folder "public/images/gallery" secara dinamis saat build/request
    const galleryDir = path.join(process.cwd(), 'public/images/gallery');

    let images: { id: number; src: string; alt: string }[] = [];

    try {
        const files = fs.readdirSync(galleryDir);
        // Menyaring (filter) hanya file yang memiliki awalan 'kultur-'
        const kulturImages = files.filter(file => file.startsWith('kultur-'));

        images = kulturImages.map((file, index) => ({
            id: index + 1,
            src: `/images/gallery/${file}`,
            alt: `Dokumentasi Kultur Juara - ${file}`
        }));
    } catch (error) {
        console.error("Gagal membaca folder galeri:", error);
        // Fallback jika folder kosong atau tidak ditemukan
        images = [];
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow pt-24 pb-20">
                {/* HEAD IN HEADER */}
                <section className="text-center mb-16 px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border text-primary font-bold text-sm w-fit mx-auto mb-6">
                        Dokumentasi Visual
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter mb-4">
                        Galeri <span className="text-primary">Kultur Juara</span>
                    </h1>
                    <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                        Momen-momen di mana semangat sportivitas dan pendidikan karakter melebur menjadi satu tekad untuk meraih prestasi terbaik.
                    </p>
                </section>

                {/* GALLERY GRID (MASONRY) */}
                <section className="container mx-auto px-4 max-w-7xl">
                    <GalleryClient images={images} />
                </section>

            </main>
            <Footer />
        </div>
    );
}
