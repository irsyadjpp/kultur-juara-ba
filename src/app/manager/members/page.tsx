
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Search, Filter, MoreHorizontal, FileVideo, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-3xl mb-1">DATA <span className="text-primary">ANGGOTA</span></h1>
          <p className="text-muted-foreground text-sm">Kelola 42 atlet terdaftar di komunitas.</p>
        </div>
        <Button className="rounded-pill font-bold shadow-lg shadow-primary/20">
           + Tambah Manual
        </Button>
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-3 bg-card p-2 rounded-[1.5rem] shadow-sm">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Cari nama atau kode atlet..." 
              className="pl-12 border-none bg-secondary/30 rounded-xl h-11"
            />
         </div>
         <Button variant="ghost" className="rounded-xl gap-2">
            <Filter size={18} /> Filter
         </Button>
      </div>

      {/* MEMBERS TABLE */}
      <div className="bg-card rounded-[2rem] shadow-m3-1 overflow-hidden border border-border/50">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow>
              <TableHead className="w-[50px] font-bold text-xs uppercase pl-6">Avatar</TableHead>
              <TableHead className="font-bold text-xs uppercase">Nama & Kode</TableHead>
              <TableHead className="font-bold text-xs uppercase">Status TPF</TableHead>
              <TableHead className="font-bold text-xs uppercase">Level / Tier</TableHead>
              <TableHead className="font-bold text-xs uppercase text-right pr-6">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i} className="hover:bg-secondary/20">
                <TableCell className="pl-6">
                   <Avatar className="h-10 w-10 rounded-xl">
                      <AvatarFallback>P{i}</AvatarFallback>
                   </Avatar>
                </TableCell>
                <TableCell>
                   <p className="font-bold text-sm">Nama Pemain {i}</p>
                   <p className="text-xs text-muted-foreground font-mono">BCC-8821-{i}</p>
                </TableCell>
                <TableCell>
                   {i === 1 ? (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                         Menunggu Video
                      </Badge>
                   ) : (
                      <div className="flex items-center gap-1.5 text-green-600 text-xs font-bold">
                         <ShieldCheck size={14} /> Selesai
                      </div>
                   )}
                </TableCell>
                <TableCell>
                   {i === 1 ? (
                      <span className="text-xs text-muted-foreground">-</span>
                   ) : (
                      <div className="flex gap-1">
                         <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">Advance</Badge>
                         <Badge variant="outline">Tier 2</Badge>
                      </div>
                   )}
                </TableCell>
                <TableCell className="text-right pr-6">
                   <Button size="icon" variant="ghost">
                      <MoreHorizontal size={18} />
                   </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
