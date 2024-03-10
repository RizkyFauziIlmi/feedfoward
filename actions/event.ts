"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { EventSchema } from "@/schemas";
import * as cheerio from "cheerio";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import axios from "axios";
import { redirect } from "next/navigation";
import { addDays } from "date-fns";
import { checkEventDate } from "@/lib/date";

const checkGoogleMapsUrl = async (url: string) => {
  const titleTextError = ["Dynamic Link Not Found", "Invalid Dynamic Link"];
  const errorHostName = "maps.app.goo.gl";
  let title = "";

  await axios.get(url).then(async (response) => {
    const html = await response.data;

    const $ = cheerio.load(html);

    title = $("title").text();
  });

  if (
    titleTextError.includes(title) ||
    (new URL(url).hostname !== errorHostName && !titleTextError.includes(title))
  ) {
    return { success: false };
  }

  return { success: true };
};

export const addEvent = async (
  organizationId: string,
  values: z.infer<typeof EventSchema>
) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  // validate form
  const validatedFields = EventSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, description, date, imageUrl, googleMapsUrl, address, isOver } =
    validatedFields.data;

  const validatedGoogleMapsUrl = await checkGoogleMapsUrl(googleMapsUrl);

  if (!validatedGoogleMapsUrl.success) {
    return { error: "Invalid Google Maps Url" };
  }

  // validate user previlage
  const existOrganization = await db.organization.findUnique({
    where: {
      id: organizationId,
    },
  });

  if (!existOrganization) {
    return { error: "Invalid Organization Id" };
  }

  if (existOrganization.userId !== session.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    await db.event.create({
      data: {
        name,
        description,
        imageUrl,
        startDate: date.from,
        endDate: date.to,
        googleMapsUrl,
        isOver,
        address,
        organizationId,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Error creating organization" };
  }

  revalidatePath(`/organization/${organizationId}`);
  redirect(`/organization/${organizationId}`);
};

export const deleteEvent = async (eventId: string) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const existEvent = await db.event.findUnique({
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

  if (!existEvent) {
    return { error: "Invalid Event Id" };
  }

  if (existEvent.organization.userId !== session.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    await db.event.delete({
      where: {
        id: eventId,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Error deleting event" };
  }

  revalidatePath(`/organization/${existEvent.organizationId}`);
  redirect(`/organization/${existEvent.organizationId}`);
};

export const editEvent = async (
  value: z.infer<typeof EventSchema>,
  eventId: string
) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const validatedFields = EventSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, description, date, imageUrl, googleMapsUrl, address, isOver } =
    validatedFields.data;

  const validatedGoogleMapsUrl = await checkGoogleMapsUrl(googleMapsUrl);

  if (!validatedGoogleMapsUrl.success) {
    return { error: "Invalid Google Maps Url" };
  }

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

  try {
    await db.event.update({
      where: {
        id: eventId,
      },
      data: {
        name,
        description,
        imageUrl,
        startDate: date.from,
        endDate: date.to,
        googleMapsUrl,
        address,
        isOver
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Error updating event" };
  }

  revalidatePath(`/event/${eventId}`);
  redirect(`/event/${eventId}`);
};

export const recoverEvent = async (eventId: string) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const existEvent = await db.event.findUnique({
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

  if (!existEvent) {
    return { error: "Invalid Event Id" };
  }

  if (existEvent.organization.userId !== session.user?.id) {
    return { error: "Unauthorized" };
  }

  const { isOnGoing } = checkEventDate(existEvent.startDate, existEvent.endDate);

  if (isOnGoing && !existEvent.isOver) {
    return { error: "Event is on going" };
  }

  try {
    await db.event.update({
      where: {
        id: eventId,
      },
      data: {
        startDate: new Date(),
        endDate: addDays(new Date(), 1),
        isOver: false,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Error recovering event" };
  }

  revalidatePath(`/organization/${existEvent.organizationId}`);
  redirect(`/organization/${existEvent.organizationId}`);
}

export const endEvent = async (eventId: string) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const existEvent = await db.event.findUnique({
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

  if (!existEvent) {
    return { error: "Invalid Event Id" };
  }

  const isOwner = existEvent.organization.userId !== session.user?.id; 

  if (isOwner) {
    return { error: "Unauthorized" };
  }

  const { notComeYet, isOver } = checkEventDate(existEvent.startDate, existEvent.endDate);

  if (notComeYet) {
    return { error: "Event is not come yet" };
  }

  if (isOver) {
    return { error: "Event is already over" };
  }

  try {
    await db.event.update({
      where: {
        id: eventId,
      },
      data: {
        isOver: true,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Error ending event" };
  }

  revalidatePath(`/organization/${existEvent.organizationId}`);
  redirect(`/organization/${existEvent.organizationId}`);
}