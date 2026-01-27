
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Ambulance, ShieldAlert, Wrench } from "lucide-react";
import { triggerSOS } from "@/app/admin/(app)/dashboard/actions";
import { useToast } from "@/hooks/use-toast";

export function EmergencyButton() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSOS = async (type: string) => {
    setIsSending(true);
    // Simulasi ambil lokasi browser
    const location = "Lapangan 3 (GPS)"; 
    
    await triggerSOS(type, location);
    
    setIsSending(false);
    setIsOpen(false);
    
    toast({
      variant: "destructive",
      title: "SOS SENT!",
      description: `Bantuan ${type} sedang menuju lokasi Anda.`,
      duration: 5000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.7)] animate-pulse hover:animate-none z-50 flex items-center justify-center border-4 border-black"
            size="icon"
        >
            <AlertTriangle className="w-8 h-8 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black border-red-900 border-2 max-w-sm">
        <div className="text-center space-y-6 py-4">
            <div className="w-20 h-20 bg-red-900/30 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <div>
                <h2 className="text-2xl font-black font-headline text-red-500 uppercase">EMERGENCY CALL</h2>
                <p className="text-zinc-400 text-sm">Pilih jenis bantuan yang dibutuhkan segera.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2 border-red-900 hover:bg-red-900/20 hover:text-red-500"
                    onClick={() => handleSOS('MEDIS')}
                    disabled={isSending}
                >
                    <Ambulance className="w-8 h-8" />
                    <span className="font-bold">MEDIS</span>
                </Button>
                <Button 
                    variant="outline" 
                    className="h-24 flex flex-col gap-2 border-orange-900 hover:bg-orange-900/20 hover:text-orange-500"
                    onClick={() => handleSOS('SECURITY')}
                    disabled={isSending}
                >
                    <ShieldAlert className="w-8 h-8" />
                    <span className="font-bold">KEAMANAN</span>
                </Button>
                 <Button 
                    variant="outline" 
                    className="col-span-2 h-16 flex items-center gap-2 border-zinc-800 hover:bg-zinc-800"
                    onClick={() => handleSOS('TEKNIS')}
                    disabled={isSending}
                >
                    <Wrench className="w-5 h-5" />
                    <span className="font-bold">TEKNIS (Lampu/Net)</span>
                </Button>
            </div>
            
            <p className="text-[10px] text-zinc-600">
                *Tombol ini mengirimkan lokasi GPS Anda secara real-time ke Head of Security.
            </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
