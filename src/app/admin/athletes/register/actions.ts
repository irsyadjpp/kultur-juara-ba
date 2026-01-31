
'use server';

import { athleteRegistrationSchema } from "@/lib/schemas/athlete";
import { addDocumentNonBlocking } from '@/firebase';
import { getFirestore, collection } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const initialState = {
  success: false,
  message: "",
};

export async function registerAthlete(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  const validatedFields = athleteRegistrationSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Validation failed", validatedFields.error.flatten().fieldErrors);
    return { success: false, message: "Data tidak valid. Mohon periksa kembali isian Anda." };
  }

  try {
    const { firestore } = initializeFirebase();
    const athletesCollection = collection(firestore, 'athletes');
    
    // Add active status by default
    const athleteData = {
      ...validatedFields.data,
      status_aktif: 'AKTIF', 
    };
    
    // Use the non-blocking function to add the document
    addDocumentNonBlocking(athletesCollection, athleteData);

    return { success: true, message: `Atlet "${validatedFields.data.fullName}" berhasil didaftarkan.` };

  } catch (error) {
    console.error("Error registering athlete:", error);
    let errorMessage = "Terjadi kesalahan pada server.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}
