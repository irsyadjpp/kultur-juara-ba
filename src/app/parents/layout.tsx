import { getSession } from '@/app/actions';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Parent Portal — Kultur Juara BA',
};

export default async function ParentLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession();

    if (!session || !session.isLoggedIn) {
        redirect('/login');
    }

    if (session.role !== 'PARENT') {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Parent Header */}
            <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-black text-sm">
                            KJ
                        </div>
                        <div>
                            <h1 className="font-headline text-lg font-black uppercase tracking-tighter">Parent Portal</h1>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Kultur Juara Badminton Academy</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground font-bold">{session.name || session.email}</span>
                        <form action="/api/auth/logout" method="POST">
                            <button className="text-xs text-muted-foreground hover:text-foreground font-bold transition-colors">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
