import React, { useEffect, useState } from "react";
import { findDistrict, findHindi } from "../assets/data";
import { NavLink, useLocation, useParams } from "react-router-dom";
import httpClient from "../api/httpClient";
import NewsSection from "../components/common/news-section/news.section.component";
import { CiLocationOn } from "react-icons/ci";
import adsimgright1 from "../assets/adsimgright1.png";
import adsimgright2 from "../assets/adsimgright2.png";
import Heading from "../components/common/Heading";
import SubNewsCard from "../components/common/news-section/SubNewsCard";
const StateNews = () => {
  const { state } = useParams();
  const navItems = findDistrict(state);
  const [news, setNews] = useState(null);
  const [dataSequence, setDataSequence] = useState(null);

  const fetchStateNews = async () => {
    httpClient
      .post("/fetch-state-news", { state: state })
      .then(({ data }) => {
        setNews(data.data);
        setDataSequence(data.dataSequence);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchStateNews();
  }, [state]);
  console.log(news && news[0]);
  return (
    <>
      <div className="flex spacing mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto  gap-5 ">
          <div className="flex flex-col flex-wrap  md:col-span-4 overflow-hidden">
            <div className="bg-[#262626] flex">
              <p
                className="p-3 flex items-center justify-center text-white bg-blue min-w-fit"
                style={{
                  clipPath:
                    "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%, 0% 50%)",
                }}
              >
                <span className="text-2xl mt-2"></span>
                {findHindi(state)}
              </p>
              <div className="flex gap-x-5 overflow-x-auto no-scrollbar">
                {navItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={`/${state}/${item.english}`}
                    className="p-3 text-white mt-1 flex items-center justify-center"
                  >
                    {item.hindi}
                  </NavLink>
                ))}
              </div>
            </div>
            <NewsSection data={news && news[0]} title={dataSequence?.state} />
            {news &&
              news.slice(1).map((news, index) => {
                // console.log(news)
                return (
                  <NewsSection
                    data={news}
                    title={dataSequence?.districts[index]?.district}
                    key={index}
                  />
                );
              })}
          </div>

          <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 mt-10">
            <div className="flex flex-wrap  gap-y-1 gap-x-4 md:flex md:w-full  justify-center lg:flex-col ">
              <div className="w-[330px] h-[260px] overflow-hidden">
                <img
                  className="w-full h-auto object-contain"
                  src={adsimgright1}
                />
              </div>
              <div className="w-[330px] h-[260px] overflow-hidden">
                <img
                  className="w-full h-auto object-contain"
                  src={adsimgright2}
                />
              </div>
            </div>
            <div className=" flex-col gap-y-3 py-3 px-5 shadow-light-shadow rounded-md  hidden lg:flex ">
              <Heading title={"यह भी पढ़े"} />
              <div className="flex lg:flex-col gap-y-4 gap-5">
                <SubNewsCard />
                <SubNewsCard />
                <SubNewsCard />
                <SubNewsCard />
                <SubNewsCard />
                <SubNewsCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StateNews;
