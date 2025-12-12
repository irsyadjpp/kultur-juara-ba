"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Trophy, Wallet, Info, ChevronRight, Check } from "lucide-react";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "payment",
    title: "Pembayaran Dikonfirmasi",
    message: "Pembayaran untuk Turnamen Ganda Putra telah diterima. Lunas.",
    time: "2m ago",
    read: false,
    icon: Wallet,
    color: "bg-green-500",
  },
  {
    id: 2,
    type: "match",
    title: "Jadwal Dirilis",
    message: "Anda akan bertanding melawan Pasangan C di Court 3 pukul 14:00.",
    time: "1h ago",
    read: false,
    icon: Trophy,
    color: "bg-primary",
  },
  {
    id: 3,
    type: "system",
    title: "Update Regulasi",
    message: "Perubahan aturan service diperbarui. Harap baca buku panduan.",
    time: "1d ago",
    read: true,
    icon: Info,
    color: "bg-blue-500",
  },
];

export default function NotificationPage() {
  return (
    <div className="min-h-screen bg-background pb-6 pt-6 flex flex-col h-screen">
      <div className="px-6 mb-2 flex justify-between items-center shrink-0">
        <h1 className="font-headline text-2xl">INBOX <span className="text-primary text-2xl">•</span></h1>
        <Button variant="ghost" size="sm" className="text-xs font-bold text-muted-foreground">
          Mark all as read
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4 pb-24">
          
          <p className="text-xs font-bold text-muted-foreground px-2 mt-4 mb-2">TODAY</p>
          
          {NOTIFICATIONS.map((notif) => (
            <div 
              key={notif.id} 
              className={`group flex gap-4 p-4 rounded-3xl transition-all duration-300 relative overflow-hidden ${
                notif.read ? "bg-card/50" : "bg-card shadow-m3-1 border-l-4 border-primary"
              }`}
            >
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${notif.read ? 'bg-secondary text-muted-foreground' : `${notif.color} text-white`}`}>
                <notif.icon size={20} />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                   <h3 className={`text-sm ${notif.read ? 'font-medium opacity-80' : 'font-bold'}`}>{notif.title}</h3>
                   <span className="text-[10px] text-muted-foreground font-mono">{notif.time}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {notif.message}
                </p>
              </div>

              {/* Action Dot / Chevron */}
              {!notif.read && (
                <div className="self-center">
                  <div className="h-2 w-2 bg-primary rounded-full mb-1"></div>
                </div>
              )}
            </div>
          ))}

          <p className="text-xs font-bold text-muted-foreground px-2 mt-8 mb-2">EARLIER</p>
          
          {/* Dummy Read Notification */}
          <div className="flex gap-4 p-4 rounded-3xl bg-secondary/20 opacity-60 hover:opacity-100 transition-opacity">
             <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                <Check size={20} className="text-muted-foreground"/>
             </div>
             <div>
                <h3 className="text-sm font-medium">Akun Berhasil Dibuat</h3>
                <p className="text-xs text-muted-foreground">Selamat datang di Road to BCC Player System.</p>
             </div>
          </div>

        </div>
      </ScrollArea>
    </div>
  );
}
