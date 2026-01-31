'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Edit2, ShieldCheck, User, Camera } from 'lucide-react';

const MOCK_USER_DATA = {
  name: 'Atlet Uji Coba',
  club: 'PB. Kultur Juara',
  avatar: '/avatars/03.png',
  skillLevel: 'Intermediate',
  skillTier: 2,
  skillScore: 82,
  coachNotes:
    'Footwork sangat baik, namun perlu peningkatan power pada smash belakang. Konsistensi defense sudah layak untuk level Intermediate.',
  coachName: 'Coach Taufik S.',
  whatsapp: '0812-3456-7890',
  jerseySize: 'L',
};

export default function AthleteProfilePage() {
  const data = MOCK_USER_DATA;
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black font-headline tracking-tight uppercase">
          Profil & Penilaian
        </h1>
        <p className="text-muted-foreground text-lg">
          Kelola identitas dan pantau hasil evaluasi performa dari pelatih.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Profil & Data Diri */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="rounded-[2.5rem]">
            <CardHeader>
              <CardTitle>Profil Atlet</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <div className="relative group mb-4">
                <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                  <AvatarImage src={data.avatar} />
                  <AvatarFallback className="text-3xl font-bold">
                    AU
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-1 right-1 h-8 w-8 rounded-full border-2 border-background"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-2xl font-bold">{data.name}</h2>
              <p className="text-muted-foreground">{data.club}</p>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Data Diri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Nomor WhatsApp
                </Label>
                <Input
                  defaultValue={data.whatsapp}
                  readOnly
                  className="bg-secondary border-none"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Ukuran Jersey
                </Label>
                <Input
                  defaultValue={data.jerseySize}
                  readOnly
                  className="bg-secondary border-none"
                />
              </div>
              <Button variant="outline" className="w-full">
                <Edit2 className="w-4 h-4 mr-2" /> Ajukan Perubahan Data
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Kolom Kanan: Penilaian */}
        <div className="lg:col-span-2">
          <Card className="rounded-[2.5rem] bg-secondary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> Hasil
                Penilaian Pelatih
              </CardTitle>
              <CardDescription>Update terakhir: 12 Desember 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6 p-6 rounded-2xl bg-card border">
                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-1">
                    Level Kemampuan
                  </p>
                  <p className="font-headline text-3xl text-primary">
                    {data.skillLevel}
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-1">
                    Tier Saat Ini
                  </p>
                  <p className="font-headline text-3xl">Tier {data.skillTier}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span className="text-muted-foreground">SKILL SCORE</span>
                  <span className="text-foreground">
                    {data.skillScore}/100
                  </span>
                </div>
                <Progress value={data.skillScore} className="h-3" />
              </div>

              <div className="bg-card/50 p-4 rounded-xl border">
                <p className="text-sm font-bold text-foreground mb-2">
                  Catatan dari Pelatih:
                </p>
                <p className="text-sm text-muted-foreground italic">
                  "{data.coachNotes}"
                </p>
                <div className="mt-4 flex items-center gap-2 pt-3 border-t border-dashed">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-primary text-white text-[10px]">
                      TS
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    Dinilai oleh: {data.coachName}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
