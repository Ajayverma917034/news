import React, { useEffect, useState } from "react";
import SubNewsCard from "../../../components/common/news-section/SubNewsCard";
import Heading from "../../../components/common/Heading";
import httpClient from "../../../api/httpClient";
import { findHindi } from "../../../assets/data";
const SideNews = ({ title = "" }) => {
  const [data, setData] = useState(null);
  const fetchNews = async () => {
    httpClient
      .post("/fetch-sidebar-news", {
        limit: 6,
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
  return data === null ? (
    <></>
  ) : (
    <div className=" flex-col gap-y-3 py-3 px-5 shadow-light-shadow rounded-md  hidden lg:flex ">
      <Heading title={findHindi(title)} />
      <div className="flex lg:flex-col gap-y-4 gap-5">
        {data.length > 0 &&
          data.map((item, index) => <SubNewsCard key={index} data={item} />)}
      </div>
    </div>
  );
};

export default SideNews;
