
'use client';

import { useState } from "react";
import Link from "next/link";
import { 
  Users, Shield, Trophy, Search, 
  Plus, MapPin, Mail, Phone, Edit3, 
  Crown, Star, UserPlus, Briefcase, 
  MoreHorizontal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const ATHLETES = [
  { 
    id: "KJA-001", 
    name: "Irsyad JPP", 
    category: "Remaja",
    level: "Elite",
    status: "ACTIVE", 
    avatar: "/avatars/irsyad.jpg"
  },
  { 
    id: "KJA-002", 
    name: "Kevin Sanjaya", 
    category: "Dewasa",
    level: "Elite",
    status: "ACTIVE", 
    avatar: "https://github.com/shadcn.png"
  },
  { 
    id: "KJA-003", 
    name: "Siti Fadia", 
    category: "Dewasa",
    level: "Advanced",
    status: "ACTIVE", 
    avatar: ""
  },
  { 
    id: "KJA-004", 
    name: "Anthony Ginting", 
    category: "Dewasa",
    level: "Elite",
    status: "ACTIVE", 
    avatar: ""
  },
  { 
    id: "KJA-005", 
    name: "Budi Pemula", 
    category: "Anak",
    level: "Beginner",
    status: "NON-ACTIVE", 
    avatar: ""
  },
];

const STATS = {
  totalAthletes: 45,
  activeAthletes: 42,
  juniorAthletes: 25,
};

export default function AthleteRosterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAthletes = ATHLETES.filter(athlete => 
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <Button 
            asChild
            className="h-14 rounded-full px-8 bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg shadow-lg transition-transform active:scale-95"
        >
            <Link href="/admin/athletes/register">
              <UserPlus className="mr-2 w-5 h-5"/> DAFTARKAN ATLET BARU
            </Link>
        </Button>
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
                    <p className="text-3xl font-black text-foreground">{STATS.totalAthletes}</p>
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
                    <p className="text-3xl font-black text-foreground">{STATS.activeAthletes}</p>
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
                    <p className="text-3xl font-black text-foreground">{STATS.juniorAthletes}</p>
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

        <div className="overflow-x-auto">
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
                        <AvatarFallback className="bg-secondary text-sm font-bold">{athlete.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-foreground">{athlete.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{athlete.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-sky-500/30 text-sky-500 bg-sky-500/10">
                      {athlete.level}
                    </Badge>
                  </TableCell>
                  <TableCell>
                     <Badge variant={athlete.status === 'ACTIVE' ? 'default' : 'secondary'} className={cn(athlete.status === 'ACTIVE' ? 'bg-green-500/10 text-green-600' : 'bg-secondary text-muted-foreground', 'border-none')}>
                      {athlete.status}
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
        </div>
      </div>
    </div>
  );
}
