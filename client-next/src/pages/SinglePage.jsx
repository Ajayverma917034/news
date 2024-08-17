"use client";
import RandomNewsScroll from "@/app/news/[news_id]/RandomNewsScroll";
import CustomeAndGoogleAdd2 from "@/components/ads/CustomeAndGoogleAdd2";
import EventPageContent from "@/components/single-page/EventPageContent";
import PageContent2 from "@/components/single-page/PageContent2";
import Heading from "@/lib/Heading";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import RandomNewsPage from "./RandomNewsPage";
export const newsStructure = {
  title: "",
  des: "",
  content: [],
  tags: [],
  banner: "",
  createdAt: "",
  categories: [],
  location: "",
};
const SinglePage = ({ news_id, ads }) => {
  const [news, setNews] = useState(newsStructure);
  const [relatedNews, setRelatedNews] = useState([]);
  const [randomEventNews, setRandomEventNews] = useState(null);

  const fetchNews = async () => {
    let incrementVal = 0;

    let viewedNews = JSON.parse(sessionStorage.getItem("viewedNews") || "[]");

    if (!viewedNews.includes(news_id)) {
      viewedNews.push(news_id); // Add the news_id to the array
      sessionStorage.setItem("viewedNews", JSON.stringify(viewedNews)); // Store the updated array
      incrementVal = 1;
    } else {
      incrementVal = 0;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-news`,
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
        setRelatedNews(data?.relatedNews);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const fetchRandomEventNews = async () => {
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
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-random-event-news`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",

          body: JSON.stringify({
            incrementVal,
            mode: "read",
            draft: false,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        setRandomEventNews(data?.news);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch news data when the component mounts
  useEffect(() => {
    if (news_id && news_id !== "[object Object]") {
      fetchNews();
      fetchRandomEventNews();
    }
  }, []);

  // console.log(news);
  // console.log(relatedNews);

  return (
    <div className="flex spacing mt-2 w-full max-sm:px-1">
      <div className="grid max-sm:flex flex-col sm:grid-cols-6 sm:gap-6 w-full gap-x-2">
        <div className="col-span-6 md:col-span-4 w-full">
          <article className="">
            <PageContent2 item={news} ads={ads?.detailAds} />
          </article>

          {relatedNews && relatedNews.length ? (
            <div className="w-full">
              <Heading title={"सम्बंधित खबर"} />
              <div className="flex max-lg:flex-col gap-2 w-full">
                {relatedNews.map((item, index) => (
                  <Link
                    href={`/news/${item?.news_id}`}
                    key={index}
                    className="grid grid-cols-3 gap-x-1 max-md:gap-x-1 lg:flex lg:flex-col lg:w-[200px] shadow-card p-1 rounded-md max-lg:gap-x-3"
                  >
                    <div className="max-lg:col-span-1 h-[80px] max-h-[103px] lg:h-[120px] max-lg:max-w-36 rounded-md">
                      <Image
                        src={item?.banner}
                        alt="Relative-news-image"
                        width={1200}
                        height={800}
                        sizes={{
                          maxWidth: "100%",
                          height: "auto",
                        }}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-95 rounded-md"
                      />
                    </div>
                    <h3 className="col-span-2 mt-2 font-semibold line-clamp-2 text-xl md:hover:border-b hover:border-black">
                      {item?.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="w-full max-md:mt-2 flex items-center justify-center mt-2">
            <RandomNewsPage news={randomEventNews} ads={ads} />
          </div>
          <div className="w-full max-md:mt-2 flex items-center justify-center mt-2">
            {/* <HorizontalAdsGoogle /> */}
          </div>
          <div className="hidden max-sm:flex mt-3">
            <CustomeAndGoogleAdd2 sideAds={ads?.sideAds} />
          </div>

          <div className="flex mt-2 w-full">
            {/* Existing content */}
            <RandomNewsScroll initialNewsId={news_id} />
          </div>
        </div>

        <div className="flex flex-col gap-y-2 md:gap-y-10 md:col-span-2 md:mt-10">
          <div className="sticky top-36 max-md:hidden">
            <CustomeAndGoogleAdd2 sideAds={ads?.sideAds} />
          </div>
          {/* <SideNews title={"education"} /> */}
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
