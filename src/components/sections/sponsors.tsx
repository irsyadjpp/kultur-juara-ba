import { Handshake } from "lucide-react";
import Link from "next/link";

export function SponsorsSection() {
    return (
        <section className="py-20 bg-background border-y border-border/50">
            <div className="container mx-auto px-4 text-center max-w-3xl">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-6">
                    <Handshake className="w-7 h-7" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black font-headline mb-4">
                    Terbuka untuk Kolaborasi &amp; Kemitraan Strategis
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    Kami mengundang lembaga pendidikan, komunitas olahraga, pemerintah daerah, dan perusahaan yang memiliki visi yang sejalan untuk bersama-sama membangun ekosistem talenta Indonesia.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 transition-colors shadow-lg shadow-primary/20"
                >
                    Ajukan Kemitraan →
                </Link>
            </div>
        </section>
    );
}
