import React from "react";
import cardVideoimg from "./imgv.png";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { formatDate } from "../../../common/date";

const NewsVideoCard = ({ item }) => {
  let { videoLinkId, title, news_id, description } = item;
  const thumbnail = `https://img.youtube.com/vi/${videoLinkId}/mqdefault.jpg`;
  return (
    <Link
      to={`video/${news_id}`}
      className="w-full flex-col max-md:flex-row max-md:gap-3 max-md:grid max-md:grid-cols-5 rounded-lg shadow-card p-1"
    >
      <div className="max-w-[17rem] h-24 md:h-36 bg-red col-span-2 relative rounded-lg">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-5"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <FaYoutube className="w-10 h-10 md:w-12 md:h-12 text-[#CD201F] cursor-pointer" />
        </div>
        <img src={thumbnail} alt="hello" className="rounded-lg" />
      </div>
      <div className="flex flex-col w-full max-md:col-span-3">
        <h1 className="news-title-md leading-7 line-clamp-2 col-span-3 mt-3">
          {title}
        </h1>

        <div className="flex items-center">
          <CiLocationOn className="location-sm mb-1 text-red" />
          <p className="location-title-sm px-1 capitalize">{item?.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewsVideoCard;
