
import { z } from "zod";

// Enum untuk kategori
export const CATEGORIES = ["Beginner", "Intermediate", "Advance"] as const;

// Skema pendaftaran yang sudah disederhanakan
export const teamRegistrationSchema = z.object({
  entityName: z.string().min(3, { message: "Nama Tim minimal 3 karakter" }),
  officialLocation: z.string().min(3, { message: "Lokasi asal wajib diisi" }),
  contactPerson: z.string().min(3, { message: "Nama kontak wajib diisi" }),
  phoneNumber: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, {
    message: "Nomor WhatsApp tidak valid",
  }),
  category: z.enum(CATEGORIES, {
    required_error: "Anda harus memilih salah satu kategori pertandingan.",
  }),
});

export type TeamRegistrationFormValues = z.infer<typeof teamRegistrationSchema>;
