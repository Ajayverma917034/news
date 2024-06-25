import React from "react";
import Heading from "../Heading";
import newsImage from "../../../assets/img1.png";
import { CiLocationOn } from "react-icons/ci";
import NewsVideoCard from "./news.video.card.section.component";
import { FaYoutube } from "react-icons/fa";
import adsmiddleimg from "../../../assets/adsmiddleimg.png";
import { YtCollectionSkeleton } from "../../../skeleton/HomeSkeleton";
import { Link } from "react-router-dom";
import { formatDate } from "../../../common/date";
import Heading2 from "../Heading2";

const NewsVideo = ({ data, title }) => {
  return (
    <>
      {data ? (
        <>
          <div className="flex w-full flex-col flex-wrap sm:gap-2 md:gap-6 mt-5">
            <Heading2 link={"/top-videos"} title={title} />
            {/* Main Section  */}
            <Link
              to={`/video/${data[0]?.news_id}`}
              className="flex md:flex-row flex-col justify-between w-full "
            >
              <div className="md:w-[50%] w-full h-auto relative">
                <img
                  className="w-full h-full"
                  src={`https://img.youtube.com/vi/${data[0]?.videoLinkId}/mqdefault.jpg`}
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-5"></div>
                <div className="absolute inset-0 flex justify-center items-center">
                  <FaYoutube className="w-12 h-12 text-[#CD201F] cursor-pointer" />
                </div>
              </div>
              <div className="md:w-[45%] w-full ">
                <p className="date-lg">{formatDate(data[0]?.createdAt)}</p>
                <h1 className="news-title-lg">{data[0]?.title}</h1>
                <div className="flex items-center">
                  <CiLocationOn className="location-lg" />
                  <p className="location-title-lg pt-1 px-3">
                    {data[0]?.location}
                  </p>
                </div>
              </div>
            </Link>

            <div className="flex flex-col">
              {
                <div className="flex gap-5 flex-col md:flex-row justify-between mb-4">
                  {data &&
                    data
                      .slice(1, 4)
                      .map((item, index) => (
                        <NewsVideoCard item={item} key={index} />
                      ))}
                </div>
              }
            </div>
          </div>
          <div className="w-full h-[6.1rem] max-md:mt-10 flex items-center justify-center mt-2">
            <img src={adsmiddleimg} alt="adsimg" className=" w-full h-full" />
          </div>
        </>
      ) : (
        <YtCollectionSkeleton />
      )}
    </>
  );
};

export default NewsVideo;
