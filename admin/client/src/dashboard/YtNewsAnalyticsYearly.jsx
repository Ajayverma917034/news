import React, { useEffect, useState } from "react";
import Dropdown from "./DropDown";
import CountChart from "./CountChart";
import httpClient from "../services/httpClient";

const YtNewsAnalyticsYearly = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const options = ["Select Year", "2025", "2024", "2023"];

  let [data, setData] = useState(null);

  let payload = {};
  if (selectedOption !== 0) {
    payload.year = options[selectedOption];
  }
  const fetchAnalytics = () => {
    httpClient
      .post("get-yt-news-analytics-year", {
        ...payload,
      })
      .then(({ data }) => {
        setData(data?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAnalytics();
  }, [selectedOption]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  return (
    <div
      className="rounded-md p-4 "
      style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
    >
      <div className="flex justify-between items-center">
        <h1 className=" text-xl sm:text-2xl font-semibold ">
          {selectedOption === 0
            ? "Yearly youtube News Analytics"
            : `Youtube News Analytics for ${options[selectedOption]}`}
        </h1>
        <Dropdown
          {...{
            options,
            selectedOption,
            setSelectedOption,
            handleOptionClick,
          }}
        />
      </div>

      <div className="h-[20rem] max-h-[25rem] mt-5">
        {data && <CountChart {...{ data }} />}
      </div>
    </div>
  );
};

export default YtNewsAnalyticsYearly;
