
'use client';

import { useState, useEffect } from 'react';
import { Bell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { getNotifications, markAsRead, type NotificationItem } from '@/app/admin/notifications/actions';

export function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Load Data
  useEffect(() => {
    getNotifications().then(data => {
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    });
  }, []);

  // Handler Click Item
  const handleRead = async (id: string) => {
    await markAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-background animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 bg-card border shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-bold text-sm">Notifikasi</h4>
          {unreadCount > 0 && <Badge variant="secondary" className="text-xs">{unreadCount} Baru</Badge>}
        </div>

        {/* List */}
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-xs">Tidak ada notifikasi baru.</div>
          ) : (
            <div className="divide-y">
              {notifications.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 hover:bg-secondary/50 transition-colors cursor-pointer ${!item.read ? 'bg-secondary/30' : ''}`}
                  onClick={() => handleRead(item.id)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                        {item.type === 'CRITICAL' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>}
                        {item.type === 'INFO' && <span className="w-2 h-2 rounded-full bg-blue-500"/>}
                        {item.type === 'SUCCESS' && <span className="w-2 h-2 rounded-full bg-green-500"/>}
                        <span className={`text-sm font-bold ${!item.read ? 'text-foreground' : 'text-muted-foreground'}`}>{item.title}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.message}</p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="p-2 border-t bg-background/50">
            <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground h-8">
                Tandai semua sudah dibaca
            </Button>
        </div>

      </PopoverContent>
    </Popover>
  );
}
