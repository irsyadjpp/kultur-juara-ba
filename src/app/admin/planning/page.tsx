
'use client';

import { useState } from "react";
import { 
  TrendingUp, TrendingDown, Calendar, Plus, 
  Target, DollarSign, Wallet, PieChart, 
  ArrowRight, CheckCircle2, Clock, AlertCircle, FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const BUDGET_STATS = {
  total: 450000000, // 450 Juta
  used: 125000000,  // 125 Juta Terpakai
  burnRate: 28,     // 28%
  remaining: 325000000
};

const PROGRAMS = [
  { id: 1, name: "Sewa Venue GOR KONI", division: "OPERATIONS", cost: 80000000, date: "Jun 2026", status: "APPROVED", progress: 100 },
  { id: 2, name: "Produksi Jersey Panitia", division: "LOGISTICS", cost: 25000000, date: "May 2026", status: "IN_REVIEW", progress: 40 },
  { id: 3, name: "Hadiah Uang Tunai (Prize Pool)", division: "FINANCE", cost: 150000000, date: "Jul 2026", status: "PLANNED", progress: 0 },
  { id: 4, name: "Promosi Iklan Instagram", division: "MEDIA", cost: 15000000, date: "Apr 2026", status: "APPROVED", progress: 80 },
];

export default function PlanningPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="space-y-8 p-4 md:p-0">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-primary text-primary bg-primary/10 backdrop-blur-md">
                    <Target className="w-3 h-3 mr-2 fill-primary" /> STRATEGIC PLANNING
                </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-foreground">
                Masterplan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">& Budget</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl text-lg">
                Peta jalan strategis dan alokasi "amunisi" keuangan PB Kultur Juara.
            </p>
        </div>

        <Button 
            onClick={() => setIsAddOpen(true)}
            className="h-14 rounded-full px-8 bg-foreground text-background hover:bg-zinc-800 font-bold text-lg shadow-lg"
        >
            <Plus className="mr-2 w-5 h-5"/> NEW PROGRAM
        </Button>
      </div>

      {/* --- BUDGET OVERVIEW (HERO CARD) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* WAR CHEST (Total Budget) */}
         <Card className="lg:col-span-2 bg-gradient-to-br from-card to-secondary/50 border-border rounded-[40px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-all"></div>
            <CardContent className="p-8 md:p-10 relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <p className="text-muted-foreground font-bold uppercase text-xs tracking-[0.2em] mb-2">Total War Chest (RAB)</p>
                        <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tight">
                            Rp {BUDGET_STATS.total.toLocaleString('id-ID', { notation: "compact" })}
                        </h2>
                    </div>
                    <div className="bg-background p-4 rounded-3xl border">
                        <Wallet className="w-8 h-8 text-primary"/>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-3xl font-black text-foreground">{BUDGET_STATS.burnRate}%</span>
                            <span className="text-muted-foreground ml-2 font-bold text-sm uppercase">Burn Rate (Realized)</span>
                        </div>
                        <div className="text-right">
                            <span className="text-muted-foreground text-xs font-bold uppercase block mb-1">Remaining</span>
                            <span className="text-xl font-bold text-foreground font-mono">Rp {BUDGET_STATS.remaining.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                    <Progress value={BUDGET_STATS.burnRate} className="h-4 bg-secondary rounded-full" indicatorClassName="bg-gradient-to-r from-primary to-orange-500" />
                </div>
            </CardContent>
         </Card>

         {/* QUICK STATS */}
         <div className="space-y-6">
            <Card className="bg-card border rounded-[32px] flex-1">
                <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs font-bold uppercase">Funding Secured</p>
                        <p className="text-2xl font-black text-foreground">85%</p>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-card border rounded-[32px] flex-1">
                <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <FileText className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs font-bold uppercase">Programs</p>
                        <p className="text-2xl font-black text-foreground">{PROGRAMS.length} Items</p>
                    </div>
                </CardContent>
            </Card>
         </div>
      </div>

      {/* --- TABS SECTION --- */}
      <Tabs defaultValue="roadmap" className="w-full">
        <div className="flex justify-center mb-8">
            <TabsList className="bg-secondary p-1.5 rounded-full h-16 w-full max-w-lg border">
                <TabsTrigger value="roadmap" className="rounded-full h-full w-1/2 font-bold text-base data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md">
                    <Calendar className="w-4 h-4 mr-2"/> ROADMAP
                </TabsTrigger>
                <TabsTrigger value="budget" className="rounded-full h-full w-1/2 font-bold text-base data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md">
                    <DollarSign className="w-4 h-4 mr-2"/> BUDGET SHEET
                </TabsTrigger>
            </TabsList>
        </div>

        {/* TAB 1: ROADMAP (TIMELINE VIEW) */}
        <TabsContent value="roadmap">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PROGRAMS.map((prog) => (
                    <Card key={prog.id} className="group bg-card border-border rounded-[32px] hover:border-primary/50 transition-all hover:-translate-y-1">
                        <CardHeader className="p-6 pb-2">
                            <div className="flex justify-between items-start mb-4">
                                <Badge variant="outline" className="border-border text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                                    {prog.division}
                                </Badge>
                                {prog.status === 'APPROVED' ? <CheckCircle2 className="w-5 h-5 text-green-500"/> : <Clock className="w-5 h-5 text-yellow-500"/>}
                            </div>
                            <CardTitle className="text-xl font-black text-foreground leading-tight group-hover:text-primary transition-colors">
                                {prog.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-4">
                            <div className="bg-secondary/50 p-4 rounded-2xl border mb-4">
                                <div className="text-xs text-muted-foreground font-bold uppercase mb-1">Est. Cost</div>
                                <div className="text-lg font-mono font-bold text-foreground">Rp {prog.cost.toLocaleString('id-ID', {notation: 'compact'})}</div>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase">
                                    <span>{prog.date}</span>
                                    <span>{prog.progress}% Ready</span>
                                </div>
                                <Progress value={prog.progress} className="h-1.5 bg-secondary rounded-full" indicatorClassName={cn(prog.progress === 100 ? "bg-green-500" : "bg-primary")}/>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                
                {/* Add New Placeholder */}
                <button 
                    onClick={() => setIsAddOpen(true)}
                    className="group border-2 border-dashed border-border rounded-[32px] flex flex-col items-center justify-center gap-4 hover:bg-secondary hover:border-primary/50 transition-all h-[280px]"
                >
                    <div className="w-16 h-16 bg-card rounded-full border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                        <Plus className="w-8 h-8"/>
                    </div>
                    <span className="text-muted-foreground font-bold uppercase tracking-widest text-sm group-hover:text-foreground">Add Program</span>
                </button>
            </div>
        </TabsContent>

        {/* TAB 2: BUDGET SHEET (TABLE VIEW) */}
        <TabsContent value="budget">
            <Card className="bg-card border-border rounded-[32px] overflow-hidden">
                <CardHeader className="p-8 border-b">
                    <CardTitle className="text-2xl font-black uppercase">Detail Anggaran (RKA)</CardTitle>
                    <CardDescription>Breakdown pengeluaran per divisi.</CardDescription>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary/30 text-muted-foreground uppercase font-bold text-xs">
                            <tr>
                                <th className="px-8 py-6">Program Item</th>
                                <th className="px-6 py-6">Divisi</th>
                                <th className="px-6 py-6 text-right">RAB (Plan)</th>
                                <th className="px-6 py-6 text-center">Status</th>
                                <th className="px-6 py-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {PROGRAMS.map((prog) => (
                                <tr key={prog.id} className="hover:bg-secondary/30 transition-colors">
                                    <td className="px-8 py-5 font-bold text-foreground text-base">{prog.name}</td>
                                    <td className="px-6 py-5"><Badge variant="secondary" className="bg-secondary text-secondary-foreground border-none">{prog.division}</Badge></td>
                                    <td className="px-6 py-5 text-right font-mono font-bold text-muted-foreground">Rp {prog.cost.toLocaleString('id-ID')}</td>
                                    <td className="px-6 py-5 text-center">
                                        <Badge className={cn("rounded-full", prog.status === 'APPROVED' ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600")}>
                                            {prog.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <Button variant="ghost" size="sm" className="hover:text-foreground">Edit</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </TabsContent>
      </Tabs>

      {/* --- ADD PROGRAM MODAL --- */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="bg-card text-foreground rounded-[40px] max-w-lg p-0 overflow-hidden shadow-2xl">
            <div className="p-8 border-b bg-secondary/50">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline uppercase flex items-center gap-2">
                        <Plus className="w-6 h-6 text-primary"/> New Program
                    </DialogTitle>
                    <DialogDescription>Tambahkan rencana kerja baru ke dalam masterplan.</DialogDescription>
                </DialogHeader>
            </div>
            
            <div className="p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Nama Program</label>
                    <Input placeholder="Cth: Sewa Lighting Stage" className="bg-secondary border h-14 rounded-2xl text-lg font-bold" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Divisi</label>
                        <Select>
                            <SelectTrigger className="bg-secondary border h-14 rounded-2xl"><SelectValue placeholder="Pilih" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="LOGISTICS">Logistics</SelectItem>
                                <SelectItem value="MEDIA">Media & Creative</SelectItem>
                                <SelectItem value="MATCH">Match Control</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Estimasi Biaya</label>
                        <Input type="number" placeholder="Rp 0" className="bg-secondary border h-14 rounded-2xl font-mono" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Target Tanggal</label>
                    <Input type="month" className="bg-secondary border h-14 rounded-2xl" />
                </div>

                <Button className="w-full h-16 rounded-full font-black text-lg bg-primary hover:bg-primary/90 text-primary-foreground mt-4 shadow-xl shadow-primary/20">
                    SAVE TO MASTERPLAN
                </Button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
