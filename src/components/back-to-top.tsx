'use client';

import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 320);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <button
            onClick={scrollTop}
            aria-label="Kembali ke atas"
            className={cn(
                'fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg',
                'hover:bg-primary/90 transition-all duration-300',
                visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
            )}
        >
            <ArrowUp className="w-5 h-5" />
        </button>
    );
}
