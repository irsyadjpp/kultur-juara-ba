import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const athleteProfileSchema = z.object({
  // --- 1. IDENTITAS UTAMA ---
  fullName: z.string().min(3, "Nama lengkap wajib diisi sesuai KTP"),
  nik: z.string().length(16, "NIK harus 16 digit angka").regex(/^\d+$/, "NIK hanya angka"),
  gender: z.enum(["MALE", "FEMALE"], { required_error: "Jenis kelamin wajib dipilih" }),
  phone: z.string().min(10, "No WA aktif wajib diisi"),
  
  // --- 2. DATA KOMUNITAS & TPF (PENTING) ---
  // Kita ganti PBSI ID dengan "Nama Komunitas" agar TPF bisa tracking
  communityName: z.string().min(2, "Nama Tim/Komunitas asal wajib diisi"),
  
  // Instagram wajib untuk cek apakah dia 'Pemain Pro' yang menyamar
  instagram: z.string()
    .min(3, "Username IG wajib (ex: @badminton_lovers)")
    .refine(val => val.startsWith('@'), "Username harus diawali @"),
    
  // Riwayat Turnamen (Self-declare untuk level assessment)
  history: z.string().optional().describe("Sebutkan turnamen komunitas terakhir yang diikuti"),

  // --- 3. FOTO DIRI (Untuk ID Card) ---
  // Di-handle terpisah di server action, tapi schema validasi tipe perlu
  photo: z.any().optional(), 
});

export type AthleteProfileValues = z.infer<typeof athleteProfileSchema>;
