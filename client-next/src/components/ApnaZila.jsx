"use client";
import React, { useEffect, useState } from "react";
import ApnaNavbar from "./apna-section/ApnaNavbar";
import ApnaNews from "./apna-section/ApnaNews";
// import SideNews from "./side-news/SideNews";
import Heading from "@/lib/Heading";

const districts = [
  "all",
  "sonbhadra",
  "chandauli",
  "mirzapur",
  "varanasi",
  "gajipur",
  "shahjhapur",
  "prayagraj",
  "deoria",
  "bareilly",
  "lakhimpur kheri",
  "pilibhit",
  "singrauli",
];

const ApnaZila = () => {
  const [currentDistrictIndex, setCurrentDistrictIndex] = useState(1);
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
          district:
            currentDistrictIndex === 0
              ? "apna zila"
              : districts[currentDistrictIndex],
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
  }, [currentDistrictIndex]);

  return (
    <div className="flex max-sm:px-1 spacing mt-5 md:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full gap-x-5">
        <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden w-full ">
          <Heading title={"अपना जिला"} />
          <div className="p-3 mt-1 bg-[#1f2024] news_card_1">
            <ApnaNavbar
              navItems={districts}
              currentIndex={currentDistrictIndex}
              setCurrentIndex={setCurrentDistrictIndex}
              hint={"district"}
            />
            <ApnaNews
              data={data}
              navItems={districts}
              currentIndex={currentDistrictIndex}
              hint={"district"}
            />
          </div>
        </div>
        <div className="flex flex-col md:gap-y-10 gap-y-2 md:col-span-2 md:mt-10">
          {/* <SideNews title={"education"} limit={6} /> */}
        </div>
      </div>
    </div>
  );
};

export default ApnaZila;
