'use server';

import { getSession } from "@/app/actions";
import { adminDb } from '@/lib/firebase-admin';
import { createNotification } from '@/lib/notifications';
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
    registeredBy?: string;
    hasPhysicalBaseline: boolean;
    hasTechnicalBaseline: boolean;
    rejectionReason?: string;
    rejectionNotes?: string;
    rejectedAt?: string;
    docChecklist?: DocumentChecklist;
};

export type DocumentChecklist = {
    kkVerified: boolean;
    aktaVerified: boolean;
    raporVerified: boolean;
    healthVerified: boolean;
};

function authorizeStaff(session: any) {
    if (!session || !session.isLoggedIn || !['ADMIN', 'SUPER_ADMIN', 'HEAD_COACH'].includes(session.role)) {
        return false;
    }
    return true;
}

export async function getAthletesForVerification(): Promise<{ success: boolean; data: VerificationAthlete[]; message?: string }> {
    const session = await getSession();
    if (!authorizeStaff(session)) {
        return { success: false, data: [], message: "Akses ditolak." };
    }

    try {
        // Get athletes with Probation, Pending Review, or Rejected status
        const statusList = ['Probation', 'Pending Review', 'Rejected'];
        const athletesSnapshot = await adminDb.collection('athletes')
            .where('status', 'in', statusList)
            .get();

        const athletes = athletesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as any[];

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
                registeredBy: a.registeredBy || '',
                hasPhysicalBaseline: !physicalEval.empty,
                hasTechnicalBaseline: !technicalEval.empty,
                rejectionReason: a.rejectionReason,
                rejectionNotes: a.rejectionNotes,
                rejectedAt: a.rejectedAt,
                docChecklist: a.docChecklist || { kkVerified: false, aktaVerified: false, raporVerified: false, healthVerified: false },
            };
        }));

        return { success: true, data: results };
    } catch (error) {
        console.error("Error fetching verification data:", error);
        return { success: false, data: [], message: "Gagal memuat data verifikasi." };
    }
}

// ─── VERIFY (Approve) ─────────────────────────────────────────────────────────

export async function verifyAthlete(athleteId: string) {
    const session = await getSession();
    if (!authorizeStaff(session)) {
        return { success: false, message: "Akses ditolak." };
    }

    try {
        const athleteRef = adminDb.collection('athletes').doc(athleteId);
        const athleteDoc = await athleteRef.get();

        if (!athleteDoc.exists) {
            return { success: false, message: "Atlet tidak ditemukan." };
        }

        const athleteData = athleteDoc.data()!;

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

        // Update status to Active
        await athleteRef.update({
            status: 'Active',
            verifiedAt: new Date().toISOString(),
            verifiedBy: session.email,
            updatedAt: new Date().toISOString(),
        });

        // ── Gap 5: Baseline → Sport Science Sync ──────────────────────────────
        // Auto-create first sport science evaluation from registration baseline data
        try {
            const now = new Date();
            const period = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
            const baselineData: Record<string, any> = {
                athleteId,
                period,
                evaluator: 'System (Baseline Sync)',
                type: 'sport_science',
                createdAt: new Date(),
                notes: 'Auto-generated dari data registrasi baseline.',

                // Anthropometry from registration
                ant_height_cm: athleteData.ant_height_cm || null,
                ant_weight_kg: athleteData.ant_weight_kg || null,
                ant_arm_span_cm: athleteData.ant_arm_span_cm || null,
                ant_sitting_height: athleteData.ant_sitting_height || null,
                ant_leg_length: athleteData.ant_leg_length || null,

                // Kinematics from registration
                kin_grip_switch_speed: athleteData.kin_grip_switch_speed || null,
                kin_wrist_extension: athleteData.kin_wrist_extension || null,
                kin_elbow_alignment: athleteData.kin_elbow_alignment || null,
                kin_kinetic_linkage: athleteData.kin_kinetic_linkage || null,
                kin_contact_height: athleteData.kin_contact_height || null,

                // Biomotor from registration
                bio_t_test_sec: athleteData.bio_t_test_sec || null,
                bio_split_step_lat: athleteData.bio_split_step_lat || null,
                bio_vertical_jump: athleteData.bio_vertical_jump || null,

                // Mental from registration
                men_grit_score: athleteData.men_grit_score || null,
                men_academic_pressure: athleteData.men_academic_pressure || null,
                men_poms_index: athleteData.men_poms_index || null,

                // Socio-Econ
                soc_travel_time: athleteData.soc_travel_time || null,

                // Blood & Biomarker
                phy_hemoglobin_lvl: athleteData.phy_hemoglobin_lvl || null,
                phy_creatine_kinase: athleteData.phy_creatine_kinase || null,
                phy_testosteron_cort: athleteData.phy_testosteron_cort || null,

                // Visual & Perceptual
                cog_saccadic_speed: athleteData.cog_saccadic_speed || null,
                cog_peripheral_deg: athleteData.cog_peripheral_deg || null,
                cog_choice_reaction: athleteData.cog_choice_reaction || null,

                // Biomechanical Load
                load_grf_asymmetry: athleteData.load_grf_asymmetry || null,
                load_shoulder_torque: athleteData.load_shoulder_torque || null,
            };

            // Remove null values
            const cleanBaseline = Object.fromEntries(
                Object.entries(baselineData).filter(([_, v]) => v !== null && v !== undefined)
            );

            const docId = `${athleteId}_baseline`;
            await adminDb.collection('sport_science_evaluations').doc(docId).set(cleanBaseline, { merge: true });
        } catch (syncError) {
            console.error("Baseline sync error (non-blocking):", syncError);
        }

        // ── Gap 2: Notification ───────────────────────────────────────────────
        if (athleteData.email) {
            await createNotification({
                recipientEmail: athleteData.email,
                type: 'verification_approved',
                title: '🎉 Selamat! Kamu Resmi Terdaftar',
                message: `Status kamu telah diubah menjadi AKTIF oleh ${session.name || session.email}. Selamat bergabung di Kultur Juara Badminton Academy!`,
            });
        }

        revalidatePath('/admin/athletes/verification');
        revalidatePath('/admin/athletes/roster');

        return { success: true, message: "Atlet berhasil diverifikasi menjadi AKTIF." };
    } catch (error) {
        console.error("Error verifying athlete:", error);
        return { success: false, message: "Gagal melakukan verifikasi." };
    }
}

// ─── REJECT ───────────────────────────────────────────────────────────────────

export async function rejectAthlete(athleteId: string, reason: string, notes?: string) {
    const session = await getSession();
    if (!authorizeStaff(session)) {
        return { success: false, message: "Akses ditolak." };
    }

    try {
        const athleteRef = adminDb.collection('athletes').doc(athleteId);
        const athleteDoc = await athleteRef.get();

        if (!athleteDoc.exists) {
            return { success: false, message: "Atlet tidak ditemukan." };
        }

        const athleteData = athleteDoc.data()!;

        await athleteRef.update({
            status: 'Rejected',
            rejectionReason: reason,
            rejectionNotes: notes || '',
            rejectedAt: new Date().toISOString(),
            rejectedBy: session.email,
            updatedAt: new Date().toISOString(),
        });

        // Notification to athlete
        if (athleteData.email) {
            await createNotification({
                recipientEmail: athleteData.email,
                type: 'verification_rejected',
                title: '⚠️ Pendaftaran Perlu Revisi',
                message: `Alasan: ${reason}. ${notes ? `Catatan: ${notes}` : ''} Silakan perbaiki data dan hubungi admin.`,
            });
        }

        revalidatePath('/admin/athletes/verification');
        return { success: true, message: `Pendaftaran ${athleteData.fullName} ditolak.` };
    } catch (error) {
        console.error("Error rejecting athlete:", error);
        return { success: false, message: "Gagal menolak pendaftaran." };
    }
}

// ─── DOCUMENT CHECKLIST (Gap 7) ───────────────────────────────────────────────

export async function updateDocumentChecklist(athleteId: string, checklist: DocumentChecklist) {
    const session = await getSession();
    if (!authorizeStaff(session)) {
        return { success: false, message: "Akses ditolak." };
    }

    try {
        await adminDb.collection('athletes').doc(athleteId).update({
            docChecklist: checklist,
            updatedAt: new Date().toISOString(),
        });
        revalidatePath('/admin/athletes/verification');
        return { success: true };
    } catch (error) {
        console.error("Error updating checklist:", error);
        return { success: false, message: "Gagal update checklist." };
    }
}
