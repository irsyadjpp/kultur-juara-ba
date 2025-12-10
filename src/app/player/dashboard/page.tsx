'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { updatePlayerProfile, getPlayerSession, joinTeam } from "../actions";

export default function PlayerDashboard() {
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [teamCode, setTeamCode] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  // 1. Cek Session & Status Profil saat Load
  useEffect(() => {
    async function init() {
      const sess = await getPlayerSession();
      if (sess) {
        setSession(sess);
        // Cek kelengkapan data kunci dari session
        if (sess.nik && sess.instagram) {
            setIsProfileComplete(true);
        }
        if (sess.teamId) {
            setIsJoined(true);
        }
      }
    }
    init();
  }, []);

  // Handle Submit Profil (Jika Belum Lengkap)
  async function handleProfileSubmit(formData: FormData) {
    const result = await updatePlayerProfile(formData);
    if (result.success) {
      toast({ title: "Profil Disimpan!", description: result.message });
      setIsProfileComplete(true);
      // Re-fetch session untuk update state
      const updatedSess = await getPlayerSession();
      setSession(updatedSess);
    } else {
      toast({ title: "Gagal", description: result.message, variant: "destructive" });
    }
  }

  // Handle Join Tim (Input Kode dari Manajer)
  async function handleJoinTeam() {
    if (!session || !isProfileComplete) return;
    const result = await joinTeam(teamCode);
    if (result.success) {
      toast({ title: "Berhasil!", description: `Anda bergabung dengan ${result.teamName}` });
      setIsJoined(true);
      const updatedSess = await getPlayerSession();
      setSession(updatedSess);
    } else {
      toast({ title: "Gagal", description: result.message, variant: "destructive" });
    }
  }

  if (!session) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Halo, {session.name || "Atlet BCC"} 👋</h1>
      <p className="text-gray-500 mb-8">Dashboard Atlet Beregu BCC 2026</p>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* KOLOM KIRI: LENGKAPI PROFIL (Fitur 1) */}
        <Card className={isProfileComplete ? "border-green-500 bg-green-50" : "border-orange-500"}>
          <CardHeader>
            <CardTitle>{isProfileComplete ? "✅ Profil TPF Lengkap" : "1. Lengkapi Data Diri Wajib"}</CardTitle>
            <CardDescription>
              Wajib diisi untuk verifikasi level permainan oleh Tim Pencari Fakta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isProfileComplete ? (
              <form action={handleProfileSubmit} className="space-y-4">
                <Input name="nik" placeholder="NIK (Wajib Verifikasi)" required maxLength={16} />
                <Input name="phone" placeholder="No. WhatsApp (Wajib)" required type="tel" />
                <Input name="communityName" placeholder="Nama Komunitas Asal" required />
                <Input name="instagram" placeholder="@Username_Instagram (Wajib Cek TPF)" required />
                <Select name="gender" required>
                    <SelectTrigger><SelectValue placeholder="Jenis Kelamin" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Putra</SelectItem>
                      <SelectItem value="FEMALE">Putri</SelectItem>
                    </SelectContent>
                  </Select>
                <Button type="submit" className="w-full">Simpan & Ajukan Verifikasi</Button>
              </form>
            ) : (
                <div className="space-y-2 text-sm">
                    <p className="font-semibold">Status TPF:</p>
                    <Button size="sm" variant={session.tpfStatus === 'VERIFIED' ? 'secondary' : 'default'}>
                        {session.tpfStatus || 'PENDING'}
                    </Button>
                    <p className="mt-4">Data Anda sudah diantrekan untuk diverifikasi. Jangan ganti NIK/IG Anda.</p>
                </div>
            )}
          </CardContent>
        </Card>

        {/* KOLOM TENGAH: GABUNG TIM (Fitur 2) */}
        <Card className={isJoined ? "border-blue-500 bg-blue-50" : (isProfileComplete ? "" : "opacity-50 pointer-events-none")}>
          <CardHeader>
            <CardTitle>{isJoined ? "🎉 Tim Anda Sudah Terdaftar" : "2. Gabung Tim Anda"}</CardTitle>
            <CardDescription>
              Gunakan Kode Unik yang diberikan oleh Manajer Tim Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isJoined ? (
               <div className="text-center py-6">
                  <p className="text-lg font-bold text-blue-800">ANGGOTA TIM</p>
                  <p className="text-3xl font-black mt-2">{session.teamName}</p>
                  <p className="text-sm text-gray-500 mt-4">Tunggu Manajer menyusun Line-up Anda.</p>
               </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-yellow-100 p-3 rounded text-sm text-yellow-800">
                  ⚠️ Status TPF harus <span className='font-bold'>VERIFIED</span> untuk gabung tim.
                </div>
                <div className="space-y-2">
                  <Label>Masukkan Kode Unik Tim</Label>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Contoh: BCC-WELL" 
                      value={teamCode}
                      onChange={(e) => setTeamCode(e.target.value)}
                    />
                    <Button onClick={handleJoinTeam} disabled={session.tpfStatus !== 'VERIFIED'}>Gabung</Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* KOLOM KANAN: JADWAL & MATCH (Fitur 3 & 4) */}
        <Card>
          <CardHeader>
            <CardTitle>Jadwal & Hasil Pertandingan</CardTitle>
            <CardDescription>Informasi penting saat hari-H turnamen.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline" disabled={!isJoined}>
                Lihat Line-up Tim (Dari Manajer)
            </Button>
            <Button className="w-full" variant="outline">
                Jadwal Pertandingan Tim
            </Button>
            <Button className="w-full" variant="outline">
                Live Score Turnamen
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
