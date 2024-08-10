import React, { useEffect, useState } from "react";
import Dropdown from "../../../dashboard/DropDown";
import CountChart from "../../../dashboard/CountChart";
import httpClient from "../../../services/httpClient";

const YearlyView = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const options = ["Select Year", "2024", "2023"];

  let [data, setData] = useState(null);

  let payload = {};
  if (selectedOption !== 0) {
    payload.year = options[selectedOption];
  }
  const fetchAnalytics = () => {
    httpClient
      .post("news-view-analytics-year", {
        ...payload,
      })
      .then(({ data }) => {
        setData(data?.result);
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
            ? "Yearly Views Analytics"
            : `Views Analytics for ${options[selectedOption]}`}
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
        {data && <CountChart {...{ data, hint: "view" }} />}
      </div>
    </div>
  );
};

export default YearlyView;
