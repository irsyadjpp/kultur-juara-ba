'use server';

import { getSession } from "@/app/actions";
import { adminDb, adminStorage } from '@/lib/firebase-admin';
import { athleteRegistrationSchema } from "@/lib/schemas/athlete";
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
        const checklistFiles = formData.getAll('checklistFiles') as string[];

        // 5. Handle Booleans (Switches)
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

        // 6. Merge & Validate
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

        const draftData = Object.fromEntries(Object.entries(rawData).filter(([_, v]) => v !== undefined));

        const validatedFields = actionType === 'draft'
            ? athleteRegistrationSchema.partial().safeParse(draftData)
            : athleteRegistrationSchema.safeParse(rawData);

        if (!validatedFields.success) {
            console.error("Validation failed", validatedFields.error.flatten().fieldErrors);
            const fieldErrors = validatedFields.error.flatten().fieldErrors;
            const errorMsg = Object.entries(fieldErrors).map(([key, val]) => `${key}: ${val}`).join(', ');
            return { success: false, message: `Data tidak valid: ${errorMsg}` };
        }

        const athletesRef = adminDb.collection('athletes');
        let generatedNIA = "";

        if (actionType !== 'draft') {
            // 7. Check for Duplicates using Admin SDK
            const emailSnapshot = await athletesRef.where('email', '==', validatedFields.data.email).get();
            const phoneSnapshot = await athletesRef.where('phone', '==', validatedFields.data.phone).get();
            const nikSnapshot = await athletesRef.where('nik', '==', validatedFields.data.nik).get();

            if (!emailSnapshot.empty) {
                return { success: false, message: `Email ${validatedFields.data.email} sudah terdaftar.` };
            }
            if (!phoneSnapshot.empty) {
                return { success: false, message: `Nomor HP ${validatedFields.data.phone} sudah terdaftar.` };
            }
            if (!nikSnapshot.empty) {
                return { success: false, message: `NIK ${validatedFields.data.nik} sudah terdaftar.` };
            }

            // 8. Handle NIA
            if (validatedFields.data.niaKji && validatedFields.data.niaKji.trim() !== "") {
                generatedNIA = validatedFields.data.niaKji.trim();
                const niaSnapshot = await athletesRef.where('niaKji', '==', generatedNIA).get();
                if (!niaSnapshot.empty) {
                    return { success: false, message: `NIA ${generatedNIA} sudah digunakan oleh atlet lain.` };
                }
            } else {
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const genderCode = validatedFields.data.gender === 'Laki-laki' ? 'L' : 'P';

                const lastSnapshot = await athletesRef.orderBy('registeredAt', 'desc').limit(1).get();
                let newSeq = '001';

                if (!lastSnapshot.empty) {
                    const lastData = lastSnapshot.docs[0].data();
                    const lastNia = lastData.niaKji || "";
                    const parts = lastNia.split('.');
                    if (parts.length === 5 && parts[1] == year.toString() && parts[2] == month) {
                        const lastSeq = parseInt(parts[4]);
                        newSeq = String(lastSeq + 1).padStart(3, '0');
                    }
                }
                generatedNIA = `KJI.${year}.${month}.${genderCode}.${newSeq}`;
            }
        } else {
            generatedNIA = `DRAFT.${Date.now()}`;
        }

        // 9. Upload Files using Admin SDK
        const uploadFile = async (file: File | null, path: string) => {
            if (!file || file.size === 0) return null;
            try {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const fileRef = adminStorage.file(path);

                await fileRef.save(buffer, {
                    contentType: file.type,
                });

                // Get long-lived signed URL (effectively public for the app)
                const [url] = await fileRef.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2500'
                });
                return url;
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
            isActive: actionType !== 'draft',
            status: actionType === 'draft' ? 'Draft' : (validatedFields.data.initialStatus || 'Probation'),
            isDraft: actionType === 'draft',
            status_aktif: actionType === 'draft' ? 'DRAFT' : 'AKTIF',

            kkUrl,
            aktaUrl,
            photoUrl,
            raporUrl,
            healthUrl,

            // Remove file objects
            fileKK: null,
            fileAkta: null,
            filePhoto: null,
            fileRapor: null,
            fileHealthCert: null,

            registeredBy: session.email,
            registeredAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await athletesRef.add(athleteData);

        revalidatePath('/admin/athletes/roster');

        if (actionType === 'draft') {
            return { success: true, message: `Draft tersimpan! (ID Sementara: ${generatedNIA})` };
        }

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
