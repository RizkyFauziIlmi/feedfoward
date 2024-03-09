"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ItemType, Item } from "@prisma/client";
import { useState } from "react";
import { ItemCard } from "./item-card";

interface EventIdContentProps {
  items: Item[];
  isOwner: boolean;
  eventId: string;
}

export const EventIdContent = ({ items, isOwner, eventId }: EventIdContentProps) => {
  const [itemType, setItemType] = useState<ItemType | "ALL">("ALL");

  const sortedItemsByStock = items.sort((a, b) => b.stock - a.stock);
  const foodItems = items.filter((item) => item.type === "FOOD");
  const drinkItems = items.filter((item) => item.type === "DRINK");
  const otherItems = items.filter((item) => item.type === "OTHER");

  return (
    <div className="px-6">
      <div className="flex justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Items
        </h3>
        <Select
          defaultValue="ALL"
          onValueChange={(value) => setItemType(value as ItemType)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an item type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Item Type</SelectLabel>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="FOOD">Food</SelectItem>
              <SelectItem value="DRINK">Drink</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-8 mb-6">
        {itemType === "ALL" &&
          sortedItemsByStock.map((item) => (
            <ItemCard item={item} key={item.id} isOwner={isOwner} eventId={eventId} />
          ))}
        {itemType === "FOOD" &&
          foodItems.map((item) => (
            <ItemCard item={item} key={item.id} isOwner={isOwner} eventId={eventId} />
          ))}
        {itemType === "DRINK" &&
          drinkItems.map((item) => (
            <ItemCard item={item} key={item.id} isOwner={isOwner} eventId={eventId} />
          ))}
        {itemType === "OTHER" &&
          otherItems.map((item) => (
            <ItemCard item={item} key={item.id} isOwner={isOwner} eventId={eventId} />
          ))}
      </div>
    </div>
  );
};
