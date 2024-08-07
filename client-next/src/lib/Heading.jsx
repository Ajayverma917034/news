import { findHindi } from "@/assets/data";
import React from "react";

const Heading = ({ title }) => {
  return (
    <div className="flex items-center max-sm:px-1 gap-x-2">
      <h1
        className=" text-red font-semibold"
        style={{
          fontSize: "1.9rem",
          minWidth: "fit-content",
        }}
      >
        {findHindi(title)}
        {/* {title} */}
      </h1>
      <div
        className="flex w-full p-[2px] bg-red mb-2"
        style={{
          background: "red",
          padding: "2px",
          marginLeft: "0px 0 5px 5px",
        }}
      ></div>
    </div>
  );
};

export default Heading;
