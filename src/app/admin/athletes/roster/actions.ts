
'use server';

import { initializeFirebaseServer } from '@/firebase/server-init';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const athletesToSeed = [
    { fullName: "Ghaina Khansa Putri", size: "XL", ld: "34", tb: "63", lp: "27", gender: "Perempuan" },
    { fullName: "Fajarina Ayyatul Husna", size: "L", ld: "37", tb: "70", lp: "27", gender: "Perempuan" },
    { fullName: "Cecilya Anggraeni Nugraha", size: "XL", ld: "48", tb: "61", lp: "23", gender: "Perempuan" },
    { fullName: "Mega Astari Febriana", size: "L", ld: "45", tb: "66", lp: "22", gender: "Perempuan" },
    { fullName: "Muhammad Azzam Rayana", size: "L", ld: "39", tb: "58", lp: "26", gender: "Laki-laki" },
    { fullName: "Muhammad Wildan Kurniawan", size: "L", ld: "34", tb: "53", lp: "27", gender: "Laki-laki" },
    { fullName: "Reno Apriliandi", size: "L", ld: "36", tb: "54", lp: "30", gender: "Laki-laki" },
    { fullName: "Fabian Aufa Putra Andyana", size: "L", ld: "35", tb: "62", lp: "27", gender: "Laki-laki" }
];

export async function seedAthletes(prevState: any, formData: FormData) {
  try {
    const { firestore } = initializeFirebaseServer();
    const athletesCollection = collection(firestore, 'athletes');
    let addedCount = 0;

    for (const athlete of athletesToSeed) {
      // Check if athlete already exists to prevent duplicates
      const q = query(athletesCollection, where("fullName", "==", athlete.fullName));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Athlete does not exist, so add them
        const lastName = athlete.fullName.split(' ').slice(-1)[0] || athlete.fullName;
        
        const newAthleteData = {
          // Data from user
          fullName: athlete.fullName,
          height: athlete.tb,
          chestWidth: athlete.ld,
          waistCircumference: athlete.lp,
          gender: athlete.gender,
          shirtSize: athlete.size,
          
          // Default data to satisfy schema
          nickname: athlete.fullName.split(' ')[0],
          pob: "Bandung",
          dob: "2010-01-01", // Placeholder DOB
          dominantHand: "Kanan",
          phone: "081200000000",
          email: `${lastName.toLowerCase().replace(/[^a-z0-9]/g, '')}@kulturjuara.org`,
          address: "Bandung",
          schoolOrWork: "Sekolah Atlet",
          emergencyContact: "081211112222",
          weight: "50", // Placeholder
          jerseyNameOption: "lastName",
          jerseyName: lastName.toUpperCase().substring(0, 12),
          category: "Anak-anak (U-13)",
          level: "Beginner",
          startYear: "2023",
          careerTarget: "Prestasi",
          status_aktif: "AKTIF",
        };

        await addDoc(athletesCollection, newAthleteData);
        addedCount++;
      }
    }
    
    revalidatePath('/admin/athletes/roster');
    if (addedCount > 0) {
      return { success: true, message: `${addedCount} atlet berhasil ditambahkan ke database.` };
    } else {
      return { success: true, message: "Semua data atlet sudah ada di database." };
    }
  } catch (error) {
    console.error("Error seeding athletes:", error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan pada server.";
    return { success: false, message: errorMessage };
  }
}
