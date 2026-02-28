import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Karir | Kultur Juara Indonesia",
    description: "Bergabunglah bersama Kultur Juara Indonesia untuk merevolusi ekosistem pendidikan dan olahraga.",
};

const jobs = [
    { title: "Kepala Divisi Keuangan (Bendahara)", type: "Penuh Waktu", department: "Administrasi & Kepatuhan" },
    { title: "Kepala Divisi Administrasi (Sekretaris Eksekutif)", type: "Penuh Waktu", department: "Administrasi & Kepatuhan" },
    { title: "Analis Data Utama", type: "Penuh Waktu", department: "Teknologi Informasi & Kecerdasan Data" },
    { title: "Petugas Perlindungan Anak & Atlet", type: "Paruh Waktu / Kontrak", department: "Performa & Kurikulum" },
];

export default function CareersPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-24 md:py-32 max-w-4xl">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">Bergabung Bersama Kami</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Kami selalu mencari individu yang memiliki idealisme tinggi dan kemampuan eksekusi yang tajam untuk bersama-sama merevolusi ekosistem pendidikan dan olahraga di Indonesia.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-6">Posisi Terbuka Saat Ini</h2>
                    {jobs.map((job, index) => (
                        <div key={index} className="rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                            <div>
                                <h3 className="text-lg font-bold">{job.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{job.department} · {job.type}</p>
                            </div>
                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 shrink-0 transition-colors">
                                Lihat Detail
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-muted rounded-xl text-center">
                    <p className="text-muted-foreground">
                        Tidak menemukan posisi yang pas namun merasa cocok dengan visi kami?<br />
                        Kirimkan profil Anda ke <strong className="text-foreground">karir@kulturjuara.org</strong>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
