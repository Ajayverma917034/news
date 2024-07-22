import React from "react";
import Heading from "../Heading";
import newsImage from "../../../assets/img1.png";
import { CiLocationOn } from "react-icons/ci";
import NewsCard from "../news-section/news.card.section.component";
import adsmiddleimg from "../../../assets/adsmiddleimg.jpg";
import { Link } from "react-router-dom";
import { CollectionNewsSkeleton } from "../../../skeleton/HomeSkeleton";
import { findHindi } from "../../../assets/data";
import { formatDate } from "../../../common/date";
import { handleImageError } from "../../../common/errorImg";

const NewsSection = ({ data, title }) => {
  return (
    <>
      {data ? (
        <>
          {data.length > 0 && (
            <div className="flex w-full flex-col flex-wrap sm:gap-4 p-1">
              <Heading title={title} />
              {/* Main Section  */}
              <Link
                to={`/news/${data[0]?.news_id}`}
                className="flex md:flex-row flex-col justify-between w-full shadow-card max-sm:mb-2 rounded-md"
              >
                <div className="md:w-[50%] w-full h-auto max-h-[16rem] p-1 ">
                  <img
                    className="w-full h-full rounded-md"
                    src={data[0]?.banner}
                    onError={handleImageError}
                  />
                </div>

                <div className="md:w-[45%] w-full p-1 ">
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
              <div className="grid md:grid-cols-2 max-sm:gap-y-2 gap-4 mb-4">
                {data &&
                  data.slice(1).map((card, index) => {
                    return (
                      <Link
                        to={`/news/${card.news_id}`}
                        key={index}
                        className="grid grid-cols-3 max-md:gap-x-4 rounded-sm  shadow-card"
                      >
                        <div className="col-span-1 p-1 h-full max-h-[103px]">
                          <img
                            src={card.banner}
                            alt="News"
                            className="w-full h-full object-cover rounded-sm"
                            onError={handleImageError}
                          />
                        </div>
                        <div className="md:ml-4 col-span-2 p-1">
                          <h2 className="text-lg font-semibold line-clamp-2">
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
              <div className="w-full h-[5rem] md:h-[9rem] max-md:mt-2 flex items-center justify-center">
                <img
                  src={adsmiddleimg}
                  alt="adsimg"
                  className="w-full h-full object-fill"
                />
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
