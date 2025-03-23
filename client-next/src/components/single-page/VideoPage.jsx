"use client";
import { formatDate } from "@/lib/formatDate";
import Heading from "@/lib/Heading";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { MdOutlineContentCopy } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import DetailAds from "../ads/DetailAds";
import toast from "react-hot-toast";
import LazyLoadAd from "../../../components/LazyLoadAds";
import GoogleAdUnit from "../../../components/GoogleAdUnit";
import LazyAdSenseAd from "../../../components/NewGoogleAds";

const newsStructrue = {
  title: "",
  description: "",
  location: "",
};
const VideoPage = ({ news_id }) => {
  const [news, setNews] = useState(newsStructrue);
  const [relatedNews, setRelatedNews] = useState([]);
  const fetchNews = async () => {
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-youtube-news`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",

          body: JSON.stringify({
            video_id: news_id,
            incrementVal,
            mode: "read",
            draft: false,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setNews(data?.news);
        setRelatedNews(data?.relatedNews);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);

  const shareUrl =
    process.env.NEXT_PUBLIC_CURRENT_URL + `/video/${news?.news_id}`;

  const copyUrlToClipboard = async () => {
    // Get the current URL
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success("URL copied to clipboard");
      })
      .catch((err) => {
        console.log("Failed to copy: ", err);
      });
  };
  return (
    <div className="flex spacing mt-2 w-full max-sm:px-1">
      <div className="grid max-sm:flex flex-col sm:grid-cols-6 sm:gap-6 w-full gap-x-2">
        <div className="col-span-6 md:col-span-4 w-full">
          <article className="">
            <div className="center w-full py-2 max-lg:px-[0vw] h-[300px] md:h-[500px] p-1">
              <iframe
                style={{ overflow: "hidden", height: "100%", width: "100%" }}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${news?.videoLinkId}`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                title="YouTube video player"
              ></iframe>
            </div>

            <div className="center w-full max-lg:px-[0vw] mt-1">
              <h2 className="text-4xl leading-normal font-bold max-md:text-3xl font-devNagri">
                {news?.title}
              </h2>
              <div className="flex flex-wrap gap-y-2 sm:flex sm:flex-row items-center py-2 justify-between w-full">
                <div className="flex items-center">
                  <CiLocationOn size={25} className="text-red" />
                  <h3 className="news-title-md mt-2 ml-1 capitalize">
                    {news?.location}
                  </h3>
                </div>
                <div>
                  <h3 className="date-lg">{formatDate(news?.createdAt)}</h3>
                </div>
                <div className="flex gap-2 items-center">
                  <WhatsappShareButton url={shareUrl} title={news?.title}>
                    <RiWhatsappFill
                      className="text-green-600 hover:scale-[1.2]"
                      size={28}
                    />
                  </WhatsappShareButton>
                  <FacebookShareButton
                    hashtag={news?.tags}
                    url={shareUrl}
                    title={news?.title}
                  >
                    <FaFacebook
                      size={24}
                      className="text-blue hover:scale-[1.2]"
                    />
                  </FacebookShareButton>

                  <TwitterShareButton
                    url={shareUrl}
                    title={news?.title}
                    hashtags={news?.tags}
                  >
                    <FaSquareXTwitter
                      size={24}
                      className="text-pink-600 hover:scale-[1.2]"
                    />
                  </TwitterShareButton>
                  <button onClick={copyUrlToClipboard}>
                    <MdOutlineContentCopy
                      size={24}
                      className=" hover:scale-[1.2]"
                    />
                  </button>
                </div>
                <a
                  href="https://www.whatsapp.com/channel/0029VaCW5oSI1rcoWIaACL1j"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 my-2 border-[3px] border-green-600 rounded-md flex justify-center items-center font-semibold text-green-700 w-full hover:text-white hover:bg-green-700 cursor-pointer transition-all delay-75"
                >
                  Whatsapp चैनल फॉलो करे !
                </a>
              </div>

              <p className=" text-lg font-devNagri">{news?.description}</p>
            </div>
          </article>

          <div className="w-full mt-5 mb-3">
            {relatedNews && relatedNews.length > 0 ? (
              <>
                <Heading title={"सम्बंधित खबर"} />
                <div className="flex max-lg:flex-col gap-2 w-full">
                  {relatedNews &&
                    relatedNews.length > 0 &&
                    relatedNews.map((item, index) => (
                      <>
                        <Link
                          href={`/video/${item?.news_id}`}
                          key={index}
                          className="grid grid-cols-3 max-md:gap-x-1 lg:flex lg:flex-col lg:w-[200px] shadow-card p-1 rounded-md max-lg:gap-x-3"
                        >
                          <div className="max-lg:col-span-1  h-[70px] max-h-[103px] lg:h-[120px] max-lg:max-w-36 rounded-md">
                            <Image
                              src={`https://img.youtube.com/vi/${item?.videoLinkId}/mqdefault.jpg`}
                              //   onError={handleImageError}
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
                        </Link>
                      </>
                    ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="flex w-full">
            <div className="bg-gray h-[200px] md:h-[300px] flex justify-center items-center w-full relative">
              <DetailAds />
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 z-[100] flex gap-x-1 rounded-md p-1 font-sans items-center">
                <Link
                  href={"/advertisement-us"}
                  className="text-[#f9f9f9] text-[12px] "
                >
                  <HiOutlineExclamationCircle
                    size={18}
                    className="text-[#f9f9f9] font-sans"
                  />
                </Link>
                <span className="text-[#f9f9f9] text-[12px]">Sponsored</span>
              </div>
            </div>
          </div>
          {/* <div className="w-full h-[5rem] md:h-[9rem] max-md:mt-2 flex items-center justify-center mt-2"> */}
          {/* <FooterAds /> */}
          {/* </div> */}
          <div className="hidden max-sm:flex mt-3">
            {/* <CustomeAndGoogleAdd1 /> */}
          </div>
        </div>
        <div className="flex flex-col gap-y-2 md:gap-y-10 md:col-span-2 md:mt-10">
          <div className="sticky top-36 max-md:hidden">
            {/* <CustomeAndGoogleAdd1 /> */}
          </div>
          {/* <SideNews title={"education"} /> */}
        </div>
        <div className="w-full flex col-span-4 ">
          <GoogleAdUnit>
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-5839947415375117"
              data-ad-slot="9305973634"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </GoogleAdUnit>
          <LazyAdSenseAd
            adClient={"ca-pub-5839947415375117"}
            data-ad-slot="9891237509"
            data-ad-format="auto"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
