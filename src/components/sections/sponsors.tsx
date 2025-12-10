
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";
import { CourtLines } from "../ui/court-lines";

export function SponsorsSection() {

    return (
        <section id="calling-for-sponsors" className="py-16 md:py-24 bg-secondary relative overflow-hidden">
             <div className="absolute inset-0 opacity-10">
                <CourtLines />
            </div>
            <div className="container mx-auto px-4 text-center relative z-10">

                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Bandung Community Championship 2026 membuka kesempatan bagi brand Anda untuk terhubung dengan ribuan pegiat dan penggemar bulutangkis. Jadilah mitra kami dalam menyukseskan perhelatan akbar ini.
                </p>
                <div className="mt-10">

                </div>
            </div>
        </section>
    );
}
