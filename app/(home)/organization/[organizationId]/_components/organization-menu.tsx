"use client";

import { deleteOrganization } from "@/actions/organization";
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
import { GoTrash } from "react-icons/go";
import { MdClose, MdError, MdOutlineMenu } from "react-icons/md";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface OrganizationMenuProps {
  organizationId: string;
}

export const OrganizationMenu = ({ organizationId }: OrganizationMenuProps) => {
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="bg-destructive focus:bg-destructive/80">
                <GoTrash className="w-4 h-4 mr-2" />
                Delete Organization
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => console.log("click")}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DropdownMenuItem
            onSelect={() =>
              router.push(`/organization/${organizationId}/new-event`)
            }
          >
            <BsCalendarPlus className="w-4 h-4 mr-2" />
            Add Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
