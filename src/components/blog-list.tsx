'use client';

import Link from 'next/link';
import { useState } from 'react';

// Define types locally to avoid importing fs-based modules in client components
interface PostMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    author?: string;
}

interface BlogListProps {
    articles: PostMeta[];
}

export function BlogList({ articles }: BlogListProps) {
    const categories = ['Semua', ...Array.from(new Set(articles.map((a) => a.category)))];
    const [active, setActive] = useState('Semua');

    const filtered = active === 'Semua' ? articles : articles.filter((a) => a.category === active);

    return (
        <>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActive(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors duration-200 ${active === cat
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-primary'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <p className="text-center text-muted-foreground">Belum ada artikel yang tersedia.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {filtered.map((article) => (
                        <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
                            <div className="rounded-xl border bg-card text-card-foreground shadow p-6 hover:border-primary/50 group-hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
                                            {article.category}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{article.date}</span>
                                    </div>
                                    <h2 className="text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                                        {article.title}
                                    </h2>
                                    {article.description && (
                                        <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
                                    )}
                                </div>
                                <p className="text-sm font-medium text-primary mt-4">Baca selengkapnya →</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}
