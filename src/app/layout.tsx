
import { BackToTop } from '@/components/back-to-top';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

import type { Metadata, Viewport } from 'next';
import './globals.css';

import { Inter, Outfit } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
});

export const metadata: Metadata = {
    // ... keeping existing metadata intact by targeting strictly the changed areas ...
    title: 'Kultur Juara Indonesia — Ekosistem Sport-Tech & Edutech',
    description: 'Ekosistem terintegrasi yang memadukan pembinaan karakter berbasis olahraga dan inovasi teknologi pendidikan untuk mencetak talenta masa depan Indonesia.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://kulturjuara.org'),
    openGraph: {
        title: 'Kultur Juara Indonesia',
        description: 'Ekosistem terintegrasi yang memadukan pembinaan karakter berbasis olahraga dan inovasi teknologi pendidikan untuk mencetak talenta masa depan Indonesia.',
        url: 'https://kulturjuara.org',
        siteName: 'Kultur Juara Indonesia',
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kultur Juara Indonesia',
        description: 'Ekosistem terintegrasi yang memadukan pembinaan karakter berbasis olahraga dan inovasi teknologi pendidikan untuk mencetak talenta masa depan Indonesia.',
    },
};

export const viewport: Viewport = {
    themeColor: "#ca1f3d", // Primary Red
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id" className="scroll-smooth" suppressHydrationWarning>
            <head>
                {/* next/font automatically handles preconnecting and loading fonts locally */}
            </head>
            <body className={`${inter.variable} ${outfit.variable} font-body antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <BackToTop />
                    <Toaster />
                </ThemeProvider>

                {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
                )}
                {process.env.NEXT_PUBLIC_GTM_ID && (
                    <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
                )}
            </body>
        </html>
    );
}
