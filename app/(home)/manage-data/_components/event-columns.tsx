"use client";

import Countdown from "@/components/timer/countdown-event";
import { Button } from "@/components/ui/button";
import { checkEventDate } from "@/lib/date";
import { Event } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDistanceToNow } from "date-fns";
import { RiArrowUpDownLine } from "react-icons/ri";
import { MdError, MdMoreHoriz } from "react-icons/md";
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
import { GoEye, GoTrash } from "react-icons/go";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CiEdit } from "react-icons/ci";
import { useState, useTransition } from "react";
import { deleteEvent, endEvent, recoverEvent } from "@/actions/event";
import { AiOutlineLoading } from "react-icons/ai";
import {
  TbCalendarCheck,
  TbCalendarRepeat,
} from "react-icons/tb";

export const eventColums: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <RiArrowUpDownLine className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("name");

      return <div className="text-sm line-clamp-1">{name as string}</div>;
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <RiArrowUpDownLine className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("startDate");

      return <div>{format(new Date(date as string), "LLL dd, y")}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <RiArrowUpDownLine className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("endDate");

      return <div>{format(new Date(date as string), "LLL dd, y")}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <RiArrowUpDownLine className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      const formatedDate = formatDistanceToNow(new Date(date as string));
      return <div>{formatedDate} ago</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated Date
          <RiArrowUpDownLine className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("updatedAt");
      const formatedDate = formatDistanceToNow(new Date(date as string));
      return <div>{formatedDate} ago</div>;
    },
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const event = row.original;

      const { isOnGoing, isOver, notComeYet } = checkEventDate(
        event.startDate,
        event.endDate
      );

      if (isOnGoing && !event.isOver) {
        return <div className="text-sm text-green-600">On Going</div>;
      }

      if (isOver || event.isOver) {
        return <div className="text-sm text-red-600">Over</div>;
      }

      if (notComeYet) {
        return (
          <Countdown
            startDate={event.startDate}
            isBadge={false}
            className="text-blue-500"
          />
        );
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const event = row.original;
      const [isAlertOpen, setIsAlertOpen] = useState(false);
      const [isSecondAlertOpen, setSecondIsAlertOpen] = useState(false);
      const [isThirdAlertOpen, setThirdIsAlertOpen] = useState(false);
      const [isPending, startTransition] = useTransition();
      const [isSecondPending, startSecondTransition] = useTransition();
      const [isThirdPending, startThirdTransition] = useTransition();

      const { isOnGoing, isOver, notComeYet } = checkEventDate(
        event.startDate,
        event.endDate
      );

      const isOverValidation =
        (isOnGoing || notComeYet) && (!event.isOver || isOver);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MdMoreHoriz className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(`/event/${event.id}`)}
              >
                <GoEye className="w-4 h-4 mr-2" /> See more
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/event/${event.id}/edit`)}
              >
                <CiEdit className="w-4 h-4 mr-2" /> Edit
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
                {isOverValidation ? "Mark as Over" : "Recover Event"}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="bg-destructive focus:bg-destructive/80 text-white"
                onSelect={() => setIsAlertOpen(true)}
              >
                <GoTrash className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={isAlertOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your event and remove your data from our servers.
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
                      deleteEvent(event.id, "table")
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
                  This will mark this event as over and user can't access
                  anymore, you can recover it later, notice that if you recover
                  it later it will reset the event date
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
                      endEvent(event.id, "table")
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
                  This will recover this event and user can access it again, but
                  the date will be reset
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
                      recoverEvent(event.id, "table")
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
        </>
      );
    },
  },
];
