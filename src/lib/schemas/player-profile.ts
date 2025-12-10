import { z } from "zod";

// Skema untuk melengkapi data profil wajib setelah login
export const athleteProfileSchema = z.object({
  // 1. IDENTITAS UTAMA (NIK sangat penting untuk TPF)
  nik: z.string().length(16, "NIK harus 16 digit angka").regex(/^\d+$/, "NIK hanya boleh angka"),
  phone: z.string().min(10, "No WA aktif wajib diisi").regex(/^08\d+$/, "Format harus 08xxx"),
  gender: z.enum(["MALE", "FEMALE"], { required_error: "Jenis kelamin wajib dipilih" }),
  
  // 2. DATA KOMUNITAS & TPF (Untuk Leveling)
  communityName: z.string().min(2, "Nama Tim/Komunitas asal wajib diisi"),
  instagram: z.string()
    .min(3, "Username IG wajib (ex: @username)")
    .refine(val => val.startsWith('@'), "Username harus diawali @"),
  
  // Riwayat Turnamen (Digunakan TPF untuk asesmen level)
  history: z.string().optional().describe("Sebutkan turnamen komunitas terakhir yang diikuti"),
});

export type AthleteProfileValues = z.infer<typeof athleteProfileSchema>;
