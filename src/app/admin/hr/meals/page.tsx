'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Utensils, ScanLine, CheckCircle2, XCircle } from "lucide-react";

const STAFF_DB = [
  { id: "PAN-001", name: "Irsyad", role: "Director", mealTaken: false },
  { id: "PAN-201", name: "Agung", role: "Match", mealTaken: true }, // Sudah makan
];

export default function StaffMealPage() {
  const [scanId, setScanId] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleScan = (e: React.FormEvent) => {
      e.preventDefault();
      const staff = STAFF_DB.find(s => s.id === scanId);
      
      if (!staff) {
          setResult({ status: 'ERROR', msg: "ID Tidak Dikenal" });
      } else if (staff.mealTaken) {
          setResult({ status: 'ALREADY', msg: `${staff.name} SUDAH AMBIL`, role: staff.role });
      } else {
          setResult({ status: 'OK', msg: `BERIKAN MAKANAN`, detail: staff.name, role: staff.role });
          // Di real app: update database mealTaken = true
      }
      setScanId(""); // Reset input agar siap scan lagi
  };

  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
       <div>
           <h2 className="text-2xl font-bold font-headline">Distribusi Konsumsi</h2>
           <p className="text-muted-foreground">Scan ID Card Panitia</p>
       </div>

       <Card className="bg-card border-2 border-dashed">
           <CardContent className="p-8">
               <form onSubmit={handleScan}>
                   <Input 
                        autoFocus 
                        placeholder="Klik & Scan Barcode..." 
                        value={scanId}
                        onChange={e => setScanId(e.target.value)}
                        className="text-center text-xl h-14"
                   />
                   <Button type="submit" className="w-full mt-4" size="lg"><ScanLine className="mr-2"/> CEK STATUS</Button>
               </form>
           </CardContent>
       </Card>

       {result && (
           <Card className={`border-l-8 shadow-xl ${result.status === 'OK' ? 'border-l-green-500 bg-green-50' : 'border-l-red-500 bg-red-50'}`}>
               <CardContent className="p-6">
                   {result.status === 'OK' ? (
                       <>
                           <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-2" />
                           <h3 className="text-2xl font-black text-green-800">{result.msg}</h3>
                           <p className="text-lg font-bold">{result.detail}</p>
                           <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">{result.role}</span>
                       </>
                   ) : (
                       <>
                           <XCircle className="w-16 h-16 text-red-600 mx-auto mb-2" />
                           <h3 className="text-2xl font-black text-red-800">{result.msg}</h3>
                           <p className="text-sm text-red-600">Jatah makan hanya 1x per sesi.</p>
                       </>
                   )}
               </CardContent>
           </Card>
       )}
    </div>
  );
}