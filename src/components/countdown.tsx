"use client";

import { useState, useEffect } from 'react';
import { differenceInDays } from 'date-fns';

type CountdownProps = {
  targetDate: string;
};

export function Countdown({ targetDate }: CountdownProps) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const target = new Date(targetDate);
      const now = new Date();
      const diff = differenceInDays(target, now);
      setDaysLeft(Math.max(0, diff));
    };

    calculateDaysLeft();
    // Optional: set up an interval if you want it to update without a refresh (e.g., if the user keeps the page open for days)
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60 * 24); // Update once a day

    return () => clearInterval(interval);
  }, [targetDate]);

  if (daysLeft === null) {
    return <span className="text-3xl md:text-4xl font-bold font-headline">--</span>;
  }

  return <span className="text-3xl md:text-4xl font-bold font-headline">{daysLeft}</span>;
}
