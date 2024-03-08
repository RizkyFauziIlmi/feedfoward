"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { EventSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import { MdCheckCircle, MdError } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";
import { AiOutlineLoading } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { CiCircleQuestion } from "react-icons/ci";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { EventWithOrgIdAndItems } from "@/types";
import { FiEdit } from "react-icons/fi";
import { editEvent } from "@/actions/event";

interface NewEventFormProps {
  event: EventWithOrgIdAndItems;
}

export const EditEventForm = ({ event }: NewEventFormProps) => {
  const [progress, setProgress] = useState(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const deleteFileOnServer = async (fileKey: string) => {
    if (!fileKey) return;

    // TODO: delete file in uploadthing server

    form.setValue("imageUrl", "");
  };

  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      name: event.name,
      description: event.description ?? undefined,
      imageUrl: event.imageUrl ?? undefined,
      date: {
        from: event.startDate,
        to: event.endDate,
      },
      googleMapsUrl: event.googleMapsUrl,
      address: event.address,
    },
  });

  const onSubmit = (values: z.infer<typeof EventSchema>) => {
    startTransition(() => {
      editEvent(values, event.id)
        .then((res) => {
          if (res) {
            if (res.error === "Invalid Google Maps Url") {
              form.setError("googleMapsUrl", {
                type: "custom",
                message: res.error,
              });
            }

            toast(res.error, {
              icon: <MdError className="w-4 h-4" />,
            });
          } else {
            form.clearErrors();
            form.reset();
          }
        })
        .catch((error) =>
          toast("Something went wrong", {
            icon: <MdError className="w-4 h-4" />,
          })
        );
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
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your event name" />
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
                <FormLabel>Event Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit event details"
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
                <FormLabel>Organization Image</FormLabel>
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
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Date Range of event</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="center"
                    side="right"
                  >
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value.from}
                      selected={field.value}
                      disabled={(date) => date < new Date()}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="googleMapsUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Google Maps Url
                  <HoverCard>
                    <HoverCardTrigger>
                      <CiCircleQuestion className="h-4 w-4" />
                    </HoverCardTrigger>
                    <HoverCardContent>
                      The React Framework – created and maintained by @vercel.
                    </HoverCardContent>
                  </HoverCard>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your event Google Maps Url"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your event address" />
                </FormControl>
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
                <FiEdit className="w-4 h-4 mr-2" />
              )}
              {isPending ? "Updating" : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
