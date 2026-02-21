
"use client";

import { getSession } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getNotifications, markAllNotificationsRead, markNotificationRead, type AppNotification } from "@/lib/notifications";
import { Bell, Info, Loader2, ShieldCheck, ShieldX, Trophy, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

const ICON_MAP: Record<string, any> = {
    verification_approved: ShieldCheck,
    verification_rejected: ShieldX,
    baseline_reminder: Bell,
    draft_submitted: Info,
    system: Info,
    parent_update: Trophy,
    payment: Wallet,
};

const COLOR_MAP: Record<string, string> = {
    verification_approved: "bg-green-500",
    verification_rejected: "bg-red-500",
    baseline_reminder: "bg-yellow-500",
    draft_submitted: "bg-blue-500",
    system: "bg-primary",
    parent_update: "bg-violet-500",
};

function timeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
}

export default function NotificationPage() {
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const load = async () => {
            const session = await getSession();
            if (session?.email) {
                setEmail(session.email);
                const data = await getNotifications(session.email);
                setNotifications(data);
            }
            setIsLoading(false);
        };
        load();
    }, []);

    const handleMarkRead = async (id: string) => {
        await markNotificationRead(id);
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleMarkAllRead = async () => {
        await markAllNotificationsRead(email);
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;
    const todayNotifs = notifications.filter(n => {
        const diffHrs = (Date.now() - n.createdAt.getTime()) / (1000 * 60 * 60);
        return diffHrs < 24;
    });
    const earlierNotifs = notifications.filter(n => {
        const diffHrs = (Date.now() - n.createdAt.getTime()) / (1000 * 60 * 60);
        return diffHrs >= 24;
    });

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    const NotifCard = ({ notif }: { notif: AppNotification }) => {
        const IconComp = ICON_MAP[notif.type] || Info;
        const color = COLOR_MAP[notif.type] || "bg-primary";

        return (
            <div
                onClick={() => !notif.read && handleMarkRead(notif.id)}
                className={`group flex gap-4 p-4 rounded-3xl transition-all duration-300 relative overflow-hidden cursor-pointer ${notif.read ? "bg-card/50 opacity-60 hover:opacity-100" : "bg-card shadow-m3-1 border-l-4 border-primary"
                    }`}
            >
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${notif.read ? 'bg-secondary text-muted-foreground' : `${color} text-white`}`}>
                    <IconComp size={20} />
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className={`text-sm ${notif.read ? 'font-medium opacity-80' : 'font-bold'}`}>{notif.title}</h3>
                        <span className="text-[10px] text-muted-foreground font-mono">{timeAgo(notif.createdAt)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {notif.message}
                    </p>
                </div>

                {!notif.read && (
                    <div className="self-center">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background pb-6 pt-6 flex flex-col h-screen">
            <div className="px-6 mb-2 flex justify-between items-center shrink-0">
                <h1 className="font-headline text-2xl">INBOX <span className="text-primary text-2xl">•</span>
                    {unreadCount > 0 && <span className="ml-2 text-sm bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-mono">{unreadCount}</span>}
                </h1>
                <Button variant="ghost" size="sm" className="text-xs font-bold text-muted-foreground" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
                    Mark all as read
                </Button>
            </div>

            <ScrollArea className="flex-1 px-4">
                <div className="space-y-4 pb-24">
                    {notifications.length === 0 ? (
                        <div className="text-center py-20">
                            <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" />
                            <p className="text-muted-foreground font-bold">Belum ada notifikasi</p>
                        </div>
                    ) : (
                        <>
                            {todayNotifs.length > 0 && (
                                <>
                                    <p className="text-xs font-bold text-muted-foreground px-2 mt-4 mb-2">HARI INI</p>
                                    {todayNotifs.map(n => <NotifCard key={n.id} notif={n} />)}
                                </>
                            )}

                            {earlierNotifs.length > 0 && (
                                <>
                                    <p className="text-xs font-bold text-muted-foreground px-2 mt-8 mb-2">SEBELUMNYA</p>
                                    {earlierNotifs.map(n => <NotifCard key={n.id} notif={n} />)}
                                </>
                            )}
                        </>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
