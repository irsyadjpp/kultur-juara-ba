'use client';

import { sendGAEvent } from '@next/third-parties/google';

export function ContactSubmitButton() {
    const handleClick = () => {
        sendGAEvent('event', 'contact_form_click', {
            event_category: 'engagement',
            event_label: 'Mailto Click',
        });
    };

    return (
        <a
            href="mailto:info@kulturjuara.org"
            onClick={handleClick}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full mt-2 transition-colors"
        >
            Kirim Pesan
        </a>
    );
}
