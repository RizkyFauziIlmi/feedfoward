"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "../ui/badge";

interface CountdownProps {
  startDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ startDate }) => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(formatDistanceToNow(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return <Badge className="text-xs">Upcoming: {remainingTime}</Badge>;
};

export default Countdown;
