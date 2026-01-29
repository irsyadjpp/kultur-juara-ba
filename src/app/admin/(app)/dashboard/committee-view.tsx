
'use client';

import { 
  Users, ShieldCheck, Star, 
  BarChart, Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// MOCK DATA FOR ACADEMY DASHBOARD
const ACADEMY_STATS = {
  totalAthletes: 45,
  activeAthletes: 42,
  eliteAthletes: 8,
  upcomingEvaluations: 5,
};

const recentActivities = [
    { type: "NEW_ATHLETE", desc: "Registrasi Baru: Budi Santoso (U-13)", time: "15m ago", status: "NEW"},
    { type: "EVALUATION", desc: "Evaluasi Fisik: Kevin Sanjaya", time: "1h ago", status: "COMPLETED"},
    { type: "LOG", desc: "Log Latihan: Siti Fadia (Teknik)", time: "2h ago", status: "LOGGED"},
    { type: "ALERT", desc: "Mental Journal: Indikasi burnout terdeteksi pada 1 atlet.", time: "4h ago", status: "FLAGGED"},
];

export default function AcademyDashboard() {

  return (
    <div className="space-y-8">
       <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline tracking-tight">Academy Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan aktivitas dan data atlet di Kultur Juara Academy.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Atlet</CardTitle>
              <Users className="h-5 w-5 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{ACADEMY_STATS.totalAthletes}</div>
              <p className="text-xs text-muted-foreground">atlet terdaftar</p>
            </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atlet Aktif</CardTitle>
              <ShieldCheck className="h-5 w-5 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{ACADEMY_STATS.activeAthletes}</div>
              <p className="text-xs text-muted-foreground">mengikuti program</p>
            </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kelompok Elite</CardTitle>
              <Star className="h-5 w-5 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{ACADEMY_STATS.eliteAthletes}</div>
              <p className="text-xs text-muted-foreground">potensi tinggi</p>
            </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jadwal Evaluasi</CardTitle>
              <BarChart className="h-5 w-5 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{ACADEMY_STATS.upcomingEvaluations}</div>
              <p className="text-xs text-muted-foreground">akan datang minggu ini</p>
            </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Activity className="w-5 h-5"/>
                    Aktivitas Terbaru
                </CardTitle>
                <CardDescription>Log kejadian penting dari sistem akademi.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                {recentActivities.map((act, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                        <div>
                            <div className="font-bold text-white text-sm">{act.desc}</div>
                            <div className="text-xs text-muted-foreground">{act.time}</div>
                        </div>
                        <div>
                            {act.status === 'NEW' && <Badge variant="outline" className="text-blue-400 border-blue-400/30">{act.type}</Badge>}
                            {act.status === 'COMPLETED' && <Badge variant="outline" className="text-green-400 border-green-400/30">{act.type}</Badge>}
                            {act.status === 'LOGGED' && <Badge variant="secondary" className="text-zinc-400 border-zinc-700">{act.type}</Badge>}
                            {act.status === 'FLAGGED' && <Badge variant="destructive" className="bg-red-500/10 text-red-500">{act.type}</Badge>}
                        </div>
                    </div>
                ))}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
