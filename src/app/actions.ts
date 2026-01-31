'use server';

import { cookies } from 'next/headers';

// MOCK USER DATABASE FOR ALL ROLES
const MOCK_DB_USERS = [
  { 
    email: "admin@kulturjuara.com", 
    name: "System Admin", 
    role: "ADMIN",
    pin: "000000"
  },
  { 
    email: process.env.DIRECTOR_EMAIL || "director@kulturjuara.com", 
    name: "Pelatih Kepala", 
    role: "HEAD_COACH",
    pin: "123456"
  },
  { 
    email: "coach@kulturjuara.com", 
    name: "Pelatih Teknik", 
    role: "COACH", 
    pin: "112233"
  },
  {
    email: "psychologist@kulturjuara.com",
    name: "Psikolog Olahraga",
    role: "PSYCHOLOGIST",
    pin: "445566"
  }
];

export async function unifiedGoogleLogin() {
  // 1. Simulasi data dari Google Auth
  // In a real app, you'd get this from the Firebase Auth callback
  const googleUser = {
    email: "new.coach@gmail.com",
    name: "Pelatih Baru",
    avatar: "https://github.com/shadcn.png"
  };

  // 2. Determine role based on email or a database lookup
  // For this demo, let's assign a default role of 'COACH'
  const userRole = "COACH";

  const userPayload = {
      ...googleUser,
      role: userRole,
      isOnboarded: true, // Assume onboarded for simplicity
  };

  // 3. Create Session with the determined role
  const sessionData = JSON.stringify({
    ...userPayload,
    isLoggedIn: true,
  });

  cookies().set('kultur_juara_session', sessionData, { httpOnly: true, path: '/' });

  // 4. Redirect based on role
  // This redirect will be handled client-side after the action completes
  const redirectUrl = userRole === "HEAD_COACH" ? '/admin/dashboard' : '/portal/dashboard'; // Example redirect
  
  return { success: true, redirectUrl: '/admin/dashboard', user: userPayload };
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
  return { success: true, message: "Login berhasil!", redirectUrl: '/admin/dashboard' };
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
