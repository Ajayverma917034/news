"use client";
import React from "react";

const NextNews = ({ randomNewsId }) => {
  const handleNextNews = async () => {
    window.location.href = `/news/${randomNewsId}`;
    const isMobile = window.innerWidth <= 768; // Adjust the threshold as needed
    // window.location.reload();
    // Set scroll position based on device type
    if (isMobile) {
      window.scrollTo(0, 250);
    } else {
      window.scrollTo(0, 400);
    }
  };
  return (
    <div className="fixed right-0 top-[400px] transform -translate-y-3/2 z-[1000]">
      <button
        onClick={handleNextNews}
        className="bg-red text-white p-2 pt-3 sm:pt-4 sm:p-3 rounded-l-lg shadow-md hover:bg-red-700 transition"
      >
        अगली खबर
      </button>
    </div>
  );
};

export default NextNews;
