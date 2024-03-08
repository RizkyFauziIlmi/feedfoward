"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NewEventSchema } from "@/schemas";
import * as cheerio from "cheerio";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import axios from "axios";
import { redirect } from "next/navigation";

export const addEvent = async (
  organizationId: string,
  values: z.infer<typeof NewEventSchema>
) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  // validate form
  const validatedFields = NewEventSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, description, date, imageUrl, googleMapsUrl, address } =
    validatedFields.data;

  const titleTextError = ["Dynamic Link Not Found", "Invalid Dynamic Link"];
  const errorHostName = "maps.app.goo.gl";
  let title = "";

  await axios.get(values.googleMapsUrl).then(async (response) => {
    // validate google maps url
    const html = await response.data;

    const $ = cheerio.load(html);

    title = $("title").text();
  });

  if (
    titleTextError.includes(title) ||
    (new URL(values.googleMapsUrl).hostname !== errorHostName &&
      !titleTextError.includes(title))
  ) {
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
