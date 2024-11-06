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
import DetailAds from "@/components/ads/DetailAds";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import Head from "next/head";
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
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState(null);
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

  const handleGoRelatedNews = (id) => {
    window.location.href = `/news/${id}`;
  };

  const handleNextNews = async () => {
    window.location.href = `/news/${randomNewsId}`;
    const isMobile = window.innerWidth <= 768; // Adjust the threshold as needed
    // window.location.reload();
    // Set scroll position based on device type
    if (isMobile) {
      window.scrollTo(0, 250);
    } else {
      window.scrollTo(0, 400);
    }

    // let incrementVal = 0;

    // let viewedNews = JSON.parse(sessionStorage.getItem("viewedNews") || "[]");

    // if (!viewedNews.includes(randomNewsId)) {
    //   viewedNews.push(randomNewsId); // Add the news_id to the array
    //   sessionStorage.setItem("viewedNews", JSON.stringify(viewedNews)); // Store the updated array
    //   incrementVal = 1;
    // } else {
    //   incrementVal = 0;
    // }

    // try {
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-news`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       cache: "no-cache",

    //       body: JSON.stringify({
    //         news_id: randomNewsId,
    //         incrementVal,
    //         mode: "read",
    //         draft: false,
    //       }),
    //     }
    //   );

    //   if (response.ok) {
    //     const data = await response.json();
    //     setNews(data?.news);
    //     setRelatedNews(data?.relatedNews);
    //     setRandomNewsId(data?.randomNewsId[0]?.news_id);
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };
  useEffect(() => {
    if (news_id && news_id !== "[object Object]") {
      fetchNews();

      // Adjust scroll position based on device type
      const isMobile = window.innerWidth <= 768; // Adjust the threshold as needed
      if (isMobile) {
        window.scrollTo(0, 250);
      } else {
        window.scrollTo(0, 400);
      }
    }
  }, [news_id]);

  // const keywords = news?.tags?.length > 0 ? tags.join(", ") + ", " : "";
  return (
    <div className="flex flex-col spacing mt-2 w-full max-sm:px-2 relative">
      <div className="fixed right-0 top-[400px] transform -translate-y-3/2 z-[1000]">
        <button
          onClick={handleNextNews}
          className="bg-red text-white p-2 pt-3 sm:pt-4 sm:p-3 rounded-l-lg shadow-md hover:bg-red-700 transition"
        >
          अगली खबर
        </button>
      </div>

      {news && (
        <Head>
          {/* <title>{news?.title}</title> */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                headline: news?.title,
                image: [news?.banner],
                datePublished: news?.createdAt,
                dateModified: news?.updatedAt,
                author: {
                  "@type": "Person",
                  name: "Janpad News Live",
                },
                publisher: {
                  "@type": "Organization",
                  name: "Janpad News Live",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://img.janpadnewslive.com/image/2024-10-18_06-17-48_logoimg.png", // Replace with actual logo URL
                  },
                },
                description: news?.description,
                articleBody: news?.content[0]?.blocks[0]?.data?.text || "", // Assuming content has blocks
                keywords: "keywords",
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://janpadnewslive.com/news/${news?.news_id}`, // Replace with actual news URL
                },
              }),
            }}
          />
        </Head>
      )}

      <div className="grid max-sm:flex flex-col sm:grid-cols-6 sm:gap-6 w-full gap-x-2">
        <div className="col-span-6 md:col-span-4 w-full">
          <article className="">
            <PageContent2 item={news} />
          </article>
          {randomNewsId && (
            <div className="bg-gray h-[200px] md:h-[300px] flex justify-center items-center w-full relative">
              <DetailAds />
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 z-[100] flex gap-x-1 rounded-md p-1 font-sans items-center">
                <Link
                  href={"/advertisement-us"}
                  className="text-[#f9f9f9] text-[12px] "
                >
                  <HiOutlineExclamationCircle
                    size={18}
                    className="text-[#f9f9f9] font-sans"
                  />
                </Link>
                <span className="text-[#f9f9f9] text-[12px]">Sponsored</span>
              </div>
            </div>
          )}
          <div className="flex flex-col w-full h-[10rem] bg-[#f0f0f0] mb-2 mt-2">
            <p className="text-center">Advertisement</p>
            <GoogleAds
              adClient="ca-pub-5839947415375117"
              adSlot="9305973634"
              style={{ display: "block", width: "100%", height: "100%" }}
            />
          </div>
          {!relatedNews ? (
            <>
              <div className="flex flex-col gap-3 mt-10">
                <div className="h-[25px] bg-[#dddbdd] animate-pulse"></div>

                {
                  <div className="flex gap-5 flex-col md:flex-row justify-between mb-4">
                    {[1, 2, 3].map((item, index) => (
                      <div
                        className="w-full flex flex-col max-md:flex-row max-md:gap-5 max-md:grid max-md:grid-cols-5 rounded-lg"
                        key={index}
                      >
                        <div className="max-w-[17rem] h-24 md:h-36 col-span-2 relative rounded-lg bg-[#dddbdd] animate-pulse"></div>
                        <div className="bg-[#dddbdd] animate-pulse h-4 mt-3"></div>
                      </div>
                    ))}
                  </div>
                }
              </div>
            </>
          ) : relatedNews.length ? (
            <div className="w-full flex flex-col">
              <Heading title={"सम्बंधित खबर"} />
              <div className="flex max-lg:flex-col gap-2 w-full">
                {relatedNews.map((item, index) => (
                  <div
                    onClick={() => handleGoRelatedNews(item?.news_id)}
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
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}

          {/* <div className="w-full max-md:mt-2 flex items-center justify-center mt-2">
            <RandomNewsPage news={randomEventNews} ads={ads} />
          </div> */}
          <div className="w-full max-md:mt-2 flex items-center justify-center mt-2 bg-red"></div>
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
          <div className="clever-core-ads"></div>
          <div className="flex flex-col w-full">
            <GoogleAds
              adClient={"ca-pub-5839947415375117"}
              adSlot={"3540617420"}
              style={{ display: "block" }}
              format={"autorelaxed"}
            />
          </div>
          <div className="clever-core-ads"></div>
          <div className="flex flex-col w-full">
            <GoogleAds
              adClient={"ca-pub-5839947415375117"}
              adSlot={"2064081310"}
              style={{ display: "block" }}
              format={"autorelaxed"}
            />
          </div>
          <div className="clever-core-ads"></div>
          <div className="flex flex-col w-full h-[10rem] bg-[#f0f0f0] mb-2 mt-1">
            <p className="text-center">Advertisement</p>
            <GoogleAds
              adClient="ca-pub-5839947415375117"
              adSlot="7405940317"
              style={{ display: "block", width: "100%", height: "100%" }}
            />
          </div>
          <div className="clever-core-ads"></div>
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
