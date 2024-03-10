"use client";

import { Button } from "@/components/ui/button";
import { TbShoppingCartMinus } from "react-icons/tb";
import { CartItem, useCartStore } from "@/hooks/use-cart";
import Image from "next/image";

interface ItemListCartProps {
  item: CartItem;
}

export const ItemListCart = ({ item }: ItemListCartProps) => {
  const { deleteItem } = useCartStore();

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <Image
          src={item.imageUrl ?? ""}
          alt={item.name}
          width={100}
          height={50}
          className="rounded-md"
        />
        <p className="font-semibold text-sm">
          {item.count} x {item.name}
        </p>
      </div>
      <Button
        size={"icon"}
        variant={"secondary"}
        className="hover:bg-red-500 hover:text-white"
        onClick={() => deleteItem(item.id)}
      >
        <TbShoppingCartMinus className="h-4 w-4" />
      </Button>
    </div>
  );
};
