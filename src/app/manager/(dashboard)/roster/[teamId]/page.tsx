
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
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { BCC_RULES, TeamSlotRule } from "@/lib/bcc-team-rules";


// --- TIPE DATA & ATURAN (Bisa dipindah ke file terpisah nantinya) ---
type PlayerLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCE" | "3ON3";

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
  name: "PB. Badminton Ceria - Tim A",
  code: "BCC-CERIA-001", // Kode untuk disebar ke atlit
  category: "MD_TEAM" as keyof typeof BCC_RULES,
};

const MOCK_JOINED_PLAYERS: Player[] = [
  { id: "p1", name: "Irsyad Jamal", level: "INTERMEDIATE", status: "PAID", joinedAt: "2025-12-10" },
  { id: "p2", name: "Budi Santoso", level: "BEGINNER", status: "PAID", joinedAt: "2025-12-11" },
  { id: "p3", name: "Kevin Sanjaya", level: "ADVANCE", status: "PAID", joinedAt: "2025-12-11" },
  { id: "p4", name: "Marcus Gideon", level: "ADVANCE", status: "PAID", joinedAt: "2025-12-11" },
  { id: "p5", name: "Hendra Setiawan", level: "INTERMEDIATE", status: "PAID", joinedAt: "2025-12-12" },
  { id: "p6", name: "Mohammad Ahsan", level: "INTERMEDIATE", status: "PAID", joinedAt: "2025-12-12" },
  { id: "p7", name: "Fajar Alfian", level: "BEGINNER", status: "PAID", joinedAt: "2025-12-12" }, // Anggap beginner
  { id: "p8", name: "Rian Ardianto", level: "BEGINNER", status: "PAID", joinedAt: "2025-12-12" },
  // Tambahkan data dummy lainnya untuk test overflow
];

export default function RosterManagementPage() {
  const params = useParams();
  const router = useRouter();
  
  // State untuk menyimpan konfigurasi roster: { [slotId]: [Player, Player] }
  const [rosterMap, setRosterMap] = useState<Record<string, Player[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const teamRules = BCC_RULES[MOCK_TEAM_INFO.category];

  // 1. Filter Pemain: Siapa yang sudah masuk slot, siapa yang belum (Bank Pemain)
  const assignedPlayerIds = useMemo(() => {
    return Object.values(rosterMap).flat().map(p => p.id);
  }, [rosterMap]);

  const availablePlayers = useMemo(() => {
    return MOCK_JOINED_PLAYERS.filter(p => !assignedPlayerIds.includes(p.id));
  }, [assignedPlayerIds]);

  // 2. Actions: Assign & Unassign
  const assignPlayer = (slotId: string, playerId: string) => {
    const player = MOCK_JOINED_PLAYERS.find(p => p.id === playerId);
    if (!player) return;

    const currentSlotPlayers = rosterMap[slotId] || [];
    const slotRule = teamRules.slots.find(s => s.id === slotId);

    if (slotRule && currentSlotPlayers.length >= slotRule.capacity) {
      toast({
        title: "Slot Penuh!",
        description: `Maksimal ${slotRule.capacity} orang untuk posisi ini.`,
        variant: "destructive"
      });
      return;
    }

    setRosterMap(prev => ({
      ...prev,
      [slotId]: [...currentSlotPlayers, player]
    }));
  };

  const handleRemove = (slotId: string, playerId: string) => {
    setRosterMap(prev => ({
      ...prev,
      [slotId]: prev[slotId].filter(p => p.id !== playerId)
    }));
  };

  // 3. Validasi Status Tim
  const validationStatus = useMemo(() => {
    const totalAssigned = assignedPlayerIds.length;
    const progressPercent = Math.min((totalAssigned / teamRules.minPlayers) * 100, 100);
    
    // Cek apakah semua slot WAJIB sudah terisi penuh
    const requiredSlotsFilled = teamRules.slots
      .filter(s => s.required)
      .every(s => (rosterMap[s.id]?.length || 0) === s.capacity);

    const isReady = totalAssigned >= teamRules.minPlayers && requiredSlotsFilled;

    return { totalAssigned, progressPercent, isReady, requiredSlotsFilled };
  }, [assignedPlayerIds.length, rosterMap, teamRules]);

  const copyCode = () => {
    navigator.clipboard.writeText(MOCK_TEAM_INFO.code);
    toast({ title: "Kode Tim Disalin", description: "Bagikan ke grup WhatsApp atlit Anda." });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      
      {/* Header Info Tim */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{MOCK_TEAM_INFO.name}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              Kategori: <Badge variant="outline">{MOCK_TEAM_INFO.category === 'MD_TEAM' ? 'Beregu Putra' : 'Beregu Putri'}</Badge>
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
            <p className="text-[10px] text-muted-foreground mt-1">Bagikan ke atlit untuk join & bayar</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLOM KIRI: MAIN ROSTER AREA (8/12) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Status Bar */}
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h3 className="font-bold text-lg">Kelengkapan Tim</h3>
                  <p className="text-sm text-muted-foreground">
                    Minimal {teamRules.minPlayers} pemain terdaftar untuk validasi.
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${validationStatus.totalAssigned >= teamRules.minPlayers ? 'text-green-600' : 'text-orange-500'}`}>
                    {validationStatus.totalAssigned}
                  </span>
                  <span className="text-muted-foreground text-sm"> / {teamRules.minPlayers} Orang</span>
                </div>
              </div>
              <Progress value={validationStatus.progressPercent} className="h-2" />
            </CardContent>
          </Card>

          {/* Slotting Area */}
          <div className="space-y-4">
            <h3 className="font-bold flex items-center gap-2 text-lg">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Formasi Pertandingan
            </h3>
            
            {teamRules.slots.map((slot) => {
              const currentPlayers = rosterMap[slot.id] || [];
              const isFull = currentPlayers.length >= slot.capacity;
              
              return (
                <Card key={slot.id} className={`overflow-hidden transition-all ${slot.required ? 'border-l-4 border-l-primary' : 'border-l-4 border-l-slate-300 opacity-90'}`}>
                  <div className="p-4 flex flex-col md:flex-row gap-4 md:items-center bg-card">
                    
                    {/* Info Slot */}
                    <div className="w-full md:w-48 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{slot.label}</span>
                        {!slot.required && <Badge variant="outline" className="text-[10px] h-5">Cadangan</Badge>}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px]">{slot.level}</Badge>
                        <span className="text-xs text-muted-foreground">{currentPlayers.length}/{slot.capacity}</span>
                      </div>
                    </div>

                    {/* Player Slots */}
                    <div className="flex-1 flex gap-2 w-full">
                      {/* Render Terisi */}
                      {currentPlayers.map(p => (
                        <div key={p.id} className="relative group flex-1 bg-primary/10 border border-primary/20 rounded-md p-2 flex items-center justify-between min-w-0">
                          <div className="overflow-hidden">
                            <p className="text-xs font-bold truncate">{p.name}</p>
                            <p className="text-[10px] text-muted-foreground capitalize">{p.level.toLowerCase()}</p>
                          </div>
                          <button 
                            onClick={() => handleRemove(slot.id, p.id)}
                            className="text-destructive hover:bg-destructive/10 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}

                      {/* Render Kosong */}
                      {!isFull && Array.from({ length: slot.capacity - currentPlayers.length }).map((_, i) => (
                        <div key={i} className="flex-1 border-2 border-dashed border-muted rounded-md p-1 flex items-center justify-center bg-muted/20">
                           <select 
                             className="bg-transparent text-xs w-full h-full cursor-pointer focus:outline-none text-muted-foreground text-center appearance-none"
                             onChange={(e) => {
                               if(e.target.value) handleAssign(slot.id, e.target.value);
                               e.target.value = "";
                             }}
                           >
                             <option value="">+ Pilih Pemain</option>
                             {availablePlayers.map(ap => (
                               <option key={ap.id} value={ap.id}>
                                 {ap.name} ({ap.level})
                               </option>
                             ))}
                             {availablePlayers.length === 0 && <option disabled>Bank Pemain Kosong</option>}
                           </select>
                        </div>
                      ))}
                    </div>

                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
             <Button 
               size="lg" 
               disabled={!validationStatus.isReady || isSubmitting}
               className={validationStatus.isReady ? "bg-green-600 hover:bg-green-700" : ""}
               onClick={() => {
                 setIsSubmitting(true);
                 setTimeout(() => {
                    setIsSubmitting(false);
                    toast({ title: "Roster Tersimpan!", description: "Susunan pemain berhasil dikunci." });
                 }, 1500);
               }}
             >
               {isSubmitting ? "Menyimpan..." : validationStatus.isReady ? "Finalisasi Tim" : "Tim Belum Lengkap"}
             </Button>
          </div>

        </div>

        {/* KOLOM KANAN: BANK PEMAIN (4/12) */}
        <div className="lg:col-span-4">
          <Card className="sticky top-6 h-[calc(100vh-100px)] flex flex-col border-2 shadow-lg">
            <CardHeader className="pb-3 bg-muted/30">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-primary" />
                Bank Pemain
              </CardTitle>
              <CardDescription className="text-xs">
                Daftar atlet yang sudah <strong>Join & Bayar</strong>. Klik tombol (+) atau pilih dari dropdown di kiri untuk memasukkan ke slot.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-hidden p-0 relative">
               <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-background to-transparent z-10"/>
               <ScrollArea className="h-full px-4 py-2">
                 {availablePlayers.length === 0 ? (
                   <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground p-4">
                      <div className="bg-muted p-3 rounded-full mb-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      </div>
                      <p className="text-sm font-medium">Semua pemain sudah ditempatkan!</p>
                      <p className="text-xs mt-1">Atau belum ada pemain baru yang join.</p>
                   </div>
                 ) : (
                   <div className="space-y-3 pb-4">
                     {availablePlayers.map((player) => (
                       <div key={player.id} className="p-3 bg-card border rounded-lg shadow-sm hover:border-primary/50 transition-colors group relative">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-sm truncate pr-4">{player.name}</h4>
                            <Badge className="text-[10px] px-1 h-5 bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                              LUNAS
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>Level: <strong className="text-foreground">{player.level}</strong></span>
                          </div>
                          
                          {/* Hint Text */}
                          <div className="hidden group-hover:flex absolute inset-0 bg-primary/5 backdrop-blur-[1px] items-center justify-center rounded-lg">
                             <span className="text-xs font-bold text-primary bg-background px-2 py-1 rounded shadow border">
                               Pilih dari Slot di Kiri
                             </span>
                          </div>
                       </div>
                     ))}
                   </div>
                 )}
               </ScrollArea>
               <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-background to-transparent z-10"/>
            </CardContent>

            <CardFooter className="bg-muted/30 pt-4 pb-4 border-t">
              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs font-medium">
                   <span>Total Pool:</span>
                   <span>{MOCK_JOINED_PLAYERS.length} Orang</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                   <span>Belum Masuk Slot:</span>
                   <span>{availablePlayers.length} Orang</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENT: KARTU SLOT ---
function SlotCard({ 
  rule, 
  players, 
  availablePlayers, 
  onAssign, 
  onRemove 
}: { 
  rule: TeamSlotRule, 
  players: Player[], 
  availablePlayers: Player[],
  onAssign: (slotId: string, playerId: string) => void,
  onRemove: (slotId: string, playerId: string) => void
}) {
  const isFull = players.length >= rule.capacity;

  return (
    <Card className={`overflow-hidden transition-all ${rule.required ? 'border-l-4 border-l-primary' : 'border-l-4 border-l-slate-300 opacity-90'}`}>
      <div className="p-4 flex flex-col md:flex-row gap-4 md:items-center bg-card">
        
        {/* Info Slot */}
        <div className="w-full md:w-48 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">{rule.label}</span>
            {!rule.required && <Badge variant="outline" className="text-[10px] h-5">Cadangan</Badge>}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-[10px]">{rule.level}</Badge>
            <span className="text-xs text-muted-foreground">{players.length}/{rule.capacity}</span>
          </div>
        </div>

        {/* Player Slots */}
        <div className="flex-1 flex gap-2 w-full">
          {/* Render Terisi */}
          {players.map(p => (
            <div key={p.id} className="relative group flex-1 bg-primary/10 border border-primary/20 rounded-md p-2 flex items-center justify-between min-w-0">
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate">{p.name}</p>
                <p className="text-[10px] text-muted-foreground capitalize">{p.level.toLowerCase()}</p>
              </div>
              <button 
                onClick={() => onRemove(rule.id, p.id)}
                className="text-destructive hover:bg-destructive/10 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}

          {/* Render Kosong */}
          {!isFull && Array.from({ length: rule.capacity - players.length }).map((_, i) => (
            <div key={i} className="flex-1 border-2 border-dashed border-muted rounded-md p-1 flex items-center justify-center bg-muted/20">
               <select 
                 className="bg-transparent text-xs w-full h-full cursor-pointer focus:outline-none text-muted-foreground text-center appearance-none"
                 onChange={(e) => {
                    if(e.target.value) handleAssign(rule.id, e.target.value);
                    e.target.value = "";
                 }}
               >
                 <option value="">+ Pilih Pemain</option>
                 {availablePlayers.map(ap => (
                   <option key={ap.id} value={ap.id}>
                     {ap.name} ({ap.level})
                   </option>
                 ))}
                 {availablePlayers.length === 0 && <option disabled>Bank Pemain Kosong</option>}
               </select>
            </div>
          ))}
        </div>

      </div>
    </Card>
  );
}
