import { MetadataRoute } from 'next';

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL || 'https://kulturjuara.org';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/about',
        '/solutions',
        '/cases',
        '/blog',
        '/gallery',
        '/contact',
    ];

    return routes.map((route) => ({
        url: `${DOMAIN}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
    }));
}
