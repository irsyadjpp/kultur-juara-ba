
'use client';

import { useState } from 'react';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Ban,
  BarChart,
  Moon,
  Footprints,
  Shield,
  Utensils,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// MOCK DATA: Based on the design document
const mockData = [
  {
    id: '1',
    name: 'Andi Pratama',
    age: 13,
    avatar: '/avatars/01.png',
    totalScore: 88,
    scores: {
      nutrition: 90,
      sleep: 85,
      independent: 80,
      discipline: 95,
    },
    alerts: [],
  },
  {
    id: '2',
    name: 'Budi Santoso',
    age: 15,
    avatar: '/avatars/02.png',
    totalScore: 64,
    scores: {
      nutrition: 60,
      sleep: 55,
      independent: 70,
      discipline: 65,
    },
    alerts: ['Skor di bawah rata-rata minggu lalu.'],
  },
  {
    id: '3',
    name: 'Citra Kirana',
    age: 14,
    avatar: '/avatars/03.png',
    totalScore: 49,
    scores: {
      nutrition: 45,
      sleep: 40,
      independent: 50,
      discipline: 60,
    },
    alerts: ['Tidur < 6 jam (2 hari berturut-turut)', 'Skor nutrisi < 50'],
  },
  {
    id: '4',
    name: 'Doni Setiawan',
    age: 16,
    avatar: '/avatars/04.png',
    totalScore: 92,
    scores: {
      nutrition: 95,
      sleep: 90,
      independent: 90,
      discipline: 98,
    },
    alerts: [],
  },
  {
    id: '5',
    name: 'Eka Putri',
    age: 12,
    avatar: '/avatars/05.png',
    totalScore: 55,
    scores: {
      nutrition: 60,
      sleep: 70,
      independent: 40,
      discipline: 50,
    },
    alerts: ['Latihan mandiri = 0 (3 hari)', 'Skor disiplin < 50'],
  },
];

// --- Helper Functions ---
const getStatus = (score: number) => {
  if (score >= 80) {
    return {
      label: 'Aman',
      color: 'bg-green-500/10 text-green-500 border-green-500/20',
      dotColor: 'bg-green-500',
    };
  }
  if (score >= 60) {
    return {
      label: 'Waspada',
      color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      dotColor: 'bg-yellow-500',
    };
  }
  return {
    label: 'Risiko',
    color: 'bg-red-500/10 text-red-500 border-red-500/20',
    dotColor: 'bg-red-500',
  };
};

export default function CoachDashboardPage() {

  const summaryStats = {
    totalAthletes: mockData.length,
    avgScore: Math.round(mockData.reduce((acc, a) => acc + a.totalScore, 0) / mockData.length),
    highRiskCount: mockData.filter(a => a.totalScore < 60).length,
    noDataCount: 2, // Hardcoded for now
  }

  const criticalAlerts = mockData.filter(a => a.alerts.length > 0 && a.totalScore < 60);

  return (
    <div className="space-y-8">
      {/* 1. HEADER */}
      <div>
        <h1 className="text-3xl font-black font-headline tracking-tight uppercase">
          Dashboard Pelatih
        </h1>
        <p className="text-muted-foreground text-lg">
          Ringkasan kondisi dan kesiapan atlet PB Kultur Juara hari ini.
        </p>
      </div>

      {/* 2. GLOBAL SUMMARY CARDS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Atlet Aktif</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{summaryStats.totalAthletes}</div>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Skor Kesiapan</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{summaryStats.avgScore}</div>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] bg-red-500/5 border-red-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-500">Atlet Risiko Tinggi</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-red-500">{summaryStats.highRiskCount}</div>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Belum Input Data</CardTitle>
            <Ban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{summaryStats.noDataCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* 3. MAIN CONTENT (TABLE & ALERTS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* MAIN ATHLETE TABLE */}
        <div className="lg:col-span-2">
          <Card className="rounded-[2.5rem] h-full">
            <CardHeader>
              <CardTitle>Ringkasan Atlet</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Atlet</TableHead>
                    <TableHead className="text-center">Skor</TableHead>
                    <TableHead className="text-center hidden md:table-cell"><Utensils size={16} /></TableHead>
                    <TableHead className="text-center hidden md:table-cell"><Moon size={16} /></TableHead>
                    <TableHead className="text-center hidden md:table-cell"><Footprints size={16} /></TableHead>
                    <TableHead className="text-center hidden md:table-cell"><Shield size={16} /></TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockData.map((atlet) => {
                    const status = getStatus(atlet.totalScore);
                    return (
                      <TableRow key={atlet.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border">
                              <AvatarImage src={atlet.avatar} />
                              <AvatarFallback>{atlet.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-bold">{atlet.name}</p>
                              <p className="text-xs text-muted-foreground">{atlet.age} Tahun</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-mono font-bold text-lg">{atlet.totalScore}</TableCell>
                        <TableCell className="text-center hidden md:table-cell text-muted-foreground font-mono">{atlet.scores.nutrition}</TableCell>
                        <TableCell className="text-center hidden md:table-cell text-muted-foreground font-mono">{atlet.scores.sleep}</TableCell>
                        <TableCell className="text-center hidden md:table-cell text-muted-foreground font-mono">{atlet.scores.independent}</TableCell>
                        <TableCell className="text-center hidden md:table-cell text-muted-foreground font-mono">{atlet.scores.discipline}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={cn('font-bold', status.color)}>{status.label}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* ALERTS PANEL */}
        <div className="lg:col-span-1">
          <Card className="rounded-[2.5rem] bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="text-red-500" /> Alert Kritis
              </CardTitle>
              <p className="text-sm text-muted-foreground">Atlet yang butuh perhatian segera.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {criticalAlerts.length > 0 ? criticalAlerts.map(atlet => (
                <div key={atlet.id} className="bg-background p-4 rounded-2xl border border-red-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-8 w-8 border-2 border-red-500/50"><AvatarImage src={atlet.avatar} /><AvatarFallback>{atlet.name.charAt(0)}</AvatarFallback></Avatar>
                    <p className="font-bold">{atlet.name}</p>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-red-500/80">
                    {atlet.alerts.map((alert, i) => <li key={i}>{alert}</li>)}
                  </ul>
                </div>
              )) : (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-green-500 mb-2" />
                  <p>Tidak ada alert kritis hari ini.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}
