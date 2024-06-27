import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import moreimg from "../../assets/morewhite.png";
import { handleImageError } from "../../common/errorImg";
import { formatDate } from "../../common/date";
import { CollectionNewsSkeleton } from "../../skeleton/HomeSkeleton";
const ApnaNews = ({ data, navItems, currentIndex, hint }) => {
  //   console.log(data);
  return data ? (
    !data.length > 0 ? (
      <div
        className={`news-title-lg min-h-32 w-full flex items-center justify-center ${
          hint === "state" ? "" : "text-white"
        }`}
      >
        <p>कोई समाचार उपलब्ध नहीं</p>
      </div>
    ) : (
      <div className="flex w-full flex-col max-md:mt-1 md:p-4 flex-wrap sm:gap-4 relative">
        {/* Main Section  */}
        <Link
          to={`/news/${data[0]?.news_id}`}
          className="flex md:flex-row flex-col justify-between w-full "
        >
          <div className="md:w-[50%] w-full h-auto max-h-[16rem]">
            <img
              className="max-h-[16rem]"
              src={data[0]?.banner}
              onError={handleImageError}
            />
          </div>
          <div className="md:w-[45%] w-full flex flex-col justify-center">
            <p className={`date-lg ${hint === "state" ? "" : "text-white"}`}>
              {formatDate(data[0]?.createdAt)}
            </p>
            <h1
              className={`news-title-lg ${
                hint === "state" ? "" : "text-white"
              }`}
            >
              {data[0]?.title}
            </h1>
            <div className="flex items-center">
              <CiLocationOn className="location-lg" />
              <p
                className={` location-title-lg pt-1 px-2 capitalize  ${
                  hint === "state" ? "" : "text-white"
                }`}
              >
                {navItems[currentIndex]}
              </p>
            </div>
          </div>
        </Link>
        <div className="grid md:grid-cols-2 gap-4 ">
          {data &&
            data.slice(1).map((card, index) => {
              return (
                <Link
                  to={`/news/${card?.news_id}`}
                  key={index}
                  className=" grid grid-cols-3 max-md:gap-x-4 rounded-lg shadow-md max-md:py-2 md:p-2 "
                >
                  <div className="col-span-1 h-[90px]">
                    <img
                      src={card?.banner}
                      alt="News"
                      className="w-full h-full object-cover "
                      onError={handleImageError}
                    />
                  </div>
                  <div className="md:ml-4 col-span-2 ">
                    <h2
                      className={`text-lg line-clamp-2 ${
                        hint === "state" ? "" : "text-white"
                      }`}
                    >
                      {card.title}
                    </h2>
                    <p
                      className={`line-clamp-1 ${
                        hint === "state" ? "" : "text-white"
                      }`}
                    >
                      {formatDate(card?.createdAt)}
                    </p>
                    <div className="flex items-center">
                      <CiLocationOn className="location-sm mb-1 text-red" />
                      <p
                        className={`location-title-sm px-1 capitalize ${
                          hint === "state" ? "" : "text-white"
                        }`}
                      >
                        {navItems[currentIndex]}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
        <Link
          to={
            hint === "state"
              ? `/state/${navItems[currentIndex]}`
              : `/state/district/${navItems[currentIndex]}`
          }
          className="flex mr-3 items-center justify-center absolute bottom-[-5px] right-[-15px] bg-red rounded px-1"
        >
          <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white font-sans mr-2 capitalize">
            और पढ़ें
          </h1>
          <img src={moreimg} alt="More Icon" className="w-5 md:w-5" />
        </Link>
      </div>
    )
  ) : (
    <CollectionNewsSkeleton />
  );
};

export default ApnaNews;
