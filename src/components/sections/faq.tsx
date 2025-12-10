
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function FaqSection() {
    const faqItems = [
        {
            q: "Bolehkah mengganti pasangan setelah mendaftar?",
            a: "Boleh, dengan syarat penggantian dilakukan maksimal H-7 sebelum hari pertandingan dan level pemain pengganti tidak mengubah kategori pasangan yang sudah terdaftar."
        },
        {
            q: "Bagaimana cara melakukan pembayaran pendaftaran?",
            a: "Setelah manajer mendaftarkan tim dan kategori, setiap pemain yang diundang akan mendapatkan link personal untuk membuat akun dan melakukan pembayaran biaya pendaftaran secara online (QRIS/Virtual Account)."
        },
    ]
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <HelpCircle className="w-8 h-8 text-primary"/>
            </div>
            <h2 className="text-3xl font-bold font-headline">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg border shadow-sm">
                    <AccordionTrigger className="p-6 text-left font-bold text-lg hover:no-underline">
                        {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        {item.a}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </section>
  );
}
