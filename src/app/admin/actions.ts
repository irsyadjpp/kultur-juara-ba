'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCommitteeRoster, type CommitteeMember } from './director/roster/actions';

// Ambil data dari "database" roster
async function getAdminUsers() {
  const roster = await getCommitteeRoster();
  // Transformasi data roster ke format yang dibutuhkan untuk login
  // Di aplikasi nyata, 'pin' akan disimpan di database user, bukan di-hardcode.
  // Untuk sekarang, kita akan pakai data dummy dari roster.
  const adminUsers: Record<string, { name: string; role: string, pin: string | undefined }> = {};
  roster.forEach(member => {
    // Asumsi: role diambil dari expertise, dan perlu di-map ke role di layout
    const role = member.expertise?.toUpperCase().replace(' ', '_') || 'STAFF';
    
    // Asumsi: ID unik user adalah `member.id`. PIN akan di-map dari file lain nanti.
    if(member.id) {
        // Ini adalah contoh mapping PIN yang nantinya akan dikelola oleh Director
        const pinMapping: Record<string, string> = {
            "irsyad_j": "001",
            "selvi_y": "102",
            "wicky_p": "201",
            "sarah_f": "202",
            "teri_t": "301"
            // Tambahkan user lain di sini
        };
        // @ts-ignore
        adminUsers[member.id] = { name: member.name, role: role, pin: pinMapping[member.id] };
    }
  });
  return adminUsers;
}


// Login dengan PIN (Existing)
export async function loginAdminByCode(prevState: any, formData: FormData) {
  const code = formData.get('code') as string;
  const users = await getAdminUsers();

  // Cari user berdasarkan PIN
  const userInfo = Object.values(users).find(u => u.pin === code);

  if (!userInfo) {
    return { success: false, message: "Kode PIN tidak valid." };
  }

  await new Promise(r => setTimeout(r, 800));
  
  // Ambil peran dari data user yang cocok
  const userRole = userInfo.role;

  const sessionData = JSON.stringify({
    name: userInfo.name,
    role: userRole, 
    isLoggedIn: true,
    method: 'PIN',
    isOnboarded: false, // NEW: Force onboarding check
  });

  cookies().set('bcc_admin_session', sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 12, 
    path: '/',
  });

  return { success: true, message: "Login berhasil!" };
}

// BARU: Login dengan Google (Simulasi)
export async function loginAdminGoogle() {
  await new Promise(r => setTimeout(r, 1500)); // Simulasi Network Delay

  const sessionData = JSON.stringify({
    name: "Irsyad Jamal (Google)",
    role: "DIRECTOR", 
    isLoggedIn: true,
    method: 'GOOGLE',
    isOnboarded: false,
  });

  cookies().set('bcc_admin_session', sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, 
    path: '/',
  });

  return { success: true };
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
