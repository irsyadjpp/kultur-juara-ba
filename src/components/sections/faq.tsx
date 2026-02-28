'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
    {
        question: "Bagaimana cara sekolah saya menggunakan SIM Edutech Kultur Juara?",
        answer: "Sekolah Anda dapat menghubungi tim kemitraan kami melalui email atau nomor telepon yang tertera. Kami akan mengatur jadwal presentasi dan trial sistem untuk memastikan fitur-fitur yang kami tawarkan selaras dengan kebutuhan implementasi Kurikulum Merdeka di sekolah Anda.",
    },
    {
        question: "Apakah sistem manajemen turnamen (Event) bisa digunakan untuk cabor selain bulu tangkis?",
        answer: "Saat ini, arsitektur dasar sistem kami memang dirancang sangat optimal untuk bulu tangkis (mengadopsi standar internasional). Namun, teknologi digital drawing dan live score kami sedang terus dikembangkan agar adaptif untuk cabang olahraga raket lainnya di masa depan.",
    },
    {
        question: "Apakah data akademik siswa dan profil atlet dijamin keamanannya?",
        answer: "Tentu. Keamanan data (Data Safeguarding) adalah prioritas absolut kami. Sistem kami dirancang dengan standar enkripsi terkini dan mematuhi regulasi Perlindungan Data Pribadi (PDP). Kami memastikan bahwa data akademik siswa dan profil talenta komunitas hanya diakses oleh pihak yang memiliki otoritas.",
    },
    {
        question: "Bagaimana cara mendaftarkan anak saya ke portal Akademi?",
        answer: "Anda dapat langsung mengunjungi portal academy.kulturjuara.org untuk melihat jadwal, kuota program pembinaan (seperti U9, U11, hingga kelas Elite), dan melakukan pendaftaran serta evaluasi performa anak secara sepenuhnya digital.",
    },
];

export function FaqSection() {
    return (
        <section className="py-24 bg-secondary/30 rounded-t-[3rem]">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 text-primary border-primary/30">Pusat Bantuan</Badge>
                    <h2 className="text-3xl md:text-5xl font-black font-headline uppercase mb-4">
                        Pertanyaan <span className="text-primary">Umum</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Temukan jawaban mengenai operasional dan integrasi sistem ekosistem Kultur Juara Indonesia.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="bg-background border rounded-2xl px-6 shadow-sm">
                            <AccordionTrigger className="text-left font-bold text-lg hover:no-underline hover:text-primary transition-colors py-6">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pt-0">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
