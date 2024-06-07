import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { filterPaginationData } from "../common/filterPaginationData";
import httpClient from "../services/httpClient";
import { handleImageError } from "../common/imageError";
import { useNavigate } from "react-router-dom";

const categories = [
  "उत्तर प्रदेश",
  "मध्यप्रदेश",
  "छत्तीसगढ़",
  "बिहार",
  "झारखंड",
  "राशिफल",
  "देश",
  "क्राइम",
  "कैरियर",
  "हेल्थ",
  "फ़िल्म",
  "धर्म",
];

const VideoHandler = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const itemsPerPage = 10;

  const fetchNews = ({ page = 1 }) => {
    httpClient
      .post(`get-my-news-yt`, { page, limit: itemsPerPage })
      .then(async ({ data }) => {
        let formatData = await filterPaginationData({
          state: news,
          data: data.news,
          page,
          countRoute: "/get-my-news-count-yt",
        });
        setNews(formatData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchNews({ page: 1 });
  }, []);
  return (
    <div className="mx-auto p-4 md:px-10">
      <div className="flex justify-between items-center gap-4 mb-4 ">
        <div className="border-2  rounded-lg w-60 flex  justify-center items-center">
          <input
            type="text"
            placeholder="Search Video"
            className="border-none outline-none p-1"
          />
          <BsSearch />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-1 rounded"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {/* <p className="mb-4">{newsItems.length} Item Found</p> */}
      <div className="space-y-4 h-[calc(100vh-230px)] overflow-auto">
        {news ? (
          news?.results?.length ? (
            news?.results?.map((item, index) => (
              <div
                key={index}
                className="grid sm:grid-cols-7 lg:grid-cols-6 gap-3 items-center  p-4 rounded shadow-dark-shadow"
              >
                <div className=" sm:col-span-2 lg:col-span-1">
                  <img
                    src={`https://img.youtube.com/vi/${item?.videoLinkId}/mqdefault.jpg`}
                    alt="news"
                    className="w-22 h-20 "
                    onError={handleImageError}
                  />
                </div>
                <div className="sm:col-span-5 lg:col-span-5">
                  <div className="flex-1">
                    <h3 className="font-medium text-xl line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex justify-start gap-8">
                      <p className="text-lg text-gray">
                        <span className="font-semibold">Created On:</span>{" "}
                        {item.createdAt}
                      </p>
                      <p className="text-lg text-gray">
                        <span className="font-semibold">Read:</span>{" "}
                        {item.activity.total_reads}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <button
                      className="bg-blue text-white py-[2px]  px-2 rounded-lg text-[12px]"
                      onClick={() =>
                        navigate(
                          `/dashboard/create-videos?video_id=${item?.news_id}`
                        )
                      }
                    >
                      Edit
                    </button>
                    <button className="bg-red text-white py-[2px]  px-2 rounded-lg text-[12px] ">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>No News</h1>
          )
        ) : (
          <h1>No News</h1>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => fetchNews({ page: news?.page - 1 })}
          className={`${
            news?.page === 1 ? "bg-gray" : "bg-blue"
          } text-white px-4 py-2 rounded`}
          disabled={news?.page === 1}
        >
          Prev
        </button>
        <span className="font-semibold">
          Page {news?.page} of {Math.floor(news?.totalDocs / itemsPerPage)}
        </span>
        <button
          onClick={() => fetchNews({ page: news?.page + 1 })}
          className={`${
            news?.page === Math.floor(news?.totalDocs / itemsPerPage)
              ? "bg-gray pointer-events-none cursor-not-allowed"
              : "bg-blue"
          } text-white px-4 py-2 rounded`}
          disabled={news?.page === Math.floor(news?.totalDocs / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VideoHandler;
