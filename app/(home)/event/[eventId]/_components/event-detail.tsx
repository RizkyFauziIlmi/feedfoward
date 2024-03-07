import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { convertUsernameToAvatarFallback } from "@/lib/string";
import { EventWithOrgIdAndItems } from "@/types";
import { ItemType } from "@prisma/client";
import { PiBowlFood } from "react-icons/pi";
import { GiWaterBottle } from "react-icons/gi";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { FaMapLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { BsQrCodeScan } from "react-icons/bs";
import { QrDrawer } from "@/components/drawer/qr-drawer";

interface EventDetailProps {
  event: EventWithOrgIdAndItems;
}

export const EventDetail = ({ event }: EventDetailProps) => {
  return (
    <div className="p-6">
      <div className="shadow-lg py-6 flex items-center justify-between rounded-md bg-accent/40 px-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={event.imageUrl ?? ""} alt={event.id} />
            <AvatarFallback>
              {convertUsernameToAvatarFallback(event.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="flex items-center gap-1 text-md font-semibold">
              {event.name}
            </p>
            <div className="flex gap-3 items-center">
              <p className="flex items-center gap-1 text-xs">
                <PiBowlFood />
                {
                  event.items.filter((item) => item.type === ItemType.FOOD)
                    .length
                }{" "}
                Foods
              </p>
              <p className="flex items-center gap-1 text-xs">
                <GiWaterBottle />
                {
                  event.items.filter((item) => item.type === ItemType.DRINK)
                    .length
                }{" "}
                Drinks
              </p>
              <p className="flex items-center gap-1 text-xs">
                <HiOutlineWrenchScrewdriver />
                {
                  event.items.filter((item) => item.type === ItemType.OTHER)
                    .length
                }{" "}
                Others
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={event.googleMapsUrl} target="_blank">
            <Button variant={"outline"}>
              <FaMapLocationDot className="h-4 w-4 mr-2" /> Go To Location Now
            </Button>
          </Link>
          <div>
            <p className="text-center font-bold text-xs">OR</p>
          </div>
          <QrDrawer googleMapsUrl={event.googleMapsUrl}>
            <Button variant={"outline"}>
              <BsQrCodeScan className="h-4 w-4 mr-2" /> Scan QRCode
            </Button>
          </QrDrawer>
        </div>
      </div>
    </div>
  );
};
