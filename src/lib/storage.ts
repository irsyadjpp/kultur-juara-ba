import { initializeFirebase } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadFile(file: File, path: string): Promise<string> {
  const { storage } = initializeFirebase();
  const uniqueId = Math.random().toString(36).substring(2, 15);
  const extension = file.name.split('.').pop();
  const fullPath = `${path}/${uniqueId}.${extension}`;

  const storageRef = ref(storage, fullPath);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
