
import { BackToTop } from '@/components/back-to-top';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Kultur Juara Indonesia — Ekosistem Sport-Tech & Edutech',
    description: 'Ekosistem terintegrasi yang memadukan pembinaan karakter berbasis olahraga dan inovasi teknologi pendidikan untuk mencetak talenta masa depan Indonesia.',
    icons: {
        icon: [
            { url: '/favicon/favicon.ico' },
            { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [
            { url: '/favicon/apple-touch-icon.png' },
        ],
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://kulturjuara.org'),
    openGraph: {
        title: 'Kultur Juara Indonesia',
        description: 'Ekosistem terintegrasi yang memadukan pembinaan karakter berbasis olahraga dan inovasi teknologi pendidikan untuk mencetak talenta masa depan Indonesia.',
        url: 'https://kulturjuara.org',
        siteName: 'Kultur Juara Indonesia',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Kultur Juara Indonesia Ecosystem',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kultur Juara Indonesia',
        description: 'Ekosistem terintegrasi yang memadukan pembinaan karakter berbasis olahraga dan inovasi teknologi pendidikan untuk mencetak talenta masa depan Indonesia.',
        images: ['/images/og-image.jpg'],
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
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet" />
            </head>
            <body className="font-body antialiased">
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
                <Analytics />
                <SpeedInsights />
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX"} />
            </body>
        </html>
    );
}
