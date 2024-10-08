import React, { useEffect, useState } from "react";
import MorePageCard from "../../components/common/news-section/morepage.news.card";
import Heading from "../../components/common/Heading";
import CustomeAndGoogleAdd from "../advertisement/CustomeAndGoogleAdd";
import SideNews from "../advertisement/related-news/SideNews";
import { Link, useLocation } from "react-router-dom";
import { findHindi } from "../../assets/data";
import axios from "axios";
import useInfiniteScroll from "../../common/useInfiniteScroll";
import { handleImageError } from "../../common/errorImg";
import { MetaDataSection } from "../../seo/Helmet";
import { CollectionNewsSkeleton } from "../../skeleton/HomeSkeleton";
import DetailAds from "../advertisement/DetailAds";
import { findMetaData } from "../../seo/dataset-page";
// import HorizontalAdsGoogle from "../advertisement/HorizontalAdsGoogle";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const MoreNews = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const params = useLocation();
  const title = params.pathname.slice(1);

  const fetchNews = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/get-news-query", {
        limit: 2,
        news_section_type: [title],
        page,
      });
      const newData = response.data;

      if (newData.length > 0) {
        setData((prevData) => {
          const ids = prevData.map((item) => item.news_id);
          const filteredData = newData.filter(
            (item) => !ids.includes(item.news_id)
          );
          return [...prevData, ...filteredData];
        });
        setHasMore(newData.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setData([]);
    setPage(1);
    fetchNews(1);
  }, [title]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      fetchNews(page);
    }
  }, [page]);

  const [lastElementRef] = useInfiniteScroll(loadMore, hasMore && !isLoading);

  const metaData = findMetaData(title);
  return (
    <div className="flex spacing mt-2 sm:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full md:gap-5">
        <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden w-full">
          {data ? (
            <>
              {data.length ? (
                <div className="flex w-full flex-col flex-wrap sm:gap-4">
                  <MetaDataSection {...metaData} />
                  <Heading title={findHindi(title)} />
                  {data.length > 0 && (
                    <Link to={`/news/${data[0]?.news_id}`}>
                      <div className="h-[180px] md:h-[400px] w-full mt-2 relative p-1">
                        <img
                          src={data[0]?.banner}
                          alt="News Image"
                          onError={handleImageError}
                          className="z-0 h-full w-full  object-cover rounded-md"
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-5"></div>
                        <div className="absolute bottom-0 text-center w-full">
                          <h1 className="news-title-lg line-clamp-2 text-white text-start lg:text-[27px] bg-gradient-to-t from-gray to-transparent p-2">
                            {data[0]?.title}
                          </h1>
                        </div>
                      </div>
                    </Link>
                  )}
                  <div className="flex w-full flex-col flex-wrap gap-y-2 md:gap-y-6 md:py-6 p-1 mt-1">
                    {data.slice(1).map((item, index) => (
                      <React.Fragment key={`news-${index}`}>
                        <MorePageCard data={item} />
                        {(index + 1) % 3 === 0 && (
                          <>
                            <div className="bg-gray h-[200px] md:h-[300px] flex justify-center items-center w-full relative">
                              <DetailAds />
                              <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 z-[100] flex gap-x-1 rounded-md p-1 font-sans items-center">
                                <Link
                                  to={"/advertisement-us"}
                                  className="text-[#f9f9f9] text-[12px] "
                                >
                                  <HiOutlineExclamationCircle
                                    size={18}
                                    className="text-[#f9f9f9] font-sans"
                                  />
                                </Link>
                                <span className="text-[#f9f9f9] text-[12px]">
                                  Sponsored
                                </span>
                              </div>
                            </div>
                            {/* <div className="w-full h-[5rem] md:h-[9rem] max-md:mt-2 flex items-center justify-center">
                              <HorizontalAdsGoogle />
                            </div> */}
                          </>
                        )}
                      </React.Fragment>
                    ))}
                    <div ref={lastElementRef}></div>
                    {isLoading && <div>Loading more...</div>}
                  </div>
                </div>
              ) : (
                <div>No more news</div>
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

export default MoreNews;
