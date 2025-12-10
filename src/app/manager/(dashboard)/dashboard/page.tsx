
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, AlertCircle, CheckCircle2, Users, FileText, BarChart2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const myTeams = [
     { id: 1, name: "The Smashers", category: "Beginner", status: "VERIFIED", payment: "PAID" },
     { id: 2, name: "Shuttle Masters", category: "Intermediate", status: "PENDING", payment: "PAID" },
     { id: 3, name: "Court Kings", category: "Advance", status: "ACTION_NEEDED", payment: "PENDING" }
  ];
  
  // const myTeams: any[] = [];

  const getStatusInfo = (status: string) => {
    switch (status) {
        case "VERIFIED": return { icon: <CheckCircle2 className="w-4 h-4 text-green-400"/>, text: "Lolos Verifikasi", color: "bg-green-500/10 text-green-400 border-green-500/20" };
        case "PENDING": return { icon: <AlertCircle className="w-4 h-4 text-yellow-400"/>, text: "Menunggu Verifikasi", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" };
        case "ACTION_NEEDED": return { icon: <AlertCircle className="w-4 h-4 text-red-400"/>, text: "Perlu Tindakan", color: "bg-red-500/10 text-red-400 border-red-500/20" };
        default: return { icon: <AlertCircle className="w-4 h-4 text-gray-400"/>, text: "Draft", color: "bg-secondary" };
    }
  }

  const getPaymentStatus = (status: string) => {
    switch (status) {
        case "PAID": return { text: "Lunas", color: "bg-green-500/10 text-green-400 border-green-500/20" };
        case "PENDING": return { text: "Cek Bukti", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" };
        default: return { text: "Belum Bayar", color: "bg-red-500/10 text-red-400 border-red-500/20" };
    }
  }


  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
            <h1 className="text-3xl font-black font-headline tracking-tight">Selamat Datang, Manajer!</h1>
            <p className="text-muted-foreground">Kelola pendaftaran tim dan progres verifikasi Anda di sini.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
            <Link href="/manager/register-team">
                <PlusCircle className="w-4 h-4 mr-2" /> Daftarkan Tim Baru
            </Link>
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-primary/50">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Tim Terdaftar</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{myTeams.length} Tim</div></CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-400/50">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pembayaran Lunas</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{myTeams.filter(t => t.payment === 'PAID').length} Tim</div></CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-400/50">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Perlu Tindakan</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{myTeams.filter(t => t.status === 'ACTION_NEEDED' || t.payment === 'PENDING').length} Tim</div></CardContent>
        </Card>
      </div>

      {/* List Tim atau Empty State */}
      <div>
        <h2 className="text-xl font-bold font-headline mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-primary"/> Tim Saya</h2>
        
        {myTeams.length === 0 ? (
          <Card className="border-dashed border-2 bg-card">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <div className="p-4 bg-secondary rounded-full">
                    <Users className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                    <h3 className="font-bold text-xl">Belum ada tim yang didaftarkan</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                        Klik tombol "Daftarkan Tim Baru" untuk mulai mengisi data pemain dan memilih kategori yang akan diikuti.
                    </p>
                </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {myTeams.map(team => {
              const statusInfo = getStatusInfo(team.status);
              const paymentInfo = getPaymentStatus(team.payment);
              return (
                <Card key={team.id} className="hover:border-primary/50 transition-colors bg-card overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="outline" className="mb-2">{team.category}</Badge>
                                    <h3 className="text-2xl font-bold font-headline">{team.name}</h3>
                                </div>
                                <div className="flex gap-2">
                                     <Badge className={paymentInfo.color}>{paymentInfo.text}</Badge>
                                     <Badge className={statusInfo.color}>{statusInfo.text}</Badge>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm mt-4">
                                Klik 'Detail & Aksi' untuk melihat status verifikasi per pemain, upload ulang bukti bayar, atau mengubah roster.
                            </p>
                        </div>
                        <div className="bg-secondary/50 p-6 sm:w-48 flex flex-col justify-center items-center gap-2 border-t sm:border-t-0 sm:border-l">
                            <Button asChild className="w-full">
                                <Link href={`/manager/roster/${team.id}`}>Detail & Aksi</Link>
                            </Button>
                            <Button variant="outline" className="w-full">
                                <FileText className="w-4 h-4 mr-2"/> Roster
                            </Button>
                        </div>
                    </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>

    </div>
  );
}
