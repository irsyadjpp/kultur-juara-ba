"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Users, CalendarClock, ArrowRight } from 'lucide-react';
import { Countdown } from '@/components/countdown';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-stadium');

  return (
    <section className="relative bg-background text-foreground">
      <div className="relative h-[60vh] md:h-[70vh] flex items-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            className="object-cover opacity-20"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 text-left">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-headline uppercase tracking-tighter mb-4 text-foreground animate-fade-in-down">
              Bandung Community Championship 2026
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-12 font-body animate-fade-in-up">
              Integritas, Solidaritas, <span className="text-primary font-bold">Kejayaan.</span>
            </p>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-8 px-12 rounded-full transition-transform transform hover:scale-105 group shadow-lg shadow-primary/30">
                <Link href="https://indonesia.ayo.co.id/">
                  DAFTAR SEKARANG
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-20 -mt-16 w-full">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground shadow-2xl shadow-black/10">
              <CardContent className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-2 rounded-lg">
                        <Users className="h-8 w-8 text-primary-foreground/80" />
                        <div className="text-center sm:text-left">
                            <h3 className="font-headline text-base font-semibold text-primary-foreground/80 uppercase tracking-widest">Slot Terisi</h3>
                            <p className="text-4xl md:text-5xl font-bold font-headline">80 / 96</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-2 rounded-lg">
                         <CalendarClock className="h-8 w-8 text-primary-foreground/80" />
                        <div className="text-center sm:text-left">
                            <h3 className="font-headline text-base font-semibold text-primary-foreground/80 uppercase tracking-widest">Kick-off</h3>
                            <Countdown targetDate="2026-06-13" />
                        </div>
                    </div>
                  </div>
              </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
