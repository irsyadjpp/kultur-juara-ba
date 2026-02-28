import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Card, CardContent } from "@/components/ui/card";
import { Building, Mail, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kontak | Kultur Juara Indonesia",
    description: "Hubungi Kultur Juara Indonesia untuk informasi kemitraan pendidikan dan olahraga.",
};

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-24 md:py-32 max-w-5xl">
                <div className="flex flex-col gap-16 max-w-4xl mx-auto w-full">
                    {/* Header + Contact Info */}
                    <div className="space-y-10 text-center">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-primary">Hubungi Kami</h1>
                            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                                Mari berdiskusi tentang bagaimana sistem dan ekosistem kami dapat mentransformasi sekolah atau komunitas Anda.
                            </p>
                        </div>

                        <Card className="border-none shadow-2xl bg-card rounded-[2.5rem] overflow-hidden">
                            <CardContent className="p-8 md:p-12">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="flex flex-col items-center gap-4 text-center">
                                        <div className="p-4 bg-primary/10 rounded-2xl text-primary shrink-0">
                                            <Building className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Pusat Operasional</h4>
                                            <p className="text-muted-foreground text-sm">Kultur Juara Indonesia<br />Bandung, Jawa Barat</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-4 text-center">
                                        <div className="p-4 bg-primary/10 rounded-2xl text-primary shrink-0">
                                            <Mail className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Email Kemitraan</h4>
                                            <a href="mailto:kemitraan@kulturjuara.org" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                                                kemitraan@kulturjuara.org
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-4 text-center">
                                        <div className="p-4 bg-primary/10 rounded-2xl text-primary shrink-0">
                                            <Phone className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">WhatsApp</h4>
                                            <a href="https://wa.me/6285121374644" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                                                +62 851-2137-4644
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Large Form Section */}
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-black font-headline uppercase tracking-tight">Kirim <span className="text-primary">Pesan</span></h2>
                            <p className="text-muted-foreground mt-2">Tim kami akan merespons permintaan Anda dalam 1x24 jam.</p>
                        </div>
                        <div className="rounded-[3rem] border bg-card/50 backdrop-blur-sm text-card-foreground shadow-2xl p-8 md:p-12 border-primary/5">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
