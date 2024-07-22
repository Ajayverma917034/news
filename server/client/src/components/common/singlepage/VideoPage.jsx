import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MetaData } from "../../../seo/Helmet";
import { formatDate } from "../../../common/date";
import Loader from "../../../loader/Loader";
import CustomeAndGoogleAdd from "../../../pages/advertisement/CustomeAndGoogleAdd";
import SideNews from "../../../pages/advertisement/related-news/SideNews";
import Heading from "../Heading";
import httpClient from "../../../api/httpClient";
import { handleImageError } from "../../../common/errorImg";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { RiWhatsappFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdOutlineContentCopy } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
// import { getFullDay } from "../common/date-format";
// import AnimationWrapper from "../common/AnimationWrapper";
// import Skeltons5 from "./Skeltons/Skeltons5";
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   WhatsappShareButton,
// } from "react-share";

export const ytNewsStructure = {
  title: "",
  description: "",
  videoLinkId: "",
  createdAt: "",
  tags: [],
  location: "",
  createdAt: "",
};
const VideoPage = () => {
  const [ytdata, setYtData] = useState(ytNewsStructure);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState(null);
  const { news_id } = useParams();

  let { title, description, videoLinkId, createdAt, tags, location } = ytdata;
  const fetchNews = () => {
    let incrementVal = 0;
    const viewedYtNews = JSON.parse(
      sessionStorage.getItem("viewedYtNews") || "[]"
    );

    if (!viewedYtNews.includes(news_id)) {
      viewedYtNews.push(news_id);
      sessionStorage.setItem("viewedYtNews", JSON.stringify(viewedYtNews));
      incrementVal = 1;
    } else {
      incrementVal = 0;
    }

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-youtube-news", {
        video_id: news_id,
        incrementVal,
      })
      .then(async ({ data: { news } }) => {
        // console.log(news)
        setYtData(news);
        const { tags, news_section_type, news_id: prevNewsId } = news;

        const relatedNewsResponse = await httpClient.post(
          "/fetch-related-yt-news",
          {
            tags,
            news_section_type,
            news_id: prevNewsId,
          }
        );

        setLoading(false);
        setRelatedNews(relatedNewsResponse.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const resetState = () => {
    setYtData(ytNewsStructure);
    setLoading(true);
  };
  useEffect(() => {
    resetState();
    fetchNews();
  }, [news_id]);

  const shareUrl = window.location.href;
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const thumbnail = `https://img.youtube.com/vi/${videoLinkId}/mqdefault.jpg`;
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
    <div className="flex spacing mt-2">
      {loading ? (
        <Loader />
      ) : (
        <div className="grid flex-col sm:grid-cols-6 sm:gap-6 w-full gap-x-2">
          <MetaData
            title={title}
            keywords={tags}
            banner={thumbnail}
            description={description}
            link={shareUrl}
            createdAt={createdAt}
          />
          <div className="col-span-4 w-full">
            <div className="center w-full py-2 max-lg:px-[0vw] h-[300px] md:h-[500px]">
              <iframe
                style={{ overflow: "hidden", height: "100%", width: "100%" }}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoLinkId}`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                title="YouTube video player"
              ></iframe>
            </div>

            <div className="center w-full max-lg:px-[0vw]">
              <h2 className="text-4xl leading-normal font-bold max-md:text-3xl font-devNagri">
                {title}
              </h2>
              <div className="flex flex-wrap gap-y-2 sm:flex sm:flex-row items-center py-2 justify-between w-full">
                <div className="flex items-center">
                  <CiLocationOn size={25} className="text-red" />
                  <h3 className="news-title-md mt-2 ml-1 capitalize">
                    {location}
                  </h3>
                </div>
                <div>
                  <h3 className="date-lg">{formatDate(createdAt)}</h3>
                </div>
                <div className="flex gap-2 items-center">
                  <WhatsappShareButton url={shareUrl} title={title}>
                    <RiWhatsappFill
                      className="text-green-600 hover:scale-[1.2]"
                      size={28}
                    />
                  </WhatsappShareButton>
                  <FacebookShareButton
                    hashtag={tags}
                    url={shareUrl}
                    title={title}
                  >
                    <FaFacebook
                      size={24}
                      className="text-blue hover:scale-[1.2]"
                    />
                  </FacebookShareButton>

                  <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    hashtags={tags}
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
              </div>

              <p className=" text-lg font-devNagri">{description}</p>
            </div>
            <div className="w-full">
              <Heading title={"सम्बंधित वीडियो"} />
              <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full">
                {relatedNews &&
                  relatedNews.map((item, index) => (
                    <Link
                      to={`/video/${item?.news_id}`}
                      key={index}
                      className="flex flex-col md:flex-wrap lg:w-[200px] h-auto overflow-hidden"
                    >
                      <div className="max-h-[120px] lg:h-[120px]">
                        <img
                          src={`https://img.youtube.com/vi/${item.videoLinkId}/mqdefault.jpg`}
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
          <div className="col-span-1 w-full">
            <div className="sticky top-32 max-md:hidden">
              <CustomeAndGoogleAdd type="detail" />
              <SideNews title="read also" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
