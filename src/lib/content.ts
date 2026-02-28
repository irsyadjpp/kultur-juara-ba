import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';

// ─── Types ────────────────────────────────────────────────────
export interface PostMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    author?: string;
    cover?: string;
}

export interface Post extends PostMeta {
    content: string; // rendered HTML
}

// ─── Blog ─────────────────────────────────────────────────────
const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export function getBlogs(): PostMeta[] {
    if (!fs.existsSync(BLOG_DIR)) return [];
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
    return files
        .map((filename) => {
            const slug = filename.replace('.md', '');
            const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
            const { data } = matter(raw);
            return { slug, ...(data as Omit<PostMeta, 'slug'>) };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogBySlug(slug: string): Post | null {
    const filePath = path.join(BLOG_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return {
        slug,
        ...(data as Omit<PostMeta, 'slug'>),
        content: marked(content) as string,
    };
}

// ─── Cases ────────────────────────────────────────────────────
const CASES_DIR = path.join(process.cwd(), 'src/content/cases');

export function getCases(): PostMeta[] {
    if (!fs.existsSync(CASES_DIR)) return [];
    const files = fs.readdirSync(CASES_DIR).filter((f) => f.endsWith('.md'));
    return files
        .map((filename) => {
            const slug = filename.replace('.md', '');
            const raw = fs.readFileSync(path.join(CASES_DIR, filename), 'utf-8');
            const { data } = matter(raw);
            return { slug, ...(data as Omit<PostMeta, 'slug'>) };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCaseBySlug(slug: string): Post | null {
    const filePath = path.join(CASES_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return {
        slug,
        ...(data as Omit<PostMeta, 'slug'>),
        content: marked(content) as string,
    };
}
