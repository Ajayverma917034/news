import React from "react";
import sidebarimg from "../../assets/news banner.png";
import AdsSlider from "./AdsSlider";
// import SideAds from './SideAds';

const Ads = () => {
  return (
    <div className=" mx-auto p-6">
      <div className="flex justify-between items-center mb-4 px-4">
        <h1 className="text-3xl font-bold">Main Ads (1093 x 297)</h1>
        <button className="bg-blue-500 text-white bg-blue px-4 py-2 rounded">
          Create
        </button>
      </div>
      <AdsSlider />
      <div>
        <h2 className="text-xl font-bold mt-8">Side Bar Ads (350 x 350)</h2>
        <div className="grid grid-cols-3 gap-4 px-[3rem] py-4">
          {[1, 2].map((img, index) => (
            <div className="h-[200px] w-full">
              <img src={sidebarimg} alt="sideimg" className="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ads;
