
// src/lib/tpf-data.ts

// I. PANDUAN VISUAL RUBRIK
export const RUBRIC_GUIDELINES = [
  {
    title: '1. BIOMEKANIK & GRIP (Teknik Dasar Pukulan)',
    description: 'Fokus: Lihat pergelangan tangan dan cara memegang raket saat bola di atas kepala.',
    scores: [
      { score: 1, name: 'Grip Panci / Gebug Kasur', desc: 'Memegang raket seperti memegang palu atau gagang panci (V-shape tidak ada). Muka raket menghadap net terus. Gerakan seperti menggebug kasur (kaku dari bahu). Suara sering "bletak" (kena frame).' },
      { score: 2, name: 'Kaku & Berat', desc: 'Sudah mencoba grip salaman (V-grip), tapi jari menggenggam terlalu erat/tegang. Pergelangan tangan (wrist) terkunci mati. Bola melaju tapi terasa berat.' },
      { score: 3, name: 'Standar Komunitas', desc: 'Cara pegang benar (relatif santai). Sudah ada gerakan memutar lengan bawah (pronation). Bunyi pukulan cukup bersih ("Bug!").' },
      { score: 4, name: 'Luwes / Fluid', desc: 'Gerakan ayunan terlihat enak dan mengalir. Transisi grip cepat dan otomatis tanpa melihat raket. Power pukulan besar meski ayunan tidak ngoyo.' },
      { score: 5, name: 'Matang / Finger Power', desc: 'Memegang raket hanya dengan jari (ada rongga di telapak). Ayunan pendek tapi eksplosif (Snap). Suara pukulan sangat nyaring dan tajam. Terlihat sangat santai (effortless).' }
    ]
  },
  {
    title: '2. FOOTWORK (Pergerakan Kaki)',
    description: 'Fokus: Lihat langkah kaki saat mengejar bola yang jauh dari badan.',
    scores: [
      { score: 1, name: 'Patung / Tanam Padi', desc: 'Kaki seperti dipaku di lantai, malas bergerak. Menunggu bola datang ke badan atau hanya menjulurkan tangan.' },
      { score: 2, name: 'Lari Jogging / Langkah Berat', desc: 'Bunyi langkah kaki keras ("Gedebuk"). Mengejar bola dengan lari biasa, bukan langkah badminton. Sering terlambat.' },
      { score: 3, name: 'Langkah Geser / Chassé', desc: 'Bergerak dengan cara menyeret/menggeser kaki (chassé step). Ada usaha untuk kembali ke tengah lapangan (recovery).' },
      { score: 4, name: 'Lincah / Jinjit', desc: 'Tumit jarang menyentuh lantai (jinjit). Reaksi cepat mengubah arah. Keseimbangan tubuh bagus, jarang sempoyongan.' },
      { score: 5, name: 'Split Step / Kancil', desc: 'Ada lompatan kecil (hop) saat lawan memukul. Langkah gunting (scissor jump) saat smash. Langkah sangat efisien (1-2 langkah sudah sampai pojok).' }
    ]
  },
  {
    title: '3. BACKHAND OVERHEAD (Sisi Kiri Belakang)',
    description: 'Fokus: Lihat saat pemain ditekan ke arah pojok kiri belakangnya.',
    scores: [
      { score: 1, name: 'Mati Kutu / Titik Lemah', desc: 'Panik total. Lari memutar badan memaksa pakai forehand tapi telat. Bola sering tidak sampai net.' },
      { score: 2, name: 'Asal Nyebrang / Tanggung', desc: 'Memukul dengan punggung menghadap net, tapi tenaga tidak ada. Bola melambung tanggung di tengah lapangan.' },
      { score: 3, name: 'Aman / Lob Tengah', desc: 'Tenaga cukup. Bisa membuang bola lob tinggi atau drop ke tengah lapangan lawan. Permainan berlanjut.' },
      { score: 4, name: 'Lob Sampai Belakang / Clear', desc: 'Teknik ayunan backhand benar (siku naik dulu). Bola melambung tinggi dan jatuh di area garis belakang lawan.' },
      { score: 5, name: 'Istimewa / Silang & Smash', desc: 'Sangat percaya diri. Bisa melakukan backhand clear silang (cross) dari ujung ke ujung. Atau bisa melakukan backhand drop/smash yang menipu.' }
    ]
  },
  {
    title: '4. ATTACK (Kualitas Serangan / Smash)',
    description: 'Fokus: Lihat lintasan bola saat pemain melakukan smash.',
    scores: [
      { score: 1, name: 'Nyangkut / Out', desc: 'Tidak ada timing. Bola sering melambung keluar garis atau menancap di net. Pukulan tidak ada tenaga.' },
      { score: 2, name: 'Datar / Modal Otot', desc: 'Mengandalkan otot lengan/bahu. Bola kencang tapi datar (Flat/Drive). Tidak menukik, mudah diblok.' },
      { score: 3, name: 'Nukik Standar', desc: 'Power sedang. Bola turun ke bawah (menukik) dengan kecepatan wajar. Standar smash bapak-bapak.' },
      { score: 4, name: 'Tajam & Keras', desc: 'Kombinasi sudut curam dan kecepatan tinggi. Bola jatuh tajam di area depan garis servis ganda. Sering mematikan lawan.' },
      { score: 5, name: 'Akurasi & Variasi', desc: 'Tidak asal keras, tapi diarahkan ke garis pinggir atau badan lawan. Menguasai Stick Smash (smash kedut).' }
    ]
  },
  {
    title: '5. DEFENSE (Pertahanan)',
    description: 'Fokus: Lihat reaksi pemain saat menerima smash keras.',
    scores: [
      { score: 1, name: 'Takut Bola / Buang Muka', desc: 'Membalikkan badan atau membuang muka. Mengangkat raket asal-asalan.' },
      { score: 2, name: 'Nanggung / Umpan', desc: 'Raket diam di bawah lutut. Bola terkena raket tapi melambung tanggung di depan net.' },
      { score: 3, name: 'Angkat Bola / Lift', desc: 'Posisi siap (kuda-kuda). Mampu menangkis smash dengan melambungkan bola tinggi ke belakang (Lift).' },
      { score: 4, name: 'Tembok / Wall', desc: 'Sangat tenang. Bisa mengarahkan blok ke kiri atau kanan (ruang kosong), bukan cuma lurus ke pengirim smash.' },
      { score: 5, name: 'Counter Attack / Balik Serang', desc: 'Agresif. Tidak melambungkan bola, tapi membalikkan dengan Drive datar kencang atau Netting silang tipis.' }
    ]
  },
  {
    title: '6. GAME IQ (Rotasi & Taktik Ganda)',
    description: 'Fokus: Lihat pergerakan pemain tanpa bola (posisi).',
    scores: [
      { score: 1, name: 'Tabrakan / Rebutan', desc: 'Sering bingung bola milik siapa. Raket sering beradu dengan partner. Dua-duanya diam melihat bola jatuh di tengah.' },
      { score: 2, name: 'Statis / Paku', desc: 'Diam di posisi masing-masing. Satu di depan terus, satu di belakang terus, tidak peduli kondisi permainan.' },
      { score: 3, name: 'Paham Dasar', desc: 'Rotasi standar jalan. Serang = depan-belakang. Bertahan = kiri-kanan. Komunikasi aktif.' },
      { score: 4, name: 'Saling Cover / Kompak', desc: 'Otomatis bergerak menutup ruang kosong saat partner ditarik keluar posisi. Jarang ada area kosong.' },
      { score: 5, name: 'Antisipasi / Reading', desc: 'Seperti peramal. Bisa menebak arah bola lawan sebelum dipukul. Sering memotong bola (Intercept) di depan net.' }
    ]
  },
  {
    title: '7. PHYSIQUE (Fisik & Stamina)',
    description: 'Fokus: Lihat konsistensi gerakan dari awal sampai akhir video.',
    scores: [
      { score: 1, name: 'Ngos-ngosan / Pucat', desc: 'Baru main sebentar napas sudah memburu. Sering bertumpu tangan di lutut saat bola mati.' },
      { score: 2, name: 'Habis Bensin', desc: 'Awal main gesit, tapi setelah 5 menit gerakan kaki melambat drastis. Sering mati sendiri karena lelah.' },
      { score: 3, name: 'Stabil', desc: 'Kuat bermain tempo sedang. Napas teratur. Tidak banyak kesalahan konyol karena lelah.' },
      { score: 4, name: 'Prima / Athlete-like', desc: 'Fisik terlatih. Masih bisa sprint di poin kritis. Recovery napas sangat cepat saat jeda.' },
      { score: 5, name: 'Monster / Badak', desc: 'Stamina tidak habis-habis. Bermain dengan tempo cepat (high pace) terus menerus tanpa kendor.' }
    ]
  }
];

// II. PETUNJUK TEKNIS PENILAIAN
export const ASSESSMENT_METHODS = [
  {
    title: "I. METODE PENILAIAN VIA VIDEO (PRA-TURNAMEN)",
    description: "Tantangan: Video bisa diedit, lawan mungkin lemah, atau hanya highlight. TPF harus jeli melihat detail mikro.",
    points: [
      { subtitle: '1. TEKNIK "PAUSE & ZOOM" (Cek Biomekanik)', desc: "Lakukan Pause saat pemain mengangkat raket. Fokus pada genggaman tangan. Grip panci = Beginner. Grip miring/siku naik = Intermediate/Advance. Grip adalah hal paling sulit dimanipulasi." },
      { subtitle: '2. CEK KUALITAS LAWAN (Validasi Konteks)', desc: "Jika lawan cuma memberi bola enak (Feeding), kurangi nilai skill. Wajib video uncut (tanpa potongan) minimal 2 menit reli." },
      { subtitle: '3. AUDIO CHECK (Bunyi Pukulan)', desc: 'Besarkan volume. "Bletak" = Akurasi Buruk. "Bug/Dug" = Power Menengah. "Tring/Wush" = Advance (Sweet Spot).' },
      { subtitle: '4. FOOTWORK "TANPA BOLA"', desc: "Perhatikan subjek saat partnernya memukul. Diam menonton = Level Bawah. Ikut geser jaga ruang = Level Atas." }
    ]
  },
  {
    title: "II. METODE PENILAIAN LANGSUNG DI LAPANGAN (SAAT PERTANDINGAN)",
    description: 'Tantangan: Pemain bisa grogi, atau sebaliknya "Pura-pura Bego" (Sandbagging) agar tidak naik kelas.',
    points: [
      { subtitle: '1. PANTAU SAAT WARM-UP', desc: 'Pemain sering lupa "bersandiwara" saat pemanasan. Lihat saat mereka lob/clear. Seringkali teknik asli keluar di sini, tapi mendadak "hilang" saat skor dihitung.' },
      { subtitle: '2. TEKNIK "POIN KRITIS" (Mental Check)', desc: 'Lihat saat skor 19-19. Beginner akan panik, kaku, buang bola. Sandbagger mendadak jago. Jika skill naik drastis, tandai sebagai Advance.' },
      { subtitle: '3. POSISI BERDIRI (STANCE) SAAT DEFENSE', desc: 'Kaki rapat & raket di bawah = Beginner. Kuda-kuda & raket di perut = Intermediate. Kuda-kuda & badan condong agresif = Advance.' },
      { subtitle: '4. REAKSI "BOLA KAGET" (Refleks Alamiah)', desc: 'Refleks tidak bisa bohong. Jika tangan menyentak cepat (twitch) ke arah bola sulit, itu tanda Muscle Memory level tinggi.' }
    ]
  }
];

// III. TABEL PEMBANDING
export const COMPARISON_TABLE = [
  { indicator: "POWER", video_assessment: "Dilihat dari laju bola (cepat/lambat) di video.", field_assessment: "Dilihat dari suara ledakan senar & seberapa jauh lawan terdorong mundur." },
  { indicator: "STAMINA", video_assessment: "Sulit dinilai (karena potongan klip).", field_assessment: "Sangat jelas. Lihat napas & apakah tangan memegang lutut saat jeda." },
  { indicator: "MENTAL", video_assessment: "Tidak terlihat.", field_assessment: "Terlihat jelas saat poin kritis atau saat tertinggal jauh." },
  { indicator: "GAME IQ", video_assessment: "Lihat posisi rotasi.", field_assessment: "Lihat komunikasi dengan partner & cara mematikan lawan." },
  { indicator: "BACKHAND", video_assessment: "Lihat teknik ayunan (siku).", field_assessment: "Lihat keberanian. Apakah dia lari menghindari backhand atau menunggu backhand?" }
];

// IV. RED FLAGS
export const RED_FLAGS = [
  '"Miss" yang Tidak Wajar: Sengaja membuang bola Out jauh sekali atau servis nyangkut berkali-kali secara teatrikal (akting berlebihan).',
  'Footwork Malas tapi Sampai: Kakinya terlihat jalan santai, tapi anehnya selalu tepat posisi di mana bola jatuh (Pembacaan bola terlalu bagus untuk seorang pemula).',
  'Mata Elang: Pemain pemula biasanya ragu bola in/out. Pemain yang dengan yakin melepas bola (Watch the line) dan terbukti benar out tipis, biasanya pemain jam terbang tinggi.',
  'Gear Pro: (Indikator pendukung) Menggunakan sepatu grade turnamen mahal, raket high-end, dan cara membalut grip yang sangat rapi khas atlet.'
];
