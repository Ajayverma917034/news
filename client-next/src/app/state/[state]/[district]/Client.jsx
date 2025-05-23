"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import MorePageCard from "@/components/news-section/morepage.news.card";
import {
  CollectionNewsSkeleton,
  MorePageSkeleton,
} from "@/skeleton/HomeSkeleton";
import { handleImageError } from "@/lib/errorImg";
import DetailAds from "@/components/ads/DetailAds";
import CustomeAndGoogleAdd from "@/components/ads/CustomeAndGoogleAdd";
import CustomePagination from "@/lib/CustomePagination";
import Heading from "@/lib/Heading";
import { findHindi } from "@/assets/data";
import {
  SquareAds1,
  SquareAds2,
  SquareAds3,
  SquareAds4,
  SquareAds5,
  SquareAds6,
  SquareAds7,
  SquareAds8,
  SquareAds9,
  SquareAds10,
} from "../../../../../components/SquareAds";

const Client = ({ state, district }) => {
  const [data, setData] = useState(null);
  const [totalNews, setTotalNews] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  // let { state, district } = params;
  state = state.split("%20").join(" ");
  district = district.split("%20").join(" ");
  const pageSize = 10;

  let prod = process.env.NEXT_NODE_ENV === "production";

  const fetchNews = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-news-query`,
        {
          limit: pageSize, // Adjust the limit based on the number of items per page
          district: district,
          page,
        }
      );
      const newData = response.data;
      setData(newData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNewsDocCount = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-news-query-docCount`,
        {
          district: district,
        }
      );
      setTotalNews(data.DocCount);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    fetchNews(newPage);
  };

  const getRandomSquareAd = () => {
    const ads = [
      SquareAds1,
      SquareAds2,
      SquareAds3,
      SquareAds4,
      SquareAds5,
      SquareAds6,
      SquareAds7,
      SquareAds8,
      SquareAds9,
      SquareAds10,
    ];
    return ads[Math.floor(Math.random() * ads.length)];
  };

  useEffect(() => {
    fetchNews(page);
    fetchNewsDocCount();
  }, [page, district]);

  return (
    <div className="flex spacing mt-2 sm:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full md:gap-5">
        <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden w-full">
          {data ? (
            data.length ? (
              <div className="flex w-full flex-col flex-wrap sm:gap-4">
                <Heading title={findHindi(district)} />
                {data.length > 0 && (
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
                )}
                <div className="flex w-full flex-col flex-wrap gap-y-2 md:gap-y-6 md:py-6 p-1 mt-1">
                  {data.slice(1).map((item, index) => (
                    <div
                      key={`news-${index}`}
                      className="flex w-full flex-col gap-y-1 md:gap-y-6"
                    >
                      <MorePageCard data={item} />
                      {(index + 1) % 3 === 0 && (
                        <>
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
                          <div className="flex gap-y-4 gap-x-5 justify-center max-lg:flex-col">
                            <>
                              <div className="flex bg-[#f0f0f0] justify-center flex-col !h-full">
                                <p className="text-[16px] md:text-[18px] lg:text-[18px] text-center">
                                  Advertisement
                                </p>
                                {prod &&
                                  React.createElement(getRandomSquareAd())}
                              </div>
                              <CustomeAndGoogleAdd />
                            </>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="max-md:my-5 mb-4 flex justify-center w-full">
                  <CustomePagination
                    current={page}
                    totalItems={totalNews}
                    defaultCurrent={1}
                    itemsPerPage={pageSize}
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            ) : (
              <p className="text_20"> No news available</p>
            )
          ) : (
            <MorePageSkeleton />
          )}
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

export default Client;
