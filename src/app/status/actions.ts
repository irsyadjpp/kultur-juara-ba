

'use server';

import { z } from "zod";

const searchSchema = z.object({
  query: z.string().min(3, "Masukkan minimal 3 karakter"),
});

// MOCK DATA (Simulasi Database)
const MOCK_TEAMS = [
  {
    id: "T001",
    teamName: "PB Djarum KW",
    category: "Tunggal Putra",
    manager: "Budi Santoso",
    whatsapp: "08123456789",
    email: "budi@example.com",
    paymentStatus: "PAID", // PAID, PENDING, REJECTED
    players: [
      { name: "Kevin Sanjaya KW", nik: "3201...", status: "APPROVED", note: "-" },
      { name: "Taufik Hidayat KW", nik: "3203...", status: "UPGRADE REQUIRED", note: "Skill terlalu jago, harap daftar ulang di kategori berbeda" },
      { name: "Lee Chong Wei KW", nik: "3204...", status: "PENDING", note: "Video buram" },
    ]
  },
  {
    id: "T002",
    teamName: "PB Smash Ceria",
    category: "Tunggal Putri",
    manager: "Siti Aminah",
    whatsapp: "08129999888",
    email: "siti@example.com",
    paymentStatus: "PENDING",
    players: [
      { name: "Susi Susanti KW", nik: "3205...", status: "PENDING", note: "-" },
    ]
  }
];

export async function checkRegistrationStatus(prevState: any, formData: FormData) {
  const query = formData.get("query") as string;

  // Validasi input
  const validation = searchSchema.safeParse({ query });
  if (!validation.success) {
    return { success: false, message: "Format pencarian tidak valid." };
  }

  // Simulasi Delay Database
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Cari Tim (Case Insensitive)
  const team = MOCK_TEAMS.find(t => 
    t.whatsapp === query || 
    t.email.toLowerCase() === query.toLowerCase() ||
    t.teamName.toLowerCase().includes(query.toLowerCase())
  );

  if (!team) {
    return { success: false, message: "Data tidak ditemukan. Pastikan No. WA atau Email sesuai saat mendaftar." };
  }

  return { success: true, data: team };
}

