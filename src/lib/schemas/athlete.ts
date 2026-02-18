import { z } from "zod";

export const athleteRegistrationSchema = z.object({
    // A. Data Pribadi
    fullName: z.string().min(3, "Nama lengkap minimal 3 karakter."),
    nickname: z.string().min(2, "Nama panggilan minimal 2 karakter."),
    niaKji: z.string().optional(), // NIK/NIA Manual (Optional)
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
    socialMedia: z.string().optional(),
    shoeSize: z.coerce.number().min(20).max(50).optional(),

    // Alamat & Sekolah
    address: z.string().min(10, "Alamat jalan wajib diisi."),
    district: z.string().min(3, "Kecamatan wajib diisi."),
    city: z.string().min(3, "Kota/Kabupaten wajib diisi."),
    province: z.string().min(3, "Provinsi wajib diisi."),
    postalCode: z.string().regex(/^\d{5}$/, "Kode Pos harus 5 digit."),
    schoolName: z.string().min(3, "Nama sekolah wajib diisi."),
    schoolAddress: z.string().optional(),
    schoolGrade: z.string().optional(),
    schoolPhone: z.string().optional(),

    // B. Antropometri (Pilar 1)
    ant_height_cm: z.coerce.number().min(1),
    ant_weight_kg: z.coerce.number().min(1),
    ant_arm_span_cm: z.coerce.number().optional(),
    ant_sitting_height: z.coerce.number().optional(),
    ant_leg_length: z.coerce.number().optional(), // Tambahan leg length
    ant_protein_pct: z.coerce.number().optional(), // Tambahan protein percentage

    // C. Pengukuran Jersey & Nama Punggung
    chestWidth: z.coerce.number().optional(),
    waistCircumference: z.coerce.number().optional(),
    jerseyLength: z.coerce.number().optional(),
    shirtSize: z.string().optional(),
    jerseyNameOption: z.enum(["initials", "lastName"]),
    jerseyName: z.string().max(12).min(1),

    // E. Data Orang Tua & Ekonomi (Pilar 10)
    fatherName: z.string().min(3),
    fatherJob: z.string().optional(),
    fatherPhone: z.string().optional(),
    motherName: z.string().min(3),
    motherJob: z.string().optional(),
    motherPhone: z.string().optional(),

    // Kontak Darurat
    emergencyName: z.string().min(3, "Nama kontak darurat wajib diisi."),
    emergencyRelation: z.string().min(3, "Hubungan wajib diisi."),
    emergencyPhone: z.string().min(10, "Nomor HP darurat tidak valid.").regex(/^\d+$/, "Hanya angka."),

    soc_travel_time: z.coerce.number().optional(), // Pilar 10
    parentIncomeBracket: z.enum(["< 3jt", "3jt - 5jt", "5jt - 10jt", "> 10jt"]).optional(),

    // F. Data Sosial Ekonomi - Extended
    familyStatus: z.enum(["Lengkap", "Yatim", "Piatu", "Yatim Piatu"]).optional(),
    numberOfDependents: z.coerce.number().optional(),
    siblingsCount: z.coerce.number().optional(),
    governmentAssistance: z.array(z.string()).optional(),
    houseStatus: z.enum(["Milik Sendiri", "Sewa/Kontrak", "Menumpang"]).optional(),
    transportationToField: z.enum(["Jalan Kaki", "Sepeda", "Motor", "Mobil", "Angkutan Umum"]).optional(),
    smartphoneAccess: z.enum(["Milik Sendiri", "Milik Ortu", "Tidak Ada"]).optional(),
    infoSource: z.enum(["Teman", "Media Sosial", "Spanduk", "Lainnya"]).optional(),

    // G. Riwayat Kesehatan & Fisik
    seriousInjury: z.boolean().default(false),
    injuryDetails: z.string().optional(),
    medicalHistory: z.array(z.string()).optional(),
    allergies: z.string().optional(),
    surgeryHistory: z.boolean().default(false),
    routineMedication: z.boolean().default(false),
    riskDiseaseHistory: z.string().optional(), // Penyakit Berat/Menular
    vaccinationStatus: z.string().optional(), // Status Vaksinasi Terakhir
    chronicSymptoms: z.array(z.string()).optional(), // Sesak, Nyeri Dada, Pusing, Mudah Lelah

    // H. Recovery & Nutrisi (Pilar 8) & Habits
    nut_urine_color: z.coerce.number().min(1).max(8).optional(), // Pilar 8
    rec_hrv_rmssd: z.coerce.number().optional(), // Pilar 8
    rec_doms_perceived: z.coerce.number().min(1).max(10).optional(), // Pilar 8
    averageSleepHours: z.coerce.number().optional(),
    dietaryHabits: z.enum(["Jarang", "Sering", "Sangat Sering"]).optional(), // Gorengan/Manis/Instan
    stayUpLate: z.boolean().default(false), // Begadang > 22.00
    schoolWorkload: z.coerce.number().min(1).max(10).optional(), // 1-10 Scale
    transportationToGym: z.enum(["Motor/Mobil", "Angkutan Umum", "Sepeda/Jalan Kaki"]).optional(),

    // I. Baseline & Sport Science (Pilar 2, 3, 11, 12, 13)
    // Riwayat Bulu Tangkis (Moved from Tab 4 in Page)
    startYear: z.coerce.number({ invalid_type_error: "Tahun harus angka." }).min(2000, "Tahun tidak valid.").max(new Date().getFullYear(), "Tahun tidak boleh lebih dari sekarang."),
    pbsiNumber: z.string().optional(),
    previousClub: z.string().optional(),
    specialization: z.enum(["Tunggal", "Ganda", "Ganda Campuran", "Belum ditentukan"]).optional(),
    achievements: z.array(z.string()).optional(),

    // Kinematika (Pilar 2)
    kin_grip_switch_speed: z.coerce.number().min(1).max(10).optional(),
    kin_wrist_extension: z.coerce.number().optional(),
    kin_elbow_alignment: z.coerce.number().optional(),
    kin_kinetic_linkage: z.coerce.number().optional(),
    kin_contact_height: z.coerce.number().optional(),

    // Biomotor (Pilar 3)
    bio_t_test_sec: z.coerce.number().optional(),
    bio_split_step_lat: z.coerce.number().optional(),
    bio_vertical_jump: z.coerce.number().optional(),
    bio_beep_test_lvl: z.coerce.number().optional(),

    // Mental (Pilar 9)
    men_grit_score: z.coerce.number().min(1).max(5).optional(),
    men_academic_pressure: z.coerce.number().min(1).max(10).optional(),
    men_poms_index: z.coerce.number().optional(),

    // Elite Metrics (Pilar 11, 12, 13)
    phy_hemoglobin_lvl: z.coerce.number().optional(),
    phy_creatine_kinase: z.coerce.number().optional(),
    phy_testosteron_cort: z.coerce.number().optional(),
    cog_saccadic_speed: z.coerce.number().optional(),
    cog_peripheral_deg: z.coerce.number().optional(),
    cog_choice_reaction: z.coerce.number().optional(),
    load_grf_asymmetry: z.coerce.number().optional(),
    load_shoulder_torque: z.coerce.number().optional(),

    // Legal & Consent
    agreeLifestyle: z.boolean().refine(val => val === true, "Wajib menyetujui komitmen gaya hidup."),
    agreeMediaRights: z.boolean().refine(val => val === true, "Wajib menyetujui hak media."),
    agreeLiability: z.boolean().refine(val => val === true, "Wajib menyetujui pelepasan tanggung jawab."),
    agreeEmergency: z.boolean().refine(val => val === true, "Wajib menyetujui tindakan medis darurat."),
    agreeCodeOfEthics: z.boolean().refine(val => val === true, "Wajib menyetujui kode etik."),
    authenticityDeclaration: z.boolean().refine(val => val === true, "Wajib menyatakan keaslian dokumen."),

    // J. Status & Target (Admin/PB Setup)
    category: z.enum(["Pra-usia dini (U-9)", "Usia dini (U-11)", "Anak-anak (U-13)", "Pemula & Remaja (U-15, U-17)", "Taruna & Dewasa (U-19+)"], { required_error: "Pilih kategori usia." }),
    level: z.enum(["Fundamental", "Pengembangan", "Prestasi"], { required_error: "Pilih level atlet." }),
    trainingTarget: z.enum(["Atlet Prestasi", "Atlet Kompetisi", "Pembinaan Jangka Panjang"]).optional(),
    championshipTarget: z.array(z.string()).optional(),
    target_technical_month_1: z.string().optional(),
    target_physical_month_1: z.string().optional(),

    // K. Additional Baseline
    phy_resting_heart_rate: z.coerce.number().optional(),
    ant_bmi_score: z.coerce.number().optional(),
    ant_skeletal_muscle_pct: z.coerce.number().optional(),
    ant_body_fat_pct: z.coerce.number().optional(),

    // L. Administrasi & Kontrak
    contractDuration: z.enum(["6 Bulan", "1 Tahun"]).optional(),
    contractStartDate: z.string().optional(),
    contractEndDate: z.string().optional(),

    // Files (Re-adding missing ones if any, though user code had filePhoto)
    fileKK: z.any().optional(),
    fileAkta: z.any().optional(),
    filePhoto: z.any().optional(),
    fileRapor: z.any().optional(),
    fileHealthCert: z.any().optional(),

    // Internal Admin
    registrationDate: z.string().optional(),
    initialStatus: z.enum(["Probation", "Kontrak 6 Bulan", "Kontrak 1 Tahun"]).optional(),
});

export type AthleteRegistrationFormValues = z.infer<typeof athleteRegistrationSchema>;
