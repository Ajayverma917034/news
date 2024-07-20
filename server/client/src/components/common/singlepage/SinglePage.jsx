import React, { useEffect, useState } from "react";
import Heading from "../Heading";
import { Link, useLocation, useParams } from "react-router-dom";
import httpClient from "../../../api/httpClient";
import SideNews from "../../../pages/advertisement/related-news/SideNews";
import { MetaData } from "../../../seo/Helmet";
import { handleImageError } from "../../../common/errorImg";
import CustomeAndGoogleAdd from "../../../pages/advertisement/CustomeAndGoogleAdd";
import Loader from "../../../loader/Loader";
import PageContent from "./PageContent";
import adsmiddleimg from "../../../assets/adsimgright1.png";

export const newsStructure = {
  title: "",
  des: "",
  content: [],
  tags: [],
  banner: "",
  createdAt: "",
  categories: [],
  location: "",
};

const SinglePage = () => {
  const { news_id } = useParams();
  const [news, setNews] = useState(newsStructure);
  const [randomNews, setRandomNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState(null);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);

  const { title, description, banner, tags, createdAt } = news;

  const fetchNews = async () => {
    let incrementVal = 0;
    const viewedNews = JSON.parse(sessionStorage.getItem("viewedNews") || "[]");

    if (!viewedNews.includes(news_id)) {
      viewedNews.push(news_id);
      sessionStorage.setItem("viewedNews", JSON.stringify(viewedNews));
      incrementVal = 1;
    } else {
      incrementVal = 0;
    }

    try {
      const { data } = await httpClient.post("/get-news", {
        news_id,
        incrementVal,
      });
      setNews(data.news);
      const { tags, news_section_type, news_id: prevNewsId } = data.news;

      const relatedNewsResponse = await httpClient.post("/fetch-related-news", {
        tags,
        news_section_type,
        news_id: prevNewsId,
      });

      setLoading(false);
      setRelatedNews(relatedNewsResponse.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 1000
    ) {
      setHasReachedBottom(true);
    }
  };

  const fetchAdditionalContent = async () => {
    const { data } = await httpClient.post("/get-random-news", {
      news_id,
    });
    setRandomNews((prevRandomNews) => [...prevRandomNews, data.news]);
  };

  useEffect(() => {
    fetchNews();
    window.scrollTo(0, 0);

    const debouncedHandleScroll = debounce(handleScroll, 50);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [news_id]);

  useEffect(() => {
    if (hasReachedBottom) {
      fetchAdditionalContent();
      setHasReachedBottom(false);
    }
  }, [hasReachedBottom]);

  const locationUrl = useLocation();
  const currentUrl = `${window.location.protocol}//${window.location.host}${locationUrl.pathname}${locationUrl.search}${locationUrl.hash}`;

  return (
    <div className="flex spacing mt-2">
      {loading ? (
        <Loader />
      ) : (
        news && (
          <div className="grid flex-col sm:grid-cols-6 sm:gap-6 w-full gap-x-2">
            <MetaData
              title={title}
              keywords={tags}
              banner={banner}
              description={description}
              link={currentUrl}
              createdAt={createdAt}
            />
            <div className="col-span-4 w-full">
              <PageContent item={news} />
              <div className="w-full">
                <Heading title={"सम्बंधित खबर"} />
                <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full">
                  {relatedNews &&
                    relatedNews.map((item, index) => (
                      <Link
                        to={`/news/${item?.news_id}`}
                        key={index}
                        className="flex flex-col md:flex-wrap lg:w-[200px] h-auto overflow-hidden"
                      >
                        <div className="max-h-[120px] lg:h-[120px]">
                          <img
                            src={item?.banner}
                            onError={handleImageError}
                            alt="Relative-news-image"
                            className="w-full h-full object-cover hover:scale-95"
                          />
                        </div>
                        <h3 className="my-2 font-medium line-clamp-2 hover:border-b hover:border-black">
                          {item?.title}
                        </h3>
                      </Link>
                    ))}
                </div>
              </div>
              <div className="w-full h-[6.1rem] max-md:mt-10 flex items-center justify-center my-4 z-[10]">
                <img
                  src={adsmiddleimg}
                  alt="adsimg"
                  className=" w-full h-full"
                />
              </div>

              {randomNews &&
                randomNews.length &&
                randomNews.map((item, index) => (
                  <div key={index} className="mt-10">
                    <Heading title="और भी पढ़ें" />
                    <PageContent item={item} />
                    <div className="w-full h-[6.1rem] max-md:mt-10 flex items-center justify-center my-4 ">
                      <img
                        src={adsmiddleimg}
                        alt="adsimg"
                        className=" w-full h-full"
                      />
                    </div>
                    <div className="hidden max-sm:flex">
                      <CustomeAndGoogleAdd />
                    </div>
                  </div>
                ))}
              {hasReachedBottom && <Loader />}
            </div>
            <div className="col-span-2 w-full">
              <div className="sticky top-32 max-md:hidden">
                <CustomeAndGoogleAdd type="detail" />
                <SideNews title="read also" />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SinglePage;

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
