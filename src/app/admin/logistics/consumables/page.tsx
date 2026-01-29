
'use client';

import { useState } from "react";
import { 
  PackageOpen, Droplets, Zap, Archive, 
  Plus, Minus, RefreshCcw, AlertTriangle, 
  Search, Filter, ShoppingBag, Truck 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const CONSUMABLES = [
  { 
    id: "ITEM-001", 
    name: "Air Mineral 330ml", 
    category: "F&B", 
    stock: 45, 
    max: 100, 
    unit: "Dus", 
    burnRate: "High", 
    status: "SAFE",
    icon: Droplets,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
  },
  { 
    id: "ITEM-002", 
    name: "Isotonic Drink (Botol)", 
    category: "F&B", 
    stock: 12, 
    max: 50, 
    unit: "Krat", 
    burnRate: "Medium", 
    status: "LOW",
    icon: Zap,
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
  },
  { 
    id: "ITEM-003", 
    name: "Es Batu Kristal", 
    category: "F&B", 
    stock: 2, 
    max: 20, 
    unit: "Karung 10kg", 
    burnRate: "Critical", 
    status: "CRITICAL",
    icon: PackageOpen,
    color: "text-sky-400 bg-sky-500/10 border-sky-500/20"
  },
  { 
    id: "ITEM-004", 
    name: "Lakban Hitam (Cloth)", 
    category: "TOOLS", 
    stock: 15, 
    max: 20, 
    unit: "Roll", 
    burnRate: "Low", 
    status: "SAFE",
    icon: Archive,
    color: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20"
  },
  { 
    id: "ITEM-005", 
    name: "Trash Bag Besar", 
    category: "HYGIENE", 
    stock: 5, 
    max: 50, 
    unit: "Pack", 
    burnRate: "Medium", 
    status: "LOW",
    icon: ShoppingBag,
    color: "text-green-400 bg-green-500/10 border-green-500/20"
  },
];

const CATEGORIES = ["ALL", "F&B", "TOOLS", "HYGIENE", "MEDICAL"];

export default function ConsumablesPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState<typeof CONSUMABLES[0] | null>(null);
  const [actionType, setActionType] = useState<"REFILL" | "USE" | null>(null);
  const [amount, setAmount] = useState<number>(1);

  const filteredItems = CONSUMABLES.filter(item => activeTab === 'ALL' || item.category === activeTab);

  const getProgressColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage < 20) return "bg-red-500";
    if (percentage < 50) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24 h-[calc(100vh-64px)] flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-sky-500 text-sky-500 bg-sky-500/10 backdrop-blur-md">
                    <PackageOpen className="w-3 h-3 mr-2" /> SUPPLY MONITOR
                </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-headline uppercase tracking-tighter text-white">
                Consumables <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Tracker</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Pantau stok barang habis pakai, air, dan kebutuhan harian.
            </p>
        </div>

        {/* LOW STOCK ALERT */}
        <div className="bg-red-900/20 border border-red-900/50 px-6 py-3 rounded-[24px] flex items-center gap-4">
            <div className="bg-red-500/20 p-2 rounded-xl text-red-500 animate-pulse">
                <AlertTriangle className="w-6 h-6"/>
            </div>
            <div>
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Critical Stock</p>
                <p className="text-xl font-black text-white">2 Items</p>
            </div>
        </div>
      </div>

      {/* --- MAIN DASHBOARD --- */}
      <div className="flex-1 bg-zinc-900/50 border border-zinc-800/50 rounded-[40px] p-2 backdrop-blur-sm flex flex-col min-h-0">
        
        {/* TABS & FILTERS */}
        <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4 shrink-0">
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 no-scrollbar">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={cn(
                            "px-6 h-12 rounded-full text-sm font-black transition-all whitespace-nowrap border-2",
                            activeTab === cat 
                                ? "bg-sky-600 border-sky-500 text-white shadow-lg" 
                                : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
                <Input placeholder="Search supplies..." className="h-12 bg-zinc-950 border-zinc-800 rounded-full pl-10 text-white focus:ring-sky-500" />
            </div>
        </div>

        {/* GRID ITEMS */}
        <ScrollArea className="flex-1 px-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredItems.map((item) => {
                    const percentage = (item.stock / item.max) * 100;
                    const Icon = item.icon;

                    return (
                        <Card key={item.id} className="bg-zinc-900 border-zinc-800 rounded-[32px] overflow-hidden group hover:border-sky-500/30 transition-all">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border", item.color)}>
                                            <Icon className="w-7 h-7"/>
                                        </div>
                                        <div>
                                            <h3 className="font-black text-white text-lg leading-tight">{item.name}</h3>
                                            <p className="text-xs text-zinc-500 font-mono mt-1">{item.id}</p>
                                        </div>
                                    </div>
                                    {item.status === 'CRITICAL' && (
                                        <Badge className="bg-red-500 text-white border-none animate-pulse">LOW</Badge>
                                    )}
                                </div>

                                {/* Stock Progress */}
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                                        <span>In Stock</span>
                                        <span className="text-white">{item.stock} <span className="text-zinc-600">/ {item.max} {item.unit}</span></span>
                                    </div>
                                    <div className="h-4 bg-black rounded-full p-1 border border-zinc-800">
                                        <div 
                                            className={cn("h-full rounded-full transition-all duration-1000", getProgressColor(item.stock, item.max))} 
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-3">
                                    <Button 
                                        variant="outline" 
                                        className="h-12 rounded-xl border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold"
                                        onClick={() => { setSelectedItem(item); setActionType('USE'); }}
                                    >
                                        <Minus className="w-4 h-4 mr-2"/> TAKE
                                    </Button>
                                    <Button 
                                        className="h-12 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-lg shadow-sky-900/20"
                                        onClick={() => { setSelectedItem(item); setActionType('REFILL'); }}
                                    >
                                        <Plus className="w-4 h-4 mr-2"/> REFILL
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
                
                {/* Add New Item Placeholder */}
                <button className="border-2 border-dashed border-zinc-800 rounded-[32px] flex flex-col items-center justify-center gap-4 text-zinc-600 hover:text-sky-500 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all min-h-[220px]">
                    <Plus className="w-12 h-12"/>
                    <span className="font-black uppercase tracking-widest">Register New Item</span>
                </button>
            </div>
        </ScrollArea>

      </div>

      {/* --- ACTION MODAL (REFILL / USE) --- */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white rounded-[40px] max-w-sm p-0 overflow-hidden shadow-2xl">
            {selectedItem && (
                <>
                    <div className={cn("p-8 border-b border-zinc-800", actionType === 'REFILL' ? "bg-sky-950/30" : "bg-orange-950/30")}>
                        <DialogHeader>
                            <DialogTitle className={cn("text-2xl font-black font-headline uppercase flex items-center gap-2", actionType === 'REFILL' ? "text-sky-500" : "text-orange-500")}>
                                {actionType === 'REFILL' ? <RefreshCcw className="w-6 h-6"/> : <PackageOpen className="w-6 h-6"/>}
                                {actionType === 'REFILL' ? "Restock Supply" : "Dispense Item"}
                            </DialogTitle>
                            <DialogDescription>
                                {selectedItem.name} ({selectedItem.unit})
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    
                    <div className="p-8 space-y-6">
                        
                        {/* Amount Control */}
                        <div className="flex items-center justify-between bg-black rounded-2xl p-2 border border-zinc-800">
                            <Button 
                                variant="ghost" 
                                className="h-14 w-14 rounded-xl text-2xl font-black text-zinc-500 hover:text-white hover:bg-zinc-800"
                                onClick={() => setAmount(Math.max(1, amount - 1))}
                            >
                                -
                            </Button>
                            <Input 
                                type="number" 
                                value={amount} 
                                onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                                className="bg-transparent border-none text-center text-3xl font-black text-white h-14 w-24 focus-visible:ring-0" 
                            />
                            <Button 
                                variant="ghost" 
                                className="h-14 w-14 rounded-xl text-2xl font-black text-zinc-500 hover:text-white hover:bg-zinc-800"
                                onClick={() => setAmount(amount + 1)}
                            >
                                +
                            </Button>
                        </div>

                        {/* Context Fields */}
                        {actionType === 'USE' ? (
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Diambil Oleh / Divisi</label>
                                <Select>
                                    <SelectTrigger className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl"><SelectValue placeholder="Pilih Divisi..." /></SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                        <SelectItem value="MATCH">Match Control</SelectItem>
                                        <SelectItem value="MEDIC">Medical</SelectItem>
                                        <SelectItem value="SEC">Security</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Sumber / Vendor</label>
                                <Input placeholder="Nama Vendor / Toko" className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl" />
                            </div>
                        )}

                        <Button 
                            className={cn(
                                "w-full h-16 rounded-full font-black text-lg text-white mt-2 shadow-xl",
                                actionType === 'REFILL' 
                                    ? "bg-sky-600 hover:bg-sky-700 shadow-sky-900/20" 
                                    : "bg-orange-600 hover:bg-orange-700 shadow-orange-900/20"
                            )}
                        >
                            CONFIRM {actionType}
                        </Button>
                    </div>
                </>
            )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
