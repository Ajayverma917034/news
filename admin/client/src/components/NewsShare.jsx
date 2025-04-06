import React from "react";
import { toast } from "react-hot-toast";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";

import { FaFacebook } from "react-icons/fa";

import { MdOutlineContentCopy } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
const NewsShare = ({ item, setIsPopUpOpen }) => {
  const shareUrl = `https://janpadnewslive.com/news/${item?.news_id}`;
  const copyUrlToClipboard = async () => {
    // Get the current URL
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success("URL copied to clipboard");
        setIsPopUpOpen(false);
      })
      .catch((err) => {
        console.log("Failed to copy: ", err);
      });
  };
  return (
    <div className="flex gap-2 items-center w-full justify-between max-w-[300px] mx-auto">
      <WhatsappShareButton url={shareUrl} title={item.title}>
        <RiWhatsappFill
          className="text-green-600 hover:scale-[1.2]"
          size={35}
        />
      </WhatsappShareButton>
      <FacebookShareButton
        hashtag={item.tags}
        url={shareUrl}
        title={item.title}
      >
        <FaFacebook size={30} className="text-blue hover:scale-[1.2]" />
      </FacebookShareButton>

      <TwitterShareButton
        url={shareUrl}
        title={item.title}
        hashtags={item?.tags}
      >
        <FaSquareXTwitter
          size={30}
          className="text-pink-600 hover:scale-[1.2]"
        />
      </TwitterShareButton>
      <button onClick={copyUrlToClipboard} className="bg-gray text-white">
        <MdOutlineContentCopy size={30} className=" hover:scale-[1.2]" />
      </button>
    </div>
  );
};

export default NewsShare;
