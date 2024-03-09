import Image from "next/image";
import { FaHotel, FaUsers } from "react-icons/fa";
import { IoMdRestaurant } from "react-icons/io";
import { MdOutlineCalendarToday, MdOutlineRemoveRedEye } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { convertUsernameToAvatarFallback } from "@/lib/string";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { OrganizationWithUserInfoAndEventsCount } from "@/types";

interface OrganizationCardProps {
  organization: OrganizationWithUserInfoAndEventsCount;
}

const iconMap: Record<string, JSX.Element> = {
  PERSONAL: <FaUsers className="w-4 h-4 ml-2" />,
  RESTAURANT: <IoMdRestaurant className="w-4 h-4 ml-2" />,
  HOTEL: <FaHotel className="w-4 h-4 ml-2" />,
};

export const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  return (
    <Link
      href={`/organization/${organization.id}`}
      className="cursor-pointer group"
    >
      <div className="bg-secondary rounded-lg overflow-hidden w-full h-full">
        <Image
          src={
            organization.imageUrl ?? "https://fakeimg.pl/600x400?text=preview"
          }
          alt={organization.imageUrl}
          className="w-full min-h-36 max-h-36 object-cover group-hover:scale-110 transition-all"
          width={300}
          height={300}
        />
        <div className="p-3 flex flex-col justify-between relative">
          <Avatar className="rounded-md border-secondary border-2 absolute -top-4 left-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <AvatarImage src={organization.user.image ?? ""} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{organization.user.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <AvatarFallback className="rounded-none">
              {convertUsernameToAvatarFallback(organization.user.name ?? "")}
            </AvatarFallback>
          </Avatar>

          <div className={cn(organization.user.image && "mt-4", "h-6")}>
            <div className="flex items-center">
              <p className="text-md font-extrabold">{organization.name}</p>
              {iconMap[organization.type]}
            </div>
            {organization.address && (
              <div className="flex items-center">
                <CiLocationOn className="h-4 w-4 mr-2" />
                <p className="text-xs font-semibold line-clamp-1">
                  {organization.address}
                </p>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-6 text-ellipsis overflow-hidden h-8">
            {organization.description}
          </p>
          <div className="flex items-center mt-4 gap-2 text-xs text-muted-foreground">
            <p className="line-clamp-1 flex items-center">
              {organization.events.length}
              <MdOutlineCalendarToday className="ml-1" />
            </p>
            <span>•</span>
            <p className="line-clamp-1 flex items-center">
              {(Math.floor(Math.random() * 100) + 1).toFixed(0)}{" "}
              <MdOutlineRemoveRedEye className="ml-1" />
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
