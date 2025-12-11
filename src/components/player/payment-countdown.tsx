'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export function PaymentCountdown({ deadline }: { deadline: Date }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(deadline).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft("EXPIRED");
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}j ${minutes}m ${seconds}d`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  if (timeLeft === "EXPIRED") return <span className="text-destructive font-bold">Waktu Habis</span>;

  return (
    <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-bold font-mono">
      <Clock className="w-4 h-4 animate-pulse" />
      {timeLeft}
    </div>
  );
}