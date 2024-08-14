"use client";
import React, { useEffect, useState, useCallback } from "react";
import Heading from "@/lib/Heading";
import axios from "axios";
import ApnaNavbar from "./apna-section/ApnaNavbar";
import ApnaNews from "./apna-section/ApnaNews";
// import SideNews from "./side-news/SideNews";

const states = [
  "all",
  "uttar pradesh",
  "madhyapradesh",
  "bihar",
  "chhattisgarh",
  "jharkhand",
  "uttarakhand",
];

const RajyaMain = () => {
  const [currentStateIndex, setCurrentStateIndex] = useState(1);
  const [data, setData] = useState(null);

  const fetchNewsDistrictWise = async () => {
    setData(null);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-news-query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: currentStateIndex === 0 ? "rajya" : states[currentStateIndex],
        }),
      }
    );

    if (!response.ok) {
      setData(null);
      console.log(response);
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchNewsDistrictWise();
  }, [currentStateIndex]);

  return (
    <div className="flex spacing max-sm:px-1 mt-5 sm:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full gap-x-5">
        <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden w-full">
          <Heading title={"राज्य"} />

          <div className="p-3 mt-1 bg-white border-2 border-[#36373a] news_card_2">
            <ApnaNavbar
              navItems={states}
              currentIndex={currentStateIndex}
              setCurrentIndex={setCurrentStateIndex}
              hint={"state"}
            />
            <ApnaNews
              data={data}
              navItems={states}
              currentIndex={currentStateIndex}
              hint={"state"}
            />
          </div>
        </div>
        <div className="flex flex-col md:gap-y-10 gap-y-2 md:col-span-2 md:mt-10">
          {/* <SideNews title={"health tips"} limit={6} /> */}
        </div>
      </div>
    </div>
  );
};

export default RajyaMain;
