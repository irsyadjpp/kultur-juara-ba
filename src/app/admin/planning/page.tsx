
'use client';

import { useState, useEffect } from "react";
import Link from 'next/link';
import { 
  TrendingUp, TrendingDown, Calendar, Plus, 
  Target, DollarSign, Wallet, PieChart, 
  ArrowRight, CheckCircle2, Clock, AlertCircle, FileText, CheckSquare, Sparkles, HandHeart, Leaf, BookCopy, Bot, HardHat, CalendarDays, BarChart3, ClipboardCheck, Network, Send
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getPrograms, reviewProgram, type ProgramProposal } from "./actions";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const BUDGET_STATS = {
  total: 450000000, 
  used: 125000000,  
  burnRate: 28,     
  remaining: 325000000
};

export default function PlanningPage() {
  const [programs, setPrograms] = useState<ProgramProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    getPrograms().then((data) => {
      setPrograms(data);
      setLoading(false);
    });
  }, []);
  
  const handleReview = async (id: string, decision: 'APPROVED' | 'REVISION' | 'REJECTED') => {
    // Simple prompt for notes, in real app use a Dialog
    const notes = prompt(`Berikan catatan untuk keputusan '${decision}':`);
    if (notes === null) return; // User cancelled

    const result = await reviewProgram(id, decision, notes);
    if(result.success) {
      toast({ title: "Status Updated", description: result.message, className: "bg-green-600 text-white" });
      const updatedPrograms = await getPrograms();
      setPrograms(updatedPrograms);
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" });
    }
  }
  
  const getStatusInfo = (status: ProgramProposal['status']) => {
    switch (status) {
      case 'SUBMITTED': return { icon: Send, color: "text-blue-500", label: "Menunggu Review" };
      case 'APPROVED': return { icon: CheckCircle2, color: "text-green-500", label: "Disetujui" };
      case 'REVISION': return { icon: AlertCircle, color: "text-yellow-500", label: "Butuh Revisi" };
      case 'REJECTED': return { icon: AlertCircle, color: "text-red-500", label: "Ditolak" };
      default: return { icon: Clock, color: "text-muted-foreground", label: "Draft" };
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-0">
      
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

        <Button asChild className="h-14 rounded-full px-8 bg-foreground text-background hover:bg-zinc-800 font-bold text-lg shadow-lg">
          <Link href="/admin/planning/new">
            <Plus className="mr-2 w-5 h-5"/> AJUKAN PROGRAM
          </Link>
        </Button>
      </div>
      
      <Card className="rounded-[2.5rem] shadow-xl">
        <CardHeader className="p-8">
            <CardTitle className="text-xl font-bold font-headline">Rencana Kerja & Program</CardTitle>
            <p className="text-sm text-muted-foreground">Daftar program yang diajukan oleh semua divisi. Klik untuk melihat detail & memberi persetujuan.</p>
        </CardHeader>
        <CardContent className="p-8 pt-0">
            {loading ? <p>Loading programs...</p> : (
                <Accordion type="single" collapsible className="w-full space-y-3">
                    {programs.map((prog, index) => {
                        const StatusIcon = getStatusInfo(prog.status).icon;
                        const statusColor = getStatusInfo(prog.status).color;
                        const statusLabel = getStatusInfo(prog.status).label;
                        
                        return (
                            <AccordionItem key={prog.id} value={prog.id} className="border-border/30 bg-secondary/30 rounded-2xl shadow-inner data-[state=open]:border-primary/50">
                                <AccordionTrigger className="p-4 hover:no-underline text-left">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center font-black text-2xl bg-background border", status === "APPROVED" && "bg-green-500/10 border-green-500/20 text-green-500")}>
                                            {prog.division.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-base text-foreground leading-tight">{prog.title}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Est: <span className="font-mono">Rp{prog.costEstimate.toLocaleString('id-ID')}</span> • Deadline: <span className="font-mono">{prog.deadline}</span>
                                            </p>
                                        </div>
                                        <div className={cn("flex items-center gap-2 text-xs font-bold mr-4", statusColor)}>
                                            <StatusIcon className="w-4 h-4"/> {statusLabel}
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-6 pt-0 bg-background/30 rounded-b-2xl">
                                    <div className="border-t border-dashed pt-4 space-y-4">
                                        <div>
                                            <h4 className="text-xs font-bold text-muted-foreground mb-1 uppercase">Tujuan & Output</h4>
                                            <p className="text-sm italic text-foreground">"{prog.objective}"</p>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="bg-secondary p-3 rounded-lg"><p className="text-xs font-bold text-muted-foreground">Prioritas</p><p className="font-bold">{prog.priority}</p></div>
                                            <div className="bg-secondary p-3 rounded-lg"><p className="text-xs font-bold text-muted-foreground">Pilar CSR</p><p className="font-bold">{prog.pilar_program}</p></div>
                                            <div className="bg-secondary p-3 rounded-lg"><p className="text-xs font-bold text-muted-foreground">Target Sponsor</p><p className="font-bold">{prog.sponsor_target}</p></div>
                                        </div>

                                        {prog.scNotes && (
                                            <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                                                <p className="text-xs font-bold text-yellow-500">Catatan Reviewer:</p>
                                                <p className="text-sm text-yellow-300/80">{prog.scNotes}</p>
                                            </div>
                                        )}
                                        
                                        {prog.status === 'SUBMITTED' && (
                                            <div className="flex justify-end gap-3 pt-4 border-t">
                                                <Button size="sm" variant="destructive" onClick={() => handleReview(prog.id, 'REJECTED')}>Reject</Button>
                                                <Button size="sm" variant="outline" onClick={() => handleReview(prog.id, 'REVISION')}>Revisi</Button>
                                                <Button size="sm" onClick={() => handleReview(prog.id, 'APPROVED')}>Setujui</Button>
                                            </div>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
