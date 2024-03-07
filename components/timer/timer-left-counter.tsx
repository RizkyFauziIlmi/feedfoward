"use client";

import { useEffect, useState } from "react";
import {
  differenceInSeconds,
  formatDuration,
  intervalToDuration,
} from "date-fns";
import { GoDotFill } from "react-icons/go";

interface TimerLeftCounterProps {
  endDate: Date;
}

export const TimerLeftCounter = ({ endDate }: TimerLeftCounterProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = differenceInSeconds(endDate, now);
      if (difference > 0) {
        const duration = intervalToDuration({ start: now, end: endDate });
        const formattedDuration = formatDuration(duration);
        setTimeLeft(formattedDuration);
      } else {
        setTimeLeft("Event has ended");
      }
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, [endDate]);

  return (
    <div className="text-xs text-muted-foreground font-semibold">{timeLeft}</div>
  );
};
