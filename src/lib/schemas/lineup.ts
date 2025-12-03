import { z } from "zod";

export const lineupSchema = z.object({
  category: z.enum(["Beregu PUTRA", "Beregu PUTRI", "Beregu CAMPURAN"], {
    required_error: "Pilih kategori pertandingan",
  }),
  round: z.enum(["Penyisihan Grup", "Gugur (Knockout)"], {
    required_error: "Pilih babak",
  }),
  date: z.string().min(1, "Tanggal wajib diisi"),
  court: z.string().min(1, "No. Lapangan wajib diisi"),
  time: z.string().min(1, "Jam main wajib diisi"),
  opponent: z.string().min(2, "Nama lawan wajib diisi"),
  
  // Data Pemain per Partai (1-5)
  // Kita gunakan array fix 5 elemen
  matches: z.array(
    z.object({
      matchLabel: z.string(), // Label Partai (misal: Ganda Beginner 1)
      player1: z.string().min(2, "Pemain 1 wajib diisi"),
      player2: z.string().min(2, "Pemain 2 wajib diisi"),
      player3: z.string().optional(), // Khusus 3-on-3
    })
  ).length(5),

  managerSign: z.literal(true, { errorMap: () => ({ message: "Anda wajib menyetujui pernyataan manajer." }) }),
});

export type LineupFormValues = z.infer<typeof lineupSchema>;
