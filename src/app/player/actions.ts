'use server'

import { validatePairingAndGetPrice } from "@/lib/game-logic";
import { cookies } from "next/headers";

export async function pairAthleteAction(currentUserCode: string, partnerCode: string) {
    // 1. Fetch User & Partner dari DB
    // const user = await db.user.find({ code: currentUserCode });
    // const partner = await db.user.find({ code: partnerCode });

    // MOCK DATA
    const user = { id: 1, name: "Irsyad", level: "beginner" };
    const partner = { id: 2, name: "Partner", level: "intermediate" }; // Contoh level beda

    if (!partner) {
        return { success: false, message: "Kode partner tidak ditemukan." };
    }

    if (user.id === partner.id) {
         return { success: false, message: "Tidak bisa pairing dengan diri sendiri." };
    }

    // 2. VALIDASI MATRIKS & HARGA
    const validation = validatePairingAndGetPrice(user.level as any, partner.level as any);

    if (!validation.isValid) {
        return { 
            success: false, 
            message: validation.reason || "Kombinasi level tidak diizinkan." 
        };
    }

    // 3. CREATE REGISTRATION / INVOICE
    // Logika: 
    // - Buat entri 'Team' baru (Temporary)
    // - Masukkan kedua user ke tim tersebut
    // - Set kategori tim = validation.category
    // - Generate Invoice sebesar validation.pricePerTeam (atau split bill)

    // await db.registration.create({
    //    category: validation.category,
    //    amount: validation.pricePerTeam,
    //    players: [user.id, partner.id]
    // })

    return {
        success: true,
        data: {
            category: validation.category,
            price: validation.pricePerPerson, // Tampilkan harga per orang
            partnerName: partner.name
        }
    };
}

export async function loginPlayerGoogle() {
  await new Promise(r => setTimeout(r, 1000));
  return { success: true };
}

export async function loginPlayerManual(prevState: any, formData: FormData) {
  await new Promise(r => setTimeout(r, 1000));
  const email = formData.get('email');
  if (email === 'test@example.com') {
    return { success: true };
  }
  return { success: false, message: 'Invalid credentials' };
}
