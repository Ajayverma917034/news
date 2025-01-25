"use client";
import CustomeAndGoogleAdd from "@/components/ads/CustomeAndGoogleAdd";
import CustomeAndGoogleAdd2 from "@/components/ads/CustomeAndGoogleAdd2";
import EventPageContent from "@/components/single-page/EventPageContent";

import React, { useState, useEffect } from "react";
export const newsStructure = {
  title: "",
  des: "",
  banner: "",
  createdAt: "",
};
const EventSinglePage = ({ news_id }) => {
  const [news, setNews] = useState(newsStructure);

  const fetchNews = async () => {
    let incrementVal = 0;

    // Parse session storage or initialize an empty array if it doesn't exist
    let viewedNews = JSON.parse(sessionStorage.getItem("viewedNews") || "[]");

    // // Check if the news_id is not already viewed
    if (!viewedNews.includes(news_id)) {
      viewedNews.push(news_id); // Add the news_id to the array
      sessionStorage.setItem("viewedNews", JSON.stringify(viewedNews)); // Store the updated array
      incrementVal = 1;
    } else {
      incrementVal = 0;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-event-news`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",

          body: JSON.stringify({
            news_id,
            incrementVal,
            mode: "read",
            draft: false,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNews(data?.news);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch news data when the component mounts
  useEffect(() => {
    if (news_id && news_id !== "[object Object]") {
      fetchNews();
    }
  }, []);

  // console.log(news);
  // console.log(relatedNews);

  return (
    <div className="flex spacing mt-2 w-full max-sm:px-1">
      <div className="grid max-sm:flex flex-col sm:grid-cols-6 sm:gap-6 w-full gap-x-2">
        <div className="col-span-6 md:col-span-4 w-full">
          <article className="">
            <EventPageContent item={news} />
          </article>

          <div className="w-full max-md:mt-2 flex items-center justify-center mt-2">
            {/* <HorizontalAdsGoogle /> */}
          </div>
          <div className="hidden max-sm:flex mt-3">
            <CustomeAndGoogleAdd />
          </div>
        </div>

        <div className="flex flex-col gap-y-2 md:gap-y-10 md:col-span-2 md:mt-10">
          <div className="sticky top-36 max-md:hidden">
            <CustomeAndGoogleAdd />
          </div>
          {/* <SideNews title={"education"} /> */}
        </div>
      </div>
    </div>
  );
};

export default EventSinglePage;
