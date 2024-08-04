import React from "react";

const YtNewsSkelton = () => {
  return (
    <div className="flex w-full flex-col flex-wrap sm:gap-2 md:gap-6 mt-5">
      <div className="h-[25px] bg-[#dddbdd] animate-pulse my-5"></div>

      {/* Main Section  */}
      <div className="flex md:flex-row flex-col justify-between w-full ">
        <div className="md:w-[50%] w-full h-auto relative bg-[#dddbdd] animate-pulse"></div>
        <div className="md:w-[45%] w-full ">
          <div className="bg-[#dddbdd] animate-pulse h-5"></div>
          <div className="bg-[#dddbdd] animate-pulse h-5"></div>
        </div>
      </div>

      <div className="flex flex-col">
        {
          <div className="flex gap-5 flex-col md:flex-row justify-between mb-4">
            {[1, 2, 3].map((item, index) => (
              <div
                className="w-full flex flex-col max-md:flex-row max-md:gap-5 max-md:grid max-md:grid-cols-5 rounded-lg"
                key={index}
              >
                <div className="max-w-[17rem] h-24 md:h-36 col-span-2 relative rounded-lg bg-[#dddbdd] animate-pulse"></div>
                <div className="bg-[#dddbdd] animate-pulse h-4"></div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default YtNewsSkelton;
