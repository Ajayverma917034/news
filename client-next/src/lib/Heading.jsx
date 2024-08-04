import React from "react";
// import { findHindi } from "../assets/data";

const Heading = ({ title }) => {
  return (
    <div className="flex items-center gap-x-2">
      <h1
        className=" text-red font-semibold min-w-fit"
        style={{
          fontSize: "1.9rem",
        }}
      >
        {/* {findHindi(title)} */}
        {title}
      </h1>
      <div className="flex w-full p-[2px] bg-red mb-2"></div>
    </div>
  );
};

export default Heading;
