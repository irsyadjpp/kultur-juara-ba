'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Award, BrainCircuit, ShieldCheck } from "lucide-react";

export function WhyJoinSection() {
    const points = [
        {
            icon: BrainCircuit,
            title: "Berbasis Data & Analitik",
            desc: "Setiap keputusan, pemetaan potensi wilayah, hingga evaluasi perkembangan anak didasarkan pada analitik data yang valid dan transparan.",
            bg: "bg-blue-500 text-white",
        },
        {
            icon: ShieldCheck,
            title: "Operasional Tanpa Kesalahan",
            desc: "Kami membangun infrastruktur teknologi yang lincah dan aman untuk meminimalkan kesalahan administratif, baik di sekolah maupun di turnamen.",
            bg: "bg-primary text-black",
        },
        {
            icon: Award,
            title: "Karakter Sebagai Fondasi",
            desc: "Lebih dari sekadar mencetak nilai akademik atau medali, fokus utama kami adalah membentuk mentalitas juara yang menjunjung tinggi integritas.",
            bg: "bg-yellow-400 text-black",
        },
    ];

    return (
        <section className="py-24 bg-secondary/30 rounded-t-[3rem] -mt-10">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black font-headline mb-6 uppercase">
                        Kenapa Memilih <span className="text-primary">Kultur Juara?</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                        Ekosistem terpadu yang memadukan inovasi teknologi dengan nilai-nilai luhur olahraga untuk mencetak generasi masa depan.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {points.map((item, idx) => (
                        <Card key={idx} className="group relative border-none overflow-hidden rounded-[2.5rem] bg-background shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className={`h-3 ${item.bg.split(' ')[0]} w-full`} />
                            <CardContent className="p-8 pt-12 relative">
                                <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition-transform`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold font-headline mb-4">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {item.desc}
                                </p>
                                <div className="absolute bottom-0 right-0 p-8 opacity-5">
                                    <item.icon className="w-32 h-32" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
