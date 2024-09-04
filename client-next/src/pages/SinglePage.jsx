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
import GoogleAds from "../../components/GoogleAds";
import { useRouter } from "next/navigation";
import CustomeAndGoogleAdd from "@/components/ads/CustomeAndGoogleAdd";
export const newsStructure = {
  title: "",
  des: "",
  content: [],
  tags: [],
  banner:
    "https://img.janpadnewslive.com/image/2024-08-29_16-26-31_janpad_news_live.png",
  createdAt: "",
  categories: [],
  location: "",
};
const SinglePage = ({ news_id }) => {
  const [news, setNews] = useState(newsStructure);
  const [relatedNews, setRelatedNews] = useState([]);
  const [randomEventNews, setRandomEventNews] = useState(null);
  const [randomNewsId, setRandomNewsId] = useState(null);

  const router = useRouter();
  // let isProduction = process.env.NEXT_NODE_ENV;

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
        setRandomNewsId(data?.randomNewsId[0]?.news_id);
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

  const handleNextNews = async () => {
    router.push(`/news/${randomNewsId}`);
    const isMobile = window.innerWidth <= 768; // Adjust the threshold as needed

    // Set scroll position based on device type
    if (isMobile) {
      window.scrollTo(0, 250);
    } else {
      window.scrollTo(0, 400);
    }

    let incrementVal = 0;

    let viewedNews = JSON.parse(sessionStorage.getItem("viewedNews") || "[]");

    if (!viewedNews.includes(randomNewsId)) {
      viewedNews.push(randomNewsId); // Add the news_id to the array
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
            news_id: randomNewsId,
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
        setRandomNewsId(data?.randomNewsId[0]?.news_id);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (news_id && news_id !== "[object Object]") {
      fetchNews();
      // fetchRandomEventNews();
    }
  }, [news_id]);

  // console.log(news);
  // console.log(relatedNews);

  return (
    <div className="flex flex-col spacing mt-2 w-full max-sm:px-1 relative">
      <div className="fixed right-0 top-3/2 transform -translate-y-3/2 z-[1000]">
        <button
          onClick={handleNextNews}
          className="bg-red text-white p-2 pt-3 sm:pt-4 sm:p-3 rounded-l-lg shadow-md hover:bg-red-700 transition"
        >
          अगली खबर
        </button>
      </div>

      <div className="grid max-sm:flex flex-col sm:grid-cols-6 sm:gap-6 w-full gap-x-2">
        <div className="col-span-6 md:col-span-4 w-full">
          <article className="">
            <PageContent2 item={news} />
          </article>
          <div className="flex flex-col w-full max-h-[10rem]">
            <GoogleAds
              adClient="ca-pub-5839947415375117"
              adSlot="9305973634"
              style={{ display: "block", width: "100%", height: "100%" }}
              format={"auto"}
            />
          </div>
          {relatedNews && relatedNews.length ? (
            <div className="w-full flex flex-col">
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

          {/* <div className="w-full max-md:mt-2 flex items-center justify-center mt-2">
            <RandomNewsPage news={randomEventNews} ads={ads} />
          </div> */}
          <div className="w-full max-md:mt-2 flex items-center justify-center mt-2">
            {/* <HorizontalAdsGoogle /> */}
          </div>
          <div className="hidden max-sm:flex mt-3 items-center justify-center">
            {randomNewsId ? <CustomeAndGoogleAdd /> : <></>}
          </div>

          {/* <div className="flex flex-col mt-2 w-full">
            <div className="flex flex-col w-full gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                <div className="flex w-full max-h-[12rem] ">
                  <div></div>
                </div>
                <div className="flex w-full max-h-[12rem] ">
                  <div></div>
                </div>
              </div>
              <div className="flex w-full max-h-[12rem] ">
                <div></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                <div className="flex w-full max-h-[12rem] ">
                  <div></div>
                </div>
                <div className="flex w-full max-h-[12rem] ">
                  <div></div>
                </div>
              </div>
              <div className="flex w-full max-h-[12rem] ">
                <div></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                <div className="flex w-full max-h-[12rem] ">
                  <div></div>
                </div>
                <div className="flex w-full max-h-[12rem] "></div>
              </div>
              <div className="flex w-full max-h-[12rem] "></div>
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                <div className="flex w-full max-h-[12rem] "></div>
                <div className="flex w-full max-h-[12rem] "></div>
              </div>
              <div className="flex w-full max-h-[12rem] "></div>
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                <div className="flex w-full max-h-[12rem] "></div>
                <div className="flex w-full max-h-[12rem] "></div>
              </div>
              <div className="flex w-full max-h-[12rem] "></div>
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                <div className="flex w-full max-h-[12rem] "></div>
                <div className="flex w-full max-h-[12rem] "></div>
              </div>
              <div className="flex w-full max-h-[12rem] "></div>
            </div>
          </div> */}
          <div className="flex flex-col w-full">
            <GoogleAds
              adClient={"ca-pub-5839947415375117"}
              adSlot={"3540617420"}
              style={{ display: "block" }}
              format={"autorelaxed"}
            />
          </div>
          <div className="flex flex-col w-full">
            <GoogleAds
              adClient={"ca-pub-5839947415375117"}
              adSlot={"2064081310"}
              style={{ display: "block" }}
              format={"autorelaxed"}
            />
          </div>
          <div className="flex flex-col max-h-[10rem] w-full">
            <GoogleAds
              adClient="ca-pub-5839947415375117"
              adSlot="7405940317"
              style={{ display: "block", width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2 md:gap-y-10 md:col-span-2 md:mt-10">
          <div className="sticky top-36 max-md:hidden">
            {randomNewsId && <CustomeAndGoogleAdd />}
          </div>
          {/* <SideNews title={"education"} /> */}
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
