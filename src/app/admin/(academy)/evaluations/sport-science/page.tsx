import { getAthletesForSelect } from "../actions";
import { SportScienceForm } from "./sport-science-form";

export const metadata = {
    title: "Profil Sport Science | Kultur Juara",
    description: "Evaluasi komprehensif 13 pilar sport science untuk atlet bulutangkis",
};

export default async function SportSciencePage() {
    const athletes = await getAthletesForSelect();

    return (
        <div className="space-y-8 p-4 md:p-0">
            <div className="space-y-2">
                <span className="inline-block bg-primary/10 text-primary border border-primary/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Form Evaluasi
                </span>
                <h1 className="text-3xl md:text-5xl font-black font-headline uppercase tracking-tighter text-foreground leading-none">
                    SPORT SCIENCE<br />
                    <span className="text-primary">PROFILING</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl text-base">
                    Isi evaluasi komprehensif 13 pilar sport science untuk membangun profil atlet yang andal secara ilmiah. Semua field opsional — isi sesuai data yang tersedia.
                </p>
            </div>

            <SportScienceForm athletes={athletes} />
        </div>
    );
}
