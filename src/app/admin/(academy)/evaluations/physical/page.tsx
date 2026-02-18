
import { getAthletesForSelect } from "../actions";
import PhysicalEvaluationForm from "./physical-form";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Evaluasi Fisik | Kultur Juara",
  description: "Formulir evaluasi fisik atlet",
};

export default async function PhysicalEvaluationPage() {
  const athletes = await getAthletesForSelect();

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM PENILAIAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
          Evaluasi Fisik Atlet (Bulanan)
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
          Formulir ini digunakan untuk memantau progres fisik atlet secara kuantitatif sesuai standar sport science.
        </p>
      </div>

      <PhysicalEvaluationForm athletes={athletes} />
    </div>
  );
}
