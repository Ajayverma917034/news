"use client";

import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import Link from "next/link";
import axios from "axios";
import useInfiniteScroll from "@/lib/useInfiniteScroll";
import { findHindi } from "@/assets/data";
import Heading from "@/lib/Heading";
import { CollectionNewsSkeleton } from "@/skeleton/HomeSkeleton";
import MoreEventPageCard from "@/components/news-section/more.eventpage.news.card";
import DetailAds from "@/components/ads/DetailAds";

const EventNews = ({ event_type = "" }) => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-event-news-query`,
        {
          limit: 10,
          page,
          event_type,
        }
      );
      const newData = response.data;

      // Avoid appending if data is already loaded
      if (newData.length > 0) {
        setData((prevData) => {
          const ids = prevData.map((item) => item.news_id);
          const filteredData = newData.filter(
            (item) => !ids.includes(item.news_id)
          );
          return [...prevData, ...filteredData];
        });
        setHasMore(newData.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setData([]);
    setPage(1);
    fetchNews(1);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      fetchNews(page);
    }
  }, [page]);

  const [lastElementRef] = useInfiniteScroll(loadMore, hasMore && !isLoading);

  return (
    <div className="flex spacing mt-2 sm:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full">
        <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden w-full">
          {data ? (
            data.length ? (
              <div className="flex w-full flex-col flex-wrap ">
                <Heading
                  title={findHindi(
                    event_type ? event_type : "holi"
                  )}
                />
                {/* {data.length > 0 && (
                  <Link href={`/news/${data[0]?.news_id}`}>
                    <div className="h-[180px] md:h-[400px] w-full mt-0 relative p-1">
                      <Image
                        src={data[0]?.banner}
                        alt="News Image"
                        width={1200}
                        height={800}
                        sizes={{
                          maxWidth: "100%",
                          height: "auto",
                        }}
                        onError={handleImageError}
                        className="z-0 h-full w-full object-cover rounded-md"
                      />
                      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-5"></div>
                      <div className="absolute bottom-0 text-center w-full">
                        <h1 className="news-title-lg line-clamp-2 text-white text-start lg:text-[27px] bg-gradient-to-t from-gray to-transparent p-2">
                          {data[0]?.title}
                        </h1>
                      </div>
                    </div>
                  </Link>
                )} */}
                <div className="flex w-full flex-col flex-wrap gap-y-3 md:gap-y-6 p-1">
                  {data.map((item, index) => (
                    <div
                      key={`news-${index}`}
                      className="flex w-full flex-col gap-y-1 md:gap-y-6 my-5"
                    >
                      <MoreEventPageCard data={item} />
                      {/* {(index + 1) % 5 === 0 && ( */}
                      <div className="flex w-full">
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
                            <span className="text-[#f9f9f9] text-[12px]">
                              Sponsored
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* )} */}
                    </div>
                  ))}
                  <div ref={lastElementRef}></div>
                  {isLoading && <div>Loading more...</div>}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-40 w-full">
                <h2 className="text-5xl text-gray">No News Found</h2>
              </div>
            )
          ) : (
            <>
              <CollectionNewsSkeleton />
              <CollectionNewsSkeleton />
            </>
          )}
        </div>
        <div className="flex flex-col gap-y-2 md:gap-y-10 md:col-span-2 md:mt-10">
          {/* <CustomeAndGoogleAdd2 /> */}
          {/* <SideNews title={"education"} /> */}
        </div>
      </div>
    </div>
  );
};

export default EventNews;
