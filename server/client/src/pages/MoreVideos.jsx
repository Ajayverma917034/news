import React, { useEffect, useState } from "react";
import MorePageCard from "../components/common/news-section/morepage.news.card";
import Heading from "../components/common/Heading";
import CustomeAndGoogleAdd from "./advertisement/CustomeAndGoogleAdd";
import SideNews from "./advertisement/related-news/SideNews";
import { Link, useLocation } from "react-router-dom";
import { findHindi } from "../assets/data";
import axios from "axios";
import useInfiniteScroll from "../common/useInfiniteScroll";
import { handleImageError } from "../common/errorImg";
import { MetaDataSection } from "../seo/Helmet";
import { CollectionNewsSkeleton } from "../skeleton/HomeSkeleton";
import MorePageVideoCard from "../components/common/news-section/morepage.news.card";
import MoreNewsVideoCard from "../components/common/news-video/MoreNewsVideoCard";
import { FaYoutube } from "react-icons/fa";

const MoreVideos = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const params = useLocation();
  let title = params.pathname.slice(1);
  title = title.split("-").join(" ");

  const fetchNews = async (page) => {
    axios
      .post("/news/youtube", { limit: 10, page })
      .then(({ data }) => {
        setData((prevData) => [...prevData, ...data.news]);
        setHasMore(data.length > 0);
      })
      .catch((err) => {
        // toast.error("Something went wrong");
        console.log(err);
      });
  };

  useEffect(() => {
    setData([]);
    setPage(1);
    fetchNews(1);
    window.scrollTo(0, 0);
  }, [title]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page === 1) return;
    fetchNews(page);
  }, [page]);

  const [lastElementRef, isLoading] = useInfiniteScroll(loadMore, hasMore);

  return (
    <div className="flex spacing mt-2 sm:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full gap-5 ">
        <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden w-full">
          {data ? (
            <>
              {!data.length ? (
                <div>No more news</div>
              ) : (
                <div className="flex w-full flex-col flex-wrap sm:gap-4 ">
                  <MetaDataSection title={`${title} district news`} />
                  <Heading title={findHindi(title)} />
                  {data.length > 0 && (
                    <Link to={`/video/${data[0]?.news_id}`}>
                      <div className="h-[180px] md:h-[400px] w-full mt-2 relative">
                        <img
                          src={`https://img.youtube.com/vi/${data[0]?.videoLinkId}/mqdefault.jpg`}
                          alt="News Image"
                          onError={handleImageError}
                          className="z-0 h-full w-full  object-cover"
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-5"></div>
                        <div className="absolute inset-0 flex justify-center items-center">
                          <FaYoutube className="w-12 h-12 text-[#CD201F] cursor-pointer" />
                        </div>
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-5"></div>
                        <div className="absolute bottom-0 text-center w-full">
                          <h1 className="news-title-lg text-white text-start lg:text-[27px] bg-gradient-to-t from-gray to-transparent p-2">
                            {data[0]?.title}
                          </h1>
                        </div>
                      </div>
                    </Link>
                  )}
                  <div className="flex w-full flex-col flex-wrap gap-y-6 py-6">
                    {data.slice(1).map((item, index) => (
                      <MoreNewsVideoCard key={index} data={item} />
                    ))}
                    <div ref={lastElementRef}></div>
                    {isLoading && <div>Loading more...</div>}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <CollectionNewsSkeleton />
              <CollectionNewsSkeleton />
            </>
          )}
        </div>
        <div className="flex flex-col gap-y-2 md:gap-y-10 md:col-span-2 md:mt-10">
          <CustomeAndGoogleAdd />
          <SideNews title={"education"} />
        </div>
      </div>
    </div>
  );
};

export default MoreVideos;
