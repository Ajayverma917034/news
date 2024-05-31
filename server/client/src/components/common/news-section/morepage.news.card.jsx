import React from "react";
import { CiLocationOn } from "react-icons/ci";

const MorePageCard = ({data}) => {
  return (
    <>
      <div className="flex w-full flex-row gap-2 md:gap-4">
        <div className="max-sm:h-[80px] sm:h-[120px] md:h-[150px] min-w-[120px]">
          <img
            src="https://images.pexels.com/photos/610293/pexels-photo-610293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Image"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col lg:w-3/4">
          <h1 className="news-title-md md:news-title-lg">
            {data?.title}
          </h1>
          <div className="flex items-center mt-[-10px]">
            <CiLocationOn className="location-lg" />
            <p className="location-title-md md:location-title-lg pt-1 md:pt-2 px-1 md:px-3">{data?.location}</p>
          </div>
          <p className="date-lg mt-0">{data?.createdAt}</p>
        </div>
      </div>
    </>
  );
};

export default MorePageCard;
