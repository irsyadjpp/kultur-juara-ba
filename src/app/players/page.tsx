
'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, SlidersHorizontal, ShieldCheck, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CourtLines } from '@/components/ui/court-lines';
import { ClientOnly } from '@/components/client-only';

// MOCK DATA
const PLAYERS = [
  { id: 1, name: 'Kevin Sanjaya', community: 'PB Djarum', stage: 'Main Draw', category: 'Advance', avatar: '/avatars/kevin.jpg', verified: true },
  { id: 2, name: 'Marcus Gideon', community: 'PB Djarum', stage: 'Main Draw', category: 'Advance', avatar: '/avatars/gideon.jpg', verified: true },
  { id: 3, name: 'Anthony Ginting', community: 'SGS PLN', stage: 'Main Draw', category: 'Advance', verified: true },
  { id: 4, name: 'Budi Santoso', community: 'PB Ceria', stage: 'Qualifying', category: 'Beginner', verified: true },
  { id: 5, name: 'Siti Aminah', community: 'PB Gembira', stage: 'Qualifying', category: 'Beginner', verified: false },
  { id: 6, name: 'Joko Anwar', community: 'Smash Community', stage: 'Main Draw', category: 'Intermediate', verified: true },
  { id: 7, name: 'Rina Nose', community: 'Smash Community', stage: 'Reserve', category: 'Intermediate', verified: true },
  { id: 8, name: 'Irsyad Jamal', community: 'Bandung BC', stage: 'Main Draw', category: 'Intermediate', verified: true },
  { id: 9, name: 'Anindiffa Pandu', community: 'Bandung BC', stage: 'Qualifying', category: 'Intermediate', verified: true },
];

const STAGES = ['All', 'Main Draw', 'Qualifying', 'Reserve', 'Withdrawn'];
const CATEGORIES = ['All', 'Beginner', 'Intermediate', 'Advance'];

export default function PlayersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredPlayers = useMemo(() => {
    return PLAYERS.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) || player.community.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStage = stageFilter === 'All' || player.stage === stageFilter;
      const matchesCategory = categoryFilter === 'All' || player.category === categoryFilter;
      return matchesSearch && matchesStage && matchesCategory;
    });
  }, [searchTerm, stageFilter, categoryFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-16 md:py-24 relative">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <CourtLines />
        </div>
        <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary text-primary font-bold tracking-widest uppercase">
              Roster
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter mb-6">
              PARTICIPANT <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">LIST</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Temukan profil atlet yang berpartisipasi dalam Road to BCC 2026.
            </p>
          </div>
          
          <ClientOnly>
            {/* Filter Controls */}
            <Card className="p-4 mb-8 bg-card/50 backdrop-blur-sm border-border/30 rounded-3xl shadow-lg sticky top-24 z-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="relative lg:col-span-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Cari nama atau komunitas..."
                    className="w-full h-14 pl-12 rounded-2xl bg-background/50 text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="lg:col-span-8 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 space-y-1">
                      <label className="text-xs font-bold text-muted-foreground px-2">Stage</label>
                      <div className="bg-background/50 rounded-2xl p-1 flex gap-1">
                          {STAGES.map(stage => (
                              <Button key={stage} size="sm" variant={stageFilter === stage ? "secondary" : "ghost"} onClick={() => setStageFilter(stage)} className="flex-1 rounded-xl h-10 font-bold">{stage}</Button>
                          ))}
                      </div>
                  </div>
                   <div className="flex-1 space-y-1">
                      <label className="text-xs font-bold text-muted-foreground px-2">Kategori</label>
                      <div className="bg-background/50 rounded-2xl p-1 flex gap-1">
                          {CATEGORIES.map(cat => (
                              <Button key={cat} size="sm" variant={categoryFilter === cat ? "secondary" : "ghost"} onClick={() => setCategoryFilter(cat)} className="flex-1 rounded-xl h-10 font-bold">{cat}</Button>
                          ))}
                      </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Player Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredPlayers.map(player => (
                <Card key={player.id} className="p-4 bg-card/30 backdrop-blur-sm border-border/20 rounded-3xl hover:-translate-y-1 transition-transform hover:border-primary/50">
                  <CardContent className="p-0 flex flex-col items-center text-center">
                    <div className="relative mb-3">
                      <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback className="bg-secondary text-2xl font-bold">{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {player.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1 border-2 border-background">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-lg leading-tight truncate w-full">{player.name}</h3>
                    <p className="text-xs text-muted-foreground truncate w-full">{player.community}</p>
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      <Badge variant="secondary" className="text-xs">{player.stage}</Badge>
                      <Badge variant="outline" className="text-xs">{player.category}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredPlayers.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="font-bold">Pemain tidak ditemukan.</p>
                <p className="text-sm">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
              </div>
            )}
          </ClientOnly>
        </div>
      </main>
      <Footer />
    </div>
  );
}
