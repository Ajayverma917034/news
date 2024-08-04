import React from "react";
import { CiLocationOn } from "react-icons/ci";
// import { handleImageError } from "../../../common/errorImg";
import { FaYoutube } from "react-icons/fa";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import Image from "next/image";

const MoreNewsVideoCard = ({ data }) => {
  return (
    <>
      <Link
        href={`/video/${data?.news_id}`}
        className="grid grid-cols-6 md:grid-cols-7 gap-2 md:gap-2 lg:h-[150px] shadow-card p-1 rounded-md w-full"
      >
        <div className="col-span-2 md:col-span-2 h-[95px] sm:h-[140px] w-full rounded-md relative">
          <Image
            src={`https://img.youtube.com/vi/${data?.videoLinkId}/mqdefault.jpg`}
            alt="Image"
            width={1200}
            height={400}
            sizes={{
              maxWidth: "100%",
              height: "auto",
            }}
            className="object-cover w-full h-full rounded-md"
            // onError={handleImageError}
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black  opacity-5"></div>
          <div className="absolute inset-0 flex justify-center items-center">
            <FaYoutube className="w-10 h-10 text-[#CD201F] cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col col-span-4 md:col-span-5 ml-2 gap-1">
          <h1 className="news-title-md md:news-title-lg !line-clamp-2 ">
            {data?.title}
          </h1>
          <div className="flex items-center mt-[-15px]">
            <CiLocationOn className="location-lg" />
            <p className="location-title-md md:location-title-lg capitalize pt-1 md:pt-2 px-1 md:px-3">
              {data?.location}
            </p>
          </div>
          <p className="date-lg mt-0">{formatDate(data?.createdAt)}</p>
        </div>
      </Link>
    </>
  );
};

export default MoreNewsVideoCard;
