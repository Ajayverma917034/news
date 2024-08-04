// src/components/Pagination.js
import React from "react";
import { TfiAngleLeft } from "react-icons/tfi";
import { TfiAngleRight } from "react-icons/tfi";

const ApnaPagi = ({ currentIndex, setCurrentIndex, hint, navItems }) => {
  return (
    <div className="flex justify-between items-center gap-x-2">
      <button
        onClick={() => setCurrentIndex((prev) => prev - 1)}
        className={` border p-[2px] ${
          hint === "state"
            ? "border-black text-black"
            : "border-white text-white"
        } ${currentIndex === 0 ? "cursor-not-allowed" : ""}`}
        disabled={currentIndex === 0}
      >
        <TfiAngleLeft size={18} />
      </button>
      {/* <span className="text-white">Page {currentPage + 1}</span> */}
      <button
        onClick={() => setCurrentIndex((prev) => prev + 1)}
        className={` border p-[2px] ${
          hint === "state"
            ? "border-black text-black"
            : "border-white text-white"
        } ${currentIndex === navItems.length - 1 ? "cursor-not-allowed" : ""}`}
        disabled={currentIndex === navItems.length - 1}
      >
        <TfiAngleRight size={18} />
      </button>
    </div>
  );
};

export default ApnaPagi;
