'use server';

import { getSession } from "@/app/actions";
import { adminDb, adminStorage } from '@/lib/firebase-admin';
import { revalidatePath } from "next/cache";

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
