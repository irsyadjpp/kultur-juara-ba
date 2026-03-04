import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tentang Kami | Kultur Juara Indonesia",
    description: "Menjembatani Idealisme dengan Eksekusi Nyata untuk Generasi Masa Depan",
};

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">

                    {/* Header Section */}
                    <div className="space-y-6 text-center mb-16">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">
                            Tentang Kultur Juara Indonesia
                        </h1>
                        <p className="text-xl md:text-2xl italic text-muted-foreground font-medium">
                            &ldquo;Menjembatani Idealisme dengan Eksekusi Nyata untuk Generasi Masa Depan&rdquo;
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-8 text-lg leading-relaxed text-foreground/90 md:text-justify">
                        <p>
                            Kultur Juara Indonesia lahir dari sebuah visi yang jernih: kami ingin membangun ekosistem di mana potensi setiap anak bangsa dapat dikembangkan secara terukur, transparan, dan berintegritas. Kami adalah sebuah gerakan dan inovator yang berfokus pada dua pilar fundamental pembentuk karakter generasi muda:{' '}
                            <strong className="text-primary">olahraga</strong> dan{' '}
                            <strong className="text-primary">pendidikan</strong>.
                        </p>

                        <p>
                            Berangkat dari semangat untuk merevolusi ekosistem pembinaan talenta, kami memadukan nilai-nilai luhur olahraga—seperti disiplin, sportivitas, dan daya juang—dengan pendekatan berbasis data (<em>sport-tech</em>). Melalui program pembinaan karakter, penyelenggaraan ajang kompetisi yang menjunjung tinggi <em>fair play</em> (termasuk di cabang-cabang populer seperti bulu tangkis), hingga pemetaan potensi berbasis wilayah, kami berkomitmen untuk melahirkan para juara sejati, baik di dalam maupun di luar lapangan.
                        </p>

                        <p>
                            Namun, kami menyadari bahwa membangun generasi juara tidak berhenti di lapangan olahraga. Ruang gerak kami kini meluas ke jantung pembentukan karakter:{' '}
                            <strong className="text-primary">pendidikan formal dasar dan menengah (SD &amp; SMP)</strong>.
                        </p>

                        <div className="bg-muted/50 p-6 md:p-8 rounded-2xl border border-border/50 my-10">
                            <p>
                                Kami hadir untuk mewujudkan <em>Educational Excellence</em> dengan menjadi katalisator digitalisasi sekolah. Melalui pengembangan Sistem Informasi Manajemen (SIM) sekolah yang cerdas, lincah, dan terintegrasi dengan standar kurikulum nasional (Kurikulum Merdeka), kami membantu institusi pendidikan bertransformasi. Teknologi yang kami bangun—dengan mengadopsi infrastruktur modern dan inisiatif <em>Artificial Intelligence</em>—dirancang agar para pendidik dapat fokus pada esensi mengajar dan capaian pembelajaran siswa, sementara sistem kami menangani efisiensi administratif secara akurat dan <em>zero error</em>.
                            </p>
                        </div>

                        <p>
                            Jantung dari setiap langkah Kultur Juara Indonesia adalah{' '}
                            <strong className="text-primary">Data Intelligence</strong>. Baik dalam menganalisis performa seorang atlet muda maupun memantau perkembangan akademik seorang siswa, kami memastikan setiap keputusan berlandaskan pada data yang valid dan aman.
                        </p>

                        <div className="pt-12 text-center border-t mt-12">
                            <p className="font-semibold text-primary text-xl md:text-2xl leading-snug">
                                Di Kultur Juara Indonesia, kami tidak sekadar menjalankan program kepemudaan atau membangun perangkat lunak pendidikan. Kami sedang merancang sebuah ekosistem berkelanjutan di mana setiap anak, baik di lapangan olahraga maupun di ruang kelas, memiliki landasan yang setara untuk bertumbuh, belajar, dan meraih gelar juara di jalan hidupnya masing-masing.
                            </p>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="mt-24">
                        <div className="text-center mb-12">
                            <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-3">People Behind the Mission</p>
                            <h2 className="text-3xl md:text-4xl font-black font-headline">Tim Inti Kami</h2>
                            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                                Perpaduan antara praktisi olahraga berpengalaman, pendidik berdedikasi, dan insinyur teknologi yang satu visi.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { name: 'Irsyad Putra', role: 'Founder & Tech Lead', initials: 'IP' },
                                { name: 'Muhammad Bilal Digdaya', role: 'Head of Sport Science', initials: 'MB' },
                                { name: 'Siti Rahayu', role: 'Head of Edutech', initials: 'SR' },
                                { name: 'Fajar Maulana', role: 'Community & Events', initials: 'FM' },
                            ].map((member, i) => (
                                <div key={i} className="flex flex-col items-center text-center gap-3">
                                    <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-2xl font-black text-primary">
                                        {member.initials}
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">{member.name}</p>
                                        <p className="text-sm text-muted-foreground">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}

