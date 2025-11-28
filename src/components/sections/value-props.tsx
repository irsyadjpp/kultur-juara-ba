import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldCheck, Trophy, PartyPopper } from "lucide-react";

const valueProps = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: "Sistem Anti-Sandbagging",
    description: "Kompetisi adil dengan verifikasi video untuk setiap pemain, memastikan integritas turnamen.",
  },
  {
    icon: <Trophy className="w-10 h-10 text-primary" />,
    title: "Total Hadiah Rp 42 Juta+",
    description: "Rebut total hadiah lebih dari 42 juta Rupiah dan buktikan supremasi komunitasmu.",
  },
  {
    icon: <PartyPopper className="w-10 h-10 text-primary" />,
    title: "WBD Celebration",
    description: "Rayakan World Basketball Day pada 5 Juli 2026 dengan acara puncak yang meriah dan tak terlupakan.",
  },
];

export function ValuePropositionSection() {
  return (
    <section className="bg-white py-16 md:py-24 pt-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Kenapa Harus Ikut BCC 2026?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
                Lebih dari sekadar turnamen, ini adalah panggung pembuktian.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop) => (
            <Card key={prop.title} className="text-center hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {prop.icon}
                </div>
                <CardTitle className="font-headline text-xl">{prop.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-body text-base">
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
