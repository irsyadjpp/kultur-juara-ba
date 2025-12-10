
"use client";

import { useState } from "react";
import { BCC_RULES, TeamSlotRule } from "@/lib/bcc-team-rules";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  UserPlus, 
  CheckCircle2, 
  AlertCircle, 
  Trash2,
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- MOCK DATA (Seharusnya dari Database) ---
const MOCK_TEAM_DATA = {
  id: "team-123",
  name: "PB. Badminton Ceria - Tim A",
  categoryCode: "MD_TEAM", // MD_TEAM atau WD_TEAM
  teamCode: "BCC-CERIA-001", // Kode untuk disebar ke atlit
};

// Data Pemain yang sudah JOIN & BAYAR (Paid Pool)
const MOCK_PAID_PLAYERS = [
  { id: "p1", name: "Irsyad", level: "INTERMEDIATE", status: "PAID" },
  { id: "p2", name: "Budi Santoso", level: "BEGINNER", status: "PAID" },
  { id: "p3", name: "Kevin Sanjaya", level: "ADVANCE", status: "PAID" },
  { id: "p4", name: "Marcus Gideon", level: "ADVANCE", status: "PAID" },
  { id: "p5", name: "Ahsan", level: "INTERMEDIATE", status: "PAID" },
  // ... bayangkan ada banyak pemain
];

export default function RosterManagementPage({ params }: { params: { teamId: string } }) {
  // State untuk menyimpan siapa ada di slot mana
  // Format: { "md_beg_1": [playerObj, playerObj], "md_beg_2": [] }
  const [roster, setRoster] = useState<Record<string, typeof MOCK_PAID_PLAYERS>>({});
  
  const rules = BCC_RULES[MOCK_TEAM_DATA.categoryCode];
  const { toast } = useToast();

  // Helper: Ambil pemain yang BELUM masuk slot manapun
  const getUnassignedPlayers = () => {
    const assignedIds = Object.values(roster).flat().map(p => p.id);
    return MOCK_PAID_PLAYERS.filter(p => !assignedIds.includes(p.id));
  };

  // Action: Masukkan pemain ke slot
  const assignPlayer = (slotId: string, player: typeof MOCK_PAID_PLAYERS[0]) => {
    const currentSlot = roster[slotId] || [];
    const slotRule = rules.slots.find(s => s.id === slotId);
    
    if (!slotRule) return;
    if (currentSlot.length >= slotRule.capacity) {
      toast({ title: "Slot Penuh", description: "Hapus pemain dulu sebelum menambah.", variant: "destructive" });
      return;
    }

    setRoster({
      ...roster,
      [slotId]: [...currentSlot, player]
    });
  };

  // Action: Hapus pemain dari slot
  const removePlayer = (slotId: string, playerId: string) => {
    setRoster({
      ...roster,
      [slotId]: (roster[slotId] || []).filter(p => p.id !== playerId)
    });
  };

  // Validasi Kelengkapan Tim
  const calculateProgress = () => {
    const totalAssigned = Object.values(roster).flat().length;
    const progress = Math.min((totalAssigned / rules.minTotalPlayers) * 100, 100);
    const isComplete = totalAssigned >= rules.minTotalPlayers; // Simplifikasi logika
    
    // Cek apakah semua slot WAJIB sudah terisi penuh
    const requiredSlotsFilled = rules.slots
      .filter(s => s.required)
      .every(s => (roster[s.id]?.length || 0) === s.capacity);

    return { totalAssigned, progress, isReady: isComplete && requiredSlotsFilled };
  };

  const { totalAssigned, progress, isReady } = calculateProgress();

  return (
    <div className="container mx-auto py-6 space-y-6">
      
      {/* Header Info Tim */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{MOCK_TEAM_DATA.name}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              Kategori: <Badge variant="outline">{MOCK_TEAM_DATA.categoryCode === 'MD_TEAM' ? 'Beregu Putra' : 'Beregu Putri'}</Badge>
            </p>
          </div>
          <div className="bg-background p-4 rounded-lg border text-center min-w-[200px]">
            <p className="text-xs text-muted-foreground mb-1">KODE AKSES TIM</p>
            <div className="flex items-center justify-center gap-2">
              <code className="text-xl font-mono font-bold text-primary">{MOCK_TEAM_DATA.teamCode}</code>
              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => {
                navigator.clipboard.writeText(MOCK_TEAM_DATA.teamCode);
                toast({ title: "Copied!" });
              }}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Bagikan ke atlit untuk join & bayar</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KOLOM KIRI: SLOTTING AREA (2/3 layar) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" /> Formasi Pemain
            </h2>
            <div className="flex items-center gap-2 text-sm">
              <span className={isReady ? "text-green-600 font-bold" : "text-orange-500 font-bold"}>
                {totalAssigned} / {rules.minTotalPlayers} Atlet Terisi
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />

          {/* Render Slots */}
          <div className="space-y-4 mt-4">
            {rules.slots.map((slot) => (
              <SlotCard 
                key={slot.id} 
                rule={slot} 
                players={roster[slot.id] || []}
                availablePlayers={getUnassignedPlayers()}
                onAssign={assignPlayer}
                onRemove={removePlayer}
              />
            ))}
          </div>

          {/* Tombol Finalisasi */}
          <div className="pt-4 border-t mt-8">
            <Button className="w-full md:w-auto" size="lg" disabled={!isReady}>
              {isReady ? "Finalisasi & Kunci Roster" : "Lengkapi Slot Wajib untuk Finalisasi"}
            </Button>
            {!isReady && (
              <p className="text-xs text-destructive mt-2">
                * Pastikan minimal {rules.minTotalPlayers} pemain terdaftar dan semua slot Beginner/Inter/Adv utama terisi penuh.
              </p>
            )}
          </div>
        </div>

        {/* KOLOM KANAN: POOL PEMAIN (1/3 layar) */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6 h-[calc(100vh-100px)] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-md">Bank Pemain (Lunas)</CardTitle>
              <CardDescription>
                Pemain yang sudah memasukkan kode tim & membayar.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full px-4 pb-4">
                <div className="space-y-2">
                  {getUnassignedPlayers().length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      <p>Tidak ada pemain tersedia.</p>
                      <p className="text-xs mt-1">Pastikan atlit sudah join & bayar.</p>
                    </div>
                  ) : (
                    getUnassignedPlayers().map((player) => (
                      <div key={player.id} className="p-3 border rounded-md bg-slate-50 dark:bg-slate-900 flex justify-between items-center group">
                        <div>
                          <p className="font-medium text-sm">{player.name}</p>
                          <Badge variant="secondary" className="text-[10px] mt-1">{player.level}</Badge>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-green-500" title="Sudah Bayar" />
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
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
  players: any[], 
  availablePlayers: any[],
  onAssign: (id: string, p: any) => void,
  onRemove: (id: string, pid: string) => void
}) {
  const isFull = players.length >= rule.capacity;

  return (
    <Card className={`border-l-4 ${rule.required ? 'border-l-blue-500' : 'border-l-gray-300'}`}>
      <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        
        {/* Info Slot */}
        <div className="w-full md:w-1/3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            {rule.label}
            {!rule.required && <Badge variant="outline" className="text-[10px]">Cadangan</Badge>}
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Kapasitas: {players.length} / {rule.capacity} Orang
          </p>
        </div>

        {/* Slot Players Container */}
        <div className="flex-1 flex gap-2 w-full">
          {/* Render Filled Slots */}
          {players.map((p) => (
            <div key={p.id} className="relative group flex-1 bg-primary/10 border border-primary/20 rounded px-3 py-2 flex items-center justify-between min-w-0">
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate">{p.name}</p>
                <p className="text-[10px] text-muted-foreground">ID: {p.id.slice(0,4)}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-destructive hover:bg-destructive/10 -mr-1"
                onClick={() => onRemove(rule.id, p.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}

          {/* Render Empty Slots */}
          {Array.from({ length: Math.max(0, rule.capacity - players.length) }).map((_, idx) => (
             <div key={idx} className="flex-1 border border-dashed rounded px-3 py-2 flex items-center justify-center bg-slate-50 dark:bg-slate-900/50">
               {/* Dropdown Simple untuk Assign */}
               <select 
                 className="bg-transparent text-xs w-full cursor-pointer focus:outline-none text-muted-foreground"
                 onChange={(e) => {
                    const pid = e.target.value;
                    const p = availablePlayers.find(x => x.id === pid);
                    if(p) onAssign(rule.id, p);
                    e.target.value = ""; // reset
                 }}
               >
                 <option value="">+ Isi Slot Kosong</option>
                 {availablePlayers.map(ap => (
                   <option key={ap.id} value={ap.id}>
                     {ap.name} ({ap.level})
                   </option>
                 ))}
               </select>
             </div>
          ))}
        </div>

      </CardContent>
    </Card>
  )
}
