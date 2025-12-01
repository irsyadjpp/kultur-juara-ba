import { z } from "zod";

// Kategori yang tersedia
export const CATEGORIES = ["Beregu PUTRA", "Beregu PUTRI", "Beregu CAMPURAN"] as const;

// Schema untuk satu pemain
export const playerSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap wajib diisi"),
  nik: z.string().length(16, "NIK harus 16 digit angka").regex(/^\d+$/, "NIK hanya boleh angka"),
  motherName: z.string().min(2, "Nama ibu kandung wajib diisi"),
  ayoId: z.string().min(1, "Username Ayo wajib diisi"),
  level: z.enum(["Beginner", "Intermediate", "Advance"], {
    required_error: "Pilih level",
  }),
  videoUrl: z.string().url("URL tidak valid").includes("youtube", { message: "Wajib link YouTube" }),
  
  // UPDATE: Validasi Kategori (Gender Rule)
  participation: z.array(z.enum(CATEGORIES))
    .min(1, "Pilih minimal 1 kategori")
    .refine((cats) => {
      const hasMale = cats.includes("Beregu PUTRA");
      const hasFemale = cats.includes("Beregu PUTRI");
      // Tidak boleh ada Putra DAN Putri sekaligus
      return !(hasMale && hasFemale);
    }, "Tidak boleh merangkap Beregu Putra dan Putri sekaligus. Pilih salah satu + Campuran."),
});

// Schema utama
export const registrationFormSchema = z.object({
  // Identitas Komunitas
  communityName: z.string().min(2, "Nama Komunitas wajib diisi"),
  managerName: z.string().min(2, "Nama manajer wajib diisi"),
  managerWhatsapp: z.string().min(10, "Nomor WhatsApp tidak valid"),
  managerEmail: z.string().email("Email tidak valid"),
  basecamp: z.string().min(2, "Basecamp wajib diisi"),
  instagram: z.string().optional(),

  // Data Pemain
  players: z.array(playerSchema),

  // Bukti Transfer
  transferProof: z.any()
    .refine((files) => files?.length == 1, "Bukti transfer wajib diupload")
    .refine((files) => files?.[0]?.size <= 5000000, `Maksimal 5MB.`)
    .refine(
      (files) => ['image/jpeg', 'image/png', 'application/pdf'].includes(files?.[0]?.type),
      "Format .jpg, .png, atau .pdf"
    ),

  // Pernyataan
  agreementValidData: z.literal(true, { errorMap: () => ({ message: "Persetujuan diperlukan" }) }),
  agreementWaiver: z.literal(true, { errorMap: () => ({ message: "Persetujuan diperlukan" }) }),
  agreementTpf: z.literal(true, { errorMap: () => ({ message: "Persetujuan diperlukan" }) }),
  agreementRules: z.literal(true, { errorMap: () => ({ message: "Persetujuan diperlukan" }) }),
})
.superRefine((data, ctx) => {
  // VALIDASI KUOTA TIM (Tetap dipertahankan agar tim yang didaftarkan valid secara jumlah)
  const counts: Record<string, number> = {
    "Beregu PUTRA": 0,
    "Beregu PUTRI": 0,
    "Beregu CAMPURAN": 0
  };

  data.players.forEach(p => {
    p.participation.forEach(cat => {
      if (counts[cat] !== undefined) counts[cat]++;
    });
  });

  Object.entries(counts).forEach(([cat, count]) => {
    if (count > 0) {
      if (count < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${cat}: Kurang pemain! (Baru ${count}, Minimal 10)`,
          path: ["players"]
        });
      }
      if (count > 14) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${cat}: Kelebihan pemain! (Ada ${count}, Maksimal 14)`,
          path: ["players"]
        });
      }
    }
  });

  const totalParticipation = data.players.reduce((sum, p) => sum + p.participation.length, 0);
  if (totalParticipation === 0 && data.players.length > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Belum ada pemain yang didaftarkan ke kategori manapun.",
      path: ["players"]
    });
  }
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;