
'use server';

import { athleteRegistrationSchema } from "@/lib/schemas/athlete";

// Mock Database (In-Memory Array)
const MOCK_ATHLETE_DB: any[] = [];

export async function registerAthlete(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  const validatedFields = athleteRegistrationSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Validation failed", validatedFields.error.flatten().fieldErrors);
    return { success: false, message: "Data tidak valid. Mohon periksa kembali isian Anda." };
  }

  // Simulasi proses penyimpanan ke database
  await new Promise(r => setTimeout(r, 1500));

  const newAthlete = {
    id: `ATH-${Date.now().toString().slice(-6)}`,
    ...validatedFields.data,
  };

  MOCK_ATHLETE_DB.push(newAthlete);
  console.log("New Athlete Registered:", newAthlete);
  console.log("Current Athlete DB:", MOCK_ATHLETE_DB);

  return { success: true, message: `Atlet "${validatedFields.data.fullName}" berhasil didaftarkan.` };
}
