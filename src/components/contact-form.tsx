'use client';

import { sendContactEmail } from '@/app/actions/contact';
import { useState } from 'react';
import { TiptapEditor } from './tiptap-editor';

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [message, setMessage] = useState('');

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
            message,
        };

        if (!message || message === '<p></p>') {
            setIsLoading(false);
            setStatus('error');
            setErrorMsg('Pesan tidak boleh kosong.');
            return;
        }

        const result = await sendContactEmail(data);
        setIsLoading(false);

        if (result.success) {
            setStatus('success');
            form.reset();
            setMessage('');
        } else {
            setStatus('error');
            setErrorMsg(result.error || 'Terjadi kesalahan.');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold leading-none">
                        Nama Lengkap <span className="text-primary">*</span>
                    </label>
                    <input id="name" name="name" required className={inputClass} placeholder="Masukkan nama Anda" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold leading-none">
                        Alamat Email <span className="text-primary">*</span>
                    </label>
                    <input id="email" name="email" type="email" required className={inputClass} placeholder="email@contoh.com" />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="instansi" className="text-sm font-bold leading-none">
                    Instansi <span className="text-muted-foreground text-xs font-normal">(Sekolah / Klub / Perusahaan)</span>
                </label>
                <input id="instansi" name="instansi" className={inputClass} placeholder="Nama Instansi" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold leading-none">
                    Pesan <span className="text-primary">*</span>{' '}
                    <span className="text-muted-foreground text-xs font-normal">— format teks tersedia</span>
                </label>
                <TiptapEditor content={message} onChange={setMessage} />
            </div>

            {status === 'success' && (
                <div className="rounded-xl bg-green-50 border border-green-200 text-green-800 px-6 py-4 text-sm font-bold shadow-sm">
                    ✓ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
                </div>
            )}
            {status === 'error' && (
                <div className="rounded-xl bg-red-50 border border-red-200 text-red-800 px-6 py-4 text-sm font-bold shadow-sm">
                    ✗ {errorMsg}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-xl text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 w-full transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed group"
            >
                {isLoading ? (
                    'Mengirim...'
                ) : (
                    <>
                        Kirim Pesan Sekarang <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </>
                )}
            </button>
        </form>
    );
}
