
"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  UserPlus, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Copy,
  ChevronRight,
  ShieldCheck,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BCC_RULES } from "@/lib/bcc-team-rules";


// --- TIPE DATA & ATURAN (Bisa dipindah ke file terpisah nantinya) ---
type PlayerLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCE";

interface Player {
  id: string;
  name: string;
  level: PlayerLevel;
  avatar?: string;
  status: "PAID" | "PENDING";
  joinedAt: string;
}

// --- MOCK DATA (Ganti dengan Fetch API di Real Implementation) ---
const MOCK_TEAM_INFO = {
  id: "team-123",
  name: "The Smashers",
  code: "BCC-SMASH-001", // Kode untuk disebar ke atlit
  category: "Beginner" as keyof typeof BCC_RULES,
};

const MOCK_JOINED_PLAYERS: Player[] = [
  { id: "p1", name: "Irsyad Jamal", level: "INTERMEDIATE", status: "PAID", joinedAt: "2025-12-10" },
];

export default function RosterManagementPage() {
  const params = useParams();
  const router = useRouter();
  
  // State untuk menyimpan pemain yang terdaftar di tim
  const [teamPlayers, setTeamPlayers] = useState<Player[]>(MOCK_JOINED_PLAYERS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const teamRules = BCC_RULES[MOCK_TEAM_INFO.category];

  // 1. Validasi Status Tim
  const validationStatus = useMemo(() => {
    const totalPlayers = teamPlayers.length;
    const progressPercent = Math.min((totalPlayers / teamRules.minPlayers) * 100, 100);
    const isReady = totalPlayers >= teamRules.minPlayers && totalPlayers <= teamRules.maxPlayers;
    return { totalPlayers, progressPercent, isReady };
  }, [teamPlayers, teamRules]);

  const handleRemovePlayer = (playerId: string) => {
    setTeamPlayers(prev => prev.filter(p => p.id !== playerId));
     toast({
        title: "Pemain Dihapus",
        description: `Pemain telah dikeluarkan dari tim.`,
        variant: "destructive"
      });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(MOCK_TEAM_INFO.code);
    toast({ title: "Kode Tim Disalin", description: "Bagikan ke grup WhatsApp atlet Anda." });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      
      {/* Header Info Tim */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{MOCK_TEAM_INFO.name}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              Kategori: <Badge variant="outline">{MOCK_TEAM_INFO.category}</Badge>
            </p>
          </div>
          <div className="bg-background p-4 rounded-lg border text-center min-w-[200px]">
            <p className="text-xs text-muted-foreground mb-1">KODE AKSES TIM</p>
            <div className="flex items-center justify-center gap-2">
              <code className="text-xl font-mono font-bold text-primary">{MOCK_TEAM_INFO.code}</code>
              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={copyCode}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Bagikan ke atlet untuk join & bayar</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLOM UTAMA: DAFTAR PEMAIN (8/12) */}
        <div className="lg:col-span-12 space-y-6">
          
          <Card>
             <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-primary" />
                Roster Pemain ({teamPlayers.length}/{teamRules.maxPlayers})
              </CardTitle>
              <CardDescription>
                Daftar pemain yang sudah bergabung dengan tim Anda. Maksimal {teamRules.maxPlayers} pemain.
              </CardDescription>
            </CardHeader>
            <CardContent>
                {teamPlayers.length > 0 ? (
                    <div className="space-y-3">
                        {teamPlayers.map(player => (
                             <div key={player.id} className="p-3 bg-card border rounded-lg shadow-sm hover:border-primary/50 transition-colors group flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-sm truncate">{player.name}</h4>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                        <Badge variant="secondary" className="text-[10px]">{player.level}</Badge>
                                        <Badge className={`text-[10px] ${player.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {player.status === 'PAID' ? 'LUNAS' : 'PENDING'}
                                        </Badge>
                                    </div>
                                </div>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive/50 hover:text-destructive hover:bg-destructive/10" onClick={() => handleRemovePlayer(player.id)}>
                                    <Trash2 className="w-4 h-4"/>
                                </Button>
                             </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">Belum ada pemain yang bergabung.</p>
                    </div>
                )}
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
             <Button 
               size="lg" 
               disabled={!validationStatus.isReady || isSubmitting}
               className={validationStatus.isReady ? "bg-green-600 hover:bg-green-700" : ""}
               onClick={() => {
                 setIsSubmitting(true);
                 setTimeout(() => {
                    setIsSubmitting(false);
                    toast({ title: "Tim Disimpan!", description: "Susunan pemain berhasil dikunci." });
                 }, 1500);
               }}
             >
               {isSubmitting ? "Menyimpan..." : validationStatus.isReady ? "Finalisasi Tim" : "Tim Belum Lengkap"}
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
