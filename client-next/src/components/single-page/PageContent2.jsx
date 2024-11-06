"use client";
// import { handleImageError } from "@/lib/errorImg";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { FaFacebook } from "react-icons/fa";

import { MdOutlineContentCopy } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import toast from "react-hot-toast";
import GoogleAds from "../../../components/GoogleAds";
import NewsContent from "./NewsContent";
import GoogleAdUnit from "../../../components/GoogleAdUnit";

const PageContent2 = ({ item, ads }) => {
  const shareUrl =
    process.env.NEXT_PUBLIC_CURRENT_URL + `/news/${item?.news_id}`;
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

  return item ? (
    <div className="py-4 flex flex-col flex-wrap w-full">
      <h1 className="font-semibold text-[20px] md:text-[25px]">{item.title}</h1>
      <p className="date-lg text-wrap">{item.description}</p>
      <div className="flex flex-col w-full h-[10rem] bg-[#f0f0f0] mb-1">
        <p className="text-center">Advertisement</p>
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
      </div>
      <div className="w-full h-[240px] sm:h-[350px] mt-3 p-1 bg-white">
        <Image
          src={item.banner}
          width={1200}
          height={400}
          sizes={{
            maxWidth: "100%",
            height: "auto",
          }}
          alt="news-img"
          className="w-full max-sm:max-w-screen-sm h-full object-cover"
          loading="lazy"
        />
      </div>
      {item?.imageRef && (
        <div className="flex gap-3 mt-1">
          <p className="text-[16px]">{item?.imageRef}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-y-2 sm:flex sm:flex-row items-center py-2 justify-between w-full">
        <div className="flex items-center">
          <CiLocationOn size={25} className="text-red" />
          <h3 className="news-title-md mt-2 ml-1 capitalize">
            {item.location}
          </h3>
        </div>
        <div>
          <h3 className="date-lg">{formatDate(item.news_post_time)}</h3>
        </div>
        <div className="flex gap-2 items-center">
          <WhatsappShareButton url={shareUrl} title={item.title}>
            <RiWhatsappFill
              className="text-green-600 hover:scale-[1.2]"
              size={28}
            />
          </WhatsappShareButton>
          <FacebookShareButton
            hashtag={item.tags}
            url={shareUrl}
            title={item.title}
          >
            <FaFacebook size={24} className="text-blue hover:scale-[1.2]" />
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={item.title}
            hashtags={item?.tags}
          >
            <FaSquareXTwitter
              size={24}
              className="text-pink-600 hover:scale-[1.2]"
            />
          </TwitterShareButton>
          <button onClick={copyUrlToClipboard}>
            <MdOutlineContentCopy size={24} className=" hover:scale-[1.2]" />
          </button>
        </div>
      </div>
      <a
        href="https://www.whatsapp.com/channel/0029VaCW5oSI1rcoWIaACL1j"
        target="_blank"
        rel="noopener noreferrer"
        className="py-2 my-2 border-[3px] border-green-600 rounded-md flex justify-center items-center font-semibold text-green-700 w-full hover:text-white hover:bg-green-700 cursor-pointer transition-all delay-75"
      >
        Whatsapp चैनल फॉलो करे !
      </a>
      <div className="flex flex-col w-full h-[10rem] bg-[#f0f0f0] mb-1 mt-2">
        <p className="text-center">Advertisement</p>
        <GoogleAds
          adClient="ca-pub-5839947415375117"
          adSlot="4193247755"
          style={{ display: "block", width: "100%", height: "100%" }}
          format="auto"
        />
      </div>
      <div className="flex flex-col w-full max-h-[8rem]"></div>
      <NewsContent item={item} />
    </div>
  ) : (
    <div className="flex w-full flex-col flex-wrap sm:gap-2 md:gap-4 mt-5 mb-5">
      <div className="h-[25px] bg-[#dddbdd] animate-pulse"></div>
      <div className="h-[25px] bg-[#dddbdd] animate-pulse"></div>
      <div className="h-[240px] sm:h-[350px] p-1 bg-[#dddbdd] animate-pulse my-2"></div>
      <div className="h-[25px] bg-[#dddbdd] animate-pulse"></div>
      <div className="h-[28px] bg-[#dddbdd] animate-pulse"></div>
      <div className="h-[130px] sm:h-[160px] p-1 bg-[#dddbdd] animate-pulse my-2"></div>

      <div className="h-[20px] bg-[#dddbdd] animate-pulse"></div>
      <div className="h-[20px] bg-[#dddbdd] animate-pulse"></div>
      <div className="h-[20px] bg-[#dddbdd] animate-pulse"></div>
      <div className="h-[20px] bg-[#dddbdd] animate-pulse"></div>
      <div className="h-[20px] bg-[#dddbdd] animate-pulse"></div>
    </div>
  );
};

export default PageContent2;
