'use server';

// The seedAthletes function has been moved to a client-side handler
// in roster/page.tsx to correctly use the authenticated user's context
// for Firestore writes, resolving the "permission denied" error.
// This file is reserved for any future server actions related to this page.
