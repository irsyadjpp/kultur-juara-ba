import { z } from "zod";

export const VOLUNTEER_DIVISIONS = [
  "MATCH CONTROL: Input skor digital, asisten wasit. (Cocok untuk yang teliti & paham badminton).",
  "GATE KEEPER: Cek aplikasi, tiket, keamanan. (Cocok untuk yang tegas & berani).",
  "MEDIS & FISIO: P3K lapangan, bantu terapis. (Wajib background kesehatan/PMI).",
  "MEDIA & KREATIF: Foto, video reels, liputan story. (Wajib punya skill konten).",
  "LOGISTIK & RUNNER: Mobilitas tinggi, angkat barang, gerak cepat. (Cocok untuk yang fisik kuat).",
  "LIAISON OFFICER (LO): Mendampingi Sponsor/VIP. (Cocok untuk yang jago komunikasi/good looking).",
] as const;

export const volunteerSchema = z.object({
  // BAGIAN 1: DATA PRIBADI
  fullName: z.string().min(2, "Nama lengkap wajib diisi"),
  nickname: z.string().min(2, "Nama panggilan wajib diisi"),
  whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid").regex(/^\d+$/, "Hanya angka"),
  email: z.string().email("Email tidak valid"),
  address: z.string().min(10, "Alamat domisili (Kecamatan/Kelurahan) wajib diisi"),
  instagram: z.string().min(2, "Akun Instagram wajib diisi"),
  
  // BAGIAN 2: LATAR BELAKANG
  education: z.string({ required_error: "Pilih pendidikan terakhir" }),
  status: z.enum(["Mahasiswa / Pelajar", "Karyawan / Profesional", "Freelancer", "Belum Bekerja / Fresh Graduate"], { required_error: "Pilih status saat ini" }),
  expertise: z.string().min(3, "Bidang studi/pekerjaan wajib diisi"),
  institution: z.string().optional(),

  // BAGIAN 3: POSISI & MINAT
  division1: z.string({ required_error: "Pilih prioritas 1" }),
  division2: z.string({ required_error: "Pilih prioritas 2" }),

  // BAGIAN 4: SKILL & ASET
  hasExperience: z.enum(["Ya", "Belum, ini pertama kali."], { required_error: "Pilih pengalaman" }),
  experienceDetail: z.string().optional(),
  skills: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),

  // BAGIAN 5: KOMITMEN
  availability: z.string({ required_error: "Pilih ketersediaan waktu" }),
  availabilityDetail: z.string().optional(),
  shirtSize: z.string({ required_error: "Pilih ukuran baju" }),

  // BAGIAN 6: STUDI KASUS
  caseStudy: z.string().min(20, "Jawaban terlalu pendek, berikan detail tindakan Anda."),

  // PERNYATAAN
  agreement: z.literal(true, { 
    errorMap: () => ({ message: "Anda harus menyetujui pernyataan ini untuk melanjutkan." }) 
  }),

}).refine((data) => data.division1 !== data.division2, {
  message: "Pilihan Divisi 2 tidak boleh sama dengan Divisi 1",
  path: ["division2"],
}).refine((data) => {
    if (data.availability === "Saya hanya bisa di tanggal tertentu" && !data.availabilityDetail) {
        return false;
    }
    return true;
}, {
    message: "Jelaskan tanggal ketersediaan Anda",
    path: ["availabilityDetail"]
});

export type VolunteerFormValues = z.infer<typeof volunteerSchema>;
