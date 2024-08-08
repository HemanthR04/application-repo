"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppWindowMac, Copy, Ellipsis } from "lucide-react";

interface Application {
  _id: string;
  applicationName: string;
}
interface applicationDetails {
  applicationName: string;
  applicationDescription: string;
  applicationIpAddress: string;
  applicationMOTSId: string;
  hostDetails: string;
}

interface URLdata {
  link: string;
  type: string;
  environment: string;
  clientApps: [object];
}
const FormSchema = z.object({
  app: z.string({
    required_error: "Please select an Application.",
  }),
  name: z.string({
    required_error: "Please select an Environment.",
  }),
});
const Page = () => {
  const [values, setValues] = useState<Application[]>([]);
  const [options, setOptions] = useState<string | undefined>();
  const [fetchedData, setFetchedData] = useState<URLdata[]>([]);
  const [applicationData, SetApplicationData] = useState<applicationDetails>();

  useEffect(() => {
    fetch("/api/applications/fetchApplications", { cache: "no-store" })
      .then((data) => data.json())
      .then((val) => setValues(val.apps));
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (data.name === "ALL") {
        fetch(`/api/applications/fetchApplications/${data.app}`, {
          cache: "no-store",
        })
          .then((data) => data.json())
          .then((val) => SetApplicationData(val.applicationDetails));
        const responseData: any = await (
          await fetch(`/api/urls/fetchUrl/${data.app}`, { cache: "no-store" })
        ).json();
        setFetchedData(responseData);

        return;
      }
      const applicationData: any = await (
        await fetch(`/api/applications/fetchApplications/${data.app}`, {
          cache: "no-store",
        })
      ).json();
      SetApplicationData(applicationData.applicationDetails);
      const responseData: any = await (
        await fetch(`/api/urls/fetchUrl?id=${data.app}&name=${data.name}`, {
          cache: "no-store",
        })
      ).json();
      setFetchedData(responseData);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <ContentLayout title="Manage">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Application Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className=" px-6 py-2 my-12">
          <div className="flex">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex items-end justify-start gap-4 "
              >
                <FormField
                  control={form.control}
                  name="app"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[400px]">
                          <SelectValue placeholder="Select an Application" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {values.map((opts, i) => (
                              <SelectItem key={i} value={opts._id}>
                                {opts.applicationName}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>

                  <div className="flex">
                    <div className="main-app">
                        
                    </div>
                  </div>

          </div>
        </div>
      </ContentLayout>
    </>
  );
};

export default Page;
