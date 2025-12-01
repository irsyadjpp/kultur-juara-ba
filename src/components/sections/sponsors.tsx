"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

export function SponsorsSection() {

    return (
        <section id="calling-for-sponsors" className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
                    Jadilah Bagian dari Sejarah
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Bandung Community Championship 2026 membuka kesempatan bagi brand Anda untuk terhubung dengan ribuan pegiat dan penggemar bulutangkis. Jadilah mitra kami dalam menyukseskan perhelatan akbar ini.
                </p>
                <div className="mt-10">
                     <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base py-7 px-10 rounded-lg transition-transform transform hover:scale-105 group shadow-lg shadow-primary/20">
                        <Link href="/contact">
                          PELAJARI PELUANG SPONSORSHIP
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                </div>
            </div>
        </section>
    );
}
