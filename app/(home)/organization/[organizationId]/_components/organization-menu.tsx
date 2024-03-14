"use client";

import { deleteOrganization } from "@/actions/organization";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { BsCalendarPlus } from "react-icons/bs";
import { GoTrash } from "react-icons/go";
import { MdClose, MdError, MdOutlineMenu } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
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
} from "@/components/ui/alert-dialog";
import { AiOutlineLoading } from "react-icons/ai";
import { Event } from "@prisma/client";
import { checkEventDate } from "@/lib/date";
import { recoverEvent } from "@/actions/event";

interface OrganizationMenuProps {
  organizationId: string;
  events: Event[];
}

export const OrganizationMenu = ({
  organizationId,
  events,
}: OrganizationMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const overEvents = events.filter((event) => {
    const { isOver } = checkEventDate(event.startDate, event.endDate);

    return isOver || event.isOver;
  });

  return (
    <div className="fixed bottom-5 right-14 z-50">
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
        <DropdownMenuContent align="center" className="space-y-2">
          <DropdownMenuLabel>Organization</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => router.push(`/organization/${organizationId}/edit`)}
          >
            <FiEdit className="w-4 h-4 mr-2" />
            Edit Orgnization
          </DropdownMenuItem>
          <DropdownMenuItem
            className="bg-destructive focus:bg-destructive/80 text-white"
            onSelect={() => setIsAlertOpen(true)}
          >
            <GoTrash className="w-4 h-4 mr-2" />
            Delete Organization
          </DropdownMenuItem>
          <DropdownMenuLabel>Events</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() =>
              router.push(`/organization/${organizationId}/new-event`)
            }
          >
            <BsCalendarPlus className="w-4 h-4 mr-2" />
            Add Event
          </DropdownMenuItem>
          {overEvents.length > 0 && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Recover Event</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {overEvents.map((event) => (
                    <DropdownMenuItem
                      key={event.id}
                      onSelect={() => {
                        recoverEvent(event.id)
                          .then((res) => {
                            if (res) {
                              toast(res.error, {
                                icon: <MdError className="w-4 h-4" />,
                              });
                            }
                          })
                          .catch((error) =>
                            toast("Something went wrong", {
                              icon: <MdError className="w-4 h-4" />,
                            })
                          );
                      }}
                    >
                      {event.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={isAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              organization and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isPending}
              onClick={() => setIsAlertOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              className="bg-destructive hover:bg-destructive/80 text-white"
              onClick={() => {
                startTransition(() => {
                  deleteOrganization(organizationId)
                    .then((res) => {
                      if (res) {
                        toast(res.error, {
                          icon: <MdError className="w-4 h-4" />,
                        });
                      }

                      setIsAlertOpen(false);
                    })
                    .catch((error) =>
                      toast("Something went wrong", {
                        icon: <MdError className="w-4 h-4" />,
                      })
                    );
                });
              }}
            >
              {isPending ? (
                <AiOutlineLoading className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <GoTrash className="w-4 h-4 mr-2" />
              )}
              {isPending ? "Deleting" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
