"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { EventSchema } from "@/schemas";
import * as cheerio from "cheerio";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import axios from "axios";
import { redirect } from "next/navigation";

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
    (new URL(url).hostname !== errorHostName &&
      !titleTextError.includes(title))
  ) {
    return { success: false };
  }

  return { success: true };
}

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

  const { name, description, date, imageUrl, googleMapsUrl, address } =
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
        }
      }
    }
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
}

export const editEvent = async (value: z.infer<typeof EventSchema>, eventId: string) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const validatedFields = EventSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, description, date, imageUrl, googleMapsUrl, address } = validatedFields.data;

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
          userId: true
        }
      }
    }
  })

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
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Error updating event" };
  }

  revalidatePath(`/event/${eventId}`);
  redirect(`/event/${eventId}`);
} 