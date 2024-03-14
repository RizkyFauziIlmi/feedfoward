"use client";

import { LiveBadge } from "@/components/badge/live-badge";
import { OverBadge } from "@/components/badge/over-badge";
import Countdown from "@/components/timer/countdown-event";
import { TimerLeftCounter } from "@/components/timer/timer-left-counter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "next-auth";
import { GiShoppingBag } from "react-icons/gi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TbShoppingCartOff } from "react-icons/tb";
import { useCartStore } from "@/hooks/use-cart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { convertUsernameToAvatarFallback } from "@/lib/string";
import { Badge } from "@/components/ui/badge";
import { CartItemsEmpty } from "./cart-items-empty";
import { ItemListCart } from "./item-list-cart";
import { cn } from "@/lib/utils";

interface EventIdHeaderProps {
  user: User;
  startDate: Date;
  endDate: Date;
  isOnGoing: boolean;
  isOver: boolean;
  isOverDb: boolean;
  isOwner: boolean;
  notComeYet: boolean;
}

export const EventIdHeader = ({
  user,
  startDate,
  endDate,
  isOnGoing,
  isOwner,
  isOver,
  isOverDb,
  notComeYet,
}: EventIdHeaderProps) => {
  const { items, itemsCount, clearCart } = useCartStore();

  return (
    <>
      <div className="p-6 flex justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            Time to order, {user.name}
          </h3>
          {notComeYet ? (
            <Countdown startDate={startDate} />
          ) : isOnGoing && !isOverDb ? (
            <TimerLeftCounter endDate={endDate} />
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          {!isOwner && (
            <Sheet>
              <SheetTrigger asChild>
                <div className="relative p-2">
                  <Button size={"icon"} variant={"ghost"}>
                    <GiShoppingBag className="w-5 h-5" />
                  </Button>
                  {itemsCount > 0 && (
                    <Badge
                      variant={"destructive"}
                      className="absolute top-0 right-0 rounded-full h-5 w-5 items-center justify-center text-xs"
                    >
                      {itemsCount}
                    </Badge>
                  )}
                </div>
              </SheetTrigger>
              <SheetContent className="flex flex-col justify-between p-10">
                <SheetHeader>
                  <div className="flex flex-row items-center gap-2">
                    <div className="relative p-2">
                      <Button size={"icon"} variant={"secondary"}>
                        <GiShoppingBag className="w-5 h-5" />
                      </Button>
                      {itemsCount > 0 && (
                        <Badge
                          variant={"destructive"}
                          className="absolute top-0 right-0 rounded-full h-5 w-5 items-center justify-center text-xs"
                        >
                          {itemsCount}
                        </Badge>
                      )}
                    </div>
                    <Avatar className="w-9 h-9">
                      <AvatarImage
                        src={user.image as string}
                        alt={user.name as string}
                      />
                      <AvatarFallback>
                        {
                          convertUsernameToAvatarFallback(
                            user.name as string
                          ) as string
                        }
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-semibold">{user.name}</p>
                  </div>
                </SheetHeader>
                <div>
                  {items.length > 0 && (
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        My Order
                      </h4>
                      <Button
                        variant={"destructive"}
                        size={"sm"}
                        onClick={clearCart}
                      >
                        <TbShoppingCartOff className="w-4 h-4 mr-2" /> Clear
                      </Button>
                    </div>
                  )}
                  <div className={cn(items.length > 0 && "h-48 overflow-y-auto", "flex flex-col gap-6")}>
                    {items.length > 0 ? (
                      items.map((item) => (
                        <ItemListCart key={item.id} item={item} />
                      ))
                    ) : (
                      <CartItemsEmpty />
                    )}
                  </div>
                </div>
                <Button>Booking</Button>
              </SheetContent>
            </Sheet>
          )}
          {isOnGoing && !isOverDb ? <LiveBadge /> : isOver || isOverDb ? <OverBadge /> : null}
        </div>
      </div>
      <Separator />
    </>
  );
};
