"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toaster, toast } from "react-hot-toast";
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import axios from "axios"


interface Application {
  _id: string;
  applicationName: string;
}

interface URLdata {
  _id: string;
  link: string;

}

const FormSchema = z.object({
  applicationName: z
    .string({
      required_error: "Please select an application.",
    }),
    url: z.string().min(2).max(150),
    clientAppName: z.string().min(2).max(150),
    clientAppURL: z.string().min(2).max(150),
})

export function ClientApp() {
  const [values, setValues] = useState<Application[]>([])
  const [url, setURL] = useState<URLdata[]>([])

  useEffect(() => {
    fetch(`/api/applications/fetchApplications`, { cache: 'no-store' })
      .then((data) => data.json())
      .then((val) => setValues(val.apps))
  }, [])

  function handleAppChange(e: any) {  
      fetch(`/api/urls/fetchUrl/${e}`, { cache: 'no-store' })
        .then((data) => data.json())
        .then((val) => setURL(val))
  }

 
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.post(`/api/urls/addClientApps/${data.url} `, data);

      
      toast.success(" Client Interfacing Application Added successfully");
      
    } catch (error) {
      toast.error("Failed to add Client Interfacing Application")
    }
    
  }

  return (
    <div className="w-[800px] border-2 rounded-md p-12 mt-4">
       <div><Toaster/></div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="applicationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Name</FormLabel>
              <Select onValueChange={(value)=>{
                handleAppChange(value)
                field.onChange(value)
              }}>
                        <SelectTrigger className="w-full" >
                          <SelectValue placeholder="Select an Application" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {values.map((opts, i) => (
                              <SelectItem key={i} value={opts._id}>{opts.applicationName}</SelectItem>
                            ))}
                          </SelectGroup>

                        </SelectContent>
                      </Select>
              <FormDescription>
                You can add new application in{" "}
                <Link href="/manage">Manage Applications</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an URL" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {url.map((opts, i) => (
                      <SelectItem key={i} value={opts._id}>{opts.link}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can add new application in{" "}
                <Link href="/manage">Manage Applications</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
       <FormField
          control={form.control}
          name="clientAppName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Interfacing Application Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full" >
                          <SelectValue placeholder="Select a Client Interfacring Application" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {values.map((opts, i) => (
                              <SelectItem key={i} value={opts._id}>{opts.applicationName}</SelectItem>
                            ))}
                          </SelectGroup>

                        </SelectContent>
                      </Select>
              <FormDescription>
                You can add new application in{" "}
                <Link href="/manage">Manage Applications</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientAppURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Application URL</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                This is your client application URL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
    </div>
  )
}
