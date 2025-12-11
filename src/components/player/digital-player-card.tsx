'use client';

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Copy, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PlayerCardProps {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advance';
  code: string;
  position?: string;
  avatarUrl?: string; // Optional
}

export function DigitalPlayerCard({ name, level, code, position = "MD/XD", avatarUrl }: PlayerCardProps) {
  
  // Warna dinamis berdasarkan level
  const levelColor = {
    Beginner: "from-green-500 to-emerald-700",
    Intermediate: "from-yellow-400 to-orange-600",
    Advance: "from-primary to-red-900"
  };

  const handleShare = () => {
    const text = `Join Road to BCC 2026! My Athlete Code: ${code}. Level: ${level}. Let's team up!`;
    if (navigator.share) {
      navigator.share({ title: 'My BCC Player Card', text: text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Teks berhasil disalin!");
    }
  };

  return (
    <div className="max-w-sm mx-auto perspective-1000 group">
      <div className={cn(
        "relative w-full aspect-[3/4] rounded-[2rem] p-1 shadow-2xl transition-transform duration-500 group-hover:rotate-y-12 group-hover:scale-105",
        "bg-gradient-to-br", levelColor[level]
      )}>
        {/* Inner Card Frame */}
        <div className="relative h-full w-full bg-black/90 rounded-[1.8rem] overflow-hidden flex flex-col items-center pt-8 border border-white/10">
            
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay" />
            <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent" />

            {/* Top Stats */}
            <div className="absolute top-6 left-6 flex flex-col gap-1 z-10">
                <span className="text-4xl font-black font-headline text-white italic">{level.substring(0, 3).toUpperCase()}</span>
                <span className="text-sm font-bold text-white/80 uppercase tracking-widest">{position}</span>
            </div>

            {/* Avatar / Photo */}
            <div className="relative w-48 h-48 mt-8 mb-4 rounded-full border-4 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden">
                {avatarUrl ? (
                    <Image src={avatarUrl} alt={name} fill className="object-cover" />
                ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-4xl">😎</div>
                )}
            </div>

            {/* Name & Code */}
            <div className="mt-auto w-full bg-gradient-to-t from-black via-black/80 to-transparent pb-8 pt-12 px-6 text-center z-10">
                <h2 className="text-3xl font-black font-headline text-white uppercase truncate mb-2">{name}</h2>
                
                <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md py-2 px-4 rounded-full border border-white/10 mx-auto w-fit">
                    <code className="text-xl font-mono font-bold text-yellow-400 tracking-wider">{code}</code>
                    <Copy className="w-4 h-4 text-white/50 cursor-pointer hover:text-white" onClick={() => navigator.clipboard.writeText(code)} />
                </div>

                <div className="mt-6 flex justify-center">
                     <Button size="sm" variant="secondary" className="rounded-full font-bold gap-2" onClick={handleShare}>
                        <Share2 className="w-4 h-4" /> Share Card
                     </Button>
                </div>
            </div>

            {/* Verified Badge */}
            <div className="absolute bottom-6 right-6 opacity-20">
                <ShieldCheck className="w-12 h-12 text-white" />
            </div>
        </div>
      </div>
    </div>
  );
}