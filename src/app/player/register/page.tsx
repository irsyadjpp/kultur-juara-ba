
'use client';

import { redirect } from 'next/navigation';

export default function RegisterRedirectPage() {
    // This page is deprecated. The registration flow now happens
    // after logging in and joining a team from the main player dashboard.
    // We redirect users to the login page as the new starting point.
    redirect('/player/login');
    return null;
}
