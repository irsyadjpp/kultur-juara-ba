'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
    name: string;
    email: string;
    instansi: string;
    message: string;
}

export interface ContactResult {
    success: boolean;
    error?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<ContactResult> {
    if (!data.name || !data.email || !data.message) {
        return { success: false, error: 'Semua field wajib diisi.' };
    }

    try {
        await resend.emails.send({
            from: 'Website Kultur Juara <info@kulturjuara.org>',
            to: [process.env.CONTACT_EMAIL_TO || 'info@kulturjuara.org'],
            subject: `Pesan Baru dari ${data.name} — ${data.instansi || 'Individual'}`,
            html: `
        <h2>Pesan Masuk dari Website kulturjuara.org</h2>
        <table cellpadding="8" style="border-collapse:collapse;">
          <tr><td><strong>Nama</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Instansi</strong></td><td>${data.instansi || '-'}</td></tr>
        </table>
        <hr/>
        <h3>Pesan:</h3>
        <p style="white-space:pre-wrap;">${data.message}</p>
      `,
            replyTo: data.email,
        });
        return { success: true };
    } catch (err) {
        console.error('Resend error:', err);
        return { success: false, error: 'Gagal mengirim pesan. Coba lagi nanti.' };
    }
}
