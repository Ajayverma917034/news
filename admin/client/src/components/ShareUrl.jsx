import { FaWhatsappSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
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
const ShareUrl = ({ currentURL = "" }) => {
  const socialLinks = [
    {
      id: "whatsapp",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        currentURL
      )}`,
      label: "WhatsApp",
      icon: <FaWhatsappSquare className="text-green size-10" />,
    },
    {
      id: "facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentURL
      )}`,
      label: "Facebook",
      icon: <FaFacebookSquare className="text-blue-600 size-10" />,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentURL);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="w-full mx-auto bg-white text-center">
      {/* <h2 className="text-2xl font-semibold text-purple-700 mb-4">Social Share</h2> */}
      <p className="text-gray mb-3">Share this link via</p>

      <div className="flex justify-center gap-4 mb-4">
        {/* {socialLinks.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-100 hover:bg-purple-200 text-purple-600 transition-colors"
          >
            <span className="text-xl">{link.icon}</span>
          </Link>
        ))} */}
        <div className="flex gap-2 items-center">
          <WhatsappShareButton url={currentURL} title={item.title}>
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

      <div className="flex items-center bg-blue p-2 rounded-lg mb-4">
        <input
          type="text"
          value={currentURL}
          readOnly
          className="flex-1 bg-transparent text-gray-600 focus:outline-none"
        />
        <button
          onClick={handleCopy}
          className=" bg-green text-black bg-white hover:text-green px-1 py-1 rounded hover:bg-lightGreen transition"
        >
          <IoCopyOutline className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default ShareUrl;
