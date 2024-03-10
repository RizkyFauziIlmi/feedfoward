"use client";

import { addItem } from "@/actions/item";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { ItemSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { IoMdAdd, IoMdCloseCircle } from "react-icons/io";
import { MdCheckCircle, MdError } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";

interface NewItemFormProps {
  eventId: string;
}

export const NewItemForm = ({ eventId }: NewItemFormProps) => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      stock: 1,
      isAvailable: true,
      maxBooking: 1,
      type: "FOOD",
    },
  });

  const deleteFileOnServer = async (fileKey: string) => {
    if (!fileKey) return;

    // TODO: delete file in uploadthing server

    form.setValue("imageUrl", "");
  };

  const onSubmit = (values: z.infer<typeof ItemSchema>) => {
    startTransition(() => {
      addItem(eventId, values)
        .then((res) => {
          if (res) {
            toast(res.error, {
              icon: <MdError className="w-4 h-4" />,
            });
          } else {
            form.clearErrors();
            form.reset();
          }
        })
        .catch((error) => {
          console.log(error);
          toast("Something went wrong", {
            icon: <MdError className="w-4 h-4" />,
          });
        });
    });
  };

  return (
    <div className="p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-lg"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormDescription>
                  Name of the item you are creating
                </FormDescription>
                <FormControl>
                  <Input {...field} placeholder="Enter your item name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormDescription>
                  Describe the item you are creating
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about item"
                    className="resize-none h-28"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={() => (
              <FormItem>
                <FormLabel>Item Image</FormLabel>
                <FormDescription>
                  Upload an image of the item you are creating
                </FormDescription>
                <FormControl>
                  {form.watch("imageUrl") ? (
                    <div className="relative max-w-72">
                      <Link
                        href={form.watch("imageUrl") as string}
                        target="_blank"
                      >
                        <Image
                          src={form.watch("imageUrl") as string}
                          alt={form.watch("imageUrl") as string}
                          className="rounded-xl max-h-48 object-cover"
                          width={300}
                          height={300}
                        />
                      </Link>
                      <IoMdCloseCircle
                        className="w-6 h-6 absolute -top-3 -right-3 cursor-pointer z-30"
                        onClick={() =>
                          deleteFileOnServer(form.watch("imageUrl") as string)
                        }
                      />
                    </div>
                  ) : (
                    <div className="w-full px-2 py-3 border-2 rounded-md shadow-xl">
                      <UploadDropzone
                        endpoint="imageUploader"
                        className="border-none"
                        onClientUploadComplete={(res) => {
                          // set imageUrl to field
                          form.setValue("imageUrl", res[0].url);

                          toast(`${res[0].name} Uploaded Successfully`, {
                            icon: <MdCheckCircle className="w-4 h-4" />,
                          });

                          setProgress(0);
                        }}
                        onUploadError={(error: Error) => {
                          toast("Upload Error", {
                            description: `[ERROR]: ${error.message}`,
                            icon: <MdError className="w-4 h-4" />,
                          });
                        }}
                        onUploadProgress={(progress) => setProgress(progress)}
                      />
                      {progress <= 0 ? null : <Progress value={progress} />}
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Stock</FormLabel>
                <FormDescription>
                  Number of items available for booking
                </FormDescription>
                <FormControl>
                  <Input
                    onChange={(event) => field.onChange(+event.target.value)}
                    value={field.value}
                    disabled={field.disabled}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    type="number"
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxBooking"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Booking</FormLabel>
                <FormDescription>
                  Maximum number of items that can be booked
                </FormDescription>
                <FormControl>
                  <Input
                    onChange={(event) => field.onChange(+event.target.value)}
                    value={field.value}
                    disabled={field.disabled}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    type="number"
                    min={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isAvailable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Is Available</FormLabel>
                  <FormDescription>
                    Toggle to make item available or not
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Type</FormLabel>
                <FormDescription>
                  Select the type of item you are creating
                </FormDescription>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your item type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FOOD">Food</SelectItem>
                    <SelectItem value="DRINK">Drink</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <Button
              variant={"destructive"}
              type="button"
              size={"sm"}
              disabled={isPending}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-fit"
              size={"sm"}
              disabled={isPending}
            >
              {isPending ? (
                <AiOutlineLoading className="animate-spin w-4 h-4 mr-2" />
              ) : (
                <IoMdAdd className="w-4 h-4 mr-2" />
              )}
              {isPending ? "Creating" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
