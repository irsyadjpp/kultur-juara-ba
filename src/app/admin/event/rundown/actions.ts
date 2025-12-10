
'use server';

import { revalidatePath } from "next/cache";

export type Agenda = {
  id: string;
  time: string; // "08:00"
  duration: number; // Menit
  activity: string;
  pic: string;
  status: 'UPCOMING' | 'LIVE' | 'DONE';
  actualStartTime?: string;
};

// Mock Rundown Awal
let RUNDOWN: Agenda[] = [
  { id: "A1", time: "08:00", duration: 30, activity: "Registrasi Ulang", pic: "Sekretariat", status: "DONE" },
  { id: "A2", time: "08:30", duration: 15, activity: "Opening Ceremony", pic: "MC", status: "LIVE", actualStartTime: "08:35" },
  { id: "A3", time: "08:45", duration: 10, activity: "Sambutan Ketua", pic: "Irsyad", status: "UPCOMING" },
];

export async function getRundown() {
  return RUNDOWN;
}

export async function updateAgendaStatus(id: string, status: 'LIVE' | 'DONE') {
  const idx = RUNDOWN.findIndex(a => a.id === id);
  if (idx !== -1) {
    // Jika set LIVE, matikan yang lain
    if (status === 'LIVE') {
        RUNDOWN.forEach(a => { if(a.status === 'LIVE') a.status = 'DONE'; });
        RUNDOWN[idx].actualStartTime = new Date().toISOString(); // Use ISO string
    }
    RUNDOWN[idx].status = status;
  }
  revalidatePath('/admin/event/rundown');
  return { success: true };
}

    