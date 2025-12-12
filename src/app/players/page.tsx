
"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Trophy, Shield, User } from "lucide-react";
import { CourtLines } from "@/components/ui/court-lines";
import { cn } from "@/lib/utils";

// Mock Data
const PLAYERS = [
  { name: "Kevin Sanjaya", club: "PB Djarum", level: "Advance", avatar: "KS" },
  { name: "Siti Fadia", club: "PB Jaya Raya", level: "Advance", avatar: "SF" },
  { name: "Anthony Ginting", club: "SGS PLN", level: "Advance", avatar: "AG" },
  { name: "Rizki Karami", club: "PB Super", level: "Intermediate", avatar: "RK" },
  { name: "Budi Santoso", club: "Komunitas ABC", level: "Beginner", avatar: "BS" },
  { name: "Irsyad JPP", club: "Exist", level: "Intermediate", avatar: "IJ" }
];

export default function PlayersListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPlayers = PLAYERS.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "Advance": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Intermediate": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default: return "bg-green-500/10 text-green-400 border-green-500/20";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-24 relative">
        <div className="absolute inset-0 pointer-events-none opacity-5">
           <CourtLines />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter mb-4">
              Player <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Roster</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Lihat daftar atlet yang akan bertanding di Road to BCC 2026.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Cari nama atlet..."
                className="w-full h-14 pl-12 rounded-full bg-secondary/50 border-border/50 text-lg shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlayers.map((player, index) => (
              <div key={index} className="group bg-card/50 backdrop-blur-sm border border-border/20 rounded-3xl p-5 text-center flex flex-col items-center hover:border-primary/50 hover:-translate-y-1 transition-all shadow-lg">
                <Avatar className="w-20 h-20 mb-4 border-4 border-border/20 group-hover:border-primary transition-colors">
                  <AvatarFallback className="text-2xl font-bold bg-secondary">{player.avatar}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg text-foreground">{player.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{player.club}</p>
                <Badge variant="outline" className={cn("mt-auto", getLevelBadge(player.level))}>
                  {player.level}
                </Badge>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
