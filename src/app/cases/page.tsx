import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getCases } from '@/lib/content';
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Studi Kasus | Kultur Juara Indonesia",
    description: "Dampak nyata dari ekosistem teknologi dan pembinaan Kultur Juara Indonesia.",
};

export default function CasesPage() {
    const cases = getCases();

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-24 md:py-32 max-w-4xl">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">Studi Kasus</h1>
                    <p className="text-xl text-muted-foreground">
                        Melihat langsung bagaimana ekosistem teknologi dan pembinaan kami menciptakan dampak nyata. Dari efisiensi ruang kelas hingga transparansi di lapangan.
                    </p>
                </div>

                {cases.length === 0 ? (
                    <p className="text-center text-muted-foreground">Belum ada studi kasus yang tersedia.</p>
                ) : (
                    <div className="space-y-6">
                        {cases.map((c) => (
                            <Link key={c.slug} href={`/cases/${c.slug}`} className="block group">
                                <div className="rounded-xl border bg-card text-card-foreground shadow p-6 md:p-8 group-hover:border-primary/50 group-hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-muted text-muted-foreground">
                                            {c.category}
                                        </div>
                                        <span className="text-xs text-muted-foreground">{c.date}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {c.title}
                                    </h2>
                                    <p className="text-muted-foreground mb-4 line-clamp-2">{c.description}</p>
                                    <p className="text-sm font-semibold text-primary">Baca Studi Kasus →</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
