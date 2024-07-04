import React, { useEffect, useState } from "react";
import Heading from "../Heading";
import { CiLocationOn } from "react-icons/ci";
import { RiWhatsappFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import relativenews from "../../../assets/relativenews.png";
import newsimg from "../../../assets/img1.png";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import httpClient from "../../../api/httpClient";
import BlogContent from "../BlogContent";
import SideNews from "../../../pages/advertisement/related-news/SideNews";
import { MetaData } from "../../../seo/Helmet";
import { handleImageError } from "../../../common/errorImg";
import { formatDate } from "../../../common/date";
import CustomeAndGoogleAdd from "../../../pages/advertisement/CustomeAndGoogleAdd";
import Loader from "../../../loader/Loader";
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
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState(null);

  let {
    title,
    description,
    content,
    banner,
    createdAt,
    tags,
    location,
    news_section_type,
  } = news;

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
    httpClient
      .post("/get-news", { news_id, incrementVal })
      .then(async ({ data }) => {
        setNews(data.news);
        const {
          state,
          district,
          location,
          tags,
          news_section_type,
          news_id: prevNewsId,
        } = data.news;
        httpClient
          .post("/fetch-related-news", {
            state,
            district,
            tags,
            location,
            news_section_type,
            news_id: prevNewsId,
          })
          .then(({ data }) => {
            // console.log(data);
            setLoading(false);
            setRelatedNews(data);
            // console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchNews();
    scrollTo(0, 0);
  }, [news_id]);

  const locationUrl = useLocation();
  const currentUrl = `${window.location.protocol}//${window.location.host}${locationUrl.pathname}${locationUrl.search}${locationUrl.hash}`;

  return (
    <div className="flex spacing mt-2">
      {loading ? (
        <Loader />
      ) : (
        news && (
          <div className="grid flex-col sm:grid-cols-6 sm:gap-6 w-full gap-x-2 ">
            <MetaData
              title={title}
              keywords={tags}
              banner={banner}
              description={description}
              link={currentUrl}
            />
            <div className="col-span-4 w-full">
              <div className="py-4 flex flex-col flex-wrap w-full">
                <h1 className="font-semibold text-[20px] md:text-[25px]">
                  {title}
                </h1>
                <p className="date-lg text-wrap">{description}</p>
                <div className=" w-full h-[280px] sm:h-[350px] mt-3">
                  <img
                    src={news?.banner}
                    onError={handleImageError}
                    alt="news-img"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className=" flex flex-wrap gap-y-2 sm:flex sm:flex-row items-center py-2 justify-between w-full">
                  <div className="flex items-center">
                    <CiLocationOn size={25} className="text-red" />
                    <h3 className="news-title-md mt-2 ml-1 capitalize">
                      {location}{" "}
                    </h3>
                  </div>
                  <div>
                    <h3 className="date-lg">{formatDate(createdAt)}</h3>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <RiWhatsappFill
                      className="text-green-600 hover:scale-[1.2]"
                      size={28}
                    />
                    <FaFacebook
                      size={24}
                      className="text-blue hover:scale-[1.2]"
                    />
                    <AiFillInstagram
                      size={26}
                      className=" text-red hover:scale-[1.2]"
                    />
                    <FaSquareXTwitter
                      size={24}
                      className="text-pink-600 hover:scale-[1.2]"
                    />
                  </div>
                </div>
                <div className="py-2 my-2 border-[3px] border-green-600  rounded-md flex justify-center items-center font-semibold text-green-700 w-full">
                  फॉलो करे Whatsapp पे !
                </div>
                <div className="py-4 w-full">
                  {content[0] && <BlogContent block={content[0]?.blocks[0]} />}
                  <div className="bg-gray h-[200px] flex justify-center items-center w-full">
                    Ads
                  </div>
                  {content[0]?.blocks.length > 1 &&
                    content[0]?.blocks.slice(1).map((block, i) => {
                      return (
                        <div className="my-4 md:my-4" key={i}>
                          <BlogContent block={block} />
                        </div>
                      );
                    })}
                </div>

                <div className="w-full">
                  <Heading title={"सम्बंधित खबर"} />
                  <div className="flex flex-wrap md:flex-wrap lg:flex-nowrap  gap-4  w-full ">
                    {relatedNews &&
                      relatedNews.map((item, index) => (
                        <Link
                          to={`/news/${item?.news_id}`}
                          key={index}
                          className="flex flex-col md:flex-wrap lg:w-[200px] h-auto overflow-hidden"
                        >
                          <div className="lg:h-[120px]">
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
              </div>
            </div>
            <div className="col-span-2 flex gap-y-2 flex-col">
              <CustomeAndGoogleAdd index={1} />
              <SideNews title="read also" />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SinglePage;
