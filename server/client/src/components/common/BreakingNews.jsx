import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../../api/httpClient";
const BreakingNews = () => {
  const [breakingNews, setBreakingNews] = useState(null);
  const fetchBreakingNews = async () => {
    httpClient
      .get("/breaking-news")
      .then(({ data }) => {
        console.log(data);
        setBreakingNews(data.breakingNews);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBreakingNews();
  }, []);

  return (
    <div className="flex border-2 border-red border-r-0 bg-red items-center my-2 ">
      <div className="py-1 px-3 font-medium text-white text-nowrap lg:text-3xl md:text-sm md:px-3 sm:text-xs">
        Breaking News
      </div>
      <marquee className=" rounded-l-full bg-white w-full py-1.5 px-4 font-lg lg:text-sm sm:text-xs">
        <div className="flex gap-96">
          {breakingNews &&
            breakingNews.map((news, index) => (
              <Link
                to={`/news/${news.news_id}`}
                className="text-2xl font-medium"
                key={index}
              >
                {news.title}
              </Link>
            ))}
        </div>
      </marquee>
    </div>
  );
};

export default BreakingNews;
