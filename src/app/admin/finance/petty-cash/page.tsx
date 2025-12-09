'use client';

import { useState } from "react";
import { 
  Wallet, Plus, Receipt, Coffee, Car, 
  Printer, MoreHorizontal, ArrowDownLeft, 
  ArrowUpRight, Camera, Search, SlidersHorizontal 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const TRANSACTIONS = [
  { id: "TX-991", item: "Kopi Kenangan (Wasit & Panitia)", amount: -150000, type: "EXPENSE", category: "CONSUMPTION", time: "10:30", pic: "Agung" },
  { id: "TX-990", item: "Top Up Saldo Harian", amount: 2000000, type: "INCOME", category: "TOPUP", time: "09:00", pic: "Bendahara" },
  { id: "TX-989", item: "Gocar Jemput Tamu VIP", amount: -45000, type: "EXPENSE", category: "TRANSPORT", time: "Yesterday", pic: "Sidiq" },
  { id: "TX-988", item: "Fotokopi Rundown & Bagan", amount: -25000, type: "EXPENSE", category: "ATK", time: "Yesterday", pic: "Annisa" },
  { id: "TX-987", item: "Beli Lakban & Kabel Ties", amount: -60000, type: "EXPENSE", category: "LOGISTICS", time: "Yesterday", pic: "Rian" },
];

const CATEGORIES = [
  { id: "CONSUMPTION", label: "Konsumsi", icon: Coffee, color: "text-orange-500", bg: "bg-orange-500/10" },
  { id: "TRANSPORT", label: "Transport", icon: Car, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "ATK", label: "ATK / Print", icon: Printer, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: "LOGISTICS", label: "Perlengkapan", icon: Receipt, color: "text-zinc-500", bg: "bg-zinc-500/10" },
];

export default function PettyCashPage() {
  const [balance, setBalance] = useState(3500000);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getCategoryStyle = (catId: string) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    return cat || { icon: Receipt, color: "text-zinc-500", bg: "bg-zinc-500/10" };
  };

  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-emerald-500 text-emerald-500 bg-emerald-500/10 backdrop-blur-md">
                    <Wallet className="w-3 h-3 mr-2" /> DAILY OPS WALLET
                </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-white">
                Petty <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-600">Cash</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Pencatatan pengeluaran operasional harian yang cepat dan akurat.
            </p>
        </div>

        <Button 
            onClick={() => setIsAddOpen(true)}
            className="h-14 rounded-full px-8 bg-white text-black hover:bg-zinc-200 font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform active:scale-95"
        >
            <Plus className="mr-2 w-6 h-6"/> GRAB CASH
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* --- LEFT: WALLET CARD --- */}
         <div className="lg:col-span-1 space-y-6">
            
            {/* MAIN BALANCE CARD */}
            <Card className="bg-gradient-to-b from-emerald-900 to-zinc-950 border-emerald-800 rounded-[40px] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                
                <CardContent className="p-8 relative z-10 flex flex-col h-[320px] justify-between">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                            <Wallet className="w-6 h-6 text-white"/>
                        </div>
                        <Badge className="bg-emerald-500 text-black hover:bg-emerald-400 border-none font-bold">ACTIVE</Badge>
                    </div>

                    <div>
                        <p className="text-emerald-300/80 font-bold uppercase text-xs tracking-[0.2em] mb-2">Available Balance</p>
                        <h2 className="text-5xl font-black text-white font-mono tracking-tight">
                            Rp {balance.toLocaleString('id-ID', { notation: "compact" })}
                        </h2>
                        <p className="text-sm text-zinc-400 mt-2 font-medium">
                            Cukup untuk estimasi operasional 2 hari ke depan.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                            <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Today's Out</p>
                            <p className="text-lg font-bold text-white font-mono">Rp 280k</p>
                        </div>
                        <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                            <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Limit Harian</p>
                            <p className="text-lg font-bold text-zinc-400 font-mono">Rp 1jt</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* QUICK CATEGORIES LEGEND */}
            <Card className="bg-zinc-900 border-zinc-800 rounded-[32px]">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Expense Categories</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3 p-6 pt-2">
                    {CATEGORIES.map((cat) => (
                        <div key={cat.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-800 transition-colors">
                            <div className={cn("p-2 rounded-lg", cat.bg, cat.color)}>
                                <cat.icon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-zinc-300">{cat.label}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
         </div>

         {/* --- RIGHT: TRANSACTION FEED --- */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* Search Bar */}
            <div className="flex items-center gap-3 bg-zinc-900/50 p-2 rounded-full border border-zinc-800 backdrop-blur-sm">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-3 w-5 h-5 text-zinc-500" />
                    <input 
                        type="text" 
                        placeholder="Cari transaksi..." 
                        className="w-full bg-transparent text-white font-bold placeholder:text-zinc-600 pl-12 pr-4 h-11 focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="ghost" size="icon" className="rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800">
                    <SlidersHorizontal className="w-5 h-5" />
                </Button>
            </div>

            {/* Transaction List */}
            <Card className="bg-zinc-900 border-zinc-800 rounded-[40px] overflow-hidden min-h-[500px]">
                <ScrollArea className="h-[600px] w-full p-6">
                    <div className="space-y-4">
                        {/* Date Separator Example */}
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] bg-zinc-800 flex-grow"></div>
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Hari Ini</span>
                            <div className="h-[1px] bg-zinc-800 flex-grow"></div>
                        </div>

                        {TRANSACTIONS.map((tx) => {
                            const style = getCategoryStyle(tx.category);
                            const Icon = style.icon;
                            
                            return (
                                <div key={tx.id} className="group flex items-center gap-4 p-4 rounded-[28px] bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all cursor-pointer">
                                    
                                    {/* Icon Box */}
                                    <div className={cn(
                                        "w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                                        tx.type === 'INCOME' ? "bg-emerald-500/10 text-emerald-500" : style.bg + " " + style.color
                                    )}>
                                        {tx.type === 'INCOME' ? <ArrowDownLeft className="w-7 h-7"/> : <Icon className="w-6 h-6"/>}
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-white text-base truncate pr-4">{tx.item}</h4>
                                            <span className={cn("font-black font-mono text-lg whitespace-nowrap", tx.type === 'INCOME' ? "text-emerald-500" : "text-white")}>
                                                {tx.type === 'INCOME' ? '+' : '-'} {Math.abs(tx.amount).toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                        
                                        <div className="flex justify-between items-end mt-1">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="w-5 h-5 border border-zinc-700">
                                                    <AvatarFallback className="bg-zinc-800 text-[8px] text-zinc-400">{tx.pic.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-xs text-zinc-500 font-medium">{tx.pic} • {tx.time}</span>
                                            </div>
                                            {tx.type === 'EXPENSE' && (
                                                <Badge variant="outline" className="border-zinc-800 text-[10px] text-zinc-600 px-2 h-5">
                                                    {style.label}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </Card>
         </div>

      </div>

      {/* --- ADD TRANSACTION MODAL --- */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-md p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 bg-zinc-900/50">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2">
                        <Receipt className="w-6 h-6 text-emerald-500"/> Log Expense
                    </DialogTitle>
                    <DialogDescription>Catat pengeluaran tunai di lapangan.</DialogDescription>
                </DialogHeader>
            </div>
            
            <div className="p-8 space-y-6">
                
                {/* Amount Input (Big) */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Total Bayar</label>
                    <div className="relative">
                        <span className="absolute left-4 top-4 text-zinc-500 font-bold text-lg">Rp</span>
                        <Input 
                            type="number" 
                            placeholder="0" 
                            className="bg-zinc-900 border-zinc-800 h-16 rounded-[20px] pl-12 text-3xl font-black font-mono text-white focus:ring-emerald-500/50" 
                        />
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Keperluan</label>
                    <Input placeholder="Cth: Beli Es Batu 5 Plastik" className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl text-lg font-bold" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Kategori</label>
                        <Select>
                            <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl"><SelectValue placeholder="Pilih" /></SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                <SelectItem value="CONSUMPTION">Konsumsi</SelectItem>
                                <SelectItem value="TRANSPORT">Transport</SelectItem>
                                <SelectItem value="ATK">ATK</SelectItem>
                                <SelectItem value="LOGISTICS">Logistik</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">PIC (Yang Beli)</label>
                        <Input placeholder="Nama" className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl" />
                    </div>
                </div>

                {/* Photo Proof */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Foto Struk / Barang</label>
                    <div className="h-24 bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-500 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-900/10 cursor-pointer transition-all">
                        <Camera className="w-6 h-6 mb-1" />
                        <span className="text-xs font-bold">Tap to Snap</span>
                    </div>
                </div>

                <Button className="w-full h-16 rounded-full font-black text-lg bg-emerald-600 hover:bg-emerald-700 text-white mt-2 shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-transform active:scale-95">
                    SIMPAN TRANSAKSI
                </Button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
