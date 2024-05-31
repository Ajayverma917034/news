import React, { useEffect, useState } from "react";
import Heading from "../Heading";
import { CiLocationOn } from "react-icons/ci";
import { RiWhatsappFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import relativenews from "../../../assets/relativenews.png";
import newsimg from "../../../assets/img1.png";
import { Link, Navigate, useParams } from "react-router-dom";
import httpClient from "../../../api/httpClient";
import BlogContent from "../BlogContent";
import SideNews from "../../../pages/advertisement/related-news/SideNews";
export const newsStructure = {
  title: "",
  des: "",
  content: [],
  banner: "",
  createdAt: "",
  categories: [],
  location: "",
};

const SinglePage = () => {
  const { news_id } = useParams();
  const [news, setNews] = useState(newsStructure);
  const [relatedNews, setRelatedNews] = useState(null);

  let { title, description, content, banner, createdAt, categories, location } =
    news;

  const fetchNews = async () => {
    httpClient
      .post("/get-news", { news_id })
      .then(async ({ data }) => {
        setNews(data.news);
        const {
          state,
          district,
          location,
          categories,
          news_id: prevNewsId,
        } = data.news;
        httpClient
          .post("/fetch-related-news", {
            state,
            district,
            categories,
            location,
            news_id: prevNewsId,
          })
          .then(({ data }) => {
            setRelatedNews(data);
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(relatedNews);
  useEffect(() => {
    fetchNews();
    scrollTo(0, 0);
  }, [news_id]);

  return (
    <>
      {!news ? (
        <>Loading...</>
      ) : (
        <div className="grid flex-col  sm:grid-cols-6 sm:gap-6 w-full spacing ">
          <div className=" col-start-1 col-span-4 ">
            {/* <div className="flex flex-col items-center">
              <p className=" self-start !text-indigo-900 ">
                <span className="text-indigo-900">उत्तर प्रदेश /&nbsp;</span>
                <span className="text-indigo-900">सोनभद्र</span>
                <span className="text-indigo-900">/&nbsp;</span>
                <span className="text-red">
                  सलमान खान केस: CID करेगी आरोपी के सुसाइड की जांच...
                </span>
              </p>
            </div> */}
            <div className="py-4 flex flex-col flex-wrap">
              <h1 className="news-title-lg pt-2 text-wrap">{title}</h1>
              <p className="date-lg text-wrap">{description}</p>
              <div className=" w-full h-[280px] sm:h-[350px] mt-3">
                <img
                  src={newsimg}
                  alt="news-img"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className=" flex flex-wrap gap-y-2 sm:flex sm:flex-row items-center py-2 justify-between ">
                <div className="flex items-center">
                  <CiLocationOn size={25} className="text-red" />
                  <h3 className="news-title-md mt-2 ml-1 capitalize">
                    {location}{" "}
                  </h3>
                </div>
                <div>
                  <h3 className="date-lg">{createdAt}</h3>
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
              <div className="py-2 my-2 border-[3px] border-green-600  rounded-md flex justify-center items-center font-semibold text-green-700">
                फॉलो करे Whatsapp पे !
              </div>
              <div className="py-4">
                {content[0] && <BlogContent block={content[0]?.blocks[0]} />}
                <div className="bg-gray h-[200px] flex justify-center items-center">
                  Ads
                </div>
                {content[0]?.blocks.length > 1 &&
                  content[0]?.blocks.slice(1).map((block, i) => {
                    return (
                      <div className="my-4 md:my-8" key={i}>
                        <BlogContent block={block} />
                      </div>
                    );
                  })}
              </div>
              {/* <div className="py-3">
                <p className="news-p text-wrap">
                  हैदराबादियों का ओवैसी परिवार की तीन पीढ़ियों से सियासी रिश्ता
                  है। मौजूदा सांसद ओवैसी के दादा अब्दुल वाहिद ओवैसी ने 1957 में
                  हैदराबाद नगर निगम से सियासत शुरू की थी। उन्होंने बिखरी पड़ी
                  मजलिस और कौम को एक सूत्र में पिरोया। ओवैसी के पिता सुल्तान
                  सलाहुद्दीन ओवैसी 1980 से 1999 तक लगातार छह बार सांसद चुने गए।
                  ओवैसी की सियासी राह हमेशा फूलों से ही भरी रही।
                </p>
              </div> */}
              {/* <div className=" w-full h-[350px] mt-3">
                <img
                  src={newsimg}
                  alt="news-img"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div> */}
              {/* <div className="py-4">
                <p className="news-p text-wrap">
                  वरिष्ठ पत्रकार राजेंद्र बताते हैं कि ओवैसी के पिता को 1996 में
                  भाजपा के वेंकैया नायडू और 1999 में बी.बाल रेड्डी से तगड़ी
                  चुनौती मिली थी। फिर, फासला बढ़ता गया। 2008 में हैदराबाद सीट का
                  परिसीमन हुआ और ग्रामीण अंचल के तंदूर, विकाराबाद और चेवल्ला
                  विधानसभा क्षेत्र कट गए। इससे हैदराबाद सीट पुराने शहर तक सिमट
                  गई। यहां से उन्हें हरा पाना बेहद कठिन है।
                </p>
              </div> */}
              <div>
                <Heading title={"सम्बंधित खबर"} />
                <div className="flex flex-wrap md:flex-wrap lg:flex-nowrap justify-between gap-4 items-center w-full ">
                  {relatedNews &&
                    relatedNews.map((item, index) => (
                      <Link
                        to={`/news/${item.news_id}`}
                        key={index}
                        className="flex flex-col md:flex-wrap lg:w-[200px] h-auto overflow-hidden"
                      >
                        <div className=" lg:h-[120px]">
                          <img
                            src={relativenews}
                            alt="Relative-news-image"
                            className=" w-full h-full object-cover"
                          />
                        </div>
                        <p className="my-2">{item.title}</p>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="  col-span-2 ">
            <SideNews title="read also" />
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePage;
