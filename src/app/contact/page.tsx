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
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">Hubungi Kami</h1>
                            <p className="text-lg text-muted-foreground">
                                Mari berdiskusi tentang bagaimana sistem dan ekosistem kami dapat mentransformasi sekolah atau komunitas Anda.
                            </p>
                        </div>

                        <Card className="border-none shadow-xl bg-card rounded-3xl overflow-hidden">
                            <CardContent className="p-8 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                                        <Building className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Pusat Operasional</h4>
                                        <p className="text-muted-foreground">Kultur Juara Indonesia<br />Bandung, Jawa Barat, Indonesia</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Email Kemitraan</h4>
                                        <a href="mailto:kemitraan@kulturjuara.org" className="text-muted-foreground hover:text-primary transition-colors">
                                            kemitraan@kulturjuara.org
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">WhatsApp</h4>
                                        <a href="https://wa.me/6285121374644" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                            +62 851-2137-4644
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Form */}
                    <div className="rounded-xl border bg-card text-card-foreground shadow p-6 md:p-8">
                        <h2 className="text-xl font-bold mb-6">Kirim Pesan</h2>
                        <ContactForm />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
