import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { handleImageError } from "../../../common/errorImg";
import { formatDate } from "../../../common/date";
import { Link } from "react-router-dom";

const MorePageCard = ({ data }) => {
  return (
    <>
      <Link
        to={`/news/${data?.news_id}`}
        className="grid grid-cols-6 md:grid-cols-7 gap-2 md:gap-4 lg:h-[150px] p-1 shadow-card rounded-md"
      >
        <div className="col-span-2 md:col-span-2 h-[95px] sm:h-[140px] w-full">
          <img
            src={data?.banner}
            alt="Image"
            className="object-cover w-full h-full rounded-md"
            onError={handleImageError}
          />
        </div>
        <div className="flex flex-col col-span-4  md:col-span-5 ml-2 gap-1">
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

export default MorePageCard;
