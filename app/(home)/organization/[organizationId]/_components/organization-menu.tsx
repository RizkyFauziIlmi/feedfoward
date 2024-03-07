"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsCalendarPlus } from "react-icons/bs";
import { MdClose, MdOutlineMenu } from "react-icons/md";

interface OrganizationMenuProps {
  organizationId: string;
  isOwner: boolean;
}

export const OrganizationMenu = ({ organizationId, isOwner }: OrganizationMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="absolute bottom-7 right-14">
      <DropdownMenu onOpenChange={(isOpen) => setIsOpen(isOpen)}>
        <DropdownMenuTrigger asChild>
          {isOpen ? (
            <Button size={"icon"} className="rounded-full">
              <MdClose className="w-4 h-4" />
            </Button>
          ) : (
            <Button size={"icon"} className="rounded-full">
              <MdOutlineMenu className="w-4 h-4" />
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          {isOwner && (
            <DropdownMenuItem
              onSelect={() =>
                router.push(`/organization/${organizationId}/new-event`)
              }
            >
              <BsCalendarPlus className="w-4 h-4 mr-2" />
              Add Event
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
