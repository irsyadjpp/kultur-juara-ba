'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
import { Edit2, ShieldCheck, User, Camera, Loader2, AlertCircle } from 'lucide-react';
import { getSession } from '../../actions';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

export default function AthleteProfilePage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    getSession().then((session) => {
      if (session?.email) {
        setUserEmail(session.email);
      }
    });
  }, []);

  const athletesQuery = useMemoFirebase(() => {
    if (!firestore || !userEmail) return null;
    return query(collection(firestore, 'athletes'), where('email', '==', userEmail));
  }, [firestore, userEmail]);

  const { data: athletes, isLoading } = useCollection(athletesQuery);
  const athlete = athletes?.[0];

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-muted-foreground">
        Memuat sesi pengguna...
      </div>
    )
  }

  if (!athlete) {
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
        <Card className="p-8 flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mb-4" />
          <h2 className="text-xl font-bold">Data Atlet Tidak Ditemukan</h2>
          <p className="text-muted-foreground max-w-md mt-2">
            Kami tidak dapat menemukan data atlet yang terhubung dengan email <strong>{userEmail}</strong>.
            Silakan hubungi administrator untuk verifikasi data Anda.
          </p>
        </Card>
      </div>
    );
  }

  // Fallbacks for optional fields
  const skillScore = athlete.skillScore || 0;
  const skillTier = athlete.tier || athlete.category || '-';
  const coachNotes = athlete.coachNotes || "Belum ada catatan dari pelatih.";
  const coachName = athlete.coachName || "Tim Pelatih";

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
                  <AvatarImage src={athlete.avatar || "/avatars/default.png"} />
                  <AvatarFallback className="text-3xl font-bold">
                    {athlete.fullName.substring(0, 2).toUpperCase()}
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
              <h2 className="text-2xl font-bold">{athlete.fullName}</h2>
              <p className="text-muted-foreground">PB. Kultur Juara</p>
              <Badge variant="outline" className="mt-2 text-primary border-primary/20 bg-primary/5">
                {athlete.status_aktif || 'NON-AKTIF'}
              </Badge>
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
                  defaultValue={athlete.phone || '-'}
                  readOnly
                  className="bg-secondary border-none"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Ukuran Jersey
                </Label>
                <Input
                  defaultValue={athlete.shirtSize || athlete.jerseySize || '-'}
                  readOnly
                  className="bg-secondary border-none"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Tanggal Lahir
                </Label>
                <Input
                  defaultValue={athlete.dob || '-'}
                  readOnly
                  className="bg-secondary border-none"
                />
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="https://wa.me/6285121374644?text=Halo%20Admin,%20saya%20ingin%20mengajukan%20perubahan%20data%20atlet." target="_blank">
                  <Edit2 className="w-4 h-4 mr-2" /> Ajukan Perubahan Data
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Kolom Kanan: Penilaian */}
        <div className="lg:col-span-2">
          <Card className="rounded-[2.5rem] bg-secondary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> Evaluasi Perkembangan
              </CardTitle>
              <CardDescription>
                {athlete.lastAssessmentDate
                  ? `Update terakhir: ${new Date(athlete.lastAssessmentDate).toLocaleDateString("id-ID")}`
                  : "Belum ada evaluasi"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6 p-6 rounded-2xl bg-card border">
                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-1">
                    Level Saat Ini
                  </p>
                  <p className="font-headline text-3xl text-primary">
                    {athlete.level || 'Beginner'}
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-1">
                    Kelompok Usia
                  </p>
                  <p className="font-headline text-3xl">{athlete.category || '-'}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span className="text-muted-foreground uppercase">Daya Juang (Effort)</span>
                  <span className="text-foreground">
                    {skillScore}/100
                  </span>
                </div>
                <Progress value={skillScore} className="h-3" />
              </div>

              <div className="bg-card/50 p-4 rounded-xl border">
                <p className="text-sm font-bold text-foreground mb-2">
                  Catatan Pelatih:
                </p>
                <p className="text-sm text-muted-foreground italic">
                  "{coachNotes}"
                </p>
                <div className="mt-4 flex items-center gap-2 pt-3 border-t border-dashed">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-primary text-white text-[10px]">
                      TP
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    Evaluator: {coachName}
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
