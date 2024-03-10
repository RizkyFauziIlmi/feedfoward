import { Item } from "@prisma/client";
import { create } from "zustand";

export interface CartItem extends Item {
  count: number;
}

interface CartState {
  items: CartItem[];
  itemsCount: number;
  addItem: (item: Item) => void;
  deleteItem: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  itemsCount: 0,
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      state.itemsCount++;
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, count: i.count + 1 } : i
          ),
        };
      } else {
        return {
          items: [...state.items, { ...item, count: 1 }],
        };
      }
    }),
  deleteItem: (itemId) =>
    set((state) => {
      const itemToDelete = state.items.find((item) => item.id === itemId);
      state.itemsCount--;
      if (itemToDelete) {
        if (itemToDelete.count > 1) {
          return {
            items: state.items.map((item) =>
              item.id === itemId ? { ...item, count: item.count - 1 } : item
            ),
          };
        } else {
          return {
            items: state.items.filter((item) => item.id !== itemId),
          };
        }
      }
      return state;
    }),
  clearCart: () => set({ items: [], itemsCount: 0 }),
}));
