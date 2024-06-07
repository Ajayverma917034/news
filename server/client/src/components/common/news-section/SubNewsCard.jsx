import React from "react";
import { Link } from "react-router-dom";
import { handleImageError } from "../../../common/errorImg";

function SubNewsCard({ data }) {
  return (
    <Link to={`/news/${data?.news_id}`} className="flex w-full flex-row gap-4">
      <div className="h-[80px] min-w-[120px]">
        <img
          src={data?.banner}
          alt="Image"
          className="object-cover"
          onError={handleImageError}
        />
      </div>
      <div className="flex flex-col lg:w-3/4">
        <h1 className="news-title-sm line-clamp-3">{data?.title}</h1>
      </div>
    </Link>
  );
}

export default SubNewsCard;
