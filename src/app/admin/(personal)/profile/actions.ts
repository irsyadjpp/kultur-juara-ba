'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Mock function untuk update profile
export async function updateProfile(prevState: any, formData: FormData) {
  const session = (await cookies()).get('kultur_juara_session');
  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  // Simulasi delay network
  await new Promise(resolve => setTimeout(resolve, 1500));

  const rawData = {
    nickname: formData.get('nickname'),
    phone: formData.get('phone'),
    instagram: formData.get('instagram'),
    shirtSize: formData.get('shirtSize'),
    address: formData.get('address'),
    // File handling would go here (upload to storage bucket)
    // const avatar = formData.get('avatar') as File;
    // const signature = formData.get('signature') as File;
  };

  console.log("Updated Profile Data:", rawData);

  return {
    success: true,
    message: "Profil berhasil diperbarui! Perubahan akan segera terlihat."
  };
}
