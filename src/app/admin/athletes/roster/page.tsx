'use client';

import { useState, useMemo, useEffect, useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from 'react-dom';
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
import { collection } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";
import { seedAthletes } from "./actions";

// Define the type for an athlete based on Firestore data
interface Athlete {
  id: string;
  fullName: string;
  category: string;
  level: string;
  status_aktif: 'AKTIF' | 'NON-AKTIF';
  avatar?: string;
}

const initialState = {
  success: false,
  message: "",
};

function SeedButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            variant="outline"
            className="h-14 rounded-full px-8 font-bold text-lg"
            disabled={pending}
        >
            {pending ? <Loader2 className="mr-2 w-5 h-5 animate-spin"/> : <Database className="mr-2 w-5 h-5"/>}
            {pending ? "Seeding..." : "Seed Athletes"}
        </Button>
    )
}

export default function AthleteRosterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const firestore = useFirestore();
  const { toast } = useToast();
  const [seedState, seedAction] = useActionState(seedAthletes, initialState);

  useEffect(() => {
    if (seedState.message) {
        toast({
            title: seedState.success ? "Success" : "Info",
            description: seedState.message,
            className: seedState.success ? "bg-green-600 text-white" : "",
        });
    }
  }, [seedState, toast]);

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
            <form action={seedAction}>
                <SeedButton/>
            </form>
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
