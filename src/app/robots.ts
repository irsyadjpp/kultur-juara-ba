import { MetadataRoute } from 'next';

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL || 'https://kulturjuara.org';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/'],
        },
        sitemap: `${DOMAIN}/sitemap.xml`,
    };
}
