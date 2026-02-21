'use server';

import { getSession } from "@/app/actions";
import { adminDb, adminStorage } from '@/lib/firebase-admin';
import { revalidatePath } from "next/cache";

export async function submitDraft(id: string) {
    const session = await getSession();
    if (!session || !session.isLoggedIn || !['ADMIN', 'SUPER_ADMIN', 'HEAD_COACH'].includes(session.role)) {
        return { success: false, message: "Akses ditolak." };
    }

    try {
        const docRef = adminDb.collection('athletes').doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return { success: false, message: "Data atlet tidak ditemukan." };
        }

        const data = docSnap.data()!;

        // Validate required fields
        const requiredFields = ['fullName', 'email', 'dob', 'gender', 'category'];
        const missingFields = requiredFields.filter(f => !data[f]);
        if (missingFields.length > 0) {
            return { success: false, message: `Data belum lengkap: ${missingFields.join(', ')}. Edit dulu sebelum submit.` };
        }

        // Generate permanent NIA
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const genderCode = data.gender === 'Laki-laki' ? 'L' : 'P';

        const countSnapshot = await adminDb.collection('athletes')
            .where('isDraft', '==', false)
            .get();
        const sequence = String(countSnapshot.size + 1).padStart(3, '0');
        const newNIA = `KJI.${year}.${month}.${genderCode}.${sequence}`;

        await docRef.update({
            status: 'Probation',
            status_aktif: 'AKTIF',
            isDraft: false,
            niaKji: newNIA,
            submittedAt: new Date().toISOString(),
            submittedBy: session.email,
            updatedAt: new Date().toISOString(),
        });

        revalidatePath('/admin/athletes/roster');
        revalidatePath('/admin/athletes/verification');
        return { success: true, message: `Draft "${data.fullName}" berhasil di-submit dengan NIA ${newNIA}. Atlet sekarang dalam proses verifikasi.` };
    } catch (error) {
        console.error("Error submitting draft:", error);
        return { success: false, message: "Gagal submit draft." };
    }
}

export async function deleteAthlete(id: string) {
    // 1. Validate Session & Role
    const session = await getSession();
    if (!session || !session.isLoggedIn || !['ADMIN', 'SUPER_ADMIN'].includes(session.role)) {
        return { success: false, message: "Akses ditolak. Hanya Admin yang dapat menghapus data atlet." };
    }

    try {
        const docRef = adminDb.collection('athletes').doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return { success: false, message: "Data atlet tidak ditemukan." };
        }

        const data = docSnap.data();
        const nia = data?.niaKji;

        // 2. Delete Files from Storage users Admin SDK
        if (nia) {
            try {
                const bucket = adminStorage;
                await bucket.deleteFiles({
                    prefix: `athletes/${nia}/`
                });
            } catch (storageError) {
                console.error("Error deleting files from storage:", storageError);
                // Continue deletion of doc even if storage fails? Yes.
            }
        }

        // 3. Delete Document
        await docRef.delete();

        revalidatePath('/admin/athletes/roster');
        return { success: true, message: "Data atlet berhasil dihapus permanen." };

    } catch (error) {
        console.error("Error deleting athlete:", error);
        return { success: false, message: "Terjadi kesalahan saat menghapus data." };
    }
}
