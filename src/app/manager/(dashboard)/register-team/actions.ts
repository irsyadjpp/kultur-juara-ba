
'use server';

import { revalidatePath } from "next/cache";

export async function registerTeamEntity(formData: FormData) {
  // Simulasi Delay Database
  await new Promise(r => setTimeout(r, 1000));

  const teamName = formData.get('name') as string;
  const origin = formData.get('origin');
  
  // LOGIC BARU: Generate Kode Tim dari Nama Tim
  // Ambil 4 karakter pertama, ubah ke uppercase, hapus spasi, lalu tambahkan -2026
  const teamCodePrefix = teamName.replace(/\s+/g, '').substring(0, 4).toUpperCase();
  const teamCode = `${teamCodePrefix}-2026`;


  // Simpan ke Database Tim
  const newTeam = {
    id: `TEAM-${Date.now()}`,
    name: teamName,
    origin: origin,
    code: teamCode,
    manager: formData.get('managerName'),
    jersey: {
        home: formData.get('jerseyHome'),
        away: formData.get('jerseyAway')
    },
    members: [] // Masih kosong, nanti pemain join sendiri
  };

  // TODO: Insert 'newTeam' to Database
  console.log("Team Registered:", newTeam);

  return { success: true, teamCode: teamCode };
}
