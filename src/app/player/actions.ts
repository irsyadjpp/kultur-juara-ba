
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
  { id: "TEAM-01", name: "PB Barudak Well", code: "BCC-WELL", manager: "Irsyad" },
  { id: "TEAM-02", name: "PB Tiento FC", code: "BCC-TINT", manager: "Rizal" }
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
  const cookieStore = cookies();
  const sessionStr = cookieStore.get('bcc_player_session')?.value;
  if (!sessionStr) return { success: false, message: "Sesi habis, silakan login ulang." };
  
  const session = JSON.parse(sessionStr);

  const rawData = {
    nik: formData.get('nik'),
    phone: formData.get('phone'),
    gender: formData.get('gender'),
    communityName: formData.get('communityName'),
    instagram: formData.get('instagram'),
    history: formData.get('history'),
  };

  const validated = athleteProfileSchema.safeParse(rawData);
  
  if (!validated.success) {
    const errorMsg = Object.values(validated.error.flatten().fieldErrors)[0]?.[0];
    return { success: false, message: errorMsg || "Data tidak valid. Mohon periksa NIK, WA, dan IG Anda." };
  }

  // SIMULASI UPDATE DB DAN SESI
  const updates = validated.data;
  const updatedSession = { 
    ...session, 
    ...updates, 
    isProfileComplete: true, 
    tpfStatus: 'PENDING' // Status TPF default setelah data diisi
  };
  
  cookieStore.set('bcc_player_session', JSON.stringify(updatedSession), {
    httpOnly: true, path: '/' 
  });

  revalidatePath('/player/dashboard');
  return { success: true, message: "Profil berhasil diperbarui. Status TPF Anda segera diproses." };
}


export async function joinTeam(teamCode: string) {
  const team = TEAMS_DB.find(t => t.code === teamCode);
  if (!team) {
    return { success: false, message: "Kode Tim tidak valid/tidak ditemukan." };
  }

  const cookieStore = cookies();
  const sessionStr = cookieStore.get('bcc_player_session')?.value;
  if (!sessionStr) return { success: false, message: "Sesi habis." };
  
  const session = JSON.parse(sessionStr);

  // LOGIC: Atlet sudah diverifikasi (di real app cek status tpfStatus)
  // Untuk simulasi, kita buat agar bisa join meskipun pending
  if (session.tpfStatus !== 'VERIFIED' && session.role !== 'MANAGER' && session.tpfStatus !== 'PENDING') {
    return { success: false, message: "Profil Anda masih menunggu verifikasi TPF." };
  }

  // SIMULASI UPDATE SESSION
  const updatedSession = { 
    ...session, 
    teamId: team.id, 
    teamName: team.name, 
    isMember: true 
  };
  
  cookieStore.set('bcc_player_session', JSON.stringify(updatedSession), {
    httpOnly: true, path: '/' 
  });
  
  revalidatePath('/player/dashboard');
  return { success: true, teamName: team.name };
}
