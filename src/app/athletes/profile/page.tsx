
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, ShieldCheck, TrendingUp, Youtube, Camera } from "lucide-react";

export default function PlayerProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-24 px-6 pt-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline text-3xl tracking-tight">MY <span className="text-primary text-outline">STATS</span></h1>
          <p className="text-muted-foreground text-sm">Kelola identitas dan pantau performa.</p>
        </div>
        <Button size="icon" variant="outline" className="rounded-2xl h-12 w-12 border-2">
          <Edit2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* 1. VISUAL IDENTITY CARD (Gen-Z Style) */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-card border border-border/50 shadow-m3-1">
          {/* Cover Image / Abstract BG */}
          <div className="h-32 bg-gradient-sport opacity-90"></div>
          
          <div className="px-6 pb-6 -mt-12 relative z-10">
            <div className="flex justify-between items-end mb-4">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-4 border-background shadow-xl cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>IJ</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-lg border-2 border-background">
                  <Camera size={14} />
                </div>
              </div>
              <div className="text-right mb-2">
                <Badge variant="secondary" className="font-mono text-xs mb-1">
                  MEMBER SINCE 2023
                </Badge>
                <h2 className="font-headline text-2xl leading-none">IRSYAD JPP</h2>
                <p className="text-sm text-muted-foreground">PB. Exist Jakarta</p>
              </div>
            </div>

            {/* Social & Video Link */}
            <div className="flex gap-3 mt-4">
              <Button variant="outline" className="flex-1 rounded-xl h-10 text-xs font-bold gap-2">
                <Youtube className="h-4 w-4 text-red-600" />
                Video Permainan
              </Button>
            </div>
          </div>
        </div>

        {/* 2. TPF ASSESSMENT RESULT (Fitur No. 3) */}
        <div className="bg-foreground text-background rounded-[2rem] p-6 shadow-m3-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck size={120} />
          </div>
          
          <div className="flex items-center gap-2 mb-6">
            <Badge className="bg-primary text-white hover:bg-primary border-none px-3 py-1">
              OFFICIAL TPF RESULT
            </Badge>
            <span className="text-xs text-background/60 font-mono">UPDATED: 12 DEC</span>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest opacity-70 mb-1">Assigned Level</p>
              <p className="font-headline text-3xl text-primary">INTERMEDIATE</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest opacity-70 mb-1">Current Tier</p>
              <p className="font-headline text-3xl">TIER 2</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>SKILL SCORE</span>
                <span>82/100</span>
              </div>
              <Progress value={82} className="h-3 rounded-full bg-white/20 [&>div]:bg-primary" />
            </div>
            
            <div className="bg-background/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-xs leading-relaxed font-medium">
                <span className="text-primary font-bold">Catatan TPF:</span> "Footwork sangat baik, namun perlu peningkatan power pada smash belakang. Konsistensi defense sudah layak untuk level Intermediate."
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-primary text-white text-[10px]">TS</AvatarFallback>
                </Avatar>
                <span className="text-[10px] opacity-70">Dinilai oleh: Coach Taufik S.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PERSONAL DETAILS FORM (Read Only / Edit Mode) */}
        <div className="bg-card rounded-[2rem] p-6 shadow-m3-1">
          <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            Data Pribadi
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <Label className="text-xs text-muted-foreground">Nama Lengkap (Sesuai KTP)</Label>
              <Input defaultValue="Irsyad JPP" className="rounded-xl border-none bg-secondary/30 font-semibold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">WhatsApp</Label>
                <Input defaultValue="0812-3456-7890" className="rounded-xl border-none bg-secondary/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Jersey Size</Label>
                <Input defaultValue="L" className="rounded-xl border-none bg-secondary/30 text-center" />
              </div>
            </div>
          </div>
          <Button className="w-full mt-6 rounded-pill bg-secondary text-foreground hover:bg-secondary/80 font-bold">
            Request Data Change
          </Button>
        </div>
      </div>
    </div>
  );
}
