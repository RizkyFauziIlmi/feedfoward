"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface CountdownProps {
  isBadge?: boolean;
  className?: string;
  startDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({
  className,
  startDate,
  isBadge = true,
}) => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(formatDistanceToNow(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  if (isBadge) {
    return (
      <Badge className={cn(className, "text-xs")}>
        Upcoming: {remainingTime}
      </Badge>
    );
  } else {
    return <span className={className}>{remainingTime}</span>;
  }
};

export default Countdown;
