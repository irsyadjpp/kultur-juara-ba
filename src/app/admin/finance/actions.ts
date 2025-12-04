'use server';

// MOCK DATABASE REIMBURSEMENT
export type ReimbursementItem = {
  id: string;
  description: string;
  category: string;
  amount: number;
};

export type ReimbursementRequest = {
  id: string;
  applicantName: string;
  division: string;
  date: string;
  whatsapp: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  items: ReimbursementItem[];
  totalAmount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID';
  proofUrl: string; // Simulasi URL gambar
  notes?: string; // Alasan penolakan
};

// Data Awal Simulasi
let MOCK_REIMBURSEMENTS: ReimbursementRequest[] = [
  {
    id: "REIM/001/12/25",
    applicantName: "Terri (Ops)",
    division: "OPERATIONS",
    date: "2025-12-10",
    whatsapp: "081233334444",
    bankName: "BCA",
    accountNumber: "1234567890",
    accountHolder: "Terri Operasional",
    items: [
      { id: "1", description: "Beli Air Mineral 10 Dus", category: "Konsumsi", amount: 350000 },
      { id: "2", description: "Lakban Lapangan", category: "Logistik", amount: 150000 }
    ],
    totalAmount: 500000,
    status: "PENDING",
    proofUrl: "#"
  }
];

export async function submitReimbursement(data: any) {
  // Simulasi Delay
  await new Promise(r => setTimeout(r, 1000));

  const newId = `REIM/${Math.floor(Math.random() * 1000)}/12/26`;
  
  const newRequest: ReimbursementRequest = {
    id: newId,
    ...data,
    status: 'PENDING',
    proofUrl: "https://placehold.co/600x800?text=Bukti+Transfer" // Simulasi gambar
  };

  MOCK_REIMBURSEMENTS.push(newRequest);
  return { success: true, message: "Pengajuan berhasil dikirim ke Bendahara." };
}

export async function getReimbursements() {
  // Di real app, filter berdasarkan role jika perlu
  return MOCK_REIMBURSEMENTS;
}

export async function processReimbursement(id: string, action: 'APPROVE' | 'REJECT' | 'PAY', notes?: string) {
  await new Promise(r => setTimeout(r, 1000));

  const index = MOCK_REIMBURSEMENTS.findIndex(r => r.id === id);
  if (index === -1) return { success: false, message: "Data tidak ditemukan" };

  if (action === 'APPROVE') {
    MOCK_REIMBURSEMENTS[index].status = 'APPROVED';
  } else if (action === 'REJECT') {
    MOCK_REIMBURSEMENTS[index].status = 'REJECTED';
    MOCK_REIMBURSEMENTS[index].notes = notes;
  } else if (action === 'PAY') {
    MOCK_REIMBURSEMENTS[index].status = 'PAID';
    // Di sini nanti bisa trigger masuk ke Jurnal Pengeluaran otomatis
  }

  return { success: true };
}
