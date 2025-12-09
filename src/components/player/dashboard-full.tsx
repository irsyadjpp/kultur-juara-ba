
'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Trophy, Users, Shield, QrCode, Activity, Calendar, 
  ArrowRight, LogOut, User, Upload, FileText, 
  AlertTriangle, Instagram, History, Info, ChevronRight, 
  Camera, MessageCircle, Download, Gavel, Clock, 
  Share2, RotateCw, AlertOctagon, Send, Paperclip, 
  MoreVertical, CheckCheck, Smile, Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---

const ATHLETE = {
  id: "ATL-8821",
  name: "Jonathan Christie",
  team: "PB Djarum Official",
  rank: "PRO",
  points: 8500,
  winRate: 78,
  avatar: "https://github.com/shadcn.png",
};

const TEAM_CHATS = [
  { id: 1, user: "Coach Herry", msg: "Kumpul di Court 4 sekarang ya, warming up.", time: "10:00", self: false },
  { id: 2, user: "Ginting", msg: "Siap coach, otw.", time: "10:02", self: false },
  { id: 3, user: "Kevin S.", msg: "Raket gue ketinggalan di tas lo Jo?", time: "10:05", self: false },
  { id: 4, user: "You", msg: "Aman vin, udah gue bawa.", time: "10:06", self: true },
];

const SCHEDULE = {
  status: "CALLING", // WAITING, WARM_UP, LIVE, CALLING
  court: "Court 1 (TV)",
  match: "MS Round of 16",
  opponent: "Lee Zii Jia",
  time: "LIVE NOW"
};

const HISTORY = [
  { event: "Round of 32", opponent: "Kento Momota", score: "21-15, 21-18", result: "WIN", date: "Yesterday" },
  { event: "Round of 16", opponent: "Viktor Axelsen", score: "19-21, 15-21", result: "LOSE", date: "2 days ago" },
];

const GALLERY = [1, 2, 3, 4, 5, 6]; // Placeholder IDs

export default function PlayerDashboardFull() {
  // State for Features
  const [isIdCardFlipped, setIsIdCardFlipped] = useState(false); // Feature 1: Digital ID
  const [isProtestOpen, setIsProtestOpen] = useState(false);     // Feature 7: Protest
  const [chatMessage, setChatMessage] = useState("");            // Feature 2: Squad Chat

  // --- COMPONENT: 1. DIGITAL ID CARD (FLIP) ---
  const renderDigitalID = () => (
    <div className="perspective-1000 group cursor-pointer h-[420px] w-full" onClick={() => setIsIdCardFlipped(!isIdCardFlipped)}>
        <div className={cn(
            "relative w-full h-full transition-all duration-700 transform-style-3d",
            isIdCardFlipped ? "rotate-y-180" : ""
        )}>
            {/* FRONT SIDE */}
            <Card className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-black border-2 border-zinc-700 rounded-[32px] overflow-hidden backface-hidden shadow-2xl flex flex-col">
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay z-10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/30 rounded-full blur-[60px]"></div>
                
                <CardContent className="p-6 flex flex-col items-center h-full relative z-10">
                    <div className="flex justify-between w-full mb-6">
                        <Trophy className="w-6 h-6 text-yellow-500"/>
                        <span className="font-black text-white tracking-widest text-xs">BCC 2026 OFFICIAL</span>
                    </div>
                    <Avatar className="w-32 h-32 border-4 border-zinc-900 shadow-xl mb-4">
                        <AvatarImage src={ATHLETE.avatar} className="object-cover"/>
                        <AvatarFallback>AT</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-black text-white text-center uppercase leading-none mb-2">{ATHLETE.name}</h2>
                    <Badge className="bg-indigo-600 hover:bg-indigo-700 mb-2">{ATHLETE.team}</Badge>
                    <div className="flex gap-2">
                        <Badge variant="outline" className="text-zinc-400 text-[10px] border-zinc-700">{ATHLETE.rank}</Badge>
                        <Badge variant="outline" className="text-zinc-400 text-[10px] border-zinc-700">MS</Badge>
                    </div>
                    
                    <div className="mt-auto w-full pt-4 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-400">
                        <span className="font-mono">{ATHLETE.id}</span>
                        <span className="flex items-center gap-1 text-cyan-400 font-bold animate-pulse"><RotateCw className="w-3 h-3"/> Flip to QR</span>
                    </div>
                </CardContent>
            </Card>

            {/* BACK SIDE */}
            <Card className="absolute inset-0 bg-white border-2 border-zinc-200 rounded-[32px] overflow-hidden backface-hidden rotate-y-180 shadow-2xl">
                <CardContent className="p-8 flex flex-col items-center justify-center h-full text-center space-y-6">
                    <div>
                        <h3 className="text-black font-black text-2xl uppercase tracking-tighter">Access Pass</h3>
                        <p className="text-zinc-500 text-xs">Show this to Gate / Umpire</p>
                    </div>
                    <div className="p-2 border-4 border-black rounded-xl">
                        <QrCode className="w-40 h-40 text-black"/>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-zinc-400">Security Hash</p>
                        <p className="font-mono text-xs font-bold text-black bg-zinc-100 px-2 py-1 rounded">8821-AFX-2026-VLD</p>
                    </div>
                    <span className="flex items-center gap-1 text-cyan-600 font-bold text-xs mt-4"><RotateCw className="w-3 h-3"/> Flip Back</span>
                </CardContent>
            </Card>
        </div>
    </div>
  );

  // --- COMPONENT: 2. SQUAD CHAT (SHEET) ---
  const renderSquadChat = () => (
    <Sheet>
        <SheetTrigger asChild>
            <Button className="w-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white justify-between h-14 rounded-2xl px-4 group">
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        <Avatar className="w-8 h-8 border-2 border-zinc-900"><AvatarFallback>CH</AvatarFallback></Avatar>
                        <Avatar className="w-8 h-8 border-2 border-zinc-900"><AvatarFallback>GT</AvatarFallback></Avatar>
                        <Avatar className="w-8 h-8 border-2 border-zinc-900"><AvatarFallback>KS</AvatarFallback></Avatar>
                    </div>
                    <div className="text-left">
                        <p className="text-xs font-bold text-white">Squad Chat</p>
                        <p className="text-[10px] text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> 4 Online</p>
                    </div>
                </div>
                <MessageCircle className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors"/>
            </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md bg-zinc-950 border-l border-zinc-800 p-0 flex flex-col">
            <SheetHeader className="p-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <Avatar><AvatarImage src="/logos/djarum.png"/><AvatarFallback>TM</AvatarFallback></Avatar>
                    <div>
                        <SheetTitle className="text-white text-sm">PB Djarum Official</SheetTitle>
                        <p className="text-xs text-zinc-400">24 Members • Team Strategy</p>
                    </div>
                </div>
            </SheetHeader>
            <ScrollArea className="flex-1 p-4 bg-zinc-950/50">
                <div className="space-y-4">
                    {TEAM_CHATS.map((chat) => (
                        <div key={chat.id} className={cn("flex flex-col max-w-[80%]", chat.self ? "ml-auto items-end" : "mr-auto items-start")}>
                            {!chat.self && <span className="text-[10px] text-zinc-500 mb-1 ml-1">{chat.user}</span>}
                            <div className={cn("p-3 rounded-2xl text-sm", chat.self ? "bg-cyan-600 text-white rounded-tr-sm" : "bg-zinc-800 text-zinc-200 rounded-tl-sm")}>
                                {chat.msg}
                            </div>
                            <span className="text-[10px] text-zinc-600 mt-1 mx-1">{chat.time}</span>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="p-4 border-t border-zinc-800 bg-zinc-900">
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="text-zinc-400"><Plus className="w-5 h-5"/></Button>
                    <Input 
                        placeholder="Type a message..." 
                        className="bg-black border-zinc-800 rounded-full h-10 focus-visible:ring-cyan-600"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                    />
                    <Button size="icon" className="bg-cyan-600 hover:bg-cyan-700 rounded-full"><Send className="w-4 h-4"/></Button>
                </div>
            </div>
        </SheetContent>
    </Sheet>
  );

  // --- COMPONENT: 3. COURT CALL (WIDGET) ---
  const renderCourtCall = () => (
    <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6 relative overflow-hidden group">
        <div className={cn("absolute left-0 top-0 bottom-0 w-2 transition-all", 
            SCHEDULE.status === 'CALLING' ? "bg-red-600 w-full opacity-10 animate-pulse" : "bg-green-500"
        )}></div>
        <div className={cn("absolute left-0 top-0 bottom-0 w-2", 
            SCHEDULE.status === 'CALLING' ? "bg-red-600" : "bg-green-500"
        )}></div>
        
        <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-4 h-4"/> Court Status
            </h3>
            <Badge className={cn("font-bold border-none", 
                SCHEDULE.status === 'CALLING' ? "bg-red-600 text-white animate-bounce" : "bg-green-600"
            )}>
                {SCHEDULE.status}
            </Badge>
        </div>
        
        <div className="space-y-1 relative z-10">
            <p className="text-xs text-zinc-400">Opponent</p>
            <p className="text-2xl font-black text-white uppercase leading-none">{SCHEDULE.opponent}</p>
            <p className="text-sm font-bold text-cyan-500 mt-1">{SCHEDULE.match}</p>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center relative z-10">
            <Badge variant="outline" className="border-zinc-700 text-white h-8 px-3 text-sm">{SCHEDULE.court}</Badge>
            <span className="text-xs font-mono text-zinc-500">Est: {SCHEDULE.time}</span>
        </div>
    </Card>
  );

  // --- COMPONENT: 4. LIVE SCORE / BRACKET ---
  const renderLiveScore = () => (
    <Card className="bg-zinc-900/50 border border-zinc-800/50 rounded-[32px] p-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500"/> Live Scoring
            </h3>
            <Badge variant="outline" className="border-red-500 text-red-500 text-[10px] animate-pulse">● LIVE</Badge>
        </div>
        
        {/* Score Board Visual */}
        <div className="bg-black rounded-2xl border border-zinc-800 p-4 flex items-center justify-between">
            <div className="text-center w-1/3">
                <p className="text-xs font-bold text-zinc-500 mb-1">J. Christie</p>
                <div className="text-3xl font-black text-white">21</div>
                <div className="text-xs font-bold text-green-500 mt-1">Set 1</div>
            </div>
            <div className="text-center w-1/3 border-x border-zinc-800 h-12 flex flex-col justify-center">
                <p className="text-xs text-zinc-600 font-mono">VS</p>
                <p className="text-[10px] text-zinc-700">00:45</p>
            </div>
            <div className="text-center w-1/3">
                <p className="text-xs font-bold text-zinc-500 mb-1">L. Zii Jia</p>
                <div className="text-3xl font-black text-zinc-600">18</div>
                <div className="text-xs font-bold text-zinc-700 mt-1">Set 1</div>
            </div>
        </div>
        <Button variant="ghost" className="w-full mt-2 text-xs text-zinc-500 hover:text-white">View Full Bracket</Button>
    </Card>
  );

  return (
    <div className="min-h-screen bg-zinc-950 font-body pb-24">
        
        {/* --- HEADER --- */}
        <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 md:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-cyan-500"/>
                <span className="font-black text-white tracking-tighter hidden md:inline">PLAYER DASHBOARD</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                    <p className="text-xs font-bold text-white">{ATHLETE.name}</p>
                    <p className="text-[10px] text-zinc-500">{ATHLETE.team}</p>
                </div>
                <Avatar className="h-9 w-9 border-2 border-zinc-800">
                    <AvatarImage src={ATHLETE.avatar} />
                    <AvatarFallback>PL</AvatarFallback>
                </Avatar>
                <Link href="/" passHref>
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white"><LogOut className="w-5 h-5"/></Button>
                </Link>
            </div>
        </div>

        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
            
            {/* --- TOP ROW: DIGITAL ID & COURT CALL --- */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4 lg:col-span-3">
                    {renderDigitalID()}
                </div>
                <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-6">
                    {/* Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="bg-zinc-900 border-zinc-800 p-4 flex flex-col justify-center">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase">Ranking</p>
                            <p className="text-2xl font-black text-white">PRO</p>
                        </Card>
                        <Card className="bg-zinc-900 border-zinc-800 p-4 flex flex-col justify-center">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase">Points</p>
                            <p className="text-2xl font-black text-white">{ATHLETE.points}</p>
                        </Card>
                        <Card className="bg-zinc-900 border-zinc-800 p-4 flex flex-col justify-center">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase">Matches</p>
                            <p className="text-2xl font-black text-white">12</p>
                        </Card>
                        {/* FEATURE 7: PROTEST BUTTON */}
                        <Card 
                            onClick={() => setIsProtestOpen(true)}
                            className="bg-red-950/30 border-red-900/50 p-4 flex flex-col justify-center cursor-pointer hover:bg-red-900/50 transition-colors group"
                        >
                            <p className="text-[10px] text-red-400 font-bold uppercase flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3"/> Integrity
                            </p>
                            <p className="text-lg font-black text-white group-hover:text-red-200">Lapor/Sanggah</p>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                        {renderCourtCall()}
                        <div className="flex flex-col gap-6">
                            {renderLiveScore()}
                            {renderSquadChat()}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- BOTTOM ROW: TABS FOR HISTORY & GALLERY --- */}
            <Tabs defaultValue="history" className="w-full">
                <TabsList className="bg-zinc-900 p-1 rounded-2xl mb-6">
                    <TabsTrigger value="history" className="rounded-xl px-6 font-bold data-[state=active]:bg-zinc-800">Match History</TabsTrigger>
                    <TabsTrigger value="gallery" className="rounded-xl px-6 font-bold data-[state=active]:bg-zinc-800">Media Gallery</TabsTrigger>
                </TabsList>

                {/* FEATURE 5: HISTORY */}
                <TabsContent value="history" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {HISTORY.map((match, i) => (
                            <Card key={i} className="bg-zinc-900 border-zinc-800 rounded-[24px] p-6 hover:border-zinc-700 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">{match.date}</Badge>
                                    <Badge className={cn("text-[10px] font-bold", match.result === 'WIN' ? "bg-green-600" : "bg-red-600")}>
                                        {match.result}
                                    </Badge>
                                </div>
                                <p className="text-xs text-zinc-500 font-bold uppercase mb-1">{match.event}</p>
                                <h4 className="text-lg font-black text-white mb-2">vs. {match.opponent}</h4>
                                <p className="font-mono text-zinc-300 text-sm bg-black p-2 rounded-lg text-center border border-zinc-800">
                                    {match.score}
                                </p>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* FEATURE 6: GALLERY */}
                <TabsContent value="gallery">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {GALLERY.map((img, i) => (
                            <div key={i} className="group relative aspect-square bg-zinc-800 rounded-2xl overflow-hidden cursor-pointer border border-zinc-800">
                                <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                                    <Camera className="w-8 h-8 opacity-20"/> {/* Placeholder */}
                                </div>
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2 p-4">
                                    <p className="text-white text-xs font-bold mb-2">Action Shot #{i+1}</p>
                                    <div className="flex gap-2">
                                        <Button size="icon" className="rounded-full bg-white text-black hover:bg-zinc-200 w-10 h-10"><Download className="w-4 h-4"/></Button>
                                        <Button size="icon" className="rounded-full bg-pink-600 text-white hover:bg-pink-700 w-10 h-10"><Share2 className="w-4 h-4"/></Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

        </div>

        {/* --- MODAL: PROTEST SYSTEM --- */}
        <Dialog open={isProtestOpen} onOpenChange={setIsProtestOpen}>
            <DialogContent className="bg-zinc-950 border-red-900/50 text-white rounded-[32px] max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-500 uppercase font-black tracking-tight">
                        <Gavel className="w-6 h-6"/> Ajukan Protes
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Laporan masuk ke <strong>Tim Pencari Fakta (TPF)</strong>. Identitas pelapor dijamin kerahasiaannya.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-zinc-500 uppercase">Jenis Pelanggaran</Label>
                        <Select>
                            <SelectTrigger className="bg-black border-zinc-800"><SelectValue placeholder="Pilih..." /></SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                <SelectItem value="JOKI">Pencurian Umur / Joki</SelectItem>
                                <SelectItem value="LEVEL">Manipulasi Level (Sandbagging)</SelectItem>
                                <SelectItem value="ETHIC">Pelanggaran Etika</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-zinc-500 uppercase">Bukti (Foto/Video)</Label>
                        <div className="h-24 bg-black border-2 border-dashed border-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 hover:text-red-500 cursor-pointer">
                            <Upload className="w-6 h-6 mr-2"/> Upload Evidence
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-zinc-500 uppercase">Keterangan Detail</Label>
                        <Textarea placeholder="Jelaskan kronologi..." className="bg-black border-zinc-800 min-h-[80px]"/>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-xl">
                        KIRIM LAPORAN KE TPF
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    </div>
  );
}
