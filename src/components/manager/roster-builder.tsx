'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X, ArrowRight } from "lucide-react";

interface Player {
  id: string;
  name: string;
  level: string;
}

// Mock Data: Pemain yang sudah join pakai Community Code tapi belum masuk tim
const availablePlayersMock: Player[] = [
  { id: "1", name: "Andi", level: "beginner" },
  { id: "2", name: "Budi", level: "beginner" },
  { id: "3", name: "Citra", level: "intermediate" },
  { id: "4", name: "Dedi", level: "advance" }, // Advance player
];

export function RosterBuilder() {
  const [pool, setPool] = useState<Player[]>(availablePlayersMock);
  const [teams, setTeams] = useState<{id: number, p1: Player | null, p2: Player | null}[]>([
    { id: 1, p1: null, p2: null } // Tim 1 Kosong
  ]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Tambah Slot Tim Baru
  const addTeamSlot = () => {
    setTeams([...teams, { id: teams.length + 1, p1: null, p2: null }]);
  };

  // Assign Player ke Slot
  const assignToSlot = (teamIndex: number, slot: 'p1' | 'p2') => {
    if (!selectedPlayer) return;

    const newTeams = [...teams];
    // Jika slot sudah ada isinya, kembalikan pemain lama ke pool
    if (newTeams[teamIndex][slot]) {
        setPool([...pool, newTeams[teamIndex][slot]!]);
    }
    
    newTeams[teamIndex][slot] = selectedPlayer;
    setTeams(newTeams);
    setPool(pool.filter(p => p.id !== selectedPlayer.id));
    setSelectedPlayer(null);
  };

  // Remove Player dari Slot
  const removeFromSlot = (teamIndex: number, slot: 'p1' | 'p2') => {
    const player = teams[teamIndex][slot];
    if (player) {
        setPool([...pool, player]);
        const newTeams = [...teams];
        newTeams[teamIndex][slot] = null;
        setTeams(newTeams);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* LEFT: PLAYER POOL */}
      <Card className="md:col-span-1 p-4 h-[500px] flex flex-col">
        <h3 className="font-bold mb-4 flex justify-between">
            Player Pool <Badge>{pool.length}</Badge>
        </h3>
        <div className="space-y-2 overflow-y-auto flex-grow pr-2">
            {pool.map(player => (
                <div 
                    key={player.id}
                    onClick={() => setSelectedPlayer(player)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all flex justify-between items-center ${selectedPlayer?.id === player.id ? 'bg-primary text-white border-primary ring-2 ring-primary/30' : 'bg-background hover:bg-secondary'}`}
                >
                    <div>
                        <p className="font-bold text-sm">{player.name}</p>
                        <Badge variant="outline" className={`text-[10px] h-5 ${selectedPlayer?.id === player.id ? 'text-white border-white/50' : ''}`}>{player.level}</Badge>
                    </div>
                    {selectedPlayer?.id === player.id && <ArrowRight className="w-4 h-4" />}
                </div>
            ))}
        </div>
        {selectedPlayer && (
            <div className="mt-4 p-3 bg-secondary/50 rounded-lg text-xs text-center animate-pulse">
                Pilih slot kosong di kanan untuk menempatkan <strong>{selectedPlayer.name}</strong>
            </div>
        )}
      </Card>

      {/* RIGHT: TEAM SLOTS */}
      <div className="md:col-span-2 space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="font-bold">Formasi Tim</h3>
            <Button size="sm" onClick={addTeamSlot}><Plus className="w-4 h-4 mr-1"/> Tambah Tim</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teams.map((team, idx) => (
                <Card key={team.id} className="p-4 border-2 border-dashed">
                    <p className="font-bold text-sm text-muted-foreground mb-3">Tim {team.id}</p>
                    <div className="space-y-2">
                        {/* Slot 1 */}
                        <div 
                            onClick={() => !team.p1 ? assignToSlot(idx, 'p1') : null}
                            className={`h-14 rounded-lg flex items-center justify-between px-3 border transition-colors ${!team.p1 ? (selectedPlayer ? 'bg-green-50 border-green-300 cursor-pointer border-dashed' : 'bg-secondary/30') : 'bg-background border-solid'}`}
                        >
                            {team.p1 ? (
                                <>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs">{team.p1.level[0].toUpperCase()}</div>
                                        <span className="font-bold text-sm">{team.p1.name}</span>
                                    </div>
                                    <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeFromSlot(idx, 'p1')}><X className="w-3 h-3"/></Button>
                                </>
                            ) : (
                                <span className="text-xs text-muted-foreground mx-auto">{selectedPlayer ? "Klik untuk Assign" : "Slot Kosong"}</span>
                            )}
                        </div>

                        {/* Slot 2 */}
                        <div 
                            onClick={() => !team.p2 ? assignToSlot(idx, 'p2') : null}
                            className={`h-14 rounded-lg flex items-center justify-between px-3 border transition-colors ${!team.p2 ? (selectedPlayer ? 'bg-green-50 border-green-300 cursor-pointer border-dashed' : 'bg-secondary/30') : 'bg-background border-solid'}`}
                        >
                            {team.p2 ? (
                                <>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs">{team.p2.level[0].toUpperCase()}</div>
                                        <span className="font-bold text-sm">{team.p2.name}</span>
                                    </div>
                                    <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeFromSlot(idx, 'p2')}><X className="w-3 h-3"/></Button>
                                </>
                            ) : (
                                <span className="text-xs text-muted-foreground mx-auto">{selectedPlayer ? "Klik untuk Assign" : "Slot Kosong"}</span>
                            )}
                        </div>
                    </div>

                    {/* Validation Status for Team */}
                    {team.p1 && team.p2 && (
                         <div className="mt-3 text-center">
                            {/* Di sini panggil fungsi validatePairingAndGetPrice */}
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Valid: {team.p1.level === 'beginner' && team.p2.level === 'beginner' ? 'Beginner' : 'Cek Matriks'}</Badge>
                         </div>
                    )}
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}