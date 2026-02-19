'use server';

import { getSession } from "@/app/actions";
import { adminDb, adminStorage } from '@/lib/firebase-admin';
import { athleteRegistrationSchema } from "@/lib/schemas/athlete";
import { revalidatePath } from "next/cache";

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

export async function updateAthlete(id: string, prevState: any, formData: FormData) {
    if (!id) return { success: false, message: "ID Atlet tidak ditemukan." };

    // 1. Validate Session & Role
    const session = await getSession();
    if (!session || !session.isLoggedIn || !['ADMIN', 'SUPER_ADMIN', 'HEAD_COACH'].includes(session.role)) {
        return { success: false, message: "Akses ditolak. Anda tidak memiliki izin untuk mengubah data atlet." };
    }

    try {
        // 2. Clean Data
        const cleanedData = cleanData(formData);

        // Handle Array & Boolean Fields (Same as register)
        const medicalHistory = formData.getAll('medicalHistory') as string[];
        const governmentAssistance = formData.getAll('governmentAssistance') as string[];
        const championshipTarget = formData.getAll('championshipTarget') as string[];
        const chronicSymptoms = formData.getAll('chronicSymptoms') as string[];
        const achievements = formData.getAll('achievements') as string[];
        const checklistFiles = formData.getAll('checklistFiles') as string[];

        // 3. Merge
        const boolFields = [
            'seriousInjury', 'surgeryHistory', 'routineMedication', 'stayUpLate',
            'agreeLifestyle', 'agreeMediaRights', 'agreeLiability', 'agreeEmergency', 'agreeCodeOfEthics', 'authenticityDeclaration'
        ];
        const boolData: Record<string, boolean | undefined> = {};
        const actionType = formData.get('actionType');

        boolFields.forEach(field => {
            const isChecked = formData.get(field) === 'on';
            if (actionType === 'draft' && !isChecked) {
                boolData[field] = undefined;
            } else {
                boolData[field] = isChecked;
            }
        });

        const rawData = {
            ...cleanedData,
            ...boolData,
            medicalHistory,
            governmentAssistance,
            championshipTarget,
            chronicSymptoms,
            achievements,
            checklistFiles,
        };

        // Remove undefined
        const dataToValidate = Object.fromEntries(Object.entries(rawData).filter(([_, v]) => v !== undefined));

        // Validate
        const validatedFields = actionType === 'draft'
            ? athleteRegistrationSchema.partial().safeParse(dataToValidate)
            : athleteRegistrationSchema.safeParse(dataToValidate);

        if (!validatedFields.success) {
            console.error("Validation failed", validatedFields.error.flatten().fieldErrors);
            const fieldErrors = validatedFields.error.flatten().fieldErrors;
            const errorMsg = Object.entries(fieldErrors).map(([key, val]) => `${key}: ${val}`).join(', ');
            return { success: false, message: `Data tidak valid: ${errorMsg}` };
        }

        // 4. Handle File Uploads (Only if new files provided)
        const uploadFile = async (file: File | null, path: string) => {
            if (!file || file.size === 0) return undefined; // Return undefined to not overwrite existing URL
            try {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const fileRef = adminStorage.file(path);

                await fileRef.save(buffer, {
                    contentType: file.type,
                });

                const [url] = await fileRef.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2500'
                });
                return url;
            } catch (e) {
                console.error(`Error uploading file to ${path}:`, e);
                return undefined;
            }
        };

        // Fetch existing data for NIA
        const docRef = adminDb.collection('athletes').doc(id);
        const docSnap = await docRef.get();
        if (!docSnap.exists) {
            return { success: false, message: "Data atlet tidak ditemukan." };
        }
        const existingData = docSnap.data();
        const nia = existingData?.niaKji || id;

        const fileKK = formData.get('fileKK') as File;
        const fileAkta = formData.get('fileAkta') as File;
        const filePhoto = formData.get('filePhoto') as File;
        const fileRapor = formData.get('fileRapor') as File;
        const fileHealthCert = formData.get('fileHealthCert') as File;

        const [kkUrl, aktaUrl, photoUrl, raporUrl, healthUrl] = await Promise.all([
            uploadFile(fileKK, `athletes/${nia}/documents/kk_${fileKK?.name ?? ''}`),
            uploadFile(fileAkta, `athletes/${nia}/documents/akta_${fileAkta?.name ?? ''}`),
            uploadFile(filePhoto, `athletes/${nia}/photos/profile_${filePhoto?.name ?? ''}`),
            uploadFile(fileRapor, `athletes/${nia}/documents/rapor_${fileRapor?.name ?? ''}`),
            uploadFile(fileHealthCert, `athletes/${nia}/documents/health_${fileHealthCert?.name ?? ''}`),
        ]);

        // 5. Update Object
        const updateData: Record<string, any> = {
            ...validatedFields.data,
            updatedAt: new Date().toISOString(),
            // Handle Status based on Action Type
            status_aktif: actionType === 'draft' ? 'DRAFT' : 'AKTIF',
            isDraft: actionType === 'draft',
            status: actionType === 'draft' ? 'Draft' : (validatedFields.data.initialStatus || existingData?.status || 'Probation'),

            // Remove file objects
            fileKK: null,
            fileAkta: null,
            filePhoto: null,
            fileRapor: null,
            fileHealthCert: null,
        };

        // Remove nulls regarding files so we don't write null to firestore
        delete updateData.fileKK;
        delete updateData.fileAkta;
        delete updateData.filePhoto;
        delete updateData.fileRapor;
        delete updateData.fileHealthCert;

        if (kkUrl) updateData.kkUrl = kkUrl;
        if (aktaUrl) updateData.aktaUrl = aktaUrl;
        if (photoUrl) updateData.photoUrl = photoUrl;
        if (raporUrl) updateData.raporUrl = raporUrl;
        if (healthUrl) updateData.healthUrl = healthUrl;

        await docRef.update(updateData);

        revalidatePath('/admin/athletes/roster');
        revalidatePath(`/admin/athletes/edit/${id}`);

        return { success: true, message: "Data atlet berhasil diperbarui." };

    } catch (error) {
        console.error("Error updating athlete:", error);
        return { success: false, message: error instanceof Error ? error.message : "Terjadi kesalahan server." };
    }
}
