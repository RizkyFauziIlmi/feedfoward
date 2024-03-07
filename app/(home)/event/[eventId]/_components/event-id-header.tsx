import { LiveBadge } from "@/components/badge/live-badge";
import { TimerLeftCounter } from "@/components/timer/timer-left-counter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "next-auth";
import { GiShoppingBag } from "react-icons/gi";

interface EventIdHeaderProps {
  user: User;
  isOnGoing: boolean;
  endDate: Date;
}

export const EventIdHeader = ({
  user,
  isOnGoing,
  endDate,
}: EventIdHeaderProps) => {
  return (
    <>
      <div className="p-6 flex justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            Time to order, {user.name}
          </h3>
          <TimerLeftCounter endDate={endDate} />
        </div>

        <div className="flex items-center gap-2">
          <Button size={"icon"} variant={"ghost"}>
            <GiShoppingBag className="w-5 h-5" />
          </Button>
          {isOnGoing && <LiveBadge />}
        </div>
      </div>
      <Separator />
    </>
  );
};
