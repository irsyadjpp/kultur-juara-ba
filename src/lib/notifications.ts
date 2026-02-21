'use server';

import { initializeFirebase } from '@/firebase/index';
import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';

export type NotificationType =
    | 'verification_approved'
    | 'verification_rejected'
    | 'baseline_reminder'
    | 'draft_submitted'
    | 'system'
    | 'parent_update';

export type AppNotification = {
    id: string;
    recipientEmail: string;
    type: NotificationType;
    title: string;
    message: string;
    read: boolean;
    createdAt: Date;
};

function getDb() {
    const { firestore } = initializeFirebase();
    return firestore;
}

export async function createNotification({
    recipientEmail,
    type,
    title,
    message,
}: {
    recipientEmail: string;
    type: NotificationType;
    title: string;
    message: string;
}) {
    try {
        const db = getDb();
        await addDoc(collection(db, 'notifications'), {
            recipientEmail,
            type,
            title,
            message,
            read: false,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error creating notification:', error);
    }
}

export async function getNotifications(email: string): Promise<AppNotification[]> {
    try {
        const db = getDb();
        const q = query(
            collection(db, 'notifications'),
            where('recipientEmail', '==', email),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => {
            const data = d.data();
            return {
                id: d.id,
                recipientEmail: data.recipientEmail,
                type: data.type,
                title: data.title,
                message: data.message,
                read: data.read ?? false,
                createdAt: data.createdAt?.toDate?.() || new Date(),
            };
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
}

export async function markNotificationRead(notificationId: string) {
    try {
        const db = getDb();
        await updateDoc(doc(db, 'notifications', notificationId), { read: true });
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
}

export async function markAllNotificationsRead(email: string) {
    try {
        const db = getDb();
        const q = query(
            collection(db, 'notifications'),
            where('recipientEmail', '==', email),
            where('read', '==', false)
        );
        const snapshot = await getDocs(q);
        const updates = snapshot.docs.map(d => updateDoc(doc(db, 'notifications', d.id), { read: true }));
        await Promise.all(updates);
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
    }
}
