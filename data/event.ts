import { db } from "@/lib/db";

export const getEventById = async (id: string) => {
  try {
    const event = await db.event.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
        organization: {
          select: {
            userId: true,
          },
        },
      },
    });

    return event;
  } catch (error) {
    return null;
  }
};
