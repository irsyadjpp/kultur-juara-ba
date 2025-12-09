'use client';

import { useState } from "react";
import { 
  PenTool, Image as ImageIcon, Type, 
  Bold, Italic, List, Link as LinkIcon, 
  Save, Send, Eye, LayoutGrid, ArrowLeft, 
  MoreHorizontal, Clock, Hash
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const NEWS_LIST = [
  { id: 1, title: "Recap Day 1: Ginting Lolos Dramatis!", category: "MATCH", status: "PUBLISHED", views: "12.5k", date: "Today, 10:00", author: "Kevin (Media)" },
  { id: 2, title: "Panduan Parkir & Shuttle Bus Penonton", category: "INFO", status: "PUBLISHED", views: "8.2k", date: "Yesterday", author: "Admin" },
  { id: 3, title: "Interview Eksklusif: Fajar/Rian", category: "FEATURE", status: "DRAFT", views: "-", date: "Drafted 2h ago", author: "Sarah" },
];

export default function NewsCMSPage() {
  const [mode, setMode] = useState<'LIST' | 'EDITOR'>('LIST');
  
  // Editor State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("MATCH");

  return (
    <div className="space-y-6 p-4 md:p-8 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-cyan-500 text-cyan-500 bg-cyan-500/10 backdrop-blur-md animate-pulse">
                    <PenTool className="w-3 h-3 mr-2" /> PRESS ROOM
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Content <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Publisher</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Kelola berita, artikel, dan pengumuman turnamen.
            </p>
        </div>

        {mode === 'LIST' && (
            <Button 
                onClick={() => setMode('EDITOR')}
                className="h-14 rounded-full px-8 bg-white text-black hover:bg-zinc-200 font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform active:scale-95"
            >
                <Type className="mr-2 w-5 h-5"/> WRITE STORY
            </Button>
        )}
      </div>

      {/* --- MODE SWITCHER --- */}
      {mode === 'LIST' ? (
        // VIEW 1: NEWS LIST
        <div className="flex-1 bg-zinc-900/50 border border-zinc-800/50 rounded-[40px] p-2 backdrop-blur-sm min-h-0 flex flex-col">
            <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center">
                <div className="flex gap-2">
                    <Badge className="bg-zinc-800 text-white hover:bg-zinc-700 cursor-pointer">All Stories</Badge>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400 cursor-pointer hover:text-white">Drafts</Badge>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400 cursor-pointer hover:text-white">Published</Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-bold uppercase">
                    <LayoutGrid className="w-4 h-4"/> View Mode
                </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {NEWS_LIST.map((news) => (
                        <Card key={news.id} className="group bg-zinc-900 border border-zinc-800 rounded-[28px] overflow-hidden hover:border-cyan-500/50 transition-all cursor-pointer hover:-translate-y-1">
                            <div className="aspect-video bg-black relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-80"></div>
                                <div className="absolute top-4 left-4">
                                    <Badge className={cn("text-[9px] font-black border-none", news.status === 'PUBLISHED' ? "bg-green-500 text-black" : "bg-yellow-500 text-black")}>
                                        {news.status}
                                    </Badge>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-[10px] text-cyan-400 font-bold uppercase mb-1 tracking-widest">{news.category}</p>
                                    <h3 className="text-lg font-black text-white leading-tight line-clamp-2">{news.title}</h3>
                                </div>
                            </div>
                            <CardContent className="p-5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-6 h-6 border border-zinc-700">
                                        <AvatarFallback className="text-[9px] bg-zinc-800 text-zinc-400">AU</AvatarFallback>
                                    </Avatar>
                                    <div className="text-[10px] text-zinc-500">
                                        <span className="text-zinc-300 font-bold">{news.author}</span> • {news.date}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-500">
                                    <Eye className="w-3 h-3"/> {news.views}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
      ) : (
        // VIEW 2: RICH TEXT EDITOR
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0 animate-in slide-in-from-bottom-4 fade-in duration-300">
            
            {/* EDITOR CANVAS (2/3) */}
            <Card className="lg:col-span-2 bg-zinc-950 border-zinc-800 rounded-[32px] flex flex-col overflow-hidden shadow-2xl">
                {/* Editor Toolbar */}
                <div className="p-2 border-b border-zinc-800 bg-zinc-900 flex items-center gap-1 overflow-x-auto no-scrollbar">
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white" onClick={() => setMode('LIST')}>
                        <ArrowLeft className="w-5 h-5"/>
                    </Button>
                    <div className="w-[1px] h-6 bg-zinc-800 mx-2"></div>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white"><Bold className="w-4 h-4"/></Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white"><Italic className="w-4 h-4"/></Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white"><List className="w-4 h-4"/></Button>
                    <div className="w-[1px] h-6 bg-zinc-800 mx-2"></div>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white"><LinkIcon className="w-4 h-4"/></Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white"><ImageIcon className="w-4 h-4"/></Button>
                </div>

                <ScrollArea className="flex-1">
                    <div className="p-8 md:p-12 max-w-3xl mx-auto space-y-6">
                        {/* Cover Image Placeholder */}
                        <div className="aspect-video bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-600 hover:text-cyan-500 hover:border-cyan-500/30 hover:bg-cyan-900/5 transition-all cursor-pointer group">
                            <ImageIcon className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform"/>
                            <span className="font-bold uppercase tracking-widest text-sm">Add Cover Image</span>
                        </div>

                        {/* Title Input */}
                        <Textarea 
                            placeholder="Type your Headline here..." 
                            className="text-4xl md:text-5xl font-black text-white bg-transparent border-none resize-none placeholder:text-zinc-700 focus-visible:ring-0 p-0 leading-tight min-h-[120px]"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {/* Body Input (Simulated Rich Text) */}
                        <Textarea 
                            placeholder="Start writing your story..." 
                            className="text-lg text-zinc-300 bg-transparent border-none resize-none placeholder:text-zinc-700 focus-visible:ring-0 p-0 min-h-[400px] leading-relaxed font-serif"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </ScrollArea>
            </Card>

            {/* SIDEBAR SETTINGS (1/3) */}
            <div className="space-y-6">
                <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest">Publishing</h3>
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">DRAFT</Badge>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Category</label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="bg-black border-zinc-800 h-12 rounded-xl text-white"><SelectValue/></SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                    <SelectItem value="MATCH">Match Report</SelectItem>
                                    <SelectItem value="INFO">Information</SelectItem>
                                    <SelectItem value="FEATURE">Feature / Interview</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Tags (Hashtags)</label>
                            <div className="relative">
                                <Hash className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500"/>
                                <Input placeholder="badminton, bcc2026..." className="bg-black border-zinc-800 h-12 rounded-xl pl-9 text-white" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Schedule Publish</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500"/>
                                <Input type="datetime-local" className="bg-black border-zinc-800 h-12 rounded-xl pl-9 text-zinc-400 text-xs" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
                        <Button variant="outline" className="h-12 rounded-xl border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
                            <Save className="mr-2 w-4 h-4"/> Save Draft
                        </Button>
                        <Button className="h-12 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold shadow-lg shadow-cyan-900/20">
                            <Send className="mr-2 w-4 h-4"/> PUBLISH
                        </Button>
                    </div>
                </Card>

                {/* SEO PREVIEW (Bonus) */}
                <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] p-6 opacity-60 hover:opacity-100 transition-opacity">
                    <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Search Preview</h3>
                    <div className="space-y-1">
                        <p className="text-xs text-blue-400 hover:underline cursor-pointer truncate">bcc2026.com › news › {title.toLowerCase().replace(/ /g, '-') || 'your-title'}</p>
                        <p className="text-sm font-bold text-blue-300 truncate">{title || "Your Headline Here"}</p>
                        <p className="text-xs text-zinc-400 line-clamp-2">
                            {content || "Start writing to see the description preview here..."}
                        </p>
                    </div>
                </Card>
            </div>

        </div>
      )}

    </div>
  );
}