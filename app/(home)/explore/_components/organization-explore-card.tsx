"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  convertUsernameToAvatarFallback,
  convertToTitleCase,
} from "@/lib/string";
import { Organization, OrganizationType } from "@prisma/client";
import { CiUser } from "react-icons/ci";
import { LuHotel } from "react-icons/lu";
import { GiKnifeFork } from "react-icons/gi";
import Link from "next/link";
import { FaWrench } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

interface OrganizationExploreCardProps {
  organization: Organization & {
    user: {
      name: string | null;
      id: string;
    };
  };
  isOwner: boolean;
}

const iconMap: Record<OrganizationType, JSX.Element> = {
  PERSONAL: <CiUser className="w-4 h-4 mr-2" />,
  HOTEL: <LuHotel className="w-4 h-4 mr-2" />,
  RESTAURANT: <GiKnifeFork className="w-4 h-4 mr-2" />,
};

export const OrganizationExploreCard = ({
  organization,
  isOwner,
}: OrganizationExploreCardProps) => {
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

  return (
    <div className="shadow-lg px-4 py-6 rounded-lg bg-accent/50 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={organization.imageUrl as string} />
          <AvatarFallback>
            {convertUsernameToAvatarFallback(organization.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2 justify-between items-start">
          <Button variant={"link"} asChild className="p-0 h-fit">
            <Link href={`/dashboard/${organization.user.id}`}>
              <p className="text-sm text-muted-foreground line-clamp-1 flex items-center">
                @{organization.user.name}
                {isOwner && <FaWrench className="w-3 h-3 ml-2 text-blue-500" />}
              </p>
            </Link>
          </Button>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight line-clamp-1">
            {highlightMatch(organization.name)}
          </h4>
          <p className="text-md flex items-center line-clamp-1">
            {iconMap[organization.type]} {convertToTitleCase(organization.type)}
          </p>
        </div>
      </div>
      <Button className="rounded-full w-full" asChild>
        <Link href={`/organization/${organization.id}`}>See More</Link>
      </Button>
    </div>
  );
};
