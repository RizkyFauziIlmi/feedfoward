"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { MdCheckCircle, MdError, MdOutlineContentCopy } from "react-icons/md";
import { toast } from "sonner";
import { z } from "zod";
import { AiOutlineLoading } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { CiCircleQuestion, CiShare2 } from "react-icons/ci";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { EventWithOrgIdAndItems } from "@/types";
import { FiEdit } from "react-icons/fi";
import { editEvent } from "@/actions/event";
import { FaSearchLocation } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";

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
      isOver: event.isOver,
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
                <FormDescription>Enter your event name here</FormDescription>
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
                <FormDescription>
                  Tell us a little bit about your event
                </FormDescription>
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
                <FormDescription>Upload your event image here</FormDescription>
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
                <FormDescription>
                  Select the date range of your event
                </FormDescription>
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
                <HoverCard>
                  <HoverCardTrigger>
                    <div className="flex items-center gap-2">
                      <FormLabel className="flex items-center gap-1">
                        Google Maps Url
                      </FormLabel>
                      <CiCircleQuestion className="h-4 w-4" />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-fit">
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-sm">
                      <li>
                        First: Go to
                        <Button variant={"link"} asChild className="p-0 ml-2">
                          <Link
                            href={"https://www.google.com/maps"}
                            target="_blank"
                            className="text-blue-500"
                          >
                            Google Maps
                          </Link>
                        </Button>
                      </li>
                      <li>
                        <span className="flex items-center gap-2">
                          Second: <FaSearchLocation className="w-4 h-4" />
                          Search Your event location
                        </span>
                      </li>
                      <li>
                        <span className="flex items-center gap-2">
                          Third: <CiShare2 className="w-4 h-4" /> Click share
                          button
                        </span>
                      </li>
                      <li>
                        <span className="flex items-center gap-2">
                          Fourth: <MdOutlineContentCopy className="w-4 h-4" />
                          Copy the link
                        </span>
                      </li>
                    </ul>
                  </HoverCardContent>
                </HoverCard>

                <FormDescription>
                  Enter your event Google Maps Url
                </FormDescription>
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
            name="isOver"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Is Over</FormLabel>
                  <FormDescription>
                    Toggle to make event over or not
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Address</FormLabel>
                <FormDescription>Enter your event address</FormDescription>
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
