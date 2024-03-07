import { ItemType, OrganizationType } from "@prisma/client";
import * as z from "zod";

export const NewOrganizationSchema = z.object({
  name: z.string().min(1),
  description: z
    .string()
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    })
    .optional(),
  imageUrl: z
    .string({
      required_error: "Image is required.",
    })
    .min(1, { message: "Image is required." }),
  address: z.string().optional(),
  type: z.nativeEnum(OrganizationType),
});

export const NewEventSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  date: z.object({
    from: z.date({ required_error: "Date is required" }),
    to: z
      .date({ required_error: "Date is required" }),
  }),
  googleMapsUrl: z.string().url().min(1),
  address: z.string().min(1),
});

export const NewItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  stock: z.number(),
  type: z.nativeEnum(ItemType),
})