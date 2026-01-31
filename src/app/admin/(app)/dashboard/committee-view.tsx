'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Dumbbell, Calendar, BarChartHorizontalBig } from "lucide-react";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from 'firebase/firestore';

export default function CommitteeDashboard() {
  const firestore = useFirestore();

  const athletesQuery = useMemoFirebase(() => firestore ? collection(firestore, 'athletes') : null, [firestore]);
  const programsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'training-programs') : null, [firestore]);

  const { data: athletesData } = useCollection(athletesQuery);
  const { data: programsData } = useCollection(programsQuery);

  const activeAthletes = athletesData?.filter(a => a.status_aktif === 'AKTIF').length || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black font-headline tracking-tight uppercase">Dashboard Utama</h1>
        <p className="text-muted-foreground text-lg">Selamat datang di Panel Admin Kultur Juara.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Atlet Aktif
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{activeAthletes}</div>
            <p className="text-xs text-muted-foreground">
              Atlet terdaftar di akademi.
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sesi Latihan Terjadwal
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">32</div>
            <p className="text-xs text-muted-foreground">
              Total sesi untuk bulan ini.
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Program Latihan</CardTitle>
            <BarChartHorizontalBig className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{programsData?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Program latihan telah dibuat.
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Log aktivitas dari seluruh sistem akan muncul di sini.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground text-sm font-medium">Belum ada aktivitas terbaru.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
