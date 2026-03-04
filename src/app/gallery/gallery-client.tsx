'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface GalleryImage {
    id: number;
    src: string;
    alt: string;
}

// Bento layout pattern — cycles through tile sizes
const BENTO_PATTERNS = [
    'col-span-2 row-span-2', // big featured tile
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-2', // tall tile
    'col-span-1 row-span-1',
    'col-span-2 row-span-1', // wide tile
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-2', // tall tile
    'col-span-2 row-span-1', // wide tile
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
];

export function GalleryClient({ images }: { images: GalleryImage[] }) {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedImage]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            {/* ─── SCROLLING MARQUEE TAGLINE ─── */}
            <div className="overflow-hidden mb-12 py-4 border-y border-border/50 select-none" ref={marqueeRef}>
                <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] gap-12 text-sm font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                    {[...Array(3)].map((_, i) => (
                        <span key={i} className="flex gap-12 shrink-0">
                            <span>Momen Bersejarah</span>
                            <span className="text-primary">✦</span>
                            <span>Kultur Juara Indonesia</span>
                            <span className="text-primary">✦</span>
                            <span>Sport × Education</span>
                            <span className="text-primary">✦</span>
                            <span>Generasi Juara</span>
                            <span className="text-primary">✦</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ─── BENTO GRID ─── */}
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] gap-3">
                    {images.map((image, index) => {
                        const bentoClass = BENTO_PATTERNS[index % BENTO_PATTERNS.length];
                        const isHovered = hoveredId === image.id;

                        return (
                            <div
                                key={image.id}
                                className={cn(
                                    'relative group overflow-hidden rounded-2xl cursor-pointer',
                                    'border border-border/30 shadow-md',
                                    'transition-all duration-500 hover:shadow-2xl hover:z-10',
                                    bentoClass
                                )}
                                onClick={() => setSelectedImage(image)}
                                onMouseEnter={() => setHoveredId(image.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Image */}
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className={cn(
                                        'object-cover transition-all duration-700',
                                        isHovered
                                            ? 'scale-110 brightness-75 saturate-150'
                                            : 'scale-100 brightness-90 saturate-100'
                                    )}
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />

                                {/* Gradient overlay */}
                                <div className={cn(
                                    'absolute inset-0 transition-opacity duration-500',
                                    'bg-gradient-to-br from-primary/30 via-transparent to-black/70',
                                    isHovered ? 'opacity-100' : 'opacity-0'
                                )} />

                                {/* Number badge top-left */}
                                <div className={cn(
                                    'absolute top-3 left-3 font-black text-xs tracking-[0.15em] uppercase',
                                    'transition-all duration-300',
                                    isHovered ? 'text-white opacity-100' : 'text-white/60 opacity-70'
                                )}>
                                    #{String(image.id).padStart(2, '0')}
                                </div>

                                {/* Bold center label on hover */}
                                <div className={cn(
                                    'absolute inset-0 flex items-center justify-center',
                                    'transition-all duration-400',
                                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                )}>
                                    <div className="text-center px-4">
                                        <p className="text-white font-black text-lg md:text-2xl font-headline uppercase tracking-tight leading-none drop-shadow-2xl">
                                            Kultur<br />
                                            <span className="text-primary">Juara</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom strip — category tag */}
                                <div className={cn(
                                    'absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between',
                                    'translate-y-full group-hover:translate-y-0 transition-transform duration-400',
                                    'bg-gradient-to-t from-black/90 to-transparent'
                                )}>
                                    <span className="text-xs text-white/80 font-bold uppercase tracking-widest">
                                        Tap untuk perbesar
                                    </span>
                                    <span className="text-primary text-lg font-black">↗</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ─── BOTTOM COUNTER ─── */}
                <div className="mt-12 flex items-center justify-center gap-4">
                    <div className="h-px flex-1 bg-border/50" />
                    <p className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground">
                        {images.length} Momen Diabadikan
                    </p>
                    <div className="h-px flex-1 bg-border/50" />
                </div>
            </div>

            {/* ─── LIGHTBOX MODAL ─── */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Close button */}
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-5 right-5 z-[110] p-2.5 rounded-full bg-white/10 text-white hover:bg-primary hover:rotate-90 transition-all duration-300 border border-white/20 backdrop-blur"
                    >
                        <X className="w-5 h-5" />
                        <span className="sr-only">Tutup</span>
                    </button>

                    {/* Image number */}
                    <div className="absolute top-5 left-5 font-black text-white/40 text-xs tracking-[0.3em] uppercase z-[110]">
                        #{String(selectedImage.id).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                    </div>

                    {/* Main image */}
                    <div
                        className="relative w-full max-w-5xl max-h-[90vh] rounded-xl overflow-hidden animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            width={1920}
                            height={1080}
                            className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
                            sizes="100vw"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                            <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Kultur Juara Indonesia</p>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── MARQUEE ANIMATION KEYFRAMES ─── */}
            <style jsx>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-33.33%); }
                }
            `}</style>
        </>
    );
}
