import { z } from "zod";

export const athleteRegistrationSchema = z.object({
  // A. Data Pribadi
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter."),
  nickname: z.string().min(2, "Nama panggilan minimal 2 karakter."),
  pob: z.string().min(3, "Tempat lahir wajib diisi."),
  dob: z.string().min(1, "Tanggal lahir wajib diisi."),
  gender: z.enum(["Laki-laki", "Perempuan"], { required_error: "Pilih jenis kelamin." }),
  nik: z.string().length(16, "NIK harus 16 digit.").regex(/^\d+$/, "NIK hanya boleh angka."),
  citizenship: z.string().min(3, "Kewarganegaraan wajib diisi."),
  bloodType: z.enum(["A", "B", "AB", "O"]).optional(),
  rhesus: z.enum(["+", "-"]).optional(),
  dominantHand: z.enum(["Kanan", "Kiri"], { required_error: "Pilih tangan dominan." }),
  phone: z.string().min(10, "Nomor HP tidak valid.").regex(/^\d+$/, "Hanya angka."),
  email: z.string().email("Format email tidak valid."),
  socialMedia: z.string().optional(), // IG/TikTok
  shoeSize: z.coerce.number().min(20).max(50).optional(),

  // Alamat Lengkap
  address: z.string().min(10, "Alamat jalan wajib diisi."),
  district: z.string().min(3, "Kecamatan wajib diisi."),
  city: z.string().min(3, "Kota/Kabupaten wajib diisi."),
  province: z.string().min(3, "Provinsi wajib diisi."),
  postalCode: z.string().regex(/^\d{5}$/, "Kode Pos harus 5 digit."),

  // Sekolah
  schoolName: z.string().min(3, "Nama sekolah wajib diisi."),
  schoolAddress: z.string().optional(),
  schoolGrade: z.string().optional(),
  schoolPhone: z.string().optional(),

  // B. Antropometri
  height: z.coerce.number({ invalid_type_error: "Tinggi badan harus angka." }).min(1, "Tinggi badan wajib diisi."),
  weight: z.coerce.number({ invalid_type_error: "Berat badan harus angka." }).min(1, "Berat badan wajib diisi."),

  // C. Pengukuran Jersey
  chestWidth: z.coerce.number({ invalid_type_error: "Lingkar Dada harus angka." }).min(1, "Lingkar Dada wajib diisi."),
  waistCircumference: z.coerce.number({ invalid_type_error: "Lingkar Perut harus angka." }).min(1, "Lingkar Perut wajib diisi."),
  jerseyLength: z.coerce.number({ invalid_type_error: "Panjang Badan harus angka." }).min(1, "Panjang Badan wajib diisi."),
  shirtSize: z.string().optional(),

  // D. Nama Punggung
  jerseyNameOption: z.enum(["initials", "lastName"], { required_error: "Pilih format nama punggung." }),
  jerseyName: z.string().max(12, "Nama punggung maksimal 12 karakter.").min(1, "Nama punggung wajib diisi."),

  // E. Data Orang Tua / Wali
  fatherName: z.string().min(3, "Nama Ayah wajib diisi."),
  fatherJob: z.string().optional(),
  fatherPhone: z.string().optional(),
  motherName: z.string().min(3, "Nama Ibu wajib diisi."),
  motherJob: z.string().optional(),
  motherPhone: z.string().optional(),

  // Kontak Darurat
  emergencyName: z.string().min(3, "Nama kontak darurat wajib diisi."),
  emergencyRelation: z.string().min(3, "Hubungan wajib diisi."),
  emergencyPhone: z.string().min(10, "Nomor HP darurat tidak valid.").regex(/^\d+$/, "Hanya angka."),

  // F. Data Sosial Ekonomi (Rahasia)
  parentIncomeBracket: z.enum(["< 3jt", "3jt - 5jt", "5jt - 10jt", "> 10jt"]).optional(),
  familyStatus: z.enum(["Lengkap", "Yatim", "Piatu", "Yatim Piatu"]).optional(),
  numberOfDependents: z.coerce.number().optional(),
  siblingsCount: z.coerce.number().optional(),
  governmentAssistance: z.array(z.string()).optional(), // KIP, PKH, KKS, Lainnya
  houseStatus: z.enum(["Milik Sendiri", "Sewa/Kontrak", "Menumpang"]).optional(),
  transportationToField: z.enum(["Jalan Kaki", "Sepeda", "Motor", "Mobil", "Angkutan Umum"]).optional(),
  smartphoneAccess: z.enum(["Milik Sendiri", "Milik Ortu", "Tidak Ada"]).optional(),
  infoSource: z.enum(["Teman", "Media Sosial", "Spanduk", "Lainnya"]).optional(),

  // G. Riwayat Kesehatan & Fisik
  seriousInjury: z.boolean().default(false),
  injuryDetails: z.string().optional(),
  medicalHistory: z.array(z.string()).optional(), // Asma, Jantung, Diabetes, Lainnya
  allergies: z.string().optional(),
  surgeryHistory: z.boolean().default(false),
  routineMedication: z.boolean().default(false),

  // Risk Profile (Stress Test Screening)
  riskDiseaseHistory: z.string().optional(), // Penyakit Berat/Menular
  vaccinationStatus: z.string().optional(), // Status Vaksinasi Terakhir
  chronicSymptoms: z.array(z.string()).optional(), // Sesak, Nyeri Dada, Pusing, Mudah Lelah

  // H. Gaya Hidup & Nutrisi (Athlete Daily Habit)
  dietaryHabits: z.enum(["Jarang", "Sering", "Sangat Sering"]).optional(), // Gorengan/Manis/Instan
  averageSleepHours: z.coerce.number().min(0).max(24).optional(),
  stayUpLate: z.boolean().default(false), // Begadang > 22.00
  schoolWorkload: z.coerce.number().min(1).max(10).optional(), // 1-10 Scale
  transportationToGym: z.enum(["Motor/Mobil", "Angkutan Umum", "Sepeda/Jalan Kaki"]).optional(),

  // I. Riwayat Bulu Tangkis
  startYear: z.coerce.number({ invalid_type_error: "Tahun harus angka." }).min(2000, "Tahun tidak valid.").max(new Date().getFullYear(), "Tahun tidak boleh lebih dari sekarang."),
  pbsiNumber: z.string().optional(),
  previousClub: z.string().optional(),
  specialization: z.enum(["Tunggal", "Ganda", "Ganda Campuran", "Belum ditentukan"]).optional(),
  achievements: z.array(z.string()).optional(), // Top 5 achievements as strings for simplicity first

  // J. Status & Target (Admin/PB Setup)
  category: z.enum(["Pra-usia dini (U-9)", "Usia dini (U-11)", "Anak-anak (U-13)", "Pemula & Remaja (U-15, U-17)", "Taruna & Dewasa (U-19+)"], { required_error: "Pilih kategori usia." }),
  level: z.enum(["Fundamental", "Pengembangan", "Prestasi"], { required_error: "Pilih level atlet." }), // Updated to match form
  trainingTarget: z.enum(["Atlet Prestasi", "Atlet Kompetisi", "Pembinaan Jangka Panjang"]).optional(),
  championshipTarget: z.array(z.string()).optional(), // Lokal, Kota, Prov, Nasional

  // K. Baseline Test (Admin Input)
  // Antropometri
  ant_height_cm: z.coerce.number().optional(),
  ant_sitting_height: z.coerce.number().optional(),
  ant_arm_span_cm: z.coerce.number().optional(),
  ant_bmi_score: z.coerce.number().optional(),
  ant_skeletal_muscle_pct: z.coerce.number().optional(),
  ant_body_fat_pct: z.coerce.number().optional(),
  // Kinematika
  kin_grip_switch_speed: z.coerce.number().min(1).max(10).optional(),
  kin_kinetic_linkage: z.coerce.number().min(1).max(10).optional(),
  // Biomotor (Engine)
  phy_resting_heart_rate: z.coerce.number().optional(),
  bio_t_test_sec: z.coerce.number().optional(),
  bio_vertical_jump: z.coerce.number().optional(),
  bio_beep_test_lvl: z.coerce.number().optional(),

  // L. Administrasi & Kontrak
  contractDuration: z.enum(["6 Bulan", "1 Tahun"]).optional(),
  contractStartDate: z.string().optional(),
  contractEndDate: z.string().optional(),

  // Legal Consents (MUST be true)
  agreeLifestyle: z.boolean().refine(val => val === true, "Wajib menyetujui komitmen gaya hidup."),
  agreeMediaRights: z.boolean().refine(val => val === true, "Wajib menyetujui hak media."),
  agreeLiability: z.boolean().refine(val => val === true, "Wajib menyetujui pelepasan tanggung jawab."),
  agreeEmergency: z.boolean().refine(val => val === true, "Wajib menyetujui tindakan medis darurat."),
  agreeCodeOfEthics: z.boolean().refine(val => val === true, "Wajib menyetujui kode etik."),
  authenticityDeclaration: z.boolean().refine(val => val === true, "Wajib menyatakan keaslian dokumen."),

  // Files
  fileKK: z.any().optional(),
  fileAkta: z.any().optional(),
  filePhoto: z.any().optional(),
  fileRapor: z.any().optional(), // Added Rapor
  fileHealthCert: z.any().optional(), // Surat Sehat

  // Internal Admin
  registrationDate: z.string().optional(),
  niaKji: z.string().optional(),
  initialStatus: z.enum(["Probation", "Kontrak 6 Bulan", "Kontrak 1 Tahun"]).optional(),

});

export type AthleteRegistrationFormValues = z.infer<typeof athleteRegistrationSchema>;
