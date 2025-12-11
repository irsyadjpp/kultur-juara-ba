import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(3, "Nama terlalu pendek"),
  nik: z.string()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh angka"),
  email: z.string().email(),
  // ... field lainnya
});
// Note: Validasi unique DB biasanya dilakukan manual di Server Action, bukan di Zod schema client-side murni.