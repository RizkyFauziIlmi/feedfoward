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
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscClose } from "react-icons/vsc";
import { IoBagAddSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface EventMenuProps {
  eventId: string
}

export const EventMenu = ({ eventId }: EventMenuProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-10 right-14">
      <DropdownMenu onOpenChange={(isOpen) => setIsOpen(isOpen)}>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} className="rounded-full">
            {isOpen ? (
              <VscClose className="w-4 h-4" />
            ) : (
              <RxHamburgerMenu className="w-4 h-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem
            onSelect={() => router.push(`/event/${eventId}/new-item`)}
          >
            <IoBagAddSharp className="h-4 w-4 mr-2" /> Add Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
