import React, { useEffect, useState } from "react";
import ZilaNews from "./ZilaNews";
import PaginationZila from "./PaginationZila";
import NavbarZila from "./NavbarZila";
import SideNews from "../../advertisement/related-news/SideNews";
import httpClient from "../../../api/httpClient";
const districts = [
  "All",
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
const ApnaZilaMain = () => {
  const [currentDistrictIndex, setCurrentDistrictIndex] = useState(0);
  const [data, setData] = useState(null);

  const fetchNewsDistrictWise = () => {
    setData(null);
    httpClient
      .post(`get-news-query`, {
        district:
          currentDistrictIndex === 0 ? "" : districts[currentDistrictIndex],
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
  }, [currentDistrictIndex]);
  return (
    <div className="flex spacing mt-2 sm:mt-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full gap-x-5 ">
        <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden w-full p-3 bg-[#1f2024]">
          <NavbarZila
            {...{
              districts,
              currentDistrictIndex,
              setCurrentDistrictIndex,
            }}
          />
          <ZilaNews
            data={data}
            districts={districts}
            currentDistrictIndex={currentDistrictIndex}
          />
        </div>
        <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 md:mt-10">
          <SideNews title={"education"} limit={6} />
        </div>
      </div>
    </div>
  );
};

export default ApnaZilaMain;
