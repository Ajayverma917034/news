import React from "react";
import { findHindi } from "../../assets/data";

const Heading = ({ title }) => {
  return (
    <>
      <div className="flex mt-3 items-center">
        <h6 className="text-[25px] md:text-5xl lg:text-5xl font-bold text-red mr-4 capitalize">
          {findHindi(title)}
        </h6>
        <div className="border-[2px] md:border-[3px] border-red flex-1 h-0 mb-[6px]"></div>
      </div>
    </>
  );
};

export default Heading;
