import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MetaData } from "../../../seo/Helmet";
import { formatDate } from "../../../common/date";
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
};
const VideoPage = () => {
  const [ytdata, setYtData] = useState(ytNewsStructure);
  const [loading, setLoading] = useState(true);
  const { news_id } = useParams();

  let { title, description, videoLinkId, createdAt, tags } = ytdata;
  const fetchNews = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-youtube-news", {
        video_id: news_id,
      })
      .then(async ({ data: { news } }) => {
        // console.log(news)
        setYtData(news);
        setLoading(false);
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
    <div className="flex w-full items-center justify-center">
      {loading ? (
        <></>
      ) : (
        <div className="center w-full  py-5 max-lg:px-[5vw]">
          <MetaData
            title={title}
            keywords={tags}
            banner={thumbnail}
            description={description}
            link={shareUrl}
          />
          <div className="center w-full py-2 max-lg:px-[0vw] md:w-[60%] h-[300px] md:h-[500px]">
            <iframe
              style={{ overflow: "hidden", height: "100%", width: "100%" }}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoLinkId}`}
            ></iframe>
          </div>

          <div className="center w-full py-3 max-lg:px-[0vw] md:w-[60%]">
            <h2 className="text-4xl leading-normal font-bold max-md:text-3xl font-devNagri">
              {title}
            </h2>
            <div className=" py-2 flex justify-between items-center relative">
              <div className="flex">
                <p className="uppercase text-xl">Published Date:</p>
                <p className="ml-3">{formatDate(createdAt)}</p>
              </div>

              {/* <div id="page" className="share">
                  <ul>
                    <li className="twitter">
                      <TwitterShareButton
                        url={shareUrl}
                        title={title}
                        hashtags={tags}
                      >
                        <i className="ri-twitter-line"></i>
                      </TwitterShareButton>
                    </li>
                    <li className="facebook">
                      <FacebookShareButton
                        url={shareUrl}
                        quote={title}
                        hashtag="#GreatRead"
                      >
                        <i className="ri-facebook-line"></i>
                      </FacebookShareButton>
                    </li>
                    <li className="whatsapp">
                      <WhatsappShareButton url={shareUrl} title={title}>
                        <i className="ri-whatsapp-line"></i>
                      </WhatsappShareButton>
                    </li>
                    <li className="close">
                      <button onClick={copyUrlToClipboard}>
                        <i className="ri-file-copy-line"></i>
                      </button>
                    </li>
                  </ul>
                </div> */}
            </div>
            <hr className="opacity-[0.2]" />

            <p className="mt-3 text-lg font-devNagri">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
