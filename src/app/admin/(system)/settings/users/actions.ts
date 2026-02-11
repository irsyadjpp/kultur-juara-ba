
'use server';

import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { revalidatePath } from 'next/cache';

import { getSession } from '@/app/actions';

// Simplified for now. A real app might use zod for validation.
export async function inviteUser(userData: { name: string; email: string; role: string; dept: string; }) {
  const session = await getSession();
  if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.role)) {
    return { success: false, message: "Unauthorized. Access denied." };
  }

  if (!userData.name || !userData.email || !userData.role || !userData.dept) {
    return { success: false, message: "All fields are required." };
  }

  try {
    const { firestore } = initializeFirebase();
    const usersCollection = collection(firestore, 'users');
    await addDoc(usersCollection, {
      ...userData,
      status: 'ACTIVE', // Default status
      avatar: '', // Default avatar
      lastActive: 'Invited',
    });
    revalidatePath('/admin/settings/users');
    return { success: true, message: 'User successfully invited.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateUser(userId: string, data: Partial<{ role: string; dept: string; status: string; }>) {
  const session = await getSession();
  if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.role)) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const { firestore } = initializeFirebase();
    const userDoc = doc(firestore, 'users', userId);
    await updateDoc(userDoc, data);
    revalidatePath('/admin/settings/users');
    return { success: true, message: 'User updated.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteUser(userId: string) {
  const session = await getSession();
  if (!session || !['SUPER_ADMIN'].includes(session.role)) { // Only Super Admin can delete
    return { success: false, message: "Unauthorized. Only Super Admin can delete users." };
  }

  try {
    const { firestore } = initializeFirebase();
    await deleteDoc(doc(firestore, 'users', userId));
    revalidatePath('/admin/settings/users');
    return { success: true, message: "User has been removed." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
