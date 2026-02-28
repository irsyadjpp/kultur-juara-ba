import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getCaseBySlug, getCases } from '@/lib/content';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getCaseBySlug(slug);
    if (!post) return {};
    return {
        title: `${post.title} | Studi Kasus Kultur Juara`,
        description: post.description,
    };
}

export async function generateStaticParams() {
    const cases = getCases();
    return cases.map((c) => ({ slug: c.slug }));
}

export default async function CaseDetailPage({ params }: Props) {
    const { slug } = await params;
    const post = getCaseBySlug(slug);
    if (!post) notFound();

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-24 md:py-32 max-w-3xl">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm text-muted-foreground">
                    <Link href="/cases" className="hover:text-primary transition-colors">← Kembali ke Studi Kasus</Link>
                </nav>

                {/* Header */}
                <header className="mb-10 space-y-4">
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary border-primary/20">
                            {post.category}
                        </span>
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black font-headline leading-tight">{post.title}</h1>
                    <p className="text-lg text-muted-foreground">{post.description}</p>
                </header>

                {/* Content */}
                <article
                    className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-headline prose-headings:font-black prose-a:text-primary prose-strong:text-foreground prose-table:text-sm"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </main>
            <Footer />
        </div>
    );
}
