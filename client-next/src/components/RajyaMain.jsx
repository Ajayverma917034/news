"use client";
import React, { useEffect, useState, useCallback } from "react";
import Heading from "@/lib/Heading";
import axios from "axios";
import ApnaNavbar from "./apna-section/ApnaNavbar";
import ApnaNews from "./apna-section/ApnaNews";
import SideNews from "./side-news/SideNews";

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

  const fetchNewsDistrictWise = useCallback(() => {
    setData(null);
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-news-query`, {
        state: currentStateIndex === 0 ? "rajya" : states[currentStateIndex],
      })
      .then(({ data }) => {
        setData(data);
        // console.log(data);
      })
      .catch((err) => {
        setData(null);
        console.log(err);
      });
  }, [currentStateIndex]);

  useEffect(() => {
    fetchNewsDistrictWise();
  }, [fetchNewsDistrictWise]);

  return (
    <div className="flex spacing max-sm:px-0 mt-2 sm:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full gap-x-5">
        <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden w-full">
          <Heading title={"राज्य"} />

          <div className="p-3 bg-white border-2 border-[#36373a]">
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
          <SideNews title={"health tips"} limit={6} />
        </div>
      </div>
    </div>
  );
};

export default RajyaMain;
