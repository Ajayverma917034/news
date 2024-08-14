"use client";
import CustomeAndGoogleAdd2 from "@/components/ads/CustomeAndGoogleAdd2";
import EventPageContent from "@/components/single-page/EventPageContent";
import Heading from "@/lib/Heading";

import React, { useState, useEffect } from "react";
export const newsStructure = {
  title: "",
  des: "",
  banner: "",
  createdAt: "",
};
const RandomNewsPage = ({ news, ads }) => {
  //   const [news, setNews] = useState(newsStructure);

  return (
    <div className="flex mt-2 w-full max-sm:px-1">
      {/* <div className="grid max-sm:flex flex-col sm:grid-cols-6 sm:gap-6 w-full gap-x-2"> */}
      <div className="w-full">
        <article className="">
          {/* <Heading title={''} /> */}
          <EventPageContent item={news} ads={ads?.detailAds} />
        </article>

        <div className="w-full max-md:mt-2 flex items-center justify-center mt-2">
          {/* <HorizontalAdsGoogle /> */}
        </div>
        {/* <div className="hidden max-sm:flex mt-3">
          <CustomeAndGoogleAdd2 sideAds={ads?.sideAds} />
        </div> */}
      </div>

      {/* <div className="flex flex-col gap-y-2 md:gap-y-10 md:col-span-2 md:mt-10">
          <div className="sticky top-36 max-md:hidden">
            <CustomeAndGoogleAdd2 sideAds={ads?.sideAds} />
          </div>
          <SideNews title={"education"} />
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default RandomNewsPage;
