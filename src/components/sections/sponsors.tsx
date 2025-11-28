import { Card, CardContent } from "@/components/ui/card";

const SponsorLogo = ({ name, size = 'md' }: { name: string, size?: 'md' | 'lg' }) => {
    const sizeClasses = size === 'lg' ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl';
    return (
        <div className="flex items-center justify-center h-24">
            <span className={`${sizeClasses} font-bold text-muted-foreground/80 font-headline`}>{name}</span>
        </div>
    );
};

export function SponsorsSection() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">
                    Didukung Oleh
                </h2>

                <div className="mb-12">
                    <h3 className="text-center text-sm uppercase text-muted-foreground font-semibold mb-6 font-headline tracking-widest">Sponsor Utama</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
                        <div className="col-span-2 md:col-span-1 flex justify-center">
                             <SponsorLogo name="Ayo Indonesia" size="lg" />
                        </div>
                        <div className="flex justify-center">
                            <SponsorLogo name="Bank BJB" size="lg" />
                        </div>
                        <div className="flex justify-center">
                             <SponsorLogo name="AutoSponsor" size="lg" />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-center text-sm uppercase text-muted-foreground font-semibold mb-6 font-headline tracking-widest">Partner Operasional</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center max-w-4xl mx-auto">
                        <div className="flex justify-center">
                            <SponsorLogo name="Flypower" />
                        </div>
                        <div className="flex justify-center">
                            <SponsorLogo name="Pocari Sweat" />
                        </div>
                         <div className="flex justify-center">
                            <SponsorLogo name="Bebas Cedera" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
