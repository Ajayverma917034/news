// src/MostReadNews.js
import React from "react";
import randomImage from "./cc.jpg"; // Import the random image

const MostReadNews = () => {
  return (
    <div className="max-w-md mx-auto bg-white overflow-hidden md:max-w-2xl shadow-dark-shadow py-8 rounded-xl">
      <div className="border-b-2 text-4xl font-medium px-8 w-full py-3">
        Most Read News
      </div>
      <div className=" flex p-8 gap-8">
        <div className="w-44 h-20">
          <img
            className=" w-full h-full object-cover"
            src={randomImage}
            alt="News"
          />
        </div>
        <div className="block mt-1 text-3xl leading-tight font-normal text-black hover:underline">
          सलमान खान केस: CID करेगी आरोपी के सुसाइड की जांच, दरी से फंदा बनाकर
          लॉकअप के बाथरूम में लगाई थी फांसी
        </div>
      </div>
      <div className="px-10">
        <div className="mt-2 text-xl">
          <span className="font-medium">Total Views(Last 24 Hour) :</span>{" "}
          <span className="text-gray font-normal">200000 Views</span>
        </div>
        <div className="mt-2 text-xl">
          <span className="font-medium">Created On:</span>{" "}
          <span className="text-gray font-normal">06:25 PM 21th May 2024</span>
        </div>
        <div className="mt-2 text-xl">
          <span className="font-medium">Category:</span>{" "}
          <span className="text-gray font-normal">Crime</span>
        </div>
        <div className="mt-2 text-xl">
          <span className="font-medium">Location:</span>{" "}
          <span className="text-gray font-normal">Sonbhadra Uttar Pradesh</span>
        </div>
      </div>
    </div>
  );
};

export default MostReadNews;
