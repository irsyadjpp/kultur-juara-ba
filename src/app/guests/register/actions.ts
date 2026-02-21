'use server';

import { initializeFirebase } from '@/firebase/index';
import { createNotification } from '@/lib/notifications';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

function getDb() {
    const { firestore } = initializeFirebase();
    return firestore;
}

export async function selfRegisterAthlete(prevState: any, formData: FormData) {
    try {
        const db = getDb();

        const fullName = formData.get('fullName') as string;
        const nickname = formData.get('nickname') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const dob = formData.get('dob') as string;
        const gender = formData.get('gender') as string;
        const pob = formData.get('pob') as string;
        const category = formData.get('category') as string;
        const address = formData.get('address') as string;
        const city = formData.get('city') as string;
        const province = formData.get('province') as string;
        const schoolName = formData.get('schoolName') as string;
        const parentName = formData.get('parentName') as string;
        const parentPhone = formData.get('parentPhone') as string;
        const parentEmail = formData.get('parentEmail') as string;

        // Basic validation
        if (!fullName || !email || !phone || !dob || !gender || !category) {
            return { success: false, message: 'Data wajib belum lengkap. Pastikan nama, email, HP, tanggal lahir, gender, dan kategori terisi.' };
        }

        // Check duplicate email
        const existingQuery = query(collection(db, 'athletes'), where('email', '==', email));
        const existingSnapshot = await getDocs(existingQuery);
        if (!existingSnapshot.empty) {
            return { success: false, message: `Email ${email} sudah terdaftar di sistem.` };
        }

        // Upload files if available
        const uploadFile = async (file: File | null, path: string): Promise<string | null> => {
            if (!file || file.size === 0) return null;
            try {
                const { firebaseApp } = initializeFirebase();
                const storage = getStorage(firebaseApp);
                const storageRef = ref(storage, path);
                await uploadBytes(storageRef, file);
                return await getDownloadURL(storageRef);
            } catch (e) {
                console.error(`Upload error (${path}):`, e);
                return null;
            }
        };

        const tempId = `SELF_${Date.now()}`;
        const generatedPin = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit PIN
        const filePhoto = formData.get('filePhoto') as File;
        const fileKK = formData.get('fileKK') as File;
        const fileAkta = formData.get('fileAkta') as File;

        const [photoUrl, kkUrl, aktaUrl] = await Promise.all([
            uploadFile(filePhoto, `athletes/${tempId}/photos/profile`),
            uploadFile(fileKK, `athletes/${tempId}/documents/kk`),
            uploadFile(fileAkta, `athletes/${tempId}/documents/akta`),
        ]);

        const athleteData = {
            fullName,
            nickname: nickname || '',
            email,
            phone,
            dob,
            gender,
            pob: pob || '',
            category,
            address: address || '',
            city: city || '',
            province: province || '',
            schoolName: schoolName || '',
            fatherName: parentName || '',
            fatherPhone: parentPhone || '',
            parentEmail: parentEmail || '',

            pin: generatedPin,
            niaKji: tempId,
            status: 'Pending Review',
            status_aktif: 'AKTIF',
            isDraft: false,
            isActive: false,
            registeredBy: 'SELF',
            registeredAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),

            photoUrl,
            kkUrl,
            aktaUrl,
        };

        await addDoc(collection(db, 'athletes'), athleteData);

        // Notify admins
        await createNotification({
            recipientEmail: 'admin@kulturjuara.org',
            type: 'draft_submitted',
            title: '📋 Pendaftaran Baru (Self-Registration)',
            message: `${fullName} mendaftar secara mandiri. PIN Akses: ${generatedPin}. Silakan review di halaman Verifikasi.`,
        });

        return { success: true, message: `Pendaftaran berhasil dikirim! Tim kami akan mereview data kamu dalam 1-3 hari kerja.` };
    } catch (error: any) {
        console.error('Self-registration error:', error);
        return { success: false, message: error.message || 'Terjadi kesalahan saat mendaftar.' };
    }
}
