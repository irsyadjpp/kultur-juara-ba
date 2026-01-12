
export type CommitteeMember = {
  position: string;
  name: string;
  id?: string; // Bisa dihubungkan ke User ID login nanti
};

export type CommitteeDivision = {
  id: string;
  title: string;
  members: CommitteeMember[];
};

export const INITIAL_COMMITTEE_STRUCTURE: CommitteeDivision[] = [
  {
    id: "SC",
    title: "PANITIA INTI (STEERING COMMITTEE)",
    members: [
      { position: "Project Director", name: "Irsyad Jamal Pratama Putra" },
      { position: "Sekretaris 1", name: "Rizki Karami" },
      { position: "Sekretaris 2", name: "Annisa Syafira" },
      { position: "Bendahara", name: "Selvi Yulia" },
    ]
  },
  {
    id: "MATCH",
    title: "BIDANG PERTANDINGAN & INTEGRITAS",
    members: [
      { position: "Koordinator", name: "Wicky (PBSI)" },
      { position: "Match Liaison Officer (MLO)", name: "Sarah Fatmawati" },
      { position: "Ketua Tim Verifikasi Teknis (TVT)", name: "Anindiffa Pandu Prayuda" },
      { position: "Anggota TVT", name: "Aulia Febrianto" },
      { position: "Anggota TVT", name: "Faiz Azilla Syaehon" },
    ]
  },
  {
    id: "BUSINESS",
    title: "BIDANG KOMERSIAL (BUSINESS)",
    members: [
      { position: "Koordinator", name: "Teri Taufiq Mulyadi" },
      { position: "Sponsorship Liaison", name: "Ali Wardana" },
      { position: "Tenant Relations", name: "Risca Amalia" },
    ]
  },
  {
    id: "MEDIA",
    title: "BIDANG ACARA & KREATIF (SHOW & MEDIA)",
    members: [
      { position: "Koordinator", name: "Rizki Karami" },
      { position: "Media & Sosmed", name: "Susi" },
      { position: "Content Creator", name: "Sarah Maulidina" },
      { position: "Dokumentasi", name: "Rizky Mauludin" },
    ]
  },
  {
    id: "OPS",
    title: "BIDANG OPERASIONAL UMUM",
    members: [
      { position: "Koordinator", name: "Kevin Deriansyah Budiman" },
      { position: "Keamanan & Gate", name: "Muhammad Nur Sidiq Buana" },
      { position: "Medis", name: "Ananda Putri" },
      { position: "Registrasi & Check-in", name: "Norma Ayu Laras Tyas" },
      { position: "Logistik", name: "Alfin" },
    ]
  },
  {
    id: "IT",
    title: "BIDANG IT & DIGITAL",
    members: [
        { position: "Koordinator", name: "Irsyad Jamal Pratama Putra" },
        { position: "System Information", name: "" }, // Vacant
        { position: "Website & Platform", name: "" }, // Volunteer
    ]
  },
   {
    id: "LEGAL",
    title: "BIDANG HUKUM & KEPATUHAN",
    members: [
        { position: "Koordinator", name: "Lidya" },
        { position: "Perizinan", name: "" }, // Vacant
        { position: "Legal & Regulasi", name: "" }, // Vacant
    ]
  }
];
