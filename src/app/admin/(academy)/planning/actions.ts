
'use server';

import { revalidatePath } from 'next/cache';

export type ProgramProposal = {
  id: string;
  division: string;
  title: string;
  objective: string;
  deadline: string;
  costEstimate: number;
  priority: 'MUST' | 'SHOULD' | 'COULD' | 'WONT';
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REVISION' | 'REJECTED';
  scNotes?: string;
  pilar_program: string;
  sponsor_target: string;
};

// MOCK DATABASE
let PROGRAMS: ProgramProposal[] = [
  {
    id: "PROG-001",
    division: "MEDIA",
    title: "Video Teaser Instagram",
    objective: "Hype pendaftaran. Output: Video 60s.",
    deadline: "2026-01",
    costEstimate: 500000,
    priority: "MUST",
    status: "SUBMITTED",
    pilar_program: "Atlet Tangguh & Berkarakter",
    sponsor_target: "CSR Olahraga"
  },
  {
    id: "PROG-002",
    division: "OPERATIONS",
    title: "Sewa Misty Fan (Kipas Embun)",
    objective: "Pendingin GOR. Output: 4 Unit.",
    deadline: "2026-06",
    costEstimate: 2500000,
    priority: "SHOULD",
    status: "DRAFT",
    pilar_program: "Kemandirian Komunitas",
    sponsor_target: "Umum / Lainnya"
  },
   {
    id: "PROG-003",
    division: "LOGISTICS",
    title: "Program Botol Minum Reusable",
    objective: "Mengurangi sampah plastik di venue, 1 botol per atlet.",
    deadline: "2026-02",
    costEstimate: 7500000,
    priority: "COULD",
    status: "APPROVED",
    pilar_program: "Cinta Lingkungan",
    sponsor_target: "CSR Olahraga"
  }
];

export async function getPrograms() {
  await new Promise(r => setTimeout(r, 500)); // Simulate DB latency
  return PROGRAMS;
}

export async function reviewProgram(id: string, decision: 'APPROVED' | 'REVISION' | 'REJECTED', notes: string) {
  await new Promise(r => setTimeout(r, 800));
  const idx = PROGRAMS.findIndex(p => p.id === id);
  if (idx !== -1) {
    PROGRAMS[idx].status = decision;
    PROGRAMS[idx].scNotes = notes;
  }
  
  revalidatePath('/admin/planning');
  return { success: true, message: `Status program diperbarui menjadi ${decision}` };
}
