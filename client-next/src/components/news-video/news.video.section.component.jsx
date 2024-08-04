import React from "react";
import { CiLocationOn } from "react-icons/ci";
import NewsVideoCard from "./news.video.card.section.component";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { YtCollectionSkeleton } from "@/skeleton/HomeSkeleton";
import Image from "next/image";
import Heading2 from "@/lib/Heading2";
import { formatDate } from "@/lib/formatDate";

const NewsVideo = ({ data, title }) => {
  return (
    <>
      {data && data.length ? (
        <>
          <div className="flex w-full flex-col flex-wrap sm:gap-2 md:gap-6 mt-2 p-1">
            <Heading2 link={"/top-videos"} title={title} />
            {/* Main Section  */}
            <Link
              href={`/video/${data[0]?.news_id}`}
              className="flex md:flex-row flex-col justify-between w-full shadow-card max-sm:mb-2 rounded-md p-1"
            >
              <div className="md:w-[50%] w-full h-auto max-h-[16rem] rounded-md relative">
                <Image
                  src={`https://img.youtube.com/vi/${data[0]?.videoLinkId}/mqdefault.jpg`}
                  width={1200}
                  height={400}
                  sizes={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  alt="video"
                />
                {/* <Image
                  className="w-full h-full rounded-md"
                  src={`https://img.youtube.com/vi/${data[0]?.videoLinkId}/mqdefault.jpg`}
                /> */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-5"></div>

                <div className="absolute inset-0 flex justify-center items-center">
                  <FaYoutube className="w-12 h-12 text-[#CD201F] cursor-pointer" />
                </div>
              </div>

              <div className="md:w-[45%] w-full p-1">
                <div className="flex justify-between items-center">
                  <p className="date-lg">{formatDate(data[0]?.createdAt)}</p>
                  <div className="flex items-center md:hidden">
                    <CiLocationOn className="location-lg" />
                    <p className="location-title-lg pt-1 px-1 capitalize">
                      {data[0]?.location}
                    </p>
                  </div>
                </div>
                <h1 className="news-title-lg">{data[0]?.title}</h1>
                <div className="flex items-center max-md:hidden">
                  <CiLocationOn className="location-lg" />
                  <p className="location-title-lg pt-1 px-3 capitalize">
                    {data[0]?.location}
                  </p>
                </div>
              </div>
            </Link>
            <div className="flex flex-col">
              {
                <div className="flex gap-2 flex-col md:flex-row justify-between mb-4">
                  {data.length &&
                    data
                      .slice(1, 4)
                      .map((item, index) => (
                        <NewsVideoCard item={item} key={index} />
                      ))}
                </div>
              }
            </div>
          </div>
          <div className="w-full h-[6rem]  md:h-[10rem] max-md:mt-2 flex items-center justify-center mt-2">
            {/* <img
              src={adsmiddleimg}
              alt="adsimg"
              className=" w-full h-full object-fill"
            /> */}
          </div>
        </>
      ) : (
        <YtCollectionSkeleton />
      )}
    </>
  );
};

export default NewsVideo;
