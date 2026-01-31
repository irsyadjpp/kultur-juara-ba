'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  UserCheck,
  Trophy,
  Calendar,
  UserPlus,
  Users,
  BookHeart,
  AlertTriangle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const MOCK_PLAYER_DATA = {
  name: 'Atlet Uji Coba',
  athleteCode: 'KJA-2026-123',
  skillAssessment: {
    status: 'pending', // 'pending' | 'done'
    level: 'Intermediate',
    tier: 2,
  },
  nextSession: {
    topic: 'Defensive Drills',
    time: 'Besok, 16:00',
  },
};

export default function AthleteDashboardPage() {
  const data = MOCK_PLAYER_DATA;
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast({
      title: 'ID Atlet Disalin!',
      description: `${text} telah disalin ke clipboard.`,
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black font-headline tracking-tight uppercase">
          Welcome, {data.name}
        </h1>
        <p className="text-muted-foreground text-lg">
          Ringkasan aktivitas dan progres latihanmu.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-[2rem] lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ID Atlet Resmi</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className="text-4xl font-black font-mono">
              {data.athleteCode}
            </div>
            <Button
              size="icon"
              variant="outline"
              className={cn(
                'h-10 w-10 rounded-full transition-all duration-300',
                isCopied && 'bg-green-500/10 text-green-600 border-green-500/20'
              )}
              onClick={() => copyToClipboard(data.athleteCode)}
            >
              {isCopied ? <Check size={18} /> : <Copy size={16} />}
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sesi Latihan Berikutnya
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.nextSession.topic}</div>
            <p className="text-xs text-muted-foreground">
              {data.nextSession.time}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="rounded-[2.5rem] h-full">
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/athletes/journal"
                className="block p-6 rounded-2xl bg-secondary hover:bg-primary/10 hover:border-primary border border-transparent transition-all"
              >
                <BookHeart className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-lg">Isi Jurnal Harian</h3>
                <p className="text-sm text-muted-foreground">
                  Catat progres dan kondisimu hari ini.
                </p>
              </Link>
              <Link
                href="/athletes/profile"
                className="block p-6 rounded-2xl bg-secondary hover:bg-primary/10 hover:border-primary border border-transparent transition-all"
              >
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-lg">Lihat Profil & Penilaian</h3>
                <p className="text-sm text-muted-foreground">
                  Cek hasil evaluasi dari pelatih.
                </p>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="rounded-[2.5rem] bg-secondary h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="text-yellow-500" /> Penilaian Skill
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Hasil evaluasi kemampuanmu.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.skillAssessment.status === 'pending' ? (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  <AlertTriangle className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                  <p className="font-bold text-foreground">Menunggu Penilaian</p>
                  <p>Pelatih akan segera mengevaluasi kemampuanmu.</p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <UserCheck className="mx-auto h-8 w-8 text-green-500 mb-2" />
                  <p className="text-xs font-bold uppercase text-muted-foreground">
                    Level Ditetapkan
                  </p>
                  <h3 className="font-headline text-3xl">
                    {data.skillAssessment.level}
                  </h3>
                  <Badge variant="outline" className="mt-1">
                    Tier {data.skillAssessment.tier}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
