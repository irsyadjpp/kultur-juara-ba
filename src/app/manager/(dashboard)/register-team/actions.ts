
'use server';

import { teamRegistrationSchema, TeamRegistrationFormValues } from "@/lib/schemas/registration";
import { generateUniqueCode } from "@/lib/game-logic";

export async function registerTeamEntity(prevState: any, formData: FormData): Promise<{ success: boolean; teamCode: string | null; }> {
  const data = Object.fromEntries(formData);
  const validatedFields = teamRegistrationSchema.safeParse(data);
  
  if (!validatedFields.success) {
    console.error("Validation failed", validatedFields.error.flatten().fieldErrors);
    return { success: false, teamCode: null };
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  const teamCode = generateUniqueCode("COM");
  console.log("New Team Registered:", { ...validatedFields.data, teamCode });
  
  return { success: true, teamCode };
}

    