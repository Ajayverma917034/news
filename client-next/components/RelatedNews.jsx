"use client";
import Heading from "@/lib/Heading";
import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";
import LazyLoadAd from "./LazyLoadAds";

const RelatedNews = ({ news_id }) => {
  const [relatedNews, setRelatedNews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleGoRelatedNews = (id) => {
    window.location.href = `/news/${id}`;
  };

  useEffect(() => {
    const fetchRelatedNews = async (news_id) => {
      setLoading(true);
      let incrementVal = 0;
      let viewedNews = JSON.parse(sessionStorage.getItem("viewedNews") || "[]");
      if (!viewedNews.includes(news_id)) {
        viewedNews.push(news_id); // Add the news_id to the array
        sessionStorage.setItem("viewedNews", JSON.stringify(viewedNews)); // Store the updated array
        incrementVal = 1;
      } else {
        incrementVal = 0;
      }

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/related-news?news_id=${news_id}&incrementVal=${incrementVal}`
        );

        setRelatedNews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching related news:", error);
        setRelatedNews([]);
      }
    };
    fetchRelatedNews(news_id);
  }, []);
  return (
    <div className="w-full flex flex-col mt-2">
      <Heading title={"सम्बंधित खबर"} />
      <div className="flex max-lg:flex-col gap-2 w-full bg-white">
        {loading ? (
          [...Array(4)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-x-1 max-md:gap-x-1 lg:flex lg:flex-col lg:w-[200px] rounded-md max-lg:gap-x-3"
            >
              <div className="max-lg:col-span-1 h-[80px] max-h-[103px] lg:h-[120px] max-lg:max-w-36 rounded-md animate-pulse bg-[#f0f0f0]"></div>
              <div className="w-full h-5 bg-[#f0f0f0] animate-pulse mt-1 rounded-md"></div>
            </div>
          ))
        ) : (
          <>
            {relatedNews && relatedNews.length ? (
              relatedNews.map((item, index) => (
                <div
                  onClick={() => handleGoRelatedNews(item?.news_id)}
                  key={index}
                  className="grid grid-cols-3 gap-x-1 max-md:gap-x-1 lg:flex lg:flex-col lg:w-[200px] shadow-card p-1 rounded-md max-lg:gap-x-3"
                >
                  <div className="max-lg:col-span-1 h-[80px] max-h-[103px] lg:h-[120px] max-lg:max-w-36 rounded-md">
                    <Image
                      src={item?.banner}
                      alt="Relative-news-image"
                      width={1200}
                      height={800}
                      sizes={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-95 rounded-md"
                    />
                  </div>
                  <h3 className="col-span-2 mt-2 font-semibold line-clamp-2 text-xl md:hover:border-b hover:border-black">
                    {item?.title}
                  </h3>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center text-xl text-gray">
                No related news found
              </div>
            )}
          </>
        )}
      </div>
      <LazyLoadAd />
    </div>
  );
};

export default RelatedNews;
