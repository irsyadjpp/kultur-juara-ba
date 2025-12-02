
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

export default function ManagerDownloadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dokumen & Unduh</h1>
        <p className="text-muted-foreground">Unduh ID Card, kwitansi, dan dokumen penting lainnya di sini.</p>
      </div>
      <Card className="border-dashed">
        <CardContent className="p-8 text-center text-muted-foreground">
          <Download className="w-8 h-8 mx-auto mb-2" />
          <p>Fitur ini akan tersedia setelah pembayaran terverifikasi.</p>
        </CardContent>
      </Card>
    </div>
  );
}
