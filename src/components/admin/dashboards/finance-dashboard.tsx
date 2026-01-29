
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, FileText, Download } from "lucide-react";
import Link from 'next/link';

export function FinanceDashboard() {
  const financialSummary = {
    totalBudget: 150000000,
    income: {
      total: 85000000,
      registration: 45000000,
      sponsorship: 40000000,
    },
    expense: {
      total: 32000000,
      pending: 5000000,
    }
  };

  const budgetUtilization = (financialSummary.expense.total / financialSummary.totalBudget) * 100;
  const balance = financialSummary.income.total - financialSummary.expense.total;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-3xl font-bold font-headline">Dashboard Keuangan</h2>
            <p className="text-muted-foreground">Monitoring RAB, Arus Kas, dan Laporan LPJ.</p>
        </div>
        <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export Laporan (Excel)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Pemasukan (Income)</p>
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold">Rp {financialSummary.income.total.toLocaleString('id-ID')}</div>
                <p className="text-xs text-muted-foreground mt-1">
                    {((financialSummary.income.total / 200000000) * 100).toFixed(1)}% dari Target Revenue
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Pengeluaran (Expense)</p>
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                </div>
                <div className="text-2xl font-bold">Rp {financialSummary.expense.total.toLocaleString('id-ID')}</div>
                <p className="text-xs text-muted-foreground mt-1">
                    + Rp {financialSummary.expense.pending.toLocaleString('id-ID')} (Pending Approval)
                </p>
            </CardContent>
        </Card>

        <Card className="bg-primary/10">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-primary">Saldo Saat Ini (Balance)</p>
                    <Wallet className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">Rp {balance.toLocaleString('id-ID')}</div>
                <p className="text-xs text-primary/80 mt-1">Available Cash</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Realisasi Anggaran (RAB)</CardTitle>
                <CardDescription>Perbandingan rencana anggaran vs pengeluaran aktual per divisi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-bold">Total Penyerapan Anggaran</span>
                        <span>{budgetUtilization.toFixed(1)}%</span>
                    </div>
                    <Progress value={budgetUtilization} className="h-3" />
                    <p className="text-xs text-muted-foreground text-right">
                        Sisa Pagu: Rp {(financialSummary.totalBudget - financialSummary.expense.total).toLocaleString('id-ID')}
                    </p>
                </div>
                <div className="space-y-4 pt-4 border-t">
                    {[
                        { label: "Logistik & Ops", used: 12000000, limit: 30000000 },
                        { label: "Hadiah & Trofi", used: 5000000, limit: 45000000 },
                        { label: "Media & Dokum", used: 2500000, limit: 10000000 },
                        { label: "Konsumsi", used: 8000000, limit: 15000000 },
                    ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span>{item.label}</span>
                                <span className="text-muted-foreground">{((item.used / item.limit) * 100).toFixed(0)}%</span>
                            </div>
                            <Progress value={(item.used / item.limit) * 100} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Terpakai: {item.used.toLocaleString('id-ID')}</span>
                                <span>Pagu: {item.limit.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>Aksi Cepat</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
                <Button asChild variant="outline" className="w-full justify-start"><Link href='/admin/finance/reimbursement-approval'><FileText className="w-4 h-4 mr-2" /> Cek Reimbursement (3)</Link></Button>
                <Button asChild variant="outline" className="w-full justify-start"><Link href='/admin/teams'><DollarSign className="w-4 h-4 mr-2" /> Verifikasi Pendaftaran (12)</Link></Button>
                <Button asChild variant="outline" className="w-full justify-start"><Link href='/admin/finance/invoices'><FileText className="w-4 h-4 mr-2" /> Buat Invoice Sponsor</Link></Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
