
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Shield, Users, Swords, Loader2, ChevronRight } from 'lucide-react';
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
  
  groups.forEach(group => {
    group.teams.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.points - a.points;
    });
  });

  return groups;
};

// --- BRACKET STRUCTURE GENERATOR ---
const createBracketRound = (name: string, numMatches: number, teamsPerMatch: number = 2) => {
  return {
    name,
    matches: Array.from({ length: numMatches }, (_, i) => ({
      id: `${name.substring(0,3)}-${i+1}`,
      teams: Array(teamsPerMatch).fill({ name: "TBD" }),
    }))
  };
};

const generateAllBrackets = () => ({
  beginner: { 
    teams: 32, 
    groups: 8, 
    groupData: generateGroups(32, 8, 'B'),
    knockout: [
      createBracketRound("16 Besar", 8),
      createBracketRound("Perempat Final", 4),
      createBracketRound("Semifinal", 2),
      createBracketRound("Final", 1),
    ]
  },
  intermediate: { 
    teams: 16, 
    groups: 4, 
    groupData: generateGroups(16, 4, 'I'),
    knockout: [
      createBracketRound("Perempat Final", 4),
      createBracketRound("Semifinal", 2),
      createBracketRound("Final", 1),
    ]
  },
  advance: { 
    teams: 16, 
    groups: 4, 
    groupData: generateGroups(16, 4, 'A'),
    knockout: [
      createBracketRound("Perempat Final", 4),
      createBracketRound("Semifinal", 2),
      createBracketRound("Final", 1),
    ]
  },
});

export default function LiveScorePage() {
  const [bracketData, setBracketData] = useState<any>(null);

  useEffect(() => {
    setBracketData(generateAllBrackets());
  }, []);

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
              Pantau hasil dan alur pertandingan dari babak grup hingga partai final.
            </p>
          </div>

          <Tabs defaultValue="beginner" className="w-full">
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
            
            {!bracketData ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <>
                    <TabsContent value="beginner">
                      <CategoryView categoryData={bracketData.beginner} />
                    </TabsContent>
                    <TabsContent value="intermediate">
                      <CategoryView categoryData={bracketData.intermediate} />
                    </TabsContent>
                    <TabsContent value="advance">
                      <CategoryView categoryData={bracketData.advance} />
                    </TabsContent>
                </>
            )}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// --- SUB-COMPONENTS ---

function CategoryView({ categoryData }: { categoryData: any }) {
  return (
    <div className="space-y-16">
      <GroupStageView groupData={categoryData.groupData} />
      <KnockoutBracket knockoutData={categoryData.knockout} />
    </div>
  )
}

function GroupStageView({ groupData }: { groupData: any[] }) {
  return (
    <div className="animate-in fade-in-50 duration-300">
      <h2 className="text-3xl font-black font-headline text-center mb-8 uppercase tracking-wider">
        Babak <span className="text-primary">Penyisihan Grup</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {groupData.map((group: any) => (
          <Card key={group.name} className="bg-card/50 backdrop-blur-sm border-border/20 rounded-3xl overflow-hidden shadow-lg">
            <CardHeader className="bg-secondary/30 border-b border-border/20 p-4">
              <CardTitle className="text-lg font-bold flex items-center justify-between">
                <span>{group.name}</span>
                <Badge variant="outline">{group.teams.length} Tim</Badge>
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
    </div>
  );
}

function KnockoutBracket({ knockoutData }: { knockoutData: any[] }) {
    return (
        <div className="animate-in fade-in-50 duration-500">
            <h2 className="text-3xl font-black font-headline text-center mb-8 uppercase tracking-wider">
                Babak <span className="text-primary">Gugur (Main Draw)</span>
            </h2>
            <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                <div className="flex gap-4 md:gap-8 items-center justify-start p-4 min-h-[600px]">
                    {knockoutData.map((round, roundIndex) => (
                        <div key={round.name} className="flex items-center gap-4 md:gap-8">
                            <div className={`flex flex-col justify-around h-full gap-4 ${round.name === 'Final' ? 'gap-12' : ''}`}>
                                <h3 className="text-sm text-center font-bold text-muted-foreground uppercase tracking-widest -mb-2">
                                  {round.name}
                                </h3>
                                {round.matches.map((match: any, matchIndex: number) => (
                                    <BracketMatch key={match.id} match={match} />
                                ))}
                            </div>
                            {roundIndex < knockoutData.length - 1 && <BracketConnector numMatches={round.matches.length} />}
                        </div>
                    ))}
                    <div className="flex flex-col items-center ml-4">
                        <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
                        <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-widest">CHAMPION</h3>
                    </div>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}

function BracketMatch({ match }: { match: any }) {
  return (
    <Card className="w-64 bg-card/80 backdrop-blur-sm border-border/30 rounded-2xl p-3 space-y-2 shadow-md">
      {match.teams.map((team: any, index: number) => (
        <div key={index} className="flex items-center justify-between text-sm p-2 rounded-lg bg-secondary/30">
          <span className="font-bold truncate">{team.name || 'TBD'}</span>
          <span className="font-mono text-muted-foreground">--</span>
        </div>
      ))}
      <p className="text-center text-[10px] text-muted-foreground pt-1 border-t border-dashed border-border/20">{match.id}</p>
    </Card>
  );
}

function BracketConnector({ numMatches }: { numMatches: number }) {
  return (
    <div className="flex flex-col items-center justify-around h-full w-8 md:w-12">
      {Array.from({ length: numMatches / 2 }).map((_, i) => (
        <div key={i} className="relative h-[136px] w-full"> 
            <div className="absolute top-1/4 left-0 h-1/2 w-1/2 border-y-2 border-l-2 border-border/30 rounded-l-lg"></div>
            <div className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-border/30"></div>
        </div>
      ))}
    </div>
  );
}
