'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Store, Image as ImageIcon } from "lucide-react";
// Gunakan komponen Dialog yang sama seperti di atas

export default function PartnerManagementPage() {
  // Struktur Data untuk Backend
  // Table: partners
  // Columns: id, name, type (SPONSOR/TENANT), package (Platinum/Gold/Booth), logo_url, qr_code_value
  
  const [partners, setPartners] = useState([
      { id: 1, name: "Bank BJB", type: "SPONSOR", package: "Title", logo: "bjb.png" },
      { id: 2, name: "Kopi Kenangan", type: "TENANT", package: "Booth A", logo: "kopi.png" },
  ]);

  // Form handling mirip dengan User Management di atas...
  
  return (
    <div className="space-y-6">
       {/* Tampilan Grid Card agar terlihat logonya */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {partners.map(p => (
              <Card key={p.id} className="relative group">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                          {/* Image Placeholder */}
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                          <h3 className="font-bold text-lg">{p.name}</h3>
                          <p className="text-xs text-muted-foreground uppercase">{p.type} • {p.package}</p>
                      </div>
                      <div className="flex gap-2 w-full pt-4">
                          <Button variant="outline" className="flex-1 text-xs">Edit</Button>
                          <Button variant="destructive" className="flex-1 text-xs">Hapus</Button>
                      </div>
                  </CardContent>
              </Card>
          ))}
          
          {/* Tombol Add New */}
          <button className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:bg-secondary/20 transition-colors h-full min-h-[200px]">
              <Plus className="w-10 h-10 mb-2" />
              <span className="font-bold">Tambah Partner</span>
          </button>
       </div>
    </div>
  );
}
