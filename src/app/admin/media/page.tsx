'use client';

import { useState } from "react";
import { 
  Instagram, Youtube, Twitter, Facebook, 
  Image as ImageIcon, Video, Plus, Search, 
  MoreHorizontal, Send, TrendingUp, Eye, 
  MessageCircle, Share2, CalendarClock, Hash
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const CONTENT_PIPELINE = {
  todo: [
    { id: "C-01", title: "Teaser Final Match (Reels)", platform: "IG", deadline: "Today, 14:00", priority: "HIGH" },
    { id: "C-02", title: "Quote of the Day - Ginting", platform: "TW", deadline: "Tomorrow", priority: "MEDIUM" },
  ],
  review: [
    { id: "C-03", title: "Highlight Day 1 (YouTube)", platform: "YT", deadline: "Overdue", priority: "HIGH", img: "/assets/thumb1.jpg" },
  ],
  published: [
    { id: "C-04", title: "Winner Announcement MD", platform: "IG", stats: { likes: "12k", shares: "450" }, img: "/assets/post1.jpg" },
    { id: "C-05", title: "Sponsor Shoutout (BJB)", platform: "IG", stats: { likes: "8.5k", shares: "120" }, img: "/assets/post2.jpg" },
  ]
};

const ASSETS = [
  { id: 1, name: "Kevin_Smash_HD.jpg", type: "IMAGE", size: "4.2 MB", uploader: "Doc Team" },
  { id: 2, name: "Opening_Ceremony_Raw.mp4", type: "VIDEO", size: "1.2 GB", uploader: "Videographer" },
  { id: 3, name: "Logo_BCC_Transparent.png", type: "IMAGE", size: "500 KB", uploader: "Admin" },
  { id: 4, name: "Interview_Fajar_Rian.mp4", type: "VIDEO", size: "450 MB", uploader: "Media" },
];

export default function MediaManagementPage() {
  const [activeTab, setActiveTab] = useState("pipeline");
  const [isPostOpen, setIsPostOpen] = useState(false);

  const getPlatformIcon = (p: string) => {
    switch(p) {
        case 'IG': return <Instagram className="w-4 h-4"/>;
        case 'YT': return <Youtube className="w-4 h-4"/>;
        case 'TW': return <Twitter className="w-4 h-4"/>;
        default: return <Facebook className="w-4 h-4"/>;
    }
  };

  const getPriorityColor = (p: string) => {
    switch(p) {
        case 'HIGH': return "bg-red-500 text-white animate-pulse";
        case 'MEDIUM': return "bg-yellow-500 text-black";
        default: return "bg-zinc-700 text-zinc-300";
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-pink-500 text-pink-500 bg-pink-500/10 backdrop-blur-md">
                    <Share2 className="w-3 h-3 mr-2" /> CONTENT STUDIO
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Social <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">War Room</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Pusat komando konten, publikasi, dan interaksi audiens.
            </p>
        </div>

        <Button 
            onClick={() => setIsPostOpen(true)}
            className="h-14 rounded-full px-8 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-lg shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all hover:scale-105"
        >
            <Plus className="mr-2 w-5 h-5"/> CREATE POST
        </Button>
      </div>

      {/* --- ANALYTICS BAR --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
         <Card className="bg-zinc-900 border-zinc-800 rounded-[24px] p-4 flex items-center gap-3">
            <div className="p-3 bg-pink-500/10 rounded-xl text-pink-500"><TrendingUp className="w-5 h-5"/></div>
            <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Reach</p>
                <p className="text-xl font-black text-white">1.2M</p>
            </div>
         </Card>
         <Card className="bg-zinc-900 border-zinc-800 rounded-[24px] p-4 flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500"><Eye className="w-5 h-5"/></div>
            <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Impressions</p>
                <p className="text-xl font-black text-white">3.5M</p>
            </div>
         </Card>
         <Card className="bg-zinc-900 border-zinc-800 rounded-[24px] p-4 flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><MessageCircle className="w-5 h-5"/></div>
            <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Engagement</p>
                <p className="text-xl font-black text-white">8.5%</p>
            </div>
         </Card>
         <Card className="bg-zinc-900 border-zinc-800 rounded-[24px] p-4 flex items-center gap-3">
            <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><Share2 className="w-5 h-5"/></div>
            <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Shares</p>
                <p className="text-xl font-black text-white">12k</p>
            </div>
         </Card>
      </div>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 bg-zinc-900/50 border border-zinc-800/50 rounded-[40px] p-2 backdrop-blur-sm flex flex-col min-h-0">
        <Tabs defaultValue="pipeline" className="w-full h-full flex flex-col" onValueChange={setActiveTab}>
            
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4 shrink-0">
                <TabsList className="bg-zinc-950 p-1 rounded-full h-14 border border-zinc-800 w-full md:w-auto">
                    <TabsTrigger value="pipeline" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-pink-600 data-[state=active]:text-white">
                        CONTENT PIPELINE
                    </TabsTrigger>
                    <TabsTrigger value="assets" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        MEDIA ASSETS
                    </TabsTrigger>
                </TabsList>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
                    <Input placeholder="Search content..." className="h-12 bg-zinc-950 border-zinc-800 rounded-full pl-10 text-white focus:ring-pink-500" />
                </div>
            </div>

            {/* TAB 1: KANBAN PIPELINE */}
            <TabsContent value="pipeline" className="flex-1 overflow-hidden mt-0 p-2">
                <ScrollArea className="h-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                        
                        {/* COLUMN: TO DO */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="font-black text-zinc-500 uppercase tracking-widest text-xs">Idea / Draft</h3>
                                <Badge className="bg-zinc-800 text-zinc-400">{CONTENT_PIPELINE.todo.length}</Badge>
                            </div>
                            {CONTENT_PIPELINE.todo.map(item => (
                                <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-[20px] hover:border-pink-500/30 transition-all cursor-grab active:cursor-grabbing">
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="outline" className="border-zinc-700 text-zinc-400 bg-black gap-1">
                                            {getPlatformIcon(item.platform)} {item.platform}
                                        </Badge>
                                        <Badge className={cn("text-[9px] border-none", getPriorityColor(item.priority))}>{item.priority}</Badge>
                                    </div>
                                    <h4 className="font-bold text-white text-sm mb-2">{item.title}</h4>
                                    <div className="flex items-center gap-1 text-xs text-zinc-500 font-mono">
                                        <CalendarClock className="w-3 h-3"/> {item.deadline}
                                    </div>
                                </div>
                            ))}
                            <Button variant="ghost" className="w-full border border-dashed border-zinc-800 text-zinc-500 hover:text-white rounded-[20px] h-12">
                                <Plus className="w-4 h-4 mr-2"/> Add Idea
                            </Button>
                        </div>

                        {/* COLUMN: IN REVIEW */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="font-black text-yellow-500 uppercase tracking-widest text-xs">Reviewing</h3>
                                <Badge className="bg-yellow-500/10 text-yellow-500">{CONTENT_PIPELINE.review.length}</Badge>
                            </div>
                            {CONTENT_PIPELINE.review.map(item => (
                                <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-[20px] hover:border-yellow-500/30 transition-all cursor-pointer">
                                    <div className="aspect-video bg-black rounded-xl mb-3 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                                            <Video className="w-8 h-8 text-zinc-600"/>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-white text-sm mb-2">{item.title}</h4>
                                    <div className="flex justify-between items-center">
                                        <Badge variant="outline" className="border-zinc-700 text-zinc-400 bg-black gap-1">
                                            {getPlatformIcon(item.platform)} {item.platform}
                                        </Badge>
                                        <Button size="sm" className="h-7 rounded-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold text-xs">Approve</Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* COLUMN: PUBLISHED */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="font-black text-green-500 uppercase tracking-widest text-xs">Live / Published</h3>
                                <Badge className="bg-green-500/10 text-green-500">{CONTENT_PIPELINE.published.length}</Badge>
                            </div>
                            {CONTENT_PIPELINE.published.map(item => (
                                <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-[20px] hover:border-green-500/30 transition-all opacity-80 hover:opacity-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-white text-sm line-clamp-1">{item.title}</h4>
                                        <Badge variant="outline" className="border-zinc-700 text-zinc-400 bg-black gap-1">
                                            {getPlatformIcon(item.platform)}
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-3">
                                        <div className="bg-black p-2 rounded-lg text-center">
                                            <p className="text-[10px] text-zinc-500 uppercase font-bold">Likes</p>
                                            <p className="text-white font-black">{item.stats.likes}</p>
                                        </div>
                                        <div className="bg-black p-2 rounded-lg text-center">
                                            <p className="text-[10px] text-zinc-500 uppercase font-bold">Shares</p>
                                            <p className="text-white font-black">{item.stats.shares}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </ScrollArea>
            </TabsContent>

            {/* TAB 2: ASSET GALLERY */}
            <TabsContent value="assets" className="flex-1 overflow-hidden mt-0 p-4">
                <ScrollArea className="h-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {ASSETS.map((asset) => (
                            <div key={asset.id} className="group relative aspect-square bg-zinc-900 border border-zinc-800 rounded-[20px] overflow-hidden cursor-pointer hover:border-pink-500/50 transition-all">
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                                    {asset.type === 'IMAGE' ? <ImageIcon className="w-8 h-8 text-zinc-600 group-hover:text-pink-500"/> : <Video className="w-8 h-8 text-zinc-600 group-hover:text-pink-500"/>}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-xs font-bold text-white truncate">{asset.name}</p>
                                    <p className="text-[10px] text-zinc-400">{asset.size}</p>
                                </div>
                            </div>
                        ))}
                        <div className="aspect-square border-2 border-dashed border-zinc-800 rounded-[20px] flex flex-col items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 cursor-pointer transition-colors">
                            <Plus className="w-8 h-8 mb-1"/>
                            <span className="text-xs font-bold uppercase">Upload</span>
                        </div>
                    </div>
                </ScrollArea>
            </TabsContent>
        </Tabs>
      </div>

      {/* --- CREATE POST MODAL --- */}
      <Dialog open={isPostOpen} onOpenChange={setIsPostOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-lg p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 bg-pink-950/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2 text-pink-500">
                        <Send className="w-6 h-6"/> New Post
                    </DialogTitle>
                    <DialogDescription>Draft konten baru untuk publikasi.</DialogDescription>
                </DialogHeader>
            </div>
            
            <div className="p-8 space-y-6">
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Platform</label>
                        <Select>
                            <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl"><SelectValue placeholder="Pilih..." /></SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                <SelectItem value="IG">Instagram</SelectItem>
                                <SelectItem value="TK">TikTok</SelectItem>
                                <SelectItem value="YT">YouTube</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Format</label>
                        <Select>
                            <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl"><SelectValue placeholder="Tipe..." /></SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                <SelectItem value="REEL">Reels / Short</SelectItem>
                                <SelectItem value="FEED">Feed Image</SelectItem>
                                <SelectItem value="STORY">Story</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Caption</label>
                    <Textarea placeholder="Tulis caption menarik..." className="bg-zinc-900 border-zinc-800 rounded-2xl min-h-[100px] p-4" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Hashtags</label>
                    <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 h-14">
                        <Hash className="w-4 h-4 text-pink-500"/>
                        <Input placeholder="BCC2026, Badminton, Juara..." className="bg-transparent border-none h-full text-white placeholder:text-zinc-600 focus-visible:ring-0 p-0" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Media</label>
                    <div className="h-24 bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-500 hover:text-white hover:border-pink-500/50 cursor-pointer transition-all">
                        <Plus className="w-6 h-6 mb-1" />
                        <span className="text-xs font-bold">Add Photo / Video</span>
                    </div>
                </div>

                <Button className="w-full h-16 rounded-full font-black text-lg bg-pink-600 hover:bg-pink-700 text-white mt-2 shadow-xl shadow-pink-900/20">
                    ADD TO PIPELINE
                </Button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
```