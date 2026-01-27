
import { z } from "zod";

export const athleteRegistrationSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter."),
  nik: z.string().length(16, "NIK harus 16 digit.").regex(/^\d+$/, "NIK hanya boleh berisi angka."),
  dob: z.string().min(1, "Tanggal lahir wajib diisi."),
  gender: z.enum(["Laki-laki", "Perempuan"], { required_error: "Pilih jenis kelamin." }),
  clubName: z.string().min(2, "Nama klub/PB wajib diisi."),
  category: z.enum(["U-13", "U-17", "Dewasa"], { required_error: "Pilih kategori usia." }),
  email: z.string().email("Format email tidak valid.").optional().or(z.literal('')),
  whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid.").regex(/^\d+$/, "Hanya angka."),
  photo: z.any().optional(), // Untuk upload foto
});

export type AthleteRegistrationFormValues = z.infer<typeof athleteRegistrationSchema>;
