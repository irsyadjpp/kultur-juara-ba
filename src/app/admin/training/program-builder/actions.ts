'use server';

import { addDocumentNonBlocking } from '@/firebase';
import { getFirestore, collection } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { revalidatePath } from 'next/cache';

export async function saveTrainingProgram(prevState: any, formData: FormData) {
  const data = {
    pbName: formData.get('pbName'),
    ageGroup: formData.get('ageGroup'),
    athleteLevel: formData.get('athleteLevel'),
    period: formData.get('period'),
    phase: formData.get('phase'),
    coachName: formData.get('coachName'),
    mainObjectives: formData.getAll('mainObjectives'),
    objectiveDetails: formData.get('objectiveDetails'),
    weeklyPlan: formData.get('weeklyPlan'),
    createdAt: new Date().toISOString(),
  };

  try {
    const { firestore } = initializeFirebase();
    const programsCollection = collection(firestore, 'training-programs');
    
    // Using non-blocking write for faster UI response
    addDocumentNonBlocking(programsCollection, data);
    
    revalidatePath('/admin/training/program-builder');
    return { success: true, message: `Program latihan untuk periode ${data.period} berhasil disimpan.` };

  } catch (error) {
    console.error("Error saving training program:", error);
    let errorMessage = "Terjadi kesalahan pada server.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}
