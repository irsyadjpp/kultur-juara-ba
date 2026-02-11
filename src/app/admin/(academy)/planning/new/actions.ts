'use server';

import { revalidatePath } from 'next/cache';

// Mock DB from the original actions file
let PROGRAMS: any[] = [
  { id: "PROG-001", division: "MEDIA", title: "Video Teaser Instagram", objective: "Hype pendaftaran. Output: Video 60s.", deadline: "2026-01-15", costEstimate: 500000, priority: "MUST", status: "SUBMITTED" },
  { id: "PROG-002", division: "OPS", title: "Sewa Misty Fan (Kipas Embun)", objective: "Pendingin GOR. Output: 4 Unit.", deadline: "2026-06-10", costEstimate: 2500000, priority: "SHOULD", status: "DRAFT" }
];


export async function submitProgram(prevState: any, formData: FormData) {
  
  // Simple validation
  const title = formData.get('title');
  const objective = formData.get('objective');
  const priority = formData.get('priority');

  if (!title || typeof title !== 'string' || title.length < 3) {
      return { success: false, message: 'Nama Program wajib diisi.' }
  }
   if (!objective || typeof objective !== 'string' || objective.length < 10) {
      return { success: false, message: 'Tujuan Program wajib diisi (minimal 10 karakter).' }
  }
  if (!priority) {
      return { success: false, message: 'Prioritas Program wajib dipilih.' }
  }

  const newProg = {
    id: `PROG-${Date.now().toString().slice(-4)}`,
    title: formData.get('title'),
    division: formData.get('division'),
    pilar_program: formData.get('pilar_program'),
    sponsor_target: formData.get('sponsor_target'),
    deadline: formData.get('deadline'),
    costEstimate: Number(formData.get('costEstimate')),
    status: 'SUBMITTED', // Default status
    objective: formData.get('objective'), 
    priority: formData.get('priority'), 
  };
  
  // In a real app, this would be a DB call
  await new Promise(r => setTimeout(r, 1000));
  PROGRAMS.unshift(newProg);
  
  console.log("New Program Submitted:", newProg);

  revalidatePath('/admin/planning');
  
  return { success: true, message: `Program "${newProg.title}" berhasil diajukan.` };
}
