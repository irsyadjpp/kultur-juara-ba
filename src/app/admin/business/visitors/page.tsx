
'use client';

import { useState } from "react";
import { 
  BarChart3, Users, PieChart, Download, 
  MapPin, Ticket, TrendingUp, Calendar, 
  Search, Filter, Crown, UserCheck 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const VISITOR_LOGS = [
  { id: "V-881", name: "Amanda Rawles", type: "VVIP", zone: "Royal Box", time: "10:30", spending: "Rp 1.5jt", avatar: "https://github.com/shadcn.png" },
  { id: "V-882", name: "Komunitas Badminton Bdg", type: "GROUP", zone: "Tribun A", time: "09:15", spending: "Rp 3.2jt", avatar: "" },
  { id: "V-883", name: "Budi Santoso", type: "REGULAR", zone: "Tribun B", time: "11:00", spending: "Rp 150k", avatar: "" },
  { id: "V-884", name: "Siti Aminah", type: "STUDENT", zone: "Tribun C", time: "08:45", spending: "Rp 50k", avatar: "" },
  { id: "V-885", name: "Media Liputan 6", type: "MEDIA", zone: "Press Room", time: "08:00", spending: "-", avatar: "" },
];

const DEMOGRAPHICS = [
  { label: "Gen Z (18-25)", percent: 45, color: "bg-pink-500" },
  { label: "Millennials (26-40)", percent: 35, color: "bg-blue-500" },
  { label: "Gen X & Others", percent: 20, color: "bg-zinc-500" },
];

const ZONES = [
  { name: "Tribun A (Best View)", fill: 95, status: "FULL" },
  { name: "Tribun B (General)", fill: 78, status: "FILLING" },
  { name: "VIP / Royal Box", fill: 100, status: "SOLD OUT" },
  { name: "Festival / Bazaar", fill: 60, status: "MODERATE" },
];

export default function VisitorDataPage() {
  const [activeTab, setActiveTab] = useState("insights");

  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-blue-500 text-blue-500 bg-blue-500/10 backdrop-blur-md">
                    <BarChart3 className="w-3 h-3 mr-2" /> AUDIENCE ANALYTICS
                </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-white">
                Crowd <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Intelligence</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Analisis data pengunjung untuk laporan sponsor dan strategi marketing.
            </p>
        </div>

        <Button variant="outline" className="h-14 rounded-full border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 font-bold">
            <Download className="mr-2 w-5 h-5"/> EXPORT REPORT
        </Button>
      </div>

      {/* --- HERO STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {/* Total Traffic */}
         <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] group-hover:bg-blue-500/20 transition-all"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><Users className="w-6 h-6"/></div>
                    <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/20 border-none">+12% YoY</Badge>
                </div>
                <h3 className="text-4xl font-black text-white">3,420</h3>
                <p className="text-xs text-zinc-500 font-bold uppercase mt-1">Total Footfall</p>
            </div>
         </Card>

         {/* Peak Hour */}
         <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-[40px] group-hover:bg-pink-500/20 transition-all"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-pink-500/10 rounded-2xl text-pink-500"><TrendingUp className="w-6 h-6"/></div>
                    <Badge variant="outline" className="border-pink-900 text-pink-500">Peak Time</Badge>
                </div>
                <h3 className="text-4xl font-black text-white">14:00</h3>
                <p className="text-xs text-zinc-500 font-bold uppercase mt-1">Highest Traffic</p>
            </div>
         </Card>

         {/* Ticket Sales */}
         <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[40px] group-hover:bg-yellow-500/20 transition-all"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500"><Ticket className="w-6 h-6"/></div>
                    <Badge variant="outline" className="border-yellow-900 text-yellow-500">Revenue</Badge>
                </div>
                <h3 className="text-4xl font-black text-white">85%</h3>
                <p className="text-xs text-zinc-500 font-bold uppercase mt-1">Tickets Sold Out</p>
            </div>
         </Card>

         {/* VIP Presence */}
         <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] group-hover:bg-purple-500/20 transition-all"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500"><Crown className="w-6 h-6"/></div>
                    <Badge variant="outline" className="border-purple-900 text-purple-500">Influencers</Badge>
                </div>
                <h3 className="text-4xl font-black text-white">15</h3>
                <p className="text-xs text-zinc-500 font-bold uppercase mt-1">VIP Guests Check-in</p>
            </div>
         </Card>
      </div>

      {/* --- MAIN CONTENT (TABS) --- */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-[40px] p-2 backdrop-blur-sm min-h-[500px] flex flex-col">
        <Tabs defaultValue="insights" className="w-full flex-1 flex flex-col" onValueChange={setActiveTab}>
            
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4">
                <TabsList className="bg-zinc-950 p-1 rounded-full h-14 border border-zinc-800 w-full md:w-auto">
                    <TabsTrigger value="insights" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                        MARKET INSIGHTS
                    </TabsTrigger>
                    <TabsTrigger value="visitors" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        THE CROWD (LIST)
                    </TabsTrigger>
                </TabsList>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
                    <Input 
                        placeholder="Search visitor..." 
                        className="h-12 bg-zinc-950 border-zinc-800 rounded-full pl-10 text-white focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* TAB 1: INSIGHTS (VISUAL) */}
            <TabsContent value="insights" className="flex-1 p-4 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* DEMOGRAPHICS */}
                    <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-sm font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <PieChart className="w-4 h-4 text-pink-500"/> Demographics
                            </CardTitle>
                        </CardHeader>
                        <div className="space-y-6">
                            {DEMOGRAPHICS.map((demo) => (
                                <div key={demo.label}>
                                    <div className="flex justify-between text-sm font-bold text-white mb-2">
                                        <span>{demo.label}</span>
                                        <span>{demo.percent}%</span>
                                    </div>
                                    <div className="h-4 bg-zinc-950 rounded-full p-1 border border-zinc-800">
                                        <div className={cn("h-full rounded-full", demo.color)} style={{ width: `${demo.percent}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-zinc-950 rounded-2xl border border-zinc-800 text-xs text-zinc-400 leading-relaxed">
                            <strong className="text-white">Insight:</strong> Mayoritas pengunjung adalah Gen-Z (45%), strategi marketing via TikTok & Instagram Reels sangat efektif.
                        </div>
                    </Card>

                    {/* ZONE HEATMAP */}
                    <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-sm font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-500"/> Zone Occupancy (Heatmap)
                            </CardTitle>
                        </CardHeader>
                        <div className="space-y-4">
                            {ZONES.map((zone) => (
                                <div key={zone.name} className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-bold text-white">{zone.name}</span>
                                            <Badge variant="outline" className={cn("text-[9px] h-5", zone.status === 'FULL' || zone.status === 'SOLD OUT' ? "border-red-500 text-red-500" : "border-zinc-700 text-zinc-500")}>
                                                {zone.status}
                                            </Badge>
                                        </div>
                                        <Progress value={zone.fill} className="h-2 bg-zinc-950" indicatorClassName={cn(zone.fill >= 90 ? "bg-red-500" : "bg-blue-500")} />
                                    </div>
                                    <span className="text-xs font-mono font-bold text-zinc-400 w-8 text-right">{zone.fill}%</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                </div>
            </TabsContent>

            {/* TAB 2: VISITOR LIST */}
            <TabsContent value="visitors" className="flex-1 p-4">
                <ScrollArea className="h-[500px]">
                    <div className="space-y-3">
                        {VISITOR_LOGS.map((v) => (
                            <div key={v.id} className="group flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-[24px] hover:border-blue-500/30 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-zinc-700 group-hover:border-blue-500 transition-colors">
                                        <AvatarImage src={v.avatar} />
                                        <AvatarFallback className="bg-zinc-800 font-bold text-zinc-500">{v.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-white text-base">{v.name}</h4>
                                            {v.type === 'VVIP' && <Crown className="w-3 h-3 text-yellow-500 fill-yellow-500"/>}
                                        </div>
                                        <div className="text-xs text-zinc-500 mt-0.5 flex items-center gap-2">
                                            <Badge variant="secondary" className="h-5 px-1.5 text-[9px] bg-zinc-950 border-zinc-800 text-zinc-400">{v.type}</Badge>
                                            <span>• {v.zone}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-1 text-xs font-bold text-green-500 mb-1">
                                        <UserCheck className="w-3 h-3"/> Checked In
                                    </div>
                                    <span className="text-[10px] text-zinc-600 font-mono">{v.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </TabsContent>
        </Tabs>
      </div>

    </div>
  );
}
