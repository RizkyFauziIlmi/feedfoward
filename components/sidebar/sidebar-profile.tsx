"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { convertUsernameToAvatarFallback } from "@/lib/string";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { RiArrowUpSLine } from "react-icons/ri";
import { DropdownProfileItem } from "./dropdown-profile-item";
import { useState } from "react";
import { User } from "next-auth";
import { cn } from "@/lib/utils";

interface SidebarProfileProps {
  user: User | null | undefined;
}

export const SidebarProfile = ({ user }: SidebarProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DropdownMenuTrigger asChild>
        <div>
          <Button
            className="flex gap-2 justify-start h-fit p-0 text-left items-center pl-1 py-1 pr-3 group"
            variant={"ghost"}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image as string} />
              <AvatarFallback>
                {convertUsernameToAvatarFallback(user.name as string)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Welcome back</p>
              <p className="text-sm">{user.name}</p>
            </div>
            <RiArrowUpSLine
              className={cn(
                isOpen ? "rotate-180" : "rotate-0",
                "w-4 h-4 transition-all"
              )}
            />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownProfileItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
