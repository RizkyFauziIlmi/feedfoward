import { db } from "@/lib/db";

export const getItemById = async (itemId: string) => {
  try {
    const item = await db.item.findUnique({
      where: {
        id: itemId
      },
      include: {
        event: true
      }
    });

    return item;
  } catch (error) {
    return null;
  }
};
