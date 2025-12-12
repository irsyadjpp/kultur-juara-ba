
// Tipe status sesuai PRD Poin 2.D & 2.E
export type TPFStatus = 'none' | 'waiting' | 'process' | 'done' | 'revision';
export type RegistrationStatus = 'draft' | 'waiting_partner' | 'valid' | 'unpaid' | 'paid';

export interface PlayerDashboardData {
  athleteCode: string;
  communityCode: string | null; // Null jika belum join
  profileCompleteness: number; // 0 - 100
  tpfStatus: TPFStatus;
  tpfResult?: {
    level: string;
    tier: number;
    notes?: string;
  };
  registrationStatus: RegistrationStatus;
  nextMatch?: {
    opponent: string;
    time: string;
    court: string;
  };
  notifications: Array<{
    id: number;
    type: 'system' | 'alert' | 'info';
    message: string;
    timestamp: string;
    isCritical?: boolean;
  }>;
  history: Array<{
    id: number;
    event: string;
    date: string;
    category: string;
    result: string;
  }>;
}

// MOCK DATA: Ubah nilai ini untuk mengetes Skenario A/B/Edge Case
export const MOCK_PLAYER_DATA: PlayerDashboardData = {
  athleteCode: "ATH-2025-00123",
  communityCode: "COM-BCD-045",
  profileCompleteness: 80, // Ubah ke 100 untuk tes hijau
  tpfStatus: "done", // Coba: 'waiting', 'revision', 'done'
  tpfResult: {
    level: "Intermediate",
    tier: 2,
    notes: "Footwork baik, perlu peningkatan power smash."
  },
  registrationStatus: "unpaid", // Coba: 'draft', 'valid', 'paid'
  nextMatch: undefined, // Isi object jika ada jadwal
  notifications: [
    { id: 1, type: 'alert', message: "Tagihan pendaftaran akan kedaluwarsa dalam 24 jam.", timestamp: "1 jam lalu", isCritical: true },
    { id: 2, type: 'system', message: "Hasil penilaian TPF telah keluar.", timestamp: "2 hari lalu" }
  ],
  history: [
    { id: 101, event: "BCC Open 2024", date: "2024", category: "MD - Beginner", result: "Quarter Final" }
  ]
};
