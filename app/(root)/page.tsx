"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";

import { WobbleCard } from "@/components/ui/wobble-card";

export default function Page() {
  return (
    <ContentLayout title="Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-[280px] bg-[#102641] min-h-[500px] lg:min-h-[280px]"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white">
              Find Application Administrators Effortlessly
            </h2>
            <p className="mt-4 text-left  text-base/6 text-neutral-200">
              Centralized Access: Locate Names and Emails of Administrators for
              Every Application!
            </p>
          </div>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 h-[280px] min-h-[280px] bg-[#102641]">
          <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white">
            Retrieve Comprehensive Details about Applications
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Name ,Description , IP Address , MOTS ID , Host Details etc
          </p>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-[#21528c] h-[300px] min-h-[300px] lg:min-h-[300px] xl:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white">
              Find and Manage details about Application URLs Easily!
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              URL Type , Link and Client Interfacing Application Details.
            </p>
          </div>
        </WobbleCard>
      </div>
    </ContentLayout>
  );
}
