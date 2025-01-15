"use client";
import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";

import { FaFacebook } from "react-icons/fa";

import { MdOutlineContentCopy } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
const NewsShare = ({ item }) => {
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
  return (
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
  );
};

export default NewsShare;
