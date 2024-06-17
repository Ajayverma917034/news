import MostReadNews from "./MostRead";
import CategoryRead from "./Categories";
import LatestNews from "./Latest";
import { useContext } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";

const Das = () => {
  return (
    <div className="">
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-16 my-8 px-2">
        <div className=" shadow-dark-shadow px-4 sm:px-8 py-3 sm:py-6 rounded-3xl">
          <p className="date-md text-2xl text-right mb-1">Reset at 12:00 AM</p>
          <div className="flex justify-around gap-8 items-center">
            <h2 className=" font-medium text-right">Today Total News Views</h2>
            <h2 className=" font-semibold">245K</h2>
          </div>
        </div>
        <div className=" shadow-dark-shadow px-4 sm:px-8 py-3 sm:py-6 rounded-3xl">
          <p className="date-md text-2xl mb-1 text-right">Reset at 12:00 AM</p>
          <div className="flex justify-around gap-8 items-center">
            <h2 className="text-5xl font-medium text-right">
              Today Total Youtube View
            </h2>
            <h2 className="text-4xl font-semibold">245K</h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-16 my-2 sm:my-8 mx-2 sm:mx-8 md:mx-12 ">
        <MostReadNews title={"Most Read News"} />
        <MostReadNews title={"Most View Video"} />
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-16 my-2 sm:my-8 mx-2 sm:mx-8 md:mx-12 ">
        <LatestNews />
        <LatestNews />
      </div>
      {/* <div className="my-8 mx-12 shadow-dark-shadow p-4">
        <CategoryRead />
      </div> */}
    </div>
  );
};

export default Das;
