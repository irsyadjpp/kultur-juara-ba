'use server';

import { getSession } from "@/app/actions";
import { adminDb } from '@/lib/firebase-admin';
import { revalidatePath } from "next/cache";

export type VerificationAthlete = {
    id: string;
    fullName: string;
    category: string;
    status: string;
    niaKji: string;
    email: string;
    photoUrl?: string;
    kkUrl?: string;
    aktaUrl?: string;
    raporUrl?: string;
    healthUrl?: string;
    registeredAt: string;
    hasPhysicalBaseline: boolean;
    hasTechnicalBaseline: boolean;
};

export async function getAthletesForVerification(): Promise<{ success: boolean; data: VerificationAthlete[]; message?: string }> {
    const session = await getSession();
    if (!session || !session.isLoggedIn || !['ADMIN', 'SUPER_ADMIN', 'HEAD_COACH'].includes(session.role)) {
        return { success: false, data: [], message: "Akses ditolak." };
    }

    try {
        // 1. Get athletes with status 'Probation' (Process)
        const athletesSnapshot = await adminDb.collection('athletes')
            .where('status', '==', 'Probation')
            .get();

        const athletes = athletesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as any[];

        // 2. For each athlete, check evaluation status
        const results: VerificationAthlete[] = await Promise.all(athletes.map(async (a) => {
            const physicalEval = await adminDb.collection('evaluations')
                .where('athleteId', '==', a.id)
                .where('type', '==', 'physical')
                .limit(1)
                .get();

            const technicalEval = await adminDb.collection('evaluations')
                .where('athleteId', '==', a.id)
                .where('type', '==', 'technical')
                .limit(1)
                .get();

            return {
                id: a.id,
                fullName: a.fullName || '',
                category: a.category || '',
                status: a.status || '',
                niaKji: a.niaKji || '',
                email: a.email || '',
                photoUrl: a.photoUrl,
                kkUrl: a.kkUrl,
                aktaUrl: a.aktaUrl,
                raporUrl: a.raporUrl,
                healthUrl: a.healthUrl,
                registeredAt: a.registeredAt || '',
                hasPhysicalBaseline: !physicalEval.empty,
                hasTechnicalBaseline: !technicalEval.empty
            };
        }));

        return { success: true, data: results };
    } catch (error) {
        console.error("Error fetching verification data:", error);
        return { success: false, data: [], message: "Gagal memuat data verifikasi." };
    }
}

export async function verifyAthlete(athleteId: string) {
    const session = await getSession();
    if (!session || !session.isLoggedIn || !['ADMIN', 'SUPER_ADMIN', 'HEAD_COACH'].includes(session.role)) {
        return { success: false, message: "Akses ditolak." };
    }

    try {
        const athleteRef = adminDb.collection('athletes').doc(athleteId);
        const athleteDoc = await athleteRef.get();

        if (!athleteDoc.exists) {
            return { success: false, message: "Atlet tidak ditemukan." };
        }

        // Check baseline requirements before verifying
        const physicalEval = await adminDb.collection('evaluations')
            .where('athleteId', '==', athleteId)
            .where('type', '==', 'physical')
            .limit(1)
            .get();

        const technicalEval = await adminDb.collection('evaluations')
            .where('athleteId', '==', athleteId)
            .where('type', '==', 'technical')
            .limit(1)
            .get();

        if (physicalEval.empty || technicalEval.empty) {
            return { success: false, message: "Baseline test (Fisik & Teknik) belum lengkap." };
        }

        await athleteRef.update({
            status: 'Active', // Change from Probation to Active
            verifiedAt: new Date().toISOString(),
            verifiedBy: session.email,
            updatedAt: new Date().toISOString()
        });

        revalidatePath('/admin/athletes/verification');
        revalidatePath('/admin/athletes/roster');

        return { success: true, message: "Atlet berhasil diverifikasi menjadi AKTIF." };
    } catch (error) {
        console.error("Error verifying athlete:", error);
        return { success: false, message: "Gagal melakukan verifikasi." };
    }
}
