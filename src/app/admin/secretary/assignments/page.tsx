'use client';

import { useState } from "react";
import { 
  ShieldCheck, FileSignature, Plus, 
  Search, Users, QrCode, Trash2, 
  ChevronRight, AlertCircle, Fingerprint, 
  CheckCircle2, Copy 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ROLE_DEFINITIONS } from "@/lib/data/role-definitions"; // Pastikan file ini ada
import { MandateQRDialog } from "@/components/admin/mandate-qr-dialog"; // Komponen QR sebelumnya
import { useToast } from "@/hooks/use-toast";

// --- MOCK DATA ---
const ACTIVE_MANDATES = [
  { 
    id: "SPT-001", 
    no: "001/SPT-TPF/XII/2025", 
    roleKey: "TPF",
    title: "Tim Pencari Fakta",
    issuedTo: [
      { name: "Faiz Azilla", avatar: "" },
      { name: "Anindiffa Pandu", avatar: "" },
      { name: "Aulia Febrianto", avatar: "" }
    ],
    date: "08 Dec 2025",
    status: "ACTIVE" 
  },
  { 
    id: "SPT-002", 
    no: "002/SPT-MED/XII/2025", 
    roleKey: "MEDIS",
    title: "Tim Medis & Kesehatan",
    issuedTo: [
      { name: "Dr. Nanda", avatar: "https://github.com/shadcn.png" },
      { name: "Ns. Budi", avatar: "" }
    ],
    date: "09 Dec 2025",
    status: "ACTIVE" 
  },
];

const STAFF_LIST = [
  { id: "S1", name: "Faiz Azilla Syaehon", role: "Koordinator TPF" },
  { id: "S2", name: "Anindiffa Pandu Prayuda", role: "Anggota TPF" },
  { id: "S3", name: "Aulia Febrianto", role: "Anggota TPF" },
  { id: "S4", name: "Dr. Nanda", role: "Koordinator Medis" },
  { id: "S5", name: "Sidiq", role: "Koordinator Keamanan" },
  { id: "S6", name: "Agung", role: "Referee" },
];

export default function DigitalMandatePage() {
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedMandateQR, setSelectedMandateQR] = useState<any>(null);
  
  // Create Form State
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [letterNo, setLetterNo] = useState("003/SPT-XXX/KJ/VI/2026");

  const activeRoleData = selectedRole ? ROLE_DEFINITIONS[selectedRole as keyof typeof ROLE_DEFINITIONS] : null;

  const handleToggleStaff = (name: string) => {
    if (selectedStaff.includes(name)) {
      setSelectedStaff(selectedStaff.filter(s => s !== name));
    } else {
      setSelectedStaff([...selectedStaff, name]);
    }
  };
  
  const handlePublish = () => {
    toast({ 
        title: "Mandat Diterbitkan!", 
        description: `${selectedStaff.length} personil kini memiliki wewenang digital resmi.`,
        className: "bg-green-600 text-white"
    });
    setIsCreateOpen(false);
    // Logic simpan ke DB...
  };

  return (
    <div className="space-y-8 p-4 md:p-0 font-body pb-24">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 border-sky-500 text-sky-500 bg-sky-500/10 animate-pulse">
                    <Fingerprint className="w-3 h-3 mr-2" /> OFFICIAL AUTHORIZATION
                </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-foreground">
                E-Mandate <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">System</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl text-lg">
                Penerbitan surat tugas & wewenang operasional secara digital.
            </p>
        </div>

        <Button 
            onClick={() => setIsCreateOpen(true)}
            className="h-14 rounded-full px-8 bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg shadow-lg shadow-sky-500/30 transition-transform active:scale-95"
        >
            <Plus className="mr-2 w-6 h-6"/> ISSUE MANDATE
        </Button>
      </div>

      {/* --- ACTIVE MANDATES GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
         {ACTIVE_MANDATES.map((mandate) => (
             <div key={mandate.id} className="group relative bg-card border rounded-[32px] p-6 hover:border-sky-500/50 transition-all hover:-translate-y-1 overflow-hidden shadow-sm">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-600"></div>
                
                <div className="flex justify-between items-start mb-4 pl-4">
                    <div>
                        <Badge variant="outline" className="mb-2 font-mono text-[10px]">
                            {mandate.no}
                        </Badge>
                        <h3 className="text-xl font-black text-foreground leading-tight uppercase">{mandate.title}</h3>
                    </div>
                    <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20 font-bold">
                        {mandate.status}
                    </Badge>
                </div>

                <div className="pl-4 mb-6">
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-2">Assigned Personnel</p>
                    <div className="flex items-center -space-x-3">
                        {mandate.issuedTo.map((person, i) => (
                            <Avatar key={i} className="w-10 h-10 border-2 border-background">
                                <AvatarImage src={person.avatar} />
                                <AvatarFallback className="bg-secondary text-xs font-bold text-muted-foreground">{person.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        ))}
                        {mandate.issuedTo.length > 3 && (
                            <div className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-bold text-muted-foreground">
                                +{mandate.issuedTo.length - 3}
                            </div>
                        )}
                    </div>
                </div>

                <div className="pl-4 flex items-center justify-between border-t pt-4">
                    <div className="text-xs text-muted-foreground font-medium">
                        Issued: <span className="text-foreground">{mandate.date}</span>
                    </div>
                    <div className="flex gap-2">
                        <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-red-500/10 hover:text-red-500">
                            <Trash2 className="w-4 h-4"/>
                        </Button>
                        <Button 
                            onClick={() => setSelectedMandateQR(mandate)}
                            className="h-10 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 text-xs shadow-lg"
                        >
                            <QrCode className="w-4 h-4 mr-2"/> SHOW QR
                        </Button>
                    </div>
                </div>
             </div>
         ))}

         {/* Empty State Placeholder */}
         {ACTIVE_MANDATES.length === 0 && (
             <div className="col-span-full h-64 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-[32px] bg-secondary/50">
                 <ShieldCheck className="w-16 h-16 mb-4 opacity-20"/>
                 <p className="font-bold uppercase tracking-widest">No Active Mandates</p>
             </div>
         )}
      </div>

      {/* --- CREATE MANDATE MODAL --- */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-card text-foreground rounded-[40px] max-w-4xl p-0 overflow-hidden shadow-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Issue New Mandate</DialogTitle>
            <DialogDescription>Create a new digital mandate for a division or personnel.</DialogDescription>
          </DialogHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-[600px]">
                
                {/* LEFT: FORM INPUT */}
                <div className="p-8 space-y-6 overflow-y-auto border-r">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black font-headline uppercase text-foreground">Issue Mandate</h2>
                        <p className="text-sm text-muted-foreground">Buat surat tugas baru untuk divisi/personil.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-muted-foreground ml-1">1. Divisi / Role (SOP)</label>
                            <Select onValueChange={setSelectedRole}>
                                <SelectTrigger className="border bg-secondary h-14 rounded-2xl"><SelectValue placeholder="Pilih Divisi..." /></SelectTrigger>
                                <SelectContent>
                                    {Object.keys(ROLE_DEFINITIONS).map((key) => (
                                        <SelectItem key={key} value={key}>
                                            {ROLE_DEFINITIONS[key as keyof typeof ROLE_DEFINITIONS].title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-muted-foreground ml-1">2. Nomor Surat</label>
                            <div className="flex gap-2">
                                <Input value={letterNo} onChange={(e) => setLetterNo(e.target.value)} className="border bg-secondary h-14 rounded-2xl font-mono text-sm" />
                                <Button size="icon" variant="outline" className="h-14 w-14 rounded-2xl hover:bg-secondary"><Copy className="w-5 h-5"/></Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold uppercase text-muted-foreground">3. Pilih Personil</label>
                                <span className="text-xs text-sky-500 font-bold">{selectedStaff.length} Selected</span>
                            </div>
                            <ScrollArea className="h-48 rounded-2xl border bg-secondary p-2">
                                {STAFF_LIST.map((staff) => (
                                    <div key={staff.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-background transition-colors cursor-pointer" onClick={() => handleToggleStaff(staff.name)}>
                                        <Checkbox checked={selectedStaff.includes(staff.name)} className="data-[state=checked]:bg-sky-600 data-[state=checked]:text-white" />
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-foreground">{staff.name}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase">{staff.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                    </div>
                </div>

                {/* RIGHT: PREVIEW & ACTION */}
                <div className="bg-secondary p-8 flex flex-col h-full">
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <FileSignature className="w-5 h-5 text-sky-500"/>
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Mandate Preview</span>
                        </div>

                        {activeRoleData ? (
                            <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                                <div className="p-4 rounded-2xl bg-background border">
                                    <h3 className="font-black text-lg text-foreground mb-2">{activeRoleData.title}</h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 text-justify">
                                        {activeRoleData.menimbang}
                                    </p>
                                    <div className="space-y-2">
                                        <Badge variant="outline" className="border-sky-500/30 text-sky-500 bg-sky-500/10 text-[10px]">
                                            JOB DESC: {activeRoleData.jobDescriptions.length} Items
                                        </Badge>
                                        <Badge variant="outline" className="border-orange-500/30 text-orange-500 bg-orange-500/10 text-[10px] ml-2">
                                            SOP: {activeRoleData.sops.length} Items
                                        </Badge>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-background border">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">Authorization</p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500">
                                            <Fingerprint className="w-6 h-6"/>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">Project Director</p>
                                            <p className="text-xs text-muted-foreground">Digital Signature Verified</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-2xl">
                                <AlertCircle className="w-12 h-12 mb-2 opacity-50"/>
                                <p className="text-sm font-bold uppercase">Select Role First</p>
                            </div>
                        )}
                    </div>

                    <div className="pt-6 mt-auto border-t">
                        <Button 
                            onClick={handlePublish}
                            disabled={!selectedRole || selectedStaff.length === 0}
                            className="w-full h-16 rounded-2xl font-black text-lg bg-sky-600 hover:bg-sky-700 text-white shadow-xl shadow-sky-500/20"
                        >
                            AUTHORIZE & PUBLISH <CheckCircle2 className="ml-2 w-5 h-5"/>
                        </Button>
                    </div>
                </div>

            </div>
        </DialogContent>
      </Dialog>

      {/* --- QR MODAL (Component Re-use) --- */}
      {selectedMandateQR && (
        <MandateQRDialog 
            isOpen={!!selectedMandateQR} 
            onClose={() => setSelectedMandateQR(null)} 
            mandateData={selectedMandateQR}
        />
      )}

    </div>
  );
}