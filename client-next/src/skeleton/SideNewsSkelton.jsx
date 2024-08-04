import React from "react";

const SideNewsSkelton = () => {
  return (
    <div className="flex-col gap-y-3 py-3 px-5 shadow-light-shadow rounded-md  hidden lg:flex ">
      <div className="h-[25px] bg-[#dddbdd] animate-pulse my-5"></div>
      <div className="flex lg:flex-col gap-y-4 gap-5">
        {[0, 1, 2, 3, 4].map((item, index) => (
          <div className="flex w-full flex-row gap-4" key={index}>
            <div className="h-[80px] min-w-[120px]  bg-[#dddbdd] animate-pulse"></div>
            <div className="flex flex-col lg:w-3/4 gap-y-2">
              <div className="news-title-sm line-clamp-3 h-5  bg-[#dddbdd] animate-pulse "></div>
              <div className="news-title-sm line-clamp-3 h-5  bg-[#dddbdd] animate-pulse "></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNewsSkelton;
