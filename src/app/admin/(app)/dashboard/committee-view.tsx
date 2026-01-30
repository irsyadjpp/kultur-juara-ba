'use client';

import { 
  Users, ShieldCheck, Star, 
  BarChart, Activity, Award, Leaf, ClipboardCheck, Wallet, Landmark
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// MOCK DATA FOR ACADEMY DASHBOARD
const ACADEMY_STATS = {
  totalAthletes: 45,
  activeAthletes: 42,
  eliteAthletes: 8,
  upcomingEvaluations: 5,
};

const attendanceToday = {
  rate: 90,
  absent: [
    { name: 'Siti Fadia', reason: 'Sakit', avatar: 'SF' },
    { name: 'Budi Santoso', reason: 'Izin', avatar: 'BS' },
  ]
};

const recentActivities = [
    { type: "EVAL_MENTAL", desc: "Jurnal Mental Baru: 'Merasa lelah & kurang motivasi'", time: "5m ago", status: "FLAGGED", user: "Psikolog" },
    { type: "ATTENDANCE", desc: "Siti Fadia ditandai 'Sakit' untuk sesi pagi.", time: "15m ago", status: "LOGGED", user: "Coach A." },
    { type: "EVAL_FISIK", desc: "Evaluasi Fisik U-13 Selesai (5 atlet)", time: "1h ago", status: "COMPLETED", user: "Coach B." },
    { type: "TRAINING_LOG", desc: "Log Latihan Teknik: Kevin Sanjaya (Netting)", time: "2h ago", status: "LOGGED", user: "Coach C." },
];

const impactIndicators = {
  social: ["Keluarga Prasejahtera", "Konsistensi Kehadiran", "Kepercayaan Diri"],
  character: ["Sportivitas", "Kerja Sama Tim", "Tanggung Jawab"],
  finance: ["Kebiasaan Menabung", "Pemahaman Keuangan", "Partisipasi Orang Tua"],
  environment: ["Pengurangan Sampah Plastik", "Kebersihan Lapangan", "Partisipasi Aksi Lingkungan"],
  governance: ["Jadwal Konsisten", "Laporan Rutin", "Pelibatan Orang Tua"],
}

export default function AcademyDashboard() {

  return (
    <div className="space-y-8">
       <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline tracking-tight text-foreground">Academy Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan aktivitas dan data atlet di Kultur Juara Academy.</p>
      </div>
      
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card/80 backdrop-blur-sm border p-2 rounded-[28px] overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
          <CardContent className="p-4 flex items-center gap-4 relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Atlet</p>
              <p className="text-3xl font-black text-foreground">{ACADEMY_STATS.totalAthletes}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur-sm border p-2 rounded-[28px] overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all"></div>
          <CardContent className="p-4 flex items-center gap-4 relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Atlet Aktif</p>
              <p className="text-3xl font-black text-foreground">{ACADEMY_STATS.activeAthletes}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur-sm border p-2 rounded-[28px] overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all"></div>
          <CardContent className="p-4 flex items-center gap-4 relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Kelompok Elite</p>
              <p className="text-3xl font-black text-foreground">{ACADEMY_STATS.eliteAthletes}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur-sm border p-2 rounded-[28px] overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-all"></div>
          <CardContent className="p-4 flex items-center gap-4 relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center">
              <BarChart className="w-6 h-6 text-sky-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Jadwal Evaluasi</p>
              <p className="text-3xl font-black text-foreground">{ACADEMY_STATS.upcomingEvaluations}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column for main monitoring cards */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* New Daily Attendance Card */}
            <Card className="bg-card/80 backdrop-blur-sm border rounded-[40px]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                        <ClipboardCheck className="w-5 h-5 text-green-500"/>
                        Monitoring Kehadiran Harian
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="flex flex-col items-center justify-center bg-secondary/50 p-6 rounded-2xl border h-full">
                        <div className="text-6xl font-black text-green-500">{attendanceToday.rate}%</div>
                        <div className="text-sm font-bold text-muted-foreground mt-1">Tingkat Kehadiran Hari Ini</div>
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-bold text-sm text-muted-foreground">Atlet Tidak Hadir:</h4>
                        {attendanceToday.absent.map((atlet, i) => (
                            <div key={i} className="flex items-center justify-between bg-secondary p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8 text-xs"><AvatarFallback>{atlet.avatar}</AvatarFallback></Avatar>
                                    <span className="text-sm font-bold">{atlet.name}</span>
                                </div>
                                <Badge variant={atlet.reason === 'Sakit' ? 'destructive' : 'secondary'}>{atlet.reason}</Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activity Log */}
            <Card className="bg-card/80 backdrop-blur-sm border rounded-[40px]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                        <Activity className="w-5 h-5"/>
                        Log Aktivitas Terbaru
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                    <div className="space-y-3">
                    {recentActivities.map((act, i) => (
                        <div key={i} className="flex items-start justify-between p-4 rounded-2xl bg-secondary/50 border shadow-sm">
                            <div className="flex gap-4">
                                <Avatar className="h-10 w-10 text-xs"><AvatarFallback>{act.user.substring(0, 2)}</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-bold text-foreground text-sm">{act.desc}</p>
                                    <p className="text-xs text-muted-foreground">by {act.user} • {act.time}</p>
                                </div>
                            </div>
                            <div>
                                {act.status === 'FLAGGED' && <Badge variant="destructive">{act.type}</Badge>}
                                {act.status === 'COMPLETED' && <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">{act.type}</Badge>}
                                {act.status === 'LOGGED' && <Badge variant="secondary">{act.type}</Badge>}
                            </div>
                        </div>
                    ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Right column for static/summary info */}
        <div className="lg:col-span-1">
            <Card className="bg-card/80 backdrop-blur-sm border rounded-[40px] sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                    Pilar Dampak Program (CSR)
                  </CardTitle>
                  <CardDescription>Ringkasan pencapaian program untuk sponsor.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0 grid grid-cols-1 gap-4">
                  <div className="space-y-3 p-4 bg-secondary/50 rounded-2xl border">
                      <h4 className="font-bold flex items-center gap-2 text-foreground text-sm"><Users className="w-4 h-4 text-blue-500" /> Pilar Sosial</h4>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {impactIndicators.social.map(item => (
                          <li key={item} className="flex justify-between items-center"><span>{item}</span> <Badge variant="outline" className="font-mono">85%</Badge></li>
                        ))}
                      </ul>
                  </div>
                  <div className="space-y-3 p-4 bg-secondary/50 rounded-2xl border">
                      <h4 className="font-bold flex items-center gap-2 text-foreground text-sm"><Award className="w-4 h-4 text-yellow-500" /> Pilar Karakter</h4>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {impactIndicators.character.map(item => (
                          <li key={item} className="flex justify-between items-center"><span>{item}</span> <Badge variant="outline" className="font-mono">Baik</Badge></li>
                        ))}
                      </ul>
                  </div>
                   <div className="space-y-3 p-4 bg-secondary/50 rounded-2xl border">
                      <h4 className="font-bold flex items-center gap-2 text-foreground text-sm"><Wallet className="w-4 h-4 text-purple-500" /> Pilar Literasi Keuangan</h4>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {impactIndicators.finance.map(item => (
                          <li key={item} className="flex justify-between items-center"><span>{item}</span> <Badge variant="outline" className="font-mono">60%</Badge></li>
                        ))}
                      </ul>
                  </div>
                  <div className="space-y-3 p-4 bg-secondary/50 rounded-2xl border">
                      <h4 className="font-bold flex items-center gap-2 text-foreground text-sm"><Leaf className="w-4 h-4 text-green-500" /> Pilar Lingkungan</h4>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {impactIndicators.environment.map(item => (
                          <li key={item} className="flex justify-between items-center"><span>{item}</span> <Badge variant="outline" className="font-mono">70%</Badge></li>
                        ))}
                      </ul>
                  </div>
                   <div className="space-y-3 p-4 bg-secondary/50 rounded-2xl border">
                      <h4 className="font-bold flex items-center gap-2 text-foreground text-sm"><Landmark className="w-4 h-4 text-gray-500" /> Pilar Tata Kelola</h4>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {impactIndicators.governance.map(item => (
                          <li key={item} className="flex justify-between items-center"><span>{item}</span> <Badge variant="outline" className="font-mono">OK</Badge></li>
                        ))}
                      </ul>
                  </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
