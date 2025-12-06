'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Save } from "lucide-react";

export default function NewsCMSPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = async () => {
      // Payload ke Backend
      const payload = {
          title,
          content,
          slug: title.toLowerCase().replace(/ /g, '-'),
          author_id: "CURRENT_USER_ID",
          created_at: new Date().toISOString()
      };
      
      console.log("Publishing:", payload);
      // await api.post('/news', payload);
      alert("Berita diterbitkan!");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold font-headline">Tulis Berita / Artikel</h2>
            <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" /> Publish ke Website
            </Button>
        </div>

        <Card>
            <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                    <label className="font-bold">Judul Artikel</label>
                    <Input 
                        placeholder="Contoh: Jadwal Final BCC 2026 Resmi Dirilis" 
                        className="text-lg font-bold"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                
                <div className="space-y-2">
                    <label className="font-bold">Konten</label>
                    <Textarea 
                        placeholder="Tulis isi berita di sini..." 
                        className="min-h-[300px]" 
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>

                <div className="bg-secondary/20 p-4 rounded text-xs text-muted-foreground">
                    <p><strong>Tips:</strong> Gunakan bahasa yang menarik. Artikel akan muncul otomatis di halaman "Berita" website publik.</p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
