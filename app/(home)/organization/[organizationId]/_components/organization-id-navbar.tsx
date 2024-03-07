import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { convertUsernameToAvatarFallback } from "@/lib/string";
import { OrganizationWithUserInfoAndEvents } from "@/types";
import { OrganizationType } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr";

interface OrganizationIdNavbarProps {
  isOwner: boolean;
  organization: OrganizationWithUserInfoAndEvents;
}

const badgeMap: Record<OrganizationType, JSX.Element> = {
  PERSONAL: <Badge className="w-fit h-fit">Personal</Badge>,
  RESTAURANT: <Badge className="w-fit h-fit">Restaurant</Badge>,
  HOTEL: <Badge className="w-fit h-fit">Hotel</Badge>,
};

export const OrganizationIdNavbar = ({
  isOwner,
  organization,
}: OrganizationIdNavbarProps) => {
  return (
    <div className="p-6 bg-secondary flex items-start gap-4">
      <Image
        src={organization.imageUrl ?? ""}
        alt={organization.imageUrl ?? ""}
        width={300}
        height={300}
        className="h-48 w-48 rounded-lg object-cover"
      />
      <div>
        <h3 className="text-2xl flex items-center gap-2">
          {organization.name} {badgeMap[organization.type]}
        </h3>
        <p className="mb-4 mt-2 text-pretty text-sm text-muted-foreground line-clamp-1">
          {organization.description}
        </p>
        <div className="flex flex-col gap-3 text-sm">
          <p className="flex items-center">
            <CiCalendar className="w-4 h-4 mr-2" />
            Created at {format(organization.createdAt as Date, "MMMM dd yyyy")}
          </p>
          {organization.address && (
            <p className="flex items-center">
              <CiLocationOn className="w-4 h-4 mr-2" />
              {organization.address}
            </p>
          )}
          <div className="flex gap-2 items-center opacity-80 hover:opacity-100 cursor-pointer transition-all">
            <Avatar className="w-5 h-5">
              <AvatarImage src={organization.user.image ?? ""} />
              <AvatarFallback>
                {convertUsernameToAvatarFallback(organization.user.name ?? "")}
              </AvatarFallback>
            </Avatar>
            <p className="flex items-center">
              {organization.user.name}
              {isOwner && <GrUserAdmin className="w-4 h-4 ml-2" />}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
