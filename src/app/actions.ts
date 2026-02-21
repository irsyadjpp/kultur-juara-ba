
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// MOCK USER DATABASE FOR ALL ROLES
const MOCK_DB_USERS = [
    {
        email: "superadmin@kulturjuara.org",
        name: "Super Admin",
        role: "SUPER_ADMIN",
        pin: "250593"
    },
    {
        email: "admin@kulturjuara.org",
        name: "System Admin",
        role: "ADMIN",
        pin: "000000"
    },
    {
        email: process.env.DIRECTOR_EMAIL || "director@kulturjuara.org",
        name: "Pelatih Kepala",
        role: "HEAD_COACH",
        pin: "123456"
    },
    {
        email: "athlete.dummy@kulturjuara.org",
        name: "Atlet Uji Coba",
        role: "ATHLETE",
        pin: "112233"
    },
    {
        email: "psychologist@kulturjuara.org",
        name: "Psikolog Olahraga",
        role: "PSYCHOLOGIST",
        pin: "445566"
    },
    {
        email: "new.admin@kulturjuara.org",
        name: "New Admin",
        role: "ADMIN",
        pin: "110395"
    },
    {
        email: "dummy.admin@kulturjuara.org",
        name: "Dummy Admin",
        role: "ADMIN",
        pin: "999999"
    },
    {
        email: "coach@kulturjuara.org",
        name: "Pelatih Prestasi",
        role: "COACH",
        pin: "111111"
    },
    {
        email: "assistant@kulturjuara.org",
        name: "Asisten Pelatih",
        role: "ASSISTANT_COACH",
        pin: "222222"
    },
    {
        email: "parent@kulturjuara.org",
        name: "Orang Tua Demo",
        role: "PARENT",
        pin: "333333"
    }
];

import { initializeFirebaseServer } from '@/firebase/server-init';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';

export async function unifiedGoogleLogin(userData: { email: string; name: string; avatar: string; uid: string }) {
    // 1. Use real data from Google Auth passed from client
    const googleUser = {
        email: userData.email,
        name: userData.name,
        avatar: userData.avatar,
        uid: userData.uid
    };

    // 2. Determine Role
    let userRole = "GUEST";
    let isOnboarded = false;
    let pin = Math.floor(100000 + Math.random() * 900000).toString();
    let athleteId = undefined; // Specific for athletes

    // 2a. Check MOCK_DB_USERS first (for Admins, Head Coach, etc.)
    const mockUser = MOCK_DB_USERS.find(u => u.email === googleUser.email);
    if (mockUser) {
        userRole = mockUser.role;
        pin = mockUser.pin; // Use fixed PIN for mock users
        isOnboarded = true; // Assume mock users are onboarded
    } else {
        // 2b. Check Firestore "athletes" collection
        try {
            const { firestore } = initializeFirebaseServer();
            const athletesRef = collection(firestore, 'athletes');

            // Try as Athlete
            const q = query(athletesRef, where('email', '==', googleUser.email), limit(1));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const athleteDoc = querySnapshot.docs[0];
                const athleteData = athleteDoc.data();
                userRole = "ATHLETE";
                athleteId = athleteDoc.id;
                isOnboarded = true;

                // PIN Persistence for Athlete
                if (athleteData.pin) {
                    pin = athleteData.pin;
                } else {
                    // Generate and save PIN if missing
                    const generatedPin = Math.floor(100000 + Math.random() * 900000).toString();
                    const { adminDb } = await import('@/lib/firebase-admin');
                    await adminDb.collection('athletes').doc(athleteId).update({ pin: generatedPin });
                    pin = generatedPin;
                }
            } else {
                // 2c. Check if email is a parent email
                const parentQ = query(athletesRef, where('parentEmail', '==', googleUser.email), limit(1));
                const parentSnapshot = await getDocs(parentQ);
                if (!parentSnapshot.empty) {
                    userRole = "PARENT";
                    isOnboarded = true;
                    // Parents currently don't use PIN for child access, but we keep a random one in session
                }
            }
        } catch (error) {
            console.error("Error checking athlete database during login:", error);
        }
    }

    const userPayload = {
        ...googleUser,
        role: userRole,
        pin: pin,
        isOnboarded: isOnboarded,
        athleteId: athleteId // Add this to session
    };

    // 3. Create Session with the determined role
    const sessionData = JSON.stringify({
        ...userPayload,
        isLoggedIn: true,
    });

    (await cookies()).set('kultur_juara_session', sessionData, { httpOnly: true, path: '/' });

    // 4. Determine Redirect URL
    let redirectUrl = '/guests/waiting-room';

    if (userRole === 'ATHLETE') {
        redirectUrl = '/athletes/dashboard';
    } else if (userRole === 'PARENT') {
        redirectUrl = '/parents/dashboard';
    } else if (userRole === 'SUPER_ADMIN') {
        redirectUrl = '/superadmin/dashboard';
    } else if (['ADMIN', 'HEAD_COACH', 'COACH', 'PSYCHOLOGIST'].includes(userRole)) {
        redirectUrl = '/admin/dashboard';
    }

    return { success: true, redirectUrl, user: userPayload };
}



export async function loginByCode(prevState: any, formData: FormData) {
    const code = formData.get('code') as string;

    // 1. Check Mock DB (for Admins, etc.)
    let dbUser = MOCK_DB_USERS.find(u => u.pin === code);
    let athleteId = undefined;

    if (!dbUser) {
        // 2. Check Firestore Athletes
        try {
            const { firestore } = initializeFirebaseServer();
            const athletesRef = collection(firestore, 'athletes');
            const q = query(athletesRef, where('pin', '==', code), limit(1));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const athleteDoc = querySnapshot.docs[0];
                const athleteData = athleteDoc.data();
                dbUser = {
                    name: athleteData.fullName,
                    email: athleteData.email,
                    role: "ATHLETE",
                    pin: code
                };
                athleteId = athleteDoc.id;
            }
        } catch (error) {
            console.error("Error checking PIN in Firestore:", error);
        }
    }

    if (!dbUser) {
        return { success: false, message: "Kode PIN tidak valid." };
    }

    const sessionData = JSON.stringify({
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        isLoggedIn: true,
        isOnboarded: true,
        athleteId: athleteId,
        pin: code
    });

    (await cookies()).set('kultur_juara_session', sessionData, { httpOnly: true, path: '/' });

    let redirectUrl = '/admin/dashboard';
    if (dbUser.role === 'ATHLETE') {
        redirectUrl = '/athletes/dashboard';
    } else if (dbUser.role === 'PARENT') {
        redirectUrl = '/parents/dashboard';
    } else if (dbUser.role === 'SUPER_ADMIN') {
        redirectUrl = '/superadmin/dashboard';
    }

    redirect(redirectUrl);
}

export async function logout() {
    (await cookies()).delete('kultur_juara_session');
    // The redirect will be handled on the client side
}

export async function getSession() {
    const session = (await cookies()).get('kultur_juara_session');
    if (!session) return null;
    try {
        return JSON.parse(session.value);
    } catch (e) {
        return null;
    }
}

// Re-using from old admin actions, as it's useful for the layout
export async function signIntegrityPact() {
    const session = await getSession();
    if (!session) return { success: false };

    const updatedSession = { ...session, isOnboarded: true };

    (await cookies()).set('kultur_juara_session', JSON.stringify(updatedSession), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });

    return { success: true };
}
