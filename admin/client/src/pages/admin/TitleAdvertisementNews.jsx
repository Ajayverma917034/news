import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import httpClient from "../../services/httpClient";
import { filterPaginationData } from "../../common/filterPaginationData";
import { handleImageError } from "../../common/imageError";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../common/date";
import Loader from "../../components/Loader";
import AddBreakingNews from "../../components/admin/AddBreakingNews";
import EditBreakingNewsHandler from "../../components/admin/EditBreakingNewsHandler";
import ConfirmationModal from "../../components/ConfirmationModal";
import toast from "react-hot-toast";
import AddAdvertisementNews from "../../components/admin/AddAdvertisementNews";
import EditAdvertisementNewsHandler from "../../components/admin/EditAdvertisementNewsHandler";
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

const TitleAdvertisementNews = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [id, setId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;
  const [addBreakingNews, setAddBreakingNews] = useState(false);
  const [editBreakingNews, setEditBreakingNews] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [news, setNews] = useState(null);
  const [confirmationData, setConfirmationData] = useState({
    title: "",
    bg: "",
    button: "",
    fun: null,
    id: null,
  });

  const fetchNews = () => {
    httpClient
      .get(`get-admin-title-advertisement`)
      .then(async ({ data }) => {
        setNews(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (e) => {
    let loadingToast = toast.loading("Deleting...");
    if (!id) return;
    try {
      const { data } = await httpClient.delete(
        `admin/delete-advertisement-news/${id}`
      );
      setIsModalOpen(false);
      toast.dismiss(loadingToast);
      toast.success("Advertisement Deleted Successfully");
      return fetchNews();
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Failed to delete news");
      console.log(err);
      setIsModalOpen(false);
    }
  };

  const ExtendExpiry = async (e) => {
    e.target.disabled = true;
    let loadingToast = toast.loading("Extending...");
    if (!id) return;
    try {
      const { data } = await httpClient.put(`admin/extend-expiry/${id}`);
      setIsModalOpen(false);
      toast.dismiss(loadingToast);
      toast.success("Advertisement Extended Successfully");
      return fetchNews();
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Failed to extend news");
      console.log(err);
      setIsModalOpen(false);
    }
  };

  const RenewPlan = async (e) => {
    e.target.disabled = true;
    let loadingToast = toast.loading("Extending...");
    if (!id) return;
    try {
      const { data } = await httpClient.put(`admin/renew-expiry/${id}`);
      setIsModalOpen(false);
      toast.dismiss(loadingToast);
      toast.success("Advertisement Extended Successfully");
      return fetchNews();
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Failed to extend news");
      console.log(err);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="mx-auto p-4 md:px-10">
      <div className="flex justify-between items-center gap-4 mb-4 ">
        <div className="border-2 max-sm:hidden rounded-lg w-60 flex  justify-center items-center">
          <input
            type="text"
            placeholder="Search News"
            className="border-none outline-none p-1 rounded-lg"
          />
          <BsSearch size={20} />
        </div>

        <button
          className="add-user-button bg-blue"
          onClick={() => setAddBreakingNews(true)}
        >
          + Add Advertisement News
        </button>
      </div>
      {/* <p className="mb-4">{newsItems.length} Item Found</p> */}
      <div className="space-y-4 h-[calc(100vh-224px)] md:h-[calc(100vh-219px)] overflow-auto">
        {news ? (
          news?.length ? (
            news?.map((item, index) => (
              <div
                key={index}
                className="grid sm:grid-cols-7 lg:grid-cols-6 gap-3 items-center  p-4 rounded shadow-dark-shadow"
              >
                {/* <div className=" sm:col-span-2 lg:col-span-1">
                  <img
                    src={item.banner}
                    alt="news"
                    className="w-22 h-20 "
                    onError={handleImageError}
                  />
                </div> */}
                <div className="sm:col-span-5 lg:col-span-5">
                  <div className="flex-1">
                    <h3 className="font-medium text-xl line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex justify-start gap-8 flex-wrap">
                      {item?.link && (
                        <p className="text-lg text-gray">
                          <span className="font-semibold text-black">
                            Link :
                          </span>{" "}
                          {item?.link}
                        </p>
                      )}
                      {item?.email && (
                        <p className="text-lg text-gray">
                          <span className="font-semibold text-black">
                            Email :
                          </span>{" "}
                          {item?.email}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-start gap-8 flex-wrap">
                      <p className="text-lg text-gray">
                        <span className="font-semibold text-black">
                          Created On:
                        </span>{" "}
                        {formatDate(item?.createdAt)}
                      </p>
                      <p className="text-lg text-gray">
                        <span className="font-semibold text-black">
                          Expire On:
                        </span>{" "}
                        {formatDate(item?.expireDate)}
                      </p>
                      <p className="text-lg text-gray">
                        <span className="font-semibold text-black">
                          Created By:
                        </span>{" "}
                        @{item?.author?.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <button
                      className="bg-blue text-white px-3 py-1 rounded-lg text-base"
                      onClick={() => {
                        setSelectedNews(item);
                        setEditBreakingNews(true);
                      }}
                    >
                      Edit
                    </button>
                    {!item.isExpired && (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-lg text-base"
                        onClick={() => {
                          setIsModalOpen(true);
                          setId(item?._id);
                          setConfirmationData({
                            ...confirmationData,
                            title:
                              "Are you sure, you want to extend this advertisement news?",
                            bg: "bg-green-500",
                            button: "Extend",
                            fun: ExtendExpiry,
                            id: 3,
                          });
                        }}
                      >
                        Extend
                      </button>
                    )}

                    {item.isExpired && (
                      <button
                        className=" bg-green-500 text-white px-3 py-1 rounded-lg text-base"
                        onClick={() => {
                          setIsModalOpen(true);
                          setId(item?._id);
                          setConfirmationData({
                            title:
                              "Are you sure, you want to renew this advertisement news?",
                            bg: "bg-green-500",
                            button: "Renew",
                            fun: RenewPlan,
                            id: 2,
                          });
                        }}
                      >
                        Renew
                      </button>
                    )}
                    <button
                      className="bg-red text-white px-3 py-1 rounded-lg text-base"
                      onClick={() => {
                        setIsModalOpen(true);
                        setId(item?._id);
                        setConfirmationData({
                          title:
                            "Are you sure, you want to delete this advertisement news?",
                          bg: "bg-red",
                          button: "Delete",
                          fun: handleDelete,
                          id: 1,
                        });
                      }}
                    >
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
          <Loader />
        )}
      </div>
      {/* <div className="flex justify-between mt-4">
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
          Page {news?.page} of {Math.ceil(news?.totalDocs / itemsPerPage)}
        </span>
        <button
          onClick={() => fetchNews({ page: news?.page + 1 })}
          className={`${
            news?.page === Math.ceil(news?.totalDocs / itemsPerPage)
              ? "bg-gray pointer-events-none cursor-not-allowed"
              : "bg-blue"
          } text-white px-4 py-2 rounded`}
          disabled={news?.page === Math.ceil(news?.totalDocs / itemsPerPage)}
        >
          Next
        </button>
      </div> */}
      {addBreakingNews && (
        <AddAdvertisementNews setAddBreakingNews={setAddBreakingNews} />
      )}
      {editBreakingNews && (
        <EditAdvertisementNewsHandler
          news={selectedNews}
          setEditBreakingNews={setEditBreakingNews}
        />
      )}
      {confirmationData.id === 1 && (
        <ConfirmationModal
          title={confirmationData.title}
          bg={confirmationData.bg}
          id={id}
          button={confirmationData.button}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
      {confirmationData.id === 2 && (
        <ConfirmationModal
          title={confirmationData.title}
          bg={confirmationData.bg}
          id={id}
          button={confirmationData.button}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={RenewPlan}
        />
      )}

      {confirmationData.id === 3 && (
        <ConfirmationModal
          title={confirmationData.title}
          bg={confirmationData.bg}
          id={id}
          button={confirmationData.button}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={ExtendExpiry}
        />
      )}
    </div>
  );
};

export default TitleAdvertisementNews;
