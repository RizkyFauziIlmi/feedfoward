"use client";

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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { NewItemSchema } from "@/schemas";
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

export const NewItemForm = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewItemSchema>>({
    resolver: zodResolver(NewItemSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      stock: 1,
      type: "FOOD",
    },
  });

  const deleteFileOnServer = async (fileKey: string) => {
    if (!fileKey) return;

    // TODO: delete file in uploadthing server

    form.setValue("imageUrl", "");
  };

  const onSubmit = (values: z.infer<typeof NewItemSchema>) => {
    startTransition(() => {
      console.log(values);
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
                <FormControl>
                  <Input {...field} type="number" min={0} />
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
                <FormLabel>Item Type</FormLabel>
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
