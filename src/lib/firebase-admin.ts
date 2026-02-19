import { App, applicationDefault, cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : undefined;

let app: App;

if (!getApps().length) {
    app = initializeApp({
        credential: serviceAccount ? cert(serviceAccount) : applicationDefault(),
        projectId: 'kultur-juara-ba-59925955-1dbff',
        storageBucket: 'kultur-juara-ba-59925955-1dbff.firebasestorage.app'
    });
} else {
    app = getApp();
}

export const adminDb = getFirestore(app);
export const adminStorage = getStorage(app).bucket();
