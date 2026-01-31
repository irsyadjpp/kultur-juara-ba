
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, MessageCircle, UserPlus, ShieldAlert } from "lucide-react";
import { validatePairing, PlayerLevel, PlayerTier } from "@/lib/matrix-validation";
import { useToast } from "@/hooks/use-toast";

// Mock Data Pemain yang sedang mencari pasangan
const AVAILABLE_PLAYERS = [
  { id: "1", name: "Budi Santoso", level: "Beginner" as PlayerLevel, tier: 3 as PlayerTier, club: "Komunitas ABC", avatar: "BS" },
  { id: "2", name: "Anak Baru", level: "Beginner" as PlayerLevel, tier: 4 as PlayerTier, club: "Independen", avatar: "AB" },
  { id: "3", name: "Pemain Jago", level: "Beginner" as PlayerLevel, tier: 1 as PlayerTier, club: "PB Djarum KW", avatar: "PJ" },
];

// Mock Profil Saya (User yang sedang login)
const MY_PROFILE = { id: "me", name: "Irsyad JPP", level: "Beginner" as PlayerLevel, tier: 2 as PlayerTier };

export default function FindPartnerPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInvite = (targetPlayer: typeof AVAILABLE_PLAYERS[0]) => {
    // Panggil Logic Validasi Matriks (Fitur 6)
    const validation = validatePairing(MY_PROFILE, targetPlayer);

    if (!validation.isValid) {
      // Tampilkan Error Pop-up / Toast
      toast({
        variant: "destructive",
        title: "Kombinasi Dilarang!",
        description: validation.message,
        action: <ShieldAlert className="h-5 w-5" />,
      });
    } else {
      // Sukses
      toast({
        title: "Invitation Sent!",
        description: `Anda valid bermain di kategori: ${validation.allowedCategory}`,
        className: "bg-primary text-primary-foreground border-none",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 px-6 pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-headline text-3xl tracking-tight mb-2">
          FIND YOUR <span className="text-primary text-outline">DUO</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Cari partner yang cocok, cek matriks level otomatis, dan menangkan turnamen.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Cari nama, klub, atau level..." 
            className="pl-12 h-12 rounded-3xl bg-secondary/30 border-transparent focus:border-primary/50 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button size="icon" variant="outline" className="h-12 w-12 rounded-2xl border-2 hover:bg-secondary">
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      {/* Grid Pemain */}
      <div className="grid grid-cols-1 gap-4">
        {AVAILABLE_PLAYERS.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((player) => {
          // Pre-check validation untuk visual cue (opsional)
          const check = validatePairing(MY_PROFILE, player);
          
          return (
            <div key={player.id} className="group relative bg-card rounded-3xl p-5 shadow-m3-1 hover:shadow-m3-3 transition-all duration-300 border border-transparent hover:border-primary/20">
              
              {/* Badge Level */}
              <div className="absolute top-0 right-0 p-5">
                 <Badge variant={check.isValid ? "default" : "destructive"} className="rounded-lg font-mono text-xs uppercase">
                    {player.level} • T{player.tier}
                 </Badge>
              </div>

              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-border group-hover:border-primary transition-colors">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${player.avatar}`} />
                  <AvatarFallback>{player.avatar}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-bold text-lg leading-none mb-1">{player.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    Club: <span className="text-foreground font-medium">{player.club}</span>
                  </p>
                  
                  {/* Visual Matriks Status */}
                  {!check.isValid && (
                    <p className="text-[10px] text-destructive mt-2 font-medium bg-destructive/10 px-2 py-1 rounded-md inline-block">
                      🚫 Matriks Tidak Sesuai
                    </p>
                  )}
                   {check.isValid && (
                    <p className="text-[10px] text-green-600 dark:text-green-400 mt-2 font-medium bg-green-500/10 px-2 py-1 rounded-md inline-block">
                      ✅ Cocok untuk {check.allowedCategory}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <Button variant="secondary" className="rounded-xl h-10 text-xs font-bold">
                  <MessageCircle className="mr-2 h-3.5 w-3.5" />
                  Chat
                </Button>
                <Button 
                  disabled={!check.isValid}
                  onClick={() => handleInvite(player)}
                  className={`rounded-xl h-10 text-xs font-bold shadow-md ${check.isValid ? 'bg-primary text-white hover:bg-primary/90' : 'bg-muted text-muted-foreground'}`}
                >
                  <UserPlus className="mr-2 h-3.5 w-3.5" />
                  Invite
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
