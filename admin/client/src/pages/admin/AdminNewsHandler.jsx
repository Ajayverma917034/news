import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { filterPaginationData } from "../../common/filterPaginationData";
import httpClient from "../../services/httpClient";
import { formatDate } from "../../common/date";
import { handleImageError } from "../../common/imageError";
import ConfirmationModal from "../../components/ConfirmationModal";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { categoryData } from "../../common/categoryData";
import { MdOutlineManageSearch } from "react-icons/md";
import FilterNewsSection from "./FilterNewsSection";
import { GrPowerReset } from "react-icons/gr";
import { GiNewspaper } from "react-icons/gi";

const AdminNewsHandler = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState({
    news_section_type: [],
    district: [],
    state: [],
    location: "",
    createdAt: "",
    search: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 6;
  const [news, setNews] = useState(null);
  const [id, setId] = useState(null);

  const openFilter = () => {
    setIsFilterOpen(true);
    // document.body.style.overflow = "hidden"; // Disable scroll
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
    // document.body.style.overflow = "auto"; // Enable scroll
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    // if (e.key === "Enter") {
    //   setSelectedOptions((prevOptions) => ({
    //     ...prevOptions,
    //     search: e.target.value,
    //   }));
    // }
    fetchNews({ page: 1, findCount: true });
  };
  const handleSubmit = () => {
    fetchNews({ page: 1, findCount: true });
  };
  const fetchNews = ({ page = 1, findCount = false }) => {
    httpClient
      .post(`admin/get-all-news`, {
        page,
        limit: itemsPerPage,
        draft: false,
        ...selectedOptions,
      })
      .then(async ({ data }) => {
        let formatData = await filterPaginationData({
          state: findCount ? null : news,
          data: data,
          page,
          data_to_send: selectedOptions,
          countRoute: "/get-admin-news-count",
        });
        setNews(formatData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async () => {
    try {
      if (!id) return;
      let loadingToast = toast.loading("Deleting...");
      const { data } = await httpClient.delete(`/admin/delete-news/${id}`);
      setIsModalOpen(false);
      toast.dismiss(loadingToast);
      toast.success("News Deleted Successfully");
      fetchNews({ page: 1 });
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete news");
      setIsModalOpen(false);
    }
  };
  const handleResetFilter = () => {
    setSelectedOptions({
      news_section_type: [],
      district: [],
      state: [],
      location: "",
      createdAt: "",
      search: "",
    });
    fetchNews({ page: 1, findCount: true });
  };
  useEffect(() => {
    fetchNews({ page: 1 });
  }, []);

  return (
    <div className="mx-auto px-2 pt-3 md:p-4 md:px-5 lg:px-10">
      <div className="flex justify-between max-sm:flex-col items-center gap-4 mb-2">
        <form
          onSubmit={handleSubmitSearch}
          className="border-2 rounded-lg w-full sm:w-60 flex  justify-between items-center"
        >
          <input
            type="text"
            placeholder="Search News"
            // onKeyDown={handleSubmitSearch}
            // onSubmit={handleSubmitSearch}
            value={selectedOptions.search}
            onChange={(e) => {
              setSelectedOptions({
                ...selectedOptions,
                search: e.target.value,
              });
            }}
            className="border-none outline-none max-sm:p-2 p-1 rounded-lg"
          />
          <BsSearch size={25} className="max-sm:pr-1" />
        </form>

        <div className="flex gap-x-1 sm:gap-x-3 max-sm:justify-between max-sm:w-full">
          <button className="flex gap-x-1 sm:gap-x-2 items-center text-base sm:text-2xl shadow-regular-shadow p-2 rounded-md px-1 sm:px-3 text-blue font-semibold">
            <GiNewspaper size={20} />
            Total News : {news?.totalDocs}
          </button>
          <button
            className="flex gap-x-1 sm:gap-x-2 items-center text-base sm:text-2xl shadow-regular-shadow p-2 rounded-md px-1 sm:px-3 text-blue font-semibold"
            onClick={handleResetFilter}
          >
            <GrPowerReset size={20} />
            Reset Filter
          </button>
          <button
            className="flex gap-x-1 sm:gap-x-2 items-center text-base sm:text-2xl shadow-regular-shadow p-2 rounded-md px-1 sm:px-3 text-blue font-semibold"
            onClick={openFilter}
          >
            <MdOutlineManageSearch size={25} /> Filter
          </button>
        </div>
      </div>
      {/* <p className="mb-4">{newsItems.length} Item Found</p> */}
      <div className="sspace-y-4 h-[calc(100vh-224px)] md:h-[calc(100vh-219px)] overflow-auto">
        {news ? (
          news?.results?.length ? (
            news?.results?.map((item, index) => (
              <div
                key={index}
                className="grid sm:grid-cols-7 lg:grid-cols-6 gap-3 items-center p-1 max-sm:pb-2 sm:p-4 rounded shadow-light-shadow"
                // style={{boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`}}
              >
                <div className=" sm:col-span-2 lg:col-span-1">
                  <img
                    src={item?.banner}
                    alt="news"
                    className="w-full h-36 sm:w-22 sm:h-24"
                    onError={handleImageError}
                  />
                </div>
                <div className="sm:col-span-5 lg:col-span-5">
                  <div className="flex-1">
                    <h3 className="font-medium text-xl line-clamp-2 sm:line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex max-sm:flex-col justify-start gap-y-1 gap-x-8">
                      <p className="text-lg text-gray">
                        <span className="font-semibold text-black">
                          Created On:
                        </span>{" "}
                        {formatDate(item.createdAt)}
                      </p>
                      <p className="text-lg text-gray">
                        <span className="font-semibold text-black">Read:</span>{" "}
                        {item.activity?.total_reads}
                      </p>
                      <p className="text-lg text-gray">
                        <span className="font-semibold text-black">
                          Reporter
                        </span>
                        <Link className="text-blue border-b border-blue ml-2">
                          @{item?.author?.username}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <button
                      className="bg-blue text-white px-3 py-1 rounded-lg text-base"
                      onClick={() =>
                        navigate(`/dashboard/create-news/${item?.news_id}?mode=edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red text-white px-3 py-1 rounded-lg text-base"
                      onClick={() => {
                        setIsModalOpen(true);
                        setId(item?.news_id);
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
      </div>

      <ConfirmationModal
        id={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
      <FilterNewsSection
        handleSubmit={handleSubmit}
        setSelectedOptions={setSelectedOptions}
        selectedOptions={selectedOptions}
        isOpen={isFilterOpen}
        onClose={closeFilter}
      />
    </div>
  );
};

export default AdminNewsHandler;
