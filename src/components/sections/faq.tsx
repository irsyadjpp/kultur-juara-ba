
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
    const items = [
        {
            q: "Bagaimana cara mendaftar di Kultur Juara Academy?",
            a: "Anda dapat menghubungi kami melalui formulir kontak di website ini atau datang langsung ke lokasi latihan kami di GOR Sutta saat jam operasional untuk pendaftaran dan informasi lebih lanjut."
        },
        {
            q: "Apakah tersedia kelas percobaan (trial class)?",
            a: "Ya, kami menyediakan satu sesi kelas percobaan gratis bagi calon atlet. Silakan hubungi admin kami via WhatsApp untuk menjadwalkan sesi trial Anda."
        },
        {
            q: "Apa saja kelompok umur yang tersedia di akademi?",
            a: "Saat ini kami membuka tiga kelompok utama: U-13 (Sekolah Dasar), U-17 (SMP-SMA), dan Kelas Dewasa untuk pemain hobi atau mereka yang ingin menjaga kebugaran."
        },
        {
            q: "Berapa biaya bulanan dan apa saja yang termasuk?",
            a: "Biaya bulanan adalah Rp 500.000 per atlet. Biaya ini sudah termasuk 8 sesi latihan terjadwal setiap bulan dan shuttlecock yang digunakan selama latihan."
        }
    ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-black font-headline text-center mb-12 uppercase">
            FAQ
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
            {items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-secondary rounded-3xl border-none px-6">
                    <AccordionTrigger className="text-lg font-bold py-6 hover:no-underline hover:text-primary text-left">
                        {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-lg pb-6 leading-relaxed">
                        {item.a}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </section>
  );
}
