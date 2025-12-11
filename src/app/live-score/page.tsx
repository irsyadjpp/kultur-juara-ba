
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Shield, Users, Swords } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CourtLines } from '@/components/ui/court-lines';

// --- MOCK DATA GENERATOR ---
const generateTeams = (count: number, prefix: string) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    name: `Tim ${prefix} ${i + 1}`,
    players: `Pemain ${i*2+1} / Pemain ${i*2+2}`,
    wins: Math.floor(Math.random() * 4),
    loss: 3 - Math.floor(Math.random() * 4),
    points: Math.floor(Math.random() * 100) + 50,
  }));
};

const generateGroups = (teamCount: number, groupCount: number, prefix: string) => {
  const teams = generateTeams(teamCount, prefix);
  const groups = Array.from({ length: groupCount }, (_, i) => ({
    name: `Grup ${String.fromCharCode(65 + i)}`,
    teams: [] as any[],
  }));

  for (let i = 0; i < teams.length; i++) {
    groups[i % groupCount].teams.push(teams[i]);
  }
  
  // Sort teams within each group by wins and then points
  groups.forEach(group => {
    group.teams.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.points - a.points;
    });
  });

  return groups;
};

const BRACKET_DATA = {
  beginner: { teams: 32, groups: 8, data: generateGroups(32, 8, 'B') },
  intermediate: { teams: 16, groups: 4, data: generateGroups(16, 4, 'I') },
  advance: { teams: 16, groups: 4, data: generateGroups(16, 4, 'A') },
};

export default function LiveScorePage() {
  const [activeTab, setActiveTab] = useState('beginner');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-16 md:py-24 relative">
        <div className="absolute inset-0 pointer-events-none opacity-5">
           <CourtLines />
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary text-primary font-bold tracking-widest uppercase">
              Live Bracket
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black font-headline uppercase tracking-tighter mb-6">
              ROAD TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">GLORY</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Pantau hasil dan klasemen grup secara real-time. Siapakah yang akan melaju ke babak knockout?
            </p>
          </div>

          <Tabs defaultValue="beginner" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-secondary/50 p-2 rounded-full h-auto">
                <TabsTrigger value="beginner" className="text-base font-bold rounded-full px-8 py-3 data-[state=active]:bg-background data-[state=active]:text-primary">
                  Beginner
                </TabsTrigger>
                <TabsTrigger value="intermediate" className="text-base font-bold rounded-full px-8 py-3 data-[state=active]:bg-background data-[state=active]:text-primary">
                  Intermediate
                </TabsTrigger>
                <TabsTrigger value="advance" className="text-base font-bold rounded-full px-8 py-3 data-[state=active]:bg-background data-[state=active]:text-primary">
                  Advance
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="beginner">
              <GroupStageView categoryData={BRACKET_DATA.beginner} />
            </TabsContent>
            <TabsContent value="intermediate">
              <GroupStageView categoryData={BRACKET_DATA.intermediate} />
            </TabsContent>
            <TabsContent value="advance">
              <GroupStageView categoryData={BRACKET_DATA.advance} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// --- SUB-COMPONENTS ---

function GroupStageView({ categoryData }: { categoryData: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-in fade-in-50 duration-300">
      {categoryData.data.map((group: any) => (
        <Card key={group.name} className="bg-card/50 backdrop-blur-sm border-border/20 rounded-3xl overflow-hidden shadow-lg">
          <CardHeader className="bg-secondary/30 border-b border-border/20 p-4">
            <CardTitle className="text-lg font-bold flex items-center justify-between">
              <span>{group.name}</span>
              <Badge variant="outline">{categoryData.teams / categoryData.groups} Tim</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/10">
              {group.teams.map((team: any, index: number) => (
                <div key={team.id} className={cn("p-4 flex items-center justify-between transition-colors hover:bg-secondary/20", index < 2 && "bg-primary/5")}>
                  <div className="flex items-center gap-3">
                    <span className={cn("font-bold text-lg w-6 text-center", index < 2 ? "text-primary" : "text-muted-foreground")}>
                      {index + 1}
                    </span>
                    <Avatar className="h-9 w-9 border-2 border-border/10">
                      <AvatarFallback className="bg-secondary/50 text-xs font-bold text-muted-foreground">{team.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm text-foreground line-clamp-1">{team.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{team.players}</p>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="font-mono font-bold text-foreground">{team.wins} <span className="text-xs text-muted-foreground">W</span></p>
                     <p className="text-[10px] text-muted-foreground">{team.points} Pts</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
