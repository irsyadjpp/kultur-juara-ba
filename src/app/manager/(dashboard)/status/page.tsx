
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, ShieldAlert, FileText } from "lucide-react";
import Link from 'next/link';

// Mock Data
const MOCK_TEAM_STATUS = {
    teamName: "PB Djarum KW",
    paymentStatus: "PAID",
    players: [
        { name: "Kevin S. KW", nik: "3201...", tpfStatus: "APPROVED", note: "-" },
        { name: "Taufik H. KW", nik: "3203...", tpfStatus: "UPGRADE_REQUIRED", note: "Skill melebihi Beginner" },
        { name: "Lee C. W. KW", nik: "3204...", tpfStatus: "PENDING", note: "Video buram" }
    ]
};

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case 'APPROVED': return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Lolos</Badge>;
        case 'PENDING': return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Sedang Dicek</Badge>;
        case 'UPGRADE_REQUIRED': return <Badge className="bg-blue-600 hover:bg-blue-700">Wajib Naik Level</Badge>;
        default: return <Badge variant="destructive">Ditolak</Badge>;
    }
};

export default function TeamStatusPage() {
    const data = MOCK_TEAM_STATUS;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl mb-1">STATUS TIM & <span className="text-primary">VERIFIKASI</span></h1>
                <p className="text-muted-foreground text-sm">Pantau status pembayaran & verifikasi TPF untuk tim Anda.</p>
            </div>

            <Card className="rounded-[2rem] shadow-m3-1">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="font-bold text-xl">{data.teamName}</CardTitle>
                            <CardDescription>Status Pendaftaran Kolektif</CardDescription>
                        </div>
                        {data.paymentStatus === "PAID" ? (
                             <Badge className="bg-green-600 hover:bg-green-700">Pembayaran Lunas</Badge>
                        ) : (
                             <Badge variant="destructive">Belum Lunas</Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Pemain</TableHead>
                                    <TableHead>Status TPF</TableHead>
                                    <TableHead>Catatan Panitia</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.players.map((p, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">{p.name}</TableCell>
                                        <TableCell><StatusBadge status={p.tpfStatus} /></TableCell>
                                        <TableCell className="text-xs text-muted-foreground">{p.note}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg flex gap-3 border border-yellow-200 dark:border-yellow-800/50">
                        <ShieldAlert className="h-5 w-5 text-yellow-600 dark:text-yellow-500 shrink-0" />
                        <p className="text-xs text-yellow-800 dark:text-yellow-300">
                           Tim baru bisa didaftarkan ke kategori pertandingan jika <strong>semua pemain sudah Lolos Verifikasi (APPROVED)</strong> dan <strong>pembayaran lunas</strong>.
                        </p>
                    </div>
                </CardContent>
            </Card>
            
            <div className="flex justify-end gap-3">
                <Button variant="outline" asChild><Link href="/manager/dashboard"><FileText className="w-4 h-4 mr-2" />Lihat Dokumen</Link></Button>
                <Button asChild><Link href="/manager/pairing">Daftarkan Tim ke Turnamen</Link></Button>
            </div>

        </div>
    );
}
