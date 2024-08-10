import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import httpClient from "../services/httpClient";
import { filterPaginationData } from "../common/filterPaginationData";
import { handleImageError } from "../common/imageError";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../common/date";
import Loader from "../components/Loader";
import { categoryData } from "../common/categoryData";
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

const NewsHandler = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const itemsPerPage = 6;
  const [news, setNews] = useState(null);

  const fetchNews = ({ page = 1 }) => {
    httpClient
      .post(`get-my-news`, { page, limit: itemsPerPage })
      .then(async ({ data }) => {
        let formatData = await filterPaginationData({
          state: news,
          data: data.news,
          page,
          countRoute: "/get-my-news-count",
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
        <div className="border-2  rounded-lg md:w-60 flex  justify-center items-center">
          <input
            type="text"
            placeholder="Search News"
            className="border-none outline-none p-1 rounded-lg"
          />
          <BsSearch size={20} />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-1 rounded"
        >
          {categoryData.map((category, index) => (
            <option key={index} value={category.english}>
              {category.hindi}
            </option>
          ))}
        </select>
      </div>
      {/* <p className="mb-4">{newsItems.length} Item Found</p> */}
      <div className="space-y-4 h-[calc(100vh-224px)] md:h-[calc(100vh-219px)] overflow-auto">
        {news ? (
          news?.results?.length ? (
            news?.results?.map((item, index) => (
              <div
                key={index}
                className="grid sm:grid-cols-7 lg:grid-cols-6 gap-3 items-center  p-4 rounded shadow-dark-shadow"
              >
                <div className=" sm:col-span-2 lg:col-span-1">
                  <img
                    src={item.banner}
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
                        <span className="font-semibold text-black">
                          Created On:
                        </span>{" "}
                        {formatDate(item.createdAt)}
                      </p>
                      <p className="text-lg text-gray">
                        <span className="font-semibold text-black">Read:</span>{" "}
                        {item.activity.total_reads}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <button
                      className="bg-blue text-white px-3 py-1 rounded-lg text-base"
                      onClick={() =>
                        navigate(`/dashboard/create-news/${item?.news_id}`)
                      }
                    >
                      Edit
                    </button>
                    {/* <button className="bg-red text-white px-3 py-1 rounded-lg text-base">
                      Delete
                    </button> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>No News</h1>
          )
        ) : (
          <Loader />
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

export default NewsHandler;
