import React, { useEffect, useState } from "react";
import { findHindi, states } from "../../assets/data";
import { NavLink } from "react-router-dom";
import httpClient from "../../api/httpClient";
import NewsSection from "../../components/common/news-section/news.section.component";
import CustomeAndGoogleAdd from "../advertisement/CustomeAndGoogleAdd";
import SideNews from "../advertisement/related-news/SideNews";

const StateNewsUnknown = () => {
  const navItems = states;
  const [news, setNews] = useState(null);

  const fetchStateNews = async () => {
    httpClient
      .get("/fetch-all-state-news")
      .then(({ data }) => {
        setNews(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchStateNews();
  }, []);
  // console.log(news.slice(0, 2));
  return (
    <>
      <div className="flex spacing mt-8 flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto gap-5 ">
          <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden">
            {/* navbar for the states  */}
            <div className="bg-[#262626] flex h-fit w-full">
              <p
                className="p-3 flex items-center justify-center text-white bg-blue min-w-fit"
                style={{
                  clipPath:
                    "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%, 0% 50%)",
                }}
              >
                <span className="text-2xl mt-2"></span>
                {findHindi("state")}
              </p>
              <div className="flex gap-x-5 overflow-x-auto no-scrollbar">
                {navItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={`/${item.english}`}
                    className="p-3 text-white mt-1 flex items-center justify-center min-w-fit"
                  >
                    {item.hindi}
                  </NavLink>
                ))}
              </div>
            </div>

            {news &&
              news.slice(0, 2).map((news, index) => {
                return (
                  <>
                    <NewsSection
                      data={news.data}
                      title={news.state}
                      key={index}
                    />
                  </>
                );
              })}
          </div>
          {/* {right advertisement section } */}
          <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 mt-10">
            <CustomeAndGoogleAdd />
            <SideNews title="read also" />
          </div>
        </div>
        {news && news.length > 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto  gap-5 ">
            <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden">
              {news &&
                news.slice(2, 4).map((news, index) => {
                  return (
                    <>
                      <NewsSection
                        data={news.data}
                        title={news.state}
                        key={index}
                      />
                    </>
                  );
                })}
            </div>

            <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 mt-10">
              <CustomeAndGoogleAdd />
            </div>
          </div>
        )}

        {news && news.length > 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto  gap-5 ">
            <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden">
              {news &&
                news.slice(4).map((news, index) => {
                  return (
                    <>
                      <NewsSection
                        data={news.data}
                        title={news.state}
                        key={index}
                      />
                    </>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StateNewsUnknown;
