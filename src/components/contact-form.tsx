'use client';

import { sendContactEmail } from '@/app/actions/contact';
import { useState } from 'react';

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const inputClass =
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors';

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setStatus('idle');

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            instansi: (form.elements.namedItem('instansi') as HTMLInputElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        };

        const result = await sendContactEmail(data);
        setIsLoading(false);

        if (result.success) {
            setStatus('success');
            form.reset();
        } else {
            setStatus('error');
            setErrorMsg(result.error || 'Terjadi kesalahan.');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium leading-none">Nama Lengkap <span className="text-primary">*</span></label>
                <input id="name" name="name" required className={inputClass} placeholder="Masukkan nama Anda" />
            </div>
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">Alamat Email <span className="text-primary">*</span></label>
                <input id="email" name="email" type="email" required className={inputClass} placeholder="email@contoh.com" />
            </div>
            <div className="space-y-2">
                <label htmlFor="instansi" className="text-sm font-medium leading-none">Instansi (Sekolah / Klub / Perusahaan)</label>
                <input id="instansi" name="instansi" className={inputClass} placeholder="Nama Instansi" />
            </div>
            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium leading-none">Pesan <span className="text-primary">*</span></label>
                <textarea id="message" name="message" required className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors" placeholder="Jelaskan kebutuhan atau pertanyaan Anda..." />
            </div>

            {status === 'success' && (
                <div className="rounded-md bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm font-medium">
                    ✓ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
                </div>
            )}
            {status === 'error' && (
                <div className="rounded-md bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm font-medium">
                    ✗ {errorMsg}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full mt-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
        </form>
    );
}
