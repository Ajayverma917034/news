import React from "react";
import { CiLocationOn } from "react-icons/ci";
// import HorizontalAdsGoogle from "../../../pages/advertisement/HorizontalAdsGoogle";
import Link from "next/link";
import { CollectionNewsSkeleton } from "@/skeleton/HomeSkeleton";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";
import { handleImageError } from "@/lib/errorImg";
import Heading from "@/lib/Heading";

const NewsSection = ({ data, title }) => {
  return (
    <>
      {data ? (
        <>
          {data.length > 0 && (
            <div className="flex w-full flex-col flex-wrap sm:gap-4 p-1">
              <Heading title={title} />
              {data[0]?.news_id && (
                <Link
                  href={`/news/${data[0]?.news_id}`}
                  className="flex md:flex-row flex-col justify-between w-full shadow-card max-sm:mb-2 rounded-md"
                >
                  <div className="md:w-[50%] w-full h-[200px] sm:h-[250px] p-1">
                    <Image
                      src={data[0].banner}
                      width={1200}
                      height={400}
                      sizes={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                      alt="news-img"
                    />
                  </div>

                  <div className="md:w-[45%] w-full max-sm:px-1">
                    <div className="flex justify-between items-center">
                      <p className="date-lg">
                        {formatDate(data[0]?.createdAt)}
                      </p>
                      <div className="flex items-center md:hidden">
                        <CiLocationOn className="location-lg" />
                        <p className="location-title-lg pt-1 px-1 capitalize">
                          {data[0]?.location}
                        </p>
                      </div>
                    </div>
                    <h1 className="news-title-lg font-semibold">
                      {data[0]?.title}
                    </h1>
                    <div className="flex items-center max-md:hidden">
                      <CiLocationOn className="location-lg" />
                      <p className="location-title-lg pt-1 px-3 capitalize">
                        {data[0]?.location}
                      </p>
                    </div>
                  </div>
                </Link>
              )}

              <div className="grid md:grid-cols-2 max-sm:gap-y-2 gap-4 mb-4">
                {data &&
                  data.slice(1).map((card, index) => {
                    return (
                      <Link
                        href={`/news/${card.news_id}`}
                        key={index}
                        className="grid grid-cols-3 max-md:gap-x-1 rounded-sm shadow-card"
                      >
                        <div className="col-span-1 p-1 max-h-[120px] relative h-[105px]">
                          <Image
                            alt="news"
                            src={card.banner}
                            width={1200}
                            height={800}
                            sizes={{
                              maxWidth: "100%",
                              height: "auto",
                            }}
                            priority={false}
                          />
                        </div>

                        <div className="md:ml-4 col-span-2 p-1">
                          <h2 className="text-lg md:text-2xl font-semibold line-clamp-2">
                            {card.title}
                          </h2>
                          <p className="text-gray-500 line-clamp-1">
                            {formatDate(card.createdAt)}
                          </p>
                          <div className="flex items-center">
                            <CiLocationOn className="location-sm mb-1 text-red" />
                            <p className="location-title-sm px-1 capitalize">
                              {card?.location}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
              <div className="w-full h-[5rem] md:h-[9rem] max-md:mt-2 flex items-center justify-center bg-green-300">
                {/* <HorizontalAdsGoogle /> */}
              </div>
            </div>
          )}
        </>
      ) : (
        <CollectionNewsSkeleton />
      )}
    </>
  );
};

export default NewsSection;
