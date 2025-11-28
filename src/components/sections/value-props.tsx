import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldCheck, Trophy, PartyPopper } from "lucide-react";

const valueProps = [
  {
    icon: <ShieldCheck className="w-12 h-12 text-primary" />,
    title: "Sistem Anti-Sandbagging",
    description: "Kompetisi adil dengan verifikasi video untuk setiap pemain, memastikan integritas turnamen.",
  },
  {
    icon: <Trophy className="w-12 h-12 text-primary" />,
    title: "Total Hadiah Rp 42 Juta+",
    description: "Rebut total hadiah lebih dari 42 juta Rupiah dan buktikan supremasi komunitasmu.",
  },
  {
    icon: <PartyPopper className="w-12 h-12 text-primary" />,
    title: "WBD Celebration",
    description: "Rayakan World Basketball Day pada 5 Juli 2026 dengan acara puncak yang meriah dan tak terlupakan.",
  },
];

export function ValuePropositionSection() {
  return (
    <section className="bg-background py-16 md:py-24 pt-48">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black font-headline uppercase">Kenapa Harus Ikut?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto font-body">
                Lebih dari sekadar turnamen, ini adalah <span className="text-primary font-bold">panggung pembuktianmu.</span>
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <Card key={prop.title} 
                  className="text-center bg-card hover:bg-secondary border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:-translate-y-2 group"
                  style={{ animationDelay: `${index * 150}ms`, animation: `fade-in-up 0.5s ease-out forwards` }}>
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110">
                  {prop.icon}
                </div>
                <CardTitle className="font-headline text-2xl font-bold">{prop.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-body text-base text-muted-foreground">
                  {prop.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
