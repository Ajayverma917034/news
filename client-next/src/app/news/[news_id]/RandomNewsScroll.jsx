"use client";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Heading from "@/lib/Heading";
import { formatDate } from "@/lib/formatDate";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import PageContent from "@/components/single-page/PageContent";
import NewsShare from "@/components/single-page/NewsShare";
import LazyAdSenseAd from "../../../../components/NewGoogleAds";
import NewsContent from "@/components/single-page/NewsContent";
import DetailAds from "@/components/ads/DetailAds";
import Link from "next/link";
import RelatedNews from "../../../../components/RelatedNews";
import { useRouter } from "next/navigation";

const NewsBlock = ({ news, index }) => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const router = useRouter();

  useEffect(() => {
    if (inView) {
      console.log("In view:", news.news_id);
      router.replace(`/news/${news.news_id}`, { scroll: false });
    }
  }, [inView, news.news_id, router]);

  return (
    <div key={index} className="mt-5" ref={ref}>
      <Heading title="और भी पढ़े" />
      <div className="col-span-6 md:col-span-4 w-full flex flex-col">
        <article className="py-4 flex flex-col flex-wrap w-full">
          <div className="flex flex-col">
            <h1 className="font-semibold text-[20px] md:text-[25px]">
              {news.title}
            </h1>
            <p className="date-lg text-wrap">{news.description}</p>
          </div>
          <div className="w-full h-[240px] sm:h-[350px] mt-3 p-1 bg-white">
            <Image
              src={news.banner}
              width={1200}
              height={600}
              sizes={{
                maxWidth: "100%",
                height: "auto",
              }}
              alt="news-img"
              className="w-full max-sm:max-w-screen-sm h-full object-cover"
              loading="lazy"
            />
          </div>
          {news?.imageRef && (
            <div className="flex gap-3 mt-1">
              <p className="text-[16px]">{news?.imageRef}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-y-2 sm:flex sm:flex-row items-center py-2 justify-between w-full">
            <div className="flex items-center">
              <CiLocationOn size={25} className="text-red" />
              <h3 className="news-title-md mt-2 ml-1 capitalize">
                {news.location}
              </h3>
            </div>
            <div>
              <h3 className="date-lg">{formatDate(news.createdAt)}</h3>
            </div>

            <NewsShare item={news} />
          </div>
          <a
            href="https://www.whatsapp.com/channel/0029VaCW5oSI1rcoWIaACL1j"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 my-2 border-[3px] border-green-600 rounded-md flex justify-center items-center font-semibold text-green-700 w-full hover:text-white hover:bg-green-700 cursor-pointer transition-all delay-75"
          >
            Whatsapp चैनल फॉलो करे !
          </a>
          {/* google ads */}
          <LazyAdSenseAd
            adClient={"ca-pub-5839947415375117"}
            adSlot="9042024417"
            adFormat="auto"
          />

          <NewsContent item={news} />

          <LazyAdSenseAd
            adClient={"ca-pub-5839947415375117"}
            adSlot="7265074166"
            adFormat="auto"
          />
        </article>
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
        {/* <RelatedNews news_id={news_id} /> */}
        <LazyAdSenseAd
          adClient={"ca-pub-5839947415375117"}
          adSlot="9891237509"
          adFormat="auto"
        />
      </div>
    </div>
  );
};

const RandomNewsScroll = ({ initialNewsId }) => {
  const fetchNews = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-random-news`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ news_id: initialNewsId, pageParam }),
      }
    );

    const { news } = await response.json();
    return news; // single object, not array
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["randomNews"],
      queryFn: fetchNews,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && allPages?.length <= 10) {
          return allPages.length + 1;
        }
        return undefined;
      },
    });

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <div className="w-full">
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error loading news.</p>}

      {data?.pages?.map((news, index) => (
        <NewsBlock key={index} news={news} index={index} />
      ))}

      <div ref={ref} className="h-10 flex justify-center items-center">
        {isFetchingNextPage && <p>Loading more...</p>}
        {!hasNextPage && <p></p>}
      </div>
    </div>
  );
};

export default RandomNewsScroll;
