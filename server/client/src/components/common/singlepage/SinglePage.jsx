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
// import adsmiddleimg from "../../../assets/adsmiddleimg.jpg";
import HorizontalAdsGoogle from "../../../pages/advertisement/HorizontalAdsGoogle";

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
    const scrollThreshold = window.innerWidth <= 768 ? 1800 : 1000;

    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - scrollThreshold
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
    window.scrollTo(0, 0);
    fetchNews();

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
    <div className="flex spacing mt-2 w-full">
      {loading ? (
        <Loader />
      ) : (
        news && (
          <div className="grid max-sm:flex flex-col sm:grid-cols-6 sm:gap-6 w-full gap-x-2">
            <MetaData
              title={title}
              keywords={tags}
              banner={banner}
              description={description}
              link={currentUrl}
              createdAt={createdAt}
            />
            <div className="col-span-6 md:col-span-4 w-full">
              <PageContent item={news} />
              <div className="w-full">
                <Heading title={"सम्बंधित खबर"} />
                <div className="flex max-lg:flex-col gap-2 w-full">
                  {relatedNews &&
                    relatedNews.map((item, index) => (
                      <Link
                        to={`/news/${item?.news_id}`}
                        key={index}
                        className="grid grid-cols-3 max-md:gap-x-1 lg:flex lg:flex-col lg:w-[200px] shadow-card p-1 rounded-md max-lg:gap-x-3"
                      >
                        <div className="max-lg:col-span-1  h-[70px] max-h-[103px] lg:h-[120px] max-lg:max-w-36 rounded-md">
                          <img
                            src={item?.banner}
                            onError={handleImageError}
                            alt="Relative-news-image"
                            className="w-full h-full object-cover hover:scale-95 rounded-md"
                          />
                        </div>
                        <h3 className="col-span-2 mt-2 font-semibold line-clamp-2 text-xl md:hover:border-b hover:border-black">
                          {item?.title}
                        </h3>
                      </Link>
                    ))}
                </div>
              </div>
              <div className="w-full h-[5rem] md:h-[9rem] max-md:mt-2 flex items-center justify-center mt-2">
                <HorizontalAdsGoogle />
              </div>
              <div className="hidden max-sm:flex mt-3">
                <CustomeAndGoogleAdd />
              </div>

              {randomNews &&
                randomNews.length &&
                randomNews.map((item, index) => (
                  <div key={index} className="mt-10">
                    <Heading title="और भी पढ़े" />
                    <PageContent item={item} />
                    <div className="w-full h-[5rem] md:h-[9rem] flex items-center justify-center">
                      <HorizontalAdsGoogle />
                    </div>
                    <div className="hidden max-sm:flex mt-3">
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
