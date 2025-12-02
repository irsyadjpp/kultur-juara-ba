
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function ManagerPlayersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Data Pemain</h1>
        <p className="text-muted-foreground">Lihat dan kelola semua pemain yang terdaftar dalam tim Anda.</p>
      </div>
      <Card className="border-dashed">
        <CardContent className="p-8 text-center text-muted-foreground">
          <Users className="w-8 h-8 mx-auto mb-2" />
          <p>Fitur ini sedang dalam pengembangan.</p>
        </CardContent>
      </Card>
    </div>
  );
}
