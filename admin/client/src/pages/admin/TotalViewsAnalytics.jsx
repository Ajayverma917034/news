import React from "react";
import MonthlyView from "./chart/MonthlyView";
import YearlyView from "./chart/YearlyView";

const TotalViewsAnalytics = () => {
  return (
    <div className="flex flex-col w-full items-center md:p-3 mt-0 px-2 h-[calc(100vh-100px)] md:h-[calc(100vh-82px)] overflow-auto">
      <h2 className="text-[16px] sm:!text-[20px] md:!text-[30px] text-blue max-sm:my-5 mb-2 text-center">
        Welcome to{" "}
        <span className="text-red text-[20px] sm:text-[22px] md:text-[35px]">
          Janpad News
        </span>{" "}
        Admin Pannel{" "}
      </h2>

      <h2 className="md:!text-[25px] my-4 underline text-blue text-start">
        Total News Views Analytics
      </h2>
      <div className="grid grid-cols-1 1000px:grid-cols-2 grid-rows-4 1000px:grid-rows-2 w-full gap-4">
        <MonthlyView />
        <YearlyView />
      </div>
    </div>
  );
};

export default TotalViewsAnalytics;
