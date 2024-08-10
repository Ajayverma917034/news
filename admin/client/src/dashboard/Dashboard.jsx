import MostReadNews from "./MostRead";
import CategoryRead from "./Categories";
import LatestNews from "./Latest";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import Analytics from "./Analytics";
import httpClient from "../services/httpClient";
function formatNumber(num) {
  if (num === undefined) return;
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}
const Dashboard = () => {
  const [data, setData] = useState({ news: 0, ytNews: 0 });
  const fetchTotalViewa = () => {
    httpClient
      .get("get-news-today-view")
      .then(({ data }) => {
        setData({ news: data.Newscount, ytNews: data.Ytcount });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTotalViewa();
  }, []);
  return (
    <div className="flex flex-col w-full items-center md:p-3 mt-0 px-2 h-[calc(100vh-100px)] md:h-[calc(100vh-82px)] overflow-auto">
      <h2 className="text-[16px] sm:!text-[20px] md:!text-[30px] text-blue max-sm:my-5 mb-2 text-center">
        Welcome to{" "}
        <span className="text-red text-[20px] sm:text-[22px] md:text-[35px]">
          Janpad News
        </span>{" "}
        Admin Pannel{" "}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5 mb-5">
        <div
          className=" px-4 sm:px-8 py-3 sm:py-6 rounded-3xl"
          style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
        >
          <p className="date-md text-2xl text-right mb-1">Reset at 12:00 AM</p>
          <div className="flex justify-end gap-x-2 items-center">
            <p className="text-right text-2xl font-bold">
              Today Total News Views
            </p>
            <span className="font-bold text-3xl">
              {formatNumber(data?.news)}
            </span>
          </div>
        </div>
        <div
          className=" px-4 sm:px-8 py-3 sm:py-6 rounded-3xl"
          style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
        >
          <p className="date-md text-2xl text-right mb-1">Reset at 12:00 AM</p>
          <div className="flex justify-end gap-x-2 items-center">
            <p className="text-right text-2xl font-bold">
              Today Total Youtube View
            </p>
            <span className="font-bold text-3xl">
              {formatNumber(data?.ytNews)}
            </span>
          </div>
        </div>
      </div>

      <h2 className="md:!text-[25px] my-4 underline text-blue text-start">
        Total News Analytics
      </h2>
      <Analytics />
      {/* <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-16 my-2 sm:my-8 mx-2 sm:mx-8 md:mx-12 ">
        <MostReadNews title={"Most Read News"} />
        <MostReadNews title={"Most View Video"} />
      </div> */}
      {/* <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-16 my-2 sm:my-8 mx-2 sm:mx-8 md:mx-12 ">
        <LatestNews />
        <LatestNews />
      </div> */}
      {/* <div className="my-8 mx-12 shadow-dark-shadow p-4">
        <CategoryRead />
      </div> */}
    </div>
  );
};

export default Dashboard;
