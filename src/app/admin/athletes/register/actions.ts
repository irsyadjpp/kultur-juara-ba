
'use server';

import { athleteRegistrationSchema } from "@/lib/schemas/athlete";

import { getSession } from "@/app/actions";
import { collection, addDoc, query, where, getDocs, or } from 'firebase/firestore';
import { initializeFirebaseServer } from '@/firebase/server-init';
import { revalidatePath } from "next/cache";


const initialState = {
  success: false,
  message: "",
};

export async function registerAthlete(prevState: any, formData: FormData) {
  // 1. Validate Session & Role
  const session = await getSession();
  if (!session || !session.isLoggedIn || !['ADMIN', 'SUPER_ADMIN', 'HEAD_COACH'].includes(session.role)) {
    return { success: false, message: "Akses ditolak. Anda tidak memiliki izin untuk mendaftarkan atlet." };
  }

  const data = Object.fromEntries(formData);
  const validatedFields = athleteRegistrationSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Validation failed", validatedFields.error.flatten().fieldErrors);
    return { success: false, message: "Data tidak valid. Mohon periksa kembali isian Anda." };
  }

  try {
    const { firestore } = initializeFirebaseServer();
    const athletesCollection = collection(firestore, 'athletes');

    // 2. Check for Duplicates (Email OR Phone)
    // Note: 'or' query might require specific index or newer SDK. 
    // Safer to just check email and phone separately if index is missing, but let's try parallel queries for efficiency.
    const emailQuery = query(athletesCollection, where('email', '==', validatedFields.data.email));
    const phoneQuery = query(athletesCollection, where('phone', '==', validatedFields.data.phone));

    const [emailSnapshot, phoneSnapshot] = await Promise.all([
      getDocs(emailQuery),
      getDocs(phoneQuery)
    ]);

    if (!emailSnapshot.empty) {
      return { success: false, message: `Email ${validatedFields.data.email} sudah terdaftar.` };
    }

    if (!phoneSnapshot.empty) {
      return { success: false, message: `Nomor HP ${validatedFields.data.phone} sudah terdaftar.` };
    }

    // 3. Add active status by default
    const athleteData = {
      ...validatedFields.data,
      status_aktif: 'AKTIF',
      registeredBy: session.email,
      registeredAt: new Date().toISOString(),
    };

    await addDoc(athletesCollection, athleteData);

    revalidatePath('/admin/athletes/roster');

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
