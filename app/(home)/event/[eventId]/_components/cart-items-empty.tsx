import { TbShoppingCartX } from "react-icons/tb";

export const CartItemsEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <TbShoppingCartX className="w-10 h-10" />
      <p className="text-sm text-center text-muted-foreground">
        Cart is empty, start adding items to your cart
      </p>
    </div>
  );
};
