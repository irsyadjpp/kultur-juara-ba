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
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="background-color: #7c3aed; padding: 24px; color: white;">
                <h2 style="margin: 0; font-size: 20px;">Pesan Baru dari Website</h2>
                <p style="margin: 4px 0 0 0; opacity: 0.8; font-size: 14px;">kulturjuara.org</p>
            </div>
            
            <div style="padding: 24px; background-color: white;">
                <table cellpadding="8" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                    <tr style="border-bottom: 1px solid #f3f4f6;">
                        <td style="width: 120px; color: #6b7280; font-size: 14px;">Nama</td>
                        <td style="font-weight: bold; color: #111827;">${data.name}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f3f4f6;">
                        <td style="color: #6b7280; font-size: 14px;">Email</td>
                        <td style="font-weight: bold; color: #111827;">${data.email}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f3f4f6;">
                        <td style="color: #6b7280; font-size: 14px;">Instansi</td>
                        <td style="font-weight: bold; color: #111827;">${data.instansi || '-'}</td>
                    </tr>
                </table>
                
                <h3 style="font-size: 16px; color: #374151; margin-bottom: 12px; border-left: 4px solid #7c3aed; padding-left: 12px;">Pesan Konsultasi:</h3>
                <div style="color: #4b5563; line-height: 1.6; background-color: #f9fafb; padding: 20px; border-radius: 8px;">
                    ${data.message}
                </div>
            </div>
            
            <div style="background-color: #f3f4f6; padding: 16px; text-align: center; color: #9ca3af; font-size: 12px;">
                &copy; 2026 Kultur Juara Indonesia. Sistem Notifikasi Otomatis.
            </div>
        </div>
      `,
            replyTo: data.email,
        });
        return { success: true };
    } catch (err) {
        console.error('Resend error:', err);
        return { success: false, error: 'Gagal mengirim pesan. Coba lagi nanti.' };
    }
}
