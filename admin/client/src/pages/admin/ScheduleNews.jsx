import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import httpClient from "../../services/httpClient";
import { filterPaginationData } from "../../common/filterPaginationData";
import { handleImageError } from "../../common/imageError";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../common/date";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/ConfirmationModal";

const ScheduleNews = () => {
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const [news, setNews] = useState(null);
  const [confirmPublishOpen, setConfirmPublisOpen] = useState(false);
  const [confirmDeleteOpen, setDeleteOpen] = useState(false);
  const [id, setId] = useState(null);

  const fetchNews = ({ page = 1 }) => {
    httpClient
      .post(`get-my-schedule-news`, { page, limit: itemsPerPage })
      .then(async ({ data }) => {
        let formatData = await filterPaginationData({
          state: news,
          data: data.news,
          page,
          countRoute: "/get-my-schedule-news-count",
        });
        setNews(formatData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteScheduleNews = async () => {
    try {
      if (!id) return;
      let loadingToast = toast.loading("Deleting...");
      const { data } = await httpClient.delete(
        `/delete-my-schedule-news/${id}`
      );
      setDeleteOpen(false);
      toast.dismiss(loadingToast);
      toast.success("News Deleted Successfully");
      setNews({
        ...news,
        results: news.results.filter((item) => item.news_id !== id),
      });
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
      toast.error("Failed to delete news");
      setDeleteOpen(false);
    }
  };

  const handlePublish = () => {
    let loadingToast = toast.loading("Deleting...");
    httpClient
      .put(`publish-schedule-news`, { news_id: id })
      .then(async ({ data }) => {
        toast.dismiss(loadingToast);
        toast.success(data.message);
        setConfirmPublisOpen(false);
        setNews({
          ...news,
          results: news.results.filter((item) => item.news_id !== id), // use 'id' instead of 'news_id'
        });
        // fetchNews({ page: news?.page });
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(loadingToast);
        toast.error("Failed to publish news");
        setConfirmPublisOpen(false);
      });
  };
  useEffect(() => {
    fetchNews({ page: 1 });
  }, []);

  return (
    <div className="mx-auto p-4 md:px-10">
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
                      {/* <p className="text-lg text-gray">
                        <span className="font-semibold text-black">Read:</span>{" "}
                        {item.activity.total_reads}
                      </p> */}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <button
                      className="bg-red text-white px-3 py-1 rounded-lg text-base"
                      onClick={(e) => {
                        setId(item.news_id);
                        setDeleteOpen(true);
                      }}
                      disabled={confirmDeleteOpen}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue text-white px-3 py-1 rounded-lg text-base"
                      onClick={() =>
                        navigate(
                          `/dashboard/create-news/${item?.news_id}?type=schedule_news`
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="bg-blue text-white px-3 py-1 rounded-lg text-base"
                      onClick={() => {
                        setId(item.news_id);
                        setConfirmPublisOpen(true);
                      }}
                      disabled={confirmPublishOpen}
                    >
                      Publish
                    </button>
                    {/* <button className="bg-red text-white px-3 py-1 rounded-lg text-base">
                      Delete
                    </button> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2>No News</h2>
          )
        ) : (
          <Loader />
        )}
      </div>
      <div className="flex justify-between mt-4">
        {news?.totalDocs === 0 ? (
          <span className="font-semibold text-center w-full">
            No news available
          </span>
        ) : (
          <>
            <button
              onClick={() => fetchNews({ page: news?.page - 1 })}
              className={`${
                news?.page === 1 ? "bg-gray cursor-not-allowed" : "bg-blue"
              } text-white px-4 py-2 rounded`}
              disabled={news?.page === 1}
            >
              Prev
            </button>
            <span className="font-semibold">
              Page {news?.page} of {Math.ceil(news?.totalDocs / itemsPerPage)}
            </span>
            <button
              onClick={() => fetchNews({ page: news?.page + 1 })}
              className={`${
                news?.page === Math.ceil(news?.totalDocs / itemsPerPage)
                  ? "bg-gray cursor-not-allowed"
                  : "bg-blue"
              } text-white px-4 py-2 rounded`}
              disabled={
                news?.page === Math.ceil(news?.totalDocs / itemsPerPage)
              }
            >
              Next
            </button>
          </>
        )}
      </div>

      <ConfirmationModal
        isOpen={confirmPublishOpen}
        onClose={() => setConfirmPublisOpen(false)}
        title="Are you sure you want to publish this news now?"
        onConfirm={handlePublish}
        bg="bg-green-700"
        button="Publish"
      />
      <ConfirmationModal
        isOpen={confirmDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteScheduleNews}
        title="Are you sure you want to delete this news?"
        bg="bg-red"
        button="Delete"
      />
    </div>
  );
};

export default ScheduleNews;
