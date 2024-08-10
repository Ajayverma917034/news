// src/NewsItem.js
import React from "react";
import sampleImage from "./cc.jpg"; // Import the provided image
import { IoEye } from "react-icons/io5";

const NewsItem = ({ title, views }) => {
  return (
    <div className=" flex my-4   mx-2 sm:mx-4 items-center px-1 sm:px-4 py-1.5 sm:py-3  border-b gap-1.5 sm:gap-3 border-gray">
      <img
        className="w-24 h-16 object-cover rounded"
        src={sampleImage}
        alt="News"
      />
      <div className="ml-2 sm:ml-4 flex-grow">
        <h3 className="!text-[15px] !leading-[22px] font-medium line-clamp-2 ">
          {title}
        </h3>
      </div>
      <div className="flex flex-col items-center text-md font-semibold text-gray">
        <span className="mr-2">{views}</span>
        <IoEye />
      </div>
    </div>
  );
};

export default NewsItem;
