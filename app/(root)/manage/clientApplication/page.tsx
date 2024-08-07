'use client'
 
import PageTitle from '@/components/PageTitle';
import { ClientApp } from '@/components/forms/ClientApp';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { useEffect, useState } from "react";

interface Userdata {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}


const Page = () => {

  const [fetchedData, setFetchedData] = useState<Userdata>();
  useEffect(() => {
    fetch("/api/users/profile")
      .then((data) => data.json())
      .then((val) => setFetchedData(val.data))
  }, [])
  if (fetchedData?.role === 'user') {
    return <>
      <div className='w-full flex h-[300px] justify-start '>
        <h1 className='text-xl p-8 m-8 font-bold '>Hey! You need to be a Primary Adminstrator to create a new Application.</h1>
      </div>

    </>;
  }
  return (
    <div className=''>
      <ContentLayout title="New URL">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/manage">Manage</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add New URL</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>

        </Breadcrumb>
      <div className='flex w-full'>
           <ClientApp/>
        <div className='flex flex-col gap-4 m-12'>
          <Button><Link href={'/applicationdetails'}>View Application Details</Link></Button>
        </div>
        </div>
      </ContentLayout>
       
    </div>
  )
}

export default Page