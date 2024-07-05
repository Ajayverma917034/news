import React, { useEffect, useState } from "react";
import httpClient from "../../api/httpClient";
import Heading from "../../components/common/Heading";
import ApnaNavbar from "../../components/home/ApnaNavbar";
import ApnaNews from "../../components/home/ApnaNews";
import SideNews from "../advertisement/related-news/SideNews";
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
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [data, setData] = useState(null);

  const fetchNewsDistrictWise = () => {
    setData(null);
    httpClient
      .post(`get-news-query`, {
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
  };
  useEffect(() => {
    fetchNewsDistrictWise();
  }, [currentStateIndex]);
  return (
    <div className="flex spacing mt-2 sm:mt-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full gap-x-5">
        <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden w-full">
          <Heading title={"राज्य"} />

          <div className=" p-3 bg-white border-2 border-[#36373a]">
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
        <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 md:mt-10">
          <SideNews title={"health tips"} limit={6} />
        </div>
      </div>
    </div>
  );
};

export default RajyaMain;
