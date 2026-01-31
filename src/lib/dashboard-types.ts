

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

// This mock data is deprecated and will be removed.
// The new dashboard uses a simpler, component-local mock.
