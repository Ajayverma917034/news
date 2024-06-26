import React, { useEffect, useState } from "react";
import { findDistrict, findHindi } from "../assets/data";
import { NavLink, useLocation, useParams } from "react-router-dom";
import httpClient from "../api/httpClient";
import NewsSection from "../components/common/news-section/news.section.component";
import { CiLocationOn } from "react-icons/ci";
import adsimgright1 from "../assets/adsimgright1.png";
import adsimgright2 from "../assets/adsimgright2.png";
import SideNews from "./advertisement/related-news/SideNews";
import StateBar from "../components/common/StateBar";
import { MetaData, MetaDataSection } from "../seo/Helmet";
import CustomeAndGoogleAdd from "./advertisement/CustomeAndGoogleAdd";
const StateNews = () => {
  let state = useLocation();
  state = state.pathname.split("/")[2];
  state = state.toLowerCase().split("-").join(" ");

  console.log(state);
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
  // console.log(news && news[0]);
  return (
    <>
      <MetaDataSection title={state} />
      <div className="flex spacing mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto  gap-5 ">
          <div className="flex flex-col flex-wrap  md:col-span-4 overflow-hidden">
            <StateBar state={state} navItems={navItems} />

            <NewsSection data={news && news[0]} title={dataSequence?.state} />
            {news &&
              news.length > 1 &&
              news.slice(1).map((news, index) => {
                // console.log(news)
                return (
                  <NewsSection
                    data={news}
                    title={dataSequence?.districts[index]}
                    key={index}
                  />
                );
              })}
          </div>

          <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 mt-10">
            <CustomeAndGoogleAdd />
            <SideNews title="read also" />
          </div>
        </div>
      </div>
    </>
  );
};

export default StateNews;
