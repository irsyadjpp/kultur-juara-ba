
'use server';

import { cookies } from 'next/headers';

// MOCK USER DATABASE FOR ALL ROLES
const MOCK_DB_USERS = [
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
  }
];

export async function unifiedGoogleLogin() {
  // 1. Simulasi data dari Google Auth
  // In a real app, you'd get this from the Firebase Auth callback
  const googleUser = {
    email: "new.guest@gmail.com",
    name: "Tamu Baru",
    avatar: "https://github.com/shadcn.png"
  };

  // 2. Assign GUEST role by default for new registrations
  const userRole = "GUEST";

  const userPayload = {
      ...googleUser,
      role: userRole,
      isOnboarded: false, // Guests are not onboarded until role is assigned
  };

  // 3. Create Session with the determined role
  const sessionData = JSON.stringify({
    ...userPayload,
    isLoggedIn: true,
  });

  cookies().set('kultur_juara_session', sessionData, { httpOnly: true, path: '/' });

  // 4. Redirect to the main admin dashboard.
  // The layout will handle redirecting GUEST users to the waiting room.
  const redirectUrl = '/admin/dashboard';
  
  return { success: true, redirectUrl, user: userPayload };
}


export async function loginByCode(prevState: any, formData: FormData) {
  const code = formData.get('code') as string;

  const dbUser = MOCK_DB_USERS.find(u => u.pin === code);

  if (!dbUser) {
    return { success: false, message: "Kode PIN tidak valid." };
  }

  const sessionData = JSON.stringify({
    name: dbUser.name,
    email: dbUser.email,
    role: dbUser.role,
    isLoggedIn: true,
    isOnboarded: true, // Assume already onboarded
  });

  cookies().set('kultur_juara_session', sessionData, { httpOnly: true, path: '/' });

  const redirectUrl = dbUser.role === 'ATHLETE' ? '/athletes/dashboard' : '/admin/dashboard';

  return { success: true, message: "Login berhasil!", redirectUrl };
}

export async function logout() {
  cookies().delete('kultur_juara_session');
  // The redirect will be handled on the client side
}

export async function getSession() {
  const session = cookies().get('kultur_juara_session');
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

  cookies().set('kultur_juara_session', JSON.stringify(updatedSession), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return { success: true };
}
