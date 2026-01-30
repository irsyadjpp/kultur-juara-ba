
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Download, Share2 } from "lucide-react";

interface MandateQRDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mandateData: { id: string; no: string; title: string };
}

export function MandateQRDialog({ isOpen, onClose, mandateData }: MandateQRDialogProps) {
  // URL Publik (Ganti domain saat production)
  const verifyUrl = `https://badmintour.site/verify/mandate/${mandateData.id}`; // ID ini tokennya

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card text-foreground max-w-sm rounded-[32px] p-0 overflow-hidden border-none">
        
        <DialogHeader className="bg-secondary p-8 text-center">
          <DialogTitle className="font-black font-headline uppercase tracking-widest text-lg">DIGITAL MANDATE</DialogTitle>
          <DialogDescription className="text-xs font-mono">{mandateData.no}</DialogDescription>
        </DialogHeader>

        {/* QR Area */}
        <div className="p-8 flex flex-col items-center justify-center space-y-6 bg-card">
            <div className="p-2 border-4 border-foreground rounded-xl bg-white">
                <QRCodeSVG value={verifyUrl} size={200} />
            </div>
            
            <div className="text-center space-y-1">
                <p className="font-bold text-xl uppercase">{mandateData.title}</p>
                <p className="text-xs text-muted-foreground px-4">
                    Tunjukkan QR ini kepada petugas keamanan atau pihak berwenang untuk validasi tugas.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
                <Button className="w-full rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-none border">
                    <Download className="w-4 h-4 mr-2"/> SAVE
                </Button>
                <Button className="w-full rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                    <Share2 className="w-4 h-4 mr-2"/> SHARE
                </Button>
            </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
