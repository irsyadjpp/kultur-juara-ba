
'use client';

import {
  Crown,
  DollarSign,
  Users,
  AlertTriangle,
  Database,
  Trash2,
  BellOff
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function SuperAdminPage() {

  const budget = {
    total: 450000000,
    approved: 8000000,
    submitted: 500000,
  }
  const budgetUsedPercent = (budget.approved / budget.total) * 100;

  const userStats = {
    total: 15,
    admins: 2,
    headCoaches: 1,
    guests: 3,
  }

  const handleDangerAction = (action: string) => {
    if (confirm(`ARE YOU ABSOLUTELY SURE you want to perform the action: "${action}"? This is irreversible.`)) {
      alert(`Action "${action}" confirmed. (This is a placeholder)`);
    }
  }

  return (
    <div className="space-y-8">
      {/* 1. HEADER */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="rounded-full px-4 py-1.5 border-purple-500 text-purple-500 bg-purple-500/10 font-black tracking-widest uppercase animate-pulse">
            <Crown className="w-4 h-4 mr-2" /> SUPER ADMIN DECK
          </Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter">
          System Overview
        </h1>
        <p className="text-muted-foreground text-lg">
          Panel kontrol tingkat tinggi untuk manajemen sistem dan data kritis.
        </p>
      </div>

      {/* 2. OVERVIEW CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-[2.5rem] shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary" /> Budget & Program Overview</CardTitle>
            <CardDescription>Status persetujuan program dan alokasi dana.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-foreground">
                <span>DANA DISETUJUI</span>
                <span>TOTAL ANGGARAN</span>
              </div>
              <Progress value={budgetUsedPercent} />
              <div className="flex justify-between text-sm font-bold">
                <span>Rp {budget.approved.toLocaleString('id-ID')}</span>
                <span className="text-muted-foreground">Rp {budget.total.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <p className="text-sm">Program menunggu review:</p>
              <p className="text-xl font-bold font-mono">Rp {budget.submitted.toLocaleString('id-ID')}</p>
            </div>
            <Button className="w-full mt-2" variant="outline">Lihat Masterplan Lengkap</Button>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5rem] shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> User Role Overview</CardTitle>
            <CardDescription>Distribusi peran pengguna dalam sistem.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="bg-secondary p-4 rounded-xl text-center">
              <p className="text-xs font-bold text-muted-foreground">Total Users</p>
              <p className="text-3xl font-black">{userStats.total}</p>
            </div>
            <div className="bg-secondary p-4 rounded-xl text-center">
              <p className="text-xs font-bold text-muted-foreground">Admins</p>
              <p className="text-3xl font-black">{userStats.admins}</p>
            </div>
            <div className="bg-secondary p-4 rounded-xl text-center">
              <p className="text-xs font-bold text-muted-foreground">Head Coaches</p>
              <p className="text-3xl font-black">{userStats.headCoaches}</p>
            </div>
            <div className="bg-secondary p-4 rounded-xl text-center">
              <p className="text-xs font-bold text-muted-foreground">Guests</p>
              <p className="text-3xl font-black">{userStats.guests}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. DANGER ZONE */}
      <Card className="rounded-[2.5rem] border-destructive/50 bg-destructive/5 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-destructive"><AlertTriangle className="w-6 h-6" /> Danger Zone</CardTitle>
          <CardDescription className="text-destructive/80">Tindakan di area ini bersifat permanen dan tidak dapat dibatalkan. Gunakan dengan sangat hati-hati.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="destructive" className="h-16 flex-col gap-1" onClick={() => handleDangerAction('Re-seed initial data')}>
            <Database className="w-5 h-5" />
            <span className="font-bold">Re-seed Data</span>
          </Button>
          <Button variant="destructive" className="h-16 flex-col gap-1" onClick={() => handleDangerAction('Clear all notifications')}>
            <BellOff className="w-5 h-5" />
            <span className="font-bold">Clear Notifications</span>
          </Button>
          <Button variant="destructive" className="h-16 flex-col gap-1" onClick={() => handleDangerAction('Wipe all athlete logs')}>
            <Trash2 className="w-5 h-5" />
            <span className="font-bold">Wipe Logs</span>
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
