
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function CorrespondencePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black font-headline">Surat-Menyurat</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Pusat Korespondensi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Halaman ini dalam pengembangan. Di sini akan menjadi pusat untuk template surat,
            surat keluar, dan arsip korespondensi digital.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
