import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

function getSdks(firebaseApp: FirebaseApp) {
  return {
    firestore: getFirestore(firebaseApp)
  };
}

// Separate server-side initialization
export function initializeFirebaseServer() {
  // Check if there are any initialized apps
  if (!getApps().length) {
    let firebaseApp;
    try {
      // This is for Firebase App Hosting, which automatically provides env vars.
      firebaseApp = initializeApp();
    } catch (e) {
      // This is the fallback for local development or other hosting environments.
      if (process.env.NODE_ENV === "production") {
        console.warn('Automatic Firebase initialization failed. Falling back to firebase config object.', e);
      }
      firebaseApp = initializeApp(firebaseConfig);
    }
    return getSdks(firebaseApp);
  }
  
  // If already initialized, return the SDKs with the existing app instance.
  return getSdks(getApp());
}
