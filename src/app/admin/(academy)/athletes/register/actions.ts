'use server';

import { athleteRegistrationSchema } from "@/lib/schemas/athlete";
import { getSession } from "@/app/actions";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeFirebaseServer } from '@/firebase/server-init';
import { revalidatePath } from "next/cache";


const initialState = {
  success: false,
  message: "",
};

// Helper to clean empty strings to undefined for Zod optional fields
const cleanData = (formData: FormData) => {
  const data: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string' && value.trim() === '') {
      data[key] = undefined;
    } else {
      data[key] = value;
    }
  }
  return data;
};

export async function registerAthlete(prevState: any, formData: FormData) {
  // 1. Validate Session & Role
  const session = await getSession();
  if (!session || !session.isLoggedIn || !['ADMIN', 'SUPER_ADMIN', 'HEAD_COACH'].includes(session.role)) {
    return { success: false, message: "Akses ditolak. Anda tidak memiliki izin untuk mendaftarkan atlet." };
  }

  try {
    // 2. Clean Data (Empty strings -> undefined)
    const cleanedData = cleanData(formData);

    // 4. Handle Checkboxes & Arrays Manually (FormData weirdness)
    const medicalHistory = formData.getAll('medicalHistory') as string[];
    const governmentAssistance = formData.getAll('governmentAssistance') as string[];
    const championshipTarget = formData.getAll('championshipTarget') as string[];
    const chronicSymptoms = formData.getAll('chronicSymptoms') as string[];
    const achievements = formData.getAll('achievements') as string[];

    // 5. Handle Booleans (Switches)
    const boolFields = [
      'seriousInjury', 'surgeryHistory', 'routineMedication', 'stayUpLate',
      'agreeLifestyle', 'agreeMediaRights', 'agreeLiability', 'agreeEmergency', 'agreeCodeOfEthics', 'authenticityDeclaration'
    ];
    const boolData: Record<string, boolean> = {};
    boolFields.forEach(field => {
      boolData[field] = formData.get(field) === 'on';
    });

    // 6. Merge & Validate
    const rawData = {
      ...cleanedData, // Start with the initial data including cleaned fields and files
      ...boolData,
      medicalHistory,
      governmentAssistance,
      championshipTarget,
      chronicSymptoms,
      achievements,
      // Files are in cleanedData already as File objects
    };

    const validatedFields = athleteRegistrationSchema.safeParse(rawData);

    if (!validatedFields.success) {
      console.error("Validation failed", validatedFields.error.flatten().fieldErrors);
      // Construct a more readable error message for the UI
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      const errorMsg = Object.entries(fieldErrors).map(([key, val]) => `${key}: ${val}`).join(', ');
      return { success: false, message: `Data tidak valid: ${errorMsg}` };
    }

    const { firestore, storage } = initializeFirebaseServer();
    const athletesCollection = collection(firestore, 'athletes');

    // 7. Check for Duplicates (Email OR Phone OR NIK)
    const emailQuery = query(athletesCollection, where('email', '==', validatedFields.data.email));
    const phoneQuery = query(athletesCollection, where('phone', '==', validatedFields.data.phone));
    // NIK Check
    const nikQuery = query(athletesCollection, where('nik', '==', validatedFields.data.nik));

    const [emailSnapshot, phoneSnapshot, nikSnapshot] = await Promise.all([
      getDocs(emailQuery),
      getDocs(phoneQuery),
      getDocs(nikQuery)
    ]);

    if (!emailSnapshot.empty) {
      return { success: false, message: `Email ${validatedFields.data.email} sudah terdaftar.` };
    }
    if (!phoneSnapshot.empty) {
      return { success: false, message: `Nomor HP ${validatedFields.data.phone} sudah terdaftar.` };
    }
    if (!nikSnapshot.empty) {
      return { success: false, message: `NIK ${validatedFields.data.nik} sudah terdaftar.` };
    }

    // 8. Auto-Generate NIA-KJI
    // Format: KJI.[Tahun].[Bulan].[Gender].[Sequence]
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const genderCode = validatedFields.data.gender === 'Laki-laki' ? 'L' : 'P';

    // Fetch last athlete registered to parse sequence
    const qLast = query(athletesCollection, orderBy('registeredAt', 'desc'), limit(1));
    const lastSnapshot = await getDocs(qLast);
    let newSeq = '001';

    if (!lastSnapshot.empty) {
      const lastData = lastSnapshot.docs[0].data();
      const lastNia = lastData.niaKji || "";
      // Check if same year/month
      const parts = lastNia.split('.');
      if (parts.length === 5 && parts[1] == year.toString() && parts[2] == month) {
        const lastSeq = parseInt(parts[4]);
        newSeq = String(lastSeq + 1).padStart(3, '0');
      }
    }

    const generatedNIA = `KJI.${year}.${month}.${genderCode}.${newSeq}`;

    // 9. Upload Files if present
    const uploadFile = async (file: File | null, path: string) => {
      if (!file || file.size === 0) return null;
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, buffer);
        return await getDownloadURL(storageRef);
      } catch (e) {
        console.error(`Error uploading file to ${path}:`, e);
        return null;
      }
    };

    const fileKK = formData.get('fileKK') as File;
    const fileAkta = formData.get('fileAkta') as File;
    const filePhoto = formData.get('filePhoto') as File;
    const fileRapor = formData.get('fileRapor') as File;
    const fileHealthCert = formData.get('fileHealthCert') as File;

    const [kkUrl, aktaUrl, photoUrl, raporUrl, healthUrl] = await Promise.all([
      uploadFile(fileKK, `athletes/${generatedNIA}/documents/kk_${fileKK?.name ?? ''}`),
      uploadFile(fileAkta, `athletes/${generatedNIA}/documents/akta_${fileAkta?.name ?? ''}`),
      uploadFile(filePhoto, `athletes/${generatedNIA}/photos/profile_${filePhoto?.name ?? ''}`),
      uploadFile(fileRapor, `athletes/${generatedNIA}/documents/rapor_${fileRapor?.name ?? ''}`),
      uploadFile(fileHealthCert, `athletes/${generatedNIA}/documents/health_${fileHealthCert?.name ?? ''}`),
    ]);

    // 10. Prepare Final Object
    const athleteData = {
      ...validatedFields.data,
      niaKji: generatedNIA,
      isActive: true, // Internal flag
      status: validatedFields.data.initialStatus || 'Probation', // Display status
      status_aktif: 'AKTIF', // Legacy compatibility

      // Update with real URLs
      kkUrl,
      aktaUrl,
      photoUrl,
      raporUrl,
      healthUrl,

      // Remove file objects from direct storage in Firestore (unnecessary)
      fileKK: null,
      fileAkta: null,
      filePhoto: null,
      fileRapor: null,
      fileHealthCert: null,

      registeredBy: session.email,
      registeredAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await addDoc(athletesCollection, athleteData);

    revalidatePath('/admin/athletes/roster');

    return { success: true, message: `Sukses! Atlet ${validatedFields.data.fullName} terdaftar dengan NIA: ${generatedNIA}` };

  } catch (error) {
    console.error("Error registering athlete:", error);
    let errorMessage = "Terjadi kesalahan pada server.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}
