
export const ROLE_DEFINITIONS = {
  TVT: {
    title: "Tim Verifikasi Teknis (TVT)",
    menimbang: "Bahwa untuk menjamin integritas kompetisi, penerapan asas Fair Play, dan pencegahan manipulasi level kemampuan (sandbagging) dalam turnamen BCC 2026.",
    // JOB DESC: Apa yang dikerjakan (Bab 3: Tim Verifikasi Teknis)
    jobDescriptions: [
      "Melakukan audit teknis terhadap video gameplay peserta (Verifikasi Pra-Event).",
      "Melakukan pemantauan langsung (Spot Check) di lapangan untuk identifikasi manipulasi level.",
      "Melakukan investigasi atas laporan protes terkait dugaan pemalsuan data/joki.",
      "Memberikan rekomendasi sanksi atau diskualifikasi kepada Referee."
    ],
    // SOP: Aturan main / Protokol (Bab 2: Syarat Khusus & Bab 1: KPI)
    sops: [
      "Wajib bersikap objektif, berani, dan tidak mudah diintimidasi.",
      "Dilarang memiliki konflik kepentingan (tidak sedang bermain/melatih tim peserta yang diverifikasi).",
      "Penegakan aturan verifikasi dilakukan tanpa pandang bulu (Zero Tolerance on Fraud).",
      "Laporan temuan wajib disertai bukti visual/data konkret sebelum rekomendasi diskualifikasi."
    ]
  },
  MEDIS: {
    title: "Tim Medis & Kesehatan",
    menimbang: "Bahwa untuk menjamin keselamatan jiwa dan penanganan cedera cepat selama berlangsungnya kegiatan BCC 2026.",
    // JOB DESC (Bab 3: Medis)
    jobDescriptions: [
      "Memberikan pertolongan pertama (First Aid/CPR) kepada atlet dan panitia yang cedera.",
      "Mengidentifikasi kondisi yang membutuhkan rujukan ke rumah sakit (Ambulans).",
      "Menyiapkan dan mengelola kotak P3K serta peralatan medis darurat di venue.",
      "Menyusun laporan medis harian untuk Project Director."
    ],
    // SOP (Bab 1: KPI & Bab 3: Kepatuhan)
    sops: [
      "Wajib mencapai respon time penanganan cedera di bawah 30 detik (Safety First).",
      "Tenang menghadapi darah/trauma dan bekerja secara cekatan.",
      "Memastikan protokol kesehatan dan keselamatan (K3) diterapkan di area venue.",
      "Keputusan 'Fit to Play' dari Tim Medis bersifat mutlak demi keselamatan atlet."
    ]
  },
  KEAMANAN: {
    title: "Keamanan (Security) & Gate Control",
    menimbang: "Bahwa untuk menjaga ketertiban umum, keamanan aset, serta pengaturan alur lalu lintas peserta di GOR KONI Bandung.",
    // JOB DESC (Bab 3: Keamanan & Gate)
    jobDescriptions: [
      "Mengatur akses masuk/keluar atlet, panitia, dan penonton (Gate Control).",
      "Memastikan hanya pihak berwenang yang masuk ke area terbatas (Restricted Area).",
      "Menjaga ketertiban di tribun dan area lapangan dari potensi kericuhan.",
      "Melakukan tindakan evakuasi jika terjadi keadaan darurat."
    ],
    // SOP (Bab 2: Kompetensi & Bab 3: Pengawasan)
    sops: [
      "Wajib bersikap tegas namun humanis dalam menertibkan penonton.",
      "Melakukan pemeriksaan (screening) tiket/ID Card pada setiap orang yang masuk tanpa terkecuali.",
      "Dilarang meninggalkan pos jaga sebelum ada pergantian shift atau instruksi Koordinator.",
      "Segera melapor ke Koordinator jika terjadi eskalasi konflik fisik."
    ]
  },
  MATCH_CONTROL: {
    title: "Match Control & Referee",
    menimbang: "Bahwa untuk memastikan jalannya pertandingan yang adil, tepat waktu, dan sesuai regulasi BWF/PBSI.",
    // JOB DESC (Bab 3: Koordinator Pertandingan)
    jobDescriptions: [
      "Menyusun dan mengawasi jadwal pertandingan (Match Schedule).",
      "Menangani pelanggaran teknis dan sengketa selama pertandingan (Dispute).",
      "Mengatur distribusi wasit dan hakim garis sesuai jadwal.",
      "Memastikan input skor ke sistem digital berjalan real-time."
    ],
    // SOP (Bab 1: KPI & Bab 2: Kompetensi)
    sops: [
      "Wajib menerapkan prinsip 'Zero Delay' dalam sistem pemanggilan pemain (Rolling).",
      "Keputusan Referee bersifat final dan mengikat di lapangan.",
      "Wajib memiliki pemahaman mutlak terhadap Laws of Badminton BWF.",
      "Menjaga netralitas dan tidak berpihak kepada tim manapun."
    ]
  }
};
