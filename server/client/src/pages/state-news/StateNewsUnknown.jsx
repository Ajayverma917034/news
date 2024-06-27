import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import httpClient from "../../api/httpClient";
import NewsSection from "../../components/common/news-section/news.section.component";
import CustomeAndGoogleAdd from "../advertisement/CustomeAndGoogleAdd";
import SideNews from "../advertisement/related-news/SideNews";
import { findHindi, stateDistricts } from "../../assets/data";
import { MetaDataSection } from "../../seo/Helmet";
import { CollectionNewsSkeleton } from "../../skeleton/HomeSkeleton";

const StateNewsUnknown = () => {
  const [filteredStates, setFilteredStates] = useState(
    Object.keys(stateDistricts)
  );

  const [news, setNews] = useState(null);
  const navigate = useNavigate();

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

  const handleNavigate = (state) => {
    if (state === "uttar pradesh") {
      navigate("/state/uttar-pradesh");
    } else {
      navigate(`/state/${state}`);
    }
  };

  useEffect(() => {
    fetchStateNews();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MetaDataSection title={"All State News"} />
      <div className="flex spacing mt-8 flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto gap-5 w-full">
          <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden">
            {/* Navbar for the states */}
            <div className="bg-[#262626] flex h-fit w-full">
              <p
                className="p-3 flex items-center justify-center text-white bg-blue min-w-fit"
                style={{
                  clipPath:
                    "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%, 0% 50%)",
                }}
              >
                {findHindi("state")}
              </p>
              <div className="flex gap-x-5 overflow-x-auto no-scrollbar">
                {filteredStates.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigate(item)}
                    className="p-3 text-white mt-1 flex items-center justify-center min-w-fit"
                  >
                    {findHindi(item)}
                  </button>
                ))}
              </div>
            </div>

            {news ? (
              news
                .slice(0, 2)
                .map((newsItem, index) => (
                  <NewsSection
                    data={newsItem.data}
                    title={newsItem.state}
                    key={index}
                  />
                ))
            ) : (
              <>
                <CollectionNewsSkeleton />
                <CollectionNewsSkeleton />
              </>
            )}
          </div>

          {/* Right advertisement section */}
          <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 ">
            <CustomeAndGoogleAdd />
            <SideNews title="read also" />
          </div>
        </div>

        {news && news.length > 2 && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-6 mx-auto gap-5 ">
            <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden">
              {news.slice(2, 4).map((newsItem, index) => (
                <NewsSection
                  data={newsItem.data}
                  title={newsItem.state}
                  key={index + 2}
                />
              ))}
            </div>

            <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 mt-10">
              <CustomeAndGoogleAdd />
            </div>
          </div>
        )}

        {news && news.length > 4 && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-6 mx-auto gap-5">
            <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden">
              {news.slice(4).map((newsItem, index) => (
                <NewsSection
                  data={newsItem.data}
                  title={newsItem.state}
                  key={index + 4}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StateNewsUnknown;
