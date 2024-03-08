"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { OrganizationSchema } from "@/schemas";

import { useState, useTransition } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "sonner";
import { MdCheckCircle, MdError } from "react-icons/md";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { addOrganization, updateOrganization } from "@/actions/organization";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { OrganizationWithUserInfoAndEvents } from "@/types";
import { CiEdit } from "react-icons/ci";

interface OrganizationEditFormProps {
  organization: OrganizationWithUserInfoAndEvents;
}

export const OrganizationEditForm = ({
  organization,
}: OrganizationEditFormProps) => {
  const [progress, setProgress] = useState(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof OrganizationSchema>>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: organization.name,
      description: organization.description ?? undefined,
      imageUrl: organization.imageUrl,
      address: organization.address ?? undefined,
      type: organization.type,
    },
  });

  const deleteFileOnServer = async (fileKey: string) => {
    if (!fileKey) return;

    // TODO: delete file in uploadthing server

    form.setValue("imageUrl", "");
  };

  const onSubmit = (values: z.infer<typeof OrganizationSchema>) => {
    startTransition(() => {
      updateOrganization(values, organization.id)
        .then((res) => {
          if (res) {
            toast(res.error, {
              icon: <MdError className="w-4 h-4" />,
            });
          }
          
          form.reset();
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
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Organization Name" {...field} />
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
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself organization"
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
                      <Link href={form.watch("imageUrl")} target="_blank">
                        <Image
                          src={form.watch("imageUrl")}
                          alt={form.watch("imageUrl")}
                          className="rounded-xl max-h-48 object-cover"
                          width={300}
                          height={300}
                        />
                      </Link>
                      <IoMdCloseCircle
                        className="w-6 h-6 absolute -top-3 -right-3 cursor-pointer z-30"
                        onClick={() =>
                          deleteFileOnServer(form.watch("imageUrl"))
                        }
                      />
                    </div>
                  ) : (
                    <div className="border-2 p-2 rounded-md shadow-xl">
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Organization Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your organization type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PERSONAL">Personal</SelectItem>
                    <SelectItem value="RESTAURANT">Restaurant</SelectItem>
                    <SelectItem value="HOTEL">Hotel</SelectItem>
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
                <CiEdit className="w-4 h-4 mr-2" />
              )}
              {isPending ? "Updating" : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
