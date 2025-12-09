
'use client';

import { 
  Wallet, TrendingUp, TrendingDown, PieChart, 
  ArrowUpRight, ArrowDownLeft, FileText, 
  AlertCircle, DollarSign, CreditCard, Download, 
  CheckCircle2, Clock, XCircle 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const FINANCIAL_SUMMARY = {
  balance: 325450000,
  income: 450000000,
  expense: 124550000,
  pendingIn: 75000000,  // Tagihan Sponsor belum cair
  pendingOut: 12500000, // Reimburse belum diapprove
};

const RECENT_TRANSACTIONS = [
  { id: "TRX-001", desc: "Sponsorship Term 1 - Bank BJB", date: "Today, 10:23", amount: 150000000, type: "IN", category: "SPONSORSHIP", status: "SUCCESS" },
  { id: "TRX-002", desc: "DP Sewa GOR KONI", date: "Yesterday, 14:00", amount: -25000000, type: "OUT", category: "VENUE", status: "SUCCESS" },
  { id: "TRX-003", desc: "Registrasi Tim PB Djarum (10 Atlet)", date: "Yesterday, 09:15", amount: 3500000, type: "IN", category: "REGISTRATION", status: "SUCCESS" },
  { id: "TRX-004", desc: "Cetak Banner & Backdrop", date: "12 Jun 2026", amount: -8500000, type: "OUT", category: "LOGISTICS", status: "PENDING" },
  { id: "TRX-005", desc: "Konsumsi Technical Meeting", date: "10 Jun 2026", amount: -2100000, type: "OUT", category: "CONSUMPTION", status: "SUCCESS" },
];

export default function FinanceDashboard() {
  
  return (
    <div className="space-y-8 p-4 md:p-8 font-body pb-24">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-green-500 text-green-500 bg-green-500/10 backdrop-blur-md">
                    <TrendingUp className="w-3 h-3 mr-2" /> CASH FLOW POSITIVE
                </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-white">
                Treasury <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Command</span>
            </h1>
            <p className="text-zinc-400 mt-2 max-w-xl text-lg">
                Pantauan likuiditas, persetujuan anggaran, dan arus kas real-time.
            </p>
        </div>

        <div className="flex gap-3">
            <Button variant="outline" className="h-14 rounded-full border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
                <Download className="mr-2 w-5 h-5"/> Report
            </Button>
            <Button className="h-14 rounded-full px-8 bg-white text-black hover:bg-zinc-200 font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <FileText className="mr-2 w-5 h-5"/> New Invoice
            </Button>
        </div>
      </div>

      {/* --- HERO: CASH POSITION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* 1. MAIN BALANCE CARD */}
         <Card className="lg:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 rounded-[40px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] group-hover:bg-emerald-500/20 transition-all"></div>
            
            <CardContent className="p-8 md:p-10 relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-zinc-500 font-bold uppercase text-xs tracking-[0.2em] mb-2">Total Net Balance</p>
                        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight font-mono">
                            Rp {FINANCIAL_SUMMARY.balance.toLocaleString('id-ID')}
                        </h2>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-3xl border border-zinc-700/50 backdrop-blur-md">
                        <Wallet className="w-8 h-8 text-emerald-500"/>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-10">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="p-1.5 bg-green-500/20 rounded-full text-green-500"><ArrowUpRight className="w-4 h-4"/></div>
                            <span className="text-xs font-bold text-zinc-500 uppercase">Income (YTD)</span>
                        </div>
                        <p className="text-2xl font-bold text-green-400 font-mono">
                            + Rp {FINANCIAL_SUMMARY.income.toLocaleString('id-ID', {notation: "compact"})}
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="p-1.5 bg-red-500/20 rounded-full text-red-500"><ArrowDownLeft className="w-4 h-4"/></div>
                            <span className="text-xs font-bold text-zinc-500 uppercase">Expense (YTD)</span>
                        </div>
                        <p className="text-2xl font-bold text-red-400 font-mono">
                            - Rp {FINANCIAL_SUMMARY.expense.toLocaleString('id-ID', {notation: "compact"})}
                        </p>
                    </div>
                </div>
            </CardContent>
         </Card>

         {/* 2. PENDING ACTIONS (Vertical Stack) */}
         <div className="space-y-6 flex flex-col">
            {/* Reimbursement Alert */}
            <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] flex-1 hover:border-red-500/30 transition-all cursor-pointer group">
                <CardContent className="p-6 flex flex-col justify-center h-full">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-red-500/10 rounded-2xl text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <Badge className="bg-red-500/20 text-red-500 border-none font-bold">Action Needed</Badge>
                    </div>
                    <p className="text-zinc-500 text-xs font-bold uppercase">Pending Reimbursement</p>
                    <h3 className="text-3xl font-black text-white mt-1">Rp 12.5 Jt</h3>
                    <p className="text-xs text-zinc-600 mt-2">5 pengajuan menunggu approval Anda.</p>
                </CardContent>
            </Card>

            {/* Incoming Receivables */}
            <Card className="bg-zinc-900 border-zinc-800 rounded-[32px] flex-1 hover:border-blue-500/30 transition-all cursor-pointer group">
                <CardContent className="p-6 flex flex-col justify-center h-full">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <Clock className="w-6 h-6" />
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-500 border-none font-bold">Receivables</Badge>
                    </div>
                    <p className="text-zinc-500 text-xs font-bold uppercase">Outstanding Invoices</p>
                    <h3 className="text-3xl font-black text-white mt-1">Rp 75.0 Jt</h3>
                    <p className="text-xs text-zinc-600 mt-2">Tagihan sponsor yang belum cair.</p>
                </CardContent>
            </Card>
         </div>
      </div>

      {/* --- TRANSACTION & ANALYSIS TABS --- */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-[40px] p-2 backdrop-blur-sm">
        <Tabs defaultValue="transactions" className="w-full">
            <div className="flex items-center justify-between px-6 py-4">
                <TabsList className="bg-zinc-950 p-1 rounded-full h-14 border border-zinc-800">
                    <TabsTrigger value="transactions" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        <CreditCard className="w-4 h-4 mr-2"/> TRANSACTIONS
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="rounded-full h-12 px-8 font-bold text-sm data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        <PieChart className="w-4 h-4 mr-2"/> ANALYTICS
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="transactions" className="mt-0 p-4">
                <div className="space-y-3">
                    {RECENT_TRANSACTIONS.map((trx) => (
                        <div key={trx.id} className="group flex flex-col md:flex-row items-center gap-4 p-5 bg-zinc-900 border border-zinc-800 rounded-[28px] hover:border-zinc-700 transition-all hover:-translate-y-1">
                            
                            {/* Icon Type */}
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                                trx.type === 'IN' ? "bg-green-500/10 text-green-500" : "bg-zinc-800 text-zinc-400"
                            )}>
                                {trx.type === 'IN' ? <ArrowUpRight className="w-6 h-6"/> : <ArrowDownLeft className="w-6 h-6"/>}
                            </div>

                            {/* Details */}
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="font-bold text-white text-base">{trx.desc}</h4>
                                <div className="flex items-center justify-center md:justify-start gap-2 mt-1 text-xs font-medium text-zinc-500">
                                    <span className="bg-zinc-950 px-2 py-1 rounded-md border border-zinc-800 uppercase">{trx.category}</span>
                                    <span>● {trx.date}</span>
                                    <span>● {trx.id}</span>
                                </div>
                            </div>

                            {/* Amount & Status */}
                            <div className="text-center md:text-right min-w-[150px]">
                                <div className={cn("font-mono font-bold text-lg", trx.type === 'IN' ? "text-green-400" : "text-white")}>
                                    {trx.type === 'IN' ? '+' : ''} Rp {Math.abs(trx.amount).toLocaleString('id-ID')}
                                </div>
                                <div className="flex justify-center md:justify-end mt-1">
                                    {trx.status === 'SUCCESS' && <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/20">SUCCESS</Badge>}
                                    {trx.status === 'PENDING' && <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20 animate-pulse">PENDING</Badge>}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
                
                <div className="mt-6 text-center">
                    <Button variant="ghost" className="text-zinc-500 hover:text-white font-bold rounded-full">
                        View All Transactions
                    </Button>
                </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-0 p-8 min-h-[300px] flex items-center justify-center text-zinc-500">
                <div className="text-center">
                    <PieChart className="w-16 h-16 mx-auto mb-4 opacity-20"/>
                    <p className="font-bold uppercase tracking-widest text-sm">Analytics Module Coming Soon</p>
                </div>
            </TabsContent>
        </Tabs>
      </div>

    </div>
  );
}
