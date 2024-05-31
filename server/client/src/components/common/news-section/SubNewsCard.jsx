import React from "react";
import { Link } from "react-router-dom";

function SubNewsCard({ data }) {
  return (
    <Link to={`/news/${data.news_id}`} className="flex w-full flex-row gap-4">
      <div className="h-[80px] min-w-[120px]">
        <img
          src="https://images.pexels.com/photos/610293/pexels-photo-610293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Image"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col lg:w-3/4">
        <h1 className="news-title-sm line-clamp-3">{data.title}</h1>
      </div>
    </Link>
  );
}

export default SubNewsCard;
