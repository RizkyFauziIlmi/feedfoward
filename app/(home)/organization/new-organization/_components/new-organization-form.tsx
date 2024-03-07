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
import { NewOrganizationSchema } from "@/schemas";

import { useState } from "react";
import { IoMdAdd, IoMdCloseCircle } from "react-icons/io";
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
import { OrganizationCard } from "@/components/organization/organization-card";
import { addOrganization } from "@/actions/organization";

export const NewOrganizationForm = () => {
  const [progress, setProgress] = useState(0);

  const form = useForm<z.infer<typeof NewOrganizationSchema>>({
    resolver: zodResolver(NewOrganizationSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      address: "",
      type: "PERSONAL",
    },
  });

  const deleteFileOnServer = async (fileKey: string) => {
    if (!fileKey) return;

    // TODO: delete file in uploadthing server

    form.setValue("imageUrl", "");
  };

  const onSubmit = (values: z.infer<typeof NewOrganizationSchema>) => {
    addOrganization(values)
      .then((res) => {
        if (res.success) {
          toast(res.success, {
            icon: <MdCheckCircle className="w-4 h-4" />,
          });

          form.reset();
        }

        if (res.error) {
          toast(res.error, {
            icon: <MdError className="w-4 h-4" />,
          });
        }
      })
      .catch((error) =>
        toast("Something went wrong", { icon: <MdError className="w-4 h-4" /> })
      );
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
          <Button type="submit">
            <IoMdAdd className="w-4 h-4 mr-2" />
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
};
