"use server";

import { auth } from "@/auth";
import { checkEventDate } from "@/lib/date";
import { db } from "@/lib/db";
import { ItemSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const addItem = async (
  eventId: string,
  values: z.infer<typeof ItemSchema>
) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  // validate form
  const validatedFields = ItemSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, description, imageUrl, stock, type } = validatedFields.data;

  // validate user previlage
  const existingEvent = await db.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      organization: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!existingEvent) {
    return { error: "Invalid Event Id" };
  }

  const isOwner = existingEvent.organization.userId === session.user?.id

  if (!isOwner) {
    return { error: "Unauthorized" };
  }

  // validate event date
  const { isOver, notComeYet } = checkEventDate(
    existingEvent.startDate,
    existingEvent.endDate
  );
  
  console.log(isOwner)

  if ((isOver || notComeYet || existingEvent.isOver) && !isOwner) {
    return { error: "Invalid Event Date" };
  }

  // add item to database
  try {
    await db.item.create({
      data: {
        name,
        description,
        imageUrl,
        stock,
        type,
        eventId,
      },
    });
  } catch (error) {
    return { error: "Error Creating Item" };
  }

  revalidatePath(`/event/${eventId}`);
  redirect(`/event/${eventId}`);
};

export const deleteItem = async (itemId: string) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const existingItem = await db.item.findUnique({
    where: {
      id: itemId,
    },
    include: {
      event: {
        select: {
          organization: {
            select: {
              userId: true,
            },
          },
          startDate: true,
          endDate: true,
        },
      },
    },
  });

  if (!existingItem) {
    return { error: "Invalid Item Id" };
  }

  if (existingItem.event.organization.userId !== session.user?.id) {
    return { error: "Unauthorized" };
  }

  // validate event date
  const { isOver, notComeYet } = checkEventDate(
    existingItem.event.startDate,
    existingItem.event.endDate
  );

  if (isOver || notComeYet) {
    return { error: "Invalid Event Date" };
  }

  try {
    await db.item.delete({
      where: {
        id: itemId,
      },
    });
  } catch (error) {
    return { error: "Error Deleting Item" };
  }

  revalidatePath(`/event/${existingItem.eventId}`);
  redirect(`/event/${existingItem.eventId}`);
}

export const updateItem = async (values: z.infer<typeof ItemSchema>, itemId: string) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  // validate form
  const validatedFields = ItemSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, description, imageUrl, stock, type } = validatedFields.data;

  const existingItem = await db.item.findUnique({
    where: {
      id: itemId,
    },
    include: {
      event: {
        select: {
          organization: {
            select: {
              userId: true,
            },
          },
          startDate: true,
          endDate: true,
        },
      },
    },
  });

  if (!existingItem) {
    return { error: "Invalid Item Id" };
  }

  if (existingItem.event.organization.userId !== session.user?.id) {
    return { error: "Unauthorized" };
  }

  // validate event date
  const { isOver, notComeYet } = checkEventDate(
    existingItem.event.startDate,
    existingItem.event.endDate
  );

  if (isOver || notComeYet) {
    return { error: "Invalid Event Date" };
  }

  try {
    await db.item.update({
      where: {
        id: itemId,
      },
      data: {
        name,
        description,
        imageUrl,
        stock,
        type,
      },
    });
  } catch (error) {
    return { error: "Error Updating Item" };
  }

  revalidatePath(`/event/${existingItem.eventId}`);
  redirect(`/event/${existingItem.eventId}`);

}