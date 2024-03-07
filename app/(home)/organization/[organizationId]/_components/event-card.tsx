"use client";

import { BsBoxSeamFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Event } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { CiMap } from "react-icons/ci";
import { GoClock, GoClockFill, GoLocation } from "react-icons/go";
import QRCode from "react-qr-code";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { LiveBadge } from "@/components/badge/live-badge";
import { QrDrawer } from "@/components/drawer/qr-drawer";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const router = useRouter();

  const isOnGoing = event.startDate < new Date() && event.endDate > new Date();

  return (
    <div className="p-6 shadow-xl bg-accent rounded-xl flex justify-between">
      <div className="flex flex-col gap-4 w-2/4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight flex items-center gap-4">
          {event.name}
          {isOnGoing && <LiveBadge />}
        </h3>
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
              <GoClockFill /> Start Date
            </p>
            <p className="text-sm">
              {format(event.startDate, "EEEE, MMM dd yyyy")}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
              <GoClock /> Start Date
            </p>
            <p className="text-sm">
              {format(event.endDate, "EEEE, MMM dd yyyy")}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
            <GoLocation /> Address
          </p>
          <p className="text-sm">{event.address}</p>
        </div>
        <Button
          disabled={!isOnGoing}
          className="my-auto w-full"
          onClick={() => router.push(`/event/${event.id}`)}
        >
          <BsBoxSeamFill className="w-4 h-4 mr-2" /> Booking Item Now
        </Button>
      </div>
      <div className="inline-block h-[250px] min-h-[1em] w-px self-stretch bg-primary/50"></div>
      <div className="flex flex-col gap-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          See on Google Maps
        </h4>
        <div className="flex items-center gap-6">
          <p className="text-sm text-muted-foreground w-48">
            click button to see in google maps
          </p>
          <Link href={event.googleMapsUrl} target="_blank">
            <Button>
              <CiMap className="w-4 h-4 mr-2" /> Google Maps
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-full border-t-0 bg-primary/50"></div>
          <p className="text-center font-bold text-xs">OR</p>
          <div className="h-[1px] w-full border-t-0 bg-primary/50"></div>
        </div>
        <div className="flex items-center gap-6">
          <p className="text-sm text-muted-foreground w-48">
            Scan QR with your phone and you will see the location of the event
          </p>
          <QrDrawer googleMapsUrl={event.googleMapsUrl}>
            <QRCode
              value={event.googleMapsUrl}
              size={100}
              className="cursor-pointer"
            />
          </QrDrawer>
        </div>
      </div>
    </div>
  );
};