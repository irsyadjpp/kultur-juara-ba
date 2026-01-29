
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
        <h1 className="text-3xl font-black font-headline tracking-tight text-white">Academy Dashboard</h1>
        <p className="text-zinc-400">Ringkasan aktivitas dan data atlet di Kultur Juara Academy.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Updated Stat Cards with Glassmorphism and new layout */}
        <Card className="bg-zinc-900/50 backdrop-blur-sm border-border/20 p-2 rounded-[28px] overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
          <CardContent className="p-4 flex items-center gap-4 relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-zinc-800 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Atlet</p>
              <p className="text-3xl font-black text-white">{ACADEMY_STATS.totalAthletes}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 backdrop-blur-sm border-border/20 p-2 rounded-[28px] overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all"></div>
          <CardContent className="p-4 flex items-center gap-4 relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-zinc-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Atlet Aktif</p>
              <p className="text-3xl font-black text-white">{ACADEMY_STATS.activeAthletes}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 backdrop-blur-sm border-border/20 p-2 rounded-[28px] overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all"></div>
          <CardContent className="p-4 flex items-center gap-4 relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-zinc-800 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Kelompok Elite</p>
              <p className="text-3xl font-black text-white">{ACADEMY_STATS.eliteAthletes}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 backdrop-blur-sm border-border/20 p-2 rounded-[28px] overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
          <CardContent className="p-4 flex items-center gap-4 relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-zinc-800 flex items-center justify-center">
              <BarChart className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Jadwal Evaluasi</p>
              <p className="text-3xl font-black text-white">{ACADEMY_STATS.upcomingEvaluations}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900/50 backdrop-blur-sm border-border/20 rounded-[40px]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                    <Activity className="w-5 h-5"/>
                    Aktivitas Terbaru
                </CardTitle>
                <CardDescription>Log kejadian penting dari sistem akademi.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <div className="space-y-3">
                {recentActivities.map((act, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-border/10 shadow-sm">
                        <div>
                            <div className="font-bold text-white text-sm">{act.desc}</div>
                            <div className="text-xs text-zinc-400">{act.time}</div>
                        </div>
                        <div>
                            {act.status === 'NEW' && <Badge variant="outline" className="text-blue-400 border-blue-400/30 bg-blue-500/10">{act.type}</Badge>}
                            {act.status === 'COMPLETED' && <Badge variant="outline" className="text-green-400 border-green-400/30 bg-green-500/10">{act.type}</Badge>}
                            {act.status === 'LOGGED' && <Badge variant="secondary" className="text-zinc-400 border-zinc-700 bg-zinc-900">{act.type}</Badge>}
                            {act.status === 'FLAGGED' && <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20">{act.type}</Badge>}
                        </div>
                    </div>
                ))}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
