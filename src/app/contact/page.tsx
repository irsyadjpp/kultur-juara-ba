'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ContactPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        toast({
            title: "Pesan Terkirim!",
            description: "Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.",
            className: "bg-green-600 text-white",
        });
        (event.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
            <Card className="rounded-3xl shadow-2xl border-t-4 border-primary">
                <CardHeader className="text-center p-8 md:p-12">
                    <CardTitle className="text-4xl md:text-5xl font-black font-headline tracking-tighter">Hubungi Kami</CardTitle>
                    <CardDescription className="text-lg md:text-xl text-muted-foreground pt-4 max-w-xl mx-auto">
                        Punya pertanyaan mengenai program latihan, pendaftaran, atau ingin menjalin kerjasama? Kami siap membantu.
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8 md:px-12 md:pb-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input id="name" name="name" type="text" placeholder="Nama Anda" required className="h-12 rounded-xl bg-secondary border-transparent focus:border-primary" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Alamat Email</Label>
                                <Input id="email" name="email" type="email" placeholder="Email Anda" required className="h-12 rounded-xl bg-secondary border-transparent focus:border-primary" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Kategori Pertanyaan</Label>
                            <Select name="category" required>
                                <SelectTrigger id="category" className="h-12 rounded-xl bg-secondary border-transparent focus:border-primary">
                                    <SelectValue placeholder="Pilih kategori pertanyaan..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pendaftaran">Pendaftaran & Jadwal</SelectItem>
                                    <SelectItem value="sponsorship">Sponsorship & Kerjasama</SelectItem>
                                    <SelectItem value="media">Media & Peliputan</SelectItem>
                                    <SelectItem value="teknis">Kendala Teknis Website</SelectItem>
                                    <SelectItem value="lainnya">Lainnya</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Pesan Anda</Label>
                            <Textarea id="message" name="message" placeholder="Tuliskan pesan Anda di sini..." required rows={6} className="rounded-xl bg-secondary border-transparent focus:border-primary"/>
                        </div>
                        <div>
                            <Button type="submit" className="w-full h-14 rounded-full text-lg font-bold" size="lg" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Mengirim...
                                    </>
                                ) : (
                                    "Kirim Pesan"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
