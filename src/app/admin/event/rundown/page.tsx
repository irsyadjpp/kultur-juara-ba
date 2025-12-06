'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Plus, GripVertical, Trash2 } from "lucide-react";

// Mock Data (Backend: table 'rundown')
const MOCK_RUNDOWN = [
  { id: 1, time: "08:00 - 08:30", activity: "Opening Ceremony", pic: "Show Director" },
  { id: 2, time: "08:30 - 12:00", activity: "Babak Penyisihan Grup A", pic: "Match Control" },
  { id: 3, time: "12:00 - 13:00", activity: "ISHOMA & Doorprize Sesi 1", pic: "MC & Logistik" },
];

export default function RundownManagementPage() {
  const [rundown, setRundown] = useState(MOCK_RUNDOWN);
  const [newItem, setNewItem] = useState({ time: "", activity: "", pic: "" });

  const handleAdd = () => {
      if(!newItem.time) return;
      setRundown([...rundown, { id: Date.now(), ...newItem }]);
      setNewItem({ time: "", activity: "", pic: "" });
  };

  const handleDelete = (id: number) => {
      setRundown(rundown.filter(r => r.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold font-headline">Master Rundown Acara</h2>
        
        {/* INPUT BARIS BARU */}
        <Card className="bg-secondary/20 border-dashed border-2">
            <CardContent className="p-4 flex gap-2 items-end">
                <div className="w-1/4 space-y-1"><p className="text-xs font-bold">Waktu</p><Input placeholder="00:00 - 00:00" value={newItem.time} onChange={e => setNewItem({...newItem, time: e.target.value})} /></div>
                <div className="flex-1 space-y-1"><p className="text-xs font-bold">Aktivitas</p><Input placeholder="Nama Kegiatan" value={newItem.activity} onChange={e => setNewItem({...newItem, activity: e.target.value})} /></div>
                <div className="w-1/4 space-y-1"><p className="text-xs font-bold">PIC</p><Input placeholder="Divisi" value={newItem.pic} onChange={e => setNewItem({...newItem, pic: e.target.value})} /></div>
                <Button onClick={handleAdd}><Plus className="w-4 h-4"/></Button>
            </CardContent>
        </Card>

        {/* LIST RUNDOWN */}
        <div className="space-y-2">
            {rundown.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-background border rounded-lg shadow-sm group">
                    <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                    <div className="w-32 font-mono text-sm font-bold flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" /> {item.time}
                    </div>
                    <div className="flex-1 font-medium">{item.activity}</div>
                    <div className="text-sm text-muted-foreground w-32">{item.pic}</div>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                </div>
            ))}
        </div>
    </div>
  );
}
