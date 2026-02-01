'use client';

import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "../ui/card";

export function LocationSection() {
    return (
        <section id="venue" className="py-12 px-4">
            <div className="container mx-auto">
                <Card className="rounded-[3rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[500px] p-0">

                    {/* CONTENT */}
                    <div className="p-8 md:p-16 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-muted-foreground mb-6 font-bold uppercase tracking-widest text-sm">
                            <MapPin className="w-5 h-5 text-primary" /> Official Venue
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black font-headline mb-6">
                            GSG Parakan Indah
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
                            Fasilitas olahraga serbaguna dengan lapangan badminton yang memadai di komplek perumahan Parakan Indah.
                        </p>

                        <div className="space-y-4">
                            <div className="p-4 bg-secondary rounded-2xl border">
                                <p className="text-sm text-secondary-foreground">
                                    Jl. Parakan Indah No.1, Batununggal, Kota Bandung, Jawa Barat 40266
                                </p>
                            </div>
                            <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 w-full sm:w-auto">
                                <Link href="https://www.google.com/maps/search/?api=1&query=GSG+Parakan+Indah" target="_blank">
                                    <Navigation className="w-5 h-5 mr-2" /> Petunjuk Arah
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* MAP VISUAL */}
                    <div className="relative h-[300px] lg:h-full bg-secondary">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.653922004516!2d107.6683568!3d-6.9319031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e80209b463a7%3A0x1c5872ca77d2cdcb!2sGSG%20Parakan%20Indah!5e0!3m2!1sen!2sid!4v1769926288738!5m2!1sen!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                        ></iframe>
                    </div>

                </Card>
            </div>
        </section>
    );
}
