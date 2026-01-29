
"use client";

// This section is repurposed to "Our Partners"
import Image from "next/image";

const partners = [
    { name: "PBSI", logo: "/images/logo-pbsi.png", width: 100 },
    { name: "Yonex", logo: "/logos/yonex.png", width: 120 },
    { name: "Bank BJB", logo: "/logos/bjb.png", width: 100 },
    { name: "Pocari Sweat", logo: "/logos/pocari.png", width: 140 },
];

export function SponsorsSection() {
    return (
        <section className="py-20 bg-secondary">
            <div className="container mx-auto px-4">
                <h3 className="text-center text-sm font-bold uppercase text-muted-foreground tracking-[0.3em] mb-10">
                    DIDUKUNG OLEH
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
                    {partners.map(p => (
                         <div key={p.name} className="relative h-12 transition-transform hover:scale-110" style={{ width: `${p.width}px`}}>
                            <Image 
                                src={p.logo} 
                                alt={p.name}
                                fill
                                className="object-contain opacity-60"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
