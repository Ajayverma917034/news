import React from "react";
import cardImg from "../../../assets/img1.png";
const NewsCard = ({ data }) => {
  return (
    <>
      <div className="flex py-3 items-center">
        <div className="bg-blue w-full sm:w-[200px] md:w-full h-24 sm:h-28 md:h-20">
          <img
            src={cardImg}
            alt="Image"
            className="object-cover w-full h-full"
          />
        </div>
        <div className=" flex flex-col ml-4">
          {/* <h1 className="news-title-md">{data?.title}</h1> */}
          <h1 className="news-title-md  line-clamp-2 pt-1">
            लद्दाख BJP में बगावत, प्रत्याशी ने भरा पर्चा, नामग्याल ने भी लिए
            पेपर{" "}
          </h1>
          {/* <p className="date-md">{data?.createdAt}</p> */}
          <p className="date-md line-clamp-1">Wed, 01 May 2024 04:35 PM</p>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
