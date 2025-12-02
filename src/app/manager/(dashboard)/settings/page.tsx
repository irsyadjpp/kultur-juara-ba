
import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function ManagerSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Pengaturan Akun</h1>
        <p className="text-muted-foreground">Perbarui data kontak atau ganti password Anda.</p>
      </div>
      <Card className="border-dashed">
        <CardContent className="p-8 text-center text-muted-foreground">
          <Settings className="w-8 h-8 mx-auto mb-2" />
          <p>Fitur ini sedang dalam pengembangan.</p>
        </CardContent>
      </Card>
    </div>
  );
}
