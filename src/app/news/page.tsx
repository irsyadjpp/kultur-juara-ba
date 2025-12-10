import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";

// Mock Data Berita
const NEWS = [
  { id: 1, title: "Technical Meeting Ditunda, Ini Jadwal Barunya", category: "PENGUMUMAN", date: "07 Des 2025", author: "Panitia", img: "/images/gor-koni.jpg", excerpt: "Dikarenakan kendala teknis di venue utama, TM diundur menjadi..." },
  { id: 2, title: "Bank BJB Resmi Jadi Sponsor Utama Road to BCC 2026", category: "SPONSOR", date: "05 Des 2025", author: "Media", img: "/images/gor-koni.jpg", excerpt: "Kerjasama strategis ini diharapkan dapat meningkatkan kualitas..." },
  { id: 3, title: "Tutorial Cara Daftar Tim via Website", category: "TUTORIAL", date: "01 Des 2025", author: "IT Support", img: "/images/gor-koni.jpg", excerpt: "Bingung cara daftar? Simak panduan lengkap langkah demi langkah..." },
];

export default function NewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative h-[400px] flex items-center justify-center bg-black text-white">
            <Image src="/images/gor-koni.jpg" alt="News Hero" fill className="object-cover opacity-40" />
            <div className="relative z-10 text-center space-y-4 px-4">
                <Badge className="bg-primary hover:bg-primary text-white px-4 py-1 text-sm">BCC NEWSROOM</Badge>
                <h1 className="text-4xl md:text-6xl font-black font-headline uppercase tracking-tighter">
                    Berita & Update <br/>Terbaru
                </h1>
                <p className="text-gray-300 max-w-xl mx-auto text-lg">
                    Ikuti perkembangan terkini seputar persiapan dan pelaksanaan Road to BCC 2026.
                </p>
            </div>
        </section>

        {/* NEWS GRID */}
        <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {NEWS.map((item) => (
                    <Card key={item.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all">
                        <div className="relative h-48 overflow-hidden">
                            <Image 
                                src={item.img} 
                                alt={item.title} 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-black/70 hover:bg-black text-white backdrop-blur">{item.category}</Badge>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {item.date}</span>
                                <span className="flex items-center gap-1"><User className="w-3 h-3"/> {item.author}</span>
                            </div>
                            <h3 className="text-xl font-bold font-headline mb-2 group-hover:text-primary transition-colors leading-tight">
                                {item.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-3">
                                {item.excerpt}
                            </p>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                            <a href={`/news/${item.id}`} className="text-sm font-bold text-primary hover:underline uppercase tracking-widest">
                                Baca Selengkapnya →
                            </a>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
