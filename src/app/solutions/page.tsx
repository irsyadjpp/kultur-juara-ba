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

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Pilar 1: Ekskul */}
                    <div id="ekskul" className="rounded-xl border bg-card text-card-foreground shadow flex flex-col hover:border-purple-500/50 transition-colors">
                        <div className="p-6 md:p-8 space-y-4 flex-grow">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-purple-500/10 text-purple-600 mb-2">Pilar 1</div>
                            <h2 className="text-2xl font-bold">Pengelolaan Ekskul Bulu Tangkis</h2>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                Membangun pondasi dasar bulu tangkis yang terintegrasi di lingkungan sekolah. Mendorong minat bakat siswa secara inklusif dan menyenangkan.
                            </p>
                            <ul className="space-y-2 mt-4 text-sm text-muted-foreground">
                                <li className="flex gap-2"><span>✅</span> Pemantauan progres motorik anak</li>
                                <li className="flex gap-2"><span>✅</span> Pengenalan budaya kompetisi sehat</li>
                                <li className="flex gap-2"><span>✅</span> Ekstrakurikuler terpadu &amp; terukur</li>
                            </ul>
                        </div>
                        <div className="p-6 pt-0 mt-auto">
                            <a href="mailto:admin@kulturjuara.org"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-secondary h-10 px-4 py-2 w-full transition-colors">
                                Hubungi untuk Kerjasama
                            </a>
                        </div>
                    </div>

                    {/* Pilar 2: Academy */}
                    <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col hover:border-blue-500/50 transition-colors">
                        <div className="p-6 md:p-8 space-y-4 flex-grow">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-500/10 text-blue-600 mb-2">Pilar 2</div>
                            <h2 className="text-2xl font-bold">Kultur Juara Badminton Academy</h2>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                Pembinaan intensif dengan pendekatan <em>sport science</em> untuk mencetak atlet profesional dengan karakter tangguh tak tertandingi.
                            </p>
                            <ul className="space-y-2 mt-4 text-sm text-muted-foreground">
                                <li className="flex gap-2"><span>✅</span> Program terstruktur oleh pelatih elit</li>
                                <li className="flex gap-2"><span>✅</span> <em>Digital Drawing &amp; Live Score</em> kompetisi</li>
                                <li className="flex gap-2"><span>✅</span> Analisis performa &amp; nutrisi atlet</li>
                            </ul>
                        </div>
                        <div className="p-6 pt-0 mt-auto">
                            <a href="https://academy.kulturjuara.org" target="_blank" rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-blue-500/20 bg-blue-50 hover:bg-blue-100 text-blue-700 h-10 px-4 py-2 w-full transition-colors">
                                Portal Akademi
                            </a>
                        </div>
                    </div>

                    {/* Pilar 3: School */}
                    <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col hover:border-green-500/50 transition-colors">
                        <div className="p-6 md:p-8 space-y-4 flex-grow">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-500/10 text-green-600 mb-2">Pilar 3</div>
                            <h2 className="text-2xl font-bold">Manajemen Sekolah Terpadu</h2>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                Platform <em>end-to-end</em> untuk digitalisasi operasional sekolah dari perancangan Capaian Pembelajaran (CP) hingga pencetakan rapor digital.
                            </p>
                            <ul className="space-y-2 mt-4 text-sm text-muted-foreground">
                                <li className="flex gap-2"><span>✅</span> Sinkronisasi kurikulum Merdeka</li>
                                <li className="flex gap-2"><span>✅</span> Penilaian formatif &amp; sumatif terpusat</li>
                                <li className="flex gap-2"><span>✅</span> UI/UX lincah tanpa latensi (<em>zero error</em>)</li>
                            </ul>
                        </div>
                        <div className="p-6 pt-0 mt-auto">
                            <a href="https://school.kulturjuara.org" target="_blank" rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-green-500/20 bg-green-50 hover:bg-green-100 text-green-700 h-10 px-4 py-2 w-full transition-colors">
                                Portal Sekolah
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
