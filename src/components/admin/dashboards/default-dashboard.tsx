
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, QrCode, TrendingUp, BarChart2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";

export default function DefaultDashboard() {
  const stats = [
    { title: "Total Pengunjung", value: "2,450", icon: Users, desc: "+120 sejak jam terakhir", color: "text-blue-400" },
    { title: "Total Vote Masuk", value: "1,890", icon: TrendingUp, desc: "78% participation rate", color: "text-green-400" },
    { title: "Total Scan Booth", value: "5,300", icon: QrCode, desc: "Avg 2.5 scans/user", color: "text-purple-400" },
  ];

  const recentActivities = [
    { type: "PAYMENT", desc: "Verifikasi Lunas: PB Djarum KW", time: "2m ago", status: "PAID"},
    { type: "PLAYER", desc: "Verifikasi TPF: Andi Smash", time: "5m ago", status: "APPROVED"},
    { type: "SCORE", desc: "Skor Masuk: Lapangan 1", time: "8m ago", status: "LIVE"},
    { type: "PAYMENT", desc: "Pembayaran Ditolak: PB Jaya Raya", time: "15m ago", status: "REJECTED"},
  ];

  return (
    <div className="space-y-8">
       <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Ringkasan aktivitas turnamen Badmintour Open #1.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5"/>
                Grafik Pendaftaran
            </CardTitle>
            <CardDescription>Tren pendaftaran tim selama seminggu terakhir.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground text-sm">Grafik Pendaftaran (Placeholder)</p>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
                <CardDescription>Log kejadian penting dari sistem.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        {recentActivities.map((act, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <div className="font-medium">{act.desc}</div>
                                <div className="text-xs text-muted-foreground">{act.time}</div>
                            </TableCell>
                            <TableCell className="text-right">
                                {act.status === 'PAID' && <Badge className="bg-green-500/10 text-green-400 border-green-500/20">{act.type}</Badge>}
                                {act.status === 'APPROVED' && <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">{act.type}</Badge>}
                                {act.status === 'LIVE' && <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">{act.type}</Badge>}
                                {act.status === 'REJECTED' && <Badge className="bg-red-500/10 text-red-400 border-red-500/20">{act.type}</Badge>}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
