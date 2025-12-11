
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Trophy, Users, Shield, QrCode, LogOut, User, Settings
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// MOCK DATA
const ATHLETE_MOCK = {
    id: "ATL-8821",
    name: "Jonathan Christie",
    team: "PB Djarum Official",
    avatar: "https://github.com/shadcn.png",
};

export default function PlayerDashboardLayout({ children }: { children: React.ReactNode }) {
  
  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-body pb-24">
        {/* HEADER */}
        <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 md:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="bg-cyan-500/20 p-2 rounded-lg"><Trophy className="w-5 h-5 text-cyan-500"/></div>
                <span className="font-black text-white tracking-tighter hidden md:inline text-lg">PLAYER DASHBOARD</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                    <p className="text-xs font-bold text-white">{ATHLETE_MOCK.name}</p>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{ATHLETE_MOCK.team}</p>
                </div>
                <Avatar className="h-10 w-10 border-2 border-zinc-800 ring-2 ring-black">
                    <AvatarImage src={ATHLETE_MOCK.avatar} />
                    <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <div className="h-8 w-[1px] bg-zinc-800 mx-2"></div>
                <Link href="/player/profile" passHref>
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white rounded-xl"><User className="w-5 h-5"/></Button>
                </Link>
                <Button onClick={handleLogout} variant="ghost" size="icon" className="text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl"><LogOut className="w-5 h-5"/></Button>
            </div>
        </div>
        
        {/* CONTENT */}
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            {children}
        </div>
    </div>
  );
}
