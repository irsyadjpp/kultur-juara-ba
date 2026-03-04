import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const impacts = [
    {
        title: "Pengelolaan Ekskul Bulu Tangkis",
        desc: "Membangun pondasi dasar bulu tangkis yang terintegrasi di lingkungan sekolah.",
        image: "/images/landing-page/kultur-organization.jpg",
        category: "Ekskul",
    },
    {
        title: "Kultur Juara Badminton Academy",
        desc: "Pembinaan intensif dengan pendekatan sport science untuk mencetak atlet profesional.",
        image: "/images/landing-page/kultur-academy.jpg",
        category: "Academy",
    },
    {
        title: "Manajemen Sekolah Terpadu",
        desc: "Platform end-to-end dari perancangan Capaian Pembelajaran (CP) hingga pencetakan rapor.",
        image: "/images/landing-page/impact-edutech.jpg",
        category: "Edutech",
    },
];

export function GallerySection() {
    return (
        <section className="py-24 bg-secondary/20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <Badge variant="outline" className="mb-4 text-primary border-primary/30">Dampak Nyata</Badge>
                    <h2 className="text-4xl md:text-5xl font-black font-headline uppercase mb-4">
                        Melihat Ekosistem <span className="text-primary">Bekerja</span>
                    </h2>
                    <p className="text-xl text-muted-foreground font-medium">
                        Dari efisiensi ruang kelas hingga sportivitas di lapangan pertandingan, ini adalah bukti nyata komitmen kami.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {impacts.map((item, idx) => (
                        <Card key={idx} className="overflow-hidden group border-none rounded-3xl bg-background shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="relative h-64 w-full overflow-hidden">
                                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <Badge className="absolute top-4 left-4 z-20 bg-background/90 text-foreground hover:bg-background">
                                    {item.category}
                                </Badge>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold font-headline mb-2">{item.title}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
