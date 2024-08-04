import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

const Search = ({ searchOpen, setSearchOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [news, setNews] = useState(null);
  const inputRef = useRef();
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setSearchOpen(false);
      setNews(null);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Call the API
      if (searchTerm.length <= 0) {
        return toast.error("Please write something to search");
      }
      inputRef.current.blur();
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/search-news`, {
          search: searchTerm,
        })
        .then(({ data }) => {
          setNews(data.news);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [searchOpen, handleClickOutside]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div
        ref={modalRef}
        className="w-full max-w-lg mx-2 md:mx-4 lg:mx-6 rounded-lg "
      >
        <div className="flex justify-center w-full">
          <div className="relative w-full bg-white p-1 md:p-3 rounded-lg">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 md:pl-5 pointer-events-none">
              <CiSearch className="h-5 w-5 text-blue font-bold" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 pr-9 pl-9 focus:outline-none rounded w-full font-sans"
              autoFocus={true}
              ref={inputRef}
              onKeyDown={handleKeyDown}
            />
            {searchTerm && (
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 md:pr-5 cursor-pointer"
                onClick={() => setSearchTerm("")}
              >
                <IoMdClose className="h-5 w-5 text-gray-500" />
              </div>
            )}
          </div>
        </div>
        <div className="rounded-lg sha w-full p-3 bg-white mt-3 shadow-regular-shadow">
          <div className="flex flex-col overflow-y-auto min-h-[25rem] max-h-[35rem] items-center gap-y-4">
            {news ? (
              news.length ? (
                news.map((item, index) => (
                  <Link
                    href={`/news/${item?.news_id}`}
                    className="flex w-full flex-row gap-4 p-2 bg-white rounded border-b border-gray cursor-pointer"
                    key={index}
                  >
                    <div className="h-[60px] min-w-[120px]">
                      <Image
                        src={item?.banner}
                        alt="Image"
                        width={70}
                        height={400}
                        sizes={{
                          maxWidth: "100%",
                          height: "auto",
                        }}
                        className="object-cover"
                        // onError={handleImageError}
                      />
                    </div>
                    <div className="flex flex-col lg:w-3/4">
                      <h1 className="news-title-sm line-clamp-2 hover:underline">
                        {item?.title}
                      </h1>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="h-full flex flex-col justify-center items-center">
                  <p className="text-center text-blue font-semibold text-3xl mt-10">
                    No results found
                  </p>
                  {/* <span> {searchTerm}</span> */}
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
