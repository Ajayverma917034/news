import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import { handleImageError } from "../../../common/errorImg";
import { formatDate } from "../../../common/date";
import BlogContent from "../BlogContent";
import Heading from "../Heading";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DetailAds from "../../../pages/advertisement/DetailAds";

const PageContent = ({ item }) => {
  const { loading, error, detailAds } = useSelector((state) => state.ads);
  return (
    <div className="py-4 flex flex-col flex-wrap w-full">
      <h1 className="font-semibold text-[20px] md:text-[25px]">{item.title}</h1>
      <p className="date-lg text-wrap">{item.description}</p>
      <div className="w-full h-[280px] sm:h-[350px] mt-3">
        <img
          src={item?.banner}
          onError={handleImageError}
          alt="news-img"
          className="w-full h-full object-cover"
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
          <RiWhatsappFill
            className="text-green-600 hover:scale-[1.2]"
            size={28}
          />
          <FaFacebook size={24} className="text-blue hover:scale-[1.2]" />
          <AiFillInstagram size={26} className="text-red hover:scale-[1.2]" />
          <FaSquareXTwitter
            size={24}
            className="text-pink-600 hover:scale-[1.2]"
          />
        </div>
      </div>
      <div className="py-2 my-2 border-[3px] border-green-600 rounded-md flex justify-center items-center font-semibold text-green-700 w-full">
        फॉलो करे Whatsapp पे !
      </div>
      <div className="py-4 w-full">
        {item?.content[0] && (
          <BlogContent block={item?.content[0]?.blocks[0]} />
        )}
        <div className="bg-gray h-[200px] flex justify-center items-center w-full">
          <DetailAds />
        </div>
        {item?.content[0]?.blocks?.length > 1 &&
          item?.content[0]?.blocks.slice(1).map((block, i) => (
            <div className="my-4 md:my-4" key={i}>
              <BlogContent block={block} />
            </div>
          ))}
      </div>
      {/* <div className="w-full">
        <Heading title={"सम्बंधित खबर"} />
        <div className="flex flex-wrap md:flex-wrap lg:flex-nowrap gap-4 w-full">
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
      </div> */}
    </div>
  );
};

export default PageContent;
