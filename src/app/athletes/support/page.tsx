
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  MessageSquare, 
  FileQuestion, 
  AlertCircle, 
  Send,
  ChevronRight 
} from "lucide-react";
import { useState } from "react";

export default function SupportPage() {
  const [showTicketForm, setShowTicketForm] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24 px-6 pt-8">
      
      <div className="mb-8">
        <h1 className="font-headline text-3xl">HELP <span className="text-primary">CENTER</span></h1>
        <p className="text-muted-foreground text-sm">Butuh bantuan? Kami siap membantu 24/7.</p>
      </div>

      {/* 1. SEARCH BAR */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Cari masalah (misal: pembayaran, jadwal)" 
          className="pl-12 h-12 rounded-3xl bg-secondary/30 border-transparent focus:border-primary/50 text-base shadow-sm"
        />
      </div>

      {/* 2. QUICK ACTIONS (Grid) */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Button 
          variant="outline" 
          className="h-24 rounded-[2rem] flex flex-col items-center justify-center gap-2 border-2 hover:border-primary hover:bg-primary/5 transition-all group"
          onClick={() => setShowTicketForm(true)}
        >
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
            <MessageSquare size={20} />
          </div>
          <span className="font-bold text-xs">Chat Admin</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-24 rounded-[2rem] flex flex-col items-center justify-center gap-2 border-2 hover:border-primary hover:bg-primary/5 transition-all group"
        >
          <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
            <AlertCircle size={20} />
          </div>
          <span className="font-bold text-xs">Lapor Isu</span>
        </Button>
      </div>

      {/* 3. TICKET FORM (Conditional Render) */}
      {showTicketForm && (
        <Card className="p-5 rounded-[2rem] border-primary/20 bg-card shadow-m3-3 mb-8 animate-in zoom-in-95 duration-300">
           <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold">Buat Tiket Bantuan</h3>
             <Button variant="ghost" size="sm" onClick={() => setShowTicketForm(false)} className="h-6 w-6 rounded-full p-0">X</Button>
           </div>
           <div className="space-y-3">
             <Input placeholder="Subjek Masalah" className="rounded-xl bg-secondary/50" />
             <Textarea placeholder="Jelaskan detail masalah Anda..." className="rounded-xl bg-secondary/50 min-h-[100px]" />
             <Button className="w-full rounded-pill bg-primary font-bold">
               <Send className="mr-2 h-4 w-4" /> Kirim Tiket
             </Button>
           </div>
        </Card>
      )}

      {/* 4. FAQ ACCORDION */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FileQuestion className="text-primary h-5 w-5" />
          <h2 className="font-bold text-lg">Sering Ditanyakan</h2>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-3">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="bg-card px-5 py-4 rounded-2xl hover:bg-secondary/50 hover:no-underline font-semibold text-sm shadow-sm [&[data-state=open]]:rounded-b-none transition-all">
              Bagaimana jika partner saya belum daftar?
            </AccordionTrigger>
            <AccordionContent className="bg-card px-5 py-4 rounded-b-2xl text-muted-foreground text-xs leading-relaxed border-t border-dashed">
              Partner Anda wajib membuat akun terlebih dahulu. Setelah akun aktif, Anda bisa memasukkan <strong>Athlete Code</strong> mereka di menu Pendaftaran Turnamen.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-none">
            <AccordionTrigger className="bg-card px-5 py-4 rounded-2xl hover:bg-secondary/50 hover:no-underline font-semibold text-sm shadow-sm [&[data-state=open]]:rounded-b-none transition-all">
              Apakah uang pendaftaran bisa kembali?
            </AccordionTrigger>
            <AccordionContent className="bg-card px-5 py-4 rounded-b-2xl text-muted-foreground text-xs leading-relaxed border-t border-dashed">
              Uang pendaftaran tidak dapat dikembalikan (Non-refundable) kecuali turnamen dibatalkan oleh pihak panitia.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="border-none">
            <AccordionTrigger className="bg-card px-5 py-4 rounded-2xl hover:bg-secondary/50 hover:no-underline font-semibold text-sm shadow-sm [&[data-state=open]]:rounded-b-none transition-all">
              Bagaimana cara mengganti kategori?
            </AccordionTrigger>
            <AccordionContent className="bg-card px-5 py-4 rounded-b-2xl text-muted-foreground text-xs leading-relaxed border-t border-dashed">
              Anda tidak bisa mengganti kategori secara mandiri setelah pembayaran. Silakan hubungi admin melalui tombol "Chat Admin" di atas.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* 5. LIVE CHAT FLOATING BUTTON (Optional, jika ingin akses cepat) */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="h-14 w-14 rounded-full shadow-xl bg-gradient-sport text-white p-0 hover:scale-105 transition-transform">
           <MessageSquare size={24} />
        </Button>
      </div>

    </div>
  );
}

    
