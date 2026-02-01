'use server';

import { getSession } from '../actions';
import { initializeFirebase } from '@/firebase';
import { getFirestore, collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

export async function submitJournalEntry(formData: any) {
  const session = await getSession();
  if (!session || !session.email) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const { firebaseApp: app } = initializeFirebase();
    const db = getFirestore(app);

    // 1. Find the athlete ID based on email
    const athletesRef = collection(db, 'athletes');
    const q = query(athletesRef, where('email', '==', session.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "Data atlet tidak ditemukan. Pastikan Anda terdaftar." };
    }

    const athleteDoc = querySnapshot.docs[0];
    const athleteId = athleteDoc.id;
    const athleteName = session.name || athleteDoc.data().fullName;

    // 2. Prepare Journal Data
    const journalData = {
      athleteId,
      athleteName,
      email: session.email,
      date: formData.date || new Date().toISOString().split('T')[0],
      createdAt: Timestamp.now(),
      ...formData,
    };

    // 3. Save to Firestore
    await addDoc(collection(db, 'journals'), journalData);

    return { success: true, message: "Laporan harian berhasil disimpan." };

  } catch (error: any) {
    console.error("Submit Journal Error:", error);
    return { success: false, message: error.message || "Gagal menyimpan laporan." };
  }
}

export async function submitMentalJournalEntry(formData: any) {
  const session = await getSession();
  if (!session || !session.email) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const { firebaseApp: app } = initializeFirebase();
    const db = getFirestore(app);

    // 1. Find the athlete ID based on email
    const athletesRef = collection(db, 'athletes');
    const q = query(athletesRef, where('email', '==', session.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "Data atlet tidak ditemukan. Pastikan Anda terdaftar." };
    }

    const athleteDoc = querySnapshot.docs[0];
    const athleteId = athleteDoc.id;
    const athleteName = session.name || athleteDoc.data().fullName;

    // 2. Prepare Journal Data
    const journalData = {
      athleteId,
      athleteName,
      email: session.email,
      date: formData.date || new Date().toISOString().split('T')[0],
      createdAt: Timestamp.now(),
      type: 'AMEL', // Distinguish strictly as AMEL
      ...formData,
    };

    // 3. Save to Firestore
    await addDoc(collection(db, 'mental_journals'), journalData);

    return { success: true, message: "Jurnal mental berhasil disimpan. Terima kasih telah berbagi." };

  } catch (error: any) {
    console.error("Submit Mental Journal Error:", error);
    return { success: false, message: error.message || "Gagal menyimpan jurnal." };
  }
}

export async function submitTechnicalLog(formData: any) {
  return await submitGenericLog(formData, 'technical_logs', 'Log Latihan Teknis');
}

export async function submitMatchLog(formData: any) {
  return await submitGenericLog(formData, 'match_logs', 'Log Pertandingan');
}

export async function submitNutritionLog(formData: any) {
  return await submitGenericLog(formData, 'nutrition_logs', 'Log Nutrisi');
}

async function submitGenericLog(formData: any, collectionName: string, logTitle: string) {
  const session = await getSession();
  if (!session || !session.email) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const { firebaseApp: app } = initializeFirebase();
    const db = getFirestore(app);

    const athletesRef = collection(db, 'athletes');
    const q = query(athletesRef, where('email', '==', session.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "Data atlet tidak ditemukan." };
    }

    const athleteDoc = querySnapshot.docs[0];
    const logData = {
      athleteId: athleteDoc.id,
      athleteName: session.name || athleteDoc.data().fullName,
      email: session.email,
      date: formData.date || new Date().toISOString().split('T')[0],
      createdAt: Timestamp.now(),
      ...formData,
    };

    await addDoc(collection(db, collectionName), logData);
    return { success: true, message: `${logTitle} berhasil disimpan.` };

  } catch (error: any) {
    console.error(`Submit ${logTitle} Error:`, error);
    return { success: false, message: error.message || "Gagal menyimpan data." };
  }
}
