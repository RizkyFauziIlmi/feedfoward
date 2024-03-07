"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NewOrganizationSchema } from "@/schemas";
import { OrganizationType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addOrganization = async (
  values: z.infer<typeof NewOrganizationSchema>
) => {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }

  const userId = session.user?.id as string;
  const validatedFields = NewOrganizationSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, description, address, imageUrl, type } = validatedFields.data;

  try {
    await db.organization.create({
      data: {
        name,
        address,
        description,
        imageUrl,
        type,
        userId,
      },
    });

    revalidatePath("/", "layout");

    return { success: "Organization Created Successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Error creating organization" };
  }
};
