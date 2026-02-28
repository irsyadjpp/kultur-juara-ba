import { BlogList } from '@/components/blog-list';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getBlogs } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Wawasan | Kultur Juara Indonesia",
    description: "Artikel, inovasi terbaru, dan cerita pembinaan talenta dari Kultur Juara Indonesia.",
};

export default function BlogPage() {
    const articles = getBlogs();
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-24 md:py-32 max-w-5xl">
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">Wawasan &amp; Artikel</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Jelajahi pemikiran, inovasi terbaru, dan cerita dari garis depan pembinaan talenta serta digitalisasi pendidikan.
                    </p>
                </div>
                <BlogList articles={articles} />
            </main>
            <Footer />
        </div>
    );
}
