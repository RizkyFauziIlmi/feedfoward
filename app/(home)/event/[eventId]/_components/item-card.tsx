"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Item } from "@prisma/client";
import Image from "next/image";
import { AiFillPlusCircle, AiOutlineLoading } from "react-icons/ai";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
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
import { GoTrash } from "react-icons/go";
import { MdError } from "react-icons/md";
import { deleteItem } from "@/actions/item";
import { toast } from "sonner";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useCartStore } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: Item;
  isOwner: boolean;
  eventId: string;
}

export const ItemCard = ({ item, isOwner, eventId }: ItemCardProps) => {
  const { items, addItem } = useCartStore();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={cn(
              !item.isAvailable || item.stock === 0 ? "opacity-50" : "",
              "bg-muted/30 rounded-lg overflow-hidden h-full"
            )}
          >
            <Image
              src={
                item.imageUrl
                  ? item.imageUrl
                  : "https://fakeimg.pl/600x400?text=Item"
              }
              alt={item.name}
              className="w-full object-cover h-40"
              width={300}
              height={100}
            />
            <div className="flex flex-col justify-between gap-2 p-4">
              <h4 className="text-lg font-semibold tracking-tight">
                {item.name}
              </h4>
              <p className="text-sm h-12 text-muted-foreground overflow-auto">
                {item.description}
              </p>
            </div>
            <Separator />
            <div className="flex h-12 items-center">
              <Button
                variant={"link"}
                size={"lg"}
                className="w-1/2 border-none hover:bg-muted hover:no-underline rounded-none h-full"
                onClick={() => {
                  const itemCount =
                    items.length > 0
                      ? items?.filter((i) => i.id === item.id)[0]?.count
                      : 0;

                  console.log(itemCount);
                  if (itemCount >= item.maxBooking) {
                    toast(
                      `This item can only be ordered ${
                        item.maxBooking === 1
                          ? "once"
                          : item.maxBooking === 2
                          ? "twice"
                          : `${item.maxBooking} times`
                      }`,
                      {
                        icon: <MdError className="w-4 h-4" />,
                      }
                    );
                  } else if (item.stock === 0) {
                    toast("This item is out of stock", {
                      icon: <MdError className="w-4 h-4" />,
                    });
                  } else if (!item.isAvailable) {
                    toast("This item is not available", {
                      icon: <MdError className="w-4 h-4" />,
                    });
                  } else {
                    addItem(item);
                  }
                }}
              >
                <AiFillPlusCircle className="w-6 h-6 mr-2" /> Add to Cart
              </Button>
              <Separator orientation="vertical" />
              <p className="w-1/2 text-sm text-center">{item.stock} Stock</p>
            </div>
          </div>
        </ContextMenuTrigger>
        {isOwner && (
          <ContextMenuContent className="space-y-2">
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuItem
              onSelect={() => router.push(`/event/${eventId}/${item.id}/edit`)}
            >
              <FiEdit className="w-4 h-4 mr-2" />
              Edit Item
            </ContextMenuItem>
            <ContextMenuItem
              className="bg-destructive focus:bg-destructive/80 text-white"
              onSelect={() => setIsAlertOpen(true)}
            >
              <GoTrash className="w-4 h-4 mr-2" /> Delete Item
            </ContextMenuItem>
          </ContextMenuContent>
        )}
      </ContextMenu>
      <AlertDialog open={isAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              item and remove your data from our servers.
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
                  deleteItem(item.id)
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
};
