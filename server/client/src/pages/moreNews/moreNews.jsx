import React, { useEffect, useState } from "react";
import MorePageCard from "../../components/common/news-section/morepage.news.card";
import Heading from "../../components/common/Heading";
import Image from "../../assets/img1.png";
import CustomeAndGoogleAdd from "../advertisement/CustomeAndGoogleAdd";
import SideNews from "../advertisement/related-news/SideNews";
import { Link, useLocation } from "react-router-dom";
import { findHindi } from "../../assets/data";
import axios from "axios";
import { toast } from "react-hot-toast";
import useInfiniteScroll from "../../common/useInfiniteScroll";
import { handleImageError } from "../../common/errorImg";
import { MetaDataSection } from "../../seo/Helmet";
import Loader from "../../loader/Loader";

const MoreNews = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const params = useLocation();
  const title = params.pathname.slice(1);

  const fetchNews = async (page) => {
    axios
      .post("/get-news-query", { limit: 2, news_section_type: [title], page })
      .then(({ data }) => {
        setData((prevData) => [...prevData, ...data]);
        setHasMore(data.length > 0);
      })
      .catch((err) => {
        toast.error("Something went wrong");
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
    <div className="flex spacing mt-8 mb-0">
      {
        data === null ? <div className="min-h-[30vh] flex w-full items-center justify-center"><Loader/> </div> : (
          data.length === 0 ? (
            <div>No News available </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto justify-between gap-10 ">
              <MetaDataSection title={title} />
              <div className="flex flex-col flex-wrap md:col-span-4">
                <div className="flex w-full flex-col flex-wrap ">
                  <Heading title={findHindi(title)} />
                  {data.length > 0 && (
                    <Link to={`/news/${data[0]?.news_id}`}>
                      <div className="h-[180px] md:h-[400px] w-full mt-2 relative">
                        <img
                          src={data[0]?.banner}
                          alt="News Image"
                          onError={handleImageError}
                          className="z-0 h-full w-full  object-cover"
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-5"></div>
                        <div className="absolute bottom-0 text-center w-full">
                          <h1 className="news-title-lg font-semibold text-white text-start lg:text-[27px] bg-gradient-to-t from-gray to-transparent p-2">
                            {data[0]?.title}
                          </h1>
                        </div>
                      </div>
                    </Link>
                  )}
                  <div className="flex w-full flex-col flex-wrap gap-y-6 py-6">
                    {data.slice(1).map((item, index) => (
                      <MorePageCard key={index} data={item} />
                    ))}
                    <div ref={lastElementRef}></div>
                    {isLoading && <div>Loading more...</div>}
                  </div>
                </div>
              </div>
    
              <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 md:mt-10">
                <CustomeAndGoogleAdd />
                <SideNews title={"read also"} />
              </div>
            </div>
          )
        )
      }
    </div>
  );
};

export default MoreNews;
