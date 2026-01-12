

import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(3, "Nama terlalu pendek"),
  nik: z.string()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh angka"),
  email: z.string().email(),
});

export const teamRegistrationSchema = z.object({
  entityName: z.string().min(3, "Nama komunitas minimal 3 karakter"),
  officialLocation: z.string().min(3, "Lokasi minimal 3 karakter"),
  contactPerson: z.string().min(3, "Nama manajer minimal 3 karakter"),
  phoneNumber: z.string().min(10, "Nomor HP minimal 10 digit").regex(/^\d+$/, "Nomor HP hanya boleh angka"),
  category: z.enum(["Beginner"], {
    required_error: "Pilih kategori pertandingan",
  }),
});

export type TeamRegistrationFormValues = z.infer<typeof teamRegistrationSchema>;
// Note: Validasi unique DB biasanya dilakukan manual di Server Action, bukan di Zod schema client-side murni.

