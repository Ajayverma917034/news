import React from "react";
import Heading from "../Heading";
import newsImage from "../../../assets/img1.png";
import { CiLocationOn } from "react-icons/ci";
import NewsCard from "../news-section/news.card.section.component";
import adsmiddleimg from "../../../assets/adsmiddleimg.png";
import { Link } from "react-router-dom";
import { CollectionNewsSkeleton } from "../../../skeleton/HomeSkeleton";
import { findHindi } from "../../../assets/data";
import { formatDate } from "../../../common/date";
import { handleImageError } from "../../../common/errorImg";

const NewsSection = ({ data, title }) => {
  const cardData = [
    {
      title: "लद्दाख B",
      date: "Wed, 01 May 2024 04:35 PM",
    },
    {
      title: "लद्दाख BJP में बगावत, प्रत्या..",
      date: "Wed, 01 May 2024 04:35 PM",
    },
    {
      title:
        "लद्दाख BJP में बगावत, प्रत्याशी ने भरा पर्चा, नामग्याल ने भी लिए पे...",
      date: "Wed, 01 May 2024 04:35 PM",
    },
    {
      title:
        "लद्दाख BJP में बगावत, प्रत्याशी ने भरा पर्चा, नामग्याल ने भी लिए पे...",
      date: "Wed, 01 May 2024 04:35 PM",
    },
  ];
  return (
    <>
      {data ? (
        <>
          {data.length > 0 && (
            <div className="flex w-full flex-col flex-wrap gap-6 ">
              <Heading title={title} />
              {/* Main Section  */}
              <div className="flex md:flex-row flex-col justify-between w-full ">
                <div className="md:w-[50%] w-full h-auto max-h-[16rem] border-2">
                  <img
                    className="w-full h-full"
                    src={data[0]?.banner}
                    onError={handleImageError}
                  />
                </div>
                <div className="md:w-[45%] w-full ">
                  <p className="date-lg">{formatDate(data[0]?.createdAt)}</p>
                  <h1 className="news-title-lg">{data[0]?.title}</h1>
                  <div className="flex items-center">
                    <CiLocationOn className="location-lg" />
                    <p className="location-title-lg pt-1 px-2 capitalize">
                      {findHindi(data[0]?.location)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 ">
                {data &&
                  data.slice(1).map((card, index) => {
                    return (
                      <Link
                        to={`/news/${card.news_id}`}
                        key={index}
                        className=" grid grid-cols-3 max-md:gap-x-4 rounded-lg shadow-md p-2 "
                      >
                        <div className="col-span-1 h-[90px]">
                          <img
                            src={card.banner}
                            alt="News"
                            className="w-full h-full object-cover "
                            onError={handleImageError}
                          />
                        </div>
                        <div className="md:ml-4 col-span-2 ">
                          <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                            {card.title}
                          </h2>
                          <p className="text-gray-500 line-clamp-1">
                            {card.date}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
              <div
                div
                className="w-full h-[6.1rem] max-md:mt-10 flex items-center justify-center"
              >
                <img
                  src={adsmiddleimg}
                  alt="adsimg"
                  className=" w-full h-full"
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
