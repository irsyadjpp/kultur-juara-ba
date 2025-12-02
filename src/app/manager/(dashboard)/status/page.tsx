
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function ManagerStatusPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Status & Verifikasi</h1>
        <p className="text-muted-foreground">Pantau status pembayaran dan hasil verifikasi TPF pemain Anda.</p>
      </div>
      <Card className="border-dashed">
        <CardContent className="p-8 text-center text-muted-foreground">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p>Fitur ini sedang dalam pengembangan.</p>
        </CardContent>
      </Card>
    </div>
  );
}
