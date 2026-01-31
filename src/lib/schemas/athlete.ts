import { z } from "zod";

export const athleteRegistrationSchema = z.object({
  // A. Data Pribadi
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter."),
  nickname: z.string().min(2, "Nama panggilan minimal 2 karakter."),
  pob: z.string().min(3, "Tempat lahir wajib diisi."),
  dob: z.string().min(1, "Tanggal lahir wajib diisi."),
  gender: z.enum(["Laki-laki", "Perempuan"], { required_error: "Pilih jenis kelamin." }),
  dominantHand: z.enum(["Kanan", "Kiri"], { required_error: "Pilih tangan dominan." }),
  phone: z.string().min(10, "Nomor HP tidak valid.").regex(/^\d+$/, "Hanya angka."),
  email: z.string().email("Format email tidak valid."),
  address: z.string().min(10, "Alamat wajib diisi."),
  schoolOrWork: z.string().min(3, "Sekolah/Pekerjaan wajib diisi."),
  guardianName: z.string().optional(),
  emergencyContact: z.string().min(10, "Kontak darurat tidak valid.").regex(/^\d+$/, "Hanya angka."),
  
  // Antropometri
  height: z.string().min(1, "Tinggi badan wajib diisi."),
  weight: z.string().min(1, "Berat badan wajib diisi."),
  chestWidth: z.string().min(1, "Lebar dada wajib diisi."),
  waistCircumference: z.string().min(1, "Lingkar pinggang wajib diisi."),
  
  // B. Status Kepelatihan
  category: z.enum(["Pra-usia dini (U-9)", "Usia dini (U-11)", "Anak-anak (U-13)", "Pemula & Remaja (U-15, U-17)"], { required_error: "Pilih kategori usia." }),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Elite"], { required_error: "Pilih level atlet." }),
  pbsiNumber: z.string().optional(),
  startYear: z.string().length(4, "Tahun harus 4 digit.").regex(/^\d+$/, "Tahun hanya boleh angka."),
  careerTarget: z.enum(["Rekreasi", "Prestasi", "Profesional"], { required_error: "Pilih target karier." })
});

export type AthleteRegistrationFormValues = z.infer<typeof athleteRegistrationSchema>;

    