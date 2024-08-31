"use client";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const CustomePagination = ({
  totalItems,
  itemsPerPage,
  defaultCurrent,
  current,
  onChange,
}) => {
  const [currentPage, setCurrentPage] = useState(
    current || defaultCurrent || 1
  );
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onChange(page); // Pass the current page as an argument
  };

  const handleEllipsisClick = (direction) => {
    if (direction === "back") {
      const newPage = Math.max(1, currentPage - 3);
      handlePageChange(newPage);
    } else if (direction === "forward") {
      const newPage = Math.min(totalPages, currentPage + 3);
      handlePageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push("..");
      }

      for (
        let i = Math.max(2, currentPage - 2);
        i <= Math.min(totalPages - 1, currentPage + 2);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 disabled:opacity-50 disabled:text-gray disabled:cursor-not-allowed "
        style={{
          fontFamily: "sans-serif",
        }}
      >
        {"<"}
      </button>

      {renderPageNumbers().map((page, i) =>
        typeof page === "number" ? (
          <button
            key={i}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border rounded ${
              currentPage === page ? "bg-blue text-white border-blue" : ""
            }`}
            style={{
              fontFamily: "sans-serif",
            }}
          >
            {page}
          </button>
        ) : (
          <span
            key={i}
            className="relative px-3 py-1 cursor-pointer flex items-center justify-center"
            onClick={() => {
              if (page === "..") {
                handleEllipsisClick("back");
              } else if (page === "...") {
                handleEllipsisClick("forward");
              }
            }}
          >
            {page === ".." && (
              <div className="relative select-none flex items-center justify-center text-red hover:text-transparent hover:before:content-['<<'] hover:before:absolute hover:before:text-red transition-opacity duration-300">
                {"..."}
              </div>
            )}
            {page === "..." && (
              <div className="relative inset-0 select-none flex items-center justify-center text-red hover:text-transparent hover:before:content-['>>'] hover:before:absolute hover:before:text-red transition-opacity duration-300">
                {"..."}
              </div>
            )}
          </span>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 disabled:opacity-50 disabled:text-gray disabled:cursor-not-allowed"
        style={{
          fontFamily: "sans-serif",
        }}
      >
        {">"}
      </button>
    </div>
  );
};

export default CustomePagination;
