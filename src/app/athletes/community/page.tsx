
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Trophy, Crown, ArrowRight, Star } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background pb-24 px-4 pt-6">
      
      {/* 1. COMMUNITY HERO HEADER */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-foreground text-background mb-8 shadow-m3-3">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 blur-[100px] rounded-full"></div>

        <div className="relative z-10 p-8 flex flex-col items-center text-center">
          <div className="h-24 w-24 rounded-full bg-white p-1 shadow-xl mb-4">
             <Avatar className="h-full w-full">
               <AvatarImage src="https://github.com/shadcn.png" /> {/* Logo Komunitas */}
               <AvatarFallback>PB</AvatarFallback>
             </Avatar>
          </div>
          
          <Badge variant="outline" className="mb-2 text-background border-background/30 bg-background/10 backdrop-blur-md">
             OFFICIAL MEMBER
          </Badge>
          
          <h1 className="font-headline text-3xl mb-2 tracking-tight">PB. EXIST JAKARTA</h1>
          <p className="text-sm opacity-80 max-w-xs mx-auto mb-6">
            "We breed champions, not just players."
          </p>

          <div className="flex gap-4 w-full">
             <div className="flex-1 bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                <Users className="h-5 w-5 mx-auto mb-1" />
                <p className="font-bold text-lg">42</p>
                <p className="text-[10px] opacity-70 uppercase">Members</p>
             </div>
             <div className="flex-1 bg-primary/90 text-white rounded-2xl p-3 shadow-lg shadow-primary/20">
                <Trophy className="h-5 w-5 mx-auto mb-1" />
                <p className="font-bold text-lg">8</p>
                <p className="text-[10px] opacity-80 uppercase">Titles</p>
             </div>
          </div>
        </div>
      </div>

      {/* 2. TABBED CONTENT */}
      <Tabs defaultValue="members" className="w-full">
        <TabsList className="bg-transparent w-full justify-start p-0 mb-6 gap-4 border-b border-border/50 pb-2">
          <TabsTrigger value="members" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none p-0 pb-2 font-bold text-muted-foreground data-[state=active]:text-foreground transition-all">
            Squad List
          </TabsTrigger>
          <TabsTrigger value="tournaments" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none p-0 pb-2 font-bold text-muted-foreground data-[state=active]:text-foreground transition-all">
            Active Event
          </TabsTrigger>
        </TabsList>

        {/* MEMBERS LIST */}
        <TabsContent value="members" className="space-y-4 animate-in slide-in-from-bottom-2 duration-500">
          
          {/* Admin / Coach */}
          <div className="flex items-center gap-4 p-4 rounded-3xl bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
             <div className="relative">
               <Avatar className="h-12 w-12 border-2 border-amber-500">
                 <AvatarFallback className="bg-amber-200 text-amber-800">CO</AvatarFallback>
               </Avatar>
               <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-0.5 rounded-full">
                 <Crown size={10} />
               </div>
             </div>
             <div>
               <h3 className="font-bold text-sm">Coach Hendry</h3>
               <p className="text-xs text-muted-foreground">Head Coach & Admin</p>
             </div>
             <Button size="sm" variant="ghost" className="ml-auto text-amber-700 hover:text-amber-800 hover:bg-amber-200/50">
               Contact
             </Button>
          </div>

          <h3 className="font-bold text-xs text-muted-foreground uppercase mt-6 pl-2">Teammates</h3>
          
          {[1, 2, 3, 4, 5].map((i) => (
             <div key={i} className="flex items-center gap-4 p-3 hover:bg-secondary/30 rounded-2xl transition-colors cursor-pointer group">
               <Avatar className="h-10 w-10">
                 <AvatarFallback>M{i}</AvatarFallback>
               </Avatar>
               <div className="flex-1">
                 <h4 className="font-bold text-sm group-hover:text-primary transition-colors">Member Name {i}</h4>
                 <div className="flex items-center gap-2">
                   <Badge variant="secondary" className="text-[10px] h-4 px-1">Intermediate</Badge>
                   {i === 2 && <Star size={10} className="text-yellow-500 fill-yellow-500" />}
                 </div>
               </div>
               <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                 <ArrowRight size={14} />
               </Button>
             </div>
          ))}
        </TabsContent>

        {/* ACTIVE TOURNAMENTS */}
        <TabsContent value="tournaments">
           <Card className="rounded-[2rem] p-5 border-none shadow-m3-1 bg-gradient-sport text-white relative overflow-hidden">
              <Trophy className="absolute -right-4 -bottom-4 text-white/20 h-32 w-32 rotate-12" />
              <div className="relative z-10">
                 <Badge className="bg-white/20 text-white hover:bg-white/30 border-none mb-2">ONGOING</Badge>
                 <h3 className="font-headline text-2xl mb-1">ROAD TO BCC 2025</h3>
                 <p className="text-xs opacity-90 mb-6">12 Members Registered</p>
                 
                 <div className="flex -space-x-3 mb-4">
                   {[1,2,3].map(i => (
                     <Avatar key={i} className="border-2 border-primary h-8 w-8">
                       <AvatarFallback className="bg-background text-foreground text-[10px]">P{i}</AvatarFallback>
                     </Avatar>
                   ))}
                   <div className="h-8 w-8 rounded-full bg-black/30 flex items-center justify-center text-[10px] font-bold border-2 border-primary backdrop-blur-sm">
                     +9
                   </div>
                 </div>

                 <Button variant="secondary" className="w-full rounded-pill font-bold text-primary">
                   View Team Schedule
                 </Button>
              </div>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

