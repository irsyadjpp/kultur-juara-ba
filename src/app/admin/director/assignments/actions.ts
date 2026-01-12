
'use server';

export type Mandate = {
  id: string;
  refNumber: string; // Nomor Surat (002/SPT-TVT...)
  assigneeName: string;
  role: string;
  duties: string[];
  issuedAt: string;
  status: 'ACTIVE' | 'REVOKED';
};

// Mock Database
let MANDATES: Mandate[] = [
  {
    id: "M-001",
    refNumber: "002/SPT-TVT/BTOUR/XII/2025",
    assigneeName: "Faiz Azilla Syaehon",
    role: "Koordinator TVT",
    duties: [
      "Verifikasi Pra-Event (Audit Video)",
      "Pengawasan Lapangan (Spot Check)",
      "Penanganan Sengketa & Investigasi",
      "Pelaporan Berkala"
    ],
    issuedAt: "2025-12-08",
    status: "ACTIVE"
  }
];

export async function getMandates() {
  return MANDATES;
}

export async function createMandate(data: any) {
  // Simulasi Simpan
  await new Promise(r => setTimeout(r, 800));
  const newMandate = {
    ...data,
    id: `M-${Date.now()}`,
    issuedAt: new Date().toISOString().split('T')[0],
    status: 'ACTIVE'
  };
  MANDATES.push(newMandate);
  return { success: true, message: "Penugasan Digital Berhasil Diterbitkan." };
}
