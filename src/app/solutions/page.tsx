import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Solusi & Inovasi | Kultur Juara Indonesia",
    description: "Layanan dan produk teknologi pendidikan dan olahraga dari Kultur Juara Indonesia.",
};

export default function SolutionsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-24 md:py-32 max-w-5xl">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">Solusi &amp; Inovasi</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Mengintegrasikan inovasi teknologi untuk mendefinisikan ulang standar pembinaan olahraga dan manajemen sekolah.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Edutech Section */}
                    <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col">
                        <div className="p-6 md:p-8 space-y-4 flex-grow">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary mb-2">Edutech</div>
                            <h2 className="text-2xl font-bold">Manajemen Pendidikan Terdigitalisasi</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Solusi komprehensif untuk sekolah tingkat SD dan SMP. Kami mengembangkan Sistem Informasi Manajemen (SIM) Sekolah terpadu yang selaras dengan implementasi Kurikulum Merdeka.
                            </p>
                            <ul className="space-y-2 mt-4 text-sm">
                                <li className="flex gap-2"><span>✓</span> Integrasi data akademik (Dapodik &amp; e-Rapor)</li>
                                <li className="flex gap-2"><span>✓</span> Pemantauan Capaian Pembelajaran (CP) <em>real-time</em></li>
                                <li className="flex gap-2"><span>✓</span> Arsitektur UI/UX lincah (<em>zero error</em>)</li>
                            </ul>
                        </div>
                        <div className="p-6 pt-0 mt-auto">
                            <a href="https://school.kulturjuara.org" target="_blank" rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full transition-colors">
                                Kunjungi Portal Sekolah (School)
                            </a>
                        </div>
                    </div>

                    {/* Sport-tech Section */}
                    <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col">
                        <div className="p-6 md:p-8 space-y-4 flex-grow">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary mb-2">Sport-Tech</div>
                            <h2 className="text-2xl font-bold">Ekosistem Olahraga &amp; Komunitas</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Program pembinaan karakter dan manajemen turnamen yang menjunjung tinggi <em>fair play</em>. Memanfaatkan analitik data untuk menemukan dan membina bakat baru secara transparan.
                            </p>
                            <ul className="space-y-2 mt-4 text-sm">
                                <li className="flex gap-2"><span>✓</span> <em>Digital Drawing System &amp; Live Score</em></li>
                                <li className="flex gap-2"><span>✓</span> Pemetaan wilayah potensial (GIS)</li>
                                <li className="flex gap-2"><span>✓</span> Manajemen performa &amp; <em>sport science</em></li>
                            </ul>
                        </div>
                        <div className="p-6 pt-0 flex gap-3 mt-auto">
                            <a href="https://academy.kulturjuara.org" target="_blank" rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full transition-colors">
                                Portal Akademi
                            </a>
                            <a href="https://event.kulturjuara.org" target="_blank" rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full transition-colors">
                                Sistem Event
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
