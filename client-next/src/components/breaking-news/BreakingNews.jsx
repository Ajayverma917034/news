"use client";
import React, { useEffect, useState } from "react";
import { TrendingNewsSkeleton } from "@/skeleton/HomeSkeleton";
const BreakingNews = () => {
  const [breakingNews, setBreakingNews] = useState(null);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/breaking-news`
      );
      if (response.ok) {
        const data = await response.json();
        setBreakingNews(data.news);
      }
    };
    fetchBreakingNews();
  }, []);

  return (
    <div className="flex border-2 border-red border-r-0 bg-red items-center mt-0">
      <div className="py-1 px-3 font-semibold text-white text-nowrap lg:text-3xl md:text-sm md:px-10 sm:text-xs min-w-fit">
        ब्रेकिंग न्यूज़
      </div>
      <marquee className=" rounded-l-full bg-white w-full py-1.5 px-4 font-lg lg:text-sm sm:text-xs">
        <div className="flex gap-96">
          {breakingNews ? (
            breakingNews.map((news, index) => (
              <p key={index} className="text-2xl font-medium">
                {news.title}
              </p>
            ))
          ) : (
            <TrendingNewsSkeleton />
          )}
        </div>
      </marquee>
    </div>
  );
};

export default BreakingNews;
