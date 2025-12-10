
'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { updatePlayerProfile, getPlayerSession, joinTeam } from "../actions"; // Import action

export default function PlayerDashboard() {
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [teamCode, setTeamCode] = useState("");

  // 1. Cek Session & Status Profil saat Load
  useEffect(() => {
    async function init() {
      const sess = await getPlayerSession();
      if (sess) {
        setSession(sess);
        // Logic cek kelengkapan data (bisa dari DB)
        if (sess.nik && sess.phone && sess.communityName) {
            setIsProfileComplete(true);
        }
      }
    }
    init();
  }, []);

  // 2. Handle Submit Profil (Jika Belum Lengkap)
  async function handleProfileSubmit(formData: FormData) {
    const result = await updatePlayerProfile(formData);
    if (result.success) {
      toast({ title: "Profil Disimpan!", description: "Sekarang Anda bisa bergabung ke Tim." });
      setIsProfileComplete(true);
    } else {
      toast({ title: "Gagal", description: result.message, variant: "destructive" });
    }
  }

  // 3. Handle Join Tim (Input Kode dari Manajer)
  async function handleJoinTeam() {
    const result = await joinTeam(session.email, teamCode);
    if (result.success) {
      toast({ title: "Berhasil!", description: `Anda bergabung dengan ${result.teamName}` });
      // Refresh halaman atau update state
      const sess = await getPlayerSession();
      setSession(sess);
    } else {
      toast({ title: "Gagal", description: result.message, variant: "destructive" });
    }
  }

  if (!session) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Halo, {session.name} 👋</h1>
      <p className="text-gray-500 mb-8">Selamat datang di Dashboard Atlet BCC 2026</p>

      <div className="grid gap-6 md:grid-cols-2">
        
        {/* KOLOM KIRI: STATUS PROFIL */}
        <Card className={isProfileComplete ? "border-green-500 bg-green-50" : "border-orange-500"}>
          <CardHeader>
            <CardTitle>{isProfileComplete ? "✅ Data Diri Lengkap" : "⚠️ Lengkapi Profil Anda"}</CardTitle>
            <CardDescription>
              {isProfileComplete 
                ? "Data Anda sudah tersimpan. Siap bertanding." 
                : "Wajib diisi sebelum bisa bergabung ke Tim."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isProfileComplete ? (
              <form action={handleProfileSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>NIK (Wajib)</Label>
                  <Input name="nik" placeholder="16 Digit Angka" required maxLength={16} />
                </div>
                <div className="space-y-2">
                  <Label>No. WhatsApp</Label>
                  <Input name="phone" placeholder="08..." required />
                </div>
                <div className="space-y-2">
                  <Label>Nama Komunitas Asal</Label>
                  <Input name="communityName" placeholder="Contoh: PB Barudak Well" required />
                </div>
                <div className="space-y-2">
                    <Label>Instagram (Untuk Verifikasi)</Label>
                    <Input name="instagram" placeholder="@username" required />
                </div>
                <div className="space-y-2">
                  <Label>Jenis Kelamin</Label>
                  <Select name="gender" required>
                    <SelectTrigger><SelectValue placeholder="Pilih..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Putra</SelectItem>
                      <SelectItem value="FEMALE">Putri</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">Simpan Data Diri</Button>
              </form>
            ) : (
               <div className="space-y-2">
                  <p className="text-sm"><strong>NIK:</strong> {session.nik || "-"}</p>
                  <p className="text-sm"><strong>Komunitas:</strong> {session.communityName || "-"}</p>
                  <Button variant="outline" size="sm" onClick={() => setIsProfileComplete(false)}>Edit Profil</Button>
               </div>
            )}
          </CardContent>
        </Card>

        {/* KOLOM KANAN: STATUS TIM */}
        <Card className={!isProfileComplete ? "opacity-50 pointer-events-none" : ""}>
          <CardHeader>
            <CardTitle>Status Tim</CardTitle>
            <CardDescription>Bergabung dengan Tim untuk mulai bertanding.</CardDescription>
          </CardHeader>
          <CardContent>
            {session.teamId ? (
               <div className="text-center py-6 bg-blue-50 rounded-lg">
                  <p className="text-lg font-bold text-blue-800">ANGGOTA TIM</p>
                  <p className="text-2xl font-black mt-2">{session.teamName || "PB JUARA"}</p>
                  <p className="text-sm text-gray-500 mt-4">Tunggu instruksi Manajer untuk Line-up.</p>
               </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded text-sm text-yellow-800">
                  <strong>Belum punya Tim?</strong> Minta "Kode Unik Tim" kepada Manajer Anda.
                </div>
                <div className="space-y-2">
                  <Label>Masukkan Kode Tim</Label>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Contoh: BCC-8821" 
                      value={teamCode}
                      onChange={(e) => setTeamCode(e.target.value)}
                    />
                    <Button onClick={handleJoinTeam}>Gabung</Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
