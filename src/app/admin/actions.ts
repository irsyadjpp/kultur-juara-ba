'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// --- MOCK DATABASE ADAPTER (Nanti ganti dengan prisma.user.findUnique) ---
// Ceritanya ini data yang sudah di-input oleh PD ke database
const MOCK_DB_USERS = [
  { email: "director@bcc.com", name: "Ketua Panitia", role: "DIRECTOR", pin: "123456" },
  { email: "it.head@bcc.com", name: "Koordinator IT", role: "HEAD_OF_DIVISION", division: "IT", pin: "000000" }
];


// 1. Logic Login Google (Utama)
export async function loginAdminGoogle() {
  // Simulasi data yang didapat dari Google OAuth Provider
  const googleUser = {
    email: "irsyad@gmail.com", // Ceritanya ini email Anda
    name: "Irsyad Jamal",
    avatar: "..."
  };

  let systemRole = "GUEST";
  let isAuthorized = false;

  // A. CEK SUPERADMIN (Hardcoded di ENV untuk keamanan level tertinggi)
  // Pastikan Anda set SUPERADMIN_EMAIL=irsyad@gmail.com di .env.local
  if (googleUser.email === process.env.SUPERADMIN_EMAIL) {
    systemRole = "SUPERADMIN";
    isAuthorized = true;
  } 
  
  // B. CEK USER DATABASE (Jika bukan Superadmin)
  else {
    // Cari user di database berdasarkan email Google
    const dbUser = MOCK_DB_USERS.find(u => u.email === googleUser.email);
    
    if (dbUser) {
      systemRole = dbUser.role;
      isAuthorized = true;
    }
  }

  if (!isAuthorized) {
    return { success: false, message: "Email Anda belum terdaftar di sistem BCC 2026. Hubungi Project Director." };
  }

  // C. Set Session
  const sessionData = JSON.stringify({
    name: googleUser.name,
    email: googleUser.email,
    role: systemRole,
    isLoggedIn: true,
    method: 'GOOGLE',
    isOnboarded: false, // NEW: Force onboarding check
  });

  cookies().set('bcc_admin_session', sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, 
    path: '/',
  });

  return { success: true };
}

// 2. Logic Login PIN (Alternatif untuk di Lapangan)
export async function loginAdminByCode(prevState: any, formData: FormData) {
  const code = formData.get('code') as string;

  // Cari user di DB yang punya PIN ini
  const dbUser = MOCK_DB_USERS.find(u => u.pin === code);

  if (!dbUser) {
    return { success: false, message: "Kode PIN tidak valid atau belum di-assign." };
  }

  const sessionData = JSON.stringify({
    name: dbUser.name,
    email: dbUser.email,
    role: dbUser.role,
    isLoggedIn: true,
    method: 'PIN',
    isOnboarded: false, // NEW: Force onboarding check
  });

  cookies().set('bcc_admin_session', sessionData, { httpOnly: true, path: '/' });
  return { success: true, message: "Login berhasil!" };
}


export async function logoutAdmin() {
  cookies().delete('bcc_admin_session');
  redirect('/');
}

export async function getAdminSession() {
  const session = cookies().get('bcc_admin_session');
  if (!session) return null;
  try {
    return JSON.parse(session.value);
  } catch (e) {
    return null;
  }
}

export async function signIntegrityPact() {
  const session = await getAdminSession();
  if (!session) return { success: false };

  const updatedSession = { ...session, isOnboarded: true };

  cookies().set('bcc_admin_session', JSON.stringify(updatedSession), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return { success: true };
}
