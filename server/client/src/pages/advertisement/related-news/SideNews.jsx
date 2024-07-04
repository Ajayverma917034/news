import React, { useEffect, useState } from "react";
import SubNewsCard from "../../../components/common/news-section/SubNewsCard";
import Heading from "../../../components/common/Heading";
import httpClient from "../../../api/httpClient";
import { findHindi } from "../../../assets/data";
import SideNewsSkelton from "../../../skeleton/SideNewsSkelton";
const SideNews = ({ title = "", limit = "5" }) => {
  const [data, setData] = useState(null);
  const fetchNews = async () => {
    httpClient
      .post("/fetch-sidebar-news", {
        limit: limit,
        news_section_type: [title],
      })
      .then(({ data }) => {
        setData(data.news);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);
  return data === null || data?.length === 0 ? (
    <SideNewsSkelton />
  ) : (
    <div className=" flex-col gap-y-3 py-3 px-5 shadow-light-shadow rounded-md  hidden lg:flex ">
      <Heading title={findHindi(title)} />
      <div className="flex lg:flex-col gap-y-4 gap-5">
        {data &&
          data.length > 0 &&
          data.map((item, index) => <SubNewsCard key={index} data={item} />)}
      </div>
    </div>
  );
};

export default SideNews;
