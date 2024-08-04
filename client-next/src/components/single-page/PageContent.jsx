"use client";
// import { handleImageError } from "@/lib/errorImg";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
// import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FaFacebook } from "react-icons/fa";

import { MdOutlineContentCopy } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiWhatsappFill, TwitterShareButton } from "react-icons/ri";
import toast from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import BlogContent from "./BlogContent";
import Link from "next/link";

const PageContent = ({ item }) => {
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

  const shareUrl = "https://www.facebook.com";
  return (
    item && (
      <div className="py-4 flex flex-col flex-wrap w-full">
        <h1 className="font-semibold text-[20px] md:text-[25px]">
          {item.title}
        </h1>
        <p className="date-lg text-wrap">{item.description}</p>
        <div className="w-full h-[280px] sm:h-[350px] mt-3">
          <Image
            src={item.banner}
            width={1200}
            height={800}
            sizes={{
              maxWidth: "100%",
              height: "auto",
            }}
            // onError={handleImageError}
            alt="news-img"
            className="w-full max-sm:max-w-screen-sm h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-wrap gap-y-2 sm:flex sm:flex-row items-center py-2 justify-between w-full">
          <div className="flex items-center">
            <CiLocationOn size={25} className="text-red" />
            <h3 className="news-title-md mt-2 ml-1 capitalize">
              {item.location}
            </h3>
          </div>
          <div>
            <h3 className="date-lg">{formatDate(item.createdAt)}</h3>
          </div>
          <div className="flex gap-2 items-center">
            {/* <WhatsappShareButton url={"jfdkf"} title={item.title}>
              <RiWhatsappFill
                className="text-green-600 hover:scale-[1.2]"
                size={28}
              />
            </WhatsappShareButton> */}
            {/* <FacebookShareButton
              hashtag={news?.tags}
              url={shareUrl}
              title={news.title}
            >
              <FaFacebook size={24} className="text-blue hover:scale-[1.2]" />
            </FacebookShareButton> */}

            {/* <TwitterShareButton
              url={shareUrl}
              title={item.title}
              hashtags={item?.tags}
            >
              <FaSquareXTwitter
                size={24}
                className="text-pink-600 hover:scale-[1.2]"
              />
            </TwitterShareButton> */}
            <button onClick={copyUrlToClipboard}>
              <MdOutlineContentCopy size={24} className=" hover:scale-[1.2]" />
            </button>
          </div>
        </div>
        <div className="py-2 my-2 border-[3px] border-green-600 rounded-md flex justify-center items-center font-semibold text-green-700 w-full hover:text-white hover:bg-green-700 cursor-pointer transition-all delay-75">
          Whatsapp चैनल फॉलो करे !
        </div>
        <div className="py-4 w-full">
          {item?.content[0] && (
            <BlogContent block={item?.content[0]?.blocks[0]} />
          )}
          <div className="bg-gray h-[200px] flex justify-center items-center w-full relative">
            {/* <DetailAds /> */}
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
          {item?.content[0]?.blocks?.length > 1 &&
            item?.content[0]?.blocks.slice(1).map((block, i) => (
              <div className="my-4 md:my-4" key={i}>
                <BlogContent block={block} />
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default PageContent;
