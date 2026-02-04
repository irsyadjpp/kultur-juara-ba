'use server';

export async function triggerSOS(type: string, location: string) {
  console.log(`SOS TRIGGERED: ${type} at ${location}`);
  // In a real app, this would send notifications/SMS/Email
  return { success: true };
}
