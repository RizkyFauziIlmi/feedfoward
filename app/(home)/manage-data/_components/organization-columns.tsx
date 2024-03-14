"use client";

import { Organization } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { MdError, MdMoreHoriz } from "react-icons/md";
import { GoEye, GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
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
import { AiOutlineLoading } from "react-icons/ai";
import { useState, useTransition } from "react";
import { deleteOrganization } from "@/actions/organization";
import { toast } from "sonner";
import { RiArrowUpDownLine } from "react-icons/ri";
import { TbCalendarPlus } from "react-icons/tb";

export const organizationColumns: ColumnDef<Organization>[] = [
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
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Organization Type
          <RiArrowUpDownLine className="ml-2 h-4 w-4" />
        </Button>
      );
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
    id: "actions",
    cell: ({ row }) => {
      const organization = row.original;
      const router = useRouter();
      const [isAlertOpen, setIsAlertOpen] = useState(false);
      const [isPending, startTransition] = useTransition();

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
                onClick={() => router.push(`/organization/${organization.id}`)}
              >
                <GoEye className="w-4 h-4 mr-2" /> See more
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/organization/${organization.id}/new-event`)
                }
              >
                <TbCalendarPlus className="w-4 h-4 mr-2" /> Add Event
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/organization/${organization.id}/edit`)
                }
              >
                <CiEdit className="w-4 h-4 mr-2" /> Edit
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
                  your organization and remove your data from our servers.
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
                      deleteOrganization(organization.id)
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
        </>
      );
    },
  },
];
