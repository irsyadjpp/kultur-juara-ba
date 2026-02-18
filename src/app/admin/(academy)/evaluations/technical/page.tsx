
import { getAthletesForSelect } from "../actions";
import TechnicalEvaluationForm from "./technical-form";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Evaluasi Teknik | Kultur Juara",
  description: "Formulir evaluasi teknik badminton",
};

export default async function TechnicalEvaluationPage() {
  const athletes = await getAthletesForSelect();

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* HEADER */}
      <div className="space-y-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">FORM PENILAIAN</Badge>
        <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-foreground">
          Evaluasi Teknik Badminton
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
          Formulir untuk penilaian subjektif dan objektif dari kemampuan teknis atlet.
        </p>
      </div>

      <TechnicalEvaluationForm athletes={athletes} />
    </div>
  );
}
