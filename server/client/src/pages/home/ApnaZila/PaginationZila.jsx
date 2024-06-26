// src/components/Pagination.js
import React from "react";
import { TfiAngleLeft } from "react-icons/tfi";
import { TfiAngleRight } from "react-icons/tfi";

const PaginationZila = ({ currentDistrictIndex, setCurrentDistrictIndex }) => {
  return (
    <div className="flex justify-between items-center gap-x-2">
      <button
        onClick={() => setCurrentDistrictIndex((prev) => prev - 1)}
        className="text-white border p-[2px]"
      >
        <TfiAngleLeft size={18} />
      </button>
      {/* <span className="text-white">Page {currentPage + 1}</span> */}
      <button
        onClick={() => setCurrentDistrictIndex((prev) => prev + 1)}
        className="text-white border p-[2px]"
      >
        <TfiAngleRight size={18} />
      </button>
    </div>
  );
};

export default PaginationZila;
