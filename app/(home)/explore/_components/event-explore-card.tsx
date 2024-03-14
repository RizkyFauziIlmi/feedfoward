"use client";

import { LiveBadge } from "@/components/badge/live-badge";
import { OverBadge } from "@/components/badge/over-badge";
import Countdown from "@/components/timer/countdown-event";
import { checkEventDate, sortingEvents } from "@/lib/date";
import { Event } from "@prisma/client";
import { format } from "date-fns";
import { CiCalendar } from "react-icons/ci";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { BsBoxSeamFill } from "react-icons/bs";
import { useRouter, useSearchParams } from "next/navigation";
import { EventNotFound } from "../../organization/[organizationId]/_components/event-not-found";

interface EventExploreCardProps {
  events: Event[];
  isOwner: boolean;
}

export const EventExploreCard = ({
  events,
  isOwner,
}: EventExploreCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInput = searchParams.get("search");

  const highlightMatch = (text: string) => {
    if (!searchInput) return text;
    const regex = new RegExp(`(${searchInput})`, "gi");
    return text.split(regex).map((part, index) => {
      return regex.test(part) ? (
        <span key={index} className="bg-blue-500">
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  const sortedEvents = sortingEvents(events);
  
  return (
    <div className="shadow-lg px-4 py-6 rounded-lg bg-accent/50 flex flex-col gap-2 h-72 overflow-y-auto">
      <p className="text-md text-muted-foreground">Events</p>
      {events.length > 0 ? (
        sortedEvents.map((event) => {
          const { isOnGoing, notComeYet, isOver } = checkEventDate(
            event.startDate,
            event.endDate
          );
          return (
            <div className="flex flex-col gap-2" key={event.id}>
              <div
                key={event.id}
                className="border rounded-lg flex flex-col gap-2 p-4"
              >
                <p className="text-sm text-muted-foreground flex items-center">
                  <CiCalendar className="w-4 h-4 mr-2" />{" "}
                  {format(event.startDate, "LLL dd, y")} -{" "}
                  {format(event.endDate, "LLL dd, y")}
                </p>
                <div className="text-lg font-semibold">
                  {highlightMatch(event.name)}
                </div>
                <div className="flex justify-between">
                  {isOnGoing && !event.isOver ? (
                    <LiveBadge />
                  ) : isOver || event.isOver ? (
                    <OverBadge />
                  ) : notComeYet ? (
                    <Countdown startDate={event.startDate} />
                  ) : null}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {isOwner ? (
                          <Button
                            size={"icon"}
                            onClick={() => router.push(`/event/${event.id}`)}
                          >
                            <CiCalendar className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            disabled={notComeYet || isOver || event.isOver}
                            size={"icon"}
                            onClick={() => router.push(`/event/${event.id}`)}
                          >
                            <BsBoxSeamFill className="w-4 h-4" />
                          </Button>
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isOwner ? "See Event" : "Booking Item Now"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center h-full">
          <EventNotFound isOwner={isOwner} className="my-0" />
        </div>
      )}
    </div>
  );
};
