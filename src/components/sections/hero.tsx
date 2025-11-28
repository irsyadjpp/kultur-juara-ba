"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Users, CalendarClock } from 'lucide-react';
import { Countdown } from '@/components/countdown';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-stadium');

  return (
    <section className="relative h-[80vh] min-h-[500px] w-full flex items-center justify-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline leading-tight tracking-tighter mb-4 animate-fade-in-down">
          BANDUNG COMMUNITY CHAMPIONSHIP 2026
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 font-body animate-fade-in-up">
          Integritas, Solidaritas, dan Kejayaan.
        </p>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 px-10 rounded-full transition-transform transform hover:scale-105">
            <Link href="https://indonesia.ayo.co.id/">DAFTAR SEKARANG</Link>
          </Button>
        </div>

        <Card className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] max-w-3xl bg-background/80 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground">
              <div className="flex flex-col items-center justify-center p-2 rounded-lg">
                <Users className="h-6 w-6 mb-2 text-primary" />
                <h3 className="font-headline text-sm font-semibold text-muted-foreground uppercase tracking-wider">Slot Terisi</h3>
                <p className="text-3xl md:text-4xl font-bold font-headline">80 / 96</p>
                <p className="text-xs text-muted-foreground">Tim Sudah Terverifikasi</p>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-lg">
                 <CalendarClock className="h-6 w-6 mb-2 text-primary" />
                <h3 className="font-headline text-sm font-semibold text-muted-foreground uppercase tracking-wider">Hitung Mundur</h3>
                <Countdown targetDate="2026-06-13" />
                <p className="text-xs text-muted-foreground">Hari Menuju Kick-off</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </section>
  );
}
