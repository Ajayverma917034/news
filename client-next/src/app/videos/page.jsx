"use client";
import { findHindi } from "@/assets/data";
import MoreNewsVideoCard from "@/components/news-video/MoreNewsVideoCard";
import SideNews from "@/components/side-news/SideNews";
import Heading from "@/lib/Heading";
import useInfiniteScroll from "@/lib/useInfiniteScroll";
import { CollectionNewsSkeleton } from "@/skeleton/HomeSkeleton";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";

const MoreVideos = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (page) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/news/youtube`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
          body: JSON.stringify({
            data: ["बड़ी ख़बरें", "uttar pradesh", "crime", "education"],
            page,
          }),
        }
      );
      const data = await response.json();
      setData((prevData) => [...prevData, ...data.news]);
      setHasMore(data.news.length > 0);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    setData([]);
    setPage(1);
    fetchNews(1);
    window.scrollTo(0, 0);
  }, []);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page === 1) return;
    fetchNews(page);
  }, [page]);

  const [lastElementRef, isLoading] = useInfiniteScroll(loadMore, hasMore);

  return (
    <div className="flex spacing mt-2 sm:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full gap-5 ">
        <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden w-full">
          {data ? (
            <>
              {!data.length ? (
                <div>No more news</div>
              ) : (
                <div className="flex w-full flex-col flex-wrap sm:gap-4 ">
                  {/* <MetaDataSection title={`${title} news`} /> */}
                  <Heading title={findHindi("videos")} />
                  {data.length > 0 && (
                    <Link href={`/video/${data[0]?.news_id}`}>
                      <div className="h-[180px] sm:h-[180px] md:h-[400px] w-full mt-2 relative shadow-card p-1">
                        <Image
                          src={`https://img.youtube.com/vi/${data[0]?.videoLinkId}/mqdefault.jpg`}
                          alt="News Image"
                          width={1200}
                          height={400}
                          sizes={{
                            maxWidth: "100%",
                            height: "auto",
                          }}
                          className="z-0 h-full w-full object-cover rounded-md"
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-5"></div>
                        <div className="absolute inset-0 flex justify-center items-center">
                          <FaYoutube className="w-12 h-12 text-[#CD201F] cursor-pointer" />
                        </div>
                        <div className="absolute bottom-0 text-center w-full">
                          <h1 className="news-title-lg line-clamp-2 text-white text-start lg:text-[27px] bg-gradient-to-t from-gray to-transparent p-2">
                            {data[0]?.title}
                          </h1>
                        </div>
                      </div>
                    </Link>
                  )}
                  <div className="flex w-full flex-col flex-wrap mt-1 gap-y-1 md:gap-y-6 md:py-6 p-1">
                    {data.slice(1).map((item, index) => (
                      <div key={index}>
                        <MoreNewsVideoCard data={item} />
                        {(index + 1) % 6 === 0 && <div>hello</div>}
                      </div>
                    ))}
                    <div ref={lastElementRef}></div>
                    {isLoading && <div>Loading more...</div>}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <CollectionNewsSkeleton />
              <CollectionNewsSkeleton />
            </>
          )}
        </div>
        <div className="flex flex-col gap-y-2 md:gap-y-10 md:col-span-2 md:mt-10">
          {/* <CustomeAndGoogleAdd /> */}
          <SideNews title={"education"} />
        </div>
      </div>
    </div>
  );
};

export default MoreVideos;
