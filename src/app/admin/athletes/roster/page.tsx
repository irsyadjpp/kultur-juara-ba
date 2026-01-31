'use client';

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Users, Shield, Trophy, Search, 
  Plus, MapPin, Mail, Phone, Edit3, 
  Crown, Star, UserPlus, Briefcase, 
  MoreHorizontal,
  ShieldCheck,
  Loader2,
  Database,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";

// Define the type for an athlete based on Firestore data
interface Athlete {
  id: string;
  fullName: string;
  category: string;
  level: string;
  status_aktif: 'AKTIF' | 'NON-AKTIF';
  avatar?: string;
}

const athletesToSeed = [
    { fullName: "Ghaina Khansa Putri", size: "XL", ld: "34", tb: "63", lp: "27", gender: "Perempuan" },
    { fullName: "Fajarina Ayyatul Husna", size: "L", ld: "37", tb: "70", lp: "27", gender: "Perempuan" },
    { fullName: "Cecilya Anggraeni Nugraha", size: "XL", ld: "48", tb: "61", lp: "23", gender: "Perempuan" },
    { fullName: "Mega Astari Febriana", size: "L", ld: "45", tb: "66", lp: "22", gender: "Perempuan" },
    { fullName: "Muhammad Azzam Rayana", size: "L", ld: "39", tb: "58", lp: "26", gender: "Laki-laki" },
    { fullName: "Muhammad Wildan Kurniawan", size: "L", ld: "34", tb: "53", lp: "27", gender: "Laki-laki" },
    { fullName: "Reno Apriliandi", size: "L", ld: "36", tb: "54", lp: "30", gender: "Laki-laki" },
    { fullName: "Fabian Aufa Putra Andyana", size: "L", ld: "35", tb: "62", lp: "27", gender: "Laki-laki" }
];


export default function AthleteRosterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);

  const athletesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'athletes');
  }, [firestore]);

  const { data: athletesData, isLoading } = useCollection<Athlete>(athletesQuery);

  const filteredAthletes = useMemo(() => {
    if (!athletesData) return [];
    return athletesData.filter(athlete => 
      athlete.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [athletesData, searchQuery]);
  
  const totalAthletes = athletesData?.length || 0;
  const activeAthletes = athletesData?.filter(a => a.status_aktif === 'AKTIF').length || 0;
  // This is a simplification. "Junior" would need to be determined by age category.
  const juniorAthletes = athletesData?.filter(a => a.category.includes('U-')).length || 0;

  const handleSeedAthletes = async () => {
    if (!firestore) {
      toast({ title: "Error", description: "Firestore is not available.", variant: "destructive" });
      return;
    }
    setIsSeeding(true);
    try {
      const athletesCollection = collection(firestore, 'athletes');
      let addedCount = 0;

      for (const athlete of athletesToSeed) {
        const q = query(athletesCollection, where("fullName", "==", athlete.fullName));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          const lastName = athlete.fullName.split(' ').slice(-1)[0] || athlete.fullName;
          
          const newAthleteData = {
            fullName: athlete.fullName,
            height: athlete.tb,
            chestWidth: athlete.ld,
            waistCircumference: athlete.lp,
            gender: athlete.gender,
            shirtSize: athlete.size,
            nickname: athlete.fullName.split(' ')[0],
            pob: "Bandung",
            dob: "2010-01-01",
            dominantHand: "Kanan",
            phone: "081200000000",
            email: `${lastName.toLowerCase().replace(/[^a-z0-9]/g, '')}@kulturjuara.org`,
            address: "Bandung",
            schoolOrWork: "Sekolah Atlet",
            emergencyContact: "081211112222",
            weight: "50",
            jerseyNameOption: "lastName",
            jerseyName: lastName.toUpperCase().substring(0, 12),
            category: "Anak-anak (U-13)",
            level: "Beginner",
            startYear: "2023",
            careerTarget: "Prestasi",
            status_aktif: "AKTIF",
          };

          await addDoc(athletesCollection, newAthleteData);
          addedCount++;
        }
      }
      
      if (addedCount > 0) {
        toast({ title: "Success", description: `${addedCount} atlet berhasil ditambahkan ke database.`, className: "bg-green-600 text-white" });
      } else {
        toast({ title: "Info", description: "Semua data atlet sudah ada di database." });
      }
    } catch (error) {
      console.error("Error seeding athletes:", error);
      const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan pada server.";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsSeeding(false);
    }
  };


  return (
    <div className="space-y-8 p-4 md:p-0 font-body pb-24">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-sky-500 text-sky-500 bg-sky-500/10">
                    <Users className="w-3 h-3 mr-2" /> DATABASE ATLET
                </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-foreground">
                Roster <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-600">Atlet</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl text-lg">
                Lihat dan kelola semua atlet yang terdaftar di Kultur Juara Academy.
            </p>
        </div>
        <div className="flex items-center gap-4">
            <Button
                onClick={handleSeedAthletes}
                variant="outline"
                className="h-14 rounded-full px-8 font-bold text-lg"
                disabled={isSeeding || isLoading}
            >
                {isSeeding ? <Loader2 className="mr-2 w-5 h-5 animate-spin"/> : <Database className="mr-2 w-5 h-5"/>}
                {isSeeding ? "Seeding..." : "Seed Athletes"}
            </Button>
            <Button 
                asChild
                className="h-14 rounded-full px-8 bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg shadow-lg transition-transform active:scale-95"
            >
                <Link href="/admin/athletes/register">
                  <UserPlus className="mr-2 w-5 h-5"/> DAFTARKAN ATLET BARU
                </Link>
            </Button>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="rounded-[28px] p-1 overflow-hidden group">
            <CardContent className="p-5 flex items-center gap-4 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground">
                    <Users className="w-6 h-6"/>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Atlet</p>
                    <p className="text-3xl font-black text-foreground">{totalAthletes}</p>
                </div>
            </CardContent>
         </Card>
         <Card className="rounded-[28px] p-1 overflow-hidden group">
            <CardContent className="p-5 flex items-center gap-4 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <ShieldCheck className="w-6 h-6"/>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Atlet Aktif</p>
                    <p className="text-3xl font-black text-foreground">{activeAthletes}</p>
                </div>
            </CardContent>
         </Card>
         <Card className="rounded-[28px] p-1 overflow-hidden group">
            <CardContent className="p-5 flex items-center gap-4 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                    <Star className="w-6 h-6 fill-yellow-500"/>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Kelompok Junior</p>
                    <p className="text-3xl font-black text-foreground">{juniorAthletes}</p>
                </div>
            </CardContent>
         </Card>
      </div>

      {/* --- ATHLETE LIST --- */}
      <div className="bg-card border rounded-[40px] p-2 flex flex-col">
        <div className="flex items-center justify-end px-4 py-4 gap-4">
            <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-muted-foreground" />
                <Input 
                    placeholder="Cari nama atlet..." 
                    className="h-12 bg-background border-border rounded-full pl-10 focus:ring-sky-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Nama Atlet</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAthletes.map((athlete) => (
                  <TableRow key={athlete.id} className="hover:bg-secondary/50">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border-2">
                          <AvatarImage src={athlete.avatar} />
                          <AvatarFallback className="bg-secondary text-sm font-bold">{athlete.fullName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-foreground">{athlete.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{athlete.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-sky-500/30 text-sky-500 bg-sky-500/10">
                        {athlete.level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <Badge variant={athlete.status_aktif === 'AKTIF' ? 'default' : 'secondary'} className={cn(athlete.status_aktif === 'AKTIF' ? 'bg-green-500/10 text-green-600' : 'bg-secondary text-muted-foreground', 'border-none')}>
                        {athlete.status_aktif}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
