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
import { useState, useTransition } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscClose } from "react-icons/vsc";
import { IoBagAddSharp } from "react-icons/io5";
import { TbCalendarCheck, TbCalendarRepeat } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { GoTrash } from "react-icons/go";
import { MdError } from "react-icons/md";
import { deleteEvent, endEvent, recoverEvent } from "@/actions/event";
import { toast } from "sonner";
import { AiOutlineLoading } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { checkEventDate } from "@/lib/date";

interface EventMenuProps {
  eventId: string;
  startDate: Date;
  endDate: Date;
  isOverDb: boolean;
}

export const EventMenu = ({
  eventId,
  endDate,
  isOverDb,
  startDate,
}: EventMenuProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSecondAlertOpen, setSecondIsAlertOpen] = useState(false);
  const [isThirdAlertOpen, setThirdIsAlertOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isSecondPending, startSecondTransition] = useTransition();
  const [isThirdPending, startThirdTransition] = useTransition();

  const { isOnGoing, isOver, notComeYet } = checkEventDate(startDate, endDate);

  const isOverValidation = (isOnGoing || notComeYet) && (!isOverDb || isOver)

  return (
    <div className="fixed bottom-5 right-14 z-50">
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
        <DropdownMenuContent align="center" className="space-y-2">
          <DropdownMenuLabel>Event</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => router.push(`/event/${eventId}/edit`)}
          >
            <FiEdit className="w-4 h-4 mr-2" />
            Edit Event
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              if (isOverValidation) {
                setSecondIsAlertOpen(true);
              } else {
                setThirdIsAlertOpen(true);
              } 
            }}
          >
            {isOverValidation ? (
              <TbCalendarCheck className="w-4 h-4 mr-2" />
            ) : (
              <TbCalendarRepeat className="w-4 h-4 mr-2" />
            )}
            {isOverValidation
              ? "Mark as Over"
              : "Recover Event"}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="bg-destructive focus:bg-destructive/80 text-white"
            onSelect={() => setIsAlertOpen(true)}
          >
            <GoTrash className="w-4 h-4 mr-2" />
            Delete Event
          </DropdownMenuItem>
          <DropdownMenuLabel>Item</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => router.push(`/event/${eventId}/new-item`)}
          >
            <IoBagAddSharp className="h-4 w-4 mr-2" /> Add Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={isAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              event and remove your data from our servers.
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
                  deleteEvent(eventId)
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
      <AlertDialog open={isSecondAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark this event as over and user can't access anymore,
              you can recover it later, notice that if you recover it later it
              will reset the event date
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isSecondPending}
              onClick={() => setSecondIsAlertOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isSecondPending}
              onClick={() => {
                startSecondTransition(() => {
                  endEvent(eventId, "event")
                    .then((res) => {
                      if (res) {
                        toast(res.error, {
                          icon: <MdError className="w-4 h-4" />,
                        });
                      }

                      setSecondIsAlertOpen(false);
                    })
                    .catch((error) =>
                      toast("Something went wrong", {
                        icon: <MdError className="w-4 h-4" />,
                      })
                    );
                });
              }}
            >
              {isSecondPending ? (
                <AiOutlineLoading className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <TbCalendarCheck className="w-4 h-4 mr-2" />
              )}
              {isSecondPending ? "Marking" : "Mark as Over"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={isThirdAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will recover this event and user can access it again, but the date will be reset
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isThirdPending}
              onClick={() => setThirdIsAlertOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isThirdPending}
              onClick={() => {
                startThirdTransition(() => {
                  recoverEvent(eventId, "event")
                    .then((res) => {
                      if (res) {
                        toast(res.error, {
                          icon: <MdError className="w-4 h-4" />,
                        });
                      }

                      setThirdIsAlertOpen(false);
                    })
                    .catch((error) =>
                      toast("Something went wrong", {
                        icon: <MdError className="w-4 h-4" />,
                      })
                    );
                });
              }}
            >
              {isThirdPending ? (
                <AiOutlineLoading className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <TbCalendarRepeat className="w-4 h-4 mr-2" />
              )}
              {isThirdPending ? "Recovering" : "Recover Event"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
