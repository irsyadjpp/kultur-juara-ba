
'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from 'zod';
import { athleteProfileSchema } from "@/lib/schemas/player-profile";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password minimal 6 karakter"),
});


// MOCK DB
let PLAYERS_DB: any[] = [
    { email: "player@bcc.com", password: "password123", name: "Budi Atlet", phone: "08123456789" }
];
// Tim dengan Kode Unik
const TEAMS_DB = [
  { id: "TEAM-01", name: "PB Djarum", code: "BCC-8821", manager: "Budi" },
  { id: "TEAM-02", name: "PB Jaya Raya", code: "BCC-9912", manager: "Susi" }
];

export async function loginPlayerManual(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validation = authSchema.safeParse({ email, password });
  if (!validation.success) {
    return { success: false, message: "Format email atau password salah." };
  }

  // Simulasi Cek DB
  await new Promise(r => setTimeout(r, 1000));
  
  // Set Session Cookie
  const sessionData = JSON.stringify({
    email,
    name: email.split('@')[0],
    role: 'PLAYER',
    isLoggedIn: true
  });

  cookies().set('bcc_player_session', sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 Hari
    path: '/',
  });

  return { success: true, message: "Login berhasil!" };
}


export async function registerPlayer(data: any) {
  // 1. Cek NIK Duplikat (Wajib)
  if (PLAYERS_DB.find(p => p.nik === data.nik)) {
    return { success: false, message: "NIK sudah terdaftar!" };
  }

  const newPlayer = {
    id: `P-${Date.now()}`,
    ...data,
    teamId: null, // Belum punya tim
    status: 'ACTIVE'
  };
  
  PLAYERS_DB.push(newPlayer);
  return { success: true };
}

export async function joinTeam(playerEmail: string, teamCode: string) {
  const team = TEAMS_DB.find(t => t.code === teamCode);
  if (!team) {
    return { success: false, message: "Kode Tim tidak valid/tidak ditemukan." };
  }
  
  const cookieStore = cookies();
  const sessionStr = cookieStore.get('bcc_player_session')?.value;
  if (sessionStr) {
      const session = JSON.parse(sessionStr);
      
      const updatedSession = { ...session, teamId: team.id, teamName: team.name };
      cookieStore.set('bcc_player_session', JSON.stringify(updatedSession), { httpOnly: true, path: '/' });
  }

  return { success: true, teamName: team.name };
}

// --- TAMBAHAN BARU: LOGIN GOOGLE BYPASS ---
export async function loginPlayerGoogle() {
  // Simulasi delay jaringan sebentar
  await new Promise(r => setTimeout(r, 800));

  // Buat Sesi Dummy (Development Mode)
  const devSession = {
    id: `P-DEV-${Date.now()}`,
    email: "atlet.dev@gmail.com",
    name: "Atlet Development", // Nama default
    role: "PLAYER",
    teamId: null, // Anggap belum punya tim
    isLoggedIn: true,
    provider: "GOOGLE_DEV"
  };

  // Set Cookie
  cookies().set('bcc_player_session', JSON.stringify(devSession), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 Hari
  });

  return { success: true };
}

// Update Helper Session
export async function getPlayerSession() {
  const session = cookies().get('bcc_player_session');
  if (!session) return null;
  try {
      return JSON.parse(session.value);
  } catch (e) {
      return null;
  }
}

export async function updatePlayerProfile(formData: FormData) {
  // 1. Ambil Session
  const cookieStore = cookies();
  const sessionStr = cookieStore.get('bcc_player_session')?.value;
  if (!sessionStr) return { success: false, message: "Sesi habis, silakan login ulang." };
  
  const session = JSON.parse(sessionStr);

  // 2. Parsing & Validasi Data
  const rawData = {
    fullName: session.name, // Nama biasanya dari login awal (Google/Email), atau bisa diupdate
    nik: formData.get('nik'),
    phone: formData.get('phone'),
    gender: formData.get('gender'),
    communityName: formData.get('communityName'),
    instagram: formData.get('instagram'),
    history: "Strip" // Default atau ambil dari form jika ada
  };

  const validated = athleteProfileSchema.safeParse(rawData);
  
  if (!validated.success) {
    const errorMsg = Object.values(validated.error.flatten().fieldErrors)[0]?.[0];
    return { success: false, message: errorMsg || "Data tidak valid" };
  }

  // 3. Simpan ke DB (Mocking Update)
  // Di real app: await db.player.update({ where: { email: session.email }, data: validated.data })
  
  // Update Session Cookie agar UI langsung berubah
  const updatedSession = { ...session, ...validated.data, isProfileComplete: true };
  cookieStore.set('bcc_player_session', JSON.stringify(updatedSession), {
    httpOnly: true, path: '/' 
  });

  revalidatePath('/player/dashboard');
  return { success: true, message: "Profil berhasil diperbarui."};
}
