
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Download, Printer, RefreshCw, Image as ImageIcon, Type } from "lucide-react";
import { jsPDF } from "jspdf";

export default function CertificateGeneratorPage() {
  // --- CONFIG STATE ---
  const [templateSrc, setTemplateSrc] = useState('/images/certificate-template.jpg'); // Default
  const [fontSize, setFontSize] = useState(60);
  const [yPos, setYPos] = useState(50); // Posisi vertikal (%)
  const [textColor, setTextColor] = useState('#000000');
  
  // --- DATA STATE ---
  const [singleName, setSingleName] = useState("Nama Peserta");
  const [singleCategory, setSingleCategory] = useState("Juara 1 - Beregu Putra");
  const [bulkNames, setBulkNames] = useState("Budi Santoso\nSiti Aminah\nAhmad Dani");
  
  // --- CANVAS REF ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // FUNGSI: Draw Canvas
  const drawCertificate = (name: string, category: string, canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = templateSrc;
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
        // Set ukuran canvas sesuai gambar asli (High Res)
        canvas.width = img.width;
        canvas.height = img.height;

        // 1. Gambar Template
        ctx.drawImage(img, 0, 0);

        // 2. Tulis Nama
        ctx.font = `bold ${fontSize}px Montserrat, sans-serif`;
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Posisi X (Tengah), Y (Dinamis)
        const x = canvas.width / 2;
        const y = (canvas.height * yPos) / 100;
        
        ctx.fillText(name.toUpperCase(), x, y);

        // 3. Tulis Kategori (Opsional, lebih kecil di bawah nama)
        ctx.font = `normal ${fontSize * 0.5}px Montserrat, sans-serif`;
        ctx.fillStyle = "#555555";
        ctx.fillText(category, x, y + (fontSize * 1.5));
    };

    // Handle jika gambar error/belum ada
    img.onerror = () => {
        canvas.width = 800;
        canvas.height = 600;
        ctx.fillStyle = "#e5e7eb";
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = "#000";
        ctx.font = "20px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Template Image Not Found", 400, 300);
        ctx.fillText("Upload to: /public/images/certificate-template.jpg", 400, 330);
    }
  };

  // Efek Real-time Preview
  useEffect(() => {
    drawCertificate(singleName, singleCategory, canvasRef.current);
  }, [singleName, singleCategory, fontSize, yPos, textColor, templateSrc]);

  // DOWNLOAD IMAGE
  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Sertifikat-${singleName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // BULK GENERATE PDF
  const handleBulkDownloadPDF = () => {
    const names = bulkNames.split('\n').filter(n => n.trim() !== '');
    if (names.length === 0) return alert("Daftar nama kosong!");

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvasRef.current?.width || 800, canvasRef.current?.height || 600]
    });

    // Create a hidden temporary canvas for processing
    const tempCanvas = document.createElement('canvas');
    
    names.forEach((name, index) => {
        if (index > 0) doc.addPage();
        
        // Draw to temp canvas (Synchronous logic simulation)
        // Note: In real production, image loading is async. 
        // For simplicity here, we reuse the logic assuming image is cached/loaded.
        drawCertificate(name, "Peserta Badmintour Open #1", tempCanvas); 
        
        const imgData = tempCanvas.toDataURL('image/jpeg', 0.9);
        doc.addImage(imgData, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
    });

    doc.save("Badmintour-Certificates.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold font-headline">Generator Sertifikat</h2>
            <p className="text-muted-foreground">Buat sertifikat otomatis untuk pemenang dan peserta.</p>
        </div>
        <div className="flex gap-2">
             <Button variant="outline" onClick={() => setTemplateSrc('/images/certificate-template.jpg')}>
                <RefreshCw className="w-4 h-4 mr-2" /> Reset Template
             </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: KONFIGURASI */}
        <Card className="lg:col-span-1 h-fit">
            <CardHeader>
                <CardTitle className="text-lg">Pengaturan Desain</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                
                {/* 1. Template Source */}
                <div className="space-y-2">
                    <Label>URL Template Gambar</Label>
                    <div className="flex gap-2">
                        <Input value={templateSrc} onChange={(e) => setTemplateSrc(e.target.value)} />
                    </div>
                    <p className="text-xs text-muted-foreground">Upload gambar ke folder public/images</p>
                </div>

                {/* 2. Posisi & Font */}
                <div className="space-y-4 border-t pt-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label>Ukuran Font ({fontSize}px)</Label>
                            <Type className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <Slider value={[fontSize]} max={150} min={20} step={1} onValueChange={(v) => setFontSize(v[0])} />
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label>Posisi Vertikal ({yPos}%)</Label>
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <Slider value={[yPos]} max={100} min={0} step={1} onValueChange={(v) => setYPos(v[0])} />
                    </div>

                    <div className="space-y-2">
                        <Label>Warna Teks</Label>
                        <div className="flex gap-2">
                            {['#000000', '#FFFFFF', '#D2232A', '#003366', '#FFD700'].map(c => (
                                <div 
                                    key={c} 
                                    className={`w-8 h-8 rounded-full cursor-pointer border-2 ${textColor === c ? 'border-primary' : 'border-transparent'}`}
                                    style={{ backgroundColor: c }}
                                    onClick={() => setTextColor(c)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>

        {/* KOLOM KANAN: INPUT & PREVIEW */}
        <div className="lg:col-span-2 space-y-6">
            
            <Tabs defaultValue="single" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="single">Satu Penerima</TabsTrigger>
                    <TabsTrigger value="bulk">Banyak (Bulk)</TabsTrigger>
                </TabsList>
                
                {/* MODE SINGLE */}
                <TabsContent value="single" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Nama Penerima</Label>
                            <Input value={singleName} onChange={(e) => setSingleName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Keterangan / Predikat</Label>
                            <Input value={singleCategory} onChange={(e) => setSingleCategory(e.target.value)} />
                        </div>
                    </div>
                    
                    {/* CANVAS PREVIEW */}
                    <div className="border rounded-lg overflow-hidden bg-gray-100 shadow-sm relative group">
                        <canvas ref={canvasRef} className="w-full h-auto block" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button onClick={handleDownloadImage} className="bg-white text-black hover:bg-gray-200">
                                <Download className="w-4 h-4 mr-2" /> Download PNG
                            </Button>
                        </div>
                    </div>
                </TabsContent>

                {/* MODE BULK */}
                <TabsContent value="bulk" className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label>Daftar Nama (Pisahkan dengan Enter)</Label>
                        <Textarea 
                            rows={10} 
                            value={bulkNames} 
                            onChange={(e) => setBulkNames(e.target.value)} 
                            placeholder="Copy paste nama peserta dari Excel di sini..."
                            className="font-mono text-sm"
                        />
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={handleBulkDownloadPDF} className="w-full" disabled>
                            <Printer className="w-4 h-4 mr-2" /> Generate PDF (Client-side Experimental)
                        </Button>
                        {/* Catatan: Fitur PDF Client-side butuh penanganan async image loading yang lebih kompleks. 
                            Untuk versi MVP, sarankan Admin menggunakan Single Mode atau Print Manual. */}
                    </div>
                    <p className="text-xs text-muted-foreground bg-yellow-50 p-2 rounded border border-yellow-200">
                        *Fitur Bulk PDF memerlukan resource browser yang besar. Untuk hasil terbaik, gunakan mode "Satu Penerima" lalu save gambar satu per satu, atau gunakan fitur Mail Merge di Word jika data sangat banyak.
                    </p>
                </TabsContent>
            </Tabs>

        </div>
      </div>
    </div>
  );
}
