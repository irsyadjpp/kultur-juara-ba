'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Printer, Save, Plus, Trash2, FileText, RotateCcw } from "lucide-react";
import { DEFAULT_SK_DATA } from "@/lib/sk-template";
import Image from 'next/image';

export default function SKGeneratorPage() {
  const [data, setData] = useState(DEFAULT_SK_DATA);
  const [mode, setMode] = useState<'EDIT' | 'PREVIEW'>('EDIT');

  // Helper untuk update array state (Menimbang/Mengingat)
  const updateList = (key: 'menimbang' | 'mengingat' | 'menetapkan', index: number, value: string) => {
    const newList = [...data[key]];
    newList[index] = value;
    setData({ ...data, [key]: newList });
  };

  const addListItem = (key: 'menimbang' | 'mengingat' | 'menetapkan') => {
    setData({ ...data, [key]: [...data[key], ""] });
  };

  const removeListItem = (key: 'menimbang' | 'mengingat' | 'menetapkan', index: number) => {
    const newList = [...data[key]];
    newList.splice(index, 1);
    setData({ ...data, [key]: newList });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:p-0 print:space-y-0">
      
      {/* HEADER & TOOLBAR (Disembunyikan saat Print) */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
        <div>
            <h2 className="text-3xl font-bold font-headline text-primary">Generator SK Kepanitiaan</h2>
            <p className="text-muted-foreground">Buat dan cetak Surat Keputusan legal secara instan.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => setData(DEFAULT_SK_DATA)}>
                <RotateCcw className="w-4 h-4 mr-2" /> Reset Default
            </Button>
            <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
                <Printer className="w-4 h-4 mr-2" /> Cetak PDF
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">
        
        {/* KOLOM KIRI: EDITOR (Hidden saat Print) */}
        <div className="lg:col-span-1 space-y-6 print:hidden">
            <Card className="border-t-4 border-t-primary">
                <CardHeader><CardTitle>Editor Konten</CardTitle></CardHeader>
                <CardContent className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                    
                    {/* INFORMASI DASAR */}
                    <div className="space-y-2">
                        <Label>Nomor SK</Label>
                        <Input value={data.nomor} onChange={(e) => setData({...data, nomor: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label>Tentang</Label>
                        <Textarea value={data.tentang} onChange={(e) => setData({...data, tentang: e.target.value})} rows={3} />
                    </div>

                    {/* DYNAMIC LISTS: MENIMBANG */}
                    <div className="space-y-2 pt-4 border-t">
                        <Label className="font-bold text-primary">Menimbang</Label>
                        {data.menimbang.map((item, idx) => (
                            <div key={idx} className="flex gap-2">
                                <Textarea value={item} onChange={(e) => updateList('menimbang', idx, e.target.value)} className="text-xs" rows={2} />
                                <Button variant="ghost" size="icon" onClick={() => removeListItem('menimbang', idx)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full" onClick={() => addListItem('menimbang')}><Plus className="w-3 h-3 mr-2"/> Tambah Poin</Button>
                    </div>

                    {/* DYNAMIC LISTS: MENGINGAT */}
                    <div className="space-y-2 pt-4 border-t">
                        <Label className="font-bold text-primary">Mengingat</Label>
                        {data.mengingat.map((item, idx) => (
                            <div key={idx} className="flex gap-2">
                                <Textarea value={item} onChange={(e) => updateList('mengingat', idx, e.target.value)} className="text-xs" rows={2} />
                                <Button variant="ghost" size="icon" onClick={() => removeListItem('mengingat', idx)}><Trash2 className="w-4 h-4 text-destructive"/></Button>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full" onClick={() => addListItem('mengingat')}><Plus className="w-3 h-3 mr-2"/> Tambah Poin</Button>
                    </div>

                     {/* TANDA TANGAN */}
                     <div className="space-y-2 pt-4 border-t">
                        <Label className="font-bold">Penandatangan</Label>
                        <Input value={data.kota} onChange={(e) => setData({...data, kota: e.target.value})} placeholder="Kota" />
                        <Input value={data.tanggal} onChange={(e) => setData({...data, tanggal: e.target.value})} type="date" />
                        <Input value={data.ttd_nama} onChange={(e) => setData({...data, ttd_nama: e.target.value})} placeholder="Nama Jelas" />
                        <Input value={data.ttd_jabatan} onChange={(e) => setData({...data, ttd_jabatan: e.target.value})} placeholder="Jabatan" />
                    </div>

                </CardContent>
            </Card>
        </div>

        {/* KOLOM KANAN: PREVIEW KERTAS (Tampil saat Print) */}
        <div className="lg:col-span-2 print:w-full">
            <div className="bg-white text-black font-serif shadow-xl p-[20mm] min-h-[297mm] print:shadow-none print:p-0 relative">
                
                {/* KOP SURAT (Hardcoded Image Placeholder) */}
                <div className="flex items-center justify-center border-b-4 border-double border-black pb-4 mb-6 gap-4">
                     {/* Ganti src dengan logo Anda */}
                    <div className="w-24 h-24 relative">
                        <Image 
                            src="/images/logo.png" 
                            alt="Logo" 
                            fill
                            className="object-contain grayscale brightness-50" // Agar terlihat seperti kop surat resmi
                        />
                    </div>
                    <div className="text-center">
                        <h1 className="font-bold text-xl tracking-widest uppercase">PANITIA PELAKSANA</h1>
                        <h2 className="font-bold text-2xl tracking-wider uppercase mb-1">BANDUNG COMMUNITY CHAMPIONSHIP 2026</h2>
                        <p className="text-sm font-sans">Sekretariat: GOR BBR, Jl. Komp. Buah Batu Regency, Kota Bandung</p>
                        <p className="text-sm font-sans">Email: admin@bccbandung.com | WhatsApp: +62 811-1952-2228</p>
                    </div>
                </div>

                {/* JUDUL SK */}
                <div className="text-center mb-8">
                    <h3 className="font-bold text-lg underline decoration-1 underline-offset-4 mb-1">SURAT KEPUTUSAN</h3>
                    <p className="text-sm font-bold">Nomor: {data.nomor}</p>
                    <p className="mt-4 font-bold uppercase max-w-lg mx-auto leading-relaxed">
                        TENTANG <br/> {data.tentang}
                    </p>
                    <p className="mt-4 font-bold uppercase">{data.ttd_jabatan.toUpperCase()} BCC 2026,</p>
                </div>

                {/* ISI: MENIMBANG */}
                <div className="mb-4 grid grid-cols-[100px_10px_1fr]">
                    <div className="font-bold">MENIMBANG</div>
                    <div>:</div>
                    <div className="space-y-2 text-justify">
                        {data.menimbang.map((item, idx) => (
                            <div key={idx} className="flex gap-2">
                                <span>{String.fromCharCode(97 + idx)}.</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ISI: MENGINGAT */}
                <div className="mb-8 grid grid-cols-[100px_10px_1fr]">
                    <div className="font-bold">MENGINGAT</div>
                    <div>:</div>
                    <div className="space-y-2 text-justify">
                        {data.mengingat.map((item, idx) => (
                            <div key={idx} className="flex gap-2">
                                <span>{idx + 1}.</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* KEPUTUSAN */}
                <div className="text-center font-bold mb-4">MEMUTUSKAN:</div>
                
                <div className="mb-4 grid grid-cols-[100px_10px_1fr]">
                    <div className="font-bold">MENETAPKAN</div>
                    <div>:</div>
                    <div className="space-y-4 text-justify">
                        {data.menetapkan.map((item, idx) => {
                            // Split "Pertama:" menjadi bold
                            const [header, ...content] = item.split(":");
                            return (
                                <div key={idx}>
                                    <strong>{header.toUpperCase()}:</strong> {content.join(":")}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* TANDA TANGAN */}
                <div className="flex justify-end mt-16">
                    <div className="w-[250px]">
                        <p>Ditetapkan di : {data.kota}</p>
                        <p className="mb-20">Pada Tanggal : {data.tanggal}</p>
                        
                        <p className="font-bold underline decoration-1 underline-offset-4 uppercase">
                            {data.ttd_nama}
                        </p>
                        <p className="font-bold">{data.ttd_jabatan}</p>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}
