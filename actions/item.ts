"use server";

import { auth } from "@/auth";
import { checkEventDate } from "@/lib/date";
import { db } from "@/lib/db";
import { NewItemSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const addItem = async (
  eventId: string,
  values: z.infer<typeof NewItemSchema>
) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  // validate form
  const validatedFields = NewItemSchema.safeParse(values);

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

  if (existingEvent.organization.userId !== session.user?.id) {
    return { error: "Unauthorized" };
  }

  // validate event date
  const { isOver, notComeYet } = checkEventDate(
    existingEvent.startDate,
    existingEvent.endDate
  );

  if (isOver || notComeYet) {
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
