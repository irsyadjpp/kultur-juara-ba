
'use server';

// Tipe Data Notifikasi
export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: 'CRITICAL' | 'INFO' | 'SUCCESS'; // SOS=Critical, Makan=Info, Misi=Success
  time: string;
  read: boolean;
};

// Mock Data
const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: '1', title: 'SOS ALERT', message: 'Cedera di Lapangan 3 (Medis)', type: 'CRITICAL', time: '2 min ago', read: false },
  { id: '2', title: 'Makan Siang Ready', message: 'Silakan redeem kupon makan siang.', type: 'INFO', time: '1 hour ago', read: false },
  { id: '3', title: 'Misi Selesai', message: 'XP +50 diterima dari "Input Skor".', type: 'SUCCESS', time: '3 hours ago', read: true },
];

export async function getNotifications() {
  // Simulasi delay database
  await new Promise(r => setTimeout(r, 500));
  return MOCK_NOTIFICATIONS;
}

export async function markAsRead(id: string) {
  // Logic update database
  return { success: true };
}
