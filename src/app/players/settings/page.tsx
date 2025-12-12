
"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Moon, Bell, LogOut, Shield, Smartphone } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background pb-24 px-6 pt-8">
      <h1 className="font-headline text-3xl mb-8">SET<span className="text-primary">TINGS</span></h1>

      <div className="space-y-8">
        {/* APPEARANCE */}
        <section className="space-y-4">
           <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Tampilan</h3>
           <div className="bg-card rounded-3xl p-5 flex items-center justify-between shadow-m3-1">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                    <Moon size={20} />
                 </div>
                 <div>
                    <p className="font-bold">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">Tema gelap untuk malam hari</p>
                 </div>
              </div>
              <Switch />
           </div>
        </section>

        {/* NOTIFICATIONS */}
        <section className="space-y-4">
           <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Notifikasi</h3>
           <div className="bg-card rounded-[2rem] p-2 shadow-m3-1 space-y-1">
              <div className="p-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Bell size={20} className="text-muted-foreground" />
                    <Label className="font-medium">Jadwal Pertandingan</Label>
                 </div>
                 <Switch defaultChecked />
              </div>
              <Separator />
              <div className="p-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Smartphone size={20} className="text-muted-foreground" />
                    <Label className="font-medium">Push Notification</Label>
                 </div>
                 <Switch defaultChecked />
              </div>
           </div>
        </section>

        {/* ACCOUNT */}
        <section>
           <Button variant="destructive" className="w-full h-14 rounded-pill font-bold shadow-lg shadow-red-500/20">
              <LogOut className="mr-2 h-5 w-5" /> Log Out
           </Button>
           <p className="text-center text-[10px] text-muted-foreground mt-4 font-mono">
             Version 1.0.2 (Build 2025)
           </p>
        </section>
      </div>
    </div>
  );
}
